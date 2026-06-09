# Atlantis on-page punch-list — design

**Date:** 2026-06-09
**Branch:** `feat/atlantis-content-hub`
**Source:** FareHarbor "Atlantis Tours SEO & AI Search Overview" report (June 2026), filtered through our own 2026-05-12 organic diagnosis and a 2026-06-09 GSC re-check.

## Background

The FareHarbor report recommends shifting Atlantis Tours from brand-led to activity-led ("Benagil") organic visibility. A 2026-06-09 GSC re-check established two things before any work:

- The report's headline "**organic traffic −26%**" is **false** — a Semrush *estimate* artifact. Actual GSC clicks grew every month (Feb 411 → May 1,164; June pacing ~+28% vs May). The hub deployed 2026-05-15 is working (pillar = #5 page sitewide, 4,372 impressions in May at avg pos 7.4; full cluster + PT/ES/FR translations ranking).
- Most of the report's recommendations are **already shipped**: the Benagil hub/pillar + cluster, hand-written titles/metas (`seo-overrides.ts`), and Product / LocalBusiness / BreadcrumbList / FAQPage / TouristTrip schema. The blog already carries FAQ blocks + FAQPage schema on the pillar and ~28 posts.

The verified bottleneck is **off-page authority** (Authority Score 12, ~40–60 ref domains), which is a separate workstream (`seo-offpage`) and out of scope here. This spec covers only the genuinely net-new **on-page** items the report surfaced.

## Goal

Capture more non-brand "Benagil" intent and improve decision-stage conversion by closing the on-page gaps that remain after the May hub work, without duplicating what already exists.

## Scope

| # | Item | Type |
|---|------|------|
| 1 | Per-tour FAQ section + FAQPage schema on the 3 Benagil/yacht money pages | net-new code |
| 2 | Standalone comparison blog post "Benagil Speed Boat vs Private Yacht", wired into internal linking | net-new content |
| 3 | SEO `<title>`: drop "Cranchi" from item 720028 (all 4 locales), keep "Luxury" on 717754 | net-new copy |
| 4 | Canonical host fix — Cloudflare apex→www 301 (consolidates split GSC clicks) | infra (operator action) |
| 5 | Pillar: add ONE commercial Q&A linking to the comparison post (not a new block) | refinement |

**Locale policy:** EN-first for items 1, 2, 5 (translate to PT/ES/FR after the EN copy is approved). Item 3 is done in all 4 locales now (one-word removal, mechanical).

### Out of scope (already done or debunked)
Hub/pillar page, Product/LocalBusiness/BreadcrumbList schema, bulk titles/metas, pillar+cluster FAQ blocks, the "−26%" claim, and all off-page/authority work.

## Item 1 — Per-tour FAQ + FAQPage schema

**Problem.** Tour pages (`pages/[locale]/tours/[slug].astro`) are 100% FareHarbor-data-driven. There is no slot for hand-written content and no FAQPage schema on them.

**Approach (chosen).** Add a new hand-written content source keyed by FareHarbor item PK → locale, mirroring the existing `lib/seo-overrides.ts` precedent. Render with the existing `FAQ.astro` component and append `buildFAQPage()` JSON-LD to the page's `structuredData`. (Rejected: parsing FAQs from FH descriptions — unstructured, FH custom fields are dashboard-only; and a new per-tour markdown collection — overkill for 4 pages.)

**Files.**
- New `packages/atlantis/src/lib/tour-faqs.ts`
  ```ts
  // shape:
  const FAQS: Record<number, Partial<Record<Locale, { question: string; answer: string }[]>>>
  export function getTourFaqs(pk: number, locale: Locale): { question: string; answer: string }[]
  // returns [] when no entry for (pk, locale) — caller renders nothing.
  ```
- New `packages/atlantis/src/lib/tour-faqs.test.ts` — mirror `seo-overrides.test.ts`: returns FAQs for a known PK/locale; returns `[]` for unknown PK and for an unpopulated locale.
- Edit `packages/atlantis/src/pages/[locale]/tours/[slug].astro`:
  - import `getTourFaqs` + `buildFAQPage` + `FAQ` component;
  - `const faqs = getTourFaqs(item.pk, locale);`
  - render `{faqs.length > 0 && (<section><h2>{t(locale,"product.faq")}</h2><FAQ items={faqs} /></section>)}` as the last child of `.product-detail__body` (after the cancellation-policy `<section>`);
  - `if (faqs.length) structuredData.push(buildFAQPage(faqs));`
  - add `product.faq` i18n key (EN "Frequently asked questions"; PT/ES/FR when localized).

**Tours covered (EN now):** 717720 (speed boat), 720028 (Cranchi private motor yacht), 717754 (Luxury sail yacht). Fishing (718024) excluded — not Benagil intent.

**Content (questions fixed here; answers drafted at implementation and reviewed before merge).** Answers MUST be grounded in these verified facts to avoid the usual drafting hallucinations:
- Departure is **Porto Comercial de Portimão** (signposted *Ac. Porto Comercial de Portimão*) — **not** Clube Naval.
- **The speedboat and the Cranchi motor yacht enter the Benagil cave** (conditions permitting); the **sail yacht does not** (mast clearance) — it cruises the cliffs/coastline with swim stops.
- Speedboat: from €20, ~2h, small group, dolphins often spotted. Private yacht/sail: private charter, your group only, skipper included, swim stops.

Question sets:
- **717720 speedboat:** duration (~2h); departure point; does it enter the cave (yes); suitable for children; what to bring; dolphins; bad-weather/cancellation.
- **720028 Cranchi private yacht:** is it private / group size; does it enter the cave (yes); what's included; swim stops; private vs shared difference; suitable for families/celebrations; departure point.
- **717754 sail yacht:** does it enter the cave (no — why); is it private / group size; what's included (skipper, drinks); who it's best for; swim stops; departure point; duration.

## Item 2 — Comparison blog post

**File.** `packages/atlantis/src/content/blog/en/benagil-speed-boat-vs-private-yacht.md`

**Frontmatter.**
- `translationKey: benagil-speed-boat-vs-private-yacht`
- `category`: reuse the category used by `benagil-vs-other-sea-caves-algarve.md`.
- `pillarSlug: benagil-cave-tour-complete-guide`, with a `pillarOrder` placing it sensibly in the hub's "In this guide" list.
- `relatedTourSlugs`: the three tour slugs (`benagil-caves-speed-boat-tour`, `private-yacht-cruise-to-the-benagil-caves`, `private-sail-yacht-cruise`).
- `faqs`: 3–4 decision-oriented Q&As.
- `author` + **both** `authorBio` and `authorImage` set, so `buildBlogPosting` resolves the author to a `Person` (the schema gate falls back to `Organization` unless both are present).

**Content.** Intro framing the choice → comparison table (price, group type, **cave entry**, duration, swim stops, "best for") → short section per option → verdict → internal links to the three tour pages and the pillar. Key accuracy point: the cave-entry comparison is speedboat vs **Cranchi motor** yacht (both enter); the sail yacht is the relaxed, does-not-enter option.

**Internal linking (report Priority 4).** Add this post's `translationKey` to the related-guides mapping in `packages/atlantis/src/lib/tour-guides.ts` for 717720, 720028, 717754 so it surfaces in `RelatedGuides` on those tour pages.

## Item 3 — SEO title (drop "Cranchi")

Edit `packages/atlantis/src/lib/seo-overrides.ts`, item **720028** title in all four locales (keep descriptions; keep "Luxury" on 717754; FH product name / H1 unchanged):
- en: `Private Cranchi Yacht Cruise to the Benagil Caves` → `Private Yacht Cruise to the Benagil Caves from Portimão`
- pt: `Cruzeiro Privado de Iate Cranchi às Grutas de Benagil` → `Cruzeiro Privado de Iate às Grutas de Benagil — Portimão`
- es: `Crucero Privado en Yate Cranchi a las Cuevas de Benagil` → `Crucero Privado en Yate a las Cuevas de Benagil — Portimão`
- fr: `Croisière Privée en Yacht Cranchi aux Grottes de Benagil` → `Croisière Privée en Yacht aux Grottes de Benagil — Portimão`

## Item 4 — Canonical host fix (infra)

GSC indexes `http://atlantistours.pt/en/` (447 clicks, pos 6.8) separately from `https://www.atlantistours.pt/en/` (264, pos 14.1). Canonical tags + sitemap + hreflang already use `https://www`; the missing piece is a 301 from the apex/`http` variant. This is a **Cloudflare zone-level change**, not a repo edit (Pages `_redirects` matches by path, not host).

**Operator action (exact rule):**
- Cloudflare → zone `atlantistours.pt` → Rules → Redirect Rules → create:
  - When incoming request **Host equals `atlantistours.pt`**
  - Then **301** to `concat("https://www.atlantistours.pt", http.request.uri.path)`, **preserve query string**.
- Confirm SSL/TLS → Edge Certificates → **Always Use HTTPS** is on.

Verify with `curl -sI http://atlantistours.pt/en/` and `curl -sI https://atlantistours.pt/en/` → expect `301` → `https://www.atlantistours.pt/en/`.

## Item 5 — Pillar refinement

The pillar already has a 10-question FAQ block + FAQPage schema. Add **one** commercial Q&A to `content/blog/en/benagil-cave-tour-complete-guide.md` `faqs:` — *"Should I do a shared speedboat or a private yacht tour to Benagil?"* — with an answer that links to the new comparison post (Item 2). No new block, no template change.

## Testing & verification

- `astro build` (atlantis package) completes clean.
- New `tour-faqs.test.ts` passes; existing tests unaffected.
- View-source / Rich Results: FAQPage JSON-LD present on the 3 tour pages; BlogPosting + FAQPage present on the comparison post; comparison post `author` resolves to `Person`.
- Comparison post renders, appears in `RelatedGuides` on the 3 tour pages, and all internal links resolve.
- `<title>` for the 720028 pages no longer contains "Cranchi".
- After deploy: append a Google Ads changelog entry (`GoogleAds/atlantis/06-changelog.md`) — the 3 tour pages are paid-search landing pages, so FAQ/comparison content changes are adjacent infra affecting ad performance (date · what · why · expected effect · verify-on).
- Operator applies Item 4 in Cloudflare and confirms the 301s with `curl`.

## Success criteria (verify-on ~4 weeks)

- FAQPage rich results eligible for the 3 tour pages (GSC Enhancements / Rich Results test).
- Comparison post earning impressions for "speed boat vs private yacht / which Benagil tour" style queries.
- Apex/`http` clicks consolidating onto `https://www` in GSC (single host variant).
- No regressions: tour-page money keywords hold or improve.
