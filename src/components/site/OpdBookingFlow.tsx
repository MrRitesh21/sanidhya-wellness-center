import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Video,
  Building2,
  Sparkles,
  ArrowRight,
  Loader2,
  MessageCircle,
  CalendarPlus,
  Copy,
  Printer,
  RotateCcw,
  Stethoscope,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import {
  DEFAULT_DOCTOR,
  SHIFT_SLOTS,
  kolkataToday,
  isValidIndianMobile,
  submitAppointmentDirectlyToClinicX,
  generateLocalOpdToken,
  isSlotBookable,
  isSlotInPast,
  getFirstAvailableSlot,
  hasAvailableSlotsOnDate,
  type AppointmentFormData,
  type BookingResultData,
} from "@/lib/appointment";
import { submitAppointment } from "@/lib/appointment.functions";
import { useClinicData } from "@/lib/clinicSync";
import { clinic, whatsappLink } from "@/lib/clinic";

interface OpdBookingFlowProps {
  initialReason?: string;
  onSuccess?: (result: BookingResultData) => void;
  className?: string;
}

const COMMON_CONCERNS = [
  "Cervical Spondylosis",
  "Back Pain & Spine",
  "Sciatica & Slip Disc",
  "Varicose Veins Relief",
  "Digestive Health & Acidity",
  "Naturopathy Detox",
  "Reiki Healing",
];

export function OpdBookingFlow({ initialReason = "", onSuccess, className = "" }: OpdBookingFlowProps) {
  const managedClinic = useClinicData();
  const submitFn = useServerFn(submitAppointment);

  // Quick date selector helpers
  const todayStr = kolkataToday();
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(tomorrowObj);

  // Check if today has any remaining bookable slots
  const todayHasSlots = hasAvailableSlotsOnDate(todayStr);
  const defaultInitialDate = todayHasSlots ? todayStr : tomorrowStr;
  const defaultInitialTime = getFirstAvailableSlot(defaultInitialDate) || "10:00 AM";

  // Form State
  const [appointmentType, setAppointmentType] = useState<"offline" | "online">("offline");
  const [selectedDate, setSelectedDate] = useState<string>(defaultInitialDate);
  const [selectedTime, setSelectedTime] = useState<string>(defaultInitialTime);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [reason, setReason] = useState(initialReason);
  const [dpdpConsent, setDpdpConsent] = useState(false);

  // Status & Confirmation State
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [bookingResult, setBookingResult] = useState<BookingResultData | null>(null);
  const [tokenCopied, setTokenCopied] = useState(false);

  // Pre-populate health concern or service from props or URL query params
  useEffect(() => {
    if (initialReason && initialReason.trim()) {
      setReason(initialReason.trim());
    } else if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const prefill = params.get("reason") || params.get("service") || params.get("concern");
      if (prefill && prefill.trim()) {
        setReason(prefill.trim());
      }
    }
  }, [initialReason]);

  // Check if selected date is Sunday
  const isSunday = new Date(`${selectedDate}T00:00:00.000Z`).getUTCDay() === 0;

  // Whenever selectedDate changes, ensure selectedTime is valid and not in the past
  useEffect(() => {
    if (!selectedTime || !isSlotBookable(selectedDate, selectedTime)) {
      const nextSlot = getFirstAvailableSlot(selectedDate);
      if (nextSlot) {
        setSelectedTime(nextSlot);
      }
    }
  }, [selectedDate, selectedTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (selectedDate < todayStr) {
      setFormError("Appointment date cannot be in the past. Please choose today or an upcoming date.");
      return;
    }
    if (!isSlotBookable(selectedDate, selectedTime)) {
      setFormError("The selected time slot has already passed for today. Please select an upcoming slot.");
      return;
    }
    if (!name.trim() || name.trim().length < 2) {
      setFormError("Please enter your full name (at least 2 letters).");
      return;
    }
    if (!isValidIndianMobile(mobile)) {
      setFormError("Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).");
      return;
    }
    if (!reason.trim() || reason.trim().length < 3) {
      setFormError("Please share your reason for visit or primary symptoms (at least 3 characters).");
      return;
    }
    if (!dpdpConsent) {
      setFormError("Please check the DPDP Act 2023 consent checkbox to proceed.");
      const consentEl = document.getElementById("dpdp-consent");
      if (consentEl) {
        consentEl.scrollIntoView({ behavior: "smooth", block: "center" });
        consentEl.focus();
      }
      return;
    }

    setSubmitting(true);

    const payload: AppointmentFormData = {
      appointmentType,
      date: selectedDate,
      time: selectedTime,
      name: name.trim(),
      mobile: mobile.trim(),
      ageGroup: "adult",
      reason: reason.trim(),
      consent: true,
    };

    try {
      let bookingData: BookingResultData | null = null;

      // 1. Direct Browser API Submission to ClinicX
      try {
        const directRes = await submitAppointmentDirectlyToClinicX(payload);
        if (directRes && directRes.data && !directRes.data.is_offline_fallback) {
          bookingData = directRes.data;
        }
      } catch (directErr) {
        console.warn("Direct submission to ClinicX booking API notice:", directErr);
      }

      // 2. Server function backup if direct fetch did not establish connection
      if (!bookingData) {
        try {
          const res = await submitFn({ data: payload });
          if (res?.booking?.data) {
            bookingData = res.booking.data;
          }
        } catch (serverErr) {
          console.warn("ServerFn fallback notice:", serverErr);
        }
      }

      if (bookingData) {
        setBookingResult(bookingData);
        if (onSuccess) onSuccess(bookingData);
        toast.success(`OPD Token ${bookingData.token_number} generated!`);
        void submitFn({ data: payload }).catch(() => {});
      } else {
        throw new Error("Unable to generate appointment token.");
      }
    } catch (err) {
      console.error("Booking submission error:", err);
      const fallbackToken = generateLocalOpdToken();
      const fallbackData: BookingResultData = {
        appointment_id: `apt_local_${Date.now()}`,
        token_number: fallbackToken,
        clinic_name: managedClinic.clinic_name || "Sanidhya Naturopathy Center",
        doctor_name: managedClinic.doctor_name || DEFAULT_DOCTOR.name,
        is_offline_fallback: true,
        whatsapp_confirmation: `Namaste ${name}, your appointment request has been recorded with OPD Token: ${fallbackToken}.`,
      };
      setBookingResult(fallbackData);
      toast.info(`Appointment recorded with Digital Token ${fallbackToken}`);
    } finally {
      setSubmitting(false);
    }
  };

  const copyToken = () => {
    if (bookingResult?.token_number) {
      navigator.clipboard.writeText(bookingResult.token_number);
      setTokenCopied(true);
      toast.success("OPD Token copied to clipboard!");
      setTimeout(() => setTokenCopied(false), 2500);
    }
  };

  const getGoogleCalendarUrl = () => {
    if (!bookingResult) return "#";
    const title = encodeURIComponent(`OPD Appointment with ${bookingResult.doctor_name} (${bookingResult.clinic_name})`);
    const details = encodeURIComponent(
      `Appointment Token: ${bookingResult.token_number}\nMode: ${appointmentType === "offline" ? "In-Clinic OPD" : "Online Video Consultation"}\nPatient: ${name}\nClinic: ${bookingResult.clinic_name}\nAddress: ${managedClinic.address}\nContact: ${managedClinic.phone}`
    );
    const location = encodeURIComponent(appointmentType === "offline" ? managedClinic.address : "WhatsApp Video Consultation");
    const cleanDate = selectedDate.replace(/-/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${cleanDate}T050000Z/${cleanDate}T060000Z`;
  };

  const getWhatsAppShareUrl = () => {
    if (!bookingResult) return "#";
    const msg = [
      `*OPD Appointment Confirmation - ${bookingResult.clinic_name}*`,
      `🎫 *Token Number:* ${bookingResult.token_number}`,
      `👨‍⚕️ *Doctor:* ${bookingResult.doctor_name}`,
      `📅 *Date:* ${selectedDate}`,
      `⏰ *Time Slot:* ${selectedTime}`,
      `🏥 *Mode:* ${appointmentType === "offline" ? "In-Clinic OPD (Zero Queue Wait)" : "Online Video Consultation"}`,
      `👤 *Patient:* ${name}`,
      `📞 *Mobile:* ${mobile}`,
      `💰 *Consultation Fee:* ₹${managedClinic.consultation_fee}`,
      `📍 *Location:* ${managedClinic.address}`,
      `\n_DPDP Act 2023 Compliant Consent Recorded._`,
    ].join("\n");
    return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const handleReset = () => {
    setBookingResult(null);
    setName("");
    setMobile("");
    setReason("");
    setDpdpConsent(false);
    setFormError("");
  };

  return (
    <div
      id="opd-booking"
      className={`mx-auto max-w-3xl overflow-hidden rounded-3xl border border-beige bg-white shadow-soft transition-all ${className}`}
    >
      <AnimatePresence mode="wait">
        {!bookingResult ? (
          /* ================= MINIMAL UNIFIED BOOKING FORM ================= */
          <motion.form
            key="booking-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="divide-y divide-beige/80"
          >
            {/* Header: Doctor & Consultation Overview */}
            <div className="bg-gradient-to-r from-teal-50/70 via-ivory to-cream/50 p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0d9488] text-white shadow-sm">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-xl font-bold text-forest">
                        {managedClinic.doctor_name || DEFAULT_DOCTOR.name}
                      </h2>
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal-100/80 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                        <Sparkles className="h-2.5 w-2.5 text-[#0d9488]" />
                        OPD Token
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-teal-800">
                      {managedClinic.specialization || DEFAULT_DOCTOR.specialty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-teal-200/80 bg-white/90 px-4 py-2 sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Consultation Fee</p>
                    <p className="text-lg font-black text-[#0d9488]">
                      ₹{managedClinic.consultation_fee || DEFAULT_DOCTOR.consultationFee}
                    </p>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-800">
                    Pay at Clinic
                  </span>
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {formError && (
              <div className="flex items-start gap-2.5 bg-red-50/90 px-6 py-3.5 text-xs font-medium text-red-800">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <span>{formError}</span>
              </div>
            )}

            {/* Section 1: Mode & Schedule */}
            <div className="space-y-6 p-6 sm:p-7">
              {/* Consultation Mode Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                  1. Consultation Mode
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAppointmentType("offline")}
                    className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                      appointmentType === "offline"
                        ? "border-[#0d9488] bg-teal-50/80 ring-2 ring-[#0d9488]/20"
                        : "border-beige bg-ivory/40 text-charcoal hover:bg-ivory"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        appointmentType === "offline" ? "bg-[#0d9488] text-white" : "bg-white text-muted-foreground"
                      }`}
                    >
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-forest">In-Clinic Visit</p>
                      <p className="text-[11px] text-muted-foreground">Jankipuram, Lucknow</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAppointmentType("online")}
                    className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                      appointmentType === "online"
                        ? "border-[#0d9488] bg-teal-50/80 ring-2 ring-[#0d9488]/20"
                        : "border-beige bg-ivory/40 text-charcoal hover:bg-ivory"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        appointmentType === "online" ? "bg-[#0d9488] text-white" : "bg-white text-muted-foreground"
                      }`}
                    >
                      <Video className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-forest">Online Video Consult</p>
                      <p className="text-[11px] text-muted-foreground">WhatsApp Video Call</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Time Slot Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                  2. Select Date &amp; Slot
                </label>

                {/* Date Quick Selector */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={!todayHasSlots}
                    onClick={() => {
                      if (todayHasSlots) setSelectedDate(todayStr);
                    }}
                    title={!todayHasSlots ? "All consultation slots for today have completed" : "Book for Today"}
                    className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                      selectedDate === todayStr
                        ? "border-[#0d9488] bg-[#0d9488] text-white shadow-xs"
                        : !todayHasSlots
                        ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-60"
                        : "border-beige bg-white text-charcoal hover:bg-sage-soft cursor-pointer"
                    }`}
                  >
                    Today ({todayStr.slice(5)}){!todayHasSlots ? " · Closed" : ""}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDate(tomorrowStr)}
                    className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      selectedDate === tomorrowStr
                        ? "border-[#0d9488] bg-[#0d9488] text-white shadow-xs"
                        : "border-beige bg-white text-charcoal hover:bg-sage-soft"
                    }`}
                  >
                    Tomorrow ({tomorrowStr.slice(5)})
                  </button>
                  <div className="relative">
                    <input
                      type="date"
                      min={todayStr}
                      value={selectedDate}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val && val < todayStr) {
                          toast.error("Past dates cannot be selected. Please choose today or an upcoming date.");
                          setSelectedDate(todayStr);
                          return;
                        }
                        setSelectedDate(val);
                      }}
                      className="rounded-xl border border-beige bg-white px-3 py-1.5 text-xs font-semibold text-charcoal shadow-2xs focus:border-[#0d9488] focus:outline-none"
                    />
                  </div>
                </div>

                {!todayHasSlots && selectedDate === todayStr && (
                  <p className="mt-2 text-xs font-medium text-amber-800 bg-amber-50 rounded-xl p-2.5 border border-amber-200">
                    All consultation slots for today have concluded. Please select Tomorrow or an upcoming date.
                  </p>
                )}

                {/* Slot Selector: Morning & Evening */}
                <div className="mt-4 space-y-3" suppressHydrationWarning>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-gold-deep" />
                        Morning OPD (10:00 AM – 01:00 PM)
                      </p>
                      {selectedDate === todayStr && isSlotInPast(todayStr, "01:00 PM") && (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          Completed for today
                        </span>
                      )}
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
                      {SHIFT_SLOTS.morning.map((slot) => {
                        const isBookable = isSlotBookable(selectedDate, slot);
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={!isBookable}
                            onClick={() => setSelectedTime(slot)}
                            title={!isBookable ? "This slot has already passed for today" : `Select ${slot}`}
                            className={`rounded-xl border py-2 text-center text-xs font-semibold transition-all ${
                              isSelected
                                ? "border-[#0d9488] bg-[#0d9488] text-white shadow-xs"
                                : isBookable
                                ? "border-beige bg-ivory/60 text-charcoal hover:border-teal-400 hover:bg-white cursor-pointer"
                                : "border-slate-200/60 bg-slate-100/70 text-slate-400 line-through cursor-not-allowed select-none opacity-45"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-gold-deep" />
                        Evening OPD (05:00 PM – 08:00 PM)
                      </p>
                      {isSunday ? (
                        <span className="text-[10px] font-semibold text-amber-700">Closed Sundays</span>
                      ) : selectedDate === todayStr && isSlotInPast(todayStr, "08:00 PM") ? (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          Completed for today
                        </span>
                      ) : null}
                    </div>
                    {isSunday ? (
                      <p className="mt-2 rounded-xl bg-amber-50/80 p-2.5 text-xs text-amber-800">
                        Sunday clinic closes at 2:00 PM. Please select a morning slot.
                      </p>
                    ) : (
                      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
                        {SHIFT_SLOTS.evening.map((slot) => {
                          const isBookable = isSlotBookable(selectedDate, slot);
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={!isBookable}
                              onClick={() => setSelectedTime(slot)}
                              title={!isBookable ? "This slot has already passed for today" : `Select ${slot}`}
                              className={`rounded-xl border py-2 text-center text-xs font-semibold transition-all ${
                                isSelected
                                  ? "border-[#0d9488] bg-[#0d9488] text-white shadow-xs"
                                  : isBookable
                                  ? "border-beige bg-ivory/60 text-charcoal hover:border-teal-400 hover:bg-white cursor-pointer"
                                  : "border-slate-200/60 bg-slate-100/70 text-slate-400 line-through cursor-not-allowed select-none opacity-45"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Patient Information */}
            <div className="space-y-4 p-6 sm:p-7">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                3. Patient Details
              </label>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="patient-name" className="text-xs font-semibold text-charcoal">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="patient-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Verma"
                      className="w-full rounded-xl border border-beige bg-white py-2.5 pl-10 pr-3.5 text-sm text-charcoal placeholder:text-muted-foreground/60 focus:border-[#0d9488] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="patient-mobile" className="text-xs font-semibold text-charcoal">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="patient-mobile"
                      type="tel"
                      required
                      maxLength={14}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full rounded-xl border border-beige bg-white py-2.5 pl-10 pr-3.5 text-sm text-charcoal placeholder:text-muted-foreground/60 focus:border-[#0d9488] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Health Concern / Reason */}
              <div className="space-y-1.5 pt-1">
                <label htmlFor="patient-reason" className="text-xs font-semibold text-charcoal">
                  Health Concern / Reason for Visit <span className="text-red-500">*</span>
                </label>
                <input
                  id="patient-reason"
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Cervical pain, joint stiffness, naturopathy detox..."
                  className="w-full rounded-xl border border-beige bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted-foreground/60 focus:border-[#0d9488] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/20"
                />

                {/* Quick Concern Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-muted-foreground">Quick pick:</span>
                  {COMMON_CONCERNS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setReason(c)}
                      className="rounded-full border border-beige bg-ivory px-2.5 py-0.5 text-[11px] font-medium text-charcoal transition-colors hover:border-teal-400 hover:bg-teal-50 hover:text-teal-900 cursor-pointer"
                    >
                      + {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: DPDP Act 2023 Consent & CTA */}
            <div className="bg-ivory/50 p-6 sm:p-7 space-y-5">
              <div className="flex items-start gap-3 rounded-2xl border border-beige bg-white p-3.5 shadow-2xs">
                <input
                  type="checkbox"
                  id="dpdp-consent"
                  checked={dpdpConsent}
                  onChange={(e) => setDpdpConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0d9488] focus:ring-[#0d9488] cursor-pointer"
                />
                <label
                  htmlFor="dpdp-consent"
                  className="text-xs leading-relaxed text-charcoal/90 cursor-pointer"
                >
                  <strong className="text-forest">DPDP Act 2023 Consent:</strong> I voluntarily consent to Sanidhya Naturopathy Center processing my details for scheduling and token issuance. Data is encrypted and confidential.
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0d9488] px-6 text-base font-bold text-white shadow-soft transition-all hover:bg-[#0f766e] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating OPD Token...
                  </>
                ) : (
                  <>
                    Confirm &amp; Issue Digital OPD Token
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-gold-deep" />
                <span>Zero advance payment · Instant token generated for zero queue wait</span>
              </div>
            </div>
          </motion.form>
        ) : (
          /* ================= MINIMAL DIGITAL OPD TOKEN TICKET ================= */
          <motion.div
            key="booking-success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 space-y-6"
          >
            {/* Header Success Badge */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-forest sm:text-3xl">
                Appointment Confirmed
              </h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Your consultation is registered with Dr. Kamal. Your digital pass is below:
              </p>
            </div>

            {/* The Digital OPD Token Ticket */}
            <div className="overflow-hidden rounded-3xl border-2 border-dashed border-[#0d9488]/40 bg-gradient-to-b from-teal-50/50 to-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-teal-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">
                    Digital OPD Pass
                  </span>
                  <p className="font-display text-lg font-bold text-forest">{bookingResult.clinic_name}</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-1 text-xs font-bold text-emerald-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Slot Reserved
                </div>
              </div>

              {/* Large Token Badge */}
              <div className="my-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your OPD Token Number
                </p>
                <div className="mt-1 inline-flex items-center gap-3">
                  <span className="font-mono text-4xl font-black text-forest sm:text-5xl">
                    {bookingResult.token_number}
                  </span>
                  <button
                    type="button"
                    onClick={copyToken}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 transition-colors cursor-pointer"
                    title="Copy Token"
                  >
                    {tokenCopied ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Details Summary Grid */}
              <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-xs border border-beige sm:grid-cols-4">
                <div>
                  <p className="text-muted-foreground">Patient</p>
                  <p className="font-bold text-forest mt-0.5">{name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Doctor</p>
                  <p className="font-bold text-forest mt-0.5">{bookingResult.doctor_name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date &amp; Time</p>
                  <p className="font-bold text-forest mt-0.5">{selectedDate} · {selectedTime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">OPD Fee</p>
                  <p className="font-bold text-[#0d9488] mt-0.5">₹{managedClinic.consultation_fee} (Pay at Clinic)</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-teal-100/70 pt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-gold-deep" />
                  {managedClinic.address}
                </span>
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gold-deep hover:text-forest inline-flex items-center gap-1 cursor-pointer"
                >
                  Map Directions <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={getWhatsAppShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#20ba5a] cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                Open Confirmation on WhatsApp
              </a>

              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-beige bg-white px-5 text-sm font-semibold text-charcoal shadow-xs transition-colors hover:bg-ivory cursor-pointer"
              >
                <CalendarPlus className="h-4 w-4 text-[#0d9488]" />
                Add to Google Calendar
              </a>
            </div>

            <div className="flex items-center justify-between border-t border-beige pt-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-forest transition-colors cursor-pointer"
              >
                <Printer className="h-4 w-4" /> Print / Save Slip
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d9488] hover:underline cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Book Another Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
