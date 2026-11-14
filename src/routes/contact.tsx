import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { clinic, formatTime, fullAddress, getOpenStatus, hours, whatsappLink } from "@/lib/clinic";
import { submitLead } from "@/lib/leadCapture";
import { LeafSprig, Reveal, SectionHeading } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

const validMobile = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) return /^[6-9]/.test(d.slice(2));
  if (d.length === 11 && d.startsWith("0")) return /^[6-9]/.test(d.slice(1));
  if (d.length === 10) return /^[6-9]/.test(d);
  return false;
};

const contactSchema = z.object({
  name: z
    .string({ required_error: "Please enter your full name" })
    .trim()
    .min(2, "Please enter your full name (at least 2 letters)")
    .max(80, "Name must not exceed 80 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Please enter a valid name using letters and spaces only"),
  phone: z
    .string({ required_error: "Please enter your mobile number" })
    .trim()
    .min(10, "Mobile number must be at least 10 digits")
    .refine(validMobile, "Enter a valid 10-digit Indian mobile number (e.g. 94150 26684)"),
  message: z
    .string({ required_error: "Please enter your message or enquiry" })
    .trim()
    .min(5, "Please enter your message (at least 5 characters)")
    .max(1000, "Message must not exceed 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact & Location | Sanidhya Naturopathy Center Lucknow",
      },
      {
        name: "description",
        content:
          "Visit Sanidhya Naturopathy Center at H-D/98 Sector I Main Road, Jankipuram, Lucknow. View full opening hours, interactive map, driving directions, and contact details.",
      },
      {
        name: "keywords",
        content:
          "Contact Sanidhya Naturopathy, Naturopathy clinic Sector I Jankipuram Lucknow, Sanidhya clinic address phone hours, Naturopathy center directions Lucknow",
      },
      {
        property: "og:title",
        content: "Contact & Location | Sanidhya Naturopathy Center Lucknow",
      },
      {
        property: "og:description",
        content:
          "Find our clinic in Sector I, Jankipuram, Lucknow. Operating hours, Google Map directions, and direct phone contact.",
      },
    ],
  }),
  component: ContactPage,
});

const MAP_EMBED =
  "https://www.google.com/maps?q=Sanidhya%20Naturopathy%20Center%2C%20Sector%20I%2C%20Jankipuram%2C%20Lucknow%2C%20Uttar%20Pradesh%20226021&output=embed";

const DIRECTIONS = [
  {
    from: "From Engineering College Chauraha",
    route:
      "Head north toward Jankipuram on the main arterial road. Turn into Sector I Main Road at Janki Vihar Colony; the centre is located at H-D/98.",
  },
  {
    from: "From Tedhi Pulia / Ring Road",
    route:
      "Proceed via Tedhi Pulia onto Jankipuram Ring Road access, following signs toward Sector I. Reachable in approximately 10–12 minutes under normal traffic.",
  },
  {
    from: "From Aliganj / Kursi Road",
    route:
      "Take Kursi Road northward, turning left toward Jankipuram Sector I via the connecting connector road.",
  },
];

function ContactPage() {
  const [today, setToday] = useState<string | null>(null);
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  // Quick enquiry form state with Zod validation
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("en-GB", {
        timeZone: clinic.timezone,
        weekday: "long",
      }).format(new Date()),
    );
    setStatus(getOpenStatus());
  }, []);

  const onQuickSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setError("");
    try {
      // Submitting through DigiWil lead capture as mandated
      const todayIso = new Intl.DateTimeFormat("en-CA", {
        timeZone: clinic.timezone,
      }).format(new Date());

      await submitLead({
        name: data.name,
        mobile: data.phone,
        ageGroup: "adult",
        reason: "General Inquiry / Contact Form",
        date: todayIso,
        time: "morning",
        message: data.message,
      });
      setSubmitted(true);
      reset();
    } catch {
      setError("Unable to submit enquiry right now. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28">
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
              <MapPin className="h-3.5 w-3.5 text-gold" />
              Find &amp; Connect With Us
            </span>
          </Reveal>

          <Reveal delay={0.08} className="mt-6">
            <h1 className="font-display text-4xl font-semibold leading-tight text-ivory sm:text-5xl lg:text-6xl">
              Contact &amp; Visit <br />
              <em className="italic text-gold">Our Center</em>
            </h1>
          </Reveal>

          <Reveal delay={0.14} className="mt-5">
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg">
              We are conveniently located in Sector I, Jankipuram, Lucknow. Reach out by phone, WhatsApp, or visit us in person.
            </p>
          </Reveal>

          {/* Live Open Status Pill */}
          {status && (
            <Reveal delay={0.18} className="mt-7 flex justify-center">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-ivory/20 bg-white/10 px-5 py-2 text-xs font-semibold text-ivory backdrop-blur-md">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full animate-pulse",
                    status.open ? "bg-emerald-400" : "bg-amber-400",
                  )}
                  aria-hidden="true"
                />
                <span>{status.label}</span>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.22} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/booking"
              preload="render"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-forest-deep shadow-lift transition-all duration-300 hover:bg-gold-deep hover:text-ivory active:scale-[0.98]"
            >
              Book OPD Appointment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink(
                "Hello Sanidhya Naturopathy Center, I would like to get in touch.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ivory/25 bg-white/10 px-6 text-sm font-semibold text-ivory backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              Chat on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      {/* Main Info Grid */}
      <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Phone */}
            <Reveal delay={0.05}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-beige bg-white p-7 shadow-soft">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                    <Phone className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-forest">
                    Phone Consultation
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Call directly for appointment queries and clinic information.
                  </p>
                </div>
                <div className="mt-6 border-t border-beige/60 pt-4">
                  <a
                    href={clinic.phoneHref}
                    className="inline-flex items-center gap-2 text-base font-bold text-forest hover:text-gold-deep transition-colors"
                  >
                    {clinic.phoneDisplay}
                  </a>
                </div>
              </div>
            </Reveal>

            {/* WhatsApp */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-beige bg-white p-7 shadow-soft">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                    <MessageCircle className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-forest">
                    WhatsApp Message
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fast message enquiries, timing confirmations, and follow-ups.
                  </p>
                </div>
                <div className="mt-6 border-t border-beige/60 pt-4">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-forest hover:text-gold-deep transition-colors"
                  >
                    Chat on WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Address */}
            <Reveal delay={0.15}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-beige bg-white p-7 shadow-soft">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                    <MapPin className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-forest">
                    Clinic Address
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {clinic.address.line1}, {clinic.address.line2}, {clinic.address.area},{" "}
                    {clinic.address.city}, {clinic.address.state} - {clinic.address.pin}
                  </p>
                </div>
                <div className="mt-6 border-t border-beige/60 pt-4">
                  <a
                    href={clinic.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-gold-deep hover:text-forest transition-colors"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Accessibility */}
            <Reveal delay={0.2}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-beige bg-white p-7 shadow-soft">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                    <Accessibility className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-forest">
                    Visitor Access
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Wheelchair-accessible step-free entrance, accessible doorway, and visitor
                    parking available.
                  </p>
                </div>
                <div className="mt-6 border-t border-beige/60 pt-4">
                  <span className="text-xs font-semibold text-forest">Wheelchair friendly</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map & Operating Hours Section */}
      <section className="relative overflow-hidden bg-ivory py-20 sm:py-28">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Hours Column (5 cols) */}
            <div className="lg:col-span-5">
              <SectionHeading
                align="left"
                eyebrow="Weekly Schedule"
                title={
                  <>
                    Clinic Hours & <em className="italic text-gold-deep">Consultations</em>
                  </>
                }
              />

              <Reveal delay={0.1} className="mt-8">
                <div className="rounded-3xl border border-beige bg-white p-7 shadow-soft">
                  <div className="flex items-center justify-between border-b border-beige/70 pb-3">
                    <span className="text-sm font-semibold text-forest">Day</span>
                    <span className="text-xs text-muted-foreground">Timezone: Asia/Kolkata</span>
                  </div>
                  <ul className="mt-3 divide-y divide-beige/50">
                    {hours.map((row) => {
                      const isToday = today === row.day;
                      return (
                        <li
                          key={row.day}
                          className={cn(
                            "flex items-center justify-between py-3 text-sm transition-colors",
                            isToday && "rounded-xl bg-sage-soft/70 px-3 font-semibold text-forest",
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {row.day}
                            {isToday && (
                              <span className="rounded-full bg-forest px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground">
                                Today
                              </span>
                            )}
                          </span>
                          <span className="text-charcoal/90">
                            {formatTime(row.open)} – {formatTime(row.close)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      to="/booking"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep"
                    >
                      Book a Consultation Slot
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Interactive Map Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <Reveal delay={0.15} className="h-full">
                <div className="flex h-full min-h-[26rem] flex-col overflow-hidden rounded-3xl border border-beige shadow-lift">
                  <iframe
                    title="Map showing the location of Sanidhya Naturopathy Center in Jankipuram, Lucknow"
                    src={MAP_EMBED}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="h-full min-h-[22rem] w-full flex-1 border-0"
                  />
                  <div className="flex items-center justify-between border-t border-beige bg-white p-4">
                    <span className="text-xs text-muted-foreground truncate max-w-sm">
                      {fullAddress}
                    </span>
                    <a
                      href={clinic.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-ivory hover:bg-forest-deep transition-colors"
                    >
                      Open Directions
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Directions & Landmark Guide */}
      <section className="relative overflow-hidden bg-forest py-20 sm:py-28 text-ivory">
        <LeafSprig className="absolute -right-8 top-10 h-24 w-48 text-ivory/10" />
        <LeafSprig className="absolute bottom-8 left-8 h-16 w-32 -scale-x-100 text-ivory/10" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            tone="light"
            eyebrow="Route Guide"
            title={
              <>
                How to Reach <em className="italic text-gold">Sanidhya</em>.
              </>
            }
            description="Clear route pointers from key junctions across Jankipuram and greater Lucknow."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {DIRECTIONS.map((dir, i) => (
              <Reveal key={dir.from} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-3xl border border-ivory/15 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:border-ivory/30 hover:bg-white/10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ivory/10 text-gold">
                    <Compass className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ivory">{dir.from}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory/75">{dir.route}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Inquiry Form */}
      <section className="relative overflow-hidden bg-ivory py-20 sm:py-28">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Leave a Message"
            title={
              <>
                Have a Quick <em className="italic text-gold-deep">Question</em>?
              </>
            }
            description="Send us a message or request a callback. We will get back to you promptly."
          />

          <Reveal delay={0.15} className="mt-12">
            <div className="rounded-3xl border border-beige bg-white p-8 shadow-lift sm:p-10">
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-soft text-forest">
                    <CheckCircle2 className="h-8 w-8 text-forest" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-forest">
                    Enquiry Received!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thank you for contacting Sanidhya Naturopathy Center. Our team will get in touch
                    shortly on your provided number.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex rounded-full border border-forest/20 px-6 py-2.5 text-xs font-semibold text-forest hover:bg-forest/5"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onQuickSubmit)} noValidate className="space-y-5">
                  {error && (
                    <div
                      role="alert"
                      className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-xs font-medium text-destructive"
                    >
                      {error}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-forest"
                    >
                      Your Full Name <span className="text-gold-deep">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      maxLength={80}
                      {...register("name")}
                      placeholder="e.g. Rahul Sharma"
                      className="mt-1.5 w-full rounded-2xl border border-input bg-ivory/60 px-4 py-3 text-base text-charcoal transition-colors focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs font-medium text-destructive" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-semibold text-forest"
                    >
                      Mobile Number <span className="text-gold-deep">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={16}
                      {...register("phone")}
                      placeholder="e.g. 94150 26684"
                      className="mt-1.5 w-full rounded-2xl border border-input bg-ivory/60 px-4 py-3 text-base text-charcoal transition-colors focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs font-medium text-destructive" role="alert">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-forest"
                    >
                      Message or Inquiry <span className="text-gold-deep">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      maxLength={1000}
                      {...register("message")}
                      placeholder="Tell us what you'd like to ask or enquire about..."
                      className="mt-1.5 w-full rounded-2xl border border-input bg-ivory/60 px-4 py-3 text-base text-charcoal transition-colors focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none"
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs font-medium text-destructive" role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full min-h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending enquiry...
                      </>
                    ) : (
                      <>
                        Send Message / Callback Request
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  {/* Direct Contact Options: Call & WhatsApp */}
                  <div className="relative my-2 flex items-center py-1">
                    <div className="flex-grow border-t border-beige"></div>
                    <span className="mx-3 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Or Connect Directly
                    </span>
                    <div className="flex-grow border-t border-beige"></div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href={clinic.phoneHref}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-forest/20 bg-forest/5 px-4 text-sm font-semibold text-forest shadow-sm transition-colors hover:bg-forest hover:text-primary-foreground active:scale-[0.98]"
                    >
                      <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                      Call {clinic.phoneDisplay}
                    </a>
                    <a
                      href={whatsappLink("Hello Sanidhya Naturopathy Center, I have an enquiry.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-emerald-600/30 bg-emerald-50 px-4 text-sm font-semibold text-emerald-800 shadow-sm transition-colors hover:bg-emerald-600 hover:text-white active:scale-[0.98]"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                      WhatsApp Us Directly
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-gold-deep" />
                    <span>Your contact details are strictly confidential.</span>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
