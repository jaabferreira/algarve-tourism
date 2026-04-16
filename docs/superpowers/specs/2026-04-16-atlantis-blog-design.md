# Atlantis Tours Blog — Design Spec

## Goal

Add an SEO-focused blog to atlantistours.pt that ranks for Algarve tourism searches and funnels visitors to tour bookings. Content is authored manually in Markdown across 4 languages (en, pt, es, fr), organized by categories + tags, with automatic tour linking based on topic.

## Content Model

### Blog Schema (extends existing collection)

```
title: string (required)
date: date (required)
lastModified: date (optional)          — for updated content signal
excerpt: string (required)             — used as meta description
image: string (optional)               — hero image URL (Filestack)
imageAlt: string (optional)            — alt text for hero image
locale: en | pt | es | fr (required)
translationKey: string (required)      — shared ID across locale versions (e.g., "benagil-guide")
category: string (required)            — single category slug
tags: string[] (optional)              — array of tag slugs
author: string (default: "Atlantis Tours")
readingTime: number (optional)         — minutes
relatedTourSlugs: string[] (optional)  — explicit override for auto-linking
```

### Categories (fixed set, defined in config)

| Slug | EN | PT | ES | FR |
|------|----|----|----|----|
| `destinations` | Destinations | Destinos | Destinos | Destinations |
| `travel-tips` | Travel Tips | Dicas de Viagem | Consejos de Viaje | Conseils de Voyage |
| `marine-life` | Marine Life | Vida Marinha | Vida Marina | Vie Marine |
| `local-culture` | Local Culture | Cultura Local | Cultura Local | Culture Locale |
| `seasonal` | Seasonal Guides | Guias Sazonais | Guías Estacionales | Guides Saisonniers |

### Tags

Free-form, grow organically. Stored as slugs in frontmatter. Examples: `benagil`, `dolphins`, `fishing`, `sunset`, `caves`, `family-friendly`, `lagos`.

Tag display names are derived from the slug (capitalize, replace hyphens with spaces). No separate tag registry needed.

## URL Structure

```
/{locale}/blog/                          — Blog index (paginated)
/{locale}/blog/{post-slug}/              — Individual post
/{locale}/blog/category/{category-slug}/ — Category index
/{locale}/blog/tag/{tag-slug}/           — Tag index
```

- Post slugs are per-locale (e.g., EN: `best-time-visit-benagil-caves`, PT: `melhor-altura-visitar-grutas-benagil`)
- Hreflang links connect locale versions via shared `translationKey` — posts with the same key are alternate-language versions
- Pagination: 9 posts per page, URL pattern `/{locale}/blog/page/{n}/`
- No author pages (single author)

## Pages

### Blog Index (`/{locale}/blog/`)

- Grid of BlogCard components (existing component), 9 per page
- Pagination links at bottom
- Page title: "Blog | Atlantis Tours"
- Structured data: CollectionPage + ItemList

### Blog Post (`/{locale}/blog/{post-slug}/`)

- Hero image (if set) with alt text
- Title, date, reading time, category link, tag links
- Markdown body content
- RelatedTours component at bottom (auto-linked from tags)
- Breadcrumbs: Home > Blog > Category > Post title
- Structured data: BlogPosting (with articleSection, keywords, dateModified) + BreadcrumbList

### Category Index (`/{locale}/blog/category/{category-slug}/`)

- Filtered grid of posts in that category
- Category name as heading, localized
- Pagination if > 9 posts
- Structured data: CollectionPage + BreadcrumbList

### Tag Index (`/{locale}/blog/tag/{tag-slug}/`)

- Filtered grid of posts with that tag
- Tag name as heading
- Pagination if > 9 posts
- Structured data: CollectionPage + BreadcrumbList

## Auto Tour Linking

### Tag-to-Tour Mapping (in Atlantis config)

```typescript
tagTourMap: {
  benagil:    [717720, 717728],     // both Benagil speedboat tours
  caves:      [717720, 717728],     // same Benagil tours
  yacht:      [717754, 720028],     // Sail yacht + Cranchi yacht
  sailing:    [717754],             // Sail yacht only
  fishing:    [718024],             // Reef fishing tour
  luxury:     [717754, 720028],     // Both yacht experiences
  sunset:     [717754],             // Sail yacht (sunset cruise)
  dolphins:   [717720, 717728],     // Benagil tours (dolphin sightings)
  family:     [717720, 717728],     // Benagil tours (family-friendly)
}
```

### Logic

1. Collect all tags from the post
2. Look up each tag in the mapping, gather unique tour itemPks
3. Load those tours from the FareHarbor data for the current locale
4. Render a "Related Tours" section with up to 3 ProductCards
5. If `relatedTourSlugs` is set in frontmatter, use those instead (manual override)
6. If no tags match any tours, render nothing (no empty section)

### Component

`RelatedTours.astro` — shared component. Takes `tags: string[]`, `locale: string`, `relatedTourSlugs?: string[]`. Heading: "Explore These Tours" (localized). Uses existing ProductCard component.

## SEO

### Structured Data

| Page | Schema |
|------|--------|
| Blog post | BlogPosting (headline, description, datePublished, dateModified, articleSection, keywords, author, publisher, mainEntityOfPage) + BreadcrumbList |
| Blog index | CollectionPage + ItemList |
| Category page | CollectionPage + BreadcrumbList |
| Tag page | CollectionPage + BreadcrumbList |

### Meta Tags (per post)

- `<title>`: post title + " | Atlantis Tours"
- `<meta name="description">`: excerpt field
- `og:type`: article
- `article:published_time`: date
- `article:modified_time`: lastModified (if set)
- `article:section`: category name
- `article:tag`: tags array
- Hreflang alternates for all 4 locales + x-default
- Canonical URL

### Internal Linking

- Each post links to its category page
- Each post links to its tag pages
- Category/tag pages link to all their posts
- RelatedTours links to tour detail pages
- Homepage "Latest from Blog" section links to 3 recent posts
- "Blog" link added to Atlantis nav (between Reviews and Contact)

### Sitemap & RSS

- All blog URLs included via existing @astrojs/sitemap
- RSS feed updated: per-locale feeds at `/{locale}/rss.xml` (currently only `/rss.xml` for EN)

## Nav & Homepage Integration

### Header Nav

Add "Blog" link to Atlantis nav. Current: Tours / About / Reviews / Contact. New: Tours / About / Reviews / Blog / Contact.

### Homepage Section

Add "Latest from the Blog" section to Atlantis homepage, after the existing tour sections. Shows 3 most recent posts for the current locale using BlogCard components. Section label + title use existing translation key pattern.

## Content Workflow

1. Create `.md` file in `src/content/blog/{locale}/` with frontmatter
2. Write post content in Markdown
3. Repeat for each locale (en, pt, es, fr)
4. Commit and deploy

## What This Does NOT Include

- No CMS or visual editor
- No AI content generation script
- No comments system
- No social sharing buttons
- No newsletter integration
- No search functionality within blog
