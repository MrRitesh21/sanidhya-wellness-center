import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { cn } from "@/lib/utils";
import { EASE } from "./primitives";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Approach", href: "#approach" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <a
      href="#top"
      className="flex items-center gap-2.5"
      aria-label="Sanidhya Naturopathy Center — back to top"
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
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        scrolled
          ? "bg-ivory/85 shadow-soft backdrop-blur-md"
          : "bg-transparent",
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
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-forest transition-colors hover:text-gold-deep"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold-deep transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#appointment"
            className={cn(
              "hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:bg-forest-deep active:scale-[0.98] sm:inline-flex",
            )}
          >
            Book Appointment
          </a>
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
            className="fixed inset-x-0 bottom-0 top-[4rem] z-40 overflow-y-auto bg-ivory/97 pb-8 pt-2 backdrop-blur-lg lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="px-4">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-[56px] items-center border-b border-beige/70 font-display text-2xl text-forest transition-colors active:text-gold-deep"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 space-y-3 px-4">
              <a
                href="#appointment"
                onClick={closeMenu}
                className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-soft active:scale-[0.98]"
              >
                Book Appointment
              </a>
              <a
                href={clinic.phoneHref}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-forest/20 px-6 text-base font-semibold text-forest active:scale-[0.98]"
              >
                <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                {clinic.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
