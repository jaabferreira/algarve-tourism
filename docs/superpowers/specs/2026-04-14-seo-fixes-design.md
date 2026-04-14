# SEO Fixes — Design Spec
**Date:** 2026-04-14  
**Sites:** atlantistours.pt · algarveandyou.com  
**Approach:** Option B — fix all non-slug issues now; ship slug pipeline fix separately when FareHarbor EN translations are ready

---

## Background

An SEO audit identified critical and important issues across both sites. The most damaging are:
- Every page shares the same or near-identical meta description
- Atlantis homepage H1 is hardcoded, keyword-light, and mismatches the `<title>`
- Tour URLs use Portuguese slugs on all locales (EN/ES/FR pages)
- Footer category links on Atlantis all point to the same `/tours/` page
- `/privacy/` is linked in the footer but returns 404

The slug issue requires FareHarbor EN product name translations to be entered first. Everything else can be fixed immediately.

---

## Phase 1 — Ship now (no FareHarbor dependency)

### 1. Meta descriptions

**Scope:** Both sites.

**Homepage:**
- Update `packages/atlantis/src/content/pages/en/homepage.md` and `pt/homepage.md` with a proper `description` field containing a real, keyword-targeted sentence (not the tagline fallback).
- Same for `packages/algarve-and-you/src/content/pages/en/homepage.md` and `pt/homepage.md`.
- Verify the description is correctly read and passed through the `heroSubtitle || config.tagline` chain in each site's `[locale]/index.astro`.

**Secondary pages (About, Contact, FAQ, Terms, Cancellation):**
- Add a `metaDescription` key to each locale translation file (`en.json`, `pt.json`, `es.json`, `fr.json`) in `/packages/shared/src/i18n/locales/` for every static page that currently generates a thin description.
- Update the relevant page components to use `t("metaDescription.about")`, `t("metaDescription.contact")`, etc. instead of the current `"{pageName} — {siteName}"` pattern.

**Tour detail pages:**
- Audit the description fallback chain in `[locale]/tours/[slug].astro` for both sites. Ensure `parsed.description` (the structured FareHarbor description) produces a non-empty, unique 160-char description and that the fallback to `item.description_text` also works.

### 2. Page titles & H1 (Atlantis homepage)

**Problem:** The H1 is hardcoded as `"Discover the Algarve coastline"` in `packages/atlantis/src/pages/[locale]/index.astro` (does not use the content collection, not locale-aware, mismatches `<title>`).

**Fix:**
- Remove the hardcoded H1 string. Replace with the `heroTitle` variable already derived from the content collection.
- Update `packages/atlantis/src/content/pages/en/homepage.md` title to a keyword-forward phrase: `"Benagil Caves Boat Tours & Yacht Cruises from Portimão"`.
- Update `packages/atlantis/src/content/pages/pt/homepage.md` title to the PT equivalent.
- The SEO component appends `| Atlantis Tours` to the title tag; the H1 renders the raw `heroTitle`. No structural changes needed.

### 3. Privacy page (both sites)

**Problem:** Footer links to `/privacy/` return 404 on both sites.

**Fix:** Create `packages/atlantis/src/pages/[locale]/privacy.astro` and `packages/algarve-and-you/src/pages/[locale]/privacy.astro`.

- Use the shared `PageLayout` / `Layout` pattern consistent with other static pages.
- Content: minimal GDPR-compliant privacy policy covering data collection (FareHarbor booking flow), cookies (Cloudflare analytics if any), contact email for data requests.
- Unique `<title>` and `<meta description>` per site.
- All four locales render the same English content initially (add translations later).

### 4. Category pages

**Problem:** Footer links on both sites point every category label to the same `/tours/` URL. No category-level ranking surface exists on Atlantis; A&Y has the pages but footer links don't use them.

**Atlantis actual FareHarbor categories** (from live data):
| Category value | Count | Page URL |
|----------------|-------|----------|
| `boats` | 44 | `/[locale]/tours/boats/` |
| `transfers` | 24 | `/[locale]/tours/transfers/` |
| `land-tours` | 14 | `/[locale]/tours/land-tours/` |
| `gastronomy` | 5 | `/[locale]/tours/gastronomy/` |
| `spa` | 4 | `/[locale]/tours/spa/` |

**Algarve & You:** Category pages already exist at `packages/algarve-and-you/src/pages/[locale]/tours/[category]/index.astro`. Footer links just need to be updated to use the correct category URLs.

**Atlantis fix:** Create `packages/atlantis/src/pages/[locale]/tours/[category]/index.astro` modelled on the existing A&Y `[category]/index.astro`. Each page:
- Has its own keyword-targeted `<title>`, `<meta description>`, and `<h1>`.
- Lists and links to tours filtered by the `category` field from FareHarbor data.
- Includes an `ItemList` JSON-LD structured data block.
- Uses the shared `PageLayout` component.
- Gets its own entry in the sitemap automatically.

**Footer update (both sites):** Update `Footer.astro` so category links point to `/tours/[category]/` using the actual category slugs above. The marketing labels (Cave Circuits, Yacht Cruises, etc.) in the Atlantis footer translation keys should be updated to match the real categories (`footer.cave_circuits` → Boat Tours, etc.) or the existing translation keys re-pointed to real URLs.

### 5. Structured data gaps

- Add `ItemList` schema to the tours index page (`/[locale]/tours/`) for both sites.
- Verify tour detail page `Product + TouristTrip` schema produces correct `price` (divide-by-100 assumption needs confirming against live FareHarbor prices).

### 6. Sitemap cleanup

- Exclude the root `/` redirect page from the sitemap. Use the `@astrojs/sitemap` `filter` option in `astro.config.mjs` for both sites: `filter: (page) => page !== 'https://www.atlantistours.pt/'`.

---

## Phase 2 — Ship when FareHarbor EN translations are ready

### Slug pipeline fix

**Problem:** `fetch-fh.ts` builds a `canonicalMap` from PT data (slug + category) and applies the canonical PT slug to all other languages via `normalizeItem(item, canonical)`. This means EN/ES/FR slugs are always Portuguese, even after FareHarbor translations are added.

**Fix — `fetch-fh.ts`:**
- Split the canonical override: pass only the `category` (not the `slug`) from `canonicalMap` to `normalizeItem()` for non-PT languages.
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
| `packages/atlantis/src/content/pages/en/homepage.md` | New title + description |
| `packages/atlantis/src/content/pages/pt/homepage.md` | New title + description |
| `packages/atlantis/src/pages/[locale]/index.astro` | Remove hardcoded H1 |
| `packages/atlantis/src/pages/[locale]/privacy.astro` | New file |
| `packages/atlantis/src/pages/[locale]/tours/[category].astro` | New file (category pages) |
| `packages/algarve-and-you/src/content/pages/en/homepage.md` | Description fix |
| `packages/algarve-and-you/src/pages/[locale]/privacy.astro` | New file |
| `packages/shared/src/i18n/locales/en.json` | Add `metaDescription.*` keys |
| `packages/shared/src/i18n/locales/pt.json` | Add `metaDescription.*` keys |
| `packages/shared/src/i18n/locales/es.json` | Add `metaDescription.*` keys |
| `packages/shared/src/i18n/locales/fr.json` | Add `metaDescription.*` keys |
| `packages/shared/src/seo/structured-data.ts` | Add `buildItemList()` |
| `packages/atlantis/astro.config.mjs` | Sitemap filter |
| `packages/algarve-and-you/astro.config.mjs` | Sitemap filter |
| `scripts/fetch-fh.ts` | Phase 2: slug derivation fix + redirect generation |
