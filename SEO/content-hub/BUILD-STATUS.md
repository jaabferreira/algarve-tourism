# Benagil content hub — build status & next steps

**Living tracker** for the Benagil content hub (`SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` is the design; this file is "what's done / what's next"). Update the checkboxes as work lands; don't rewrite the architecture doc.

**Current state (2026-05-14):** site-side wiring shipped (PR #2 wiring-complete), pillar rewrite landed (en/pt/es/fr · ~3.5k–4.1k w/locale · 10-Q FAQ · 15 in-body links · skipper byline + data-reveal race fix), **CL2 — "Can You Swim Into the Benagil Cave?" — landed in 4 locales** (~1.1k w/locale · 7 FAQs · featured-snippet target · pillarOrder 0.5), **CL1 — "How to Get to the Benagil Cave (and What's Changed in 2026)" — landed in 4 locales** (~1.7k–2.0k w/locale · 8 FAQs · year-stamped freshness piece · pillarOrder 0 = first in "In this guide"), **and CL3 — "Best Time to Visit the Benagil Caves" — landed in 4 locales** (EN ~1.3k · PT/ES/FR ~1.6–1.7k · 7 FAQs · month-by-month + tide + skylight-geometry piece · pillarOrder 1 · ES+FR created from scratch, EN+PT stubs replaced). Pillar "In this guide" now sorts: CL1 → CL2 → CL3 → CL4 → CL5 → CL6 → CL7 → CL8 → CL9 → CL10. Branch `feat/atlantis-content-hub` pushed; CF Pages rebuilds on push. **Next:** CL6 deepen (the "almost page 1" quick win), then CL5 expand, then the de-dups + light refreshes.

**If you're a fresh agent picking this up, read in this order:**
1. This file (the "what to do next" tracker)
2. `SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` §2 (per-piece scope), §4 (link graph), §5 (pillar/cluster anatomy), §8 (build backlog rationale)
3. `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` (the editorial in-body link inventory — 84 rows)
4. `SEO/research/2026-05-12-atlantis-keyword-map.md` (which queries each piece owns)
5. `docs/superpowers/plans/2026-05-12-atlantis-content-hub-wiring.md` (historical — what shipped, and the post-mortem "Follow-ups" section near the bottom)

Memory pointers (auto-loaded for the operator's Claude sessions): `project_atlantis_keyword_competitor`, `project_atlantis_organic_diagnosis`, `feedback_opus_for_writing` (Opus subagents draft, Sonnet does schema/translation plumbing).

---

## 1. Site-wiring — ✅ shipped (complete)

**Shipped on `feat/atlantis-content-hub`** (PR #2):
- ✅ i18n strings for pillar callout / "In this guide" / FAQ title / "Plan your trip" / "Start here" in en/pt/es/fr
- ✅ `pillarSlug` / `pillarOrder` / `faqs` fields on the blog content schema (`packages/atlantis/src/content/config.ts`)
- ✅ `buildPostBreadcrumb()` shared helper (TDD'd) — `Home › <pillar> › <post>` for cluster posts, `Home › Blog › <pillar>` for the pillar, unchanged otherwise
- ✅ `getTourRelatedGuides(pk)` + `TOUR_GUIDE_PKS` (TDD'd) in `packages/atlantis/src/lib/tour-guides.ts` — keyed by `translationKey` (locale-independent)
- ✅ Shared components: `PillarCallout`, `HubClusterList` ("In this guide"), `FaqBlock` (`<details>` Q&A), `RelatedGuides` (tour-page "Plan your trip" cards)
- ✅ `blog/[slug].astro` rewired — breadcrumb (visible + JSON-LD), pillar/cluster rendering, `FAQPage` JSON-LD when `faqs:` is set
- ✅ `tours/[slug].astro` — "Plan your trip" block on every tour page in every locale (resolves by `translationKey`)
- ✅ Pillar pinned as a "Start here" card on `/blog/`, linked from the homepage (guarded to locales where the translation exists); pillar excluded from the regular post grid on `/blog/` + paginated `/blog/page/N/`
- ✅ 8 existing cluster posts assigned `pillarSlug` (locale-specific) + `pillarOrder` 1–8 in all locales where the translation exists

**Previously-pending follow-ups (all closed in this round):**
- ✅ **Rekey `tour-guides.ts` by `translationKey`** — done. `tours/[slug].astro` now matches `bp.data.translationKey === wantKey` and links to the post's actual localized slug; the "Plan your trip" block renders on `/pt/`, `/es/`, `/fr/` tour pages too.
- ✅ **Exclude the pillar from the regular post grid on `/blog/`** — done in `blog/index.astro` AND `blog/page/[page].astro` so totalPages + page slices line up.
- ✅ **Drop the no-op `.see-all--primary` class** — done. Removed both the class on the homepage link and the duplicate CSS rule. The "Start here →" / "Read the complete guide →" link text already differentiates the CTA from "View all posts →".

---

## 2. Content workstream — the meat (ordered by priority, per architecture §8.B)

Each piece below is one `content-brief-authoring` run → Opus draft → translate → commit. The architecture doc §2 has scope/word-count, §5 has anatomy (TL;DR 150–250w on pillar; 40–60w answer paragraph under each H2; FAQ section with `FAQPage` schema where it fits).

### Pillar — rewrite

- [x] **`benagil-cave-tour-complete-guide`** — ✅ shipped 2026-05-14 (commits `319a175` + `867a2c5`). EN 3,578w · PT 4,046w · ES 4,088w · FR 4,129w. 14 H2s · 10-Q FAQ block with `FAQPage` JSON-LD · TL;DR (~220w) · skipper byline (Nuno Albino) · 15 in-body links · brief at `SEO/content-hub/briefs/pillar-benagil-cave-tour-complete-guide-brief.md`.

### Phase 1 clusters — the highest-leverage pieces (order matters)

- [x] **CL2 — "Can You Swim Into the Benagil Cave?"** — ✅ shipped 2026-05-14. EN/PT/ES/FR · ~1.1k words/locale · 7 FAQs (FAQPage JSON-LD) · 7 H2s · 5 in-body links · skipper byline (Nuno Albino) · pillarOrder: 0 (sorts top of pillar "In this guide") · brief at `SEO/content-hub/briefs/cluster-can-you-swim-benagil-cave-brief.md`. **Note:** lateral link to CL1 (`how-to-visit-benagil-cave`) is intentionally drafted with the target slug now — will 404 until CL1 ships next.

- [x] **CL1 — "How to Get to the Benagil Cave (and What's Changed in 2026)"** — ✅ shipped 2026-05-14. EN ~1.7k · PT ~1.9k · ES ~2.0k · FR ~2.0k · 8 FAQs (FAQPage JSON-LD) · 11 H2s (10 body + closing) · 4 in-body links · year-stamped freshness piece · skipper byline (Nuno Albino) · pillarOrder: 0 (first in pillar's "In this guide") · brief at `SEO/content-hub/briefs/cluster-how-to-visit-benagil-cave-brief.md`. Lateral CL1↔CL2 link graph now closed in all 4 locales (CL2's brief-acceptable 404 is resolved).

- [x] **CL3 — "Best Time to Visit the Benagil Caves"** — ✅ shipped 2026-05-14. EN ~1.3k · PT ~1.6k · ES ~1.7k · FR ~1.7k · 7 FAQs (FAQPage JSON-LD) · 7 content H2s + 1 closing H2 · month-by-month comparison table (April–September H3s + Oct–March prose) · 4 in-body links (pillar↑ lede, commercial speedboat in H2 #7, pillar↑ closing, CL4 lateral in closing) · skipper byline (Nuno Albino) · pillarOrder: 1 (third in pillar's "In this guide" after CL1 · CL2) · ES+FR created from scratch (slugs `mejor-epoca-visitar-cuevas-benagil` and `meilleure-periode-visiter-grottes-benagil`); EN+PT stubs replaced · `seasonality` tag added · brief at `SEO/content-hub/briefs/cluster-best-time-visit-benagil-caves-brief.md`. Skylight-term convention fix applied across PT/ES/FR (translator's `claraboia/claraboya` → pillar's established `abertura/ouverture`). De-dup rule: CL3 owns "best time to visit Benagil"; CL4 must defer (architecture §2).

- [ ] **CL6 refresh — `dolphin-watching-algarve-species-seasons`** — DEEPEN (the "almost page 1" quick win; already ~pos 7–12)
  - Files: 4 locales already exist + already have `pillarSlug`/`pillarOrder: 4` ✅
  - Add: species table · month-by-month sighting chart · stronger ethical-operator section · FAQ section (`faqs:`)
  - In-body links per CSV § "CL6"

- [ ] **CL5 refresh — `benagil-vs-other-sea-caves-algarve`** — EXPAND
  - Files: 4 locales already exist + already have `pillarSlug`/`pillarOrder: 3` ✅
  - Add: Alvor / Ria de Alvor section (ties to the Benagil+Alvor product, keyword cluster C6) · comparison table with `ItemList` schema
  - In-body links per CSV § "CL5"

### Phase 1 de-dup edits

- [ ] **CL4 / CL9 de-dup** — trim Benagil-specific overlap; wire down-links to CL3
  - `best-time-visit-algarve-boat-tours` (CL4, pillarOrder: 2 ✅) — broad timing, link DOWN to CL3 for the cave detail
  - `algarve-in-spring-best-kept-secret` (CL9, pillarOrder: 7 ✅) — defer month-grid to CL4
  - Files: 4 locales each (en/pt/es/fr — all exist for both)
  - In-body links per CSV § "CL4" + "CL9"

### Phase 1 light refreshes (mostly link-graph updates)

- [ ] **CL7 — `marine-life-algarve-coast-spotters-guide`** — light refresh; add bottom-up pillar callout + in-body tour link + lateral CL6/CL7 distinction
- [ ] **CL8 — `what-to-pack-algarve-boat-tour`** — light refresh; year bump; bottom-up pillar callout + lateral links per §4
- [ ] **CL10 — `sunset-cruises-algarve-summer-guide`** — light refresh; bottom-up pillar callout + lateral links per §4
- [ ] **Fishing satellite trio** (`reef-fishing-algarve-what-to-expect`, `reef-fishing-portimao-half-day-guide`, `fishing-traditions-algarve-coast`) — light refresh; the lateral links *between* the three; loose link in from the pillar's "other ways to experience this coast" section
- [ ] **Cuisine standalone** (`portuguese-coastal-cuisine-algarve`) — one link in from the pillar's "after the tour" section; that's enough

(All Phase 1 light-refresh files already exist in 4 locales and don't need `pillarSlug` changes — fishing/cuisine are NOT clusters of this hub.)

### Phase 2

- [ ] **CL11 — "Benagil Cave Tour With Kids: A Family Guide"** — NEW, ~1,200w
  - Slug (EN): `benagil-cave-tour-with-kids` · localized for pt/es/fr
  - Files: 4 new files
  - Frontmatter:
    ```yaml
    pillarSlug: <locale-specific>
    pillarOrder: 9   # sorts after the existing 1–8
    translationKey: benagil-with-kids
    ```
  - "Is benagil cave tour suitable for children / babies / non-swimmers" · life-jacket policy · which tour · what they'll love
  - Strong `faqs:` candidate · skipper byline · in-body links per CSV § "CL11"

### Phase 3 / future (only when GSC shows demand)

- [ ] CL12-slot facets: "Benagil cave photography & the skylight" · "Where to stay near Benagil" · "Benagil cave by yacht: the private option" (bridges to keyword cluster C3)
- [ ] **"Things to Do in Portimão"** — NEW ~2,000w local hub page, keyword cluster C13 (its own small hub, linked from the pillar — separate scope, lower priority)

### Cross-cutting tasks (do alongside the pieces)

- [ ] **Add `faqs:` frontmatter** to: pillar + CL2 + CL1 + CL6 (refresh) + CL5 (refresh) + CL11 — the pieces where Q&A is the dominant mode. This lights up the `FAQPage` JSON-LD + the visible `<details>` FAQ block (both already wired; both render nothing until `faqs:` is populated). Shape per piece:
  ```yaml
  faqs:
    - question: "Can you swim into the Benagil cave from a boat tour?"
      answer: "No — since the 2023 rules…"
    - question: "..."
      answer: "..."
  ```
- [ ] **In-body cross-links** — walk `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` and add the editorial links flagged "Status: planned" inside each piece's body as it's rewritten. The structural links (pillar/cluster breadcrumbs, "In this guide" list, "Plan your trip" tour block, "Part of our complete guide" callout) are already wired — this is just the in-paragraph links the writer weaves into prose.

---

## 3. Strategic follow-ups (separate workstreams — not blocked by the hub)

These run in parallel; the hub on its own doesn't win the head terms.

- [ ] **`seo-offpage`** — directory / award-program / operator-profile / partner-link target list (use the link sources the competitor analysis identified). The diagnosis ([`project_atlantis_organic_diagnosis`](file:///home/jferreira/.claude/projects/-home-jferreira-Work-projects-algarve-and-you-new/memory/project_atlantis_organic_diagnosis.md)) named this as the highest-leverage un-run play. "Benagil cave tour" doesn't move off page 3–4 without it.
- [ ] **German `de` locale** (`internationalization` skill) — biggest measured non-brand demand (`bootstour portimao` = 1,639 GSC impressions/90d at avg pos 4.8) with no `de` site to convert it. Every operator competitor (carvoeirocaves, benagilexpress, algarexperience) serves German. See [`project_atlantis_keyword_competitor`](file:///home/jferreira/.claude/projects/-home-jferreira-Work-projects-algarve-and-you-new/memory/project_atlantis_keyword_competitor.md). Scope as its own spec/plan.
- [ ] **`/benagil-cave-guide/` URL migration** — deliberately **deferred** (architecture doc §3). Migration risk on a young site > URL-signal gain today. Revisit in ~12 months when domain age + authority make the consolidation worth the risk.

---

## 4. The locale-specific `pillarSlug` rule (read this before assigning frontmatter)

`blog/[slug].astro` resolves a post's pillar by `allPosts.find(p => p.data.locale === locale && p.slug.replace(\`${p.data.locale}/\`, "") === post.data.pillarSlug)`. Because blog posts have **localized slugs**, `pillarSlug` must be the bare slug of the pillar **in that locale**:

| Locale | `pillarSlug` value | Pillar file |
|---|---|---|
| `en` | `benagil-cave-tour-complete-guide` | `packages/atlantis/src/content/blog/en/benagil-cave-tour-complete-guide.md` |
| `pt` | `guia-completo-gruta-benagil` | `packages/atlantis/src/content/blog/pt/guia-completo-gruta-benagil.md` |
| `es` | `guia-completo-cueva-benagil` | `packages/atlantis/src/content/blog/es/guia-completo-cueva-benagil.md` |
| `fr` | `guide-complet-grotte-benagil` | `packages/atlantis/src/content/blog/fr/guide-complet-grotte-benagil.md` |

`pillarOrder` is locale-independent (an integer; smaller sorts first; unset → last). Suggested values:
- `0` — for CL1 ("how to visit") and CL2 ("can you swim") so they sort to the top of "In this guide"
- `1–8` — already assigned to the 8 existing Phase-1 clusters (see architecture §2)
- `9` — CL11 ("with kids")

---

## 5. Maintenance

- [ ] **Quarterly:** audit `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` for broken links / anchor drift / missing connections (architecture §7)
- [ ] **Annual (Jan/Feb):** pillar refresh — bump "2026"→"…", recheck SERP, update access rules + prices, refresh cluster callouts (architecture §7)
- [ ] **Owner:** José (durable single owner across a multi-year horizon — drafting can be delegated to Opus subagents per `feedback_opus_for_writing`; *ownership of what gets refreshed/added* stays with one person)

---

## 6. After it ships — verification

- On/after **~6 weeks post-pillar-launch**: re-check GSC positions on the cluster head queries (`benagil cave tour`, `best time to see dolphins in algarve`, `can you swim in benagil cave`, `algarve sunset cruise`, etc.) using `gsc top-queries sc-domain:atlantistours.pt --days 90 --limit 250`. Compare to the pre-launch baseline in `SEO/research/2026-05-12-atlantis-keywords.csv`.
- **Won't move on its own**: the head term "benagil cave tour" (page 3–4 to page 1) needs the `seo-offpage` work in parallel. The hub creates the page worth ranking; off-page authority gets it ranked.
