import { z } from "zod";

export const BOOKING_CLINIC_SLUG = "sanidhya-naturopathy-center";
export const APPOINTMENT_BOOKING_ENDPOINT = "https://clinicx.digiwil.com/api/public/submit-booking";

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
  { label: "Morning", slots: makeSlots(10, 13) },
  { label: "Afternoon", slots: makeSlots(14, 17) },
  { label: "Evening", slots: makeSlots(17.5, 21) },
] as const;

export const BOOKING_TIMES = BOOKING_TIME_GROUPS.flatMap((group) => group.slots) as [
  string,
  ...string[],
];

export function kolkataToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

export function normalizeIndianMobile(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function isValidIndianMobile(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  const localNumber = normalizeIndianMobile(value);
  return (
    /^[6-9]\d{9}$/.test(localNumber) &&
    (digits.length === 10 ||
      (digits.length === 11 && digits.startsWith("0")) ||
      (digits.length === 12 && digits.startsWith("91")))
  );
}

function isTodayOrFuture(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value && value >= kolkataToday();
}

export const appointmentFormSchema = z
  .object({
    appointmentType: z.enum(["offline", "online"]),
    date: z.string().refine(isTodayOrFuture, "Please choose today or a future date"),
    time: z.enum(BOOKING_TIMES),
    reason: z.string().trim().min(3, "Please describe your reason (at least 3 characters)").max(500),
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
    ageGroup: z.enum(["adult", "child"]),
    message: z.string().trim().max(500, "Additional message must not exceed 500 characters").optional(),
    consent: z.boolean().refine((value) => value, "Please provide consent to submit your request"),
  })
  .superRefine((data, context) => {
    const dayOfWeek = new Date(`${data.date}T00:00:00.000Z`).getUTCDay();
    if (dayOfWeek === 0 && BOOKING_TIME_GROUPS.slice(1).some((group) => group.slots.includes(data.time))) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["time"],
        message: "Sunday hours are 10:00 AM–2:00 PM; please choose a morning time.",
      });
    }
  });

export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

export function buildAppointmentApiPayload(data: AppointmentFormData, consentAt: string) {
  return {
    clinic: BOOKING_CLINIC_SLUG,
    name: data.name,
    phone: normalizeIndianMobile(data.mobile),
    date: data.date,
    time: data.time,
    appointment_type: data.appointmentType,
    problem: [data.reason, data.message].filter(Boolean).join("\n\n"),
    dpdp_consent: true as const,
    dpdp_consent_at: consentAt,
  };
}