import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, HelpCircle, Phone } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { cn } from "@/lib/utils";
import { EASE, Reveal, SectionHeading } from "./primitives";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const FAQS: FAQItem[] = [
  {
    question: "What is naturopathy?",
    answer:
      "Naturopathy is a holistic, non-invasive discipline of healthcare focused on supporting the body's natural vitality through gentle lifestyle habits, nutrition guidance, stress management, and natural wellness approaches. At Sanidhya Naturopathy Center, consultations are centered on understanding your daily routine and discussing natural wellness principles tailored to your personal goals.",
  },
  {
    question: "How can I enquire about a consultation?",
    answer: (
      <span>
        You can request an appointment through our online enquiry form, reach out
        directly via WhatsApp, or call the centre at{" "}
        <a
          href={clinic.phoneHref}
          className="font-semibold text-forest underline decoration-gold-deep underline-offset-4 hover:text-gold-deep"
        >
          {clinic.phoneDisplay}
        </a>
        . Our team will share available time slots and guide you through scheduling your visit.
      </span>
    ),
  },
  {
    question: "What should I bring to my first visit?",
    answer:
      "For your first visit, we recommend bringing any current health records, routine lifestyle details, and a brief note of the wellness topics or goals you would like to discuss with the practitioner. This helps ensure an unhurried, comprehensive consultation.",
  },
  {
    question: "Where is Sanidhya Naturopathy Center located?",
    answer:
      "The centre is situated at H-D/98, Sector I Main Road, Sector I, Janki Vihar Colony, Jankipuram, Lucknow, Uttar Pradesh 226021, India. It is easily accessible from all major parts of Lucknow, with landmark directions available upon request.",
  },
  {
    question: "What are the clinic's opening hours?",
    answer:
      "Sanidhya Naturopathy Center is open Monday through Saturday from 10:00 AM to 9:30 PM, and on Sundays from 10:00 AM to 2:00 PM (Asia/Kolkata time). Prior appointment enquiry is recommended to secure your preferred consultation slot.",
  },
  {
    question: "How can I contact the center?",
    answer: (
      <span>
        You can call us directly on{" "}
        <a
          href={clinic.phoneHref}
          className="font-semibold text-forest underline decoration-gold-deep underline-offset-4 hover:text-gold-deep"
        >
          {clinic.phoneDisplay}
        </a>
        , message us on WhatsApp, or visit the clinic in Jankipuram during opening hours. We are always happy to answer your questions before you book.
      </span>
    ),
  },
  {
    question: "Is wheelchair-accessible entry available?",
    answer:
      "Yes. In accordance with our commitment to accessible healthcare for every visitor, Sanidhya Naturopathy Center features a wheelchair-accessible entrance and convenient parking space.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute -right-36 top-1/3 h-96 w-96 rounded-full bg-beige/60 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Questions & Answers"
          title={
            <>
              Frequently Asked <em className="italic text-gold-deep">Questions</em>
            </>
          }
          description="Clear, straightforward information about our consultations, visiting guidelines, and holistic wellness approaches."
        />

        <div className="mt-14 space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const itemId = `faq-item-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <Reveal key={index} delay={index * 0.05}>
                <div
                  className={cn(
                    "overflow-hidden rounded-3xl border transition-all duration-300",
                    isOpen
                      ? "border-forest/20 bg-white shadow-soft"
                      : "border-beige bg-white/70 hover:border-forest/15 hover:bg-white",
                  )}
                >
                  <button
                    type="button"
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={itemId}
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors sm:p-7"
                  >
                    <span className="flex items-center gap-3.5">
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors",
                          isOpen
                            ? "bg-forest text-primary-foreground"
                            : "bg-sage-soft text-forest",
                        )}
                      >
                        <HelpCircle className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="font-display text-xl font-semibold text-forest sm:text-2xl">
                        {faq.question}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory text-forest"
                      aria-hidden="true"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={itemId}
                        role="region"
                        aria-labelledby={headerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        <div className="border-t border-beige/60 px-6 pb-6 pt-4 text-base leading-relaxed text-muted-foreground sm:px-7 sm:pb-7">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-beige bg-white/80 px-6 py-4 shadow-soft">
            <span className="text-sm text-charcoal/80">Have an unaddressed question?</span>
            <a
              href={clinic.phoneHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-gold-deep"
            >
              <Phone className="h-3.5 w-3.5 text-gold-deep" aria-hidden="true" />
              Speak directly with our clinic team
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
