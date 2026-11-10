import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { clinic, whatsappLink } from "@/lib/clinic";
import { cn } from "@/lib/utils";
import { EASE } from "./primitives";
import { openBookingModal } from "@/lib/bookingModal";
import { CLINIC_LOGO_SRC } from "./logoAsset";

type NavItem = {
  label: string;
  href: "/" | "/about" | "/doctors" | "/services" | "/results" | "/contact" | "/booking";
  hash?: string;
};

const NAV: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Doctors", href: "/doctors" },
  { label: "Services", href: "/services" },
  { label: "Clinical Results", href: "/results" },
  { label: "Contact", href: "/contact" },
];

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  if (tone === "light") {
    return (
      <Link
        to="/"
        className="group inline-flex items-center gap-3 transition-opacity hover:opacity-95"
        aria-label="Sanidhya Naturopathy Center — Home"
      >
        <span className="flex items-center justify-center rounded-xl bg-ivory/95 p-1.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
          <img
            src={CLINIC_LOGO_SRC}
            alt="Sanidhya Naturopathy Center Logo"
            width={360}
            height={254}
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-display text-xl font-semibold tracking-wide text-ivory">
            Sanidhya
          </span>
          <span className="mt-0.5 text-[0.6rem] font-bold uppercase tracking-[0.28em] text-gold">
            Naturopathy Center
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-95"
      aria-label="Sanidhya Naturopathy Center — Home"
    >
      <img
        src={CLINIC_LOGO_SRC}
        alt="Sanidhya Naturopathy Center Logo"
        width={360}
        height={254}
        className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <span className="flex flex-col leading-tight">
        <span className="font-display text-[1.25rem] sm:text-[1.4rem] font-semibold tracking-wide text-forest">
          Sanidhya
        </span>
        <span className="mt-0.5 text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.28em] text-gold-deep">
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

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("mobile-menu-open");
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = original;
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,box-shadow] duration-200",
        open
          ? "bg-ivory border-b border-beige/80 shadow-sm"
          : scrolled
            ? "bg-ivory/95 shadow-soft backdrop-blur-md"
            : "bg-ivory/80 backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-[height] duration-200 sm:px-6",
          scrolled || open ? "h-16" : "h-16 sm:h-20",
        )}
      >
        <Logo />

        <nav aria-label="Main navigation" className="hidden items-center gap-4 xl:flex 2xl:gap-7">
          {NAV.map((item) => {
            const isActive = !item.hash && pathname === item.href;
            const content = (
              <>
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-gold-deep transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </>
            );

            if (item.hash) {
              return (
                <a
                  key={item.label}
                  href={`/#${item.hash}`}
                  className="group relative text-sm font-medium transition-colors hover:text-gold-deep text-forest"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "group relative text-sm font-medium transition-colors hover:text-gold-deep",
                  isActive ? "text-gold-deep font-semibold" : "text-forest",
                )}
              >
                {content}
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
            className="relative flex h-11 w-11 touch-manipulation items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/10 active:scale-95 xl:hidden"
          >
            <div className="relative h-6 w-6">
              <span
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out",
                  open
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-75 pointer-events-none",
                )}
              >
                <X className="h-6 w-6 text-forest" />
              </span>
              <span
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out",
                  !open
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-75 pointer-events-none",
                )}
              >
                <Menu className="h-6 w-6 text-forest" />
              </span>
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="fixed inset-x-0 bottom-0 top-16 z-[60] flex flex-col justify-between overflow-y-auto overscroll-contain bg-ivory px-5 pb-14 pt-6 shadow-2xl xl:hidden"
          >
            <nav aria-label="Mobile navigation" className="space-y-1">
              {NAV.map((item, index) => {
                const isActive = !item.hash && pathname === item.href;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.02 + index * 0.03,
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                  >
                    {item.hash ? (
                      <a
                        href={`/#${item.hash}`}
                        onClick={closeMenu}
                        className="flex min-h-[52px] items-center rounded-2xl px-4 font-display text-2xl transition-colors duration-150 text-forest hover:bg-forest/5 active:text-gold-deep"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={closeMenu}
                        className={cn(
                          "flex min-h-[52px] items-center rounded-2xl px-4 font-display text-2xl transition-colors duration-150",
                          isActive
                            ? "bg-sage-soft/70 text-forest font-semibold shadow-xs"
                            : "text-forest hover:bg-forest/5 active:text-gold-deep",
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.2, ease: "easeOut" }}
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
