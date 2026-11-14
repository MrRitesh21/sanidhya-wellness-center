import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CalendarCheck, MessageCircle, Phone, Sparkles } from "lucide-react";
import { clinic, whatsappLink } from "@/lib/clinic";

export function FloatingContactButtons() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMenu = () => setMenuOpen(document.body.classList.contains("mobile-menu-open"));
    checkMenu();
    const observer = new MutationObserver(checkMenu);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Sticky Bottom Action Bar (hidden when mobile navigation drawer is open) */}
      {!menuOpen && (
        <div
          id="mobile-bottom-bar"
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-2 border-t border-beige/80 bg-white/95 px-3 pt-2.5 pb-[calc(env(safe-area-inset-bottom,0px)+0.6rem)] shadow-lift backdrop-blur-md sm:hidden"
        >
          <a
            href={clinic.phoneHref}
            className="flex flex-1 min-h-[46px] items-center justify-center gap-1.5 rounded-full border border-forest/20 bg-forest/5 py-2 text-xs font-semibold text-forest active:scale-95 transition-transform"
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
            className="flex flex-1 min-h-[46px] items-center justify-center gap-1.5 rounded-full border border-emerald-500/30 bg-[#25D366] py-2 text-xs font-bold text-white shadow-sm active:scale-95 transition-transform"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-white text-white" />
            <span>WhatsApp</span>
          </a>

          <Link
            to="/booking"
            preload="render"
            className="flex flex-[1.1] min-h-[46px] items-center justify-center gap-1.5 rounded-full bg-primary py-2 text-xs font-bold text-primary-foreground shadow-sm active:scale-95 transition-transform"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span>Book Token</span>
          </Link>
        </div>
      )}

      {/* Desktop Floating Action Stack (Bottom-Right for Call, WhatsApp & Book) */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-2.5 sm:flex">
        {/* Floating Call Button */}
        <motion.a
          href={clinic.phoneHref}
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label={`Call ${clinic.phoneDisplay}`}
          className="group flex items-center gap-2 rounded-full border border-forest/20 bg-white/95 px-3.5 py-2 text-xs font-semibold text-forest shadow-soft backdrop-blur-md transition-all hover:border-forest/40 hover:bg-forest hover:text-ivory focus:outline-none focus:ring-2 focus:ring-gold/60"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest/10 group-hover:bg-ivory/20 transition-colors">
            <Phone className="h-3 w-3 text-gold-deep group-hover:text-gold" aria-hidden="true" />
          </span>
          <span>Call: {clinic.phoneDisplay}</span>
        </motion.a>

        {/* Floating WhatsApp Button */}
        <motion.a
          href={whatsappLink(
            "Hello Sanidhya Naturopathy Center, I would like to enquire about treatments and consultations.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Chat on WhatsApp"
          className="group flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lift transition-all hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />
            <MessageCircle className="h-5 w-5 fill-white text-white" aria-hidden="true" />
          </span>
          <span className="tracking-wide">WhatsApp Us</span>
        </motion.a>

        {/* Floating Book Appointment Trigger Linking to /booking */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Link
            to="/booking"
            preload="render"
            aria-label="Book an Appointment"
            className="flex items-center gap-2.5 rounded-full border border-gold/40 bg-forest px-4 py-3 text-sm font-semibold text-ivory shadow-lift transition-all hover:bg-forest-deep focus:outline-none focus:ring-2 focus:ring-gold/60 sm:px-5 sm:py-3.5"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-gold">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="tracking-wide">Book OPD Token</span>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
