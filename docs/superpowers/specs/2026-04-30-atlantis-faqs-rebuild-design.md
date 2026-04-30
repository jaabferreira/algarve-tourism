---
date: 2026-04-30
project: atlantis
status: draft
---

# Atlantis Tours — FAQ rebuild for SEO

## Problem

The current `/faq` page on `atlantistours.pt` is 5 generic questions × 4 locales rendered in one accordion. It generates almost no organic traffic because:

1. Question phrasings ("What should I bring?", "Where do tours depart from?") don't match the long-tail, question-style queries real users type into Google ("how long is the benagil cave tour", "can you swim in benagil cave", "where does benagil cave tour leave from").
2. Every tour page (`/tours/[slug]`) ships with zero FAQ content — no question-style headings, no `FAQPage` schema, no long-tail keyword anchors. Tour pages compete only on the descriptive product copy.
3. The thin `/faq` page sits in the sitemap pulling weak ranking signals while the high-revenue tour pages are SEO-thin on informational intent.

GSC shows an aggregate average position of ~12, but that's an average across all queries; the underlying problem is missing topical depth on the tour pages themselves and missing question-style content site-wide.

## Goal

Capture long-tail informational queries (question-style PAA-pattern queries) on the **highest-converting pages we control** — the tour product pages — by adding hand-written, query-matched FAQ blocks to each, with `FAQPage` structured data alongside the existing `Product` schema.

Secondary goal: stop the existing `/faq` page from being a thin-content drag without rebuilding the full topic-cluster hub yet.

## Non-goals

- Building a full topic-cluster `/faq` hub with category sub-pages (`/faq/benagil-caves`, `/faq/yacht-charter`, etc.) — that's a Phase 2 spec, written after Phase 1 has ranking data.
- Adding FAQs to `algarveandyou.com` — different brand, different scope.
- Auto-generating FAQs from FareHarbor item data — these must be hand-written editorial content because the SEO win depends on craft.
- Per-FAQ analytics events (which questions get opened most). Nice-to-have, not blocking.
- Optimising for FAQ rich-snippet stars in SERPs (no longer available for tourism sites since Aug 2023). Schema is emitted for content-understanding, not stars.
- Backlink building or GBP work. This spec only addresses the content lever.
- Touching the existing `Product` / `TouristTrip` / `BreadcrumbList` / `VideoObject` schema on tour pages.

## Architecture

### Per-tour FAQ block

Rendered between the existing cancellation policy and reviews sections of `packages/atlantis/src/pages/[locale]/tours/[slug].astro`.

Block structure:

1. **Section heading** — `<h2>` with locale-aware "Frequently asked questions about &lt;tour name&gt;". Keyword-rich, dynamic per tour.
2. **Subtitle** — single-sentence muted line, e.g. "Practical info, what's included, and what to expect on this tour." Adds keyword density without being spammy.
3. **Accordion** — 8 `<details>/<summary>` items rendered via the existing `FAQ.astro` component. The component is updated so the question text in `<summary>` is wrapped in `<h3>`, giving Google 8 H3 question-anchors per page in addition to the schema.
4. **All collapsed by default** on both desktop and mobile. Avoids accordion fatigue, keeps SSR HTML small, prevents CLS.
5. **Closing line** — small muted text below the accordion linking to WhatsApp ("Still have questions? WhatsApp us anytime.").

### Component changes

- `packages/shared/src/components/FAQ.astro` — adds `headingLevel` prop (default `"h3"`). Wraps the `summary` text in the configured heading element so the same component is reusable on `/faq` (where each generic question is also `h3` under a page-level `h2`) without breaking.
- New `packages/shared/src/components/TourFAQ.astro` — wraps `<section><h2>…</h2><p class="subtitle">…</p><FAQ items={…}/><p class="tour-faq__cta">…</p></section>` with the keyword-rich H2 baked in. Takes `tourName`, `subtitle` (optional), and `items` props.

### Schema markup

Tour page already emits `Product` + `TouristTrip` + `BreadcrumbList` (+ `VideoObject` when applicable). Phase 1a adds `FAQPage` schema as an additional entry in the `structuredData` array, built via the existing `buildFAQPage(items)` helper in `packages/shared/src/seo/structured-data.ts`. Combining `Product` + `FAQPage` on one page is explicitly allowed by Google's structured-data guidelines.

### Data storage

New file `packages/atlantis/src/content/faqs/by-tour.json`. Keyed by FareHarbor PK, then locale, then ordered question array:

```json
{
  "717720": {
    "en": [
      { "question": "How long is the Benagil cave tour from Portimão?", "answer": "About 1.5 hours total — roughly 25 minutes from Marina de Portimão to the cave, ~30 minutes exploring the Benagil cave plus 4 nearby caves (Captain's, Cathedral, Carvalho), then ~25 minutes back. Times vary slightly with sea conditions." },
      { "question": "...", "answer": "..." }
    ],
    "pt": [ /* 8 entries, same order as en */ ],
    "es": [ /* 8 entries, same order */ ],
    "fr": [ /* 8 entries, same order */ ]
  },
  "717754": { /* sail yacht (Veleiro) */ },
  "720028": { /* Cranchi yacht */ },
  "718024": { /* reef fishing */ }
}
```

Rationale:

- **PK-keyed**, not slug-keyed: the slug differs per locale (Benagil's PT slug differs from EN); PK is stable.
- **Locale-nested**: easy to scan one locale's full set when reviewing translations.
- **Ordered array**: question order matters for SEO (first question gets the most engagement weight). Order is parallel across locales so QA is "row 3 in EN matches row 3 in PT semantically."
- Answers are plain strings with minimal HTML allowed (`<a>`, `<strong>`, `<em>`, `\n` for line breaks) — same convention as existing `description_html`.

Mirrors the existing `packages/atlantis/src/content/reviews/manual.json` pattern.

### Loading & validation

New module `packages/atlantis/src/lib/faqs.ts`:

- Exports `loadTourFAQs(pk: number, locale: Locale): FAQItem[]` — reads `by-tour.json`, returns the 8 items for that PK and locale.
- Validates the JSON shape via Zod on import.
- **Build-time assertion**: on first load, iterates every PK in `tourCategories` × every locale in a configurable `requiredLocales` set. Throws (failing the build) if any combination is missing or has length ≠ 8. Prevents shipping a tour page with missing-locale FAQs.
- `requiredLocales` starts as `["en"]` for Phase 1a (so the EN-only PR can ship before translations land), tightens to all 4 locales as part of Phase 1b before each translation merges. Default lives in `lib/faqs.ts` so changing it is a single-line diff.

The `[slug].astro` page imports `loadTourFAQs(item.pk, locale)` and passes the result to `<TourFAQ>` and to `buildFAQPage(...)` for schema.

### `/faq` page minimal rewrite (Phase 1c)

- New file `packages/atlantis/src/content/faqs/general.json` with 10 cross-tour generic questions × 4 locales.
- Topics: how to book, departure points across all tours, English-speaking skippers, cancellation, payment methods, weather policy, group bookings, accessibility, what to bring, kids on tours.
- Each answer ends with an internal link into the relevant tour page (e.g., "...for Benagil specifically, see [the Benagil tour page](/en/tours/benagil-caves-speed-boat-tour/)").
- `packages/atlantis/src/pages/[locale]/faq.astro` is refactored to read from `general.json` instead of the inlined `faqByLocale` object. Page H1 stays as `t(locale, "nav.faq")`. The FAQ accordion uses the same updated `FAQ.astro` component (`headingLevel="h3"` default).
- Same build-time validation pattern: all 4 locales × 10 questions, fail build if missing.

## Content workflow

### EN authoring (32 questions × 4 tours)

1. **Claude drafts 32 EN Q&As** using the local Ads keyword data (`docs/ads/atlantis/02-campaigns/{benagil,cranchi-yacht,sail-yacht,reef-fishing}/keywords-and-rsa.md`) plus typical PAA patterns for boat/yacht/fishing tours. Answers ~40-80 words each. Draft committed to `by-tour.json` under each PK's `en` key.
2. **User does manual PAA mining pass** (~20 min): incognito Google.com (location=Portugal) searches on seed queries — `"benagil cave tour"`, `"yacht charter portimão"`, `"reef fishing algarve"`, `"private yacht algarve"`, plus 1-2 long-tails per tour. Copy the People Also Ask questions, drop in chat.
3. **Claude refines** — swaps any drafted question for closer-matching real PAA phrasing, updates JSON.
4. **User reviews the final 32 EN Q&As for factual accuracy** — especially: prices, durations, what's included, departure points, cancellation specifics. Answers cross-checked against existing `description_html` for each tour.

Questions that Claude is <70% confident match a real PAA query are flagged in the draft so user attention focuses there.

### Translations (96 entries: PT/ES/FR × 32 EN)

1. Once EN is locked, Claude generates PT/ES/FR drafts in batches via Sonnet, with explicit instructions to:
   - Match local search-query style for that language (PT: "passeio de barco" patterns; ES: "paseo en barco"; FR: "excursion en bateau"), not literal translation.
   - Use vocabulary consistent with existing tour-page copy in that locale.
   - Keep answers within the same length band as EN.
2. User spot-checks, flagging anything that reads stiff or wrong. PT is the highest-stakes pass (native reader).
3. Claude corrects flagged items.

### `/faq` Phase 1c (10 generic × 4 locales)

Same workflow scaled to 10 questions. EN by Claude with PAA mining → user factual review → Sonnet translates → user spot-check.

## Phases & shipping order

- **Phase 1a — Per-tour FAQ blocks (the SEO win).** All 4 tours × 8 EN questions live on production. PR includes: `by-tour.json` with EN entries only, new `TourFAQ.astro`, `FAQ.astro` heading-level prop, `lib/faqs.ts` loader + build-time validation, `FAQPage` schema additions to tour page. Build-time validation initially scoped to EN only so the PR can ship before translations land. Ships when user's factual review passes.
- **Phase 1b — Translations.** PT/ES/FR drafts merged into `by-tour.json`. One PR per locale (so reviews stay manageable) or one batched PR — user's call. Build-time validation tightens to require all 4 locales before each PR's locale-set is considered shippable.
- **Phase 1c — `/faq` page rewrite.** Replace 5 generic Qs with 10 cross-tour generic Qs in 4 locales. New `general.json`, refactored `faq.astro`, internal links into tour pages.
- **Phase 2 (out of scope here)** — full topic-cluster `/faq` hub with category sub-pages.

## Success metrics

- **Lab/build:** all 4 tours render 8 FAQs in all 4 locales; build passes; lighthouse CLS unchanged or better; `FAQPage` schema validates in Google's Rich Results Test.
- **Smoke test (week 1 post-ship):** GSC shows the 4 tour URLs receiving impressions on at least 5 question-style queries each that they didn't before. (GSC indexes new content within ~3-7 days for sites this size.)
- **Real success (week 4-8 post-ship):** average position for the targeted question-style queries (long-tail) improves measurably. Target: at least 8 of the 32 EN questions surface in GSC with average position ≤ 20, up from currently nothing on those exact phrasings.
- **Bookings:** secondary signal. Modest lift on tour-page conversions expected because users who'd otherwise WhatsApp now self-serve, but isolating this from concurrent changes (CLS fixes, Ads launch) will be hard. Don't over-attribute.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Translations come out wooden, hurt local rankings | Sonnet draft + user spot-check; PT especially gets a careful pass since user is native speaker |
| FAQ content contradicts FareHarbor product data (e.g., we say "1.5h", FH says "2h") | User factual review (Phase 1a step 4) is the gate. Claude cross-references each duration/price/inclusion claim against the product's `description_html`. |
| Adding 8 collapsed accordions hurts CLS or LCP | All collapsed by default = no layout shift on page load. Component is SSR. Pre-ship Lighthouse run on the Benagil page included in PR description. |
| Question phrasings drafted by Claude don't match real PAA queries | User's 20-min PAA mining pass is the corrective step. Claude flags any question with <70% confidence so user attention focuses there. |
| Site updates break the build via missing-locale FAQs | Build-time assertion in `lib/faqs.ts` fails the Cloudflare Pages build before deploy. |
| `/faq` page rewrite cannibalises tour-page rankings | Generic questions don't overlap with tour-specific ones; internal links in the answers push authority *down* into tour pages, not the other way. |
| Visual content cache server (`/superpowers/brainstorm/`) accidentally committed | `.superpowers/` already in `.gitignore` (verified). |

## Open items (none blocking)

- Whether to add `aria-label` on the closing-line WhatsApp link or rely on the existing `<WhatsAppButton>` floating component for that affordance. Resolved in Phase 1a; not a blocker.
