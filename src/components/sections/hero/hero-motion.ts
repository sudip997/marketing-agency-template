import type { Variants } from "motion/react";

type Bezier = [number, number, number, number];

/** Shared easing so every hero animation feels like one system. */
export const easeOutExpo: Bezier = [0.22, 1, 0.36, 1];

/** Stagger orchestrator for the left column. */
export const column: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/** Stagger orchestrator for the headline lines. */
export const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Line slides up from behind an `overflow-hidden` mask. */
export const lineUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: easeOutExpo } },
};

/** Solid highlight block that wipes in behind the accent word. */
export const highlightWipe: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.75, ease: easeOutExpo },
  },
};
