export const heroContent = {
  eyebrow: "Independent creative studio · Est. 2018",
  description:
    "Marlowe is a creative marketing studio. Strategy, identity, campaigns and content for brands that would rather be remembered than be safe.",
  primaryCta: { label: "See our work", href: "#work" },
  secondaryCta: { label: "Watch the reel", href: "#reel" },
  services: ["Brand strategy", "Identity", "Campaigns", "Content"],
  clientsLabel: "Brands we’ve worked with",
  /** Placeholder wordmarks. Replace with real logo SVGs when available. */
  clients: [
    {
      name: "lumen",
      className: "font-heading text-2xl font-bold tracking-tighter",
    },
    {
      name: "OAKWELL",
      className: "font-heading text-xl font-medium tracking-[0.22em]",
    },
    {
      name: "Fieldnote",
      className: "text-[1.375rem] font-semibold italic tracking-tight",
    },
    {
      name: "VANTAGE/",
      className: "font-heading text-xl font-bold tracking-wide",
    },
    {
      name: "Kiln&Co",
      className: "text-xl font-semibold tracking-tight",
    },
  ],
} as const;

export const collageCaptions = {
  arcs: { index: "01", title: "Aurora Rebrand", meta: "2026" },
  type: { index: "02", title: "Typography" },
  campaign: { index: "03", title: "Campaign" },
} as const;
