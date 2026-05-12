# Atlantis Tours — keyword & topical map

*2026-05-12 · companion to `SEO/audits/2026-05-12-atlantis-organic-diagnosis.md` (the "why results are lacking" doc) and the technical/on-page audit. Built from the **Google Ads keyword corpus** (`GoogleAds/atlantis/02-campaigns/*/keywords-and-rsa.md` + `05-bulk-uploads/*/3-keywords.csv` — the same query universe the paid campaigns bid on) cross-referenced with **Search Console** (`sc-domain:atlantistours.pt`, last 90 days) for what the site actually gets impressions and positions on.*

**Caveat on volumes.** No Ahrefs/Semrush licence — there are no hard search-volume numbers here. Demand tiers (H/M/L) are inferred from (a) GSC impressions the young site has already accumulated — which *under*counts true demand — and (b) the fact that the Ads team independently chose to bid on a term. Treat them as direction, not data. If Ahrefs is ever purchased, re-run this with real volumes.

Companion files:
- `2026-05-12-atlantis-keyword-clusters.csv` — one row per cluster, with the Opportunity / Difficulty / Strategic-fit / Priority scoring.
- `2026-05-12-atlantis-keywords.csv` — ~120 keywords across the 16 clusters, with intent, GSC impr/position where known, cluster, and primary/secondary role.

---

## 1. The five findings that change what we do

1. **The biggest non-brand demand is German, then French — and there is no German site at all.** `bootstour portimao` pulled **1,639 impressions in 90 days** at avg position **4.8**; `bateau portimao` (FR) **1,578 impressions** at **5.8**. The English equivalents (`boat tour portimao`, `portimao boat tours`) total ~130 impressions. Yet CTR on the German/French queries is ~0.1–0.3% — because a German searcher gets shown an **English** result snippet (the site has `en/pt/es/fr` locales, no `de`; and the `es/fr` *tour* pages render the **English** FareHarbor product descriptions because `FH_LOCALE_MAP` only maps `en` and `pt`). **Adding a German locale is the single largest untapped market; filling in real FR/ES tour copy is the second.** The hreflang + meta fixes shipped 2026-05-12 should already nudge the FR/ES CTR up — measure on/after 2026-05-26.

2. **The headline money keyword ("benagil cave tour") is a long game, not a quick fix.** ~413 impressions/90d, avg position ~36. Page 1 is owned by GetYourGuide / Viator / Civitatis aggregators and a few established operators. A six-week-old site with zero off-site authority will not crack that with on-page work alone — it needs the content hub *and* the off-page push (covered in the diagnosis doc §4 and the upcoming `seo-offpage` run). Keep it as the #1 strategic target; don't expect movement before late summer.

3. **Several queries are already sitting just off page 1 — those are the genuine quick wins.** `best time to see dolphins in algarve` ~pos **8.7**, `portimao dolphin tour` ~**6.8**, `portimao dolphin watching` ~**11.6**, `algarve sunset cruise` ~**7.6**, `portimao what to see` ~**7.5**, `algarve en avril` (FR) ~**9.1**, `tour privado algarve` (PT) ~**7.8**. These need modest content depth + internal links, not authority — push them onto page 1 first while the big plays mature.

4. **We sell a "Benagil + Alvor Nature Reserve" tour that effectively doesn't rank.** `alvor nature reserve` ~pos 10, `alvor caves` ~10, `alvor boat trips` ~39 — all low-competition, all on a product we already run. Cheap to capture.

5. **There's a "Things to do in Portimão" hub page missing.** `things to do in portimao` / `portimao what to see` / `actividades en portimao` get a steady info trickle with no page on the site built to own it. A local-authority hub here would catch that stream and distribute it to all four products + the blog — and it's a natural AEO/GEO surface ("what is there to do in Portimão").

---

## 2. The cluster map (16 clusters → pages)

Scoring is `Priority = Opportunity + Strategic fit − Difficulty`, each 1–5. Full notes in `2026-05-12-atlantis-keyword-clusters.csv`.

| # | Cluster | Owns it | Intent | Opp | Diff | Fit | **Pri** |
|---|---|---|---|:-:|:-:|:-:|:-:|
| **C2** | **Boat tour Portimão / Algarve (generic, multilingual)** | `/tours/` listing (+ consider a dedicated landing page) | Commercial | 5 | 3 | 5 | **7** |
| **C7** | **Benagil cave — how to visit / complete guide** *(PILLAR)* | blog `benagil-cave-tour-complete-guide` + `best-time-visit-benagil-caves` | Informational | 4 | 3 | 5 | **6** |
| **C1** | **Benagil cave boat tour** | `/tours/<benagil-speedboat>` (PK 717720) | Commercial/Txn | 5 | 5 | 5 | **5** |
| **C9** | **Dolphin watching Algarve & Portimão** | blog `dolphin-watching-…` + `marine-life-…`; + a dolphin anchor on the speedboat page | Info → Commercial | 3 | 2 | 4 | **5** |
| C3 | Private yacht / boat charter Algarve & Portimão | `/tours/<cranchi-yacht>` (720028) + `/tours/<sail-yacht>` (717754) | Transactional | 3 | 4 | 5 | 4 |
| C4 | Sailing yacht & sunset cruise Algarve | `/tours/<sail-yacht>` (717754) + blog `sunset-cruises-…` | Commercial | 3 | 3 | 4 | 4 |
| C5 | Reef / boat fishing Portimão & Algarve | `/tours/<reef-fishing>` (718024) + the 3 reef-fishing posts | Commercial | 2 | 2 | 4 | 4 |
| C8 | Algarve sea caves — Benagil vs the others | blog `benagil-vs-other-sea-caves-algarve` | Informational | 3 | 3 | 4 | 4 |
| C6 | Benagil + Alvor / Ria de Alvor nature reserve | `/tours/<benagil-and-alvor>` (PK 717728) | Commercial+Info | 2 | 2 | 3 | 3 |
| C10 | Best time to visit the Algarve / for boat tours | blog `best-time-visit-algarve-boat-tours` + `algarve-in-spring-…` | Informational | 3 | 3 | 3 | 3 |
| C11 | What to pack / what to expect on a boat tour | blog `what-to-pack-algarve-boat-tour` | Informational | 2 | 2 | 3 | 3 |
| C12 | Portuguese coastal cuisine / what to eat after | blog `portuguese-coastal-cuisine-algarve` → Allgarbe + meal-tours | Informational | 2 | 2 | 3 | 3 |
| C13 | Things to do in Portimão | **NEW** hub page | Informational | 3 | 3 | 3 | 3 |
| C15 | Travel agency / tour operator Portimão–Algarve | homepage / about | Navigational | 1 | 2 | 2 | 1 |
| C14 | Arade River & Silves by boat | **NEW** info post only — *product discontinued* | Informational | 2 | 3 | 1 | 0 |

*(C14's "0" is honest: ~300 impr/90d of real demand, but we no longer run the trip, so it's a recover-and-redirect play at best — flag it in the audit, don't prioritise it. C15 is handled by brand + `LocalBusiness` schema; no content action.)*

### What's already covered vs what's a gap

- **Existing tour pages cover** C1, C3, C4, C5, C6 — each is a money page; the work there is *on-page depth + schema + internal links*, not new pages. (C1 also needs off-page authority before it moves.)
- **Existing blog posts cover** C7 (2 posts), C8, C9 (2 posts), C10 (2 posts), C11, C12, C5 (3 posts) — the raw material for the content hub is already written; the work is *restructuring into pillar-and-cluster + interlinking + freshening*, which is the `pillar-content-architecture` job.
- **Genuine content gaps (no page exists):** C13 "Things to do in Portimão" hub; C14 Arade/Silves info post (low priority); a **German locale** (covers C1/C2/C3/C4/C5 in German — biggest single gap by demand); a **"private Benagil cave tour by yacht"** angle page bridging C1↔C3 (`private boat to benagil` is its own intent).

---

## 3. Intent split (how the SERP wants to be answered)

| Intent | Clusters | Page type that wins | Our move |
|---|---|---|---|
| **Transactional / Commercial** ("book", "tour", "charter", "from Portimão", "price") | C1, C2, C3, C4, C5, C6 | the **tour pages** and the `/tours/` **listing** | depth + complete `Offer`/`Product` schema + reviews + clean localized meta; for C1, also off-page authority |
| **Informational** ("how to", "best time", "vs", "what to", "things to do") | C7, C8, C9, C10, C11, C12, C13, C14 | **blog posts / guides** — the content hub | pillar-and-cluster restructure, FAQ schema, "in 2026" freshening, every post links *up* to its pillar and *down/across* to the relevant tour page |
| **Navigational** ("atlantis tours …", competitor names) | brand, C15 | homepage / brand pages | already #1–2 on brand; leave competitor terms to paid |

The site's whole organic problem in one line: **~92% of clicks are navigational (brand). The commercial clusters are stuck on page 3–4, and the informational clusters — which are easier to win and feed the commercial ones — aren't organised as a hub yet.** Fixing the second and third rows of that table is the growth plan.

---

## 4. Production order (what to do, in order)

**Phase 1 — quick wins (weeks, mostly on-page, no authority needed):**
1. **C2 multilingual CTR + landing page.** The 2026-05-12 hreflang/meta fixes already help FR/ES. Next: strengthen the `/tours/` listing as a real "Boat tours from Portimão" landing page (intro prose, the 4 products framed by intent, internal links, `CollectionPage`+`ItemList` schema), and fill in **French and Spanish FareHarbor tour copy** (extend `FH_LOCALE_MAP`, or hand-write FR/ES copy the way `seo-overrides.ts` already does for the 4 Atlantis tours). Measure CTR on `bootstour portimao` / `bateau portimao` / `paseo en barco portimao` on/after 2026-05-26.
2. **C9 dolphin cluster.** Deepen `dolphin-watching-algarve-species-seasons` (species table, month-by-month, ethical-operator section, FAQ schema), interlink it with `marine-life-…`, and add a "dolphins are often spotted on this tour" section/anchor on the speedboat page. Targets `best time to see dolphins in algarve` (8.7→p1), `portimao dolphin tour` (6.8→p1).
3. **C6 Benagil + Alvor.** Beef up the `benagil-and-alvor` tour page (what the Ria de Alvor reserve is, birdlife, why it's quieter than Benagil), link it from C8, target `alvor nature reserve` / `alvor caves`.
4. The "almost there" misc: freshen `best-time-visit-algarve-boat-tours` ("…in 2026"), make sure `algarve sunset cruise` and `tour privado algarve` (PT) have a strong page pointing at them.

**Phase 2 — the content hub (the engine; `pillar-content-architecture` + `content-brief-authoring`):**
5. Designate **C7 as the pillar** ("Benagil Cave Tour: Everything You Need to Know in 2026" — already exists, expand it into the hub spine). Cluster pages = C8 (caves comparison), C9 (dolphins), C10 (best time), C11 (what to pack), and a new "can you swim in Benagil cave / rules" piece (strong featured-snippet target — answer is *no, illegal since 2023*). Every cluster post links up to the pillar and across to the relevant tour page; the pillar links down to all of them and to C1/C3. Add `FAQPage` + `BreadcrumbList` schema throughout.
6. New page: **"Things to do in Portimão" (C13)** — local-authority hub, links every product + the blog hub.

**Phase 3 — the big structural play (largest demand, biggest build):**
7. **A German locale.** `bootstour portimao` alone is bigger than the entire English boat-tour demand the site has measured. This is a real engineering project (new `de` in `astro.config`, i18n strings, FH locale mapping, hreflang, sitemap) — scope it separately. Until then, accept that the German p4–p6 rankings will keep converting at ~0% because the snippet is in the wrong language.

**Parallel track (not keyword work — see the diagnosis doc §4 and the `seo-offpage` run):** off-page authority + citations. C1 ("benagil cave tour") will not move without it, no matter how good the page.

**Skip / park:** C14 (Arade — discontinued product; at most a short recover-and-redirect post), C15 (travel-agency terms — brand + schema handle it).

---

## 5. Next

- This feeds straight into `pillar-content-architecture` (the C7-pillar / C8–C11 cluster restructure) and `content-brief-authoring` (per-piece briefs for the new/expanded pieces) — that's "Phase 2" above.
- It also feeds `seo-competitor` (the next deliverable in this batch) — the clusters above are exactly the SERPs to tear down: `benagil cave tour`, `bootstour portimao`, `boat tour algarve`, `private yacht algarve`, `reef fishing algarve` — vs Algarve Experience, Dreamwave, Xride, Algarve Discovery, Royal Nautic + the OTAs.
- When a tour page or the `/tours/` listing changes as a result of this (meta, schema, copy, new landing page), append a line to `GoogleAds/atlantis/06-changelog.md` — those are the ad landing pages too.
