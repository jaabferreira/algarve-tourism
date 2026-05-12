# Atlantis Tours — Google Ads account

Paid-search account for **Atlantis Tours** (boat tours, Algarve). Project started 2026-04-21. Read `GoogleAds/CLAUDE.md` first for the **logging rule** and data-access details; this file is the account-specific reference.

**For current state, read `06-changelog.md` (top entry) — not this file, not `04-summary.md`.** The changelog is the source of truth for which campaigns are live, budgets, bids, and what changed when. (As of the last changelog entry the account had been restructured down to 3 enabled campaigns; check there for the live numbers.)

## Account facts (durable)

| | |
|---|---|
| Google Ads customer ID | `922-490-9849` (legal entity P4Y SERVICES; brand Atlantis Tours) — pass as `9224909849` to the API |
| MCC manager account | `878-501-7254` |
| GA4 measurement ID | `G-YE21ZWJNY7` (umbrella tag `GT-NBQP4CV5`; `jose.ferreira.ptm2@gmail.com` lacks edit access on the umbrella — Phase 2 cleanup) |
| GA4 property (Data API) | `533736679` |
| Public phone | `+351 969 703 185` — `tel:` link in site Header + mobile booking bar + Google Ads call extension |
| Call-extension hours | 08:00 – 20:00 Mon–Sun (Portugal time) |
| Operating since | 2018 (used in ad copy) |
| Google Business Profile | confirmed (Knowledge Graph ID `/g/11n98drpym`); link via Google Ads → Tools → Linked accounts for the location extension |
| Landing pages | the 4 tour pages under `atlantistours.pt/<locale>/tours/<slug>/` (Benagil speedboat, private Benagil yacht, private sail yacht, reef fishing) |
| Competitor brands bid on | Algarve Experience, Dreamwave, Xride, Algarve Discovery, Royal Nautic |
| Google Ads new-advertiser credit | €400 / €400 — deadline Jun 21, 2026 |

## Strategy decisions (the original launch plan — see changelog for what's actually live now)

- Phase 1 = **Manual CPC** across all campaigns; switch to Smart Bidding only after ≥30 conversions per campaign.
- Audience split: 80% in-Algarve last-minute / 20% pre-trip planners (UK / IE / DE / NL / FR / ES).
- +30% bid adjustment on 5 cities: Portimão, Lagoa, Carvoeiro, Lagos, Albufeira (yacht campaigns use +20% — premium audience plans further ahead).
- Search-only campaigns; no Display, no Search Partners, AI Max disabled.
- Launch-plan budgets — Brand €5/day · Competitors €5 · Benagil €30 · Algarve Generic €15 · Cranchi Yacht €10 · Sail Yacht €10 · Reef Fishing €8 = **€83/day** (€2,490/mo). *(Restructured since — see changelog.)*
- "Cheap" / "discount" / "boat rental" / "bareboat" are deliberately **not** blocked (real bookers use those terms).
- Atlantis takes private-yacht bookings for hen/stag/wedding/proposal/ash-scattering — those queries route to the yacht charters.

## Documents in this folder

| File | What it is |
|---|---|
| `spec.md` | Original design doc (was `docs/superpowers/specs/2026-04-21-atlantis-google-ads-design.md`) — 14 sections: decisions, phasing, targeting, monitoring, risks. |
| `plan.md` | Original implementation plan (was `docs/superpowers/plans/2026-04-21-atlantis-google-ads.md`) — task-by-task, `[JOSÉ]` vs `[CLAUDE]` labels. Historical: some referenced files (`00-launch-checklist.md`, `02-ad-copy/`, `04-monitoring/`, `05-phase2/`) were never created — the asset folder shipped in the consolidated shape below. |
| `ceo-deck.html` | CEO presentation deck (was `docs/presentations/2026-04-21-atlantis-google-ads-ceo-deck.html`). |
| `01-keywords/negatives-account.md` | Account-wide negative keyword list. |
| `02-campaigns/{brand,competitors,benagil,algarve-generic,cranchi-yacht,sail-yacht,reef-fishing}/keywords-and-rsa.md` | Per-campaign keyword lists + responsive search ad copy. |
| `03-extensions/all-extensions.md` | Sitelinks, callouts, structured snippets, call / location / image extensions — shared across the whole account. |
| `04-summary.md` | One-page settings summary across the 7 launch campaigns. **Original launch plan only — current state is in the changelog.** |
| `05-bulk-uploads/<campaign>/*.csv` | Google Ads Editor import CSVs (campaign / ad-groups / keywords / negatives / RSAs) per campaign, plus `brand-fix/`. |
| `06-changelog.md` | **Journal of every account change.** Read the top entry for current state. Append here (at the top) on every change per the logging rule in `GoogleAds/CLAUDE.md`. |
