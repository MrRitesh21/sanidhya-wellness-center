import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import heroMassage from "@/assets/hero-massage.jpg";
import heroYoga from "@/assets/hero-yoga.jpg";
import heroHerbs from "@/assets/hero-herbs.jpg";
import heroAcupressure from "@/assets/hero-acupressure.jpg";
import practitionerPortrait from "@/assets/clinic-practitioner-portrait.jpg";
import { clinic, whatsappLink } from "@/lib/clinic";
import { useClinicData } from "@/lib/clinicSync";
import { DEFAULT_DOCTOR } from "@/lib/appointment";
import { EASE, FloatingLeaf, LeafSprig, fadeUp, staggerContainer } from "./primitives";
import { Stars } from "./Stars";
import { openBookingModal } from "@/lib/bookingModal";

const HERO_SLIDES = [heroMassage, heroYoga, heroHerbs, heroAcupressure];
const SLIDE_INTERVAL_MS = 6500;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const managedClinic = useClinicData();

  useEffect(() => {
    if (reduceMotion || HERO_SLIDES.length < 2) return;
    const id = window.setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 90]);
  const cardY = useTransform(scrollY, [0, 800], [0, -36]);

  const doctorName = managedClinic.doctor_name || DEFAULT_DOCTOR.name;
  const consultationFee = managedClinic.consultation_fee || DEFAULT_DOCTOR.consultationFee;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ivory"
    >
      {/* Layered background: rotating service photographs + organic overlays */}
      <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden="true">
        {HERO_SLIDES.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            width={1920}
            height={1280}
            fetchPriority={i === 0 ? "high" : undefined}
            animate={{ opacity: i === slide ? 1 : 0, scale: i === slide ? 1 : 1.04 }}
            initial={false}
            transition={
              i === slide
                ? { opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: 8, ease: "linear" } }
                : { duration: 1.4, ease: "easeInOut" }
            }
            className="absolute inset-0 h-[115%] w-full object-cover object-center"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/90 to-ivory/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-transparent to-ivory" />
      </motion.div>

      {/* Soft organic shapes */}
      <div
        aria-hidden="true"
        className="absolute -left-40 top-24 h-[26rem] w-[26rem] rounded-full bg-sage-soft/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-8 right-1/4 h-80 w-80 rounded-full bg-beige/70 blur-3xl"
      />

      {/* Gentle floating leaves */}
      <FloatingLeaf className="left-[7%] top-[20%] h-10 w-10 text-sage" />
      <FloatingLeaf
        className="right-[10%] top-[22%] hidden h-8 w-8 text-gold md:block"
        duration={11}
        delay={1.4}
      />
      <FloatingLeaf
        className="bottom-[14%] left-[42%] h-7 w-7 text-sage"
        duration={8}
        delay={0.6}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:pb-24 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            {/* Location Pill & Verified Clinic Indicator */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-white/80 px-3.5 py-1 text-xs font-semibold text-forest shadow-xs backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-gold-deep" aria-hidden="true" />
                Sector I, Jankipuram, Lucknow
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50/90 px-3 py-1 text-xs font-semibold text-teal-800 shadow-xs">
                <Sparkles className="h-3 w-3 text-[#0d9488]" aria-hidden="true" />
                Instant Digital OPD Tokens
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              className="mt-5 font-display text-4xl font-medium leading-[1.08] text-forest sm:text-6xl xl:text-[4.2rem]"
            >
              Reconnect With <em className="font-medium italic text-gold-deep">Nature</em>.
              <br />
              Rediscover Lasting <em className="font-medium italic text-gold-deep">Wellbeing</em>.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-base leading-relaxed text-charcoal/85 sm:text-lg"
            >
              Physician-supervised natural healthcare at Sanidhya Naturopathy Center. Dedicated care for chronic pain, cervical spondylosis, scoliosis, sciatica, varicose veins, and holistic detoxification.
            </motion.p>

            {/* Primary Conversion CTA Cluster */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Link
                to="/booking"
                className="group relative inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lift transition-all duration-300 hover:bg-forest-deep active:scale-95 sm:w-auto"
              >
                <span>Book OPD Appointment</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                <span className="absolute -top-2.5 -right-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-deep shadow-sm">
                  Zero Queue
                </span>
              </Link>

              <div className="flex items-center gap-2.5">
                <a
                  href={whatsappLink(
                    `Hello Sanidhya Naturopathy Center, I would like to book an appointment with ${doctorName}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-50 px-5 text-sm font-semibold text-emerald-950 shadow-soft transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] active:scale-95 sm:flex-initial"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={clinic.phoneHref}
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full border border-forest/20 bg-white/80 px-5 text-sm font-semibold text-forest shadow-soft transition-all duration-300 hover:bg-forest hover:text-ivory active:scale-95 sm:flex-initial"
                  aria-label={`Call ${clinic.phoneDisplay}`}
                >
                  <Phone className="h-4 w-4 text-gold-deep" />
                  <span>Call Now</span>
                </a>
              </div>
            </motion.div>

            {/* Quick condition chips for instant relevancy */}
            <motion.div variants={fadeUp} className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-forest/70">
                Frequently Consulted Conditions:
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  { label: "Spine & Back Pain", query: "Back Pain & Spine Alignment" },
                  { label: "Cervical Spondylosis", query: "Cervical Spondylosis" },
                  { label: "Sciatica & Slip Disc", query: "Sciatica & Slip Disc" },
                  { label: "Varicose Veins", query: "Varicose Veins Relief" },
                  { label: "Digestive Detox", query: "Digestive Concerns & Detox" },
                  { label: "Reiki Courses", query: "Reiki Training & Healing" },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => openBookingModal()}
                    className="rounded-full border border-forest/15 bg-white/70 px-3 py-1 text-xs font-medium text-forest transition-colors hover:border-forest/40 hover:bg-forest hover:text-ivory"
                  >
                    + {item.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Trust Proof Bar */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-beige/80 pt-6"
            >
              <a
                href={clinic.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full transition-colors hover:text-gold-deep"
              >
                <Stars rating={clinic.rating} starClass="h-4 w-4" />
                <span className="text-sm font-bold text-forest">{clinic.rating}</span>
                <span className="text-xs text-muted-foreground">
                  · {clinic.reviewCount} Google reviews
                </span>
              </a>

              <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />

              <div className="flex items-center gap-1.5 text-xs font-semibold text-forest">
                <Stethoscope className="h-4 w-4 text-[#0d9488]" />
                <span>{doctorName} · OPD Fee ₹{consultationFee}</span>
              </div>

              <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-gold-deep" />
                <span>Mon–Sat 10 AM–9:30 PM · Sun 10 AM–2 PM</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Practitioner portrait & Trust Highlights */}
          <motion.div style={{ y: cardY }} className="relative lg:justify-self-end">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="relative w-full max-w-sm mx-auto"
            >
              <LeafSprig className="absolute -right-4 -top-8 z-10 hidden h-14 w-28 text-sage md:block" />

              <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white shadow-lift">
                <img
                  src={practitionerPortrait}
                  alt={`Practitioner at Sanidhya Naturopathy Center`}
                  width={816}
                  height={816}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover object-center"
                />

                {/* Floating Consultation Badge */}
                <div className="absolute bottom-3 inset-x-3 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-md backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Chief Practitioner
                      </p>
                      <p className="font-display text-base font-bold text-forest">
                        {doctorName}
                      </p>
                      <p className="text-[11px] text-teal-800 font-semibold">
                        General Physician &amp; Naturopath
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        ₹{consultationFee}
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Pay at Clinic</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Link to Philosophy */}
              <div className="mt-3 flex items-center justify-between text-xs px-2">
                <span className="text-muted-foreground font-medium">H-D/98 Sector I, Jankipuram</span>
                <Link
                  to="/doctor"
                  className="font-semibold text-gold-deep hover:text-forest transition-colors"
                >
                  Doctor Profile &rarr;
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
