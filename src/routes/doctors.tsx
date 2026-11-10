import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, Leaf, MessageCircle, Phone } from "lucide-react";
import practitionerPortrait from "@/assets/clinic-practitioner-portrait.jpg";
import { clinic, whatsappLink } from "@/lib/clinic";
import { LeafSprig, Reveal } from "@/components/site/primitives";

const PAGE_TITLE = "Doctors & Care Team | Sanidhya Naturopathy Center Lucknow";
const PAGE_DESCRIPTION =
  "Meet the care team at Sanidhya Naturopathy Center in Jankipuram, Lucknow. Learn about its listening-first approach and enquire directly about a consultation.";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/doctors" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/doctors" }],
  }),
  component: DoctorsPage,
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

function DoctorsPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="bg-ivory py-12 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <Reveal>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
                <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
                Doctors & care team
              </p>
              <h1 className="mt-5 max-w-xl font-display text-5xl font-medium leading-[1.06] text-forest sm:text-6xl">
                Thoughtful care begins with <em className="text-gold-deep">listening.</em>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Get to know the people behind your visit at Sanidhya Naturopathy Center. Every
                enquiry is an opportunity to share what matters to you and ask about the center’s
                wellness approaches.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/booking"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep"
              >
                Request an Appointment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={clinic.phoneHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-forest/20 bg-white/70 px-6 py-3 text-sm font-semibold text-forest transition-colors hover:bg-white"
              >
                <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                Call {clinic.phoneDisplay}
              </a>
            </Reveal>

            <Reveal delay={0.18} className="mt-7 flex items-start gap-3 border-t border-beige pt-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-soft text-forest">
                <Leaf className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Practitioner names and qualifications are shared directly by the center; no
                unverified credentials are listed here.
              </p>
            </Reveal>
          </div>

          <Reveal className="order-1 relative lg:order-2">
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 h-full w-full border border-sage/50 sm:-right-5 sm:-top-5"
            />
            <img
              src={practitionerPortrait}
              alt="Practitioner at Sanidhya Naturopathy Center in a calm, naturally lit consultation space"
              width={816}
              height={816}
              fetchPriority="high"
              decoding="async"
              className="relative aspect-[4/5] w-full object-cover object-center shadow-lift"
            />
            <div className="relative mt-4 flex items-center justify-between gap-4 border-t border-beige pt-4">
              <div>
                <p className="font-display text-xl font-semibold text-forest">
                  Sanidhya Naturopathy Center
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
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