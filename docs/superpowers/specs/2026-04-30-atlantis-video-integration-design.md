---
date: 2026-04-30
project: atlantis
status: draft
---

# Atlantis Tours — Video integration (homepage hero + product pages)

## Problem

The Atlantis Tours website currently uses still imagery only. We have nine horizontal long-form videos on YouTube (`@atlantistours9867`, mostly 1-3 years old, 1:30 - 6:11 in length) covering Caves, River, Fishing, and the Bavaria sail yacht. Existing footage maps cleanly to almost every tour we sell, but none of it appears on the website, costing us:

- A "feels alive" first impression on the homepage
- A "what does this experience feel like" moment on product pages, between learning what the tour is and reading its itinerary
- Any chance at YouTube-style video rich results in Google SERPs

Two constraints frame the work:

1. **Core Web Vitals must not regress.** We just deployed CLS fixes on 2026-04-29 (`project_atlantis_cls_investigation`). A naïve YouTube `<iframe>` embed pulls ~600KB+ of JS and is the single most common video-related CWV regression in this kind of site. Any solution must keep LCP/CLS/INP at or below current baseline.
2. **FareHarbor stays untouched.** FH External API v1 is read-only for items, so video associations live in the website repo, not in FH.

## Goal

- Replace static hero images with silent, looping ambient B-roll on (a) the Atlantis homepage and (b) each product page hero — so the site feels alive without adding payload to first paint.
- Add a click-to-play YouTube facade on each product page between Description and Itinerary, so visitors can watch the actual tour video without leaving the booking flow.
- Mark up each click-to-play video with `VideoObject` schema so Google can show video thumbnails in search results, lifting CTR on competitive queries.
- Roll out incrementally — homepage first, then highest-traffic tour, then the rest as clips are produced.

## Out of scope (deferred to v2 or later)

- Algarve & You site (clone the pattern after v1 proves out)
- Instagram reel embeds
- Video on category index pages (e.g. `/tours/benagil/`)
- Video on blog posts
- Video-play conversion tracking via `gtag`
- Video sitemap (XML)
- Auto-clip extraction from full YouTube videos (clips produced manually for v1)
- Build-time YouTube oEmbed fetch (manual metadata for v1; revisit at >50 videos)

## Architecture

Two integration patterns, two new shared components, one manual JSON map. Existing components keep their current static-image rendering when no video is configured — so partial rollout doesn't break anything.

### Pattern A — Ambient loop (silent autoplay)

Used in two places:
- **Homepage hero** (`HeroSection.astro`, replaces `.at-hero__bg-image` `<img>`)
- **Product page hero** (`ProductHero.astro`, replaces `.product-hero__main-image`)

`<AmbientVideo>` renders the existing responsive `<img>` and overlays a `<video>` element on top. The `<img>` (with full `srcset`/`sizes`) is what every visitor sees first — initial paint is bit-identical to today. The `<video>` mounts its `src` only when the wrapper enters viewport, via IntersectionObserver, and fades in once `canplay` fires. On mobile (≤768px), `prefers-reduced-motion: reduce`, or `navigator.connection.saveData === true`, the `<video>` is removed from the DOM entirely on mount — those visitors only ever see the responsive image. No CLS possible because the image and video occupy identical dimensions.

### Pattern B — Click-to-play YouTube facade

Used in one place:
- **Product page**, between the "Description" section and the "Itinerary" section in `[slug].astro`

Renders a banner with a poster image, a play-button overlay, and a label ("Watch the experience" — translated per locale). Until clicked, **zero YouTube JavaScript loads**. On click, we create an `<iframe src="https://www.youtube.com/embed/{id}?autoplay=1&rel=0">` via `document.createElement` and insert it into a lightbox styled to match the existing `.lightbox` pattern in `ProductHero.astro`.

This is the standard "facade" pattern. Lighthouse won't flag YouTube as a third-party resource until the user opts in.

### Data model: `videos.json`

Video associations live in a single manual JSON file:

```
packages/atlantis/src/content/videos/manual.json
```

Schema:

```ts
{
  "homepage": {
    "ambientClip": "/videos/atlantis-hero.mp4",
    "ambientPoster": "https://cdn.filestackcontent.com/.../bT14MOwPTli7XyXt79eR"
  },
  "byItemPk": {
    "<fh-item-pk>": {
      "ambientClip"?: "/videos/<slug>-ambient.mp4",
      "youtubeId"?: "<11-char-id>",
      "youtubeLabel"?: "Watch the experience",
      "youtubeMetadata"?: {
        "name": string,        // VideoObject name
        "description": string, // VideoObject description
        "uploadDate": string,  // ISO date "YYYY-MM-DD"
        "duration": string     // ISO 8601 e.g. "PT3M39S"
      }
    }
  }
}
```

All fields are optional. A tour entry with only `ambientClip` shows the loop but no click-to-play. With only `youtubeId` shows the lightbox but no loop. Tours with no entry render exactly as they do today.

### MP4 hosting

Clips ship in `packages/atlantis/public/videos/` and are deployed by Cloudflare Pages — no new services. Expected total size: ~8 clips × ≤1MB = ~8MB at most.

### Encode budget per ambient clip

| Property | Value |
|---|---|
| Container | MP4 (H.264 + no audio) |
| Resolution | 1280×720 max |
| Bitrate | ~1.5 Mbps |
| Duration | 6-8 seconds |
| Audio | **None** (no audio track) |
| Target file size | ≤1MB |

Optional: ship a WebM/VP9 sibling (~30% smaller in supporting browsers) via a `<source>` fallback. Optional, not required.

## Components

### `packages/shared/src/components/AmbientVideo.astro` (new)

Renders a responsive `<img>` and a `<video>` layered in the same wrapper. The image is the canonical static fallback (with full `srcset`/`sizes` as today); the video is overlaid on desktop and only mounts its `src` when in viewport. This way mobile/reduced-motion/save-data users get the exact responsive image they get today, and desktop users see the video cover the image once playback starts.

Props:

```ts
interface Props {
  src: string;             // /videos/foo.mp4
  posterImage: string;     // raw Filestack URL — passed through optimizeImage* helpers inside the component
  alt: string;
  width: number;
  height: number;
  // Forwarded to the responsive <img> (caller controls breakpoints):
  imgSrcset?: string;
  imgSizes?: string;
  loading?: "eager" | "lazy";       // default "lazy"; hero contexts pass "eager"
  fetchpriority?: "high" | "auto";  // default "auto"; hero contexts pass "high"
  class?: string;
}
```

Markup pattern:

```astro
<div class="ambient-video">
  <img
    src={optimizeImageUrl(posterImage, 1080, 75)}
    srcset={imgSrcset ?? optimizeImageSrcset(posterImage, [750, 1080, 1440, 1920])}
    sizes={imgSizes ?? "100vw"}
    alt={alt}
    width={width}
    height={height}
    loading={loading ?? "eager"}
    fetchpriority={fetchpriority ?? "high"}
    class="ambient-video__poster"
  />
  <video
    muted playsinline loop preload="none"
    aria-hidden="true"
    class="ambient-video__video"
    data-src={src}
  ></video>
</div>
```

`.ambient-video` is `position: relative`; both children are `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover`. The `<video>` starts with `opacity: 0` and gains `opacity: 1` on the `canplay` event so the visual swap is smooth.

Behavior (inline script):
- On mount, check `matchMedia("(min-width: 769px)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches && !navigator.connection?.saveData`. If any gate fails, **remove the `<video>` from the DOM entirely** — the responsive `<img>` stays and renders identically to today.
- If all gates pass, attach an IntersectionObserver to the wrapper. When it enters viewport, set `video.src = video.dataset.src` and call `video.play()`. On `canplay`, fade in the video.
- No `poster` attribute on the `<video>` — the `<img>` underneath is the visible fallback. This avoids the "single poster URL is not responsive" trap.

### `packages/shared/src/components/VideoLightbox.astro` (new)

YouTube facade + lightbox. Props:

```ts
interface Props {
  youtubeId: string;
  posterImage: string;     // Existing tour image; falls back to img.youtube.com/vi/{id}/maxresdefault.jpg if not provided by caller
  label: string;           // Translated "Watch the experience" string from the i18n layer
  locale: Locale;
}
```

Behavior:
- Renders a `<button>` with the poster image (`<img loading="lazy">`), a centered play-button SVG overlay, and the `label` text underneath.
- Inline lightbox markup follows the exact `.lightbox` structure already used in `ProductHero.astro` (close button, backdrop, ESC keyboard handling). For v1, duplicate the markup; if a third lightbox use case appears later, extract a shared `<Lightbox>` primitive then.
- On click: create `<iframe src="https://www.youtube.com/embed/{id}?autoplay=1&rel=0&modestbranding=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen>` via `document.createElement`, insert into the lightbox's `.lightbox__content`, set `aria-hidden="false"`, lock body scroll.
- On close (button click, backdrop click, or ESC): remove the iframe entirely (so playback stops and audio doesn't continue), set `aria-hidden="true"`, restore body scroll.

### i18n key (new)

Add one new translation key to `packages/shared/src/i18n/locales/{en,pt,es,fr}.json`:

- `product.watch_experience` — "Watch the experience" / "Ver a experiência" / "Ver la experiencia" / "Voir l'expérience"

Used by `[slug].astro` when passing `label` to `<VideoLightbox>`.

### Existing components — modifications

| File | Change |
|---|---|
| `packages/shared/src/components/HeroSection.astro` | Add optional `videoSrc?: string` prop. When set, render `<AmbientVideo src={videoSrc} posterImage={image} ...>` (forwarding the same width/height/eager/high-fetchpriority attributes) in place of `<img>` inside `.at-hero__bg-image`. AnY branch unchanged. |
| `packages/shared/src/components/ProductHero.astro` | Add optional `videoSrc?: string` prop. When set, render `<AmbientVideo src={videoSrc} posterImage={item.images[0].url} ...>` in place of `<img>` inside `.product-hero__main-wrap`. Existing thumb strip and click-to-lightbox for photos stay as-is — the photo lightbox still opens on thumb click. |
| `packages/shared/src/i18n/locales/{en,pt,es,fr}.json` | Add `product.watch_experience` translation key (see i18n section below). |
| `packages/atlantis/src/pages/[locale]/index.astro` | Import `videos.json`. Pass `videos.homepage?.ambientClip` to `HeroSection` as `videoSrc`. |
| `packages/atlantis/src/pages/[locale]/tours/[slug].astro` | Import `videos.json`. Look up `videos.byItemPk[item.pk]`. Pass `entry?.ambientClip` to `ProductHero` as `videoSrc`. If `entry?.youtubeId` is set, render `<VideoLightbox>` between the existing description block and itinerary block. If `entry?.youtubeMetadata` is set, push a `VideoObject` entry onto the `structuredData` array. |

### Structured data — `VideoObject`

Added only when `entry.youtubeMetadata` is present. Marks up only the click-to-play YouTube content, **never the ambient loops** (Google's structured-data guidelines warn against marking up decorative/auto-playing background video — it can trigger a manual action for misleading rich results).

Pushed onto the existing `structuredData` array in `[slug].astro`:

```ts
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": entry.youtubeMetadata.name,
  "description": entry.youtubeMetadata.description,
  "thumbnailUrl": `https://img.youtube.com/vi/${entry.youtubeId}/maxresdefault.jpg`,
  "uploadDate": entry.youtubeMetadata.uploadDate,
  "duration": entry.youtubeMetadata.duration,
  "contentUrl": `https://www.youtube.com/watch?v=${entry.youtubeId}`,
  "embedUrl": `https://www.youtube.com/embed/${entry.youtubeId}`
}
```

## Performance discipline (non-negotiable)

These rules are baked into the components, not optional:

1. **Responsive `<img>` always loads first.** Underneath every `<video>`, the existing responsive `<img>` (Filestack + `optimizeImageSrcset`) renders for everyone. Initial paint is bit-identical to current.
2. **`preload="none"`** on every `<video>` element. Browser fetches no video bytes until we explicitly set `src`.
3. **Mount via IntersectionObserver.** `<video>.src` is set only when the wrapper enters viewport.
4. **Skip on mobile, reduced-motion, save-data.** Mobile (≤768px), `prefers-reduced-motion: reduce`, or `connection.saveData === true` → `<video>` is removed from DOM on mount, only the responsive `<img>` remains.
5. **YouTube iframe is lazy-mounted, not just lazy-loaded.** `<iframe>` is never in the initial HTML. It's `document.createElement`'d on click. Until clicked, zero YouTube JS, zero third-party requests.
6. **No audio track on ambient MP4s.** Saves bytes and avoids autoplay-with-sound issues.

## Verification gate

Before merging the v1 PR:

1. Deploy to a CF Pages preview URL.
2. Run Lighthouse mobile audit (3× runs, take median) on:
   - `/en/` (homepage hero with ambient)
   - `/en/tours/benagil-caves-tour/` (or whichever slug is the Caves 1h30 tour — product hero ambient + YouTube lightbox)
3. Compare LCP, CLS, and INP versus current master baseline (pull from existing GA4 + CrUX data per `reference_ga4_data_api_setup`).
4. **Hard merge gate:** if LCP regresses by >0.2s OR CLS regresses by >0.05 OR INP regresses by >50ms, do not merge — debug first.
5. Validate `VideoObject` JSON-LD on the Caves product page using Google's Rich Results Test before declaring v1 done.

## Rollout plan

| Phase | What | Owner |
|---|---|---|
| 1. Components | Build `AmbientVideo.astro` + `VideoLightbox.astro`. Wire into `HeroSection` and `ProductHero`. Empty `videos.json` → site renders identically to today. Ship. | Code |
| 2. Homepage clip | User edits 6-8s ambient loop from existing YouTube footage (e.g. drone shot from "Atlantis Tours (Caves)"). Add to `videos.json` under `homepage`. Verify CWV gate. Ship. | User produces clip; code wires it |
| 3. Caves tour (highest-impact) | Pick the 7.7K-view "Atlantis Tours (Caves) + Allgarbe" video → fill `youtubeMetadata` for the Caves item PK. Edit a 6-8s ambient loop for it. Add to `videos.json`. Verify CWV gate. Ship. | User produces clip + metadata; code wires it |
| 4. Remaining tours | Per-tour, as user produces clips: Fishing, Bavaria sail, River, etc. Each shipped independently. | User incremental |

Each phase is its own PR, each ships independently, each is reverted independently if something regresses.

## Open decisions (locked in 2026-04-30 brainstorm)

- **Clip production:** user edits clips manually from existing YouTube footage. Plan does not include hiring an editor.
- **`VideoObject` schema:** included in v1, only on click-to-play YouTube videos, never on ambient loops.
- **Algarve & You:** out of scope for v1; clone pattern after v1 proves out.
- **Mobile ambient loops:** disabled. Mobile gets static poster only, to protect 4G visitors and ad-traffic data plans.
