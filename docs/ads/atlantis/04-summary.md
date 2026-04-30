# Atlantis Google Ads — Phase 1 Settings Summary

One-page reference for the entire account. Use during the UI build, during weekly reviews, or for CEO check-ins.

**Phase 1 strategy:** Manual CPC across all campaigns to gather conversion data, single search-only campaigns per product, no Performance Max yet, no Smart Bidding until ≥30 conversions per campaign.

---

## All 6 campaigns at a glance

| # | Campaign | Type | Max CPC | Daily | Monthly | Target CPA | Hard floor | ROAS target | Bookings/mo | Detail |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **BRAND — Atlantis Tours** | Search | €0.50 | €5 | €150 | €2 – €8 | n/a (defensive) | n/a | 15 – 40 | [→](02-campaigns/brand/keywords-and-rsa.md) |
| 1b | **BRAND — Competitors** | Search | €1.50 | €5 | €150 | €30 – €60 | €80 | ≥ 2× | 1 – 5 | [→](02-campaigns/competitors/keywords-and-rsa.md) |
| 2 | **NB — Benagil Cave Tour** | Search | €0.80 | €30 | €900 | €10 – €16 | €20 | ≥ 5× | 60 – 150 | [→](02-campaigns/benagil/keywords-and-rsa.md) |
| 3 | **NB — Algarve Generic** | Search | €0.50 | €15 | €450 | €15 – €25 | €30 | ≥ 3× | 20 – 50 | [→](02-campaigns/algarve-generic/keywords-and-rsa.md) |
| 4 | **NB — Cranchi Yacht** | Search | €2.50 | €10 | €300 | €60 – €120 | €150 | ≥ 5× | 3 – 8 | [→](02-campaigns/cranchi-yacht/keywords-and-rsa.md) |
| 5 | **NB — Sail Yacht** | Search | €2.20 | €10 | €300 | €50 – €100 | €125 | ≥ 5× | 2 – 6 | [→](02-campaigns/sail-yacht/keywords-and-rsa.md) |
| 6 | **NB — Reef Fishing** | Search | €1.00 | €8 | €240 | €40 – €80 | €100 | ≥ 5× | 3 – 10 | [→](02-campaigns/reef-fishing/keywords-and-rsa.md) |
| | **TOTALS** | | | **€83** | **€2,490** | | | | **104 – 269** | |

> "NB" = non-brand. "BRAND" defends Atlantis Tours brand searches against OTAs.

---

## Geo + device + scheduling (same for all 6 campaigns)

| Setting | Value |
|---|---|
| Locations | Portugal + UK + Ireland + Germany + Netherlands + France + Spain |
| Location targeting mode | "People in or regularly in your targeted locations" |
| Algarve city +30% bid adjustment | Portimão, Lagoa, Carvoeiro, Lagos, Albufeira (Cranchi/Sail use **+20%** instead) |
| Languages | English, Portuguese, Spanish, French |
| Mobile bid adjustment | **+30%** (Brand +20%, Cranchi/Sail **+10%**) |
| Tablet bid adjustment | -20% (Cranchi/Sail -10%) |
| Desktop bid adjustment | 0% |
| Networks | **Search only** — no Display, no Search Partners |
| Ad rotation | "Optimize: prefer best-performing ads" |
| Ad schedule | All day, all week (revisit after 30d data) |
| Ad group structure | One ad group per language, per campaign (4 ad groups × 6 campaigns = **24 ad groups total**) |

---

## Shared assets (apply to all campaigns)

| Asset type | Where | Detail |
|---|---|---|
| Account-wide negative keywords list | Tools → Shared Library → Negative keyword lists | [01-keywords/negatives-account.md](01-keywords/negatives-account.md) |
| Sitelinks (6 per language × 4 languages) | Account level | [03-extensions/all-extensions.md](03-extensions/all-extensions.md#1-sitelinks-clickable-mini-links-under-the-ad) |
| Callouts (10 per language × 4 languages) | Account level | [03-extensions/all-extensions.md](03-extensions/all-extensions.md#2-callouts-non-clickable-bullet-badges-under-the-ad) |
| Structured snippets (3 per language) | Account level (Snippet C limited to Benagil + Generic) | [03-extensions/all-extensions.md](03-extensions/all-extensions.md#3-structured-snippets-categorized-lists) |
| Call extension (`+351 969 703 185`) | Account level | [03-extensions/all-extensions.md](03-extensions/all-extensions.md#4-call-extension-tap-to-call-on-mobile) |
| Location extension | Account level (TBD — pending GBP) | [03-extensions/all-extensions.md](03-extensions/all-extensions.md#5-location-extension) |
| Image extensions (10 photos) | Account level | [03-extensions/all-extensions.md](03-extensions/all-extensions.md#6-image-extensions-visual-assets-shown-alongside-ads) |

---

## Conversions (already configured)

| Action | Source | Status |
|---|---|---|
| Purchase (FH booking) | Imported from GA4 | ✅ Configured (Task A4.1) |
| Phone call from ad ≥60s | Auto-created with call extension | ⏳ Pending C8 launch |
| Page engagement (>3min) | Optional secondary action | ⏳ Not yet configured |

---

## Bid strategy progression

| Phase | Trigger | Action |
|---|---|---|
| Phase 1 (Day 0+) | Launch | Manual CPC, ceilings as in table above |
| Phase 1.5 | Per-campaign ≥ 30 conversions in last 30d | Switch that campaign to **Maximize Conversions** with same daily budget cap |
| Phase 2 | Per-campaign ≥ 50 conversions and CPA stable for 14d | Switch to **Maximize Conversion Value**, then **Target ROAS** at the campaign's target ratio |
| Phase 2 (account-wide) | Total ≥ 200 conversions in 90d, stable performance | Add **Performance Max** as a 7th campaign for incremental discovery |

---

## What to monitor (and when)

| Frequency | What | Threshold to act |
|---|---|---|
| **Daily (week 1-2)** | Search-terms report | Any wasted-spend term ≥ €5 with 0 conversions → add to negatives |
| **Daily (week 1-2)** | Conversions firing | If 0 conversions after 200+ clicks → check FH/GA4 tracking, not the ad |
| **Daily (week 1-2)** | Disapproved ads | Fix immediately or campaign serves with reduced reach |
| **Weekly** | CPA per campaign | If above hard floor for 14d → pause and tighten |
| **Weekly** | Impression share | If <50% on Brand or Benagil → raise max CPC by €0.10 |
| **Weekly** | Avg booking value (GA4) | If drops >25% from baseline → adjust copy / pause low-value queries |
| **Monthly** | Quality Score per keyword | Anything <6 → review the keyword/ad/landing combo |
| **Monthly** | Auction insights report | See who else is winning auctions; identify new competitor pressure |
| **Monthly** | Geo performance | If a city drives <conv but lots of clicks → exclude or lower bid |
| **Quarterly** | Holdout test | Pause Brand campaign in one country for 14d, compare bookings |

---

## Cash-flow expectation

At total ~€78/day Phase 1 budget:
- Google bills weekly via auto-charge to your linked card.
- Approximate weekly charge: **€546** (€78 × 7).
- Approximate monthly charge: **€2,340** (rounded).
- Google may "overspend" up to 2× the daily budget on busy days but will balance back over the month — never exceeds monthly total.

---

## Open dependencies before launch

| # | Item | Owner | Status |
|---|---|---|---|
| 1 | Payment method verified | José | ⏳ Bank declined; retry needed (Task A3.1) |
| 2 | Advertiser verification (P4Y SERVICES) | José | ⏳ Awaiting Google's request |
| 3 | Phone hours for call extension | José | ✅ 08:00-20:00 Mon-Sun confirmed |
| 4 | Google Business Profile linked | José | ✅ GBP confirmed (KGID `/g/11n98drpym`); link step in UI when account unblocks |
| 5 | 10 image URLs for image extensions | Claude (draft), José (approve) | ✅ Drafted in `03-extensions/all-extensions.md`; José to download + upload |
| 5b | Competitor brand list (for new C2.5 campaign) | José | ✅ Delivered 2026-04-23: Algarve Experience, Dreamwave, Xride, Algarve Discovery, Royal Nautic. Drafted in `02-campaigns/competitors/` |
| 6 | Landing page audit fixes deployed | Claude | ✅ B-FIX-1 + B-FIX-2 pushed yesterday |
| 7 | Account negatives list created in UI | José | ⏳ Once payment unlocks |
| 8 | All 6 campaigns built in UI | José + Claude (step-by-step) | ⏳ Once payment unlocks |
| 9 | Smoke test (€10/day brand, 24h) | José | ⏳ Once payment unlocks (Task A5) |
| 10 | Full launch at 50% budget | José | ⏳ May 1 target (Phase 1 launch date) |
