/**
 * Original abstract compositions used as placeholder "project imagery".
 * They are pure SVG and use theme tokens only, so both themes stay intentional.
 * Swap any of them for <Image /> project photography later.
 */

const svgProps = {
  "aria-hidden": true,
  focusable: false,
  preserveAspectRatio: "xMidYMid slice",
  className: "absolute inset-0 size-full",
} as const;

/** Concentric arcs, a split circle and a tilted square. Sits on a primary background. */
export function ArcsArt() {
  return (
    <svg viewBox="0 0 300 500" {...svgProps}>
      <g fill="none" strokeWidth={1.5} className="stroke-primary-foreground/35">
        {[80, 140, 200, 260, 320].map((r) => (
          <circle key={r} cx={300} cy={500} r={r} />
        ))}
      </g>
      <circle cx={92} cy={160} r={58} className="fill-primary-foreground" />
      <path
        d="M92 102 A58 58 0 0 1 92 218 Z"
        className="fill-slate-900 dark:fill-slate-50"
      />
      <rect
        x={196}
        y={80}
        width={64}
        height={64}
        fill="none"
        strokeWidth={3}
        transform="rotate(14 228 112)"
        className="stroke-primary-foreground"
      />
    </svg>
  );
}

/** Dot grid, a primary disc and a triangle. Sits on a dark background. */
export function GridArt() {
  return (
    <svg viewBox="0 0 200 300" {...svgProps}>
      <defs>
        <pattern
          id="hero-art-dots"
          width={16}
          height={16}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={2} cy={2} r={1.4} className="fill-slate-50/35" />
        </pattern>
      </defs>
      <rect width={200} height={300} fill="url(#hero-art-dots)" />
      <circle cx={118} cy={118} r={64} className="fill-primary" />
      <path d="M20 250 L98 176 L98 250 Z" className="fill-slate-50" />
    </svg>
  );
}

/** Circular text ring for the "available" badge. */
export function BadgeRing({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 124 124"
      aria-hidden
      focusable={false}
      className="absolute inset-0 size-full"
    >
      <defs>
        <path
          id="hero-badge-ring"
          d="M62,62 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
        />
      </defs>
      <text
        fontSize={10.5}
        fontWeight={600}
        letterSpacing={2.2}
        className="fill-background"
      >
        <textPath href="#hero-badge-ring">{label}</textPath>
      </text>
    </svg>
  );
}
