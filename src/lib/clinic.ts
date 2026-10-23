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
  accessibility:
    "A wheelchair-accessible entrance and parking are available for visitors.",
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
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

const dayMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
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
  const parts = Object.fromEntries(
    fmt.formatToParts(now).map((p) => [p.type, p.value]),
  );
  const weekday = parts.weekday as string;
  let h = Number(parts.hour);
  if (h === 24) h = 0; // some engines return "24" at midnight
  const nowMins = h * 60 + Number(parts.minute);

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
];
