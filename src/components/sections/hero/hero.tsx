"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { motion, MotionConfig } from "motion/react";

import { HeroCollage } from "./hero-collage";
import { heroContent } from "./hero-data";
import {
  column,
  fadeUp,
  headline,
  highlightWipe,
  lineUp,
} from "./hero-motion";

/** One headline line, revealed from behind a mask. */
function Line({ children }: { children: ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span variants={lineUp} className="block">
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden bg-background text-foreground"
      >
        {/* Faint editorial grid, fading out from the top-left */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_15%_20%,black,transparent)]"
        />

        {/* Top padding leaves room for the fixed navbar added later */}
        <div className="mx-auto w-full max-w-7xl px-5 pb-8 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            {/* Left: typography */}
            <motion.div
              variants={column}
              initial="hidden"
              animate="show"
              className="flex flex-col justify-between gap-12 lg:col-span-7"
            >
              <div className="flex flex-col gap-8 sm:gap-10">
                <motion.p
                  variants={fadeUp}
                  className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[13px]"
                >
                  <span aria-hidden className="h-0.5 w-10 shrink-0 bg-primary" />
                  {heroContent.eyebrow}
                </motion.p>

                <motion.h1
                  id="hero-heading"
                  variants={headline}
                  className="font-heading text-[length:clamp(2.75rem,8.4vw,6.25rem)] leading-[0.95] tracking-[-0.035em]"
                >
                  <Line>
                    <span className="font-normal text-muted-foreground">We build</span>
                  </Line>
                  <Line>
                    <span className="font-bold">brands</span>{" "}
                    <span className="font-normal">people</span>
                  </Line>
                  <Line>
                    <span className="font-bold">can’t </span>
                    <span className="relative isolate inline-block font-bold text-primary">
                      <motion.span
                        aria-hidden
                        variants={highlightWipe}
                        className="absolute -inset-x-[0.06em] bottom-[0.04em] -z-10 h-[0.36em] origin-left bg-accent"
                      />
                      ignore.
                    </span>
                  </Line>
                </motion.h1>
              </div>

              <motion.div
                variants={fadeUp}
                className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
              >
                <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {heroContent.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link
                    href={heroContent.primaryCta.href}
                    className="group inline-flex h-14 items-center gap-5 bg-primary pl-6 pr-2 text-base font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {heroContent.primaryCta.label}
                    <span className="grid size-10 place-items-center bg-primary-foreground text-primary">
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 transition-transform duration-300 group-hover:rotate-45"
                      />
                    </span>
                  </Link>

                  <Link
                    href={heroContent.secondaryCta.href}
                    className="group inline-flex min-h-11 items-center gap-3 text-base font-semibold outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="grid size-11 place-items-center border border-border transition-colors group-hover:border-primary group-hover:text-primary">
                      <Play aria-hidden className="size-4 fill-current" />
                    </span>
                    {heroContent.secondaryCta.label}
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: image collage */}
            <div className="lg:col-span-5">
              <HeroCollage />
            </div>
          </div>

          {/* Services + clients strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 flex flex-col gap-6 border-t border-border pt-6 lg:mt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {heroContent.clientsLabel}
            </p>
            <ul
              aria-label={heroContent.clientsLabel}
              className="flex flex-wrap items-center gap-x-10 gap-y-4 text-muted-foreground lg:gap-x-12"
            >
              {heroContent.clients.map((client) => (
                <li key={client.name} className={client.className}>
                  {client.name}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
