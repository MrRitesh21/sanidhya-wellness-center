import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Compass,
  Flower2,
  HeartHandshake,
  Info,
  Leaf,
  Phone,
  Salad,
  Sparkles,
  Sprout,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { clinic, services, type ServiceItem } from "@/lib/clinic";
import { LeafSprig, Reveal, SectionHeading } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      {
        title: "Services & Therapies | Sanidhya Naturopathy Center Lucknow",
      },
      {
        name: "description",
        content:
          "Explore holistic naturopathy services at Sanidhya Naturopathy Center, Jankipuram, Lucknow. Naturopathy consultations, yoga guidance, diet counselling, stress relief and wellness plans.",
      },
      {
        name: "keywords",
        content:
          "Naturopathy services Lucknow, Holistic healing Jankipuram, Diet nutrition guidance Lucknow, Stress management naturopathy, Yoga guidance Jankipuram",
      },
      {
        property: "og:title",
        content: "Services & Therapies | Sanidhya Naturopathy Center Lucknow",
      },
      {
        property: "og:description",
        content:
          "Explore our personalized naturopathic therapies and wellness consultations designed to restore energy, relieve chronic stress, and nurture natural balance.",
      },
    ],
  }),
  component: ServicesPage,
});

type ServiceDetail = ServiceItem & {
  category: "consultation" | "mind-movement" | "diet-lifestyle";
  duration: string;
  benefits: string[];
  whatToExpect: string;
};

const DETAILED_SERVICES: ServiceDetail[] = [
  {
    id: "consultation",
    title: "Naturopathy Consultation",
    category: "consultation",
    duration: "45–60 Minutes",
    icon: "leaf",
    description:
      "A comprehensive, calm evaluation of your whole health picture, looking beyond isolated symptoms to identify foundational imbalances.",
    benefits: [
      "In-depth discussion of sleep, digestion, stress, and routine",
      "Identification of root factors influencing fatigue and pain",
      "Personalised guidance shaped specifically around your life",
    ],
    whatToExpect:
      "You will sit in a private, unhurried environment with our specialist. We will review past health history, current habits, and craft an immediate, gentle action plan.",
  },
  {
    id: "wellness-guidance",
    title: "Natural Wellness Guidance",
    category: "diet-lifestyle",
    duration: "30–45 Minutes",
    icon: "sprout",
    description:
      "Practical daily living adjustments rooted in traditional natural philosophy: waking rhythms, hydration routines, and sun exposure.",
    benefits: [
      "Practical circadian rhythm (Dinacharya) guidance",
      "Improved daytime energy and deeper night-time sleep",
      "Zero invasive methods — pure natural routine alignment",
    ],
    whatToExpect:
      "A step-by-step breakdown of your day from morning to evening, identifying small, high-impact changes to your daily schedule.",
  },
  {
    id: "lifestyle-counselling",
    title: "Lifestyle & Wellness Counselling",
    category: "consultation",
    duration: "45 Minutes",
    icon: "heart",
    description:
      "Compassionate, structured support to help you understand emotional triggers, stress patterns, and how daily choices impact physical wellbeing.",
    benefits: [
      "Supportive space to talk through habit roadblocks",
      "Strategies to break cycles of burnout and sedentary fatigue",
      "Customised pacing that never feels overwhelming",
    ],
    whatToExpect:
      "Open conversation exploring how mental stressors manifest as physical tension. You will receive practical tools for boundary setting and restorative downtime.",
  },
  {
    id: "yoga-relaxation",
    title: "Yoga & Relaxation Guidance",
    category: "mind-movement",
    duration: "40–60 Minutes",
    icon: "flower",
    description:
      "Gentle therapeutic yoga postures, joint mobility, and guided relaxation techniques matched comfortably to your physical capacity.",
    benefits: [
      "Relief for stiff joints, lower back discomfort, and neck tightness",
      "Restoration of natural diaphragmatic breathing",
      "Accessible for beginners, seniors, and those with physical limitations",
    ],
    whatToExpect:
      "Clear, patient demonstration of gentle restorative poses and breathwork, tailored so you can easily continue them safely at home.",
  },
  {
    id: "diet-nutrition",
    title: "Diet & Nutrition Guidance",
    category: "diet-lifestyle",
    duration: "40 Minutes",
    icon: "salad",
    description:
      "Thoughtful, seasonal nutritional advice built on wholesome, easily digestible foods (Satvik principles) tailored to Indian households.",
    benefits: [
      "Targeted support for sluggish digestion, bloating, and acidity",
      "Guidance on seasonal fruits, local vegetables, and herbal infusions",
      "No extreme calorie counting or unrealistic restrictions",
    ],
    whatToExpect:
      "We examine your current kitchen routine and meal timings, recommending nourishing replacements, digestive spices, and balanced meal compositions.",
  },
  {
    id: "stress-mindfulness",
    title: "Stress Management & Mindfulness",
    category: "mind-movement",
    duration: "35–45 Minutes",
    icon: "wind",
    description:
      "Calming mindfulness routines and specific Pranayama (breathwork) exercises to quiet an overstimulated nervous system and relieve anxiety.",
    benefits: [
      "Down-regulates fight-or-flight sympathetic nervous response",
      "Helps quiet racing thoughts before sleep",
      "Quick 5-minute techniques you can use during stressful work hours",
    ],
    whatToExpect:
      "Guided practice in rhythmic breathing and gentle mindfulness meditation, leaving you feeling grounded and refreshed.",
  },
  {
    id: "holistic-planning",
    title: "Holistic Wellness Planning",
    category: "consultation",
    duration: "60 Minutes",
    icon: "compass",
    description:
      "A complete, integrated roadmap synthesising diet, movement, sleep, relaxation, and habit routines into a structured monthly plan.",
    benefits: [
      "Comprehensive, all-in-one written protocol",
      "Clear milestones for tracking physical comfort and energy",
      "Designed for long-term sustainability rather than quick fixes",
    ],
    whatToExpect:
      "A comprehensive review that combines insights from diet, movement, and lifestyle into a cohesive, printed or digital wellness guide.",
  },
  {
    id: "followups",
    title: "Follow-up Consultations",
    category: "consultation",
    duration: "30 Minutes",
    icon: "calendar",
    description:
      "Consistent check-ins to evaluate your progress, celebrate improvements, troubleshoot difficulties, and adapt your protocol as your body heals.",
    benefits: [
      "Accountability and compassionate encouragement",
      "Fine-tuning of dietary and herbal recommendations",
      "Ensures continuous, lasting wellness momentum",
    ],
    whatToExpect:
      "A focused conversation reviewing what worked well, what felt challenging, and updating your plan for the coming weeks.",
  },
];

const ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  sprout: Sprout,
  heart: HeartHandshake,
  flower: Flower2,
  salad: Salad,
  wind: Wind,
  compass: Compass,
  calendar: CalendarCheck,
};

const CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "consultation", label: "Consultations & Planning" },
  { id: "diet-lifestyle", label: "Diet & Lifestyle" },
  { id: "mind-movement", label: "Mind & Movement" },
] as const;

const STEPS = [
  {
    num: "01",
    title: "Initial Consultation",
    desc: "We listen attentively to your health background, complaints, and routine without rush.",
  },
  {
    num: "02",
    title: "Tailored Protocol",
    desc: "A personalized natural plan is shaped combining diet, rest, movement, and habit changes.",
  },
  {
    num: "03",
    title: "Gentle Practice",
    desc: "You incorporate the practical steps into your home life with simple, accessible methods.",
  },
  {
    num: "04",
    title: "Review & Support",
    desc: "Follow-up sessions measure positive changes and refine the protocol for lifelong vitality.",
  },
];

function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredServices =
    activeCategory === "all"
      ? DETAILED_SERVICES
      : DETAILED_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-ivory py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-sage-soft/50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-beige/60 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
                <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden="true" />
                Comprehensive Holistic Care
                <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden="true" />
              </p>
              <h1 className="mt-4 font-display text-4xl font-medium leading-[1.15] text-forest sm:text-6xl">
                Services & Therapies for <em className="italic text-gold-deep">Natural Vitality</em>
                .
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Each therapy at Sanidhya Naturopathy Center is designed to harmonize your lifestyle,
                relieve chronic tension, and support the body's self-healing mechanisms.
              </p>
            </Reveal>

            {/* Filter Tabs */}
            <Reveal delay={0.15} className="mt-10 flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "border border-forest/15 bg-white/70 text-forest hover:bg-white",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {filteredServices.map((service, i) => {
              const Icon = ICONS[service.icon] ?? Leaf;
              return (
                <Reveal key={service.id} delay={0.06 * (i % 2)}>
                  <article className="group flex h-full flex-col justify-between rounded-3xl border border-beige bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-ivory">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <div className="flex items-center gap-1.5 rounded-full bg-ivory px-3 py-1 text-xs font-medium text-forest">
                          <Clock className="h-3.5 w-3.5 text-gold-deep" aria-hidden="true" />
                          <span>{service.duration}</span>
                        </div>
                      </div>

                      <h3 className="mt-5 font-display text-2xl font-semibold text-forest">
                        {service.title}
                      </h3>

                      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>

                      {/* Benefits */}
                      <div className="mt-6 border-t border-beige/60 pt-5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gold-deep">
                          Key Benefits
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {service.benefits.map((b) => (
                            <li key={b} className="flex items-start gap-2.5 text-sm text-charcoal">
                              <CheckCircle2
                                className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                                aria-hidden="true"
                              />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* What to Expect */}
                      <div className="mt-5 rounded-2xl bg-ivory/70 p-4 text-xs text-muted-foreground">
                        <span className="font-semibold text-forest">What to expect: </span>
                        {service.whatToExpect}
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-8 flex items-center justify-between border-t border-beige/60 pt-5">
                      <Link
                        to="/booking"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep"
                      >
                        Enquire for this Service
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <a
                        href={clinic.phoneHref}
                        className="text-xs font-semibold text-forest hover:text-gold-deep transition-colors"
                      >
                        Ask by Phone
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* Advisory Notice */}
          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 flex max-w-3xl items-start gap-3.5 rounded-3xl border border-beige bg-white/80 p-5 shadow-soft">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                <strong>Advisory Note:</strong> The services and approaches listed above are
                oriental medicine and naturopathic wellness programs. Each protocol is individually
                discussed and agreed upon with the centre. If you have preexisting acute medical
                conditions, please bring relevant diagnostic records.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The 4-Step Healing Journey */}
      <section className="relative overflow-hidden bg-forest py-20 sm:py-28 text-ivory">
        <LeafSprig className="absolute -right-8 top-10 h-24 w-48 text-ivory/10" />
        <LeafSprig className="absolute bottom-8 left-8 h-16 w-32 -scale-x-100 text-ivory/10" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            tone="light"
            eyebrow="The Healing Process"
            title={
              <>
                How We Structure Your <em className="italic text-gold">Wellness Journey</em>.
              </>
            }
            description="A clear, progressive approach ensuring that health changes feel natural, gradual, and enduring."
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="relative rounded-3xl border border-ivory/15 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:border-ivory/30 hover:bg-white/10">
                  <span className="font-display text-4xl font-semibold text-gold">{step.num}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ivory">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/75">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative overflow-hidden bg-ivory py-16 sm:py-24">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <SectionHeading
            eyebrow="Personalized Guidance"
            title={
              <>
                Not sure which service is <em className="italic text-gold-deep">right for you</em>?
              </>
            }
            description="Our practitioners will happily listen to your concerns and guide you toward the most appropriate starting consultation."
          />
          <Reveal delay={0.15} className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-forest-deep active:scale-95"
            >
              Book an Assessment
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={clinic.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-8 py-4 text-base font-semibold text-forest shadow-soft transition-colors hover:border-forest/40 active:scale-95"
            >
              <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
              Call {clinic.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
