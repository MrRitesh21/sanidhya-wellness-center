import { Accessibility, Armchair, MapPin, MessagesSquare, NotebookPen, Phone } from "lucide-react";
import approachImg from "@/assets/approach-detail.jpg";
import { LeafSprig, Reveal, SectionHeading } from "./primitives";

const VALUES = [
  {
    icon: MessagesSquare,
    title: "Personalised conversations",
    text: "Every visit starts with your wellness goals, in your own words.",
  },
  {
    icon: Armchair,
    title: "A calm, welcoming space",
    text: "An unhurried consultation environment, designed to put you at ease.",
  },
  {
    icon: NotebookPen,
    title: "Clear explanations",
    text: "Available wellness approaches explained simply, before anything begins.",
  },
  {
    icon: MapPin,
    title: "Convenient location",
    text: "Sector I, Jankipuram — easy to reach from across Lucknow.",
  },
  {
    icon: Phone,
    title: "Easy phone enquiries",
    text: "Appointments can be arranged with a quick call to the centre.",
  },
  {
    icon: Accessibility,
    title: "Accessible for visitors",
    text: "A wheelchair-accessible entrance and parking are available.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="relative overflow-hidden bg-primary py-24 sm:py-32">
      {/* Soft botanical texture */}
      <LeafSprig className="absolute -right-8 top-10 h-24 w-48 text-ivory/10" />
      <LeafSprig className="absolute bottom-8 left-8 h-16 w-32 -scale-x-100 text-ivory/10" />
      <div
        aria-hidden="true"
        className="absolute right-1/3 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-forest-deep/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <img
              src={approachImg}
              alt="A calm consultation table with herbal tea and botanicals at Sanidhya Naturopathy Center"
              width={1104}
              height={1312}
              loading="lazy"
              decoding="async"
              className="aspect-[5/6] w-full rounded-4xl border border-ivory/15 object-cover shadow-lift"
            />
            <LeafSprig className="absolute -bottom-6 -right-4 h-12 w-24 text-gold" />
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Our approach"
              title={
                <>
                  Wellness That Starts With <em className="italic text-gold">Listening</em>.
                </>
              }
              description="The way we intend to care for every visitor who walks through our door."
            />
            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {VALUES.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={0.08 * (i % 2)}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ivory/10 text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ivory">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ivory/70">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
