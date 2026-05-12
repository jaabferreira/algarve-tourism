# Atlantis Ads — Changelog

Reverse-chronological log of every change made to the Atlantis Tours Google Ads account (customer ID `922-490-9849`) and adjacent infrastructure (GA4, FareHarbor, landing pages) that affects ad performance.

**Format:** one section per date. Each entry: **what** changed, **why**, **expected effect**, **verify on/after**. Add new entries at the top.

---

## 2026-05-12 — Tour-page SEO defect fixes (the 4 landing pages)

**What:** Code changes shipped to the 4 tour pages (= the Google Ads landing pages), from the organic SEO diagnosis (`SEO/audits/2026-05-12-atlantis-organic-diagnosis.md`):
- **hreflang fixed** — EN/ES/FR tour pages now point their `hreflang="pt"` alternate at the real localized PT slug (`/pt/tours/circuito-de-grutas-ate-benagil/`) instead of a 404. Threaded the already-computed `localePaths` through `Layout` → `SEO.astro` `alternateUrls`.
- **meta descriptions** — replaced the mid-word-truncated FareHarbor body fragment ("…explore the w") with hand-written copy for the 4 tours in **all 4 locales (EN/PT/ES/FR)**. New `truncateAtWord` helper + `lib/seo-overrides.ts` map. Same value now used for `<meta>` / OG / Twitter / `Product.description` schema. (Any future tour with no override falls back to a word-boundary truncation of the FareHarbor description — no longer cut mid-word.)
- **`<title>` tweaks** — the 4 tour titles (all locales) now add "from Portimão" / "Half Day" etc. (differentiates from the H1).
- **Algarve & You mirrored** — same `_headers` (HSTS) + tour-page `alternateUrls` fix + `truncateAtWord` meta wiring shipped to the A&Y site too (A&Y also localizes PT tour slugs, so it had the same hreflang-404 bug). A&Y tour pages don't get hand-written per-tour copy yet — they use the truncation fallback.
- **`_redirects`** — `rio-arade-silves` (+ PT) used to chain to a now-deleted product page → 404; repointed to `/tours/`.
- **HSTS** — added `packages/atlantis/public/_headers` with `Strict-Transport-Security: max-age=31536000`.

**Why:** Landing-page experience is a Quality Score input; the broken hreflang + broken-looking SERP snippet were also hurting *organic* CTR/visibility (see the diagnosis doc — site is ~92% branded-only). Marginal QS upside; meaningful organic upside. Not committed/deployed yet as of this entry.

**Expected effect:** Cleaner SERP snippets for the 4 money pages (organic + as a landing-page-quality signal); Google can finally resolve the EN↔PT language cluster for the tour pages; no more 301→404 on the old river-cruise URLs. No direct change to ad serving.

**Verify on/after 2026-05-26:** after deploy — `curl` a tour page to confirm hreflang/meta in prod; GSC URL Inspection on the PT tour URLs; watch the tour pages' organic position/CTR for the 4 money keywords; check QS hasn't regressed.

---

## 2026-05-12 — 14-day performance review + restructure (paused 4 campaigns)

**Context — the trigger:** Re-minted the expired Google Ads / GA4 OAuth tokens (the testing-mode app expires them ~weekly), pulled the first proper 14-day read (2026-04-28 → 2026-05-11), and it was bad: **€1,156.92 spent, 824 clicks, 4 conversions** (≈€289 CPA, ~0.5% conv rate). Cross-checked against GA4 — first-user attribution shows only **5** purchases ever touched a paid click (vs 4 session-scoped), and conversions are flat day-by-day with no step-up after the 2026-04-30 attribution fix → the "4" is roughly real, not a measurement artifact.

**Diagnosis (three compounding problems):**
1. **Quality Score 1–3 on nearly every money keyword** (`benagil cave` QS 3 @ €2.45 avg CPC; `algarve fishing` QS 3; competitor terms `xride`/`dreamwave algarve` QS 1 @ €3–4.60 CPC) vs `atlantis tours` brand QS 10. Google charges ~inversely to QS, so we're paying 2–3× per click. Causes: 13-day-old account (expected-CTR seeded low), the Apr 21–30 zero-conversions period (lightframe leak) that torched ad rank, mobile CrUX CLS 0.12, slightly loose phrase match. Note the Benagil **bids are only €1.80 (EN) / €1.20 (localized)** — that's *not* an over-bid; the €2.45 avg CPC is the €1.80 bid × the +30% in-Algarve geo boost. Cutting bids at QS 3 would just de-serve the ads, so **no bid changes** — QS recovery (time + the page fixes already shipped) is the lever.
2. **7 campaigns on €80/day → all starved.** Impression share lost *to budget*: Benagil 90%, Cranchi 90%, Sail 86%, Competitors 86%. The four niche campaigns (Competitors, Cranchi, Sail, Reef) burned **€448 combined for 0 conversions** and essentially zero booking-funnel activity — money spent learning nothing.
3. **Paid traffic opens the FareHarbor widget and bails at 5× the organic rate.** GA4 funnel (cpc vs organic, 14d): sessions 818 / 594 → viewed-tour-detail 92 / 134 → opened booking widget 87 / 99 → form_start 30 / 35 → add_to_cart 14 / 30 → **purchase 4 / 15**. Widget-open→book: 4.6% (paid) vs 15% (organic). The tour *pages* are fine (92→87 = 95% open the widget); the leaks are (a) only 11% of paid clicks reach a tour detail at all (the Generic & Competitors campaigns dumped clicks on the `/tours/` category list, not a tour page) and (b) the 87→4 widget collapse. **Not availability** (user confirmed: overbooking allowed, never sold out) — so it's price-comparison bail / lightframe friction / looser paid intent. Flagged for separate investigation.

**What changed (via API, this date):**
- **Paused 4 campaigns:** `BRAND — Competitors` (€74.50 → 0 conv, structurally QS 1–2), `NB — Cranchi Yacht` (€148.71 → 0 conv), `NB — Sail Yacht` (€80.60 → 0 conv), `NB — Reef Fishing` (€143.69 → 0 conv; also Albufeira-intent search terms vs Portimão departure). Frees ~€30/day. (Reef's organic blog content from 2026-04-30 is unaffected.)
- **Added 3 negative keywords to NB - Benagil** (it already had 42): `taruga` (BROAD), `ophelia` (BROAD) — competitor boats appearing in the search-term report — and `from faro` (PHRASE) — wrong region. Now 45 negatives.
- **Repointed the 4 `NB — Algarve Generic` ads' final URLs** from `/[locale]/tours/` (category list) to the Benagil tour page per locale: EN/ES/FR → `…/tours/benagil-caves-speed-boat-tour/`, PT → `…/tours/circuito-de-grutas-ate-benagil/`. Generic ad strength on ES was AVERAGE; a specific high-converting tour page (with reviews + booking widget) should lift relevance/QS over a list page.

**What was deliberately NOT changed (and why):**
- **No Benagil bid cut** — see point 1; €1.80 bid at QS 3 is already near the serving floor.
- **No budget reallocation yet** — daily spend drops €80 → €50 (Brand €5 + Benagil €30 + Generic €15); the freed ~€30/day stays unspent for ~1 week so next week's read isn't muddied by a simultaneous budget change. Reassess after the Generic-URL fix + funnel investigation.
- **No match-type tightening on `benagil cave` phrase** — the existing 45-negative list already filters bad matches; converting to exact would cut volume we can't afford to lose.
- **Generic wrong-city keywords** (`boat tour lagos/albufeira/carvoeiro/lagoa` + PT/ES/FR equivalents) left alone pending operational input on pickup radius — Carvoeiro/Lagoa are next to Benagil so arguably on-target; Lagos has its own caves so probably not.
- **Still Manual CPC** — Smart Bidding needs ≥30 conv; we have ~5.

**Expected effect:** Daily burn drops ~38% with no loss of the campaigns that actually have a funnel. Slightly cheaper/more-relevant Generic clicks once the new landing pages season. Benagil unchanged structurally — its recovery depends on QS climbing and the widget-collapse fix, not on this change.

**Verify on/after 2026-05-26:** pull conversions + QS + impression share for Brand/Benagil/Generic; check GA4 cpc funnel for Generic (do the repointed URLs lift view_item_description / view_book_form rates?); decide budget reallocation; open the widget-open→book investigation (price vs lightframe UX vs intent). Re-mint OAuth tokens first (they'll have expired again).

**Honest retro:** launching 7 campaigns day-one at this budget was wrong (should've been Brand + Benagil + Generic, expand later); the Competitors campaign should never have launched at this stage (lowest-ROI campaign type that exists); QS/landing-page alignment should have been sorted before the spend ramped, not after. Defensible: Manual CPC for a new account, search-only, the geo adjustments, the Brand campaign (QS 10, profitable).

---

## 2026-04-30 — Hero video on landing pages (homepage + Benagil)

**What:**
- Homepage hero now plays a 12s ambient video loop (1080p, 4.8MB, no audio, faststart) on desktop only. Mobile/save-data/reduced-motion users keep the static poster image.
- Benagil Caves Speed Boat tour page (FH pk 717720) gets a click-to-play YouTube lightbox between description and itinerary, plus a `VideoObject` JSON-LD schema for Google video rich results.
- Other tours unaffected — manual JSON-driven, only Benagil is wired today.

**Architecture:** image+video layered (poster `<img>` always loads first as LCP), IntersectionObserver-mounted video, `:has()`-driven overlay swap so the static-image case keeps its proper text contrast. YouTube facade — no iframe in initial HTML, created on click only.

**Why:** Google ranks video pages well for tourism queries; ambient hero video is a known engagement lift on direct-bookings-style sites; click-to-play YouTube on the highest-traffic tour page (Benagil, 7.7K views) tests the pattern with our best content.

**Expected effect:**
- Mobile CWV (CrUX): zero change — gate strips the video before any request fires. Mobile CLS investigation from 2026-04-29 stays clean.
- Desktop CWV: +4.8MB transfer; LCP/CLS/INP unaffected (video loads after LCP is locked, layered architecture, async load).
- Engagement: longer time-on-page for desktop homepage and Benagil tour visitors. Possible CTR/booking lift from richer SERP for Benagil queries once `VideoObject` is indexed.
- SEO: net positive once `VideoObject` is in Google's index (1-2 week lag typical).

**Verify on/after 2026-05-14:** check GA4 for time-on-page deltas (homepage desktop, Benagil tour); Google Search Console → Search appearance → Videos for the Benagil URL; CrUX report for desktop LCP/CLS/INP.

**Follow-ups:** finalize `VideoObject` `uploadDate`/`duration` for Benagil (currently placeholders), produce ambient clips for the remaining tours, consider AnY parity in a separate plan.

---

## 2026-04-30 — Reef fishing blog posts published

**What:** Published two new reef-fishing blog posts in EN/PT/ES/FR (8 markdown files):
- "Reef Fishing in the Algarve: What to Expect on the Boat" — national-intent, ~1,200 words
- "Reef Fishing from Portimão: A Skipper's Half-Day Guide" — Portimão-anchored sibling, ~1,200 words

Introduced a signed-author byline pattern for skipper Nuno Albino. Tiny shared schema extension (`authorBio`, `authorImage` optional fields), `buildBlogPosting` forks to emit `Person` JSON-LD when both new fields are set, and a new `<AuthorBio>` component renders bio + photo on the post page. Existing 11 posts unchanged (no new fields → fallback to `Organization` JSON-LD, no visible bio block).

Hero image Filestack URLs and Nuno's headshot (`/authors/nuno-albino.jpg`) are placeholders pending user upload before deploy.

**Why:** The Reef Fishing campaign (€8/day, live since 2026-04-29) had zero supporting blog content — clicks landed on the product page only. Two practical posts give organic search a route in for "reef fishing Algarve / Portimão" queries and reinforce landing-page-experience signals for paid clicks. The Portimão-anchored sibling matches the +30% Portimão geo bid adjustment with a city-anchored organic page. The Nuno byline pattern lifts E-E-A-T from generic brand byline to a real, identifiable operator.

**Expected effect:** Slow ramp on organic impressions for "reef fishing algarve / portimão" and PT/ES/FR equivalents over 4–8 weeks. Possible small Quality-Score lift on the Reef Fishing campaign as the site adds topical breadth (low confidence; QS is sticky and budget-driven). Person JSON-LD eligible for Google's author-entity surfaces; visible bio + photo improves trust signal for first-time visitors arriving from cold ad clicks.

**Verify on:** 2026-05-28 — check Search Console for impressions on the 8 new URLs and any movement in Reef Fishing campaign CTR / Quality Score.

---

## 2026-04-30 — Scale-to-learn budget bumps

**What:** Bumped 6 campaign daily budgets via API.

| Campaign | Before | After |
|---|---|---|
| Brand | €2.50 | €5.00 |
| Benagil | €15.00 | €30.00 |
| Algarve Generic | €7.50 | €15.00 |
| Reef Fishing | €4.00 | €10.00 |
| Cranchi Yacht | €5.00 | €10.00 |
| Competitors | €2.50 | €5.00 |
| Sail Yacht (unchanged) | €5.00 | €5.00 |

Total: €80/day → €115/day (~€3,450/mo).

**Why:** Most campaigns lost 58–83% of impressions to budget cap over 14 days. At pre-bump click volumes (Cranchi 4 clicks, Sail 4, Reef 9, Competitors 2), no campaign except Brand could ever produce statistical conversion signal. Decision: fund volume so we can read CR per campaign, rather than wait indefinitely for signal that can't arrive.

**Expected effect:** Daily click volume roughly doubles. Some impressions still blocked by rank loss (especially Benagil 34% rank-lost) until quality fixes bake.

**Verify on/after 2026-05-07:** pull conversions, kill or cut anything at 0 conv with ≥€100 spent.

---

## 2026-04-30 — GA4 attribution fix (FH lightframe self-referral leak)

**What:** Added `atlantistours.pt` + `fareharbor.com` to GA4 unwanted referrals list (Admin → Data Streams → web stream `G-YE21ZWJNY7` → Configure tag settings → Show all → List unwanted referrals).

**Why:** Pre-fix audit showed 29 GA4 `purchase` events in 14 days (€1,620 revenue) but only **1** was attributed to Google Ads. FareHarbor lightframe iframe completes booking outside the original gtag context, fires the GA4 purchase event with referrer = parent page, GA4 starts a new self-referral session and drops the original `gclid`. All non-brand campaigns appeared to convert at 0%, depressing ad rank and making Smart Bidding impossible.

**Expected effect:** Forward-looking GA4 sessions preserve the original Ads attribution. Conversions start crediting back to `google / cpc` for non-brand campaigns within 1–2 weeks.

**Verify on/after 2026-05-07.** See memory note `project_atlantis_ads_attribution_fix.md` for the full diagnosis.

---

## 2026-04-30 — Search-term cleanup (9 negatives + 5 positives)

**What:** Added 9 campaign-level negative keywords and 5 ad-group-level positive keywords based on a 7-day search-term review.

Negatives:
- Cranchi + Sail Yacht: `aluguer de barcos`, `alquiler de barcos`, `boat rental` (PHRASE) — these queries hit yacht campaigns but had ~0% conversion intent for premium charter
- Algarve Generic: `animaris`, `ophelia` (BROAD), `bateau pirate` (PHRASE) — competitor brand and irrelevant boat-type queries

Positives (BENAGIL ad groups):
- EN: `benagil cave` (PHRASE)
- ES: `cueva de benagil` (EXACT)
- PT: `passeio na gruta de benagil` (PHRASE)
- FR: `billets pour grotte de benagil`, `visite grottes benagil` (PHRASE)

**Why:** Search-term report showed wasted spend on the negatives and unmatched high-intent demand on the positives.

**Expected effect:** Slightly lower waste on yacht campaigns; better match coverage for Benagil cave-tour queries in 4 languages.

---

## 2026-04-30 — SAIL-PT ad copy refresh

**What:** Swapped 2 weak headlines on the SAIL — PT ad (ad ID `806983326606`):
- "Calmo, Lento, Mágico" → "Iate à Vela no Algarve"
- "Ocasiões Especiais" → "Aluguer de Iate Portimão"

**Why:** The replaced headlines had no keyword content; the new ones include the high-intent terms ("iate à vela no Algarve", "aluguer de iate Portimão") to lift relevance score and ad strength.

**Expected effect:** Ad strength reading should move from POOR toward AVERAGE/GOOD over 24–48h.

---

## 2026-04-30 — Removed 6 duplicate Reef Fishing ads

**What:** Removed 6 duplicate ads from the NB — Reef Fishing campaign (2 duplicates each in FISHING-EN, FISHING-FR, FISHING-PT ad groups). Kept the oldest ad (lowest ID) in each group.

**Why:** Triple-save during ad creation in the UI produced 3 identical ads per ad group instead of 1. Total 10 ads where there should have been 4. Duplicates dilute serving statistics and confuse optimization.

---

## 2026-04-30 — Ad-group bid bumps (Benagil + Competitors)

**What:** Raised max CPC bids on 8 ad groups via API.

| Ad group | Before | After |
|---|---|---|
| BENAGIL — EN | €1.20 | €1.80 |
| BENAGIL — ES/FR/PT | €0.80 | €1.20 |
| COMPETITORS — EN/ES/FR/PT | €1.50 | €3.00 |

**Why:** Benagil was losing 34% of impressions to rank (low bid + POOR ad strength); competitor keywords are notoriously expensive (€2-3 typical CPC) and €1.50 was too low to compete.

**Expected effect:** Rank-lost IS on Benagil drops; Competitors begins actually serving (was at 9.99% IS).

---

## 2026-04-30 — Removed 11 keyword conflicts

**What:** Removed 11 cases where a positive keyword was blocked by an overlapping negative keyword (8 Benagil cross-language "how to" variants + 2 Cranchi + 2 Sail "benagil tour" PHRASE blocks).

**Why:** Conflicting negatives prevented positive keywords from ever matching, wasting ad-group setup work.

---

## 2026-04-30 — Unpinned headlines on 28 ads (UI)

**What:** Removed pins from headlines across 28 ads (3 pins per ad on average) via the Google Ads UI.

**Why:** Heavy pinning was the root cause of 28/28 ads showing POOR ad strength. Google's RSA system needs headline rotation freedom to find winning combinations.

**Expected effect:** Ad strength readings move from POOR toward AVERAGE/GOOD over 24–48h as Google re-evaluates with rotation freedom.

---

## 2026-04-29 — Campaigns launched

**What:** Built and launched 6 remaining Search campaigns alongside the existing Brand smoke test, ahead of the planned May 1 launch date. All 7 campaigns now ENABLED on Manual CPC.

**Setup recap (from spec):**
- Search-only, no Display, no Search Partners, AI Max disabled
- 80% in-Algarve last-minute / 20% pre-trip planners
- +30% bid adjustment on 5 cities (Portimão, Lagoa, Carvoeiro, Lagos, Albufeira); yachts use +20%
- Manual CPC across all campaigns; switch to Smart Bidding only after ≥30 conv per campaign

**Verify on/after 2026-05-21:** evaluate Smart Bidding switch (deferred from earlier date because attribution data was unreliable until 2026-04-30).

---

## 2026-04-29 — CLS fixes deployed (atlantistours.pt)

**What:** 3 mobile CLS fixes shipped: `svh` viewport unit on hero, FareHarbor 5s timeout removal, Instrument Serif font preload.

**Why:** Mobile CLS=0.12 origin-wide, hurting Quality Score on landing pages used by Ads.

**Verify on/after 2026-05-06** via GA4 web_vitals data.

See memory note `project_atlantis_cls_investigation.md`.

---

## 2026-04-23 — Smoke test live + landing page fixes

**What:**
- Brand Atlantis Tours (smoke test) live at €10/day, max CPC €0.50
- Landing pages: trust strip + per-tour reviews on product pages, `tel:` link in Header + mobile booking bar (commit `62b34ff`)

**Why:** Validate ad approval pipeline before scaling, and lift conversion readiness on landing pages.

---

## 2026-04-21 — Project kickoff (Phase 0 complete)

**What:**
- FareHarbor → GA4 measurement ID linked (`G-YE21ZWJNY7`)
- GA4 ↔ Google Ads account linked
- `purchase` conversion action imported into Google Ads
- 9 asset docs written (`GoogleAds/atlantis/`)

**Why:** Foundation for the manual-CPC Phase 1 launch. See `GoogleAds/atlantis/spec.md` and `GoogleAds/atlantis/plan.md`.
