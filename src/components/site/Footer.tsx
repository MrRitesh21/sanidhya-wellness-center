import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Accessibility,
  ArrowUpRight,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { clinic, formatTime, fullAddress, hours, services, whatsappLink } from "@/lib/clinic";
import { Logo } from "./Header";
import { EASE, LeafSprig } from "./primitives";
import { openBookingModal } from "@/lib/bookingModal";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="relative overflow-hidden bg-forest-deep text-ivory">
        {/* Decorative botanical accents */}
        <LeafSprig className="absolute -left-10 top-8 h-28 w-56 text-ivory/5" />
        <LeafSprig className="absolute bottom-6 right-4 h-24 w-48 -scale-x-100 text-ivory/5" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Column 1: Brand & Overview (5 cols) */}
            <div className="lg:col-span-5">
              <Logo tone="light" />
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/75">
                {clinic.description}
              </p>

              <div className="mt-6 flex flex-col gap-3 text-sm text-ivory/80">
                <a
                  href={clinic.phoneHref}
                  className="inline-flex items-center gap-2.5 font-semibold text-ivory transition-colors hover:text-gold"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ivory/10 text-gold">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {clinic.phoneDisplay}
                </a>

                <a
                  href={whatsappLink(
                    "Hello Sanidhya Naturopathy Center, I would like to enquire about treatments and consultations.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </span>
                  Chat on WhatsApp
                </a>

                <div className="flex items-start gap-2.5 text-xs text-ivory/70">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ivory/10 text-gold">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>{fullAddress}</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-ivory/70">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ivory/10 text-gold">
                    <Accessibility className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>{clinic.accessibility}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links (2 cols) */}
            <div className="sm:col-span-4 lg:col-span-2">
              <h3 className="font-display text-lg font-semibold tracking-wide text-ivory">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-ivory/75">
                <li>
                  <Link to="/" className="transition-colors hover:text-gold">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="transition-colors hover:text-gold">
                    About the Centre
                  </Link>
                </li>
                <li>
                  <Link to="/doctor" className="transition-colors hover:text-gold">
                    Doctor & Care Team
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="transition-colors hover:text-gold">
                    Services & Therapies
                  </Link>
                </li>
                <li>
                  <Link to="/results" className="transition-colors hover:text-gold">
                    Clinical Cases & Results
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="transition-colors hover:text-gold">
                    Contact & Location
                  </Link>
                </li>
                <li>
                  <Link
                    to="/booking"
                    className="font-semibold text-gold transition-colors hover:text-ivory"
                  >
                    Book OPD Appointment
                  </Link>
                </li>
                <li>
                  <a
                    href={clinic.reviewsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-gold"
                  >
                    Google Reviews
                    <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Proposed Wellness Areas (2 cols) */}
            <div className="sm:col-span-4 lg:col-span-2">
              <h3 className="font-display text-lg font-semibold tracking-wide text-ivory">
                Wellness Areas
              </h3>
              <ul className="mt-4 space-y-2 text-xs text-ivory/70">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link to="/services" className="line-clamp-1 transition-colors hover:text-gold">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.65rem] italic text-ivory/50">
                *Subject to clinic confirmation
              </p>
            </div>

            {/* Column 4: Hours & Verified Profiles (3 cols) */}
            <div className="sm:col-span-4 lg:col-span-3">
              <h3 className="font-display text-lg font-semibold tracking-wide text-ivory">
                Clinic Hours
              </h3>
              <ul className="mt-4 space-y-1.5 text-xs text-ivory/75">
                <li className="flex justify-between">
                  <span>Mon – Sat:</span>
                  <span className="font-medium text-ivory">10:00 AM – 9:30 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium text-ivory">10:00 AM – 2:00 PM</span>
                </li>
                <li className="pt-1 text-[0.7rem] text-gold/80">Timezone: Asia/Kolkata</li>
              </ul>

              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ivory/80 transition-colors hover:text-gold"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                </a>
                <a
                  href={clinic.reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ivory/80 transition-colors hover:text-gold"
                >
                  <span>Verified Google Reviews (4.7 ★)</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/60 sm:flex-row">
            <p>
              © {currentYear} {clinic.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="transition-colors hover:text-gold underline underline-offset-4"
              >
                Privacy Notice & Patient Ethics
              </button>
              <a href="#top" className="transition-colors hover:text-gold">
                Back to Top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {privacyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPrivacyOpen(false)}
              className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: EASE }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="privacy-title"
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-beige bg-white p-7 text-charcoal shadow-lift sm:p-9"
            >
              <div className="flex items-center justify-between border-b border-beige pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-soft text-forest">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <h3
                    id="privacy-title"
                    className="font-display text-2xl font-semibold text-forest"
                  >
                    Privacy Notice & Principles
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPrivacyOpen(false)}
                  aria-label="Close dialog"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal/60 hover:bg-beige/50 hover:text-charcoal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  <strong>No Tracking or Server-Side Data Storage:</strong> This website does not
                  require an account, store cookies for advertising, or maintain a database of
                  personal medical records.
                </p>
                <p>
                  <strong>Appointment Inquiries:</strong> When you fill out the appointment enquiry
                  form, the details are compiled strictly inside your browser into a draft WhatsApp
                  message. No personal data is transmitted to an external tracking server. You have
                  complete control over whether to send the prepared message to the clinic.
                </p>
                <p>
                  <strong>Direct Communication:</strong> All healthcare conversations, appointment
                  confirmations, and consultations take place directly between you and the
                  practitioner at Sanidhya Naturopathy Center via official clinic telephone or
                  in-person consultation in Jankipuram, Lucknow.
                </p>
                <p>
                  <strong>Ethical Practice Notice:</strong> Naturopathy and lifestyle counselling
                  provided by the center are complementary wellness approaches designed to support
                  overall wellbeing. They do not replace emergency medical interventions or
                  prescribed pharmaceuticals without consultation with your primary physician.
                </p>
              </div>

              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  onClick={() => setPrivacyOpen(false)}
                  className="rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-ivory hover:bg-forest-deep"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
