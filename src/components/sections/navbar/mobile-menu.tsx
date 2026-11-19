"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

import { navbarContent, navLinks } from "./navbar-data";

type Bezier = [number, number, number, number];
const EASE: Bezier = [0.22, 1, 0.36, 1];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeId: string | null;
  /** The hamburger button, so focus can cycle through it and return to it. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({ open, onClose, activeId, triggerRef }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Scroll lock, Escape to close, focus trap, focus restore.
  React.useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () => {
      const inPanel = panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
          )
        : [];
      return trigger ? [trigger, ...inPanel] : inPanel;
    };

    // Move focus to the first link once the panel has mounted.
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open, onClose, triggerRef]);

  const panelVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        hidden: { clipPath: "inset(0 0 100% 0)" },
        visible: {
          clipPath: "inset(0 0 0% 0)",
          transition: {
            duration: 0.55,
            ease: EASE,
            when: "beforeChildren",
            staggerChildren: 0.07,
            delayChildren: 0.1,
          },
        },
        exit: {
          clipPath: "inset(0 0 100% 0)",
          transition: { duration: 0.4, ease: EASE },
        },
      };

  const itemVariants: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { y: "110%" },
        visible: { y: "0%", transition: { duration: 0.6, ease: EASE } },
      };

  const fadeVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background px-5 pb-8 pt-24 sm:px-8 lg:hidden"
        >
          {/* Faint editorial columns, same border token as the hero grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px)] [background-size:25%_100%]"
          />

          <nav aria-label="Mobile" className="relative flex-1">
            <ul className="flex flex-col">
              {navLinks.map((link, index) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id} className="overflow-hidden border-b border-border">
                    <motion.div variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "flex items-baseline gap-4 py-4 font-heading text-5xl font-bold leading-none tracking-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary sm:text-6xl",
                          isActive ? "text-primary" : "text-foreground hover:text-primary",
                        )}
                      >
                        <span className="w-8 font-mono text-xs font-medium tabular-nums text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div variants={fadeVariants} className="relative mt-10 space-y-6">
            <Link
              href={navbarContent.cta.href}
              onClick={onClose}
              className="group flex h-14 items-center justify-between bg-primary pl-6 pr-2 text-base font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {navbarContent.cta.label}
              <span className="grid size-10 place-items-center bg-primary-foreground text-primary">
                <ArrowUpRight
                  aria-hidden
                  className="size-5 transition-transform duration-300 group-hover:rotate-45"
                />
              </span>
            </Link>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <a
                href={`mailto:${navbarContent.email}`}
                className="text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
              >
                {navbarContent.email}
              </a>
              <ThemeToggle />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
