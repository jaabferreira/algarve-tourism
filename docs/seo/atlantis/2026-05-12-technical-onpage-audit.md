# Atlantis Tours — Technical + On-Page SEO Audit

- **Date:** 2026-05-12
- **Scope:** `https://www.atlantistours.pt` (Astro static site on Cloudflare Pages, monorepo `packages/atlantis` + `packages/shared`). 186 URLs in sitemap (~46 per locale × en/es/fr/pt).
- **Method:** Live crawl of `robots.txt`, sitemap, headers, and rendered HTML for the homepage, all 4 tour pages, tours/blog index pages, blog post, FAQ, reviews, and taxonomy pages; plus source review of `packages/shared/src/components/SEO.astro`, `packages/shared/src/seo/structured-data.ts`, `packages/atlantis/src/pages/[locale]/tours/[slug].astro`, `packages/atlantis/src/pages/[locale]/index.astro`, `packages/atlantis/src/layouts/Layout.astro`, `astro.config.mjs`.
- **Skills applied:** `seo-technical` (6-layer framework), `seo-onpage` (8-dimension framework). Both now installed at `.claude/skills/`.
- **Not covered (needs GSC / API key):** real Core Web Vitals field data, indexation coverage, current keyword rankings. Recommend running `seo-traffic-diagnosis` + `seo-keyword` next once Search Console export is available.

---

## Executive summary

The site is in **good technical shape overall** — server-rendered HTML, valid sitemap, self-referencing canonicals, hreflang present on every page, rich `Product`/`TouristTrip` + `Review` + `BreadcrumbList` + `FAQPage` schema, alt text and lazy-loading on images, proper 404s. This is a solid base.

The findings that actually move the needle:

1. **🔴 Broken hreflang between EN/ES/FR and PT on every tour page.** PT tour slugs are localized (`circuito-de-grutas-ate-benagil`) but the EN/ES/FR pages declare `hreflang="pt"` pointing to the *English* slug under `/pt/` — which 404s. Google discards the whole language cluster for these pages. Hurts the exact UK/IE/DE/NL/FR/ES + PT audience the Google Ads campaigns also target.
2. **🔴 Tour-page meta descriptions are machine-truncated body fragments cut mid-word** ("…ready to explore the w"). Same fragment is reused in the OG tags, Twitter tags, *and* the `Product` schema `description`. Every tour page — the primary money pages and the likely ad landing pages — has a broken-looking SERP snippet. Pure CTR loss.
3. **🟠 No HSTS header.** `Strict-Transport-Security` is absent on all responses. Easy Cloudflare fix; part of the page-experience/security baseline.
4. **🟠 No `/llms.txt`** and weak homepage entity schema (no `aggregateRating`, `openingHours`, `image`, `priceRange`, no `WebSite` node). AEO/GEO + rich-result gaps.
5. **🟡 Thin taxonomy pages indexed and in the sitemap** — ~72 tag/category pages across 4 locales with ~1 sentence of unique text each. Crawl dilution + thin-content risk.
6. **🟡 Two listing pages competing** — `/tours/` ("Tours") and `/tours/boats/` ("Boat Tours") have near-identical schema, meta and intent. Potential cannibalization.
7. **🟡 Duplicate-accessible tour URLs** — e.g. `/en/tours/circuito-de-grutas-ate-benagil/` and `/en/tours/pesca-de-fundo/` render the English tour page. Canonicals point home correctly and they're out of the sitemap, so low risk — but they shouldn't be generated, and they're what the broken PT→EN hreflang points at.
8. **🟡 Apex domain double redirect** — `atlantistours.pt` → `www.atlantistours.pt` → `www.atlantistours.pt/en/` (two hops).

---

## Part 1 — Technical SEO (6-layer scorecard)

| Layer | Score | Notes |
|---|---|---|
| 1. Crawlability | **Pass** | `robots.txt` is clean (`Allow: /`, `Disallow: /*/partners/`, sitemap referenced). Sitemap at `/sitemap-index.xml` → `/sitemap-0.xml`, 200, 186 canonical URLs. CSS/JS not blocked. No infinite spaces. |
| 2. Indexability | **Needs work** | Self-referencing canonicals everywhere ✓. But: broken hreflang clusters (see 2.1); thin tag/category pages indexable + in sitemap (2.2); duplicate-accessible localized-slug tour URLs (2.3, mitigated by canonical). |
| 3. Rendering | **Pass** | Astro static output — full HTML/content/schema present server-side, no JS dependency for crawlers. `103 Early Hints` + `preload` for hero image/fonts ✓. |
| 4. Site architecture | **Needs work** | Shallow, logical hierarchy; breadcrumbs with `BreadcrumbList` schema ✓. But internally-reachable URLs that 404 via broken hreflang (4.1); two overlapping listing pages (4.2); apex double-redirect (4.3). |
| 5. Structured data | **Mostly pass** | Strong: `Product`+`TouristTrip` w/ `Offer`, `AggregateRating`, `Review`, `BreadcrumbList`, `VideoObject` on tour pages; `BlogPosting` on posts; `FAQPage` on /faq/; `ItemList` on listings; `LocalBusiness`+`TourOperator` on home. Gaps: `Product.description` = the truncated fragment (5.1); `Offer` missing `url`/`priceValidUntil` (5.2); homepage entity missing `aggregateRating`/`openingHoursSpecification`/`image`/`logo`/`priceRange` and no `WebSite` node (5.3); `WebSite` schema appears on collection/tag pages instead of the homepage (5.4); `FAQPage` schema also emitted on `/reviews/` — verify it matches an actual on-page FAQ section or remove (5.5). No `/llms.txt` (5.6). |
| 6. Page experience & security | **Needs work** | HTTPS everywhere, HTTP→HTTPS 301 ✓, `x-content-type-options: nosniff` + `referrer-policy` ✓, real 404s (not soft) ✓, responsive/mobile ✓. **Missing `Strict-Transport-Security` (HSTS)** (6.1). No `Content-Security-Policy` (6.2, lower priority). Core Web Vitals not measured here — verify in GSC (6.3). |

### Critical issues

**2.1 / 4.1 — Broken hreflang on tour pages (EN/ES/FR ↔ PT).**
`packages/shared/src/components/SEO.astro` builds hreflang from `getAlternateLocales(config, locale, path)`, which just re-prefixes the *same path* for each locale. PT tour slugs are localized, so:
- `https://www.atlantistours.pt/en/tours/benagil-caves-speed-boat-tour/` declares `hreflang="pt" href=".../pt/tours/benagil-caves-speed-boat-tour/"` → **404** (real PT URL is `/pt/tours/circuito-de-grutas-ate-benagil/`).
- Confirmed 404s: `/pt/tours/benagil-caves-speed-boat-tour/`, `/pt/tours/private-yacht-cruise-to-the-benagil-caves/`. Same pattern applies to all 4 tours (PT localizes the slug, ES/FR keep the EN slug).
- Reciprocally, `/pt/tours/circuito-de-grutas-ate-benagil/` declares `hreflang="en" href=".../en/tours/circuito-de-grutas-ate-benagil/"` — which resolves but is the canonicalized-away duplicate, not the canonical EN URL.

Net effect: Google sees an inconsistent return-tag set and ignores the cluster for these pages. The fix already exists in code — `tours/[slug].astro` correctly computes `localePaths` (matching each locale's `item.slug` by `item.pk`) — but only passes it to `<Header>`. Pass it through to `<Layout>` → `SEO.astro` as `alternateUrls`, which `SEO.astro` already accepts:

```astro
<Layout
  title={item.name}
  description={...}
  ...
  alternateUrls={(config.locales as Locale[]).map((loc) => ({ locale: loc, href: `https://www.${config.domain}${localePaths[loc]}` }))}
>
```

Then audit every other localized-slug page type (blog posts have localized slugs too — verify their hreflang the same way).

**5.1 — Tour meta descriptions / OG / schema description are mid-word truncations.**
`packages/atlantis/src/pages/[locale]/tours/[slug].astro`:
```js
description: parsed.description?.slice(0, 160) ?? item.description_text,   // → Product schema
...
<Layout description={(parsed.description ?? item.description_text).slice(0, 160)} ... />  // → <meta>, OG, Twitter
```
`.slice(0, 160)` cuts mid-word with no ellipsis. **Fix:** add a small per-tour SEO overrides map (same pattern as `lib/videos.ts` / `lib/trust-items.ts`) with hand-written `seoTitle?` + `seoDescription?` for the 4 tours; fall back to a word-boundary-safe truncation helper (`truncateAtWord(text, 155) + '…'`) for anything without an override. Use that single value for `<meta>`, OG, Twitter, *and* the `Product.description`. Hand-writing 4 descriptions is ~30 min and directly lifts SERP/Ads-landing-page CTR. Drafts below.

### Important issues

**2.2 — Thin taxonomy pages indexed + in sitemap.** `/{locale}/blog/tag/*` (13 tags) and `/{locale}/blog/category/*` (5 categories) × 4 locales ≈ 72 URLs, each ~1 sentence of unique copy ("Posts tagged X — Atlantis Tours") above an auto list. They're self-canonical and in the sitemap. Recommend: `noindex,follow` on **tag** pages and drop them from the sitemap (`SEO.astro` already supports `noindex`; add a sitemap `filter` for `/blog/tag/`). Keep **category** pages indexable only if you give each a unique 2–3 sentence intro; otherwise `noindex` those too. `/blog/page/2/` self-canonicals correctly — fine to leave, or `noindex,follow` per common practice.

**4.2 — `/tours/` vs `/tours/boats/` overlap.** Both are `ItemList` listing pages with near-identical meta/H1/intent ("Tours" / "Browse all Atlantis Tours experiences" vs "Boat Tours" / "Explore our Algarve boat tours"). Decide the role of each: either (a) make `/tours/boats/` a genuine sub-category with distinct copy + a subset of products and link it from `/tours/`, or (b) `301` `/tours/boats/` → `/tours/` (or canonical it there). Run `seo-content-audit` to confirm there isn't a third overlap with the homepage's tour sections. (`seo-content-audit` skill is in Tier 2 — install when you tackle this.)

**5.2 — `Offer` schema incomplete.** Add `url` (the tour page URL) and `priceValidUntil` to each tour's `offers`; Google Merchant/product rich-result validation warns without them. Optional but cheap: `priceSpecification` with `valueAddedTaxIncluded: true`.

**5.3 / 5.4 — Homepage entity schema is thin and `WebSite` is on the wrong pages.** In `buildLocalBusiness` (and `buildCollectionPage`):
- Move/add a `WebSite` node to the homepage (with `url`, `name`, `inLanguage`; skip `SearchAction` since there's no site search). Remove the `WebSite` `isPartOf` from `buildCollectionPage` or keep it (harmless) but ensure the homepage has the canonical one.
- Enrich `LocalBusiness`/`TourOperator`: `image`/`logo`, `priceRange` (e.g. `"€€"`), `openingHoursSpecification` (08:00–20:00 Mon–Sun — matches the Google Ads call-extension hours in `GoogleAds/atlantis/`), `areaServed` (Algarve/Portimão/Lagoa/Carvoeiro/Lagos/Albufeira), and a company-level `aggregateRating` from the manual reviews (you already compute one — `buildAggregateRating`).

**6.1 — Add HSTS.** Cloudflare → SSL/TLS → Edge Certificates → Enable HSTS (`max-age=31536000; includeSubDomains; preload`), or a `_headers` file in `packages/atlantis/public/`. Ship `includeSubDomains`/`preload` only once you're sure every subdomain is HTTPS.

### Nice-to-have

- **4.3 — Apex double-redirect.** Add a Cloudflare redirect rule so `atlantistours.pt/*` → `https://www.atlantistours.pt/$1` directly (it already does this) *and* `https://www.atlantistours.pt/` → `/en/` is the only second hop — acceptable, but if you want a single hop for the bare apex, add `atlantistours.pt/` → `https://www.atlantistours.pt/en/` ahead of the generic rule.
- **2.3 — Stop generating localized-slug duplicates** under non-PT locales (`/en/tours/circuito-de-grutas-ate-benagil/`, `/en/tours/pesca-de-fundo/`). Investigate why `getStaticPaths` emits them; canonicals currently cover it so this is tidiness, not urgency.
- **5.5 — `FAQPage` on `/reviews/`** — confirm there's a real FAQ block on that page; if not, drop the schema (Google can flag schema that doesn't match visible content).
- **5.6 — `/llms.txt`** at the root — short curated index of the key pages (tours, FAQ, contact, top blog guides). See the `seo-aeo-geo` skill's `references/llms-txt-guide.md` (installed).
- **Sitemap hreflang consistency** — the sitemap annotates `<xhtml:link>` alternates on `/`, `/about/`, `/blog/`, `/tours/` but not on blog posts or tour pages. Either annotate all or none; the in-page `<link rel="alternate">` tags are doing the real work, so this is cosmetic.
- **Image count in `Product.image`** — 28–30 URLs per tour is excessive; 3–8 high-quality ones is plenty.
- **OG image** — homepage uses the generic `/og-default.jpg`; a branded "Benagil caves" share image would help social CTR.

---

## Part 2 — On-page SEO (8-dimension scorecard)

### Homepage — `https://www.atlantistours.pt/en/`
Target query: *benagil caves boat tour Portimão* (commercial/navigational). 788 words, 32 internal links.

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Title tag | Needs work | `Benagil Caves Boat Tours & Yacht Cruises from Portimão \| Atlantis Tours` — strong keywords, but **byte-for-byte identical to the H1** before the ` \| brand` suffix. Differentiate slightly (e.g. add "Daily Departures" or "Since 2018" to one of them). |
| 2 | Meta description | Pass | `Benagil caves boat tours, yacht cruises & sunset trips departing daily from Portimão. Book with Atlantis Tours.` — ~115 chars; could push toward 150 and add a hook (price-from / "5★ rated"). |
| 3 | Header structure | Pass | One H1; H2s "Popular tours" / "Guest reviews" / "Latest from the Blog"; H3s for tour names. Clean. Could add an H2 for an above-the-fold value-prop / "Why Atlantis" block with body copy. |
| 4 | Body content | Needs work | Mostly tiles + reviews + blog cards; little unique prose. Add 2–4 short paragraphs of genuine copy (what the Benagil tour is, departure point, who it's for, seasons) — helps the home page rank for the head term and feeds AEO. |
| 5 | Internal links | Pass | 32 internal links, descriptive anchors, to canonical URLs. |
| 6 | Images/media | Pass | 8 images, all with alt, 7 lazy, all width set. Hero preloaded with `srcset`/WebP/`fetchpriority=high` ✓. |
| 7 | URL slug | Pass | `/en/` — clean; locale-prefixed default is fine. |
| 8 | Schema | Needs work | `LocalBusiness`+`TourOperator` only — see 5.3/5.4 above. |

### Tour pages (template `[locale]/tours/[slug].astro`) — e.g. `/en/tours/benagil-caves-speed-boat-tour/`
Target query: *benagil caves speed boat tour* (transactional). ~1000–1035 words, ~29 internal links.

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Title tag | OK | `<tour name> \| Atlantis Tours`. FH names are decent keyword-wise; an override could add "from Portimão" / "From €20" / "5★" for stronger SERP pull. |
| 2 | Meta description | **Fail** | Mid-word truncation of the body, reused in OG/Twitter/`Product.description`. See 5.1. **This is the single highest-ROI on-page fix.** |
| 3 | Header structure | Pass | One H1 (= tour name); H2 "Guest reviews" / "You might also like"; H3 "Itinerary" / "What to Know" / "Meeting Point" / "Cancellation Policy". Consider promoting "What to Know" content into a short intro paragraph above the fold. |
| 4 | Body content | OK | ~1k words from FH data: highlights bullets, description, itinerary, restrictions, extras, meeting-point map, cancellation policy, reviews. Adequate for a transactional page. Could add a 2–3 sentence hand-written intro per tour (also solves the meta-description problem if you write the meta from it). |
| 5 | Internal links | Pass | Breadcrumb + 3 related tours + reviews link + footer. Anchors descriptive. |
| 6 | Images/media | Pass | 9–10 imgs, all alt, most lazy, most width; `VideoObject` schema + lightbox. (28+ images in schema is overkill — see above.) |
| 7 | URL slug | Mostly pass | EN/ES/FR: `benagil-caves-speed-boat-tour` ✓. PT localizes (`circuito-de-grutas-ate-benagil`) — fine, but it's the source of the hreflang break; just make hreflang use the matched slugs. |
| 8 | Schema | Needs work | Rich and mostly correct; fix `description` (5.1) and complete `Offer` (5.2). Note `private-yacht-cruise-to-the-benagil-caves` has `Offer` but **no `AggregateRating`/`Review`** while the speed-boat tour does — if that yacht tour has FH reviews, surface them; if not, fine. |

### Other page types (spot-checked)
- **Blog posts** (`/en/blog/benagil-cave-tour-complete-guide/`): **good.** Hand-written title (`Benagil Cave Tour: Everything You Need to Know in 2026`), proper hand-written meta, `BlogPosting`+`BreadcrumbList`+`Organization` schema, ~1273 words, one H1. The "2026" in titles needs an annual refresh — territory for the `content-refresh-system` skill. Author schema falls back to `Organization` unless `authorBio`+`authorImage` present — adding a real skipper byline + bio would strengthen E-E-A-T (these "from the skippers who go there daily" pages are perfect for it).
- **`/en/tours/` and `/en/tours/boats/`** listing pages: decent meta + `ItemList` schema; resolve the overlap (4.2).
- **`/en/faq/`**: `FAQPage` schema present ✓ — consider expanding the question set (booking, weather/cancellation, kids, accessibility, meeting point, what to bring) since FAQ rich results + AEO answer-boxes are easy wins for tour queries.
- **`/en/reviews/`**: `CollectionPage` + `FAQPage` + `Review`/aggregate schema, ~1k words — good page; just confirm the `FAQPage` block is real (5.5).
- **Taxonomy pages**: thin — see 2.2.

---

## Part 3 — Prioritized roadmap

### P0 — do first (high impact, low effort, all code-side in this repo)
1. **Fix tour-page hreflang** — pass the already-computed `localePaths` through `Layout` → `SEO.astro` as `alternateUrls` in `tours/[slug].astro`. Audit blog-post hreflang for the same bug. *(2.1/4.1)*
2. **Fix tour meta descriptions** — per-tour `seoTitle?`/`seoDescription?` overrides + word-boundary truncation fallback; use one value for `<meta>` / OG / Twitter / `Product.description`. *(5.1)* — drafts below.
3. **Enable HSTS** on Cloudflare. *(6.1)*

### P1 — next (clear wins, modest effort)
4. **`noindex,follow` blog tag pages** + remove `/blog/tag/` from the sitemap `filter`; same for category pages unless given unique intro copy. *(2.2)*
5. **Enrich homepage schema** — add `WebSite` node; add `image`/`logo`/`priceRange`/`openingHoursSpecification`/`areaServed`/company-level `aggregateRating` to `LocalBusiness`. *(5.3/5.4)*
6. **Complete `Offer` schema** — `url` + `priceValidUntil`. *(5.2)*
7. **Resolve `/tours/` vs `/tours/boats/`** — differentiate or redirect/canonical. *(4.2)* — pull in `seo-content-audit`.
8. **Add `/llms.txt`.** *(5.6)* — use the `seo-aeo-geo` reference.

### P2 — polish / when convenient
9. Stop generating localized-slug duplicate tour URLs under non-PT locales. *(2.3)*
10. Differentiate homepage title vs H1; add unique homepage body prose. *(on-page #1/#4)*
11. Trim `Product.image` arrays to ~5–8; add branded homepage OG image.
12. Verify/remove `FAQPage` on `/reviews/`. *(5.5)*
13. Single-hop apex redirect for the bare domain. *(4.3)*
14. Expand the FAQ question set; add skipper-byline author schema to blog posts.
15. Sitemap hreflang annotation consistency.
16. Confirm Core Web Vitals in Search Console; if LCP/INP/CLS need work, bring in the `performance-optimization` skill.

### Recommended next audits (not run today)
- `seo-keyword` — build a keyword map from the existing Google Ads keyword corpus (`GoogleAds/atlantis/02-campaigns/`) + GSC queries; map each cluster to a page; spot gaps the blog should fill. (Feeds the Ads work too — same query universe.)
- `seo-content-audit` — keep/merge/redirect decisions across the ~13 blog posts + listing pages + taxonomy.
- `seo-traffic-diagnosis` — once you have a GSC export, baseline organic and watch the impact of the P0/P1 fixes.
- `seo-competitor` — vs Algarve Experience, Dreamwave, Xride, Algarve Discovery, Royal Nautic (same set you bid on in Ads).

---

## Appendix — drafted tour meta descriptions (≤155 chars, hand-written)

> Verify prices/durations against current FareHarbor data before shipping.

- **Benagil Caves Speed Boat Tour** — `See the Benagil sea cave up close on a small-group speedboat from Portimão. ~2 hrs, dolphins often spotted. 5★ rated, free cancellation. From €20.`
- **Private Yacht Cruise to the Benagil Caves** — `Private yacht charter from Portimão to the Benagil caves — swim stops, golden cliffs, your group only. Skipper + drinks included. Book direct.`
- **Private Sail Yacht Cruise** — `Charter a private sailing yacht along the Algarve coast from Portimão. Hen/stag, proposals, family days — half or full day. 5★ crew, book direct.`
- **Reef Fishing Tour** — `Half-day reef fishing off Portimão with a local skipper — rods, bait and licence included. Beginners welcome, fish kept or released. From €75.`

Localize each into PT/ES/FR (don't auto-translate the English string into the meta — write native copy).
