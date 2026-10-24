import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { clinic, whatsappLink } from "@/lib/clinic";
import { cn } from "@/lib/utils";
import { EASE } from "./primitives";
import { openBookingModal } from "@/lib/bookingModal";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5"
      aria-label="Sanidhya Naturopathy Center — Home"
    >
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          tone === "dark" ? "bg-sage-soft text-forest" : "bg-ivory/10 text-ivory",
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M4 20 C 4 11, 10 5, 20 4 C 19 14, 13 20, 4 20 Z"
            fill="currentColor"
            opacity="0.85"
          />
          <path
            d="M5.5 18.5 C 9 15, 13.5 10.5, 18.5 5.5"
            stroke={tone === "dark" ? "var(--color-forest)" : "var(--color-ivory)"}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-semibold tracking-wide",
            tone === "dark" ? "text-forest" : "text-ivory",
          )}
        >
          Sanidhya
        </span>
        <span
          className={cn(
            "mt-1 text-[0.55rem] font-bold uppercase tracking-[0.32em]",
            tone === "dark" ? "text-gold-deep" : "text-gold",
          )}
        >
          Naturopathy Center
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        open
          ? "bg-ivory border-b border-beige/80 shadow-sm"
          : scrolled
            ? "bg-ivory/95 shadow-soft backdrop-blur-md"
            : "bg-ivory/80 backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6",
          scrolled || open ? "h-16" : "h-16 sm:h-20",
        )}
      >
        <Logo />

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group relative text-sm font-medium transition-colors hover:text-gold-deep",
                  isActive ? "text-gold-deep font-semibold" : "text-forest",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-gold-deep transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Call Direct Button */}
          <a
            href={clinic.phoneHref}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-forest/5 px-3.5 py-2 text-xs font-semibold text-forest transition-colors hover:border-forest/40 hover:bg-forest hover:text-ivory"
            aria-label={`Call ${clinic.phoneDisplay}`}
          >
            <Phone className="h-3.5 w-3.5 text-gold-deep" />
            <span>{clinic.phoneDisplay}</span>
          </a>

          {/* Desktop/Tablet WhatsApp Direct Button */}
          <a
            href={whatsappLink(
              "Hello Sanidhya Naturopathy Center, I would like to enquire about treatments and consultations.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-600 hover:text-white"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600 group-hover:text-white" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => openBookingModal()}
            className={cn(
              "hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:bg-forest-deep active:scale-[0.98] sm:inline-flex",
            )}
          >
            Book Appointment
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/10 active:scale-95 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="close-icon"
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.22, ease: EASE }}
                >
                  <X className="h-6 w-6 text-forest" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  transition={{ duration: 0.22, ease: EASE }}
                >
                  <Menu className="h-6 w-6 text-forest" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-50 flex flex-col justify-between overflow-y-auto bg-ivory px-5 pb-10 pt-6 shadow-2xl lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="space-y-1">
              {NAV.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + index * 0.045,
                      duration: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "flex min-h-[52px] items-center rounded-2xl px-4 font-display text-2xl transition-all duration-200",
                        isActive
                          ? "bg-sage-soft/70 text-forest font-semibold shadow-xs"
                          : "text-forest hover:bg-forest/5 active:text-gold-deep",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 space-y-3 pt-6 border-t border-beige"
            >
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  openBookingModal();
                }}
                className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]"
              >
                Book Appointment
              </button>
              <a
                href={clinic.phoneHref}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-forest/20 bg-white/80 px-6 text-base font-semibold text-forest transition-colors hover:bg-forest/5 active:scale-[0.98]"
              >
                <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                Call {clinic.phoneDisplay}
              </a>
              <a
                href={whatsappLink(
                  "Hello Sanidhya Naturopathy Center, I would like to enquire about treatments and consultations.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-[#25D366] px-6 text-base font-bold text-white shadow-sm transition-all hover:bg-[#20bd5a] active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4 fill-white text-white" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
