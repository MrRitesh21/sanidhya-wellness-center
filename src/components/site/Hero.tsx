import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import heroMassage from "@/assets/hero-massage.jpg";
import heroYoga from "@/assets/hero-yoga.jpg";
import heroHerbs from "@/assets/hero-herbs.jpg";
import heroAcupressure from "@/assets/hero-acupressure.jpg";
import { clinic, getOpenStatus, whatsappLink } from "@/lib/clinic";
import { EASE, FloatingLeaf, LeafSprig, fadeUp, staggerContainer } from "./primitives";
import { Stars } from "./Stars";
import { openBookingModal } from "@/lib/bookingModal";

/**
 * Service-themed hero background images. Every image is composed with its
 * subject on the RIGHT third and an intentionally calm, empty LEFT side so
 * the headline, copy and CTAs remain fully readable.
 */
const HERO_SLIDES = [heroMassage, heroYoga, heroHerbs, heroAcupressure];
const SLIDE_INTERVAL_MS = 6500;

export function Hero() {
  // Open/closed is computed after mount to avoid SSR/client text mismatch.
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => {
    setStatus(getOpenStatus().label);
  }, []);

  const reduceMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
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
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/88 to-ivory/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-transparent to-ivory" />
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

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-32 sm:px-6 lg:pb-28 lg:pt-40">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-forest backdrop-blur-sm"
            >
              <LeafSprig className="h-3 w-6 text-gold-deep" />
              {clinic.tagline} — Jankipuram, Lucknow
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display text-5xl font-medium leading-[1.06] text-forest sm:text-6xl xl:text-[4.4rem]"
            >
              Reconnect With <em className="font-medium italic text-gold-deep">Nature</em>.
              <br className="hidden sm:block" /> Rediscover Your{" "}
              <em className="font-medium italic text-gold-deep">Wellbeing</em>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/80"
            >
              Explore a thoughtful approach to wellness at Sanidhya Naturopathy Center in
              Jankipuram, Lucknow.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-soft transition-colors duration-300 hover:bg-forest-deep active:scale-95"
              >
                Book an Appointment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href={whatsappLink(
                  "Hello Sanidhya Naturopathy Center, I would like to enquire about consultations and treatments.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-6 py-3.5 text-base font-semibold text-emerald-900 shadow-soft transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] active:scale-95"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600 group-hover:text-white transition-colors" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={clinic.phoneHref}
                className="group inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/70 px-6 py-3.5 text-base font-semibold text-forest shadow-soft transition-all duration-300 hover:bg-forest hover:text-ivory active:scale-95"
                aria-label={`Call ${clinic.phoneDisplay}`}
              >
                <Phone className="h-4 w-4 text-gold-deep group-hover:text-gold transition-colors" />
                <span>Call Now</span>
              </a>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/50 px-6 py-3.5 text-base font-semibold text-forest backdrop-blur-sm transition-colors duration-300 hover:border-forest/40 hover:bg-white active:scale-95"
              >
                Explore Philosophy
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <a
                href={clinic.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full transition-colors hover:text-gold-deep"
              >
                <Stars rating={clinic.rating} />
                <span className="text-sm font-bold text-forest">{clinic.rating}</span>
                <span className="text-sm text-muted-foreground">
                  · {clinic.reviewCount} Google reviews
                </span>
              </a>
              <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />
              <a
                href={clinic.phoneHref}
                className="flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-gold-deep"
              >
                <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                {clinic.phoneDisplay}
              </a>
              <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />
              <a
                href={whatsappLink(
                  "Hello Sanidhya Naturopathy Center, I would like to enquire about treatments and consultations.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-600"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Floating location card */}
          <motion.div style={{ y: cardY }} className="relative lg:justify-self-end">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="relative"
            >
              <LeafSprig className="absolute -right-4 -top-12 hidden h-14 w-28 text-sage md:block" />
              <div className="relative w-full max-w-sm rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lift backdrop-blur-md">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold text-forest">
                      Visit us in Jankipuram
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {clinic.address.line1}, {clinic.address.line2}, {clinic.address.area},{" "}
                      {clinic.address.city} {clinic.address.pin}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-ivory px-4 py-3 text-sm">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <span className="font-medium text-charcoal">
                    {status ?? "Mon–Sat 10 AM–9:30 PM · Sun 10 AM–2 PM"}
                  </span>
                </div>
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-gold-deep"
                >
                  Get Directions
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
