import { describe, expect, it } from "vitest";
import {
  appointmentFormSchema,
  buildAppointmentApiPayload,
  generateLocalOpdToken,
  isValidIndianMobile,
  normalizeIndianMobile,
  DEFAULT_DOCTOR,
  BOOKING_CLINIC_SLUG,
} from "@/lib/appointment";

describe("Doctor OPD Appointment System & DPDP Act 2023 Compliance", () => {
  it("has correct clinic and lead doctor configuration", () => {
    expect(BOOKING_CLINIC_SLUG).toBe("sanidhya-naturopathy-center");
    expect(DEFAULT_DOCTOR.name).toBe("Dr. Kamal");
    expect(DEFAULT_DOCTOR.consultationFee).toBe(600);
    expect(DEFAULT_DOCTOR.feeDisplay).toBe("₹600");
  });

  it("validates 10-digit Indian mobile numbers properly", () => {
    expect(isValidIndianMobile("9876543210")).toBe(true);
    expect(isValidIndianMobile("+91 94150 26684")).toBe(true);
    expect(isValidIndianMobile("09415026684")).toBe(true);
    expect(isValidIndianMobile("1234567890")).toBe(false); // starts with 1
    expect(isValidIndianMobile("98765")).toBe(false); // too short
  });

  it("normalizes mobile numbers to 10 digits", () => {
    expect(normalizeIndianMobile("+91 94150 26684")).toBe("9415026684");
    expect(normalizeIndianMobile("09415026684")).toBe("9415026684");
    expect(normalizeIndianMobile("9876543210")).toBe("9876543210");
  });

  it("requires mandatory DPDP Act 2023 affirmative consent", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    if (futureDate.getDay() === 0) futureDate.setDate(futureDate.getDate() + 1);
    const dateStr = futureDate.toISOString().split("T")[0];

    // Fails when consent is false
    const invalidResult = appointmentFormSchema.safeParse({
      appointmentType: "offline",
      date: dateStr,
      time: "10:30 AM",
      name: "Patient Verma",
      mobile: "9876543210",
      reason: "Chronic backache and stiffness",
      consent: false,
    });
    expect(invalidResult.success).toBe(false);

    // Passes when consent is true
    const validResult = appointmentFormSchema.safeParse({
      appointmentType: "offline",
      date: dateStr,
      time: "10:30 AM",
      name: "Patient Verma",
      mobile: "9876543210",
      reason: "Chronic backache and stiffness",
      consent: true,
    });
    expect(validResult.success).toBe(true);
  });

  it("enforces Sunday morning-only clinic hours constraint", () => {
    // Find upcoming Sunday
    const sunday = new Date();
    const daysUntilSunday = (7 - sunday.getDay()) % 7 || 7;
    sunday.setDate(sunday.getDate() + daysUntilSunday);
    const sundayStr = sunday.toISOString().split("T")[0];

    // Sunday morning should pass
    const morningResult = appointmentFormSchema.safeParse({
      appointmentType: "offline",
      date: sundayStr,
      time: "10:30 AM",
      name: "Asha Devi",
      mobile: "9415026684",
      reason: "Naturopathy checkup",
      consent: true,
    });
    expect(morningResult.success).toBe(true);

    // Sunday evening should fail
    const eveningResult = appointmentFormSchema.safeParse({
      appointmentType: "offline",
      date: sundayStr,
      time: "06:00 PM",
      name: "Asha Devi",
      mobile: "9415026684",
      reason: "Naturopathy checkup",
      consent: true,
    });
    expect(eveningResult.success).toBe(false);
  });

  it("builds the exact API payload expected by ClinicX", () => {
    const consentTime = "2026-11-13T12:00:00.000Z";
    const payload = buildAppointmentApiPayload(
      {
        appointmentType: "offline",
        date: "2026-11-20",
        time: "10:30 AM",
        name: "Patient Full Name",
        mobile: "+91 98765 43210",
        ageGroup: "adult",
        reason: "Symptoms or reason for visit",
        consent: true,
      },
      consentTime
    );

    expect(payload).toEqual({
      clinic: "sanidhya-naturopathy-center",
      name: "Patient Full Name",
      phone: "9876543210",
      date: "2026-11-20",
      time: "10:30 AM",
      appointment_type: "offline",
      problem: "Symptoms or reason for visit",
      dpdp_consent: true,
      dpdp_consent_at: consentTime,
    });
  });

  it("generates a valid OPD Token format for local resilience", () => {
    const token = generateLocalOpdToken();
    expect(token).toMatch(/^OPD-\d{3}$/);
  });
});
