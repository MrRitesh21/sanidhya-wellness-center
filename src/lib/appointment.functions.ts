import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  appointmentFormSchema,
  buildAppointmentApiPayload,
  type AppointmentFormData,
  APPOINTMENT_BOOKING_ENDPOINT,
} from "./appointment";
import { buildLeadPayload, LEAD_API_KEY, LEAD_ENDPOINT, LEAD_PAGE_ID } from "./leadCapture";

const bookingResponseSchema = z.object({
  success: z.literal(true),
  appointment_id: z.string().nullish(),
  token_number: z.string().nullish(),
  clinic_name: z.string().nullish(),
  doctor_name: z.string().nullish(),
});

type BookingResponse = z.infer<typeof bookingResponseSchema>;

async function submitToAppointmentService(data: AppointmentFormData) {
  try {
    const response = await fetch(APPOINTMENT_BOOKING_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(buildAppointmentApiPayload(data, new Date().toISOString())),
    });
    if (!response.ok) return { success: false as const };

    const result = bookingResponseSchema.safeParse(await response.json().catch(() => null));
    return result.success ? { success: true as const, data: result.data } : { success: false as const };
  } catch {
    return { success: false as const };
  }
}

async function saveLeadCopy(data: AppointmentFormData): Promise<boolean> {
  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: {
        apikey: LEAD_API_KEY,
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
    const [booking, leadSaved] = await Promise.all([
      submitToAppointmentService(data),
      saveLeadCopy(data),
    ]);
    return { booking, leadSaved };
  });