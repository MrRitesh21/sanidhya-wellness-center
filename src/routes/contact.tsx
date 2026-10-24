import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { clinic, formatTime, fullAddress, getOpenStatus, hours, whatsappLink } from "@/lib/clinic";
import { submitLead } from "@/lib/leadCapture";
import { LeafSprig, Reveal, SectionHeading } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

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

  // Quick enquiry form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("en-GB", {
        timeZone: clinic.timezone,
        weekday: "long",
      }).format(new Date()),
    );
    setStatus(getOpenStatus());
  }, []);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Please provide your name and a valid 10-digit mobile number.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      // Submitting through DigiWil lead capture as mandated
      const todayIso = new Intl.DateTimeFormat("en-CA", {
        timeZone: clinic.timezone,
      }).format(new Date());

      await submitLead({
        name: name.trim(),
        mobile: phone.trim(),
        ageGroup: "adult",
        reason: "General Inquiry / Callback Request",
        date: todayIso,
        time: "morning",
        message: message.trim() || "Contact page enquiry",
      });
      setSubmitted(true);
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setError("Unable to submit enquiry right now. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-ivory py-16 sm:py-24">
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
                Find & Connect With Us
                <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden="true" />
              </p>
              <h1 className="mt-4 font-display text-4xl font-medium leading-[1.15] text-forest sm:text-6xl">
                Contact & Visit <em className="italic text-gold-deep">Our Center</em>.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                We are conveniently located in Sector I, Jankipuram, Lucknow. Reach out by phone,
                message, or visit us in person.
              </p>
            </Reveal>

            {/* Live Open Status Pill */}
            {status && (
              <Reveal delay={0.12} className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-3 rounded-full border border-beige bg-white/90 px-6 py-2.5 text-sm font-semibold shadow-soft">
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full animate-pulse",
                      status.open ? "bg-emerald-600" : "bg-amber-500",
                    )}
                    aria-hidden="true"
                  />
                  <span className="text-forest">{status.label}</span>
                </div>
              </Reveal>
            )}
          </div>
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
                <form onSubmit={handleQuickSubmit} className="space-y-5">
                  {error && (
                    <div className="rounded-2xl bg-destructive/10 p-4 text-xs font-medium text-destructive">
                      {error}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-forest"
                    >
                      Your Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="mt-1.5 w-full rounded-2xl border border-input bg-ivory/60 px-4 py-3 text-base text-charcoal transition-colors focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-semibold text-forest"
                    >
                      Mobile Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 94150 26684"
                      className="mt-1.5 w-full rounded-2xl border border-input bg-ivory/60 px-4 py-3 text-base text-charcoal transition-colors focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-forest"
                    >
                      Message or Inquiry
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you'd like to ask or enquire about..."
                      className="mt-1.5 w-full rounded-2xl border border-input bg-ivory/60 px-4 py-3 text-base text-charcoal transition-colors focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full min-h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep active:scale-[0.98] disabled:opacity-60"
                  >
                    {submitting ? (
                      "Sending enquiry..."
                    ) : (
                      <>
                        Send Message / Callback Request
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

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
