export interface NavLink {
  label: string;
  /** Section id on the home page, used for active-link tracking. */
  id: string;
  href: string;
}

export const navbarContent = {
  brand: { name: "Marlowe", descriptor: "Studio" },
  email: "hello@marlowe.studio",
  cta: { label: "Start a project", href: "/#contact" },
} as const;

export const navLinks: readonly NavLink[] = [
  { label: "Work", id: "work", href: "/#work" },
  { label: "Services", id: "services", href: "/#services" },
  { label: "About", id: "about", href: "/#about" },
  { label: "Journal", id: "journal", href: "/#journal" },
  { label: "Contact", id: "contact", href: "/#contact" },
];
