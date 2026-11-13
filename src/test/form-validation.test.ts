import { describe, expect, it } from "vitest";
import { z } from "zod";
import { OPEN_BOOKING_EVENT, openBookingModal } from "@/lib/bookingModal";

const validMobile = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) return /^[6-9]/.test(d.slice(2));
  if (d.length === 11 && d.startsWith("0")) return /^[6-9]/.test(d.slice(1));
  if (d.length === 10) return /^[6-9]/.test(d);
  return false;
};

const bookingSchema = z
  .object({
    name: z
      .string({ required_error: "Please enter your full name" })
      .trim()
      .min(2, "Please enter your full name (at least 2 letters)")
      .max(80, "Name must not exceed 80 characters")
      .regex(/^[a-zA-Z\s.'-]+$/, "Please enter a valid name using letters and spaces only"),
    mobile: z
      .string({ required_error: "Please enter your mobile number" })
      .trim()
      .min(10, "Mobile number must be at least 10 digits")
      .refine(validMobile, "Enter a valid 10-digit Indian mobile number, e.g. 94150 26684"),
    ageGroup: z.enum(["adult", "child"], {
      required_error: "Please select whether consultation is for an adult or child",
      invalid_type_error: "Please select whether consultation is for an adult or child",
    }),
    reason: z
      .string({ required_error: "Please specify the reason for your consultation" })
      .trim()
      .min(3, "Please describe your consultation reason or health concern (at least 3 characters)")
      .max(500, "Reason must not exceed 500 characters"),
    date: z
      .string({ required_error: "Please choose a preferred appointment date" })
      .min(1, "Please choose a preferred appointment date")
      .refine((v) => {
        if (!v) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const chosen = new Date(`${v}T00:00:00`);
        return !isNaN(chosen.getTime()) && chosen >= today;
      }, "Please choose today or a future date"),
    time: z
      .string({ required_error: "Please choose a preferred time slot" })
      .min(1, "Please choose a preferred time slot"),
    message: z
      .string()
      .trim()
      .max(500, "Additional message must not exceed 500 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.date && data.time) {
      const day = new Date(`${data.date}T00:00:00`).getDay();
      if (day === 0 && data.time !== "morning") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["time"],
          message: "Sundays are 10:00 AM – 2:00 PM, so only the morning slot is available.",
        });
      }
    }
  });

const contactSchema = z.object({
  name: z
    .string({ required_error: "Please enter your full name" })
    .trim()
    .min(2, "Please enter your full name (at least 2 letters)")
    .max(80, "Name must not exceed 80 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Please enter a valid name using letters and spaces only"),
  phone: z
    .string({ required_error: "Please enter your mobile number" })
    .trim()
    .min(10, "Mobile number must be at least 10 digits")
    .refine(validMobile, "Enter a valid 10-digit Indian mobile number (e.g. 94150 26684)"),
  message: z
    .string({ required_error: "Please enter your message or enquiry" })
    .trim()
    .min(5, "Please enter your message (at least 5 characters)")
    .max(1000, "Message must not exceed 1000 characters"),
});

describe("Zod validation rules across forms", () => {
  it("validates valid appointment form data successfully", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    // Ensure Monday-Saturday for morning slot test
    if (futureDate.getDay() === 0) futureDate.setDate(futureDate.getDate() + 1);
    const dateStr = futureDate.toISOString().split("T")[0];

    const result = bookingSchema.safeParse({
      name: "Ritesh Singh",
      mobile: "94150 26684",
      ageGroup: "adult",
      reason: "Back pain relief and cervical guidance",
      date: dateStr,
      time: "morning",
      message: "Please confirm timings",
    });

    expect(result.success).toBe(true);
  });

  it("fails booking validation on invalid phone numbers and empty fields", () => {
    const result = bookingSchema.safeParse({
      name: "R",
      mobile: "12345",
      ageGroup: "invalid-group",
      reason: "",
      date: "2020-01-01",
      time: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.name).toBeDefined();
      expect(fieldErrors.mobile).toBeDefined();
      expect(fieldErrors.ageGroup).toBeDefined();
      expect(fieldErrors.reason).toBeDefined();
      expect(fieldErrors.date).toBeDefined();
      expect(fieldErrors.time).toBeDefined();
    }
  });

  it("fails Sunday non-morning booking appointment time", () => {
    // Find next Sunday (in local time)
    const sunday = new Date();
    sunday.setDate(sunday.getDate() + ((7 - sunday.getDay()) % 7 || 7));
    const y = sunday.getFullYear();
    const m = String(sunday.getMonth() + 1).padStart(2, "0");
    const d = String(sunday.getDate()).padStart(2, "0");
    const sundayStr = `${y}-${m}-${d}`;

    const result = bookingSchema.safeParse({
      name: "Aarti Verma",
      mobile: "9876543210",
      ageGroup: "adult",
      reason: "Cervical consultation",
      date: sundayStr,
      time: "evening",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const issues = result.error.issues;
      const timeIssue = issues.find((i) => i.path.includes("time"));
      expect(timeIssue?.message).toContain("Sundays are 10:00 AM – 2:00 PM");
    }
  });

  it("validates contact form schema", () => {
    const valid = contactSchema.safeParse({
      name: "Vikas Kumar",
      phone: "94150 26684",
      message: "Looking for naturopathy packages for senior citizens.",
    });
    expect(valid.success).toBe(true);

    const invalid = contactSchema.safeParse({
      name: "1234",
      phone: "0000",
      message: "hi",
    });
    expect(invalid.success).toBe(false);
  });

  it("dispatches open-booking-modal event when openBookingModal is called", () => {
    if (typeof window === "undefined") {
      (globalThis as any).window = globalThis;
    }
    let fired = false;
    const listener = () => {
      fired = true;
    };
    window.addEventListener(OPEN_BOOKING_EVENT, listener);
    openBookingModal();
    expect(fired).toBe(true);
    window.removeEventListener(OPEN_BOOKING_EVENT, listener);
  });
});
