# Pre-hub baseline — 2026-05-15

GSC snapshot taken **immediately before the Benagil content hub deploys to production**. This is the comparison floor for measuring whether the hub moved the needle.

## What's in this directory

| File | Contents |
|---|---|
| `top-queries-180d.txt` | Top 500 queries, Nov 16 2025 → May 15 2026 |
| `top-queries-90d.txt` | Top 500 queries, Feb 15 → May 15 2026 |
| `top-queries-28d.txt` | Top 500 queries, Apr 17 → May 15 2026 |
| `top-pages-90d.txt` | Top 200 pages, Feb 15 → May 15 2026 |
| `country-breakdown-180d.txt` | Country breakdown, 180d |
| `sitemaps.txt` | GSC sitemap state |
| `cluster-head-positions.md` | The 16 cluster head terms with current pos/clicks/imps, the comparison target |

## State at capture

- **Branch**: `feat/atlantis-content-hub`
- **HEAD**: `fefd9dc` (CL11 "Benagil Cave Tour With Kids")
- **Production tip (origin/master)**: `ebb18fa` (A&Y spa cards reorder)
- **Hub status**: 12 cluster pieces + pillar shipped to branch, **NOT yet on master, NOT yet live**
- **Brand split**: ~92% of organic clicks branded (per `project_atlantis_organic_diagnosis`)
- **DE-locale claim**: retracted (see `project_atlantis_keyword_competitor` rev 2026-05-15)

## How to compare in 6 weeks (target: 2026-06-26)

Re-run the same 7 commands with `--end 2026-06-26`. The bash invocations are:

```bash
DATE=2026-06-26
mkdir -p SEO/research/${DATE}-post-hub-checkpoint

~/.local/bin/gsc top-queries sc-domain:atlantistours.pt --start 2026-03-28 --end ${DATE} --limit 500 > SEO/research/${DATE}-post-hub-checkpoint/top-queries-90d.txt
~/.local/bin/gsc top-queries sc-domain:atlantistours.pt --start 2025-12-28 --end ${DATE} --limit 500 > SEO/research/${DATE}-post-hub-checkpoint/top-queries-180d.txt
~/.local/bin/gsc top-queries sc-domain:atlantistours.pt --start 2026-05-29 --end ${DATE} --limit 500 > SEO/research/${DATE}-post-hub-checkpoint/top-queries-28d.txt
~/.local/bin/gsc top-pages sc-domain:atlantistours.pt --start 2026-03-28 --end ${DATE} --limit 200 > SEO/research/${DATE}-post-hub-checkpoint/top-pages-90d.txt
~/.local/bin/gsc query sc-domain:atlantistours.pt --start 2025-12-28 --end ${DATE} --dims country --limit 20 --order=-impressions > SEO/research/${DATE}-post-hub-checkpoint/country-breakdown-180d.txt
~/.local/bin/gsc sitemaps sc-domain:atlantistours.pt > SEO/research/${DATE}-post-hub-checkpoint/sitemaps.txt
```

## What "the hub worked" looks like

Watch these head terms specifically (from `cluster-head-positions.md`):

| Cluster | Head term | Today | Target |
|---|---|---|---|
| C1 | `benagil cave tour` | pos 34.3 | sub-20 = win, sub-10 = home run |
| C7 | `best time to visit benagil caves` | pos 16.8 | top 10 |
| C7 | `how to visit benagil cave` | not surfacing | start surfacing |
| C8 | `algarve caves` | pos 31.2 | sub-20 |
| C9 | `best time to see dolphins in algarve` | pos 8.5 | page 1 (top 5) |
| C13 | `portimao what to see` | pos 7.5 | hold or improve |

Also watch:
- **Non-brand click volume** (currently ~118/90d per the May 12 diagnosis) — hub should add 30–80
- **New surfacing queries**: pillar/cluster-specific phrases that weren't in top-500 before (e.g., `can you swim in benagil cave`, `benagil with kids`)
- **AI Overview citations**: search the cluster head terms in Google/Perplexity/ChatGPT — hub pages should start appearing in answer panels

## What this baseline does NOT measure

- **Off-page authority lift** — needs separate workstream (`seo-offpage`), not measured by GSC queries alone
- **AI Overview / Perplexity / ChatGPT citations** — track manually (no API)
- **A&Y site** — separate property; A&Y GSC not yet verified (per `reference_gsc_api_setup`)
