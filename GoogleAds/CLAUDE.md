# Google Ads workspace

This folder is the home for **paid-search work** — separate from `SEO/` (organic) and `packages/` / `docs/superpowers/` (development). One subfolder per Google Ads account; everything for an account lives under it.

```
GoogleAds/
  CLAUDE.md            ← you are here: shared conventions, logging rule, data access
  atlantis/            ← Atlantis Tours account (customer 922-490-9849)
    README.md          ← account facts, strategy, doc index — start here for Atlantis work
    spec.md            ← original design doc (2026-04-21)
    plan.md            ← original implementation plan (2026-04-21)
    ceo-deck.html      ← CEO presentation deck (2026-04-21)
    01-keywords/       ← account-wide negatives
    02-campaigns/      ← per-campaign keywords + RSA copy (7 campaigns)
    03-extensions/     ← sitelinks, callouts, snippets, call/location/image extensions (shared across the account)
    04-summary.md      ← one-page settings summary (original launch plan; current state lives in the changelog)
    05-bulk-uploads/   ← Google Ads Editor CSVs per campaign
    06-changelog.md    ← journal of every account change — the source of truth for current state
  (algarveandyou/ — future, if/when that brand runs paid search)
```

## ⚠️ Logging rule (the important one)

Every time we change anything in a Google Ads account — bids, budgets, keywords, ads, extensions, campaign status — **or** in adjacent infra (GA4, FareHarbor, landing pages) that affects ad performance, **append an entry to that account's `06-changelog.md` at the top** with: date · what changed · why · expected effect · verify-on date. The changelog is how we understand cause/effect over time, so it must be the single source of truth — don't duplicate "current state" into other files; point at the changelog instead.

This applies to changes made via the API, the Google Ads UI, or the Ads Editor — and it applies when a *site* change is also a landing-page change (meta, redirects, schema, page speed on a tour page that's an ad destination).

## Data / access status

- **Google Ads API: available.** MCC manager `878-501-7254`; query Atlantis as customer id `9224909849` (no dashes). Cost values come back in micros — divide by 1,000,000 for EUR.
  - **MCP server** `google-ads` (read-only): `mcp__google-ads__search` for GAQL, plus `list_accessible_customers`, `get_resource_metadata`. Config in `.mcp.json` at the repo root (gitignored — Claude Code only reads `.mcp.json` from the project root, so it stays there, not here).
  - **Direct Python** (reads *and* writes): `~/.local/share/google-ads-mcp/venv/bin/python` with `GoogleAdsClient.load_from_storage("~/.google-ads.yaml")`. Use this for mutations (negatives, budget/bid changes, pausing campaigns).
  - **OAuth token expiry:** the consent screen is in "testing" mode, so the shared refresh token (Ads + GA4) dies after ~7 days with `invalid_grant`. Fix: run `~/.local/share/ga4-data/venv/bin/python ~/.local/share/ga4-data/reauth.py` in a real terminal (not via Claude Code's `!`) — one browser consent re-mints all three credential files.
  - Full detail: memory `reference_google_ads_api_setup`.
- **GA4: available** via the `ga4` CLI (`~/.local/bin/ga4`), property `533736679`, Atlantis measurement ID `G-YE21ZWJNY7`. See memory `reference_ga4_data_api_setup`. Note: pre-2026-04-30 conversion data is unreliable (the unwanted-referrals fix — memory `project_atlantis_ads_attribution_fix`).
- **Google Search Console: not wired up yet** (would feed `seo-keyword` and rankings work — same query universe as the Ads keyword corpus).

## Working style with this user

- Prefers step-by-step in chat over delegating to subagents — wants to learn the account.
- Walk through Google Ads UI screens click-by-click when building; the user shares screenshots.
- Push back on numbers when the user's instinct disagrees; explain the math (e.g. CPA = CPC ÷ conv rate) rather than just changing values.

## How this folder relates to the rest of the repo

- **`.mcp.json`** (repo root, gitignored) — the `google-ads` MCP server registration. Must stay at the root.
- **Credentials** — `~/.google-ads.yaml`, `~/.google-ads-adc.json` live in your home dir (chmod 0600, never committed); not in this repo.
- **Ads/SEO skills** — `paid-media-strategy`, `ads-performance-analytics`, `ads-creative-development`, and the `seo-*` skills live in `.claude/skills/` (tooling, not project data).
- **The keyword corpus** (`atlantis/02-campaigns/*/keywords-and-rsa.md`) is also the starting universe for `seo-keyword` — same query set feeds both paid and organic. See `SEO/README.md`.
- **Site code** that affects paid (GA4 tag, conversion wiring, tour landing pages) lives in `packages/` — when you change it, log it here per the rule above.

## Related memory (`~/.claude/projects/.../memory/`)

- `project_atlantis_ads_launched` — current campaign state (as of the date stamped there): which campaigns are enabled/paused, budgets, diagnosis, next-verify date.
- `project_atlantis_ads_attribution_fix` — GA4 unwanted-referrals fix (2026-04-30); pre-2026-04-30 conversion data unreliable.
- `reference_google_ads_api_setup` — customer IDs, credential paths, MCP install, token-reauth procedure.
- `reference_ga4_data_api_setup` — GA4 Data API + `ga4` CLI (use for all real-user / CWV work).
- `project_atlantis_cls_investigation`, `project_missing_reviews` — landing-page-quality items that affect Quality Score.
