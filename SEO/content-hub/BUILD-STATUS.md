# Benagil content hub — build status & next steps

**Living tracker** for the Benagil content hub (`SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` is the design; this file is "what's done / what's next"). Update the checkboxes as work lands; don't rewrite the architecture doc.

**Current state (2026-05-15):** site-side wiring shipped (PR #2 wiring-complete), pillar rewrite landed (en/pt/es/fr · ~3.5k–4.1k w/locale · 10-Q FAQ · 15 in-body links · skipper byline + data-reveal race fix), **CL2 — "Can You Swim Into the Benagil Cave?" — landed in 4 locales** (~1.1k w/locale · 7 FAQs · featured-snippet target · pillarOrder 0.5), **CL1 — "How to Get to the Benagil Cave (and What's Changed in 2026)" — landed in 4 locales** (~1.7k–2.0k w/locale · 8 FAQs · year-stamped freshness piece · pillarOrder 0 = first in "In this guide"), **CL3 — "Best Time to Visit the Benagil Caves" — landed in 4 locales** (EN ~1.3k · PT/ES/FR ~1.6–1.7k · 7 FAQs · month-by-month + tide + skylight-geometry piece · pillarOrder 1 · ES+FR created from scratch, EN+PT stubs replaced), **CL6 — "Dolphin Watching in the Algarve" — DEEPENED in 4 locales** (EN ~1.7k body / PT-ES-FR ~1.9-2.1k incl. tables · 7 FAQs · species + 12-row monthly sighting table · Decreto-Lei 9/2006 ethical-operator section · skipper byline upgrade · pillarOrder 4 unchanged), **CL5 — "Benagil vs the Other Sea Caves of the Algarve" — DEEPENED in 4 locales** (EN ~1.5k / PT 2.0k / ES 2.1k / FR 2.1k · 7 FAQs · 6-row comparison table with inline `ItemList` JSON-LD · expanded Ria de Alvor section · org byline · pillarOrder 3 unchanged), **+ stale tour-slug sweep across 18 blog files** (`cranchi-yacht-cruise-*` → `private-yacht-cruise-*`; `luxury-sail-yacht-cruise` → `private-sail-yacht-cruise` for EN/ES/FR; `cranchi-yacht-cruise-ate-as-grutas-de-benagil` → `iate-privado-para-as-grutas-de-benagil` for PT — PT `luxuoso-iate-a-vela` stays canonical), **and CL4 + CL9 de-dup edits applied in 4 locales each** (CL4 trims Benagil-cave-specific overlap, adds CL3 down-link for cave-specific timing, pillar↑ in lede + closing; CL9 collapses 4-bullet "Boat Tours in Spring" list into prose + CL4 down-link + CL10 lateral, pillar↑ in lede + closing; both date-bumped to 2026-05-15). Pillar "In this guide" now sorts: CL1 → CL2 → CL3 → CL4 → CL5 → CL6 → CL7 → CL8 → CL9 → CL10. Branch `feat/atlantis-content-hub` pushed; CF Pages rebuilds on push. **Phase 1 light refreshes shipped 2026-05-15 (16 files):** CL7 (`marine-life-algarve-coast-spotters-guide` × en/pt/es/fr) date-bumped + pillar↑ in lede & closing; CL8 (`what-to-pack-algarve-boat-tour` × 4) date-bumped + pillar↑ in lede & closing; CL10 (`sunset-cruises-algarve-summer-guide` × 4) date-bumped + pillar↑ in lede & closing + CL9 spring-lateral ("why spring evenings are best"); fishing-traditions (`fishing-traditions-algarve-coast` × 4) date-bumped + 2 lateral links inserted in "Keep Exploring" to close the fishing-trio 3-way interlinks (architecture §4c). Cuisine standalone left untouched — pillar already links to it from the "after the tour" section (architecture §4a confirms one loose link is the design). Pillar PT/ES/FR orphan-link slots verified intact. **Phase 1 complete. Phase 2 complete (CL11 shipped 2026-05-15).** **Next:** Phase 3 facets are demand-gated (wait for GSC signals on `benagil cave photography skylight` · `where to stay near benagil` · `benagil cave by yacht`), and the standalone "Things to Do in Portimão" hub is its own scope. The unblocked work now is `seo-offpage` — the singular #1 workstream (highest-leverage un-run play; the hub alone won't move "benagil cave tour" off page 3–4 without off-page authority). The DE-locale recommendation has been **retracted (2026-05-15)** after data review: the 1,639 imps/90d figure on `bootstour portimao` was a Feb 20–23 Discovery-style trending burst (1,301 imps in 4 days at 0.15% CTR), not sustained intent. Sustained non-brand DE demand is ~30 imps/90d at pos 17–84 with zero clicks. Every non-PT locale (FRA, USA, GBR, DEU) shows the same brand-heavy + Discovery-burst pattern, which is the low-authority young-site signature, not the missing-locale signature → off-page benefits all 7 existing locales simultaneously. Reframe Phase 3 around US English (`benagil cave tour` from USA at pos 55.4) instead. Full retraction in `~/.claude/.../memory/project_atlantis_keyword_competitor.md`. **Follow-up housekeeping (caught during cleanup):** the orphan `atlantistours.slug-redirects.json` declares EN-locale renames but no consumer code; `packages/atlantis/public/_redirects` has one stale cross-locale rule. CL8 + fishing-traditions are *currently* `author: Atlantis Tours` (EN + all translations consistent) but architecture §5b specifies they should be `Nuno Albino` (skipper byline reserved for experiential/practical pieces); fixing the byline gap is a separate workstream. All deferrable; none block Phase 2.

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

- [x] **CL6 — "Dolphin Watching in the Algarve: Species, Seasons, and Ethical Tours"** — ✅ DEEPENED 2026-05-15. EN body ~1.7k · PT/ES/FR ~1.9-2.1k bodies (incl. tables) · 7 FAQs (FAQPage JSON-LD) · 10 H2s · 5 in-body link placements (pillar↑ lede + closing, CL7 lateral, speedboat mid-body + closing) · skipper byline switched Atlantis Tours → Nuno Albino · pillarOrder: 4 unchanged · brief at `SEO/content-hub/briefs/cluster-dolphin-watching-algarve-deepen-brief.md`. **Added in this deepen:** species comparison table (3 rows × 6 cols) · 12-row month-by-month sighting chart (calm-morning bands: Jan/Feb/Dec ~25%, Jul/Aug ~85%, full year confirmed by operator) · expanded ethical-operator section anchored on **Decreto-Lei n.º 9/2006** (ICNF licensing, Polícia Marítima enforcement, 100m/3-vessel cap, €3,740/€40,000 fines) · new "Beyond Dolphins" H2 with CL7 lateral · "From the Wheelhouse" rename of closing H2. **Defects fixed:** byline upgraded · date 2026-04-16 → 2026-05-15 · imageAlt "Alvor lagoon" hallucination removed (Atlantis doesn't sail in Alvor lagoon) · `/contact/` link dropped · `seasonality` tag added · `faqs:` frontmatter populated. Skylight-term convention fix applied across PT/ES/FR (translator's `claraboia/claraboya/puits de lumière` → hub's established `abertura/abertura/l'ouverture` in FAQ #6).

- [x] **CL5 — "Benagil vs the Other Sea Caves of the Algarve"** — ✅ DEEPENED 2026-05-15. EN ~1.5k body / PT 2.0k / ES 2.1k / FR 2.1k · 7 FAQs (FAQPage JSON-LD) · 10 H2s (incl. NEW "Algarve sea caves at a glance" comparison-table H2 + NEW "Common questions" H2 + EXPANDED/RENAMED "Ria de Alvor: The Quiet Alternative" H2 from the old 2-paragraph "Pontal and Alvor Lagoon Arches") · 6-row comparison table with inline `<script type="application/ld+json">` `ItemList` schema (6 `TouristAttraction` items: Algar de Benagil, Praia da Marinha, Praia do Carvalho, Corredoura+Mesquita lumped, Capela+Arcos lumped, Ria de Alvor flagged "not a sea cave") · 6 in-body link placements (pillar↑ lede + closing, CL6 lateral "dolphins you pass on the way", speedboat in decision matrix, Cranchi in Corredoura H2 + decision matrix, soft pillar mention in Common-questions lead-in) · `Atlantis Tours` org byline preserved per architecture §5b (NOT switched to Nuno like CL3/CL6 — comparison-style piece intentionally org-bylined) · pillarOrder: 3 unchanged · `comparison` tag added · brief at `SEO/content-hub/briefs/cluster-benagil-vs-other-caves-deepen-brief.md`. **Load-bearing factual fix carried across all 4 locales:** the pre-deepen drafts all claimed dolphins "routinely follow small boats into the Alvor lagoon" — unsupported by sources (Ramsar RSIS, EUNIS, first-nature.com, walkalgarve, responsibletravel, Penina Hotel). Brief author verified the actual pattern (dolphins in **Atlantic off Alvor** open coast; kayak/canoe/SUP inside the estuary) and the deepen tempers the claim across en/pt/es/fr. Skylight-term convention applied clean (PT/ES `abertura` · FR `l'ouverture`; zero `claraboia/claraboya/puits de lumière/claire-voie` drift). `relatedTourSlugs` updated to post-rename canonical Cranchi slugs (EN/ES/FR: `private-yacht-cruise-to-the-benagil-caves`; PT: `iate-privado-para-as-grutas-de-benagil`).

### Phase 1 de-dup edits

- [x] **CL4 / CL9 de-dup** — ✅ shipped 2026-05-15. Surgical edits applied across 8 files (CL4 + CL9 × en/pt/es/fr). **CL4 changes:** lede pillar↑ link added; May section "All Benagil cave tours run daily" trimmed to generic "all boat operators are at full schedule" (removes the cave-specific anchor + the inline `benagil-caves-speed-boat-tour` link); July section "Benagil cave fills up from 10:00 onward" trimmed to generic "tours fill from mid-morning onward" + NEW CL3 down-link "For Benagil-specific timing (which hour the sunbeam lands, peak crowd times for the cave chamber itself), see [the best time to visit the Benagil cave](.../best-time-visit-benagil-caves/)"; August section "Marinha-to-Benagil main strip" trimmed to generic "main strip"; closing pillar↑ link added; date bumped 2026-04-16 → 2026-05-15. **CL9 changes:** lede pillar↑ link added; "Boat Tours in Spring" 4-bullet list collapsed into a 2-paragraph prose section that keeps the spring-unique points (morning reliability · dolphin pickup from mid-April · empty cave chamber) but defers month-grid logistics to CL4 via new lateral "For the full month-by-month picture (sea temperatures, booking windows, which tours run when), see our [broader Algarve boat-tour calendar](.../best-time-visit-algarve-boat-tours/) — spring is one chapter in a year-round view"; new CL10 lateral added after the sail-yacht paragraph: "For evenings, an early-season [sunset cruise](.../sunset-cruises-algarve-summer-guide/) is the spring counterpart of the August classic — same sky, half the crowds"; closing pillar↑ link added; date bumped. **Both pieces:** `author: Atlantis Tours` preserved (architecture §5b — comparison + seasonal pieces stay org-bylined); `pillarOrder` unchanged (CL4=2, CL9=7); no `faqs:` added (per architecture §5b, FAQ block reserved for CL1/CL2/CL3/CL5/CL6). Verified in dist: each of the 8 pages emits 5 pillar links + 1 CL3 down-link (CL4) or 1 CL4 down-link + 1 CL10 lateral (CL9); zero stale Cranchi/luxury-sail slug references.

### Phase 1 light refreshes (mostly link-graph updates) — ✅ all shipped 2026-05-15

- [x] **CL7 — `marine-life-algarve-coast-spotters-guide`** — ✅ shipped. Date 2026-04-16 → 2026-05-15; in-body pillar↑ link added in lede ("this piece is the wildlife sibling") and in closing ("the hub piece"). CL6↔CL7 lateral was already in place at line 29 ("we've covered the three resident species in detail in our [dolphin-watching guide]…") — no change needed. Tour links (speedboat + reef-fishing) already in place.
- [x] **CL8 — `what-to-pack-algarve-boat-tour`** — ✅ shipped. Date bump; pillar↑ in lede ("the practical-kit companion") + closing ("the hub piece"). All 4 tour links (speedboat + private-sail-yacht-cruise + private-yacht-cruise-to-the-benagil-caves + reef-fishing-tour) already wired in `relatedTourSlugs` post-rename sweep.
- [x] **CL10 — `sunset-cruises-algarve-summer-guide`** — ✅ shipped. Date bump; pillar↑ in lede ("the evening counterpart") + closing ("the hub piece"); NEW CL9 lateral after the "June and early July are the peak sunset months" paragraph ("And for the underrated shoulder season, [why spring evenings are best] covers the spring sunset case in full") — closes the CL9↔CL10 bidirectional pair (CL9→CL10 lateral landed in the CL9 de-dup commit `2f79e80`).
- [x] **Fishing satellite trio** (`reef-fishing-algarve-what-to-expect`, `reef-fishing-portimao-half-day-guide`, `fishing-traditions-algarve-coast`) — ✅ shipped. **Pre-existing state:** `reef-fishing-algarve-what-to-expect` ↔ `reef-fishing-portimao-half-day-guide` already interlinked; `reef-fishing-algarve-what-to-expect` → `fishing-traditions-algarve-coast` already linked. **This round:** `fishing-traditions-algarve-coast` got the missing back-links to the other 2 fishing posts added in "Keep Exploring" H2 across en/pt/es/fr (per architecture §4c "fishing trio interlinked three ways"). Date bumped. Loose pillar→fishing link already in pillar's "other ways to experience this coast" section (line 172 EN, mirrored in PT/ES/FR pillar).
- [x] **Cuisine standalone** (`portuguese-coastal-cuisine-algarve`) — ✅ no edits needed; pillar→cuisine link already in place at pillar line 172 (and PT/ES/FR mirrors). Architecture §4a explicitly says "one link in from pillar's 'after the tour' section; that's enough."

(All Phase 1 light-refresh files already exist in 4 locales and don't need `pillarSlug` changes — fishing/cuisine are NOT clusters of this hub.)

### Phase 2

- [x] **CL11 — "Benagil Cave Tour With Kids: A Family Guide"** — ✅ shipped 2026-05-15. EN body ~1,470w / PT 1,754w / ES 1,777w / FR 1,845w · 8 FAQs (FAQPage JSON-LD) · 10 H2s · 5-row decision-matrix table (under-2 · 3–4 · 5–7 · 8–11 · 12+) · 6 in-body links (pillar↑ lede + closing, CL2 swim/2023-rule lateral, CL3 best-time lateral, CL8 packing lateral, speedboat tour CTA) · skipper byline (Nuno Albino) · pillarOrder: 9 · brief at `SEO/content-hub/briefs/cluster-benagil-cave-tour-with-kids-brief.md` (13.8k words, 16 sections). Slugs: en `benagil-cave-tour-with-kids` · pt `passeio-gruta-benagil-com-criancas` · es `tour-cueva-benagil-con-ninos` · fr `tour-grotte-benagil-avec-enfants` · `translationKey: benagil-with-kids` · `tags: [benagil, caves, family, travel-tips]` · `relatedTourSlugs: [speedboat, sail-yacht, Cranchi]` (locale-correct slugs per file). **Load-bearing operator override applied across the ship:** Atlantis has NO minimum age on any boat (speedboat / sail yacht / Cranchi) — under-2s travel with a signed waiver. This is a strong differentiator vs every other Algarve operator (who anchor at 4 or 5). The lede + FAQ #2 + FAQ #3 + H2 #2 all carry this beat. **Same-ship corrections applied (4 locales each):** pillar "Visiting With Kids" H2 (line 164) rewritten end-to-end — the prior "age 3 to 5 depending on operator … babies and toddlers under 3 are a no" framing contradicted Atlantis's actual policy and was replaced with the no-min-age framing + boat-by-age guidance + new CL11 lateral (replacing the "we're writing a dedicated family guide" placeholder); CL8 packing-guide line 98 ("accepts children from age four") rewritten to match the no-min-age policy + new CL11 lateral. Skylight-term convention applied clean (PT/ES `abertura` · FR `l'ouverture`; zero `claraboia/claraboya/puits de lumière/claire-voie`). Marina line verbatim "Porto Comercial de Portimão (signposted *Ac. Porto Comercial de Portimão*)" preserved across all 4 locales. **Phase 2 complete.**

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

- **Deployed to production 2026-05-15** (master ref `d512396`; 34 commits incl. pillar rewrite + 4 new CLs + 4 deepens + slug sweep + baseline snapshot). Pre-hub GSC baseline captured immediately before push: `SEO/research/2026-05-15-pre-hub-baseline/` (top-queries/pages 28d/90d/180d + cluster head positions + country breakdown).
- **Target re-check: 2026-06-26** (6 weeks post-deploy). Re-run baseline commands (instructions in `SEO/research/2026-05-15-pre-hub-baseline/README.md`) and compare deltas on the cluster head positions documented in `SEO/research/2026-05-15-pre-hub-baseline/cluster-head-positions.md`. Watch C1 `benagil cave tour` (pos 34.3 → target sub-20), C7 `best time to visit benagil caves` (16.8 → top 10), C9 `best time to see dolphins in algarve` (8.5 → top 5), C8 `algarve caves` (31.2 → sub-20).
- **Won't move on its own**: the head term "benagil cave tour" (page 3–4 to page 1) needs the `seo-offpage` work in parallel. The hub creates the page worth ranking; off-page authority gets it ranked.
