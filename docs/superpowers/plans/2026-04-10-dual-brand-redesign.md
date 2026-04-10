# Dual-Brand Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement two distinct visual languages — "Coastal Modern" for Atlantis Tours and "Mediterranean Editorial" for Algarve & You — within the existing Astro monorepo, sharing components but presenting completely different brand experiences.

**Architecture:** Brand-specific CSS tokens override shared defaults. Components that need structural layout changes read a `brand` field from `BrandConfig`. Each site imports its own `tokens.css` via `PageLayout.astro`. No Tailwind — all custom CSS with design tokens via CSS custom properties.

**Tech Stack:** Astro 5, CSS custom properties, Google Fonts, pnpm monorepo with Turborepo

**Spec:** `docs/superpowers/specs/2026-04-10-dual-brand-redesign-design.md`

---

## File Map

### Modified files

| File | Changes |
|------|---------|
| `packages/shared/src/types.ts` | Add `brand` field to `BrandConfig` |
| `packages/atlantis/src/config.ts` | Add `brand: "atlantis"` |
| `packages/algarve-and-you/src/config.ts` | Add `brand: "algarve-and-you"` |
| `packages/shared/src/styles/tokens.css` | Restructure as semantic base tokens (variable declarations only) |
| `packages/shared/src/styles/base.css` | Update font import, heading styles to use semantic tokens |
| `packages/shared/src/styles/utilities.css` | Update button, chip, and utility classes for new token names |
| `packages/shared/src/layouts/PageLayout.astro` | Import brand-specific tokens, pass config to components |
| `packages/shared/src/components/Header.astro` | Full rewrite — brand-variant header |
| `packages/shared/src/components/Footer.astro` | Full rewrite — brand-variant footer |
| `packages/shared/src/components/HeroSection.astro` | Full rewrite — full-width (AT) vs split layout (A&Y) |
| `packages/shared/src/components/ProductCard.astro` | Full rewrite — rounded+shadow (AT) vs sharp+border (A&Y) |
| `packages/shared/src/components/ProductGrid.astro` | Rewrite — symmetric (AT) vs asymmetric with featured (A&Y) |
| `packages/shared/src/components/ReviewCard.astro` | Rewrite — rounded (AT) vs sharp with gold divider (A&Y) |
| `packages/shared/src/components/ReviewsGrid.astro` | Minor update — pass brand to ReviewCards |
| `packages/shared/src/components/BlogCard.astro` | Rewrite — standard (AT) vs editorial journal (A&Y) |
| `packages/shared/src/components/Marquee.astro` | Update fonts/colors to use new tokens |
| `packages/shared/src/components/PriceDisplay.astro` | Update to use semantic font tokens |
| `packages/shared/src/components/BookingWidget.astro` | Update to use new token names |
| `packages/shared/src/components/ContactForm.astro` | Update to use new token names |
| `packages/shared/src/components/FAQ.astro` | Update to use new token names |
| `packages/shared/src/components/LanguageSwitcher.astro` | Update to use new token names |
| `packages/shared/src/components/ProductHero.astro` | Update styling for brand variants |
| `packages/atlantis/src/pages/[locale]/index.astro` | Redesigned homepage layout |
| `packages/algarve-and-you/src/pages/[locale]/index.astro` | Redesigned homepage layout |
| `packages/atlantis/src/pages/[locale]/tours/[slug].astro` | Update for new component props |
| `packages/algarve-and-you/src/pages/[locale]/tours/[slug].astro` | Update for new component props |

### New files

| File | Purpose |
|------|---------|
| `packages/atlantis/src/styles/tokens.css` | Atlantis "Coastal Modern" token overrides |
| `packages/algarve-and-you/src/styles/tokens.css` | A&Y "Mediterranean Editorial" token overrides |
| `packages/shared/src/components/TrustBar.astro` | Trust signals strip (Atlantis primary) |
| `packages/shared/src/components/EditorialQuote.astro` | Pull quote with decorative marks (A&Y primary) |
| `packages/shared/src/components/SectionDivider.astro` | Decorative divider with centered text (A&Y primary) |
| `packages/shared/src/components/HeroFloatCard.astro` | Floating info card for hero image overlay (A&Y) |

### Removed files

| File | Reason |
|------|--------|
| `packages/shared/src/components/CategoryNav.astro` | Replaced by category pills in HeroSection (A&Y) / not needed (AT) |

---

## Task 1: Foundation — BrandConfig Type + Site Configs

**Files:**
- Modify: `packages/shared/src/types.ts:1-15`
- Modify: `packages/atlantis/src/config.ts`
- Modify: `packages/algarve-and-you/src/config.ts`

- [ ] **Step 1: Add `brand` field to BrandConfig**

In `packages/shared/src/types.ts`, add `brand` as the first field of `BrandConfig`:

```typescript
export type Brand = "atlantis" | "algarve-and-you";

export interface BrandConfig {
  brand: Brand;
  name: string;
  domain: string;
  // ... rest stays the same
```

- [ ] **Step 2: Update Atlantis config**

In `packages/atlantis/src/config.ts`, add `brand: "atlantis"` as the first field:

```typescript
export const config: BrandConfig = {
  brand: "atlantis",
  name: "Atlantis Tours",
  // ... rest stays the same
```

- [ ] **Step 3: Update Algarve & You config**

In `packages/algarve-and-you/src/config.ts`, add `brand: "algarve-and-you"` as the first field:

```typescript
export const config: BrandConfig = {
  brand: "algarve-and-you",
  name: "Algarve & You",
  // ... rest stays the same
```

- [ ] **Step 4: Verify build**

```bash
cd /home/jferreira/Work/projects/algarve-and-you-new
pnpm build
```

Expected: Both sites build successfully with no type errors.

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/types.ts packages/atlantis/src/config.ts packages/algarve-and-you/src/config.ts
git commit -m "feat: add brand identifier to BrandConfig type and site configs"
```

---

## Task 2: Token System — Shared Base + Brand Overrides

**Files:**
- Modify: `packages/shared/src/styles/tokens.css` (full rewrite)
- Create: `packages/atlantis/src/styles/tokens.css`
- Create: `packages/algarve-and-you/src/styles/tokens.css`

- [ ] **Step 1: Rewrite shared tokens.css as semantic base**

Replace `packages/shared/src/styles/tokens.css` with semantic variable declarations. These are the variable names that all components will reference. The actual values are set by brand overrides — the shared file provides fallback defaults (Atlantis values as default since it's the simpler brand):

```css
/* packages/shared/src/styles/tokens.css */
/* Base design tokens — overridden by brand-specific tokens.css */

:root {
  /* === Colors === */
  --color-bg: #F7FAFB;
  --color-bg-alt: #FFFFFF;
  --color-bg-dark: #0A1A2A;
  --color-surface: #FFFFFF;
  --color-primary: #0C7C8C;
  --color-primary-dark: #064E5C;
  --color-primary-light: #1AABB8;
  --color-accent: #D4854A;
  --color-accent-light: #E8A76E;
  --color-accent-hover: #B85C38;
  --color-text: #0F2027;
  --color-text-body: #5E7A85;
  --color-text-muted: #8A96A3;
  --color-border: #D6E5EA;
  --color-gold: #F59E0B;
  --color-danger: #DC2626;
  --color-success: #0C7C8C;
  --color-secondary: #5E7A85;
  --color-secondary-light: #8A96A3;

  /* === Typography === */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Space Grotesk', system-ui, sans-serif;
  --font-accent: 'Instrument Serif', Georgia, serif;

  --text-xs: 0.6875rem;   /* 11px */
  --text-sm: 0.8125rem;   /* 13px */
  --text-base: 0.9375rem; /* 15px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.75rem;    /* 28px */
  --text-4xl: 2rem;       /* 32px */
  --text-5xl: 2.25rem;    /* 36px */
  --text-hero: clamp(2.5rem, 6vw, 4rem); /* 40-64px */

  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  --leading-none: 1;
  --leading-tight: 1.08;
  --leading-snug: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;
  --leading-loose: 1.75;

  --tracking-tighter: -0.04em;
  --tracking-tight: -0.03em;
  --tracking-normal: 0;
  --tracking-wide: 0.08em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.14em;

  /* === Spacing === */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;

  /* === Shape === */
  --radius-none: 0px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 14px;
  --radius-pill: 20px;
  --radius-full: 9999px;

  /* Card & button radius (brand-specific) */
  --radius-card: 14px;
  --radius-button: 8px;

  /* === Shadows === */
  --shadow-sm: 0 1px 4px rgba(12, 124, 140, 0.06);
  --shadow-md: 0 2px 12px rgba(12, 124, 140, 0.08);
  --shadow-lg: 0 12px 32px rgba(12, 124, 140, 0.12);

  /* === Layout === */
  --max-width: 1320px;
  --header-height: 64px;

  /* === Transitions === */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease-out;
  --transition-slow: 350ms ease;
}
```

- [ ] **Step 2: Create Atlantis brand tokens**

Create directory and file `packages/atlantis/src/styles/tokens.css`:

```bash
mkdir -p packages/atlantis/src/styles
```

```css
/* packages/atlantis/src/styles/tokens.css */
/* Atlantis Tours — "Coastal Modern" */
/* Overrides shared token defaults */

:root {
  /* === Colors — Algarve coast palette === */
  --color-bg: #F7FAFB;           /* Sea foam */
  --color-bg-alt: #F2E6D4;       /* Sand */
  --color-bg-dark: #0A1A2A;      /* Night ocean */
  --color-surface: #FFFFFF;
  --color-primary: #0C7C8C;      /* Algarve turquoise */
  --color-primary-dark: #064E5C; /* Deep water */
  --color-primary-light: #1AABB8;/* Shallow water */
  --color-accent: #D4854A;       /* Golden sandstone */
  --color-accent-light: #E8A76E; /* Sun-lit cliff */
  --color-accent-hover: #B87038;
  --color-text: #0F2027;
  --color-text-body: #5E7A85;
  --color-text-muted: #8A96A3;
  --color-border: #D6E5EA;
  --color-gold: #F59E0B;         /* Amber — ratings */
  --color-danger: #DC2626;
  --color-success: #0C7C8C;

  /* === Typography === */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Space Grotesk', system-ui, sans-serif;
  --font-accent: 'Instrument Serif', Georgia, serif;

  /* === Shape — Rounded, modern === */
  --radius-card: 14px;
  --radius-button: 8px;

  /* === Shadows — Blue-tinted === */
  --shadow-sm: 0 1px 4px rgba(12, 124, 140, 0.06);
  --shadow-md: 0 2px 12px rgba(12, 124, 140, 0.08);
  --shadow-lg: 0 12px 32px rgba(12, 124, 140, 0.12);

  /* === Transitions — Snappy === */
  --transition-base: 200ms ease-out;
  --transition-slow: 250ms ease;
}
```

- [ ] **Step 3: Create Algarve & You brand tokens**

Create directory and file `packages/algarve-and-you/src/styles/tokens.css`:

```bash
mkdir -p packages/algarve-and-you/src/styles
```

```css
/* packages/algarve-and-you/src/styles/tokens.css */
/* Algarve & You — "Mediterranean Editorial" */
/* Overrides shared token defaults */

:root {
  /* === Colors — Warm Algarve landscape === */
  --color-bg: #FAF6F0;            /* Linen */
  --color-bg-alt: #F2EBE0;        /* Parchment */
  --color-bg-dark: #3D2B1F;       /* Clay */
  --color-surface: #FFFDF9;       /* Warm white */
  --color-primary: #B85C38;       /* Terracotta */
  --color-primary-dark: #9A4A2D;  /* Deep terracotta */
  --color-primary-light: #D4855F; /* Soft terracotta */
  --color-accent: #C8A96E;        /* Gold wire */
  --color-accent-light: #D4BC8A;  /* Light gold */
  --color-accent-hover: #B8960B;
  --color-secondary: #6B7F56;     /* Olive */
  --color-secondary-light: #8A9E72; /* Muted olive */
  --color-text: #3D2B1F;          /* Clay */
  --color-text-body: #5C4033;     /* Clay mid */
  --color-text-muted: #9C8B7A;    /* Stone */
  --color-border: #E6DDD0;
  --color-gold: #C8A96E;          /* Gold wire — ratings */
  --color-danger: #C53030;
  --color-success: #6B7F56;       /* Olive */

  /* === Typography === */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-accent: 'Cormorant Garamond', Georgia, serif;

  /* === Shape — Sharp editorial === */
  --radius-card: 0px;
  --radius-button: 0px;

  /* === Shadows — Minimal, warm-tinted === */
  --shadow-sm: 0 1px 4px rgba(61, 43, 31, 0.04);
  --shadow-md: 0 4px 16px rgba(61, 43, 31, 0.06);
  --shadow-lg: 0 16px 48px rgba(61, 43, 31, 0.08);

  /* === Transitions — Deliberate, slower === */
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}
```

- [ ] **Step 4: Verify files exist**

```bash
ls -la packages/atlantis/src/styles/tokens.css packages/algarve-and-you/src/styles/tokens.css packages/shared/src/styles/tokens.css
```

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/styles/tokens.css packages/atlantis/src/styles/tokens.css packages/algarve-and-you/src/styles/tokens.css
git commit -m "feat: restructure token system with brand-specific overrides

Shared tokens.css provides semantic variable declarations.
Atlantis tokens: ocean/cliff/sand palette, rounded shapes, blue shadows.
A&Y tokens: terracotta/olive/stone palette, sharp edges, warm shadows."
```

---

## Task 3: Base Styles + Font Loading

**Files:**
- Modify: `packages/shared/src/styles/base.css` (full rewrite)
- Modify: `packages/shared/src/layouts/PageLayout.astro`

- [ ] **Step 1: Rewrite base.css with semantic tokens**

Replace `packages/shared/src/styles/base.css` entirely:

```css
/* packages/shared/src/styles/base.css */
/* Base styles — uses semantic tokens from brand-specific tokens.css */

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-body);
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body {
  background-color: var(--color-bg);
  color: var(--color-text-body);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
}

/* Headings */
h1, h2, h3 {
  font-family: var(--font-display);
  color: var(--color-text);
  line-height: var(--leading-snug);
}

h4, h5, h6 {
  font-family: var(--font-body);
  color: var(--color-text);
  font-weight: var(--weight-semibold);
}

h1 { font-size: var(--text-5xl); }
h2 { font-size: var(--text-4xl); }
h3 { font-size: var(--text-2xl); }
h4 { font-size: var(--text-xl); }

/* Links */
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}
a:hover {
  color: var(--color-primary-dark);
}

/* Images */
img {
  max-width: 100%;
  display: block;
}

/* Selection */
::selection {
  background-color: var(--color-primary);
  color: white;
}

/* Focus */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Update PageLayout.astro to load brand-specific tokens**

In `packages/shared/src/layouts/PageLayout.astro`, the component needs to conditionally load the right font files and import brand tokens. Since Astro components can't dynamically import CSS at build time, the approach is:

1. PageLayout imports only shared base styles (base.css, utilities.css)
2. Each site's page files import their own brand tokens before PageLayout renders

Update `packages/shared/src/layouts/PageLayout.astro`. In the frontmatter, add a `brand` extraction:

```astro
---
import SEO from '../components/SEO.astro';
import type { BrandConfig } from '../types';

interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  locale: string;
  path: string;
  config: BrandConfig;
  structuredData?: Record<string, unknown>;
}

const { title, description, image, type = 'website', locale, path, config, structuredData } = Astro.props;
const brand = config.brand;

// Font URLs per brand
const fontUrls: Record<string, string> = {
  'atlantis': 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600;700&display=swap',
  'algarve-and-you': 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap',
};
const fontUrl = fontUrls[brand] || fontUrls['atlantis'];
---

<!DOCTYPE html>
<html lang={locale}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href={fontUrl} rel="stylesheet" />
  <SEO
    title={title}
    description={description}
    image={image}
    type={type}
    locale={locale}
    path={path}
    config={config}
    structuredData={structuredData}
  />
  {config.analytics.gtag && (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.gtag}`}></script>
      <script define:vars={{ gtagId: config.analytics.gtag }}>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', gtagId);
      </script>
    </>
  )}
</head>
<body>
  <slot name="header" />
  <main>
    <slot />
  </main>
  <slot name="footer" />
</body>
</html>

<style is:global>
  @import "@algarve-tourism/shared/styles/tokens.css";
  @import "@algarve-tourism/shared/styles/base.css";
  @import "@algarve-tourism/shared/styles/utilities.css";
</style>

<script>
  // Scroll reveal
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(20px)';
      (el as HTMLElement).style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }
</script>
```

- [ ] **Step 3: Add brand token imports to each site's homepage**

In `packages/atlantis/src/pages/[locale]/index.astro`, add at the top of the `<style>` or as a global import before the layout:

Add a `<style is:global>` block at component level in the Atlantis homepage that imports Atlantis tokens (which override the shared defaults):

This is better handled by creating a small wrapper layout per site. Create `packages/atlantis/src/layouts/Layout.astro`:

```astro
---
// packages/atlantis/src/layouts/Layout.astro
// Wraps PageLayout and injects Atlantis-specific tokens
import PageLayout from '@algarve-tourism/shared/layouts/PageLayout.astro';
import type { BrandConfig } from '@algarve-tourism/shared/types';

interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  locale: string;
  path: string;
  config: BrandConfig;
  structuredData?: Record<string, unknown>;
}

const props = Astro.props;
---

<PageLayout {...props}>
  <slot name="header" slot="header" />
  <slot />
  <slot name="footer" slot="footer" />
</PageLayout>

<style is:global>
  @import "../../styles/tokens.css";
</style>
```

Create the same for A&Y at `packages/algarve-and-you/src/layouts/Layout.astro`:

```astro
---
// packages/algarve-and-you/src/layouts/Layout.astro
// Wraps PageLayout and injects A&Y-specific tokens
import PageLayout from '@algarve-tourism/shared/layouts/PageLayout.astro';
import type { BrandConfig } from '@algarve-tourism/shared/types';

interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  locale: string;
  path: string;
  config: BrandConfig;
  structuredData?: Record<string, unknown>;
}

const props = Astro.props;
---

<PageLayout {...props}>
  <slot name="header" slot="header" />
  <slot />
  <slot name="footer" slot="footer" />
</PageLayout>

<style is:global>
  @import "../../styles/tokens.css";
</style>
```

- [ ] **Step 4: Update homepage imports to use site-specific Layout**

In both homepage files, replace:
```
import PageLayout from '@algarve-tourism/shared/layouts/PageLayout.astro';
```
with:
```
import Layout from '../../layouts/Layout.astro';
```

And replace `<PageLayout>` / `</PageLayout>` with `<Layout>` / `</Layout>` in the template.

Do this for ALL page files in both sites (index, tours, about, contact, blog, faq, reviews, terms, cancellation-policy, transfers). Use find-and-replace across each site's `src/pages/` directory.

- [ ] **Step 5: Verify build**

```bash
pnpm build
```

Expected: Both sites build. Visual appearance may look different due to new token values — this is expected. The key is no build errors.

- [ ] **Step 6: Commit**

```bash
git add packages/shared/src/styles/base.css packages/shared/src/layouts/PageLayout.astro packages/atlantis/src/layouts/ packages/algarve-and-you/src/layouts/ packages/atlantis/src/pages/ packages/algarve-and-you/src/pages/
git commit -m "feat: wire up brand-specific token loading via site layouts

Each site has its own Layout.astro wrapper that imports brand tokens
after the shared defaults, enabling CSS variable overrides.
Font loading is brand-aware via PageLayout."
```

---

## Task 4: Utility Classes Update

**Files:**
- Modify: `packages/shared/src/styles/utilities.css` (full rewrite)

- [ ] **Step 1: Rewrite utilities.css with new token names**

Replace `packages/shared/src/styles/utilities.css`:

```css
/* packages/shared/src/styles/utilities.css */
/* Shared utility classes — styled via brand tokens */

/* Layout */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-12);
}

@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-5);
  }
}

.section {
  padding: var(--space-20) 0;
}

.section-sm {
  padding: var(--space-12) 0;
}

/* Section label */
.section-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--space-2);
}

/* Section title */
.section-title {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  color: var(--color-text);
  line-height: var(--leading-tight);
}

.section-title em {
  font-family: var(--font-accent);
  font-style: italic;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  border-radius: var(--radius-button);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}
.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
}

.btn-accent {
  background: var(--color-accent);
  color: white;
}
.btn-accent:hover {
  background: var(--color-accent-hover);
}

.btn-outline {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
.btn-outline:hover {
  border-color: var(--color-text);
  background: rgba(0, 0, 0, 0.02);
}

.btn-white {
  background: white;
  color: var(--color-text);
}
.btn-white:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Category pills */
.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-button);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-base);
}

.chip:hover {
  color: var(--color-text);
  border-color: var(--color-text);
  background: rgba(0, 0, 0, 0.02);
}

.chip.active {
  background: var(--color-text);
  color: var(--color-bg);
  border-color: var(--color-text);
}

/* Tag */
.tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  border-radius: var(--radius-sm);
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Text utilities */
.text-muted {
  color: var(--color-text-muted);
}

/* Divider */
.divider {
  border: none;
  border-top: 1px solid var(--color-border);
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/shared/src/styles/utilities.css
git commit -m "feat: update utility classes for semantic token system"
```

---

## Task 5: Header Component — Brand Variants

**Files:**
- Modify: `packages/shared/src/components/Header.astro` (full rewrite)

- [ ] **Step 1: Read current Header.astro**

Read `packages/shared/src/components/Header.astro` to understand the current props interface and mobile menu logic before rewriting.

- [ ] **Step 2: Rewrite Header.astro with brand variants**

The Header receives `config` (BrandConfig), `locale`, and `currentPath` as props. It renders a frosted-glass sticky header with brand-specific logo treatment and CTA styling. The mobile hamburger menu logic stays the same.

Key brand differences:
- **Atlantis:** Logo = icon square (gradient) + bold text, gradient CTA, rounded button
- **A&Y:** Logo = Cormorant Garamond text with italic `&` in terracotta, solid clay CTA, sharp button

Write the full component with conditional rendering based on `config.brand`. The component uses scoped `<style>` blocks with CSS variables so most styling is token-driven. Only the logo and CTA markup differ.

**Important implementation notes:**
- Keep the same Props interface: `{ config: BrandConfig; locale: string; currentPath: string }`
- Keep the existing mobile menu toggle script
- Navigation links: use `config.brand === 'algarve-and-you'` to show "Experiences" / "Journal" vs "Tours" / "About"
- Include LanguageSwitcher component
- The `nav-cta` link text: "Book Now" (Atlantis) vs "Reserve" (A&Y)

- [ ] **Step 3: Verify with dev server**

```bash
cd packages/atlantis && pnpm dev
```

Open http://localhost:4321/en/ — verify the Atlantis header renders with the Coastal Modern style.

```bash
cd packages/algarve-and-you && pnpm dev
```

Open http://localhost:4322/en/ — verify the A&Y header renders with the Mediterranean Editorial style.

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/Header.astro
git commit -m "feat: redesign Header with brand-variant logo and CTA styles"
```

---

## Task 6: Footer Component — Brand Variants

**Files:**
- Modify: `packages/shared/src/components/Footer.astro` (full rewrite)

- [ ] **Step 1: Read current Footer.astro**

Read `packages/shared/src/components/Footer.astro` to understand props and i18n usage.

- [ ] **Step 2: Rewrite Footer.astro with brand variants**

Key brand differences:
- **Atlantis:** Navy (`--color-bg-dark`) background, bold text logo with cyan brand name, 4-column grid, links: Tours (cave circuits, yacht cruises, fishing, private charters), Company, Legal
- **A&Y:** Clay (`--color-bg-dark`) background, Cormorant logo with italic terracotta `&`, 4-column grid, links: Experiences (boats, gastronomy, spa, land tours, transfers), Discover (journal, about, reviews, contact, faq), Legal

Both share the same structural layout (4-col grid + bottom bar), so most can be token-driven with content differences from `config`.

- [ ] **Step 3: Verify on both dev servers**

Check both sites render correct footer styles.

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/Footer.astro
git commit -m "feat: redesign Footer with brand-specific colors and content"
```

---

## Task 7: New Components — TrustBar, EditorialQuote, SectionDivider, HeroFloatCard

**Files:**
- Create: `packages/shared/src/components/TrustBar.astro`
- Create: `packages/shared/src/components/EditorialQuote.astro`
- Create: `packages/shared/src/components/SectionDivider.astro`
- Create: `packages/shared/src/components/HeroFloatCard.astro`

- [ ] **Step 1: Create TrustBar.astro**

Horizontal strip with 4 trust signals (icon + title + subtitle). Used on Atlantis homepage.

```astro
---
// packages/shared/src/components/TrustBar.astro
interface TrustItem {
  icon: string; // SVG string
  title: string;
  subtitle: string;
}

interface Props {
  items: TrustItem[];
}

const { items } = Astro.props;
---

<section class="trust-bar">
  <div class="trust-bar-inner">
    {items.map((item) => (
      <div class="trust-item">
        <div class="trust-icon" set:html={item.icon} />
        <div>
          <div class="trust-title">{item.title}</div>
          <div class="trust-subtitle">{item.subtitle}</div>
        </div>
      </div>
    ))}
  </div>
</section>

<style>
  .trust-bar {
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-10) var(--space-12);
  }
  .trust-bar-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: var(--space-12);
    flex-wrap: wrap;
  }
  .trust-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .trust-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    background: var(--color-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    flex-shrink: 0;
  }
  .trust-icon :global(svg) {
    width: 18px;
    height: 18px;
  }
  .trust-title {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--color-text);
  }
  .trust-subtitle {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }

  @media (max-width: 768px) {
    .trust-bar-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-6);
    }
  }
  @media (max-width: 480px) {
    .trust-bar-inner {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Create EditorialQuote.astro**

Large pull quote with decorative marks. Used on A&Y homepage.

```astro
---
// packages/shared/src/components/EditorialQuote.astro
interface Props {
  text: string;
  author: string;
  origin?: string;
}

const { text, author, origin } = Astro.props;
---

<section class="editorial-quote">
  <div class="quote-mark">"</div>
  <blockquote class="quote-text">{text}</blockquote>
  <div class="quote-attr">
    <strong>{author}</strong>
    {origin && <span> — {origin}</span>}
  </div>
</section>

<style>
  .editorial-quote {
    padding: var(--space-20) var(--space-12);
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  .quote-mark {
    font-family: var(--font-display);
    font-size: 4rem;
    color: var(--color-primary-light);
    line-height: 0.5;
    margin-bottom: var(--space-4);
    opacity: 0.5;
  }
  .quote-text {
    font-family: var(--font-accent);
    font-size: var(--text-3xl);
    font-weight: var(--weight-light);
    font-style: italic;
    color: var(--color-text);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-6);
  }
  .quote-attr {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
  }
  .quote-attr strong {
    color: var(--color-text-body);
    font-weight: var(--weight-semibold);
  }

  @media (max-width: 768px) {
    .editorial-quote {
      padding: var(--space-16) var(--space-5);
    }
    .quote-text {
      font-size: var(--text-xl);
    }
  }
</style>
```

- [ ] **Step 3: Create SectionDivider.astro**

Decorative horizontal divider with centered italic text.

```astro
---
// packages/shared/src/components/SectionDivider.astro
interface Props {
  text?: string;
}

const { text } = Astro.props;
---

<div class="section-divider">
  <div class="divider-line"></div>
  {text && <div class="divider-text">{text}</div>}
  {text && <div class="divider-line"></div>}
</div>

<style>
  .section-divider {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    padding: 0 var(--space-12);
  }
  .divider-line {
    flex: 1;
    height: 1px;
    background: var(--color-border);
  }
  .divider-text {
    font-family: var(--font-accent);
    font-style: italic;
    font-size: var(--text-base);
    color: var(--color-text-muted);
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .section-divider {
      padding: 0 var(--space-5);
    }
    .divider-text {
      font-size: var(--text-sm);
    }
  }
</style>
```

- [ ] **Step 4: Create HeroFloatCard.astro**

Floating info card for A&Y hero image overlay.

```astro
---
// packages/shared/src/components/HeroFloatCard.astro
interface Props {
  label: string;
  title: string;
  meta: string;
  href?: string;
}

const { label, title, meta, href } = Astro.props;
const Tag = href ? 'a' : 'div';
---

<Tag class="hero-float-card" href={href}>
  <div class="float-label">{label}</div>
  <div class="float-title">{title}</div>
  <div class="float-meta">{meta}</div>
</Tag>

<style>
  .hero-float-card {
    position: absolute;
    bottom: var(--space-12);
    left: var(--space-8);
    background: rgba(255, 253, 249, 0.92);
    backdrop-filter: blur(16px);
    padding: var(--space-5) var(--space-6);
    border: 1px solid rgba(230, 221, 208, 0.6);
    max-width: 260px;
    z-index: 2;
    text-decoration: none;
    transition: transform var(--transition-base);
  }
  .hero-float-card:hover {
    transform: translateY(-2px);
  }
  .float-label {
    font-size: 10px;
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    color: var(--color-primary);
    font-weight: var(--weight-medium);
    margin-bottom: var(--space-1);
  }
  .float-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: var(--weight-regular);
    font-style: italic;
    color: var(--color-text);
    margin-bottom: var(--space-1);
  }
  .float-meta {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }

  @media (max-width: 768px) {
    .hero-float-card {
      display: none;
    }
  }
</style>
```

- [ ] **Step 5: Export new components from shared package**

Verify the new components are accessible. Astro components in the shared package are imported directly by path — no barrel exports needed. They should be importable as:

```
import TrustBar from '@algarve-tourism/shared/components/TrustBar.astro';
```

Verify this works by checking the `exports` field in `packages/shared/package.json`.

- [ ] **Step 6: Commit**

```bash
git add packages/shared/src/components/TrustBar.astro packages/shared/src/components/EditorialQuote.astro packages/shared/src/components/SectionDivider.astro packages/shared/src/components/HeroFloatCard.astro
git commit -m "feat: add TrustBar, EditorialQuote, SectionDivider, HeroFloatCard components"
```

---

## Task 8: ProductCard + ProductGrid — Brand Variants

**Files:**
- Modify: `packages/shared/src/components/ProductCard.astro` (full rewrite)
- Modify: `packages/shared/src/components/ProductGrid.astro` (full rewrite)

- [ ] **Step 1: Read current ProductCard.astro and ProductGrid.astro**

Read both files to understand props, data shape, and slot usage.

- [ ] **Step 2: Rewrite ProductCard.astro**

The ProductCard receives a `NormalizedItem` and `brand` string. Key differences:

- **Atlantis:** Rounded (14px), white bg, shadow elevation, bold sans title, "Book Now" button, hover lifts card
- **A&Y:** Sharp (0px), warm-white bg, border-based, italic serif title, "Discover →" link, hover lifts card with warm shadow. Has a `featured` variant (tall card with image overlay content)

Props:
```typescript
interface Props {
  item: NormalizedItem;
  brand: Brand;
  locale: string;
  featured?: boolean; // A&Y only — tall featured card variant
}
```

The component conditionally renders based on `brand` and `featured`. Use CSS classes for brand variants: `.card`, `.card--atlantis`, `.card--ay`, `.card--featured`.

- [ ] **Step 3: Rewrite ProductGrid.astro**

ProductGrid renders a grid of ProductCards.

- **Atlantis:** Symmetric 3-column grid (`repeat(auto-fill, minmax(300px, 1fr))`)
- **A&Y:** Asymmetric 3-column grid. First item is `featured` (spans 2 rows). Remaining items fill right columns.

Props:
```typescript
interface Props {
  items: NormalizedItem[];
  brand: Brand;
  locale: string;
}
```

- [ ] **Step 4: Verify on both dev servers**

Check product cards render correctly for each brand. Check the A&Y featured card layout.

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/components/ProductCard.astro packages/shared/src/components/ProductGrid.astro
git commit -m "feat: redesign ProductCard and ProductGrid with brand variants

Atlantis: rounded cards with shadow elevation, bold sans titles.
A&Y: sharp-edged cards with borders, italic serif titles, featured card variant."
```

---

## Task 9: HeroSection — Brand Variants

**Files:**
- Modify: `packages/shared/src/components/HeroSection.astro` (full rewrite)

- [ ] **Step 1: Read current HeroSection.astro**

Read the file to understand props, image handling, and CTA logic.

- [ ] **Step 2: Rewrite HeroSection.astro**

The most structurally different component between brands.

**Atlantis Hero:** Full-width, 85vh, gradient background with image overlay. Stats bar at bottom (years, happy explorers, rating). Badge pill with animated dot. Bold headline with italic accent word. Two CTAs (primary white + secondary ghost).

**A&Y Hero:** Split layout (grid: 1fr 1fr), 92vh. Left side: gold wire line, overtitle, headline (light serif italic), description, category pills, CTAs (terracotta solid + text link). Right side: full-bleed image with HeroFloatCard overlay.

Props:
```typescript
interface Props {
  config: BrandConfig;
  locale: string;
  title: string;
  subtitle?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}
```

Use `config.brand` to switch between layouts. On mobile (< 768px), the A&Y split layout stacks (image on top, content below).

- [ ] **Step 3: Verify hero rendering on both sites**

```bash
cd packages/atlantis && pnpm dev
cd packages/algarve-and-you && pnpm dev
```

Check Atlantis shows full-width gradient hero with stats. Check A&Y shows split layout with float card.

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/HeroSection.astro
git commit -m "feat: redesign HeroSection with full-width (AT) vs split (A&Y) layouts"
```

---

## Task 10: ReviewCard + ReviewsGrid + Marquee + Minor Components

**Files:**
- Modify: `packages/shared/src/components/ReviewCard.astro`
- Modify: `packages/shared/src/components/ReviewsGrid.astro`
- Modify: `packages/shared/src/components/Marquee.astro`
- Modify: `packages/shared/src/components/PriceDisplay.astro`
- Modify: `packages/shared/src/components/BookingWidget.astro`
- Modify: `packages/shared/src/components/ContactForm.astro`
- Modify: `packages/shared/src/components/FAQ.astro`
- Modify: `packages/shared/src/components/LanguageSwitcher.astro`
- Modify: `packages/shared/src/components/BlogCard.astro`
- Modify: `packages/shared/src/components/ProductHero.astro`

- [ ] **Step 1: Rewrite ReviewCard.astro**

Brand differences:
- **Atlantis:** Rounded card, gold amber stars, Instrument Serif italic quote, author name
- **A&Y:** Sharp card, gold-wire stars, Cormorant italic quote, small gold divider before author

Props add `brand: Brand`.

- [ ] **Step 2: Update ReviewsGrid.astro**

Pass `brand` through to ReviewCards. 3-column grid for both brands. Add scroll-reveal `data-reveal` attributes with staggered delays.

- [ ] **Step 3: Update Marquee.astro**

Replace hardcoded font references with `var(--font-accent)`. Update separator color to `var(--color-primary-light)`. Already uses scoped styles — just update the CSS variable references.

- [ ] **Step 4: Update PriceDisplay.astro**

Replace `font-family` references with `var(--font-display)`. Replace color references with `var(--color-text)`.

- [ ] **Step 5: Update BookingWidget.astro**

Update CTA button styling to use `var(--color-primary)`, `var(--radius-button)`, and `var(--font-body)`.

- [ ] **Step 6: Update ContactForm.astro**

Update input borders to `var(--color-border)`, focus color to `var(--color-primary)`, submit button to use `.btn-primary` class or equivalent token-driven styles.

- [ ] **Step 7: Update FAQ.astro**

Update border colors, expand/collapse icon color, typography references to use semantic tokens.

- [ ] **Step 8: Update LanguageSwitcher.astro**

Update active locale styling to use `var(--color-text)` for active, `var(--color-text-muted)` for inactive.

- [ ] **Step 9: Rewrite BlogCard.astro**

Brand differences:
- **Atlantis:** Rounded card, standard date + title + excerpt, coral "Read more" link
- **A&Y:** Sharp card (journal style), editorial date (month year), italic Cormorant title, "Read story →" in terracotta uppercase

Props add `brand: Brand`.

- [ ] **Step 10: Update ProductHero.astro**

Update gallery image radius to `var(--radius-card)`, category label to use token colors, booking button to use token-driven styles. Pass `brand` for structural differences:
- **Atlantis:** Gradient book button, trust signals below widget
- **A&Y:** Solid clay book button, editorial description headings

- [ ] **Step 11: Commit**

```bash
git add packages/shared/src/components/ReviewCard.astro packages/shared/src/components/ReviewsGrid.astro packages/shared/src/components/Marquee.astro packages/shared/src/components/PriceDisplay.astro packages/shared/src/components/BookingWidget.astro packages/shared/src/components/ContactForm.astro packages/shared/src/components/FAQ.astro packages/shared/src/components/LanguageSwitcher.astro packages/shared/src/components/BlogCard.astro packages/shared/src/components/ProductHero.astro
git commit -m "feat: update all remaining components for new token system and brand variants"
```

---

## Task 11: Remove CategoryNav

**Files:**
- Delete: `packages/shared/src/components/CategoryNav.astro`

- [ ] **Step 1: Check for imports of CategoryNav**

```bash
grep -r "CategoryNav" packages/ --include="*.astro" --include="*.ts"
```

Remove any import references found.

- [ ] **Step 2: Delete the file**

```bash
rm packages/shared/src/components/CategoryNav.astro
```

Category filtering is now handled by:
- **A&Y:** Category pills integrated into HeroSection
- **Atlantis:** Not needed (single category)

For the tours listing page, category pills will be rendered inline rather than via a separate component.

- [ ] **Step 3: Commit**

```bash
git add -A packages/shared/src/components/CategoryNav.astro
git commit -m "feat: remove CategoryNav — replaced by inline category pills"
```

---

## Task 12: Atlantis Homepage

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/index.astro` (full rewrite)

- [ ] **Step 1: Rewrite Atlantis homepage**

New homepage section order:
1. Header (slot="header")
2. HeroSection — full-width gradient, stats, badge, "Explore Tours" + "Watch Video" CTAs
3. Marquee — tour name ticker
4. Popular Tours — section label + title + ProductGrid (3-col symmetric, first 6 items)
5. TrustBar — 4 trust signals (licensed, ratings, cancellation, small groups)
6. Guest Reviews — section label + title + ReviewsGrid (first 3 reviews)
7. Footer (slot="footer")
8. WhatsAppButton

The page uses `Layout` (from `../../layouts/Layout.astro`), not `PageLayout` directly.

Pass `config` to all components. Pass `config.brand` (or `config`) to components that need brand awareness.

Import new components: `TrustBar`.

Define trust items array with SVG icons inline:

```typescript
const trustItems = [
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    title: 'Licensed & Insured',
    subtitle: 'Full maritime certification',
  },
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    title: '4.9 on TripAdvisor',
    subtitle: '2,400+ verified reviews',
  },
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>',
    title: 'Free Cancellation',
    subtitle: 'Up to 24h before departure',
  },
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
    title: 'Small Groups',
    subtitle: 'Intimate, personal experience',
  },
];
```

- [ ] **Step 2: Verify Atlantis homepage**

```bash
cd packages/atlantis && pnpm dev
```

Open http://localhost:4321/en/ — verify:
- Coastal Modern hero with stats
- Tour cards are rounded with shadows
- Trust bar renders
- Reviews render with rounded cards
- Footer is navy

- [ ] **Step 3: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/index.astro
git commit -m "feat: redesign Atlantis Tours homepage — Coastal Modern layout"
```

---

## Task 13: Algarve & You Homepage

**Files:**
- Modify: `packages/algarve-and-you/src/pages/[locale]/index.astro` (full rewrite)

- [ ] **Step 1: Rewrite A&Y homepage**

New homepage section order:
1. Header (slot="header")
2. HeroSection — split layout with image + float card, category pills
3. Marquee — experience name ticker
4. Curated Experiences — section label + title ("A Taste of *What Awaits*") + ProductGrid (asymmetric, first 6 items, first is featured)
5. SectionDivider — "Where the coastline tells its own story"
6. EditorialQuote — featured review as pull quote (pick the best review)
7. Guest Reviews — section label + title ("What They *Remember*") + ReviewsGrid (first 3 reviews)
8. Journal Teaser — section label + title ("Stories from *the Coast*") + 3 BlogCards in asymmetric grid (if blog posts exist)
9. Footer (slot="footer")
10. WhatsAppButton

Import new components: `EditorialQuote`, `SectionDivider`.

For the EditorialQuote, pick the highest-rated review or the first one and render it as a pull quote.

For the journal section, wrap BlogCards in an asymmetric grid:
```css
.journal-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: var(--space-5);
}
```

- [ ] **Step 2: Verify A&Y homepage**

```bash
cd packages/algarve-and-you && pnpm dev
```

Open http://localhost:4322/en/ — verify:
- Split hero with category pills
- Asymmetric product grid with featured card
- Editorial divider text
- Pull quote section
- Sharp-edged review cards
- Journal teaser section
- Clay-colored footer

- [ ] **Step 3: Commit**

```bash
git add packages/algarve-and-you/src/pages/[locale]/index.astro
git commit -m "feat: redesign Algarve & You homepage — Mediterranean Editorial layout"
```

---

## Task 14: Tour Detail Pages

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/tours/[slug].astro`
- Modify: `packages/algarve-and-you/src/pages/[locale]/tours/[slug].astro`

- [ ] **Step 1: Read both current tour detail pages**

Understand the current structure, how items are loaded, and how ProductHero + BookingWidget are used.

- [ ] **Step 2: Update both tour detail pages**

Changes needed:
1. Replace `PageLayout` import with site-specific `Layout`
2. Pass `config` (which includes `brand`) to `ProductHero`, `BookingWidget`, and any other components
3. Update section containers to use new utility classes

The structural layout stays the same (hero gallery + sidebar + content). The visual difference comes through the tokens and component-level brand variants already implemented in Task 10.

- [ ] **Step 3: Verify tour detail pages on both sites**

Navigate to a tour detail page on each dev server. Verify:
- Atlantis: rounded gallery, gradient CTA, cyan accents
- A&Y: sharp gallery, solid clay CTA, terracotta accents

- [ ] **Step 4: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/tours/[slug].astro packages/algarve-and-you/src/pages/[locale]/tours/[slug].astro
git commit -m "feat: update tour detail pages for brand-specific styling"
```

---

## Task 15: Remaining Pages

**Files:**
- All remaining pages in `packages/atlantis/src/pages/[locale]/` and `packages/algarve-and-you/src/pages/[locale]/`

This covers: tours listing (`tours/index.astro`, `tours/[category]/index.astro`), about, contact, blog listing, blog detail, faq, reviews, terms, cancellation-policy, transfers.

- [ ] **Step 1: Update all remaining Atlantis pages**

For each page in `packages/atlantis/src/pages/`:
1. Replace `PageLayout` import with `Layout` from `../../layouts/Layout.astro`
2. Replace `<PageLayout>` / `</PageLayout>` with `<Layout>` / `</Layout>`
3. Ensure `config` is passed to all components

These pages don't need structural changes — the token system and component-level brand variants handle the visual differences.

- [ ] **Step 2: Update all remaining A&Y pages**

Same changes as step 1 but for `packages/algarve-and-you/src/pages/`.

Additionally, for the tours listing page (`tours/index.astro`), add inline category pills at the top of the page instead of using the removed `CategoryNav` component.

For the A&Y blog listing page, update the page title to "Journal" and use the editorial BlogCard variant.

- [ ] **Step 3: Verify all pages build and render**

```bash
pnpm build
```

Expected: Both sites build with no errors. Spot-check a few pages on each dev server.

- [ ] **Step 4: Commit**

```bash
git add packages/atlantis/src/pages/ packages/algarve-and-you/src/pages/
git commit -m "feat: update all remaining pages for brand-specific layout system"
```

---

## Task 16: Final Verification + Cleanup

- [ ] **Step 1: Full build**

```bash
pnpm build
```

Expected: Both sites build successfully with zero errors.

- [ ] **Step 2: Visual audit — Atlantis**

Run `cd packages/atlantis && pnpm dev` and check:
- [ ] Homepage renders "Coastal Modern" design
- [ ] Header: frosted glass, icon+text logo, gradient CTA
- [ ] Hero: gradient bg, stats, badge, bold headline with italic accent
- [ ] Tour cards: rounded, shadow, bold sans titles
- [ ] Trust bar: 4 items, icons
- [ ] Reviews: rounded cards, amber stars
- [ ] Footer: navy background
- [ ] Tour detail page: rounded gallery, gradient book button
- [ ] All pages render without layout breaks
- [ ] Mobile (375px): header hamburger, stacked layout, readable text

- [ ] **Step 3: Visual audit — Algarve & You**

Run `cd packages/algarve-and-you && pnpm dev` and check:
- [ ] Homepage renders "Mediterranean Editorial" design
- [ ] Header: warm frosted glass, Cormorant logo with italic &, clay CTA
- [ ] Hero: split layout, category pills, gold wire accent, float card
- [ ] Product cards: sharp edges, borders, italic serif titles
- [ ] Featured card: tall, image overlay content
- [ ] Editorial divider with italic text
- [ ] Pull quote section
- [ ] Journal teaser section
- [ ] Reviews: sharp cards, gold stars, gold divider
- [ ] Footer: clay background, Cormorant brand name
- [ ] Tour detail page: sharp gallery, solid book button
- [ ] Blog shows as "Journal" with editorial cards
- [ ] Mobile (375px): stacked hero, hamburger, readable text

- [ ] **Step 4: Accessibility quick check**

For both sites:
- [ ] Tab through all interactive elements — focus rings visible
- [ ] Check color contrast with browser dev tools
- [ ] Enable `prefers-reduced-motion` — no animations
- [ ] Check heading hierarchy (h1 → h2 → h3, no skips)

- [ ] **Step 5: Clean up any dead code**

Search for references to old token names that may have been missed:

```bash
grep -r "bg-primary\|bg-secondary\|bg-surface\|--accent\b\|--coral\b" packages/shared/src/ packages/atlantis/src/ packages/algarve-and-you/src/ --include="*.astro" --include="*.css"
```

Fix any remaining references to old token names.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup — remove dead token references and verify build"
```
