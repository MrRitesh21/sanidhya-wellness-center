import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Brain,
  CalendarCheck,
  Compass,
  Droplets,
  Flame,
  Flower2,
  Hand,
  HeartHandshake,
  History,
  Layers,
  Leaf,
  Moon,
  Salad,
  Shield,
  Smile,
  Sparkles,
  Sprout,
  Sun,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/clinic";
import { Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";
import { openBookingModal } from "@/lib/bookingModal";

const ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  sprout: Sprout,
  heart: HeartHandshake,
  flower: Flower2,
  salad: Salad,
  wind: Wind,
  compass: Compass,
  calendar: CalendarCheck,
  droplets: Droplets,
  layers: Layers,
  flame: Flame,
  hand: Hand,
  sparkles: Sparkles,
  sun: Sun,
  moon: Moon,
  brain: Brain,
  award: Award,
  history: History,
  shield: Shield,
  "heart-handshake": HeartHandshake,
  smile: Smile,
};

const HOME_CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "naturopathy", label: "Naturopathy Therapies" },
  { id: "yoga", label: "Yoga & Relaxation" },
  { id: "reiki", label: "Reiki & Spiritual" },
  { id: "consultation", label: "Consultation & Diet" },
] as const;

const SERVICE_CATEGORY_MAP: Record<string, string> = {
  consultation: "consultation",
  "wellness-guidance": "consultation",
  "lifestyle-counselling": "consultation",
  "yoga-relaxation": "yoga",
  "diet-nutrition": "consultation",
  "stress-mindfulness": "yoga",
  "holistic-planning": "consultation",
  followups: "consultation",
  hydrotherapy: "naturopathy",
  "mud-therapy": "naturopathy",
  "steam-bath": "naturopathy",
  acupressure: "naturopathy",
  sujok: "naturopathy",
  "yoga-classes": "yoga",
  "yoga-nidra": "yoga",
  meditation: "yoga",
  "reiki-healing": "reiki",
  "reiki-training": "reiki",
  "past-life-regression": "reiki",
  srt: "reiki",
  "spiritual-therapy": "reiki",
  "mental-wellbeing": "consultation",
  "stress-management": "consultation",
};

export function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => SERVICE_CATEGORY_MAP[s.id] === activeCategory);

  return (
    <section id="services" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-sage-soft/40 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services & wellness areas"
          title={
            <>
              Care, Shaped Around <em className="italic text-gold-deep">You</em>.
            </>
          }
          description="Wellness areas the centre can guide you through — each beginning with a conversation about what you need."
        />

        {/* Filter categories */}
        <Reveal delay={0.08} className="mt-8 flex flex-wrap justify-center gap-2">
          {HOME_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "border border-forest/15 bg-white/70 text-forest hover:bg-white",
              )}
            >
              {cat.label}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredServices.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Leaf;
            return (
              <Reveal key={service.id} delay={(i % 4) * 0.08}>
                <article className="group flex h-full flex-col rounded-3xl border border-beige bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-soft text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-ivory">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.35rem] font-semibold leading-snug text-forest">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <Link
                    to="/booking"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep transition-colors hover:text-forest"
                    aria-label={`Enquire about ${service.title}`}
                  >
                    Enquire about this
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/80 px-7 py-3.5 text-sm font-semibold text-forest shadow-soft transition-colors duration-300 hover:border-forest/40 hover:bg-white active:scale-[0.98]"
            >
              Explore Full Therapies & Consultation Guide &rarr;
            </Link>
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-colors duration-300 hover:bg-forest-deep active:scale-[0.98]"
            >
              Book Consultation Now
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            Service availability is confirmed directly with the clinic during your enquiry — this
            list is indicative and may vary.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
