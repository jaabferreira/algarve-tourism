# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all SEO gaps across both tourism sites — structured data, OG images, 404 pages, RSS feeds, image alt texts, and performance hints.

**Architecture:** All SEO-shared logic lives in `packages/shared/`. Each site-specific page (FAQ, homepage, blog, reviews) gets its own structured data built inline. New shared components are created only for reusable JSON-LD builders. RSS feeds use Astro's `@astrojs/rss` integration per site.

**Tech Stack:** Astro 5, `@astrojs/rss`, `@astrojs/sitemap`, TypeScript

---

### Task 1: Create OG Default Images

Both sites reference `og-default.jpg` but the files don't exist. Every non-tour, non-blog page has a broken OG image when shared on social media.

**Files:**
- Create: `packages/algarve-and-you/public/og-default.jpg`
- Create: `packages/atlantis/public/og-default.jpg`

- [ ] **Step 1: Generate OG images**

Create 1200x630px branded OG images for each site. Use ImageMagick to generate placeholder branded images with the site name:

```bash
# Algarve & You — warm sand background with brand name
convert -size 1200x630 xc:'#C4A265' \
  -font Helvetica -pointsize 64 -fill white -gravity center \
  -annotate 0 "Algarve & You" \
  -font Helvetica -pointsize 28 -fill 'rgba(255,255,255,0.7)' -gravity south \
  -annotate +0+60 "Your Algarve Experience" \
  packages/algarve-and-you/public/og-default.jpg

# Atlantis Tours — teal ocean background with brand name
convert -size 1200x630 xc:'#0E6B7A' \
  -font Helvetica -pointsize 64 -fill white -gravity center \
  -annotate 0 "Atlantis Tours" \
  -font Helvetica -pointsize 28 -fill 'rgba(255,255,255,0.7)' -gravity south \
  -annotate +0+60 "Discover the Algarve Coast" \
  packages/atlantis/public/og-default.jpg
```

- [ ] **Step 2: Verify files exist**

```bash
ls -la packages/algarve-and-you/public/og-default.jpg packages/atlantis/public/og-default.jpg
```

Expected: Both files exist, ~10-50KB each.

- [ ] **Step 3: Commit**

```bash
git add packages/algarve-and-you/public/og-default.jpg packages/atlantis/public/og-default.jpg
git commit -m "feat(seo): add OG default images for both sites"
```

---

### Task 2: Add Structured Data Helpers

Create a shared helper module with functions that build JSON-LD objects for reuse across pages.

**Files:**
- Create: `packages/shared/src/seo/structured-data.ts`

- [ ] **Step 1: Create the structured data builder module**

```typescript
// packages/shared/src/seo/structured-data.ts
import type { BrandConfig, ManualReview, Locale } from "../types.js";

export function buildLocalBusiness(config: BrandConfig) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TourOperator"],
    name: config.name,
    url: `https://www.${config.domain}`,
    telephone: config.social.whatsapp,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Portimão",
      addressRegion: "Faro",
      addressCountry: "PT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.1214,
      longitude: -8.5371,
    },
    sameAs: [
      config.social.instagram,
      config.social.facebook,
      ...(config.social.youtube ? [config.social.youtube] : []),
    ],
  };
}

export function buildFAQPage(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildAggregateRating(
  config: BrandConfig,
  reviews: ManualReview[],
) {
  const total = reviews.length;
  if (total === 0) return null;
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
  return {
    "@type": "AggregateRating",
    ratingValue: avg.toFixed(1),
    reviewCount: total,
    bestRating: 5,
    worstRating: 1,
  };
}

export function buildReviewList(reviews: ManualReview[]) {
  return reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
    },
    reviewBody: r.text,
    datePublished: r.date,
  }));
}

export function buildBlogPosting(
  config: BrandConfig,
  post: {
    title: string;
    excerpt: string;
    date: string;
    author?: string;
    image?: string;
    slug: string;
  },
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
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

export function buildBreadcrumbList(
  config: BrandConfig,
  locale: Locale,
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `https://www.${config.domain}/${locale}${crumb.path}`,
    })),
  };
}
```

- [ ] **Step 2: Export from shared package index**

Add export to `packages/shared/src/index.ts`:

```typescript
export * from "./seo/structured-data.js";
```

- [ ] **Step 3: Verify it compiles**

```bash
cd packages/shared && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/seo/structured-data.ts packages/shared/src/index.ts
git commit -m "feat(seo): add shared structured data builder helpers"
```

---

### Task 3: Add LocalBusiness + FAQPage Structured Data

Add `LocalBusiness` JSON-LD to both homepages and `FAQPage` JSON-LD to both FAQ pages.

**Files:**
- Modify: `packages/algarve-and-you/src/pages/[locale]/index.astro`
- Modify: `packages/atlantis/src/pages/[locale]/index.astro`
- Modify: `packages/algarve-and-you/src/pages/[locale]/faq.astro`
- Modify: `packages/atlantis/src/pages/[locale]/faq.astro`

- [ ] **Step 1: Add LocalBusiness to A&Y homepage**

In `packages/algarve-and-you/src/pages/[locale]/index.astro`:

Add import at top of frontmatter (after existing imports):
```typescript
import { buildLocalBusiness } from "@algarve-tourism/shared";
```

Add after `const path = "/";`:
```typescript
const structuredData = buildLocalBusiness(config);
```

Add `structuredData` prop to the `<Layout>` tag:
```astro
<Layout
  title={heroTitle}
  description={heroSubtitle || config.tagline}
  locale={locale}
  path={path}
  config={config}
  structuredData={structuredData}
>
```

- [ ] **Step 2: Add LocalBusiness to Atlantis homepage**

Same pattern in `packages/atlantis/src/pages/[locale]/index.astro`:

Add import:
```typescript
import { buildLocalBusiness } from "@algarve-tourism/shared";
```

Add after `const path = "/";`:
```typescript
const structuredData = buildLocalBusiness(config);
```

Add `structuredData` prop to `<Layout>`:
```astro
<Layout
  title={heroTitle}
  description={heroSubtitle || config.tagline}
  locale={locale}
  path={path}
  config={config}
  structuredData={structuredData}
>
```

- [ ] **Step 3: Add FAQPage to A&Y FAQ page**

In `packages/algarve-and-you/src/pages/[locale]/faq.astro`:

Add import:
```typescript
import { buildFAQPage } from "@algarve-tourism/shared";
```

Add after `const faqItems = ...`:
```typescript
const structuredData = buildFAQPage(faqItems);
```

Add `structuredData` prop to `<Layout>`:
```astro
<Layout
  title={t(locale, "nav.faq")}
  description={`FAQ — ${config.name}`}
  locale={locale}
  path="/faq/"
  config={config}
  structuredData={structuredData}
>
```

- [ ] **Step 4: Add FAQPage to Atlantis FAQ page**

Same pattern in `packages/atlantis/src/pages/[locale]/faq.astro`:

Add import:
```typescript
import { buildFAQPage } from "@algarve-tourism/shared";
```

Add after `const faqItems = ...`:
```typescript
const structuredData = buildFAQPage(faqItems);
```

Add `structuredData` prop to `<Layout>`:
```astro
<Layout
  title={t(locale, "nav.faq")}
  description={`FAQ — ${config.name}`}
  locale={locale}
  path="/faq/"
  config={config}
  structuredData={structuredData}
>
```

- [ ] **Step 5: Build to verify**

```bash
cd packages/algarve-and-you && npx astro build 2>&1 | tail -5
```

Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add packages/algarve-and-you/src/pages/[locale]/index.astro packages/atlantis/src/pages/[locale]/index.astro packages/algarve-and-you/src/pages/[locale]/faq.astro packages/atlantis/src/pages/[locale]/faq.astro
git commit -m "feat(seo): add LocalBusiness and FAQPage structured data"
```

---

### Task 4: Add AggregateRating + Review Structured Data to Reviews Pages

**Files:**
- Modify: `packages/algarve-and-you/src/pages/[locale]/reviews.astro`
- Modify: `packages/atlantis/src/pages/[locale]/reviews.astro`

- [ ] **Step 1: Add structured data to A&Y reviews page**

In `packages/algarve-and-you/src/pages/[locale]/reviews.astro`:

Add import:
```typescript
import { buildLocalBusiness, buildAggregateRating, buildReviewList } from "@algarve-tourism/shared";
```

Add after `const locale = ...`:
```typescript
const structuredData = {
  ...buildLocalBusiness(config),
  aggregateRating: buildAggregateRating(config, manualReviews),
  review: buildReviewList(manualReviews),
};
```

Add `structuredData` prop to `<Layout>`:
```astro
<Layout
  title={t(locale, "nav.reviews")}
  description={t(locale, "reviews.title")}
  locale={locale}
  path="/reviews/"
  config={config}
  structuredData={structuredData}
>
```

- [ ] **Step 2: Add structured data to Atlantis reviews page**

Same pattern in `packages/atlantis/src/pages/[locale]/reviews.astro`:

Add import:
```typescript
import { buildLocalBusiness, buildAggregateRating, buildReviewList } from "@algarve-tourism/shared";
```

Add after `const locale = ...`:
```typescript
const structuredData = {
  ...buildLocalBusiness(config),
  aggregateRating: buildAggregateRating(config, manualReviews),
  review: buildReviewList(manualReviews),
};
```

Add `structuredData` prop to `<Layout>`:
```astro
<Layout
  title={t(locale, "nav.reviews")}
  description={t(locale, "reviews.title")}
  locale={locale}
  path="/reviews/"
  config={config}
  structuredData={structuredData}
>
```

- [ ] **Step 3: Build to verify**

```bash
cd packages/algarve-and-you && npx astro build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add packages/algarve-and-you/src/pages/[locale]/reviews.astro packages/atlantis/src/pages/[locale]/reviews.astro
git commit -m "feat(seo): add AggregateRating and Review structured data to reviews pages"
```

---

### Task 5: Add BlogPosting Structured Data + Article OG Tags

**Files:**
- Modify: `packages/algarve-and-you/src/pages/[locale]/blog/[slug].astro`
- Modify: `packages/atlantis/src/pages/[locale]/blog/[slug].astro`
- Modify: `packages/shared/src/components/SEO.astro`

- [ ] **Step 1: Add article OG tags to SEO component**

In `packages/shared/src/components/SEO.astro`, add `publishedDate` to the Props interface:

```typescript
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  locale: Locale;
  path: string;
  config: BrandConfig;
  structuredData?: Record<string, unknown>;
  publishedDate?: string;
}
```

Update the destructuring to include it:
```typescript
const {
  title,
  description,
  image,
  type = "website",
  locale,
  path,
  config,
  structuredData,
  publishedDate,
} = Astro.props;
```

Add after the `og:locale` meta tag (line 45):
```astro
{type === "article" && publishedDate && (
  <meta property="article:published_time" content={publishedDate} />
)}
```

- [ ] **Step 2: Thread publishedDate through PageLayout and Layout wrappers**

In `packages/shared/src/layouts/PageLayout.astro`, add `publishedDate` to the Props interface:

```typescript
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  locale: string;
  path: string;
  config: BrandConfig;
  structuredData?: Record<string, unknown>;
  publishedDate?: string;
}
```

Update the destructuring:
```typescript
const { title, description, image, type = 'website', locale, path, config, structuredData, publishedDate } = Astro.props;
```

Add `publishedDate` to the SEO component call:
```astro
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
/>
```

In `packages/algarve-and-you/src/layouts/Layout.astro`, add `publishedDate` to Props:

```typescript
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  locale: string;
  path: string;
  config: BrandConfig;
  structuredData?: Record<string, unknown>;
  publishedDate?: string;
}
```

Do the same for `packages/atlantis/src/layouts/Layout.astro` if it exists (check first — it may just re-export shared PageLayout).

- [ ] **Step 3: Add BlogPosting structured data to A&Y blog post page**

In `packages/algarve-and-you/src/pages/[locale]/blog/[slug].astro`:

Add import:
```typescript
import { buildBlogPosting } from "@algarve-tourism/shared";
```

Add after `const { Content } = await post.render();`:
```typescript
const structuredData = buildBlogPosting(config, {
  title: post.data.title,
  excerpt: post.data.excerpt,
  date: post.data.date,
  author: post.data.author,
  image: post.data.image,
  slug: Astro.params.slug as string,
}, locale);
```

Update the `<Layout>` to include `structuredData` and `publishedDate`:
```astro
<Layout
  title={post.data.title}
  description={post.data.excerpt}
  image={post.data.image}
  type="article"
  locale={locale}
  path={`/blog/${Astro.params.slug}/`}
  config={config}
  structuredData={structuredData}
  publishedDate={post.data.date}
>
```

- [ ] **Step 4: Add BlogPosting structured data to Atlantis blog post page**

Same pattern in `packages/atlantis/src/pages/[locale]/blog/[slug].astro`:

Add import:
```typescript
import { buildBlogPosting } from "@algarve-tourism/shared";
```

Add after `const { Content } = await post.render();`:
```typescript
const structuredData = buildBlogPosting(config, {
  title: post.data.title,
  excerpt: post.data.excerpt,
  date: post.data.date,
  author: post.data.author,
  image: post.data.image,
  slug: Astro.params.slug as string,
}, locale);
```

Update the `<Layout>`:
```astro
<Layout
  title={post.data.title}
  description={post.data.excerpt}
  image={post.data.image}
  type="article"
  locale={locale}
  path={`/blog/${Astro.params.slug}/`}
  config={config}
  structuredData={structuredData}
  publishedDate={post.data.date}
>
```

- [ ] **Step 5: Build to verify**

```bash
cd packages/algarve-and-you && npx astro build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
git add packages/shared/src/components/SEO.astro packages/shared/src/layouts/PageLayout.astro packages/algarve-and-you/src/layouts/Layout.astro packages/atlantis/src/layouts/Layout.astro packages/algarve-and-you/src/pages/[locale]/blog/[slug].astro packages/atlantis/src/pages/[locale]/blog/[slug].astro
git commit -m "feat(seo): add BlogPosting structured data and article:published_time OG tag"
```

---

### Task 6: Add BreadcrumbList to Tour Detail Pages

**Files:**
- Modify: `packages/algarve-and-you/src/pages/[locale]/tours/[slug].astro`
- Modify: `packages/atlantis/src/pages/[locale]/tours/[slug].astro`

- [ ] **Step 1: Add breadcrumb structured data to A&Y tour detail page**

In `packages/algarve-and-you/src/pages/[locale]/tours/[slug].astro`:

Add import:
```typescript
import { buildBreadcrumbList } from "@algarve-tourism/shared";
```

Update the `structuredData` (which already exists on this page) to be an array containing both the Product and Breadcrumb schemas. Since `SEO.astro` uses `JSON.stringify(structuredData)`, we need to pass an array:

Replace the existing `structuredData` definition with:
```typescript
const productData = {
  "@context": "https://schema.org",
  "@type": ["Product", "TouristTrip"],
  name: item.name,
  description: item.description_text,
  image: item.images.map((img) => img.url),
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: (item.price_from_including_tax / 100).toFixed(2),
    availability: "https://schema.org/InStock",
  },
  ...(item.location && {
    touristType: "Leisure",
    itinerary: {
      "@type": "Place",
      geo: {
        "@type": "GeoCoordinates",
        latitude: item.location.latitude,
        longitude: item.location.longitude,
      },
    },
  }),
};

const breadcrumbData = buildBreadcrumbList(config, locale, [
  { name: "Home", path: "/" },
  { name: t(locale, "nav.tours"), path: "/tours/" },
  { name: item.name, path: `/tours/${item.slug}/` },
]);

const structuredData = [productData, breadcrumbData];
```

- [ ] **Step 2: Update SEO.astro to handle array structured data**

In `packages/shared/src/components/SEO.astro`, the structured data rendering currently only handles a single object. Update line 60-62 to handle arrays:

Replace:
```astro
{structuredData && (
  <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
)}
```

With:
```astro
{structuredData && !Array.isArray(structuredData) && (
  <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
)}
{Array.isArray(structuredData) && structuredData.map((sd) => (
  <script type="application/ld+json" set:html={JSON.stringify(sd)} />
))}
```

Also update the `structuredData` type in Props:
```typescript
structuredData?: Record<string, unknown> | Record<string, unknown>[];
```

Update the same type in `PageLayout.astro` Props and both `Layout.astro` files too.

- [ ] **Step 3: Add breadcrumb structured data to Atlantis tour detail page**

Same pattern in `packages/atlantis/src/pages/[locale]/tours/[slug].astro`:

Add import:
```typescript
import { buildBreadcrumbList } from "@algarve-tourism/shared";
```

Replace the existing `structuredData` with:
```typescript
const productData = {
  "@context": "https://schema.org",
  "@type": ["Product", "TouristTrip"],
  name: item.name,
  description: item.description_text,
  image: item.images.map((img) => img.url),
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: (item.price_from_including_tax / 100).toFixed(2),
    availability: "https://schema.org/InStock",
  },
  ...(item.location && {
    touristType: "Leisure",
    itinerary: {
      "@type": "Place",
      geo: {
        "@type": "GeoCoordinates",
        latitude: item.location.latitude,
        longitude: item.location.longitude,
      },
    },
  }),
};

const breadcrumbData = buildBreadcrumbList(config, locale, [
  { name: "Home", path: "/" },
  { name: t(locale, "nav.tours"), path: "/tours/" },
  { name: item.name, path: `/tours/${item.slug}/` },
]);

const structuredData = [productData, breadcrumbData];
```

- [ ] **Step 4: Build to verify**

```bash
cd packages/algarve-and-you && npx astro build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/components/SEO.astro packages/shared/src/layouts/PageLayout.astro packages/algarve-and-you/src/layouts/Layout.astro packages/atlantis/src/layouts/Layout.astro packages/algarve-and-you/src/pages/[locale]/tours/[slug].astro packages/atlantis/src/pages/[locale]/tours/[slug].astro
git commit -m "feat(seo): add BreadcrumbList structured data to tour detail pages"
```

---

### Task 7: Create 404 Pages

**Files:**
- Create: `packages/algarve-and-you/src/pages/404.astro`
- Create: `packages/atlantis/src/pages/404.astro`

- [ ] **Step 1: Create A&Y 404 page**

```astro
---
// packages/algarve-and-you/src/pages/404.astro
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import { config } from "../config.js";

const locale = "en";
---

<PageLayout
  title="Page Not Found"
  description="The page you're looking for doesn't exist."
  locale={locale}
  path="/404/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path="/404/" />

  <section class="not-found container">
    <h1>404</h1>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <div class="not-found__links">
      <a href={`/${locale}/`}>Home</a>
      <a href={`/${locale}/tours/`}>Tours</a>
      <a href={`/${locale}/contact/`}>Contact</a>
    </div>
  </section>

  <Footer slot="footer" config={config} locale={locale} />
</PageLayout>

<style>
  .not-found {
    padding-top: calc(var(--header-height) + var(--space-20));
    padding-bottom: var(--space-20);
    text-align: center;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
  }
  .not-found h1 {
    font-family: var(--font-display);
    font-size: clamp(64px, 10vw, 120px);
    font-weight: 300;
    color: var(--color-primary);
    line-height: 1;
  }
  .not-found p {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    max-width: 400px;
  }
  .not-found__links {
    display: flex;
    gap: var(--space-4);
    margin-top: var(--space-6);
  }
  .not-found__links a {
    padding: 10px 24px;
    border: 1px solid var(--color-border);
    color: var(--color-text);
    text-decoration: none;
    font-size: var(--text-sm);
    transition: border-color var(--transition-fast), color var(--transition-fast);
  }
  .not-found__links a:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
</style>

<style is:global>
  @import "../styles/tokens.css";
</style>
```

- [ ] **Step 2: Create Atlantis 404 page**

```astro
---
// packages/atlantis/src/pages/404.astro
import PageLayout from "@algarve-tourism/shared/layouts/PageLayout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import { config } from "../config.js";

const locale = "en";
---

<PageLayout
  title="Page Not Found"
  description="The page you're looking for doesn't exist."
  locale={locale}
  path="/404/"
  config={config}
>
  <Header slot="header" config={config} locale={locale} path="/404/" />

  <section class="not-found container">
    <h1>404</h1>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <div class="not-found__links">
      <a href={`/${locale}/`}>Home</a>
      <a href={`/${locale}/tours/`}>Tours</a>
      <a href={`/${locale}/contact/`}>Contact</a>
    </div>
  </section>

  <Footer slot="footer" config={config} locale={locale} />
</PageLayout>

<style>
  .not-found {
    padding-top: calc(var(--header-height) + var(--space-20));
    padding-bottom: var(--space-20);
    text-align: center;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
  }
  .not-found h1 {
    font-family: var(--font-display);
    font-size: clamp(64px, 10vw, 120px);
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1;
  }
  .not-found p {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    max-width: 400px;
  }
  .not-found__links {
    display: flex;
    gap: var(--space-4);
    margin-top: var(--space-6);
  }
  .not-found__links a {
    padding: 10px 24px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text);
    text-decoration: none;
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    transition: border-color var(--transition-fast), color var(--transition-fast);
  }
  .not-found__links a:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
</style>

<style is:global>
  @import "../styles/tokens.css";
</style>
```

- [ ] **Step 3: Build to verify**

```bash
cd packages/algarve-and-you && npx astro build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add packages/algarve-and-you/src/pages/404.astro packages/atlantis/src/pages/404.astro
git commit -m "feat(seo): add 404 pages for both sites"
```

---

### Task 8: Add RSS Feeds

**Files:**
- Create: `packages/algarve-and-you/src/pages/rss.xml.ts`
- Create: `packages/atlantis/src/pages/rss.xml.ts`
- Modify: `packages/shared/src/components/SEO.astro`

- [ ] **Step 1: Install @astrojs/rss in both packages**

```bash
cd packages/algarve-and-you && npm install @astrojs/rss
cd ../atlantis && npm install @astrojs/rss
```

- [ ] **Step 2: Create A&Y RSS feed endpoint**

```typescript
// packages/algarve-and-you/src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { config } from "../config.js";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  const enPosts = posts
    .filter((post) => post.data.locale === "en")
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: config.name,
    description: config.tagline,
    site: context.site!.toString(),
    items: enPosts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: new Date(post.data.date),
      link: `/en/blog/${post.slug.replace("en/", "")}/`,
    })),
  });
}
```

- [ ] **Step 3: Create Atlantis RSS feed endpoint**

```typescript
// packages/atlantis/src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { config } from "../config.js";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  const enPosts = posts
    .filter((post) => post.data.locale === "en")
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: config.name,
    description: config.tagline,
    site: context.site!.toString(),
    items: enPosts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: new Date(post.data.date),
      link: `/en/blog/${post.slug.replace("en/", "")}/`,
    })),
  });
}
```

- [ ] **Step 4: Add RSS link tag to SEO component**

In `packages/shared/src/components/SEO.astro`, add after the hreflang `x-default` link (line 57):

```astro
<!-- RSS Feed -->
<link rel="alternate" type="application/rss+xml" title={siteName} href={`https://www.${config.domain}/rss.xml`} />
```

- [ ] **Step 5: Build to verify**

```bash
cd packages/algarve-and-you && npx astro build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
git add packages/algarve-and-you/src/pages/rss.xml.ts packages/atlantis/src/pages/rss.xml.ts packages/algarve-and-you/package.json packages/atlantis/package.json packages/shared/src/components/SEO.astro
git commit -m "feat(seo): add RSS feeds for both sites"
```

---

### Task 9: Fix Image Alt Texts

**Files:**
- Modify: `packages/shared/src/components/HeroSection.astro`
- Modify: `packages/shared/src/components/ProductHero.astro`

- [ ] **Step 1: Fix hero image alt text**

In `packages/shared/src/components/HeroSection.astro`:

Line 48 (Atlantis hero): Change `alt=""` to `alt={title}`:
```astro
<img src={image} alt={title} width="1920" height="1080" loading="eager" />
```

Line 98 (A&Y hero): Same change:
```astro
<img src={image} alt={title} width="1920" height="1080" loading="eager" />
```

- [ ] **Step 2: Fix product gallery thumbnail alt text**

In `packages/shared/src/components/ProductHero.astro`:

Line 33: Change `alt=""` to a descriptive alt using item name and index:
```astro
{item.images.slice(1, 5).map((img, i) => (
  <img src={img.url} alt={`${item.name} - photo ${i + 2}`} loading="lazy" width="200" height="150" />
))}
```

- [ ] **Step 3: Build to verify**

```bash
cd packages/algarve-and-you && npx astro build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/HeroSection.astro packages/shared/src/components/ProductHero.astro
git commit -m "fix(seo): add descriptive alt text to hero and product gallery images"
```

---

### Task 10: Add Performance Hints

**Files:**
- Modify: `packages/shared/src/layouts/PageLayout.astro`
- Modify: `packages/shared/src/components/HeroSection.astro`

- [ ] **Step 1: Add dns-prefetch for image CDN**

In `packages/shared/src/layouts/PageLayout.astro`, after the Google Fonts `<link>` tags (after line 33), add:

```astro
<link rel="dns-prefetch" href="https://cdn.filestackcontent.com" />
<link rel="preconnect" href="https://cdn.filestackcontent.com" />
```

- [ ] **Step 2: Add fetchpriority to hero images**

In `packages/shared/src/components/HeroSection.astro`:

Line 48 (Atlantis hero): Add `fetchpriority="high"`:
```astro
<img src={image} alt={title} width="1920" height="1080" loading="eager" fetchpriority="high" />
```

Line 98 (A&Y hero): Same:
```astro
<img src={image} alt={title} width="1920" height="1080" loading="eager" fetchpriority="high" />
```

- [ ] **Step 3: Defer FareHarbor embed script**

In `packages/shared/src/layouts/PageLayout.astro`, line 62: Add `defer`:

```astro
<script defer src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"></script>
```

- [ ] **Step 4: Build to verify**

```bash
cd packages/algarve-and-you && npx astro build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/layouts/PageLayout.astro packages/shared/src/components/HeroSection.astro
git commit -m "perf(seo): add dns-prefetch, fetchpriority, and defer FareHarbor script"
```

---

### Task 11: Final Build Verification

- [ ] **Step 1: Build both sites**

```bash
cd /home/jferreira/Work/projects/algarve-and-you-new
npx turbo build
```

Expected: Both sites build successfully with no errors.

- [ ] **Step 2: Spot-check generated HTML**

Check that structured data appears in homepage output:
```bash
grep -c "application/ld+json" packages/algarve-and-you/dist/en/index.html
```

Expected: At least 1 match (LocalBusiness).

Check FAQ page:
```bash
grep "FAQPage" packages/algarve-and-you/dist/en/faq/index.html
```

Expected: Match found.

Check 404 page exists:
```bash
ls packages/algarve-and-you/dist/404.html packages/atlantis/dist/404.html
```

Expected: Both exist.

Check RSS feed:
```bash
ls packages/algarve-and-you/dist/rss.xml packages/atlantis/dist/rss.xml
```

Expected: Both exist.

- [ ] **Step 3: Commit any remaining changes**

If any files were missed, add and commit them.
