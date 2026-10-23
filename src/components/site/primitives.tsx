import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Natural, restrained easing used across the whole site. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Shared fade-up variants for staggered containers. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Scroll-triggered fade-up wrapper. Content stays accessible if JS is off. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  /** "dark" for ivory backgrounds, "light" for forest backgrounds */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em]",
          align === "center" && "justify-center",
          tone === "dark" ? "text-gold-deep" : "text-gold",
        )}
      >
        <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden="true" />
        {eyebrow}
        <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden="true" />
      </p>
      <h2
        className={cn(
          "mt-4 font-display text-4xl font-medium leading-[1.12] text-balance sm:text-5xl",
          tone === "dark" ? "text-forest" : "text-ivory",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-muted-foreground" : "text-ivory/75",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Hand-drawn botanical sprig used as a decorative accent. */
export function LeafSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 70"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 62 C 34 58, 66 46, 92 26 C 100 20, 110 12, 122 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M122 8 C 130 5, 137 4, 138 4 C 136 10, 130 18, 121 20 C 118 20, 116 17, 118 13 C 119 11, 120 9, 122 8 Z"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M30 57 C 38 50, 48 45, 58 44 C 55 52, 47 58, 37 60 C 33 60, 30 59, 30 57 Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M60 45 C 66 36, 74 29, 84 27 C 82 36, 75 44, 66 47 C 62 48, 60 47, 60 45 Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M46 53 C 44 46, 44 38, 47 31 C 53 36, 56 45, 53 52 C 51 55, 48 55, 46 53 Z"
        fill="currentColor"
        opacity="0.2"
      />
    </svg>
  );
}

/** A single leaf used for gentle floating decorations. */
export function FloatingLeaf({
  className,
  duration = 9,
  delay = 0,
}: {
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 40 40" fill="none" className="h-full w-full">
        <path
          d="M8 32 C 8 18, 18 8, 33 7 C 32 22, 22 32, 8 32 Z"
          fill="currentColor"
          opacity="0.35"
        />
        <path
          d="M10 30 C 16 24, 24 16, 31 9"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </motion.div>
  );
}
