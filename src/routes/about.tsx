import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accessibility,
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  Droplets,
  Flame,
  Flower2,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  ShieldCheck,
  Sparkles,
  Sun,
  Wind,
} from "lucide-react";
import aboutImg from "@/assets/about-clinic.jpg";
import approachImg from "@/assets/approach-detail.jpg";
import { clinic, fullAddress, whatsappLink } from "@/lib/clinic";
import { LeafSprig, Reveal, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Us | Sanidhya Naturopathy Center | Jankipuram, Lucknow",
      },
      {
        name: "description",
        content:
          "Discover Sanidhya Naturopathy Center in Sector I Jankipuram, Lucknow. Learn about our natural healing philosophy, the Panchamahabhuta (5 elements), and compassionate wellness care.",
      },
      {
        name: "keywords",
        content:
          "About Sanidhya Naturopathy, Naturopathy clinic Jankipuram, Natural healing philosophy Lucknow, Panchamahabhuta healing, Holistic wellness Lucknow",
      },
      {
        property: "og:title",
        content: "About Us | Sanidhya Naturopathy Center Lucknow",
      },
      {
        property: "og:description",
        content:
          "Discover our welcoming space in Jankipuram, Lucknow dedicated to natural wellness, lifestyle guidance, and unhurried holistic consultations.",
      },
    ],
  }),
  component: AboutPage,
});

const ELEMENTS = [
  {
    icon: Mountain,
    name: "Prithvi (Earth)",
    role: "Grounding & Nourishment",
    description:
      "Emphasises clean, whole nutrition, natural herbal support, and grounding the physical body to restore structural strength and vitality.",
  },
  {
    icon: Droplets,
    name: "Jal (Water)",
    role: "Cleansing & Fluidity",
    description:
      "Applies hydrotherapeutic principles, hydration balance, and gentle cleansing routines that eliminate metabolic waste and rejuvenate tissues.",
  },
  {
    icon: Flame,
    name: "Agni (Fire)",
    role: "Digestion & Vital Energy",
    description:
      "Nurtures the metabolic fire (Jatharagni) through mindful eating, warmth, and circadian rhythm alignment to enhance digestive power.",
  },
  {
    icon: Wind,
    name: "Vayu (Air)",
    role: "Breath & Movement",
    description:
      "Leverages conscious breathing (Pranayama) and gentle movement to oxygenate cells, ease nervous system tension, and calm anxiety.",
  },
  {
    icon: Sun,
    name: "Akash (Space)",
    role: "Stillness & Renewal",
    description:
      "Provides the mental and digestive room needed for self-repair through mindful fasting, meditation, and quietude.",
  },
];

const PILLARS = [
  {
    title: "Listening First",
    desc: "Every consultation is an unhurried conversation. We begin by understanding your daily routine, physical discomforts, stress factors, and personal goals.",
  },
  {
    title: "Root Cause Focus",
    desc: "Instead of merely masking discomfort, our naturopathy guidance explores diet, rest, habits, and digestion to address issues at their true foundation.",
  },
  {
    title: "Non-Invasive Methods",
    desc: "We rely on nature-inspired modalities: wholesome food choices, restorative breathing, relaxation routines, and gentle physical alignments.",
  },
  {
    title: "Empowering Habits",
    desc: "True wellness thrives at home. We equip you with practical, sustainable daily practices (Dinacharya) that seamlessly fit into your regular family life.",
  },
];

function AboutPage() {
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
                About Our Center
                <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden="true" />
              </p>
              <h1 className="mt-4 font-display text-4xl font-medium leading-[1.15] text-forest sm:text-6xl">
                Natural Healing, Guided by <em className="italic text-gold-deep">Compassion</em>.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Located in Sector I, Jankipuram, Lucknow, Sanidhya Naturopathy Center was
                established to provide a tranquil sanctuary where individuals can rediscover health
                through the innate wisdom of nature.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-soft transition-colors duration-300 hover:bg-forest-deep active:scale-95"
              >
                Schedule a Consultation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappLink(
                  "Hello Sanidhya Naturopathy Center, I would like to know more about the clinic.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-6 py-3.5 text-base font-semibold text-emerald-800 transition-colors hover:bg-emerald-600 hover:text-white active:scale-95"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                WhatsApp Us
              </a>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/70 px-8 py-3.5 text-base font-semibold text-forest transition-colors duration-300 hover:border-forest/40 hover:bg-white active:scale-95"
              >
                Explore Services
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Origin & Philosophy */}
      <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative">
              <div
                aria-hidden="true"
                className="absolute -left-4 -top-4 h-full w-full rounded-4xl border border-sage/40"
              />
              <img
                src={aboutImg}
                alt="Sanidhya Naturopathy Center consultation area"
                width={1104}
                height={1408}
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/5] w-full rounded-4xl object-cover shadow-lift"
              />
              <LeafSprig className="absolute -bottom-6 left-6 h-12 w-24 text-gold" />
            </Reveal>

            <div>
              <SectionHeading
                align="left"
                eyebrow="Our Philosophy"
                title={
                  <>
                    The Body's Innate Capacity to{" "}
                    <em className="italic text-gold-deep">Heal Itself</em>.
                  </>
                }
              />
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Naturopathy is based on the enduring premise that the human body possesses a
                  remarkable, natural capacity for self-repair when given the right conditions:
                  clean nourishment, restful sleep, balanced emotions, and natural rhythm.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Modern lifestyles often overwhelm this balance through prolonged sitting,
                  processed foods, chronic stress, and irregular timings. At Sanidhya, we do not
                  impose harsh regimens. We gently realign your habits with nature, helping your
                  body regain its inherent equilibrium.
                </p>
              </Reveal>

              <Reveal delay={0.2} className="mt-8 space-y-3.5">
                {[
                  "Personalised wellness consultations for chronic vitality and balance",
                  "Gentle guidance on diet, herbal infusions, and meal timing",
                  "Breathing techniques and simple movement to discharge tension",
                  "Support for adults and children in an unhurried, peaceful atmosphere",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-soft text-forest">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-charcoal sm:text-base">{item}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Elements */}
      <section className="relative overflow-hidden bg-ivory py-20 sm:py-28">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Core Framework"
            title={
              <>
                The Five Great Elements: <em className="italic text-gold-deep">Panchamahabhuta</em>
              </>
            }
            description="Traditional naturopathy and oriental medicine regard human beings as miniature reflections of nature, sustained by the harmonious interplay of five primary elements."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ELEMENTS.map((elem, i) => {
              const Icon = elem.icon;
              return (
                <Reveal key={elem.name} delay={i * 0.08}>
                  <div className="group flex h-full flex-col rounded-3xl border border-beige bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-ivory">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-forest">
                          {elem.name}
                        </h3>
                        <p className="text-xs font-semibold text-gold-deep uppercase tracking-wider">
                          {elem.role}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {elem.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}

            {/* Sixth decorative highlight card */}
            <Reveal delay={0.4}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-forest/15 bg-forest p-7 text-ivory shadow-lift">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ivory/10 text-gold">
                    <Sparkles className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ivory">
                    Holistic Harmony
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/80">
                    When these elements work in concert, symptoms subside naturally and lasting
                    vitality returns. We map your routine to these elemental principles.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-ivory/15">
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:text-ivory transition-colors"
                  >
                    Start Your Evaluation &rarr;
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our 4 Care Pillars */}
      <section className="relative overflow-hidden bg-forest py-20 sm:py-28 text-ivory">
        <LeafSprig className="absolute -right-8 top-10 h-24 w-48 text-ivory/10" />
        <LeafSprig className="absolute bottom-8 left-8 h-16 w-32 -scale-x-100 text-ivory/10" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            tone="light"
            eyebrow="Our Care Principles"
            title={
              <>
                How We Treat Every <em className="italic text-gold">Visitor</em>.
              </>
            }
            description="Our standard of practice is founded on respect, transparency, and clinical attentiveness."
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="rounded-3xl border border-ivory/15 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:border-ivory/30 hover:bg-white/10">
                  <span className="font-display text-4xl font-semibold text-gold/60">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ivory">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/75">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Center Environment & Accessibility */}
      <section className="relative overflow-hidden bg-ivory py-20 sm:py-28">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Our Center"
                title={
                  <>
                    A Welcoming Sanctuary in <em className="italic text-gold-deep">Jankipuram</em>.
                  </>
                }
              />
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Healing begins with your surroundings. Our center on Sector I Main Road is
                  designed to be quiet, clean, and unpretentious — free from clinical coldness and
                  noisy distractions.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Whether you are seeking advice on digestion, managing stress, or exploring natural
                  remedies for family health, you will find a dedicated space to discuss your needs
                  in complete privacy.
                </p>
              </Reveal>

              <Reveal delay={0.18} className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3.5 rounded-2xl border border-beige bg-white p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-forest">
                    <Accessibility className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-charcoal">Wheelchair Accessible</h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Step-free entrance and accessible parking space.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-beige bg-white p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-forest">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-charcoal">Prime Jankipuram Spot</h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Conveniently reached from Ring Road & Engineering College.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-beige bg-white p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-forest">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-charcoal">Natural Therapy Suites</h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Equipped for hydrotherapy, steam bath, mud packs & yoga.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-beige bg-white p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-forest">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-charcoal">Certified Reiki Training</h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Level I & II certificate workshops and spiritual healing.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-forest/20 px-6 py-3 text-sm font-semibold text-forest transition-colors hover:border-forest/40 active:scale-95"
                >
                  View Location & Timings &rarr;
                </Link>
                <a
                  href={clinic.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-forest/20 px-6 py-3 text-sm font-semibold text-forest transition-colors hover:border-forest/40 active:scale-95"
                >
                  <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                  Call: {clinic.phoneDisplay}
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="relative">
              <img
                src={approachImg}
                alt="Herbal tea and natural healing environment at Sanidhya Naturopathy Center"
                width={1104}
                height={1312}
                loading="lazy"
                decoding="async"
                className="aspect-[5/6] w-full rounded-4xl border border-beige object-cover shadow-lift"
              />
              <div className="absolute -bottom-5 -right-5 rounded-3xl bg-forest p-6 text-ivory shadow-lift max-w-xs">
                <p className="font-display text-2xl font-bold text-gold">4.7 / 5.0</p>
                <p className="mt-1 text-xs text-ivory/80">
                  Google rating based on 48 patient reviews across Jankipuram & Lucknow.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="relative overflow-hidden bg-cream py-16 sm:py-24 border-t border-beige">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <SectionHeading
            eyebrow="Take the First Step"
            title={
              <>
                Ready to Experience <em className="italic text-gold-deep">Natural Wellbeing</em>?
              </>
            }
            description="Book your unhurried consultation with our naturopathy professionals in Jankipuram, Lucknow."
          />
          <Reveal delay={0.15} className="mt-8 flex flex-wrap justify-center gap-3.5 sm:gap-4">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-forest-deep active:scale-95"
            >
              Request an Appointment Online
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappLink(
                "Hello Sanidhya Naturopathy Center, I would like to enquire about consultations and treatments.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-8 py-4 text-base font-semibold text-emerald-800 shadow-soft transition-colors hover:bg-emerald-600 hover:text-white active:scale-95"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              WhatsApp Us
            </a>
            <a
              href={clinic.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-8 py-4 text-base font-semibold text-forest shadow-soft transition-colors hover:border-forest/40 active:scale-95"
            >
              <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
              Call {clinic.phoneDisplay}
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xs text-muted-foreground">{fullAddress}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
