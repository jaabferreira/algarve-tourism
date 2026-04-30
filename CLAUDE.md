# Project: Algarve & You / Atlantis Tours

## Domains & Hosting
- Both domains are on Cloudflare Pages
- DNS is already managed by Cloudflare (nameservers: arnold/sloan.ns.cloudflare.com)
- `atlantistours.pt` and `algarveandyou.com` — no nameserver migration needed for domain changes

## Environment
- `dig` is not available — use `curl "https://dns.google/resolve?name=DOMAIN&type=NS"` for DNS lookups

## Atlantis Google Ads project

Active project (started 2026-04-21). Spec, plan, and ready-to-launch assets all live in-repo.

**Key documents:**
- Spec: `docs/superpowers/specs/2026-04-21-atlantis-google-ads-design.md`
- Plan: `docs/superpowers/plans/2026-04-21-atlantis-google-ads.md`
- CEO deck: `docs/presentations/2026-04-21-atlantis-google-ads-ceo-deck.html`
- **Asset folder (start here for any Ads work):** `docs/ads/atlantis/`
  - `00-glossary.md` — terms & definitions
  - `01-keywords/negatives-account.md` — account-wide negative list
  - `02-campaigns/{brand,competitors,benagil,algarve-generic,cranchi-yacht,sail-yacht,reef-fishing}/keywords-and-rsa.md`
  - `03-extensions/all-extensions.md` — sitelinks, callouts, snippets, call/location/image extensions
  - `04-summary.md` — one-page settings summary across all 7 campaigns (original launch plan; current state lives in the changelog)
  - `06-changelog.md` — **journal of every change** to the account (read this for current state, not 04-summary)

**Logging rule:** every time we change anything in the Ads account (via API or UI) — bids, budgets, keywords, ads, extensions — or in adjacent infra (GA4, FH, landing pages) that affects ad performance, append an entry to `06-changelog.md` at the top with date, what, why, expected effect, and verify-on date. The changelog is how we understand cause/effect over time.

**Account facts (locked in):**
- Google Ads customer ID: `922-490-9849` (legal entity P4Y SERVICES, brand Atlantis Tours)
- GA4 measurement ID: `G-YE21ZWJNY7` (also `GT-NBQP4CV5` umbrella tag; user `jose.ferreira.ptm2@gmail.com` lacks edit access on the latter — Phase 2 cleanup)
- Public phone: `+351 969 703 185` (used for `tel:` link in Header + mobile booking bar + Google Ads call extension)
- Operating-since year: **2018** (used in ad copy)
- Call-extension hours: **08:00 – 20:00 Mon-Sun** (Portugal time)
- GBP confirmed (Knowledge Graph ID `/g/11n98drpym`); link via Google Ads → Tools → Linked accounts when working on location extension
- Competitor brands to bid on: Algarve Experience, Dreamwave, Xride, Algarve Discovery, Royal Nautic

**Strategy decisions to remember:**
- Phase 1 = Manual CPC across all 7 campaigns; switch to Smart Bidding only after ≥30 conversions per campaign
- Audience split: 80% in-Algarve last-minute / 20% pre-trip planners (UK/IE/DE/NL/FR/ES)
- +30% bid adjustment on 5 cities: Portimão, Lagoa, Carvoeiro, Lagos, Albufeira (yacht campaigns use +20% — premium audience plans further ahead)
- Search-only campaigns; no Display, no Search Partners, AI Max disabled
- Budgets — Brand €5/day, Competitors €5, Benagil €30, Generic €15, Cranchi €10, Sail €10, Fishing €8 = **€83/day total** (€2,490/mo)
- "Cheap" / "discount" / "boat rental" / "bareboat" deliberately NOT blocked (real bookers use those terms)
- Atlantis takes private yacht bookings for hen/stag/wedding/proposal/ash-scattering — those queries route to yacht charters

**Status as of 2026-04-23:**
- ✅ Phase 0 done (FH→GA4, GA4↔Ads, purchase conversion imported)
- ✅ Landing page fixes deployed (trust strip + per-tour reviews on product pages, `tel:` link in Header + mobile booking bar) — commit `62b34ff`
- ✅ All 9 asset docs written and reviewed by user
- 🔄 Smoke test live: "Brand Atlantis Tours (smoke test)" at €10/day, max CPC €0.50, awaiting ad approval (24h test window)
- ⏳ After smoke test passes: build remaining 6 campaigns in UI step-by-step (Brand full, Competitors, Benagil, Generic, Cranchi, Sail, Fishing)
- ⏳ Target launch: May 1, 2026 at 50% budget; ramp after 14d clean data
- ⏳ €400/€400 Google Ads new-advertiser credit deadline: Jun 21, 2026

**Working style with this user:**
- Prefers step-by-step in chat over delegating to subagents — wants to learn the account
- Walk through Google Ads UI screens click-by-click when building; user shares screenshots
- Push back on numbers when user instinct disagrees; explain the math (e.g. CPA = CPC ÷ conv rate) rather than just changing values
