# Atlantis Tours — content hub architecture: the Benagil Cave Tour pillar

*2026-05-12 · branch `feat/atlantis-content-hub` · produced with the `pillar-content-architecture` skill. Inputs: `SEO/research/2026-05-12-atlantis-keyword-map.md` (the 16-cluster keyword map), `SEO/research/2026-05-12-atlantis-competitor-analysis.md`, and the 13 existing Atlantis blog posts. This document is the **architecture** — pillar selected, cluster planned, link graph specified, URLs decided, page anatomies templated, refresh cadence + owner set. It does **not** write the pieces; each new/expanded piece gets a brief via `content-brief-authoring` (the briefs are listed in §8 with one-line scopes), and the writing is a separate step (per `feedback_opus_for_writing`: Opus subagents draft, Sonnet does the schema/translation plumbing). The site-side wiring (frontmatter, breadcrumbs, tour→guide links, schema) gets its own implementation plan under `docs/superpowers/plans/` when we move to build.*

---

## 0. Why a hub at all (the one-paragraph case)

Atlantis has 13 blog posts and 4 tour pages sitting on the site as a **flat list**: reverse-chronological blog index, posts that link "down" to a couple of related tours, nothing linking back the other way, three different pieces independently touching "best time to visit Benagil". Search engines and AI engines both read internal-link graphs to infer topical authority — and right now the graph says "small operator that wrote some articles," not "*the* authority on Algarve sea-cave boat tours." This hub fixes the **shape**: one authoritative pillar (the Benagil guide, expanded ~3–4×), 10–12 cluster pieces each owning one facet, wired pillar→cluster→pillar with selective lateral links and two-way cluster↔tour links, breadcrumbs and schema that surface the hierarchy. It's the half of the growth plan we can build entirely in-repo without anyone else's cooperation — and it's the lever that out-flanks the OTAs (GetYourGuide/Viator own the transactional SERP forever, but carvoeirocaves.com and benagilexpress.com have *no blog at all* — informational depth is the open space). It won't, on its own, win "benagil cave tour" the head term — that needs the off-page authority too (`seo-offpage`). Think hub = engine, off-page = fuel; build both.

---

## 1. Pillar selection — the Benagil Cave Tour guide

**Pillar = `benagil-cave-tour-complete-guide`** ("Benagil Cave Tour: Everything You Need to Know in 2026"), expanded from its current ~1,060 body words to **~3,000–4,000 words**. Topic scope: *the Benagil sea cave and the Algarve sea-cave boat-tour experience that orbits it.* Tested against the five criteria:

1. **Search volume justifies it.** "benagil cave tour" and its variants are the highest-volume Algarve attraction query (the Ads team built a whole campaign on it; `benagil cave tour` alone shows ~413 GSC impr/90d for this young site). Easily supports a 3,000–4,000-word pillar + 10–12 clusters. ✅
2. **Natural facets — 12–15 of them.** how you get inside · the 2023+ access rules / "can you swim in" · best time of year · best time of day + tides · from Portimão vs Carvoeiro vs Lagos · speedboat vs kayak vs SUP vs yacht · Benagil vs Marinha/Carvalho/Alvor · dolphins & marine life on the way · what to bring · with kids / accessibility · where to stay near Benagil · the skylight / photography · cost & what's included · book direct vs OTA · history & geology of the Algar. ✅
3. **Commercial relevance.** The pillar's natural CTA is the €20 speedboat (PK 717720), the private Cranchi yacht (720028), and the sail yacht (717754) — it's literally the entry product. ✅
4. **Competitive feasibility — with the honest framing.** The *transactional* "benagil cave tour" SERP is OTA-dominated and a 6-week-old site won't crack it on content alone. But the pillar's job is to rank for the **informational** cluster of queries ("how to visit benagil", "best time to visit benagil caves" — already ~pos 17, "can you swim in benagil cave", "benagil cave 2026") where the SERP is far more open (no small operator owns a real guide), and to be the **authority hub that channels link equity to the tour pages** as off-page authority builds. Feasible *in that role*. It's also the only realistic pillar candidate the site has. ⚠️→✅
5. **Editorial commitment.** Core topic of the business; annual refresh is mechanical ("…in 2026" → "…in 2027" + the rules/prices section). Owner named in §7. ✅

**Not a pillar (deliberately):** "Algarve boat tours" generally and "private yacht charter Algarve" are *candidate future pillars* — but one hub at a time, and the keyword map said one pillar. The fishing posts form a **satellite mini-cluster** around the reef-fishing product (§3), not part of the Benagil pillar. "Things to do in Portimão" is a recommended **second, smaller hub page** (§3, low priority) — local-info, not a Benagil cluster.

---

## 2. The cluster — 10–12 pieces, with the keep / expand / merge / new decision per existing post

Target the 10–12 sweet spot, with **facet heterogeneity** (how-to, rules, timing, comparison, wildlife, practical, seasonal, experience-type, audience — not 12 variations of "what is Benagil"). The 13 existing posts already supply most of the raw material; the work is *restructuring and de-duping*, not mass writing.

| # | Cluster facet | Facet type | Maps to existing post | Action | Notes |
|---|---|---|---|---|---|
| **CL1** | **How to get to / visit the Benagil cave** (which boat from where, the clifftop viewpoint walk, the mandatory-guide rules) | how-to | — (gap; this content is currently a section *inside* the pillar) | **NEW** (extract from pillar) | ~1,500w. Absorbs the "from Portimão vs Carvoeiro vs Lagos which departure" facet as a section. Targets `how to get to benagil cave` / `how to visit benagil` / `benagil from portimão`. Skipper byline. |
| **CL2** | **Can you swim into the Benagil cave? The rules, explained** | rules / FAQ | — (gap) | **NEW** | ~900–1,100w. The 2023+ regulation (no swimming in from a boat tour; beach reachable only by water; monitored access; kayak/SUP situation). Strong **featured-snippet** target — clean yes/no question with high volume. Skipper byline. |
| **CL3** | **Best time to visit the Benagil caves** (year + day + tide + light) | timing (narrow) | `best-time-visit-benagil-caves` (**296w stub** — the thinnest post on the site) | **EXPAND** 296→~1,200w | Currently a stub that gestures at year/day/tide. Build it out properly. This piece **owns** all "when to visit Benagil" queries; CL4 must defer to it (see de-dup rule below). |
| **CL4** | **Best time to visit the Algarve for boat tours** (month-by-month, all tours) | timing (broad) | `best-time-visit-algarve-boat-tours` (991w) | **KEEP + de-dup** | The broad sibling of CL3. Trim Benagil-specific overlap, link **down** to CL3 for the cave detail. Owns `best time to visit algarve` / `… for boat tours`. |
| **CL5** | **Benagil vs the other Algarve sea caves** (Marinha, Carvalho, Alvor, the lesser gems) | comparison | `benagil-vs-other-sea-caves-algarve` (898w) | **KEEP + expand a little** | Add an **Alvor / Ria de Alvor** section (ties to the Benagil+Alvor product, keyword cluster C6) and a comparison-table with `ItemList` schema. Owns `algarve caves` / `algarve cave tours` / `benagil vs marinha`. |
| **CL6** | **Dolphin watching in the Algarve: species, seasons, ethical tours** | wildlife (narrow) | `dolphin-watching-algarve-species-seasons` (1057w) | **KEEP + deepen** | Already ~pos 7–12 — the best "almost there" win. Add a species table, a month-by-month sighting chart, a stronger ethical-operator section, FAQ schema. Owns `best time to see dolphins in algarve` / `portimao dolphin watching/tour`. |
| **CL7** | **Marine life of the Algarve coast: a spotter's guide** | wildlife (broad) | `marine-life-algarve-coast-spotters-guide` (1218w) | **KEEP** | The "everything besides dolphins" sibling of CL6 — lateral-link the two; keep scopes distinct (CL6 = dolphins, CL7 = octopus/seabirds/sunfish/etc). |
| **CL8** | **What to pack for an Algarve boat tour** | practical | `what-to-pack-algarve-boat-tour` (940w) | **KEEP** (light refresh) | Conversion-support; links to all four tour pages. Fine roughly as-is; refresh the year. |
| **CL9** | **The Algarve in spring: the best-kept secret** | seasonal / inspirational | `algarve-in-spring-best-kept-secret` (1123w) | **KEEP + de-dup vs CL4** | More inspiration/destination than logistics. Keep its "why spring" angle; defer month-grid detail to CL4. |
| **CL10** | **Sunset cruises in the Algarve** | experience type | `sunset-cruises-algarve-summer-guide` (1155w) | **KEEP** | Targets keyword cluster C4. Links to the sail-yacht (717754) + Cranchi (720028) pages; lateral to CL9. |
| **CL11** | **Benagil cave tour with kids: a family guide** | audience | — (gap) | **NEW (Phase 2)** | ~1,200w. "is benagil cave tour suitable for children / babies / non-swimmers", life-jacket policy, which tour, what they'll love. Skipper byline. Lower priority than CL1–CL3. |
| *(CL12 slot)* | *open* — candidate facets for later expansion: "Benagil cave photography & the skylight" · "Where to stay near Benagil" · "Benagil cave by yacht: the private option" (bridges to C3) | — | — | **future** | Add only when GSC shows the demand. Hub starts at ~11, grows to ~14–16 over 2–3 years. |

**Fishing satellite cluster** (orbits the **reef-fishing product** PK 718024, *loosely* linked from the pillar's "other ways to experience this coast" section — not Benagil clusters):
- `reef-fishing-algarve-what-to-expect` (1236w, skipper byline) — KEEP. "What happens on the boat."
- `reef-fishing-portimao-half-day-guide` (1206w, skipper byline) — KEEP. The Portimão logistics specifically. Lateral-link to the above; both → reef-fishing tour page.
- `fishing-traditions-algarve-coast` (1163w) — KEEP. The culture/history angle → reef-fishing tour + Restaurant Allgarbe. *(This is the seed of a possible second hub later; for now it's a 3-post satellite.)*

**Standalone-by-design** (intentionally orphan-ish — connects loosely, doesn't need to be in a cluster):
- `portuguese-coastal-cuisine-algarve` (1192w) — KEEP. Ties to Restaurant Allgarbe + the "Benagil + meal @ Allgarbe" tours; one link in from the pillar's "after the tour" section, that's enough.

**De-dup rule (this is the whole point of the architecture pass):** every query has exactly **one owner**. CL3 owns "best time to visit Benagil"; CL4 owns "best time to visit the Algarve (broad)" and links to CL3 for the cave detail. CL6 owns "dolphins"; CL7 owns "other marine life". CL9 owns "spring/why-spring"; CL4 owns the month grid. CL1 owns "how to get there"; CL2 owns "the rules / can you swim". The pillar **summarises every facet briefly** and links to the owner for depth — it is a guided tour with depth links, not a 4,000-word treatment of all 12 facets.

---

## 3. Information architecture & URLs

**Decision: keep the pillar and clusters under `/[locale]/blog/[slug]/` for now.** The `pillar-content-architecture` skill flags `/blog/` as a soft anti-pattern (you lose the URL signal that says "these pages are a topical group") versus a `/benagil-cave-guide/` hub path — *and that's a real cost*. But: this is a 6-week-old site with thin authority; the blog routing, hreflang, per-locale RSS, and the `/blog/category/…` + `/blog/tag/…` taxonomy were just built and shipped (the 2026-04-16 blog plan); moving ~12 posts to a new path means new routes + a redirect map + sitemap + hreflang re-wiring, and a botched redirect on a young site is exactly the kind of self-inflicted wound the diagnosis warned about. The URL-signal upside is **second-order**; the migration risk is **first-order**. So:
- **Now:** keep `/blog/<slug>/`. Get the hub-signal cheaply instead via (a) a new **`benagil-cave-guide` category** so `/[locale]/blog/category/benagil-cave-guide/` becomes a de-facto hub index, (b) **breadcrumbs that show the pillar** (see below), (c) the **internal link graph** (§4), and (d) schema (§5). Internal links + breadcrumbs + schema do most of the work that the URL path would; they're what matters for a small site.
- **Deferred / optional (own plan, decide later):** migrate to `/[locale]/benagil-cave-guide/` (pillar) + `/[locale]/benagil-cave-guide/<cluster>/` (clusters), with 301s from the old `/blog/` URLs. Worth it once the site has enough authority that the consolidation gain outweighs the migration risk — not yet.

**Breadcrumb / hub surfacing (cheap, do it now):**
- Add a `pillarSlug?: string` field to the blog content schema. Cluster posts set `pillarSlug: benagil-cave-tour-complete-guide`. The breadcrumb on a cluster post becomes `Home › Guides › Benagil Cave Tour Guide › <post title>` instead of `Home › Blog › <Category> › <post>` — surfacing the hierarchy to readers *and* in `BreadcrumbList` schema. (The pillar itself: `Home › Guides › Benagil Cave Tour Guide`.) Posts with no `pillarSlug` keep the current category breadcrumb.
- Feature the pillar prominently: pin it at the top of the blog index, link it from the homepage ("Planning a Benagil trip? Start here →"), and link it from the relevant tour pages (§4).
- Slug conventions for the new pieces: short, descriptive — `how-to-visit-benagil-cave`, `can-you-swim-benagil-cave`, `benagil-cave-tour-with-kids`. Not `the-ultimate-2026-guide-to-…`.

---

## 4. Internal-linking architecture (the part that actually produces authority)

Three directions, plus the cross-link to commercial pages. **Anchor text is varied and descriptive** — no "click here", no exact-match stuffing. Specific links + anchors are tracked in the **linking inventory** (`2026-05-12-atlantis-benagil-hub-links.csv`, audit quarterly).

**(a) Pillar → cluster (top-down).** One contextual link from the *relevant section* of the pillar body to each cluster — woven in where the reader's curiosity peaks, **not** dumped in a "related reading" footer:
- pillar "How do you get inside?" section → CL1 (`getting to the Benagil cave`)
- pillar "Can you still swim in?" section → CL2 (`the current rules on swimming into the cave`)
- pillar "Best time to go" section → CL3 (`the best time of year and day to visit`)
- pillar "Which other Algarve caves are worth it?" section → CL5 (`how Benagil compares to Marinha and the rest`)
- pillar "What you'll see on the way" section → CL6 (`dolphin watching off this coast`) and CL7 (`the wider marine life`)
- pillar "What to bring" line → CL8 (`what to pack`)
- pillar "Best months overall" line → CL4 (`a month-by-month look at Algarve boat-tour season`) and CL9 (`why spring is the smart pick`)
- pillar "An evening alternative" line → CL10 (`a sunset cruise instead`)
- pillar "Other ways to experience this coast" section → the fishing satellite (`a half-day reef fishing trip`) and CL11 when it exists
- pillar "After the tour" line → cuisine post (`what to eat afterwards`)

**(b) Cluster → pillar (bottom-up — the discipline that makes the pillar compound).** Every cluster piece links **up** to the pillar at least twice: once in the **first ~150 words** ("This covers X. For the full picture on visiting Benagil, see our complete Benagil Cave Tour guide → …") and once in the **closing section**. Without bottom-up the pillar is just a long article.

**(c) Cluster ↔ cluster (lateral — selective, only where natural).** Not "everyone links to everyone." The natural pairs:
- CL1 ↔ CL2 (how to visit ↔ the rules)
- CL3 ↔ CL4 (best time Benagil ↔ best time broad) — directional: CL4 → CL3 for cave detail
- CL6 ↔ CL7 (dolphins ↔ wider marine life)
- CL5 → CL6 (caves comparison mentions the dolphins you pass en route)
- CL9 ↔ CL10 (spring ↔ sunset) and CL9 ↔ CL4
- CL5 → CL1 (once you've picked Benagil, here's how to get there)
- fishing trio interlinked three ways
- cuisine ← fishing-traditions (loose)

**(d) Cluster → tour page (commercial).** Keep the existing `relatedTourSlugs` frontmatter + add **one in-body contextual link** with intent-matched anchor:
- CL1, CL2, CL3, CL6 → speedboat (717720) — `the small-group Benagil speedboat tour from Portimão`
- CL5 → speedboat (717720) + Cranchi (720028)
- CL10 → sail yacht (717754) + Cranchi (720028); CL9 → sail yacht (717754) + speedboat
- CL8 → all four; CL7 → speedboat + reef-fishing
- fishing trio → reef-fishing (718024); cuisine → Restaurant Allgarbe + the meal-included tours
- the **pillar** → speedboat (primary CTA) + Cranchi + sail yacht

**(e) Tour page → guide (the missing direction — add it).** Today the cross-link only runs blog→tour. Each tour page gets a small **"Plan your trip"** block linking the 2–3 most relevant guides — implement via a `relatedGuideSlugs?: string[]` on the tour data (or a per-tour map in `seo-overrides.ts`-style config):
- speedboat (717720) → pillar, CL1 (how to visit), CL2 (the rules), CL3 (best time), CL6 (dolphins)
- Cranchi (720028) → pillar, CL5 (which cave), CL10 (sunset), CL3 (best time)
- sail yacht (717754) → CL10 (sunset), CL9 (spring), CL8 (packing)
- reef-fishing (718024) → the 3 fishing posts
- Benagil + Alvor (717728, the under-ranking product, keyword cluster C6) → CL5 (which cave, incl. the new Alvor section), CL7 (marine life), pillar

This two-way wiring is what turns a backlink that lands on *any* hub page into authority for the pillar **and** the money pages, instead of equity dead-ending on a leaf post.

---

## 5. Page anatomies

### 5a. Pillar page — `benagil-cave-tour-complete-guide` (rewrite spec, ~3,000–4,000w)

- **Hero.** Title "Benagil Cave Tour: Everything You Need to Know in 2026". Sub-line signals scope + authority: "written by the skippers who take visitors there every day." Give this post a real **author**: the company skipper (`Nuno Albino`) with `authorBio` + `authorImage` — the E-E-A-T signal the other generic-byline posts lack.
- **TL;DR / executive summary (150–250w, directly under the hero).** The citation-ready block AI engines extract verbatim — treat it as such, not as a marketing intro. Must answer, tersely: what the Algar de Benagil is · how you visit it now (boat tour from Portimão / Carvoeiro / Lagos, ~1.5–2h, roughly €20–35 group / private from a few hundred €; the beach inside is reachable only by water; **you can no longer swim into the cave from a boat tour** since 2023; the clifftop viewpoint is a separate short walk) · best time (≈ May–Oct, late morning for the sun-beam through the skylight, calm seas) · and "you can book direct with the operator".
- **Body — ~10–12 H2 sections.** Each H2 starts with a **40–60-word answer paragraph** (AEO: citation-ready, directly under the heading), then depth, then the contextual link to that facet's cluster owner (§4a). Suggested H2s: *What is the Algar de Benagil?* (history/geology, the skylight) · *How do you get inside the cave?* (→CL1) · *Can you still swim into the Benagil cave?* (→CL2) · *From Portimão, Carvoeiro, or Lagos — which departure point?* (→CL1) · *When should you go — best season, time of day, tides* (→CL3) · *By speedboat, kayak, SUP, or yacht — which is right for you?* (→ speedboat + Cranchi pages) · *Benagil vs Marinha and the other Algarve sea caves* (→CL5) · *What you'll see on the way: dolphins and the coast* (→CL6/CL7) · *What to bring* (→CL8) · *Visiting with kids / accessibility* (→CL11 when it exists) · *Where to stay near Benagil* · *Booking: direct vs OTA, prices, what's included*.
- **Use cases / examples.** One or two short "here's how a typical morning trip from Portimão actually goes" mini-narratives — anchors the abstract in the concrete.
- **Common mistakes / FAQ (8–12 Q&A, with `FAQPage` schema).** "Can you swim into Benagil cave?" ("No — not on a boat tour, since 2023…") · "Do you have to book in advance?" · "Can you walk to Benagil beach?" · "Is the cave 'open' in winter?" · "How long does the tour take?" · "Is it OK for young children / non-swimmers?" · "What happens if the sea's too rough?" · "Are drones allowed?" · "How much does it cost?" · "Can wheelchairs / limited-mobility visitors do it?"
- **Closing / next steps.** Intent-routed: "Ready to go → [Benagil speedboat tour] · [private Cranchi yacht]. Still planning → [best time to visit] · [Benagil vs the other caves] · [what to pack]."
- **Schema.** `Article` (travel-guide flavoured), `FAQPage` on the FAQ block, `BreadcrumbList` (`Home › Guides › Benagil Cave Tour Guide`), `Person` author (the skipper). Optional: `TouristAttraction`/`Place` for Algar de Benagil with `containedInPlace` → Algarve, cross-referenced from the tour pages' `Offer`.

### 5b. Cluster piece — template for CL1–CL11 (800–2,000w; >2,500w means it's a mini-pillar — split it or promote it)

- **Hero.** One focused question or task — not broad.
- **Pillar callout in the first ~150 words.** "This piece covers X. For the full picture on visiting Benagil, see our complete [Benagil Cave Tour guide]." Then again in the closing.
- **Focused body.** Answers *its* question with depth; does **not** wander into adjacent facets (those are other clusters'). 40–60-word answer paragraph under each H2.
- **Lateral callouts (selective).** 1–2 sibling links where natural (§4c).
- **Commercial link.** One in-body contextual link to the relevant tour page (§4d) + the existing `relatedTourSlugs` block.
- **FAQ block + `FAQPage` schema** where there's a natural Q&A (CL1, CL2, CL3, CL5, CL6 especially).
- **Author.** Skipper byline (`Nuno Albino`, with bio/image) on the experiential/practical pieces — CL1, CL2, CL3, CL6, CL8, the fishing trio. `Atlantis Tours` org byline on the rest (CL4, CL5, CL7, CL9, CL10).
- **Refresh marker.** Year in the title where natural ("…in 2026"); date any statistics. Bump annually (§7).

---

## 6. AEO / GEO layer (it's the same work, done deliberately)

The hub serves search engines and answer engines together — both reward depth, structure, entity coverage. Concretely, bake in:
- **40–60-word answer paragraphs** directly under every H2 on the pillar and clusters (extractable Q&A).
- **The pillar TL;DR** — the single most-cited block AI engines will lift; write it as a standalone answer.
- **`FAQPage` schema** on the pillar and the Q&A-shaped clusters (still heavily cited by Perplexity/ChatGPT).
- **Specific, dated facts with sources** — the 2023 access regulation (cite it), dolphin-season months, tour durations, prices, the skylight dimensions/geology.
- **Named entities** — "Algar de Benagil", "Praia da Marinha", "Ria de Alvor", the skipper's name and the operator name, "small-group speedboat from Clube Naval de Portimão" — entities AI engines weight for attribution.
- **A distinctive POV AI can attribute to the brand** — "from the skippers who go there daily", the honest "you can't swim in any more and here's why", the "book direct vs OTA" stance. Generic content doesn't get cited; a recognisable voice does.
- See `seo-aeo-geo` for the program-level AEO strategy and an `/llms.txt` (also on the P1 audit backlog).

---

## 7. Maintenance, refresh cadence & owner

- **Owner: the site operator (José).** Durable single owner across a multi-year horizon — not "whoever last touched it". (Drafting can be delegated to Opus subagents; ownership of the hub — deciding what refreshes, when clusters get added/pruned — stays with one person.)
- **Annual pillar refresh — every January/February:** bump "2026"→"2027" (and in the cluster titles); re-check against the live SERP; update the access-rules section, prices, what's-included; refresh the cluster callouts (the cluster will have grown); update any statistics.
- **Triggered cluster refresh:** when a cluster's GSC position drops materially, when a rule changes (the Benagil access regime is the obvious one to watch), or when a cluster's links go stale.
- **Cluster expansion:** add the CL12-slot facets (photography/skylight, where-to-stay, "Benagil by private yacht") as GSC shows the demand. Year-1 hub ≈ 11 clusters; year-3 ≈ 14–16.
- **Cluster pruning:** if a cluster fails to rank or get cited after ~12 months, redirect it to the nearest surviving cluster or the pillar. Pruning is hygiene, not failure.
- **Linking inventory audit — quarterly:** walk `2026-05-12-atlantis-benagil-hub-links.csv` for broken links, anchor-text drift, and connections that should exist but don't.

---

## 8. The build backlog (what happens next, in order)

**A. Site-side wiring (one `docs/superpowers/plans/` implementation plan, TDD where it's code):**
1. Add `pillarSlug?: string` to the blog content schema; set it on the CL posts; update `[slug].astro` breadcrumb + `buildBreadcrumbList` to use it (`Home › Guides › <pillar> › <post>`); add a "part of the … guide" callout component.
2. Add a `benagil-cave-guide` category + i18n labels; the category-index page = the de-facto hub index; pin the pillar on the blog index + link it from the homepage.
3. Add `relatedGuideSlugs` to the tour data (or a per-tour map) + a "Plan your trip" block on `tours/[slug].astro` → the tour→guide direction (§4e).
4. `FAQPage` schema on the pillar + Q&A clusters (reuse the `feat/atlantis-faqs-rebuild` machinery / `buildFAQPage`); optional `TouristAttraction`/`Place` for Algar de Benagil.
5. Apply the four-locale mirroring for the 3 new posts (`translationKey`, PT/ES/FR versions — translation work, Sonnet-ok).

**B. Content briefs (`content-brief-authoring`, one brief each) — produce in this order:**
1. **Pillar rewrite** — `benagil-cave-tour-complete-guide`, 1,060→~3,500w, per §5a. Skipper byline. *(Highest leverage — the whole hub keys off it; ship pillar first or alongside the first few clusters.)*
2. **CL2 — "Can You Swim Into the Benagil Cave? The 2023 Rules, Explained"** — NEW, ~1,000w, featured-snippet target. *(Fast, high-volume, distinctive.)*
3. **CL1 — "How to Get to the Benagil Cave (and What's Changed in 2026)"** — NEW, ~1,500w, absorbs the departure-point comparison.
4. **CL3 — "Best Time to Visit the Benagil Caves"** — EXPAND the 296w stub → ~1,200w.
5. **CL6 refresh — dolphin post** — deepen (species table, month chart, ethics) — *the "almost page 1" quick win*.
6. **CL5 refresh — caves-comparison post** — add the Alvor section + comparison table/schema.
7. **CL4 / CL9 de-dup edits** — trim overlap, wire the down-links to CL3.
8. **CL8 / CL7 / CL10 / fishing trio / cuisine** — light refresh + add the bottom-up pillar callouts + the in-body tour link + lateral links per §4.
9. **CL11 — "Benagil Cave Tour With Kids: A Family Guide"** — NEW, ~1,200w — Phase 2.
10. **(separate, lower priority) "Things to Do in Portimão"** — NEW ~2,000w local hub page (keyword cluster C13) — its own small hub, linked from the pillar.

**C. After it ships:** re-check GSC positions on the cluster keywords on/after ~6 weeks; quarterly linking-inventory audit; annual pillar refresh (§7). And remember the parallel track — `seo-offpage` — without which the head term "benagil cave tour" doesn't move regardless of how good this hub is.

---

## 9. Companion file

- `2026-05-12-atlantis-benagil-hub-links.csv` — the linking inventory: every planned link in the hub (from → to, direction, anchor text, status). The thing you audit quarterly.
