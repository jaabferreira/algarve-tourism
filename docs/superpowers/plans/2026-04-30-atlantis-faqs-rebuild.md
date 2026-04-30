# Atlantis FAQs Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add hand-written, query-matched FAQ blocks to each Atlantis tour page (4 tours × 8 questions × 4 locales) with `FAQPage` schema, plus a minimal `/faq` page rewrite. Targets long-tail PAA-style queries on the highest-converting pages we control.

**Architecture:** Plain JSON content store at `packages/atlantis/src/content/faqs/` (mirrors `reviews/manual.json` pattern). Loader in `packages/atlantis/src/lib/faqs.ts` validates shape via Zod and runs a build-time completeness assertion. New `TourFAQ.astro` shared component renders a keyword-rich H2 + accordion + WhatsApp CTA. Tour page imports the loader, renders the block between cancellation and reviews sections, and adds `buildFAQPage(...)` to its `structuredData` array.

**Tech Stack:** Astro 5 (static SSR), Vitest (unit tests), Zod (JSON validation), TypeScript, pnpm + Turbo monorepo.

**Spec:** `docs/superpowers/specs/2026-04-30-atlantis-faqs-rebuild-design.md`

---

## Phase 1a — Per-tour FAQ blocks (EN-only, scaffolding + first ship)

### Task 1: Add `headingLevel` prop to `FAQ.astro`

The shared accordion component currently renders `<summary>{question}</summary>` with question text as plain inline text. We're adding a configurable heading element wrapper inside the summary so each question becomes a real H3 (or other heading) — gives Google 8 question-anchors per page in addition to the schema. Default stays `h3` so the change is non-breaking for existing usage.

**Files:**
- Modify: `packages/shared/src/components/FAQ.astro`

- [ ] **Step 1: Read the current component to anchor on its existing structure**

Run: `cat packages/shared/src/components/FAQ.astro`

Expected: file shows `interface Props { items: FAQItem[]; }` and a `<summary class="faq__question">{item.question}</summary>` line.

- [ ] **Step 2: Replace the props block to add `headingLevel`**

Open `packages/shared/src/components/FAQ.astro` and replace the frontmatter section (everything between the two `---` fences at the top) with:

```astro
---
interface FAQItem {
  question: string;
  answer: string;
}

type HeadingLevel = "h2" | "h3" | "h4";

interface Props {
  items: FAQItem[];
  headingLevel?: HeadingLevel;
}

const { items, headingLevel = "h3" } = Astro.props;
const HeadingTag = headingLevel;
---
```

- [ ] **Step 3: Wrap the question text in a dynamic heading inside the summary**

Replace the existing `<summary>` line:

```astro
<summary class="faq__question">{item.question}</summary>
```

with:

```astro
<summary class="faq__question">
  <HeadingTag class="faq__question-text">{item.question}</HeadingTag>
</summary>
```

- [ ] **Step 4: Add CSS to neutralise default heading margins inside the summary**

Inside the `<style>` block, add this rule below the existing `.faq__question` rule (before `.faq__question:hover`):

```css
.faq__question-text {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  line-height: inherit;
  letter-spacing: inherit;
}
```

This makes the `<h3>` (or other tag) visually identical to the previous plain-text rendering. Question is now semantically a heading, but visually unchanged.

- [ ] **Step 5: Build atlantis to verify nothing broke**

Run: `pnpm --filter @algarve-tourism/atlantis build`

Expected: build completes; no Astro errors; existing `/faq` page still renders with its 5 generic Qs (now wrapped in invisible h3s).

- [ ] **Step 6: Spot-check the rendered HTML**

Run: `grep -A1 "faq__question" packages/atlantis/dist/en/faq/index.html | head -10`

Expected: each question appears wrapped in `<h3 class="faq__question-text">…</h3>` inside `<summary>`.

- [ ] **Step 7: Commit**

```bash
git add packages/shared/src/components/FAQ.astro
git commit -m "feat(shared): add headingLevel prop to FAQ component

Wraps question text in a configurable heading element (default h3)
inside <summary>, so each FAQ becomes a real heading for SEO. Visual
appearance unchanged — CSS resets heading-element defaults inside the
summary class."
```

---

### Task 2: Add i18n keys for tour-page FAQ section

The new `TourFAQ.astro` component needs three localised strings: a heading prefix ("Frequently asked questions about" — concatenated with the tour name), an optional subtitle, and a CTA line. Adding keys in all 4 locales upfront so the component can be wired in Task 3 without locale gaps.

**Files:**
- Modify: `packages/shared/src/i18n/types.ts`
- Modify: `packages/shared/src/i18n/locales/en.json`
- Modify: `packages/shared/src/i18n/locales/pt.json`
- Modify: `packages/shared/src/i18n/locales/es.json`
- Modify: `packages/shared/src/i18n/locales/fr.json`

- [ ] **Step 1: Add new keys to the `TranslationStrings` interface**

In `packages/shared/src/i18n/types.ts`, find the `// About page` comment and add these three lines just above it (so they sit with the other product-related keys; the comment grouping doesn't have to be perfect, but keeping it near the end of the existing block keeps the diff readable):

```ts
  "tour.faq_heading_prefix": string;
  "tour.faq_subtitle": string;
  "tour.faq_cta": string;
```

- [ ] **Step 2: Add the EN values**

In `packages/shared/src/i18n/locales/en.json`, add these three entries near other `nav.*` / `product.*` keys (anywhere in the file is fine since JSON is unordered, but co-locate with existing product keys for readability):

```json
  "tour.faq_heading_prefix": "Frequently asked questions about",
  "tour.faq_subtitle": "Practical info, what's included, and what to expect on this tour.",
  "tour.faq_cta": "Still have questions? <a href=\"https://wa.me/351969703185\">WhatsApp us anytime</a>.",
```

Note: `tour.faq_cta` contains an inline anchor — it'll be rendered via `set:html` in the component. WhatsApp number is duplicated here from `config.social.whatsapp`; we accept this duplication because the i18n file is the natural translation surface.

- [ ] **Step 3: Add PT, ES, FR values (placeholder until reviewed in Phase 1b)**

PT (`packages/shared/src/i18n/locales/pt.json`):

```json
  "tour.faq_heading_prefix": "Perguntas frequentes sobre",
  "tour.faq_subtitle": "Informações práticas, o que está incluído e o que esperar neste passeio.",
  "tour.faq_cta": "Ainda tem dúvidas? <a href=\"https://wa.me/351969703185\">Fale connosco no WhatsApp</a>.",
```

ES (`packages/shared/src/i18n/locales/es.json`):

```json
  "tour.faq_heading_prefix": "Preguntas frecuentes sobre",
  "tour.faq_subtitle": "Información práctica, qué incluye y qué esperar en este tour.",
  "tour.faq_cta": "¿Tienes más preguntas? <a href=\"https://wa.me/351969703185\">Escríbenos por WhatsApp</a>.",
```

FR (`packages/shared/src/i18n/locales/fr.json`):

```json
  "tour.faq_heading_prefix": "Questions fréquentes sur",
  "tour.faq_subtitle": "Infos pratiques, ce qui est inclus et à quoi vous attendre pendant cette excursion.",
  "tour.faq_cta": "D'autres questions ? <a href=\"https://wa.me/351969703185\">Écrivez-nous sur WhatsApp</a>.",
```

These translations are the heading-prefix and surrounding chrome; the FAQ Q&A bodies themselves are translated separately in Phase 1b. User does a spot-check on these chrome translations during Phase 1a verification (Task 8).

- [ ] **Step 4: Verify TypeScript build**

Run: `pnpm --filter @algarve-tourism/shared exec tsc --noEmit`

If the shared package doesn't have its own tsc step, run the atlantis build instead: `pnpm --filter @algarve-tourism/atlantis build`.

Expected: no TS errors. The new keys are typed in `TranslationStrings`; all 4 locale JSONs include them, so type-narrowing succeeds.

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/i18n/types.ts packages/shared/src/i18n/locales/
git commit -m "feat(shared): add tour FAQ i18n keys (heading prefix, subtitle, CTA)

Three new keys for the per-tour FAQ section chrome: tour.faq_heading_prefix,
tour.faq_subtitle, tour.faq_cta. All 4 locales populated."
```

---

### Task 3: Create the `TourFAQ.astro` shared component

Wraps a `<section>` with the keyword-rich `<h2>` ("Frequently asked questions about <tourName>"), the optional subtitle line, the existing `<FAQ>` accordion (`headingLevel="h3"` default), and the closing WhatsApp CTA line. Stays in the `shared` package so the algarve-and-you site can reuse it later if we extend the rebuild there.

**Files:**
- Create: `packages/shared/src/components/TourFAQ.astro`

- [ ] **Step 1: Create the component file**

Write `packages/shared/src/components/TourFAQ.astro` with this content:

```astro
---
import FAQ from "./FAQ.astro";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  tourName: string;
  headingPrefix: string;
  subtitle?: string;
  ctaHtml?: string;
  items: FAQItem[];
}

const { tourName, headingPrefix, subtitle, ctaHtml, items } = Astro.props;
---

<section class="tour-faq" aria-label={`${headingPrefix} ${tourName}`}>
  <h2 class="tour-faq__heading">{headingPrefix} {tourName}</h2>
  {subtitle && <p class="tour-faq__subtitle">{subtitle}</p>}
  <div class="tour-faq__list">
    <FAQ items={items} headingLevel="h3" />
  </div>
  {ctaHtml && <p class="tour-faq__cta" set:html={ctaHtml} />}
</section>

<style>
  .tour-faq {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .tour-faq__heading {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--weight-regular);
    color: var(--color-text);
    margin: 0;
    letter-spacing: -0.01em;
  }

  .tour-faq__subtitle {
    font-size: var(--text-base);
    color: var(--color-text-muted);
    font-style: italic;
    margin: 0 0 var(--space-2);
  }

  .tour-faq__list {
    margin-top: var(--space-2);
  }

  .tour-faq__cta {
    margin-top: var(--space-4);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }

  .tour-faq__cta :global(a) {
    color: var(--color-primary);
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .tour-faq__heading {
      font-size: var(--text-2xl);
    }
  }
</style>
```

- [ ] **Step 2: Build atlantis to verify the new component imports cleanly**

Run: `pnpm --filter @algarve-tourism/atlantis build`

Expected: build completes (the component isn't used yet — Task 6 wires it in — but `astro build` will still pick up the file under `shared/src/components/` and validate it).

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/TourFAQ.astro
git commit -m "feat(shared): add TourFAQ component for per-tour FAQ blocks

Section-level wrapper with keyword-rich H2 (\"<prefix> <tourName>\"),
optional italic subtitle, FAQ accordion (h3 questions), and a CTA line
rendered via set:html so it can carry an inline anchor. Not yet used —
wired into [slug].astro in a follow-up task."
```

---

### Task 4: Create `lib/faqs.ts` with Zod validation, loader, and build-time assertion

This is the only TS module with logic worth unit-testing. Strict TDD: write the failing test first, implement, run.

**Files:**
- Create: `packages/atlantis/src/lib/faqs.ts`
- Create: `packages/atlantis/src/lib/faqs.test.ts`
- Modify: `packages/atlantis/package.json` (add `zod` dependency)

- [ ] **Step 1: Add Zod as an explicit dependency on the atlantis package**

Open `packages/atlantis/package.json` and add `"zod": "^3.25.76"` to the `dependencies` block (alphabetically between `astro` and the existing entries). Final block looks like:

```json
  "dependencies": {
    "@algarve-tourism/shared": "workspace:*",
    "@astrojs/rss": "^4.0.18",
    "@astrojs/sitemap": "^3",
    "@fontsource-variable/space-grotesk": "^5.2.5",
    "@fontsource/instrument-serif": "^5.2.5",
    "astro": "^5",
    "zod": "^3.25.76"
  }
```

Then run: `pnpm install`

Expected: lockfile updates; zod is now a direct dep (it was already installed transitively).

- [ ] **Step 2: Create a tiny test fixture file**

Create `packages/atlantis/src/lib/faqs.fixtures.ts`:

```ts
export const validFixture = {
  "717720": {
    en: Array.from({ length: 8 }, (_, i) => ({
      question: `Q${i + 1} EN`,
      answer: `A${i + 1} EN`,
    })),
    pt: Array.from({ length: 8 }, (_, i) => ({
      question: `P${i + 1} PT`,
      answer: `R${i + 1} PT`,
    })),
  },
  "717754": {
    en: Array.from({ length: 8 }, (_, i) => ({
      question: `Q${i + 1} EN sail`,
      answer: `A${i + 1} EN sail`,
    })),
  },
  "720028": {
    en: Array.from({ length: 8 }, (_, i) => ({
      question: `Q${i + 1} EN cranchi`,
      answer: `A${i + 1} EN cranchi`,
    })),
  },
  "718024": {
    en: Array.from({ length: 8 }, (_, i) => ({
      question: `Q${i + 1} EN fishing`,
      answer: `A${i + 1} EN fishing`,
    })),
  },
};
```

This fixture covers all 4 PKs in EN (passes Phase 1a validation) and the Benagil PK in PT (used to test locale fallback).

- [ ] **Step 3: Write the failing tests**

Create `packages/atlantis/src/lib/faqs.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  TourFAQsSchema,
  getTourFAQs,
  assertTourFAQCompleteness,
} from "./faqs.js";
import { validFixture } from "./faqs.fixtures.js";

describe("TourFAQsSchema", () => {
  it("accepts valid fixture", () => {
    expect(() => TourFAQsSchema.parse(validFixture)).not.toThrow();
  });

  it("rejects locale arrays with fewer than 8 items", () => {
    const bad = {
      "717720": { en: [{ question: "q", answer: "a" }] },
    };
    expect(() => TourFAQsSchema.parse(bad)).toThrow();
  });

  it("rejects locale arrays with more than 8 items", () => {
    const tooMany = Array.from({ length: 9 }, (_, i) => ({
      question: `q${i}`,
      answer: `a${i}`,
    }));
    const bad = { "717720": { en: tooMany } };
    expect(() => TourFAQsSchema.parse(bad)).toThrow();
  });

  it("rejects items with empty question or answer", () => {
    const empty = Array.from({ length: 8 }, () => ({ question: "", answer: "a" }));
    const bad = { "717720": { en: empty } };
    expect(() => TourFAQsSchema.parse(bad)).toThrow();
  });

  it("requires the en locale on every PK", () => {
    const bad = {
      "717720": { pt: Array.from({ length: 8 }, () => ({ question: "q", answer: "a" })) },
    };
    expect(() => TourFAQsSchema.parse(bad)).toThrow();
  });
});

describe("getTourFAQs", () => {
  it("returns the locale-specific items when the locale exists", () => {
    const items = getTourFAQs(validFixture, 717720, "pt");
    expect(items).toHaveLength(8);
    expect(items[0].question).toBe("P1 PT");
  });

  it("falls back to en when the requested locale is missing", () => {
    const items = getTourFAQs(validFixture, 717720, "es");
    expect(items).toHaveLength(8);
    expect(items[0].question).toBe("Q1 EN");
  });

  it("returns an empty array when the PK is unknown", () => {
    const items = getTourFAQs(validFixture, 999999, "en");
    expect(items).toEqual([]);
  });
});

describe("assertTourFAQCompleteness", () => {
  it("passes when every required PK × locale combination has 8 items", () => {
    expect(() => assertTourFAQCompleteness(validFixture, ["en"])).not.toThrow();
  });

  it("throws when a PK is missing entirely", () => {
    const incomplete = { ...validFixture };
    delete (incomplete as Record<string, unknown>)["718024"];
    expect(() => assertTourFAQCompleteness(incomplete, ["en"])).toThrow(/PK 718024/);
  });

  it("throws when a required locale is missing on a PK", () => {
    expect(() => assertTourFAQCompleteness(validFixture, ["en", "pt"])).toThrow(
      /717754.*pt/,
    );
  });
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `pnpm test -- packages/atlantis/src/lib/faqs.test.ts`

Expected: FAIL with "Cannot find module './faqs.js'" (file doesn't exist yet).

- [ ] **Step 5: Implement `lib/faqs.ts`**

Create `packages/atlantis/src/lib/faqs.ts`:

```ts
import { z } from "zod";
import type { Locale } from "@algarve-tourism/shared";
import { tourCategories } from "../config.js";

export const FAQItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type FAQItem = z.infer<typeof FAQItemSchema>;

const PerLocaleSchema = z.array(FAQItemSchema).length(8);

const PerTourSchema = z.object({
  en: PerLocaleSchema,
  pt: PerLocaleSchema.optional(),
  es: PerLocaleSchema.optional(),
  fr: PerLocaleSchema.optional(),
});

export const TourFAQsSchema = z.record(z.string(), PerTourSchema);

export type TourFAQs = z.infer<typeof TourFAQsSchema>;

export function getTourFAQs(
  data: TourFAQs,
  pk: number,
  locale: Locale,
): FAQItem[] {
  const tour = data[String(pk)];
  if (!tour) return [];
  return tour[locale] ?? tour.en;
}

export function assertTourFAQCompleteness(
  data: TourFAQs,
  requiredLocales: Locale[],
): void {
  for (const cat of tourCategories) {
    for (const pk of cat.pks) {
      const tour = data[String(pk)];
      if (!tour) {
        throw new Error(
          `[faqs] missing FAQs for PK ${pk} (category: ${cat.key})`,
        );
      }
      for (const locale of requiredLocales) {
        const items = tour[locale];
        if (!items) {
          throw new Error(
            `[faqs] missing FAQs for PK ${pk} in locale "${locale}"`,
          );
        }
        if (items.length !== 8) {
          throw new Error(
            `[faqs] PK ${pk} (${locale}) has ${items.length} items, expected 8`,
          );
        }
      }
    }
  }
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm test -- packages/atlantis/src/lib/faqs.test.ts`

Expected: PASS — all 11 tests green.

- [ ] **Step 7: Commit**

```bash
git add packages/atlantis/package.json packages/atlantis/src/lib/faqs.ts packages/atlantis/src/lib/faqs.test.ts packages/atlantis/src/lib/faqs.fixtures.ts pnpm-lock.yaml
git commit -m "feat(atlantis): FAQ loader with Zod validation + completeness assertion

Pure functions getTourFAQs (locale lookup with EN fallback) and
assertTourFAQCompleteness (configurable required-locales gate). 11
unit tests cover schema rejection, locale fallback, and missing-PK
detection. Adds zod as explicit atlantis dep."
```

---

### Task 5: Create `by-tour.json` skeleton with placeholder EN content + wire build-time assertion

We seed the JSON with valid-shape placeholder entries so Task 6 (wiring into the page) can ship and render *something* immediately. The placeholder text gets replaced with real content in Task 7 (authoring). The build-time assertion is wired in via a top-level import inside `data.ts`, which already runs at build time.

**Files:**
- Create: `packages/atlantis/src/content/faqs/by-tour.json`
- Modify: `packages/atlantis/src/lib/faqs.ts` (add the runtime import + assertion call)
- Modify: `packages/atlantis/src/data.ts` (add side-effect import to trigger the assertion)

- [ ] **Step 1: Create `by-tour.json` with placeholder shape for all 4 PKs in EN**

Write `packages/atlantis/src/content/faqs/by-tour.json`:

```json
{
  "717720": {
    "en": [
      { "question": "PLACEHOLDER Q1 — Benagil", "answer": "PLACEHOLDER A1." },
      { "question": "PLACEHOLDER Q2 — Benagil", "answer": "PLACEHOLDER A2." },
      { "question": "PLACEHOLDER Q3 — Benagil", "answer": "PLACEHOLDER A3." },
      { "question": "PLACEHOLDER Q4 — Benagil", "answer": "PLACEHOLDER A4." },
      { "question": "PLACEHOLDER Q5 — Benagil", "answer": "PLACEHOLDER A5." },
      { "question": "PLACEHOLDER Q6 — Benagil", "answer": "PLACEHOLDER A6." },
      { "question": "PLACEHOLDER Q7 — Benagil", "answer": "PLACEHOLDER A7." },
      { "question": "PLACEHOLDER Q8 — Benagil", "answer": "PLACEHOLDER A8." }
    ]
  },
  "717754": {
    "en": [
      { "question": "PLACEHOLDER Q1 — Sail Yacht", "answer": "PLACEHOLDER A1." },
      { "question": "PLACEHOLDER Q2 — Sail Yacht", "answer": "PLACEHOLDER A2." },
      { "question": "PLACEHOLDER Q3 — Sail Yacht", "answer": "PLACEHOLDER A3." },
      { "question": "PLACEHOLDER Q4 — Sail Yacht", "answer": "PLACEHOLDER A4." },
      { "question": "PLACEHOLDER Q5 — Sail Yacht", "answer": "PLACEHOLDER A5." },
      { "question": "PLACEHOLDER Q6 — Sail Yacht", "answer": "PLACEHOLDER A6." },
      { "question": "PLACEHOLDER Q7 — Sail Yacht", "answer": "PLACEHOLDER A7." },
      { "question": "PLACEHOLDER Q8 — Sail Yacht", "answer": "PLACEHOLDER A8." }
    ]
  },
  "720028": {
    "en": [
      { "question": "PLACEHOLDER Q1 — Cranchi Yacht", "answer": "PLACEHOLDER A1." },
      { "question": "PLACEHOLDER Q2 — Cranchi Yacht", "answer": "PLACEHOLDER A2." },
      { "question": "PLACEHOLDER Q3 — Cranchi Yacht", "answer": "PLACEHOLDER A3." },
      { "question": "PLACEHOLDER Q4 — Cranchi Yacht", "answer": "PLACEHOLDER A4." },
      { "question": "PLACEHOLDER Q5 — Cranchi Yacht", "answer": "PLACEHOLDER A5." },
      { "question": "PLACEHOLDER Q6 — Cranchi Yacht", "answer": "PLACEHOLDER A6." },
      { "question": "PLACEHOLDER Q7 — Cranchi Yacht", "answer": "PLACEHOLDER A7." },
      { "question": "PLACEHOLDER Q8 — Cranchi Yacht", "answer": "PLACEHOLDER A8." }
    ]
  },
  "718024": {
    "en": [
      { "question": "PLACEHOLDER Q1 — Reef Fishing", "answer": "PLACEHOLDER A1." },
      { "question": "PLACEHOLDER Q2 — Reef Fishing", "answer": "PLACEHOLDER A2." },
      { "question": "PLACEHOLDER Q3 — Reef Fishing", "answer": "PLACEHOLDER A3." },
      { "question": "PLACEHOLDER Q4 — Reef Fishing", "answer": "PLACEHOLDER A4." },
      { "question": "PLACEHOLDER Q5 — Reef Fishing", "answer": "PLACEHOLDER A5." },
      { "question": "PLACEHOLDER Q6 — Reef Fishing", "answer": "PLACEHOLDER A6." },
      { "question": "PLACEHOLDER Q7 — Reef Fishing", "answer": "PLACEHOLDER A7." },
      { "question": "PLACEHOLDER Q8 — Reef Fishing", "answer": "PLACEHOLDER A8." }
    ]
  }
}
```

- [ ] **Step 2: Add the runtime loader and assertion call in `lib/faqs.ts`**

Append to `packages/atlantis/src/lib/faqs.ts` (after the `assertTourFAQCompleteness` function):

```ts
import byTourRaw from "../content/faqs/by-tour.json" with { type: "json" };

// Locales required to be present on every PK at build time.
// Starts as ["en"] (Phase 1a) and is extended one locale at a time
// as translations land in Phase 1b. Final state: all 4 locales.
const REQUIRED_LOCALES: Locale[] = ["en"];

const validatedByTour = TourFAQsSchema.parse(byTourRaw);

assertTourFAQCompleteness(validatedByTour, REQUIRED_LOCALES);

export function loadTourFAQs(pk: number, locale: Locale): FAQItem[] {
  return getTourFAQs(validatedByTour, pk, locale);
}
```

The Zod parse + assertion run at module-import time. Any tour page importing `loadTourFAQs` triggers the validation; broken JSON or missing data fails the build.

- [ ] **Step 3: Add a side-effect import in `data.ts`**

`data.ts` is already imported at build time by every tour page and the tours index. Adding a side-effect import to `lib/faqs.ts` here guarantees the assertion runs *even if the page-level import is forgotten or removed*.

Open `packages/atlantis/src/data.ts` and add this line near the top, after the existing imports:

```ts
import "./lib/faqs.js"; // side-effect: validates by-tour.json at build time
```

- [ ] **Step 4: Build atlantis to verify the assertion passes on the placeholder data**

Run: `pnpm --filter @algarve-tourism/atlantis build`

Expected: build completes; no `[faqs]` errors. (If the assertion catches missing entries, the build fails with a clear `[faqs] missing FAQs for PK …` message.)

- [ ] **Step 5: Verify the assertion bites by temporarily breaking the data**

Edit `by-tour.json` and remove the last item from PK 717720's `en` array (so length is 7 instead of 8). Run:

```bash
pnpm --filter @algarve-tourism/atlantis build
```

Expected: build fails with a Zod error about array length, OR a `[faqs] PK 717720 (en) has 7 items, expected 8` error.

Restore the eighth item.

- [ ] **Step 6: Commit**

```bash
git add packages/atlantis/src/content/faqs/by-tour.json packages/atlantis/src/lib/faqs.ts packages/atlantis/src/data.ts
git commit -m "feat(atlantis): seed by-tour.json + wire build-time validation

Skeleton FAQ JSON with placeholder content for all 4 tour PKs in EN.
Zod schema validates shape on import; assertTourFAQCompleteness runs
against REQUIRED_LOCALES_PHASE_1A (en only) so EN can ship before
PT/ES/FR translations land. Side-effect import in data.ts guarantees
the check runs at build time even if the page-level import is removed."
```

---

### Task 6: Wire `<TourFAQ>` into the tour page + emit `FAQPage` schema

Renders the FAQ block between cancellation policy and reviews. Adds the schema entry. Page still works for any locale missing an FAQ (falls back to EN via `getTourFAQs`'s fallback path), so PT/ES/FR pages render the EN content until Phase 1b lands — better than no FAQ at all.

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/tours/[slug].astro`

- [ ] **Step 1: Add the imports**

Open `packages/atlantis/src/pages/[locale]/tours/[slug].astro` and add these imports at the top of the frontmatter section, near the other shared imports (after the `MeetingPointMap` import line):

```astro
import TourFAQ from "@algarve-tourism/shared/components/TourFAQ.astro";
import { loadTourFAQs } from "../../../lib/faqs.js";
```

Also extend the existing `parseDescription, formatPrice, buildVideoObject` import from `@algarve-tourism/shared` to include `buildFAQPage`:

```astro
import { LOCALES, t, buildBreadcrumbList, parseDescription, formatPrice, buildVideoObject, buildFAQPage } from "@algarve-tourism/shared";
```

- [ ] **Step 2: Load the FAQs in the frontmatter**

In the same frontmatter section, after the existing `const tourVideo = getTourVideo(item.pk);` line, add:

```astro
const tourFAQs = loadTourFAQs(item.pk, locale);
```

- [ ] **Step 3: Push `FAQPage` schema into `structuredData`**

The existing block builds `structuredData` after the breadcrumb. Find the line:

```astro
const structuredData: object[] = [productData, breadcrumbData];
```

and after the existing `if (tourVideo?.youtubeId && tourVideo.youtubeMetadata) { … }` block (which adds the VideoObject), add:

```astro
if (tourFAQs.length > 0) {
  structuredData.push(buildFAQPage(tourFAQs));
}
```

- [ ] **Step 4: Render `<TourFAQ>` in the markup, between cancellation and reviews**

Find the existing cancellation block:

```astro
        {item.cancellation_policy_html && (
          <section>
            <h3>{t(locale, "product.cancellation")}</h3>
            <div set:html={item.cancellation_policy_html} />
          </section>
        )}
      </div>
```

Note: the closing `</div>` here ends `product-detail__body` (the left column). The reviews section sits *outside* that grid (it's a sibling of `.product-detail__content`, not a child of `__body`). The FAQ block should sit at the **end of `product-detail__body`** — after cancellation, still inside the left column — so it sits inline with the rest of the content above the (full-width) reviews section. This matches placement A from the design.

Replace the cancellation block with this expanded version (cancellation unchanged; FAQ added after it, still inside `__body`):

```astro
        {item.cancellation_policy_html && (
          <section>
            <h3>{t(locale, "product.cancellation")}</h3>
            <div set:html={item.cancellation_policy_html} />
          </section>
        )}

        {tourFAQs.length > 0 && (
          <TourFAQ
            tourName={item.name}
            headingPrefix={t(locale, "tour.faq_heading_prefix")}
            subtitle={t(locale, "tour.faq_subtitle")}
            ctaHtml={t(locale, "tour.faq_cta")}
            items={tourFAQs}
          />
        )}
      </div>
```

- [ ] **Step 5: Build to verify the page still renders**

Run: `pnpm --filter @algarve-tourism/atlantis build`

Expected: build completes; tour pages emit successfully.

- [ ] **Step 6: Verify the FAQ block renders + schema is emitted**

Run: `grep -A2 "tour-faq__heading" packages/atlantis/dist/en/tours/benagil-caves-speed-boat-tour/index.html | head -5`

Expected: heading appears in the output (e.g., `Frequently asked questions about Benagil Caves Speed Boat Tour`).

Run: `grep -A1 '"@type":"FAQPage"' packages/atlantis/dist/en/tours/benagil-caves-speed-boat-tour/index.html | head -3`

Expected: `FAQPage` JSON-LD is present in the rendered head, alongside the existing `Product` and `BreadcrumbList` schemas.

- [ ] **Step 7: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/tours/[slug].astro
git commit -m "feat(atlantis): render TourFAQ block on tour pages + emit FAQPage schema

Per-tour FAQ accordion sits between cancellation and reviews (placement A
from spec). FAQPage JSON-LD is added alongside existing Product /
BreadcrumbList / VideoObject schema. Falls back to EN content for
locales without translated FAQs (PT/ES/FR fall through until Phase 1b)."
```

---

### Task 7: Author real EN FAQ content for all 4 tours

Replaces the 32 placeholder Q&As in `by-tour.json` with hand-written, query-matched content. Collaborative loop with the user; not a code-only step.

**Files:**
- Modify: `packages/atlantis/src/content/faqs/by-tour.json`

**Source material to draw from:**
- `docs/ads/atlantis/02-campaigns/benagil/keywords-and-rsa.md` (Benagil keywords)
- `docs/ads/atlantis/02-campaigns/cranchi-yacht/keywords-and-rsa.md`
- `docs/ads/atlantis/02-campaigns/sail-yacht/keywords-and-rsa.md`
- `docs/ads/atlantis/02-campaigns/reef-fishing/keywords-and-rsa.md`
- `docs/ads/atlantis/02-campaigns/algarve-generic/keywords-and-rsa.md` (cross-tour query patterns)
- The tour's own `description_html` (loaded via `loadItems`) — for factual cross-checking

- [ ] **Step 1: Draft 32 EN questions + answers**

Write 8 question/answer pairs per tour PK, replacing each placeholder entry. Constraints from the spec:

- **Question phrasings must match real PAA/long-tail query patterns.** Lead with question words ("How", "Can", "What", "Where", "When", "Is", "Do", "Will"). Include the tour's primary keyword in the question itself ("Benagil cave tour", "yacht charter Portimão", "reef fishing Algarve").
- **Answer length 40-80 words.** Long enough to actually answer + include secondary keywords; short enough for an accordion.
- **Answers may contain inline `<a>`, `<strong>`, `<em>`, and `\n` for line breaks.** No other HTML.
- **Cross-check every factual claim against the tour's `description_html`.** Especially: durations, prices ("from €X" — get from `item.price_from_including_tax`), departure point, included items, age/restrictions, cancellation specifics. If a claim isn't supported by FH data or the existing copy, flag it for the user.
- **Cover the 6 must-answer categories per tour:** price/included, duration, departure point, kids/age, weather policy, what to bring/wear. The remaining 2 are tour-specific (e.g., for Benagil: "Can you swim inside?" and "Best time of day?"; for yachts: "Catering included?" and "Group size?"; for fishing: "Equipment provided?" and "Best season?").
- **Order matters for SEO.** First question gets the most engagement weight — make it the highest-volume seed query for that tour ("How long is the Benagil cave tour from Portimão?", "How much is a private yacht charter in Portimão?", "What can you catch on a reef fishing trip in Algarve?").
- **Flag low-confidence questions.** Add a JSON comment-style marker `[CONFIDENCE: low]` at the end of any question Claude is <70% confident matches a real PAA query, so the user's PAA mining pass focuses there. Remove markers before final commit.

Sample drafted entry (Benagil PK 717720, item 1) to anchor the style:

```json
{
  "question": "How long is the Benagil cave tour from Portimão?",
  "answer": "The full Benagil cave tour from Marina de Portimão runs about 1 hour 30 minutes door-to-door — roughly 25 minutes by speedboat to Benagil, 30 minutes exploring the famous Benagil cave plus 4 nearby sea caves (Cathedral, Captain's, Carvalho), then 25 minutes back. Sea conditions can shift the timing by a few minutes either way."
}
```

Write all 32 entries directly into `by-tour.json`, replacing the placeholders. Keep the same key order (PK → en → array) so build validation continues to pass.

- [ ] **Step 2: User does manual PAA mining (~20 min)**

Hand control to the user. They run incognito Google.com searches (location set to Portugal) on these seed queries and copy the *People Also Ask* questions they see:

- `benagil cave tour`
- `boat tour algarve`
- `yacht charter portimão`
- `private yacht algarve`
- `reef fishing algarve`
- `boat trip portimão`
- `benagil from carvoeiro`

Plus 1-2 of Claude's `[CONFIDENCE: low]`-flagged questions (search the question itself, see what PAA Google shows — that's the "real" version of the question).

User pastes the PAA list back into chat.

- [ ] **Step 3: Refine drafts to match real PAA phrasings**

For each PAA question that's close to one of Claude's drafts but phrased differently, swap the draft's wording for the real PAA wording. Common gotchas:

- "How much is …" vs "How much does … cost" — Google often prefers the second.
- "Can you swim …" vs "Is swimming allowed …" — both occur; pick whichever matches the user's PAA.
- Plural vs singular: "yachts" vs "yacht charter" — match the dominant form in PAA.
- Definite article placement: "the Benagil cave tour" vs "Benagil cave tour" — match what Google's PAA uses.

Update `by-tour.json` with the refined questions. Keep the answers (those are factual, PAA-mining doesn't change them).

- [ ] **Step 4: User factually reviews all 32 EN Q&As**

User reads through each Q&A and flags anything that's wrong on facts. Common things to verify:

- Durations match `description_html` and the FH item duration.
- Prices match current `price_from_including_tax`.
- Departure point matches `item.location.address`.
- Cancellation matches `item.cancellation_policy_html`.
- Age/accessibility matches `parseDescription(item.description_html).restrictions` and `.accessibility`.
- Inclusions (drinks, snacks, equipment) match the tour's actual inclusions.

Claude fixes flagged items.

- [ ] **Step 5: Build to confirm the JSON still validates**

Run: `pnpm --filter @algarve-tourism/atlantis build`

Expected: build passes; assertion stays green; tour pages now render real questions instead of `PLACEHOLDER Q1`.

- [ ] **Step 6: Commit**

```bash
git add packages/atlantis/src/content/faqs/by-tour.json
git commit -m "content(atlantis): author 32 EN FAQ Q&As for all 4 tour pages

8 questions per tour, query-matched against PAA mining and Ads keyword
research. Factual claims cross-checked against FareHarbor item data
(duration, price, departure point, cancellation, age restrictions)."
```

---

### Task 8: Visual + Lighthouse + schema validation, then deploy Phase 1a

Manual verification before shipping the EN-only PR.

**Files:** none (verification only).

- [ ] **Step 1: Run dev server and visually inspect each tour page**

Run: `pnpm dev:atlantis`

Open in browser:
- `http://localhost:4321/en/tours/benagil-caves-speed-boat-tour/`
- `http://localhost:4321/en/tours/cranchi-yacht-cruise-to-the-benagil-caves/`
- `http://localhost:4321/en/tours/private-veleiro-tour/` (or whatever the sail yacht slug is — check `loadItems('en')`)
- `http://localhost:4321/en/tours/reef-fishing-portimao/`

Verify on each:
- FAQ section appears between cancellation policy and reviews.
- H2 reads "Frequently asked questions about <full tour name>".
- Italic subtitle line below.
- 8 questions, all collapsed by default.
- Each question opens to reveal an answer that matches the FH data.
- WhatsApp CTA line at the bottom of the section, underlined link.
- Mobile (<768px viewport): heading drops to 2xl size; layout reflows correctly; FAQ doesn't push the booking widget around.

- [ ] **Step 2: Verify FAQPage schema in Google Rich Results Test**

Run a production build: `pnpm --filter @algarve-tourism/atlantis build`. Open the generated HTML for one tour:

```bash
grep -o '"@type":"FAQPage"[^]]*' packages/atlantis/dist/en/tours/benagil-caves-speed-boat-tour/index.html | head -1
```

Expected: a fragment of valid JSON-LD with `@type: "FAQPage"` and `mainEntity` array of 8 questions.

Then deploy to a preview URL (push to a branch, let CF Pages build a preview), grab the preview URL, paste it into <https://search.google.com/test/rich-results>. Expected: tool reports "Page is eligible for FAQ rich results" with all 8 questions detected. (Eligibility ≠ stars in SERPs — Google still gates the visual treatment to authority sites.)

- [ ] **Step 3: Lighthouse on Benagil page**

In Chrome DevTools, run Lighthouse (Mobile profile, Performance + SEO + Accessibility) on `http://localhost:4321/en/tours/benagil-caves-speed-boat-tour/`.

Compare against the pre-FAQ baseline (commit before this PR — the user can spin up an old build for comparison if they want). Expected: SEO score = 100 (FAQ adds H2/H3 structure, links, alt text already in place); Performance score unchanged or +1 (FAQ is collapsed, no extra JS); CLS unchanged (no layout shift from the accordion).

If Performance dropped >2 points or CLS regressed, debug before shipping.

- [ ] **Step 4: All-tests check**

Run: `pnpm test`

Expected: all tests pass (the new `faqs.test.ts` plus the existing 7 test files).

- [ ] **Step 5: Push & deploy**

User decides: push direct to `master` (per the user's stated preference for urgent fixes — see memory `feedback_deploy_directly.md`) or open a PR for review. Push:

```bash
git push origin master
```

Cloudflare Pages auto-deploys. Watch the build log; verify the deploy succeeds.

- [ ] **Step 6: Log the change in the Ads changelog**

Open `docs/ads/atlantis/06-changelog.md` and prepend a new entry at the top:

```markdown
## 2026-04-30 — Per-tour FAQ blocks shipped (EN)

**What:** Added 8-question FAQ accordion to each of the 4 tour pages
(Benagil, Cranchi yacht, Sail yacht, reef fishing) with FAQPage schema.
EN only — PT/ES/FR translations follow in Phase 1b.

**Why:** Capture long-tail PAA-style queries on the highest-converting
pages we control; build topical depth around each tour's primary
keyword.

**Expected effect:** Within 4-8 weeks, GSC should show ≥8 of the 32 EN
question-style queries with avg position ≤ 20 (currently nothing on
those exact phrasings).

**Verify on:** 2026-05-28 (4-week check), 2026-06-25 (8-week check).
```

Commit:

```bash
git add docs/ads/atlantis/06-changelog.md
git commit -m "docs(ads): log Phase 1a FAQ-blocks ship to changelog

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin master
```

---

## Phase 1b — Translations (PT, ES, FR)

Each locale ships in its own task so reviews stay manageable. Sonnet drafts → user spot-checks → fix flagged items → tighten validation only after all three locales have shipped.

### Task 9: Translate FAQs to Portuguese (PT)

**Files:**
- Modify: `packages/atlantis/src/content/faqs/by-tour.json`

- [ ] **Step 1: Generate PT drafts for all 32 Q&As**

Use Sonnet (per memory `feedback_opus_for_writing.md` — Sonnet is fine for translations). Pass the 32 EN Q&As + this instruction:

> Translate these 32 boat-tour FAQ Q&As from English to Portuguese (European/PT-PT, not Brazilian Portuguese). Match local search-query style — Portuguese speakers searching for boat tours typically use phrasings like "passeio de barco", "circuito grutas", "passeio até Benagil". Don't translate literally — translate as a Portuguese speaker would *search* for the same answer. Keep answers within the 40-80 word band of the EN source. Keep any inline `<a>`, `<strong>`, `<em>` tags. Tone: same as the existing PT tour-page descriptions (already in `packages/shared/data/atlantistours.pt.json`).

Insert the resulting 32 entries under each PK's `pt` key in `by-tour.json`, parallel order to `en`:

```json
"717720": {
  "en": [ /* unchanged */ ],
  "pt": [
    { "question": "Quanto tempo dura o passeio às grutas de Benagil de Portimão?", "answer": "..." },
    ...
  ]
}
```

- [ ] **Step 2: User spot-checks PT (highest-stakes pass — native reader)**

Hand control to the user. They read all 32 PT Q&As and flag:
- Anything that reads stiff or AI-translated.
- Vocabulary that doesn't match how PT speakers actually search (e.g., "barco" vs "lancha" vs "embarcação" — match what's used on the live PT tour pages).
- Wrong terminology for FH/yacht/fishing concepts.

Claude fixes flagged items.

- [ ] **Step 3: Extend `REQUIRED_LOCALES` to include `pt`**

In `packages/atlantis/src/lib/faqs.ts`, change:

```ts
const REQUIRED_LOCALES: Locale[] = ["en"];
```

to:

```ts
const REQUIRED_LOCALES: Locale[] = ["en", "pt"];
```

Run: `pnpm --filter @algarve-tourism/atlantis build`

Expected: passes. From this commit forward, the build fails if any tour PK is missing PT FAQs. ES/FR remain optional until Tasks 10/11.

- [ ] **Step 4: Visual check on PT pages**

Run dev server, open `http://localhost:4321/pt/tours/<slug>/` for each tour. Verify the FAQ block reads naturally. Check the `tour.faq_heading_prefix` ("Perguntas frequentes sobre") concatenates cleanly with the PT tour name.

- [ ] **Step 5: Commit & ship**

```bash
git add packages/atlantis/src/content/faqs/by-tour.json packages/atlantis/src/lib/faqs.ts
git commit -m "content(atlantis): PT translations for 32 tour FAQs

Tightens REQUIRED_LOCALES to ['en', 'pt']; build now fails if any
tour PK is missing PT FAQs."
git push origin master
```

---

### Task 10: Translate FAQs to Spanish (ES)

Same workflow as Task 9 but for ES.

**Files:**
- Modify: `packages/atlantis/src/content/faqs/by-tour.json`

- [ ] **Step 1: Generate ES drafts**

Sonnet prompt:

> Translate the 32 boat-tour FAQ Q&As from English to Spanish (Castilian Spanish, the default that English-speaking tourists from Spain or Spanish-speaking visitors abroad will search in). Match local search-query patterns — Spanish speakers typically use "paseo en barco", "tour en barco", "excursión en barco", "alquiler de yate". Don't translate literally — translate as a Spanish speaker would *search* for the same answer. Same length band, same inline-HTML rules.

Insert the 32 entries under each PK's `es` key.

- [ ] **Step 2: User spot-checks ES**

Skim for tone, terminology, search-style phrasings. Flag, fix.

- [ ] **Step 3: Extend `REQUIRED_LOCALES` to include `es`**

In `packages/atlantis/src/lib/faqs.ts`, change:

```ts
const REQUIRED_LOCALES: Locale[] = ["en", "pt"];
```

to:

```ts
const REQUIRED_LOCALES: Locale[] = ["en", "pt", "es"];
```

Run: `pnpm --filter @algarve-tourism/atlantis build`

Expected: passes. ES is now mandatory; FR remains optional until Task 11.

- [ ] **Step 4: Visual check + commit**

```bash
pnpm dev:atlantis  # spot-check /es/tours/<slug>/ pages
git add packages/atlantis/src/content/faqs/by-tour.json packages/atlantis/src/lib/faqs.ts
git commit -m "content(atlantis): ES translations for 32 tour FAQs

Tightens REQUIRED_LOCALES to ['en', 'pt', 'es']; build now fails if any
tour PK is missing ES FAQs."
git push origin master
```

---

### Task 11: Translate FAQs to French (FR)

Same workflow.

**Files:**
- Modify: `packages/atlantis/src/content/faqs/by-tour.json`

- [ ] **Step 1: Generate FR drafts**

Sonnet prompt:

> Translate the 32 boat-tour FAQ Q&As from English to French (French French, the dominant variant English-speaking tourists from France or French-speaking visitors will search in). Match local search-query patterns — French speakers typically use "excursion en bateau", "tour en bateau", "balade en bateau", "location de yacht". Don't translate literally — translate as a French speaker would *search* for the same answer. Same length band, same inline-HTML rules.

Insert under each PK's `fr` key.

- [ ] **Step 2: User spot-checks FR**

Skim for tone, terminology, search-style phrasings. Flag, fix.

- [ ] **Step 3: Extend `REQUIRED_LOCALES` to include `fr` (final state — all 4 locales)**

In `packages/atlantis/src/lib/faqs.ts`, change:

```ts
const REQUIRED_LOCALES: Locale[] = ["en", "pt", "es"];
```

to:

```ts
const REQUIRED_LOCALES: Locale[] = ["en", "pt", "es", "fr"];
```

Run: `pnpm --filter @algarve-tourism/atlantis build`

Expected: passes. All 4 locales are now mandatory.

- [ ] **Step 4: Sanity-check the assertion bites**

Temporarily delete the last item from PK 720028's `fr` array in `by-tour.json` (so length is 7). Run:

```bash
pnpm --filter @algarve-tourism/atlantis build
```

Expected: build fails with a Zod error about array length, or `[faqs] PK 720028 (fr) has 7 items, expected 8`. Restore the entry.

- [ ] **Step 5: Commit & ship**

```bash
pnpm dev:atlantis  # spot-check /fr/tours/<slug>/ pages
git add packages/atlantis/src/content/faqs/by-tour.json packages/atlantis/src/lib/faqs.ts
git commit -m "content(atlantis): FR translations for 32 tour FAQs

Tightens REQUIRED_LOCALES to all 4 locales (en, pt, es, fr). Phase 1b
complete — build fails if any tour PK is missing any locale's FAQs."
git push origin master
```

- [ ] **Step 6: Log Phase 1b ship in changelog**

Append entry to top of `docs/ads/atlantis/06-changelog.md`:

```markdown
## 2026-XX-XX — Per-tour FAQ translations shipped (PT/ES/FR)

**What:** Translated all 32 EN FAQ Q&As into PT/ES/FR; tightened build
validation to require all 4 locales on every PK.

**Why:** Cover non-EN search markets (PT/ES/FR speakers in or planning
to visit Algarve).

**Expected effect:** Marginal additional impressions on PT/ES/FR
question-style queries; sailing past the EN-only baseline.

**Verify on:** 6 weeks after this date.
```

Replace `XX-XX` with the actual ship date. Commit and push.

---

## Phase 1c — `/faq` page minimal rewrite

Replaces the 5 generic Qs with 10 cross-tour generic Qs whose answers internal-link into the relevant tour pages.

### Task 12: Author 10 generic EN Qs + translate to all 4 locales

**Files:**
- Create: `packages/atlantis/src/content/faqs/general.json`
- Modify: `packages/atlantis/src/lib/faqs.ts` (add `loadGeneralFAQs` + assertion)

- [ ] **Step 1: Draft 10 generic EN Q&As**

These must be **truly cross-tour** — no question whose answer is "depends on which tour". Suggested topics (final wording set during authoring):

1. "How do I book a boat tour with Atlantis Tours?" — booking flow, FH lightframe, confirmation.
2. "Where do all your tours depart from?" — Marina de Portimão; cross-link to each tour page for exact meeting point.
3. "Are your skippers English-speaking?" — yes; multilingual.
4. "What's your cancellation policy across all tours?" — generic policy; link to `/cancellation-policy/`.
5. "How do I pay? Do I pay online or on the day?" — FH payment options.
6. "What happens if the weather is bad?" — generic safety policy.
7. "Can I bring my own food and drinks on board?" — yacht (yes), speedboat (limited).
8. "Are children welcome on Atlantis Tours?" — most tours yes; cross-link to tour pages with age restrictions.
9. "Do you do private group bookings (hen, stag, weddings)?" — yes; cross-link to yacht tours.
10. "How far in advance should I book?" — depends on season; link to availability.

Each answer should end with at least one internal anchor pointing into the relevant tour page or page (e.g., `[the Benagil tour](/en/tours/benagil-caves-speed-boat-tour/)`). This pumps internal-link authority into the tour pages.

Length 50-90 words (slightly longer than per-tour FAQs because they're top-of-funnel and link into deeper pages).

- [ ] **Step 2: Translate to PT/ES/FR via Sonnet**

Same workflow as Tasks 9-11: Sonnet drafts, user spot-checks, fix flagged items.

- [ ] **Step 3: Write `general.json`**

Create `packages/atlantis/src/content/faqs/general.json`:

```json
{
  "en": [
    { "question": "...", "answer": "..." }
  ],
  "pt": [ /* 10 entries */ ],
  "es": [ /* 10 entries */ ],
  "fr": [ /* 10 entries */ ]
}
```

(Replace the comment placeholders with the actual 10×4=40 entries.)

- [ ] **Step 4: Add the loader + assertion to `lib/faqs.ts`**

Append to `packages/atlantis/src/lib/faqs.ts`:

```ts
import generalRaw from "../content/faqs/general.json" with { type: "json" };

const PerLocaleGeneralSchema = z.array(FAQItemSchema).length(10);

export const GeneralFAQsSchema = z.object({
  en: PerLocaleGeneralSchema,
  pt: PerLocaleGeneralSchema,
  es: PerLocaleGeneralSchema,
  fr: PerLocaleGeneralSchema,
});

export type GeneralFAQs = z.infer<typeof GeneralFAQsSchema>;

const validatedGeneral = GeneralFAQsSchema.parse(generalRaw);

export function loadGeneralFAQs(locale: Locale): FAQItem[] {
  return validatedGeneral[locale];
}
```

The Zod schema enforces "all 4 locales × 10 items each" at parse time — no separate assertion function needed.

- [ ] **Step 5: Build to verify**

Run: `pnpm --filter @algarve-tourism/atlantis build`

Expected: build passes. If any locale is missing or any locale array doesn't have exactly 10 items, build fails with a Zod error.

- [ ] **Step 6: Commit**

```bash
git add packages/atlantis/src/content/faqs/general.json packages/atlantis/src/lib/faqs.ts
git commit -m "content(atlantis): 10 cross-tour generic FAQs in all 4 locales

New general.json + loadGeneralFAQs loader. Each answer internal-links
into the relevant tour page(s) to pump authority downward. Zod schema
enforces all 4 locales × 10 items each at parse time."
```

---

### Task 13: Refactor `faq.astro` to read from `general.json`

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/faq.astro`

- [ ] **Step 1: Read the current page to anchor on its structure**

Run: `cat packages/atlantis/src/pages/[locale]/faq.astro`

Expected: see the inlined `faqByLocale` object with 5 generic Qs × 4 locales.

- [ ] **Step 2: Replace the inlined data with the loader call**

In `packages/atlantis/src/pages/[locale]/faq.astro`, replace the entire `faqByLocale` constant block + `faqItems` line:

```astro
const faqByLocale: Record<string, { question: string; answer: string }[]> = {
  en: [ ... ],
  pt: [ ... ],
  es: [ ... ],
  fr: [ ... ],
};
const faqItems = faqByLocale[locale] ?? faqByLocale.en;
```

with:

```astro
import { loadGeneralFAQs } from "../../lib/faqs.js";
// ...
const faqItems = loadGeneralFAQs(locale);
```

(Move the `import` to the top imports block, leave the `loadGeneralFAQs(locale)` call where `faqItems` was defined.)

- [ ] **Step 3: Build & visually verify**

Run: `pnpm --filter @algarve-tourism/atlantis build` and `pnpm dev:atlantis`.

Open each locale's `/faq` page:
- `http://localhost:4321/en/faq/`
- `http://localhost:4321/pt/faq/`
- `http://localhost:4321/es/faq/`
- `http://localhost:4321/fr/faq/`

Verify each shows 10 generic questions, all collapsed, with answers containing inline links into tour pages. Click each internal link; verify it resolves to the right tour page in the right locale.

- [ ] **Step 4: Verify FAQPage schema is still emitted**

Run: `grep -c '"@type":"FAQPage"' packages/atlantis/dist/en/faq/index.html`

Expected: `1` — the existing `buildFAQPage(faqItems)` call still works because `loadGeneralFAQs` returns the same `FAQItem[]` shape.

- [ ] **Step 5: Commit & ship**

```bash
git add packages/atlantis/src/pages/[locale]/faq.astro
git commit -m "feat(atlantis): /faq page reads from general.json

Replaces the inlined 5-question faqByLocale block with loadGeneralFAQs.
All 4 locales now show 10 cross-tour generic questions, each answer
internal-linking into the relevant tour pages."
git push origin master
```

- [ ] **Step 6: Log Phase 1c ship in changelog**

Append entry at top of `docs/ads/atlantis/06-changelog.md`:

```markdown
## 2026-XX-XX — /faq page minimal rewrite

**What:** Replaced the 5 generic Qs on /faq with 10 cross-tour generic Qs
in all 4 locales. Each answer internal-links into a tour page.

**Why:** Stop the thin /faq page from dragging on SEO; pump internal-link
authority into the tour pages where it converts.

**Expected effect:** Mild lift on /faq's own ranking signal + measurable
internal-link authority into tour pages. Phase 2 hub rebuild deferred
until Phase 1 has 8 weeks of ranking data.

**Verify on:** 6-8 weeks after this date.
```

Commit and push.

---

## Done

After Task 13, all of Phase 1 is shipped:
- 4 tour pages × 8 query-matched FAQs × 4 locales = 128 Q&As live with `FAQPage` schema.
- `/faq` page running 10 cross-tour generic Qs in all 4 locales with internal links into tour pages.
- Build-time validation enforces locale completeness; partial-translation regressions fail CI.

Phase 2 (full topic-cluster `/faq` hub with category sub-pages) is a separate spec — write it after 4-8 weeks of ranking data on Phase 1.
