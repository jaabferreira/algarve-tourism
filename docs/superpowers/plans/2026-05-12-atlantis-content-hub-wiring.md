# Atlantis Content-Hub Site Wiring — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the Atlantis site so the Benagil content hub's structure is visible to readers and crawlers — pillar↔cluster breadcrumbs, a "Part of the … guide" callout, a pillar "In this guide" cluster list, FAQ schema + a FAQ block on guide posts, and a tour→guide "Plan your trip" block — **without moving any URLs** (the hub stays under `/blog/`).

**Architecture:** Two new optional blog-frontmatter fields (`pillarSlug`, `pillarOrder`, plus a `faqs` array). A pure breadcrumb helper in `packages/shared` that returns `Home › <pillar> › <post>` for hub posts and the existing `Home › Blog › <category> › <post>` otherwise. Four small shared components (`PillarCallout`, `HubClusterList`, `FaqBlock`, `RelatedGuides`). A per-tour `getTourRelatedGuides()` lookup in `packages/atlantis/src/lib/` modelled on the existing `seo-overrides.ts`. Then template edits to `blog/[slug].astro`, `tours/[slug].astro`, `blog/index.astro`, and the homepage. The pure functions are TDD'd; the schema/i18n/template changes are verified by `npm run build` + inspecting `dist/`.

**Tech Stack:** Astro 5 (content collections, static build), TypeScript, Zod, Vitest, the monorepo's `packages/shared` (i18n `t()`, `structured-data.ts` JSON-LD builders, `.astro` components), Turborepo.

**Out of scope (do NOT do here):**
- Rewriting/expanding any blog post or writing the 3 new posts (`how-to-visit-benagil-cave`, `can-you-swim-benagil-cave`, `benagil-cave-tour-with-kids`) — that's the `content-brief-authoring` + Opus workstream; this plan ships the wiring and it degrades gracefully until those posts exist.
- The `/benagil-cave-guide/` URL migration — deliberately deferred (see `SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` §3).
- Algarve & You — the hub is Atlantis-only; keep `packages/shared` changes generic but don't wire A&Y pages.
- Tour-page FAQ machinery from the `feat/atlantis-faqs-rebuild` branch — independent; our blog `faqs` field uses the already-exported `buildFAQPage` builder and a new component, no conflict.

**Reference docs:** `SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` (the architecture — pillar, clusters, link graph, page anatomies) and `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` (the link inventory; §4e is the tour→guide map used in Task 4).

**Run commands (from repo root `/home/jferreira/Work/projects/algarve-and-you-new`):**
- Tests: `npm test -- <path>` (Vitest, single root `vitest.config.ts`) — e.g. `npm test -- packages/shared/src/seo/breadcrumbs.test.ts`
- Build everything: `npm run build` (turbo) · build just Atlantis: `cd packages/atlantis && npm run build` (writes `packages/atlantis/dist/`)
- The blog content schema lives at `packages/atlantis/src/content/config.ts`; the blog post pages at `packages/atlantis/src/pages/[locale]/blog/[slug].astro`.

---

## File structure (what gets created / modified)

**Created:**
- `packages/shared/src/seo/breadcrumbs.ts` — pure `buildPostBreadcrumb()` helper.
- `packages/shared/src/seo/breadcrumbs.test.ts` — its tests.
- `packages/shared/src/components/PillarCallout.astro` — "Part of our [pillar] guide" link, top of cluster posts.
- `packages/shared/src/components/HubClusterList.astro` — "In this guide" cluster list, on the pillar.
- `packages/shared/src/components/FaqBlock.astro` — visible FAQ `<details>` list for guide posts.
- `packages/shared/src/components/RelatedGuides.astro` — "Plan your trip" guide-card row for tour pages.
- `packages/atlantis/src/lib/tour-guides.ts` — `getTourRelatedGuides(pk)` lookup.
- `packages/atlantis/src/lib/tour-guides.test.ts` — its tests.

**Modified:**
- `packages/shared/src/i18n/types.ts` + `packages/shared/src/i18n/locales/{en,pt,es,fr}.json` — new UI strings.
- `packages/shared/src/index.ts` — export `buildPostBreadcrumb`.
- `packages/atlantis/src/content/config.ts` — add `pillarSlug`, `pillarOrder`, `faqs` to the `blog` schema.
- `packages/atlantis/src/pages/[locale]/blog/[slug].astro` — breadcrumb via helper; pillar/cluster detection; render `PillarCallout` / `HubClusterList` / `FaqBlock`; push `buildFAQPage` to `structuredData`.
- `packages/atlantis/src/pages/[locale]/tours/[slug].astro` — load blog collection for the locale; render `RelatedGuides` from `getTourRelatedGuides(item.pk)`.
- `packages/atlantis/src/pages/[locale]/blog/index.astro` — pin the pillar as a "Start here" card.
- `packages/atlantis/src/pages/[locale]/index.astro` — add a link to the pillar in the journal section.
- The 9 existing cluster blog posts (× up to 4 locales) — add `pillarSlug` / `pillarOrder` frontmatter (Task 9).

---

### Task 1: Add the new i18n UI strings

**Files:**
- Modify: `packages/shared/src/i18n/types.ts`
- Modify: `packages/shared/src/i18n/locales/en.json`
- Modify: `packages/shared/src/i18n/locales/pt.json`
- Modify: `packages/shared/src/i18n/locales/es.json`
- Modify: `packages/shared/src/i18n/locales/fr.json`

(i18n locale files are configuration; no unit test — verified by the build in Task 10 and by `i18n.test.ts` which checks key parity across locales.)

- [ ] **Step 1: Add the key types**

In `packages/shared/src/i18n/types.ts`, find the block of `"blog.*"` keys (around the existing `"blog.related_tours": string;`) and add these lines alongside them:

```typescript
  "blog.part_of_guide": string;
  "blog.in_this_guide": string;
  "blog.faq_title": string;
  "blog.related_guides": string;
  "blog.related_guides_subtitle": string;
  "blog.start_here": string;
  "blog.start_here_cta": string;
```

- [ ] **Step 2: Add the English strings**

In `packages/shared/src/i18n/locales/en.json`, next to the other `"blog.*"` entries, add:

```json
  "blog.part_of_guide": "Part of our complete guide:",
  "blog.in_this_guide": "In this guide",
  "blog.faq_title": "Frequently asked questions",
  "blog.related_guides": "Plan your trip",
  "blog.related_guides_subtitle": "Practical guides from the skippers who run these tours.",
  "blog.start_here": "Start here",
  "blog.start_here_cta": "Read the complete guide"
```

- [ ] **Step 3: Add the Portuguese strings**

In `packages/shared/src/i18n/locales/pt.json`:

```json
  "blog.part_of_guide": "Parte do nosso guia completo:",
  "blog.in_this_guide": "Neste guia",
  "blog.faq_title": "Perguntas frequentes",
  "blog.related_guides": "Planeie a sua visita",
  "blog.related_guides_subtitle": "Guias práticos dos skippers que fazem estes passeios.",
  "blog.start_here": "Comece por aqui",
  "blog.start_here_cta": "Ler o guia completo"
```

- [ ] **Step 4: Add the Spanish strings**

In `packages/shared/src/i18n/locales/es.json`:

```json
  "blog.part_of_guide": "Parte de nuestra guía completa:",
  "blog.in_this_guide": "En esta guía",
  "blog.faq_title": "Preguntas frecuentes",
  "blog.related_guides": "Planifica tu visita",
  "blog.related_guides_subtitle": "Guías prácticas de los patrones que hacen estos paseos.",
  "blog.start_here": "Empieza aquí",
  "blog.start_here_cta": "Leer la guía completa"
```

- [ ] **Step 5: Add the French strings**

In `packages/shared/src/i18n/locales/fr.json`:

```json
  "blog.part_of_guide": "Fait partie de notre guide complet :",
  "blog.in_this_guide": "Dans ce guide",
  "blog.faq_title": "Questions fréquentes",
  "blog.related_guides": "Préparez votre visite",
  "blog.related_guides_subtitle": "Des guides pratiques signés par les skippers qui assurent ces excursions.",
  "blog.start_here": "Commencez ici",
  "blog.start_here_cta": "Lire le guide complet"
```

- [ ] **Step 6: Run the i18n parity test**

Run: `npm test -- packages/shared/src/i18n/i18n.test.ts`
Expected: PASS (all four locales have the same key set).

- [ ] **Step 7: Commit**

```bash
git add packages/shared/src/i18n/types.ts packages/shared/src/i18n/locales/
git commit -m "i18n(atlantis): add content-hub UI strings (pillar callout, in-this-guide, FAQ, plan-your-trip)"
```

---

### Task 2: Add `pillarSlug`, `pillarOrder`, `faqs` to the blog content schema

**Files:**
- Modify: `packages/atlantis/src/content/config.ts`

(Astro content-collection schema = configuration; verified by `npm run build`, which validates every post against the schema. No new unit test.)

- [ ] **Step 1: Add the fields**

In `packages/atlantis/src/content/config.ts`, in the `blog` collection's `z.object({ … })`, add these three fields just before the closing `})` (after `relatedTourSlugs`):

```typescript
    /** If this post is a cluster page of a hub, the slug of the pillar post it sits under. */
    pillarSlug: z.string().optional(),
    /** Sort order within the pillar's "In this guide" list (ascending; unset = last). */
    pillarOrder: z.number().optional(),
    /** Q&A pairs rendered as a FAQ block + emitted as FAQPage JSON-LD. */
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),
```

- [ ] **Step 2: Build to confirm nothing breaks**

Run: `cd packages/atlantis && npm run build`
Expected: build succeeds; no content-collection validation errors (existing posts simply omit the new optional fields).

- [ ] **Step 3: Commit**

```bash
git add packages/atlantis/src/content/config.ts
git commit -m "feat(atlantis): add pillarSlug, pillarOrder, faqs to the blog content schema"
```

---

### Task 3: `buildPostBreadcrumb()` helper in shared (TDD)

**Files:**
- Create: `packages/shared/src/seo/breadcrumbs.ts`
- Test: `packages/shared/src/seo/breadcrumbs.test.ts`
- Modify: `packages/shared/src/index.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/shared/src/seo/breadcrumbs.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { buildPostBreadcrumb } from "./breadcrumbs.js";

describe("buildPostBreadcrumb", () => {
  it("ordinary post → Home › Blog › <category> › <post>", () => {
    const crumbs = buildPostBreadcrumb({
      locale: "en",
      postTitle: "What to Pack",
      postSlug: "what-to-pack-algarve-boat-tour",
      category: { slug: "travel-tips", label: "Travel Tips" },
    });
    expect(crumbs.map((c) => c.name)).toEqual([
      "Home",
      "Blog",
      "Travel Tips",
      "What to Pack",
    ]);
    expect(crumbs.map((c) => c.path)).toEqual([
      "/",
      "/blog/",
      "/blog/category/travel-tips/",
      "/blog/what-to-pack-algarve-boat-tour/",
    ]);
  });

  it("cluster post with a pillar → Home › <pillar title> › <post>", () => {
    const crumbs = buildPostBreadcrumb({
      locale: "en",
      postTitle: "Best Time to Visit the Benagil Caves",
      postSlug: "best-time-visit-benagil-caves",
      pillar: { slug: "benagil-cave-tour-complete-guide", title: "Benagil Cave Tour: The Complete Guide" },
      category: { slug: "destinations", label: "Destinations" },
    });
    expect(crumbs.map((c) => c.name)).toEqual([
      "Home",
      "Benagil Cave Tour: The Complete Guide",
      "Best Time to Visit the Benagil Caves",
    ]);
    expect(crumbs.map((c) => c.path)).toEqual([
      "/",
      "/blog/benagil-cave-tour-complete-guide/",
      "/blog/best-time-visit-benagil-caves/",
    ]);
  });

  it("the pillar's own page → Home › Blog › <pillar title>", () => {
    const crumbs = buildPostBreadcrumb({
      locale: "en",
      postTitle: "Benagil Cave Tour: The Complete Guide",
      postSlug: "benagil-cave-tour-complete-guide",
      isPillar: true,
      category: { slug: "destinations", label: "Destinations" },
    });
    expect(crumbs.map((c) => c.name)).toEqual([
      "Home",
      "Blog",
      "Benagil Cave Tour: The Complete Guide",
    ]);
    expect(crumbs.map((c) => c.path)).toEqual([
      "/",
      "/blog/",
      "/blog/benagil-cave-tour-complete-guide/",
    ]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- packages/shared/src/seo/breadcrumbs.test.ts`
Expected: FAIL — "Cannot find module './breadcrumbs.js'" (or "buildPostBreadcrumb is not a function").

- [ ] **Step 3: Write the helper**

Create `packages/shared/src/seo/breadcrumbs.ts`:

```typescript
import { t } from "../i18n/index.js";
import type { Locale } from "../types.js";

export interface Crumb {
  name: string;
  path: string;
}

export interface PostBreadcrumbInput {
  locale: Locale;
  postTitle: string;
  postSlug: string;
  /** If this post is itself the pillar of a hub. Trumps `pillar`. */
  isPillar?: boolean;
  /** If this post is a cluster page, the pillar post it sits under. */
  pillar?: { slug: string; title: string };
  /** The post's category (used for non-hub posts). */
  category?: { slug: string; label: string };
}

/**
 * Breadcrumb trail for a blog post.
 * - Pillar's own page: Home › Blog › <pillar title>
 * - Cluster page:      Home › <pillar title> › <post>
 * - Ordinary post:     Home › Blog › <category> › <post>
 */
export function buildPostBreadcrumb(input: PostBreadcrumbInput): Crumb[] {
  const { locale, postTitle, postSlug, isPillar, pillar, category } = input;
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }];

  if (isPillar) {
    crumbs.push({ name: t(locale, "nav.blog"), path: "/blog/" });
  } else if (pillar) {
    crumbs.push({ name: pillar.title, path: `/blog/${pillar.slug}/` });
  } else {
    crumbs.push({ name: t(locale, "nav.blog"), path: "/blog/" });
    if (category) {
      crumbs.push({ name: category.label, path: `/blog/category/${category.slug}/` });
    }
  }

  crumbs.push({ name: postTitle, path: `/blog/${postSlug}/` });
  return crumbs;
}
```

- [ ] **Step 4: Export it from the package index**

In `packages/shared/src/index.ts`, add (near the other `seo/structured-data` exports):

```typescript
export { buildPostBreadcrumb } from "./seo/breadcrumbs.js";
export type { Crumb, PostBreadcrumbInput } from "./seo/breadcrumbs.js";
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- packages/shared/src/seo/breadcrumbs.test.ts`
Expected: PASS — all three cases green.

- [ ] **Step 6: Commit**

```bash
git add packages/shared/src/seo/breadcrumbs.ts packages/shared/src/seo/breadcrumbs.test.ts packages/shared/src/index.ts
git commit -m "feat(shared): buildPostBreadcrumb helper for hub-aware blog breadcrumbs"
```

---

### Task 4: `getTourRelatedGuides()` lookup (TDD)

Modelled on `packages/atlantis/src/lib/seo-overrides.ts` + `…seo-overrides.test.ts`. The map is from `SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` §4e — note some target slugs (`how-to-visit-benagil-cave`, `can-you-swim-benagil-cave`) are *new posts not yet written*; the `RelatedGuides` component (Task 5) filters to posts that actually exist, so listing them now is intentional and harmless.

**Files:**
- Create: `packages/atlantis/src/lib/tour-guides.ts`
- Test: `packages/atlantis/src/lib/tour-guides.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/atlantis/src/lib/tour-guides.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { getTourRelatedGuides, TOUR_GUIDE_PKS } from "./tour-guides.js";

describe("getTourRelatedGuides", () => {
  it("returns the guide slugs for the Benagil speedboat (PK 717720)", () => {
    const slugs = getTourRelatedGuides(717720);
    expect(slugs).toContain("benagil-cave-tour-complete-guide");
    expect(slugs).toContain("dolphin-watching-algarve-species-seasons");
    expect(slugs.length).toBeGreaterThanOrEqual(3);
  });

  it("accepts a string PK", () => {
    expect(getTourRelatedGuides("717720")).toEqual(getTourRelatedGuides(717720));
  });

  it("returns an empty array for a tour with no configured guides", () => {
    expect(getTourRelatedGuides(999999)).toEqual([]);
  });

  it("every configured tour lists 1–6 unique non-empty slugs and includes the pillar where Benagil-related", () => {
    for (const pk of TOUR_GUIDE_PKS) {
      const slugs = getTourRelatedGuides(pk);
      expect(slugs.length).toBeGreaterThanOrEqual(1);
      expect(slugs.length).toBeLessThanOrEqual(6);
      expect(new Set(slugs).size).toBe(slugs.length); // no dupes
      expect(slugs.every((s) => s.length > 0)).toBe(true);
    }
    // the speedboat, the private Cranchi and the Benagil+Alvor tours all reference the pillar
    for (const pk of [717720, 720028, 717728]) {
      expect(getTourRelatedGuides(pk)).toContain("benagil-cave-tour-complete-guide");
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- packages/atlantis/src/lib/tour-guides.test.ts`
Expected: FAIL — "Cannot find module './tour-guides.js'".

- [ ] **Step 3: Write the lookup**

Create `packages/atlantis/src/lib/tour-guides.ts`:

```typescript
/**
 * "Plan your trip" — guide-post slugs to surface on each tour page, keyed by FareHarbor item PK.
 * Source: SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md §4e.
 * NOTE: `how-to-visit-benagil-cave` and `can-you-swim-benagil-cave` are planned new posts;
 * the RelatedGuides component filters to posts that exist, so unwritten slugs are simply skipped.
 */
const GUIDES_BY_PK: Record<number, string[]> = {
  // Benagil Caves Speed Boat Tour (€20 entry product)
  717720: [
    "benagil-cave-tour-complete-guide",
    "how-to-visit-benagil-cave",
    "can-you-swim-benagil-cave",
    "best-time-visit-benagil-caves",
    "dolphin-watching-algarve-species-seasons",
  ],
  // Cranchi Yacht Cruise to the Benagil Caves (private)
  720028: [
    "benagil-cave-tour-complete-guide",
    "benagil-vs-other-sea-caves-algarve",
    "sunset-cruises-algarve-summer-guide",
    "best-time-visit-benagil-caves",
  ],
  // Luxury Sail Yacht Cruise
  717754: [
    "sunset-cruises-algarve-summer-guide",
    "algarve-in-spring-best-kept-secret",
    "what-to-pack-algarve-boat-tour",
  ],
  // Reef Fishing Tour
  718024: [
    "reef-fishing-algarve-what-to-expect",
    "reef-fishing-portimao-half-day-guide",
    "fishing-traditions-algarve-coast",
  ],
  // Benagil and Alvor Nature Reserve
  717728: [
    "benagil-vs-other-sea-caves-algarve",
    "marine-life-algarve-coast-spotters-guide",
    "benagil-cave-tour-complete-guide",
  ],
};

export const TOUR_GUIDE_PKS: number[] = Object.keys(GUIDES_BY_PK).map(Number);

/** Guide-post slugs to show in the "Plan your trip" block for the given FareHarbor item PK. */
export function getTourRelatedGuides(itemPk: number | string): string[] {
  return GUIDES_BY_PK[Number(itemPk)] ?? [];
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- packages/atlantis/src/lib/tour-guides.test.ts`
Expected: PASS — all four cases green.

- [ ] **Step 5: Commit**

```bash
git add packages/atlantis/src/lib/tour-guides.ts packages/atlantis/src/lib/tour-guides.test.ts
git commit -m "feat(atlantis): per-tour related-guides map (Plan-your-trip block)"
```

---

### Task 5: New shared components — `PillarCallout`, `HubClusterList`, `FaqBlock`, `RelatedGuides`

**Files:**
- Create: `packages/shared/src/components/PillarCallout.astro`
- Create: `packages/shared/src/components/HubClusterList.astro`
- Create: `packages/shared/src/components/FaqBlock.astro`
- Create: `packages/shared/src/components/RelatedGuides.astro`

(Astro components — no Vitest unit tests; they render correctly is verified by the build in Task 10 and by visual inspection once wired in Tasks 6–7. Follow the conventions in `packages/shared/src/components/AuthorBio.astro`: `import { t } from "../i18n/index.js";`, CSS custom properties like `var(--space-6)`, `--heading-color: #fff` only inside dark sections.)

- [ ] **Step 1: Create `PillarCallout.astro`**

```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";
import { getLocalePath } from "../i18n/index.js";

interface Props {
  locale: Locale;
  pillarSlug: string;
  pillarTitle: string;
}

const { locale, pillarSlug, pillarTitle } = Astro.props;
const href = getLocalePath(locale, `/blog/${pillarSlug}/`);
---

<aside class="pillar-callout">
  <span class="pillar-callout__label">{t(locale, "blog.part_of_guide")}</span>
  <a class="pillar-callout__link" href={href}>{pillarTitle}</a>
</aside>

<style>
  .pillar-callout {
    max-width: 720px;
    margin: 0 auto var(--space-8);
    padding: var(--space-4) var(--space-5);
    border-left: 3px solid var(--color-accent, #1AABB8);
    background: var(--color-surface-muted, rgba(26, 171, 184, 0.06));
    border-radius: var(--radius-md, 8px);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }
  .pillar-callout__label {
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-text-muted, #5a6b73);
  }
  .pillar-callout__link {
    font-weight: 600;
    color: var(--color-text, inherit);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .pillar-callout__link:hover { color: var(--color-accent, #1AABB8); }
</style>
```

- [ ] **Step 2: Create `HubClusterList.astro`**

Takes a pre-sorted, pre-normalised list of cluster entries (the page does the sorting/filtering against the blog collection in Task 6).

```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";
import { getLocalePath } from "../i18n/index.js";

interface ClusterEntry {
  slug: string;
  title: string;
}

interface Props {
  locale: Locale;
  clusters: ClusterEntry[];
}

const { locale, clusters } = Astro.props;
---

{clusters.length > 0 && (
  <nav class="hub-clusters" aria-label={t(locale, "blog.in_this_guide")}>
    <h2 class="hub-clusters__title">{t(locale, "blog.in_this_guide")}</h2>
    <ol class="hub-clusters__list">
      {clusters.map((c) => (
        <li>
          <a href={getLocalePath(locale, `/blog/${c.slug}/`)}>{c.title}</a>
        </li>
      ))}
    </ol>
  </nav>
)}

<style>
  .hub-clusters {
    max-width: 720px;
    margin: var(--space-10) auto;
    padding: var(--space-6);
    border: 1px solid var(--color-border, rgba(0, 0, 0, 0.08));
    border-radius: var(--radius-md, 8px);
    background: var(--color-surface, #fff);
  }
  .hub-clusters__title {
    font-size: var(--text-lg);
    margin: 0 0 var(--space-4);
  }
  .hub-clusters__list {
    margin: 0;
    padding-left: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  .hub-clusters__list a {
    color: var(--color-text, inherit);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .hub-clusters__list a:hover { color: var(--color-accent, #1AABB8); }
</style>
```

- [ ] **Step 3: Create `FaqBlock.astro`**

```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  locale: Locale;
  items: FaqItem[];
}

const { locale, items } = Astro.props;
---

{items.length > 0 && (
  <section class="faq-block" aria-label={t(locale, "blog.faq_title")}>
    <h2 class="faq-block__title">{t(locale, "blog.faq_title")}</h2>
    <div class="faq-block__list">
      {items.map((it) => (
        <details class="faq-block__item">
          <summary>{it.question}</summary>
          <div class="faq-block__answer" set:html={it.answer} />
        </details>
      ))}
    </div>
  </section>
)}

<style>
  .faq-block {
    max-width: 720px;
    margin: var(--space-12) auto 0;
  }
  .faq-block__title {
    font-size: var(--text-xl);
    margin: 0 0 var(--space-5);
  }
  .faq-block__item {
    border-bottom: 1px solid var(--color-border, rgba(0, 0, 0, 0.08));
    padding: var(--space-4) 0;
  }
  .faq-block__item summary {
    cursor: pointer;
    font-weight: 600;
    list-style: none;
  }
  .faq-block__item summary::-webkit-details-marker { display: none; }
  .faq-block__answer {
    margin-top: var(--space-3);
    color: var(--color-text-muted, #4a5a62);
  }
</style>
```

> Note: `set:html` is used so an answer can contain a simple inline link. Content is author-written (trusted), not user input.

- [ ] **Step 4: Create `RelatedGuides.astro`**

Mirrors `RelatedTours.astro` in shape: takes pre-resolved guide entries (slug/title/excerpt/image) and renders cards. The page (Task 7) resolves slugs → entries against the blog collection and filters out ones that don't exist.

```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";
import { getLocalePath } from "../i18n/index.js";

interface GuideEntry {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
}

interface Props {
  locale: Locale;
  guides: GuideEntry[];
}

const { locale, guides } = Astro.props;
const shown = guides.slice(0, 3);
---

{shown.length > 0 && (
  <section class="related-guides">
    <h2 class="related-guides__title">{t(locale, "blog.related_guides")}</h2>
    <p class="related-guides__subtitle">{t(locale, "blog.related_guides_subtitle")}</p>
    <div class="related-guides__grid">
      {shown.map((g) => (
        <a class="related-guides__card" href={getLocalePath(locale, `/blog/${g.slug}/`)}>
          {g.image && <img src={g.image} alt="" loading="lazy" class="related-guides__img" />}
          <span class="related-guides__card-title">{g.title}</span>
          <span class="related-guides__card-excerpt">{g.excerpt}</span>
        </a>
      ))}
    </div>
  </section>
)}

<style>
  .related-guides {
    margin-top: var(--space-12);
  }
  .related-guides__title { font-size: var(--text-xl); margin: 0 0 var(--space-1); }
  .related-guides__subtitle { color: var(--color-text-muted, #5a6b73); margin: 0 0 var(--space-6); }
  .related-guides__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--space-5);
  }
  .related-guides__card {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4);
    border: 1px solid var(--color-border, rgba(0, 0, 0, 0.08));
    border-radius: var(--radius-md, 8px);
    color: inherit;
    text-decoration: none;
    transition: border-color 0.15s ease;
  }
  .related-guides__card:hover { border-color: var(--color-accent, #1AABB8); }
  .related-guides__img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: var(--radius-sm, 6px); }
  .related-guides__card-title { font-weight: 600; }
  .related-guides__card-excerpt { font-size: var(--text-sm); color: var(--color-text-muted, #5a6b73); }
</style>
```

- [ ] **Step 5: Build to confirm the components compile**

Run: `cd packages/atlantis && npm run build`
Expected: build succeeds (the components aren't imported anywhere yet, but Astro will still type-check shared `.astro` files used by the build; if it doesn't surface them, Task 6/7 will).

- [ ] **Step 6: Commit**

```bash
git add packages/shared/src/components/PillarCallout.astro packages/shared/src/components/HubClusterList.astro packages/shared/src/components/FaqBlock.astro packages/shared/src/components/RelatedGuides.astro
git commit -m "feat(shared): PillarCallout, HubClusterList, FaqBlock, RelatedGuides components"
```

---

### Task 6: Wire `blog/[slug].astro` — hub breadcrumb, pillar/cluster rendering, FAQ schema

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/blog/[slug].astro`

- [ ] **Step 1: Update the imports**

In the frontmatter import block, change the `@algarve-tourism/shared` import line to add `buildFAQPage` and `buildPostBreadcrumb`, and add the three component imports:

```typescript
import { LOCALES, t, buildBlogPosting, buildBreadcrumbList, buildFAQPage, buildPostBreadcrumb, getLocalePath } from "@algarve-tourism/shared";
import PillarCallout from "@algarve-tourism/shared/components/PillarCallout.astro";
import HubClusterList from "@algarve-tourism/shared/components/HubClusterList.astro";
import FaqBlock from "@algarve-tourism/shared/components/FaqBlock.astro";
```

- [ ] **Step 2: Compute the pillar / cluster context**

Right after `const categoryLabel = t(locale, ...)` (currently ~line 54), add:

```typescript
// --- content-hub context ---------------------------------------------------
// Cluster posts of THIS post (if any) → this post is the pillar.
const clusterPosts = allPosts
  .filter((p) => p.data.pillarSlug === slug && p.data.locale === locale)
  .sort(
    (a, b) =>
      (a.data.pillarOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.data.pillarOrder ?? Number.MAX_SAFE_INTEGER) ||
      a.data.date.localeCompare(b.data.date),
  );
const isPillar = clusterPosts.length > 0;
const clusterEntries = clusterPosts.map((p) => ({
  slug: p.slug.replace(`${p.data.locale}/`, ""),
  title: p.data.title,
}));

// If THIS post is a cluster page, find its pillar post (same locale).
const pillarPost = post.data.pillarSlug
  ? allPosts.find(
      (p) =>
        p.data.locale === locale &&
        p.slug.replace(`${p.data.locale}/`, "") === post.data.pillarSlug,
    )
  : undefined;
const pillarRef = pillarPost
  ? { slug: post.data.pillarSlug!, title: pillarPost.data.title }
  : undefined;

const breadcrumbCrumbs = buildPostBreadcrumb({
  locale,
  postTitle: post.data.title,
  postSlug: slug,
  isPillar,
  pillar: pillarRef,
  category: { slug: post.data.category, label: categoryLabel },
});
```

- [ ] **Step 3: Use the helper for the breadcrumb JSON-LD and add FAQPage**

Replace the existing `structuredData` array's `buildBreadcrumbList(...)` argument with `breadcrumbCrumbs`, and append the FAQ schema when present. The block becomes:

```typescript
const structuredData = [
  buildBlogPosting(config, {
    title: post.data.title,
    excerpt: post.data.excerpt,
    date: post.data.date,
    lastModified: post.data.lastModified,
    author: post.data.author,
    authorBio: post.data.authorBio,
    authorImage: post.data.authorImage,
    image: post.data.image,
    slug,
    category: categoryLabel,
    tags: post.data.tags,
  }, locale),
  buildBreadcrumbList(
    config,
    locale,
    breadcrumbCrumbs.map((c) => ({ name: c.name, path: c.path })),
  ),
  ...(post.data.faqs && post.data.faqs.length > 0
    ? [buildFAQPage(post.data.faqs.map((f) => ({ question: f.question, answer: f.answer })))]
    : []),
];
```

(`buildBreadcrumbList(config, locale, [{name, path}, …])` already takes that exact shape — see its current call.)

- [ ] **Step 4: Update the visible breadcrumb nav in the hero**

Replace the existing `<nav class="post-hero__breadcrumbs">…</nav>` block (the hard-coded Home / Blog / Category links) with one that renders `breadcrumbCrumbs` (last crumb is the current page, not a link):

```astro
      <nav class="post-hero__breadcrumbs" aria-label="Breadcrumb">
        {breadcrumbCrumbs.map((crumb, i) => (
          <>
            {i > 0 && <span class="post-hero__sep">/</span>}
            {i < breadcrumbCrumbs.length - 1
              ? <a href={getLocalePath(locale, crumb.path)}>{i === 0 ? config.name : crumb.name}</a>
              : <span class="post-hero__current">{crumb.name}</span>}
          </>
        ))}
      </nav>
```

(Keep the existing `.post-hero__sep` style; add a `.post-hero__current { color: rgba(255,255,255,0.85); }` rule in the `<style>` block next to `.post-hero__breadcrumbs a`.)

- [ ] **Step 5: Render the PillarCallout (cluster posts) and HubClusterList (pillar)**

In the article body, **immediately before** `<Content />` (the rendered Markdown), add the PillarCallout; and after `<Content />` (before `<RelatedTours …>`) add the HubClusterList:

```astro
      {pillarRef && (
        <PillarCallout locale={locale} pillarSlug={pillarRef.slug} pillarTitle={pillarRef.title} />
      )}

      <Content />

      {isPillar && <HubClusterList locale={locale} clusters={clusterEntries} />}
```

(Find the existing `<Content />` usage — it's rendered inside the article wrapper after the hero.)

- [ ] **Step 6: Render the FaqBlock**

After the HubClusterList line and before `<RelatedTours …>`:

```astro
      {post.data.faqs && post.data.faqs.length > 0 && (
        <FaqBlock locale={locale} items={post.data.faqs} />
      )}
```

- [ ] **Step 7: Build and inspect**

Run: `cd packages/atlantis && npm run build`
Expected: build succeeds.
Then inspect: `grep -l 'FAQPage' packages/atlantis/dist/en/blog/*/index.html` should be empty for now (no post has `faqs` yet — that's fine; Task 9 doesn't add `faqs` either, content does). Open `packages/atlantis/dist/en/blog/what-to-pack-algarve-boat-tour/index.html` — the breadcrumb should still read `Home / Blog / Travel Tips / What to Pack…` (no `pillarSlug` set on it yet). The wiring is in place; it lights up when content sets the fields.

- [ ] **Step 8: Commit**

```bash
git add "packages/atlantis/src/pages/[locale]/blog/[slug].astro"
git commit -m "feat(atlantis): hub-aware blog page — pillar breadcrumb, PillarCallout/HubClusterList, FAQ schema"
```

---

### Task 7: Wire `tours/[slug].astro` — "Plan your trip" guide block

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/tours/[slug].astro`

- [ ] **Step 1: Add imports**

In the frontmatter, add:

```typescript
import { getCollection } from "astro:content";
import RelatedGuides from "@algarve-tourism/shared/components/RelatedGuides.astro";
import { getTourRelatedGuides } from "../../../lib/tour-guides.js";
import { optimizeImageUrl } from "@algarve-tourism/shared";
```

(`getCollection` may already be imported elsewhere in this file — if so, don't duplicate. `optimizeImageUrl` likewise; only add what's missing.)

- [ ] **Step 2: Resolve the guide entries for this tour**

After `const seoOverride = getTourSeoOverride(item.pk, locale);` (around line 40), add:

```typescript
// "Plan your trip" — guide posts to surface for this tour (existing ones only).
const guideSlugs = getTourRelatedGuides(item.pk);
const blogPostsForLocale = await getCollection("blog", (p) => p.data.locale === locale);
const relatedGuides = guideSlugs
  .map((wantSlug) => {
    const p = blogPostsForLocale.find(
      (bp) => bp.slug.replace(`${bp.data.locale}/`, "") === wantSlug,
    );
    if (!p) return null;
    return {
      slug: wantSlug,
      title: p.data.title,
      excerpt: p.data.excerpt,
      image: p.data.image ? optimizeImageUrl(p.data.image, 600) : undefined,
    };
  })
  .filter((g): g is { slug: string; title: string; excerpt: string; image?: string } => g !== null);
```

- [ ] **Step 3: Render the block**

In the template, just before the closing `</Layout>` (or right after the existing related-tours / CTA section — wherever related content currently sits), add:

```astro
  {relatedGuides.length > 0 && (
    <div class="container">
      <RelatedGuides locale={locale} guides={relatedGuides} />
    </div>
  )}
```

(Use the same wrapper element/class the surrounding sections use — match the file's existing layout idiom.)

- [ ] **Step 4: Build and inspect**

Run: `cd packages/atlantis && npm run build`
Expected: build succeeds.
Inspect `packages/atlantis/dist/en/tours/benagil-caves-speed-boat-tour/index.html` — it should contain a "Plan your trip" heading and links to `/en/blog/benagil-cave-tour-complete-guide/`, `/en/blog/best-time-visit-benagil-caves/`, `/en/blog/dolphin-watching-algarve-species-seasons/` (the existing posts among the configured slugs; the not-yet-written `how-to-visit-…` / `can-you-swim-…` are silently skipped).

- [ ] **Step 5: Commit**

```bash
git add "packages/atlantis/src/pages/[locale]/tours/[slug].astro"
git commit -m "feat(atlantis): Plan-your-trip guide block on tour pages"
```

---

### Task 8: Pin the pillar on the blog index + link it from the homepage

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/blog/index.astro`
- Modify: `packages/atlantis/src/pages/[locale]/index.astro`

- [ ] **Step 1: Pin the pillar on the blog index**

In `packages/atlantis/src/pages/[locale]/blog/index.astro`, after `const allPosts = await getCollection("blog");` (and wherever the locale filter is applied), add:

```typescript
const PILLAR_SLUG = "benagil-cave-tour-complete-guide";
const pillarPost = allPosts.find(
  (p) => p.data.locale === locale && p.slug.replace(`${p.data.locale}/`, "") === PILLAR_SLUG,
);
```

Then in the template, above the post grid, render a "Start here" card when `pillarPost` exists:

```astro
  {pillarPost && (
    <a class="blog-pillar-card" href={getLocalePath(locale, `/blog/${PILLAR_SLUG}/`)}>
      <span class="blog-pillar-card__badge">{t(locale, "blog.start_here")}</span>
      <h2 class="blog-pillar-card__title">{pillarPost.data.title}</h2>
      <p class="blog-pillar-card__excerpt">{pillarPost.data.excerpt}</p>
      <span class="blog-pillar-card__cta">{t(locale, "blog.start_here_cta")} →</span>
    </a>
  )}
```

Add a minimal `<style>` for `.blog-pillar-card*` (a bordered/highlighted full-width card — match the page's card idiom; e.g. `border: 2px solid var(--color-accent, #1AABB8); border-radius: var(--radius-md,8px); padding: var(--space-6); display:flex; flex-direction:column; gap: var(--space-2); margin-bottom: var(--space-8); text-decoration:none; color:inherit;`). Confirm `getLocalePath` and `t` are imported (the index already imports `t`; add `getLocalePath` from `@algarve-tourism/shared` if missing).

- [ ] **Step 2: Link the pillar from the homepage journal section**

In `packages/atlantis/src/pages/[locale]/index.astro`, locate the blog/journal section (it renders `BlogCard`s and a "view all posts" link — search for `home.journal` / `home.blog_title` / `BlogCard`). Add, near the "view all posts" link, a prominent link to the pillar:

```astro
        <a class="home-journal__pillar-link" href={getLocalePath(locale, "/blog/benagil-cave-tour-complete-guide/")}>
          {t(locale, "blog.start_here_cta")} →
        </a>
```

(If `getLocalePath` isn't already imported in the homepage, add it from `@algarve-tourism/shared`. Style `.home-journal__pillar-link` as a simple text/button link consistent with the section.)

- [ ] **Step 3: Build and inspect**

Run: `cd packages/atlantis && npm run build`
Expected: build succeeds. `packages/atlantis/dist/en/blog/index.html` shows the "Start here" card with the pillar title; `packages/atlantis/dist/en/index.html` contains a link to `/en/blog/benagil-cave-tour-complete-guide/`.

- [ ] **Step 4: Commit**

```bash
git add "packages/atlantis/src/pages/[locale]/blog/index.astro" "packages/atlantis/src/pages/[locale]/index.astro"
git commit -m "feat(atlantis): pin the Benagil pillar on the blog index + homepage"
```

---

### Task 9: Assign `pillarSlug` / `pillarOrder` to the existing cluster posts

The pillar is `benagil-cave-tour-complete-guide`. The following **existing** posts become cluster pages of it — add `pillarSlug: benagil-cave-tour-complete-guide` and a `pillarOrder` to their frontmatter, **in all locales** where the translation exists (en, and pt/es/fr if present — check `src/content/blog/<locale>/`). Per `SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` §2:

| pillarOrder | post slug | (cluster #) |
|---|---|---|
| 1 | `best-time-visit-benagil-caves` | CL3 |
| 2 | `best-time-visit-algarve-boat-tours` | CL4 |
| 3 | `benagil-vs-other-sea-caves-algarve` | CL5 |
| 4 | `dolphin-watching-algarve-species-seasons` | CL6 |
| 5 | `marine-life-algarve-coast-spotters-guide` | CL7 |
| 6 | `what-to-pack-algarve-boat-tour` | CL8 |
| 7 | `algarve-in-spring-best-kept-secret` | CL9 |
| 8 | `sunset-cruises-algarve-summer-guide` | CL10 |

Do **not** add `pillarSlug` to the fishing trio (`reef-fishing-algarve-what-to-expect`, `reef-fishing-portimao-half-day-guide`, `fishing-traditions-algarve-coast`) or to `portuguese-coastal-cuisine-algarve` — those are the fishing satellite / standalone-by-design (architecture §2). The pillar post itself gets nothing here (it's detected as the pillar because others point at it).

**Files:** the `.md` files under `packages/atlantis/src/content/blog/{en,pt,es,fr}/` for the 8 slugs above (the `.md` extension may vary — confirm with `ls`).

- [ ] **Step 1: For each of the 8 slugs, in each locale that has the file, add the two frontmatter lines**

Example — `packages/atlantis/src/content/blog/en/best-time-visit-benagil-caves.md`, add after the `category:` line (or anywhere in the frontmatter block, before the closing `---`):

```yaml
pillarSlug: benagil-cave-tour-complete-guide
pillarOrder: 1
```

Repeat with the matching `pillarOrder` for the other 7 slugs, and for the same slug in `pt/`, `es/`, `fr/` if those files exist. (Tip: `for d in en pt es fr; do ls packages/atlantis/src/content/blog/$d/ 2>/dev/null; done` to see which translations exist.)

- [ ] **Step 2: Build and inspect**

Run: `cd packages/atlantis && npm run build`
Expected: build succeeds. Open `packages/atlantis/dist/en/blog/best-time-visit-benagil-caves/index.html` — the breadcrumb now reads `Home / Benagil Cave Tour: Everything You Need to Know in 2026 / Best Time to Visit the Benagil Caves`, and there's a "Part of our complete guide:" callout near the top. Open `packages/atlantis/dist/en/blog/benagil-cave-tour-complete-guide/index.html` — it now has an "In this guide" list with 8 links in `pillarOrder`.

- [ ] **Step 3: Commit**

```bash
git add packages/atlantis/src/content/blog/
git commit -m "content(atlantis): assign 8 existing posts as Benagil-hub cluster pages (pillarSlug/pillarOrder)"
```

---

### Task 10: Full test + build both sites; final checks; follow-ups note

**Files:** none new — verification + a docs note.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS — all suites, including the new `breadcrumbs.test.ts` and `tour-guides.test.ts`, and the existing `i18n.test.ts` (key parity) and `seo-overrides.test.ts`. Output pristine (no warnings).

- [ ] **Step 2: Build both packages**

Run: `npm run build`
Expected: both `@algarve-tourism/atlantis` and `@algarve-tourism/algarve-and-you` build cleanly (A&Y is unaffected — confirm no errors from the shared-component additions).

- [ ] **Step 3: Spot-check the built HTML**

```bash
# Pillar page: has "In this guide" with the cluster links
grep -o 'In this guide' packages/atlantis/dist/en/blog/benagil-cave-tour-complete-guide/index.html
# A cluster page: breadcrumb points at the pillar, not "Blog/Category"
grep -o '/en/blog/benagil-cave-tour-complete-guide/' packages/atlantis/dist/en/blog/best-time-visit-benagil-caves/index.html
# Speedboat tour page: "Plan your trip" block links to guides
grep -o 'Plan your trip' packages/atlantis/dist/en/tours/benagil-caves-speed-boat-tour/index.html
# Hreflang on a cluster page unchanged (no regression)
grep -c 'hreflang' packages/atlantis/dist/en/blog/best-time-visit-benagil-caves/index.html
```
Expected: each of the first three prints a match; the last prints ≥ 2 (existing alternates intact).

- [ ] **Step 4: Add the changelog + README notes**

- Append a line to `GoogleAds/atlantis/06-changelog.md` (top): `## 2026-05-XX — Content-hub site wiring (Benagil pillar/cluster, FAQ schema, tour→guide links)` · what · why · expected effect (clearer topical signals, more internal links into tour pages) · verify-on date (~6 weeks out). The tour pages are ad landing pages, so this belongs in the changelog.
- In `SEO/README.md`, under the content-hub bullet, note the wiring shipped (this plan) and that the remaining work is the content (`content-brief-authoring` + Opus): pillar rewrite, the 2–3 new posts, the de-dup edits, the in-body links per `…-hub-links.csv`, and `faqs` frontmatter on the pillar + Q&A clusters.

```bash
git add GoogleAds/atlantis/06-changelog.md SEO/README.md
git commit -m "docs: log content-hub wiring; note remaining content workstream"
```

- [ ] **Step 5: Open / update the PR**

The branch is `feat/atlantis-content-hub` (already pushed). Push the new commits (`git push`) and open a PR titled "Content-hub wiring: Benagil pillar/cluster, FAQ schema, tour→guide links" — body summarises Tasks 1–9, links the architecture doc, and lists the follow-up content workstream + the deferred `/benagil-cave-guide/` URL migration.

**Follow-ups (not in this plan):**
- Content: `content-brief-authoring` for the pillar rewrite + CL2 ("can you swim") + CL1 ("how to visit") + the best-time-stub expansion + the dolphin/caves refreshes, then Opus drafts; then add `faqs:` frontmatter to the pillar and the Q&A clusters and the in-body links per `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv`; then mirror the 3 new posts into pt/es/fr.
- The new posts (`how-to-visit-benagil-cave`, `can-you-swim-benagil-cave`, `benagil-cave-tour-with-kids`) need `pillarSlug: benagil-cave-tour-complete-guide` + a `pillarOrder` when they're created (suggest 0 for CL1/CL2 so "how to visit" / "can you swim" sort to the top of the list, 9 for "with kids").
- Deferred: `/benagil-cave-guide/` URL migration (architecture §3).
- Quarterly: audit `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` for link drift.

---

## Self-review

- **Spec coverage** (vs architecture §3–§5, §8 stream A): breadcrumb/`pillarSlug` ✅ (T2, T3, T6, T9); `benagil-cave-guide` "category"/hub index — implemented instead as the pillar's own "In this guide" list + pinned blog-index card (T5, T6, T8), which the architecture explicitly allows ("a de-facto hub index"); `relatedGuideSlugs` + "Plan your trip" on tour pages ✅ (T4, T5, T7); `FAQPage` schema on pillar/clusters ✅ (T2 `faqs` field, T5 `FaqBlock`, T6 emits `buildFAQPage`) — note the *content* of `faqs` is the follow-up workstream, by design; 4-locale mirroring of new posts — explicitly a follow-up (no new posts in this plan). No spec item silently dropped.
- **Placeholder scan:** no "TBD"/"handle edge cases"/"similar to Task N" — each code step shows the code; the one judgement call left to the engineer ("match the file's existing layout idiom" for the two card wrappers) is unavoidable Astro-template styling, with a concrete CSS suggestion given.
- **Type consistency:** `buildPostBreadcrumb` returns `Crumb[]` (`{name, path}`) — used as such in T6 (`breadcrumbCrumbs.map(c => ({name: c.name, path: c.path}))` into `buildBreadcrumbList`, and `crumb.path`/`crumb.name` in the nav). `getTourRelatedGuides(pk): string[]` + `TOUR_GUIDE_PKS: number[]` — both used in T4's test and T7. `RelatedGuides` `guides: {slug,title,excerpt,image?}[]` — exactly what T7 builds. `HubClusterList` `clusters: {slug,title}[]` — exactly `clusterEntries` in T6. `FaqBlock`/`buildFAQPage` both take `{question,answer}[]` — matches the `faqs` Zod shape from T2. `PillarCallout` props `{locale,pillarSlug,pillarTitle}` — matches `pillarRef` (`{slug,title}`) destructured in T6's render call.
