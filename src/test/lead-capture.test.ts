import { describe, expect, it } from "vitest";
import { LEAD_API_KEY, LEAD_ENDPOINT, LEAD_PAGE_ID, buildLeadPayload } from "@/lib/leadCapture";

const base = {
  name: "Asha Verma",
  mobile: "94150 26684",
  ageGroup: "adult" as const,
  reason: "Back pain relief",
  date: "2026-11-02",
  time: "morning",
};

describe("lead capture", () => {
  it("targets the clinic's DigiWil leads table", () => {
    expect(LEAD_ENDPOINT).toBe(
      "https://urcwyuvrwlmzxdsbecns.supabase.co/rest/v1/landing_page_submissions",
    );
    expect(LEAD_PAGE_ID).toBe("10343958-a861-47fb-9323-1e1ca91f0fc2");
    expect(LEAD_API_KEY.startsWith("sb_publishable_")).toBe(true);
  });

  it("maps form fields onto the embed's field keys", () => {
    const payload = buildLeadPayload(base);
    expect(payload.name).toBe("Asha Verma");
    expect(payload.phone).toBe("94150 26684");
    expect(payload.budget).toBe("Adult");
    expect(payload.appointment_date).toContain("Nov");
    expect(payload.message).toContain("Back pain relief");
  });

  it("labels child enquiries", () => {
    expect(buildLeadPayload({ ...base, ageGroup: "child" }).budget).toBe("Child");
  });

  it("appends the optional note to the message", () => {
    const payload = buildLeadPayload({
      ...base,
      message: "Prefers evening calls",
    });
    expect(payload.message).toContain("Additional note: Prefers evening calls");
  });
});
