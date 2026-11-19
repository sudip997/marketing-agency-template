"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

import { ArcsArt, BadgeRing, GridArt } from "./hero-art";
import { collageCaptions } from "./hero-data";
import { easeOutExpo } from "./hero-motion";

type CollageFrameProps = {
  /** Absolute position and size, in % of the collage box. */
  className: string;
  /** Scroll parallax offset (transform only, so it stays cheap). */
  y: MotionValue<number>;
  /** Entrance delay in seconds. */
  delay: number;
  children: ReactNode;
};

function CollageFrame({ className, y, delay, children }: CollageFrameProps) {
  return (
    <motion.div style={{ y }} className={cn("absolute", className)}>
      <motion.figure
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1, delay, ease: easeOutExpo }}
        whileHover={{ y: -6 }}
        className="relative m-0 size-full overflow-hidden"
      >
        {children}
      </motion.figure>
    </motion.div>
  );
}

const captionClass =
  "absolute inset-x-3 z-10 flex items-baseline justify-between gap-2 text-[11px] font-semibold uppercase leading-tight tracking-[0.08em] sm:inset-x-4 sm:text-xs";

export function HeroCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Each frame drifts at a different rate for depth. Disabled for reduced motion.
  const yArcs = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -24]);
  const yType = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 48]);
  const yGrid = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -56]);

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Selected work"
      className="relative isolate mx-auto aspect-[5/6] w-full max-w-md sm:max-w-lg lg:max-w-none"
    >
      {/* Soft geometric disc behind the frames */}
      <div
        aria-hidden
        className="absolute -right-[10%] top-[30%] -z-10 aspect-square w-[52%] rounded-full bg-accent"
      />

      {/* A: tall, primary */}
      <CollageFrame
        y={yArcs}
        delay={0.25}
        className="left-0 top-[10%] z-10 h-[82%] w-[58%]"
      >
        <div className="absolute inset-0 bg-primary">
          <ArcsArt />
        </div>
        <figcaption
          className={cn(captionClass, "top-3 text-primary-foreground sm:top-4")}
        >
          <span>
            {collageCaptions.arcs.index} — {collageCaptions.arcs.title}
          </span>
          <span>{collageCaptions.arcs.meta}</span>
        </figcaption>
      </CollageFrame>

      {/* B: type specimen */}
      <CollageFrame
        y={yType}
        delay={0.45}
        className="right-0 top-0 z-10 h-[38%] w-[37%] border-[5px] border-background"
      >
        <div className="absolute inset-0 bg-accent">
          <span
            aria-hidden
            className="absolute left-2 top-0 font-heading text-[length:clamp(3.5rem,7.5vw,6.5rem)] font-bold leading-none tracking-tighter text-primary sm:left-3"
          >
            Aa
          </span>
        </div>
        <figcaption className={cn(captionClass, "bottom-2 text-foreground sm:bottom-3")}>
          <span>
            {collageCaptions.type.index} — {collageCaptions.type.title}
          </span>
        </figcaption>
      </CollageFrame>

      {/* C: dark, campaign */}
      <CollageFrame
        y={yGrid}
        delay={0.65}
        className="bottom-0 right-0 z-20 h-[50%] w-[44%] border-[5px] border-background"
      >
        <div className="absolute inset-0 bg-slate-900 dark:bg-secondary">
          <GridArt />
        </div>
        <figcaption className={cn(captionClass, "bottom-2 text-slate-50 sm:bottom-3")}>
          <span>
            {collageCaptions.campaign.index} — {collageCaptions.campaign.title}
          </span>
        </figcaption>
      </CollageFrame>

      {/* Availability badge */}
      <motion.a
        href="#contact"
        aria-label="Available for new projects. Book a call"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.1, ease: easeOutExpo }}
        whileHover={{ rotate: 14 }}
        className="absolute -left-[3%] bottom-0 z-30 grid aspect-square w-[27%] place-items-center rounded-full bg-foreground text-background outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <BadgeRing label="AVAILABLE FOR NEW PROJECTS • BOOK A CALL •" />
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-[22%] fill-none stroke-background"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </motion.a>
    </div>
  );
}
