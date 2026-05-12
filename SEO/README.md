# SEO workspace

This folder is the home for **SEO work** on the two tourism sites — separate from `GoogleAds/` (paid) and `packages/` / `docs/superpowers/` (development). It exists so the SEO skills (`seo-technical`, `seo-onpage`, `seo-keyword`, `seo-content-audit`, `seo-competitor`, `seo-aeo-geo`) have one place to:

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
- **Search Console API: tooling built, activation pending.** `gsc` CLI wrapper at `~/.local/bin/gsc` (`gsc sites` / `top-queries` / `top-pages` / `query` / `page` / `sitemaps` / `inspect`); creds at `~/.gsc-credentials.json`, scope `webmasters.readonly` added to the shared OAuth re-auth (`~/.local/share/ga4-data/reauth.py`). Still needs: Search Console API enabled in GCP project `gen-lang-client-0088278126`, one re-auth run to mint the new scope, and the properties verified under `jose.ferreira.ptm2@gmail.com`. Once live, this unblocks `seo-keyword` (real queries) and `seo-traffic-diagnosis`. See memory `reference_gsc_api_setup`.
- **Google Ads API: available** (customer `922-490-9849`, queryable via Python or the MCP `search` tool). The keyword corpus in `GoogleAds/atlantis/02-campaigns/*/keywords-and-rsa.md` is the starting universe for `seo-keyword` — same query set, feeds both organic and paid.

## SEO content index (nothing moved — these are pointers)

**Audits**
- `SEO/audits/2026-05-12-atlantis-technical-onpage-audit.md` — current technical + on-page audit (copy of `docs/seo/atlantis/2026-05-12-technical-onpage-audit.md`). Status: **fresh, backlog not yet started.**

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

**P0 — high impact, low effort, all code-side**
1. Fix tour-page hreflang — thread `localePaths` through `Layout` → `SEO.astro` as `alternateUrls` in `tours/[slug].astro`; check blog posts for the same bug.
2. Fix tour meta descriptions — per-tour `seoTitle?`/`seoDescription?` overrides + word-boundary truncation fallback; reuse one value for `<meta>`/OG/Twitter/`Product.description`. (Hand-written drafts are in the audit appendix.)
3. Enable HSTS on Cloudflare.

**P1 — clear wins**
4. `noindex,follow` blog tag pages + drop `/blog/tag/` from the sitemap `filter`; same for category pages without unique copy.
5. Enrich homepage schema — add `WebSite` node; add `image`/`logo`/`priceRange`/`openingHoursSpecification`/`areaServed`/company `aggregateRating` to `LocalBusiness`.
6. Complete `Offer` schema — add `url` + `priceValidUntil`.
7. Resolve `/tours/` vs `/tours/boats/` overlap (`seo-content-audit`).
8. Add `/llms.txt` (`seo-aeo-geo` reference has the template).

**P2 — polish:** stop generating localized-slug duplicate tour URLs under non-PT locales · differentiate homepage title vs H1, add homepage body prose · trim `Product.image` arrays to ~5–8 · verify/remove `FAQPage` on `/reviews/` · single-hop apex redirect · expand FAQ question set · skipper-byline author schema on blog posts · sitemap hreflang consistency · confirm CWV in GSC.

**Recommended next audits (not yet run):** `seo-keyword` (build a keyword map from the Ads corpus + GSC) · `seo-content-audit` (keep/merge/redirect across ~13 blog posts + listings + taxonomy) · `seo-traffic-diagnosis` (once a GSC export exists) · `seo-competitor` (vs Algarve Experience, Dreamwave, Xride, Algarve Discovery, Royal Nautic — same set bid on in Ads).

## How to use this folder

- **Run an SEO skill** (e.g. "audit on-page SEO", "do keyword research") — point it at this README for context, then save its output here: `SEO/audits/YYYY-MM-DD-<site>-<type>.md`, `SEO/research/<topic>.md`, etc. Date-prefix anything that's a point-in-time snapshot.
- **When a site change is also a Google Ads landing-page change** (meta, redirects, schema, page speed on a tour page), append a line to `GoogleAds/atlantis/06-changelog.md` too — that journal is how paid cause/effect is tracked.
- **Both sites use the same shared `packages/shared` SEO machinery** — a fix to `SEO.astro` / `structured-data.ts` / i18n locales affects Atlantis *and* Algarve & You. Most prior work has been Atlantis-first; A&Y often inherits it for free.
