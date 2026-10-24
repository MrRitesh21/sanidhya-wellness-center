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
        scrolled ? "bg-ivory/90 shadow-soft backdrop-blur-md" : "bg-ivory/60 backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6",
          scrolled ? "h-16" : "h-20",
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
            className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-forest/5 px-3.5 py-2 text-xs font-semibold text-forest transition-colors hover:border-forest/40 hover:bg-forest hover:text-ivory"
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

          {/* Mobile Quick Call Button */}
          <a
            href={clinic.phoneHref}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-forest hover:bg-forest/5 sm:hidden"
            aria-label={`Call ${clinic.phoneDisplay}`}
          >
            <Phone className="h-4 w-4 text-gold-deep" />
          </a>

          {/* Mobile Quick WhatsApp Button */}
          <a
            href={whatsappLink(
              "Hello Sanidhya Naturopathy Center, I would like to enquire about treatments and consultations.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-600/30 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white sm:hidden"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
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
            className="flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/5 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-x-0 bottom-0 top-[4rem] z-40 overflow-y-auto bg-ivory/98 pb-8 pt-2 backdrop-blur-lg lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="px-4">
              {NAV.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex min-h-[56px] items-center border-b border-beige/70 font-display text-2xl transition-colors active:text-gold-deep",
                      isActive ? "text-gold-deep font-semibold" : "text-forest",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 space-y-3 px-4">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  openBookingModal();
                }}
                className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-soft active:scale-[0.98]"
              >
                Book Appointment
              </button>
              <a
                href={clinic.phoneHref}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-forest/20 px-6 text-base font-semibold text-forest active:scale-[0.98]"
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
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-6 text-base font-semibold text-emerald-800 active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
