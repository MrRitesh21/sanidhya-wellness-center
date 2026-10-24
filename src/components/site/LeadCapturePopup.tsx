import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { clinic, whatsappLink } from "@/lib/clinic";
import { submitLead, timeLabel } from "@/lib/leadCapture";
import { EASE, LeafSprig } from "./primitives";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY_DISMISSED = "sanidhya_lead_popup_dismissed";
const STORAGE_KEY_SUBMITTED = "sanidhya_lead_popup_submitted";
const SNOOZE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

const HEALTH_CONCERNS = [
  "Back & Joint Pain Relief",
  "Digestive & Gut Health",
  "Weight Management & Detox",
  "Stress, Fatigue & Sleep",
  "Holistic Naturopathy Consultation",
  "Cervical Spondylosis",
  "Back Pain",
  "Polio-related Concerns",
  "Parkinson's Disease Support",
  "High and Low Blood Pressure",
  "Digestive Concerns & Acidity",
  "Diabetes / Blood Sugar Support",
  "Numbness or Tingling in Hands and Feet",
  "Slip Disc",
  "Sciatica",
  "Mental Health Concerns",
  "Hydrotherapy & Steam Bath Enquiry",
  "Reiki Healing & Training Courses",
  "Other Health Concern",
] as const;

const TIME_OPTIONS = [
  { value: "morning", label: "Morning · 10:00 AM – 1:00 PM" },
  { value: "afternoon", label: "Afternoon · 1:00 PM – 5:30 PM" },
  { value: "evening", label: "Evening · 5:30 PM – 9:30 PM" },
] as const;

import { OPEN_BOOKING_EVENT } from "@/lib/bookingModal";

const validMobile = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) return /^[6-9]/.test(d.slice(2));
  if (d.length === 11 && d.startsWith("0")) return /^[6-9]/.test(d.slice(1));
  if (d.length === 10) return /^[6-9]/.test(d);
  return false;
};

const popupSchema = z
  .object({
    name: z
      .string({ required_error: "Please enter your full name" })
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(80, "Name must not exceed 80 characters")
      .regex(/^[a-zA-Z\s.'-]+$/, "Please enter a valid name (letters and spaces only)"),
    mobile: z
      .string({ required_error: "Please enter your mobile number" })
      .trim()
      .min(10, "Mobile number must be at least 10 digits")
      .refine(validMobile, "Enter a valid 10-digit Indian mobile number (e.g. 94150 26684)"),
    ageGroup: z.enum(["adult", "child"], {
      required_error: "Please select whether consultation is for an adult or child",
      invalid_type_error: "Please select whether consultation is for an adult or child",
    }),
    concern: z
      .string({ required_error: "Please select your primary health concern" })
      .min(1, "Please select your primary health concern"),
    customConcern: z.string().trim().max(300, "Details must not exceed 300 characters").optional(),
    time: z
      .string({ required_error: "Please select a preferred callback time" })
      .min(1, "Please choose your preferred time slot"),
  })
  .superRefine((data, ctx) => {
    if (
      data.concern === "Other Health Concern" &&
      (!data.customConcern || data.customConcern.trim().length < 3)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customConcern"],
        message: "Please briefly describe your health concern (at least 3 characters)",
      });
    }
  });

type PopupFormData = z.infer<typeof popupSchema>;

function kolkataToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: clinic.timezone,
  }).format(new Date());
}

const inputCls =
  "mt-1 w-full rounded-xl border border-input bg-ivory/60 px-3.5 py-2 text-sm text-charcoal placeholder:text-muted-foreground/60 transition-colors focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-gold/40";
const errorCls = "mt-0.5 text-xs font-medium text-destructive";
const labelCls = "block text-[0.7rem] font-semibold uppercase tracking-wider text-forest";

export function LeadCapturePopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "ready">("idle");
  const [submitError, setSubmitError] = useState("");
  const [waLink, setWaLink] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedTime, setSubmittedTime] = useState("");
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PopupFormData>({
    resolver: zodResolver(popupSchema),
    defaultValues: {
      ageGroup: "adult",
      concern: HEALTH_CONCERNS[0],
      time: "morning",
    },
  });

  const selectedConcern = watch("concern");

  // Mount, Event Listener & Auto-triggers
  useEffect(() => {
    setMounted(true);

    // Direct programmatic trigger when visitor clicks "Book Appointment" anywhere
    const handleOpenModal = () => {
      setOpen(true);
    };
    window.addEventListener(OPEN_BOOKING_EVENT, handleOpenModal);

    const isSuppressed = () => {
      try {
        if (typeof window === "undefined") return true;
        if (localStorage.getItem(STORAGE_KEY_SUBMITTED) === "true") return true;
        const dismissedAt = localStorage.getItem(STORAGE_KEY_DISMISSED);
        if (dismissedAt) {
          const elapsed = Date.now() - Number(dismissedAt);
          if (elapsed < SNOOZE_DURATION_MS) return true;
        }
        return false;
      } catch {
        return false;
      }
    };

    if (isSuppressed()) {
      return () => {
        window.removeEventListener(OPEN_BOOKING_EVENT, handleOpenModal);
      };
    }

    // 1. Timer Trigger: 12 seconds
    const timer = setTimeout(() => {
      if (!isSuppressed()) {
        setOpen(true);
      }
    }, 12000);

    // 2. Desktop Exit Intent Trigger (mouse leaves viewport at top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 12 && !isSuppressed()) {
        setOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener(OPEN_BOOKING_EVENT, handleOpenModal);
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen && status !== "ready") {
      try {
        localStorage.setItem(STORAGE_KEY_DISMISSED, Date.now().toString());
      } catch {
        // Ignore localStorage restrictions
      }
    }
  };

  const onSubmit = async (data: PopupFormData) => {
    setStatus("submitting");
    setSubmitError("");

    const finalReason =
      data.concern === "Other Health Concern" && data.customConcern
        ? `Other: ${data.customConcern}`
        : data.concern;

    const today = kolkataToday();

    try {
      // Must post to DigiWil Supabase endpoint to record the enquiry for the owner
      await submitLead({
        name: data.name,
        mobile: data.mobile,
        ageGroup: data.ageGroup,
        reason: finalReason,
        date: today,
        time: data.time,
        message: "Enquiry submitted via website lead capture pop-up",
      });

      try {
        localStorage.setItem(STORAGE_KEY_SUBMITTED, "true");
      } catch {
        // Ignore localStorage restrictions
      }

      setSubmittedName(data.name);
      setSubmittedTime(timeLabel(data.time));

      const lines = [
        "Hello Sanidhya Naturopathy Center, I requested a consultation callback on your website.",
        `Name: ${data.name}`,
        `Mobile: ${data.mobile}`,
        `Age group: ${data.ageGroup === "adult" ? "Adult" : "Child"}`,
        `Health concern: ${finalReason}`,
        `Preferred time: ${timeLabel(data.time)}`,
      ];
      setWaLink(whatsappLink(lines.join("\n")));
      setStatus("ready");
    } catch {
      setStatus("idle");
      setSubmitError(
        "Could not send your request just now. Please check your connection or call us directly.",
      );
    }
  };

  const handleCloseSuccess = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Main Lead Capture Dialog */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[94vh] w-[94vw] max-w-lg overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-3xl border border-beige bg-white p-5 shadow-lift sm:max-w-lg sm:rounded-4xl sm:p-6 sm:py-6">
          <AnimatePresence mode="wait" initial={false}>
            {status === "ready" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col items-center py-4 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-soft text-forest">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </span>

                <DialogTitle className="mt-4 font-display text-2xl font-semibold text-forest sm:text-3xl">
                  Appointment Request Received
                </DialogTitle>

                <DialogDescription className="mt-2 max-w-md text-sm leading-relaxed text-charcoal/80">
                  Thank you, <strong className="font-semibold text-forest">{submittedName}</strong>!
                  Our naturopathy team in Jankipuram has received your details and will call you
                  during <span className="font-medium text-forest">{submittedTime}</span>.
                </DialogDescription>

                <div className="mt-5 flex w-full flex-col gap-2.5 sm:max-w-md">
                  <a
                    href={clinic.phoneHref}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep active:scale-[0.98]"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call Clinic Now ({clinic.phoneDisplay})
                  </a>

                  {waLink && (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-forest/20 px-6 text-sm font-semibold text-forest transition-colors hover:border-forest/40 hover:bg-ivory active:scale-[0.98]"
                    >
                      <MessageCircle className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                      Chat on WhatsApp
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleCloseSuccess}
                    className="mt-1 text-sm font-medium text-muted-foreground transition-colors hover:text-forest"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <DialogHeader className="text-left">
                  <div className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                    <LeafSprig className="h-3 w-5" />
                    Sanidhya Naturopathy Center
                  </div>
                  <DialogTitle className="mt-1 font-display text-xl font-semibold leading-tight text-forest sm:text-2xl">
                    Book an <em className="italic text-gold-deep">Appointment</em>
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-xs text-muted-foreground sm:text-xs">
                    Connect with our natural healing specialists in Jankipuram, Lucknow. Book an
                    appointment or request a callback below.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-3.5 grid gap-3">
                  {/* Name & Mobile */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="popup-name" className={labelCls}>
                        Full name <span className="text-gold-deep">*</span>
                      </label>
                      <input
                        id="popup-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        maxLength={80}
                        {...register("name")}
                        className={inputCls}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className={errorCls} role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="popup-mobile" className={labelCls}>
                        Mobile number <span className="text-gold-deep">*</span>
                      </label>
                      <input
                        id="popup-mobile"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="e.g. 94150 26684"
                        maxLength={16}
                        {...register("mobile")}
                        className={inputCls}
                        aria-invalid={!!errors.mobile}
                      />
                      {errors.mobile && (
                        <p className={errorCls} role="alert">
                          {errors.mobile.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Health Concern Selection */}
                  <div>
                    <label htmlFor="popup-concern" className={labelCls}>
                      Primary Health Concern <span className="text-gold-deep">*</span>
                    </label>
                    <select
                      id="popup-concern"
                      {...register("concern")}
                      className={inputCls}
                      aria-invalid={!!errors.concern}
                    >
                      {HEALTH_CONCERNS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {errors.concern && (
                      <p className={errorCls} role="alert">
                        {errors.concern.message}
                      </p>
                    )}
                  </div>

                  {/* Optional Custom Note if 'Other' is picked */}
                  {selectedConcern === "Other Health Concern" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label htmlFor="popup-custom" className={labelCls}>
                        Tell us briefly about your concern <span className="text-gold-deep">*</span>
                      </label>
                      <input
                        id="popup-custom"
                        type="text"
                        placeholder="e.g. skin irritation, migraine, chronic fatigue..."
                        maxLength={300}
                        {...register("customConcern")}
                        className={inputCls}
                        aria-invalid={!!errors.customConcern}
                      />
                      {errors.customConcern && (
                        <p className={errorCls} role="alert">
                          {errors.customConcern.message}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Preferred Timing */}
                  <div>
                    <label htmlFor="popup-time" className={labelCls}>
                      Preferred Callback Time <span className="text-gold-deep">*</span>
                    </label>
                    <select
                      id="popup-time"
                      {...register("time")}
                      className={inputCls}
                      aria-invalid={!!errors.time}
                    >
                      {TIME_OPTIONS.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className={errorCls} role="alert">
                        {errors.time.message}
                      </p>
                    )}
                  </div>

                  {/* Age Group */}
                  <div>
                    <span className={labelCls} id="popup-age-group">
                      Consultation For <span className="text-gold-deep">*</span>
                    </span>
                    <div
                      role="radiogroup"
                      aria-labelledby="popup-age-group"
                      className="mt-1 flex gap-2.5"
                    >
                      {(
                        [
                          { value: "adult", label: "Adult" },
                          { value: "child", label: "Child" },
                        ] as const
                      ).map((opt) => (
                        <label
                          key={opt.value}
                          className="flex min-h-[38px] flex-1 cursor-pointer items-center justify-center rounded-xl border border-input bg-ivory/60 px-3 py-1.5 text-xs font-semibold text-charcoal transition-colors has-[:checked]:border-forest has-[:checked]:bg-forest has-[:checked]:text-primary-foreground"
                        >
                          <input
                            type="radio"
                            value={opt.value}
                            {...register("ageGroup")}
                            className="sr-only"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                    {errors.ageGroup && (
                      <p className={errorCls} role="alert">
                        {errors.ageGroup.message}
                      </p>
                    )}
                  </div>

                  {/* Error Notification */}
                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive"
                    >
                      {submitError}
                    </div>
                  )}

                  {/* Action CTA */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-1 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-forest-deep active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Submitting your request…
                      </>
                    ) : (
                      <>
                        Book Appointment / Request Callback
                        <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  {/* Direct Contact Options: Call & WhatsApp */}
                  <div className="relative my-0.5 flex items-center py-0.5">
                    <div className="flex-grow border-t border-beige"></div>
                    <span className="mx-2 shrink-0 text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      Or Connect Directly
                    </span>
                    <div className="flex-grow border-t border-beige"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={clinic.phoneHref}
                      className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-forest/20 bg-forest/5 px-2.5 py-1.5 text-xs font-semibold text-forest transition-colors hover:bg-forest hover:text-ivory active:scale-[0.98]"
                    >
                      <Phone className="h-3.5 w-3.5 text-gold-deep" aria-hidden="true" />
                      <span>Call {clinic.phoneDisplay}</span>
                    </a>
                    <a
                      href={whatsappLink(
                        "Hello Sanidhya Naturopathy Center, I would like to book an appointment.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-emerald-600/30 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-600 hover:text-white active:scale-[0.98]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[0.7rem] text-muted-foreground">
                    <ShieldCheck
                      className="h-3.5 w-3.5 text-gold-deep shrink-0"
                      aria-hidden="true"
                    />
                    <span>Enquiries are sent securely to our clinic inbox. No spam.</span>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
