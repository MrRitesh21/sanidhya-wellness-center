/**
 * Single source of truth for clinic information shown on the website.
 *
 * SERVICES NOTE: the service list below is *proposed* content. Before
 * publishing publicly, the clinic owner must confirm each service is
 * actually offered — edit or remove entries here; the page renders
 * whatever this list contains.
 */

export const clinic = {
  name: "Sanidhya Naturopathy Center",
  category: "Oriental Medicine Clinic",
  tagline: "Naturopathy & Holistic Wellness",
  description:
    "A welcoming space in Jankipuram, Lucknow to learn about natural wellness approaches and discuss your individual health and wellbeing goals.",
  address: {
    line1: "H-D/98, Sector I Main Road",
    line2: "Sector I, Janki Vihar Colony",
    area: "Jankipuram",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pin: "226021",
  },
  phoneDisplay: "+91 94150 26684",
  phoneHref: "tel:+919415026684",
  whatsappNumber: "919415026684",
  mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJJ80omK1XmTkRSp7MzWn02MU",
  reviewsUrl: "https://search.google.com/local/reviews?placeid=ChIJJ80omK1XmTkRSp7MzWn02MU",
  rating: 4.7,
  reviewCount: 48,
  timezone: "Asia/Kolkata",
  accessibility: "A wheelchair-accessible entrance and parking are available for visitors.",
} as const;

export const fullAddress = `${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.area}, ${clinic.address.city}, ${clinic.address.state} ${clinic.address.pin}`;

export const hours = [
  { day: "Monday", open: "10:00", close: "21:30" },
  { day: "Tuesday", open: "10:00", close: "21:30" },
  { day: "Wednesday", open: "10:00", close: "21:30" },
  { day: "Thursday", open: "10:00", close: "21:30" },
  { day: "Friday", open: "10:00", close: "21:30" },
  { day: "Saturday", open: "10:00", close: "21:30" },
  { day: "Sunday", open: "10:00", close: "14:00" },
] as const;

/** Formats a 24h "HH:mm" string as e.g. "9:30 PM" (en-IN). */
export function formatTime(hhmm: string): string {
  const bits = hhmm.split(":");
  const h = Number(bits[0] ?? 0);
  const m = Number(bits[1] ?? 0);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

const dayMinutes = (hhmm: string) => {
  const bits = hhmm.split(":");
  const h = Number(bits[0] ?? 0);
  const m = Number(bits[1] ?? 0);
  return h * 60 + m;
};

/** Accurate open/closed status in the clinic's own time zone. */
export function getOpenStatus(now: Date = new Date()): {
  open: boolean;
  label: string;
} {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: clinic.timezone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, p.value]));
  const weekday = parts["weekday"] as string;
  let h = Number(parts["hour"]);
  if (h === 24) h = 0; // some engines return "24" at midnight
  const nowMins = h * 60 + Number(parts["minute"]);

  const today = hours.find((d) => d.day === weekday);
  if (today) {
    const open = dayMinutes(today.open);
    const close = dayMinutes(today.close);
    if (nowMins >= open && nowMins < close) {
      return { open: true, label: `Open now · closes ${formatTime(today.close)}` };
    }
    if (nowMins < open) {
      return { open: false, label: `Closed · opens today at ${formatTime(today.open)}` };
    }
  }
  for (let i = 1; i <= 7; i++) {
    const next = hours[(hours.findIndex((d) => d.day === weekday) + i) % 7];
    if (next) {
      const when = i === 1 ? "tomorrow" : next.day;
      return { open: false, label: `Closed · opens ${when} at ${formatTime(next.open)}` };
    }
  }
  return { open: false, label: "" };
}

export const defaultWhatsappEnquiry =
  "Hello Sanidhya Naturopathy Center, I would like to enquire about an appointment. Please share the available timings.";

export function whatsappLink(message: string = defaultWhatsappEnquiry): string {
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Proposed service categories — confirm with the clinic before relying on
 * them publicly. Each entry drives one card in the Services section.
 */
export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const services: ServiceItem[] = [
  {
    id: "consultation",
    title: "Naturopathy Consultation",
    description:
      "A calm, unhurried conversation about your health goals and the natural wellness approaches the centre can guide you through.",
    icon: "leaf",
  },
  {
    id: "wellness-guidance",
    title: "Natural Wellness Guidance",
    description:
      "Everyday, practical guidance rooted in natural living — rest, routine and gentle habits that support your wellbeing.",
    icon: "sprout",
  },
  {
    id: "lifestyle-counselling",
    title: "Lifestyle & Wellness Counselling",
    description:
      "Support in understanding how daily choices shape how you feel, with suggestions tailored to your routine.",
    icon: "heart",
  },
  {
    id: "yoga-relaxation",
    title: "Yoga & Relaxation Guidance",
    description:
      "Gentle yoga and relaxation practices, introduced at a comfortable pace for your level of experience.",
    icon: "flower",
  },
  {
    id: "diet-nutrition",
    title: "Diet & Nutrition Guidance",
    description:
      "Thoughtful dietary suggestions centred on fresh, seasonal and balanced eating that fits your lifestyle.",
    icon: "salad",
  },
  {
    id: "stress-mindfulness",
    title: "Stress Management & Mindfulness",
    description:
      "Simple mindfulness and breathing techniques to help you unwind and restore a sense of calm.",
    icon: "wind",
  },
  {
    id: "holistic-planning",
    title: "Holistic Wellness Planning",
    description:
      "A personalised wellness plan that brings together diet, routine, movement and relaxation in one place.",
    icon: "compass",
  },
  {
    id: "followups",
    title: "Follow-up Consultations",
    description:
      "Ongoing check-ins to review how you're doing and adjust your wellness plan as your needs evolve.",
    icon: "calendar",
  },
  // Newly integrated services from clinic brochures:
  {
    id: "hydrotherapy",
    title: "Hydrotherapy",
    description:
      "Targeted water-based natural applications — hip baths, spinal sprays, and compresses designed to stimulate circulation and metabolic vitality.",
    icon: "droplets",
  },
  {
    id: "mud-therapy",
    title: "Mud Therapy",
    description:
      "Therapeutic natural earth and clay applications that absorb excess body heat, cool inflammation, and soothe the skin and digestive tract.",
    icon: "layers",
  },
  {
    id: "steam-bath",
    title: "Steam Bath",
    description:
      "Warm herbal and natural perspiration baths that release accumulated toxins, relax tense muscle groups, and invigorate skin pores.",
    icon: "flame",
  },
  {
    id: "acupressure",
    title: "Acupressure",
    description:
      "Gentle manual pressure on reflex meridian points to alleviate localized discomfort, release energy blockages, and promote neuromuscular balance.",
    icon: "hand",
  },
  {
    id: "sujok",
    title: "Sujok Therapy",
    description:
      "Oriental micro-reflex therapy utilizing responsive correspondence points on hands and feet to harmonize systemic organ functions.",
    icon: "sparkles",
  },
  {
    id: "yoga-classes",
    title: "Regular Yoga Classes",
    description:
      "Structured group and personal asana practice focusing on joint mobility, gentle spinal stretches, posture alignment, and steady stamina.",
    icon: "sun",
  },
  {
    id: "yoga-nidra",
    title: "Yoga Nidra",
    description:
      "Guided conscious yogic relaxation that systematically unwinds deep physical, emotional, and mental tensions to restore profound rest.",
    icon: "moon",
  },
  {
    id: "meditation",
    title: "Meditation & Breathwork",
    description:
      "Mindful stillness practices and rhythmic Pranayama designed to clear cognitive clutter, enhance attention, and stabilize emotional balance.",
    icon: "brain",
  },
  {
    id: "reiki-healing",
    title: "Reiki Healing",
    description:
      "Gentle, non-invasive bio-field energy harmonization that channels universal life force to dissolve stress, harmonize chakras, and aid recovery.",
    icon: "sparkles",
  },
  {
    id: "reiki-training",
    title: "Reiki Training (Level I & II)",
    description:
      "Comprehensive certification courses covering traditional attunements, self-healing techniques, hand placements, and practitioner protocols.",
    icon: "award",
  },
  {
    id: "past-life-regression",
    title: "Past Life Regression",
    description:
      "Deeply guided meditative introspection exploring subconscious impressions to gain emotional clarity, resolve deep-seated patterns, and find inner peace.",
    icon: "history",
  },
  {
    id: "srt",
    title: "S.R.T. (Spiritual Response Therapy)",
    description:
      "A systematic spiritual research and energy-clearing modality designed to release recurring subconscious blocks and discordant emotional patterns.",
    icon: "shield",
  },
  {
    id: "spiritual-therapy",
    title: "Spiritual Therapy",
    description:
      "Holistic soul-level counselling fostering deeper self-awareness, emotional grounding, harmonious purpose, and inner tranquility.",
    icon: "heart-handshake",
  },
  {
    id: "mental-wellbeing",
    title: "Mental Wellbeing Consultation",
    description:
      "A confidential, supportive space exploring anxiety, mental fatigue, and emotional burnout through natural lifestyle coping approaches.",
    icon: "smile",
  },
  {
    id: "stress-management",
    title: "Stress Management Guidance",
    description:
      "Personalized daily protocols combining breathing, restorative evening habits, and relaxation techniques to mitigate chronic stress.",
    icon: "wind",
  },
];

/**
 * Health-concern enquiry categories from the clinic brochure.
 * Note: These are enquiry categories for natural, lifestyle, and yogic guidance,
 * not medical diagnoses, promises of cure, or replacements for conventional care.
 */
export const HEALTH_CONCERN_ENQUIRIES = [
  "Cervical Spondylosis",
  "Back Pain",
  "Polio-related Concerns",
  "Parkinson's Disease",
  "High and Low Blood Pressure",
  "Digestive Concerns",
  "Diabetes / Blood Sugar Support",
  "Numbness or Tingling in Hands and Feet",
  "Slip Disc",
  "Sciatica",
  "Mental Health Concerns",
  "Stress, Fatigue & Sleep",
  "Weight Management & Detox",
  "Reiki Healing & Training Courses",
  "Hydrotherapy & Steam Bath Enquiry",
] as const;
