import { Link } from "@tanstack/react-router";
import { Accessibility, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import aboutImg from "@/assets/about-clinic.jpg";
import { clinic, fullAddress, whatsappLink } from "@/lib/clinic";
import { LeafSprig, Reveal, SectionHeading } from "./primitives";
import { openBookingModal } from "@/lib/bookingModal";

const FACTS = [
  { icon: MapPin, label: "Sector I, Jankipuram, Lucknow" },
  { icon: Clock, label: "Mon–Sat 10 AM–9:30 PM · Sun 10 AM–2 PM" },
  { icon: Accessibility, label: "Wheelchair-accessible entrance & parking" },
  { icon: Phone, label: "Easy phone-based appointment enquiries" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute -right-48 top-16 h-[30rem] w-[30rem] rounded-full bg-beige/50 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-5 -top-5 h-full w-full rounded-4xl border border-sage/40"
            />
            <img
              src={aboutImg}
              alt="A calm, plant-filled corner of the Sanidhya Naturopathy Center consultation space"
              width={1104}
              height={1408}
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/5] w-full rounded-4xl object-cover shadow-lift"
            />
            <LeafSprig className="absolute -bottom-7 left-8 h-14 w-28 text-gold" />
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="About the centre"
              title={
                <>
                  A More Thoughtful Approach to <em className="italic text-gold-deep">Wellbeing</em>
                  .
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                At Sanidhya Naturopathy Center, discover a welcoming space to learn about natural
                wellness approaches and discuss your individual health and wellbeing goals with the
                clinic.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Every visit begins with listening — to your concerns, your routine and what you
                would like to change — so any guidance can be shaped around you, one conversation at
                a time.
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-8 grid gap-3 sm:grid-cols-2">
              {FACTS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-beige bg-white/70 px-4 py-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-forest">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-charcoal">{label}</span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.26} className="mt-10 flex flex-wrap gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-soft transition-colors duration-300 hover:bg-forest-deep active:scale-[0.98]"
              >
                Request an Appointment
              </button>
              <a
                href={whatsappLink(
                  "Hello Sanidhya Naturopathy Center, I would like to enquire about treatments and consultations.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-6 py-3.5 text-base font-semibold text-emerald-900 transition-colors hover:bg-emerald-600 hover:text-white active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={clinic.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/70 px-6 py-3.5 text-base font-semibold text-forest transition-colors hover:bg-forest hover:text-ivory active:scale-[0.98]"
              >
                <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                Call {clinic.phoneDisplay}
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-forest/20 px-6 py-3.5 text-base font-semibold text-forest transition-colors duration-300 hover:border-forest/40 active:scale-[0.98]"
              >
                Our Philosophy & Centre &rarr;
              </Link>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-4 text-xs text-muted-foreground">{fullAddress}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
