# Atlantis Tours Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an SEO-focused blog to atlantistours.pt with categories, tags, auto tour linking, pagination, and multilingual support.

**Architecture:** Extend the existing blog content collection with category/tag/translationKey fields. Build category and tag index pages as dynamic Astro routes. Create a RelatedTours component that resolves tags to tours via a configurable mapping. Thread per-locale hreflang through the SEO component for blog posts with locale-specific slugs.

**Tech Stack:** Astro 5, Zod schemas, CSS custom properties, JSON-based i18n

**Spec:** `docs/superpowers/specs/2026-04-16-atlantis-blog-design.md`

---

## File Map

### Modified files
| File | Responsibility |
|------|---------------|
| `packages/atlantis/src/content/config.ts` | Add category, tags, translationKey, lastModified, imageAlt, readingTime, relatedTourSlugs to blog schema |
| `packages/atlantis/src/config.ts` | Add blogCategories and tagTourMap exports |
| `packages/shared/src/i18n/types.ts` | Add new TranslationKey entries for blog |
| `packages/shared/src/i18n/locales/en.json` | Add EN blog translation strings |
| `packages/shared/src/i18n/locales/pt.json` | Add PT blog translation strings |
| `packages/shared/src/i18n/locales/es.json` | Add ES blog translation strings |
| `packages/shared/src/i18n/locales/fr.json` | Add FR blog translation strings |
| `packages/shared/src/seo/structured-data.ts` | Enhance buildBlogPosting with articleSection, keywords, dateModified |
| `packages/shared/src/components/SEO.astro` | Add optional alternateUrls prop, article:section/tag meta |
| `packages/shared/src/layouts/PageLayout.astro` | Thread alternateUrls to SEO |
| `packages/atlantis/src/layouts/Layout.astro` | Thread alternateUrls to PageLayout |
| `packages/shared/src/components/Header.astro` | Add Blog nav item for Atlantis brand |
| `packages/atlantis/src/pages/[locale]/blog/index.astro` | Add pagination, structured data, empty state |
| `packages/atlantis/src/pages/[locale]/blog/[slug].astro` | Add hero image, category/tag links, RelatedTours, hreflang, enhanced breadcrumbs |
| `packages/atlantis/src/pages/[locale]/index.astro` | Add "Latest from the Blog" section |
| `packages/atlantis/src/pages/rss.xml.ts` | Remove (replaced by per-locale) |
| `packages/atlantis/src/content/blog/en/welcome.md` | Update with new frontmatter fields |
| `packages/atlantis/public/_redirects` | Add /rss.xml -> /en/rss.xml redirect |

### New files
| File | Responsibility |
|------|---------------|
| `packages/shared/src/components/RelatedTours.astro` | Auto-link tours based on post tags via tagTourMap |
| `packages/shared/src/components/Pagination.astro` | Prev/next pagination links |
| `packages/atlantis/src/pages/[locale]/blog/page/[page].astro` | Paginated blog index (page 2+) |
| `packages/atlantis/src/pages/[locale]/blog/category/[category]/index.astro` | Category index page |
| `packages/atlantis/src/pages/[locale]/blog/tag/[tag]/index.astro` | Tag index page |
| `packages/atlantis/src/pages/[locale]/rss.xml.ts` | Per-locale RSS feed |

---

### Task 1: Extend Blog Content Schema

**Files:**
- Modify: `packages/atlantis/src/content/config.ts`

- [ ] **Step 1: Update the blog collection schema**

Replace the entire file content:

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

- [ ] **Step 2: Update the placeholder blog post with new fields**

Replace `packages/atlantis/src/content/blog/en/welcome.md`:

```markdown
---
title: Welcome to Atlantis Tours
date: "2026-04-01"
author: Atlantis Tours
excerpt: Discover what makes our Algarve boat tours unforgettable.
locale: en
translationKey: welcome
category: travel-tips
tags:
  - benagil
  - caves
---

Welcome to the new Atlantis Tours website! We're excited to share our passion for the Algarve coast with you.
```

- [ ] **Step 3: Verify the build still works**

Run: `cd packages/atlantis && npx astro check 2>&1 | head -20`

Expected: No schema-related errors. Existing posts should validate against the new schema.

- [ ] **Step 4: Commit**

```bash
git add packages/atlantis/src/content/config.ts packages/atlantis/src/content/blog/en/welcome.md
git commit -m "feat(blog): extend content schema with categories, tags, and translationKey"
```

---

### Task 2: Add Blog Configuration

**Files:**
- Modify: `packages/atlantis/src/config.ts`

- [ ] **Step 1: Add blogCategories and tagTourMap to Atlantis config**

Add these exports after the existing `tourCategories` export in `packages/atlantis/src/config.ts`:

```typescript
export const blogCategories = [
  "destinations",
  "travel-tips",
  "marine-life",
  "local-culture",
  "seasonal",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export const tagTourMap: Record<string, number[]> = {
  benagil: [717720, 717728],
  caves: [717720, 717728],
  yacht: [717754, 720028],
  sailing: [717754],
  fishing: [718024],
  luxury: [717754, 720028],
  sunset: [717754],
  dolphins: [717720, 717728],
  family: [717720, 717728],
};
```

- [ ] **Step 2: Commit**

```bash
git add packages/atlantis/src/config.ts
git commit -m "feat(blog): add blog categories and tag-to-tour mapping config"
```

---

### Task 3: Add i18n Translation Keys

**Files:**
- Modify: `packages/shared/src/i18n/types.ts`
- Modify: `packages/shared/src/i18n/locales/en.json`
- Modify: `packages/shared/src/i18n/locales/pt.json`
- Modify: `packages/shared/src/i18n/locales/es.json`
- Modify: `packages/shared/src/i18n/locales/fr.json`

- [ ] **Step 1: Add new keys to TranslationStrings interface**

In `packages/shared/src/i18n/types.ts`, add these entries before the closing `}` of the interface (after the `"cta.reviews_subtitle": string;` line):

```typescript
  // Blog
  "blog.category": string;
  "blog.tags": string;
  "blog.reading_time": string;
  "blog.related_tours": string;
  "blog.all_posts": string;
  "blog.no_posts": string;
  "blog.page": string;
  "blog.previous": string;
  "blog.next": string;
  "blog.meta_description": string;
  "blog.category.destinations": string;
  "blog.category.travel-tips": string;
  "blog.category.marine-life": string;
  "blog.category.local-culture": string;
  "blog.category.seasonal": string;
  "home.blog_label": string;
  "home.blog_title": string;
  "home.view_all_posts": string;
```

- [ ] **Step 2: Add EN translation strings**

In `packages/shared/src/i18n/locales/en.json`, add before the closing `}`:

```json
  "blog.category": "Category",
  "blog.tags": "Tags",
  "blog.reading_time": "min read",
  "blog.related_tours": "Explore These Tours",
  "blog.all_posts": "All Posts",
  "blog.no_posts": "No posts yet. Check back soon!",
  "blog.page": "Page",
  "blog.previous": "Previous",
  "blog.next": "Next",
  "blog.meta_description": "Algarve travel guides, tips, and stories from the coast. Plan your perfect Algarve trip with Atlantis Tours.",
  "blog.category.destinations": "Destinations",
  "blog.category.travel-tips": "Travel Tips",
  "blog.category.marine-life": "Marine Life",
  "blog.category.local-culture": "Local Culture",
  "blog.category.seasonal": "Seasonal Guides",
  "home.blog_label": "From the Blog",
  "home.blog_title": "Latest from <em>the Blog</em>",
  "home.view_all_posts": "View all posts"
```

- [ ] **Step 3: Add PT translation strings**

In `packages/shared/src/i18n/locales/pt.json`, add before the closing `}`:

```json
  "blog.category": "Categoria",
  "blog.tags": "Tags",
  "blog.reading_time": "min de leitura",
  "blog.related_tours": "Explore Estes Passeios",
  "blog.all_posts": "Todos os Artigos",
  "blog.no_posts": "Ainda não há artigos. Volte em breve!",
  "blog.page": "Página",
  "blog.previous": "Anterior",
  "blog.next": "Seguinte",
  "blog.meta_description": "Guias de viagem, dicas e histórias da costa algarvia. Planeie a sua viagem perfeita ao Algarve com a Atlantis Tours.",
  "blog.category.destinations": "Destinos",
  "blog.category.travel-tips": "Dicas de Viagem",
  "blog.category.marine-life": "Vida Marinha",
  "blog.category.local-culture": "Cultura Local",
  "blog.category.seasonal": "Guias Sazonais",
  "home.blog_label": "Do Blog",
  "home.blog_title": "Mais Recentes do <em>Blog</em>",
  "home.view_all_posts": "Ver todos os artigos"
```

- [ ] **Step 4: Add ES translation strings**

In `packages/shared/src/i18n/locales/es.json`, add before the closing `}`:

```json
  "blog.category": "Categoría",
  "blog.tags": "Etiquetas",
  "blog.reading_time": "min de lectura",
  "blog.related_tours": "Explora Estos Tours",
  "blog.all_posts": "Todos los Artículos",
  "blog.no_posts": "Aún no hay artículos. ¡Vuelve pronto!",
  "blog.page": "Página",
  "blog.previous": "Anterior",
  "blog.next": "Siguiente",
  "blog.meta_description": "Guías de viaje, consejos e historias de la costa del Algarve. Planifica tu viaje perfecto al Algarve con Atlantis Tours.",
  "blog.category.destinations": "Destinos",
  "blog.category.travel-tips": "Consejos de Viaje",
  "blog.category.marine-life": "Vida Marina",
  "blog.category.local-culture": "Cultura Local",
  "blog.category.seasonal": "Guías Estacionales",
  "home.blog_label": "Del Blog",
  "home.blog_title": "Lo Último del <em>Blog</em>",
  "home.view_all_posts": "Ver todos los artículos"
```

- [ ] **Step 5: Add FR translation strings**

In `packages/shared/src/i18n/locales/fr.json`, add before the closing `}`:

```json
  "blog.category": "Catégorie",
  "blog.tags": "Tags",
  "blog.reading_time": "min de lecture",
  "blog.related_tours": "Découvrez Ces Circuits",
  "blog.all_posts": "Tous les Articles",
  "blog.no_posts": "Pas encore d'articles. Revenez bientôt !",
  "blog.page": "Page",
  "blog.previous": "Précédent",
  "blog.next": "Suivant",
  "blog.meta_description": "Guides de voyage, conseils et récits de la côte de l'Algarve. Planifiez votre voyage parfait en Algarve avec Atlantis Tours.",
  "blog.category.destinations": "Destinations",
  "blog.category.travel-tips": "Conseils de Voyage",
  "blog.category.marine-life": "Vie Marine",
  "blog.category.local-culture": "Culture Locale",
  "blog.category.seasonal": "Guides Saisonniers",
  "home.blog_label": "Du Blog",
  "home.blog_title": "Les Derniers Articles du <em>Blog</em>",
  "home.view_all_posts": "Voir tous les articles"
```

- [ ] **Step 6: Verify TypeScript is happy**

Run: `cd packages/shared && npx tsc --noEmit 2>&1 | head -20`

Expected: No errors related to missing translation keys.

- [ ] **Step 7: Commit**

```bash
git add packages/shared/src/i18n/types.ts packages/shared/src/i18n/locales/
git commit -m "feat(blog): add blog translation keys for all 4 locales"
```

---

### Task 4: Enhance SEO Infrastructure

**Files:**
- Modify: `packages/shared/src/seo/structured-data.ts`
- Modify: `packages/shared/src/components/SEO.astro`
- Modify: `packages/shared/src/layouts/PageLayout.astro`
- Modify: `packages/atlantis/src/layouts/Layout.astro`

- [ ] **Step 1: Enhance buildBlogPosting in structured-data.ts**

In `packages/shared/src/seo/structured-data.ts`, replace the existing `buildBlogPosting` function:

```typescript
export function buildBlogPosting(
  config: BrandConfig,
  post: {
    title: string;
    excerpt: string;
    date: string;
    lastModified?: string;
    author?: string;
    image?: string;
    slug: string;
    category?: string;
    tags?: string[];
  },
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    ...(post.lastModified && { dateModified: post.lastModified }),
    ...(post.category && { articleSection: post.category }),
    ...(post.tags && post.tags.length > 0 && { keywords: post.tags.join(", ") }),
    author: {
      "@type": "Organization",
      name: config.name,
    },
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

- [ ] **Step 2: Add alternateUrls prop to SEO.astro**

In `packages/shared/src/components/SEO.astro`, replace the entire file with:

```astro
---
import type { BrandConfig, Locale } from "../types.js";
import { getAlternateLocales } from "../config.js";

interface Props {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  locale: Locale;
  path: string;
  config: BrandConfig;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  publishedDate?: string;
  modifiedDate?: string;
  articleSection?: string;
  articleTags?: string[];
  noindex?: boolean;
  alternateUrls?: { locale: Locale; href: string }[];
}

const {
  title, description, image, type = "website",
  locale, path, config, structuredData, publishedDate, modifiedDate,
  articleSection, articleTags, noindex, alternateUrls,
} = Astro.props;

const siteName = config.name;
const fullTitle = `${title} | ${siteName}`;
const canonicalUrl = `https://www.${config.domain}/${locale}${path}`;
const ogImage = image ?? `https://www.${config.domain}/og-default.jpg`;
const alternates = alternateUrls ?? getAlternateLocales(config, locale, path);
---

<title>{fullTitle}</title>
<meta name="description" content={description} />
{noindex && <meta name="robots" content="noindex, nofollow" />}
<link rel="canonical" href={canonicalUrl} />

<!-- Open Graph -->
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:type" content={type} />
<meta property="og:site_name" content={siteName} />
<meta property="og:locale" content={locale} />
{type === "article" && publishedDate && (
  <meta property="article:published_time" content={publishedDate} />
)}
{type === "article" && modifiedDate && (
  <meta property="article:modified_time" content={modifiedDate} />
)}
{type === "article" && articleSection && (
  <meta property="article:section" content={articleSection} />
)}
{type === "article" && articleTags && articleTags.map((tag) => (
  <meta property="article:tag" content={tag} />
))}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />

<!-- Hreflang alternates -->
{alternates.map(({ locale: lang, href }) => (
  <link rel="alternate" hreflang={lang} href={href} />
))}
<link rel="alternate" hreflang="x-default" href={alternateUrls ? (alternateUrls.find(a => a.locale === "en")?.href ?? `https://www.${config.domain}/en${path}`) : `https://www.${config.domain}/en${path}`} />

<!-- RSS Feed -->
<link rel="alternate" type="application/rss+xml" title={siteName} href={`https://www.${config.domain}/${locale}/rss.xml`} />

<!-- Structured data -->
{structuredData && !Array.isArray(structuredData) && (
  <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
)}
{Array.isArray(structuredData) && structuredData.map((sd) => (
  <script type="application/ld+json" set:html={JSON.stringify(sd)} />
))}
```

- [ ] **Step 3: Thread new props through PageLayout.astro**

In `packages/shared/src/layouts/PageLayout.astro`, update the Props interface and destructuring:

```astro
---
import SEO from '../components/SEO.astro';
import type { BrandConfig, Locale } from '../types';

interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  locale: string;
  path: string;
  config: BrandConfig;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  publishedDate?: string;
  modifiedDate?: string;
  articleSection?: string;
  articleTags?: string[];
  noindex?: boolean;
  alternateUrls?: { locale: Locale; href: string }[];
}

const { title, description, image, type = 'website', locale, path, config, structuredData, publishedDate, modifiedDate, articleSection, articleTags, noindex, alternateUrls } = Astro.props;
const brand = config.brand;

const fontUrls: Record<string, string> = {
  'atlantis': 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600;700&display=swap',
  'algarve-and-you': 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap',
};
const fontUrl = fontUrls[brand] || fontUrls['atlantis'];
---

<!DOCTYPE html>
<html lang={locale}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="dns-prefetch" href="https://cdn.filestackcontent.com" />
  <link rel="preconnect" href="https://cdn.filestackcontent.com" />
  <link rel="preconnect" href="https://fareharbor.com" />
  <link href={fontUrl} rel="stylesheet" />
  <SEO
    title={title}
    description={description}
    image={image}
    type={type}
    locale={locale}
    path={path}
    config={config}
    structuredData={structuredData}
    publishedDate={publishedDate}
    modifiedDate={modifiedDate}
    articleSection={articleSection}
    articleTags={articleTags}
    noindex={noindex}
    alternateUrls={alternateUrls}
  />
  {config.analytics.gtag && (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.gtag}`}></script>
      <script define:vars={{ gtagId: config.analytics.gtag }}>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', gtagId);
      </script>
    </>
  )}
</head>
<body>
  <slot name="header" />
  <main>
    <slot />
  </main>
  <slot name="footer" />
  <script defer src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"></script>
</body>
</html>

<style is:global>
  @import "@algarve-tourism/shared/styles/tokens.css";
  @import "@algarve-tourism/shared/styles/base.css";
  @import "@algarve-tourism/shared/styles/utilities.css";
</style>

<script>
  // Scroll reveal
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(20px)';
      (el as HTMLElement).style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }
</script>
```

- [ ] **Step 4: Thread new props through Layout.astro**

Replace `packages/atlantis/src/layouts/Layout.astro`:

```astro
---
import PageLayout from '@algarve-tourism/shared/layouts/PageLayout.astro';
import type { BrandConfig, Locale } from '@algarve-tourism/shared';

interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  locale: string;
  path: string;
  config: BrandConfig;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  publishedDate?: string;
  modifiedDate?: string;
  articleSection?: string;
  articleTags?: string[];
  noindex?: boolean;
  alternateUrls?: { locale: Locale; href: string }[];
}

const props = Astro.props;
---

<PageLayout {...props}>
  <slot name="header" slot="header" />
  <slot />
  <slot name="footer" slot="footer" />
</PageLayout>

<style is:global>
  @import "../styles/tokens.css";
</style>
```

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/seo/structured-data.ts packages/shared/src/components/SEO.astro packages/shared/src/layouts/PageLayout.astro packages/atlantis/src/layouts/Layout.astro
git commit -m "feat(blog): enhance SEO with article meta tags, alternateUrls, and richer BlogPosting schema"
```

---

### Task 5: Add Blog Link to Atlantis Nav

**Files:**
- Modify: `packages/shared/src/components/Header.astro`

- [ ] **Step 1: Add Blog to the Atlantis nav items array**

In `packages/shared/src/components/Header.astro`, find the Atlantis nav items block and add the Blog entry between Reviews and Contact:

Find this code:
```typescript
const navItems: NavItem[] =
  brand === "atlantis"
    ? [
        { label: t(locale, "nav.tours"), href: getLocalePath(locale, "/tours/") },
        { label: t(locale, "nav.about"), href: getLocalePath(locale, "/about/") },
        { label: t(locale, "nav.reviews"), href: getLocalePath(locale, "/reviews/") },
        { label: t(locale, "nav.contact"), href: getLocalePath(locale, "/contact/") },
      ]
```

Replace with:
```typescript
const navItems: NavItem[] =
  brand === "atlantis"
    ? [
        { label: t(locale, "nav.tours"), href: getLocalePath(locale, "/tours/") },
        { label: t(locale, "nav.about"), href: getLocalePath(locale, "/about/") },
        { label: t(locale, "nav.reviews"), href: getLocalePath(locale, "/reviews/") },
        { label: t(locale, "nav.blog"), href: getLocalePath(locale, "/blog/") },
        { label: t(locale, "nav.contact"), href: getLocalePath(locale, "/contact/") },
      ]
```

- [ ] **Step 2: Commit**

```bash
git add packages/shared/src/components/Header.astro
git commit -m "feat(blog): add Blog link to Atlantis nav header"
```

---

### Task 6: Build RelatedTours Component

**Files:**
- Create: `packages/shared/src/components/RelatedTours.astro`

- [ ] **Step 1: Create the RelatedTours component**

Create `packages/shared/src/components/RelatedTours.astro`:

```astro
---
import type { NormalizedItem, Brand, Locale } from "../types.js";
import { t } from "../i18n/index.js";
import ProductCard from "./ProductCard.astro";

interface Props {
  tags: string[];
  locale: Locale;
  brand: Brand;
  items: NormalizedItem[];
  tagTourMap: Record<string, number[]>;
  relatedTourSlugs?: string[];
}

const { tags, locale, brand, items, tagTourMap, relatedTourSlugs } = Astro.props;

let relatedItems: NormalizedItem[] = [];

if (relatedTourSlugs && relatedTourSlugs.length > 0) {
  // Manual override: find items by slug
  relatedItems = relatedTourSlugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is NormalizedItem => item !== undefined);
} else {
  // Auto-resolve: collect unique pks from tag mappings
  const pks = new Set<number>();
  for (const tag of tags) {
    const mapped = tagTourMap[tag];
    if (mapped) {
      for (const pk of mapped) pks.add(pk);
    }
  }
  relatedItems = items.filter((item) => pks.has(item.pk));
}

// Limit to 3
relatedItems = relatedItems.slice(0, 3);
---

{relatedItems.length > 0 && (
  <section class="related-tours">
    <h2 class="related-tours__title">{t(locale, "blog.related_tours")}</h2>
    <div class="related-tours__grid">
      {relatedItems.map((item) => (
        <ProductCard item={item} brand={brand} locale={locale} />
      ))}
    </div>
  </section>
)}

<style>
  .related-tours {
    margin-top: var(--space-12);
    padding-top: var(--space-10);
    border-top: 1px solid var(--color-border);
  }

  .related-tours__title {
    font-family: var(--font-accent);
    font-size: var(--text-2xl);
    font-weight: var(--weight-regular);
    color: var(--color-text);
    margin-bottom: var(--space-8);
    font-style: italic;
  }

  .related-tours__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-6);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/shared/src/components/RelatedTours.astro
git commit -m "feat(blog): create RelatedTours component for auto-linking tours from tags"
```

---

### Task 7: Build Pagination Component

**Files:**
- Create: `packages/shared/src/components/Pagination.astro`

- [ ] **Step 1: Create the Pagination component**

Create `packages/shared/src/components/Pagination.astro`:

```astro
---
import type { Locale, Brand } from "../types.js";
import { t } from "../i18n/index.js";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
  locale: Locale;
  brand: Brand;
}

const { currentPage, totalPages, basePath, locale, brand } = Astro.props;

const prevPage = currentPage > 1 ? currentPage - 1 : null;
const nextPage = currentPage < totalPages ? currentPage + 1 : null;

function getPageUrl(page: number): string {
  if (page === 1) return `/${locale}${basePath}`;
  return `/${locale}${basePath}page/${page}/`;
}
---

{totalPages > 1 && (
  <nav class="pagination" aria-label="Pagination" data-brand={brand}>
    {prevPage !== null ? (
      <a href={getPageUrl(prevPage)} class="pagination__link pagination__prev">
        &larr; {t(locale, "blog.previous")}
      </a>
    ) : (
      <span class="pagination__link pagination__prev pagination__disabled">
        &larr; {t(locale, "blog.previous")}
      </span>
    )}

    <span class="pagination__info">
      {t(locale, "blog.page")} {currentPage} / {totalPages}
    </span>

    {nextPage !== null ? (
      <a href={getPageUrl(nextPage)} class="pagination__link pagination__next">
        {t(locale, "blog.next")} &rarr;
      </a>
    ) : (
      <span class="pagination__link pagination__next pagination__disabled">
        {t(locale, "blog.next")} &rarr;
      </span>
    )}
  </nav>
)}

<style>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-6);
    margin-top: var(--space-10);
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-border);
  }

  .pagination__link {
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-primary);
    text-decoration: none;
    transition: opacity var(--transition-fast);
  }

  .pagination__link:hover {
    text-decoration: underline;
  }

  .pagination__disabled {
    color: var(--color-text-muted);
    pointer-events: none;
    opacity: 0.5;
  }

  .pagination__info {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/shared/src/components/Pagination.astro
git commit -m "feat(blog): create Pagination component"
```

---

### Task 8: Enhance Blog Post Page

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/blog/[slug].astro`

- [ ] **Step 1: Rewrite the blog post page with all enhancements**

Replace the entire file `packages/atlantis/src/pages/[locale]/blog/[slug].astro`:

```astro
---
import { getCollection } from "astro:content";
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t, buildBlogPosting, buildBreadcrumbList, getLocalePath } from "@algarve-tourism/shared";
import Layout from "../../../layouts/Layout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import RelatedTours from "@algarve-tourism/shared/components/RelatedTours.astro";
import { config, tagTourMap } from "../../../config.js";
import { loadItems } from "../../../data.js";
import { optimizeImageUrl } from "@algarve-tourism/shared";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: {
      locale: post.data.locale,
      slug: post.slug.replace(`${post.data.locale}/`, ""),
    },
    props: { post },
  }));
}

const { post } = Astro.props;
const locale = Astro.params.locale as Locale;
const slug = Astro.params.slug as string;
const { Content } = await post.render();

// Build alternate URLs for hreflang using translationKey
const allPosts = await getCollection("blog");
const translations = allPosts.filter(
  (p) => p.data.translationKey === post.data.translationKey && p.data.locale !== locale
);
const alternateUrls = [
  { locale, href: `https://www.${config.domain}/${locale}/blog/${slug}/` },
  ...translations.map((p) => ({
    locale: p.data.locale as Locale,
    href: `https://www.${config.domain}/${p.data.locale}/blog/${p.slug.replace(`${p.data.locale}/`, "")}/`,
  })),
];

// Category label
const categoryLabel = t(locale, `blog.category.${post.data.category}` as any);

// Structured data
const structuredData = [
  buildBlogPosting(config, {
    title: post.data.title,
    excerpt: post.data.excerpt,
    date: post.data.date,
    lastModified: post.data.lastModified,
    author: post.data.author,
    image: post.data.image,
    slug,
    category: categoryLabel,
    tags: post.data.tags,
  }, locale),
  buildBreadcrumbList(config, locale, [
    { name: "Home", path: "/" },
    { name: t(locale, "nav.blog"), path: "/blog/" },
    { name: categoryLabel, path: `/blog/category/${post.data.category}/` },
    { name: post.data.title, path: `/blog/${slug}/` },
  ]),
];

// Load tour data for RelatedTours
const items = loadItems(locale);
const tags = post.data.tags ?? [];

// Hero image
const heroImage = post.data.image ? optimizeImageUrl(post.data.image, 1200) : null;
---

<Layout
  title={post.data.title}
  description={post.data.excerpt}
  image={post.data.image}
  type="article"
  locale={locale}
  path={`/blog/${slug}/`}
  config={config}
  structuredData={structuredData}
  publishedDate={post.data.date}
  modifiedDate={post.data.lastModified}
  articleSection={categoryLabel}
  articleTags={tags}
  alternateUrls={alternateUrls}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/blog/${slug}/`} />

  <article class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    {/* Breadcrumbs */}
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href={getLocalePath(locale, "/")}>{config.name}</a>
      <span class="breadcrumbs__sep">/</span>
      <a href={getLocalePath(locale, "/blog/")}>{t(locale, "nav.blog")}</a>
      <span class="breadcrumbs__sep">/</span>
      <a href={getLocalePath(locale, `/blog/category/${post.data.category}/`)}>{categoryLabel}</a>
      <span class="breadcrumbs__sep">/</span>
      <span aria-current="page">{post.data.title}</span>
    </nav>

    {/* Hero image */}
    {heroImage && (
      <div class="hero-image">
        <img src={heroImage} alt={post.data.imageAlt ?? post.data.title} width="1200" height="630" />
      </div>
    )}

    {/* Post header */}
    <header class="post-header">
      <a href={getLocalePath(locale, `/blog/category/${post.data.category}/`)} class="post-category">
        {categoryLabel}
      </a>
      <h1>{post.data.title}</h1>
      <div class="post-meta">
        <time>{new Date(post.data.date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}</time>
        {post.data.readingTime && (
          <span class="post-meta__reading">
            {post.data.readingTime} {t(locale, "blog.reading_time")}
          </span>
        )}
      </div>
    </header>

    {/* Post content */}
    <div class="page-content">
      <Content />
    </div>

    {/* Tags */}
    {tags.length > 0 && (
      <div class="post-tags">
        {tags.map((tag) => (
          <a href={getLocalePath(locale, `/blog/tag/${tag}/`)} class="tag">
            {tag.replace(/-/g, " ")}
          </a>
        ))}
      </div>
    )}

    {/* Related Tours */}
    <RelatedTours
      tags={tags}
      locale={locale}
      brand={config.brand}
      items={items}
      tagTourMap={tagTourMap}
      relatedTourSlugs={post.data.relatedTourSlugs}
    />
  </article>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} locale={locale} />
</Layout>

<style>
  article { display: flex; flex-direction: column; gap: var(--space-4); }

  .breadcrumbs {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    margin-bottom: var(--space-6);
  }
  .breadcrumbs a {
    color: var(--color-text-muted);
    text-decoration: none;
  }
  .breadcrumbs a:hover { color: var(--color-primary); }
  .breadcrumbs__sep { opacity: 0.5; }
  .breadcrumbs [aria-current] {
    color: var(--color-text);
    font-weight: var(--weight-medium);
  }

  .hero-image {
    border-radius: var(--radius-card);
    overflow: hidden;
    margin-bottom: var(--space-6);
    aspect-ratio: 16 / 9;
  }
  .hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .post-header { margin-bottom: var(--space-4); }

  .post-category {
    display: inline-block;
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-primary);
    text-decoration: none;
    margin-bottom: var(--space-3);
  }
  .post-category:hover { text-decoration: underline; }

  .post-meta {
    display: flex;
    gap: var(--space-4);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }
  .post-meta__reading::before {
    content: "·";
    margin-right: var(--space-4);
  }

  .page-content {
    max-width: 680px;
    margin-top: var(--space-6);
    font-size: var(--text-lg);
    line-height: var(--leading-relaxed);
    color: var(--color-text-body);
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-8);
  }
  .tag {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-button);
    text-decoration: none;
    text-transform: capitalize;
    transition: border-color var(--transition-fast), color var(--transition-fast);
  }
  .tag:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/blog/[slug].astro
git commit -m "feat(blog): enhance blog post page with hero, categories, tags, related tours, and hreflang"
```

---

### Task 9: Enhance Blog Index with Pagination

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/blog/index.astro`
- Create: `packages/atlantis/src/pages/[locale]/blog/page/[page].astro`

- [ ] **Step 1: Rewrite the blog index page**

Replace `packages/atlantis/src/pages/[locale]/blog/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t, buildCollectionPage, buildBreadcrumbList } from "@algarve-tourism/shared";
import Layout from "../../../layouts/Layout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import BlogCard from "@algarve-tourism/shared/components/BlogCard.astro";
import Pagination from "@algarve-tourism/shared/components/Pagination.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../../config.js";

const POSTS_PER_PAGE = 9;

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;
const allPosts = await getCollection("blog");
const posts = allPosts
  .filter((post) => post.data.locale === locale)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
const pagePosts = posts.slice(0, POSTS_PER_PAGE);

const structuredData = [
  buildCollectionPage(config, locale, "/blog/", t(locale, "nav.blog"), t(locale, "blog.meta_description")),
  buildBreadcrumbList(config, locale, [
    { name: "Home", path: "/" },
    { name: t(locale, "nav.blog"), path: "/blog/" },
  ]),
];
---

<Layout
  title={t(locale, "nav.blog")}
  description={t(locale, "blog.meta_description")}
  locale={locale}
  path="/blog/"
  config={config}
  structuredData={structuredData}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/blog/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{t(locale, "nav.blog")}</h1>
    {pagePosts.length > 0 ? (
      <>
        <div class="blog-grid">
          {pagePosts.map((post) => (
            <BlogCard
              title={post.data.title}
              excerpt={post.data.excerpt}
              slug={post.slug.replace(`${locale}/`, "")}
              image={post.data.image}
              date={post.data.date}
              locale={locale}
              brand={config.brand}
            />
          ))}
        </div>
        <Pagination
          currentPage={1}
          totalPages={totalPages}
          basePath="/blog/"
          locale={locale}
          brand={config.brand}
        />
      </>
    ) : (
      <p class="text-muted">{t(locale, "blog.no_posts")}</p>
    )}
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} locale={locale} />
</Layout>

<style>
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-8);
  }
</style>
```

- [ ] **Step 2: Create the paginated blog page**

Create `packages/atlantis/src/pages/[locale]/blog/page/[page].astro`:

```astro
---
import { getCollection } from "astro:content";
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t, buildCollectionPage, buildBreadcrumbList } from "@algarve-tourism/shared";
import Layout from "../../../../layouts/Layout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import BlogCard from "@algarve-tourism/shared/components/BlogCard.astro";
import Pagination from "@algarve-tourism/shared/components/Pagination.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../../../config.js";

const POSTS_PER_PAGE = 9;

export async function getStaticPaths() {
  const allPosts = await getCollection("blog");

  return LOCALES.flatMap((locale) => {
    const localePosts = allPosts.filter((p) => p.data.locale === locale);
    const totalPages = Math.ceil(localePosts.length / POSTS_PER_PAGE);

    // Generate pages 2+ (page 1 is handled by blog/index.astro)
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      params: { locale, page: String(i + 2) },
    }));
  });
}

const locale = Astro.params.locale as Locale;
const currentPage = Number(Astro.params.page);

const allPosts = await getCollection("blog");
const posts = allPosts
  .filter((post) => post.data.locale === locale)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
const start = (currentPage - 1) * POSTS_PER_PAGE;
const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

const structuredData = [
  buildCollectionPage(config, locale, `/blog/page/${currentPage}/`, `${t(locale, "nav.blog")} — ${t(locale, "blog.page")} ${currentPage}`, t(locale, "blog.meta_description")),
  buildBreadcrumbList(config, locale, [
    { name: "Home", path: "/" },
    { name: t(locale, "nav.blog"), path: "/blog/" },
    { name: `${t(locale, "blog.page")} ${currentPage}`, path: `/blog/page/${currentPage}/` },
  ]),
];
---

<Layout
  title={`${t(locale, "nav.blog")} — ${t(locale, "blog.page")} ${currentPage}`}
  description={t(locale, "blog.meta_description")}
  locale={locale}
  path={`/blog/page/${currentPage}/`}
  config={config}
  structuredData={structuredData}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/blog/page/${currentPage}/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <h1>{t(locale, "nav.blog")}</h1>
    <div class="blog-grid">
      {pagePosts.map((post) => (
        <BlogCard
          title={post.data.title}
          excerpt={post.data.excerpt}
          slug={post.slug.replace(`${locale}/`, "")}
          image={post.data.image}
          date={post.data.date}
          locale={locale}
          brand={config.brand}
        />
      ))}
    </div>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      basePath="/blog/"
      locale={locale}
      brand={config.brand}
    />
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} locale={locale} />
</Layout>

<style>
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-8);
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/blog/index.astro packages/atlantis/src/pages/[locale]/blog/page/
git commit -m "feat(blog): add pagination to blog index"
```

---

### Task 10: Build Category Index Page

**Files:**
- Create: `packages/atlantis/src/pages/[locale]/blog/category/[category]/index.astro`

- [ ] **Step 1: Create the category index page**

Create `packages/atlantis/src/pages/[locale]/blog/category/[category]/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t, buildCollectionPage, buildBreadcrumbList } from "@algarve-tourism/shared";
import Layout from "../../../../../layouts/Layout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import BlogCard from "@algarve-tourism/shared/components/BlogCard.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config, blogCategories } from "../../../../../config.js";

export function getStaticPaths() {
  return LOCALES.flatMap((locale) =>
    blogCategories.map((category) => ({
      params: { locale, category },
    })),
  );
}

const locale = Astro.params.locale as Locale;
const category = Astro.params.category as string;
const categoryLabel = t(locale, `blog.category.${category}` as any);

const allPosts = await getCollection("blog");
const posts = allPosts
  .filter((post) => post.data.locale === locale && post.data.category === category)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

const structuredData = [
  buildCollectionPage(config, locale, `/blog/category/${category}/`, categoryLabel, `${categoryLabel} — ${config.name}`),
  buildBreadcrumbList(config, locale, [
    { name: "Home", path: "/" },
    { name: t(locale, "nav.blog"), path: "/blog/" },
    { name: categoryLabel, path: `/blog/category/${category}/` },
  ]),
];
---

<Layout
  title={`${categoryLabel} — ${t(locale, "nav.blog")}`}
  description={`${categoryLabel} — ${config.name}`}
  locale={locale}
  path={`/blog/category/${category}/`}
  config={config}
  structuredData={structuredData}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/blog/category/${category}/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <p class="section-label">{t(locale, "blog.category")}</p>
    <h1>{categoryLabel}</h1>
    {posts.length > 0 ? (
      <div class="blog-grid">
        {posts.map((post) => (
          <BlogCard
            title={post.data.title}
            excerpt={post.data.excerpt}
            slug={post.slug.replace(`${locale}/`, "")}
            image={post.data.image}
            date={post.data.date}
            locale={locale}
            brand={config.brand}
          />
        ))}
      </div>
    ) : (
      <p class="text-muted">{t(locale, "blog.no_posts")}</p>
    )}
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} locale={locale} />
</Layout>

<style>
  .section-label {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-primary);
    margin-bottom: var(--space-2);
  }
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-8);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/blog/category/
git commit -m "feat(blog): add category index pages"
```

---

### Task 11: Build Tag Index Page

**Files:**
- Create: `packages/atlantis/src/pages/[locale]/blog/tag/[tag]/index.astro`

- [ ] **Step 1: Create the tag index page**

Create `packages/atlantis/src/pages/[locale]/blog/tag/[tag]/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t, buildCollectionPage, buildBreadcrumbList } from "@algarve-tourism/shared";
import Layout from "../../../../../layouts/Layout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import BlogCard from "@algarve-tourism/shared/components/BlogCard.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import { config } from "../../../../../config.js";

export async function getStaticPaths() {
  const allPosts = await getCollection("blog");

  // Collect all unique tags across all posts
  const tagsByLocale = new Map<string, Set<string>>();
  for (const post of allPosts) {
    const locale = post.data.locale;
    if (!tagsByLocale.has(locale)) tagsByLocale.set(locale, new Set());
    for (const tag of post.data.tags ?? []) {
      tagsByLocale.get(locale)!.add(tag);
    }
  }

  return LOCALES.flatMap((locale) => {
    const tags = tagsByLocale.get(locale) ?? new Set();
    return Array.from(tags).map((tag) => ({
      params: { locale, tag },
    }));
  });
}

const locale = Astro.params.locale as Locale;
const tag = Astro.params.tag as string;
const tagLabel = tag.replace(/-/g, " ");

const allPosts = await getCollection("blog");
const posts = allPosts
  .filter((post) => post.data.locale === locale && (post.data.tags ?? []).includes(tag))
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

const structuredData = [
  buildCollectionPage(config, locale, `/blog/tag/${tag}/`, tagLabel, `Posts tagged "${tagLabel}" — ${config.name}`),
  buildBreadcrumbList(config, locale, [
    { name: "Home", path: "/" },
    { name: t(locale, "nav.blog"), path: "/blog/" },
    { name: tagLabel, path: `/blog/tag/${tag}/` },
  ]),
];
---

<Layout
  title={`${tagLabel} — ${t(locale, "nav.blog")}`}
  description={`Posts tagged "${tagLabel}" — ${config.name}`}
  locale={locale}
  path={`/blog/tag/${tag}/`}
  config={config}
  structuredData={structuredData}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/blog/tag/${tag}/`} />

  <section class="section container" style={`padding-top: calc(var(--header-height) + var(--space-12))`}>
    <p class="section-label">{t(locale, "blog.tags")}</p>
    <h1 class="tag-title">{tagLabel}</h1>
    {posts.length > 0 ? (
      <div class="blog-grid">
        {posts.map((post) => (
          <BlogCard
            title={post.data.title}
            excerpt={post.data.excerpt}
            slug={post.slug.replace(`${locale}/`, "")}
            image={post.data.image}
            date={post.data.date}
            locale={locale}
            brand={config.brand}
          />
        ))}
      </div>
    ) : (
      <p class="text-muted">{t(locale, "blog.no_posts")}</p>
    )}
  </section>

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} locale={locale} />
</Layout>

<style>
  .section-label {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-primary);
    margin-bottom: var(--space-2);
  }
  .tag-title {
    text-transform: capitalize;
  }
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-8);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/blog/tag/
git commit -m "feat(blog): add tag index pages"
```

---

### Task 12: Add Blog Section to Homepage

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/index.astro`

- [ ] **Step 1: Add blog imports and data loading**

In `packages/atlantis/src/pages/[locale]/index.astro`, add these imports at the top (after the existing imports):

```typescript
import BlogCard from "@algarve-tourism/shared/components/BlogCard.astro";
```

Add this data loading after the `marqueeText` variable (around line 55):

```typescript
// Latest blog posts
const blogPosts = (await getCollection("blog"))
  .filter((post) => post.data.locale === locale)
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
  .slice(0, 3);
```

- [ ] **Step 2: Add the blog section to the template**

In the same file, add this section after the reviews section (before the `<Footer>` tag):

```astro
  {blogPosts.length > 0 && (
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="section-label">{t(locale, "home.blog_label")}</p>
            <h2 class="section-title" set:html={t(locale, "home.blog_title")} />
          </div>
          <a href={`/${locale}/blog/`} class="see-all">{t(locale, "home.view_all_posts")} &rarr;</a>
        </div>
        <div class="blog-grid">
          {blogPosts.map((post) => (
            <BlogCard
              title={post.data.title}
              excerpt={post.data.excerpt}
              slug={post.slug.replace(`${locale}/`, "")}
              image={post.data.image}
              date={post.data.date}
              locale={locale}
              brand={config.brand}
            />
          ))}
        </div>
      </div>
    </section>
  )}
```

- [ ] **Step 3: Add the blog-grid style to the page's `<style>` block**

Add this at the end of the existing `<style>` block:

```css
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-6);
  }
```

- [ ] **Step 4: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/index.astro
git commit -m "feat(blog): add latest blog posts section to Atlantis homepage"
```

---

### Task 13: Update RSS Feeds to Per-Locale

**Files:**
- Create: `packages/atlantis/src/pages/[locale]/rss.xml.ts`
- Delete: `packages/atlantis/src/pages/rss.xml.ts`
- Modify: `packages/atlantis/public/_redirects`

- [ ] **Step 1: Create per-locale RSS feed**

Create `packages/atlantis/src/pages/[locale]/rss.xml.ts`:

```typescript
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { LOCALES } from "@algarve-tourism/shared";
import { config } from "../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export async function GET(context: APIContext) {
  const locale = context.params.locale as string;
  const posts = await getCollection("blog");
  const localePosts = posts
    .filter((post) => post.data.locale === locale)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: config.name,
    description: config.tagline,
    site: context.site!.toString(),
    items: localePosts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: new Date(post.data.date),
      link: `/${locale}/blog/${post.slug.replace(`${locale}/`, "")}/`,
    })),
  });
}
```

- [ ] **Step 2: Delete the old RSS feed file**

```bash
rm packages/atlantis/src/pages/rss.xml.ts
```

- [ ] **Step 3: Add redirect for old RSS URL**

In `packages/atlantis/public/_redirects`, add this redirect at the top of the file (after any existing header comments):

```
/rss.xml  /en/rss.xml  301
```

- [ ] **Step 4: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/rss.xml.ts packages/atlantis/public/_redirects
git rm packages/atlantis/src/pages/rss.xml.ts
git commit -m "feat(blog): move RSS to per-locale feeds, redirect old URL"
```

---

### Task 14: Create Sample Blog Content

**Files:**
- Create: `packages/atlantis/src/content/blog/en/best-time-visit-benagil-caves.md`
- Create: `packages/atlantis/src/content/blog/pt/melhor-altura-visitar-grutas-benagil.md`

The welcome.md was already updated in Task 1. Now add one real content post in EN and PT to verify everything works end-to-end. This is a minimal sample — the real content bulk launch happens separately.

- [ ] **Step 1: Create an EN sample post**

Create `packages/atlantis/src/content/blog/en/best-time-visit-benagil-caves.md`:

```markdown
---
title: "Best Time to Visit the Benagil Caves"
date: "2026-04-15"
excerpt: "Planning a visit to the famous Benagil sea cave? Here's everything you need to know about the best time of year, time of day, and tide conditions for the perfect experience."
locale: en
translationKey: best-time-benagil
category: destinations
tags:
  - benagil
  - caves
  - travel-tips
author: Atlantis Tours
readingTime: 5
---

The Benagil sea cave is one of the most iconic natural landmarks in the Algarve, and timing your visit right can make the difference between a good experience and an unforgettable one.

## Best Time of Year

The peak season for Benagil cave tours runs from **May to September**, when the sea conditions are calmest and the sunlight hits the cave's famous skylight at its best angles. July and August offer the warmest weather but also the largest crowds.

For the sweet spot between good weather and fewer tourists, we recommend **late May, June, or September**. The water is calm, the light is beautiful, and you'll share the cave with far fewer boats.

## Best Time of Day

The cave's natural skylight creates a dramatic beam of light inside the cave. This effect is most striking in the **late morning, between 10:00 and 12:00**, when the sun is high enough to shine directly through the opening.

Our early morning departures (around 9:00) offer the calmest seas and the smallest crowds, even if the light show is slightly less dramatic.

## Tide Conditions

Low tide is generally preferable for visiting Benagil. When the tide is low, more of the cave's sandy beach is exposed, and the interior feels more spacious and photogenic. Our experienced captains check tide charts daily and adjust routes accordingly.

## What to Expect on a Speedboat Tour

Our Benagil cave speedboat tours depart from Portimão Marina and take approximately 15 minutes to reach the cave. The tour includes entry into the cave (weather and sea conditions permitting), stops at other sea caves and rock formations along the coast, and opportunities to spot dolphins.

The full tour lasts about 2 hours, covering roughly 30 kilometres of the most dramatic section of the Algarve coastline.
```

- [ ] **Step 2: Create a PT translation**

Create `packages/atlantis/src/content/blog/pt/melhor-altura-visitar-grutas-benagil.md`:

```markdown
---
title: "Melhor Altura para Visitar as Grutas de Benagil"
date: "2026-04-15"
excerpt: "Está a planear visitar a famosa gruta marinha de Benagil? Aqui está tudo o que precisa de saber sobre a melhor época do ano, hora do dia e condições de maré."
locale: pt
translationKey: best-time-benagil
category: destinations
tags:
  - benagil
  - caves
  - travel-tips
author: Atlantis Tours
readingTime: 5
---

A gruta marinha de Benagil é um dos marcos naturais mais icónicos do Algarve, e escolher o momento certo para a visitar pode fazer a diferença entre uma boa experiência e uma experiência inesquecível.

## Melhor Época do Ano

A época alta para os passeios às grutas de Benagil vai de **maio a setembro**, quando as condições do mar são mais calmas e a luz do sol atinge a famosa claraboia da gruta nos seus melhores ângulos. Julho e agosto oferecem o tempo mais quente, mas também as maiores multidões.

Para o equilíbrio ideal entre bom tempo e menos turistas, recomendamos **final de maio, junho ou setembro**. O mar está calmo, a luz é bonita e partilhará a gruta com muito menos barcos.

## Melhor Hora do Dia

A claraboia natural da gruta cria um feixe de luz dramático no seu interior. Este efeito é mais marcante ao **final da manhã, entre as 10:00 e as 12:00**, quando o sol está suficientemente alto para brilhar diretamente pela abertura.

As nossas partidas de manhã cedo (por volta das 9:00) oferecem o mar mais calmo e menos multidões, mesmo que o espetáculo de luz seja ligeiramente menos dramático.

## Condições de Maré

A maré baixa é geralmente preferível para visitar Benagil. Quando a maré está baixa, mais praia de areia no interior da gruta fica exposta, e o interior parece mais espaçoso e fotogénico. Os nossos capitães experientes verificam as tábuas de marés diariamente e ajustam as rotas em conformidade.

## O Que Esperar num Passeio de Lancha Rápida

Os nossos passeios de lancha rápida às grutas de Benagil partem da Marina de Portimão e demoram aproximadamente 15 minutos a chegar à gruta. O passeio inclui entrada na gruta (dependendo das condições meteorológicas e do mar), paragens noutras grutas e formações rochosas ao longo da costa, e oportunidades de avistar golfinhos.

O passeio completo dura cerca de 2 horas, cobrindo aproximadamente 30 quilómetros da secção mais dramática da costa algarvia.
```

- [ ] **Step 3: Commit**

```bash
git add packages/atlantis/src/content/blog/
git commit -m "feat(blog): add sample blog posts in EN and PT"
```

---

### Task 15: Build and Verify

- [ ] **Step 1: Build the Atlantis site**

Run: `cd /home/jferreira/Work/projects/algarve-and-you-new && pnpm build --filter atlantis 2>&1 | tail -30`

Expected: Build completes successfully with no errors. Check that the output mentions the new blog routes being generated.

- [ ] **Step 2: Start dev server and verify pages**

Run: `pnpm dev:atlantis`

Verify these pages in the browser:
- `http://localhost:4321/en/blog/` — Blog index with posts
- `http://localhost:4321/en/blog/best-time-visit-benagil-caves/` — Post with hero, category link, tags, related tours
- `http://localhost:4321/pt/blog/melhor-altura-visitar-grutas-benagil/` — PT translation
- `http://localhost:4321/en/blog/category/destinations/` — Category page with filtered posts
- `http://localhost:4321/en/blog/tag/benagil/` — Tag page with filtered posts
- `http://localhost:4321/en/` — Homepage with "Latest from the Blog" section
- `http://localhost:4321/en/rss.xml` — RSS feed with posts

Check:
- Nav includes "Blog" link
- Breadcrumbs show correct hierarchy on post page
- Tags are clickable and link to tag pages
- Category label links to category page
- RelatedTours shows Benagil tour cards on the sample post
- Hreflang `<link>` tags connect EN and PT posts (view source)
- Structured data includes BlogPosting with articleSection and keywords (view source)
- Blog section on homepage shows the latest post cards

- [ ] **Step 3: Verify Algarve & You is unaffected**

Run: `pnpm dev:ay`

Check `http://localhost:4322/en/` and `http://localhost:4322/en/blog/` to make sure the shared component changes (Header, SEO, PageLayout) haven't broken anything.

- [ ] **Step 4: Check .gitignore includes .superpowers/**

Verify `.superpowers/` is in `.gitignore`. If not, add it:

```bash
echo '.superpowers/' >> .gitignore
```

- [ ] **Step 5: Final commit if needed**

```bash
git add -A
git status
# Commit any remaining changes
```
