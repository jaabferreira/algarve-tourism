# Project: Algarve & You / Atlantis Tours

## Domains & Hosting
- Both domains are on Cloudflare Pages
- DNS is already managed by Cloudflare (nameservers: arnold/sloan.ns.cloudflare.com)
- `atlantistours.pt` and `algarveandyou.com` — no nameserver migration needed for domain changes

## Environment
- `dig` is not available — use `curl "https://dns.google/resolve?name=DOMAIN&type=NS"` for DNS lookups

## Workspaces

The repo root keeps three areas separate on purpose:
- `packages/` + `docs/superpowers/` — **development** (the two Astro sites, plans/specs).
- `SEO/` — **organic search** work; `SEO/README.md` is the hub.
- `GoogleAds/` — **paid search** work; `GoogleAds/CLAUDE.md` is the hub (auto-loaded when working in that subtree), `GoogleAds/atlantis/README.md` has the Atlantis account facts/strategy, and `GoogleAds/atlantis/` holds the assets, spec, plan, deck, and changelog. (Moved here 2026-05-12 — previously `docs/ads/atlantis/`.)

**Google Ads logging rule:** whenever anything in a Google Ads account changes — or in adjacent infra (GA4, FareHarbor, landing pages) that affects ad performance — append an entry at the top of `GoogleAds/atlantis/06-changelog.md` (date · what · why · expected effect · verify-on date). That changelog is the source of truth for the account's current state. Full details in `GoogleAds/CLAUDE.md`.
