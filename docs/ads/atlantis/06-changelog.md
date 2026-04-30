# Atlantis Ads — Changelog

Reverse-chronological log of every change made to the Atlantis Tours Google Ads account (customer ID `922-490-9849`) and adjacent infrastructure (GA4, FareHarbor, landing pages) that affects ad performance.

**Format:** one section per date. Each entry: **what** changed, **why**, **expected effect**, **verify on/after**. Add new entries at the top.

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
- 9 asset docs written (`docs/ads/atlantis/`)

**Why:** Foundation for the manual-CPC Phase 1 launch. See `docs/superpowers/specs/2026-04-21-atlantis-google-ads-design.md` and `docs/superpowers/plans/2026-04-21-atlantis-google-ads.md`.
