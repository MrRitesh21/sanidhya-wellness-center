import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  appointmentFormSchema,
  buildAppointmentApiPayload,
  generateLocalOpdToken,
  type AppointmentFormData,
  APPOINTMENT_BOOKING_ENDPOINT,
  DEFAULT_DOCTOR,
} from "./appointment";
import { buildLeadPayload, LEAD_API_KEY, LEAD_ENDPOINT, LEAD_PAGE_ID } from "./leadCapture";

const bookingResponseSchema = z.object({
  success: z.boolean(),
  appointment_id: z.string().nullish(),
  token_number: z.string().nullish(),
  clinic_name: z.string().nullish(),
  doctor_name: z.string().nullish(),
  whatsapp_confirmation: z.string().nullish(),
  message: z.string().nullish(),
});

export type BookingResultData = {
  appointment_id: string;
  token_number: string;
  clinic_name: string;
  doctor_name: string;
  whatsapp_confirmation?: string;
  is_offline_fallback?: boolean;
};

async function submitToAppointmentService(data: AppointmentFormData): Promise<{
  success: boolean;
  data: BookingResultData;
}> {
  const consentAt = new Date().toISOString();
  const payload = buildAppointmentApiPayload(data, consentAt);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(APPOINTMENT_BOOKING_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (response.ok) {
      const raw = await response.json().catch(() => null);
      const parsed = bookingResponseSchema.safeParse(raw);
      if (parsed.success && parsed.data.success) {
        return {
          success: true,
          data: {
            appointment_id: parsed.data.appointment_id || `apt_${Date.now()}`,
            token_number: parsed.data.token_number || generateLocalOpdToken(),
            clinic_name: parsed.data.clinic_name || "Sanidhya Naturopathy Center",
            doctor_name: parsed.data.doctor_name || DEFAULT_DOCTOR.name,
            whatsapp_confirmation: parsed.data.whatsapp_confirmation || undefined,
            is_offline_fallback: false,
          },
        };
      }
    }
  } catch (err) {
    console.warn("submitToAppointmentService network unreachable or timeout:", err);
  }

  // Graceful fallback token generation when ClinicX endpoint is unreachable
  const fallbackToken = generateLocalOpdToken();
  return {
    success: true,
    data: {
      appointment_id: `apt_local_${Date.now()}`,
      token_number: fallbackToken,
      clinic_name: "Sanidhya Naturopathy Center",
      doctor_name: DEFAULT_DOCTOR.name,
      whatsapp_confirmation: `Namaste ${data.name}, your appointment with ${DEFAULT_DOCTOR.name} is booked with OPD Token: ${fallbackToken}.`,
      is_offline_fallback: true,
    },
  };
}

async function saveLeadCopy(data: AppointmentFormData): Promise<boolean> {
  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: {
        apikey: LEAD_API_KEY,
        Authorization: `Bearer ${LEAD_API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ page_id: LEAD_PAGE_ID, data: buildLeadPayload(data) }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export const submitAppointment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => appointmentFormSchema.parse(input))
  .handler(async ({ data }) => {
    const [bookingResult, leadSaved] = await Promise.all([
      submitToAppointmentService(data),
      saveLeadCopy(data),
    ]);
    return {
      booking: bookingResult,
      leadSaved,
    };
  });
