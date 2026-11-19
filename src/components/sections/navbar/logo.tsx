import Link from "next/link";

import { cn } from "@/lib/utils";

import { navbarContent } from "./navbar-data";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  const { name, descriptor } = navbarContent.brand;

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${name} ${descriptor}, home`}
      className={cn(
        "group inline-flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <svg viewBox="0 0 28 28" aria-hidden className="size-7 shrink-0">
        <rect width="28" height="28" className="fill-primary" />
        <path
          d="M7 21V8l7 8 7-8v13"
          fill="none"
          strokeWidth="3"
          strokeLinejoin="miter"
          className="stroke-primary-foreground"
        />
      </svg>
      <span className="font-heading text-xl font-bold leading-none tracking-tight text-foreground">
        {name}
        <span className="text-primary">.</span>
      </span>
      <span className="hidden pt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:inline">
        {descriptor}
      </span>
    </Link>
  );
}
