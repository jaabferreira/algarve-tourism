# Tourism Websites Rebuild — Design Spec

Two tourism websites (atlantistours.pt, algarveandyou.com) rebuilt from scratch as a shared Astro monorepo, migrating from Bokun to FareHarbor.

## 1. Business Context

**Atlantis Tours** (atlantistours.pt) — Dedicated boat tour brand. Sells cave circuits, yacht cruises, fishing trips, and private charters along the Algarve coast.

**Algarve & You** (algarveandyou.com) — Full experiences marketplace. Sells everything: boat tours, gastronomy, land tours/day trips, airport transfers, and spa/wellness. Boat tours overlap with Atlantis — both sites can sell them.

Both sites are owned by the same company, share a codebase, and migrate from Bokun to FareHarbor for booking/product management.

## 2. Architecture

### Approach: Static Astro Monorepo

Astro generates static HTML at build time. Product data is fetched from the FareHarbor API during the build. The only client-side interactivity is the FareHarbor booking widget and minor UI elements (mobile nav, WhatsApp button).

Why Astro over Next.js/Nuxt:
- Tourism sites are content-driven with minimal interactivity
- Static output = fastest possible page loads (critical for mobile tourists)
- No Node.js process to manage on Plesk
- FareHarbor's own widget handles all booking interactivity client-side

### Repository Structure

```
algarve-tourism/
├── packages/
│   ├── shared/                  # Shared design system & components
│   │   ├── components/          # Astro components
│   │   ├── styles/              # CSS design tokens, base styles
│   │   ├── layouts/             # Page layouts
│   │   ├── i18n/                # Translation system + UI string translations
│   │   ├── lib/                 # FareHarbor API client, utilities
│   │   └── data/                # Fetched FH data (JSON, gitignored)
│   │
│   ├── atlantis/                # Atlantis Tours site
│   │   ├── src/
│   │   │   ├── pages/           # Astro pages (routes)
│   │   │   ├── content/         # Blog posts, manual reviews, about/homepage copy
│   │   │   └── config.ts        # Brand config
│   │   ├── public/              # Logo, favicon, fonts
│   │   └── astro.config.mjs
│   │
│   └── algarve-and-you/         # Algarve & You site
│       ├── src/
│       │   ├── pages/
│       │   ├── content/
│       │   └── config.ts
│       ├── public/
│       └── astro.config.mjs
│
├── scripts/
│   ├── fetch-fh.ts              # Fetch data from FareHarbor API
│   ├── build.sh                 # Build both sites
│   └── deploy.sh                # Deploy to Plesk via rsync
├── package.json                 # pnpm workspaces root
└── turbo.json                   # Turborepo config
```

### Tooling

- **pnpm workspaces** for monorepo package management
- **Turborepo** for parallel builds and task orchestration
- **TypeScript** throughout

## 3. Brand & Visual Design

### Direction: Neo-Coastal

Unified palette for both brands. Sites are distinguished by logo, content, and product catalog — not by color.

| Token            | Value              | Usage                        |
|------------------|--------------------|------------------------------|
| `--bg-primary`   | `#0A2540`          | Page backgrounds, hero areas |
| `--accent`       | `#00D2BE`          | CTAs, highlights, links      |
| `--text-primary` | `#FFFFFF`          | Headings, primary text       |
| `--text-muted`   | `rgba(255,255,255,0.35)` | Body text, descriptions |
| `--surface`      | `rgba(0,210,190,0.06)` | Chips, cards, subtle fills |
| `--border`       | `rgba(0,210,190,0.1)` | Chip borders, dividers    |

### Typography

- **Headings:** Manrope 800 (bold, uppercase for logos/nav, mixed case for content)
- **Body:** Manrope 300–400
- **Monospace/accents:** Manrope 600 with letter-spacing for labels and tags

### Design Characteristics

- Dark backgrounds with vibrant teal accents
- Geometric decorative elements (circles, subtle borders)
- Chip-based category navigation
- Clean, spacious layouts
- Photography-forward product cards

### Brand Config Shape

```typescript
interface BrandConfig {
  name: string;
  domain: string;
  tagline: string;
  fh: {
    shortname: string;
    appKey: string;
    userKey: string;
    categories: string[];
  };
  theme: {
    primary: string;
    accent: string;
    // ... full token set
  };
  logo: string;
  social: {
    instagram: string;
    facebook: string;
    whatsapp: string;
    youtube?: string;
  };
  analytics: { gtag: string };
  defaultLocale: string;
  locales: string[];
}
```

Components read this config — no `if (brand === "atlantis")` conditionals. Everything adapts via config and CSS variables.

## 4. FareHarbor Integration

### API Details

- **Base URL:** `https://fareharbor.com/api/external/v1/`
- **Auth:** Two headers — `X-FareHarbor-API-App` (app key) + `X-FareHarbor-API-User` (user key)
- **Key endpoint:** `GET /companies/{shortname}/items/` — returns all products with descriptions, images (CDN URLs), locations, pricing (customer prototypes), cancellation policies

### Data Flow

```
FareHarbor API ──► fetch-fh.ts ──► shared/data/{shortname}/items.json
                   (build time)          │
                                         ▼
                                   Astro Build ──► Static HTML
```

1. `fetch-fh.ts` calls FH API for each brand's shortname
2. Normalizes response into typed JSON files
3. Astro reads JSON at build time, generates product pages and listings
4. FareHarbor lightbox widget loads client-side on product pages for live booking

### What Comes from FareHarbor

| Data               | FH Field                     | Usage                       |
|--------------------|------------------------------|-----------------------------|
| Tour name          | `name`                       | Page title, card title      |
| Description        | `description_safe_html`      | Product page body           |
| Bullet points      | `description_bullets`        | Product page highlights     |
| Images             | `images[].image_cdn_url`     | Gallery, cards, hero        |
| Primary image      | `image_cdn_url`              | Card thumbnail, OG image    |
| Pricing            | `customer_prototypes[].total`| "From" price display        |
| Location           | `locations[]`                | Map, address display        |
| Cancellation       | `cancellation_policy_safe_html` | Policy page, product page |

### What Does NOT Come from FareHarbor

- **Reviews** — sourced from Google Places API + manual curation
- **Blog content** — markdown files in the repo
- **Homepage/about copy** — brand-specific markdown content
- **Translated descriptions in ES/FR** — not yet available in FH. Fallback to EN.

### Booking Integration

FareHarbor's client-side lightbox widget. "Book Now" button on each product page triggers the FH lightbox with the item ID. FH handles availability, checkout, and payment entirely.

## 5. Internationalization (i18n)

### Supported Locales

PT, EN, ES, FR — all four on both sites.

### Content Sources by Locale

| Content Type       | EN/PT Source      | ES/FR Source (now)  | ES/FR Source (future) |
|--------------------|-------------------|---------------------|-----------------------|
| Product data       | FareHarbor API    | Fallback to EN      | FareHarbor API        |
| UI strings         | Local JSON files  | Local JSON files    | Local JSON files      |
| Blog posts         | Markdown files    | Markdown files      | Markdown files        |
| Homepage/about     | Markdown files    | Markdown files      | Markdown files        |

### Locale Detection & Routing

- Root `/` redirects to `/{locale}/` based on `Accept-Language` header (via a small client-side script since output is static), defaulting to EN
- Every page has `<link rel="alternate" hreflang="x">` tags
- Language switcher in nav changes locale prefix, preserves current page path

### Fallback Chain

Requested locale → EN → first available. Applied both to FH product data and UI strings.

## 6. Pages & Routing

### Routes (per locale)

```
/{locale}/                              → Homepage
/{locale}/tours/                        → All products listing
/{locale}/tours/{category}/             → Category listing (A&Y only)
/{locale}/tours/{slug}/                 → Product detail page
/{locale}/about/                        → About us
/{locale}/contact/                      → Contact page
/{locale}/blog/                         → Blog listing
/{locale}/blog/{slug}/                  → Blog post
/{locale}/faq/                          → FAQ
/{locale}/reviews/                      → Reviews/testimonials
/{locale}/terms/                        → Terms & conditions
/{locale}/cancellation-policy/          → Cancellation policy
```

**Atlantis-specific:** No `{category}` level — all products are boats. `/tours/` is the single listing page.

**A&Y-specific:** Full category structure (boats, gastronomy, land-tours, transfers, spa). Also adds:
```
/{locale}/transfers/                    → Transfer booking page
```

**Product slugs:** Generated from FH item name, translated per locale when translations are available (e.g. `/en/tours/benagil-cave-tour/` → `/pt/tours/passeio-grutas-benagil/`).

### Page Descriptions

**Homepage:** Hero section with headline + CTA, featured products grid (pull top items from FH data), trust signals (stats, review highlights), category quick-links (A&Y only).

**Product listing:** Filterable grid of ProductCards. A&Y has chip-based category filter bar. Sorted by FH item order.

**Product detail:** Hero image/gallery, title, "from" price, duration, description from FH, bullet highlights, location with map, cancellation policy, FareHarbor booking widget (lightbox), related products.

**Blog:** Grid of BlogCards. Each post is a markdown file with frontmatter for metadata.

**Reviews:** Grid of ReviewCards from Google Places + manual reviews. Filterable by rating.

**Contact:** Contact form (name, email, message), WhatsApp link, address, embedded map.

**FAQ:** Accordion-style expandable Q&A. Content in markdown.

## 7. Shared Components

### Layout

| Component          | Description                                              |
|--------------------|----------------------------------------------------------|
| `Header`           | Logo, nav links, language switcher, "Book Now" CTA, mobile hamburger |
| `Footer`           | Site links, social icons, contact info, legal links      |
| `PageLayout`       | Wraps pages with Header + Footer + SEO meta              |

### Product

| Component          | Description                                              |
|--------------------|----------------------------------------------------------|
| `ProductCard`      | Image, title, "from" price, duration badge, category chip |
| `ProductGrid`      | Responsive grid of ProductCards with optional category filter |
| `ProductHero`      | Large gallery, title, price, duration, location          |
| `BookingWidget`    | FareHarbor lightbox wrapper, takes item ID               |
| `PriceDisplay`     | Formatted price with currency, "from" prefix             |

### Content

| Component          | Description                                              |
|--------------------|----------------------------------------------------------|
| `HeroSection`      | Full-width hero with headline, subtitle, CTA             |
| `CategoryNav`      | Chip-based category filter bar (A&Y only)                |
| `ReviewCard`       | Review display: source, rating, text, author             |
| `ReviewsGrid`      | Collection of ReviewCards                                |
| `FAQ`              | Accordion expandable questions                           |
| `ContactForm`      | Name, email, message fields                              |
| `BlogCard`         | Post preview: image, title, excerpt, date                |

### Utility

| Component          | Description                                              |
|--------------------|----------------------------------------------------------|
| `Image`            | Optimized image with lazy loading (Astro image)          |
| `LanguageSwitcher` | Locale dropdown/pills in nav                             |
| `WhatsAppButton`   | Floating WhatsApp CTA                                    |
| `SEO`              | Meta tags, Open Graph, structured data (Product + TouristTrip schema) |

## 8. Blog & Reviews

### Blog

- Markdown files in `packages/{site}/src/content/blog/`
- Astro content collections for typing and validation
- Frontmatter: title, date, author, category, image, locale, slug
- Each site has its own blog posts; blog components are shared
- Used primarily for SEO content

### Reviews

Two sources:
1. **Google Places API** — fetched at build time alongside FH data. Real reviews with ratings.
2. **Manual reviews** — JSON file per site for curated testimonials

Display:
- Reviews page shows all reviews
- Homepage shows rotating top-rated selection
- Product pages can show relevant reviews (keyword matching or manual tagging)

### Why Not a CMS

At current content volume (handful of blog posts, curated reviews), markdown in the repo is simpler: no extra service, no cost, version controlled. If content volume grows, Decap CMS (works with markdown/git) is a straightforward add-on.

## 9. Build & Deployment

### Build Pipeline

```bash
pnpm run fetch-data       # Fetch FH API → shared/data/*.json
pnpm run build            # Turborepo builds both sites in parallel
                          # → packages/atlantis/dist/
                          # → packages/algarve-and-you/dist/
pnpm run deploy           # rsync dist/ to Plesk server
```

### Plesk Setup

- Two domains, each pointing to its own directory on the server
- `atlantistours.pt` → serves `atlantis/dist/`
- `algarveandyou.com` → serves `algarve-and-you/dist/`
- Apache or Nginx serves static files directly — no Node.js process
- SSL via Let's Encrypt (managed by Plesk)

### Automated Rebuilds

- Cron job runs `fetch-data && build && deploy` every 6 hours
- Keeps product data fresh without manual intervention
- Manual trigger available anytime for immediate updates (blog posts, content changes)

### Local Development

```bash
pnpm run dev:atlantis     # → localhost:4321
pnpm run dev:ay           # → localhost:4322
```

Both sites run simultaneously with hot reload. Shared component changes update both.

## 10. SEO & Performance

### SEO

- Static HTML output — fully crawlable, no JS required for content
- `<link rel="alternate" hreflang="x">` on every page for multi-language
- Structured data: schema.org `Product` + `TouristTrip` on product pages (name, description, price, location, images)
- Open Graph + Twitter Card meta on all pages
- Semantic HTML throughout
- Sitemap generated by Astro's sitemap integration
- Robots.txt per site

### Performance

- Zero JavaScript shipped by default (Astro islands architecture)
- JS only for: FH booking widget, mobile nav toggle, WhatsApp button, locale detection
- Astro built-in image optimization (WebP/AVIF, responsive srcset)
- Static files served from Plesk with proper cache headers
- Target: Lighthouse 95+ on all core pages

## 11. Analytics & Tracking

- Google Analytics (GA4) via gtag — configured per brand in brand config
- Google Tag Manager if needed for additional tracking
- FareHarbor handles booking conversion tracking on their side
