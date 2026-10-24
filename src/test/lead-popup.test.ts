import { describe, expect, it } from "vitest";
import { LEAD_API_KEY, LEAD_ENDPOINT, LEAD_PAGE_ID, buildLeadPayload } from "@/lib/leadCapture";

describe("lead capture pop-up integration", () => {
  it("targets the configured DigiWil landing page endpoint and key", () => {
    expect(LEAD_ENDPOINT).toContain("landing_page_submissions");
    expect(LEAD_PAGE_ID).toBe("10343958-a861-47fb-9323-1e1ca91f0fc2");
    expect(LEAD_API_KEY).toBeDefined();
  });

  it("correctly maps pop-up enquiry fields to DigiWil payload format", () => {
    const popupData = {
      name: "Rahul Sharma",
      mobile: "9876543210",
      ageGroup: "adult" as const,
      reason: "Back & Joint Pain Relief",
      date: "2026-10-24",
      time: "morning",
      message: "Enquiry submitted via website lead capture pop-up",
    };

    const payload = buildLeadPayload(popupData);

    expect(payload.name).toBe("Rahul Sharma");
    expect(payload.phone).toBe("9876543210");
    expect(payload.budget).toBe("Adult");
    expect(payload.reason).toBe("Back & Joint Pain Relief");
    expect(payload.time_preference).toBe("Morning · 10:00 AM – 1:00 PM");
    expect(payload.message).toContain("Back & Joint Pain Relief");
    expect(payload.message).toContain("Enquiry submitted via website lead capture pop-up");
  });

  it("handles custom health concerns entered via popup", () => {
    const customData = {
      name: "Sunita Patel",
      mobile: "94150 26684",
      ageGroup: "adult" as const,
      reason: "Other: Chronic migraine and insomnia",
      date: "2026-10-25",
      time: "evening",
      message: "Enquiry submitted via website lead capture pop-up",
    };

    const payload = buildLeadPayload(customData);

    expect(payload.name).toBe("Sunita Patel");
    expect(payload.reason).toBe("Other: Chronic migraine and insomnia");
    expect(payload.time_preference).toBe("Evening · 5:30 PM – 9:30 PM");
  });
});
