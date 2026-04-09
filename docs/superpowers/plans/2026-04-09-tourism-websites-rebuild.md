# Tourism Websites Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild atlantistours.pt and algarveandyou.com as a shared Astro monorepo, pulling product data from FareHarbor's API, with a Neo-Coastal dark design system, i18n support (PT/EN/ES/FR), and static deployment to Plesk.

**Architecture:** pnpm monorepo with Turborepo. Three packages: `shared` (components, styles, i18n, FH client), `atlantis` (boat-only site), `algarve-and-you` (full marketplace site). Static HTML generated at build time from FareHarbor data. FH lightbox widget handles booking client-side.

**Tech Stack:** Astro 5, TypeScript, pnpm workspaces, Turborepo, Vitest, Manrope font, FareHarbor External API v1.

**Spec:** `docs/superpowers/specs/2026-04-09-tourism-websites-rebuild-design.md`

---

## File Structure

```
packages/
├── shared/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts                          # Public exports
│   │   ├── types.ts                          # Shared types (BrandConfig, FHItem, etc.)
│   │   ├── config.ts                         # Brand config type + helpers
│   │   ├── styles/
│   │   │   ├── tokens.css                    # CSS custom properties (design tokens)
│   │   │   ├── base.css                      # Reset + base typography
│   │   │   └── utilities.css                 # Utility classes
│   │   ├── i18n/
│   │   │   ├── index.ts                      # t() function, locale helpers
│   │   │   ├── locales/
│   │   │   │   ├── en.json                   # English UI strings
│   │   │   │   ├── pt.json                   # Portuguese UI strings
│   │   │   │   ├── es.json                   # Spanish UI strings
│   │   │   │   └── fr.json                   # French UI strings
│   │   │   └── types.ts                      # Translation key types
│   │   ├── lib/
│   │   │   ├── fareharbor.ts                 # FH API client
│   │   │   ├── fareharbor.test.ts            # FH client tests
│   │   │   ├── slugify.ts                    # Slug generation from item names
│   │   │   ├── slugify.test.ts               # Slug tests
│   │   │   ├── prices.ts                     # Price formatting helpers
│   │   │   └── prices.test.ts                # Price tests
│   │   ├── components/
│   │   │   ├── Header.astro                  # Site header
│   │   │   ├── Footer.astro                  # Site footer
│   │   │   ├── LanguageSwitcher.astro        # Locale picker
│   │   │   ├── MobileNav.astro               # Mobile hamburger menu
│   │   │   ├── HeroSection.astro             # Full-width hero
│   │   │   ├── ProductCard.astro             # Tour/experience card
│   │   │   ├── ProductGrid.astro             # Grid of ProductCards
│   │   │   ├── ProductHero.astro             # Product detail hero
│   │   │   ├── BookingWidget.astro           # FH lightbox wrapper
│   │   │   ├── PriceDisplay.astro            # Formatted price
│   │   │   ├── CategoryNav.astro             # Chip filter bar
│   │   │   ├── ReviewCard.astro              # Single review
│   │   │   ├── ReviewsGrid.astro             # Review collection
│   │   │   ├── BlogCard.astro                # Blog post preview
│   │   │   ├── FAQ.astro                     # Accordion FAQ
│   │   │   ├── ContactForm.astro             # Contact form
│   │   │   ├── WhatsAppButton.astro          # Floating WhatsApp CTA
│   │   │   └── SEO.astro                     # Meta/OG/structured data
│   │   └── layouts/
│   │       └── PageLayout.astro              # Base page layout
│   └── data/                                 # Gitignored — FH fetched data
│       └── .gitkeep
│
├── atlantis/
│   ├── package.json
│   ├── tsconfig.json
│   ├── astro.config.mjs
│   ├── public/
│   │   ├── favicon.svg
│   │   └── robots.txt
│   └── src/
│       ├── config.ts                         # Atlantis brand config
│       ├── content/
│       │   ├── config.ts                     # Astro content collections
│       │   ├── blog/
│       │   │   └── en/
│       │   │       └── welcome.md            # Placeholder blog post
│       │   ├── pages/
│       │   │   ├── en/
│       │   │   │   ├── about.md
│       │   │   │   └── homepage.md
│       │   │   └── pt/
│       │   │       ├── about.md
│       │   │       └── homepage.md
│       │   └── reviews/
│       │       └── manual.json               # Curated reviews
│       └── pages/
│           ├── index.astro                   # Root redirect → /en/
│           └── [locale]/
│               ├── index.astro               # Homepage
│               ├── tours/
│               │   ├── index.astro           # All tours listing
│               │   └── [slug].astro          # Product detail
│               ├── about.astro
│               ├── contact.astro
│               ├── blog/
│               │   ├── index.astro
│               │   └── [slug].astro
│               ├── reviews.astro
│               ├── faq.astro
│               ├── terms.astro
│               └── cancellation-policy.astro
│
├── algarve-and-you/
│   ├── package.json
│   ├── tsconfig.json
│   ├── astro.config.mjs
│   ├── public/
│   │   ├── favicon.svg
│   │   └── robots.txt
│   └── src/
│       ├── config.ts                         # A&Y brand config
│       ├── content/
│       │   ├── config.ts
│       │   ├── blog/
│       │   │   └── en/
│       │   │       └── welcome.md
│       │   ├── pages/
│       │   │   ├── en/
│       │   │   │   ├── about.md
│       │   │   │   └── homepage.md
│       │   │   └── pt/
│       │   │       ├── about.md
│       │   │       └── homepage.md
│       │   └── reviews/
│       │       └── manual.json
│       └── pages/
│           ├── index.astro
│           └── [locale]/
│               ├── index.astro
│               ├── tours/
│               │   ├── index.astro           # All products listing
│               │   ├── [category]/
│               │   │   └── index.astro       # Category listing
│               │   └── [slug].astro
│               ├── transfers.astro
│               ├── about.astro
│               ├── contact.astro
│               ├── blog/
│               │   ├── index.astro
│               │   └── [slug].astro
│               ├── reviews.astro
│               ├── faq.astro
│               ├── terms.astro
│               └── cancellation-policy.astro
│
scripts/
├── fetch-fh.ts                               # FareHarbor data fetch
├── build.sh                                  # Build both sites
└── deploy.sh                                 # rsync to Plesk

# Root config
package.json                                  # pnpm workspace root
pnpm-workspace.yaml
turbo.json
tsconfig.base.json
vitest.config.ts
.gitignore
.env.example                                  # FH_APP_KEY, FH_USER_KEY, etc.
```

---

## Task 1: Monorepo Scaffolding

**Files:**
- Create: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `.gitignore`, `.env.example`
- Create: `packages/shared/package.json`, `packages/shared/tsconfig.json`
- Create: `packages/atlantis/package.json`, `packages/atlantis/tsconfig.json`, `packages/atlantis/astro.config.mjs`
- Create: `packages/algarve-and-you/package.json`, `packages/algarve-and-you/tsconfig.json`, `packages/algarve-and-you/astro.config.mjs`

- [ ] **Step 1: Initialize git repo**

```bash
cd /home/jferreira/Work/projects/algarve-and-you-new
git init
```

- [ ] **Step 2: Create root package.json**

```json
{
  "name": "algarve-tourism",
  "private": true,
  "scripts": {
    "dev:atlantis": "turbo run dev --filter=@algarve-tourism/atlantis",
    "dev:ay": "turbo run dev --filter=@algarve-tourism/algarve-and-you",
    "build": "turbo run build",
    "test": "vitest run",
    "test:watch": "vitest",
    "fetch-data": "tsx scripts/fetch-fh.ts",
    "deploy": "bash scripts/deploy.sh"
  },
  "devDependencies": {
    "turbo": "^2",
    "typescript": "^5",
    "vitest": "^3",
    "tsx": "^4"
  }
}
```

- [ ] **Step 3: Create pnpm-workspace.yaml**

```yaml
packages:
  - "packages/*"
```

- [ ] **Step 4: Create turbo.json**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}
```

- [ ] **Step 5: Create tsconfig.base.json**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

- [ ] **Step 6: Create vitest.config.ts**

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/shared/src/**/*.test.ts"],
  },
});
```

- [ ] **Step 7: Create .gitignore**

```
node_modules/
dist/
.astro/
.turbo/
packages/shared/data/*.json
!packages/shared/data/.gitkeep
.env
.superpowers/
```

- [ ] **Step 8: Create .env.example**

```
FH_APP_KEY=your-fareharbor-app-key
FH_USER_KEY=your-fareharbor-user-key
FH_ATLANTIS_SHORTNAME=atlantis-tours
FH_AY_SHORTNAME=algarve-and-you
DEPLOY_HOST=your-plesk-server.com
DEPLOY_USER=deploy
DEPLOY_ATLANTIS_PATH=/var/www/atlantistours.pt
DEPLOY_AY_PATH=/var/www/algarveandyou.com
```

- [ ] **Step 9: Create shared package**

`packages/shared/package.json`:
```json
{
  "name": "@algarve-tourism/shared",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./styles/*": "./src/styles/*",
    "./components/*": "./src/components/*",
    "./layouts/*": "./src/layouts/*"
  },
  "dependencies": {
    "astro": "^5"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

`packages/shared/tsconfig.json`:
```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

`packages/shared/data/.gitkeep`: (empty file)

- [ ] **Step 10: Create atlantis package**

`packages/atlantis/package.json`:
```json
{
  "name": "@algarve-tourism/atlantis",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev --port 4321",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@algarve-tourism/shared": "workspace:*",
    "astro": "^5",
    "@astrojs/sitemap": "^3"
  }
}
```

`packages/atlantis/tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict"
}
```

`packages/atlantis/astro.config.mjs`:
```javascript
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.atlantistours.pt",
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt", "es", "fr"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
```

- [ ] **Step 11: Create algarve-and-you package**

`packages/algarve-and-you/package.json`:
```json
{
  "name": "@algarve-tourism/algarve-and-you",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev --port 4322",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@algarve-tourism/shared": "workspace:*",
    "astro": "^5",
    "@astrojs/sitemap": "^3"
  }
}
```

`packages/algarve-and-you/tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict"
}
```

`packages/algarve-and-you/astro.config.mjs`:
```javascript
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.algarveandyou.com",
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt", "es", "fr"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
```

- [ ] **Step 12: Install dependencies and verify**

```bash
pnpm install
```

Expected: lockfile generated, no errors.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: scaffold monorepo with pnpm workspaces + turborepo

Three packages: shared, atlantis, algarve-and-you.
Astro 5 for both sites, vitest for testing, tsx for scripts."
```

---

## Task 2: Design Tokens, Base Styles & Brand Config Types

**Files:**
- Create: `packages/shared/src/types.ts`
- Create: `packages/shared/src/config.ts`
- Create: `packages/shared/src/styles/tokens.css`
- Create: `packages/shared/src/styles/base.css`
- Create: `packages/shared/src/styles/utilities.css`
- Create: `packages/shared/src/index.ts`

- [ ] **Step 1: Create shared types**

`packages/shared/src/types.ts`:
```typescript
export interface BrandConfig {
  name: string;
  domain: string;
  tagline: string;
  fh: {
    shortname: string;
    categories: string[];
  };
  logo: string;
  social: {
    instagram: string;
    facebook: string;
    whatsapp: string;
    youtube?: string;
  };
  analytics: {
    gtag: string;
  };
  defaultLocale: Locale;
  locales: Locale[];
}

export type Locale = "en" | "pt" | "es" | "fr";

export const LOCALES: Locale[] = ["en", "pt", "es", "fr"];

export interface FHItem {
  pk: number;
  name: string;
  headline: string;
  description: string;
  description_text: string;
  description_safe_html: string;
  description_bullets: string[];
  image_cdn_url: string;
  images: FHImage[];
  locations: FHLocation[];
  customer_prototypes: FHCustomerPrototype[];
  cancellation_policy: string;
  cancellation_policy_safe_html: string;
  is_pickup_ever_available: boolean;
}

export interface FHImage {
  pk: number;
  image_cdn_url: string;
  gallery: string;
}

export interface FHLocation {
  pk: number;
  type: string;
  note: string;
  note_safe_html: string;
  latitude: number;
  longitude: number;
  google_place_id: string;
  tripadvisor_url: string;
  address: {
    street: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
  };
}

export interface FHCustomerPrototype {
  pk: number;
  display_name: string;
  total: number;
  total_including_tax: number;
  note: string;
}

export interface NormalizedItem {
  pk: number;
  name: string;
  headline: string;
  slug: string;
  description_html: string;
  description_text: string;
  description_bullets: string[];
  image_url: string;
  images: { url: string; gallery: string }[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
  } | null;
  price_from: number;
  price_from_including_tax: number;
  customer_types: { name: string; price: number }[];
  cancellation_policy_html: string;
  category: string;
}

export interface ManualReview {
  author: string;
  origin: string;
  rating: number;
  text: string;
  date: string;
  product_slug?: string;
}
```

- [ ] **Step 2: Create config helpers**

`packages/shared/src/config.ts`:
```typescript
import type { BrandConfig, Locale } from "./types.js";

export function getLocalePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

export function getAlternateLocales(
  config: BrandConfig,
  currentLocale: Locale,
  path: string,
): { locale: Locale; href: string }[] {
  return config.locales.map((locale) => ({
    locale,
    href: `https://www.${config.domain}${getLocalePath(locale, path)}`,
  }));
}
```

- [ ] **Step 3: Create CSS design tokens**

`packages/shared/src/styles/tokens.css`:
```css
:root {
  /* Color tokens — Neo-Coastal */
  --bg-primary: #0A2540;
  --bg-secondary: #0D2E4A;
  --bg-surface: #112F4E;
  --accent: #00D2BE;
  --accent-hover: #00E8D2;
  --accent-muted: rgba(0, 210, 190, 0.15);
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.35);
  --surface: rgba(0, 210, 190, 0.06);
  --border: rgba(0, 210, 190, 0.1);
  --border-subtle: rgba(255, 255, 255, 0.06);
  --danger: #E85D44;
  --success: #00D2BE;

  /* Typography */
  --font-family: 'Manrope', system-ui, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;
  --font-size-5xl: 3.5rem;

  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  --line-height-tight: 1.1;
  --line-height-snug: 1.3;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;

  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.05em;
  --letter-spacing-wider: 0.1em;

  /* Spacing */
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
  --space-24: 6rem;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.5);

  /* Layout */
  --max-width: 1200px;
  --header-height: 72px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

- [ ] **Step 4: Create base styles**

`packages/shared/src/styles/base.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: var(--font-family);
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--text-primary);
  font-weight: var(--font-weight-extrabold);
  line-height: var(--line-height-tight);
}

h1 { font-size: var(--font-size-5xl); }
h2 { font-size: var(--font-size-4xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }

a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--accent-hover);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  cursor: pointer;
  font-family: inherit;
}

::selection {
  background: var(--accent);
  color: var(--bg-primary);
}
```

- [ ] **Step 5: Create utility classes**

`packages/shared/src/styles/utilities.css`:
```css
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.section {
  padding: var(--space-20) 0;
}

.section-sm {
  padding: var(--space-12) 0;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  background: var(--surface);
  color: var(--accent);
  border: 1px solid var(--border);
  text-transform: uppercase;
}

.chip:hover {
  background: var(--accent-muted);
}

.chip.active {
  background: var(--accent);
  color: var(--bg-primary);
  border-color: var(--accent);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  border: none;
  transition: all var(--transition-fast);
}

.btn-primary {
  background: var(--accent);
  color: var(--bg-primary);
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-outline {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--border);
}

.btn-outline:hover {
  background: var(--surface);
  border-color: var(--accent);
}

.tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.6875rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-wider);
  text-transform: uppercase;
  background: var(--accent-muted);
  color: var(--accent);
  border: 1px solid var(--border);
}

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

.text-muted {
  color: var(--text-muted);
}
```

- [ ] **Step 6: Create shared index.ts**

`packages/shared/src/index.ts`:
```typescript
export * from "./types.js";
export * from "./config.js";
```

- [ ] **Step 7: Verify packages resolve**

```bash
pnpm install
pnpm exec tsc --noEmit -p packages/shared/tsconfig.json
```

Expected: no type errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add design tokens, base styles, and shared types

Neo-Coastal theme: navy #0A2540 + teal #00D2BE.
Manrope font, CSS custom properties for all tokens.
BrandConfig, FHItem, NormalizedItem types defined."
```

---

## Task 3: i18n System

**Files:**
- Create: `packages/shared/src/i18n/types.ts`
- Create: `packages/shared/src/i18n/index.ts`
- Create: `packages/shared/src/i18n/locales/en.json`
- Create: `packages/shared/src/i18n/locales/pt.json`
- Create: `packages/shared/src/i18n/locales/es.json`
- Create: `packages/shared/src/i18n/locales/fr.json`
- Test: `packages/shared/src/i18n/i18n.test.ts`

- [ ] **Step 1: Write the i18n test**

`packages/shared/src/i18n/i18n.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { t, getLocaleFromPath, getPathInLocale } from "./index.js";

describe("t()", () => {
  it("returns English string for known key", () => {
    expect(t("en", "nav.tours")).toBe("Tours");
  });

  it("returns Portuguese string for known key", () => {
    expect(t("pt", "nav.tours")).toBe("Passeios");
  });

  it("falls back to English for missing locale key", () => {
    expect(t("fr", "nav.tours")).toBe("Circuits");
  });

  it("returns key itself if not found in any locale", () => {
    expect(t("en", "nonexistent.key" as any)).toBe("nonexistent.key");
  });
});

describe("getLocaleFromPath()", () => {
  it("extracts locale from path", () => {
    expect(getLocaleFromPath("/en/tours/")).toBe("en");
    expect(getLocaleFromPath("/pt/about")).toBe("pt");
  });

  it("defaults to en for invalid locale", () => {
    expect(getLocaleFromPath("/xx/tours/")).toBe("en");
  });

  it("defaults to en for root path", () => {
    expect(getLocaleFromPath("/")).toBe("en");
  });
});

describe("getPathInLocale()", () => {
  it("switches locale prefix in path", () => {
    expect(getPathInLocale("/en/tours/benagil", "pt")).toBe("/pt/tours/benagil/");
  });

  it("handles root locale path", () => {
    expect(getPathInLocale("/en/", "fr")).toBe("/fr/");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run packages/shared/src/i18n/i18n.test.ts
```

Expected: FAIL — modules not found.

- [ ] **Step 3: Create i18n types**

`packages/shared/src/i18n/types.ts`:
```typescript
export interface TranslationStrings {
  "nav.tours": string;
  "nav.about": string;
  "nav.contact": string;
  "nav.book_now": string;
  "nav.explore": string;
  "nav.blog": string;
  "nav.faq": string;
  "nav.reviews": string;
  "hero.cta": string;
  "product.from": string;
  "product.duration": string;
  "product.minutes": string;
  "product.book_now": string;
  "product.related": string;
  "product.highlights": string;
  "product.cancellation": string;
  "product.location": string;
  "category.boats": string;
  "category.gastronomy": string;
  "category.land-tours": string;
  "category.transfers": string;
  "category.spa": string;
  "category.all": string;
  "reviews.title": string;
  "reviews.from_google": string;
  "contact.name": string;
  "contact.email": string;
  "contact.message": string;
  "contact.send": string;
  "footer.terms": string;
  "footer.cancellation_policy": string;
  "footer.follow_us": string;
  "blog.read_more": string;
  "blog.published": string;
  "common.loading": string;
  "common.all": string;
}

export type TranslationKey = keyof TranslationStrings;
```

- [ ] **Step 4: Create locale JSON files**

`packages/shared/src/i18n/locales/en.json`:
```json
{
  "nav.tours": "Tours",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.book_now": "Book Now",
  "nav.explore": "Explore",
  "nav.blog": "Blog",
  "nav.faq": "FAQ",
  "nav.reviews": "Reviews",
  "hero.cta": "Explore Tours",
  "product.from": "From",
  "product.duration": "Duration",
  "product.minutes": "min",
  "product.book_now": "Book Now",
  "product.related": "You might also like",
  "product.highlights": "Highlights",
  "product.cancellation": "Cancellation Policy",
  "product.location": "Meeting Point",
  "category.boats": "Boat Tours",
  "category.gastronomy": "Gastronomy",
  "category.land-tours": "Day Trips",
  "category.transfers": "Transfers",
  "category.spa": "Spa & Wellness",
  "category.all": "All Experiences",
  "reviews.title": "What Our Guests Say",
  "reviews.from_google": "From Google Reviews",
  "contact.name": "Name",
  "contact.email": "Email",
  "contact.message": "Message",
  "contact.send": "Send Message",
  "footer.terms": "Terms & Conditions",
  "footer.cancellation_policy": "Cancellation Policy",
  "footer.follow_us": "Follow Us",
  "blog.read_more": "Read More",
  "blog.published": "Published",
  "common.loading": "Loading...",
  "common.all": "All"
}
```

`packages/shared/src/i18n/locales/pt.json`:
```json
{
  "nav.tours": "Passeios",
  "nav.about": "Sobre",
  "nav.contact": "Contacto",
  "nav.book_now": "Reservar",
  "nav.explore": "Explorar",
  "nav.blog": "Blog",
  "nav.faq": "FAQ",
  "nav.reviews": "Avaliações",
  "hero.cta": "Explorar Passeios",
  "product.from": "Desde",
  "product.duration": "Duração",
  "product.minutes": "min",
  "product.book_now": "Reservar Agora",
  "product.related": "Também pode gostar",
  "product.highlights": "Destaques",
  "product.cancellation": "Política de Cancelamento",
  "product.location": "Ponto de Encontro",
  "category.boats": "Passeios de Barco",
  "category.gastronomy": "Gastronomia",
  "category.land-tours": "Excursões",
  "category.transfers": "Transfers",
  "category.spa": "Spa & Bem-estar",
  "category.all": "Todas as Experiências",
  "reviews.title": "O Que Dizem os Nossos Clientes",
  "reviews.from_google": "Do Google Reviews",
  "contact.name": "Nome",
  "contact.email": "Email",
  "contact.message": "Mensagem",
  "contact.send": "Enviar Mensagem",
  "footer.terms": "Termos e Condições",
  "footer.cancellation_policy": "Política de Cancelamento",
  "footer.follow_us": "Siga-nos",
  "blog.read_more": "Ler Mais",
  "blog.published": "Publicado",
  "common.loading": "A carregar...",
  "common.all": "Todos"
}
```

`packages/shared/src/i18n/locales/es.json`:
```json
{
  "nav.tours": "Tours",
  "nav.about": "Nosotros",
  "nav.contact": "Contacto",
  "nav.book_now": "Reservar",
  "nav.explore": "Explorar",
  "nav.blog": "Blog",
  "nav.faq": "FAQ",
  "nav.reviews": "Opiniones",
  "hero.cta": "Explorar Tours",
  "product.from": "Desde",
  "product.duration": "Duración",
  "product.minutes": "min",
  "product.book_now": "Reservar Ahora",
  "product.related": "También te puede gustar",
  "product.highlights": "Destacados",
  "product.cancellation": "Política de Cancelación",
  "product.location": "Punto de Encuentro",
  "category.boats": "Tours en Barco",
  "category.gastronomy": "Gastronomía",
  "category.land-tours": "Excursiones",
  "category.transfers": "Transfers",
  "category.spa": "Spa & Bienestar",
  "category.all": "Todas las Experiencias",
  "reviews.title": "Lo Que Dicen Nuestros Clientes",
  "reviews.from_google": "De Google Reviews",
  "contact.name": "Nombre",
  "contact.email": "Email",
  "contact.message": "Mensaje",
  "contact.send": "Enviar Mensaje",
  "footer.terms": "Términos y Condiciones",
  "footer.cancellation_policy": "Política de Cancelación",
  "footer.follow_us": "Síguenos",
  "blog.read_more": "Leer Más",
  "blog.published": "Publicado",
  "common.loading": "Cargando...",
  "common.all": "Todos"
}
```

`packages/shared/src/i18n/locales/fr.json`:
```json
{
  "nav.tours": "Circuits",
  "nav.about": "À propos",
  "nav.contact": "Contact",
  "nav.book_now": "Réserver",
  "nav.explore": "Explorer",
  "nav.blog": "Blog",
  "nav.faq": "FAQ",
  "nav.reviews": "Avis",
  "hero.cta": "Explorer les Circuits",
  "product.from": "À partir de",
  "product.duration": "Durée",
  "product.minutes": "min",
  "product.book_now": "Réserver Maintenant",
  "product.related": "Vous aimerez aussi",
  "product.highlights": "Points forts",
  "product.cancellation": "Politique d'annulation",
  "product.location": "Point de rendez-vous",
  "category.boats": "Circuits en Bateau",
  "category.gastronomy": "Gastronomie",
  "category.land-tours": "Excursions",
  "category.transfers": "Transferts",
  "category.spa": "Spa & Bien-être",
  "category.all": "Toutes les Expériences",
  "reviews.title": "Ce Que Disent Nos Clients",
  "reviews.from_google": "Depuis Google Reviews",
  "contact.name": "Nom",
  "contact.email": "Email",
  "contact.message": "Message",
  "contact.send": "Envoyer",
  "footer.terms": "Conditions Générales",
  "footer.cancellation_policy": "Politique d'annulation",
  "footer.follow_us": "Suivez-nous",
  "blog.read_more": "Lire la suite",
  "blog.published": "Publié",
  "common.loading": "Chargement...",
  "common.all": "Tous"
}
```

- [ ] **Step 5: Implement i18n module**

`packages/shared/src/i18n/index.ts`:
```typescript
import type { Locale } from "../types.js";
import type { TranslationKey, TranslationStrings } from "./types.js";
import en from "./locales/en.json" with { type: "json" };
import pt from "./locales/pt.json" with { type: "json" };
import es from "./locales/es.json" with { type: "json" };
import fr from "./locales/fr.json" with { type: "json" };

const translations: Record<Locale, TranslationStrings> = {
  en: en as TranslationStrings,
  pt: pt as TranslationStrings,
  es: es as TranslationStrings,
  fr: fr as TranslationStrings,
};

const VALID_LOCALES = new Set<string>(["en", "pt", "es", "fr"]);

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

export function getLocaleFromPath(path: string): Locale {
  const segment = path.split("/").filter(Boolean)[0];
  if (segment && VALID_LOCALES.has(segment)) {
    return segment as Locale;
  }
  return "en";
}

export function getPathInLocale(path: string, targetLocale: Locale): string {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return `/${targetLocale}/`;
  const currentLocale = segments[0];
  if (VALID_LOCALES.has(currentLocale)) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  return `/${segments.join("/")}/`.replace(/\/+/g, "/");
}

export type { TranslationKey, TranslationStrings } from "./types.js";
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
pnpm vitest run packages/shared/src/i18n/i18n.test.ts
```

Expected: all tests PASS.

- [ ] **Step 7: Export i18n from shared index**

Update `packages/shared/src/index.ts`:
```typescript
export * from "./types.js";
export * from "./config.js";
export { t, getLocaleFromPath, getPathInLocale } from "./i18n/index.js";
export type { TranslationKey } from "./i18n/types.js";
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add i18n system with EN/PT/ES/FR translations

t() function with fallback chain: locale → EN → key.
Path-based locale detection and switching helpers.
All UI strings translated across 4 locales."
```

---

## Task 4: FareHarbor API Client & Data Fetching

**Files:**
- Create: `packages/shared/src/lib/fareharbor.ts`
- Create: `packages/shared/src/lib/slugify.ts`
- Create: `packages/shared/src/lib/prices.ts`
- Test: `packages/shared/src/lib/fareharbor.test.ts`
- Test: `packages/shared/src/lib/slugify.test.ts`
- Test: `packages/shared/src/lib/prices.test.ts`
- Create: `scripts/fetch-fh.ts`

- [ ] **Step 1: Write slugify tests**

`packages/shared/src/lib/slugify.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { slugify } from "./slugify.js";

describe("slugify()", () => {
  it("converts name to lowercase slug", () => {
    expect(slugify("Full Caves Circuit and Coast Sightseeing")).toBe(
      "full-caves-circuit-and-coast-sightseeing",
    );
  });

  it("removes special characters", () => {
    expect(slugify("Luxury Sail Yacht Cruise — Sunset")).toBe(
      "luxury-sail-yacht-cruise-sunset",
    );
  });

  it("handles accented characters", () => {
    expect(slugify("Passeio às Grutas de Benagil")).toBe(
      "passeio-as-grutas-de-benagil",
    );
  });

  it("collapses multiple dashes", () => {
    expect(slugify("Rio   Arade   Tour")).toBe("rio-arade-tour");
  });

  it("trims leading/trailing dashes", () => {
    expect(slugify(" -Fishing Trip- ")).toBe("fishing-trip");
  });
});
```

- [ ] **Step 2: Run slugify test to verify it fails**

```bash
pnpm vitest run packages/shared/src/lib/slugify.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement slugify**

`packages/shared/src/lib/slugify.ts`:
```typescript
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
```

- [ ] **Step 4: Run slugify test to verify it passes**

```bash
pnpm vitest run packages/shared/src/lib/slugify.test.ts
```

Expected: all tests PASS.

- [ ] **Step 5: Write prices tests**

`packages/shared/src/lib/prices.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { formatPrice, getFromPrice } from "./prices.js";
import type { FHCustomerPrototype } from "../types.js";

describe("formatPrice()", () => {
  it("formats cents to EUR", () => {
    expect(formatPrice(1750)).toBe("€17.50");
  });

  it("formats whole amounts", () => {
    expect(formatPrice(5500)).toBe("€55.00");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("€0.00");
  });
});

describe("getFromPrice()", () => {
  it("returns lowest price from customer prototypes", () => {
    const prototypes: FHCustomerPrototype[] = [
      { pk: 1, display_name: "Adult", total: 5500, total_including_tax: 5500, note: "" },
      { pk: 2, display_name: "Child", total: 3200, total_including_tax: 3200, note: "" },
      { pk: 3, display_name: "Senior", total: 4500, total_including_tax: 4500, note: "" },
    ];
    expect(getFromPrice(prototypes)).toBe(3200);
  });

  it("returns 0 for empty prototypes", () => {
    expect(getFromPrice([])).toBe(0);
  });
});
```

- [ ] **Step 6: Run prices test to verify it fails**

```bash
pnpm vitest run packages/shared/src/lib/prices.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 7: Implement prices**

`packages/shared/src/lib/prices.ts`:
```typescript
import type { FHCustomerPrototype } from "../types.js";

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

export function getFromPrice(prototypes: FHCustomerPrototype[]): number {
  if (prototypes.length === 0) return 0;
  return Math.min(...prototypes.map((p) => p.total));
}
```

- [ ] **Step 8: Run prices test to verify it passes**

```bash
pnpm vitest run packages/shared/src/lib/prices.test.ts
```

Expected: all tests PASS.

- [ ] **Step 9: Write FH client tests**

`packages/shared/src/lib/fareharbor.test.ts`:
```typescript
import { describe, it, expect, vi } from "vitest";
import { normalizeItem } from "./fareharbor.js";
import type { FHItem } from "../types.js";

const mockItem: FHItem = {
  pk: 123,
  name: "Full Caves Circuit and Coast Sightseeing",
  headline: "Explore Benagil",
  description: "A great tour",
  description_text: "A great tour",
  description_safe_html: "<p>A great tour</p>",
  description_bullets: ["See Benagil Cave", "90 minute trip"],
  image_cdn_url: "https://cdn.fareharbor.com/img1.jpg",
  images: [
    { pk: 1, image_cdn_url: "https://cdn.fareharbor.com/img1.jpg", gallery: "main" },
    { pk: 2, image_cdn_url: "https://cdn.fareharbor.com/img2.jpg", gallery: "main" },
  ],
  locations: [
    {
      pk: 1,
      type: "meeting",
      note: "Marina de Portimão",
      note_safe_html: "Marina de Portimão",
      latitude: 37.1195,
      longitude: -8.5370,
      google_place_id: "abc123",
      tripadvisor_url: "",
      address: {
        street: "Marina de Portimão",
        city: "Portimão",
        province: "Faro",
        postal_code: "8500-000",
        country: "PT",
      },
    },
  ],
  customer_prototypes: [
    { pk: 1, display_name: "Adult", total: 1750, total_including_tax: 1750, note: "" },
    { pk: 2, display_name: "Child", total: 1000, total_including_tax: 1000, note: "" },
  ],
  cancellation_policy: "Free cancellation",
  cancellation_policy_safe_html: "<p>Free cancellation</p>",
  is_pickup_ever_available: false,
};

describe("normalizeItem()", () => {
  it("normalizes an FH item into site format", () => {
    const result = normalizeItem(mockItem, "boats");

    expect(result.pk).toBe(123);
    expect(result.name).toBe("Full Caves Circuit and Coast Sightseeing");
    expect(result.slug).toBe("full-caves-circuit-and-coast-sightseeing");
    expect(result.description_html).toBe("<p>A great tour</p>");
    expect(result.description_bullets).toEqual(["See Benagil Cave", "90 minute trip"]);
    expect(result.image_url).toBe("https://cdn.fareharbor.com/img1.jpg");
    expect(result.images).toHaveLength(2);
    expect(result.price_from).toBe(1000);
    expect(result.category).toBe("boats");
    expect(result.location).toEqual({
      latitude: 37.1195,
      longitude: -8.5370,
      address: "Marina de Portimão",
      city: "Portimão",
    });
    expect(result.customer_types).toEqual([
      { name: "Adult", price: 1750 },
      { name: "Child", price: 1000 },
    ]);
  });

  it("handles item with no locations", () => {
    const noLocation = { ...mockItem, locations: [] };
    const result = normalizeItem(noLocation, "boats");
    expect(result.location).toBeNull();
  });

  it("handles item with no customer prototypes", () => {
    const noPrice = { ...mockItem, customer_prototypes: [] };
    const result = normalizeItem(noPrice, "boats");
    expect(result.price_from).toBe(0);
  });
});
```

- [ ] **Step 10: Run FH client test to verify it fails**

```bash
pnpm vitest run packages/shared/src/lib/fareharbor.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 11: Implement FH client**

`packages/shared/src/lib/fareharbor.ts`:
```typescript
import type { FHItem, NormalizedItem } from "../types.js";
import { slugify } from "./slugify.js";
import { getFromPrice } from "./prices.js";

const FH_BASE_URL = "https://fareharbor.com/api/external/v1";

interface FHClientConfig {
  appKey: string;
  userKey: string;
}

export function createFHClient(config: FHClientConfig) {
  const headers = {
    "X-FareHarbor-API-App": config.appKey,
    "X-FareHarbor-API-User": config.userKey,
    "Content-Type": "application/json",
  };

  return {
    async getItems(shortname: string): Promise<FHItem[]> {
      const url = `${FH_BASE_URL}/companies/${shortname}/items/`;
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(
          `FH API error: ${response.status} ${response.statusText} for ${url}`,
        );
      }
      const data = await response.json();
      return data.items as FHItem[];
    },
  };
}

export function normalizeItem(item: FHItem, category: string): NormalizedItem {
  const firstLocation = item.locations[0] ?? null;

  return {
    pk: item.pk,
    name: item.name,
    headline: item.headline,
    slug: slugify(item.name),
    description_html: item.description_safe_html,
    description_text: item.description_text,
    description_bullets: item.description_bullets,
    image_url: item.image_cdn_url,
    images: item.images.map((img) => ({
      url: img.image_cdn_url,
      gallery: img.gallery,
    })),
    location: firstLocation
      ? {
          latitude: firstLocation.latitude,
          longitude: firstLocation.longitude,
          address: firstLocation.address.street,
          city: firstLocation.address.city,
        }
      : null,
    price_from: getFromPrice(item.customer_prototypes),
    price_from_including_tax: item.customer_prototypes.length > 0
      ? Math.min(...item.customer_prototypes.map((p) => p.total_including_tax))
      : 0,
    customer_types: item.customer_prototypes.map((p) => ({
      name: p.display_name,
      price: p.total,
    })),
    cancellation_policy_html: item.cancellation_policy_safe_html,
    category,
  };
}
```

- [ ] **Step 12: Run FH client test to verify it passes**

```bash
pnpm vitest run packages/shared/src/lib/fareharbor.test.ts
```

Expected: all tests PASS.

- [ ] **Step 13: Create fetch-fh script**

`scripts/fetch-fh.ts`:
```typescript
import { createFHClient, normalizeItem } from "../packages/shared/src/lib/fareharbor.js";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const appKey = process.env.FH_APP_KEY;
const userKey = process.env.FH_USER_KEY;
const atlantisShortname = process.env.FH_ATLANTIS_SHORTNAME;
const ayShortname = process.env.FH_AY_SHORTNAME;

if (!appKey || !userKey) {
  console.error("Missing FH_APP_KEY or FH_USER_KEY environment variables");
  process.exit(1);
}

const client = createFHClient({ appKey, userKey });
const dataDir = resolve(import.meta.dirname, "../packages/shared/data");

async function fetchAndSave(shortname: string, defaultCategory: string) {
  console.log(`Fetching items for ${shortname}...`);
  const items = await client.getItems(shortname);
  const normalized = items.map((item) => normalizeItem(item, defaultCategory));
  const outPath = resolve(dataDir, `${shortname}.json`);
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(outPath, JSON.stringify(normalized, null, 2));
  console.log(`Wrote ${normalized.length} items to ${outPath}`);
}

async function main() {
  if (atlantisShortname) {
    await fetchAndSave(atlantisShortname, "boats");
  }
  if (ayShortname) {
    await fetchAndSave(ayShortname, "boats");
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error("Fetch failed:", err);
  process.exit(1);
});
```

- [ ] **Step 14: Export lib functions from shared index**

Update `packages/shared/src/index.ts`:
```typescript
export * from "./types.js";
export * from "./config.js";
export { t, getLocaleFromPath, getPathInLocale } from "./i18n/index.js";
export type { TranslationKey } from "./i18n/types.js";
export { createFHClient, normalizeItem } from "./lib/fareharbor.js";
export { slugify } from "./lib/slugify.js";
export { formatPrice, getFromPrice } from "./lib/prices.js";
```

- [ ] **Step 15: Run all tests**

```bash
pnpm vitest run
```

Expected: all tests PASS.

- [ ] **Step 16: Commit**

```bash
git add -A
git commit -m "feat: add FareHarbor API client, slugify, and price helpers

FH client fetches items and normalizes to site format.
fetch-fh.ts script for build-time data fetching.
All helpers fully tested."
```

---

## Task 5: Brand Configs

**Files:**
- Create: `packages/atlantis/src/config.ts`
- Create: `packages/algarve-and-you/src/config.ts`
- Create: `packages/atlantis/public/robots.txt`
- Create: `packages/algarve-and-you/public/robots.txt`

- [ ] **Step 1: Create Atlantis brand config**

`packages/atlantis/src/config.ts`:
```typescript
import type { BrandConfig } from "@algarve-tourism/shared";

export const config: BrandConfig = {
  name: "Atlantis Tours",
  domain: "atlantistours.pt",
  tagline: "Discover the Algarve Coast",
  fh: {
    shortname: "atlantis-tours",
    categories: ["boats"],
  },
  logo: "/logo-atlantis.svg",
  social: {
    instagram: "https://www.instagram.com/atlantistours.pt/",
    facebook: "https://www.facebook.com/atlantistours.pt/",
    whatsapp: "+351000000000",
    youtube: "https://www.youtube.com/@atlantistours",
  },
  analytics: {
    gtag: "G-7MKYTWY07D",
  },
  defaultLocale: "en",
  locales: ["en", "pt", "es", "fr"],
};
```

- [ ] **Step 2: Create A&Y brand config**

`packages/algarve-and-you/src/config.ts`:
```typescript
import type { BrandConfig } from "@algarve-tourism/shared";

export const config: BrandConfig = {
  name: "Algarve & You",
  domain: "algarveandyou.com",
  tagline: "Your Algarve Experience",
  fh: {
    shortname: "algarve-and-you",
    categories: ["boats", "gastronomy", "land-tours", "transfers", "spa"],
  },
  logo: "/logo-ay.svg",
  social: {
    instagram: "https://www.instagram.com/algarveandyou/",
    facebook: "https://www.facebook.com/algarveandyou/",
    whatsapp: "+351000000000",
  },
  analytics: {
    gtag: "G-GZJJYPE72L",
  },
  defaultLocale: "en",
  locales: ["en", "pt", "es", "fr"],
};
```

- [ ] **Step 3: Create robots.txt files**

`packages/atlantis/public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://www.atlantistours.pt/sitemap-index.xml
```

`packages/algarve-and-you/public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://www.algarveandyou.com/sitemap-index.xml
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add brand configs for Atlantis and Algarve & You

Social links, FH shortnames, analytics IDs, locale settings.
Placeholder logo paths and WhatsApp numbers to be updated."
```

---

## Task 6: SEO Component & PageLayout

**Files:**
- Create: `packages/shared/src/components/SEO.astro`
- Create: `packages/shared/src/layouts/PageLayout.astro`

- [ ] **Step 1: Create SEO component**

`packages/shared/src/components/SEO.astro`:
```astro
---
import type { BrandConfig, Locale } from "../types.js";
import { getAlternateLocales } from "../config.js";

interface Props {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  locale: Locale;
  path: string;
  config: BrandConfig;
  structuredData?: Record<string, unknown>;
}

const {
  title,
  description,
  image,
  type = "website",
  locale,
  path,
  config,
  structuredData,
} = Astro.props;

const siteName = config.name;
const fullTitle = `${title} | ${siteName}`;
const canonicalUrl = `https://www.${config.domain}/${locale}${path}`;
const ogImage = image ?? `https://www.${config.domain}/og-default.jpg`;
const alternates = getAlternateLocales(config, locale, path);
---

<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl} />

<!-- Open Graph -->
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:type" content={type} />
<meta property="og:site_name" content={siteName} />
<meta property="og:locale" content={locale} />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />

<!-- Hreflang alternates -->
{alternates.map(({ locale: lang, href }) => (
  <link rel="alternate" hreflang={lang} href={href} />
))}
<link rel="alternate" hreflang="x-default" href={`https://www.${config.domain}/en${path}`} />

<!-- Structured data -->
{structuredData && (
  <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
)}
```

- [ ] **Step 2: Create PageLayout**

`packages/shared/src/layouts/PageLayout.astro`:
```astro
---
import type { BrandConfig, Locale } from "../types.js";
import SEO from "../components/SEO.astro";

interface Props {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  locale: Locale;
  path: string;
  config: BrandConfig;
  structuredData?: Record<string, unknown>;
}

const props = Astro.props;
const { config, locale } = props;
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content={Astro.generator} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <SEO {...props} />

    <!-- Google Analytics -->
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.gtag}`}
    ></script>
    <script define:vars={{ gtagId: config.analytics.gtag }}>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", gtagId);
    </script>

    <style is:global>
      @import "@algarve-tourism/shared/styles/tokens.css";
      @import "@algarve-tourism/shared/styles/base.css";
      @import "@algarve-tourism/shared/styles/utilities.css";
    </style>
  </head>
  <body>
    <slot name="header" />
    <main>
      <slot />
    </main>
    <slot name="footer" />
  </body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add SEO component and PageLayout

SEO handles meta, OG, hreflang, structured data.
PageLayout wraps pages with head, analytics, global styles."
```

---

## Task 7: Header, Footer, Navigation Components

**Files:**
- Create: `packages/shared/src/components/Header.astro`
- Create: `packages/shared/src/components/Footer.astro`
- Create: `packages/shared/src/components/LanguageSwitcher.astro`
- Create: `packages/shared/src/components/MobileNav.astro`
- Create: `packages/shared/src/components/WhatsAppButton.astro`

- [ ] **Step 1: Create LanguageSwitcher**

`packages/shared/src/components/LanguageSwitcher.astro`:
```astro
---
import type { Locale, BrandConfig } from "../types.js";
import { getPathInLocale } from "../i18n/index.js";

interface Props {
  locale: Locale;
  path: string;
  config: BrandConfig;
}

const { locale, path, config } = Astro.props;
const localeLabels: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
  fr: "FR",
};
---

<nav class="lang-switcher" aria-label="Language selector">
  {config.locales.map((loc) => (
    <a
      href={getPathInLocale(path, loc)}
      class:list={["lang-switcher__item", { active: loc === locale }]}
      aria-current={loc === locale ? "page" : undefined}
    >
      {localeLabels[loc]}
    </a>
  ))}
</nav>

<style>
  .lang-switcher {
    display: flex;
    gap: var(--space-1);
  }

  .lang-switcher__item {
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-wide);
    color: var(--text-muted);
    transition: all var(--transition-fast);
    text-decoration: none;
  }

  .lang-switcher__item:hover {
    color: var(--text-primary);
    background: var(--surface);
  }

  .lang-switcher__item.active {
    color: var(--accent);
    background: var(--accent-muted);
  }
</style>
```

- [ ] **Step 2: Create Header**

`packages/shared/src/components/Header.astro`:
```astro
---
import type { BrandConfig, Locale } from "../types.js";
import { t } from "../i18n/index.js";
import { getLocalePath } from "../config.js";
import LanguageSwitcher from "./LanguageSwitcher.astro";

interface Props {
  config: BrandConfig;
  locale: Locale;
  path: string;
}

const { config, locale, path } = Astro.props;

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: t(locale, "nav.tours"), href: getLocalePath(locale, "/tours/") },
  { label: t(locale, "nav.about"), href: getLocalePath(locale, "/about/") },
  { label: t(locale, "nav.contact"), href: getLocalePath(locale, "/contact/") },
];
---

<header class="header">
  <div class="container header__inner">
    <a href={getLocalePath(locale, "/")} class="header__logo">
      {config.name}
    </a>

    <nav class="header__nav" aria-label="Main navigation">
      {navItems.map((item) => (
        <a href={item.href} class="header__nav-link">{item.label}</a>
      ))}
    </nav>

    <div class="header__actions">
      <LanguageSwitcher locale={locale} path={path} config={config} />
      <a href={getLocalePath(locale, "/tours/")} class="btn btn-primary header__cta">
        {t(locale, "nav.book_now")}
      </a>
    </div>

    <button class="header__hamburger" aria-label="Open menu" data-mobile-toggle>
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  <!-- Mobile nav overlay -->
  <div class="mobile-nav" data-mobile-nav>
    <nav class="mobile-nav__links">
      {navItems.map((item) => (
        <a href={item.href} class="mobile-nav__link">{item.label}</a>
      ))}
      <a href={getLocalePath(locale, "/tours/")} class="btn btn-primary mobile-nav__cta">
        {t(locale, "nav.book_now")}
      </a>
    </nav>
    <LanguageSwitcher locale={locale} path={path} config={config} />
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: var(--header-height);
    background: rgba(10, 37, 64, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-subtle);
  }

  .header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    gap: var(--space-8);
  }

  .header__logo {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-extrabold);
    letter-spacing: var(--letter-spacing-wide);
    text-transform: uppercase;
    color: var(--accent);
    text-decoration: none;
    white-space: nowrap;
  }

  .header__nav {
    display: flex;
    gap: var(--space-6);
  }

  .header__nav-link {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--text-muted);
    text-decoration: none;
    transition: color var(--transition-fast);
    letter-spacing: var(--letter-spacing-wide);
    text-transform: uppercase;
  }

  .header__nav-link:hover {
    color: var(--text-primary);
  }

  .header__actions {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .header__cta {
    text-decoration: none;
  }

  .header__hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    padding: var(--space-2);
    cursor: pointer;
  }

  .header__hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text-primary);
    transition: all var(--transition-base);
  }

  .mobile-nav {
    display: none;
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-primary);
    padding: var(--space-8) var(--space-6);
    flex-direction: column;
    gap: var(--space-8);
  }

  .mobile-nav.open {
    display: flex;
  }

  .mobile-nav__links {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .mobile-nav__link {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--text-primary);
    text-decoration: none;
  }

  .mobile-nav__cta {
    margin-top: var(--space-4);
    text-align: center;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .header__nav,
    .header__actions {
      display: none;
    }

    .header__hamburger {
      display: flex;
    }
  }
</style>

<script>
  const toggle = document.querySelector("[data-mobile-toggle]");
  const nav = document.querySelector("[data-mobile-nav]");
  toggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
  });
</script>
```

- [ ] **Step 3: Create Footer**

`packages/shared/src/components/Footer.astro`:
```astro
---
import type { BrandConfig, Locale } from "../types.js";
import { t } from "../i18n/index.js";
import { getLocalePath } from "../config.js";

interface Props {
  config: BrandConfig;
  locale: Locale;
}

const { config, locale } = Astro.props;
const year = new Date().getFullYear();
---

<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <span class="footer__logo">{config.name}</span>
      <p class="footer__tagline">{config.tagline}</p>
    </div>

    <nav class="footer__links">
      <a href={getLocalePath(locale, "/tours/")}>{t(locale, "nav.tours")}</a>
      <a href={getLocalePath(locale, "/about/")}>{t(locale, "nav.about")}</a>
      <a href={getLocalePath(locale, "/contact/")}>{t(locale, "nav.contact")}</a>
      <a href={getLocalePath(locale, "/blog/")}>{t(locale, "nav.blog")}</a>
      <a href={getLocalePath(locale, "/faq/")}>{t(locale, "nav.faq")}</a>
      <a href={getLocalePath(locale, "/reviews/")}>{t(locale, "nav.reviews")}</a>
    </nav>

    <nav class="footer__legal">
      <a href={getLocalePath(locale, "/terms/")}>{t(locale, "footer.terms")}</a>
      <a href={getLocalePath(locale, "/cancellation-policy/")}>{t(locale, "footer.cancellation_policy")}</a>
    </nav>

    <div class="footer__social">
      <span class="footer__social-label">{t(locale, "footer.follow_us")}</span>
      <div class="footer__social-links">
        <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
        <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
        {config.social.youtube && (
          <a href={config.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">YouTube</a>
        )}
      </div>
    </div>

    <p class="footer__copy">&copy; {year} {config.name}. All rights reserved.</p>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--border-subtle);
    padding: var(--space-16) 0 var(--space-8);
    margin-top: var(--space-20);
  }

  .footer__inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--space-8);
  }

  .footer__logo {
    font-weight: var(--font-weight-extrabold);
    font-size: var(--font-size-base);
    letter-spacing: var(--letter-spacing-wide);
    text-transform: uppercase;
    color: var(--accent);
  }

  .footer__tagline {
    margin-top: var(--space-2);
    font-size: var(--font-size-sm);
    color: var(--text-muted);
  }

  .footer__links,
  .footer__legal {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .footer__links a,
  .footer__legal a {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer__links a:hover,
  .footer__legal a:hover {
    color: var(--text-primary);
  }

  .footer__social-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-wider);
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .footer__social-links {
    display: flex;
    gap: var(--space-4);
    margin-top: var(--space-2);
  }

  .footer__social-links a {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    text-decoration: none;
  }

  .footer__social-links a:hover {
    color: var(--accent);
  }

  .footer__copy {
    grid-column: 1 / -1;
    text-align: center;
    font-size: var(--font-size-xs);
    color: var(--text-muted);
    margin-top: var(--space-8);
    padding-top: var(--space-8);
    border-top: 1px solid var(--border-subtle);
  }

  @media (max-width: 768px) {
    .footer__inner {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 4: Create WhatsAppButton**

`packages/shared/src/components/WhatsAppButton.astro`:
```astro
---
interface Props {
  phone: string;
}

const { phone } = Astro.props;
const cleanPhone = phone.replace(/[^0-9]/g, "");
const whatsappUrl = `https://wa.me/${cleanPhone}`;
---

<a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  class="whatsapp-btn"
  aria-label="Contact us on WhatsApp"
>
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>

<style>
  .whatsapp-btn {
    position: fixed;
    bottom: var(--space-6);
    right: var(--space-6);
    z-index: 90;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #25D366;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
    transition: transform var(--transition-fast);
    text-decoration: none;
  }

  .whatsapp-btn:hover {
    transform: scale(1.1);
    color: white;
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Header, Footer, LanguageSwitcher, WhatsAppButton

Fixed header with blur backdrop, mobile hamburger nav.
Footer with links, social, legal sections.
Language switcher with active state.
Floating WhatsApp CTA button."
```

---

## Task 8: Product Components

**Files:**
- Create: `packages/shared/src/components/PriceDisplay.astro`
- Create: `packages/shared/src/components/ProductCard.astro`
- Create: `packages/shared/src/components/ProductGrid.astro`
- Create: `packages/shared/src/components/ProductHero.astro`
- Create: `packages/shared/src/components/BookingWidget.astro`
- Create: `packages/shared/src/components/CategoryNav.astro`

- [ ] **Step 1: Create PriceDisplay**

`packages/shared/src/components/PriceDisplay.astro`:
```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";
import { formatPrice } from "../lib/prices.js";

interface Props {
  cents: number;
  locale: Locale;
  size?: "sm" | "md" | "lg";
}

const { cents, locale, size = "md" } = Astro.props;
---

<span class:list={["price", `price--${size}`]}>
  <span class="price__from">{t(locale, "product.from")}</span>
  <span class="price__amount">{formatPrice(cents)}</span>
</span>

<style>
  .price {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-1);
  }

  .price__from {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
  }

  .price__amount {
    font-weight: var(--font-weight-extrabold);
    color: var(--text-primary);
  }

  .price--sm .price__amount { font-size: var(--font-size-base); }
  .price--md .price__amount { font-size: var(--font-size-xl); }
  .price--lg .price__amount { font-size: var(--font-size-3xl); }
</style>
```

- [ ] **Step 2: Create ProductCard**

`packages/shared/src/components/ProductCard.astro`:
```astro
---
import type { NormalizedItem, Locale } from "../types.js";
import { getLocalePath } from "../config.js";
import PriceDisplay from "./PriceDisplay.astro";

interface Props {
  item: NormalizedItem;
  locale: Locale;
}

const { item, locale } = Astro.props;
const href = getLocalePath(locale, `/tours/${item.slug}/`);
---

<a href={href} class="product-card">
  <div class="product-card__image">
    <img
      src={item.image_url}
      alt={item.name}
      loading="lazy"
      width="400"
      height="300"
    />
    <span class="chip product-card__category">{item.category}</span>
  </div>
  <div class="product-card__body">
    <h3 class="product-card__title">{item.name}</h3>
    {item.headline && (
      <p class="product-card__headline">{item.headline}</p>
    )}
    <div class="product-card__footer">
      <PriceDisplay cents={item.price_from} locale={locale} size="sm" />
    </div>
  </div>
</a>

<style>
  .product-card {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    text-decoration: none;
    transition: all var(--transition-base);
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--border);
  }

  .product-card__image {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }

  .product-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }

  .product-card:hover .product-card__image img {
    transform: scale(1.05);
  }

  .product-card__category {
    position: absolute;
    top: var(--space-3);
    left: var(--space-3);
  }

  .product-card__body {
    padding: var(--space-4) var(--space-4) var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    flex: 1;
  }

  .product-card__title {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-snug);
  }

  .product-card__headline {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    line-height: var(--line-height-relaxed);
  }

  .product-card__footer {
    margin-top: auto;
    padding-top: var(--space-3);
    border-top: 1px solid var(--border-subtle);
  }
</style>
```

- [ ] **Step 3: Create ProductGrid**

`packages/shared/src/components/ProductGrid.astro`:
```astro
---
import type { NormalizedItem, Locale } from "../types.js";
import ProductCard from "./ProductCard.astro";

interface Props {
  items: NormalizedItem[];
  locale: Locale;
}

const { items, locale } = Astro.props;
---

<div class="product-grid">
  {items.map((item) => (
    <ProductCard item={item} locale={locale} />
  ))}
</div>

<style>
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-6);
  }

  @media (max-width: 640px) {
    .product-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 4: Create CategoryNav**

`packages/shared/src/components/CategoryNav.astro`:
```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";
import type { TranslationKey } from "../i18n/types.js";

interface Props {
  categories: string[];
  activeCategory?: string;
  locale: Locale;
  basePath: string;
}

const { categories, activeCategory, locale, basePath } = Astro.props;
---

<nav class="category-nav" aria-label="Category filter">
  <a
    href={basePath}
    class:list={["chip", { active: !activeCategory }]}
  >
    {t(locale, "category.all")}
  </a>
  {categories.map((cat) => (
    <a
      href={`${basePath}${cat}/`}
      class:list={["chip", { active: activeCategory === cat }]}
    >
      {t(locale, `category.${cat}` as TranslationKey)}
    </a>
  ))}
</nav>

<style>
  .category-nav {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-8);
  }

  .category-nav .chip {
    text-decoration: none;
  }
</style>
```

- [ ] **Step 5: Create ProductHero**

`packages/shared/src/components/ProductHero.astro`:
```astro
---
import type { NormalizedItem, Locale } from "../types.js";
import { t } from "../i18n/index.js";
import PriceDisplay from "./PriceDisplay.astro";

interface Props {
  item: NormalizedItem;
  locale: Locale;
}

const { item, locale } = Astro.props;
---

<section class="product-hero">
  <div class="product-hero__gallery">
    {item.images.length > 0 ? (
      <img
        src={item.images[0].url}
        alt={item.name}
        class="product-hero__main-image"
        width="800"
        height="500"
      />
    ) : (
      <div class="product-hero__placeholder">No image</div>
    )}
    {item.images.length > 1 && (
      <div class="product-hero__thumbs">
        {item.images.slice(1, 5).map((img) => (
          <img src={img.url} alt="" loading="lazy" width="200" height="150" />
        ))}
      </div>
    )}
  </div>

  <div class="product-hero__info">
    <span class="tag">{item.category}</span>
    <h1>{item.name}</h1>
    {item.headline && <p class="product-hero__headline">{item.headline}</p>}
    <PriceDisplay cents={item.price_from} locale={locale} size="lg" />

    {item.location && (
      <div class="product-hero__meta">
        <span class="product-hero__meta-label">{t(locale, "product.location")}</span>
        <span>{item.location.address}, {item.location.city}</span>
      </div>
    )}
  </div>
</section>

<style>
  .product-hero {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-8);
    padding-top: calc(var(--header-height) + var(--space-8));
  }

  .product-hero__gallery {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .product-hero__main-image {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: var(--radius-lg);
  }

  .product-hero__thumbs {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-3);
  }

  .product-hero__thumbs img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: var(--radius-md);
    cursor: pointer;
    opacity: 0.7;
    transition: opacity var(--transition-fast);
  }

  .product-hero__thumbs img:hover {
    opacity: 1;
  }

  .product-hero__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding-top: var(--space-4);
  }

  .product-hero__info h1 {
    font-size: var(--font-size-3xl);
  }

  .product-hero__headline {
    font-size: var(--font-size-lg);
    color: var(--text-muted);
    line-height: var(--line-height-relaxed);
  }

  .product-hero__meta {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }

  .product-hero__meta-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-wider);
    text-transform: uppercase;
    color: var(--text-muted);
  }

  @media (max-width: 768px) {
    .product-hero {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 6: Create BookingWidget**

`packages/shared/src/components/BookingWidget.astro`:
```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";

interface Props {
  itemPk: number;
  companyShortname: string;
  locale: Locale;
}

const { itemPk, companyShortname, locale } = Astro.props;
---

<div class="booking-widget">
  <button
    class="btn btn-primary booking-widget__btn"
    data-fh-item={itemPk}
    data-fh-company={companyShortname}
  >
    {t(locale, "product.book_now")}
  </button>
</div>

<script>
  function initFHLightframe() {
    const buttons = document.querySelectorAll<HTMLButtonElement>("[data-fh-item]");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemPk = btn.dataset.fhItem;
        const company = btn.dataset.fhCompany;
        if (itemPk && company) {
          // FareHarbor lightframe API
          (window as any).FH?.open?.({
            shortname: company,
            items: [itemPk],
          });
        }
      });
    });
  }

  // Load FH lightframe script
  if (!document.querySelector("script[src*='fareharbor.com/embeds']")) {
    const script = document.createElement("script");
    script.src = "https://fareharbor.com/embeds/api/v1/";
    script.async = true;
    script.onload = initFHLightframe;
    document.head.appendChild(script);
  } else {
    initFHLightframe();
  }
</script>

<style>
  .booking-widget {
    position: sticky;
    top: calc(var(--header-height) + var(--space-6));
    padding: var(--space-6);
    background: var(--bg-surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
  }

  .booking-widget__btn {
    width: 100%;
    padding: var(--space-4) var(--space-8);
    font-size: var(--font-size-base);
  }
</style>
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add product components

ProductCard, ProductGrid, ProductHero, PriceDisplay,
BookingWidget (FH lightframe), CategoryNav (chip filter)."
```

---

## Task 9: Content Components (Hero, Reviews, Blog, FAQ, Contact)

**Files:**
- Create: `packages/shared/src/components/HeroSection.astro`
- Create: `packages/shared/src/components/ReviewCard.astro`
- Create: `packages/shared/src/components/ReviewsGrid.astro`
- Create: `packages/shared/src/components/BlogCard.astro`
- Create: `packages/shared/src/components/FAQ.astro`
- Create: `packages/shared/src/components/ContactForm.astro`

- [ ] **Step 1: Create HeroSection**

`packages/shared/src/components/HeroSection.astro`:
```astro
---
interface Props {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

const { title, subtitle, ctaText, ctaHref } = Astro.props;
---

<section class="hero">
  <div class="container hero__inner">
    <h1 class="hero__title">{title}</h1>
    {subtitle && <p class="hero__subtitle">{subtitle}</p>}
    {ctaText && ctaHref && (
      <a href={ctaHref} class="btn btn-primary hero__cta">{ctaText}</a>
    )}
  </div>
  <div class="hero__decoration" aria-hidden="true"></div>
</section>

<style>
  .hero {
    position: relative;
    padding: calc(var(--header-height) + var(--space-20)) 0 var(--space-20);
    overflow: hidden;
    min-height: 60vh;
    display: flex;
    align-items: center;
  }

  .hero__inner {
    position: relative;
    z-index: 1;
  }

  .hero__title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: var(--font-weight-extrabold);
    line-height: var(--line-height-tight);
    max-width: 700px;
  }

  .hero__subtitle {
    margin-top: var(--space-6);
    font-size: var(--font-size-lg);
    color: var(--text-muted);
    line-height: var(--line-height-relaxed);
    max-width: 500px;
  }

  .hero__cta {
    margin-top: var(--space-8);
    text-decoration: none;
    padding: var(--space-4) var(--space-8);
    font-size: var(--font-size-base);
  }

  .hero__decoration {
    position: absolute;
    top: 10%;
    right: -5%;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border: 1px solid var(--border);
    opacity: 0.5;
  }

  .hero__decoration::after {
    content: '';
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    border-radius: 50%;
    border: 1px solid var(--border);
    opacity: 0.5;
  }
</style>
```

- [ ] **Step 2: Create ReviewCard**

`packages/shared/src/components/ReviewCard.astro`:
```astro
---
import type { ManualReview } from "../types.js";

interface Props {
  review: ManualReview;
}

const { review } = Astro.props;
const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
---

<div class="review-card">
  <div class="review-card__rating" aria-label={`${review.rating} out of 5 stars`}>
    {stars}
  </div>
  <p class="review-card__text">{review.text}</p>
  <div class="review-card__author">
    <span class="review-card__name">{review.author}</span>
    <span class="review-card__origin">{review.origin}</span>
  </div>
</div>

<style>
  .review-card {
    padding: var(--space-6);
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-subtle);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .review-card__rating {
    color: var(--accent);
    font-size: var(--font-size-lg);
    letter-spacing: 2px;
  }

  .review-card__text {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    line-height: var(--line-height-relaxed);
    flex: 1;
  }

  .review-card__author {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-3);
    border-top: 1px solid var(--border-subtle);
  }

  .review-card__name {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-sm);
    color: var(--text-primary);
  }

  .review-card__origin {
    font-size: var(--font-size-xs);
    color: var(--text-muted);
  }
</style>
```

- [ ] **Step 3: Create ReviewsGrid**

`packages/shared/src/components/ReviewsGrid.astro`:
```astro
---
import type { ManualReview } from "../types.js";
import ReviewCard from "./ReviewCard.astro";

interface Props {
  reviews: ManualReview[];
}

const { reviews } = Astro.props;
---

<div class="reviews-grid">
  {reviews.map((review) => (
    <ReviewCard review={review} />
  ))}
</div>

<style>
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-6);
  }
</style>
```

- [ ] **Step 4: Create BlogCard**

`packages/shared/src/components/BlogCard.astro`:
```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";
import { getLocalePath } from "../config.js";

interface Props {
  title: string;
  excerpt: string;
  slug: string;
  image?: string;
  date: string;
  locale: Locale;
}

const { title, excerpt, slug, image, date, locale } = Astro.props;
const href = getLocalePath(locale, `/blog/${slug}/`);
const formattedDate = new Date(date).toLocaleDateString(locale, {
  year: "numeric",
  month: "long",
  day: "numeric",
});
---

<a href={href} class="blog-card">
  {image && (
    <div class="blog-card__image">
      <img src={image} alt={title} loading="lazy" width="400" height="250" />
    </div>
  )}
  <div class="blog-card__body">
    <time class="blog-card__date">{formattedDate}</time>
    <h3 class="blog-card__title">{title}</h3>
    <p class="blog-card__excerpt">{excerpt}</p>
    <span class="blog-card__link">{t(locale, "blog.read_more")} →</span>
  </div>
</a>

<style>
  .blog-card {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    text-decoration: none;
    transition: all var(--transition-base);
  }

  .blog-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }

  .blog-card__image {
    aspect-ratio: 16 / 10;
    overflow: hidden;
  }

  .blog-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .blog-card__body {
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .blog-card__date {
    font-size: var(--font-size-xs);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
  }

  .blog-card__title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }

  .blog-card__excerpt {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    line-height: var(--line-height-relaxed);
  }

  .blog-card__link {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--accent);
    margin-top: var(--space-2);
  }
</style>
```

- [ ] **Step 5: Create FAQ component**

`packages/shared/src/components/FAQ.astro`:
```astro
---
interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
}

const { items } = Astro.props;
---

<div class="faq">
  {items.map((item, i) => (
    <details class="faq__item">
      <summary class="faq__question">{item.question}</summary>
      <div class="faq__answer" set:html={item.answer} />
    </details>
  ))}
</div>

<style>
  .faq {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .faq__item {
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .faq__question {
    padding: var(--space-4) var(--space-5);
    font-weight: var(--font-weight-semibold);
    color: var(--text-primary);
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .faq__question::after {
    content: "+";
    font-size: var(--font-size-xl);
    color: var(--accent);
    transition: transform var(--transition-fast);
  }

  .faq__item[open] .faq__question::after {
    transform: rotate(45deg);
  }

  .faq__question::-webkit-details-marker {
    display: none;
  }

  .faq__answer {
    padding: 0 var(--space-5) var(--space-5);
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    line-height: var(--line-height-relaxed);
  }
</style>
```

- [ ] **Step 6: Create ContactForm**

`packages/shared/src/components/ContactForm.astro`:
```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
---

<form class="contact-form" action="#" method="POST">
  <div class="contact-form__field">
    <label for="name">{t(locale, "contact.name")}</label>
    <input type="text" id="name" name="name" required class="mock-input" />
  </div>
  <div class="contact-form__field">
    <label for="email">{t(locale, "contact.email")}</label>
    <input type="email" id="email" name="email" required class="mock-input" />
  </div>
  <div class="contact-form__field">
    <label for="message">{t(locale, "contact.message")}</label>
    <textarea id="message" name="message" rows="5" required class="mock-input"></textarea>
  </div>
  <button type="submit" class="btn btn-primary">{t(locale, "contact.send")}</button>
</form>

<style>
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    max-width: 560px;
  }

  .contact-form__field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .contact-form__field label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--text-secondary);
  }

  .mock-input {
    padding: var(--space-3) var(--space-4);
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-family: inherit;
    font-size: var(--font-size-base);
    transition: border-color var(--transition-fast);
  }

  .mock-input:focus {
    outline: none;
    border-color: var(--accent);
  }

  textarea.mock-input {
    resize: vertical;
  }
</style>
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add content components

HeroSection, ReviewCard, ReviewsGrid, BlogCard,
FAQ (accordion), ContactForm."
```

---

## Task 10: Atlantis Site — All Pages

**Files:**
- Create: `packages/atlantis/src/content/config.ts`
- Create: `packages/atlantis/src/content/pages/en/homepage.md`
- Create: `packages/atlantis/src/content/pages/pt/homepage.md`
- Create: `packages/atlantis/src/content/pages/en/about.md`
- Create: `packages/atlantis/src/content/pages/pt/about.md`
- Create: `packages/atlantis/src/content/blog/en/welcome.md`
- Create: `packages/atlantis/src/content/reviews/manual.json`
- Create: `packages/atlantis/src/pages/index.astro`
- Create: `packages/atlantis/src/pages/[locale]/index.astro`
- Create: `packages/atlantis/src/pages/[locale]/tours/index.astro`
- Create: `packages/atlantis/src/pages/[locale]/tours/[slug].astro`
- Create: `packages/atlantis/src/pages/[locale]/about.astro`
- Create: `packages/atlantis/src/pages/[locale]/contact.astro`
- Create: `packages/atlantis/src/pages/[locale]/blog/index.astro`
- Create: `packages/atlantis/src/pages/[locale]/blog/[slug].astro`
- Create: `packages/atlantis/src/pages/[locale]/reviews.astro`
- Create: `packages/atlantis/src/pages/[locale]/faq.astro`
- Create: `packages/atlantis/src/pages/[locale]/terms.astro`
- Create: `packages/atlantis/src/pages/[locale]/cancellation-policy.astro`

- [ ] **Step 1: Create content collections config**

`packages/atlantis/src/content/config.ts`:
```typescript
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string().optional(),
    excerpt: z.string(),
    image: z.string().optional(),
    locale: z.enum(["en", "pt", "es", "fr"]),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, pages };
```

- [ ] **Step 2: Create placeholder content**

`packages/atlantis/src/content/pages/en/homepage.md`:
```markdown
---
title: Discover the Algarve Coast
description: Handcrafted maritime experiences along Portugal's most stunning coastline
---

From hidden caves to open sea, experience the Algarve's dramatic coastline with local guides who know every arch, every tide, every secret cove.
```

`packages/atlantis/src/content/pages/pt/homepage.md`:
```markdown
---
title: Descubra a Costa Algarvia
description: Experiências marítimas artesanais ao longo da costa mais deslumbrante de Portugal
---

De grutas escondidas a mar aberto, descubra a costa dramática do Algarve com guias locais que conhecem cada arco, cada maré, cada enseada secreta.
```

`packages/atlantis/src/content/pages/en/about.md`:
```markdown
---
title: About Atlantis Tours
description: Algarve boat tours since 2010
---

Based in Portimão, we've been sharing the beauty of the Algarve coastline with visitors from around the world. Our experienced crew and well-maintained fleet ensure every trip is safe, comfortable, and unforgettable.
```

`packages/atlantis/src/content/pages/pt/about.md`:
```markdown
---
title: Sobre a Atlantis Tours
description: Passeios de barco no Algarve desde 2010
---

Sediados em Portimão, partilhamos a beleza da costa algarvia com visitantes de todo o mundo. A nossa tripulação experiente e frota bem mantida garantem que cada viagem é segura, confortável e inesquecível.
```

`packages/atlantis/src/content/blog/en/welcome.md`:
```markdown
---
title: Welcome to Atlantis Tours
date: "2026-04-01"
author: Atlantis Team
excerpt: Discover what makes our Algarve boat tours unforgettable.
image: ""
locale: en
---

Welcome to the new Atlantis Tours website! We're excited to share our passion for the Algarve coast with you.
```

`packages/atlantis/src/content/reviews/manual.json`:
```json
[
  {
    "author": "Sarah M.",
    "origin": "London, UK",
    "rating": 5,
    "text": "The Benagil cave tour was absolutely breathtaking. Our guide knew all the best spots and the timing was perfect with the light.",
    "date": "2026-03-15"
  },
  {
    "author": "Hans K.",
    "origin": "Berlin, Germany",
    "rating": 5,
    "text": "Best boat tour we've ever done. The yacht cruise at sunset was pure magic.",
    "date": "2026-02-20"
  },
  {
    "author": "Ana R.",
    "origin": "Lisboa, Portugal",
    "rating": 4,
    "text": "Excelente passeio! A tripulação foi muito profissional e simpática.",
    "date": "2026-01-10"
  }
]
```

- [ ] **Step 3: Create root redirect page**

`packages/atlantis/src/pages/index.astro`:
```astro
---
// Redirect root to default locale
return Astro.redirect("/en/");
---
```

- [ ] **Step 4: Create homepage**

`packages/atlantis/src/pages/[locale]/index.astro`:
```astro
---
import { getCollection } from "astro:content";
import type { Locale, NormalizedItem } from "@algarve-tourism/shared";
import { LOCALES, t } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import HeroSection from "@algarve-tourism/shared/components/HeroSection.astro";
import ProductGrid from "@algarve-tourism/shared/components/ProductGrid.astro";
import ReviewsGrid from "@algarve-tourism/shared/components/ReviewsGrid.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../config.js";
import { getLocalePath } from "@algarve-tourism/shared";
import manualReviews from "../../content/reviews/manual.json";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;
const path = "/";

// Load items — try from data file, fall back to empty
let items: NormalizedItem[] = [];
try {
  const data = await import(`@algarve-tourism/shared/data/${config.fh.shortname}.json`);
  items = data.default ?? data;
} catch {
  // No data fetched yet — show empty state
}

const featuredItems = items.slice(0, 6);
const topReviews = manualReviews.filter((r) => r.rating >= 4).slice(0, 3);

// Load page content
let heroTitle = config.tagline;
let heroSubtitle = "";
try {
  const page = await getCollection("pages");
  const homePage = page.find((p) => p.id === `${locale}/homepage`);
  if (homePage) {
    heroTitle = homePage.data.title;
    heroSubtitle = homePage.data.description ?? "";
  }
} catch {}
---

<PageLayout
  title={heroTitle}
  description={heroSubtitle || config.tagline}
  locale={locale}
  path={path}
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}${path}`} />

  <HeroSection
    title={heroTitle}
    subtitle={heroSubtitle}
    ctaText={t(locale, "hero.cta")}
    ctaHref={getLocalePath(locale, "/tours/")}
  />

  {featuredItems.length > 0 && (
    <section class="section container">
      <h2>{t(locale, "nav.tours")}</h2>
      <ProductGrid items={featuredItems} locale={locale} />
    </section>
  )}

  {topReviews.length > 0 && (
    <section class="section container">
      <h2>{t(locale, "reviews.title")}</h2>
      <ReviewsGrid reviews={topReviews} />
    </section>
  )}

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>
```

- [ ] **Step 5: Create tours listing page**

`packages/atlantis/src/pages/[locale]/tours/index.astro`:
```astro
---
import type { Locale, NormalizedItem } from "@algarve-tourism/shared";
import { LOCALES, t } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import ProductGrid from "@algarve-tourism/shared/components/ProductGrid.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;

let items: NormalizedItem[] = [];
try {
  const data = await import(`@algarve-tourism/shared/data/${config.fh.shortname}.json`);
  items = data.default ?? data;
} catch {}
---

<PageLayout
  title={t(locale, "nav.tours")}
  description={`${config.name} — ${t(locale, "category.boats")}`}
  locale={locale}
  path="/tours/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/tours/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{t(locale, "category.boats")}</h1>
    <ProductGrid items={items} locale={locale} />
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>
```

- [ ] **Step 6: Create product detail page**

`packages/atlantis/src/pages/[locale]/tours/[slug].astro`:
```astro
---
import type { Locale, NormalizedItem } from "@algarve-tourism/shared";
import { LOCALES, t } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import ProductHero from "@algarve-tourism/shared/components/ProductHero.astro";
import BookingWidget from "@algarve-tourism/shared/components/BookingWidget.astro";
import ProductGrid from "@algarve-tourism/shared/components/ProductGrid.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../../config.js";

export async function getStaticPaths() {
  let items: NormalizedItem[] = [];
  try {
    const data = await import(`@algarve-tourism/shared/data/${config.fh.shortname}.json`);
    items = data.default ?? data;
  } catch {}

  return LOCALES.flatMap((locale) =>
    items.map((item) => ({
      params: { locale, slug: item.slug },
      props: { item },
    })),
  );
}

const { item } = Astro.props as { item: NormalizedItem };
const locale = Astro.params.locale as Locale;

let allItems: NormalizedItem[] = [];
try {
  const data = await import(`@algarve-tourism/shared/data/${config.fh.shortname}.json`);
  allItems = data.default ?? data;
} catch {}
const relatedItems = allItems.filter((i) => i.pk !== item.pk).slice(0, 3);

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Product", "TouristTrip"],
  name: item.name,
  description: item.description_text,
  image: item.images.map((img) => img.url),
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: (item.price_from / 100).toFixed(2),
    availability: "https://schema.org/InStock",
  },
  ...(item.location && {
    touristType: "Leisure",
    itinerary: {
      "@type": "Place",
      geo: {
        "@type": "GeoCoordinates",
        latitude: item.location.latitude,
        longitude: item.location.longitude,
      },
    },
  }),
};
---

<PageLayout
  title={item.name}
  description={item.description_text.slice(0, 160)}
  image={item.image_url}
  locale={locale}
  path={`/tours/${item.slug}/`}
  config={config}
  structuredData={structuredData}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/tours/${item.slug}/`} />

  <div class="container product-detail">
    <ProductHero item={item} locale={locale} />

    <div class="product-detail__content">
      <div class="product-detail__body">
        {item.description_bullets.length > 0 && (
          <section>
            <h2>{t(locale, "product.highlights")}</h2>
            <ul class="product-detail__bullets">
              {item.description_bullets.map((bullet) => (
                <li>{bullet}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <div class="product-detail__description" set:html={item.description_html} />
        </section>

        {item.cancellation_policy_html && (
          <section>
            <h3>{t(locale, "product.cancellation")}</h3>
            <div set:html={item.cancellation_policy_html} />
          </section>
        )}
      </div>

      <aside class="product-detail__sidebar">
        <BookingWidget
          itemPk={item.pk}
          companyShortname={config.fh.shortname}
          locale={locale}
        />
      </aside>
    </div>

    {relatedItems.length > 0 && (
      <section class="section">
        <h2>{t(locale, "product.related")}</h2>
        <ProductGrid items={relatedItems} locale={locale} />
      </section>
    )}
  </div>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>

<style>
  .product-detail {
    padding-bottom: var(--space-16);
  }

  .product-detail__content {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: var(--space-10);
    margin-top: var(--space-10);
  }

  .product-detail__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .product-detail__body section {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .product-detail__bullets {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .product-detail__bullets li::before {
    content: "✓ ";
    color: var(--accent);
    font-weight: var(--font-weight-bold);
  }

  .product-detail__description {
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    .product-detail__content {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 7: Create remaining Atlantis pages**

`packages/atlantis/src/pages/[locale]/about.astro`:
```astro
---
import { getCollection } from "astro:content";
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;

let title = t(locale, "nav.about");
let content = "";
try {
  const pages = await getCollection("pages");
  const aboutPage = pages.find((p) => p.id === `${locale}/about`);
  if (aboutPage) {
    title = aboutPage.data.title;
    const { Content } = await aboutPage.render();
    // We'll render inline
  }
} catch {}
---

<PageLayout
  title={title}
  description={`${t(locale, "nav.about")} — ${config.name}`}
  locale={locale}
  path="/about/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/about/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{title}</h1>
    <div class="page-content">
      <slot />
    </div>
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>

<style>
  .page-content {
    max-width: 680px;
    margin-top: var(--space-8);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--text-secondary);
  }
</style>
```

`packages/atlantis/src/pages/[locale]/contact.astro`:
```astro
---
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import ContactForm from "@algarve-tourism/shared/components/ContactForm.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;
---

<PageLayout
  title={t(locale, "nav.contact")}
  description={`${t(locale, "nav.contact")} — ${config.name}`}
  locale={locale}
  path="/contact/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/contact/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{t(locale, "nav.contact")}</h1>
    <ContactForm locale={locale} />
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>
```

`packages/atlantis/src/pages/[locale]/blog/index.astro`:
```astro
---
import { getCollection } from "astro:content";
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import BlogCard from "@algarve-tourism/shared/components/BlogCard.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;
const allPosts = await getCollection("blog");
const posts = allPosts
  .filter((post) => post.data.locale === locale)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
---

<PageLayout
  title={t(locale, "nav.blog")}
  description={`${t(locale, "nav.blog")} — ${config.name}`}
  locale={locale}
  path="/blog/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/blog/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{t(locale, "nav.blog")}</h1>
    <div class="blog-grid">
      {posts.map((post) => (
        <BlogCard
          title={post.data.title}
          excerpt={post.data.excerpt}
          slug={post.slug.replace(`${locale}/`, "")}
          image={post.data.image}
          date={post.data.date}
          locale={locale}
        />
      ))}
    </div>
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>

<style>
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-8);
  }
</style>
```

`packages/atlantis/src/pages/[locale]/blog/[slug].astro`:
```astro
---
import { getCollection } from "astro:content";
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../../config.js";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: {
      locale: post.data.locale,
      slug: post.slug.replace(`${post.data.locale}/`, ""),
    },
    props: { post },
  }));
}

const { post } = Astro.props;
const locale = Astro.params.locale as Locale;
const { Content } = await post.render();
---

<PageLayout
  title={post.data.title}
  description={post.data.excerpt}
  image={post.data.image}
  type="article"
  locale={locale}
  path={`/blog/${Astro.params.slug}/`}
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/blog/${Astro.params.slug}/`} />

  <article class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{post.data.title}</h1>
    <time class="text-muted">{new Date(post.data.date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}</time>
    <div class="page-content">
      <Content />
    </div>
  </article>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>

<style>
  article { display: flex; flex-direction: column; gap: var(--space-4); }
  .page-content {
    max-width: 680px;
    margin-top: var(--space-6);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--text-secondary);
  }
</style>
```

`packages/atlantis/src/pages/[locale]/reviews.astro`:
```astro
---
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import ReviewsGrid from "@algarve-tourism/shared/components/ReviewsGrid.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../config.js";
import manualReviews from "../../content/reviews/manual.json";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;
---

<PageLayout
  title={t(locale, "nav.reviews")}
  description={t(locale, "reviews.title")}
  locale={locale}
  path="/reviews/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/reviews/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{t(locale, "reviews.title")}</h1>
    <ReviewsGrid reviews={manualReviews} />
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>
```

`packages/atlantis/src/pages/[locale]/faq.astro`:
```astro
---
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import FAQ from "@algarve-tourism/shared/components/FAQ.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;

const faqItems = [
  { question: "What should I bring?", answer: "Sunscreen, a hat, a towel, and a camera. We provide life jackets and all safety equipment." },
  { question: "Can I cancel my booking?", answer: "Yes, free cancellation is available up to 24 hours before departure. Check each tour's specific policy for details." },
  { question: "Are the tours suitable for children?", answer: "Most tours welcome children. Each tour listing specifies age requirements and suitability." },
  { question: "Where do tours depart from?", answer: "Most tours depart from Marina de Portimão. Specific meeting points are shown on each tour page." },
  { question: "What happens in bad weather?", answer: "Safety is our priority. If conditions are unsafe, we'll reschedule or offer a full refund." },
];
---

<PageLayout
  title={t(locale, "nav.faq")}
  description={`FAQ — ${config.name}`}
  locale={locale}
  path="/faq/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/faq/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{t(locale, "nav.faq")}</h1>
    <div style="margin-top: var(--space-8); max-width: 720px;">
      <FAQ items={faqItems} />
    </div>
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>
```

`packages/atlantis/src/pages/[locale]/terms.astro`:
```astro
---
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import { config } from "../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;
---

<PageLayout
  title={t(locale, "footer.terms")}
  description={`${t(locale, "footer.terms")} — ${config.name}`}
  locale={locale}
  path="/terms/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/terms/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{t(locale, "footer.terms")}</h1>
    <div class="page-content">
      <p>Terms and conditions content to be added.</p>
    </div>
  </section>

  <Footer slot="footer" config={config} locale={locale} />
</PageLayout>

<style>
  .page-content { max-width: 680px; margin-top: var(--space-8); line-height: var(--line-height-relaxed); color: var(--text-secondary); }
</style>
```

`packages/atlantis/src/pages/[locale]/cancellation-policy.astro`:
```astro
---
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import { config } from "../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;
---

<PageLayout
  title={t(locale, "footer.cancellation_policy")}
  description={`${t(locale, "footer.cancellation_policy")} — ${config.name}`}
  locale={locale}
  path="/cancellation-policy/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/cancellation-policy/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{t(locale, "footer.cancellation_policy")}</h1>
    <div class="page-content">
      <p>Cancellation policy content to be added.</p>
    </div>
  </section>

  <Footer slot="footer" config={config} locale={locale} />
</PageLayout>

<style>
  .page-content { max-width: 680px; margin-top: var(--space-8); line-height: var(--line-height-relaxed); color: var(--text-secondary); }
</style>
```

- [ ] **Step 8: Verify Atlantis builds**

```bash
pnpm --filter @algarve-tourism/atlantis build
```

Expected: build succeeds, static files in `packages/atlantis/dist/`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add all Atlantis Tours pages

Homepage, tours listing, product detail, about, contact,
blog, reviews, FAQ, terms, cancellation policy.
Placeholder content in EN/PT. All routes with i18n."
```

---

## Task 11: Algarve & You Site — All Pages

**Files:** Mirror of Atlantis structure plus category pages and transfers page. Same content structure but with A&Y config.

- [ ] **Step 1: Create A&Y content collections and placeholder content**

Same structure as Atlantis — `content/config.ts`, `content/pages/`, `content/blog/`, `content/reviews/manual.json` — but with A&Y branding. Copy from Atlantis and update text references from "Atlantis Tours" to "Algarve & You" and "boat tours" to "experiences".

`packages/algarve-and-you/src/content/config.ts` — identical to Atlantis.

`packages/algarve-and-you/src/content/pages/en/homepage.md`:
```markdown
---
title: Your Algarve Experience
description: Boats, food, day trips, transfers, and wellness — everything you need in one place
---

From sea to table, coast to countryside. Curated experiences that reveal the true Algarve.
```

`packages/algarve-and-you/src/content/pages/pt/homepage.md`:
```markdown
---
title: A Sua Experiência no Algarve
description: Barcos, gastronomia, excursões, transfers e bem-estar — tudo num só lugar
---

Do mar à mesa, da costa ao campo. Experiências selecionadas que revelam o verdadeiro Algarve.
```

`packages/algarve-and-you/src/content/pages/en/about.md`:
```markdown
---
title: About Algarve & You
description: Your complete Algarve experience partner
---

We bring together the best experiences the Algarve has to offer — from boat tours and gastronomy evenings to day trips and wellness retreats.
```

`packages/algarve-and-you/src/content/pages/pt/about.md`:
```markdown
---
title: Sobre a Algarve & You
description: O seu parceiro completo de experiências no Algarve
---

Reunimos as melhores experiências que o Algarve tem para oferecer — desde passeios de barco e noites gastronómicas até excursões e retiros de bem-estar.
```

`packages/algarve-and-you/src/content/blog/en/welcome.md`:
```markdown
---
title: Welcome to Algarve & You
date: "2026-04-01"
author: A&Y Team
excerpt: Discover the full range of Algarve experiences.
image: ""
locale: en
---

Welcome to the new Algarve & You website! Explore everything the Algarve has to offer.
```

`packages/algarve-and-you/src/content/reviews/manual.json`:
```json
[
  {
    "author": "Maria L.",
    "origin": "Madrid, Spain",
    "rating": 5,
    "text": "The fado dinner was an incredible experience. Amazing food and music in a beautiful setting.",
    "date": "2026-03-20"
  },
  {
    "author": "John P.",
    "origin": "Dublin, Ireland",
    "rating": 5,
    "text": "Booked the Seville day trip — perfectly organized from start to finish.",
    "date": "2026-02-15"
  },
  {
    "author": "Sophie D.",
    "origin": "Paris, France",
    "rating": 4,
    "text": "Excellent service overall. The transfer from Faro was smooth and the driver was very friendly.",
    "date": "2026-01-25"
  }
]
```

- [ ] **Step 2: Create A&Y pages — same as Atlantis but with category support**

Copy all pages from `packages/atlantis/src/pages/` to `packages/algarve-and-you/src/pages/`, then update:
- All `import { config }` paths to point to `../../config.js` (or `../../../config.js` for nested)
- The tours index gets `CategoryNav` component
- Add `[locale]/tours/[category]/index.astro` for category filtering
- Add `[locale]/transfers.astro`

`packages/algarve-and-you/src/pages/[locale]/tours/index.astro` — same as Atlantis but with CategoryNav:
```astro
---
import type { Locale, NormalizedItem } from "@algarve-tourism/shared";
import { LOCALES, t, getLocalePath } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import ProductGrid from "@algarve-tourism/shared/components/ProductGrid.astro";
import CategoryNav from "@algarve-tourism/shared/components/CategoryNav.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;

let items: NormalizedItem[] = [];
try {
  const data = await import(`@algarve-tourism/shared/data/${config.fh.shortname}.json`);
  items = data.default ?? data;
} catch {}
---

<PageLayout
  title={t(locale, "category.all")}
  description={`${config.name} — ${t(locale, "category.all")}`}
  locale={locale}
  path="/tours/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/tours/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{t(locale, "category.all")}</h1>
    <CategoryNav
      categories={config.fh.categories}
      locale={locale}
      basePath={getLocalePath(locale, "/tours/")}
    />
    <ProductGrid items={items} locale={locale} />
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>
```

`packages/algarve-and-you/src/pages/[locale]/tours/[category]/index.astro`:
```astro
---
import type { Locale, NormalizedItem } from "@algarve-tourism/shared";
import { LOCALES, t, getLocalePath } from "@algarve-tourism/shared";
import type { TranslationKey } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import ProductGrid from "@algarve-tourism/shared/components/ProductGrid.astro";
import CategoryNav from "@algarve-tourism/shared/components/CategoryNav.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../../../config.js";

export function getStaticPaths() {
  return LOCALES.flatMap((locale) =>
    config.fh.categories.map((category) => ({
      params: { locale, category },
    })),
  );
}

const locale = Astro.params.locale as Locale;
const category = Astro.params.category as string;
const categoryLabel = t(locale, `category.${category}` as TranslationKey);

let items: NormalizedItem[] = [];
try {
  const data = await import(`@algarve-tourism/shared/data/${config.fh.shortname}.json`);
  const allItems: NormalizedItem[] = data.default ?? data;
  items = allItems.filter((item) => item.category === category);
} catch {}
---

<PageLayout
  title={categoryLabel}
  description={`${categoryLabel} — ${config.name}`}
  locale={locale}
  path={`/tours/${category}/`}
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/tours/${category}/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{categoryLabel}</h1>
    <CategoryNav
      categories={config.fh.categories}
      activeCategory={category}
      locale={locale}
      basePath={getLocalePath(locale, "/tours/")}
    />
    <ProductGrid items={items} locale={locale} />
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>
```

`packages/algarve-and-you/src/pages/[locale]/transfers.astro`:
```astro
---
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t } from "@algarve-tourism/shared";
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;
---

<PageLayout
  title={t(locale, "category.transfers")}
  description={`${t(locale, "category.transfers")} — ${config.name}`}
  locale={locale}
  path="/transfers/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/transfers/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{t(locale, "category.transfers")}</h1>
    <p class="text-muted" style="margin-top: var(--space-4); max-width: 600px; line-height: var(--line-height-relaxed);">
      Airport transfers from Faro and Lisbon. Contact us via WhatsApp to arrange your transfer.
    </p>
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</PageLayout>
```

All other A&Y pages (index.astro root redirect, homepage, product detail, about, contact, blog listing, blog post, reviews, faq, terms, cancellation-policy) — copy from Atlantis and update config import path. The homepage also gets CategoryNav links.

- [ ] **Step 3: Verify A&Y builds**

```bash
pnpm --filter @algarve-tourism/algarve-and-you build
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add all Algarve & You pages

Mirrors Atlantis structure plus category pages and transfers.
CategoryNav chip filter on tour listings.
Placeholder content in EN/PT."
```

---

## Task 12: Build & Deploy Scripts

**Files:**
- Create: `scripts/build.sh`
- Create: `scripts/deploy.sh`

- [ ] **Step 1: Create build script**

`scripts/build.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail

echo "=== Fetching FareHarbor data ==="
pnpm run fetch-data || echo "Warning: FH fetch failed, building with cached data"

echo "=== Building both sites ==="
pnpm run build

echo "=== Build complete ==="
echo "Atlantis: packages/atlantis/dist/"
echo "Algarve & You: packages/algarve-and-you/dist/"
```

- [ ] **Step 2: Create deploy script**

`scripts/deploy.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail

# Load env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

DEPLOY_HOST="${DEPLOY_HOST:?Missing DEPLOY_HOST}"
DEPLOY_USER="${DEPLOY_USER:?Missing DEPLOY_USER}"
ATLANTIS_PATH="${DEPLOY_ATLANTIS_PATH:?Missing DEPLOY_ATLANTIS_PATH}"
AY_PATH="${DEPLOY_AY_PATH:?Missing DEPLOY_AY_PATH}"

echo "=== Deploying Atlantis Tours ==="
rsync -avz --delete packages/atlantis/dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:${ATLANTIS_PATH}/"

echo "=== Deploying Algarve & You ==="
rsync -avz --delete packages/algarve-and-you/dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:${AY_PATH}/"

echo "=== Deploy complete ==="
```

- [ ] **Step 3: Make scripts executable**

```bash
chmod +x scripts/build.sh scripts/deploy.sh
```

- [ ] **Step 4: Verify full build pipeline**

```bash
pnpm run build
```

Expected: both sites build successfully via Turborepo.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add build and deploy scripts

build.sh: fetch FH data + build both sites.
deploy.sh: rsync dist/ to Plesk server.
Configurable via .env variables."
```

---

## Task 13: Final Verification & Cleanup

- [ ] **Step 1: Run all tests**

```bash
pnpm vitest run
```

Expected: all tests PASS.

- [ ] **Step 2: Build both sites**

```bash
pnpm run build
```

Expected: both sites build without errors.

- [ ] **Step 3: Preview Atlantis locally**

```bash
pnpm --filter @algarve-tourism/atlantis preview
```

Open `http://localhost:4321/en/` — verify homepage renders with header, hero, footer. Navigate to `/en/tours/`, `/en/about/`, `/en/contact/`, `/en/faq/`, `/en/reviews/`. Check language switcher navigates to `/pt/`, `/es/`, `/fr/` versions.

- [ ] **Step 4: Preview A&Y locally**

```bash
pnpm --filter @algarve-tourism/algarve-and-you preview
```

Open `http://localhost:4322/en/` — verify homepage renders. Check category nav on `/en/tours/`. Verify `/en/transfers/` page exists.

- [ ] **Step 5: Add .superpowers to .gitignore if not already present**

Verify `.superpowers/` is in `.gitignore`. It was added in Task 1.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: final verification — all tests pass, both sites build"
```
