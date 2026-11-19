"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import type { Variants } from "motion/react";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { navbarContent, navLinks } from "./navbar-data";

type Bezier = [number, number, number, number];
const EASE: Bezier = [0.22, 1, 0.36, 1];
const SECTION_IDS = navLinks.map((link) => link.id);

/** Tracks which home-page section is currently in the middle of the viewport. */
function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export function Navbar() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const activeId = useActiveSection(SECTION_IDS);

  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 12);

    if (latest > previous && latest > 160) setHidden(true);
    else if (latest < previous) setHidden(false);
  });

  // Close the mobile menu if the viewport grows into the desktop layout.
  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -24, opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? "-100%" : 0, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          solid ? "border-border bg-background" : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>

        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-6 px-5 sm:px-8 md:h-20 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <Logo onClick={closeMenu} className="justify-self-start" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((link, index) => (
                <DesktopNavItem
                  key={link.id}
                  index={index}
                  label={link.label}
                  href={link.href}
                  isActive={activeId === link.id}
                  reduceMotion={!!reduceMotion}
                />
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end">
            <ThemeToggle />

            <Link
              href={navbarContent.cta.href}
              className="group ml-3 hidden h-11 items-center gap-4 bg-primary pl-5 pr-1 text-sm font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex"
            >
              {navbarContent.cta.label}
              <span className="grid size-9 place-items-center bg-primary-foreground text-primary">
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:rotate-45"
                />
              </span>
            </Link>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative ml-1 inline-flex size-11 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-6">
                <motion.span
                  className="absolute left-0 block h-0.5 w-6 bg-foreground"
                  initial={false}
                  animate={menuOpen ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 block h-0.5 w-6 bg-foreground"
                  initial={false}
                  animate={menuOpen ? { top: 5, rotate: -45 } : { top: 10, rotate: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Rendered outside the header so its fixed positioning is never affected by the header's transform. */}
      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        activeId={activeId}
        triggerRef={triggerRef}
      />
    </>
  );
}

interface DesktopNavItemProps {
  index: number;
  label: string;
  href: string;
  isActive: boolean;
  reduceMotion: boolean;
}

const underline: Variants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
  active: { scaleX: 1 },
};

function DesktopNavItem({ index, label, href, isActive, reduceMotion }: DesktopNavItemProps) {
  return (
    <li>
      <motion.div
        initial="rest"
        animate={isActive ? "active" : "rest"}
        whileHover="hover"
        className="relative"
      >
        <Link
          href={href}
          aria-current={isActive ? "location" : undefined}
          className="group flex items-baseline gap-1.5 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            className={cn(
              "font-mono text-[10px] tabular-nums transition-colors",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "transition-colors",
              isActive ? "text-foreground" : "text-foreground/70 group-hover:text-foreground",
            )}
          >
            {label}
          </span>
        </Link>
        <motion.span
          aria-hidden
          variants={underline}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
          style={{ originX: 0 }}
          className="absolute inset-x-0 bottom-0 block h-px bg-primary"
        />
      </motion.div>
    </li>
  );
}
