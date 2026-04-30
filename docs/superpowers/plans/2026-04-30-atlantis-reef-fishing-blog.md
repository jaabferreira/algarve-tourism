# Atlantis Reef Fishing Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship two new SEO-focused blog posts for Atlantis Tours (national + Portimão sibling), signed by skipper Nuno Albino, with the smallest schema and JSON-LD plumbing needed to make that signed byline E-E-A-T-meaningful.

**Architecture:** Add two optional fields (`authorBio`, `authorImage`) to the shared blog content schema. Fork `buildBlogPosting` to emit `author` as `Person` (with name + image + description) when both new fields are set and the author differs from `config.name`; otherwise keep current `Organization` behaviour, so the existing 11 posts emit identical JSON-LD. Add a small presentational `<AuthorBio>` component rendered after the article body when both fields are present. Write 8 markdown files (2 posts × 4 locales) using the new fields.

**Tech Stack:** Astro 5 content collections, Zod schemas, Vitest, TypeScript, JSON-based i18n.

**Spec:** `docs/superpowers/specs/2026-04-30-atlantis-reef-fishing-blog-design.md`

---

## File Map

### Modified files
| File | Responsibility |
|------|---------------|
| `packages/atlantis/src/content/config.ts` | Add `authorBio` and `authorImage` optional fields to blog schema |
| `packages/shared/src/seo/structured-data.ts` | Fork `buildBlogPosting` to emit `Person` author when both new fields are set |
| `packages/atlantis/src/pages/[locale]/blog/[slug].astro` | Thread new fields into `buildBlogPosting`; render `<AuthorBio>` after article body |
| `packages/shared/src/i18n/locales/en.json` | Add `blog.about_author` key |
| `packages/shared/src/i18n/locales/pt.json` | Add `blog.about_author` key (PT) |
| `packages/shared/src/i18n/locales/es.json` | Add `blog.about_author` key (ES) |
| `packages/shared/src/i18n/locales/fr.json` | Add `blog.about_author` key (FR) |
| `packages/shared/src/i18n/types.ts` | Add `"blog.about_author"` to `TranslationKey` union (if file exists; otherwise skip) |
| `docs/ads/atlantis/06-changelog.md` | Append rollout entry |

### New files
| File | Responsibility |
|------|---------------|
| `packages/shared/src/seo/structured-data.test.ts` | Unit tests for `buildBlogPosting` author fork |
| `packages/shared/src/components/AuthorBio.astro` | Presentational author bio block (avatar + name + bio) |
| `packages/atlantis/public/authors/nuno-albino.jpg` | Headshot of Nuno (provided by user) |
| `packages/atlantis/src/content/blog/en/reef-fishing-algarve-what-to-expect.md` | Post 1, EN |
| `packages/atlantis/src/content/blog/pt/pesca-de-fundo-algarve-o-que-esperar.md` | Post 1, PT |
| `packages/atlantis/src/content/blog/es/pesca-de-fondo-algarve-que-esperar.md` | Post 1, ES |
| `packages/atlantis/src/content/blog/fr/peche-recif-algarve-quoi-attendre.md` | Post 1, FR |
| `packages/atlantis/src/content/blog/en/reef-fishing-portimao-half-day-guide.md` | Post 2, EN |
| `packages/atlantis/src/content/blog/pt/pesca-de-fundo-portimao-meio-dia.md` | Post 2, PT |
| `packages/atlantis/src/content/blog/es/pesca-de-fondo-portimao-medio-dia.md` | Post 2, ES |
| `packages/atlantis/src/content/blog/fr/peche-recif-portimao-demi-journee.md` | Post 2, FR |

---

## Task 1: Extend blog content schema with author bio and image fields

**Files:**
- Modify: `packages/atlantis/src/content/config.ts`

- [ ] **Step 1: Add the two optional fields to the blog schema**

Edit `packages/atlantis/src/content/config.ts` and add `authorBio` and `authorImage` after the existing `author` field:

```typescript
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    lastModified: z.string().optional(),
    excerpt: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    locale: z.enum(["en", "pt", "es", "fr"]),
    translationKey: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional().default([]),
    author: z.string().default("Atlantis Tours"),
    authorBio: z.string().optional(),
    authorImage: z.string().optional(),
    readingTime: z.number().optional(),
    relatedTourSlugs: z.array(z.string()).optional(),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, pages };
```

- [ ] **Step 2: Verify the build still validates existing content**

Run: `pnpm --filter @algarve-tourism/atlantis astro check`
Expected: PASS — all 11 existing posts still validate (the new fields are optional).

If `astro check` is not available, run `pnpm --filter @algarve-tourism/atlantis build` and confirm no schema validation errors are reported during the content collection load step.

- [ ] **Step 3: Commit**

```bash
git add packages/atlantis/src/content/config.ts
git commit -m "feat(atlantis): add authorBio and authorImage to blog schema"
```

---

## Task 2: Fork `buildBlogPosting` to emit `Person` author when both new fields are set (TDD)

**Files:**
- Create: `packages/shared/src/seo/structured-data.test.ts`
- Modify: `packages/shared/src/seo/structured-data.ts`

- [ ] **Step 1: Write the failing tests**

Create `packages/shared/src/seo/structured-data.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { buildBlogPosting } from "./structured-data.js";
import type { BrandConfig } from "../types.js";

const mockConfig = {
  brand: "atlantis",
  name: "Atlantis Tours",
  domain: "atlantistours.pt",
  tagline: "",
  fh: { shortname: "x", categories: [], flow: "" },
  logo: "",
  social: { instagram: "", facebook: "", whatsapp: "" },
  analytics: { gtag: "" },
  defaultLocale: "en",
  locales: ["en", "pt", "es", "fr"],
} as BrandConfig;

const basePost = {
  title: "Test Post",
  excerpt: "Test excerpt",
  date: "2026-04-30",
  slug: "test-post",
};

describe("buildBlogPosting", () => {
  it("emits Organization author when authorBio and authorImage are absent", () => {
    const result = buildBlogPosting(
      mockConfig,
      { ...basePost, author: "Atlantis Tours" },
      "en",
    );
    expect(result.author).toEqual({
      "@type": "Organization",
      name: "Atlantis Tours",
    });
  });

  it("emits Person author when author differs from config.name and both bio + image are present", () => {
    const result = buildBlogPosting(
      mockConfig,
      {
        ...basePost,
        author: "Nuno Albino",
        authorBio: "Skipper since 2018.",
        authorImage: "/authors/nuno-albino.jpg",
      },
      "en",
    );
    expect(result.author).toEqual({
      "@type": "Person",
      name: "Nuno Albino",
      description: "Skipper since 2018.",
      image: "/authors/nuno-albino.jpg",
    });
  });

  it("falls back to Organization when only authorBio is present", () => {
    const result = buildBlogPosting(
      mockConfig,
      {
        ...basePost,
        author: "Nuno Albino",
        authorBio: "Skipper since 2018.",
      },
      "en",
    );
    expect(result.author).toEqual({
      "@type": "Organization",
      name: "Atlantis Tours",
    });
  });

  it("falls back to Organization when only authorImage is present", () => {
    const result = buildBlogPosting(
      mockConfig,
      {
        ...basePost,
        author: "Nuno Albino",
        authorImage: "/authors/nuno-albino.jpg",
      },
      "en",
    );
    expect(result.author).toEqual({
      "@type": "Organization",
      name: "Atlantis Tours",
    });
  });

  it("falls back to Organization when author equals config.name even if bio + image are present", () => {
    const result = buildBlogPosting(
      mockConfig,
      {
        ...basePost,
        author: "Atlantis Tours",
        authorBio: "Bio.",
        authorImage: "/img.jpg",
      },
      "en",
    );
    expect(result.author).toEqual({
      "@type": "Organization",
      name: "Atlantis Tours",
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test --filter packages/shared/src/seo/structured-data.test.ts`

Or from root: `pnpm vitest run packages/shared/src/seo/structured-data.test.ts`

Expected: 4 of 5 tests FAIL. Only the first ("Organization author when absent") passes — the other four fail because `buildBlogPosting` does not yet accept `authorBio` / `authorImage` and always returns `Organization`.

- [ ] **Step 3: Implement the Person fork**

Edit `packages/shared/src/seo/structured-data.ts`. Replace the existing `buildBlogPosting` function with:

```typescript
export function buildBlogPosting(
  config: BrandConfig,
  post: {
    title: string;
    excerpt: string;
    date: string;
    lastModified?: string;
    author?: string;
    authorBio?: string;
    authorImage?: string;
    image?: string;
    slug: string;
    category?: string;
    tags?: string[];
  },
  locale: Locale,
) {
  const usePersonAuthor =
    post.author &&
    post.author !== config.name &&
    post.authorBio &&
    post.authorImage;

  const author = usePersonAuthor
    ? {
        "@type": "Person",
        name: post.author!,
        description: post.authorBio!,
        image: post.authorImage!,
      }
    : {
        "@type": "Organization",
        name: config.name,
      };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    ...(post.lastModified && { dateModified: post.lastModified }),
    ...(post.category && { articleSection: post.category }),
    ...(post.tags && post.tags.length > 0 && { keywords: post.tags.join(", ") }),
    author,
    publisher: {
      "@type": "Organization",
      name: config.name,
      url: `https://www.${config.domain}`,
    },
    ...(post.image && { image: post.image }),
    mainEntityOfPage: `https://www.${config.domain}/${locale}/blog/${post.slug}/`,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run packages/shared/src/seo/structured-data.test.ts`

Expected: 5/5 PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/seo/structured-data.ts packages/shared/src/seo/structured-data.test.ts
git commit -m "feat(seo): emit Person author in BlogPosting when bio + image present"
```

---

## Task 3: Add `blog.about_author` translation key

**Files:**
- Modify: `packages/shared/src/i18n/locales/en.json`
- Modify: `packages/shared/src/i18n/locales/pt.json`
- Modify: `packages/shared/src/i18n/locales/es.json`
- Modify: `packages/shared/src/i18n/locales/fr.json`
- Modify: `packages/shared/src/i18n/types.ts` (only if it has a `TranslationKey` union)

- [ ] **Step 1: Add the EN key**

Open `packages/shared/src/i18n/locales/en.json`. Find the `blog.related_tours` line (around line 212). Add this line directly above it:

```json
  "blog.about_author": "About the author",
```

- [ ] **Step 2: Add the PT key**

Open `packages/shared/src/i18n/locales/pt.json`. Find the equivalent `blog.related_tours` line. Add directly above it:

```json
  "blog.about_author": "Sobre o autor",
```

- [ ] **Step 3: Add the ES key**

Open `packages/shared/src/i18n/locales/es.json`. Find the equivalent `blog.related_tours` line. Add directly above it:

```json
  "blog.about_author": "Sobre el autor",
```

- [ ] **Step 4: Add the FR key**

Open `packages/shared/src/i18n/locales/fr.json`. Find the equivalent `blog.related_tours` line. Add directly above it:

```json
  "blog.about_author": "À propos de l'auteur",
```

- [ ] **Step 5: Update the TranslationKey union if it exists**

Run: `grep -n "blog\.related_tours\|TranslationKey" packages/shared/src/i18n/types.ts`

If the file contains a `TranslationKey` union type listing each key, add `"blog.about_author"` to it (alphabetically next to `blog.all_posts`). If `types.ts` does not list keys explicitly (e.g. it derives them from a JSON import), skip this step.

- [ ] **Step 6: Verify build**

Run: `pnpm --filter @algarve-tourism/atlantis build 2>&1 | head -30`
Expected: build succeeds (no missing translation key errors).

- [ ] **Step 7: Commit**

```bash
git add packages/shared/src/i18n/locales/*.json packages/shared/src/i18n/types.ts
git commit -m "i18n: add blog.about_author key in EN/PT/ES/FR"
```

---

## Task 4: Create `<AuthorBio>` component

**Files:**
- Create: `packages/shared/src/components/AuthorBio.astro`

- [ ] **Step 1: Create the component**

Create `packages/shared/src/components/AuthorBio.astro`:

```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";

interface Props {
  name: string;
  bio: string;
  image: string;
  locale: Locale;
}

const { name, bio, image, locale } = Astro.props;
---

<aside class="author-bio" aria-label={t(locale, "blog.about_author")}>
  <img class="author-bio__avatar" src={image} alt={name} width="96" height="96" loading="lazy" />
  <div class="author-bio__body">
    <span class="author-bio__label">{t(locale, "blog.about_author")}</span>
    <h3 class="author-bio__name">{name}</h3>
    <p class="author-bio__text">{bio}</p>
  </div>
</aside>

<style>
  .author-bio {
    max-width: 720px;
    margin: var(--space-12) auto 0;
    padding: var(--space-6);
    display: flex;
    gap: var(--space-5);
    align-items: flex-start;
    background: var(--color-surface, #f7f8fa);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
  }

  .author-bio__avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .author-bio__body {
    flex: 1;
    min-width: 0;
  }

  .author-bio__label {
    display: block;
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-widest);
    color: var(--color-text-muted);
    margin-bottom: var(--space-2);
  }

  .author-bio__name {
    font-family: var(--font-accent), Georgia, serif;
    font-size: var(--text-xl);
    font-weight: var(--weight-regular);
    color: var(--color-text);
    margin: 0 0 var(--space-2) 0;
  }

  .author-bio__text {
    margin: 0;
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: var(--color-text-body);
  }

  @media (max-width: 540px) {
    .author-bio {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .author-bio__avatar {
      width: 80px;
      height: 80px;
    }
  }
</style>
```

- [ ] **Step 2: Verify the component compiles**

Run: `pnpm --filter @algarve-tourism/atlantis astro check 2>&1 | grep -i "authorbio\|error" | head -10`
Expected: no errors related to AuthorBio.

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/AuthorBio.astro
git commit -m "feat(shared): add AuthorBio component"
```

---

## Task 5: Wire `<AuthorBio>` into the blog post page and pass new fields to `buildBlogPosting`

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/blog/[slug].astro`

- [ ] **Step 1: Add the import**

Open `packages/atlantis/src/pages/[locale]/blog/[slug].astro`. Find the existing imports block (lines 1–13). Add this line after the `RelatedTours` import:

```astro
import AuthorBio from "@algarve-tourism/shared/components/AuthorBio.astro";
```

- [ ] **Step 2: Pass the new fields into `buildBlogPosting`**

In the same file, find the `buildBlogPosting` call (around lines 56–66). Replace it with:

```astro
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
```

- [ ] **Step 3: Render `<AuthorBio>` after the article body, before `<RelatedTours>`**

In the same file, find the `<RelatedTours ... />` block (around lines 150–157). Insert this directly above it:

```astro
      {post.data.authorBio && post.data.authorImage && (
        <AuthorBio
          name={post.data.author}
          bio={post.data.authorBio}
          image={post.data.authorImage}
          locale={locale}
        />
      )}

```

- [ ] **Step 4: Verify the build still passes with no content changes yet**

Run: `pnpm --filter @algarve-tourism/atlantis build 2>&1 | tail -10`
Expected: build succeeds. Existing 11 posts render unchanged (none have `authorBio`/`authorImage`, so `<AuthorBio>` does not render and JSON-LD `author` stays `Organization`).

- [ ] **Step 5: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/blog/[slug].astro
git commit -m "feat(atlantis): render AuthorBio + thread bio/image into BlogPosting JSON-LD"
```

---

## Task 6: Add Nuno's headshot asset

**Files:**
- Create: `packages/atlantis/public/authors/nuno-albino.jpg`

- [ ] **Step 1: Create the directory and add the photo**

User-provided file. The user is supplying a JPG photo of Nuno Albino. Save it as:

`packages/atlantis/public/authors/nuno-albino.jpg`

Recommended specs (if the user is asked to resize):
- Square crop, ≥ 400×400 px
- ≤ 200 KB after JPEG compression at quality 80
- Face roughly centred, head and shoulders

If the photo is not yet available at execution time, **skip this task** and continue with Tasks 7–10 — the markdown files reference `/authors/nuno-albino.jpg` as the path, so dropping the file in later just makes the existing posts render correctly. Do not invent a placeholder image.

- [ ] **Step 2: Verify the asset is reachable in dev**

Start the dev server: `pnpm dev:atlantis`

In a browser, open `http://localhost:4321/authors/nuno-albino.jpg`
Expected: image loads.

Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add packages/atlantis/public/authors/nuno-albino.jpg
git commit -m "chore(atlantis): add Nuno Albino author photo"
```

---

## Task 7: Write Post 1 EN — "Reef Fishing in the Algarve: What to Expect on the Boat"

**Files:**
- Create: `packages/atlantis/src/content/blog/en/reef-fishing-algarve-what-to-expect.md`

**Content brief:** ~1,400 words, 7-min read. Skipper-operator first-person plural voice ("we anchor", "we drop-line"). Match the tone of `packages/atlantis/src/content/blog/en/benagil-cave-tour-complete-guide.md`. Honest about lulls and weather; no marketing breathlessness.

**Tour facts to weave in (do not invent others):**
- Duration 4 hours
- Departs from Portimão Naval Club, Cais de São Francisco
- Reef ~5 km offshore
- Catches: sea bream, snapper, sea bass, gilthead, grouper
- All ages welcome; no licence, no gear, no experience required
- Take your catch home (cleaned and iced on the return)
- Pricing: from €84/person for groups of 6+; or €305 for the whole boat (1–5 pax)

**Explicitly out of scope** (from the Ads negative-keyword list — confirm the prose does not invite these queries): deep-sea / marlin / tuna / shark / swordfish sport fishing; fishing licence discussion; rods / reels / tackle retail; shore / pier / fly fishing; spearfishing.

- [ ] **Step 1: Create the file with this exact frontmatter**

```markdown
---
title: "Reef Fishing in the Algarve: What to Expect on the Boat"
date: "2026-04-30"
excerpt: "Anchored over a reef five kilometres off Portimão, dropping a line for sea bream and grouper. Here's what a half-day reef fishing trip on the Algarve actually looks like — straight from the skipper who runs it."
image: "https://cdn.filestackcontent.com/REPLACE-WITH-FILESTACK-URL"
imageAlt: "Anglers on the deck of a fishing boat anchored over a reef off the Algarve coast, lines in the water"
locale: en
translationKey: reef-fishing-algarve-what-to-expect
category: travel-tips
tags:
  - fishing
  - family
  - travel-tips
author: Nuno Albino
authorBio: "Nuno Albino has skippered the Atlantis Tours boats out of Portimão since 2018, running reef fishing trips, sail charters, and Cranchi yacht days. He grew up on this coast."
authorImage: "/authors/nuno-albino.jpg"
readingTime: 7
---
```

If the user has not yet provided a Filestack URL for the hero image, leave `REPLACE-WITH-FILESTACK-URL` as the literal placeholder and flag it in the post-task summary so the user can fill it in before deploy. Do not invent a Filestack ID.

- [ ] **Step 2: Write the body in the structure below**

Word counts are approximate targets, not hard limits. Each `##` heading is required.

```markdown
[Lede paragraph: ~150 words. What reef fishing on the Algarve actually is — anchored boat over a reef, drop-line gear, ~5 km offshore — and who books it: groups of friends, dads with kids, anyone wanting a different Algarve day. State up front it's not deep-sea sport fishing.]

## What You'll Catch

[~250 words. One short paragraph each on sea bream, snapper, sea bass, gilthead, grouper — when each is in season, how it fights on the line, what it tastes like cooked simply.]

## What the Day Looks Like

[~250 words. The 4-hour rhythm: meet at Portimão Naval Club (Cais de São Francisco — a sentence-level link to Post 2 here: "If you're looking for the dock walking-directions, see [Reef Fishing from Portimão](/en/blog/reef-fishing-portimao-half-day-guide/)"), transit out (~25 minutes), anchor, fish, transit back. Honest about lulls — sometimes the bite is steady for an hour and then nothing for 20 minutes.]

## Who It's For — And Who It Isn't

[~200 words. All ages welcome (kids genuinely catch fish on this trip). No licence, gear, or experience needed — we hand out the tackle, bait the hooks the first time. Explicitly NOT deep-sea sport fishing: no marlin, no tuna runs, no shark hunts. If you want big-game offshore, this isn't that trip.]

## Take Your Catch Home

[~200 words. We clean and ice your catch on the return. Sea bream and gilthead grilled whole over coals that night — link to [Portuguese Coastal Cuisine](/en/blog/portuguese-coastal-cuisine-algarve/) for what to do with them. Mention the cultural context briefly with a link to [Fishing Traditions of the Algarve Coast](/en/blog/fishing-traditions-algarve-coast/).]

## What It Costs

[~150 words. From €84 per person for groups of 6+ (scales up to 16). For 1–5 people, it's a €305 flat charter for the whole boat — works out to about €60 per person at full small-group capacity. Honest about which tier most bookers fall into.]

## Booking

[~100 words. Soft CTA pointing to /en/tours/reef-fishing-tour/. Mention boat takes up to 16, books up in summer especially on weekends. End with one practical line: "If you're already in the Algarve and want to go this week, message us — we usually have something within 48 hours."]
```

- [ ] **Step 3: Verify the build picks up the new post**

Run: `pnpm --filter @algarve-tourism/atlantis build 2>&1 | grep -i "error\|reef-fishing-algarve" | head -20`
Expected: no errors; the post appears in the build output.

- [ ] **Step 4: Verify in the dev server**

Run: `pnpm dev:atlantis`

Open `http://localhost:4321/en/blog/reef-fishing-algarve-what-to-expect/`. Confirm:
- The post renders end-to-end
- The `<AuthorBio>` block shows Nuno's name, bio, and photo (if photo was added in Task 6)
- View page source: JSON-LD `author` is `Person`, not `Organization`
- The "Reef Fishing" product card shows in `<RelatedTours>` (auto-resolved via the `fishing` tag)

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add packages/atlantis/src/content/blog/en/reef-fishing-algarve-what-to-expect.md
git commit -m "content(blog): add EN post 'Reef Fishing in the Algarve: What to Expect'"
```

---

## Task 8: Translate Post 1 to PT, ES, FR

**Files:**
- Create: `packages/atlantis/src/content/blog/pt/pesca-de-fundo-algarve-o-que-esperar.md`
- Create: `packages/atlantis/src/content/blog/es/pesca-de-fondo-algarve-que-esperar.md`
- Create: `packages/atlantis/src/content/blog/fr/peche-recif-algarve-quoi-attendre.md`

For each translation: full sentence-by-sentence translation of the EN body (Task 7). Preserve paragraph count, heading structure, and internal links — but **swap each internal link to its locale-matched slug**:

| EN slug → | PT slug | ES slug | FR slug |
|---|---|---|---|
| `reef-fishing-portimao-half-day-guide` | `pesca-de-fundo-portimao-meio-dia` | `pesca-de-fondo-portimao-medio-dia` | `peche-recif-portimao-demi-journee` |
| `portuguese-coastal-cuisine-algarve` | `cozinha-costeira-portuguesa-algarve` | `cocina-costera-portuguesa-algarve` | `cuisine-cotiere-portugaise-algarve` |
| `fishing-traditions-algarve-coast` | `tradicoes-pesca-costa-algarvia` | `tradiciones-pesca-costa-algarve` | `traditions-peche-cote-algarve` |

The CTA link per locale (the Atlantis tour data only has localised slugs for PT — ES and FR fall back to the EN data, so they keep the EN slug):

| Locale | Tour CTA URL |
|---|---|
| pt | `/pt/tours/pesca-de-fundo/` |
| es | `/es/tours/reef-fishing-tour/` |
| fr | `/fr/tours/reef-fishing-tour/` |

- [ ] **Step 1: Create the PT file**

Path: `packages/atlantis/src/content/blog/pt/pesca-de-fundo-algarve-o-que-esperar.md`

Frontmatter:

```markdown
---
title: "Pesca de Fundo no Algarve: O Que Esperar a Bordo"
date: "2026-04-30"
excerpt: "Ancorados sobre um recife a cinco quilómetros de Portimão, com a linha lançada à dourada e ao mero. Aqui está o que realmente acontece num passeio de pesca de meio-dia no Algarve — contado pelo skipper que o conduz."
image: "https://cdn.filestackcontent.com/REPLACE-WITH-FILESTACK-URL"
imageAlt: "Pescadores no convés de um barco de pesca ancorado sobre um recife na costa algarvia, linhas na água"
locale: pt
translationKey: reef-fishing-algarve-what-to-expect
category: travel-tips
tags:
  - fishing
  - family
  - travel-tips
author: Nuno Albino
authorBio: "Nuno Albino é skipper dos barcos Atlantis Tours em Portimão desde 2018, conduzindo passeios de pesca, charters de vela e dias a bordo do iate Cranchi. Cresceu nesta costa."
authorImage: "/authors/nuno-albino.jpg"
readingTime: 7
---
```

Body: full PT translation of the EN body, with internal links swapped per the table above. Reuse the same headings translated to PT (`O Que Vai Pescar`, `Como Decorre o Dia`, `Para Quem É — e Para Quem Não É`, `Levar a Pesca para Casa`, `Quanto Custa`, `Reservas`).

- [ ] **Step 2: Create the ES file**

Path: `packages/atlantis/src/content/blog/es/pesca-de-fondo-algarve-que-esperar.md`

Frontmatter title: `"Pesca de Fondo en el Algarve: Qué Esperar a Bordo"`. Excerpt and bio translated to ES. `locale: es`, same `translationKey: reef-fishing-algarve-what-to-expect`. Body: full ES translation with locale-matched links.

- [ ] **Step 3: Create the FR file**

Path: `packages/atlantis/src/content/blog/fr/peche-recif-algarve-quoi-attendre.md`

Frontmatter title: `"Pêche au Récif en Algarve : À Quoi S'attendre à Bord"`. Excerpt and bio translated to FR. `locale: fr`, same `translationKey: reef-fishing-algarve-what-to-expect`. Body: full FR translation with locale-matched links.

- [ ] **Step 4: Verify the build and hreflang**

Run: `pnpm --filter @algarve-tourism/atlantis build 2>&1 | tail -10`
Expected: build succeeds.

Run: `pnpm dev:atlantis` and open the EN post. View `<head>` source. Expected: four `<link rel="alternate" hreflang="en|pt|es|fr">` entries pointing at the four locale-specific URLs.

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add packages/atlantis/src/content/blog/pt/pesca-de-fundo-algarve-o-que-esperar.md \
       packages/atlantis/src/content/blog/es/pesca-de-fondo-algarve-que-esperar.md \
       packages/atlantis/src/content/blog/fr/peche-recif-algarve-quoi-attendre.md
git commit -m "content(blog): add PT/ES/FR translations of reef fishing post 1"
```

---

## Task 9: Write Post 2 EN — "Reef Fishing from Portimão: A Skipper's Half-Day Guide"

**Files:**
- Create: `packages/atlantis/src/content/blog/en/reef-fishing-portimao-half-day-guide.md`

**Content brief:** ~1,200 words, 6-min read. Same skipper voice as Post 1 but **leaner and more local** — concrete walking directions and dock landmark detail, less "what is reef fishing" content (Post 1 covers that; cross-link to it).

**Tour facts** (same as Post 1, do not duplicate facts already given in Post 1's body — reference it instead):
- Cais de São Francisco at Portimão Naval Club (NOT the Marina — common point of confusion among first-timers)
- Reef ~5 km offshore
- 4-hour trip

- [ ] **Step 1: Create the file with this frontmatter**

```markdown
---
title: "Reef Fishing from Portimão: A Skipper's Half-Day Guide"
date: "2026-04-30"
excerpt: "Where to actually meet us at Portimão Naval Club, what the dock looks like, and how a half-day reef fishing trip unfolds from this stretch of the Algarve. Practical notes from the skipper."
image: "https://cdn.filestackcontent.com/REPLACE-WITH-FILESTACK-URL"
imageAlt: "Fishing boats moored at Cais de São Francisco in Portimão Naval Club at golden hour"
locale: en
translationKey: reef-fishing-portimao-guide
category: destinations
tags:
  - fishing
  - family
  - travel-tips
author: Nuno Albino
authorBio: "Nuno Albino has skippered the Atlantis Tours boats out of Portimão since 2018, running reef fishing trips, sail charters, and Cranchi yacht days. He grew up on this coast."
authorImage: "/authors/nuno-albino.jpg"
readingTime: 6
---
```

- [ ] **Step 2: Write the body in the structure below**

```markdown
[Lede paragraph: ~120 words. Anchor the post in Portimão. One sentence linking back to Post 1 for general context: "For the broader picture of what reef fishing on the Algarve actually is, see [Reef Fishing in the Algarve: What to Expect](/en/blog/reef-fishing-algarve-what-to-expect/). This guide is the local one: where you meet us in Portimão and what a half-day looks like from this dock."]

## Where You Actually Meet Us

[~250 words. Cais de São Francisco at Portimão Naval Club. Walking directions from the Portimão town centre / from the typical hotel zones. Parking — what's free vs paid, summer crunch. **Important:** this is NOT the Marina de Portimão (other side of the river); first-timers mix them up. A landmark sentence so people find it: e.g. "look for the white naval-club building with the flagpoles, just before the bridge". The dock itself — what the boats look like.]

## The Reef

[~150 words. ~5 km offshore. Why this stretch fishes well: the reef structure, the currents, the species that hold here through the year. Brief — Post 1 has the catch detail.]

## The Half-Day Rhythm

[~200 words. 4 hours. Morning vs afternoon trade-offs (light, wind, parking, summer afternoon thunderstorm risk). The summer parking note matters — leave 20 extra minutes if you're driving in July/August.]

## What We Provide vs What to Bring

[~120 words. Short. Gear, bait, ice, rods, tackle, basic snacks/water — on us. From you: sunscreen, hat, water bottle, layer for the wind. One sentence linking out: "For the full packing list across all our trips, see [What to Pack for a Boat Tour in the Algarve](/en/blog/what-to-pack-algarve-boat-tour/)."]

## After the Trip

[~200 words. Eating your catch in Portimão — a tavern recommendation tone (don't name specific restaurants unless you're sure they exist; describe the type of place). Link to [Portuguese Coastal Cuisine](/en/blog/portuguese-coastal-cuisine-algarve/). One light paragraph on what else to do in Portimão the rest of the day — Praia da Rocha, the riverside, etc.]

## Booking

[~100 words. Soft CTA pointing to /en/tours/reef-fishing-tour/. Same last-line invitation as Post 1: same-week bookings usually possible.]
```

- [ ] **Step 3: Verify in the dev server**

Run: `pnpm dev:atlantis`

Open `http://localhost:4321/en/blog/reef-fishing-portimao-half-day-guide/`. Confirm: post renders, AuthorBio shows, RelatedTours shows the reef fishing card, internal links resolve.

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add packages/atlantis/src/content/blog/en/reef-fishing-portimao-half-day-guide.md
git commit -m "content(blog): add EN post 'Reef Fishing from Portimão: A Half-Day Guide'"
```

---

## Task 10: Translate Post 2 to PT, ES, FR

**Files:**
- Create: `packages/atlantis/src/content/blog/pt/pesca-de-fundo-portimao-meio-dia.md`
- Create: `packages/atlantis/src/content/blog/es/pesca-de-fondo-portimao-medio-dia.md`
- Create: `packages/atlantis/src/content/blog/fr/peche-recif-portimao-demi-journee.md`

Same translation rules as Task 8: full sentence-by-sentence translation, locale-matched internal links, same `translationKey: reef-fishing-portimao-guide` across all four locales.

The cross-link from Post 2 → Post 1 must use the locale-matched Post 1 slug:

| Locale | Post 1 slug |
|---|---|
| pt | `pesca-de-fundo-algarve-o-que-esperar` |
| es | `pesca-de-fondo-algarve-que-esperar` |
| fr | `peche-recif-algarve-quoi-attendre` |

- [ ] **Step 1: Create the PT file**

Path: `packages/atlantis/src/content/blog/pt/pesca-de-fundo-portimao-meio-dia.md`

Frontmatter title: `"Pesca de Fundo a Partir de Portimão: Guia de Meio-Dia do Skipper"`. Excerpt translated to PT. `locale: pt`, `translationKey: reef-fishing-portimao-guide`. Body: full PT translation with locale-matched links.

- [ ] **Step 2: Create the ES file**

Path: `packages/atlantis/src/content/blog/es/pesca-de-fondo-portimao-medio-dia.md`

Frontmatter title: `"Pesca de Fondo desde Portimão: Guía de Medio Día del Patrón"`. Excerpt translated to ES. `locale: es`, `translationKey: reef-fishing-portimao-guide`. Body: full ES translation.

- [ ] **Step 3: Create the FR file**

Path: `packages/atlantis/src/content/blog/fr/peche-recif-portimao-demi-journee.md`

Frontmatter title: `"Pêche au Récif depuis Portimão : Guide d'une Demi-Journée par le Skipper"`. Excerpt translated to FR. `locale: fr`, `translationKey: reef-fishing-portimao-guide`. Body: full FR translation.

- [ ] **Step 4: Verify build + hreflang**

Run: `pnpm --filter @algarve-tourism/atlantis build 2>&1 | tail -10`
Expected: build succeeds.

Run: `pnpm dev:atlantis`. Open the EN Post 2 and confirm hreflang `<link>` tags resolve to all three translations.

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add packages/atlantis/src/content/blog/pt/pesca-de-fundo-portimao-meio-dia.md \
       packages/atlantis/src/content/blog/es/pesca-de-fondo-portimao-medio-dia.md \
       packages/atlantis/src/content/blog/fr/peche-recif-portimao-demi-journee.md
git commit -m "content(blog): add PT/ES/FR translations of reef fishing post 2"
```

---

## Task 11: End-to-end verification + Ads changelog entry

**Files:**
- Modify: `docs/ads/atlantis/06-changelog.md`

- [ ] **Step 1: Final build check**

Run: `pnpm --filter @algarve-tourism/atlantis build 2>&1 | tail -20`
Expected: build succeeds, no warnings or errors.

- [ ] **Step 2: Run all tests**

Run: `pnpm test`
Expected: all suites PASS (including the 5 new `buildBlogPosting` tests from Task 2).

- [ ] **Step 3: Visual verification on dev server**

Run: `pnpm dev:atlantis`

For each of the 8 new URLs, open in a browser and confirm: post renders, hero image loads, `<AuthorBio>` block shows Nuno + bio + photo, internal links resolve to same-locale targets, `<RelatedTours>` shows the reef fishing card.

URLs to check:
- `http://localhost:4321/en/blog/reef-fishing-algarve-what-to-expect/`
- `http://localhost:4321/pt/blog/pesca-de-fundo-algarve-o-que-esperar/`
- `http://localhost:4321/es/blog/pesca-de-fondo-algarve-que-esperar/`
- `http://localhost:4321/fr/blog/peche-recif-algarve-quoi-attendre/`
- `http://localhost:4321/en/blog/reef-fishing-portimao-half-day-guide/`
- `http://localhost:4321/pt/blog/pesca-de-fundo-portimao-meio-dia/`
- `http://localhost:4321/es/blog/pesca-de-fondo-portimao-medio-dia/`
- `http://localhost:4321/fr/blog/peche-recif-portimao-demi-journee/`

- [ ] **Step 4: Structured-data spot check**

On the EN Post 1, view page source. Confirm the `<script type="application/ld+json">` for BlogPosting contains:

```json
"author": {
  "@type": "Person",
  "name": "Nuno Albino",
  "description": "Nuno Albino has skippered the Atlantis Tours boats...",
  "image": "/authors/nuno-albino.jpg"
}
```

On any existing post (e.g. `/en/blog/benagil-cave-tour-complete-guide/`), confirm the BlogPosting `author` is **still** `{"@type": "Organization", "name": "Atlantis Tours"}` — **regression check**.

- [ ] **Step 5: RSS feed check**

Open `http://localhost:4321/en/rss.xml`. Confirm both new EN posts appear in the feed. Repeat for `/pt/rss.xml`, `/es/rss.xml`, `/fr/rss.xml`.

Stop the dev server.

- [ ] **Step 6: Append a changelog entry**

Open `docs/ads/atlantis/06-changelog.md`. Add this entry **at the top** (above all existing entries):

```markdown
## 2026-04-30 — Reef fishing blog posts published

**What:** Published two new reef-fishing blog posts (national + Portimão sibling) in EN/PT/ES/FR. Introduced a signed-author byline pattern for Nuno Albino with `Person` JSON-LD (visible bio block + structured data). Existing 11 posts unchanged.

**Why:** The Reef Fishing campaign (€8/day, live since 2026-04-29) had zero supporting blog content. Two practical posts give organic search a route in and reinforce landing-page-experience signals for paid clicks. The Portimão-anchored sibling matches the +30% Portimão geo bid.

**Expected effect:** Slow ramp on organic impressions for "reef fishing algarve / portimão" and PT/ES/FR equivalents over 4–8 weeks. Possible small Quality-Score lift on the Reef Fishing campaign as the site adds topical breadth (low confidence; QS is sticky).

**Verify on:** 2026-05-28 — check Search Console for impressions on the 8 new URLs and any movement in Reef Fishing campaign CTR / Quality Score.
```

- [ ] **Step 7: Commit and push**

```bash
git add docs/ads/atlantis/06-changelog.md
git commit -m "docs(ads): log reef fishing blog publish in changelog"
git push
```

Cloudflare Pages will deploy on push (existing workflow).

- [ ] **Step 8: Post-deploy spot check**

After Cloudflare Pages reports a successful deploy, paste one production URL (e.g. `https://www.atlantistours.pt/en/blog/reef-fishing-algarve-what-to-expect/`) into Google's Rich Results Test (`https://search.google.com/test/rich-results`). Expected: BlogPosting detected with Person author. No errors.
