/**
 * Lead capture for the appointment enquiry form.
 *
 * Submissions are posted to the clinic's DigiWil landing-page leads table
 * (the same endpoint the original embed used), keyed by the embed's page id
 * so they appear in the owner's DigiWil lead dashboard.
 *
 * The key below is the embed's publishable key — it is designed to ship in
 * client code; it can only append rows to the leads table.
 */

export const LEAD_ENDPOINT =
  "https://urcwyuvrwlmzxdsbecns.supabase.co/rest/v1/landing_page_submissions";
export const LEAD_PAGE_ID = "10343958-a861-47fb-9323-1e1ca91f0fc2";
export const LEAD_API_KEY = "sb_publishable_HxLMZ8O_mpwjoUtESdjNvw_wg3IYWOb";

export type LeadInput = {
  name: string;
  mobile: string;
  ageGroup: "adult" | "child";
  reason: string;
  date: string;
  time: string;
  message?: string | undefined;
};

/** Formats a "YYYY-MM-DD" date as e.g. "Mon, 2 Nov 2026" (en-IN). */
export function prettyDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function timeLabel(value: string): string {
  const map: Record<string, string> = {
    morning: "Morning · 10:00 AM – 1:00 PM",
    afternoon: "Afternoon · 1:00 PM – 5:30 PM",
    evening: "Evening · 5:30 PM – 9:30 PM",
  };
  return map[value] ?? value;
}

export function buildLeadPayload(data: LeadInput) {
  const time = timeLabel(data.time);
  const messageParts = [data.reason];
  if (data.message) messageParts.push(`Additional note: ${data.message}`);
  return {
    name: data.name,
    phone: data.mobile,
    budget: data.ageGroup === "adult" ? "Adult" : "Child",
    appointment_date: `${prettyDate(data.date)} · ${time}`,
    message: messageParts.join(" — "),
    reason: data.reason,
    time_preference: time,
  };
}

export async function submitLead(data: LeadInput): Promise<void> {
  const response = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: {
      apikey: LEAD_API_KEY,
      Authorization: `Bearer ${LEAD_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      page_id: LEAD_PAGE_ID,
      data: buildLeadPayload(data),
    }),
  });
  if (!response.ok) {
    throw new Error(`Lead submission failed (${response.status})`);
  }
}
