# Design: ES/FR tour-content localization (Atlantis)

**Date:** 2026-07-01
**Status:** Approved (design)
**Scope:** `packages/atlantis` (atlantistours.pt). Algarve & You is a deferred follow-up.

## Problem

FareHarbor runs live Google "SmartAds" for Atlantis. On 2026-06-30 FH reported that the
French and Spanish versions of atlantistours.pt still show English content in parts of the
user journey. English content under `/es/` and `/fr/` lowers Google's ad-relevance and
landing-page-quality scores and wastes ad spend.

## Root cause (verified)

The English fallback has **two gates**, both of which must be opened:

1. **Fetch gate** — `scripts/fetch-fh.ts` sets `FH_LANGUAGES = ["pt", "en"]`, so tour data
   is baked only as `atlantistours.pt.json` / `atlantistours.en.json`. No es/fr data exists.
2. **Render gate** — `packages/atlantis/src/data.ts` has `FH_LOCALE_MAP = { en, pt }`.
   Any other locale (`es`, `fr`) falls back to `atlantistours.en.json` at render time. So
   even if es/fr JSON existed, the render layer would still serve English.

The site chrome (nav, buttons, labels) is already fully translated — the es/fr i18n
catalogues at `packages/shared/src/i18n/locales/{es,fr}.json` are complete (257/257 keys).
The gap is the FareHarbor product content only.

## Key decision — resolved empirically

**Does FareHarbor have Spanish/French product content?** — **Yes.** Querying the FH External
API (`?language=es`, `?language=fr`) for all four Atlantis PKs (717720, 717754, 720028,
718024) returns genuine translations across every field used by `normalizeItem`: `name`,
`headline`, `description_safe_html`, `cancellation_policy_safe_html`, and customer-type
display names (`Adulto/Niño/Bebé`, `Adulte/Enfant/Bébé`). This is not English fallback.

Therefore the clean "add the locales and re-fetch" path applies — no copy authoring needed.

## URL consequence

Tour slugs are derived per-language from each locale's own FareHarbor product name
(`normalizeItem`: `slugify(item.name)`), and `getStaticPaths` builds each tour page from
`loadItems(locale)`. Today, because es/fr fall back to English data, the build emits pages at
**English-slug paths under the Spanish/French locale**, e.g. `/es/tours/benagil-caves-speed-boat-tour/`.

After the fix, the es/fr builds use native data, so those pages move to **native slugs**, e.g.
`/es/tours/circuito-de-cuevas-de-benagil/`, and the old English-slug paths stop being generated
(they would 404). The English locale pages (`/en/tours/...`) are untouched.

Internal links, hreflang, and the sitemap all regenerate from `loadItems(locale)`, so nothing
inside the site breaks. The only inbound references to the old `/es/`+en-slug and `/fr/`+en-slug
URLs are: (a) the live FH ads — FH will repoint these to the correct slugs (confirmed with the
account owner); and (b) anything already crawled by Google. **Decision: add 301 back-redirects**
(matches how EN/PT slug renames are already handled, and the project rule to always ship a
back-redirect in the same change as a slug rename). Cost is 8 lines in the already-honored
Cloudflare `_redirects` file; no downside since FH handles the ad side.

## Changes

### 1. `scripts/fetch-fh.ts`
```
const FH_LANGUAGES = ["pt", "en", "es", "fr"] as const;
```
Re-running `pnpm fetch-data` bakes `atlantistours.es.json` / `atlantistours.fr.json` (and,
harmlessly, `algarveandyou.es.json` / `.fr.json`, which stay unused because A&Y's render map
is not changed here).

### 2. `packages/atlantis/src/data.ts`
```
const FH_LOCALE_MAP: Record<string, string> = { en: "en", pt: "pt", es: "es", fr: "fr" };
```

### 3. `packages/atlantis/public/_redirects`
Add (exact pairs computed from freshly-baked data — verified via the project `slugify`):
```
# ES/FR tour slugs localized (2026-07-01) — old EN-fallback slug → native slug
/es/tours/benagil-caves-speed-boat-tour/ /es/tours/circuito-de-cuevas-de-benagil/ 301
/fr/tours/benagil-caves-speed-boat-tour/ /fr/tours/circuit-des-grottes-jusqua-benagil/ 301
/es/tours/private-sail-yacht-cruise/ /es/tours/crucero-privado-en-yate-de-vela/ 301
/fr/tours/private-sail-yacht-cruise/ /fr/tours/croisiere-privee-en-yacht-a-voile/ 301
/es/tours/private-yacht-cruise-to-the-benagil-caves/ /es/tours/crucero-privado-en-yate-a-las-cuevas-de-benagil/ 301
/fr/tours/private-yacht-cruise-to-the-benagil-caves/ /fr/tours/croisiere-privee-en-yacht-vers-les-grottes-de-benagil/ 301
/es/tours/reef-fishing-tour/ /es/tours/pesca-de-fondo/ 301
/fr/tours/reef-fishing-tour/ /fr/tours/peche-au-fond/ 301
```
Slug pairs will be re-confirmed against the actual baked JSON during implementation (not
hand-copied), since FareHarbor product names can change.

## In scope, resolve during implementation

- **Booking-modal language.** `buildFHEmbedUrl` passes no language param, so the FareHarbor
  lightframe opens in its own default. Investigate whether the FH embed accepts a
  `language`/`locale` parameter; if it does, map the site locale through so the booking flow
  opens in ES/FR. If not supported, document that the modal language is FH-controlled.
- **Hard-coded English sweep.** A light pass over Atlantis `.astro` components for English
  strings not wired through `t(locale, …)` (the low-priority chrome layer).

## Deploy

Live host is Cloudflare Pages, building from a push to `master`; CF's build command runs the
FH fetch (FH keys are CF build env vars). So shipping is: commit code + redirects → push
`master` → CF re-fetches es/fr and deploys. Baked data is gitignored, so it is never committed.

**Pre-push verification (local):** run `pnpm fetch-data` (FH keys from `.env`) + build, then
load `/es/` and `/fr/` homepage, one tour page, and the booking widget; confirm no English
fallback and that old tour URLs 301 to the new native slugs.

## Definition of done

`/fr/` and `/es/` Atlantis tour pages, homepage, and booking flow render fully in the target
language with no English fallback; old es/fr tour URLs 301 to native slugs; built locally,
verified, and live on Cloudflare Pages.

## Out of scope

- Algarve & You es/fr localization (no live ads; trivial follow-up once its render map is
  wired the same way — its es/fr data will already be baked by change #1).
- Any FareHarbor product-copy authoring (not needed; FH already has es/fr).
