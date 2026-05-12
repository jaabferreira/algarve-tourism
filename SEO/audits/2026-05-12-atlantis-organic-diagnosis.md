# Atlantis Tours — Organic Performance Diagnosis ("why results are lacking")

- **Date:** 2026-05-12
- **Companion to:** `2026-05-12-atlantis-technical-onpage-audit.md` (the technical/on-page audit done the same day). This doc adds the *live data* the audit flagged as "not run today" — GSC query/page/indexation data + GA4 channel/conversion data — and answers the business question: why isn't organic working, and what actually moves it.
- **Data sources:** Search Console API (`sc-domain:atlantistours.pt`, 28d + 90d), GA4 Data API (property `533736679`), live HTTP checks.

---

## TL;DR

**The site has almost no non-brand organic visibility, and that's the result of two things compounding: (1) it's a ~6-week-old site (rebuilt April 2026) with essentially zero link/authority profile, and (2) several self-inflicted technical bugs are blunting what little it does rank for.** The on-page work is already decent — the gap is *authority* and a handful of *fixable defects*, not page quality.

- **~92% of organic clicks are people typing the brand** ("atlantis tours" + variants ≈ 1,500 of ~1,540 clicks/90d). Non-brand commercial queries: **~118 clicks in 90 days** — about 1.3/day.
- **The money pages don't rank.** `benagil cave tour` → **position 36**; `benagil cave tours` → 20; `benagil boat tour` → 29; `boat tour algarve` → 25. The tour page `/en/tours/benagil-caves-speed-boat-tour/` itself sits at **position ~21**. For the head term, the site is on page 3–4.
- **Impressions roughly doubled in the last 28 days, but clicks are flat and CTR halved** (~10–15% → ~5–7%). Google is *showing* the new site more, for queries where it ranks at position 9–20+. Normal for a young site gaining footing — but it stays stuck there without off-site work.
- **Self-inflicted defects (all confirmed live today):** broken hreflang on every tour page → the `pt` alternate literally 404s; one old redirect chains into a 404; mid-word-truncated meta descriptions on the 4 money pages; stale/garbage sitemaps still submitted in GSC; thin taxonomy pages in the index.

---

## 1. What the GSC data actually says

### 1.1 Branded vs non-branded (90 days)
| Bucket | Clicks | Impressions | Notes |
|---|---|---|---|
| Brand (`atlantis…` / `atlantic…`) | ~1,500 | ~6,200 | avg pos 1–2, CTR 24–60%. This is "people who already know us." |
| Everything else | ~118 | ~5,200 | avg pos ~9–35, CTR 0.1–3% for the commercial terms. **This is "SEO" — and it's barely a trickle.** |

The non-brand impressions are *there* (5,200/90d) — Google knows the site is about Algarve/Portimão boat tours — but the positions are too deep to earn clicks. Standouts:
- `bootstour portimao` — **1,639 impressions**, position 4.8, but **0.3% CTR / 5 clicks**. (German. Position 4.8 is a 90-day average — it's almost certainly bouncing between p3 and p15, and the German audience is being served the wrong language version, see §2.1.)
- `bateau portimao` — **1,578 impressions**, position 5.8, **0.1% CTR / 1 click** (French — same story).
- `benagil cave tour` — 413 impressions, **position 36** — page 3–4.
- `benagil cave tours` — 79 impressions, position 20.
- `portimao boat tours` — 91 impressions, position 8.6, 8.8% CTR (this one's *almost* working).
- `silves river cruise` (p6.7), `arade river` (p11.7), `onde nasce o rio arade` (p10.6) — getting impressions, but the page they'd land on **404s** (see §2.3).

### 1.2 Top pages — it's all the homepage
`/en/` (in its various forms) is ~70% of all organic clicks, and most of that is brand. The 4 tour money-pages combined get **single-digit clicks/month from organic**. Blog posts get a handful each. Translation: the homepage ranks for "atlantis tours"; nothing else ranks for anything commercial.

GSC also still reports clicks against **fragmented URL variants** — `http://atlantistours.pt/en/`, `https://www.atlantistours.pt/`, `https://www.atlantistours.pt/en/`, `https://www.atlantistours.pt/pt` (no slash), `/en/tours/benagil` (old slug). The redirects *are* in place (verified), so these are mostly historical, but it confirms Google spent a chunk of crawl budget reconciling the migration.

### 1.3 Geography (90 days)
| Country | Clicks | Impr | Avg pos |
|---|---|---|---|
| PT | 1,287 | 15,476 | 9.0 | (mostly brand) |
| US | 191 | 5,163 | **23.3** | lots of impressions, terrible position |
| ES | 150 | 2,621 | 10.6 |
| CA | 148 | 905 | 8.2 |
| FR | 126 | 4,251 | 8.6 |
| GB | 118 | 1,460 | 12.8 |
| NL | 65 | 619 | 9.1 |
| DE | 61 | 2,342 | 5.9 |

The UK/IE/DE/NL/FR pre-trip-planner audience (the 20% the strategy and the Google Ads campaigns target) is getting **~370 clicks combined over 90 days** — and the German/French markets specifically are getting thousands of impressions at positions that convert to almost nothing, partly because of the hreflang bug serving them the wrong language page (§2.1).

### 1.4 Indexation / sitemaps (GSC)
- `sitemap-index.xml` — submitted=186, status OK, last downloaded 2026-05-10. ("indexed=0" in the API is the deprecated per-sitemap counter — not meaningful.) URL Inspection on key pages returns **PASS / "Submitted and indexed"** with correct Google-chosen canonicals — so the core pages *are* indexed fine.
- **Stale `sitemap.xml` (24 URLs) still submitted** — last submitted 2025-01-22, errors=1, warnings=2. This is the *previous* site's sitemap. Remove it from GSC.
- **A tour-page URL was submitted as a sitemap:** `https://www.atlantistours.pt/en/tours/circuito-de-grutas-ate-benagil/` is listed in GSC's sitemap report with errors=1 (it isn't XML). Remove it from GSC.

---

## 2. The self-inflicted defects (confirmed live 2026-05-12)

These don't *explain* the authority gap, but they cap the ceiling and waste the visibility the site does earn. All are in this repo or in Cloudflare/GSC config.

### 2.1 🔴 Broken hreflang on every tour page — the `pt` alternate 404s
`/en/tours/benagil-caves-speed-boat-tour/` declares `hreflang="pt" href=".../pt/tours/benagil-caves-speed-boat-tour/"` — and that URL **returns 404** (real PT slug is `circuito-de-grutas-ate-benagil`). Same for all 4 tours. `_redirects` has the `/en/tours/circuito-de-grutas-ate-benagil/ → /en/...` direction but **not** the reverse `/pt/tours/<en-slug>/ → /pt/tours/<localized-slug>/`, so the hreflang target genuinely dead-ends.

Effect: Google sees an inconsistent return-tag set, discards the language cluster, and serves whatever single version it picked — which is why DE/FR see the English page at a bad position. **Fix:** thread the already-computed `localePaths` (it exists in `tours/[slug].astro`, only passed to `<Header>`) through `Layout` → `SEO.astro` as `alternateUrls`. Then audit blog posts (they localize slugs too). *(= audit finding 2.1/4.1, P0)*

### 2.2 🔴 Tour meta descriptions are mid-word body fragments
Live on `/en/tours/benagil-caves-speed-boat-tour/`: `<meta name="description" content="Meet at the Portimão dock and get ready for an unforgettable adventure. After a brief but important safety briefing, board an agile boat, ready to explore the w">` — cut at "the w". Same string in `og:description`, Twitter, and `Product.description` schema. Every money page (and Google Ads landing page) has a broken-looking SERP snippet. **Fix:** per-tour `seoDescription` overrides + word-boundary truncation fallback; drafts are in the audit appendix. *(= audit finding 5.1, P0)*

### 2.3 🟠 An old redirect chains into a 404
`/en/tours/rio-arade-silves` → 301 → `/en/tours/arade-river-boat-tour-up-to-silves/` → **404** (the Arade/Silves river cruise was discontinued; the redirect target doesn't exist). Same for the PT pair. Meanwhile `silves river cruise` / `arade river` queries are getting impressions and hitting this dead end. **Fix:** repoint those `_redirects` lines to `/en/tours/` (or the closest live product). While in there, sweep `_redirects` for any other target that 404s. *(new — not in the audit)*

### 2.4 🟠 No HSTS
`Strict-Transport-Security` absent on all responses (confirmed). Cloudflare → SSL/TLS → Edge Certificates → enable HSTS. *(= audit finding 6.1, P0)*

### 2.5 🟡 Apex is a 3-hop redirect
`https://atlantistours.pt/` → `https://www.atlantistours.pt/` → `https://www.atlantistours.pt/en/`. Add a Cloudflare rule taking the bare apex straight to `/en/`. *(= audit finding 4.3)*

### 2.6 🟡 Stale + bogus sitemaps in GSC; thin taxonomy pages indexed
Remove the 2025 `sitemap.xml` and the tour-URL-as-sitemap entry from Search Console. `noindex,follow` the ~72 blog tag/category pages and drop `/blog/tag/` from the sitemap filter (each has ~1 sentence of unique copy). *(= audit findings 2.2; new for the GSC cleanup)*

*(`/en/partners/allgarbe/` was checked — it correctly returns `noindex,nofollow`; the handful of "organic" sessions GA4 shows against it are misattributed/cached. Not an issue.)*

---

## 3. GA4 — the conversion picture (last 90 days)

GA4 only has data from ~April 2026 (the rebuild), so there's no historical trend to compare.

| Channel | Sessions | Engaged | Conversions (`purchase`) |
|---|---|---|---|
| Direct | 1,507 | 862 | 23 |
| **Organic Search** | **816** | **602** | **18** |
| Paid Search | 768 | 489 | 4 |
| Referral | 253 | 201 | 26 |
| Unassigned | 231 | 44 | 4 |

- **75 `purchase` events / 90d** total across all channels (FareHarbor bookings, tracked via the embed). Organic gets credited with 18 of them — but ~13 of organic's 18 land on `/en/` (the homepage), i.e. they're brand searchers who'd have come anyway. Genuinely *discovered-via-organic* bookings are a handful.
- Organic *does* engage well when it arrives (602/816 = 74% engaged sessions) — the site converts fine; the problem is purely **top-of-funnel volume for non-brand intent**.
- Note "Referral" 26 conversions / 253 sessions — disproportionately high; worth a separate look at what referral source that is (could be FareHarbor's own iframe attribution despite the 2026-04-30 unwanted-referrals fix, or a genuine partner).

---

## 4. So — what actually moves the needle?

Sequenced. Items already in the audit's roadmap are tagged; new ones are marked *(new)*.

### Now — fix the defects (this repo / Cloudflare / GSC; days, not weeks)
1. ✅ **DONE 2026-05-12 (in repo, not yet deployed)** — **tour-page hreflang fixed**: threaded the already-computed `localePaths` through `Layout` → `SEO.astro` as `alternateUrls` in `tours/[slug].astro`; EN/ES/FR pages now point `hreflang="pt"` at the real `/pt/tours/circuito-de-grutas-ate-benagil/` slug. Blog hreflang was already correct (it builds `alternateUrls` from real translation slugs). *(audit P0 #1)*
2. ✅ **DONE 2026-05-12 (in repo, not yet deployed)** — **tour meta descriptions fixed**: new `truncateAtWord` helper (`packages/shared/src/lib/text.ts`) kills mid-word cuts for every tour×locale; new `packages/atlantis/src/lib/seo-overrides.ts` holds hand-written copy + `<title>` overrides for the 4 tours in **all 4 locales (EN/PT/ES/FR)**; one value now feeds `<meta>`/OG/Twitter/`Product.description`. *(audit P0 #2)*
3. ✅ **DONE 2026-05-12 (in repo, not yet deployed)** — `rio-arade-silves` (+ PT) redirects repointed to `/tours/` (they used to 301 into a now-deleted product page → 404). Swept the rest of `_redirects`; all other targets resolve. *(new)*
4. ✅ **DONE 2026-05-12 (in repo, not yet deployed)** — **HSTS**: added `packages/atlantis/public/_headers` with `Strict-Transport-Security: max-age=31536000` (no `includeSubDomains`/`preload` yet — see the file's comment). *(audit P0 #3)*
5. ⏳ **Clean up Search Console** (manual, in the GSC UI — can't be done from the repo): remove the stale 2025 `sitemap.xml` (24 URLs) and the bogus tour-page-URL-submitted-as-a-sitemap entry. *(new)*
6. ⏳ **Single-hop apex redirect** (Cloudflare rule). *(audit P2)*

### Next — tighten indexing & schema (weeks)
7. `noindex,follow` blog tag (and thin category) pages + drop `/blog/tag/` from the sitemap filter. *(audit P1 #4)*
8. Enrich homepage entity schema (`WebSite` node, `image`/`logo`/`priceRange`/`openingHoursSpecification`/`areaServed`/company `aggregateRating`); complete `Offer` (`url` + `priceValidUntil`). *(audit P1 #5/#6)*
9. Resolve `/tours/` vs `/tours/boats/` overlap; add `/llms.txt`. *(audit P1 #7/#8)*
10. Differentiate homepage title vs H1; add 2–4 paragraphs of real homepage prose. *(audit P2)*

### The real lever — authority & depth (months; this is what's actually missing)
11. **Off-page / digital PR / citations** — *the* gap. The site ranks #1–2 for its own name and page-3–4 for "benagil cave tour" because it has no link profile and no third-party brand signals. Local citations (Algarve/Portimão tourism directories, GetYourGuide/Viator/Tripadvisor operator profiles linking back), partnerships with hotels/villas, press around the boats, HARO-style journalist requests. → run the `seo-offpage` skill, build a target list. **Highest-leverage un-run play.**
12. **Topical authority via a content hub** — turn the ~13 blog posts into a Benagil-caves / Algarve-boat-tours pillar-and-cluster (proper internal linking, one canonical pillar page, supporting guides) so the site reads as an authority on the topic, not 13 loosely-related posts. → `pillar-content-architecture` + `content-brief-authoring` for the gaps. Pairs with #10 (homepage prose) and the FAQ expansion.
13. **Keyword map** — there's a ready-made keyword universe in `GoogleAds/atlantis/02-campaigns/*/keywords-and-rsa.md` plus the GSC query list above. Map every cluster to a page; the gaps become the content hub's brief list. → `seo-keyword`. (Feeds the Ads work too.)
14. **Competitor SERP teardown** — pull the actual page-1 results for `benagil cave tour` / `bootstour portimao` / `boat tour algarve` and look at *their* link profiles and content depth, so #11–13 are aimed, not generic. → `seo-competitor` (vs Algarve Experience, Dreamwave, Xride, Algarve Discovery, Royal Nautic, plus the OTAs).

### What *won't* move it (don't over-invest here)
- More on-page tweaking of pages that already score "pass." The audit confirms the on-page is fine.
- Core Web Vitals beyond the 2026-04-29 CLS fixes — confirm them in GSC, but field data isn't the bottleneck.
- New blog posts with no internal-linking architecture around them — that's how the current 13 became a flat pile. Build the hub first.

---

## 5. The one-sentence version for the business

> Organic looks weak because the site is six weeks old with no off-site authority and a few fixable bugs are wasting the visibility it does have — fix the bugs in the next week, then the multi-month job is link building / citations / a real content hub, because no amount of on-page polish ranks a brand-new site for "benagil cave tour."
