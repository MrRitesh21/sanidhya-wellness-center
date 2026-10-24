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
} from "lucide-react";
import { clinic, whatsappLink } from "@/lib/clinic";
import { prettyDate, submitLead, timeLabel } from "@/lib/leadCapture";
import { EASE, Reveal, SectionHeading } from "./primitives";

const TIME_OPTIONS = [
  { value: "morning", label: "Morning · 10:00 AM – 1:00 PM" },
  { value: "afternoon", label: "Afternoon · 1:00 PM – 5:30 PM" },
  { value: "evening", label: "Evening · 5:30 PM – 9:30 PM" },
] as const;

const validMobile = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) return /^[6-9]/.test(d.slice(2));
  if (d.length === 11 && d.startsWith("0")) return /^[6-9]/.test(d.slice(1));
  if (d.length === 10) return /^[6-9]/.test(d);
  return false;
};

const schema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name")
      .max(80, "Name is too long"),
    mobile: z
      .string()
      .trim()
      .refine(validMobile, "Enter a valid Indian mobile number, e.g. 94150 26684"),
    ageGroup: z.enum(["adult", "child"], {
      required_error: "Select an age group",
    }),
    reason: z
      .string()
      .trim()
      .min(3, "Tell us briefly why you'd like to visit")
      .max(500, "Reason is too long"),
    date: z
      .string()
      .min(1, "Choose a preferred date")
      .refine((v) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(`${v}T00:00:00`) >= today;
      }, "Please choose today or a future date"),
    time: z.string().min(1, "Choose a preferred time"),
    message: z.string().trim().max(500, "Message is too long").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.date && data.time) {
      const day = new Date(`${data.date}T00:00:00`).getDay();
      if (day === 0 && data.time !== "morning") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["time"],
          message: "Sundays are 10:00 AM – 2:00 PM, so only a morning slot is possible.",
        });
      }
    }
  });

type FormData = z.infer<typeof schema>;

const inputCls =
  "mt-1.5 w-full rounded-2xl border border-input bg-ivory/60 px-4 py-3 text-base text-charcoal placeholder:text-muted-foreground/60 transition-colors focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-gold/40";
const errorCls = "mt-1.5 text-xs font-medium text-destructive";
const labelCls = "block text-sm font-semibold text-forest";

function kolkataToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: clinic.timezone,
  }).format(new Date());
}


export function Booking() {
  const [status, setStatus] = useState<"idle" | "submitting" | "ready">("idle");
  const [submitError, setSubmitError] = useState("");
  const [waLink, setWaLink] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(kolkataToday());
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    setSubmitError("");
    try {
      await submitLead(data);
      const lines = [
        "Hello Sanidhya Naturopathy Center, I requested an appointment on your website.",
        `Name: ${data.name}`,
        `Mobile: ${data.mobile}`,
        `Age group: ${data.ageGroup === "adult" ? "Adult" : "Child"}`,
        `Reason for consultation: ${data.reason}`,
        `Preferred date: ${prettyDate(data.date)}`,
        `Preferred time: ${timeLabel(data.time)}`,
      ];
      if (data.message) lines.push(`Message: ${data.message}`);
      setWaLink(whatsappLink(lines.join("\n")));
      setStatus("ready");
    } catch {
      setStatus("idle");
      setSubmitError(
        "Your enquiry could not be sent just now — please check your connection and try again, or call the clinic directly.",
      );
    }
  };

  const startNew = () => {
    reset();
    setWaLink("");
    setSubmitError("");
    setStatus("idle");
  };

  return (
    <section id="appointment" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-10 h-[24rem] w-[24rem] rounded-full bg-sage-soft/40 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Appointment enquiry"
          title={
            <>
              Request an <em className="italic text-gold-deep">Appointment</em>
            </>
          }
          description="Share a few details and we'll help you reach the clinic — every appointment is confirmed personally by the centre."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Reassurance column */}
          <Reveal className="flex flex-col gap-4">
            <div className="rounded-3xl border border-beige bg-white p-6 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-forest">
                Prefer to call?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Phone enquiries are the quickest way to arrange a visit.
              </p>
              <a
                href={clinic.phoneHref}
                className="mt-3 inline-block font-semibold text-forest transition-colors hover:text-gold-deep"
              >
                {clinic.phoneDisplay}
              </a>
            </div>

            <div className="rounded-3xl border border-beige bg-white p-6 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-soft text-forest">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-forest">
                Enquire on WhatsApp
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Send a message directly with the clinic's available timings.
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-gold-deep"
              >
                Open WhatsApp chat
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="flex items-start gap-3 rounded-3xl border border-gold/30 bg-gold/10 p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-charcoal/80">
                Your enquiry is sent securely to the centre's appointment
                inbox, where the team reviews every request personally. An
                appointment is confirmed only when the clinic confirms it with
                you directly.
              </p>
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal delay={0.1}>
            <div className="rounded-4xl border border-beige bg-white p-6 shadow-lift sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {status === "ready" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-soft">
                      <CheckCircle2 className="h-8 w-8 text-forest" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-3xl font-semibold text-forest">
                      Enquiry received
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      Thank you — the centre has received your request and will
                      confirm your appointment with you personally. For a
                      quicker reply, call the clinic or follow up on WhatsApp.
                    </p>
                    <div className="mt-7 flex w-full max-w-sm flex-col gap-3">
                      <a
                        href={clinic.phoneHref}
                        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep active:scale-[0.98]"
                      >
                        <Phone className="h-4 w-4 text-gold-soft" aria-hidden="true" />
                        Call {clinic.phoneDisplay}
                      </a>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-forest/20 px-6 text-base font-semibold text-forest transition-colors hover:border-forest/40 active:scale-[0.98]"
                      >
                        <MessageCircle className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                        Follow up on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={startNew}
                        className="mt-1 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-forest hover:underline"
                      >
                        Start a new enquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="grid gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={labelCls}>
                          Full name <span aria-hidden="true" className="text-gold-deep">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your full name"
                          maxLength={80}
                          {...register("name")}
                          className={inputCls}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && <p className={errorCls} role="alert">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="mobile" className={labelCls}>
                          Mobile number <span aria-hidden="true" className="text-gold-deep">*</span>
                        </label>
                        <input
                          id="mobile"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="e.g. 94150 26684"
                          maxLength={16}
                          {...register("mobile")}
                          className={inputCls}
                          aria-invalid={!!errors.mobile}
                        />
                        {errors.mobile && <p className={errorCls} role="alert">{errors.mobile.message}</p>}
                      </div>
                    </div>

                    <div>
                      <span className={labelCls} id="age-group-label">
                        Age group <span aria-hidden="true" className="text-gold-deep">*</span>
                      </span>
                      <div
                        role="radiogroup"
                        aria-labelledby="age-group-label"
                        className="mt-1.5 flex gap-3"
                      >
                        {(
                          [
                            { value: "adult", label: "Adult" },
                            { value: "child", label: "Child" },
                          ] as const
                        ).map((opt) => (
                          <label
                            key={opt.value}
                            className="flex min-h-[52px] flex-1 cursor-pointer items-center justify-center rounded-2xl border border-input bg-ivory/60 px-4 text-sm font-semibold text-charcoal transition-colors has-[:checked]:border-forest has-[:checked]:bg-forest has-[:checked]:text-primary-foreground"
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
                        <p className={errorCls} role="alert">{errors.ageGroup.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="reason" className={labelCls}>
                        Reason for consultation{" "}
                        <span aria-hidden="true" className="text-gold-deep">*</span>
                      </label>
                      <textarea
                        id="reason"
                        rows={3}
                        maxLength={500}
                        placeholder="Briefly, what would you like help with?"
                        {...register("reason")}
                        className={`${inputCls} resize-none`}
                        aria-invalid={!!errors.reason}
                      />
                      {errors.reason && <p className={errorCls} role="alert">{errors.reason.message}</p>}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="date" className={labelCls}>
                          Preferred date <span aria-hidden="true" className="text-gold-deep">*</span>
                        </label>
                        <input
                          id="date"
                          type="date"
                          min={minDate}
                          {...register("date")}
                          className={inputCls}
                          aria-invalid={!!errors.date}
                        />
                        {errors.date && <p className={errorCls} role="alert">{errors.date.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="time" className={labelCls}>
                          Preferred time <span aria-hidden="true" className="text-gold-deep">*</span>
                        </label>
                        <select
                          id="time"
                          defaultValue=""
                          {...register("time")}
                          className={inputCls}
                          aria-invalid={!!errors.time}
                        >
                          <option value="" disabled>
                            Select a time
                          </option>
                          {TIME_OPTIONS.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                        {errors.time && <p className={errorCls} role="alert">{errors.time.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelCls}>
                        Additional message{" "}
                        <span className="font-normal text-muted-foreground">(optional)</span>
                      </label>
                      <textarea
                        id="message"
                        rows={2}
                        maxLength={500}
                        placeholder="Anything else the clinic should know?"
                        {...register("message")}
                        className={`${inputCls} resize-none`}
                      />
                      {errors.message && <p className={errorCls} role="alert">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "preparing"}
                      className="mt-1 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft transition-all hover:bg-forest-deep active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
                    >
                      {status === "preparing" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Preparing your enquiry…
                        </>
                      ) : (
                        <>
                          Request an Appointment
                          <Send className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-muted-foreground">
                      Submitting prepares a WhatsApp message with your details —
                      you review and send it yourself. The clinic confirms all
                      appointments.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
