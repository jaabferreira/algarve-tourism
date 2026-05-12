# SEO workspace

This folder is the home for **SEO work** on the two tourism sites — separate from `GoogleAds/` (paid) and `packages/` / `docs/superpowers/` (development). It exists so the SEO/content skills (see "Skills installed" below) have one place to:

1. **read everything that matters for SEO** — site facts, code paths, access, prior audits, open backlog (this file is that index), and
2. **write their outputs** — new audits → `SEO/audits/`, keyword/competitor research → `SEO/research/`, anything else → `SEO/<topic>/`.

Nothing was moved out of `docs/` — the original plans/specs/audits stay where they are; this README links to them. The one exception is `audits/2026-05-12-atlantis-technical-onpage-audit.md`, which is a copy of `docs/seo/atlantis/2026-05-12-technical-onpage-audit.md` (a dated snapshot — it won't drift).

---

## Sites & stack (what an SEO skill needs to know)

| | Atlantis Tours | Algarve & You |
|---|---|---|
| Domain | `www.atlantistours.pt` | `www.algarveandyou.com` |
| Hosting | Cloudflare Pages | Cloudflare Pages |
| DNS | Cloudflare (no nameserver migration possible/needed) | Cloudflare |
| Stack | Astro 5 static, monorepo `packages/atlantis` + `packages/shared` | Astro 5 static, `packages/algarve-and-you` + `packages/shared` |
| Locales | `en` (default) `pt` `es` `fr`, `prefixDefaultLocale: true` so every URL is `/<locale>/…` | same 4 locales, same routing |
| Sitemap | `/sitemap-index.xml` → `/sitemap-0.xml`, ~186 URLs (~46/locale) | similar |
| Bookings | FareHarbor Lightframe embeds (no separate checkout pages) | same |
| Primary money pages | 4 tour pages under `/<locale>/tours/<slug>/` (Benagil speedboat, private Benagil yacht, private sail yacht, reef fishing) — also the Google Ads landing pages | tour/transfer pages |
| Audience | in-Algarve last-minute bookers (80%) + pre-trip planners from UK/IE/DE/NL/FR/ES (20%) | similar |
| Note | PT tour slugs are localized (`circuito-de-grutas-ate-benagil`); EN/ES/FR are not | A&Y has category pages; Atlantis does not |

`dig` is not available in this environment — use `curl "https://dns.google/resolve?name=DOMAIN&type=NS"` for DNS lookups.

## SEO-relevant code paths (all shared unless noted)

| Path | What it controls |
|---|---|
| `packages/shared/src/components/SEO.astro` | `<title>`, meta description, canonical, OG/Twitter, hreflang (`alternateUrls` prop), `noindex`, JSON-LD injection |
| `packages/shared/src/seo/structured-data.ts` | JSON-LD builders: `buildLocalBusiness`, `buildFAQPage`, `buildAggregateRating`, `buildReviewList`, `buildBlogPosting`, `buildBreadcrumbList`, `buildItemList`, `buildCollectionPage`, `buildVideoObject` |
| `packages/shared/src/seo/structured-data.test.ts` | Unit tests for the above |
| `packages/shared/src/layouts/PageLayout.astro` → site `Layout.astro` | Threads SEO props (incl. `alternateUrls`) from pages to `SEO.astro` |
| `packages/shared/src/i18n/types.ts` + `locales/{en,pt,es,fr}.json` | All localized meta strings (`meta.*`), titles, FAQ/blog strings — typed; new keys go in `types.ts` + all 4 JSONs |
| `packages/atlantis/astro.config.mjs` (and A&Y's) | `site`, `@astrojs/sitemap` config incl. `filter` (excludes `/` and `/partners/`), i18n routing |
| `packages/atlantis/public/robots.txt`, `_redirects` | Crawl rules (`Allow: /`, `Disallow: /*/partners/`, sitemap ref) and redirects (`/rss.xml` → `/en/rss.xml`, etc.) |
| `packages/atlantis/public/og-default.jpg`, `logo-atlantis.png` | Default OG image / logo (A&Y has its own) |
| `packages/atlantis/src/pages/[locale]/tours/[slug].astro` | Tour page template — meta/schema for the money pages (current hreflang + meta-description bugs live here) |
| `packages/atlantis/src/pages/[locale]/index.astro` | Homepage entity schema (`LocalBusiness` + `TourOperator`) |
| `packages/atlantis/src/content/blog/<locale>/*.md` | ~13 blog posts; `BlogPosting` schema; `authorBio`/`authorImage` optional for `Person` author |
| `packages/atlantis/src/content/faqs/` + `src/lib/faqs.ts` | Per-tour FAQ blocks + `FAQPage` schema |
| `packages/atlantis/src/content/videos/manual.json` + `src/lib/videos.ts` | `VideoObject` schema source (keyed by FareHarbor item PK) |

## Data / access status

- **GA4 Data API: available.** Property `533736679`, Atlantis measurement ID `G-YE21ZWJNY7`. Use the `ga4` CLI wrapper at `~/.local/bin/ga4` for all real-user metrics incl. Core Web Vitals (lab tests under-report CLS — trust CrUX/GA4 field data). See memory `reference_ga4_data_api_setup`.
- **Search Console API: available** (since 2026-05-12). `gsc` CLI wrapper at `~/.local/bin/gsc` — `gsc sites` / `top-queries <siteUrl>` / `top-pages` / `query` / `page <siteUrl> <pageUrl>` / `sitemaps` / `inspect`. The only verified property is **`sc-domain:atlantistours.pt`** (Domain property, siteOwner) — that's the `siteUrl` arg. **`algarveandyou.com` is NOT in Search Console** under this account; add + verify it to get A&Y organic data. Data lags ~2-3 days (`--fresh` for recent). Use this for query/CTR/position, indexation (`gsc inspect`), and sitemap status the way `ga4` is used for CWV. See memory `reference_gsc_api_setup`.
- **Google Ads API: available** (customer `922-490-9849`, queryable via Python or the MCP `search` tool). The keyword corpus in `GoogleAds/atlantis/02-campaigns/*/keywords-and-rsa.md` is the starting universe for `seo-keyword` — same query set, feeds both organic and paid.

## SEO content index (nothing moved — these are pointers)

**Audits**
- `SEO/audits/2026-05-12-atlantis-technical-onpage-audit.md` — technical + on-page audit (copy of `docs/seo/atlantis/2026-05-12-technical-onpage-audit.md`). Status: **fresh, backlog not yet started.**
- `SEO/audits/2026-05-12-atlantis-organic-diagnosis.md` — "why results are lacking": GSC + GA4 live-data diagnosis on top of the audit above. Headline: ~92% of organic clicks are branded; money pages rank page 3–4; root cause = young site + zero off-site authority + a handful of fixable defects (hreflang 404s, redirect→404, truncated metas, stale GSC sitemaps). The real lever is off-page/citations + a content hub, not more on-page work. P0 defects fixed 2026-05-12 (commits `6fc810f` + `6b16e5b`); GSC sitemap cleanup done by the operator.

**Research** (`SEO/research/`)
- `2026-05-12-atlantis-keyword-map.md` (+ `…-keyword-clusters.csv`, `…-keywords.csv`) — keyword & topical map built from the Google Ads keyword corpus × Search Console. 16 clusters → pages, scored & prioritised. Top findings: biggest non-brand demand is **German then French** and there's **no German locale**; the headline term ("benagil cave tour") is a long game; several queries (dolphin cluster, multilingual boat-tour CTR, "things to do in Portimão") are quick wins. Feeds `pillar-content-architecture` + `content-brief-authoring`.
- `2026-05-12-atlantis-competitor-analysis.md` — competitor SERP teardown. The real organic competitors are **OTA aggregators** (GetYourGuide/Viator/Tiqets/Headout/Civitatis) + **descriptive-domain operators** (carvoeirocaves, benagilexpress, 5emotions, algarexperience) — *not* the paid-campaign competitors (Dreamwave/Xride/etc are Albufeira-based, little organic overlap). Beat OTAs on long-tail/informational (content hub); close the operator gap via off-page + reviews; every competitor serves German. Confirms the diagnosis: the gap is authority + entity + a missing language, not on-page quality. Feeds `seo-offpage`.

**Content hub** (`SEO/content-hub/`) — branch `feat/atlantis-content-hub`
- `2026-05-12-atlantis-benagil-hub-architecture.md` (+ `…-hub-links.csv`, the linking inventory) — the pillar-and-cluster architecture for the Benagil Cave Tour hub: pillar = the existing `benagil-cave-tour-complete-guide` post expanded ~1,060→~3,500w; ~11 cluster pieces (8 are existing posts kept/expanded/de-duped, 2–3 new — incl. "can you swim in Benagil cave / the 2023 rules" and "how to visit"); a fishing satellite cluster; full top-down/bottom-up/lateral link graph + the new tour→guide direction; URLs stay under `/blog/` for now (migration risk > URL-signal gain on a young site); breadcrumb/schema/AEO layer; annual refresh cadence; owner = the operator. §8 has the build backlog (site-side wiring plan + the per-piece `content-brief-authoring` order). Drafting goes to Opus subagents.

**Plans & specs** (in `docs/superpowers/`)
| Doc | Topic | Status |
|---|---|---|
| `plans/2026-04-10-seo-improvements.md` | OG images, structured data, 404s, RSS, alt text, perf hints (both sites) | shipped |
| `plans/2026-04-14-seo-fixes.md` + `specs/2026-04-14-seo-fixes-design.md` | meta descriptions, titles, H1s, privacy page, category pages, footer links, sitemap | shipped (slug-pipeline part deferred) |
| `plans/2026-04-16-atlantis-blog.md` + `specs/2026-04-16-atlantis-blog-design.md` | SEO blog: categories, tags, hreflang, RSS, related-tours | shipped (plan file currently has uncommitted edits) |
| `plans/2026-04-30-atlantis-faqs-rebuild.md` + `specs/2026-04-30-atlantis-faqs-rebuild-design.md` | query-matched per-tour FAQ blocks + `FAQPage` schema | in progress — worktree at `.worktrees/atlantis-faqs-rebuild` |
| `plans/2026-04-30-atlantis-reef-fishing-blog.md` + `specs/2026-04-30-atlantis-reef-fishing-blog-design.md` | 2 SEO blog posts + E-E-A-T `Person`/skipper author schema | planned |
| `plans/2026-04-30-atlantis-video-integration.md` + `specs/2026-04-30-atlantis-video-integration-design.md` | ambient video + `VideoObject` schema, CWV-safe | planned |

**Related memory** (`~/.claude/projects/.../memory/`)
- `project_missing_reviews` — 3 tours still need reviews for Google rich snippets (Cranchi yacht, fishing, Benagil+Alvor)
- `project_atlantis_cls_investigation` — 3 CLS fixes deployed 2026-04-29; re-check on/after 2026-05-06
- `reference_ga4_data_api_setup` — GA4 Data API + `ga4` CLI (use for all CWV work)
- `reference_heading_color_token` — dark-bg sections must set `--heading-color: #fff`
- `project_atlantis_ads_attribution_fix` — GA4 unwanted-referrals fix (2026-04-30); pre-2026-04-30 conversion data unreliable

## Open SEO backlog (from the 2026-05-12 audit — see that file for full detail)

**P0 — ✅ done in repo 2026-05-12 (commit `6fc810f` + follow-up):**
1. ✅ Tour-page hreflang — `localePaths` now threaded through `Layout` → `SEO.astro` as `alternateUrls` in `tours/[slug].astro` (**both sites** — A&Y also localizes PT tour slugs, so it had the same bug). Blog hreflang was already correct on Atlantis; A&Y blog still passes no `alternateUrls` (follow-up, A&Y isn't in GSC yet).
2. ✅ Tour meta descriptions — `truncateAtWord` helper (`packages/shared/src/lib/text.ts`, exported from `@algarve-tourism/shared`) + `packages/atlantis/src/lib/seo-overrides.ts` (hand-written copy + `<title>` overrides for the 4 Atlantis tours in **all 4 locales**); one value feeds `<meta>`/OG/Twitter/`Product.description`. A&Y tour pages use the `truncateAtWord` fallback (no per-tour copy yet).
3. ✅ HSTS — added `_headers` (`max-age=31536000`) to **both sites**' `public/`.
   - Also done: `_redirects` `rio-arade-silves` → `/tours/` (was 301→404).
   - Still open (manual): remove the stale 2025 `sitemap.xml` + the bogus tour-URL-as-sitemap entry from Search Console (kebab `⋮` menu on the sitemap row → "Remove sitemap"); single-hop apex redirect on Cloudflare (low value — 2 hops is fine for SEO). See `audits/2026-05-12-atlantis-organic-diagnosis.md` §4.

**P1 — clear wins**
4. `noindex,follow` blog tag pages + drop `/blog/tag/` from the sitemap `filter`; same for category pages without unique copy.
5. Enrich homepage schema — add `WebSite` node; add `image`/`logo`/`priceRange`/`openingHoursSpecification`/`areaServed`/company `aggregateRating` to `LocalBusiness`.
6. Complete `Offer` schema — add `url` + `priceValidUntil`.
7. Resolve `/tours/` vs `/tours/boats/` overlap (`seo-content-audit`).
8. Add `/llms.txt` (`seo-aeo-geo` reference has the template).

**P2 — polish:** stop generating localized-slug duplicate tour URLs under non-PT locales · differentiate homepage title vs H1, add homepage body prose · trim `Product.image` arrays to ~5–8 · verify/remove `FAQPage` on `/reviews/` · single-hop apex redirect · expand FAQ question set · skipper-byline author schema on blog posts · sitemap hreflang consistency · confirm CWV in GSC.

**Recommended next work:**
- ✅ `seo-keyword` — done, see `research/2026-05-12-atlantis-keyword-map.md`.
- ✅ `seo-competitor` — done, see `research/2026-05-12-atlantis-competitor-analysis.md`.
- ✅ `pillar-content-architecture` — done, see `content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` (branch `feat/atlantis-content-hub`). **Next on that branch:** the site-side wiring implementation plan (`docs/superpowers/plans/`) + the per-piece briefs via `content-brief-authoring` (order in §8 of the architecture doc — pillar rewrite first, then "can you swim", "how to visit", expand the best-time stub, refresh the dolphin/caves posts).
- **`seo-offpage`** — directory/citation/award-program + operator-profile + partner-link target list (use the link sources the competitor analysis identified). Still the highest-leverage un-run play; "benagil cave tour" won't move without it.
- **A German `de` locale** — biggest measured non-brand demand, no current locale; a real i18n/build project (`internationalization` skill). Scope separately.
- `seo-content-audit` (keep/merge/redirect across ~13 blog posts + listings + the `/tours/` vs `/tours/boats/` taxonomy overlap) — do as part of the pillar restructure.

## Skills installed (`.claude/skills/`)

Skills are auto-discovered at session start. SEO/content/ads/growth set:

- **SEO:** `seo-technical`, `seo-onpage`, `seo-keyword`, `seo-content-audit`, `seo-competitor`, `seo-aeo-geo`, `seo-offpage` (link building / digital PR / citations)
- **Content:** `content-brief-authoring` (per-piece briefs that rank), `content-refresh-system` (the annual "2026"-in-titles refresh, content decay), `pillar-content-architecture` (turn the ~13 blog posts into a Benagil/Algarve-boat-tours hub-and-cluster to build topical authority), `landing-page-copy` (the 4 tour pages = organic money pages *and* ad landing pages)
- **Conversion / paid:** `cro-optimization`, `paid-media-strategy`, `ads-creative-development`, `ads-performance-analytics`
- **Technical:** `performance-optimization` (Core Web Vitals — pair with the `ga4` CLI for field data), `internationalization` (the broken-hreflang finding; 4-locale site), `security-baseline` (the missing HSTS / CSP)

Not installed but available in the source repo (`github.com/rampstackco/claude-skills`): the 7-skill **Ahrefs-MCP SEO audit suite** (`seo-audit-orchestration`, `seo-traffic-diagnosis`, `seo-backlink-audit`, `seo-site-health-audit`, `seo-rank-tracking`, `seo-content-gap-audit`, `seo-keyword-gap-audit`) — they assume the Ahrefs MCP; worth adding if Ahrefs gets purchased.

## How to use this folder

- **Run an SEO skill** (e.g. "audit on-page SEO", "do keyword research") — point it at this README for context, then save its output here: `SEO/audits/YYYY-MM-DD-<site>-<type>.md`, `SEO/research/<topic>.md`, etc. Date-prefix anything that's a point-in-time snapshot.
- **When a site change is also a Google Ads landing-page change** (meta, redirects, schema, page speed on a tour page), append a line to `GoogleAds/atlantis/06-changelog.md` too — that journal is how paid cause/effect is tracked.
- **Both sites use the same shared `packages/shared` SEO machinery** — a fix to `SEO.astro` / `structured-data.ts` / i18n locales affects Atlantis *and* Algarve & You. Most prior work has been Atlantis-first; A&Y often inherits it for free.
