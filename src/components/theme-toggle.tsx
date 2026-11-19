"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const rotation = reduceMotion ? 0 : 90;
  const scale = reduceMotion ? 1 : 0.6;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"
      }
      className={cn(
        "relative inline-flex size-11 items-center justify-center text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {mounted ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -rotation, opacity: 0, scale }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: rotation, opacity: 0, scale }}
            transition={{ duration: reduceMotion ? 0.1 : 0.2, ease: "easeOut" }}
            className="flex"
          >
            {isDark ? (
              <Moon aria-hidden className="size-[18px]" />
            ) : (
              <Sun aria-hidden className="size-[18px]" />
            )}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span aria-hidden className="size-[18px]" />
      )}
    </button>
  );
}
