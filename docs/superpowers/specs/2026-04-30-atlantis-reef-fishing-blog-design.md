# Atlantis Reef Fishing Blog — Design Spec

**Date:** 2026-04-30
**Status:** Approved, ready for implementation plan
**Brand:** Atlantis Tours (`atlantistours.pt`)
**Author byline introduced:** Nuno Albino

---

## Summary

Add two SEO-focused blog posts that close the largest content gap in the Atlantis Tours blog: practical reef fishing content. The Reef Fishing Google Ads campaign (live as of 2026-04-29) currently has zero supporting organic content. This spec creates a national-intent post and a Portimão-anchored sibling, both signed by the on-the-water skipper Nuno Albino, and introduces the smallest schema and structured-data plumbing needed to make that signed byline E-E-A-T-meaningful.

The spec keeps scope tight: 8 markdown files (2 posts × 4 locales), a 2-field schema extension, one new component, one structured-data fork, one page-render change. No author profile page, no retroactive resigning of existing posts, no tag-map changes.

---

## Goals

1. **Patch the reef fishing content gap.** The Reef Fishing campaign at €8/day has no supporting blog content; clicks land on the product page only. Two practical posts give organic search a route in and reinforce the Quality Score / landing-context signal for paid.
2. **Establish a real-author byline pattern.** Move beyond `author: "Atlantis Tours"` brand bylines toward `author: "Nuno Albino"` + bio + photo + `Person` JSON-LD — the chain that actually delivers E-E-A-T value for Google's quality raters.
3. **Validate the city-anchored post pattern.** Portimão has a +30% Ads bid adjustment but zero matching organic content. The Portimão post is a template we can repeat for Lagos, Carvoeiro, Albufeira, Lagoa in subsequent specs.

## Non-goals

- A dedicated `/authors/[slug]` profile page (deferred to a future spec).
- Retroactively re-signing the existing 11 blog posts (user opted out).
- City-anchored posts for Lagos / Carvoeiro / Albufeira / Lagoa (separate specs after this ships and ranks).
- Any change to `tagTourMap` — the existing `fishing` → `[718024]` mapping covers RelatedTours auto-linking.
- Any change to the `/tours/reef-fishing-tour` product page or its FareHarbor integration.
- External cross-references (`sameAs` LinkedIn etc.) in the `Person` schema — extension when those profiles exist.

---

## Context

**Existing blog state:** 11 posts × 4 locales, all dated 2026-04-15/16, organised across five categories (`destinations`, `travel-tips`, `marine-life`, `local-culture`, `seasonal`). Reef fishing currently has two adjacent posts — `fishing-traditions-algarve-coast` (cultural framing) and `portuguese-coastal-cuisine-algarve` (eating the catch) — but no practical "what is a reef fishing trip" content.

**Tour facts** (sourced from `GoogleAds/atlantis/02-campaigns/reef-fishing/keywords-and-rsa.md`):
- Duration: 4 hours
- Departure: Portimão Naval Club, Cais de São Francisco (distinct from Benagil/yacht docks — common point of confusion)
- Reef: ~5 km offshore
- Catches: sea bream, snapper, sea bass, gilthead, grouper
- Audience: groups of friends, dads with kids — all ages welcome
- Take catch home: yes (cleaned and iced on the return trip)
- Pricing: €304.88 flat for 1–5 pax (whole boat); €84.22/pax for 6–16 pax

**Search intent the Ads campaign already targets** (mirrored by these posts):
- EN: `reef fishing algarve`, `reef fishing portimão`, `fishing tour algarve`, `fishing trip portimão`, `family fishing algarve`
- PT: `pesca de fundo algarve`, `pesca de fundo portimão`, `passeio de pesca algarve`
- ES: `pesca de fondo algarve`, `excursión pesca portimão`
- FR: `pêche au récif algarve`, `pêche en bateau portimão`

**Current `buildBlogPosting` gap** (`packages/shared/src/seo/structured-data.ts`): the function emits `author` as `Organization` regardless of the `post.author` field. So even today's posts that set `author: "Atlantis Tours"` don't surface that string in JSON-LD — Google sees only the org. Getting Nuno Albino into structured data requires forking this function.

---

## Design

### 1. Two posts, distinct angles

| | Post 1 (national) | Post 2 (city) |
|---|---|---|
| **Title (EN)** | Reef Fishing in the Algarve: What to Expect on the Boat | Reef Fishing from Portimão: A Skipper's Half-Day Guide |
| **Primary intent** | Informational + practical: deciding *whether* to book | Local intent: deciding *where to launch from* |
| **Word count** | ~1,400 (7-min read) | ~1,200 (6-min read) |
| **Category** | `travel-tips` | `destinations` |
| **Tags** | `["fishing", "family", "travel-tips"]` | `["fishing", "family", "travel-tips"]` |
| **Translation key** | `reef-fishing-algarve-what-to-expect` | `reef-fishing-portimao-guide` |

**Post 1 outline:**
1. Lede — what reef fishing on the Algarve is, who it's for
2. What you'll catch — sea bream / snapper / sea bass / gilthead / grouper, one short paragraph each (when in season, fight characteristics, taste)
3. What the day looks like — 4-hour rhythm, depart Portimão Naval Club, transit, anchor, fish, return
4. Who it's *not* for — explicitly not deep-sea / marlin / tuna / shark sport fishing; no license, no gear, no experience needed; all ages
5. Take your catch home — cleaning, icing, eating it that night
6. Pricing reality — "from €84/person for 6+ or €305 to charter the whole boat for up to 5"
7. CTA + cross-links to `fishing-traditions-algarve-coast`, `portuguese-coastal-cuisine-algarve`, Post 2

**Post 2 outline:**
1. Where you actually meet us — Cais de São Francisco at Portimão Naval Club, walking directions, parking, dock landmark description (NOT the Marina)
2. The reef — ~5 km offshore, what's down there, why this stretch fishes well
3. The half-day rhythm — morning vs afternoon trade-offs, summer parking notes
4. What we provide vs what to bring — short (3–4 lines), with a link to the full `what-to-pack-algarve-boat-tour` post
5. After the trip — eating your catch in Portimão (cross-link), a light note on what else to do in Portimão
6. CTA + cross-links to `what-to-pack-algarve-boat-tour`, Post 1

### 2. Voice & POV

First-person plural skipper voice ("we anchor", "we drop-line", "we cleaned and iced your catch on the way back"). Calm-confident, honest about lulls / weather / kids' attention spans — matching the existing `benagil-cave-tour-complete-guide.md` voice. The signed Nuno byline + bio anchor the "we" in a real person, which makes the operator voice honest rather than vague.

### 3. Files to create or modify

**New content files (8):**

| Path | Slug | Locale |
|---|---|---|
| `packages/atlantis/src/content/blog/en/reef-fishing-algarve-what-to-expect.md` | `reef-fishing-algarve-what-to-expect` | en |
| `packages/atlantis/src/content/blog/pt/pesca-de-fundo-algarve-o-que-esperar.md` | `pesca-de-fundo-algarve-o-que-esperar` | pt |
| `packages/atlantis/src/content/blog/es/pesca-de-fondo-algarve-que-esperar.md` | `pesca-de-fondo-algarve-que-esperar` | es |
| `packages/atlantis/src/content/blog/fr/peche-recif-algarve-quoi-attendre.md` | `peche-recif-algarve-quoi-attendre` | fr |
| `packages/atlantis/src/content/blog/en/reef-fishing-portimao-half-day-guide.md` | `reef-fishing-portimao-half-day-guide` | en |
| `packages/atlantis/src/content/blog/pt/pesca-de-fundo-portimao-meio-dia.md` | `pesca-de-fundo-portimao-meio-dia` | pt |
| `packages/atlantis/src/content/blog/es/pesca-de-fondo-portimao-medio-dia.md` | `pesca-de-fondo-portimao-medio-dia` | es |
| `packages/atlantis/src/content/blog/fr/peche-recif-portimao-demi-journee.md` | `peche-recif-portimao-demi-journee` | fr |

**Schema change** — `packages/atlantis/src/content/config.ts`:
Add two optional fields to the `blog` collection:
```ts
authorBio: z.string().optional(),
authorImage: z.string().optional(),
```
Both optional, so existing 11 posts validate unchanged.

**Structured-data change** — `packages/shared/src/seo/structured-data.ts`:
Extend `buildBlogPosting` to accept `authorBio?: string` and `authorImage?: string` in its `post` argument, and fork:
- If `post.author` is present **and** `post.author !== config.name` **and** **both** `authorBio` and `authorImage` are present → emit:
  ```json
  {
    "@type": "Person",
    "name": "<post.author>",
    "image": "<authorImage>",
    "description": "<authorBio>"
  }
  ```
- Otherwise → keep current `Organization` behaviour. The 11 existing posts (which have neither field) emit `Organization` as today, no regression.

This matches the visible-block render rule (both fields required), keeping structured data and visible content in sync — no half-populated `Person` entities.

**New component** — `packages/shared/src/components/AuthorBio.astro`:
- Props (all required at the call site): `name: string`, `bio: string`, `image: string`.
- Render: avatar (rounded), author name, bio paragraph in a horizontal block.
- Style: existing CSS custom properties, matches house design system. No new design tokens.

**Modified page** — `packages/atlantis/src/pages/[locale]/blog/[slug].astro`:
- Thread `authorBio` and `authorImage` from frontmatter into the `buildBlogPosting` call.
- After the article body and before `<RelatedTours>`, render `<AuthorBio>` if **both** `authorBio` **and** `authorImage` are present in frontmatter. If either is missing, render nothing (no degraded box).

**New asset** — `packages/atlantis/public/authors/nuno-albino.jpg`:
- A photo of Nuno (user to provide). Stored in the public folder; referenced from frontmatter as `/authors/nuno-albino.jpg`.

### 4. Frontmatter contract for the new posts

Each of the 8 markdown files must set:

```yaml
title: <localised>
date: <publish date>
excerpt: <localised, ~280 chars>
image: <Filestack URL — one shared per post across locales>
imageAlt: <localised>
locale: <en|pt|es|fr>
translationKey: reef-fishing-algarve-what-to-expect | reef-fishing-portimao-guide
category: travel-tips | destinations
tags:
  - fishing
  - family
  - travel-tips
author: Nuno Albino
authorBio: <localised — see template below>
authorImage: /authors/nuno-albino.jpg
readingTime: 7 | 6
```

`relatedTourSlugs` is intentionally omitted — `RelatedTours` auto-resolves via the `fishing` tag → PK `[718024]` mapping in `tagTourMap`. This is locale-agnostic (operates on PKs, not slugs), so it works correctly across EN/PT/ES/FR without per-locale tour-slug bookkeeping.

**Bio template (EN, 2 sentences):**
> Nuno Albino has skippered the Atlantis Tours boats out of Portimão since 2018, running reef fishing trips, sail charters, and Cranchi yacht days. He grew up on this coast.

PT/ES/FR translations of the bio are added per locale.

### 5. Translation strategy

- EN drafts written first as the canonical source.
- PT/ES/FR are full translations (not summaries), preserving paragraph count and structure.
- Internal links resolve to the same-locale post. Example: the PT version of Post 1 cross-links to `cozinha-costeira-portuguesa-algarve` (PT cuisine post), not the EN cuisine post.
- Slugs are locale-specific (table above). Hreflang resolves automatically through the existing `translationKey` mechanism.
- `authorBio` is translated per locale.

### 6. Internal linking

- **Post 1 → Post 2**: in the "where the day looks like" section, a sentence-level link.
- **Post 2 → Post 1**: in the lede, a sentence-level link.
- **Both → existing posts:**
  - Post 1: `fishing-traditions-algarve-coast` (cultural context), `portuguese-coastal-cuisine-algarve` (eating the catch)
  - Post 2: `what-to-pack-algarve-boat-tour` (logistics), `portuguese-coastal-cuisine-algarve` (eating the catch in Portimão)

All internal links use the locale-matched slug.

---

## Edge cases

- **`authorBio` set but `authorImage` missing** (or vice versa): both the visible `<AuthorBio>` block and the `Person` JSON-LD fork require **both** fields. Half-set state is silently a no-op — falls back to the existing `Organization` JSON-LD and renders no visible bio block. Acceptable graceful degradation.
- **`author: "Nuno Albino"` set on a new post but `authorBio` and `authorImage` both missing**: JSON-LD falls back to `Organization`; the post-header byline still shows "Nuno Albino" (existing rendering path). Visible byline is honest; structured data simply won't surface the person.
- **Existing 11 posts**: have neither new field, so `<AuthorBio>` doesn't render and JSON-LD `author` stays `Organization`. No visible or structured change.
- **`relatedTourSlugs` collision**: not used by these posts. Existing tag-based resolution drives RelatedTours.
- **Locale/slug mismatch in cross-links**: if an EN post hardcodes a PT slug in markdown, hreflang still works (it operates via `translationKey`), but the in-body link 404s. Mitigation: spec mandates same-locale cross-link slugs; verification step #2 catches it manually.

---

## Verification

Manual verification after implementation, before merge:

1. `pnpm --filter atlantis build` succeeds — content schema validates all 8 new files.
2. Run dev server, load each new post in EN/PT/ES/FR. Confirm:
   - Hero image loads
   - `<AuthorBio>` block renders below article body
   - All internal links resolve (no 404s)
   - `<RelatedTours>` shows the reef fishing product card
3. View source on one new post; confirm JSON-LD has:
   ```json
   "author": { "@type": "Person", "name": "Nuno Albino", "image": "...", "description": "..." }
   ```
4. View source on an existing post (e.g. `benagil-cave-tour-complete-guide`); confirm JSON-LD `author` is still `Organization` — **no regression**.
5. Hreflang: load EN Post 1, view `<head>`, confirm `<link rel="alternate" hreflang="pt|es|fr">` resolve to the locale-specific slugs.
6. Validate one new post via Google's Rich Results Test (after deploy to production).
7. RSS feeds (per-locale at `/<locale>/rss.xml`) include the new posts.

## Rollout

- Single PR or commit covering all 8 markdown files + schema change + structured-data change + AuthorBio component + page render change + author photo asset.
- Deploy via the existing Cloudflare Pages workflow on push.
- After deploy, log an entry in `GoogleAds/atlantis/06-changelog.md` noting the new landing-adjacent content (per the project rule, since blog content can affect Reef Fishing campaign Quality Score and landing-page-experience signals).

## Open questions / future work

- **Author profile page** (`/authors/nuno-albino`): defer until at least one of these is true: (a) a second author signs a post, (b) we have external profiles (LinkedIn / About-page mention) to populate `sameAs`. At that point a separate spec adds dynamic `/authors/[slug]` routes and updates `Person` JSON-LD with `url` + `sameAs`.
- **Retro-signing the existing 11 posts**: deferred. Revisit after this spec ships and ranks; doing it then lets us evaluate whether the new structured data actually moves rankings or rich-result eligibility before propagating the pattern.
- **City-anchored siblings** (Lagos / Carvoeiro / Albufeira / Lagoa): one spec per city after Post 2 demonstrates the pattern works.
- **Bio + photo capture for Nuno**: user-side blocker for go-live; spec ships the plumbing, content can be drafted concurrently.
