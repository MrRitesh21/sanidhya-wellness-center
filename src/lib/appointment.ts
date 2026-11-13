import { z } from "zod";

export const BOOKING_CLINIC_SLUG = "sanidhya-naturopathy-center";
export const APPOINTMENT_BOOKING_ENDPOINT = "https://clinicx.digiwil.com/api/public/submit-booking";

export const DEFAULT_DOCTOR = {
  name: "Dr. Kamal",
  title: "Lead Naturopath & General Physician",
  qualifications: "B.A.M.S, N.D. (Diploma in Naturopathy)",
  specialty: "General Physician & Naturopathy Specialist",
  experience: "15+ Years Clinical Practice",
  consultationFee: 600,
  feeDisplay: "₹600",
  feeSubtitle: "Standard Consultation",
  registrationNo: "UP-AY-49102",
  rating: "4.9",
  reviewsCount: "1,200+ Consultations",
  avatarUrl: "",
} as const;

export const SHIFT_SLOTS = {
  morning: [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
  ],
  evening: [
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
  ],
} as const;

function makeSlots(startHour: number, endHour: number): string[] {
  const slots: string[] = [];
  for (let minutes = startHour * 60; minutes <= endHour * 60; minutes += 30) {
    const hour24 = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const suffix = hour24 < 12 ? "AM" : "PM";
    const hour12 = hour24 % 12 || 12;
    slots.push(`${hour12}:${String(minute).padStart(2, "0")} ${suffix}`);
  }
  return slots;
}

export const BOOKING_TIME_GROUPS = [
  { label: "Morning", slots: SHIFT_SLOTS.morning },
  { label: "Afternoon", slots: makeSlots(14, 16.5) },
  { label: "Evening", slots: SHIFT_SLOTS.evening },
] as const;

export const BOOKING_TIMES = [
  ...SHIFT_SLOTS.morning,
  ...makeSlots(14, 16.5),
  ...SHIFT_SLOTS.evening,
  // Also support generic period names if passed
  "morning",
  "afternoon",
  "evening",
] as [string, ...string[]];

export function kolkataToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

export function normalizeIndianMobile(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export function isValidIndianMobile(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  const localNumber = normalizeIndianMobile(value);
  return (
    /^[6-9]\d{9}$/.test(localNumber) &&
    (digits.length === 10 ||
      (digits.length === 11 && digits.startsWith("0")) ||
      (digits.length === 12 && digits.startsWith("91")))
  );
}

export function isTodayOrFuture(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value && value >= kolkataToday();
}

export const appointmentFormSchema = z
  .object({
    appointmentType: z.enum(["offline", "online"]).default("offline"),
    date: z.string().refine(isTodayOrFuture, "Please choose today or a future date"),
    time: z.string().min(1, "Please choose an appointment time slot"),
    reason: z.string().trim().min(3, "Please describe your health concern (at least 3 characters)").max(500),
    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name (at least 2 characters)")
      .max(80, "Name must not exceed 80 characters")
      .regex(/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u, "Please enter a valid name"),
    mobile: z
      .string()
      .trim()
      .refine(isValidIndianMobile, "Enter a valid 10-digit Indian mobile number"),
    ageGroup: z.enum(["adult", "child"]).default("adult"),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
    message: z.string().trim().max(500, "Additional message must not exceed 500 characters").optional(),
    consent: z.boolean().refine((value) => value === true, "DPDP Act 2023 consent is required to schedule"),
  })
  .superRefine((data, context) => {
    const dayOfWeek = new Date(`${data.date}T00:00:00.000Z`).getUTCDay();
    // Sunday: Evening slots are disabled
    if (dayOfWeek === 0) {
      const isEvening =
        data.time === "evening" ||
        data.time === "afternoon" ||
        SHIFT_SLOTS.evening.includes(data.time as any) ||
        data.time.includes("PM");
      if (isEvening && !data.time.startsWith("12:")) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["time"],
          message: "Sunday clinic hours are 10:00 AM – 2:00 PM; please choose a morning slot.",
        });
      }
    }
  });

export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

export function generateLocalOpdToken(): string {
  const rand = Math.floor(100 + Math.random() * 900);
  return `OPD-${rand}`;
}

export function buildAppointmentApiPayload(data: AppointmentFormData, consentAt: string) {
  return {
    clinic: BOOKING_CLINIC_SLUG,
    name: data.name.trim(),
    phone: normalizeIndianMobile(data.mobile),
    date: data.date,
    time: data.time,
    appointment_type: data.appointmentType,
    problem: [data.reason, data.message].filter(Boolean).join("\n\n") || data.reason,
    dpdp_consent: true as const,
    dpdp_consent_at: consentAt,
  };
}
