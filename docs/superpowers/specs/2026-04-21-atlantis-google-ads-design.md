# Atlantis Tours — Google Ads Strategy

**Date:** 2026-04-21
**Brand:** Atlantis Tours (atlantistours.pt)
**Author:** José + Claude (brainstorming session)
**Status:** Design — pending implementation plan

## 1. Context

Atlantis Tours is a small boat tour brand operating in the Algarve, with 4–5 active products in FareHarbor (see catalogue below). The site supports EN, PT, ES, FR. Bookings flow through FareHarbor (Lightframe embed). The Google Ads account does not exist yet — this is a clean-slate launch.

**Key behavioural insight that shapes the entire strategy:** the majority of bookings come from English-speaking tourists who are *already physically in Portugal* and book on the previous day or the same day of the trip. This is a last-minute, in-Algarve, mobile-first audience — not a cold-research-from-home audience.

**Product catalogue:**

| Tour | Avg booking value | Pricing model |
|---|---|---|
| Benagil Caves Speedboat Tour | ~€120–160 | €20 / person |
| Benagil + Alvor Nature Reserve | ~€120–160 | €20 / person |
| Cranchi Yacht Cruise to Benagil | €400+ | Per group |
| Luxury Sail Yacht Cruise | €400+ | Per group |
| Reef Fishing Tour | €400+ | Per group |

## 2. Goals & success criteria

**Primary goal:** generate booking revenue at a positive ROAS, growing the share of direct bookings (vs OTA-driven bookings on GetYourGuide / Viator etc.).

**Secondary goal:** intercept pre-trip planners in UK / IE / DE *before* they reach an OTA, capturing margin that would otherwise be paid in OTA commissions.

**Success benchmarks:**

| KPI | Phase 1 (May → mid-June) | Phase 2 (mid-June → Sept) |
|---|---|---|
| Account ROAS | ≥ 200% | ≥ 400% |
| Cost per booking — cave tours | ≤ €40 | ≤ €25 |
| Cost per booking — yacht / fishing | ≤ €100 | ≤ €70 |
| Brand campaign ROAS | ≥ 1500% | ≥ 2000% |
| Click → booking conversion rate | ≥ 2% | ≥ 4% |
| Quality Score (avg) | ≥ 6 / 10 | ≥ 7 / 10 |

## 3. Strategic decisions (locked in this design)

- **Approach:** Search-only in Phase 1, Search + Performance Max hybrid in Phase 2. Performance Max is deferred until ≥ 30 conversions exist as training data.
- **Monthly budget:** €600–€1,500/month starting range. Scale only on proven ROAS.
- **Audience split:** 80% in-Algarve last-minute / 20% pre-trip planners (UK, IE, DE).
- **Tour priority:** Tiered, mapped to campaigns in §5. Benagil cave tours (Speedboat + Cranchi Yacht) = priority 1 (~55% of spend). Luxury Sail Yacht + Reef Fishing = priority 2 (~25%). Pre-trip planning audience for Benagil = priority 3 (~12%). Brand campaign as a permanent floor (~6%).
- **Competitor bidding:** Deferred to Phase 2 month 3 (earliest August). Not worth the burn at starter budget.
- **Launch timing:** Phased ramp. Phase 0 (tracking) → Phase 1 soft launch May 1 at ~50% budget on Manual CPC → Phase 2 mid-June scale to full budget + Smart Bidding + PMax.
- **Off-season (Oct–Mar):** decision deferred until October based on data; predefined fallback is staged budget reduction (25% Oct, 10% Nov, full pause Dec–Feb except Brand).

## 4. Phase 0 — Tracking setup (hard gate, ~7–10 days)

No spend goes live until Phase 0 exit criteria are met.

### Tasks

1. **Configure FareHarbor → GA4 in FH dashboard.**
   FH dashboard path: `Definições → Dados Analíticos e Monitorização → Adicionar serviços analíticos`. Add a single GA4 service:
   - Tipo: `Google Analytics 4 (GA4)`
   - SKU: `atlantis-ga4`
   - Identificador de medição GA4: `G-YE21ZWJNY7`
   - Multi-site checkbox (`O calendário, a grelha de itens ou o botão de reserva são adicionados a vários websites`): **enabled** — same FH account powers both Atlantis Tours and Algarve & You, so booking flow is embedded on multiple sites.
2. **Verify FH → GA4 events fire.** Run a real test booking. In GA4 → Reports → Realtime, confirm a `purchase` event arrives with `transaction_id`, `value`, and `currency`. *(Assumption flagged at design time: configuration is correct; verification deferred until a test booking can be performed.)*
3. **Create Google Ads account.** Currency EUR, timezone Europe/Lisbon. These cannot be changed later.
4. **Link Google Ads ↔ GA4** (in GA4 admin → Product Links → Google Ads). Enable auto-tagging.
5. **Import GA4 `purchase` event as a Google Ads conversion** with "Use different values for each conversion". Mark as **primary**. Attribution = data-driven.
6. **Enable Enhanced Conversions for Web** to recover ~10–20% of cookie-blocked / iOS conversions via hashed customer identifiers.
7. **Verify Google tag / conversion linker** is firing on every page (likely already present via existing GA4 install).
8. **Smoke test:** €10/day campaign for 24h on `[atlantis tours algarve]`. Real test booking must show in Google Ads → Conversions panel within 48h.

### Exit criteria

- Test booking visible in Google Ads Conversions with correct EUR revenue value.
- Tracking has been stable for 7+ consecutive days (no missing-`value` events).

### Fallback

If FH's GA4 integration drops the `value` field, fall back to either (a) FH's native conversion-tracking snippet placed directly on the booking confirmation page, or (b) a `postMessage` listener in the Atlantis site code that intercepts Lightframe completion events and fires GA4 `purchase` from the parent page (~2h dev work).

## 5. Phase 1 — Search-only launch (May 1 → mid-June)

### Campaign structure

Four campaigns, each with its own daily budget bucket so winners and losers cannot drown each other out.

| # | Campaign | Daily budget @ €1k/mo | Match types | Bidding | Geo / language |
|---|---|---|---|---|---|
| 1 | **Brand** | €2/day (~6%) | Exact + Phrase | Manual CPC, max €0.40 | Worldwide, all 4 languages |
| 2 | **Benagil Cave Tours** (Speedboat + Cranchi Yacht) | €18/day (~55%) | Phrase + Exact | Manual CPC, max €0.80 | Algarve region + 25 km radius from Portimão / Albufeira / Carvoeiro / Lagos / Vilamoura / Armação de Pêra. EN + PT + ES + FR. |
| 3 | **Luxury Sail Yacht + Reef Fishing** | €8/day (~25%) | Phrase + Exact | Manual CPC, max €1.50 | In-Algarve (same as #2) **+** UK, IE, DE pre-trip. EN only. |
| 4 | **Pre-trip Planners — Benagil** | €4/day (~12%) | Phrase only | Manual CPC, max €0.60 | UK, IE, DE. EN only. |

### Ad-group strategy

Single Theme Ad Groups (STAG): one tour or one keyword theme per ad group, so ad copy can speak directly to that intent.

Example for Campaign #2 (Benagil Cave Tours):
- **AG-A** Benagil generic — `"benagil cave tour"`, `"benagil caves boat tour"`, `"visit benagil cave"`, `"benagil cave from carvoeiro"`, `"benagil cave from portimão"`
- **AG-B** Speedboat — `"benagil speedboat tour"`, `"benagil cave speed boat"`, `"fast boat benagil"`
- **AG-C** Yacht / luxury — `"benagil yacht cruise"`, `"benagil cave yacht"`, `"private boat to benagil"`
- **AG-D** Algarve boat tour backstop — `"algarve boat tour"`, `"boat tour portimão"`, `"boat trip carvoeiro"`, `"algarve coast cruise"`

PT / ES / FR variants for the same themes (e.g. `"passeio de barco benagil"`, `"tour cuevas benagil"`, `"grotte benagil bateau"`) added in week 3 once EN baseline data exists.

### Brand campaign

- Keywords: `[atlantis tours]`, `[atlantis tours algarve]`, `[atlantistours]`, `"atlantis boat tour"`, `"atlantis tours portugal"`
- Negatives: `submarine`, `aquarium`, `disney`, `marvel`, `myth`, `lost city`, `wikipedia`

### Account-level negative keywords

`free`, `jobs`, `salary`, `hiring`, `wikipedia`, `images`, `video`, `youtube`, `kayak benagil`, `paddle`, `swim`, `tripadvisor`, `getyourguide`, `viator`, `booking.com`

### Ad copy — Responsive Search Ads

One RSA per ad group, 15 headlines + 4 descriptions. Headline rotation themes:

- **Tour name** (e.g. "Benagil Cave Speedboat Tour")
- **Differentiators** ("Small Group · Max 12 People", "Local Operator", "Direct Booking — No OTA Fees")
- **Social proof** ("4.9★ on Google · 200+ Reviews" — use real numbers from `/reviews`)
- **Urgency** ("Departures Today & Tomorrow", "Same-Day Booking Available", "Free Cancellation 24h Before")
- **CTAs** ("Book Direct & Save", "Reserve Online in 2 Min", "Check Live Availability")
- **Location** ("From Portimão Marina", "Departures from Carvoeiro")

Descriptions kept to 90 chars, written natively per language (no auto-translation for PT / ES / FR).

### Ad extensions (all enabled)

- **Sitelinks** (4–6): Benagil Cave Tour, Luxury Yacht, Reef Fishing, Reviews, FAQ, Contact
- **Callouts**: Free 24h Cancellation, Book Direct — No Fees, Small Groups, Local Operator, Instant Confirmation
- **Structured snippets** (Tour types): Speedboat, Yacht, Fishing, Sailing
- **Call extension**: booking phone number, click-to-call on mobile
- **Location extension**: linked to Google Business Profile
- **Price extension**: per-tour starting prices
- **Image extensions**: 4–6 best tour photos

## 6. Targeting refinements

### Geographic

- **In-Algarve campaigns (#2, in-Algarve part of #3):** "Presence in" targeting only (NOT "Presence or interest in"). Faro district + 25 km radius around Portimão, Albufeira, Carvoeiro, Lagos, Vilamoura, Armação de Pêra. Faro Airport included (arrivals book transfers + tours from terminal).
- **Pre-trip planner campaign (#4):** "Presence in" UK, IE, DE. Exclude users physically in Portugal.
- **Brand (#1):** worldwide.

### Ad schedule

- In-Algarve campaigns: 06:00–23:00 Lisbon time. Paused overnight.
- Bid modifier **+20%** during 07:00–10:00 and 17:00–21:00 (booking-decision peaks).
- No weekday / weekend differentiation (Algarve has no such pattern in season).
- Pre-trip planner campaign: 24/7, no schedule restriction.

### Device modifiers

- In-Algarve: **mobile +20%**, desktop **−20%**, tablet neutral.
- Pre-trip planner: all devices neutral (desktop / tablet share is meaningful for at-home research).

### Audience signals (Phase 2 only, applied to Smart Bidding)

- **Customer Match:** upload past FH customer emails as a "similar audiences" seed.
- **In-market segments:** Travel → Hotels & Accommodations, Air Travel (UK / IE / DE), Boat Tours & Water Sports.
- **Affinity:** Travel Buffs (pre-trip campaign).

### Landing pages

| Ad group | Landing page |
|---|---|
| Brand | `/` |
| Benagil Speedboat | `/tours/benagil-caves-speed-boat-tour` |
| Cranchi Yacht | `/tours/cranchi-yacht-cruise-to-the-benagil-caves` |
| Luxury Sail Yacht | `/tours/luxury-sail-yacht-cruise` |
| Reef Fishing | `/tours/reef-fishing-tour` |
| Algarve boat tour backstop | `/tours` |
| Pre-trip planners | Tour-specific page; consider a "Bookable now for May–September" hero variant |

### Landing page hard requirements (verify before launch)

1. "Book Now" button visible above the fold on mobile, opens Lightframe directly.
2. LCP < 2.5s on 4G mobile (existing CWV monitoring covers this).
3. Trust signals (review stars, free cancellation, price-from) visible without scrolling.
4. No popups or cookie banners blocking the CTA on mobile.
5. Phone number clickable on mobile.

Any fail → fix on the existing tour pages as part of Phase 0, not in this strategy.

### Conversion goals

- **Primary:** GA4 `purchase` event with revenue value. Used for bidding optimization.
- **Secondary** (tracked, not bid on): Lightframe opened (`begin_checkout`), call ≥60s (call extension), contact form submit.

## 7. Phase 2 — Smart Bidding + PMax (mid-June onward)

### Trigger checklist

Move from Manual CPC to Smart Bidding **only when ALL** are true:

- ≥ 30 conversions in the last 30 days at account level
- Phase 1 ROAS ≥ 200%
- Tracking has been stable (no missing-`value` events) for 14+ days
- Benagil cave tours converting at ≤ €40 cost-per-booking

If any fail → stay on Manual CPC, diagnose, retry trigger in 2 weeks.

### Phase 2 changes

1. Switch Campaigns #2 and #3 from Manual CPC → **Maximize Conversion Value** with target ROAS = 400% (initial; tune monthly).
2. Add **one Performance Max campaign** dedicated to Benagil cave tours. Asset groups built from existing photo / video / review library. Audience signals: Customer Match (FH customers) + in-market travel segments for UK / IE / DE.
3. Keep Brand and Pre-trip Planner campaigns on Manual CPC (PMax behaves badly on small budgets and brand traffic).
4. Add brand exclusions to PMax to prevent Brand-campaign cannibalisation.

## 8. KPIs, dashboards & cadence

### Reporting

- **Single Looker Studio dashboard**, three tabs:
  1. Overview — last 7 / 30 / 90 days: spend, revenue, ROAS, cost-per-booking by campaign
  2. Tour performance — bookings + revenue per tour, paid vs organic split
  3. Wasted spend audit — search terms with spend and zero conversions
- Weekly Monday-morning auto-emailed PDF summary.

### Cadence

| Cadence | Activity | Time cost |
|---|---|---|
| Daily (first 2 weeks May only) | Glance at dashboard. Pause anything spending >€10/day with zero conversions. | ~5 min |
| Weekly | Search terms review, add negatives, pause underperforming keywords (<0.5% CTR after 100 impressions), bump bids on top performers (+10–20%). | ~30 min |
| Bi-weekly | RSA headline rotation: disable lowest-performing, replace with new variants. Review extension performance. | ~30 min |
| Monthly | Full ROAS review. Reallocate budget. Decide PMax expansion or hold. Cross-reference with FH revenue dashboard. | ~1 h |
| Quarterly | Strategic review: what's working, what's dead, expansion to YouTube / Discovery / new markets. | ~2 h |

### Metrics deliberately ignored

Impressions in isolation, brand search volume as growth KPI, position / "top of page" rate, cost-per-click in isolation.

## 9. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Conversion tracking silently breaks | High | Weekly Looker tracking-health check (count `purchase` events with `value=0` or null). Pause Smart Bidding if >5% of total. |
| OTAs bid on Atlantis brand keyword | Medium | Brand campaign with €2/day floor + Exact match. Auction Insights weekly. |
| Click fraud / bot clicks | Low–Medium | Google's built-in invalid click filter. Evaluate ClickCease in Phase 2 only if patterns warrant. |
| Landing page slow / breaks on mobile during peak | Medium | Existing CWV monitoring + weekly LCP check on tour pages (must stay <2.5s). |
| Budget burns out before peak season | Medium | Daily campaign budget caps (not "shared budget"). Account-level max-spend backstop. |
| PMax cannibalises Search campaigns | Medium (Phase 2) | Brand exclusions on PMax. Monitor Search CTR — drop >20% post-PMax → reduce PMax budget. |
| FareHarbor outage during ad-driven traffic spike | Low | "Call us to book" CTA fallback on tour pages so traffic doesn't fully bounce. |
| Off-season ROAS collapses | Certain | Predefined seasonal pause: 25% budget Oct, 10% Nov, full pause Dec–Feb except Brand. Reassess March. |

## 10. Kill criteria

A campaign is **paused for review** (not deleted) when any one is true after 30 days at full budget:

- ROAS < 100% (losing money)
- < 5 conversions across the 30 days (no signal)
- Cost per booking > 50% of average booking value for that tour

## 11. Scaling plan

If by August 1 the account is hitting ≥ 400% ROAS at €1k/month spend:

1. Increase budget +50% per month while ROAS holds. (Bigger jumps spook the algorithm.)
2. Add YouTube campaign with existing tour videos (cheap CPV, builds brand for next season).
3. Add Discovery / Demand Gen campaign for visual reach to UK / IE / DE pre-trip planners.
4. Build remarketing audience in GA4: tour-page viewers who didn't book → Discovery ads with sitelinks and price drops.
5. Run €100 trial on competitor terms (`getyourguide benagil`, `viator algarve`). Measure → keep or kill.

## 12. Out of scope

- Algarve & You Google Ads (separate strategy doc later)
- SEO / organic content (existing blog + reviews work)
- Meta / Instagram / Facebook ads (revisit Q4 2026)
- Email remarketing to past customers (FH or Mailchimp work, not Google Ads)

## 13. Open questions for plan-writing phase

- Exact starting budget within the €600–€1,500 range — to be confirmed before plan execution.
- Founding year of Atlantis Tours (used in headline copy "Local Operator Since YYYY").
- Real review count and average rating for use in RSA copy (`/reviews` page numbers as of launch day).
- Booking phone number for Call extension (and whether someone will reliably pick up during 06:00–23:00 ad schedule).
- Existing customer email list size in FareHarbor (determines viability of Customer Match audiences).

## 14. Assumptions

- FH Lightframe `purchase` events fire correctly with revenue value once the GA4 service is added in the FH dashboard. To be verified by test booking before any spend launches.
- Atlantis Tours holds Google Business Profile for location extension linkage.
- Ad creative library (photos, video clips, reviews) is sufficient for Performance Max in Phase 2. To be re-validated when Phase 2 starts.
- Tour landing pages already meet the 5 hard requirements in §6, or can be brought into compliance during Phase 0.
