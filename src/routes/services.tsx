import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Compass,
  Droplets,
  Flame,
  Flower2,
  GraduationCap,
  Hand,
  HeartHandshake,
  History,
  Info,
  Layers,
  Leaf,
  MessageCircle,
  Moon,
  Phone,
  Salad,
  Shield,
  Smile,
  Sparkles,
  Sprout,
  Sun,
  Waves,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { clinic, services, whatsappLink, type ServiceItem } from "@/lib/clinic";
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
          "Explore holistic naturopathy services at Sanidhya Naturopathy Center, Jankipuram, Lucknow. Naturopathy consultations, hydrotherapy, mud therapy, steam bath, acupressure, sujok, yoga classes, meditation, and certified Reiki training.",
      },
      {
        name: "keywords",
        content:
          "Naturopathy services Lucknow, Hydrotherapy Lucknow, Mud therapy Jankipuram, Steam bath, Acupressure, Sujok, Yoga classes, Reiki healing Lucknow, Reiki Level 1 2 courses, Past life regression Lucknow, Holistic health center",
      },
      {
        property: "og:title",
        content: "Services & Therapies | Sanidhya Naturopathy Center Lucknow",
      },
      {
        property: "og:description",
        content:
          "Personalized naturopathic therapies, yoga, meditation, hydrotherapy, acupressure, and certified Reiki courses in Jankipuram, Lucknow.",
      },
    ],
  }),
  component: ServicesPage,
});

type ServiceDetail = ServiceItem & {
  category:
    | "consultation"
    | "mind-movement"
    | "diet-lifestyle"
    | "naturopathy-therapies"
    | "yoga-relaxation"
    | "reiki-spiritual";
  duration: string;
  benefits: string[];
  whatToExpect: string;
};

const DETAILED_SERVICES: ServiceDetail[] = [
  // Original Services Preserved in Full:
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

  // Newly Added Natural Therapies & Modalities from Clinic Brochures:
  {
    id: "hydrotherapy",
    title: "Hydrotherapy",
    category: "naturopathy-therapies",
    duration: "30–45 Minutes",
    icon: "droplets",
    description:
      "Traditional water therapy using varied temperature applications — hip baths, spinal sprays, and localized compresses — to stimulate circulation and metabolic elimination.",
    benefits: [
      "Improves pelvic, spinal, and peripheral micro-circulation",
      "Gentle natural relief for digestive sluggishness and abdominal congestion",
      "Restores autonomic nervous balance and healthy thermoregulation",
    ],
    whatToExpect:
      "Conducted in clean, dedicated hydrotherapy facilities under practitioner supervision, tailored precisely to your physical comfort.",
  },
  {
    id: "mud-therapy",
    title: "Mud Therapy",
    category: "naturopathy-therapies",
    duration: "30–45 Minutes",
    icon: "layers",
    description:
      "Therapeutic natural clay and solar-enriched earth packs applied to specific areas to draw out metabolic heat, cool inflammation, and soothe the digestive tract.",
    benefits: [
      "Natural cooling relief for chronic acidity and abdominal heat",
      "Draws out skin impurities and calms localized swelling",
      "Soothes tension across the forehead, eyes, and lower abdomen",
    ],
    whatToExpect:
      "Clean, solar-prepared therapeutic mud packs applied while you rest comfortably in a calm, ambient room.",
  },
  {
    id: "steam-bath",
    title: "Steam Bath & Herbal Fomentation",
    category: "naturopathy-therapies",
    duration: "20–30 Minutes",
    icon: "flame",
    description:
      "Therapeutic herbal and aromatic steam chamber therapy designed to induce gentle perspiration, open pores, ease muscular stiffness, and boost circulation.",
    benefits: [
      "Promotes natural dermal pore cleansing and detoxification",
      "Relieves deep muscular knots, lumbar tension, and stiffness",
      "Helps clear nasal and upper respiratory passages",
    ],
    whatToExpect:
      "You recline comfortably in a dedicated wooden steam chamber with your head kept outside in cool, fresh air, followed by a refreshing rinse.",
  },
  {
    id: "acupressure",
    title: "Acupressure Therapy",
    category: "naturopathy-therapies",
    duration: "35–45 Minutes",
    icon: "hand",
    description:
      "Targeted manual pressure along key reflexive meridian channels to relieve chronic back pain, cervical stiffness, sciatica tension, and improve energetic vitality.",
    benefits: [
      "Relief for cervical spondylosis, lower back discomfort, and neck tightness",
      "Improves nerve conductivity and neuromuscular responsiveness",
      "Non-invasive, deeply relaxing technique that releases endorphins",
    ],
    whatToExpect:
      "Patient, systematic thumb and finger pressure along meridian pathways by a trained practitioner, promoting instant localized relief.",
  },
  {
    id: "sujok",
    title: "Sujok Therapy",
    category: "naturopathy-therapies",
    duration: "30–40 Minutes",
    icon: "sparkles",
    description:
      "An advanced oriental micro-reflexology modality that stimulates corresponding reflex zones on the palms and soles to harmonize organ functions.",
    benefits: [
      "Remote reflex stimulation for spinal, joint, and musculoskeletal pain",
      "Aids in relieving numbness, tingling, and chronic localized tension",
      "Provides accessible self-care knowledge you can practice at home",
    ],
    whatToExpect:
      "Gentle diagnostic exploration and stimulation of hand/foot points using specialized probes, micro-magnets, or natural seeds.",
  },

  // Yoga & Relaxation Additions:
  {
    id: "yoga-classes",
    title: "Regular Yoga Classes",
    category: "yoga-relaxation",
    duration: "60 Minutes",
    icon: "sun",
    description:
      "Structured regular and daily asana sessions focusing on joint mobility (Sukshma Vyayama), spine flexibility, balance, and mindful breathing.",
    benefits: [
      "Builds spinal flexibility, core stability, and graceful posture",
      "Supports cardiovascular endurance and metabolic balance",
      "Adaptive modifications available for beginners and seniors",
    ],
    whatToExpect:
      "Conducted in a tranquil, airy yoga hall with gentle pacing, posture corrections, and alignment adjustments suited to your body.",
  },
  {
    id: "yoga-nidra",
    title: "Yoga Nidra",
    category: "yoga-relaxation",
    duration: "45 Minutes",
    icon: "moon",
    description:
      "Traditional yogic psychic sleep providing conscious, deep relaxation that releases deep-seated muscular, mental, and emotional holding patterns.",
    benefits: [
      "Profound relief for chronic insomnia, stress, and nervous fatigue",
      "Systematically calms the sympathetic nervous system",
      "Leaves the mind revitalized, clear, and serenely peaceful",
    ],
    whatToExpect:
      "You recline comfortably on cushioned mats with closed eyes while a soothing voice guides your awareness through body-scan visualization.",
  },
  {
    id: "meditation",
    title: "Meditation & Breathwork",
    category: "yoga-relaxation",
    duration: "40–50 Minutes",
    icon: "brain",
    description:
      "Mindful stillness practices (Dhyana) coupled with classical Pranayama (Anulom Vilom, Bhramari, Sheetali) to stabilize thoughts and reduce stress.",
    benefits: [
      "Calms mental racing and chronic anxiety loops",
      "Regulates autonomic respiration and heart coherence",
      "Builds emotional equanimity and centered concentration",
    ],
    whatToExpect:
      "Step-by-step guidance in comfortable seating, breath pacing, and mental stillness in a quiet, distraction-free environment.",
  },

  // Reiki & Spiritual Wellness Additions:
  {
    id: "reiki-healing",
    title: "Reiki Healing",
    category: "reiki-spiritual",
    duration: "45–60 Minutes",
    icon: "sparkles",
    description:
      "Gentle, non-invasive bio-field energy harmonization channeling universal life energy to dissolve emotional stress, align chakras, and restore vitality.",
    benefits: [
      "Deep emotional pacification and nervous system soothing",
      "Clears stagnant energy blocks and aligns spiritual centers",
      "Completely gentle, non-contact or light-contact touch",
    ],
    whatToExpect:
      "You rest comfortably fully clothed on a therapy bed in a peaceful room while the practitioner gently channels Reiki energy across vital centers.",
  },
  {
    id: "reiki-training",
    title: "Reiki Training (Level I & II Certificate Courses)",
    category: "reiki-spiritual",
    duration: "Weekend / Multi-Day Intensive",
    icon: "award",
    description:
      "Formal certificate training programs in traditional Usui Reiki. Level I empowers personal self-healing and energy sensing; Level II teaches sacred symbols, distance healing, and practitioner ethics.",
    benefits: [
      "Receive authentic attunements from experienced Reiki Masters",
      "Comprehensive manuals, practical self-treatment, and partner exchanges",
      "Official Level I & Level II Certificate of Completion awarded",
    ],
    whatToExpect:
      "Interactive classroom instruction, attunement ceremonies, guided practice sessions, and lifelong skills to heal yourself and your family.",
  },
  {
    id: "past-life-regression",
    title: "Past Life Regression",
    category: "reiki-spiritual",
    duration: "90–120 Minutes",
    icon: "history",
    description:
      "A compassionate, guided meditative exploration of the subconscious mind to uncover spiritual impressions, resolve deep phobias, and understand relationship patterns.",
    benefits: [
      "Reveals the deeper roots of persistent emotional blockages",
      "Brings closure to unexplained fears, guilt, and emotional heaviness",
      "Provides expansive spiritual perspective on current life purpose",
    ],
    whatToExpect:
      "An unhurried preparatory talk followed by safe, gentle hypnotherapy guidance where you stay conscious, aware, and relaxed throughout.",
  },
  {
    id: "srt",
    title: "S.R.T. (Spiritual Response Therapy)",
    category: "reiki-spiritual",
    duration: "60–90 Minutes",
    icon: "shield",
    description:
      "A meticulous spiritual research and clearing methodology using specialized charts and ideomotor indicators to release subconscious limiting soul programming.",
    benefits: [
      "Identifies and clears subconscious discordant energies",
      "Assists in resolving recurring patterns in career and wellbeing",
      "Brings lightness, clarity, and renewed positive momentum",
    ],
    whatToExpect:
      "A quiet consultative clearing session guided by certified charts, identifying soul records and replacing them with harmonious energy.",
  },
  {
    id: "spiritual-therapy",
    title: "Spiritual Therapy",
    category: "reiki-spiritual",
    duration: "45–60 Minutes",
    icon: "heart-handshake",
    description:
      "Compassionate, soul-centered dialogue providing emotional grounding, forgiveness practices, and contemplative tools for profound inner tranquility.",
    benefits: [
      "Nurtures self-compassion, peace of mind, and purpose",
      "Supportive guidance during life transitions or emotional grief",
      "Harmonizes spiritual values with everyday domestic life",
    ],
    whatToExpect:
      "A safe, non-judgmental sanctuary for private conversations, guided reflections, and practical spiritual lifestyle habits.",
  },

  // Wellness Consultation Additions:
  {
    id: "mental-wellbeing",
    title: "Mental Wellbeing Consultation",
    category: "consultation",
    duration: "45–60 Minutes",
    icon: "smile",
    description:
      "A dedicated, confidential consultation exploring mental stress, fatigue, and burnout through holistic lifestyle adjustments and natural coping mechanisms.",
    benefits: [
      "Safe space to express concerns without clinical coldness",
      "Dietary and natural lifestyle routines supporting brain calm",
      "Actionable boundaries and restorative evening habits",
    ],
    whatToExpect:
      "An open, empathetic discussion analyzing lifestyle factors affecting mood, followed by a personalized, gentle action protocol.",
  },
  {
    id: "stress-management",
    title: "Stress Management Guidance",
    category: "consultation",
    duration: "45 Minutes",
    icon: "wind",
    description:
      "Practical, tailored guidance targeting occupational and lifestyle stressors, combining 5-minute workplace breathing routines and restorative sleep hygiene.",
    benefits: [
      "Down-regulates high sympathetic nervous tension",
      "Prevents physical symptoms like tension headaches and acidity",
      "Sustainable habits designed to fit seamlessly into busy days",
    ],
    whatToExpect:
      "A practical habit audit followed by the creation of realistic daily relaxation checkpoints you can practice anywhere.",
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

const CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "naturopathy-therapies", label: "Naturopathy Therapies" },
  { id: "yoga-relaxation", label: "Yoga & Relaxation" },
  { id: "reiki-spiritual", label: "Reiki & Spiritual Wellness" },
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

            {/* Filter Tabs — swipeable chips row on mobile, centered wrap on desktop */}
            <Reveal delay={0.15} className="mt-10">
              <div
                className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:px-0 sm:pb-0"
                role="tablist"
                aria-label="Filter services by category"
              >
                {CATEGORIES.map((cat) => {
                  const count =
                    cat.id === "all"
                      ? DETAILED_SERVICES.length
                      : DETAILED_SERVICES.filter((s) => s.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "flex min-h-[44px] shrink-0 snap-start items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-5",
                        activeCategory === cat.id
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "border border-forest/15 bg-white/70 text-forest hover:bg-white",
                      )}
                    >
                      {cat.label}
                      <span
                        className={cn(
                          "rounded-full px-1.5 text-[0.7rem] font-bold tabular-nums",
                          activeCategory === cat.id
                            ? "bg-white/25 text-primary-foreground"
                            : "bg-sage-soft/80 text-forest/80",
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
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
                  <article className="group flex h-full flex-col justify-between rounded-3xl border border-beige bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8">
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-ivory sm:h-14 sm:w-14">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                        </span>
                        <div className="flex items-center gap-1.5 rounded-full bg-ivory px-3 py-1 text-xs font-medium text-forest">
                          <Clock className="h-3.5 w-3.5 text-gold-deep" aria-hidden="true" />
                          <span>{service.duration}</span>
                        </div>
                      </div>

                      <h3 className="mt-4 font-display text-xl font-semibold text-forest sm:mt-5 sm:text-2xl">
                        {service.title}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
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

      {/* Reiki Training & Certificate Courses Showcase */}
      <section className="relative overflow-hidden bg-ivory py-20 sm:py-28 border-y border-beige">
        <div
          aria-hidden="true"
          className="absolute -right-36 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Certified Spiritual Learning"
            title={
              <>
                Reiki Training & <em className="italic text-gold-deep">Certificate Courses</em>.
              </>
            }
            description="Learn the authentic art of energy healing through structured Level I & Level II certificate training courses at Sanidhya Naturopathy Center."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Level I Card */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-between rounded-4xl border border-beige bg-white p-8 sm:p-10 shadow-soft transition-all duration-300 hover:shadow-lift">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                      <Sparkles className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-forest/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-forest">
                      Beginner to Intermediate
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-semibold text-forest sm:text-3xl">
                    Reiki Level I Course <span className="text-gold-deep">(1st Degree)</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    The fundamental initiation into Usui Reiki. Focuses on opening personal energy
                    channels, discovering energy sensitivity, and mastering self-healing protocols.
                  </p>

                  <div className="mt-6 space-y-3 border-t border-beige/60 pt-5 text-sm text-charcoal">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                      <span>Traditional sacred attunement ceremony by certified Reiki Masters</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                      <span>Complete 12 basic hand positions for self-treatment & family care</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                      <span>Chakra balancing techniques and energy clearing protocols</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                      <span>Comprehensive study manual and verified Certificate of Completion</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-beige/60 pt-6 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep"
                  >
                    Enquire for Level I Batches
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="text-xs font-medium text-muted-foreground">
                    Weekend & flexible schedules
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Level II Card */}
            <Reveal delay={0.2}>
              <div className="flex h-full flex-col justify-between rounded-4xl border border-gold/30 bg-gradient-to-br from-white via-white to-gold/5 p-8 sm:p-10 shadow-soft transition-all duration-300 hover:shadow-lift">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 text-gold-deep">
                      <Award className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-deep">
                      Advanced Practitioner
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-semibold text-forest sm:text-3xl">
                    Reiki Level II Course <span className="text-gold-deep">(2nd Degree)</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Deepen your healing potency significantly. Learn the three sacred Usui Reiki
                    symbols, distance healing across space and time, and emotional release
                    techniques.
                  </p>

                  <div className="mt-6 space-y-3 border-t border-beige/60 pt-5 text-sm text-charcoal">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                      <span>
                        Advanced 2nd-degree attunements to amplify your channeled energy flow
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                      <span>
                        Three sacred Usui symbols: Power (Cho Ku Rei), Mental/Emotional (Sei He Ki),
                        and Distance (Hon Sha Ze Sho Nen)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                      <span>
                        Techniques for absent / remote healing across geographical distance
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                      <span>
                        Professional practitioner ethics, client care protocols, and Level II
                        Certificate
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-beige/60 pt-6 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory shadow-soft transition-colors hover:bg-forest-deep"
                  >
                    Enquire for Level II Batches
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="text-xs font-medium text-muted-foreground">
                    Prerequisite: Reiki Level I
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Health-Concern Enquiry Categories Section */}
      <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Brochure Focus Areas"
            title={
              <>
                Health Concerns We Offer <em className="italic text-gold-deep">Natural Guidance</em>{" "}
                For.
              </>
            }
            description="Explore our specialized holistic consultation categories. Each enquiry receives an attentive assessment combining naturopathy, dietary correction, and gentle therapeutic routines."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Cervical Spondylosis",
                desc: "Gentle cervical traction routines, therapeutic acupressure, posture correction, and herbal fomentation for neck stiffness and radiating pain.",
                tag: "Spine & Neck",
              },
              {
                title: "Back Pain & Lumbar Stiffness",
                desc: "Spinal hydrotherapy sprays, warm mud packs, and specialized restorative asanas to decompress lumbar tension and strengthen spinal muscles.",
                tag: "Musculoskeletal",
              },
              {
                title: "Slip Disc & Disc Bulge Care",
                desc: "Carefully calibrated non-invasive alignments, gentle core-stabilizing movement, and anti-inflammatory naturopathic dietary guidance.",
                tag: "Spinal Health",
              },
              {
                title: "Sciatica Nerve Discomfort",
                desc: "Targeted acupressure along the sciatic meridian, nerve-flossing yogic stretches, and warm steam applications to calm radiating leg pain.",
                tag: "Nerve Relief",
              },
              {
                title: "Numbness & Tingling in Hands / Feet",
                desc: "Sujok micro-meridian stimulation, peripheral hydrotherapy foot/arm baths, and circulatory herbal packs to stimulate sluggish nerve signals.",
                tag: "Circulation & Nerve",
              },
              {
                title: "Digestive Concerns & Gut Sluggishness",
                desc: "Abdominal mud packs, Satvik dietary redesign, therapeutic hip baths, and herbal teas to soothe chronic acidity, bloating, and constipation.",
                tag: "Gut Health",
              },
              {
                title: "Diabetes / Blood Sugar Support",
                desc: "Lifestyle Dinacharya guidance, pancreatic stimulation through tailored asanas, seasonal low-glycemic dietary planning, and stress reduction.",
                tag: "Metabolic Vitality",
              },
              {
                title: "High & Low Blood Pressure",
                desc: "Autonomic nervous balancing via Pranayama, gentle relaxation therapies, restorative hydro-packs, and sodium-balanced whole-food nutrition.",
                tag: "Vascular Health",
              },
              {
                title: "Parkinson's Disease Holistic Support",
                desc: "Complementary gentle motor coordination exercises, soothing bio-field Reiki sessions, and nervous-system calming herbal lifestyle guidance.",
                tag: "Neurological Care",
              },
              {
                title: "Polio-related Mobility Concerns",
                desc: "Supportive hydrotherapy, non-strenuous passive joint mobilization, and compassionate wellness routines to sustain daily ease of movement.",
                tag: "Mobility Support",
              },
              {
                title: "Mental Health & Emotional Burnout",
                desc: "Yoga Nidra, confidential mental wellbeing consultations, meditation, and spiritual therapy to alleviate anxiety, chronic fatigue, and depression.",
                tag: "Mental Wellbeing",
              },
              {
                title: "Stress, Fatigue & Sleep Imbalances",
                desc: "Rhythmic breathing techniques, evening digital detoxification rituals, and herbal relaxants to restore uninterrupted night-time sleep.",
                tag: "Rest & Recovery",
              },
            ].map((concern, i) => (
              <Reveal key={concern.title} delay={(i % 3) * 0.06}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-beige bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div>
                    <span className="inline-block rounded-full bg-sage-soft/70 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-forest">
                      {concern.tag}
                    </span>
                    <h3 className="mt-3.5 font-display text-xl font-semibold text-forest">
                      {concern.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {concern.desc}
                    </p>
                  </div>
                  <div className="mt-5 border-t border-beige/60 pt-4">
                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-deep transition-colors hover:text-forest"
                    >
                      Enquire for this concern &rarr;
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mandatory Medical Disclaimer Notice */}
          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 flex max-w-4xl items-start gap-4 rounded-3xl border border-gold/30 bg-gold/10 p-6 shadow-soft">
              <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-gold-deep" aria-hidden="true" />
              <div className="text-xs sm:text-sm leading-relaxed text-charcoal/85">
                <strong className="font-semibold text-forest">
                  Important Ethical & Medical Advisory:
                </strong>{" "}
                The health concerns listed above represent areas of enquiry for natural lifestyle,
                dietary, yogic, and complementary naturopathic guidance. Sanidhya Naturopathy Center
                promotes holistic wellness and the body’s innate healing capacity. Our therapies do
                not replace qualified medical diagnosis, surgery, or emergency treatments. We do not
                advise stopping any prescribed pharmaceutical medications without consulting your
                primary physician.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Center Facilities & Natural Therapy Suite */}
      <section className="relative overflow-hidden bg-ivory py-20 sm:py-28 border-t border-beige">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="On-Site Infrastructure"
            title={
              <>
                Therapy Suites & <em className="italic text-gold-deep">Clinic Facilities</em>.
              </>
            }
            description="Our center in Sector I, Jankipuram is thoughtfully equipped with dedicated, clean, and private facilities for each traditional naturopathy modality."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Hydrotherapy Suite",
                desc: "Equipped with specialized spinal bath units, sitz/hip bath tubs, and temperature-controlled water application apparatus.",
                icon: Droplets,
              },
              {
                title: "Mud Therapy Station",
                desc: "Hygienic natural earth preparation area utilizing mineral-rich, solar-treated clay packs prepared fresh daily.",
                icon: Layers,
              },
              {
                title: "Herbal Steam Bath Cabinet",
                desc: "Traditional wooden steam chambers designed for comfortable individual sessions keeping the head pleasantly cool outside.",
                icon: Flame,
              },
              {
                title: "Yoga & Meditation Hall",
                desc: "A serene, quiet practice sanctuary equipped with cushions, bolsters, and mats for asanas, pranayama, and Yoga Nidra.",
                icon: Sun,
              },
              {
                title: "Private Consultation Rooms",
                desc: "Quiet, comfortable doctor-patient consultation chambers ensuring complete confidentiality for detailed health reviews.",
                icon: HeartHandshake,
              },
              {
                title: "Accessible & Peaceful Premises",
                desc: "Located on Sector I Main Road with step-free wheelchair ramp, convenient parking, and tranquil ambiance away from noise.",
                icon: Shield,
              },
            ].map((facility, i) => {
              const Icon = facility.icon;
              return (
                <Reveal key={facility.title} delay={i * 0.08}>
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-beige bg-white p-7 shadow-soft">
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-display text-xl font-semibold text-forest">
                        {facility.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {facility.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
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
            <a
              href={whatsappLink(
                "Hello Sanidhya Naturopathy Center, I would like to enquire about therapies.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-8 py-4 text-base font-semibold text-emerald-800 shadow-soft transition-colors hover:bg-emerald-600 hover:text-white active:scale-95"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              WhatsApp Us
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
