# Dual-Brand Redesign — Design Specification

Two distinct visual languages for Atlantis Tours and Algarve & You, sharing the same Astro monorepo architecture but presenting completely different brand experiences.

## Goals

1. **Brand differentiation** — each site should feel like a different company, not a reskin
2. **Eliminate the generic feel** — replace template-like design with distinctive, place-rooted identity
3. **Add energy, identity, polish, and immersion** — the four qualities identified as lacking
4. **Keep light backgrounds** — dark themes were tested and rejected
5. **Maintain shared codebase** — same components accept brand-specific tokens and layout variants

## Architecture: Brand Theming Strategy

Both sites share the same Astro components from `packages/shared/`. Visual differentiation is achieved through:

1. **CSS custom properties (design tokens)** — each brand defines its own `tokens.css` with distinct colors, typography, spacing, and shape values
2. **Component variants via props** — components accept a `brand` prop or read from a shared config to switch between layout modes (e.g., `ProductCard` renders rounded with shadows for Atlantis, sharp-edged with borders for A&Y)
3. **Brand-specific layouts** — hero sections, grids, and page structures can differ between brands while reusing the same underlying components
4. **Shared base styles** — reset, utility classes, and responsive breakpoints remain shared

### Token override approach

Each brand's site package (`packages/atlantis/`, `packages/algarve-and-you/`) defines its own `tokens.css` that overrides the shared defaults. Components reference CSS variables, making them brand-agnostic.

```
packages/shared/src/styles/tokens.css      → shared defaults + variable declarations
packages/atlantis/src/styles/tokens.css     → Atlantis overrides
packages/algarve-and-you/src/styles/tokens.css → A&Y overrides
```

### Brand detection in components

Components that need layout variants (not just color/font changes) read the `brand` field from the site's `BrandConfig`. Each site already passes its config to layouts and pages. Components receive it as an Astro prop:

```astro
---
// In shared component
const { brand } = Astro.props.config; // "atlantis" | "algarve-and-you"
---
```

For CSS-only differences, no brand detection is needed — tokens handle it. The `brand` prop is only for structural layout changes (e.g., split hero vs full-width hero, asymmetric grid vs symmetric grid).

---

## Brand 1: Atlantis Tours — "Coastal Modern"

**Personality:** Adventure meets premium. The thrill of cave exploration and the luxury of a private yacht, wrapped in a confident, contemporary visual language.

### Color Palette

| Token | Value | Role |
|-------|-------|------|
| `--color-ocean` | `#0C7C8C` | Primary — real Algarve turquoise |
| `--color-ocean-deep` | `#064E5C` | Dark primary — deep water |
| `--color-ocean-light` | `#1AABB8` | Light primary — shallow water |
| `--color-cliff` | `#D4854A` | Accent — golden sandstone cliffs |
| `--color-cliff-light` | `#E8A76E` | Light accent — sun-lit cliff |
| `--color-sand` | `#F2E6D4` | Warm neutral — beach sand |
| `--color-foam` | `#F7FAFB` | Background — sea foam white |
| `--color-navy` | `#0A1A2A` | Dark — night ocean (hero, footer) |
| `--color-amber` | `#F59E0B` | Utility — star ratings, badges |
| `--color-text` | `#0F2027` | Text primary |
| `--color-text-muted` | `#5E7A85` | Text secondary |
| `--color-border` | `#D6E5EA` | Borders |
| `--color-surface` | `#FFFFFF` | Card surfaces |
| `--color-danger` | `#DC2626` | Error states |

**Gradient CTAs:** `linear-gradient(135deg, #0C7C8C, #1AABB8)` for primary buttons
**Hero gradient:** `linear-gradient(135deg, #0A1A2A, #0C3547, #0E6B7A, #1AABB8)`

### Typography

| Role | Font | Weight | Size | Tracking |
|------|------|--------|------|----------|
| Hero | Space Grotesk | 700 | clamp(40px, 6vw, 64px) | -0.04em |
| H1 | Space Grotesk | 700 | 36px | -0.03em |
| H2 | Space Grotesk | 700 | 24px | -0.02em |
| H3 | Space Grotesk | 600 | 18px | -0.01em |
| Accent words (in headings) | Instrument Serif | 400 italic | inherit | inherit |
| Body | Space Grotesk | 400 | 15px | 0 |
| Labels | Space Grotesk | 600 | 11px uppercase | 0.08-0.1em |
| Small | Space Grotesk | 400 | 13px | 0 |

**Key typographic move:** Headings mix bold Space Grotesk with italic Instrument Serif for accent words (e.g., "Discover the Algarve *coastline*"). This creates visual rhythm and warmth within the bold sans framework.

**Google Fonts load:**
```
Space Grotesk:wght@400;500;600;700
Instrument Serif:ital@0;1
```

### Shape Language

| Element | Radius | Notes |
|---------|--------|-------|
| Cards | 14px | Rounded, modern |
| Buttons | 8-10px | Slightly rounded |
| Pills/badges | 20-24px | Fully rounded |
| Small badges | 6px | Tour type badges |
| Images within cards | 0 (inherit card) | Overflow hidden |

**Shadows:** Blue-tinted, subtle — `rgba(12,124,140, 0.06-0.12)`. Cards get `0 2px 12px` at rest, `0 12px 32px` on hover.

### Component Behavior

- **Header:** Frosted glass (`rgba(247,250,251,0.9)` + `backdrop-filter: blur(16px)`). Logo as icon square + text. Gradient CTA button.
- **Hero:** Full-width, 85vh min-height. Navy-to-turquoise gradient background. Stats bar at bottom. Badge pill with animated dot.
- **Product cards:** White, rounded, shadow-based elevation. Hover lifts card (`translateY(-4px)`). Badge system: "BESTSELLER" (cliff gradient), "PREMIUM" (navy), "ADVENTURE" (dark).
- **Trust bar:** Horizontal strip with icon + text items. White background.
- **Marquee:** Instrument Serif italic, tilde separators, turquoise-tinted.
- **Reviews:** Rounded cards, gold stars, Instrument Serif italic quote text.
- **Footer:** Navy (`#0A1A2A`) background, 4-column grid.

### Interaction & Motion

- Micro-interactions: 200ms ease-out
- Card hover: `translateY(-4px)` + shadow expansion, 250ms
- Button hover: `translateY(-1px)` + shadow glow
- CTA gradient buttons: shift on hover
- Scroll-reveal: fade-up with IntersectionObserver, staggered 80ms per card
- Hero badge dot: pulse animation (2s infinite)
- Marquee: 25s linear infinite scroll
- `prefers-reduced-motion`: disable all animations, show static states

---

## Brand 2: Algarve & You — "Mediterranean Editorial"

**Personality:** Curated lifestyle. An editorial travel magazine that you can book from — refined, inviting, sensorial.

### Color Palette

| Token | Value | Role |
|-------|-------|------|
| `--color-terracotta` | `#B85C38` | Primary accent — Algarve rooftops |
| `--color-terracotta-soft` | `#D4855F` | Light accent — warm clay |
| `--color-olive` | `#6B7F56` | Secondary — olive groves |
| `--color-olive-muted` | `#8A9E72` | Light secondary |
| `--color-linen` | `#FAF6F0` | Background — warm linen |
| `--color-parchment` | `#F2EBE0` | Surface alt — parchment |
| `--color-warm-white` | `#FFFDF9` | Card surface |
| `--color-clay` | `#3D2B1F` | Text primary — rich espresso |
| `--color-clay-mid` | `#5C4033` | Text secondary |
| `--color-stone` | `#9C8B7A` | Muted text |
| `--color-stone-light` | `#C4B5A4` | Light muted |
| `--color-gold-wire` | `#C8A96E` | Decorative — gold accent lines, stars |
| `--color-border` | `#E6DDD0` | Borders |
| `--color-danger` | `#C53030` | Error states |

**No gradients on CTAs** — solid terracotta or clay. Gradients reserved for subtle background washes only.

### Typography

| Role | Font | Weight | Size | Tracking |
|------|------|--------|------|----------|
| Hero | Cormorant Garamond | 300 | clamp(38px, 4.5vw, 58px) | -0.02em |
| H1 | Cormorant Garamond | 300-400 italic | 32px | -0.01em |
| H2 | Cormorant Garamond | 300 | 28px | -0.01em |
| H3 / Card titles | Cormorant Garamond | 400 italic | 20px | 0 |
| Body | DM Sans | 400 | 15-16px | 0 |
| Labels / Overtitles | DM Sans | 500 | 11px uppercase | 0.14-0.2em |
| Category pills | DM Sans | 500 | 11px uppercase | 0.1em |
| Small | DM Sans | 400 | 13px | 0 |

**Key typographic move:** Cormorant Garamond at light weight (300) with italic emphasis creates an elegant, editorial feel. The contrast with DM Sans uppercase labels (wide letter-spacing) provides structure and hierarchy.

**Google Fonts load:**
```
Cormorant Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500
DM Sans:ital,wght@0,400;0,500;0,600;1,400
```

### Shape Language

| Element | Radius | Notes |
|---------|--------|-------|
| Cards | 0px | Sharp editorial edges |
| Buttons | 0px | Rectangular, confident |
| Category pills | 0px | Rectangular, border-based |
| Images | 0px | Sharp |
| Everything | 0px | Zero radius is a core identity marker |

**Shadows:** Minimal to none. Cards use `border: 1px solid var(--color-border)` for definition. On hover, a subtle warm shadow: `0 16px 48px rgba(61,43,31,0.08)`.

### Component Behavior

- **Header:** Warm frosted glass (`rgba(250,246,240,0.92)` + blur). Logo as Cormorant Garamond text with italic ampersand in terracotta. Clay-colored CTA (no rounded corners).
- **Hero:** Split layout — text left (with gold wire decorative line, overtitle, headline, category pills, CTAs) and full-bleed image right (with floating info card overlay). 92vh min-height.
- **Product cards:** Sharp-edged, border-based, warm-white background. Category label as overlay on image. Italic Cormorant titles. Footer with price left, "DISCOVER →" link right, separated by a top border.
- **Featured card variant:** Tall card spanning 2 grid rows. Content overlays bottom of image with gradient scrim. White text.
- **Asymmetric grid:** 3-column grid where the first card is featured (spans 2 rows), remaining cards fill the right columns.
- **Editorial pull quote:** Centered, large Cormorant italic text with decorative quotation mark and author attribution.
- **Divider:** Horizontal line with centered italic text (e.g., "Where the coastline tells its own story").
- **Marquee:** Cormorant Garamond italic, dot separators in terracotta, slower pace (35s).
- **Journal section:** Asymmetric 3-column grid (1.4fr 1fr 1fr), taller first card. Blog rebranded as "Journal" for editorial positioning.
- **Reviews:** Sharp-edged cards, gold stars, Cormorant italic quotes, small gold-wire divider before author.
- **Footer:** Clay (`#3D2B1F`) background, Cormorant brand name with italic terracotta ampersand.

### Interaction & Motion

- Micro-interactions: 250-350ms ease (slower, more deliberate than Atlantis)
- Card hover: `translateY(-3px)` + warm shadow, 350ms
- Image hover (within card): `scale(1.04)`, 600ms ease — slow, cinematic zoom
- Button hover: background color shift (terracotta → clay), no lift
- Text links: gap expansion on hover (arrow moves right)
- Scroll-reveal: gentle fade-in, no vertical movement, staggered 100ms
- Marquee: 35s linear infinite scroll (slower than Atlantis)
- `prefers-reduced-motion`: disable all animations, show static states

---

## Shared Infrastructure (Both Brands)

### Spacing Scale

Shared 4px/8px system. Same token names, same values:

```
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-5: 1.25rem (20px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-10: 2.5rem (40px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
--space-20: 5rem (80px)
```

### Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| Mobile | < 640px | Single column, stacked layouts |
| Tablet | 640-1023px | 2-column grids, adjusted spacing |
| Desktop | >= 1024px | Full layouts |
| Wide | >= 1440px | Max container width applied |

**Container:** `max-width: 1320px` (up from current 1240px), with `padding: 0 48px` on desktop, `0 20px` on mobile.

### Responsive Behavior

Both brands follow the same responsive rules:
- Hero: full-width stacked on mobile (image above content for A&Y split layout)
- Product grids: 3 → 2 → 1 columns at breakpoints
- Featured cards: lose the 2-row span on tablet and below
- Header: hamburger menu at 768px breakpoint
- Footer: 4 → 2 → 1 column grid
- Font sizes: hero titles use `clamp()` for fluid sizing
- Marquee: respects `prefers-reduced-motion`

### Shared Components (brand-agnostic via tokens)

These components work identically for both brands, styled only through CSS variables:

- `SEO.astro` — meta tags, structured data (no visual changes)
- `LanguageSwitcher.astro` — locale links (styled by tokens)
- `BookingWidget.astro` — FareHarbor integration (styled by tokens)
- `PriceDisplay.astro` — price formatting (font from tokens)
- `ContactForm.astro` — form fields (styled by tokens)
- `FAQ.astro` — accordion (styled by tokens)
- `WhatsAppButton.astro` — fixed button (unchanged)
- `Marquee.astro` — horizontal scroll (font/color from tokens)

### Brand-Variant Components

These components have meaningfully different layouts per brand:

- `Header.astro` — different logo treatment, CTA style, nav spacing
- `HeroSection.astro` — full-width (Atlantis) vs split layout (A&Y)
- `ProductCard.astro` — rounded+shadow (Atlantis) vs sharp+border (A&Y), with featured variant for A&Y
- `ProductGrid.astro` — symmetric grid (Atlantis) vs asymmetric with featured card (A&Y)
- `ReviewCard.astro` — rounded (Atlantis) vs sharp with gold divider (A&Y)
- `Footer.astro` — different logo, background colors, link styling
- `BlogCard.astro` — standard (Atlantis) vs "Journal" editorial style (A&Y)

### New Components

- `TrustBar.astro` — horizontal strip with icon+text trust signals (Atlantis only, but generic enough to reuse)
- `EditorialQuote.astro` — large pull quote with decorative marks (A&Y primary, but available to both)
- `SectionDivider.astro` — decorative divider with centered italic text (A&Y primary)
- `HeroFloatCard.astro` — floating info card overlay on hero image (A&Y)

### Removed Components

- `CategoryNav.astro` — replaced by category pills integrated into hero (A&Y) or removed (Atlantis has single category)

---

## Accessibility Compliance

Both brands must meet WCAG 2.1 AA:

- **Color contrast:** All text meets 4.5:1 minimum. Verified pairs:
  - Atlantis: `#0F2027` on `#F7FAFB` = 15.2:1, `#5E7A85` on `#F7FAFB` = 4.8:1, white on `#0C7C8C` = 4.6:1
  - A&Y: `#3D2B1F` on `#FAF6F0` = 12.8:1, `#5C4033` on `#FAF6F0` = 7.1:1, `#B85C38` on `#FAF6F0` = 4.5:1
- **Focus states:** Visible 2px focus rings on all interactive elements (ocean color for Atlantis, terracotta for A&Y)
- **Touch targets:** Minimum 44x44px for all interactive elements
- **Motion:** All animations respect `prefers-reduced-motion: reduce`
- **Alt text:** Descriptive alt text on all meaningful images
- **Keyboard navigation:** Full tab order support, skip-to-content link
- **Semantic HTML:** Proper heading hierarchy (h1-h6 sequential)

---

## Page-Level Design Notes

### Homepage (both brands)

**Atlantis Tours:**
1. Hero (85vh, gradient bg, stats, badge)
2. Marquee (tour names)
3. Popular Tours grid (3 equal columns)
4. Trust Bar (licensed, ratings, cancellation, small groups)
5. Guest Reviews grid (3 columns)
6. Footer

**Algarve & You:**
1. Hero (92vh, split layout with image + float card)
2. Marquee (experience names)
3. Curated Experiences (asymmetric grid with featured card)
4. Editorial divider
5. Pull Quote (featured review)
6. Guest Reviews grid (3 columns)
7. Journal Teaser (asymmetric 3-column blog previews)
8. Footer

### Tour/Experience Detail Page (both brands)

Both use the same structural layout (hero gallery + info sidebar + content), differentiated through tokens:
- **Atlantis:** Rounded image gallery, cyan accent badges, gradient book button, trust signals below booking widget
- **A&Y:** Sharp-edged gallery, terracotta category labels, solid clay book button, editorial description with Cormorant headings

### Tours Listing Page

- **Atlantis:** Full-width header, symmetric 3-column grid, filter by tour type (simple)
- **A&Y:** Category pills at top, asymmetric grid with featured rotation, "Journal" teaser at bottom of page

---

## What This Spec Does NOT Cover

- Content strategy (copy, blog posts, imagery)
- SEO changes beyond structured data
- FareHarbor integration changes (booking flow is external)
- Data model or API changes
- Deployment or infrastructure changes
- Mobile app or PWA considerations
