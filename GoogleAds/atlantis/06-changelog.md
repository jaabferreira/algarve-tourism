# Atlantis Ads — Changelog

Reverse-chronological log of every change made to the Atlantis Tours Google Ads account (customer ID `922-490-9849`) and adjacent infrastructure (GA4, FareHarbor, landing pages) that affects ad performance.

**Format:** one section per date. Each entry: **what** changed, **why**, **expected effect**, **verify on/after**. Add new entries at the top.

---

## 2026-06-09 — On-page punch-list: per-tour FAQs + schema, comparison post, title cleanup

**What:** Shipped the net-new on-page items from the FareHarbor June SEO report (after a GSC re-check confirmed the report's headline "−26% organic" was a Semrush-estimate artifact, not real). On the 3 Benagil/yacht landing pages (`pk 717720` speedboat, `720028` private Cranchi yacht, `717754` sail yacht): added hand-written FAQ sections with **FAQPage** JSON-LD (new `tour-faqs.ts` + render in `tours/[slug].astro`). Published a decision-stage comparison post **"Benagil Speed Boat vs Private Yacht"** (`/en/blog/benagil-speedboat-vs-yacht/`), wired into the "Plan your trip" block on all 3 tour pages and into the Benagil pillar's FAQ. Dropped the boat model **"Cranchi"** from the `720028` SEO `<title>` (all 4 locales), leading with search intent + Portimão. EN-first; PT/ES/FR FAQ/post translations are a later pass. Not yet deployed (CF Pages deploys from `master`; this is on `feat/atlantis-content-hub`).

**Why:** Strengthen non-brand "Benagil" relevance and give paid + organic visitors decision-stage content on the landing pages themselves. The verified bottleneck remains off-page authority (separate `seo-offpage` workstream); these are the on-page gaps that were genuinely still open after the May hub launch. Cleaner SERP titles improve relevance signaling on the ad destinations.

**Expected effect:** FAQ rich-result eligibility on the 3 landing pages (extra SERP real estate); better Quality Score landing-page-relevance signals; more internal linking around the decision ("which Benagil boat"). No paid-campaign settings changed — this is a landing-page content change only.

**Verify on/after:** 2026-07-07 — GSC Rich Results / Enhancements show FAQPage eligibility on the 3 tour pages; comparison post earning impressions for "speed boat vs private yacht / which Benagil tour" queries; landing-page CTR/ranking hold or improve.

## 2026-05-22 — Cookie consent + Google Consent Mode v2 shipped on both sites

**What:** Added a custom cookie-consent banner wired to Google Consent Mode v2 across both sites (shared `CookieConsent` component). `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization` now default to **denied** and only flip to `granted` when the visitor accepts. The banner offers Accept all / Reject all / Customize; the choice persists in the `aty_consent` cookie (180 days); a footer "Cookie settings" link reopens it.

**Why:** FareHarbor onboarding item 5 — both sites had no consent solution, so GA4 cookies (and FareHarbor's lightframe analytics) loaded without consent, a GDPR exposure in PT/ES/FR. Consent Mode v2 is FareHarbor-supported and is also Google's EEA requirement for ad tracking.

**Expected effect:** for non-consenting EU visitors, GA4/Ads data shifts from observed to modeled (cookieless pings + conversion modeling); consenting visitors are unchanged. Expect a step-down in observed users/sessions and a modeled share in conversions from the deploy date — this is a measurement-basis change, **not** a campaign regression; do not read it as one.

**Verify on/after:** 2026-06-05 — in GA4 DebugView confirm the consent state reflects the banner choice; check the consented/modeled split in GA4's consent reporting.

## 2026-05-20 — FareHarbor: Benagil cave price €20 → €19; site redeployed to publish it

**What:** Benagil cave tour direct price lowered **€20.00 → €19.00/pax** in FareHarbor (item `pk 717720`; Adult/Child/Baby customer types now €17.92 ex-tax / €19.00 incl-tax). Forced a Cloudflare Pages rebuild (empty commit `2e702d5` → `master`) so the landing page publishes the new price — the prior build (2026-05-19) had shipped a stale 2026-05-15 FH price snapshot. (~20 other FH items were re-priced the same day, but they are duplicate/variant items the website does not surface — no landing-page effect.)

**Why:** the site bakes FH prices in at build time (`fetch-fh.ts` → gitignored `shared/data/*.json`), so a price change in FareHarbor does nothing until the site is rebuilt + redeployed. Re: the 2026-05-19 Finding 2 — the direct-vs-GYG price gap is the diagnosed conversion blocker on the Benagil non-brand campaign.

**Expected effect:** `/en/tours/benagil-caves-speed-boat-tour/` and `/pt/tours/circuito-de-grutas-ate-benagil/` now show "from €19.00". This closes only ~€1 of the ~€6–7 gap to GetYourGuide (€13–14/pax) — it does **not** resolve the Finding-2 price-gap diagnosis; expect the Benagil non-brand campaign to keep converting near-zero on relative price.

**Verify on/after:** done 2026-05-20 — live page confirmed serving €19.00.

## 2026-05-19 — Diagnosis: GYG hijacks brand + direct price ~30% above GYG (the real reason Benagil converts zero)

**No account / site changes this date.** This is a finding entry — the diagnosis behind 0 non-brand conversions on €311 of spend over 6 days. Action is paused pending a business decision on direct pricing.

**Context — the 6-day probation read (2026-05-13 → 2026-05-18):**

| Campaign | Spend | Clicks | CTR | Avg CPC | Conv (Ads) | Budget-lost IS | Rank-lost IS |
|---|---|---|---|---|---|---|---|
| Brand Atlantis Tours | €31.08 | 47 | **38.5%** | €0.66 | 1 (€100) | 67.8% | 8.2% |
| NB - Benagil Cave Tour | €188.10 | 100 | **19.1%** | €1.88 | 0 | **90.0%** | 0.6% |
| NB — Algarve Generic | €91.93 | 122 | 10.7% | €0.75 | 0 | 75.2% | 18.8% |
| (4 paused) | — | — | — | — | — | — | — |

GA4 (warehouse) corroborates: only **2 paid bookings (€140 revenue)** across all paid in the window — both look brand. The 2026-05-12 changes did what they were designed to do mechanically: **Brand avg CPC halved** (€1.10 → €0.66) under the new €0.80 cap; **Benagil CTR climbed to 19.1%** (excellent for non-brand — QS is genuinely recovering); **Generic clicks now ~all non-brand** (the "atlantis" negative + URL repoint worked — but Generic is converting near zero, confirming the brand-leakage hypothesis from 2026-05-12). So none of the structural reads from the original 14-day diagnosis are wrong; we have less brand-leakage masking and cleaner data, which is what surfaced the two new findings below.

**Finding 1 — GetYourGuide outshows Atlantis 2.4× on its own brand name.** Pulled Auction Insights on `Brand Atlantis Tours` (last 7 and 30 days). The picture:

| Domain | IS (7d) | Overlap | Position above us | Top of page | Outranking |
|---|---|---|---|---|---|
| **getyourguide.com** | **57.56%** | 77.69% | **18.09%** | 86.01% | 20.43% |
| viator.com | 31.83% | 40.50% | 2.04% | 59.88% | 23.58% |
| **You (Atlantis)** | **23.77%** | — | — | 89.26% | — |
| booking.com | 17.88% | 23.97% | 3.45% | 59.34% | 23.58% |
| 5emotionsalgarve.com (local op.) | <10% | 11.57% | 14.29% | 74.36% | 23.38% |

Reads: (a) our €0.80 max CPC is fine — when we serve, we're at #1 (89% top-of-page, 68.6% abs-top). (b) **The 68% budget-lost IS is because of the €5/day cap, not the bid** — every brand-search hour we're maxed out, GYG buys the auction. (c) GYG is bidding our brand name aggressively. They're reselling our tours (see Finding 2 for why this matters double).

**Finding 2 — direct price is €20/pax; GYG sells the same tour at €13-14/pax (~30% cheaper).** José confirmed today: the operator is intentionally running aggressive GYG pricing to win volume there. The result on the Google paid funnel — reconstructed step-by-step:

1. User searches `benagil cave tour` (or one of 40 equivalents — the search-term report is genuinely clean, this isn't a matching problem)
2. User clicks Atlantis ad (we pay €1.88 average CPC)
3. User lands on `/tours/benagil-caves-speed-boat-tour/`, opens the FH widget, sees **€20/pax**
4. User alt-tabs back to the SERP, sees the GYG ad listing the same tour
5. User books on GYG at **€13-14/pax**
6. Atlantis pays ~25% commission to GYG on a booking we just paid Google to send to GYG

The "widget collapse" we couldn't find in the UX (José walked through it manually and found nothing wrong) **isn't a UX problem — it's a price-shopping bounce that completes off-site**. That's why it didn't show up: the booking happens; it just doesn't happen on FH. This explains the 5× paid-vs-organic widget→book gap from the 2026-05-12 entry, why the clean search-term report converts zero, and why QS improvements (CTR 19% is genuinely good) aren't moving conversions.

**Unit-economics math:** at €20 direct vs €13.50 GYG (mid-point):
- Direct net per pax: €20 × (1 − 6% FH fee) = **€18.80**
- GYG net per pax: €13.50 × (1 − 25% commission) = **€10.12**
- Margin loss per pax pushed direct→GYG: ~€8.70
- Add €1.88 paid CPC for the click: ~€19 of theoretical margin lost per paid-acquired booking that converts on GYG instead of direct

**In incrementality terms, Benagil paid is currently negative-incremental.** We're not buying lost demand; we're paying Google to redirect demand we would have captured for free (or via GYG at the normal commission rate) into a channel that costs us more per booking. The original probation thesis (QS recovery + page fixes + URL repoint → CPA trends down) is mechanically true but irrelevant: no QS climb can fix a 30% price gap on a comparison-shoppable product.

**Three paths (the pending decision):**

1. **Match GYG on direct.** Move FH price to ~€14/pax. Costs ~€5/pax of margin on captive bookings (walk-ins, organic, brand — ~43 of the recent 45 bookings) but unlocks the paid channel. Standard direct-vs-OTA rate-parity practice. **José's instinct, pending boss approval.**
1a. **Match GYG via promo-code only.** Site price stays €20; paid ads include a discount code (e.g. `SHORE14`). Preserves walk-in margin (most price-inelastic segment); restores paid funnel. Cleaner option if the bosses are hesitant about a blanket cut.
2. **Pause non-brand paid now.** Accept the GYG-cheaper architecture as load-bearing; keep Brand only (the auction-insights case for brand defense stands either way). Saves ~€40/day of likely-negative-incremental spend. Don't burn through to 2026-06-30 verifying what we already understand.
3. **Defer the call.** Season is running, print collateral is out, GYG pricing locked for now. Run probation to 2026-06-30 as planned, accept it will almost certainly fail, revisit the whole pricing architecture in October before next season.

**Reframed kill rule:** the 2026-05-12 rule (≥3 non-brand bookings AND CPA <€60 by 2026-06-30) was set without the price-gap data. With it, the rule is structurally falsified — we know why it will fail. New rule: **decision contingent on the price call, not on calendar.** If pricing is matched (path 1 or 1a), run the probation 4 weeks from the price change and re-evaluate. If pricing stays as-is (path 2 or 3), the question is whether to pause now or burn the credit; recommend pausing.

**Not changed this date (and why):**
- **Brand budget €5/day stays.** Auction Insights argues for raising it (~€10/day captures another 50% of brand IS; defending against GYG brand-bidding has clean ROI at ~€20/booking saved in commission). José: "do nothing here for now." Logged as a pending move; revisit after price decision.
- **No GetYourGuide takedown request sent.** Discussed but not actioned — GYG is a partner, brand-bidding takedown is a partner-support email (proof of trademark, request brand-term exclusion from their paid campaigns). Mixed success rate with GYG. Worth doing whenever priorities allow.
- **No Benagil pause.** Holding pending the price call.

**To-do parked from this session (no owners):**
- Boss conversation on the GYG-vs-direct pricing architecture (José owns; outcome drives the path 1 vs 2 vs 3 decision above).
- Send GYG partner-support brand-bidding takedown request (and Google Ads trademark complaint on `5emotionsalgarve.com` if they're using "Atlantis" in ad copy).
- QR-code UTM (`?utm_source=qr_kiosk&utm_medium=walkin`) — still parked to next season per José; "everything is printed now."

**Verify on/after:** depends on the price decision.
- *If price match ships:* re-pull Benagil 14 days after the change; expect non-brand conversion rate to lift toward organic's ~2.8% session conv (currently 0 / 100 clicks = 0%). CPA target: trend under €60.
- *If pricing unchanged:* no verification needed — pause Benagil now or at 2026-06-30 per the original kill rule (we already know the answer).
- *Brand budget revisit:* re-pull Auction Insights and Brand budget-lost IS in 2 weeks regardless.

---

## 2026-05-12 — Content-hub site wiring (Benagil pillar/cluster, FAQ schema, tour→guide links)

**What:** Shipped the site-side wiring for the Benagil content hub (branch `feat/atlantis-content-hub`, plan `docs/superpowers/plans/2026-05-12-atlantis-content-hub-wiring.md`) — no URL changes. The 4 tour pages (= the Google Ads landing pages) gain a "Plan your trip" block linking to the relevant guide posts; blog posts gain hub-aware breadcrumbs, a "Part of our complete guide" callout (cluster pages), an "In this guide" cluster list (the pillar), and `FAQPage` JSON-LD + a visible FAQ block when a post defines `faqs`. 8 existing blog posts were marked as cluster pages of the `benagil-cave-tour-complete-guide` pillar (locale-aware), and the pillar is pinned on the blog index + homepage.

**Why:** Topical-authority signals + more internal links into the tour (landing) pages; sets up the content workstream (pillar rewrite, new posts, FAQ content) to land on a structure that already exists.

**Expected effect:** Clearer pillar/cluster structure for crawlers; a few more internal links pointing at `/tours/benagil-caves-speed-boat-tour/` and the other 3 tour pages; FAQ rich-result eligibility on guide posts once `faqs` content is added. No paid-account changes; landing-page content/markup change only.

**Verify on/after 2026-06-23:** GSC — has the pillar (`/en/blog/benagil-cave-tour-complete-guide/`) started accumulating impressions; are the 8 cluster posts showing the breadcrumb in SERP; any change in tour-page internal-link signals. (Content not written yet, so don't expect ranking movement from this alone — this is the scaffold.)

---

## 2026-05-12 — Paid strategy decision (defensive brand + time-boxed Benagil probation) + cheap structural fixes

**Context — the trigger:** Second-pass diagnosis using the `ads-performance-analytics` / `paid-media-strategy` frameworks, on top of the 14-day review below. Two corrections / additions to that review's picture:

1. **The "4 conversions" attribution caveat is mostly resolved — and the big "Direct" purchase bucket is real, not a leak.** Pulled purchases by date: *through 2026-04-29* every booking shows `atlantistours.pt / referral` (the FareHarbor lightframe self-referral artifact); *from 2026-05-01 on* that bucket vanishes and purchases split cleanly — `(direct)/(none)` ≈ **walk-ins** (tourists scan the on-site QR code → land on the site → book on the spot; José confirmed), `google / organic`, `google / cpc`, `bing`, `chatgpt`. So the **2026-04-30 unwanted-referrals fix worked**, and from 2026-05-01 the channel split is trustworthy. Clean 12-day window (05-01→12): ≈45 bookings total — walk-ins ≈21, organic ≈17, **paid ≈4**, other ≈3. Residual gap only: a paid click that converts on a *return visit days later* still won't carry the `gclid` through the FareHarbor frame, so multi-session paid bookings stay invisible (second-order; logged as a to-do).
2. **Of the 4 paid conversions in the clean window, 1 is genuinely non-brand.** 2 were on the query "atlantis tours" (Brand); 1 on "atlantis tours portimao" (a brand query that *leaked into the Generic campaign* — that campaign's only "conversions" are brand-query leakage; the €894.74 one on 2026-05-02 was this); leaving exactly **1 non-brand booking on ≈€330 of Benagil spend**. Organic (≈2.8% session conv) and walk-ins (€0 marginal cost) carry the business; paid converts ~5× worse than organic on the same pages.

**Strategy decision (the `paid-media-strategy` verdict):** the original "fund €80–115/day across 7 campaigns" hypothesis is **falsified at that magnitude**. Re-scope paid to **defensive brand + a time-boxed Benagil probation** — not a growth channel. Target structure:

| Campaign | Decision | Budget | Measured on |
|---|---|---|---|
| Brand Atlantis Tours | keep — permanent | €5/day | *not* CPA — Auction Insights: are OTAs/competitors on our name? |
| NB - Benagil Cave Tour | keep — **on probation, hard deadline** | €25–30/day | CPA trend + non-brand booking count — **kill rule ↓** |
| NB — Algarve Generic | keep — short leash | €10–15/day | did today's repoint help in 2–3 wk? next on the block |
| Cranchi / Sail / Reef / Competitors | stay paused | €0 | yacht demand, if any, becomes an ad group inside Generic — never standalone; competitor-brand bidding never returns |

≈ €40–50/day total (where the 14-day-review restructure already left it; this just adds the exit). **Pre-committed kill rule: on 2026-06-30, pull Benagil's numbers since 2026-05-13 — if it has *not* produced ≥3 non-brand bookings *and* CPA is *not* trending under ~€60, pause it.** No relitigating; after that, paid = Brand only. Rationale for probation-not-kill-now: intent is genuinely clean (not junk queries), QS is artificially low on a ~3-week-old account and recovers with age + the 2026-04-29/30 page fixes + today's URL fix, and the €400 Google Ads credit (expires 2026-06-21) is better spent inside a bounded test than left on the table. Probation cost ≈€1,000 over 7 weeks, capped.

The honest strategic context (recorded so we don't relitigate): a single boat-tour operator is in the same auctions as GetYourGuide / Viator / Civitatis — huge QS, deep budgets, and they often resell *our own tours* at a markup. Paid's realistic ceiling here is "break-even-ish on Benagil + brand defense", not growth. If the probation fails, the high-leverage moves are scaling the QR/walk-in funnel (more QR codes — hotels, marina, partner businesses, our own boats), the FareHarbor booking-flow CRO (the form_start→add_to_cart collapse), and organic — not "try paid harder".

**What changed (via API, this date):**
- **8 ad final URLs apex → www.** The site 301-redirects `atlantistours.pt/*` → `www.atlantistours.pt/*` site-wide (Cloudflare Pages canonical = `www`), so any ad pointing at the apex took a redirect hop on landing (slower page, QS drag, small `gclid`-loss risk). Fixed the **4 Brand ads** (`atlantistours.pt/[locale]/` → `www.atlantistours.pt/[locale]/`) and the **4 Generic ads** (the Benagil/circuito tour-page URLs they were repointed to *earlier today* — that repoint used the apex host). The 4 Benagil ads already pointed at `www.` — left alone.
- **Brand max CPC €1.50 → €0.80** on all 4 Brand ad groups. The bid had drifted to €1.50 (launch plan was €0.50) and avg CPC was running €1.10 — i.e. there's real competitive pressure on the brand auction (an OTA or competitor bidding ~€0.90+). €0.80 is a conservative first cut: with QS 10 it should comfortably hold position 1 over a low-QS competitor, while capping spend. Will dial lower (toward €0.50) once Auction Insights confirms.
- **Added negative keyword `atlantis` (BROAD) to NB — Algarve Generic** (criterion `…~10031510`; it had 23 negatives, now 24). Routes all brand queries to the Brand campaign (QS 10, homepage landing) instead of letting them inflate Generic's apparent performance. "atlantis tours portimao" is already eligible in the Brand campaign, so no volume lost — just relabelled correctly.

**What was NOT changed yet (to-do list, no owner assigned):**
- **Add a UTM to the on-site QR code** (`?utm_source=qr_kiosk&utm_medium=walkin` or similar) so walk-ins land in their own GA4 bucket instead of sitting in `(direct)/(none)` with genuine direct web traffic. Cheap; makes every future channel analysis cleaner.
- **Pull Google Ads → Auction Insights on the brand term** to see who's bidding on "atlantis tours" — if it's GetYourGuide/Viator reselling Atlantis at a markup, that's a business conversation, not just an ads one. Then decide whether Brand max CPC can go to €0.50.
- **Close the residual paid-attribution gap:** check whether the FareHarbor lightframe / GA4 integration can pass the `gclid` through (FareHarbor's GA4 settings + GA4 cross-domain config), so return-visit paid bookings stop being invisible. Smaller job than first thought — the main self-referral leak is already fixed.
- **Budgets not yet set to the table above** — the 14-day-review restructure left it at ≈€50/day; verify/adjust the Brand €5 / Benagil €25–30 / Generic €10–15 split when convenient.

**Expected effect:** Brand & Generic ads stop bouncing through a 301 on landing — marginal QS/CWV improvement, slightly fewer dropped `gclid`s. Brand spend roughly halves (or, if it loses some impression share to the competitor, we'll see it and step the bid back up). Generic's reported conversions drop toward its true (≈0) non-brand rate, making the kill decision honest.

**Verify on/after 2026-06-30:** apply the Benagil kill rule (pull conv + CPA since 2026-05-13; ≥3 non-brand bookings AND CPA trending <€60 → keep, else pause). Also check: did Brand hold position 1 at €0.80 (Auction Insights / top-IS)? did the URL fix coincide with any QS movement? is Generic now showing ~0 conv (= confirms it was brand leakage)? Re-mint OAuth tokens first.

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
