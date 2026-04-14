# SEO Fixes — Design Spec
**Date:** 2026-04-14  
**Sites:** atlantistours.pt · algarveandyou.com  
**Approach:** Option B — fix all non-slug issues now; ship slug pipeline fix separately when FareHarbor EN translations are ready

---

## Background

An SEO audit identified critical and important issues across both sites. The most damaging are:
- Secondary pages (About, Contact, FAQ, Terms) have thin meta descriptions like `"Contact — Atlantis Tours"`
- Homepage meta descriptions work but are not keyword-optimized
- Atlantis homepage H1 is hardcoded in English (`"Discover the Algarve coastline"`) on ALL locales, mismatching the locale-aware `<title>` tag
- Tour URLs use Portuguese slugs on all locales (EN/ES/FR pages)
- Footer category links on both sites all point to the same `/tours/` page — A&Y has category pages but the footer doesn't link to them
- `/privacy/` is linked in the footer but returns 404
- Atlantis tour detail pages don't use `parseDescription` (unlike A&Y), getting worse meta descriptions

The slug issue requires FareHarbor EN product name translations to be entered first. Everything else can be fixed immediately.

---

## Phase 1 — Ship now (no FareHarbor dependency)

### 1. Meta descriptions

**Scope:** Both sites.

**Homepage:**
- The homepage description chain (`heroSubtitle || config.tagline`) works correctly — both sites have populated `description` fields in their `homepage.md` content files, so the fallback is never triggered.
- Current descriptions are functional but not keyword-optimized:
  - Atlantis EN: `"Handcrafted maritime experiences along Portugal's most stunning coastline"`
  - A&Y EN: `"Boats, food, day trips, transfers, and wellness — everything you need in one place"`
- Update these to be more search-forward, targeting high-intent keywords (e.g. "Benagil", "Portimão", "boat tours", "cave tours").
- Update `packages/atlantis/src/content/pages/en/homepage.md`, `pt/homepage.md`, and `packages/algarve-and-you/src/content/pages/en/homepage.md`, `pt/homepage.md`.

**Secondary pages (About, Contact, FAQ, Terms, Cancellation):**
- All currently generate thin descriptions via string concatenation: `` `${t(locale, "nav.contact")} — ${config.name}` `` → `"Contact — Atlantis Tours"`.
- The FAQ page additionally hardcodes `"FAQ"` instead of using the translation key, so even non-English locales get `"FAQ — Atlantis Tours"`.
- Fix: add `metaDescription.*` keys to each locale translation file (`en.json`, `pt.json`, `es.json`, `fr.json`) in `/packages/shared/src/i18n/locales/`.
- Update each page component to use `t(locale, "metaDescription.about")`, `t(locale, "metaDescription.contact")`, etc.

**Tour detail pages:**
- **A&Y** already uses `(parsed.description ?? item.description_text).slice(0, 160)` — this is correct.
- **Atlantis** uses only `item.description_text.slice(0, 160)` — it does NOT call `parseDescription`. This means Atlantis tour descriptions may start with boilerplate or HTML-artifact text instead of the clean parsed description.
- Fix: add `parseDescription` to the Atlantis tour detail page (`packages/atlantis/src/pages/[locale]/tours/[slug].astro`) to match A&Y's pattern.

### 2. Page titles & H1 (Atlantis homepage)

**Problem:** The H1 is hardcoded as `"Discover the Algarve coastline"` at line 86 of `packages/atlantis/src/pages/[locale]/index.astro`. This string is passed to the `HeroSection` component's `title` prop, which renders it as the `<h1>`. Three issues:
1. It does not use the `heroTitle` variable (derived from the content collection), so changing `homepage.md` has no effect on the H1.
2. It is always English — the Portuguese homepage shows an English H1 while the `<title>` tag correctly says `"Descubra a Costa Algarvia"`.
3. The hardcoded string (`"coastline"`) doesn't even match the content collection value (`"Coast"`).

**Fix:**
- Line 86: change `title="Discover the Algarve coastline"` to `title={heroTitle}`.
- Update `packages/atlantis/src/content/pages/en/homepage.md` title to a keyword-forward phrase: e.g. `"Benagil Caves Boat Tours & Yacht Cruises from Portimão"`.
- Update `packages/atlantis/src/content/pages/pt/homepage.md` title to the PT equivalent.
- The SEO component appends `| Atlantis Tours` to the title tag; the H1 renders the raw `heroTitle`. No structural changes needed.

### 3. Privacy page (both sites)

**Problem:** Footer links to `/privacy/` return 404 on both sites. Google Search Console confirms 2 not-found pages.

**Fix:** Create `packages/atlantis/src/pages/[locale]/privacy.astro` and `packages/algarve-and-you/src/pages/[locale]/privacy.astro`.

- Use the shared `PageLayout` / `Layout` pattern consistent with other static pages (e.g. `terms.astro`).
- Content: minimal GDPR-compliant privacy policy covering data collection (FareHarbor booking flow), cookies (Cloudflare analytics if any), contact email for data requests.
- Unique `<title>` and `<meta description>` per site via `metaDescription.privacy` translation key.
- All four locales render the same English content initially (add translations later).

### 4. Category pages & footer links

**Problem:** Footer links on both sites point every category label to the same `/tours/` URL. A&Y has working category pages at `[locale]/tours/[category]/index.astro` but the footer doesn't link to them. Atlantis has no category pages at all.

**Current state:**
- **A&Y config** has `categories: ["boats", "gastronomy", "land-tours", "transfers", "spa"]` and working `[category]/index.astro` pages.
- **Atlantis config** has `categories: ["boats"]` — only one category. However, the FareHarbor data for Atlantis contains items across all 5 categories (boats: 44, transfers: 24, land-tours: 14, gastronomy: 5, spa: 4).
- **Atlantis footer** uses marketing labels ("Cave Circuits", "Yacht Cruises", "Fishing Trips", "Private Charters") that don't map to any FareHarbor category — they are sub-types within "boats".
- **A&Y footer** uses the actual category translation keys (`category.boats` → "Boat Tours", `category.gastronomy` → "Gastronomy", etc.) but all still link to `/tours/`.

**Fix — A&Y (footer links only):**
- Update `Footer.astro` A&Y links to point to `/tours/boats/`, `/tours/gastronomy/`, `/tours/land-tours/`, `/tours/transfers/`, `/tours/spa/` respectively.

**Fix — Atlantis:**
- Keep `categories: ["boats"]` — all 10 products allowed by `itemPks` are boats. The other FareHarbor categories (gastronomy, land-tours, transfers, spa) are only shown on A&Y.
- Create `packages/atlantis/src/pages/[locale]/tours/[category]/index.astro` modelled on A&Y's existing `[category]/index.astro`. Only one category page (`/tours/boats/`) is generated.
- Replace the 4 marketing footer labels (Cave Circuits, Yacht Cruises, Fishing Trips, Private Charters) with a single "Boat Tours" link pointing to `/tours/boats/`.

### 5. Structured data gaps

- Add `buildItemList()` helper to `packages/shared/src/seo/structured-data.ts`.
- Add `ItemList` schema to the tours index page (`/[locale]/tours/`) and each category page for both sites.
- Verify tour detail page `Product + TouristTrip` schema produces correct `price` (divide-by-100 assumption needs confirming against live FareHarbor prices).

### 6. Sitemap cleanup

- Exclude the root `/` redirect page from the sitemap. Use the `@astrojs/sitemap` `filter` option in `astro.config.mjs` for both sites.
- Atlantis: `filter: (page) => page !== 'https://www.atlantistours.pt/'`
- A&Y: `filter: (page) => page !== 'https://www.algarveandyou.com/'`

---

## Phase 2 — Ship when FareHarbor EN translations are ready

### Slug pipeline fix

**Problem:** `fetch-fh.ts` builds a `canonicalMap` from PT data (slug + category) and applies the canonical PT slug to all other languages via `normalizeItem(item, canonical)` (line 50). The `normalizeItem` function uses `overrides?.slug ?? slugify(item.name)` (line 62 of `fareharbor.ts`), so the PT slug always wins when provided. This means EN/ES/FR slugs are always Portuguese, even after FareHarbor translations are added.

**Fix — `fetch-fh.ts`:**
- Split the canonical override: pass only `{ category }` (not `{ slug, category }`) from `canonicalMap` to `normalizeItem()` for non-PT languages.
- Each language derives its own slug from its own FareHarbor product name via the existing `slugify()` function.
- PT remains the canonical source for category assignment only.

**Fix — redirect generation:**
- After fetching all languages, compare new slugs against the previously written JSON files.
- Emit a `packages/shared/data/slug-redirects.json` with entries: `{ locale, oldSlug, newSlug }` for every slug that changed.
- The Astro build step for each site reads `slug-redirects.json` and appends redirect rules to `public/_redirects` at build time (e.g. via a custom integration or a pre-build script).

**Result:** Running `fetch-fh` after FareHarbor translations are entered automatically produces the redirect map. The next deploy ships new EN slugs + 301s from old PT slugs. No manual work required.

---

## Out of scope

- ES and FR content gap (FareHarbor only fetched in EN+PT) — separate initiative, requires translation strategy decision.
- Blog / editorial content — separate initiative.
- Real TripAdvisor review feed integration — separate initiative.
- `lastmod` dates in sitemap — low priority, defer.
- Per-tour review schema on detail pages — defer.

---

## Files likely to change

| File | Change |
|------|--------|
| `packages/atlantis/src/content/pages/en/homepage.md` | Keyword-forward title + description |
| `packages/atlantis/src/content/pages/pt/homepage.md` | Keyword-forward title + description |
| `packages/algarve-and-you/src/content/pages/en/homepage.md` | Keyword-forward description |
| `packages/algarve-and-you/src/content/pages/pt/homepage.md` | Keyword-forward description |
| `packages/atlantis/src/pages/[locale]/index.astro` | Line 86: replace hardcoded H1 with `{heroTitle}` |
| `packages/atlantis/src/pages/[locale]/tours/[slug].astro` | Add `parseDescription` call (match A&Y pattern) |
| `packages/atlantis/src/pages/[locale]/privacy.astro` | New file |
| `packages/atlantis/src/pages/[locale]/tours/[category]/index.astro` | New file (category pages) |
| `packages/atlantis/src/config.ts` | Expand categories to all 5 |
| `packages/algarve-and-you/src/pages/[locale]/privacy.astro` | New file |
| `packages/shared/src/components/Footer.astro` | Point category links to `/tours/[category]/` |
| `packages/shared/src/i18n/locales/en.json` | Add `metaDescription.*` keys |
| `packages/shared/src/i18n/locales/pt.json` | Add `metaDescription.*` keys |
| `packages/shared/src/i18n/locales/es.json` | Add `metaDescription.*` keys |
| `packages/shared/src/i18n/locales/fr.json` | Add `metaDescription.*` keys |
| `packages/shared/src/seo/structured-data.ts` | Add `buildItemList()` |
| `packages/atlantis/astro.config.mjs` | Sitemap filter |
| `packages/algarve-and-you/astro.config.mjs` | Sitemap filter |
| `scripts/fetch-fh.ts` | Phase 2: slug derivation fix + redirect generation |
