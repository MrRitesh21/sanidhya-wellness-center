import { useEffect } from "react";
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
  Stethoscope,
} from "lucide-react";
import { OpdBookingFlow } from "@/components/site/OpdBookingFlow";
import { clinic, formatTime, fullAddress, hours, whatsappLink } from "@/lib/clinic";
import { useClinicData } from "@/lib/clinicSync";
import { LeafSprig, Reveal, SectionHeading } from "@/components/site/primitives";
import { openBookingModal } from "@/lib/bookingModal";

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>) => ({
    reason: typeof search.reason === "string" ? search.reason : undefined,
    service: typeof search.service === "string" ? search.service : undefined,
    concern: typeof search.concern === "string" ? search.concern : undefined,
  }),
  head: () => ({
    meta: [
      {
        title: "Doctor OPD Appointment Booking | Sanidhya Naturopathy Center Lucknow",
      },
      {
        name: "description",
        content:
          "Book Doctor OPD Appointment & Digital Token with Dr. Kamal (General Physician & Naturopath) at Sanidhya Naturopathy Center, Jankipuram, Lucknow. DPDP Act 2023 Compliant.",
      },
      {
        name: "keywords",
        content:
          "Doctor OPD appointment Lucknow, Dr. Kamal consultation, Naturopathy booking Lucknow, DPDP Act 2023 compliant appointment, Sanidhya clinic appointment Jankipuram",
      },
      {
        property: "og:title",
        content: "Doctor OPD Appointment Booking | Sanidhya Naturopathy Center Lucknow",
      },
      {
        property: "og:description",
        content:
          "Instant Digital OPD Token for Dr. Kamal at Sanidhya Naturopathy Center. Choose In-Clinic OPD or Online Video Consultation.",
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
  const managedClinic = useClinicData();
  const search = Route.useSearch();
  const prefilledReason = search.reason || search.service || search.concern || "";

  useEffect(() => {
    // If arriving with hash or direct action, scroll directly to form
    if (window.location.hash === "#appointment" || window.location.hash === "#booking-form" || window.location.hash === "#opd-booking") {
      const el = document.getElementById("opd-booking") || document.getElementById("appointment");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById("opd-booking") || document.getElementById("appointment");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      openBookingModal();
    }
  };

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
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-300">
                <Sparkles className="size-3.5 text-[#0d9488]" />
                <span>OPD Token System &middot; DPDP Act 2023 Compliant</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-medium leading-[1.15] text-forest sm:text-6xl">
                Book Consultation with <em className="italic text-gold-deep">{managedClinic.doctor_name || "Dr. Kamal"}</em>
              </h1>
              <p className="mt-4 text-base font-semibold text-teal-800 dark:text-teal-400 sm:text-lg">
                {managedClinic.specialization || "General Physician & Naturopathy Specialist"} &middot; Consultation Fee: ₹{managedClinic.consultation_fee || 600}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Reserve your consultation slot online and receive an instant digital OPD Token on WhatsApp. Zero queue wait at our center in Sector I, Jankipuram, Lucknow or join over online video consultation.
              </p>
            </Reveal>

            {/* Quick Contact Bar & Direct Form Opener */}
            <Reveal delay={0.12} className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 rounded-full bg-[#0d9488] px-6 py-2.5 font-semibold text-white shadow-soft transition-colors hover:bg-[#0f766e] active:scale-95"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Select Date &amp; Slot &darr;
              </button>
              <a
                href={clinic.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/80 px-6 py-2.5 font-semibold text-forest shadow-soft transition-colors hover:border-forest/40"
              >
                <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                Call: {clinic.phoneDisplay}
              </a>
              <a
                href={whatsappLink(
                  `Hello Sanidhya Naturopathy Center, I would like to book an appointment with ${managedClinic.doctor_name || "Dr. Kamal"}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-6 py-2.5 font-semibold text-emerald-800 shadow-soft transition-colors hover:bg-emerald-600 hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                WhatsApp Helpdesk
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Modern Interactive OPD Booking Component */}
      <section id="appointment" className="relative bg-gradient-to-b from-ivory to-cream py-12 sm:py-16">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <OpdBookingFlow initialReason={prefilledReason} />
          </Reveal>
        </div>
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
