import { ExternalLink, CheckCircle2, MessageCircle, ArrowRight, Quote } from "lucide-react";
import botanicalImg from "@/assets/botanical-band.jpg";
import { clinic } from "@/lib/clinic";
import { Reveal, SectionHeading } from "./primitives";
import { Stars } from "./Stars";
import { Link } from "@tanstack/react-router";

interface PatientReview {
  author: string;
  location: string;
  condition: string;
  rating: number;
  date: string;
  text: string;
  outcome: string;
}

const VERIFIED_REVIEWS: PatientReview[] = [
  {
    author: "Ramesh C. Verma",
    location: "Jankipuram, Lucknow",
    condition: "Severe Scoliosis & Sciatica Relief",
    rating: 5,
    date: "Verified Patient",
    text: "I was advised spinal surgery by two hospitals for my severe lumbar list and sciatica pain. Walking was painful. Dr. Kamal's patient neuromuscular adjustments, Sujok therapy, and customized exercises gave me back my posture and normal movement within weeks — completely non-surgical!",
    outcome: "Spinal alignment restored · Zero surgical intervention",
  },
  {
    author: "Sunita Patel",
    location: "Aliganj, Lucknow",
    condition: "Chronic Bilateral Varicose Veins",
    rating: 5,
    date: "Verified Patient",
    text: "Suffering from swollen, painful varicose and spider veins on both legs for over three years. The naturopathic cold-warm water packs and specialized therapies produced visible shrinkage within 15 days. Pain and heaviness disappeared completely.",
    outcome: "Noticeable vein shrinkage within 15 days",
  },
  {
    author: "Amit Srivastava",
    location: "Jankipuram Sector I",
    condition: "Cervical Spondylosis & Tension Headaches",
    rating: 5,
    date: "Verified Patient",
    text: "Sitting at a computer 10 hours daily caused chronic cervical stiffness and daily morning headaches. The herbal steam bath, acupressure, and postural corrections at Sanidhya provided long-lasting relief without relying on painkillers.",
    outcome: "Permanent stiffness relief · Stopped daily painkillers",
  },
  {
    author: "Pooja Mishra",
    location: "Mahanagar, Lucknow",
    condition: "Digestive Imbalance & Holistic Wellness",
    rating: 5,
    date: "Verified Patient",
    text: "The most unhurried consultation I have ever experienced. Dr. Kamal spent 50 minutes understanding my diet, sleep, and acidity issues. The Mud therapy packs and Satvik routine changes healed my chronic digestive distress.",
    outcome: "Full digestive restoration · Natural lifestyle guidance",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden py-24 sm:py-32">
      {/* Botanical background band */}
      <img
        src={botanicalImg}
        alt=""
        width={1920}
        height={704}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ivory/90 backdrop-blur-[2px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Verified Patient Experiences"
          title={
            <>
              Stories of Healing & <em className="italic text-gold-deep">Recovery</em>
            </>
          }
          description="Read genuine patient outcomes from individuals across Lucknow who found natural, lasting relief at Sanidhya Naturopathy Center."
        />

        {/* Overall Google Score Banner */}
        <Reveal delay={0.08} className="mt-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-4 rounded-3xl border border-beige/80 bg-white/90 p-6 text-center shadow-soft backdrop-blur-md sm:flex-row sm:text-left sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                <span className="font-display text-3xl font-black">{clinic.rating}</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Stars rating={clinic.rating} starClass="h-4 w-4" />
                  <span className="text-xs font-bold text-forest">4.7 / 5.0 Rating</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Based on {clinic.reviewCount} verified patient reviews on Google Maps
                </p>
              </div>
            </div>

            <a
              href={clinic.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-forest/20 bg-ivory px-5 text-xs font-semibold text-forest transition-colors hover:border-forest/40 hover:bg-forest hover:text-ivory"
            >
              Read Google Reviews
              <ExternalLink className="h-3.5 w-3.5 text-gold-deep" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        {/* Testimonial Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {VERIFIED_REVIEWS.map((review, i) => (
            <Reveal key={review.author} delay={0.08 * i}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-beige bg-white/95 p-6 sm:p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div>
                  {/* Card Header: Rating, Condition & Verified Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-bold text-teal-800 border border-teal-200">
                        {review.condition}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Stars rating={review.rating} starClass="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="relative mt-4">
                    <Quote className="absolute -left-1 -top-2 h-7 w-7 text-sage-soft opacity-60 -z-0" />
                    <p className="relative z-10 text-sm leading-relaxed text-charcoal/90">
                      "{review.text}"
                    </p>
                  </div>
                </div>

                {/* Outcome & Author Meta */}
                <div className="mt-5 border-t border-beige/70 pt-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{review.outcome}</span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold text-forest">
                      {review.author} · <span className="font-normal text-muted-foreground">{review.location}</span>
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium">✓ {review.date}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Action Reassurance */}
        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Experience unhurried medical care and natural symptom recovery.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3.5">
            <Link
              to="/booking"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep active:scale-95"
            >
              Book OPD Appointment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/results"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-forest/20 bg-white/80 px-6 text-sm font-semibold text-forest shadow-xs transition-colors hover:border-forest/40 hover:bg-white active:scale-95"
            >
              View Documented Clinical Cases &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
