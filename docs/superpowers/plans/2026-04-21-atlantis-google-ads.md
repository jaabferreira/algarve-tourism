# Atlantis Tours — Google Ads Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Launch a phased Google Ads program for Atlantis Tours that delivers ≥200% ROAS in Phase 1 and ≥400% ROAS in Phase 2, with conversion tracking verified before any euro is spent.

**Architecture:** Most work is operational (Google Ads UI + FareHarbor dashboard + GA4 admin + Looker Studio). A small amount is code work in the Astro monorepo (landing-page audit, tracking-fallback listener). Every task is labelled `[JOSÉ]` (UI / dashboard work the user performs) or `[CLAUDE]` (code / document work the assistant performs). Deliverable files live under `docs/ads/atlantis/`.

**Tech Stack:** Google Ads, Google Analytics 4, Google Tag (gtag.js, already installed at `packages/shared/src/layouts/PageLayout.astro:69-78`), FareHarbor Lightframe, Looker Studio, Astro monorepo.

**Spec reference:** `docs/superpowers/specs/2026-04-21-atlantis-google-ads-design.md`

---

## File structure (what will be created)

```
docs/ads/atlantis/
├── 00-launch-checklist.md                # pre-flight gate
├── 01-keywords/
│   ├── brand.md                          # Campaign 1 keywords + match types
│   ├── benagil-en.md                     # Campaign 2 EN (launch set)
│   ├── benagil-pt.md                     # Campaign 2 PT (week 3)
│   ├── benagil-es.md                     # Campaign 2 ES (week 3)
│   ├── benagil-fr.md                     # Campaign 2 FR (week 3)
│   ├── yacht-fishing.md                  # Campaign 3
│   ├── pretrip.md                        # Campaign 4
│   └── negatives-account.md              # Account-level negatives
├── 02-ad-copy/
│   ├── brand.md                          # Campaign 1 RSA
│   ├── benagil-speedboat.md              # Campaign 2 AG-B
│   ├── benagil-cranchi.md                # Campaign 2 AG-C
│   ├── benagil-generic.md                # Campaign 2 AG-A
│   ├── benagil-algarve-backstop.md       # Campaign 2 AG-D
│   ├── luxury-sail.md                    # Campaign 3 yacht AG
│   ├── reef-fishing.md                   # Campaign 3 fishing AG
│   └── pretrip.md                        # Campaign 4
├── 03-extensions/
│   ├── sitelinks.md
│   ├── callouts.md
│   ├── structured-snippets.md
│   ├── prices.md
│   └── images.md
├── 04-monitoring/
│   ├── looker-studio-config.md           # Dashboard setup guide
│   └── ops-playbook.md                   # Daily / weekly / monthly cadence
└── 05-phase2/
    ├── trigger-checklist.md
    ├── pmax-assets.md
    └── customer-match-prep.md
```

Code files (conditional — only if Phase 0 verification reveals a tracking gap):

```
packages/atlantis/src/components/analytics/LightframePurchaseListener.astro
```

---

# Work Stream A — Phase 0: Tracking Setup (HARD GATE)

**Goal:** Verify a real test booking flows from FareHarbor Lightframe → GA4 `purchase` event → Google Ads conversion with revenue value, end to end, before any media spend is authorised.

**Duration:** 7–10 days (blocked on a test booking being possible).

**Exit criteria:** A test booking appears in the Google Ads Conversions panel with correct EUR revenue within 48 hours of purchase.

---

### Task A1: Configure FareHarbor → GA4 integration

**Owner:** [JOSÉ]

**Location:** FareHarbor dashboard

- [ ] **Step 1: Open FH analytics panel**

  Navigate to: `Definições → Dados Analíticos e Monitorização`.
  URL: `https://fareharbor.com/atlantistours/dashboard/settings/analytics/` (approximate — confirm from dashboard navigation).

- [ ] **Step 2: Add Atlantis GA4 service**

  Click `+ Adicionar serviços analíticos`. Fill in:
  - **Tipo:** `Google Analytics 4 (GA4)`
  - **SKU:** `atlantis-ga4`
  - **Identificador de medição GA4:** `G-YE21ZWJNY7`
  - **Multi-site checkbox** (`O calendário, a grelha de itens ou o botão de reserva são adicionados a vários websites`): **✅ ticked**
  - Click **Criar serviço de analítica**.

- [ ] **Step 3: Confirm the service is saved**

  Verify the service appears in the list with status "active" (not "pending"). Screenshot this state for the plan record.

---

### Task A2: Verify `purchase` event fires in GA4 (blocks on test booking)

**Owner:** [JOSÉ]

**Location:** atlantistours.pt (live site) + GA4 interface

- [ ] **Step 1: Open GA4 Realtime view**

  Go to `https://analytics.google.com/`, property = Atlantis Tours, navigate to `Reports → Realtime`. Keep this tab open.

- [ ] **Step 2: Run a real test booking**

  Visit `https://atlantistours.pt/en/tours/benagil-caves-speed-boat-tour` in an incognito window (critical — avoids polluted cookies). Book the cheapest available slot with a real card. Complete through to the FH thank-you screen.

  *Option if real bookings aren't possible:* ask FH support to enable a "test mode" product or give you a 100% discount code for a sandbox booking.

- [ ] **Step 3: Verify `purchase` event in GA4 Realtime**

  Within 1–2 minutes, in GA4 Realtime → "Event count by Event name", confirm a `purchase` event appears. Click it and verify these parameters are present with non-null values:
  - `transaction_id` (the FH booking PK)
  - `value` (the booking total in EUR)
  - `currency` = `EUR`
  - `items` array with tour name

- [ ] **Step 4: Record the outcome**

  ✅ If `purchase` fires with `value` populated → proceed to Task A3.
  ❌ If `purchase` is missing, or `value` is `0` / `null` → execute Task A7 (fallback listener) before proceeding.

  Add a note to `docs/ads/atlantis/00-launch-checklist.md` recording which path was taken.

- [ ] **Step 5: Refund the test booking**

  In FH Reservas, find the test booking by `transaction_id`, issue a full refund.

---

### Task A3: Create Google Ads account

**Owner:** [JOSÉ]

**Location:** `https://ads.google.com/`

- [ ] **Step 1: Sign up with the same Google account that owns GA4**

  Click "Start now", choose "Switch to Expert Mode" immediately (avoid Smart campaigns — they're un-configurable garbage). Select "Create an account without a campaign".

- [ ] **Step 2: Configure account-level settings**

  In `Settings → Account settings`:
  - **Currency:** EUR
  - **Timezone:** Europe/Lisbon
  - **Customer ID:** note this down, write it in `docs/ads/atlantis/00-launch-checklist.md`
  - **Business name:** Atlantis Tours
  - **Business website:** `https://atlantistours.pt`

  ⚠️ Currency and timezone **cannot be changed** after the first billing. Verify before saving.

- [ ] **Step 3: Set up billing**

  Add payment method. Set account spend limit to **€2,000/month** as a safety rail for Phase 0 + Phase 1.

- [ ] **Step 4: Enable auto-tagging**

  `Settings → Account settings → Auto-tagging` → **On**. This appends `gclid` to landing-page URLs so GA4 can attribute sessions to ads.

---

### Task A4: Link Google Ads ↔ GA4 and import purchase conversion

**Owner:** [JOSÉ]

**Location:** GA4 admin + Google Ads

- [ ] **Step 1: Link Google Ads in GA4**

  GA4 → `Admin → Product Links → Google Ads Links → Link`. Select the new Google Ads account. Enable "Enable Personalized Advertising" and "Enable auto-tagging".

- [ ] **Step 2: Import GA4 conversion into Google Ads**

  Google Ads → `Goals → Conversions → + New conversion action → Import → Google Analytics 4 properties → Web`.

  Select event `purchase`. Click **Import and continue**.

- [ ] **Step 3: Configure the imported conversion**

  On the imported conversion, click edit and set:
  - **Goal category:** Purchase
  - **Value:** `Use different values for each conversion` (this pulls `value` from the GA4 event)
  - **Count:** Every
  - **Click-through conversion window:** 30 days
  - **View-through conversion window:** 1 day
  - **Attribution model:** Data-driven
  - **Include in "Conversions":** Yes (this makes it a bidding signal)
  - **Primary/Secondary:** Primary

- [ ] **Step 4: Enable Enhanced Conversions for Web**

  Google Ads → `Goals → Conversions → Settings → Enhanced conversions for web → Turn on`. Choose "Google tag" as the implementation method (since gtag.js is already installed). This requires no code change — Google picks up hashed user identifiers from checkout pages automatically.

  Verify: within 24h the "Enhanced conversions diagnostics" dashboard should show "Recording ✅".

---

### Task A5: Run €10 smoke-test campaign

**Owner:** [JOSÉ]

**Goal:** Prove end-to-end tracking by running a brand keyword for 24h, making a test booking via an ad click, and seeing the conversion appear in Google Ads.

- [ ] **Step 1: Create a temporary brand-search campaign**

  Google Ads → `+ New campaign → Sales → Search`. Name it `SMOKE-TEST — DELETE ME`. Settings:
  - **Budget:** €10/day
  - **Bidding:** Manual CPC, max CPC €0.30
  - **Networks:** Search only (no Display)
  - **Locations:** Portugal (presence)
  - **Languages:** English
  - **Start/end:** today, end after 2 days

  Single ad group `brand-test`, one keyword:
  - `[atlantis tours algarve]` (exact match)

  One RSA with 3 headlines + 2 descriptions (quick placeholder):
  - Headlines: `Atlantis Tours · Algarve Boat Tours`, `Book Benagil Cave Tours Direct`, `Official Site — No OTA Fees`
  - Descriptions: `Book direct with the local operator. Free cancellation 24h before.`, `Small groups, top-rated on Google, instant confirmation.`
  - Final URL: `https://atlantistours.pt/en/`

- [ ] **Step 2: Click your own ad**

  Wait ~1 hour for the campaign to be approved. Then **search Google for** `atlantis tours algarve` (in an incognito window, located in Portugal), click your ad, complete a real test booking.

  ⚠️ Google discourages clicking your own ads too often. Do this **once**. Refund the booking afterwards.

- [ ] **Step 3: Verify conversion appears in Google Ads**

  Within 24–48h, Google Ads → `Campaigns → SMOKE-TEST` → Conversions column should show ≥1. The Conversion Value column should show the EUR amount of the booking.

  ✅ If yes: Phase 0 complete. Pause and rename the campaign (don't delete — keep as an audit trail). Proceed to Phase 1.
  ❌ If no conversion after 48h: conversion is not flowing. Debug order: (1) check GA4 DebugView for the `purchase` event from the test booking; (2) check GA4 → Google Ads Link status; (3) check Enhanced Conversions diagnostics. Do not proceed until resolved.

- [ ] **Step 4: Document the outcome**

  Update `docs/ads/atlantis/00-launch-checklist.md` with: smoke test pass date, Customer ID, booking `transaction_id`, and the amount shown in Google Ads conversions column.

---

### Task A6 *(conditional — only if A2 fails)*: Implement Lightframe `postMessage` fallback listener

**Owner:** [CLAUDE]

**When to run:** only if Task A2 Step 4 shows that the FH GA4 integration does not fire `purchase` with a `value` populated. Skip this task entirely if A2 passes.

**Files:**
- Create: `packages/atlantis/src/components/analytics/LightframePurchaseListener.astro`
- Modify: `packages/shared/src/layouts/PageLayout.astro` (mount the listener globally)

**Background:** FareHarbor's Lightframe posts window messages when the booking flow progresses. The message `type === 'checkout-complete'` includes booking details. We can capture this client-side and fire the `purchase` event into `gtag` ourselves from the parent page.

- [ ] **Step 1: Write the listener component**

```astro
---
// packages/atlantis/src/components/analytics/LightframePurchaseListener.astro
// Fallback for FareHarbor Lightframe purchase tracking.
// Listens for postMessage events from the FH iframe and forwards
// booking data into gtag as a GA4 `purchase` event.
---
<script>
  type FHBookingMessage = {
    type: string;
    pk?: number;
    total?: number;
    currency?: string;
    availability?: { item?: { name?: string; pk?: number } };
  };

  function isFHMessage(origin: string): boolean {
    return origin === 'https://fareharbor.com';
  }

  window.addEventListener('message', (event: MessageEvent) => {
    if (!isFHMessage(event.origin)) return;
    const data = event.data as FHBookingMessage | undefined;
    if (!data || data.type !== 'checkout-complete') return;
    if (!data.pk || typeof data.total !== 'number') return;

    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    function gtag() {
      w.dataLayer.push(arguments);
    }

    gtag('event', 'purchase', {
      transaction_id: String(data.pk),
      value: data.total,
      currency: data.currency || 'EUR',
      items: data.availability?.item
        ? [{
            item_id: String(data.availability.item.pk),
            item_name: data.availability.item.name,
            price: data.total,
            quantity: 1,
          }]
        : [],
    });
  });
</script>
```

- [ ] **Step 2: Mount globally in PageLayout**

  In `packages/shared/src/layouts/PageLayout.astro`, import and render the listener inside the existing `config.analytics.gtag` conditional block near line 87. This ensures it loads on every page where gtag is active.

```astro
---
import LightframePurchaseListener from '@atlantis/components/analytics/LightframePurchaseListener.astro';
---
{config.analytics.gtag && <LightframePurchaseListener />}
```

  Note: the `@atlantis/` import alias may need to be resolved differently depending on how the monorepo aliases are wired. Alternative: move the component into `packages/shared/src/components/analytics/` so it's callable from the shared layout without cross-package imports.

- [ ] **Step 3: Verify origin allowlist is correct**

  Open the FH Lightframe on production and use browser devtools `Network → WS` and `Console` to confirm the iframe's origin is `https://fareharbor.com` (not `fareharbor.io` or similar). Update the `isFHMessage` check if the real origin differs.

- [ ] **Step 4: Run a test booking, verify GA4 sees the event**

  Repeat Task A2 Step 2–3. The `purchase` event should now appear in GA4 Realtime coming from the parent page.

- [ ] **Step 5: Commit**

```bash
git add packages/atlantis/src/components/analytics/ packages/shared/src/layouts/PageLayout.astro
git commit -m "feat(atlantis): add Lightframe purchase fallback listener for GA4"
```

---

# Work Stream B — Landing Page Audit

**Goal:** Confirm tour pages meet the 5 hard requirements from the spec (book-now above fold on mobile, LCP <2.5s on 4G, trust signals visible, no blocking overlays, clickable phone number). Fix any gaps.

**Duration:** 2–3 days. Can run in parallel with Work Stream A.

---

### Task B1: Audit the 5 tour landing pages

**Owner:** [JOSÉ] primary verification, [CLAUDE] for any code fixes

**Pages to audit:**
- `/en/tours/benagil-caves-speed-boat-tour`
- `/en/tours/cranchi-yacht-cruise-to-the-benagil-caves`
- `/en/tours/luxury-sail-yacht-cruise`
- `/en/tours/reef-fishing-tour`
- `/en/tours` (category page — backstop for the "Algarve boat tour" ad group)

- [ ] **Step 1: Run the audit on each page using Chrome DevTools mobile emulation**

  For each page, simulate an iPhone 13 Pro. Verify:

  | # | Requirement | Pass criteria |
  |---|---|---|
  | 1 | Book Now above fold | A FareHarbor booking CTA is visible without scrolling |
  | 2 | LCP < 2.5s on 4G | DevTools → Lighthouse mobile → "Largest Contentful Paint" < 2500ms |
  | 3 | Trust signals visible | At least 2 of {rating stars, "free cancellation", price-from} visible without scrolling |
  | 4 | No blocking overlays | No modal/cookie/newsletter popup prevents tapping the CTA |
  | 5 | Phone number clickable on mobile | Either a `tel:` link in header or inside the primary CTA area |

- [ ] **Step 2: Record findings in a table**

  Create `docs/ads/atlantis/landing-page-audit.md` with a pass/fail matrix. One row per page × requirement.

- [ ] **Step 3: Open issues for each fail**

  Every failing cell = one code task in the Astro codebase. Assign to [CLAUDE] in a follow-up sub-plan if needed.

---

### Task B2 *(conditional — per audit)*: Fix each failing requirement

**Owner:** [CLAUDE]

For any page × requirement that fails, open a fix task. Typical fixes:
- Move the Book Now button higher in the tour page template (likely `packages/atlantis/src/pages/[locale]/tours/[slug].astro` or a shared TourHero component)
- Add `rel="preload"` / `fetchpriority="high"` to the tour hero image if LCP is poor
- Add a `tel:` link next to the price or in the header
- Remove or delay any cookie banner that covers the CTA on mobile

*(No verbatim code in this plan — fixes depend on audit outcome. Each fix must still follow TDD: write a Playwright test that asserts the requirement, fail, implement, pass, commit.)*

---

# Work Stream C — Asset Preparation

**Goal:** Produce all keywords, ad copy, negative lists, and extensions as version-controlled documents before touching the Google Ads UI.

**Duration:** 3–4 days. Can run in parallel with Work Streams A and B.

---

### Task C1: Write the account-level negative keyword list

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/01-keywords/negatives-account.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Account-Level Negative Keywords (Atlantis Tours)

Applied as a Shared Negative Keyword List across all campaigns.
Updated weekly based on search-terms report (see `04-monitoring/ops-playbook.md`).

## Broad-match negatives

- free
- jobs
- job
- career
- careers
- salary
- hiring
- recruitment
- wikipedia
- wiki
- images
- image
- photos
- video
- videos
- youtube
- kayak
- paddle
- swim
- swimming
- tripadvisor
- getyourguide
- viator
- booking.com
- expedia
- airbnb

## Exact-match negatives (brand confusion)

- [atlantis the lost city]
- [atlantis bahamas]
- [atlantis dubai]
- [disney atlantis]
- [atlantis submarine]
- [marvel atlantis]
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/01-keywords/negatives-account.md
git commit -m "docs(ads): add account-level negative keyword list"
```

---

### Task C2: Write Brand campaign keywords (Campaign 1)

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/01-keywords/brand.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Brand Campaign Keywords (Campaign 1)

Single ad group. Mix of exact and phrase match. Purpose: defend the brand against OTAs bidding on our name. High CTR, near-100% conversion rate expected.

## Exact match

- [atlantis tours]
- [atlantis tours algarve]
- [atlantis tours portugal]
- [atlantis tours portimão]
- [atlantistours]
- [atlantistours.pt]
- [www.atlantistours.pt]

## Phrase match

- "atlantis boat tour"
- "atlantis benagil"
- "atlantis algarve"
- "atlantis portugal tours"

## Campaign-level negatives (Brand only)

- [atlantis the lost city]
- [atlantis bahamas]
- [atlantis dubai]
- [disney atlantis]
- myth
- mythology
- submarine
- aquarium
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/01-keywords/brand.md
git commit -m "docs(ads): add Brand campaign keywords"
```

---

### Task C3: Write Benagil Cave Tours EN keywords (Campaign 2 launch set)

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/01-keywords/benagil-en.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Benagil Cave Tours — English Keywords (Campaign 2, launch set)

Four ad groups, STAG structure. All keywords phrase-match unless marked [exact].

## AG-A: Benagil generic (highest volume)

- "benagil cave tour"
- "benagil caves tour"
- "benagil cave boat tour"
- "benagil caves boat tour"
- "visit benagil cave"
- "visit benagil caves"
- "benagil cave from carvoeiro"
- "benagil cave from portimão"
- "benagil cave from albufeira"
- "benagil cave from lagos"
- "benagil sea cave"
- "benagil grotto tour"
- "tour to benagil cave"
- [benagil cave tour]
- [benagil caves]

## AG-B: Speedboat (tour-specific)

- "benagil speedboat tour"
- "benagil speed boat tour"
- "benagil cave speedboat"
- "benagil cave speed boat"
- "fast boat benagil"
- "speedboat tour algarve benagil"
- "benagil rib tour"

## AG-C: Yacht / luxury (Cranchi tour)

- "benagil yacht cruise"
- "benagil yacht tour"
- "benagil cave yacht"
- "private boat to benagil"
- "private tour benagil"
- "luxury benagil tour"
- "benagil cave private tour"

## AG-D: Algarve boat tour backstop (lower intent)

- "algarve boat tour"
- "algarve boat trip"
- "boat tour algarve"
- "boat trip algarve"
- "boat tour portimão"
- "boat trip portimão"
- "boat tour carvoeiro"
- "boat trip carvoeiro"
- "boat tour albufeira"
- "algarve coast cruise"
- "algarve coastline tour"

## Campaign-level negatives (Benagil campaign only)

- cruise ship
- yacht charter (goes to Campaign 3)
- fishing (goes to Campaign 3)
- kayak (separate market)
- sup
- paddleboard
- jet ski
- parasailing
- from lisbon (too broad, includes Nazaré etc.)
- from porto
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/01-keywords/benagil-en.md
git commit -m "docs(ads): add Benagil EN keyword set"
```

---

### Task C4: Write Benagil PT / ES / FR keyword seeds (Campaign 2, week-3 add)

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/01-keywords/benagil-pt.md`, `benagil-es.md`, `benagil-fr.md`

- [ ] **Step 1: Create `benagil-pt.md`**

````markdown
# Benagil Cave Tours — Portuguese Keywords (Campaign 2)

Added in week 3 once EN baseline data exists. Native Portuguese — not auto-translated.

## AG-A: Benagil generic (PT)

- "passeio de barco benagil"
- "passeio às grutas de benagil"
- "gruta de benagil"
- "grutas de benagil"
- "visitar gruta de benagil"
- "gruta de benagil passeio de barco"
- "passeio de barco algarve grutas"

## AG-B: Speedboat (PT)

- "lancha benagil"
- "lancha rápida benagil"
- "passeio lancha grutas benagil"

## AG-C: Yacht / luxury (PT)

- "iate benagil"
- "cruzeiro privado benagil"
- "passeio privado grutas benagil"

## AG-D: Algarve boat tour (PT)

- "passeio de barco algarve"
- "passeio barco portimão"
- "passeio barco carvoeiro"
````

- [ ] **Step 2: Create `benagil-es.md`**

````markdown
# Benagil Cave Tours — Spanish Keywords (Campaign 2)

## AG-A (ES)

- "tour cuevas de benagil"
- "tour cueva de benagil"
- "visita cuevas benagil"
- "excursión cuevas benagil"
- "paseo en barco benagil"

## AG-B (ES)

- "lancha rápida benagil"
- "tour en lancha benagil"

## AG-C (ES)

- "yate benagil"
- "tour privado benagil"

## AG-D (ES)

- "paseo en barco algarve"
- "tour en barco algarve"
````

- [ ] **Step 3: Create `benagil-fr.md`**

````markdown
# Benagil Cave Tours — French Keywords (Campaign 2)

## AG-A (FR)

- "grotte de benagil"
- "grottes de benagil"
- "visite grotte benagil"
- "grotte benagil bateau"
- "excursion grotte benagil"

## AG-B (FR)

- "bateau rapide benagil"
- "excursion bateau benagil"

## AG-C (FR)

- "yacht benagil"
- "tour privé benagil"

## AG-D (FR)

- "balade en bateau algarve"
- "excursion bateau algarve"
````

- [ ] **Step 4: Commit**

```bash
git add docs/ads/atlantis/01-keywords/benagil-pt.md docs/ads/atlantis/01-keywords/benagil-es.md docs/ads/atlantis/01-keywords/benagil-fr.md
git commit -m "docs(ads): add Benagil PT/ES/FR keyword seeds for week-3 expansion"
```

---

### Task C5: Write Yacht & Fishing keywords (Campaign 3)

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/01-keywords/yacht-fishing.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Yacht & Fishing Keywords (Campaign 3)

Two ad groups: luxury-yacht and reef-fishing. EN only.

## AG-Yacht: Luxury Sail Yacht Cruise

- "luxury yacht charter algarve"
- "luxury yacht algarve"
- "private yacht algarve"
- "yacht charter portimão"
- "sailing tour algarve"
- "sailing trip algarve"
- "sunset yacht algarve"
- "sunset sailing algarve"
- "sailboat tour algarve"
- "catamaran tour algarve" *(review after 2 weeks — may draw fishing-unrelated clicks)*
- "private sailing portugal algarve"

## AG-Fishing: Reef Fishing Tour

- "reef fishing algarve"
- "fishing trip algarve"
- "fishing trip portimão"
- "deep sea fishing algarve"
- "sea fishing algarve"
- "fishing charter algarve"
- "sport fishing algarve"
- "big game fishing algarve"

## Campaign-level negatives

- rental (no bareboat rental)
- hire (people searching yacht rentals, not tours)
- lessons
- school
- course
- licence
- license
- freshwater
- lake
- river
- shore fishing
- pier fishing
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/01-keywords/yacht-fishing.md
git commit -m "docs(ads): add Yacht & Fishing keywords"
```

---

### Task C6: Write Pre-trip Planners keywords (Campaign 4)

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/01-keywords/pretrip.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Pre-trip Planners — UK / IE / DE (Campaign 4)

Single ad group. Phrase match only. EN-language search UI (German users frequently search in English).

## Keywords

- "benagil cave tour"
- "benagil caves tour"
- "algarve boat trip"
- "algarve boat tour"
- "things to do algarve"
- "things to do in algarve"
- "best boat tour algarve"
- "top things to do algarve"
- "algarve caves tour"
- "sea cave tour algarve"

## Campaign-level negatives

- kayak
- sup
- lisbon
- porto
- nazaré
- madeira
- azores
- azure window
- faroe
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/01-keywords/pretrip.md
git commit -m "docs(ads): add Pre-trip Planners keywords"
```

---

### Task C7: Write Brand RSA ad copy (Campaign 1)

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/02-ad-copy/brand.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Brand RSA — Campaign 1 Ad Group 1

Responsive Search Ad. 15 headlines (30 chars max each) + 4 descriptions (90 chars max each). Final URL: `https://atlantistours.pt/en/`.

## Headlines (pin plan below)

1. Atlantis Tours — Official Site *(pin to position 1)*
2. Book Benagil Cave Tours Direct *(pin to position 2)*
3. Algarve Boat Tours — Atlantis
4. Atlantis Tours · Portimão
5. Book Direct · No OTA Fees
6. 4.9★ on Google Reviews *(update rating/count to match live numbers)*
7. Local Operator Since [YEAR] *(fill from §13 spec open questions)*
8. Free Cancellation 24h Before
9. Small Groups · Max 12 People
10. Instant Confirmation Online
11. Benagil · Yacht · Fishing
12. Departures From Portimão
13. Reserve Online in 2 Minutes
14. Live Availability · Book Now
15. Official Atlantis Tours Site

## Descriptions

1. The official Atlantis Tours site. Book direct, no OTA commission. Free cancellation 24h before.
2. Benagil Caves, Luxury Sail Yacht, Reef Fishing. Small groups, top-rated, instant confirmation.
3. Skip the marketplace. Book direct with the local operator. 4.9★ on Google.
4. Live availability, instant booking, free cancellation. The fastest way to reserve your tour.

## Pin strategy

Pin headline #1 to Position 1 (brand protection — always show the brand first).
Pin headline #2 to Position 2 (anchor the value proposition).
Leave headlines 3–15 unpinned for Google to rotate.
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/02-ad-copy/brand.md
git commit -m "docs(ads): add Brand RSA copy"
```

---

### Task C8: Write Benagil Generic RSA ad copy (Campaign 2 AG-A)

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/02-ad-copy/benagil-generic.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Benagil Generic RSA — Campaign 2 Ad Group A

Final URL: `https://atlantistours.pt/en/tours/benagil-caves-speed-boat-tour` *(highest-converting tour as default; path-specific ad groups below override this)*.

## Headlines

1. Benagil Cave Boat Tour
2. Visit Benagil Caves by Sea
3. Benagil Caves — From €20
4. Atlantis Tours · Benagil
5. Book Direct · Save on OTA Fees
6. Small Group Tours · Max 12
7. Departures From Portimão Marina
8. 4.9★ on Google · 200+ Reviews *(update with live numbers)*
9. Free 24h Cancellation
10. Same-Day Booking Available
11. Instant Online Confirmation
12. Benagil Cave + Coast Tour
13. Local Skippers · Since [YEAR]
14. Reserve in 2 Minutes
15. Today & Tomorrow Available

## Descriptions

1. See the iconic Benagil Sea Cave from the water. Small groups, local skippers, top-rated on Google.
2. Book direct — no OTA commission. Free cancellation 24h before. Instant confirmation.
3. Departures from Portimão Marina every morning. Same-day and next-day slots often available.
4. 90-minute tour of Benagil Cave and the Algarve coastline. From €20 per person. Book online now.

## Pin strategy

No pins. Let Google rotate all 15 headlines against all queries.
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/02-ad-copy/benagil-generic.md
git commit -m "docs(ads): add Benagil generic RSA copy"
```

---

### Task C9: Write Speedboat RSA ad copy (Campaign 2 AG-B)

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/02-ad-copy/benagil-speedboat.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Benagil Speedboat RSA — Campaign 2 Ad Group B

Final URL: `https://atlantistours.pt/en/tours/benagil-caves-speed-boat-tour`.

## Headlines

1. Benagil Cave Speedboat Tour
2. Fast Boat to Benagil Caves
3. Speedboat Tour · From €20
4. Algarve Speedboat Adventure
5. Benagil RIB Tour · Fast & Fun
6. 90 Min Speedboat Experience
7. Small Group · Max 12 People
8. From Portimão Marina
9. 4.9★ on Google Reviews *(update)*
10. Free 24h Cancellation
11. Same-Day Slots Available
12. Local Skippers · Expert Guides
13. Book Direct — No OTA Fees
14. Instant Online Booking
15. Life Jackets Provided

## Descriptions

1. Blast along the Algarve coast by RIB speedboat. Inside Benagil Cave, past grottos and golden cliffs.
2. Book direct and save — 20% cheaper than GetYourGuide. Free cancellation 24h before.
3. 90-minute thrill ride with expert local skippers. Small groups only. Instant confirmation online.
4. From Portimão Marina, daily departures. Same-day and next-day booking available. Life jackets included.
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/02-ad-copy/benagil-speedboat.md
git commit -m "docs(ads): add Benagil Speedboat RSA copy"
```

---

### Task C10: Write Cranchi Yacht RSA ad copy (Campaign 2 AG-C)

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/02-ad-copy/benagil-cranchi.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Cranchi Yacht RSA — Campaign 2 Ad Group C

Final URL: `https://atlantistours.pt/en/tours/cranchi-yacht-cruise-to-the-benagil-caves`.

## Headlines

1. Benagil Cave Yacht Cruise
2. Private Yacht to Benagil
3. Luxury Benagil Experience
4. Cranchi Yacht · Algarve
5. Private Tour · Up to 10 Guests
6. From Portimão Marina
7. Onboard Bar · Sun Deck · Shade
8. Benagil Caves in Style
9. 4.9★ on Google *(update)*
10. Free 24h Cancellation
11. Book Direct — Best Rates
12. Swimming & Snorkel Stops
13. Local Captain · Expert Crew
14. Exclusive Use of the Yacht
15. Half-Day Private Cruise

## Descriptions

1. Your group, your yacht, your day. Private Cranchi cruise to Benagil Caves and the Algarve coast.
2. Up to 10 guests. Onboard bar, swim stops, snorkel gear included. Book direct for the best rate.
3. Four hours along the Algarve's golden cliffs in a private luxury yacht. Captain and crew included.
4. Celebrate something — or nothing. Book the whole yacht. Free cancellation 24h before.
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/02-ad-copy/benagil-cranchi.md
git commit -m "docs(ads): add Cranchi Yacht RSA copy"
```

---

### Task C11: Write Algarve Backstop RSA (Campaign 2 AG-D)

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/02-ad-copy/benagil-algarve-backstop.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Algarve Backstop RSA — Campaign 2 Ad Group D

Final URL: `https://atlantistours.pt/en/tours`.

## Headlines

1. Algarve Boat Tours
2. Benagil Caves · Yacht · Fishing
3. Explore the Algarve by Sea
4. Boat Tours From Portimão
5. Speedboat · Yacht · Sailing
6. 5 Tours to Choose From *(adjust if count changes)*
7. Small Groups · Local Operators
8. 4.9★ on Google *(update)*
9. Book Direct · No OTA Fees
10. Free 24h Cancellation
11. Same-Day Booking Available
12. Instant Online Confirmation
13. Tours From €20
14. Departures Daily
15. Atlantis Tours · Official

## Descriptions

1. See the Algarve from the water. Benagil Caves, Luxury Yacht, Reef Fishing — pick your adventure.
2. Book direct from the operator. Free cancellation 24h before. Small groups only.
3. Top-rated on Google. Local skippers. Departures from Portimão Marina daily.
4. Five tours · One trusted operator. Tours from €20. Instant booking, live availability.
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/02-ad-copy/benagil-algarve-backstop.md
git commit -m "docs(ads): add Algarve backstop RSA copy"
```

---

### Task C12: Write Luxury Sail & Reef Fishing RSAs (Campaign 3)

**Owner:** [CLAUDE]

**Files:**
- Create `docs/ads/atlantis/02-ad-copy/luxury-sail.md`
- Create `docs/ads/atlantis/02-ad-copy/reef-fishing.md`

- [ ] **Step 1: Create `luxury-sail.md`**

````markdown
# Luxury Sail Yacht RSA — Campaign 3 Ad Group Yacht

Final URL: `https://atlantistours.pt/en/tours/luxury-sail-yacht-cruise`.

## Headlines

1. Luxury Sail Yacht · Algarve
2. Private Sailing Charter
3. Sunset Sail From Portimão
4. Half-Day Sailing Experience
5. Private Yacht · Up to [N] Guests *(fill N from live data)*
6. Sailing Along Algarve Coast
7. Onboard Bar & Sun Deck
8. Swim Stops & Snorkel Included
9. 4.9★ on Google *(update)*
10. Book Direct · Best Rate
11. Free Cancellation 24h
12. Professional Crew · Captain Led
13. Benagil Coast by Sailboat
14. Private Celebration Cruises
15. Sunset · Morning · Half Day

## Descriptions

1. Sail the Algarve coast in total privacy. Your group, your yacht, your day.
2. Onboard bar, swim stops, snorkel gear. Professional crew. From Portimão Marina.
3. Half-day and sunset charters. Book direct — best available rate, guaranteed.
4. Celebrate something special. Or just slow down. Free cancellation 24h before.
````

- [ ] **Step 2: Create `reef-fishing.md`**

````markdown
# Reef Fishing RSA — Campaign 3 Ad Group Fishing

Final URL: `https://atlantistours.pt/en/tours/reef-fishing-tour`.

## Headlines

1. Algarve Reef Fishing Tour
2. Deep Sea Fishing · Algarve
3. Private Fishing Charter
4. Half-Day Fishing Trip
5. All Gear & Bait Included
6. From Portimão Marina
7. Expert Local Skipper
8. Small Group Fishing Trip
9. 4.9★ on Google *(update)*
10. Book Direct · Save
11. Free Cancellation 24h
12. Beginners Welcome
13. Rods · Tackle · Licenses Included
14. Fish the Algarve Reefs
15. Half & Full Day Available

## Descriptions

1. Fish the Algarve reefs with an expert local skipper. All gear, bait, and licences included.
2. Half-day and full-day trips. Small groups only. Beginners welcome, no experience needed.
3. Book direct from Portimão Marina — free cancellation 24h before. Instant confirmation.
4. Everything included: rods, tackle, bait, licences, life jackets. Just bring sun cream.
````

- [ ] **Step 3: Commit**

```bash
git add docs/ads/atlantis/02-ad-copy/luxury-sail.md docs/ads/atlantis/02-ad-copy/reef-fishing.md
git commit -m "docs(ads): add Luxury Sail and Reef Fishing RSA copy"
```

---

### Task C13: Write Pre-trip Planners RSA (Campaign 4)

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/02-ad-copy/pretrip.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Pre-trip Planners RSA — Campaign 4 Ad Group 1

Final URL: `https://atlantistours.pt/en/tours/benagil-caves-speed-boat-tour`.

## Headlines

1. Planning Algarve? Book Benagil
2. Benagil Cave Boat Tour
3. Reserve Your Algarve Tour
4. Bookable Now for May–Sept
5. Skip the OTA Fees
6. Book Direct · Local Operator
7. Benagil Caves · From €20
8. 4.9★ on Google · 200+ Reviews *(update)*
9. Small Groups · Max 12
10. Free 24h Cancellation
11. Instant Online Confirmation
12. Local Skippers · Expert Crew
13. From Portimão Marina
14. Secure Your Date Early
15. Atlantis Tours · Official

## Descriptions

1. Planning your Algarve trip? Book the Benagil Cave tour direct with the local operator.
2. Live availability for May through September. Free cancellation 24h before — lock in your date risk-free.
3. Book direct and save 20% vs GetYourGuide. Small groups, top-rated on Google, instant confirmation.
4. The iconic Benagil Sea Cave by RIB speedboat. 90 min, from Portimão Marina. Reserve online in 2 minutes.
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/02-ad-copy/pretrip.md
git commit -m "docs(ads): add Pre-trip Planners RSA copy"
```

---

### Task C14: Write extension content (sitelinks, callouts, structured snippets, prices)

**Owner:** [CLAUDE]

**Files:**
- Create `docs/ads/atlantis/03-extensions/sitelinks.md`
- Create `docs/ads/atlantis/03-extensions/callouts.md`
- Create `docs/ads/atlantis/03-extensions/structured-snippets.md`
- Create `docs/ads/atlantis/03-extensions/prices.md`
- Create `docs/ads/atlantis/03-extensions/images.md`

- [ ] **Step 1: Create `sitelinks.md`**

````markdown
# Sitelink Extensions — Account Level

Apply to all campaigns (Google will filter irrelevant ones automatically).

| # | Text (25 chars) | Description line 1 (35 chars) | Description line 2 (35 chars) | URL |
|---|---|---|---|---|
| 1 | Benagil Cave Tour | Iconic Algarve sea cave · 90 min | From €20 · Small groups | /en/tours/benagil-caves-speed-boat-tour |
| 2 | Luxury Yacht | Private Cranchi yacht cruise | Up to 10 guests · Half-day | /en/tours/cranchi-yacht-cruise-to-the-benagil-caves |
| 3 | Luxury Sail | Private sail yacht charter | Sunset & half-day trips | /en/tours/luxury-sail-yacht-cruise |
| 4 | Reef Fishing | Expert skipper · All gear | Beginners welcome | /en/tours/reef-fishing-tour |
| 5 | Reviews | 4.9★ on Google · 200+ reviews | Read customer stories | /en/reviews |
| 6 | FAQ | Answers to common questions | Cancellation · What to bring | /en/faq |
````

- [ ] **Step 2: Create `callouts.md`**

````markdown
# Callout Extensions — Account Level

Short, benefit-led. 25 chars max each.

- Free 24h Cancellation
- Book Direct — No OTA Fees
- Small Groups Only
- Local Operator Since [YEAR]
- Instant Confirmation
- Expert Skippers
- Life Jackets Included
- 4.9★ on Google
- Departures Daily
- From Portimão Marina
````

- [ ] **Step 3: Create `structured-snippets.md`**

````markdown
# Structured Snippet Extensions — Account Level

Header: "Tour types"
Values:
- Speedboat
- Yacht
- Sailing
- Fishing
- Private Charter
````

- [ ] **Step 4: Create `prices.md`**

````markdown
# Price Extensions — Account Level

Type: "Tours"

| Header | Description | Price | URL |
|---|---|---|---|
| Benagil Speedboat | 90 min · From Portimão | From €20 | /en/tours/benagil-caves-speed-boat-tour |
| Cranchi Yacht | Private · Up to 10 guests | From €[X] *(fill)* | /en/tours/cranchi-yacht-cruise-to-the-benagil-caves |
| Luxury Sail Yacht | Private half-day sail | From €[X] *(fill)* | /en/tours/luxury-sail-yacht-cruise |
| Reef Fishing | Half-day · Gear included | From €[X] *(fill)* | /en/tours/reef-fishing-tour |
````

- [ ] **Step 5: Create `images.md`**

````markdown
# Image Extensions — Account Level

Requirements: 1200×1200 square (preferred) or 1200×628 landscape. JPG/PNG. Under 5 MB each. Max 20 images uploadable; Google shows best-performing 1.

Upload these (shortlist — pick from existing tour photography library):

- [ ] Benagil Cave interior, speedboat in frame
- [ ] Cranchi Yacht anchored, crew on deck
- [ ] Happy small group on Luxury Sail Yacht
- [ ] Algarve cliff coastline from water
- [ ] Reef Fishing — catch on deck
- [ ] Sunset from yacht

Avoid: text overlays, heavy filters, very dark scenes (Google rejects low-contrast images).
````

- [ ] **Step 6: Commit**

```bash
git add docs/ads/atlantis/03-extensions/
git commit -m "docs(ads): add ad extension content (sitelinks, callouts, snippets, prices, images)"
```

---

# Work Stream D — Build Campaigns in Google Ads

**Goal:** Translate the Work Stream C deliverables into live-ready (paused) campaigns inside the Google Ads UI. Keep all campaigns **paused** until the launch checklist in Work Stream F passes.

**Duration:** 1–2 days once Work Streams A and C are complete. **Blocked on A5 (smoke test pass).**

---

### Task D1: Set up account-level shared negatives and conversion goals

**Owner:** [JOSÉ]

**Location:** Google Ads → Tools → Shared Library → Negative keyword lists + Goals → Conversions

- [ ] **Step 1: Create the shared negative keyword list**

  Tools → Shared Library → Negative keyword lists → + New list.
  Name: `Atlantis — Account Negatives`.
  Paste content from `docs/ads/atlantis/01-keywords/negatives-account.md`. Save.

- [ ] **Step 2: Confirm the primary conversion is set**

  Goals → Conversions. Verify only `purchase` (imported from GA4 in Task A4) is marked **Primary**. Mark any smoke-test / duplicate conversions as **Secondary** or delete them.

---

### Task D2: Build Campaign 1 — Brand

**Owner:** [JOSÉ]

- [ ] **Step 1: Create the campaign**

  Campaigns → + New campaign → Sales → Search. Settings:
  - **Name:** `01 · Brand`
  - **Bidding:** Manual CPC, max CPC €0.40
  - **Networks:** Search only (UNCHECK Display, UNCHECK Search Partners)
  - **Locations:** All countries and territories (Brand only — these are rare)
  - **Languages:** English, Portuguese, Spanish, French
  - **Audience segments:** none
  - **Daily budget:** €2
  - **Start date:** today | **End date:** none
  - **Ad schedule:** All days, 00:00–24:00
  - **Device bid adjustments:** none
  - **Attach shared negative list:** `Atlantis — Account Negatives`

- [ ] **Step 2: Create the single ad group**

  Ad group name: `brand-exact`.
  Default bid: €0.40. Paste keywords from `docs/ads/atlantis/01-keywords/brand.md`.

- [ ] **Step 3: Create the RSA**

  Headlines + descriptions + final URL from `docs/ads/atlantis/02-ad-copy/brand.md`. Apply pin strategy. Display path: `/official`.

- [ ] **Step 4: Attach extensions**

  Ads & Assets → Assets → Apply at campaign level:
  - Sitelinks (all 6)
  - Callouts (all)
  - Structured snippets
  - Images (all uploaded)
  - Call extension (phone number — fill from §13 spec)
  - Location extension (link to Google Business Profile)

- [ ] **Step 5: Set campaign status to Paused, save**

---

### Task D3: Build Campaign 2 — Benagil Cave Tours (EN launch set)

**Owner:** [JOSÉ]

- [ ] **Step 1: Create the campaign**

  Settings:
  - **Name:** `02 · Benagil Cave Tours`
  - **Bidding:** Manual CPC, max CPC €0.80
  - **Networks:** Search only
  - **Locations:** "Presence in" → Add each target: Faro district + 25 km radius rings around Portimão, Albufeira, Carvoeiro, Lagos, Vilamoura, Armação de Pêra. Include Faro Airport.
  - **Location options:** Target → Presence (People in your targeted locations). Exclude: Presence or interest in excluded locations (default).
  - **Languages:** English (PT/ES/FR added in Task D7)
  - **Daily budget:** €18
  - **Ad schedule:** Mon–Sun 06:00–23:00, bid adjustment +20% for 07:00–10:00 and +20% for 17:00–21:00
  - **Device bid adjustments:** Mobile +20%, Desktop −20%, Tablet 0%
  - **Attach shared negative list:** `Atlantis — Account Negatives`
  - **Campaign-level negatives:** add the Benagil-campaign negatives from `benagil-en.md`

- [ ] **Step 2: Create 4 ad groups**

  For each of AG-A (Benagil generic), AG-B (Speedboat), AG-C (Cranchi Yacht), AG-D (Algarve backstop):
  - Name the ad group exactly as above.
  - Default bid: €0.80.
  - Paste keywords from the respective section of `benagil-en.md`.
  - Create one RSA using the matching file from `docs/ads/atlantis/02-ad-copy/` (`benagil-generic.md` / `benagil-speedboat.md` / `benagil-cranchi.md` / `benagil-algarve-backstop.md`).
  - Final URL per the ad-copy file.

- [ ] **Step 3: Attach extensions (campaign level)**

  Same 6 sets as D2 Step 4.

- [ ] **Step 4: Set campaign status to Paused, save**

---

### Task D4: Build Campaign 3 — Yacht & Fishing

**Owner:** [JOSÉ]

- [ ] **Step 1: Create the campaign**

  Settings:
  - **Name:** `03 · Yacht & Fishing`
  - **Bidding:** Manual CPC, max CPC €1.50
  - **Networks:** Search only
  - **Locations:** Same in-Algarve geo as D3, **plus** United Kingdom, Ireland, Germany. Location options: "Presence in" for all.
  - **Languages:** English only
  - **Daily budget:** €8
  - **Ad schedule:** All days, 00:00–24:00 (Yacht/Fishing searchers research at odd hours from home)
  - **Device bid adjustments:** none
  - **Attach shared negative list:** `Atlantis — Account Negatives`
  - **Campaign-level negatives:** add the Yacht/Fishing negatives from `yacht-fishing.md`

- [ ] **Step 2: Create 2 ad groups**

  - AG-Yacht: keywords from `yacht-fishing.md` AG-Yacht section + RSA from `luxury-sail.md`
  - AG-Fishing: keywords from `yacht-fishing.md` AG-Fishing section + RSA from `reef-fishing.md`

- [ ] **Step 3: Attach extensions, set Paused, save**

---

### Task D5: Build Campaign 4 — Pre-trip Planners

**Owner:** [JOSÉ]

- [ ] **Step 1: Create the campaign**

  Settings:
  - **Name:** `04 · Pre-trip Planners`
  - **Bidding:** Manual CPC, max CPC €0.60
  - **Networks:** Search only
  - **Locations:** "Presence in" → United Kingdom, Ireland, Germany. Exclude Portugal (add as excluded location to prevent overlap with Campaign 2).
  - **Languages:** English
  - **Daily budget:** €4
  - **Ad schedule:** All days, 00:00–24:00
  - **Device bid adjustments:** none
  - **Attach shared negative list:** `Atlantis — Account Negatives`
  - **Campaign-level negatives:** add the Pre-trip negatives from `pretrip.md`

- [ ] **Step 2: Create 1 ad group**

  Name: `pretrip-benagil`. Keywords from `pretrip.md`. RSA from `pretrip.md`.

- [ ] **Step 3: Attach extensions, set Paused, save**

---

### Task D6: Pre-launch QA checklist

**Owner:** [JOSÉ]

**Location:** Google Ads → Recommendations + Overview

- [ ] **Step 1: Run through this checklist with all campaigns paused**

  - [ ] All 4 campaigns show status **Paused** (not **Enabled**)
  - [ ] Each campaign has at least 1 ad group with ≥1 enabled ad
  - [ ] Every ad has been **Approved** or **Approved (limited)** by Google's review (wait up to 24h if "Under review")
  - [ ] Daily budgets sum to €32 (= €960/month). Verify in Overview.
  - [ ] Primary conversion "Purchase (GA4)" shows in the Conversions column of the Campaigns view
  - [ ] Shared negative list `Atlantis — Account Negatives` is attached to all 4 campaigns
  - [ ] Device bid adjustments are set correctly (Campaign 2: mobile +20%, desktop −20%)
  - [ ] Ad schedule with +20% peak adjustments is set on Campaign 2
  - [ ] Auto-tagging is on (Account → Settings)
  - [ ] Billing and spend cap are configured

- [ ] **Step 2: Ignore the Google "Recommendations" nags**

  Google will aggressively recommend: switching to Maximize Conversions, adding Search Partners, enabling Display, expanding locations, removing negative keywords. **Dismiss all of them during Phase 1.** These recommendations optimize for Google's revenue, not yours.

- [ ] **Step 3: Log QA outcome**

  Update `docs/ads/atlantis/00-launch-checklist.md` with the QA date and any caveats.

---

# Work Stream E — Monitoring Infrastructure

**Goal:** Set up Looker Studio dashboard and operational playbook before launch, not after.

**Duration:** ~1 day. Can run during Work Stream D.

---

### Task E1: Build the Looker Studio dashboard

**Owner:** [JOSÉ] (build it in Looker), [CLAUDE] (write the config doc)

**Files:** Create `docs/ads/atlantis/04-monitoring/looker-studio-config.md`

- [ ] **Step 1 [CLAUDE]: Write the Looker Studio config document**

````markdown
# Looker Studio Dashboard — Atlantis Ads

**Template URL:** build from scratch using this config.

## Data sources

1. Google Ads (the Atlantis Tours account)
2. Google Analytics 4 (the Atlantis property)

## Page 1: Overview

**Date range selector:** Last 7 / Last 30 / Last 90 days (default: Last 30).

**Scorecards (top row):**
- Total spend (Google Ads)
- Total conversions (Google Ads — primary = Purchase)
- Total conversion value (Google Ads)
- ROAS = conversion value ÷ spend (calculated field)
- Cost per conversion
- CTR (account avg)

**Chart 1 (time series):** Spend vs. Conversion value, daily, last 90 days
**Chart 2 (bar):** ROAS by campaign, last 30 days
**Chart 3 (bar):** Cost per conversion by campaign, last 30 days
**Table:** Campaign name · Spend · Clicks · Conversions · Conv. value · ROAS · CPC · CTR

## Page 2: Tour performance

**Source:** GA4

**Chart 1 (table):** Item name · Purchases · Revenue · Avg order value · Source/medium = google/cpc
**Chart 2 (pie):** Revenue by item name (paid traffic only)
**Chart 3 (bar):** Paid vs. Organic bookings per tour, last 30 days

## Page 3: Wasted spend audit

**Source:** Google Ads search terms report

**Table:** Search term · Campaign · Ad group · Impressions · Clicks · Cost · Conversions. Filter: Cost > €3 AND Conversions = 0. Sort by Cost desc.

This is the weekly negative-keyword candidate list.

## Email schedule

Looker Studio → Share → Schedule email → every Monday 09:00 Europe/Lisbon → PDF of Pages 1 & 3 → sender: `jose.ferreira.ptm2@gmail.com` + José's CEO email.
````

- [ ] **Step 2 [JOSÉ]: Build the Looker dashboard**

  Go to `https://lookerstudio.google.com/`, create a new report, follow the config above. Save as "Atlantis — Google Ads Performance".

- [ ] **Step 3 [JOSÉ]: Set up the weekly email schedule**

  Share → Schedule email → Weekly, Monday 09:00 Europe/Lisbon.

- [ ] **Step 4 [CLAUDE]: Commit the config doc**

```bash
git add docs/ads/atlantis/04-monitoring/looker-studio-config.md
git commit -m "docs(ads): add Looker Studio dashboard configuration"
```

---

### Task E2: Write the operations playbook

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/04-monitoring/ops-playbook.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Ops Playbook — Atlantis Google Ads

Daily / weekly / monthly routines for running the account.

## Daily (first 2 weeks of May only)

**Time:** ~5 min, morning coffee.

1. Open Google Ads → Campaigns.
2. Scan the Cost and Conversions columns over the last 24h.
3. If any campaign has spent > €10 with zero conversions in 48h → pause it, flag for investigation in the weekly review.
4. Check for policy disapprovals (any ad showing "Disapproved" status). Fix immediately — disapproved ads don't show.

## Weekly (every Monday, 30 min)

**Read the Monday Looker Studio email first** — then act on it.

1. **Search terms review.** Google Ads → Campaign → Keywords tab → Search terms.
   - For each search term with spend > €2 and 0 conversions: add as a negative (ad-group level if niche, campaign level if broad).
   - For high-performing search terms (≥1 conversion at < €40 cost): add as a new exact-match keyword in the relevant ad group.
2. **Keyword pruning.** For each keyword with 100+ impressions and CTR < 0.5%: pause.
3. **Bid adjustments.** For each keyword with ≥3 conversions at cost per conversion < €25: increase bid +15%. For each with 0 conversions and cost > €10: decrease bid −20%.
4. **Update the shared negatives list** with anything new.

## Bi-weekly (alternating Mondays, 30 min)

1. **RSA headline rotation.** Google Ads → Ads → Asset details. For each ad group, disable the lowest-performing headline (label = "Low"), replace with a new variant. Use Google's asset performance ratings.
2. **Extension review.** Disable any sitelink / callout / price with CTR < 1%.

## Monthly (first Monday of each month, 1 hour)

1. **Full ROAS review** on Looker Page 1. Compare to targets:
   - Phase 1 (May / early June): ≥200% account ROAS, ≤€40 cost/booking cave, ≤€100 cost/booking yacht
   - Phase 2 (mid-June onward): ≥400%, ≤€25, ≤€70
2. **Budget reallocation.** Move 10–20% of monthly budget from the worst-performing campaign to the best. Never re-balance mid-month.
3. **Phase 2 trigger check** (June only). See `05-phase2/trigger-checklist.md`.
4. **Cross-reference with FareHarbor revenue dashboard.** Reconcile ad-attributed bookings with actual FH bookings (bookings attributed to Google/CPC vs. total).
5. **Kill-criteria review.** Any campaign with <5 conversions in 30 days or ROAS <100% gets paused for root-cause review.

## Quarterly (1st of Q, 2 hours)

Strategic review: what's working, what's dead, expansion to YouTube / Discovery / Meta.

## On-call alerts

Set in Google Ads → Notifications:
- Daily spend exceeds budget by 10%
- Disapproved ad detected
- Conversion value drops > 30% week-over-week
- Landing page broken (404) detected

## Holdout test (month 2 or 3)

See `../spec` §incrementality. In month 2, pause all campaigns in one Algarve micro-region (e.g. Vilamoura) for 14 days. Compare booking rates with the other regions. The delta is the real incremental value of the ads. Log results in this file.
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/04-monitoring/ops-playbook.md
git commit -m "docs(ads): add operations playbook for daily/weekly/monthly cadence"
```

---

# Work Stream F — Launch

**Goal:** Go live on May 1 at 50% budget. Ramp to full budget after 14 days at stable CPA.

**Duration:** 1 day for launch + 2 weeks ramp monitoring.

---

### Task F1: Pre-flight launch checklist (run morning of May 1)

**Owner:** [JOSÉ]

- [ ] **Step 1: Final pre-flight**

  Open `docs/ads/atlantis/00-launch-checklist.md` (written incrementally through Phase 0 + Work Stream D). Confirm every line is checked:

  - [ ] Phase 0 smoke test passed (Task A5) — real conversion recorded in Google Ads with EUR value
  - [ ] `purchase` events firing in GA4 consistently for 7+ days with no missing `value`
  - [ ] GA4 ↔ Google Ads link active
  - [ ] Enhanced Conversions diagnostics = "Recording ✅"
  - [ ] Landing page audit (Work Stream B) complete, all 5 pages pass all 5 requirements
  - [ ] All 4 campaigns built and approved (Work Stream D)
  - [ ] Shared negatives list attached
  - [ ] Looker Studio dashboard live and emailing
  - [ ] Billing and spend cap configured
  - [ ] FareHarbor Lightframe smoke-tested (book a tour end-to-end, confirm no regressions)

- [ ] **Step 2: If any checkbox fails, do not launch**

  Fix first. Hold the launch until green.

---

### Task F2: Go live at 50% budget

**Owner:** [JOSÉ]

- [ ] **Step 1: Halve the daily budget on each campaign**

  Temporarily adjust:
  - Campaign 1 Brand: €2 → €1
  - Campaign 2 Benagil: €18 → €9
  - Campaign 3 Yacht/Fishing: €8 → €4
  - Campaign 4 Pre-trip: €4 → €2

  Total: €16/day (≈ €480/month).

- [ ] **Step 2: Enable all 4 campaigns**

  Change status from Paused to Enabled, one at a time, in this order: Brand → Benagil → Yacht/Fishing → Pre-trip.

- [ ] **Step 3: Monitor hourly for the first 6 hours**

  Watch for: disapprovals, landing page errors, abnormal CPC, tracking anomalies. If anything looks off, pause the affected campaign.

- [ ] **Step 4: Log launch timestamp**

  Note exact launch time in `docs/ads/atlantis/00-launch-checklist.md`.

---

### Task F3: Two-week ramp monitoring

**Owner:** [JOSÉ]

- [ ] **Step 1: Daily check for 14 days**

  Follow the Ops Playbook "Daily" routine. Pay special attention to tracking — a missing `purchase` event on day 3 is the cheapest time to find it.

- [ ] **Step 2: After 14 days, assess ramp readiness**

  If:
  - Account has ≥ 10 conversions
  - No tracking issues
  - Cost per conversion < 1.5× the Phase 1 target (e.g. < €60 for cave tours, < €150 for yacht/fishing)
  - All campaigns have been running uninterrupted

  Then → raise budgets to 100% of Phase 1 plan (€32/day ≈ €960/month) in the same ratios.

  If any check fails → extend ramp by 7 more days, diagnose.

---

# Work Stream G — Phase 2 Readiness (for mid-June)

**Goal:** Have Phase 2 trigger criteria, PMax assets, and Customer Match list documented and prepared so we can switch in under a day when the moment arrives.

**Duration:** ~1 day. Execute in early June ahead of the trigger review.

---

### Task G1: Write the Phase 2 trigger checklist

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/05-phase2/trigger-checklist.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Phase 2 Trigger Checklist — Mid-June Review

All four criteria must be **true** before switching Campaigns 2 and 3 from Manual CPC to Maximize Conversion Value with target ROAS, and before launching the PMax campaign.

## Trigger criteria

- [ ] **Conversions:** ≥ 30 primary conversions in the last 30 days at the account level
- [ ] **Phase 1 ROAS:** ≥ 200% account-level over the last 30 days
- [ ] **Tracking stability:** no `purchase` event with null or zero `value` in the last 14 days (check GA4 "Events → purchase" report, custom parameter `value` filter)
- [ ] **Cave booking cost:** ≤ €40 cost per booking for Benagil cave tours (Campaign 2) in the last 30 days

## If all pass → execute Phase 2 switch

See `pmax-assets.md` for the launch steps.

## If any fail → diagnose, retry in 14 days

| Failure | Likely cause | Fix |
|---|---|---|
| <30 conversions | Too-low impression share OR broken tracking | Raise bids +20% on top keywords OR audit tracking |
| ROAS < 200% | Wrong keywords OR bad landing pages OR too-broad geo | Cut worst-performing ad groups, re-audit LPs |
| Tracking issue | FH integration regressed | Run the Phase 0 smoke test again |
| Cost per cave booking too high | Too-broad keywords OR low Quality Score | Tighten match types, improve ad relevance |
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/05-phase2/trigger-checklist.md
git commit -m "docs(ads): add Phase 2 trigger checklist"
```

---

### Task G2: Write the PMax asset group prep guide

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/05-phase2/pmax-assets.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Performance Max Asset Group — Benagil Cave Tours

Launched at the start of Phase 2, only after trigger criteria met.

## Campaign setup

- **Campaign name:** `05 · PMax · Benagil Cave Tours`
- **Objective:** Sales
- **Budget:** €8/day initial (≈ €240/month)
- **Bidding:** Maximize Conversion Value, Target ROAS 400%
- **Geography:** Same in-Algarve geo as Campaign 2, + UK + IE + DE
- **Languages:** English (primary), Portuguese, Spanish, French
- **Brand exclusions:** upload a brand list — all exact Brand keywords from `01-keywords/brand.md`. This prevents PMax from cannibalising Campaign 1.

## Asset group: "Benagil Cave Tours"

### Final URLs
- `https://atlantistours.pt/en/tours/benagil-caves-speed-boat-tour`
- `https://atlantistours.pt/en/tours/cranchi-yacht-cruise-to-the-benagil-caves`

### Images (minimum 1 square + 1 landscape + 1 portrait)
- 5+ of the Benagil Cave interior photography
- 3+ of the Speedboat on water
- 3+ of the Cranchi Yacht
- 2+ of happy customers

### Logos
- Atlantis Tours logo (square, transparent PNG)
- Atlantis Tours logo (landscape, transparent PNG)

### Videos
- 1× 15-second tour highlight
- 1× 30-second customer experience
- 1× 60-second full tour walkthrough

### Text assets

**Headlines (up to 15):** reuse the best-performing 15 from Campaign 2 Ad Group A (`benagil-generic.md`). After 30 days of Phase 1 data, the "Good" or "Best" rated headlines will be known — use those.

**Long headlines (up to 5, 90 chars):**
1. See the Iconic Benagil Sea Cave With Algarve's Top-Rated Local Boat Tour Operator
2. Book Direct: 90-Min Speedboat Tour of Benagil Cave — Small Groups, From €20
3. Private Yacht Cruise to Benagil Caves From Portimão Marina — Up to 10 Guests
4. Benagil Cave Tour · Free Cancellation · Instant Confirmation · 4.9★ Google Reviews
5. Skip the OTA Fees — Book Atlantis Tours Direct for the Best Benagil Cave Experience

**Descriptions (up to 5, 90 chars):** reuse from `benagil-generic.md` and `benagil-cranchi.md`.

### Audience signals (seed PMax's learning)

- **Your data:** upload Customer Match list (see `customer-match-prep.md`)
- **Custom segments:** people who searched for "benagil caves", "algarve boat tour", "getyourguide algarve"
- **Interests:** Travel & Tourism, Water Sports, Luxury Travel
- **Demographics:** ages 25–64

## Launch steps

- [ ] Confirm Phase 2 triggers met (`trigger-checklist.md`)
- [ ] Create the campaign with settings above
- [ ] Build asset group, upload all images / videos / logos
- [ ] Add headlines, descriptions, final URLs
- [ ] Attach brand exclusions list
- [ ] Attach Customer Match audience signal
- [ ] Enable the campaign

## Cannibalisation monitoring

For the first 14 days after PMax launch, check daily:
- Campaign 2 CTR should not drop by more than 20%
- Campaign 2 impressions should not drop by more than 30%

If it drops more → reduce PMax budget by 50% and re-evaluate.
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/05-phase2/pmax-assets.md
git commit -m "docs(ads): add PMax asset group preparation guide"
```

---

### Task G3: Write the Customer Match prep guide

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/05-phase2/customer-match-prep.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Customer Match — Past FareHarbor Customers

Upload the Atlantis past-customer email list into Google Ads as a Customer Match audience. PMax uses this as a lookalike seed.

## Export from FareHarbor

1. FH Dashboard → Clientes → Exportar.
2. Filter: bookings in last 24 months, status = Completed (not refunded).
3. Export CSV. Required columns: `email`, `first_name`, `last_name`, `phone`, `country`.

## Clean the list

Google's match rate improves dramatically with proper formatting:
- Lowercase all emails, strip whitespace
- Phone numbers in E.164 format (+351… , +44…, +49…)
- Country codes in ISO 3166-1 alpha-2 (PT, GB, DE)
- Remove duplicates (by email)

Target: ≥ 1,000 rows for PMax to treat the signal seriously. If fewer, still upload — it's additive.

## Upload

Google Ads → Tools → Audience Manager → Your data segments → + New segment → Customer list.

- **Name:** `Atlantis — Past FH Customers`
- **Data type:** Upload plain text (Google hashes on upload)
- **Upload file:** the cleaned CSV
- **Consent:** confirm you have consent under GDPR / PECR. Atlantis should have this from the FH booking flow's privacy policy acceptance.

Wait 24–48h for match processing. Match rate < 50% = formatting issue (re-clean and re-upload).

## Use in PMax

When creating the PMax asset group (`pmax-assets.md`), add `Atlantis — Past FH Customers` as an audience signal under "Your data".

## Refresh cadence

Re-upload the list every 90 days to keep it fresh. Automate if possible.
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/05-phase2/customer-match-prep.md
git commit -m "docs(ads): add Customer Match preparation guide"
```

---

# Work Stream H — Launch Checklist (master document)

**Goal:** Single source-of-truth document tracking Phase 0, Work Stream D QA, launch, and Phase 2 readiness. Updated incrementally.

---

### Task H1: Initialise the master launch checklist

**Owner:** [CLAUDE]

**Files:** Create `docs/ads/atlantis/00-launch-checklist.md`

- [ ] **Step 1: Create the file with this content**

````markdown
# Atlantis Google Ads — Master Launch Checklist

Updated incrementally through the launch process. Final green state = go-live.

## Phase 0: Tracking

- [ ] **A1** FH GA4 integration configured — date: ___________
- [ ] **A2** Test booking verified `purchase` event in GA4 with `value` populated — date: ___________
   - Path taken: ☐ FH native integration worked / ☐ Needed fallback listener (Task A6)
- [ ] **A3** Google Ads account created — Customer ID: ___________
- [ ] **A4** GA4 ↔ Ads linked, `purchase` conversion imported as Primary
- [ ] **A4** Enhanced Conversions status = Recording
- [ ] **A5** Smoke test campaign ran and converted — conversion amount shown in Ads: €_____
- [ ] **A5** Smoke test paused after verification

## Phase 1 Build: Work Streams B + C + D

- [ ] **B1** Landing page audit — all 5 pages × 5 requirements passing
- [ ] **C1–C14** All asset files committed under `docs/ads/atlantis/`
- [ ] **D1** Shared negative list created and attached to all campaigns
- [ ] **D2–D5** All 4 campaigns built, all ads approved by Google
- [ ] **D6** Pre-launch QA checklist complete

## Monitoring: Work Stream E

- [ ] **E1** Looker Studio dashboard live
- [ ] **E1** Weekly Monday email schedule active
- [ ] **E2** Ops playbook written and reviewed

## Launch: Work Stream F

- [ ] **F1** Pre-flight all green
- [ ] **F2** Launched at 50% budget — date/time: ___________
- [ ] **F3** 14-day ramp complete — ramped to 100% on: ___________

## Phase 2: Work Stream G

- [ ] **G1** Trigger checklist reviewed mid-June — triggers met: ☐ Yes / ☐ No
- [ ] **G2** PMax campaign launched — date: ___________
- [ ] **G3** Customer Match list uploaded — match rate: _____%

## Risk watch

- [ ] Weekly tracking-health check (purchase events with null value) — ongoing
- [ ] Weekly Auction Insights for brand keyword — ongoing
- [ ] Monthly off-season decision — September 30 checkpoint

## Open questions (from spec §13)

- Starting budget within €600–€1,500 — confirmed: €_____/month
- Atlantis Tours founding year — _______
- Review count and rating for ad copy — _______ reviews at _____ ★
- Booking phone number for Call extension — _______
- FH customer email list size — _______ rows
````

- [ ] **Step 2: Commit**

```bash
git add docs/ads/atlantis/00-launch-checklist.md
git commit -m "docs(ads): initialise master launch checklist"
```

---

## Execution order summary

The above work streams have dependencies. Execute in this order to minimise blocking:

```
Week 1:
  [Day 1–2] Work Stream A (Tasks A1–A4)       [JOSÉ] FH + GA4 + Ads setup
  [Day 1–4] Work Stream B (Tasks B1–B2)       [JOSÉ/CLAUDE] Landing page audit + fixes
  [Day 1–4] Work Stream C (Tasks C1–C14)      [CLAUDE] Asset prep (parallel)
  [Day 4–5] Work Stream A (Task A5)           [JOSÉ] Smoke test — HARD GATE
  [Day 5]   Work Stream A (Task A6 if needed) [CLAUDE] Fallback listener

Week 2:
  [Day 6–7] Work Stream D (Tasks D1–D6)       [JOSÉ] Build paused campaigns in Ads UI
  [Day 6–8] Work Stream E (Tasks E1–E2)       [JOSÉ/CLAUDE] Monitoring infra
  [Day 9]   Work Stream H (Task H1)           [CLAUDE] Master checklist
  [Day 10]  Work Stream F (Task F1)           [JOSÉ] Pre-flight

May 1:      Work Stream F (Task F2)           [JOSÉ] Launch at 50% budget
May 1–15:   Work Stream F (Task F3)           [JOSÉ] Ramp monitoring
May 15:                                       Ramp to 100% budget if healthy

Early June: Work Stream G (Tasks G1–G3)       [CLAUDE] Phase 2 prep docs
Mid-June:   Trigger review + PMax launch      [JOSÉ] if triggers met
```

---

## Self-review notes (from plan author)

- **Spec coverage:** All 14 sections of `2026-04-21-atlantis-google-ads-design.md` are covered: §3 decisions → Work Streams B–G; §4 Phase 0 → Work Stream A; §5 Phase 1 campaigns → Work Stream D; §6 targeting → inside D2–D5; §7 Phase 2 → Work Stream G; §8 monitoring → Work Stream E; §9 risks → inline mitigations in E2 ops playbook + F3 ramp. §13 open questions are tracked in H1.
- **Placeholder scan:** `[YEAR]`, `200+ reviews at 4.9★`, `phone number`, `€[X]` for yacht/fishing prices are marked with `*(fill from §13)*` — these are spec-level open questions to be answered by [JOSÉ] before the relevant asset goes into the UI, not plan placeholders.
- **Consistency:** conversion action is referred to as `Purchase (GA4)` and `purchase` event consistently; campaign numbering 01–04 matches §5 of spec throughout.
- **Scope:** plan is big but the underlying work is a single coherent launch — splitting into multiple plans would create cross-plan dependencies that hurt more than they help.
