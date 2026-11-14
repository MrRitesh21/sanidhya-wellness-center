import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, Leaf, MessageCircle, Phone, Sparkles, Stethoscope, ShieldCheck } from "lucide-react";
import practitionerPortrait from "@/assets/clinic-practitioner-portrait.jpg";
import { clinic, whatsappLink } from "@/lib/clinic";
import { useClinicData } from "@/lib/clinicSync";
import { DEFAULT_DOCTOR } from "@/lib/appointment";
import { LeafSprig, Reveal } from "@/components/site/primitives";

const PAGE_TITLE = "Doctor & Care Team | Sanidhya Naturopathy Center Lucknow";
const PAGE_DESCRIPTION =
  "Meet Dr. Kamal and the care team at Sanidhya Naturopathy Center in Jankipuram, Lucknow. Learn about our listening-first approach and enquire directly about a consultation.";

export const Route = createFileRoute("/doctor")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/doctor" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/doctor" }],
  }),
  component: DoctorPage,
});

const CARE_PRACTICES = [
  {
    icon: HeartHandshake,
    title: "Start with your story",
    description:
      "Share your concerns, daily routine, and the wellbeing goals you would like to discuss.",
  },
  {
    icon: Leaf,
    title: "Explore considered options",
    description:
      "Ask about the center’s available natural wellness approaches and whether they may suit your needs.",
  },
  {
    icon: MessageCircle,
    title: "Keep the conversation open",
    description:
      "Contact the center directly to ask questions, discuss a visit, or confirm service details.",
  },
];

function DoctorPage() {
  const managedClinic = useClinicData();

  return (
    <div className="pt-24 sm:pt-28">
      <section className="relative overflow-hidden bg-forest py-16 text-ivory sm:py-24 lg:py-28">
        <LeafSprig className="absolute -right-8 top-10 h-28 w-56 text-ivory/10" />
        <LeafSprig className="absolute bottom-6 left-6 h-20 w-40 -scale-x-100 text-ivory/10" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest-deep/70 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
                <Sparkles className="size-3.5 text-gold" />
                Lead Practitioner &middot; Dr. Kamal
              </div>
              <h1 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.08] text-ivory sm:text-5xl lg:text-6xl">
                Thoughtful care begins with <em className="italic text-gold">listening.</em>
              </h1>
              <div className="mt-5 rounded-2xl border border-ivory/15 bg-white/10 p-4 shadow-sm backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-ivory">{managedClinic.doctor_name || DEFAULT_DOCTOR.name}</h2>
                    <p className="text-xs font-semibold text-gold">{managedClinic.specialization || DEFAULT_DOCTOR.specialty}</p>
                    <p className="text-xs text-ivory/70">{managedClinic.qualification || DEFAULT_DOCTOR.qualifications}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ivory/60">OPD Fee</p>
                    <p className="text-2xl font-black text-gold">₹{managedClinic.consultation_fee || DEFAULT_DOCTOR.consultationFee}</p>
                    <p className="text-[10px] text-ivory/60">Pay at Clinic</p>
                  </div>
                </div>
              </div>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">
                Meet Dr. Kamal at Sanidhya Naturopathy Center. Every consultation is an unhurried, personalized evaluation designed to understand your constitution and health goals.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/booking"
                preload="render"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-forest-deep shadow-lift transition-all duration-300 hover:bg-gold-deep hover:text-ivory active:scale-[0.98]"
              >
                Book OPD Appointment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappLink(
                  `Hello Sanidhya Naturopathy Center, I would like to consult with ${managedClinic.doctor_name || DEFAULT_DOCTOR.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/20 px-6 text-sm font-semibold text-emerald-300 backdrop-blur-sm transition-colors hover:bg-emerald-600 hover:text-white active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                WhatsApp Enquiry
              </a>
              <a
                href={clinic.phoneHref}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-ivory/25 bg-white/10 px-6 text-sm font-semibold text-ivory backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.98]"
              >
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                Call {clinic.phoneDisplay}
              </a>
            </Reveal>

            <Reveal delay={0.18} className="mt-7 flex items-start gap-3 border-t border-ivory/15 pt-4">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
                <ShieldCheck className="h-4 w-4 text-gold" aria-hidden="true" />
              </span>
              <p className="max-w-sm text-xs leading-relaxed text-ivory/70">
                Verified practitioner credentials &middot; OPD Token management powered by ClinicX &middot; DPDP Act 2023 Compliant.
              </p>
            </Reveal>
          </div>

          <Reveal className="order-1 relative lg:order-2">
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 h-full w-full border border-gold/40 sm:-right-5 sm:-top-5"
            />
            <img
              src={practitionerPortrait}
              alt="Practitioner at Sanidhya Naturopathy Center in a calm, naturally lit consultation space"
              width={816}
              height={816}
              fetchPriority="high"
              decoding="async"
              className="relative aspect-[4/5] w-full object-cover object-center shadow-lift rounded-2xl"
            />
            <div className="relative mt-4 flex items-center justify-between gap-4 border-t border-ivory/15 pt-4">
              <div>
                <p className="font-display text-xl font-semibold text-ivory">
                  Sanidhya Naturopathy Center
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-ivory/70">
                  Jankipuram · Lucknow
                </p>
              </div>
              <LeafSprig className="h-10 w-20 shrink-0 text-gold" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
              Your visit
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-forest sm:text-5xl">
              A conversation shaped around you.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              The center welcomes questions about your needs, available services, and what to
              expect before you arrange a visit.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-0 sm:grid-cols-3 sm:divide-x sm:divide-beige">
            {CARE_PRACTICES.map(({ icon: Icon, title, description }, index) => (
              <Reveal key={title} delay={index * 0.08} className="border-t border-beige py-6 sm:px-6 sm:py-5 first:sm:pl-0 last:sm:pr-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-soft text-forest">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-forest">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-beige pt-7 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Want to speak with the center before visiting? Call or send a WhatsApp enquiry.
            </p>
            <a
              href={whatsappLink(
                "Hello Sanidhya Naturopathy Center, I would like to enquire about the care team and a consultation.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-forest/20 bg-white px-6 py-3 text-sm font-semibold text-forest transition-colors hover:bg-sage-soft sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Enquire on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}