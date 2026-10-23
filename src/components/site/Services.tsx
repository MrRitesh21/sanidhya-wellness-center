import {
  ArrowRight,
  CalendarCheck,
  Compass,
  Flower2,
  HeartHandshake,
  Leaf,
  Salad,
  Sprout,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/clinic";
import { Reveal, SectionHeading } from "./primitives";

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

export function Services() {
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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
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
                  <a
                    href="#appointment"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep transition-colors hover:text-forest"
                    aria-label={`Enquire about ${service.title}`}
                  >
                    Enquire about this
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
            Service availability is confirmed directly with the clinic during
            your enquiry — this list is indicative and may vary.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
