# Atlantis Video Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add silent ambient video loops to the Atlantis homepage hero and per-tour product hero, plus a click-to-play YouTube facade with `VideoObject` schema between Description and Itinerary on each product page — all CWV-safe by design.

**Architecture:** Two new shared Astro components (`AmbientVideo`, `VideoLightbox`) consume a manual JSON map (`videos.json`) keyed by FareHarbor item PK. The components render the existing responsive `<img>` first; on desktop only, an overlaid `<video>` mounts its `src` via IntersectionObserver. The YouTube facade never includes an `<iframe>` in initial HTML — it's `document.createElement`'d on click. v1 ships with empty `videos.json` so the site renders identically to today; clips are added per-tour incrementally afterward.

**Tech Stack:** Astro 5, pnpm + Turbo monorepo, Vitest for unit tests, TypeScript strict, plain `<video>`/`<iframe>` (no third-party video player libraries).

**Spec:** `docs/superpowers/specs/2026-04-30-atlantis-video-integration-design.md`

---

## File Structure

**New files:**
- `packages/shared/src/lib/ambient-video-gate.ts` — pure function deciding whether ambient video should mount, given a `window`-like environment. Unit-tested.
- `packages/shared/src/lib/ambient-video-gate.test.ts` — Vitest tests for the gate.
- `packages/shared/src/components/AmbientVideo.astro` — image+video layered component.
- `packages/shared/src/components/VideoLightbox.astro` — YouTube facade + lightbox.
- `packages/atlantis/src/content/videos/manual.json` — video associations, starts as `{ "byItemPk": {} }`.
- `packages/atlantis/src/lib/videos.ts` — typed loader for `manual.json`.
- `packages/atlantis/public/videos/.gitkeep` — empty dir placeholder so deploys include it.

**Modified files:**
- `packages/shared/src/seo/structured-data.ts` — add `buildVideoObject()` export.
- `packages/shared/src/seo/structured-data.test.ts` — add `buildVideoObject` tests.
- `packages/shared/src/i18n/locales/{en,pt,es,fr}.json` — add `product.watch_experience` key.
- `packages/shared/src/components/HeroSection.astro` — accept `videoSrc?: string` prop, render `<AmbientVideo>` when set (Atlantis branch only).
- `packages/shared/src/components/ProductHero.astro` — accept `videoSrc?: string` prop, render `<AmbientVideo>` in main image slot when set.
- `packages/atlantis/src/pages/[locale]/index.astro` — import videos loader, pass `homepage.ambientClip` to `HeroSection`.
- `packages/atlantis/src/pages/[locale]/tours/[slug].astro` — import videos loader; pass `ambientClip` to `ProductHero`; render `<VideoLightbox>` between description and itinerary if `youtubeId`; push `buildVideoObject(...)` onto structured data if `youtubeMetadata`.

---

## Task 1: Add `buildVideoObject` to structured-data

**Files:**
- Modify: `packages/shared/src/seo/structured-data.ts`
- Modify: `packages/shared/src/seo/structured-data.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `packages/shared/src/seo/structured-data.test.ts`:

```typescript
import { buildVideoObject } from "./structured-data.js";

describe("buildVideoObject", () => {
  const sample = {
    youtubeId: "dQw4w9WgXcQ",
    name: "Atlantis Tours (Caves) + Allgarbe",
    description: "Boat tour through Benagil sea caves.",
    uploadDate: "2022-06-15",
    duration: "PT3M39S",
  };

  it("returns a VideoObject with all required fields", () => {
    const result = buildVideoObject(sample);
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("VideoObject");
    expect(result.name).toBe(sample.name);
    expect(result.description).toBe(sample.description);
    expect(result.uploadDate).toBe(sample.uploadDate);
    expect(result.duration).toBe(sample.duration);
  });

  it("derives thumbnailUrl, contentUrl, and embedUrl from youtubeId", () => {
    const result = buildVideoObject(sample);
    expect(result.thumbnailUrl).toBe(
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    );
    expect(result.contentUrl).toBe(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    );
    expect(result.embedUrl).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- structured-data.test.ts`
Expected: FAIL — `buildVideoObject is not a function` or `is not exported`.

- [ ] **Step 3: Implement `buildVideoObject`**

Append to `packages/shared/src/seo/structured-data.ts`:

```typescript
export interface VideoObjectInput {
  youtubeId: string;
  name: string;
  description: string;
  uploadDate: string; // ISO date "YYYY-MM-DD"
  duration: string;   // ISO 8601 e.g. "PT3M39S"
}

export function buildVideoObject(input: VideoObjectInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: `https://img.youtube.com/vi/${input.youtubeId}/maxresdefault.jpg`,
    uploadDate: input.uploadDate,
    duration: input.duration,
    contentUrl: `https://www.youtube.com/watch?v=${input.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${input.youtubeId}`,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- structured-data.test.ts`
Expected: PASS for both new tests; existing tests still pass.

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/seo/structured-data.ts packages/shared/src/seo/structured-data.test.ts
git commit -m "feat(seo): add buildVideoObject for VideoObject schema"
```

---

## Task 2: Add `product.watch_experience` translation key

**Files:**
- Modify: `packages/shared/src/i18n/locales/en.json`
- Modify: `packages/shared/src/i18n/locales/pt.json`
- Modify: `packages/shared/src/i18n/locales/es.json`
- Modify: `packages/shared/src/i18n/locales/fr.json`

- [ ] **Step 1: Add the key in each locale**

In `packages/shared/src/i18n/locales/en.json`, find any existing `"product.*"` line (e.g. `"product.itinerary": "Itinerary",`) and add this line directly below it:

```json
  "product.watch_experience": "Watch the experience",
```

In `packages/shared/src/i18n/locales/pt.json`:

```json
  "product.watch_experience": "Ver a experiência",
```

In `packages/shared/src/i18n/locales/es.json`:

```json
  "product.watch_experience": "Ver la experiencia",
```

In `packages/shared/src/i18n/locales/fr.json`:

```json
  "product.watch_experience": "Voir l'expérience",
```

- [ ] **Step 2: Run i18n tests to verify keys are valid**

Run: `pnpm test -- i18n.test.ts`
Expected: PASS (the i18n test verifies all locales have the same keys).

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/i18n/locales/
git commit -m "i18n(shared): add product.watch_experience key (en/pt/es/fr)"
```

---

## Task 3: Implement and test the ambient-video gate

**Files:**
- Create: `packages/shared/src/lib/ambient-video-gate.ts`
- Create: `packages/shared/src/lib/ambient-video-gate.test.ts`

This pure function decides whether to mount an ambient video. Extracting it into a unit-tested module keeps the Astro component thin and lets us TDD the rules.

- [ ] **Step 1: Write the failing test**

Create `packages/shared/src/lib/ambient-video-gate.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { shouldEnableAmbientVideo } from "./ambient-video-gate.js";

interface Env {
  desktopMatches: boolean;
  reducedMotionMatches: boolean;
  saveData: boolean | undefined;
}

const matchMediaFor = (env: Env) => (query: string) => ({
  matches:
    query === "(min-width: 769px)"
      ? env.desktopMatches
      : query === "(prefers-reduced-motion: reduce)"
        ? env.reducedMotionMatches
        : false,
});

const fakeWindow = (env: Env) =>
  ({
    matchMedia: matchMediaFor(env),
    navigator: { connection: { saveData: env.saveData } },
  }) as unknown as Window;

describe("shouldEnableAmbientVideo", () => {
  it("returns true on desktop with motion allowed and no save-data", () => {
    expect(
      shouldEnableAmbientVideo(
        fakeWindow({
          desktopMatches: true,
          reducedMotionMatches: false,
          saveData: false,
        }),
      ),
    ).toBe(true);
  });

  it("returns false on mobile (≤768px)", () => {
    expect(
      shouldEnableAmbientVideo(
        fakeWindow({
          desktopMatches: false,
          reducedMotionMatches: false,
          saveData: false,
        }),
      ),
    ).toBe(false);
  });

  it("returns false when prefers-reduced-motion: reduce", () => {
    expect(
      shouldEnableAmbientVideo(
        fakeWindow({
          desktopMatches: true,
          reducedMotionMatches: true,
          saveData: false,
        }),
      ),
    ).toBe(false);
  });

  it("returns false when navigator.connection.saveData is true", () => {
    expect(
      shouldEnableAmbientVideo(
        fakeWindow({
          desktopMatches: true,
          reducedMotionMatches: false,
          saveData: true,
        }),
      ),
    ).toBe(false);
  });

  it("returns true when navigator.connection is undefined (older browsers)", () => {
    const win = {
      matchMedia: matchMediaFor({
        desktopMatches: true,
        reducedMotionMatches: false,
        saveData: false,
      }),
      navigator: {},
    } as unknown as Window;
    expect(shouldEnableAmbientVideo(win)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- ambient-video-gate.test.ts`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement the gate**

Create `packages/shared/src/lib/ambient-video-gate.ts`:

```typescript
/**
 * Returns true only when ambient autoplay video is appropriate:
 * desktop viewport, motion allowed, and not on a save-data connection.
 */
export function shouldEnableAmbientVideo(win: Window): boolean {
  const isDesktop = win.matchMedia("(min-width: 769px)").matches;
  if (!isDesktop) return false;

  const reducedMotion = win.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return false;

  const conn = (win.navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  if (conn?.saveData === true) return false;

  return true;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- ambient-video-gate.test.ts`
Expected: PASS for all 5 tests.

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/lib/ambient-video-gate.ts packages/shared/src/lib/ambient-video-gate.test.ts
git commit -m "feat(shared): add ambient-video-gate decision function"
```

---

## Task 4: Build `AmbientVideo.astro`

**Files:**
- Create: `packages/shared/src/components/AmbientVideo.astro`

- [ ] **Step 1: Create the component**

Create `packages/shared/src/components/AmbientVideo.astro`:

```astro
---
import { optimizeImageUrl, optimizeImageSrcset } from "../lib/images.js";

interface Props {
  src: string;             // /videos/foo.mp4 (relative to public/)
  posterImage: string;     // raw Filestack URL
  alt: string;
  width: number;
  height: number;
  imgSrcset?: string;
  imgSizes?: string;
  loading?: "eager" | "lazy";
  fetchpriority?: "high" | "auto";
  class?: string;
}

const {
  src,
  posterImage,
  alt,
  width,
  height,
  imgSrcset,
  imgSizes,
  loading = "eager",
  fetchpriority = "high",
  class: className,
} = Astro.props;

const posterUrl = optimizeImageUrl(posterImage, 1080, 75);
const computedSrcset =
  imgSrcset ?? optimizeImageSrcset(posterImage, [750, 1080, 1440, 1920]);
const computedSizes = imgSizes ?? "100vw";
---

<div class={`ambient-video${className ? ` ${className}` : ""}`} data-video-src={src}>
  <img
    src={posterUrl}
    srcset={computedSrcset}
    sizes={computedSizes}
    alt={alt}
    width={width}
    height={height}
    loading={loading}
    fetchpriority={fetchpriority}
    decoding="async"
    class="ambient-video__poster"
  />
  <video
    muted
    playsinline
    loop
    preload="none"
    aria-hidden="true"
    class="ambient-video__video"
  ></video>
</div>

<style>
  .ambient-video {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .ambient-video__poster,
  .ambient-video__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ambient-video__video {
    opacity: 0;
    transition: opacity 400ms ease;
  }
  .ambient-video__video.is-playing {
    opacity: 1;
  }
</style>

<script>
  import { shouldEnableAmbientVideo } from "../lib/ambient-video-gate.js";

  function init() {
    if (!shouldEnableAmbientVideo(window)) {
      // Strip the <video> elements entirely on devices that should not autoplay.
      document
        .querySelectorAll(".ambient-video .ambient-video__video")
        .forEach((v) => v.remove());
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const wrapper = entry.target as HTMLElement;
          const video = wrapper.querySelector<HTMLVideoElement>(".ambient-video__video");
          const src = wrapper.dataset.videoSrc;
          if (!video || !src || video.src) continue;
          video.src = src;
          video.addEventListener(
            "canplay",
            () => {
              video.classList.add("is-playing");
              void video.play().catch(() => {
                /* autoplay rejected — leave poster visible */
              });
            },
            { once: true },
          );
          observer.unobserve(wrapper);
        }
      },
      { rootMargin: "200px" },
    );

    document
      .querySelectorAll<HTMLElement>(".ambient-video[data-video-src]")
      .forEach((el) => observer.observe(el));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
</script>
```

- [ ] **Step 2: Build to confirm Astro compiles the component**

Run: `pnpm --filter @algarve-tourism/atlantis build`
Expected: Build succeeds (the component isn't used yet, but Astro will type-check shared exports).

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/AmbientVideo.astro
git commit -m "feat(shared): add AmbientVideo component (image+video layered, in-viewport mount)"
```

---

## Task 5: Build `VideoLightbox.astro`

**Files:**
- Create: `packages/shared/src/components/VideoLightbox.astro`

- [ ] **Step 1: Create the component**

Create `packages/shared/src/components/VideoLightbox.astro`:

```astro
---
import { optimizeImageUrl } from "../lib/images.js";

interface Props {
  youtubeId: string;
  posterImage?: string;    // Tour image; falls back to YouTube maxresdefault
  label: string;           // Translated "Watch the experience"
}

const { youtubeId, posterImage, label } = Astro.props;

const poster = posterImage
  ? optimizeImageUrl(posterImage, 1200, 80)
  : `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

const lightboxId = `vlb-${youtubeId}`;
---

<button
  type="button"
  class="video-lightbox__trigger"
  data-vlb-trigger={lightboxId}
  data-youtube-id={youtubeId}
  aria-label={label}
>
  <img
    src={poster}
    alt=""
    loading="lazy"
    decoding="async"
    width="1200"
    height="675"
    class="video-lightbox__poster"
  />
  <span class="video-lightbox__play" aria-hidden="true">
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="35" fill="rgba(0,0,0,0.55)" stroke="#fff" stroke-width="2" />
      <path d="M28 22 L52 36 L28 50 Z" fill="#fff" />
    </svg>
  </span>
  <span class="video-lightbox__label">{label}</span>
</button>

<div class="video-lightbox" id={lightboxId} aria-hidden="true" role="dialog" aria-modal="true">
  <button class="video-lightbox__close" aria-label="Close">&times;</button>
  <div class="video-lightbox__content"></div>
</div>

<style>
  .video-lightbox__trigger {
    display: block;
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border: none;
    padding: 0;
    margin: 0;
    background: transparent;
    cursor: pointer;
    border-radius: var(--radius-card, 8px);
    overflow: hidden;
  }
  .video-lightbox__poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 300ms ease;
  }
  .video-lightbox__trigger:hover .video-lightbox__poster {
    transform: scale(1.02);
  }
  .video-lightbox__play {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .video-lightbox__label {
    position: absolute;
    left: 16px;
    bottom: 14px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  }

  .video-lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }
  .video-lightbox[aria-hidden="false"] {
    opacity: 1;
    pointer-events: auto;
  }
  .video-lightbox__close {
    position: absolute;
    top: 16px;
    right: 20px;
    background: none;
    border: none;
    color: #fff;
    font-size: 36px;
    cursor: pointer;
    line-height: 1;
    padding: 4px 8px;
    z-index: 1;
    opacity: 0.8;
  }
  .video-lightbox__close:hover {
    opacity: 1;
  }
  .video-lightbox__content {
    width: min(90vw, 1280px);
    aspect-ratio: 16 / 9;
    max-height: 85vh;
    background: #000;
  }
  .video-lightbox__content :global(iframe) {
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const triggers = document.querySelectorAll<HTMLButtonElement>(
      "[data-vlb-trigger]",
    );
    triggers.forEach((trigger) => {
      const lightboxId = trigger.dataset.vlbTrigger!;
      const youtubeId = trigger.dataset.youtubeId!;
      const lightbox = document.getElementById(lightboxId);
      if (!lightbox) return;
      const content = lightbox.querySelector<HTMLElement>(".video-lightbox__content");
      const closeBtn = lightbox.querySelector<HTMLButtonElement>(".video-lightbox__close");

      function open() {
        if (!content) return;
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
        iframe.allow = "autoplay; encrypted-media; picture-in-picture";
        iframe.allowFullscreen = true;
        content.replaceChildren(iframe);
        lightbox!.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }

      function close() {
        if (!content) return;
        content.replaceChildren(); // removes iframe → stops playback
        lightbox!.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }

      trigger.addEventListener("click", open);
      closeBtn?.addEventListener("click", close);
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) close();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.getAttribute("aria-hidden") === "false") {
          close();
        }
      });
    });
  });
</script>
```

- [ ] **Step 2: Build to confirm Astro compiles the component**

Run: `pnpm --filter @algarve-tourism/atlantis build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/VideoLightbox.astro
git commit -m "feat(shared): add VideoLightbox YouTube facade with on-click iframe"
```

---

## Task 6: Create empty `videos.json` and typed loader

**Files:**
- Create: `packages/atlantis/src/content/videos/manual.json`
- Create: `packages/atlantis/src/lib/videos.ts`
- Create: `packages/atlantis/public/videos/.gitkeep`

- [ ] **Step 1: Create the empty videos.json**

Create `packages/atlantis/src/content/videos/manual.json`:

```json
{
  "byItemPk": {}
}
```

- [ ] **Step 2: Create the typed loader**

Create `packages/atlantis/src/lib/videos.ts`:

```typescript
import data from "../content/videos/manual.json" with { type: "json" };

export interface VideoYouTubeMetadata {
  name: string;
  description: string;
  uploadDate: string;  // "YYYY-MM-DD"
  duration: string;    // ISO 8601 e.g. "PT3M39S"
}

export interface TourVideoEntry {
  ambientClip?: string;       // "/videos/foo.mp4"
  youtubeId?: string;         // 11-char YouTube ID
  youtubeMetadata?: VideoYouTubeMetadata;
}

export interface HomepageVideoEntry {
  ambientClip: string;
  ambientPoster?: string;     // optional override; otherwise homepage uses its existing heroImage
}

interface VideosManifest {
  homepage?: HomepageVideoEntry;
  byItemPk: Record<string, TourVideoEntry>;
}

const manifest = data as VideosManifest;

export function getHomepageVideo(): HomepageVideoEntry | undefined {
  return manifest.homepage;
}

export function getTourVideo(itemPk: number | string): TourVideoEntry | undefined {
  return manifest.byItemPk[String(itemPk)];
}
```

- [ ] **Step 3: Create the public/videos/.gitkeep placeholder**

Create `packages/atlantis/public/videos/.gitkeep` (empty file). This ensures the directory exists and ships with the deploy.

- [ ] **Step 4: Verify TypeScript compiles**

Run: `pnpm --filter @algarve-tourism/atlantis build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add packages/atlantis/src/content/videos/manual.json packages/atlantis/src/lib/videos.ts packages/atlantis/public/videos/.gitkeep
git commit -m "feat(atlantis): add empty videos.json + typed loader"
```

---

## Task 7: Wire `AmbientVideo` into `HeroSection`

**Files:**
- Modify: `packages/shared/src/components/HeroSection.astro`

- [ ] **Step 1: Add the prop, import, and conditional render**

Open `packages/shared/src/components/HeroSection.astro`. Find the import block at the top (after `import HeroFloatCard from "./HeroFloatCard.astro";`) and add:

```astro
import AmbientVideo from "./AmbientVideo.astro";
```

Find the `Props` interface and add the new optional prop near the other optional props (after `image?: string;`):

```astro
  videoSrc?: string;
```

Find the destructuring `const { ... } = Astro.props;` and add `videoSrc,` to the list.

Now find the Atlantis hero image markup:

```astro
{image ? (
  <div class="at-hero__bg-image" aria-hidden="true">
    <img
      src={optimizeImageUrl(image!, 1080, 75)}
      srcset={optimizeImageSrcset(image!, [750, 1080, 1440, 1920])}
      sizes="100vw"
      alt={title}
      width="1920"
      height="1080"
      loading="eager"
      fetchpriority="high"
    />
    <div class="at-hero__overlay"></div>
  </div>
) : (
```

Replace it with:

```astro
{image ? (
  <div class="at-hero__bg-image" aria-hidden="true">
    {videoSrc ? (
      <AmbientVideo
        src={videoSrc}
        posterImage={image!}
        alt={title}
        width={1920}
        height={1080}
        imgSizes="100vw"
        loading="eager"
        fetchpriority="high"
      />
    ) : (
      <img
        src={optimizeImageUrl(image!, 1080, 75)}
        srcset={optimizeImageSrcset(image!, [750, 1080, 1440, 1920])}
        sizes="100vw"
        alt={title}
        width="1920"
        height="1080"
        loading="eager"
        fetchpriority="high"
      />
    )}
    <div class="at-hero__overlay"></div>
  </div>
) : (
```

- [ ] **Step 2: Verify the existing parallax script still works**

The bottom of `HeroSection.astro` has a parallax script that selects `.at-hero__bg-image`. That selector still resolves to the wrapper `<div>`, so no change needed — confirm by reading the existing script and checking it doesn't directly target the inner `<img>`.

If the parallax script targets `.at-hero__bg-image img`, change it to `.at-hero__bg-image` so it works whether the inner element is `<img>` or `<AmbientVideo>`.

- [ ] **Step 3: Build to verify**

Run: `pnpm --filter @algarve-tourism/atlantis build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/HeroSection.astro
git commit -m "feat(shared): support optional ambient video in HeroSection (Atlantis)"
```

---

## Task 8: Wire `AmbientVideo` into `ProductHero`

**Files:**
- Modify: `packages/shared/src/components/ProductHero.astro`

- [ ] **Step 1: Add prop, import, conditional render**

Open `packages/shared/src/components/ProductHero.astro`. After `import PriceDisplay from "./PriceDisplay.astro";` add:

```astro
import AmbientVideo from "./AmbientVideo.astro";
```

In the `Props` interface, add:

```astro
  videoSrc?: string;
```

In the destructuring, add `videoSrc,`.

Find the existing main image block:

```astro
<div class="product-hero__main-wrap">
  <img
    src={optimizeImageUrl(item.images[0].url, 1200, 75)}
    srcset={optimizeImageSrcset(item.images[0].url, [600, 800, 1200, 1600])}
    sizes="(max-width: 768px) 100vw, 60vw"
    alt={item.name}
    class="product-hero__main-image"
    data-gallery-index="0"
    width="800"
    height="500"
    loading="eager"
    fetchpriority="high"
    decoding="async"
  />
</div>
```

Replace with:

```astro
<div class="product-hero__main-wrap">
  {videoSrc ? (
    <AmbientVideo
      src={videoSrc}
      posterImage={item.images[0].url}
      alt={item.name}
      width={800}
      height={500}
      imgSrcset={optimizeImageSrcset(item.images[0].url, [600, 800, 1200, 1600])}
      imgSizes="(max-width: 768px) 100vw, 60vw"
      loading="eager"
      fetchpriority="high"
      class="product-hero__main-image"
    />
  ) : (
    <img
      src={optimizeImageUrl(item.images[0].url, 1200, 75)}
      srcset={optimizeImageSrcset(item.images[0].url, [600, 800, 1200, 1600])}
      sizes="(max-width: 768px) 100vw, 60vw"
      alt={item.name}
      class="product-hero__main-image"
      data-gallery-index="0"
      width="800"
      height="500"
      loading="eager"
      fetchpriority="high"
      decoding="async"
    />
  )}
</div>
```

Note: when `videoSrc` is set, the `data-gallery-index="0"` attribute is dropped from the main element. The thumbnail strip still has thumbs starting at index 1, so the lightbox will only open photos 2-5 — that's acceptable for v1 (the hero slot shows video, the gallery holds the photos). If you want thumb 1 in the lightbox, add the original first image as a thumb in the strip too — out of scope for v1.

- [ ] **Step 2: Build to verify**

Run: `pnpm --filter @algarve-tourism/atlantis build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/ProductHero.astro
git commit -m "feat(shared): support optional ambient video in ProductHero"
```

---

## Task 9: Wire homepage to read `videos.json`

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/index.astro`

- [ ] **Step 1: Import the loader and pass `videoSrc`**

Open `packages/atlantis/src/pages/[locale]/index.astro`.

After the existing imports (around line 18), add:

```astro
import { getHomepageVideo } from "../../lib/videos.js";
```

In the frontmatter, after `const heroImage = "https://...";` add:

```astro
const homepageVideo = getHomepageVideo();
```

Find the `<HeroSection ... image={heroImage} />` invocation. Add a `videoSrc` prop:

```astro
<HeroSection
  config={config}
  locale={locale}
  title={heroTitle}
  subtitle={heroSubtitle}
  ctaText={t(locale, "hero.cta")}
  ctaLink={getLocalePath(locale, "/tours/")}
  image={heroImage}
  videoSrc={homepageVideo?.ambientClip}
/>
```

- [ ] **Step 2: Build and dev-server smoke check**

Run: `pnpm --filter @algarve-tourism/atlantis build`
Expected: Build succeeds.

Then start the dev server: `pnpm dev:atlantis`

Visit `http://localhost:4321/en/`. Expected: homepage looks identical to before (because `homepageVideo` is `undefined` — `videos.json` is empty). Stop the dev server (Ctrl-C).

- [ ] **Step 3: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/index.astro
git commit -m "feat(atlantis): wire homepage hero to optional ambient video"
```

---

## Task 10: Wire product page to read `videos.json` (ambient + lightbox + schema)

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/tours/[slug].astro`

This is the biggest wiring task. We add three things in the right places: `videoSrc` to `ProductHero`, a `<VideoLightbox>` between description and itinerary, and a `VideoObject` entry in `structuredData`.

- [ ] **Step 1: Add imports and load the entry**

Open `packages/atlantis/src/pages/[locale]/tours/[slug].astro`.

After the existing imports (around line 17, the `getTrustItems` import), add:

```astro
import VideoLightbox from "@algarve-tourism/shared/components/VideoLightbox.astro";
import { buildVideoObject } from "@algarve-tourism/shared";
import { getTourVideo } from "../../../lib/videos.js";
```

After `const trustItems = getTrustItems(locale);` add:

```astro
const tourVideo = getTourVideo(item.pk);
```

- [ ] **Step 2: Append `VideoObject` to `structuredData`**

Find the line `const structuredData = [productData, breadcrumbData];` and replace with:

```astro
const structuredData: object[] = [productData, breadcrumbData];
if (tourVideo?.youtubeId && tourVideo.youtubeMetadata) {
  structuredData.push(
    buildVideoObject({
      youtubeId: tourVideo.youtubeId,
      ...tourVideo.youtubeMetadata,
    }),
  );
}
```

- [ ] **Step 3: Pass `videoSrc` to `ProductHero`**

Find `<ProductHero item={item} locale={locale} brand={config.brand} />` and update to:

```astro
<ProductHero
  item={item}
  locale={locale}
  brand={config.brand}
  videoSrc={tourVideo?.ambientClip}
/>
```

- [ ] **Step 4: Render `<VideoLightbox>` between description and itinerary**

Find the description block:

```astro
{parsed.description && (
  <section>
    <div class="product-detail__description">
      {parsed.description.split(/\n\n+/).filter(Boolean).map((para) => (
        <p>{para.replace(/\n/g, " ").trim()}</p>
      ))}
    </div>
  </section>
)}
```

Directly after this `)}` (and before the `{parsed.itinerary && ...` block), insert:

```astro
{tourVideo?.youtubeId && (
  <section class="product-detail__video">
    <VideoLightbox
      youtubeId={tourVideo.youtubeId}
      posterImage={item.images[0]?.url}
      label={t(locale, "product.watch_experience")}
    />
  </section>
)}
```

- [ ] **Step 5: Build and smoke check**

Run: `pnpm --filter @algarve-tourism/atlantis build`
Expected: Build succeeds.

Start dev server: `pnpm dev:atlantis`

Visit any tour page, e.g. `http://localhost:4321/en/tours/<existing-slug>/`. Expected: page looks identical to before (because `tourVideo` is `undefined` for every tour — `videos.json` is empty). View source — confirm there is **no** `VideoObject` JSON-LD, **no** ambient `<video>` element, **no** `<button data-vlb-trigger>`. Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add packages/atlantis/src/pages/[locale]/tours/[slug].astro
git commit -m "feat(atlantis): wire product page to ambient video, YouTube lightbox, VideoObject schema"
```

---

## Task 11: Full verification gate

**Files:** None — verification only.

- [ ] **Step 1: Run all unit tests**

Run: `pnpm test`
Expected: All tests pass, including the new `buildVideoObject` and `shouldEnableAmbientVideo` tests.

- [ ] **Step 2: Build both Astro packages**

Run: `pnpm build`
Expected: Both `@algarve-tourism/atlantis` and `@algarve-tourism/algarve-and-you` build successfully (AnY is unchanged but should still build).

- [ ] **Step 3: Smoke-check the empty-config render**

Start dev: `pnpm dev:atlantis`. With browser DevTools Network tab open:
- Visit `http://localhost:4321/en/` — confirm no `.mp4` request, no `youtube.com` request.
- Visit `http://localhost:4321/en/tours/<any-slug>/` — same: no video-related network activity.
- View page source on the tour page; search for `VideoObject` — confirm it is **not** present.
- View page source; search for `data-vlb-trigger` — confirm it is **not** present.

This proves the v1 ship is a true no-op when `videos.json` is empty.

- [ ] **Step 4: Manual ambient-clip test (optional, only if a clip is ready)**

If you have a test MP4 ready:
1. Drop it into `packages/atlantis/public/videos/test-clip.mp4`.
2. Edit `packages/atlantis/src/content/videos/manual.json` to:
   ```json
   { "homepage": { "ambientClip": "/videos/test-clip.mp4" }, "byItemPk": {} }
   ```
3. Reload `http://localhost:4321/en/` on a desktop browser. Open Network tab — confirm `test-clip.mp4` only loads after the hero is in viewport (it is on page load), and the video fades in over the poster.
4. Open the page on mobile viewport (DevTools device emulation, e.g. iPhone 14): confirm **no** `.mp4` request fires. Only the `<img>` shows.
5. Revert `manual.json` back to `{ "byItemPk": {} }` and remove the test clip — these are not yet ready to ship.

- [ ] **Step 5: Commit (if any final fixups were made)**

If no changes were needed in this task, skip the commit.

---

## What's NOT in this plan (deferred)

- **Producing real ambient clips** — user does this manually post-merge (per spec rollout plan Phase 2-4).
- **CWV regression measurement** — happens after the first real clip ships, not at v1 merge (because empty-config v1 is a true no-op).
- **Algarve & You parity** — separate plan after v1 proves out.
- **Instagram reels, blog video, category-page video** — out of scope per spec.
- **Conversion tracking on video play** — v2.

---

## Self-review notes (for the writer, not the implementer)

- ✅ Spec coverage: Pattern A (ambient) → Tasks 4, 7, 8. Pattern B (lightbox) → Task 5, integrated in Task 10. VideoObject schema → Tasks 1, 10. Data model → Task 6. i18n key → Task 2. Performance discipline (gate, IO, no iframe in HTML) → Tasks 3, 4, 5.
- ✅ No placeholders: every step has full code or exact commands.
- ✅ Type consistency: `VideoObjectInput`, `TourVideoEntry`, `HomepageVideoEntry`, `videoSrc` prop name all consistent across tasks.
- ✅ Verification gate (Task 11) proves empty-config is a no-op — the strongest CWV guarantee for v1.
