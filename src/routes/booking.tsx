import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  FileText,
} from "lucide-react";
import { OpdBookingFlow } from "@/components/site/OpdBookingFlow";
import { clinic, fullAddress, whatsappLink } from "@/lib/clinic";
import { useClinicData } from "@/lib/clinicSync";
import { Reveal } from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const FAQS = [
  {
    q: "Do I need a doctor's referral or advance payment?",
    a: "No referral is needed, and no advance payment is required. You can schedule online to reserve your slot and pay the ₹600 consultation fee directly at the clinic after meeting the doctor.",
  },
  {
    q: "How long does a consultation take?",
    a: "Consultations are completely unhurried, typically lasting 45 to 60 minutes. Dr. Kamal evaluates your medical reports, constitutional health, daily routine, and personal goals thoroughly.",
  },
  {
    q: "How does the Digital OPD Token work?",
    a: "Your token is generated immediately upon submitting this form and sent to your WhatsApp. When you arrive at our Jankipuram center, your slot is already reserved, so you bypass waiting queues.",
  },
  {
    q: "Can I book specialized therapies like Hydrotherapy or Steam?",
    a: "Yes. Following your initial physician evaluation, our clinical team will schedule tailored sessions in our specialized therapy suites based on your diagnosis.",
  },
  {
    q: "What if I need to cancel or reschedule?",
    a: "Rescheduling is simple and free. Just call us at +91 94150 26684 or send a WhatsApp message anytime before your slot so we can accommodate you.",
  },
];

function BookingPage() {
  const managedClinic = useClinicData();
  const search = Route.useSearch();
  const prefilledReason = search.reason || search.service || search.concern || "";

  return (
    <div className="pt-24 sm:pt-28 bg-ivory">
      {/* Minimal Header */}
      <section className="py-8 sm:py-12 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-200/80 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
              <Sparkles className="h-3 w-3 text-[#0d9488]" />
              <span>Doctor OPD Appointments · Jankipuram, Lucknow</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-forest sm:text-5xl">
              Book Your <em className="italic text-gold-deep">Consultation</em>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Consult with Dr. Kamal &middot; ₹{managedClinic.consultation_fee || 600} Fee (Pay at Clinic) &middot; Instant Digital OPD Token
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Minimal Booking Flow Card */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal delay={0.06}>
            <OpdBookingFlow initialReason={prefilledReason} />
          </Reveal>
        </div>
      </section>

      {/* Minimal Supporting Context: Clinic Information & FAQs in Clean 2-Column Grid */}
      <section className="border-t border-beige/80 bg-cream/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Essential Visit Guidance (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-forest">
                  Visiting Sanidhya
                </h2>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Helpful information for your in-clinic consultation at our center.
                </p>
              </Reveal>

              <Reveal delay={0.05} className="space-y-4">
                {/* Location */}
                <div className="rounded-2xl border border-beige bg-white p-4 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-forest">
                      <MapPin className="h-4 w-4 text-gold-deep" />
                    </span>
                    <div className="text-xs">
                      <p className="font-bold text-forest">Clinic Address</p>
                      <p className="mt-0.5 text-muted-foreground">{fullAddress}</p>
                      <a
                        href={clinic.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 font-semibold text-gold-deep hover:text-forest transition-colors"
                      >
                        Open Google Maps <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Timings */}
                <div className="rounded-2xl border border-beige bg-white p-4 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-forest">
                      <Clock className="h-4 w-4 text-gold-deep" />
                    </span>
                    <div className="text-xs">
                      <p className="font-bold text-forest">OPD Working Hours</p>
                      <p className="mt-0.5 text-muted-foreground">
                        Mon–Sat: 10:00 AM – 9:30 PM
                        <br />
                        Sunday: 10:00 AM – 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* First Visit Tips */}
                <div className="rounded-2xl border border-beige bg-white p-4 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-forest">
                      <FileText className="h-4 w-4 text-gold-deep" />
                    </span>
                    <div className="text-xs">
                      <p className="font-bold text-forest">What to Bring</p>
                      <p className="mt-0.5 text-muted-foreground leading-relaxed">
                        Recent blood work, MRI/X-ray reports, or ongoing prescriptions. Wear comfortable, loose clothing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Helpdesk */}
                <div className="flex items-center justify-between rounded-2xl border border-teal-200/80 bg-teal-50/60 p-4 text-xs">
                  <div>
                    <p className="font-bold text-teal-900">Need Immediate Assistance?</p>
                    <p className="text-teal-800/80">Call or message our desk directly</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={clinic.phoneHref}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-forest shadow-2xs hover:bg-forest hover:text-white transition-colors"
                      title="Call Clinic"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                    <a
                      href={whatsappLink("Hello Sanidhya, I have a question regarding my appointment.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700 transition-colors"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Clean Accordion FAQs (7 cols) */}
            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-gold-deep" />
                  <h2 className="font-display text-2xl font-bold text-forest">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Quick answers about booking, consultations, and tokens.
                </p>

                <div className="mt-6">
                  <Accordion type="single" collapsible defaultValue="faq-0" className="w-full space-y-2.5">
                    {FAQS.map((faq, index) => (
                      <AccordionItem
                        key={faq.q}
                        value={`faq-${index}`}
                        className="rounded-2xl border border-beige bg-white px-5 shadow-2xs transition-colors data-[state=open]:border-teal-300"
                      >
                        <AccordionTrigger className="text-left font-display text-base font-semibold text-forest hover:no-underline py-4">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs leading-relaxed text-muted-foreground pb-4">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-gold-deep shrink-0" />
                  <span>
                    Your appointment information is protected under DPDP Act 2023 regulations.
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
