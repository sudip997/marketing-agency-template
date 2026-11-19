# Template #5 — Creative Marketing Website

## 1. Project Overview

Build a premium, modern, creative marketing website template using Next.js.

This template should represent a professional creative marketing agency or marketing studio. The website should communicate creativity, trust, innovation, and professionalism.

The design must feel visually distinctive, polished, and production-ready.

**Avoid making this look like a generic SaaS landing page.**

## 2. Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Motion (motion/react)
- Lucide React/tabler icons
- shadcn/ui when appropriate

Use the existing project structure and dependencies. Do not install unnecessary packages or replace existing configurations without permission.

## 3. Design Philosophy

The overall visual direction should be:

- Modern and premium
- Creative and expressive
- Bold but professional
- Editorial-inspired layouts
- Clean and spacious
- Visually engaging
- Minimal without looking empty

Prioritize strong visual hierarchy, thoughtful spacing, typography, and composition.

Avoid repetitive layouts, excessive rounded cards and generic gradients.

Every section should have its own visual identity while maintaining a consistent design language.

## 4. Color System

### Primary Accent

Bright Cobalt Blue: `#3155FF`
Dark Mode Primary: `#5472FF`

Use this as the primary brand color throughout the website.

### Light Mode (Default)

- Background: `#F8FAFC`
- Foreground: `#0F172A`
- Primary: `#3155FF`
- Secondary: `#E2E8F0`
- Muted: `#64748B`
- Accent Background: `#DBEAFE`
- Border: `#E2E8F0`

### Dark Mode

- Background: `#0B1120`
- Foreground: `#F8FAFC`
- Primary: `#5472FF`
- Secondary: `#1E293B`
- Muted: `#94A3B8`
- Accent Background: `#172554`
- Border: `#263247`

### Color Guidelines

- Light Mode is the default theme.
- Dark Mode must be fully supported.
- Both themes must look intentionally designed, not simply inverted.
- Use cobalt blue strategically for CTAs, highlights, icons, and interactive elements.
- Maintain sufficient contrast and readability.
- Avoid excessive blue backgrounds.
- Use semantic theme variables instead of hardcoded colors wherever possible.

## 5. Typography

### Primary Typography

- Headings: Space Grotesk
- Body: Inter

### Typography Guidelines

- Use bold, expressive headings.
- Create strong visual hierarchy.
- Use oversized typography for hero sections when appropriate.
- Use different font weights to create contrast.
- Keep paragraph text readable and comfortable.
- Use consistent typography across all sections.

Avoid making every heading look identical. Experiment with line breaks, highlighted words, different weights, and editorial-style compositions.

## 6. Layout & Spacing

- Use a consistent maximum-width container.
- Maintain generous vertical spacing between sections.
- Prefer clean grid and flex layouts.
- Experiment with asymmetrical layouts when appropriate.
- Use whitespace intentionally.
- Avoid unnecessary nested containers.
- Ensure responsive layouts across mobile, tablet, and desktop.

Do not force every section into the same layout pattern.

## 7. Components & Visual Elements

Use visual elements thoughtfully:

- Large image compositions
- Creative typography treatments
- Editorial-style project cards
- Brand logos and logo clouds
- Subtle background patterns
- Geometric shapes
- Custom SVG illustrations
- Interactive visual elements
- Carefully designed buttons and navigation

Prefer original visual compositions over generic stock-style UI elements.

## 8. Animation & Motion

Use Motion (`motion/react`) for meaningful animations.

Preferred animation styles:

- Smooth entrance animations
- Scroll-triggered reveals
- Staggered content animations
- Subtle hover interactions
- Image transitions
- Text reveal animations
- Animated decorative elements
- Smooth menu transitions

Animation guidelines:

- Keep animations smooth and professional.
- Avoid unnecessary continuous animations.
- Respect reduced-motion preferences.
- Ensure animations do not affect accessibility or performance.
- Make animations work correctly in both themes.

## 9. Light & Dark Mode

Implement a complete theme system.

Requirements:

- Light Mode as the default.
- Dark Mode as an alternative.
- Theme toggle in the Navbar.
- Persist theme preference.
- Prevent theme flashing where possible.
- Ensure all sections support both themes.
- Adapt shadows, borders, gradients, illustrations, and decorative elements for each theme.

Do not compromise the visual quality of either theme.

## 10. Responsive Design

Every section must work beautifully on:

- Mobile devices
- Tablets
- Laptops
- Large desktop screens

Guidelines:

- Mobile-first implementation.
- Appropriate typography scaling.
- Proper image sizing and positioning.
- No horizontal overflow.
- Responsive navigation.
- Touch-friendly interactive elements.
- Consistent spacing across breakpoints.

## 11. Code Quality

Write clean, maintainable, production-ready code.

Requirements:

- Use TypeScript properly.
- Prefer reusable components when appropriate.
- Use semantic HTML.
- Follow accessibility best practices.
- Use meaningful component and variable names.
- Avoid excessive prop drilling.
- Keep components organized.
- Avoid `any` unless absolutely necessary.
- Ensure no TypeScript or console errors.
- Optimize images and animations.

Do not overcomplicate simple components.

## 12. Important Development Rules

Before developing any section:

1. Understand the existing project structure.
2. Review existing components and design conventions.
3. Maintain consistency with the established design system.
4. Use existing dependencies whenever possible.
5. Avoid changing unrelated files.
6. Ensure the section works in both light and dark modes.
7. Ensure responsive behavior.
8. Verify the final implementation.

## 13. Creative Direction — Most Important

The main objective is to create a website that looks like a premium creative marketing brand, not another generic SaaS template.

Be creative with layouts, typography, colors, imagery, and interactions.

Do not blindly follow conventional landing page patterns.

Avoid:

- Generic hero sections
- Excessive rounded cards
- Overused glassmorphism
- Repetitive section compositions
- Generic AI-generated-looking layouts

Prioritize originality, visual storytelling, and professional execution.

**Quality over quantity. Every section should feel thoughtfully designed and visually impressive.**

When asked to create a section, focus on that section only. Do not modify unrelated sections unless necessary.
