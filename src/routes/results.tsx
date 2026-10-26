import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  HeartPulse,
  HelpCircle,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { clinic, fullAddress, whatsappLink } from "@/lib/clinic";
import { LeafSprig, Reveal, SectionHeading } from "@/components/site/primitives";
import { ClinicalCases } from "@/components/site/ClinicalCases";
import { openBookingModal } from "@/lib/bookingModal";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      {
        title: "Clinical Results & Case Studies | Sanidhya Naturopathy Center Lucknow",
      },
      {
        name: "description",
        content:
          "Explore authentic clinical results and photographic documentation of patient recoveries at Sanidhya Naturopathy Center, Jankipuram, Lucknow. Natural care for Scoliosis, Varicose Veins, Pediatric Clubfoot, Trauma, and Strabismus.",
      },
      {
        name: "keywords",
        content:
          "Sanidhya clinical results, Scoliosis before after Lucknow, Varicose veins natural cure Lucknow, Pediatric clubfoot CTEV Lucknow, Strabismus squint eye therapy, Naturopathy results Lucknow",
      },
      {
        property: "og:title",
        content: "Clinical Results & Patient Transformations | Sanidhya Naturopathy Center",
      },
      {
        property: "og:description",
        content:
          "Documented patient transformations treated with non-surgical naturopathy, spine adjustments, acupressure, and neuromuscular therapies in Jankipuram, Lucknow.",
      },
    ],
  }),
  component: ResultsPage,
});

const CLINICAL_PILLARS = [
  {
    icon: Stethoscope,
    title: "Physician-Supervised Care",
    desc: "Every therapy protocol is personally evaluated, administered, and monitored by the qualified practitioner at Sanidhya Naturopathy Center.",
  },
  {
    icon: HeartPulse,
    title: "100% Non-Surgical Modalities",
    desc: "Achieving deep structural realignment and vascular recovery through acupressure, Sujok, gentle spinal traction, hydrotherapy, and corrective movement.",
  },
  {
    icon: ShieldCheck,
    title: "Authentic Clinical Records",
    desc: "Photographs represent real patients treated in our Lucknow clinic with informed patient consent. No cosmetic filters or artificial edits.",
  },
  {
    icon: Activity,
    title: "Root-Cause Resolution",
    desc: "Focusing on neuromuscular balance, circulatory drainage, and visceral vitality rather than masking symptoms with temporary painkillers.",
  },
];

const RESULTS_FAQS = [
  {
    q: "How soon do patients typically notice visible improvement?",
    a: "Acute trauma and vascular cases often show dramatic improvement rapidly (such as our 15-day varicose vein transformation). Chronic musculoskeletal conditions like scoliosis or clubfoot progress steadily over structured in-clinic sessions and home exercises.",
  },
  {
    q: "Can severe scoliosis or spinal tilt be corrected without surgery?",
    a: "Yes. In functional and sciatic scoliosis, severe muscle spasm, facet joint fixation, and pelvic tilt pull the spine out of alignment. Through naturopathic spinal mobilization, Sujok reflex stimulation, and targeted rehabilitative asanas, the body naturally restores its vertical posture.",
  },
  {
    q: "Are these treatments safe for young children (e.g. Clubfoot / Strabismus)?",
    a: "Completely safe. Pediatric treatments use gentle manual neuromuscular realignment, soft-tissue mobilization, and reflexology without violent force or surgical trauma, making it comforting and stress-free for the child.",
  },
  {
    q: "How can I get my case evaluated by the doctor?",
    a: "You can book an in-person assessment at our Sector I Jankipuram clinic or reach out via WhatsApp with your medical reports and photographs for an initial conversation.",
  },
];

function ResultsPage() {
  return (
    <div className="bg-ivory pt-24 sm:pt-28">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-forest py-20 text-ivory sm:py-28">
        <LeafSprig className="absolute -right-8 top-10 h-28 w-56 text-ivory/10" />
        <LeafSprig className="absolute bottom-6 left-6 h-20 w-40 -scale-x-100 text-ivory/10" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest-deep/70 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              Documented Clinical Transformations
            </span>
          </Reveal>

          <Reveal delay={0.08} className="mt-6">
            <h1 className="font-display text-4xl font-semibold leading-tight text-ivory sm:text-5xl lg:text-6xl">
              Proven Clinical Results & <br />
              <em className="italic text-gold">Real Patient Transformations</em>
            </h1>
          </Reveal>

          <Reveal delay={0.14} className="mt-5">
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg">
              Explore authentic cases treated by our doctor at Sanidhya Naturopathy Center, Jankipuram, Lucknow — restoring spinal alignment, vascular health, pediatric mobility, and tissue vitality without invasive surgery.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-forest-deep shadow-lift transition-all duration-300 hover:bg-gold-deep hover:text-ivory active:scale-[0.98]"
            >
              Book Doctor Consultation
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={whatsappLink(
                "Hello Sanidhya Naturopathy Center, I saw your clinical cases and would like to consult the doctor.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ivory/25 bg-white/10 px-6 text-sm font-semibold text-ivory backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              Chat with Doctor on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      {/* Trust & Methodology Pillars */}
      <section className="border-b border-beige bg-cream/50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CLINICAL_PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="flex items-start gap-3.5 rounded-2xl border border-beige bg-white p-5 shadow-xs">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-forest">
                      <Icon className="h-5 w-5 text-gold-deep" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-forest text-sm">{p.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Clinical Cases Interactive Gallery */}
      <ClinicalCases />

      {/* Clinical FAQs Section */}
      <section className="bg-cream/40 py-20 sm:py-28 border-t border-beige">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Common Questions"
            title={
              <>
                About Our <em className="italic text-gold-deep">Treatment Outcomes</em>
              </>
            }
            description="Important clinical questions answered regarding recovery timeframes, safety protocols, and non-surgical care."
          />

          <div className="mt-12 space-y-4">
            {RESULTS_FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.08}>
                <div className="rounded-3xl border border-beige bg-white p-6 sm:p-7 shadow-soft">
                  <h3 className="font-display text-lg font-bold text-forest sm:text-xl flex items-start gap-2.5">
                    <HelpCircle className="h-5 w-5 shrink-0 text-gold-deep mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground pl-7.5">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Consultation CTA */}
      <section className="bg-forest-deep py-20 text-ivory text-center relative overflow-hidden">
        <LeafSprig className="absolute -left-8 top-10 h-24 w-48 text-ivory/10" />
        <LeafSprig className="absolute bottom-6 right-6 h-20 w-40 -scale-x-100 text-ivory/10" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            tone="light"
            eyebrow="Start Your Recovery"
            title={
              <>
                Ready for a Personal <em className="italic text-gold">Doctor Consultation</em>?
              </>
            }
            description="Discuss your condition, review past reports, and discover how our natural, non-surgical therapies can support your recovery."
          />

          <Reveal delay={0.12} className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gold px-8 text-sm font-semibold text-forest-deep shadow-lift transition-colors hover:bg-gold-deep hover:text-ivory active:scale-[0.98]"
            >
              Book Clinic Appointment
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={clinic.phoneHref}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ivory/20 bg-white/10 px-7 text-sm font-semibold text-ivory backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.98]"
            >
              <Phone className="h-4 w-4 text-gold" />
              Call {clinic.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
