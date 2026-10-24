import { createFileRoute } from "@tanstack/react-router";
import {
  Accessibility,
  Calendar,
  CheckCircle2,
  Clock,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Booking } from "@/components/site/Booking";
import { clinic, formatTime, fullAddress, hours, whatsappLink } from "@/lib/clinic";
import { LeafSprig, Reveal, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      {
        title: "Book an Appointment | Sanidhya Naturopathy Center Lucknow",
      },
      {
        name: "description",
        content:
          "Schedule your naturopathy consultation at Sanidhya Naturopathy Center in Sector I Jankipuram, Lucknow. Choose a preferred date and time online or call +91 94150 26684.",
      },
      {
        name: "keywords",
        content:
          "Book naturopathy appointment Lucknow, Sanidhya clinic appointment Jankipuram, Naturopathy consultation booking Lucknow",
      },
      {
        property: "og:title",
        content: "Book an Appointment | Sanidhya Naturopathy Center Lucknow",
      },
      {
        property: "og:description",
        content:
          "Reserve your consultation slot online. Gentle, personalized naturopathy guidance in Jankipuram, Lucknow.",
      },
    ],
  }),
  component: BookingPage,
});

const VISIT_TIPS = [
  {
    title: "Bring Health Records",
    text: "If you have recent blood tests, medical reports, or a list of ongoing medications, bring them along so our practitioners have complete context.",
  },
  {
    title: "Comfortable Attire",
    text: "Wear loose, relaxed cotton clothing to ensure maximum comfort during any gentle movement or relaxation guidance.",
  },
  {
    title: "Arrive 10 Mins Early",
    text: "Giving yourself a few quiet minutes to unwind before your session allows your mind and heart rate to settle comfortably.",
  },
  {
    title: "Open Conversation",
    text: "Think about your daily routine, sleep patterns, dietary habits, and stress factors — our consultations are entirely unhurried.",
  },
];

const BOOKING_FAQS = [
  {
    q: "Do I need a doctor's referral to book a consultation?",
    a: "No referral is needed. Anyone interested in natural wellness, lifestyle modification, stress relief, or chronic vitality support can directly schedule a consultation.",
  },
  {
    q: "How long does a consultation take?",
    a: "Initial naturopathy evaluations typically last 45 to 60 minutes, ensuring ample time to listen, discuss your history, and explain recommendations in detail.",
  },
  {
    q: "What if I need to reschedule or cancel?",
    a: "We understand that plans can change. Simply give us a call or send a WhatsApp message at +91 94150 26684 as soon as possible so we can adjust your slot.",
  },
  {
    q: "Are Sunday appointments available?",
    a: "Yes, we are open on Sundays from 10:00 AM to 2:00 PM for morning consultations.",
  },
  {
    q: "Can I book specialized therapies like Hydrotherapy, Mud Therapy, or Steam Baths?",
    a: "Yes. After an initial assessment to determine the most suitable temperature, duration, and application, our practitioners will schedule your individual therapy sessions in our dedicated suites.",
  },
  {
    q: "How do I enquire for Reiki Level I or Level II Certificate Courses?",
    a: "You can select 'Reiki Healing & Training Courses' in the booking form, or call/WhatsApp us directly at +91 94150 26684. We will share upcoming weekend batch dates, syllabus details, and registration procedures.",
  },
];

function BookingPage() {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-ivory py-16 sm:py-20">
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
                Schedule a Visit
                <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden="true" />
              </p>
              <h1 className="mt-4 font-display text-4xl font-medium leading-[1.15] text-forest sm:text-6xl">
                Book Your Wellness <em className="italic text-gold-deep">Consultation</em>.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Choose a convenient date and time to meet with our naturopathy specialists in Sector
                I, Jankipuram, Lucknow. We look forward to welcoming you.
              </p>
            </Reveal>

            {/* Quick Contact Bar */}
            <Reveal delay={0.12} className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <a
                href={clinic.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/80 px-6 py-2.5 font-semibold text-forest shadow-soft transition-colors hover:border-forest/40"
              >
                <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                Call directly: {clinic.phoneDisplay}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/80 px-6 py-2.5 font-semibold text-forest shadow-soft transition-colors hover:border-forest/40"
              >
                <MessageCircle className="h-4 w-4 text-forest" aria-hidden="true" />
                WhatsApp Enquiry
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Booking Form Integration */}
      <section className="relative">
        <Booking />
      </section>

      {/* First-time Visitor Guidance & Practical Info */}
      <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Preparing For Your Visit"
            title={
              <>
                What to Expect on Your <em className="italic text-gold-deep">First Visit</em>.
              </>
            }
            description="A few gentle tips to help you get the most out of your consultation at Sanidhya."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VISIT_TIPS.map((tip, i) => (
              <Reveal key={tip.title} delay={i * 0.08}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-beige bg-white p-7 shadow-soft">
                  <div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-soft text-forest font-semibold">
                      0{i + 1}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold text-forest">
                      {tip.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Practical Facility Info Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="flex items-start gap-4 rounded-3xl border border-beige bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                  <Clock className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="font-semibold text-forest">Working Hours</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Mon–Sat: 10:00 AM – 9:30 PM
                    <br />
                    Sunday: 10:00 AM – 2:00 PM
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex items-start gap-4 rounded-3xl border border-beige bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="font-semibold text-forest">Convenient Location</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Sector I Main Road, Janki Vihar Colony, Jankipuram, Lucknow.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex items-start gap-4 rounded-3xl border border-beige bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                  <Accessibility className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="font-semibold text-forest">Full Accessibility</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Wheelchair-accessible entrance ramp and dedicated parking.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Booking FAQs */}
      <section className="relative overflow-hidden bg-ivory py-20 sm:py-28">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Common Questions"
            title={
              <>
                Frequently Asked About <em className="italic text-gold-deep">Appointments</em>
              </>
            }
          />

          <div className="mt-12 space-y-4">
            {BOOKING_FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.08}>
                <div className="rounded-3xl border border-beige bg-white p-6 shadow-soft">
                  <h3 className="flex items-start gap-3 font-display text-lg font-semibold text-forest sm:text-xl">
                    <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-3 pl-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25} className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Have an urgent question or need immediate assistance?
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={clinic.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep active:scale-95"
              >
                <Phone className="h-4 w-4" />
                Call {clinic.phoneDisplay}
              </a>
              <a
                href={whatsappLink(
                  "Hello Sanidhya, I have a quick enquiry regarding booking an appointment.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-6 py-3 text-sm font-semibold text-forest shadow-soft transition-colors hover:border-forest/40 active:scale-95"
              >
                <MessageCircle className="h-4 w-4 text-gold-deep" />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
