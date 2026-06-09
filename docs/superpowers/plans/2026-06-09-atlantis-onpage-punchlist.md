# Atlantis On-Page Punch-List Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the genuinely net-new on-page gaps from the FareHarbor June-2026 SEO report — per-tour FAQs with schema, a speedboat-vs-yacht comparison post, a title cleanup, and a canonical-host fix — without duplicating the already-shipped hub/schema work.

**Architecture:** Tour pages are FareHarbor-data-driven, so per-tour FAQs come from a new hand-written `tour-faqs.ts` (PK→locale, mirroring `seo-overrides.ts`) rendered with the existing `FAQ` component + `buildFAQPage` JSON-LD. The comparison post is a standard cluster blog post under the Benagil pillar, wired into existing internal-linking machinery. Titles live in `seo-overrides.ts`. The canonical fix is a Cloudflare zone rule (operator action, no code).

**Tech Stack:** Astro 5, TypeScript, Vitest 3, pnpm 10 workspaces (Turborepo), shared `@algarve-tourism/shared` package, Cloudflare Pages.

**Branch:** `feat/atlantis-content-hub` (current). Execution can run on this branch directly; no worktree required. Nothing deploys until merged to `master` (CF Pages deploys from `master`).

**Spec:** `docs/superpowers/specs/2026-06-09-atlantis-onpage-punchlist-design.md`

**Conventions:**
- Commit message style follows the repo: `feat(atlantis): …`, `feat(seo): …`, etc.
- Every commit message ends with the trailer:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
- Run all tests/builds from the **repo root**.
- Run the whole suite with `pnpm test`; a single file with `pnpm exec vitest run <path>`.

---

## Task 1: Add the `product.faq` i18n key

**Files:**
- Modify: `packages/shared/src/i18n/types.ts:26` (add to the `Translations` interface near the other `product.*` keys)
- Modify: `packages/shared/src/i18n/locales/en.json:26`
- Modify: `packages/shared/src/i18n/locales/pt.json`
- Modify: `packages/shared/src/i18n/locales/es.json`
- Modify: `packages/shared/src/i18n/locales/fr.json`

- [ ] **Step 1: Add the key to the type**

In `packages/shared/src/i18n/types.ts`, add this line immediately after `"product.cancellation": string;`:

```ts
  "product.faq": string;
```

- [ ] **Step 2: Add the translation to all four locale files**

In `packages/shared/src/i18n/locales/en.json`, after the `"product.cancellation": "Cancellation Policy",` line:

```json
  "product.faq": "Frequently asked questions",
```

In `pt.json` (after its `product.cancellation` line):

```json
  "product.faq": "Perguntas frequentes",
```

In `es.json`:

```json
  "product.faq": "Preguntas frecuentes",
```

In `fr.json`:

```json
  "product.faq": "Questions fréquentes",
```

- [ ] **Step 3: Verify types + existing i18n tests still pass**

Run: `pnpm exec vitest run packages/shared/src/i18n/i18n.test.ts`
Expected: PASS (no parity test exists; `t()` falls back to EN for any missing locale key, but all four are now present).

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/i18n/types.ts packages/shared/src/i18n/locales/
git commit -m "feat(i18n): add product.faq heading for tour-page FAQs

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Create the `tour-faqs.ts` data module (TDD)

**Files:**
- Create: `packages/atlantis/src/lib/tour-faqs.ts`
- Test: `packages/atlantis/src/lib/tour-faqs.test.ts`

EN-only content now (PT/ES/FR added in a later, separate translation pass — the resolver returns `[]` for unpopulated locales, so the FAQ section simply doesn't render there yet).

- [ ] **Step 1: Write the failing test**

Create `packages/atlantis/src/lib/tour-faqs.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { getTourFaqs } from "./tour-faqs.js";

const BENAGIL_MONEY_PKS = [717720, 720028, 717754] as const;

describe("getTourFaqs()", () => {
  it("returns EN FAQs for the Benagil speedboat tour", () => {
    const faqs = getTourFaqs(717720, "en");
    expect(faqs.length).toBeGreaterThanOrEqual(4);
    expect(faqs[0]).toHaveProperty("question");
    expect(faqs[0]).toHaveProperty("answer");
  });

  it("accepts the item PK as a string", () => {
    expect(getTourFaqs("717720", "en")).toEqual(getTourFaqs(717720, "en"));
  });

  it("returns an empty array for an unknown PK", () => {
    expect(getTourFaqs(999999, "en")).toEqual([]);
  });

  it("returns an empty array for an unpopulated locale (EN-first rollout)", () => {
    expect(getTourFaqs(717720, "pt")).toEqual([]);
  });

  it("has 4-8 non-empty EN FAQs for each Benagil money page", () => {
    for (const pk of BENAGIL_MONEY_PKS) {
      const faqs = getTourFaqs(pk, "en");
      expect(faqs.length, `pk=${pk}`).toBeGreaterThanOrEqual(4);
      expect(faqs.length, `pk=${pk}`).toBeLessThanOrEqual(8);
      for (const f of faqs) {
        expect(f.question.length, `pk=${pk} question`).toBeGreaterThan(0);
        expect(f.answer.length, `pk=${pk} answer`).toBeGreaterThan(0);
      }
    }
  });

  it("never claims the sail yacht (717754) enters the cave", () => {
    const text = getTourFaqs(717754, "en").map((f) => f.answer).join(" ").toLowerCase();
    // The sail yacht does NOT enter the cave (mast clearance) — guard the known hallucination.
    expect(text).toContain("mast");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run packages/atlantis/src/lib/tour-faqs.test.ts`
Expected: FAIL — cannot resolve `./tour-faqs.js` (module not created yet).

- [ ] **Step 3: Write the implementation**

Create `packages/atlantis/src/lib/tour-faqs.ts`:

```ts
import type { Locale } from "@algarve-tourism/shared";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Hand-written FAQ Q&A for the tour pages, keyed by FareHarbor item PK → locale.
 *
 * Tour pages are otherwise 100% FareHarbor-data-driven; this is the per-tour
 * equivalent of `lib/seo-overrides.ts`. Rendered with the shared `FAQ` component
 * and emitted as FAQPage JSON-LD in `pages/[locale]/tours/[slug].astro`.
 *
 * Facts these answers depend on (do NOT drift from them):
 *  - Departure is Porto Comercial de Portimão (NOT Clube Naval).
 *  - The speedboat (717720) and the Cranchi motor yacht (720028) ENTER the
 *    Benagil cave (conditions permitting); the sail yacht (717754) does NOT
 *    (mast clearance).
 *
 * EN-first: PT/ES/FR are added in a later translation pass. Locales without an
 * entry return [] and render nothing.
 */
const FAQS: Record<number, Partial<Record<Locale, FaqItem[]>>> = {
  // 717720 — Benagil Caves Speed Boat Tour (from €20, ~2h, small group)
  717720: {
    en: [
      {
        question: "How long is the Benagil caves speed boat tour?",
        answer:
          "About 2 hours on the water. You cover the coast between Portimão and the Benagil cave, with time at the main caves and arches along the way.",
      },
      {
        question: "Where does the speed boat depart from?",
        answer:
          "From Porto Comercial de Portimão (signposted “Ac. Porto Comercial de Portimão”). Full meeting-point details are on your booking confirmation.",
      },
      {
        question: "Does the speed boat go inside the Benagil cave?",
        answer:
          "Yes — sea conditions permitting, the speedboat enters the Algar de Benagil so you see the domed roof and skylight from inside. If swell makes entry unsafe on the day, the skipper gets you as close as conditions allow.",
      },
      {
        question: "Is the tour suitable for children?",
        answer:
          "Yes, families are welcome. Children wear a life jacket (provided) and need to sit through the ride. Tell us their ages when you book so we can advise.",
      },
      {
        question: "Will we see dolphins?",
        answer:
          "Often, but never guaranteed — dolphins are wild. They are spotted on a large share of trips, especially in the morning.",
      },
      {
        question: "What should I bring?",
        answer:
          "Sunscreen, a hat, sunglasses, a light layer and a camera. We provide life jackets and all safety equipment.",
      },
      {
        question: "What happens if the weather is bad?",
        answer:
          "Safety comes first. If conditions are unsafe we reschedule or offer a full refund. Free cancellation up to 24 hours before departure.",
      },
    ],
  },

  // 720028 — Private Cranchi Yacht Cruise to the Benagil Caves (private motor yacht)
  720028: {
    en: [
      {
        question: "Is this a private tour?",
        answer:
          "Yes — the yacht is chartered for your group only, with your own skipper. No strangers on board.",
      },
      {
        question: "Does the yacht enter the Benagil cave?",
        answer:
          "Yes — conditions permitting, the Cranchi motor yacht enters the Algar de Benagil. (The sail yacht cannot, due to mast height, so this is the private option that still gets you inside.)",
      },
      {
        question: "What is included?",
        answer:
          "A private skipper, fuel, safety equipment and swim stops along the coast. Inclusions can vary by season — check the booking page for the latest.",
      },
      {
        question: "Are there swim stops?",
        answer:
          "Yes — the skipper anchors at a sheltered spot so you can swim in the clear water off the cliffs.",
      },
      {
        question: "How is this different from the shared speed boat?",
        answer:
          "Privacy, comfort and pace. The shared speedboat (from €20pp) is fast and focused on the caves; the private Cranchi is your group only, with room to relax and swim. Both enter the cave.",
      },
      {
        question: "Is it suitable for families or celebrations?",
        answer:
          "Yes — it is a popular choice for families, groups of friends and special occasions. Tell us about your group when booking.",
      },
      {
        question: "Where does it depart from?",
        answer:
          "From Porto Comercial de Portimão. Meeting-point details are on your confirmation.",
      },
    ],
  },

  // 717754 — Private Luxury Sailing Yacht Cruise (does NOT enter the cave)
  717754: {
    en: [
      {
        question: "Does the sailing yacht go into the Benagil cave?",
        answer:
          "No — the mast is too tall to clear the cave entrance. The sailing cruise focuses on the open coast, the golden cliffs and swim stops. If entering the cave is a must, choose the speedboat or the private Cranchi yacht.",
      },
      {
        question: "Is it private?",
        answer:
          "Yes — the yacht is yours and your group’s only, with a skipper. No shared seats.",
      },
      {
        question: "What is included?",
        answer:
          "A skipper, drinks and swim stops along the Algarve coast. See the booking page for current inclusions.",
      },
      {
        question: "Who is this cruise best for?",
        answer:
          "Anyone after a relaxed day under sail — couples, families, groups of friends and celebrations. It is the calm, scenic option rather than the fast cave run.",
      },
      {
        question: "Are there swim stops?",
        answer:
          "Yes — the skipper anchors in a sheltered spot for swimming in the clear water.",
      },
      {
        question: "Where does it depart from, and how long is it?",
        answer:
          "From Porto Comercial de Portimão. Durations vary by option — check the booking page for the cruise length that suits you.",
      },
    ],
  },
};

/** Hand-written FAQ Q&A for the given FareHarbor item PK + locale; [] when none. */
export function getTourFaqs(itemPk: number | string, locale: Locale): FaqItem[] {
  return FAQS[Number(itemPk)]?.[locale] ?? [];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run packages/atlantis/src/lib/tour-faqs.test.ts`
Expected: PASS (all 6 tests green).

- [ ] **Step 5: Commit**

```bash
git add packages/atlantis/src/lib/tour-faqs.ts packages/atlantis/src/lib/tour-faqs.test.ts
git commit -m "feat(atlantis): add per-tour FAQ data for the 3 Benagil money pages (EN)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Render the FAQ section + FAQPage schema on tour pages

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/tours/[slug].astro`

- [ ] **Step 1: Add the imports**

In `[slug].astro`, change the shared import on line 4 to also import `buildFAQPage` (append it to the existing named imports):

```ts
import { LOCALES, t, buildBreadcrumbList, buildFHEmbedUrl, parseDescription, formatPrice, buildVideoObject, truncateAtWord, optimizeImageUrl, buildFAQPage } from "@algarve-tourism/shared";
```

Add a component import alongside the other component imports (e.g. after the `ReviewsGrid` import, line 15):

```ts
import FAQ from "@algarve-tourism/shared/components/FAQ.astro";
```

Add the data import alongside the other `lib` imports (after the `getTourSeoOverride` import, line 22):

```ts
import { getTourFaqs } from "../../../lib/tour-faqs.js";
```

- [ ] **Step 2: Compute the FAQs and push the schema**

After the `const seoOverride = getTourSeoOverride(item.pk, locale);` line (line 43), add:

```ts
const faqs = getTourFaqs(item.pk, locale);
```

Then, immediately after the existing video-schema block that ends with the closing `}` of `if (tourVideo?.youtubeId && tourVideo.youtubeMetadata) { … }` (around line 140), add:

```ts
if (faqs.length > 0) {
  structuredData.push(buildFAQPage(faqs));
}
```

- [ ] **Step 3: Render the FAQ section**

In the template, inside `.product-detail__body`, immediately after the cancellation-policy block (the `{item.cancellation_policy_html && ( … )}` block ending around line 280) and before the closing `</div>` of `.product-detail__body`, add:

```astro
        {faqs.length > 0 && (
          <section>
            <h2>{t(locale, "product.faq")}</h2>
            <FAQ items={faqs} />
          </section>
        )}
```

- [ ] **Step 4: Build to verify it compiles and renders**

Run: `pnpm --filter @algarve-tourism/atlantis build`
Expected: build completes with no errors.

- [ ] **Step 5: Verify the schema + section are present in output**

Run: `grep -l "FAQPage" packages/atlantis/dist/en/tours/benagil-caves-speed-boat-tour/index.html`
Expected: the file path prints (FAQPage JSON-LD emitted). Also confirm a visible `<h2>Frequently asked questions</h2>` exists:
Run: `grep -c "Frequently asked questions" packages/atlantis/dist/en/tours/benagil-caves-speed-boat-tour/index.html`
Expected: `1` (or more).

Confirm the PT page (no FAQ yet) does NOT emit FAQPage:
Run: `grep -c "FAQPage" packages/atlantis/dist/pt/tours/circuito-de-grutas-ate-benagil/index.html`
Expected: `0`.

- [ ] **Step 6: Commit**

```bash
git add "packages/atlantis/src/pages/[locale]/tours/[slug].astro"
git commit -m "feat(atlantis): render per-tour FAQ section + FAQPage schema

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Drop "Cranchi" from the 720028 SEO titles (TDD)

**Files:**
- Modify: `packages/atlantis/src/lib/seo-overrides.ts` (item 720028, all 4 locales — title only)
- Test: `packages/atlantis/src/lib/seo-overrides.test.ts` (add a regression test)

- [ ] **Step 1: Add the failing regression test**

In `packages/atlantis/src/lib/seo-overrides.test.ts`, inside the `describe("getTourSeoOverride()", …)` block, add:

```ts
  it("720028 titles drop the boat model 'Cranchi' and include Portimão", () => {
    for (const loc of ALL_LOCALES) {
      const title = getTourSeoOverride(720028, loc)?.title ?? "";
      expect(title, `loc=${loc}`).not.toMatch(/Cranchi/i);
      expect(title, `loc=${loc}`).toMatch(/Portim[ãa]o/);
    }
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run packages/atlantis/src/lib/seo-overrides.test.ts`
Expected: FAIL — current 720028 titles contain "Cranchi" and lack "Portimão".

- [ ] **Step 3: Update the 720028 titles**

In `packages/atlantis/src/lib/seo-overrides.ts`, in the `720028:` block, replace the four `title:` lines (descriptions unchanged):

```ts
    en: {
      title: "Private Yacht Cruise to the Benagil Caves from Portimão",
```
```ts
    pt: {
      title: "Cruzeiro Privado de Iate às Grutas de Benagil — Portimão",
```
```ts
    es: {
      title: "Crucero Privado en Yate a las Cuevas de Benagil — Portimão",
```
```ts
    fr: {
      title: "Croisière Privée en Yacht aux Grottes de Benagil — Portimão",
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run packages/atlantis/src/lib/seo-overrides.test.ts`
Expected: PASS (new test green; the existing "all four money pages in all four locales" and ≤160-char tests still pass — verify the new titles are ≤160 chars; they are ~55-60).

- [ ] **Step 5: Commit**

```bash
git add packages/atlantis/src/lib/seo-overrides.ts packages/atlantis/src/lib/seo-overrides.test.ts
git commit -m "feat(seo): drop 'Cranchi' from 720028 titles, lead with search intent + Portimão

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Author the comparison blog post

**Files:**
- Create: `packages/atlantis/src/content/blog/en/benagil-speedboat-vs-yacht.md`

**Note on drafting:** the prose body should be drafted by an **Opus** subagent (per project preference for content drafts) following the outline + factual constraints below, then reviewed before merge. The frontmatter, comparison table, internal links and FAQ Q&A below are **fixed** and must be used verbatim.

- [ ] **Step 1: Create the post with exact frontmatter**

Create `packages/atlantis/src/content/blog/en/benagil-speedboat-vs-yacht.md` starting with:

```markdown
---
title: "Benagil Speed Boat vs Private Yacht: Which Tour Should You Pick?"
date: "2026-06-09"
excerpt: "Shared speedboat or a private yacht to the Benagil cave? Here's how they compare on price, privacy, what you'll see, and — crucially — which boats actually get you inside the cave."
image: "https://cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs"
imageAlt: "A small boat entering the Algar de Benagil sea cave under the natural skylight"
locale: en
translationKey: benagil-speedboat-vs-yacht
category: destinations
pillarSlug: benagil-cave-tour-complete-guide
pillarOrder: 4
tags:
  - benagil
  - boat-tours
  - comparison
  - travel-tips
author: Nuno Albino
authorBio: "Nuno Albino has skippered the Atlantis Tours boats out of Portimão since 2018, running reef fishing trips, sail charters, and Cranchi yacht days. He grew up on this coast."
authorImage: "/authors/nuno-albino.jpg"
readingTime: 7
relatedTourSlugs:
  - benagil-caves-speed-boat-tour
  - private-yacht-cruise-to-the-benagil-caves
  - private-sail-yacht-cruise
faqs:
  - question: "Is a private yacht to Benagil worth it over the shared speedboat?"
    answer: >
      It depends on what you value. The shared speedboat (from €20pp) is the fastest, cheapest way to get inside the cave and is great if the cave is your priority. A private yacht is your group only, with swim stops and room to relax — worth it for families, groups, and special occasions. Both the speedboat and the private Cranchi motor yacht enter the cave; the sail yacht does not.
  - question: "Which boats actually go inside the Benagil cave?"
    answer: >
      The shared speedboat and the private Cranchi motor yacht both enter the Algar de Benagil when sea conditions allow. The private sail yacht cannot — its mast is too tall to clear the entrance — so it focuses on the cliffs and swim stops instead.
  - question: "How much does each option cost?"
    answer: >
      The shared Benagil speedboat tour starts from €20 per person. The private yacht cruises are chartered for your group only, so they are priced per boat rather than per person — see each tour page for current pricing.
  - question: "Where do all these tours depart from?"
    answer: >
      All of them leave from Porto Comercial de Portimão (signposted “Ac. Porto Comercial de Portimão”), not Clube Naval. Your booking confirmation has the exact meeting point.
---
```

- [ ] **Step 2: Add the body (Opus-drafted to this outline + table)**

The body MUST include this comparison table verbatim (it is the factual core):

```markdown
| | Shared speed boat | Private motor yacht (Cranchi) | Private sail yacht |
|---|---|---|---|
| **From** | €20 per person | Chartered per boat | Chartered per boat |
| **Group** | Small shared group | Your group only | Your group only |
| **Enters the Benagil cave** | Yes* | Yes* | No — mast clearance |
| **On the water** | ~2 hours, fast-paced | Relaxed half-day feel | Relaxed cruise under sail |
| **Swim stops** | Brief | Yes | Yes |
| **Best for** | Budget, speed, seeing the cave, dolphins | Premium cave day, families & groups | Relaxed sailing, couples, celebrations |

\*Sea conditions permitting.
```

Body structure (Opus drafts ~600-800 words to this outline, skipper voice, accurate to the facts in the frontmatter):
1. Short intro framing the real decision (it's not "which is best" — it's "what do you want from the day").
2. The comparison table above.
3. "The shared speed boat" — who it suits, the €20 entry point, ~2h, enters the cave, dolphins.
4. "The private Cranchi yacht" — private, enters the cave, swim stops, families/groups/celebrations.
5. "The private sail yacht" — the relaxed option, does NOT enter the cave (mast clearance), cliffs + swim stops.
6. "So which should you pick?" — a short verdict mapping traveller type → option.
7. Internal links in the prose to all three tour pages and the pillar, using these exact paths:
   - `/en/tours/benagil-caves-speed-boat-tour/`
   - `/en/tours/private-yacht-cruise-to-the-benagil-caves/`
   - `/en/tours/private-sail-yacht-cruise/`
   - `/en/blog/benagil-cave-tour-complete-guide/` (the pillar)

- [ ] **Step 3: Build to verify the post compiles and emits schema**

Run: `pnpm --filter @algarve-tourism/atlantis build`
Expected: build succeeds; the route `dist/en/blog/benagil-speedboat-vs-yacht/index.html` exists.

Run: `grep -c "FAQPage" packages/atlantis/dist/en/blog/benagil-speedboat-vs-yacht/index.html`
Expected: `1`.

Verify the author resolves to a Person (both authorBio + authorImage set):
Run: `grep -o '"author":{"@type":"Person"' packages/atlantis/dist/en/blog/benagil-speedboat-vs-yacht/index.html`
Expected: prints `"author":{"@type":"Person"` (NOT Organization).

- [ ] **Step 4: Commit**

```bash
git add packages/atlantis/src/content/blog/en/benagil-speedboat-vs-yacht.md
git commit -m "feat(content): add 'Benagil speed boat vs private yacht' comparison post (EN)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Wire the comparison post into tour-page internal linking (TDD)

**Files:**
- Modify: `packages/atlantis/src/lib/tour-guides.ts`
- Test: `packages/atlantis/src/lib/tour-guides.test.ts`

- [ ] **Step 1: Update the test to expect the new guide on the 3 money pages**

In `packages/atlantis/src/lib/tour-guides.test.ts`, add this test inside the `describe` block:

```ts
  it("surfaces the speedboat-vs-yacht comparison on all three Benagil money pages", () => {
    for (const pk of [717720, 720028, 717754]) {
      expect(getTourRelatedGuides(pk), `pk=${pk}`).toContain(
        "benagil-speedboat-vs-yacht",
      );
    }
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run packages/atlantis/src/lib/tour-guides.test.ts`
Expected: FAIL — the key is not yet in `GUIDES_BY_PK`.

- [ ] **Step 3: Add the translationKey to the three PKs**

In `packages/atlantis/src/lib/tour-guides.ts`, add `"benagil-speedboat-vs-yacht"` to the arrays for `717720`, `720028`, and `717754`. Final state of those three entries:

```ts
  // Benagil Caves Speed Boat Tour (€20 entry product)
  717720: [
    "benagil-cave-complete-guide",
    "how-to-visit-benagil",
    "can-you-swim-benagil",
    "best-time-benagil",
    "dolphin-watching-algarve",
    "benagil-speedboat-vs-yacht",
  ],
  // Cranchi Yacht Cruise to the Benagil Caves (private)
  720028: [
    "benagil-cave-complete-guide",
    "benagil-vs-other-caves",
    "sunset-cruises-guide",
    "best-time-benagil",
    "benagil-speedboat-vs-yacht",
  ],
  // Luxury Sail Yacht Cruise
  717754: [
    "sunset-cruises-guide",
    "algarve-spring-secret",
    "what-to-pack-boat-tour",
    "benagil-speedboat-vs-yacht",
  ],
```

(717720 now has exactly 6 keys — the test's `≤ 6` cap; do not add more to it without removing one.)

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run packages/atlantis/src/lib/tour-guides.test.ts`
Expected: PASS (new test green; the existing 1-6 unique-keys test still passes).

- [ ] **Step 5: Commit**

```bash
git add packages/atlantis/src/lib/tour-guides.ts packages/atlantis/src/lib/tour-guides.test.ts
git commit -m "feat(atlantis): surface speedboat-vs-yacht comparison in tour 'Plan your trip'

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Add one commercial Q&A to the pillar FAQ

**Files:**
- Modify: `packages/atlantis/src/content/blog/en/benagil-cave-tour-complete-guide.md` (the `faqs:` block)

- [ ] **Step 1: Append the commercial Q&A**

In the pillar's `faqs:` list, add this entry (append after the existing last FAQ item, keeping YAML indentation consistent with the others):

```yaml
  - question: "Should I do a shared speedboat or a private yacht tour to Benagil?"
    answer: >
      If the cave is your priority and you want the cheapest fast option, the shared
      speedboat (from €20pp) enters the cave and takes about two hours. If you want
      your group only, swim stops, and a relaxed pace, go private — the Cranchi motor
      yacht also enters the cave, while the sail yacht stays outside (mast clearance)
      for a calm cruise. We break it all down in our
      <a href="/en/blog/benagil-speedboat-vs-yacht/">speed boat vs private yacht guide</a>.
```

- [ ] **Step 2: Build to verify the pillar still compiles and the link resolves**

Run: `pnpm --filter @algarve-tourism/atlantis build`
Expected: build succeeds.

Run: `grep -c "benagil-speedboat-vs-yacht" packages/atlantis/dist/en/blog/benagil-cave-tour-complete-guide/index.html`
Expected: `1` (the new FAQ answer links to the comparison post).

- [ ] **Step 3: Commit**

```bash
git add packages/atlantis/src/content/blog/en/benagil-cave-tour-complete-guide.md
git commit -m "feat(content): add speedboat-vs-yacht decision Q&A to Benagil pillar FAQ

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Full suite, full build, and changelog

**Files:**
- Modify: `GoogleAds/atlantis/06-changelog.md`

- [ ] **Step 1: Run the entire test suite**

Run: `pnpm test`
Expected: all tests pass (i18n, seo-overrides, tour-faqs, tour-guides, and any others).

- [ ] **Step 2: Run the full build (both sites via Turbo)**

Run: `pnpm build`
Expected: both packages build with no errors.

- [ ] **Step 3: Add a Google Ads changelog entry**

The 3 tour pages are paid-search landing pages, so on-page content changes are adjacent infra affecting ad performance. Prepend a new entry at the TOP of `GoogleAds/atlantis/06-changelog.md` (match the file's existing entry format — date · what · why · expected effect · verify-on). Content to record:

- **Date:** 2026-06-09
- **What:** Added per-tour FAQ sections + FAQPage schema to the 3 Benagil/yacht landing pages; published a "speed boat vs private yacht" comparison post wired into those pages; dropped "Cranchi" from the 720028 SEO title.
- **Why:** FareHarbor June SEO report + our on-page punch-list — strengthen non-brand Benagil relevance and decision-stage content; cleaner SERP titles.
- **Expected effect:** FAQ rich results eligibility on landing pages; better Quality Score relevance signals; more decision-stage internal linking.
- **Verify-on:** 2026-07-07 (GSC Rich Results + landing-page ranking/CTR).

- [ ] **Step 4: Commit**

```bash
git add GoogleAds/atlantis/06-changelog.md
git commit -m "docs(changelog): log on-page punch-list (FAQs, comparison post, title)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Canonical host fix (operator action — no code)

This is a Cloudflare zone-level change; it cannot be done from the repo (`_redirects` matches by path, not host).

- [ ] **Step 1: Create the apex→www redirect rule**

In Cloudflare → zone `atlantistours.pt` → Rules → Redirect Rules → "Create rule":
- **When incoming requests match:** `Hostname` `equals` `atlantistours.pt`
- **Then:** Type = Dynamic, Expression = `concat("https://www.atlantistours.pt", http.request.uri.path)`, Status = `301`, **Preserve query string = on**.

- [ ] **Step 2: Confirm Always Use HTTPS is on**

Cloudflare → SSL/TLS → Edge Certificates → **Always Use HTTPS** = On.

- [ ] **Step 3: Verify the redirects**

Run:
```bash
curl -sI http://atlantistours.pt/en/ | grep -i "^location\|HTTP/"
curl -sI https://atlantistours.pt/en/ | grep -i "^location\|HTTP/"
```
Expected: both return `301` with `location: https://www.atlantistours.pt/en/`.

---

## Self-Review (completed during planning)

**Spec coverage:**
- Item 1 (per-tour FAQ + schema) → Tasks 1, 2, 3 ✅
- Item 2 (comparison post + internal linking) → Tasks 5, 6 ✅
- Item 3 (drop "Cranchi" title) → Task 4 ✅
- Item 4 (canonical host fix) → Task 9 ✅
- Item 5 (pillar +1 Q&A) → Task 7 ✅
- Changelog + full verification → Task 8 ✅

**Type/name consistency:** `getTourFaqs(pk, locale): FaqItem[]` defined in Task 2, consumed in Task 3; `buildFAQPage` (existing shared export) used in Tasks 2-test, 3, 5; `product.faq` key added in Task 1, used in Task 3; translationKey `benagil-speedboat-vs-yacht` defined in Task 5 frontmatter, referenced in Tasks 6 and 7. Consistent.

**Placeholder scan:** No TBD/TODO. The only deferred authoring is the comparison-post prose (Task 5 Step 2), which is bounded by a fixed outline, a verbatim table, fixed internal-link paths, and verbatim frontmatter/FAQ — and explicitly assigned to an Opus drafting pass with review. PT/ES/FR translations of FAQs and the comparison post are intentionally a separate later pass (EN-first decision).
