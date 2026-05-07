---
name: Precision Tech
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001f26'
  on-tertiary-container: '#0090a9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  h1:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin: 64px
  container-max: 1280px
---

## Brand & Style

This design system is built on the pillars of technical precision, reliability, and modern efficiency. It reflects the persona of an expert technician—capable, clear, and forward-thinking. The visual direction follows a **Corporate / Modern** aesthetic, utilizing a structured layout and a high-contrast palette to instill a sense of trust and professionalism.

The UI avoids unnecessary decoration, favoring functional clarity and a "technical-luxury" feel. By combining sharp typographic hierarchies with ample whitespace, the design system ensures that complex product specifications and service details are easily digestible for both casual consumers and enterprise clients.

## Colors

The color strategy uses deep, authoritative tones to anchor the brand, paired with high-energy technical accents.

- **Primary (Deep Navy):** Used for headers, primary text, and grounding elements to establish trust.
- **Secondary (Slate Gray):** Utilized for supporting information, borders, and UI iconography to provide a professional, neutral balance.
- **Tertiary (Electric Cyan):** Reserved for critical touchpoints, call-to-action buttons, and progress indicators. It serves as a visual "spark" that represents innovation.
- **Neutral (Cool White):** Provides a clean, sterile background that allows product imagery to stand out without distraction.

## Typography

The typography pairing creates a balance between technical innovation and functional readability. 

**Space Grotesk** is used for headlines to provide a geometric, cutting-edge feel that mimics architectural and engineering prints. **Inter** is used for all body copy and UI labels, selected for its exceptional legibility on digital screens and its neutral, systematic character. All labels should use a slightly increased letter spacing and uppercase styling to distinguish them from standard body text.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop experiences to maintain a disciplined, professional structure. 

- **Grid:** A 12-column grid with 24px gutters.
- **Rhythm:** An 8px base-unit system governs all padding and margins to ensure mathematical consistency across the UI.
- **Alignment:** Content is centered within a 1280px max-width container. 
- **Application:** Use generous vertical padding (80px - 120px) between sections to allow the technical content to "breathe," preventing the interface from feeling cluttered or overwhelming.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and precise, low-opacity shadows. 

The background layer remains at the lowest elevation in the neutral light gray. Interactive surfaces, such as service cards or product modules, sit on a pure white surface with a "Micro-Shadow"—a 4px blur with 5% opacity using the primary navy color. This creates a subtle lift without the "muddiness" of traditional drop shadows.

For active states or modal overlays, use a secondary elevation tier with a slightly larger spread (12px blur) to clearly separate the focused element from the rest of the interface.

## Shapes

The shape language is **Rounded**, using a consistent 0.5rem (8px) radius for most UI elements. This softened geometry prevents the technical aesthetic from feeling cold or aggressive, making the brand feel more approachable and user-friendly.

- **Standard Buttons & Inputs:** 8px radius.
- **Product Cards:** 16px (rounded-lg) to create a distinct frame for hardware imagery.
- **Chips & Tags:** Fully pill-shaped to contrast against the more rigid grid structures.

## Components

### Call-to-Action Buttons
Buttons should be high-contrast. The primary CTA uses the Electric Cyan background with Primary Navy text for maximum visibility. Secondary buttons use a Slate Gray outline with a transparent background.

### Product Grids
Product cards feature a top-aligned image area with a subtle neutral-gray background fill to unify hardware of different aspect ratios. Pricing and "Add to Cart" buttons should be aligned to a strict bottom baseline.

### Service Cards
Service cards (e.g., "PC Repair," "Network Setup") should include a Tertiary-colored icon at the top left. The card should use a hover state that slightly increases the shadow depth and adds an Electric Cyan top border (2px) to indicate interactivity.

### Status Badges
Used for stock levels or service status (e.g., "In Stock," "Repair in Progress"). These should be small, uppercase labels with a subtle background tint of the status color (e.g., light green for available, light blue for in-progress).

### Technical Input Fields
Inputs should have a 1px Slate Gray border that shifts to Electric Cyan on focus. Include clear placeholder text in a muted slate-gray to guide the user through service request forms.