import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import { clinic, whatsappLink } from "@/lib/clinic";
import { openBookingModal } from "@/lib/bookingModal";

export function FloatingContactButtons() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Sticky Bottom Action Bar (visible on small screens) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-2 border-t border-beige/80 bg-white/95 px-3 py-2.5 shadow-lift backdrop-blur-md sm:hidden">
        <a
          href={clinic.phoneHref}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-forest/20 bg-forest/5 py-2.5 text-xs font-semibold text-forest active:scale-95"
          aria-label={`Call ${clinic.phoneDisplay}`}
        >
          <Phone className="h-3.5 w-3.5 text-gold-deep" />
          <span>Call Now</span>
        </a>

        <a
          href={whatsappLink(
            "Hello Sanidhya Naturopathy Center, I would like to enquire about treatments and consultations.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-900 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-3.5 w-3.5 text-emerald-700" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => openBookingModal()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-sm active:scale-95"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Book</span>
        </button>
      </div>

      {/* Desktop Floating Action Stack (Bottom-left for WhatsApp & Call) */}
      <div className="fixed bottom-6 left-6 z-40 hidden flex-col items-start gap-2.5 sm:flex">
        {/* Floating WhatsApp Button */}
        <motion.a
          href={whatsappLink(
            "Hello Sanidhya Naturopathy Center, I would like to enquire about treatments and consultations.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Chat on WhatsApp"
          className="group flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lift transition-all hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-30" />
            <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <span className="tracking-wide">WhatsApp Us</span>
        </motion.a>

        {/* Floating Call Button */}
        <motion.a
          href={clinic.phoneHref}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Call ${clinic.phoneDisplay}`}
          className="flex items-center gap-2 rounded-full border border-forest/20 bg-white/95 px-3.5 py-2 text-xs font-semibold text-forest shadow-soft backdrop-blur-sm transition-all hover:bg-forest hover:text-ivory focus:outline-none focus:ring-2 focus:ring-gold/60"
        >
          <Phone className="h-3.5 w-3.5 text-gold-deep" aria-hidden="true" />
          <span>Call: {clinic.phoneDisplay}</span>
        </motion.a>
      </div>
    </>
  );
}
