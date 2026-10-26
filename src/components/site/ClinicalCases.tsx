import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Stethoscope,
  Activity,
  ArrowRight,
  Eye,
  ChevronRight,
  X,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { CLINICAL_CASES, type ClinicalCase, type CaseImage } from "@/lib/clinicalCases";
import { clinic, whatsappLink } from "@/lib/clinic";
import { LeafSprig, Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";
import { openBookingModal } from "@/lib/bookingModal";

const CATEGORY_TABS = [
  { id: "all", label: "All Clinical Cases" },
  { id: "spine", label: "Spine & Scoliosis" },
  { id: "veins", label: "Varicose Veins" },
  { id: "pediatric", label: "Pediatric & Clubfoot" },
  { id: "trauma", label: "Trauma & Recovery" },
] as const;

export function ClinicalCases() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});
  const [lightboxImage, setLightboxImage] = useState<CaseImage | null>(null);

  const filteredCases =
    activeTab === "all"
      ? CLINICAL_CASES
      : CLINICAL_CASES.filter((c) => c.category === activeTab);

  const getCurrentImage = (caseItem: ClinicalCase): CaseImage => {
    const idx = activeImageIndex[caseItem.id] ?? 0;
    const selected = caseItem.images[idx] ?? caseItem.images[0];
    if (!selected) {
      throw new Error(`No images found for case ${caseItem.id}`);
    }
    return selected;
  };

  const handleSelectImage = (caseId: string, index: number) => {
    setActiveImageIndex((prev) => ({ ...prev, [caseId]: index }));
  };

  return (
    <section id="results" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      {/* Decorative botanical flourishes */}
      <LeafSprig className="absolute -left-10 top-12 h-28 w-56 text-forest/5" />
      <LeafSprig className="absolute -right-12 bottom-16 h-36 w-64 -scale-x-100 text-forest/5" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/4 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-sage-soft/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Real Clinical Cases & Transformations"
          title={
            <>
              Proven Results Treated by <em className="italic text-gold-deep">Our Doctor</em>.
            </>
          }
          description="Authentic photographic documentation of clinical cases treated at Sanidhya Naturopathy Center through non-surgical, traditional naturopathic and neuromuscular therapies."
        />

        {/* Category filter tabs */}
        <Reveal delay={0.08} className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300",
                activeTab === tab.id
                  ? "bg-forest text-ivory shadow-soft"
                  : "border border-forest/15 bg-white/80 text-forest hover:bg-white hover:border-forest/30",
              )}
            >
              {tab.label}
            </button>
          ))}
        </Reveal>

        {/* Cases Grid */}
        <div className="mt-14 space-y-12">
          {filteredCases.map((caseItem, i) => {
            const currentImg = getCurrentImage(caseItem);
            const currentIdx = activeImageIndex[caseItem.id] ?? 0;

            return (
              <Reveal key={caseItem.id} delay={0.1}>
                <article className="overflow-hidden rounded-4xl border border-beige bg-white shadow-soft transition-all duration-300 hover:shadow-lift">
                  <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
                    {/* Left: Image Showcase */}
                    <div className="flex flex-col lg:col-span-6 xl:col-span-5">
                      <div className="relative overflow-hidden rounded-3xl bg-cream">
                        {/* Main Image */}
                        <div
                          className="group relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-3xl"
                          onClick={() => setLightboxImage(currentImg)}
                        >
                          <img
                            src={currentImg.src}
                            alt={currentImg.title}
                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />

                          {/* Gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

                          {/* Stage Badge */}
                          <span
                            className={cn(
                              "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm",
                              currentImg.stage === "before"
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : currentImg.stage === "after"
                                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                  : "bg-ivory text-forest border border-beige",
                            )}
                          >
                            {currentImg.stageLabel}
                          </span>

                          {/* Zoom hint */}
                          <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-forest backdrop-blur-sm opacity-90 transition-transform group-hover:scale-110">
                            <Eye className="h-4 w-4" />
                          </span>

                          {/* Caption at bottom */}
                          <div className="absolute bottom-0 inset-x-0 p-4 text-ivory">
                            <p className="text-xs sm:text-sm font-semibold">{currentImg.title}</p>
                            <p className="mt-0.5 text-xs text-ivory/80 line-clamp-2">
                              {currentImg.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Thumbnails Gallery */}
                      {caseItem.images.length > 1 && (
                        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 pt-0.5">
                          {caseItem.images.map((img, imgIdx) => (
                            <button
                              key={img.title + imgIdx}
                              type="button"
                              onClick={() => handleSelectImage(caseItem.id, imgIdx)}
                              className={cn(
                                "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                                currentIdx === imgIdx
                                  ? "border-forest ring-2 ring-forest/20 scale-105"
                                  : "border-transparent opacity-70 hover:opacity-100",
                              )}
                              title={img.title}
                            >
                              <img
                                src={img.src}
                                alt={img.title}
                                className="h-full w-full object-cover"
                              />
                              <span
                                className={cn(
                                  "absolute bottom-0 inset-x-0 text-[9px] font-bold text-center py-0.5 text-white uppercase",
                                  img.stage === "before"
                                    ? "bg-amber-700/80"
                                    : img.stage === "after"
                                      ? "bg-emerald-700/80"
                                      : "bg-forest/80",
                                )}
                              >
                                {img.stage === "before"
                                  ? "Before"
                                  : img.stage === "after"
                                    ? "After"
                                    : "Clinic"}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Clinical Description & Outcomes */}
                    <div className="flex flex-col justify-between lg:col-span-6 xl:col-span-7">
                      <div>
                        {/* Meta header */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-forest">
                            {caseItem.categoryLabel}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-medium text-gold-deep">
                            <Clock className="h-3.5 w-3.5" />
                            {caseItem.timeline}
                          </span>
                        </div>

                        {/* Title & Hindi Heading */}
                        <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-forest sm:text-3xl">
                          {caseItem.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-forest/70 font-sans">
                          {caseItem.hindiTitle}
                        </p>

                        {/* Clinical Summary */}
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {caseItem.summary}
                        </p>

                        {/* Problem & Approach */}
                        <div className="mt-5 space-y-3 rounded-2xl bg-cream/70 p-4 border border-beige">
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-forest">
                              Presented Condition / समस्या:
                            </span>
                            <p className="mt-0.5 text-xs sm:text-sm text-foreground/80">
                              {caseItem.problem}
                            </p>
                          </div>
                          <div className="border-t border-beige/80 pt-2.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
                              <Stethoscope className="h-3.5 w-3.5 text-gold-deep" />
                              Doctor's Naturopathic Protocol / उपचार:
                            </span>
                            <p className="mt-0.5 text-xs sm:text-sm text-foreground/80 font-medium">
                              {caseItem.therapyApproach}
                            </p>
                          </div>
                        </div>

                        {/* Key Results */}
                        <div className="mt-5">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-forest">
                            Key Outcomes Achieved / परिणाम:
                          </h4>
                          <ul className="mt-2 space-y-1.5">
                            {caseItem.resultsKey.map((result) => (
                              <li
                                key={result}
                                className="flex items-start gap-2 text-xs sm:text-sm text-forest"
                              >
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                                <span>{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Action CTAs */}
                      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-beige pt-6">
                        <button
                          type="button"
                          onClick={() => openBookingModal()}
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-6 text-xs sm:text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:bg-forest-deep hover:shadow-lift active:scale-[0.98]"
                        >
                          Book Doctor Consultation
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                        <a
                          href={whatsappLink(caseItem.enquiryMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-forest/20 bg-white px-5 text-xs sm:text-sm font-semibold text-forest transition-colors hover:border-forest/40 hover:bg-ivory active:scale-[0.98]"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                          Ask Doctor on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Doctor Credibility & Transparency Note */}
        <Reveal delay={0.2} className="mt-14">
          <div className="rounded-3xl border border-gold/30 bg-white/90 p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                <ShieldCheck className="h-6 w-6 text-gold-deep" />
              </span>
              <div className="flex-1">
                <h4 className="font-display text-lg font-bold text-forest">
                  Authentic Clinical Documentation & Patient Integrity
                </h4>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  The cases presented above were personally treated and managed by the practitioner at Sanidhya Naturopathy Center, Jankipuram, Lucknow using classical oriental and natural modalities (Acupressure, Sujok, Spinal Adjustment, Hydrotherapy, and Therapeutic Movement). No cosmetic filters or artificial alterations have been applied. Results vary based on individual age, vitality, and chronicity.
                </p>
              </div>
              <a
                href={clinic.phoneHref}
                className="mt-2 sm:mt-0 shrink-0 inline-flex items-center gap-2 rounded-full border border-forest/20 px-4 py-2 text-xs font-semibold text-forest hover:bg-cream transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-gold-deep" />
                Speak to Clinic: {clinic.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal for enlarged clinical inspection */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform hover:scale-110"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col max-h-[90vh]">
              <div className="flex-1 overflow-auto bg-black/10 flex items-center justify-center p-2">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-lg"
                />
              </div>
              <div className="p-5 bg-white border-t border-beige">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-sage-soft px-3 py-1 text-xs font-bold uppercase text-forest">
                      {lightboxImage.stageLabel}
                    </span>
                    <h4 className="mt-2 font-display text-xl font-bold text-forest">
                      {lightboxImage.title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLightboxImage(null);
                      openBookingModal();
                    }}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-forest px-5 text-xs font-semibold text-ivory hover:bg-forest-deep transition-colors"
                  >
                    Enquire for this case
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  {lightboxImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
