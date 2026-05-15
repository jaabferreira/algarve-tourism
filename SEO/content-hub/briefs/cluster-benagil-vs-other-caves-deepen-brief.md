# Content brief — CL5 DEEPEN: "Benagil vs the Other Sea Caves of the Algarve: Which Should You Visit?"

*Working doc · 2026-05-15 · authored with `content-brief-authoring` (primary) + `seo-aeo-geo` (snippet-shaped answer paragraphs, FAQPage + ItemList schema, entity-coverage for AI engines) + `content-refresh-system` (refresh-vs-merge-vs-delete framing — this is a **DEEPEN**, not a rewrite; the existing ~1,050w body is mostly kept, additions are surgical: an expanded Alvor section, a comparison table with `ItemList` JSON-LD, and a `faqs:` block) + `pillar-content-architecture` (cluster-piece anatomy under the Benagil pillar). Inputs read in order: `SEO/content-hub/BUILD-STATUS.md` §2 CL5 entry (the "what's next" pointer), `SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` §2 row CL5 + §4 link graph rows + §5b cluster anatomy + §6 AEO/GEO layer (the design contract), `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` rows where CL5 is source or target (verified by grep — 8 rows: 1 inbound from pillar, 1 outbound to pillar, 1 outbound CL6 lateral, 1 outbound CL1 lateral, 1 outbound speedboat tour, 1 outbound Cranchi tour, 1 inbound from Cranchi tour, 1 inbound from Benagil+Alvor tour-when-built), `SEO/content-hub/briefs/cluster-dolphin-watching-algarve-deepen-brief.md` (CL6 — the closest analog: also a deepen, also adds a comparison table + a month-by-month chart + `faqs:` frontmatter; the §16 single-question pattern matches), `SEO/content-hub/briefs/cluster-best-time-visit-benagil-caves-brief.md` (CL3 — second precedent, also a deepen + `faqs:` add), the four shipped CL5 locale files (`packages/atlantis/src/content/blog/{en,pt,es,fr}/<slug>.md` — the ~1,050w bodies this deepen builds on, NOT replaces), the shipped pillar `packages/atlantis/src/content/blog/en/benagil-cave-tour-complete-guide.md` (esp. H2 #7 "Benagil vs Marinha and the other Algarve sea caves" — the pillar's brief two-line mention that CL5 deepens; also the canonical EN "skylight" vocabulary contract), `SEO/research/2026-05-12-atlantis-keyword-map.md` cluster row C6 (Benagil + Alvor / Ria de Alvor — explicitly the keyword cluster the Alvor section serves) + the CL5 row in §2 of the architecture doc (CL5 owns `algarve caves` / `algarve cave tours` / `benagil vs marinha`). The pillar brief + CL3 + CL6 briefs are the voice + structural contracts; CL6 is the closest analog because both are deepens with a NEW table + a NEW `faqs:` block on an already-shipped file. **This brief is the contract; the writer drafts against §6, §7, §8, §9, §10, §11, §13, §14.***

---

## 1. Header

- **Title (EN):** **Benagil vs the Other Sea Caves of the Algarve: Which Should You Visit?**
  - *LOCKED — the existing title is good as it is: it lands the head-query magnet (`benagil vs marinha` / "Benagil vs the others"), reads as a decision question (matches the "which should I pick?" intent), and is not overstuffed. The deepen does NOT change the title. **Default: keep verbatim.** Reviewer locks in §16.*
- **Slug (EN):** `benagil-vs-other-sea-caves-algarve` *(URL-permanent; LOCKED in the prompt header; matches the existing file; do NOT change — would orphan inbound links from the pillar, CL1, CL6, the Cranchi tour page, and the future Benagil+Alvor tour page when it ships)*
- **Locale:** `en` (authoritative for the deepen pass — the EN draft is the source of truth; pt/es/fr translated in a separate Sonnet pass after EN review per `feedback_opus_for_writing` user-memory)
- **File paths (EXISTING files — deepen in place, do NOT delete-and-recreate):**
  - **EN (deepen):** `packages/atlantis/src/content/blog/en/benagil-vs-other-sea-caves-algarve.md` *(currently 898–1,050w body; target 1,500–1,800w; the existing frontmatter is mostly correct — `locale`, `translationKey`, `category`, `pillarSlug`, `pillarOrder: 3` are right; defects to fix: `date`, `relatedTourSlugs` (under-specified — missing Cranchi), `tags` (could add `comparison`), missing `faqs:` entirely — see "frontmatter defects" below)*
  - **PT (deepen):** `packages/atlantis/src/content/blog/pt/benagil-vs-outras-grutas-marinhas-algarve.md` *(currently ~1,050w; mirror EN deepen; PT translation pass after EN review; PT body scales to ~1,750–2,200w per the translation pattern observed on CL3 + CL6 — PT runs +15–25% over EN for word count)*
  - **ES (deepen):** `packages/atlantis/src/content/blog/es/benagil-vs-otras-cuevas-marinas-algarve.md` *(currently ~1,050w; mirror EN deepen; ES translation pass after EN review)*
  - **FR (deepen):** `packages/atlantis/src/content/blog/fr/benagil-vs-autres-grottes-marines-algarve.md` *(currently ~1,050w; mirror EN deepen; FR translation pass after EN review)*
- **`translationKey`:** `benagil-vs-other-caves` *(LOCKED — already in place on all four locales; do NOT change. The i18n resolver wires the four siblings via this key; touching it orphans them. The `tour-guides.ts` map at line 44 also uses this exact key — `benagil-vs-other-caves` — so changing it silently breaks the future tour→guide link from the Benagil+Alvor product (PK 717728) when that tour page ships.)*
- **`pillarSlug` (locale-specific per BUILD-STATUS §4 rule):**
  - en: `benagil-cave-tour-complete-guide` *(already in EN file ✅)*
  - pt: `guia-completo-gruta-benagil` *(already in PT file ✅)*
  - es: `guia-completo-cueva-benagil` *(already in ES file ✅)*
  - fr: `guide-complet-grotte-benagil` *(already in FR file ✅)*
- **`pillarOrder`:** `3` *(LOCKED per architecture §2 + BUILD-STATUS §4 rule — already in place on all four locales ✅. CL5 sits 3rd in the pillar's auto-generated "In this guide" component. BUILD-STATUS §2 line 5 names the live order as CL1=0 → CL2=1 → CL3=2 (after the CL1/CL2/CL3 retroactive bumps documented in those CL briefs' §16) → **CL5=3** → CL6=4 → CL7=5 → CL8=6 → CL9=7 → CL10=8. Treat the current `pillarOrder: 3` as load-bearing; do NOT touch.)*
- **Frontmatter defects to fix forward (every one of these is wrong, missing, or stale on the live file — but CL5's list is mercifully shorter than CL6's was):**
  - `date: "2026-05-15"` *(currently `2026-04-16` — stale by ~4 weeks. Refresh to today's date when the deepen ships. The article-modified date will future-bump on subsequent refreshes per the content-refresh-system discipline; for this pass the date frontmatter is the load-bearing freshness signal.)*
  - `author: "Atlantis Tours"` *(currently `Atlantis Tours` ✅ — **DO NOT CHANGE.** Architecture §5b is explicit: "Skipper byline (`Nuno Albino`) on the experiential/practical pieces — CL1, CL2, CL3, CL6, CL8, the fishing trio. **`Atlantis Tours` org byline on the rest (CL4, CL5, CL7, CL9, CL10).**" CL5 is the comparison-style piece; the skipper byline is reserved for first-person operator pieces, not comparison/overview pieces. The org byline is intentional here and signals "comparative authority across operator's coastline" rather than "one skipper's day-on-the-water voice". If the writer is tempted to upgrade the byline because the other recent deepens (CL3, CL6) carry the skipper byline — STOP, that's architecture-design intent.)*
  - `image:` — current value `https://cdn.filestackcontent.com/BKMaJdWRcCnfS00Ch4As` is fine. **DO NOT change the image URL on the deepen.**
  - `imageAlt:` — current value "Sea cave arches along the Algarve coast near Benagil with turquoise water below yellow cliffs" is **factually accurate** (generic arches + the Benagil framing; no Alvor-lagoon hallucination, no operator-detail overclaim). **KEEP as-is.** *(Contrast with CL6 where the imageAlt was the load-bearing factual fix; CL5's imageAlt is clean.)*
  - `relatedTourSlugs:` *(currently `[benagil-caves-speed-boat-tour]` — UNDER-SPECIFIED. CL5's link graph (architecture §4d row "CL5 → speedboat (717720) + Cranchi (720028)" + the links CSV row `benagil-vs-other-sea-caves-algarve,tour:cranchi-yacht-cruise-to-the-benagil-caves (PK 720028),cluster->tour,a private Cranchi yacht to Benagil,planned`) specifies BOTH speedboat AND Cranchi. **Fix forward:** `relatedTourSlugs: [benagil-caves-speed-boat-tour, cranchi-yacht-cruise-to-the-benagil-caves]`. The PT equivalent uses the PT slugs — `[circuito-de-grutas-ate-benagil, cranchi-yacht-cruise-to-the-benagil-caves]` — the Cranchi slug is the same across locales in the current shipped tour data; verify on draft.)*
  - `tags:` *(currently `[benagil, caves, travel-tips]` — ADD `comparison`. Matches CL3's `seasonality` precedent and CL6's `seasonality` precedent: each cluster adds a tag that groups it in the taxonomy by editorial mode. CL5 is the comparison piece; the tag `comparison` is the natural group for "vs" / "which / who / what" decision pieces. Final tag set for CL5: `[benagil, caves, travel-tips, comparison]`. Reviewer can override in §16 if `comparison` feels off; alternative tags: `decision-guide`, `cave-tour-guide`. Default: `comparison`.)*
  - `faqs:` *(currently MISSING entirely — ADD. This is the single biggest AEO weight loss on the live file: no `faqs:` frontmatter means no `<details>` FAQ block visible AND no `FAQPage` JSON-LD emitted, which is the most-citable schema surface AI engines look for. Architecture §5b is explicit: "FAQ block + `FAQPage` schema where there's a natural Q&A (CL1, CL2, CL3, **CL5**, CL6 especially)" — CL5 is named on the FAQ list. See §10 for the 5–7 Q&A pairs.)*
  - `excerpt:` — current is fine ("The Algarve coast is riddled with sea caves, but only a handful make the tourist maps. Here is how Benagil compares to Marinha, Carvalho, and the lesser-known gems — and which one fits your trip best.") — KEEP as-is. The deepen doesn't justify rewriting the excerpt; it already lands the three load-bearing facets (Benagil + named comparables + "which fits your trip") and the head-query magnet (`benagil` + `marinha` + `algarve caves`).
  - `readingTime: 8` *(currently `6`; bump to `8` to reflect the ~1,500–1,800w target — roughly 7–9 min at 220 wpm. The reading-time field is a hint, not a contract.)*
  - `category: destinations` *(currently `destinations` ✅ — keep. Matches the "place-comparison" editorial mode of the piece.)*
- **Localized siblings — slugs LOCKED (URL-permanent, already shipped):**
  - pt: `benagil-vs-outras-grutas-marinhas-algarve`
  - es: `benagil-vs-otras-cuevas-marinas-algarve`
  - fr: `benagil-vs-autres-grottes-marines-algarve`

## 2. The query landscape this piece owns

Pulled from `SEO/research/2026-05-12-atlantis-keyword-map.md` (and the architecture doc §2 row CL5 which names the head queries explicitly). The architecture doc names CL5's owned queries: *`algarve caves` / `algarve cave tours` / `benagil vs marinha`*. The Alvor section serves keyword cluster **C6** (Benagil + Alvor / Ria de Alvor nature reserve) which has a separate primary surface (the Benagil+Alvor tour page, when built) — CL5 carries the informational/comparison half of C6 while that tour page is unbuilt.

### Primary keyword (head query)

- **`benagil vs marinha`** — the literal head-query magnet for CL5. The post owns this query specifically; no other piece in the hub or the SERP carries a comparison-shaped answer for it. The H2 #1 ("Which Algarve cave is better — Benagil or Marinha?" or similar) opens with the citation-shaped answer paragraph. **Primary deepen target.**
- **`algarve caves`** — the broader head query: someone researching "the caves of the Algarve" in general, not Benagil-specifically. The comparison table + the introduction set up that this isn't just-Benagil-content; it's the comparison/decision piece for the whole cave coast. **Secondary deepen target.**
- **`algarve cave tours`** — commercial-leaning sibling of `algarve caves`. The closing "Which One Should You Choose?" decision matrix + the Cranchi/speedboat in-body links carry this.
- **Search-snippet shape:** the H2 #1 (the "Short answer / Which cave should you pick" snippet block) opens with a sentence that answers the head query directly — see §6 for the proposed citation block. Don't bury it; don't soften it; do NOT add "it depends on what you're looking for" caveats above this paragraph (the matrix is below; the snippet block is the verdict).

### Secondary keywords (the long-tail variants CL5 owns)

- **`praia da marinha caves`** / `marinha sea arches algarve` — the "Marinha-specifically" facet; the H2 on Marinha owns. Snippet target for ID queries about the double-arch.
- **`benagil vs carvalho`** / `carvalho beach cave` — the Carvalho-specifically facet; the H2 on Carvalho owns.
- **`alvor caves`** / `alvor nature reserve` / `ria de alvor` — Alvor-specifically queries (keyword cluster C6; per the keyword map, `alvor nature reserve` and `alvor caves` are both at ~pos 10 in GSC — low-hanging fruit). The expanded Alvor section is the primary informational surface for these queries while the Benagil+Alvor tour page is unbuilt. The piece carries them; when the tour page ships, the tour page takes the commercial half of C6 and CL5 keeps the informational half. **Operator-priority deepen target** per the keyword map's §1 finding #4 ("We sell a 'Benagil + Alvor Nature Reserve' tour that effectively doesn't rank…cheap to capture").
- **`hidden algarve caves`** / `lesser known caves algarve` / `quiet algarve caves` — the "I want caves but not the crowd" facet; the Corredoura/Mesquita/Capela sections + the "Want caves but hate crowds" line in the decision matrix own.
- **`gruta da corredoura`** / `gruta da mesquita` / `gruta da capela` / `gruta dos arcos` — entity-specific long-tails; each named-cave H2/H3 + the comparison table own.
- **`best cave algarve`** / `which algarve cave to visit` — synonym of the head query; the comparison table + H2 #1 snippet block own.
- **`pontal alvor`** — geographic long-tail; the Alvor section's lede + the Pontal headland framing land it.
- **`algarve cave comparison`** / `algarve caves map` — meta-queries the comparison table catches.

### Long-tail / AEO surface (prompt-shaped queries AI engines see; FAQs catch)

- `which algarve cave is better — benagil or marinha` *(FAQ #1 — the head-query magnet, comparison decision)*
- `can you visit all the algarve caves in one tour` *(FAQ #2 — timing/route question; honest answer is no, you cover ~3–5 plus arches on a single tour)*
- `which algarve caves are not crowded` *(FAQ #3 — the off-piste angle, names Corredoura/Mesquita/Capela)*
- `what's the difference between algar de benagil and gruta da corredoura` *(FAQ #4 — entity-specific, ID query)*
- `is the ria de alvor worth visiting if you're short on time` *(FAQ #5 — the Alvor section's natural FAQ)*
- `can you swim at marinha beach after a boat tour` *(FAQ #6 — beach-stop question; this is allowed and is the load-bearing thing to mention vs the Benagil swim rule which CL2 owns; CL5 defers there)*
- `are the algarve caves dangerous` *(FAQ #7 — rockfalls/wildness, short, factual; ties to the "One Last Thing" closing about active erosion)*

### Volume note (inherited from pillar §2, CL2 §2, CL1 §2, CL3 §2, CL6 §2)

All volumes GSC-inferred and directional; no Ahrefs/Semrush licence on site. CL5's head query (`benagil vs marinha`) is **lower volume than CL6's** (`dolphin watching algarve`) but **higher decision-weight** — readers searching `benagil vs marinha` are mid-funnel and close to booking; CL5's job is to land the comparison cleanly and route them to the right tour page. The keyword map (§1 finding #4) flags the Alvor sub-cluster (C6) as the highest-ROI "we sell it, it doesn't rank" gap; CL5's Alvor section is the cheapest way to start capturing it while the Benagil+Alvor tour page is unbuilt.

## 3. Reader/intent profile + JTBD

- **Intent:** **Mid-funnel comparison.** The reader knows they want to see Algarve caves; they're now choosing which ones, and which kind of tour gets them there. Anxiety is low — this isn't a logistics piece (CL1) or a rules piece (CL2) — it's a "help me pick" piece. The undertone is "talk me out of doing just-Benagil-like-everyone-else if there's a better option, or confirm Benagil if it really is the right one."
- **Commercial intent grade:** **mixed (info-leaning, commercial-trailing)**. The "vs" queries are informational comparison; the "algarve cave tours" query is commercial. CL5 serves both — the body answers the informational comparison, the closing decision matrix + the speedboat/Cranchi in-body links capture the commercial.
- **Who:**
  - **Sub-profile A — "first-trip planner, optimising the highlight reel" (~40%).** Hasn't booked yet; flexible on which tour; trying to figure out whether to do just-Benagil or a wider cave tour that catches Marinha + Carvalho + the lesser-known ones. The comparison table + the H2 #1 verdict are load-bearing for them. They're choosing between (i) the cheap-and-fast Benagil-only speedboat from Portimão, (ii) a longer/private trip that covers more coast on a Cranchi yacht, (iii) the Alvor add-on that gets them the quiet sibling. CL5 confirms or refines their pick.
  - **Sub-profile B — "been to Benagil before, want something quieter this time" (~25%).** Has already done the icon; back in the Algarve and looking for the less-crowded alternative. The Corredoura / Mesquita / Capela / Alvor sections are load-bearing. The honest answer: yes, there are quieter and arguably more beautiful caves; ask operators specifically to spend time at them; or take the Benagil+Alvor combo.
  - **Sub-profile C — "photographer / pickier traveller" (~20%).** Knows Marinha is the postcard shot, wants the operator-grade take on when to shoot it vs Benagil, doesn't want to be at Benagil at 10:30 with five other boats. The "Marinha at sunrise. Benagil at 10:30." line (current draft line 75) is the load-bearing operator opinion. KEEP verbatim — it's the post's most quotable verdict.
  - **Sub-profile D — "nature-first traveller, dolphins/birds over arches" (~15%).** Less interested in the cave shots, more interested in the experience of the coast — wants to know if Alvor is worth their time. The expanded Alvor section is load-bearing. The honest answer: yes, if you have a half-day spare AND you like lagoon-and-birds more than arches-and-photos; do NOT skip Benagil for Alvor on a short trip.
- **Sophistication:** Medium-high on Algarve geography (they've already searched specific cave names — they know Marinha and Carvalho exist), low-medium on the lesser-known caves (Corredoura, Mesquita, Capela are likely new to them), low on the Ria de Alvor (they may know it exists, they don't know what it is — sea cave vs lagoon vs reserve). The brief assumes a reader who has already decided "Algarve caves" and is now narrowing.
- **JTBD (one sentence):** *"Tell me, opinionated and from the boats, which Algarve caves are actually worth my time given how I'm travelling, what surprises me beyond Benagil, and whether the quieter Ria de Alvor is worth swapping in or adding on."*
- **What they came in worried about:**
  - "Is Benagil overrated? Am I going to fight crowds for a 30-second photo?" (yes, in July/August at 10:30; no, at 07:30 or in late September; the answer is timing, not Benagil-itself; light defer to CL3 owns the timing depth)
  - "Are there better caves than Benagil that I'm missing because I haven't heard of them?" (yes — Corredoura, Mesquita, Capela are arguably more dramatic; they're less famous because they're harder to reach from the main ports)
  - "Should I do the standard speedboat or a private Cranchi yacht?" (depends on group size + budget; the Cranchi gets you more time per cave with no other boats)
  - "What's the Ria de Alvor actually like — is it just lagoon mud?" (no — it's a Ramsar wetland with flamingos, herons, sand dunes, calm water; it's NOT a sea cave coast; it's a complementary nature-reserve experience)
  - "Can I do all of them in one tour?" (no — depends on departure point + tour length; honest answer is 3–5 stops + arches on a typical tour; FAQ #2 owns)
- **What "good" looks like for this reader:** they leave the page knowing (1) the rough geography (where Marinha / Carvalho / Corredoura / Capela / Alvor sit relative to Benagil), (2) which one fits their travel mode, (3) that Alvor is a different category of experience (not a sea cave; a lagoon nature reserve), (4) Benagil is *correct* if they want the icon, and (5) which boat takes them where. They do NOT feel sold to; they feel briefed by someone who runs the boats and has opinions.

## 4. Anti-duplication (what other pieces own; where the boundaries are)

The biggest editorial risk for CL5 is **drifting into CL3's "best time to visit Benagil" lane** (the current draft has lines about going "early morning or off-season" — that's CL3 territory; CL5's mention of timing should be brief and link out to CL3 for depth), **drifting into CL2's "can you swim in the cave" lane** (CL5 must NOT recap the 2023 swim rules; one sentence about "the rules on swimming inside Benagil are a separate question" + a defer-link to CL2 is the maximum), **drifting into CL6's dolphin-depth lane** (CL5 mentions dolphins once in the Alvor section as a lateral cue + a link, not a paragraph), **drifting into CL7's marine-life lane** (CL5 names birds-in-Alvor in light-touch — flamingos / herons / egrets — but does NOT pivot into a marine-life census; that's CL7's job), and **drifting into the "things to do near Benagil" facet** (CL12-slot future cluster; not CL5's lane).

The cut line, in table form:

| Facet | Pillar covers | **CL5 covers** | CL1 covers | CL2 covers | CL3 covers | CL6 covers | CL7 covers | Speedboat tour page covers |
|---|---|---|---|---|---|---|---|---|
| What is the Algar de Benagil / geology / skylight | Full (H2 #1) | **Brief reference only — H2 "Algar de Benagil: The Icon" already does this; light tighten, do NOT expand** | — | — | — | — | — | — |
| Boat-type comparison (speedboat / Cranchi / sail / kayak) | Full (H2 #6) | **DO NOT enter — pillar H2 #6 is the depth source; CL5 mentions "small boats only" for Corredoura in one line, that's all** | — | — | — | — | — | — |
| Port-by-port (Portimão/Carvoeiro/Lagos/AdP) | Summary | **DO NOT enter — CL1 owns** | Full | — | — | — | — | — |
| 2023 cave swimming rules (Capitania edital) | Headline | **DO NOT enter — CL2 owns; CL5 may mention "you can no longer swim into Benagil from a boat tour — see [the rules](CL2 link)" in ONE sentence in the Algar de Benagil H2 or FAQ #6, defer the depth** | — | Full | — | — | — | — |
| **Best time to visit the Benagil cave specifically** | Full month-by-month (CL3 deepens) | **DO NOT enter — CL3 owns cave timing in depth; CL5 mentions "go early morning or off-season" in ONE phrase + link to CL3 for depth** | — | — | Full | — | — | — |
| **Best time to see DOLPHINS** | One-line in H2 #8 | **DO NOT enter — CL6 owns; CL5 mentions dolphins in the Alvor section as a lateral cue + link to CL6** | — | — | — | Full | — | — |
| **Three dolphin species + ID marks** | Two-line mention | **DO NOT enter — CL6 owns** | — | — | — | Full | — | — |
| **Decreto-Lei 9/2006 (cetacean-watching regulation)** | Not covered | **DO NOT enter — CL6 owns** | — | — | — | Full | — | — |
| **General marine life (turtles, seabirds, sunfish, octopus)** | Not covered at depth | **DO NOT enter — CL7 owns; CL5's Alvor section mentions birds (flamingos/herons/egrets) in light touch as PART OF the Alvor experience, and defers the broader marine-life lateral to CL7 once** | — | — | — | Limited | Full | — |
| **The named caves & comparison** | One paragraph (H2 #7 of pillar) | **YES — CL5 owns the comparison in depth (the new comparison table + the H2-per-cave structure) — this is the spine of the piece** | — | — | — | — | — | — |
| **Algar de Benagil vs Marinha vs Carvalho head-to-head** | Not covered | **YES — CL5 owns; the H2 #1 verdict snippet + the comparison table** | — | — | — | — | — | — |
| **Lesser-known caves (Corredoura, Mesquita, Capela, dos Arcos)** | Not covered | **YES — CL5 owns; each cave gets a tight section + a comparison-table row** | — | — | — | — | — | — |
| **Ria de Alvor as a NON-CAVE alternative** (lagoon reserve, birds, dolphins-off-coast-not-into-lagoon, calm-water paddleboarding) | Not covered | **YES — CL5 owns (the EXPANDED Alvor section is the load-bearing addition in this deepen)** | — | — | — | — | Light mention OK | — |
| Commercial booking depth, prices | Pillar H2 #12 | **DO NOT enter — closing tour links + speedboat/Cranchi pages own** | — | — | — | — | — | Full |
| Departure point details, drive-times, parking | Pillar H2 #4 + CL1 | **DO NOT enter — CL1 owns** | — | — | — | — | — | — |
| "Things to do near Benagil" / village info / restaurants | Not covered | **DO NOT enter — future CL12-slot facet** | — | — | — | — | — | — |

### The load-bearing rules for CL5

1. **Stay between 1,500 and 1,800 words EN body.** If the writer wants more, a section probably belongs in a different cluster (CL3 for timing depth, CL6/CL7 for wildlife depth, the pillar for boat-type depth, CL1 for logistics depth). Word count is a discipline. **The 1,800 ceiling is hard.** PT/ES/FR will run +15–25% per the translation pattern, which is fine — the EN ceiling is what we enforce.
2. **CL5 is the COMPARISON / DECISION LENS.** Every section asks "compared to what" and ends with a "best for" verdict. The post is opinionated by design; the operator org byline gives it license to take comparative positions ("Marinha at sunrise. Benagil at 10:30.") that a single-skipper first-person piece can't carry quite as cleanly.
3. **Do NOT recap the 2023 cave swim rules.** CL2 owns. If swimming-inside comes up, one sentence + a link to CL2; that's it.
4. **Do NOT build a marine-life census.** CL7 owns. Alvor's flamingos / herons / egrets are PART OF the Alvor experience (the whole reason a nature-reserve coast feels different from a cave coast); name them lightly, defer broader marine-life to CL7.
5. **Do NOT recap dolphin biology.** CL6 owns. One mention of "dolphins you might pass on the way" in the Alvor section with a CL6 lateral link is the maximum — do NOT name species, do NOT cite seasonality, do NOT mention Decreto-Lei 9/2006.
6. **Do NOT hyperlink to a non-existent Benagil+Alvor tour page.** The Benagil+Alvor product (FareHarbor PK 717728) exists but has NO built `/tours/` page in the current Astro site (verified: `/en/tours/benagil-caves-speed-boat-tour`, `/en/tours/cranchi-yacht-cruise-to-the-benagil-caves`, `/en/tours/luxury-sail-yacht-cruise`, `/en/tours/reef-fishing-tour` — and that's it). The Alvor section MAY refer to "the Benagil + Alvor combo" / "the Benagil + Alvor route" / "a Benagil+Alvor day" as a **concept/route**, but MUST NOT link to a non-existent URL. The future tour→guide auto-wiring is already in place (line 44 of `src/lib/tour-guides.ts` maps PK 717728 → `benagil-vs-other-caves` translationKey), so the inbound link will materialise when the tour page ships; CL5 doesn't need to push the outbound link before the page exists.

## 5. SEO/AEO/GEO targets

### Featured-snippet target (the citation block)

The H2 #1 ("The short answer / Which Algarve cave should you pick?") opens with the 40–60-word answer paragraph in §6 below. That's the featured-snippet target for `benagil vs marinha`, `algarve caves`, `which algarve cave to visit`, and `best cave algarve`. Don't bury it; don't soften it.

### `FAQPage` schema target (the AEO surface)

The `faqs:` frontmatter block emits both the visible `<details>` Q&A list AND the `FAQPage` JSON-LD via the existing site pipeline (same wiring as pillar + CL1 + CL2 + CL3 + CL6). Each FAQ answer is 40–60w, snippet-shaped, complete-sentence. FAQ #1 ("Which Algarve cave is better — Benagil or Marinha?") is the head-query magnet; FAQ #5 ("Is the Ria de Alvor worth visiting if you're short on time?") catches the C6 informational query. See §10 for the full 5–7 Q&A pairs.

### `ItemList` schema target (the NEW AEO surface, CL5-specific)

The comparison table is wrapped in an inline `<script type="application/ld+json">` block emitting an `ItemList` with 5–6 `TouristAttraction` (or `Place` — see §6/§16) items. This is a CL5-only structural addition (no other cluster has an ItemList; pillar + CL1 + CL2 + CL3 + CL6 all use `FAQPage` + `Article` + `BreadcrumbList`). The site doesn't currently have a `buildItemList` helper or an `itemList:` frontmatter field — the JSON-LD goes inline in the markdown body as a raw `<script>` block, which Astro passes through. See §6 + §11 for the exact JSON-LD shape.

### Entity-coverage list (AEO/GEO — named entities AI engines look for; load-bearing)

Required entities the piece must work in naturally (not stuffed). The pillar's entity list applies broadly; CL5 has a tight "named caves + named beaches + Ria de Alvor protected status" focus.

**Cave / arch / beach entities (load-bearing for AI-engine ID query handling — every named entity here gets a comparison-table row OR a body mention):**
- **Algar de Benagil** (the icon — load-bearing throughout; the post's anchor entity).
- **Praia da Marinha** (the postcard arches — H2 + comparison-table row). Cite the proper Portuguese name.
- **Praia do Carvalho** (the tunnel-access beach — H2 + comparison-table row).
- **Gruta da Corredoura** (one of the Benagil-neighbour chambers — H2 "Benagil neighbours" + comparison-table row).
- **Gruta da Mesquita** (the other Benagil-neighbour chamber — same H2 + same table row OR separate row, see §6 / §16).
- **Gruta da Capela** ("Chapel Cave" — the high-vaulted-ceiling cave further west — H2 + comparison-table row).
- **Gruta dos Arcos** ("Arches Cave" — multi-entrance cave further west — H2 + may share a comparison-table row with Capela depending on the operator's preference, see §16).
- **Pontal headland** — the geographic marker between Portimão and Alvor; the Alvor section's geographic anchor (one mention).
- **Ria de Alvor** (the canonical Portuguese name) — the Alvor section's anchor entity. Use "Ria de Alvor" interchangeably with "Alvor estuary" in EN. **Do NOT use "Alvor lagoon" as a stylistic synonym** — the strict editorial line is that Atlantis doesn't sail INSIDE the lagoon (see §13 #1 hallucination guardrail and the load-bearing factual fix the CL6 brief carries).

**Geographic entities:**
- **Algarve** (passim) · **Portimão** (lede + Alvor section — "west from Portimão toward Alvor" geographic anchor) · **Lagos** (in the Capela/dos Arcos section — "further west, between Portimão and Lagos") · **Lagoa** (in the Algar de Benagil H2 — "Lagoa municipality") · **Benagil village** (Algar de Benagil section + Carvalho section — "just east of Benagil village") · **Porto Comercial de Portimão** (only if departure is named; load-bearing anti-pattern carried from pillar + CL1 + CL2 + CL3 + CL6 — see §13 #2) · **Atlantic** (one mention — the body of water; entity for AEO weight).

**Protected-status entities (load-bearing for the Alvor section — these are the citation surfaces no other Algarve-caves SERP page carries):**
- **Natura 2000** (the EU protected-areas network; Ria de Alvor is a Special Area of Conservation — SAC — under Natura 2000). One mention in the Alvor section's lede or the "what it is" paragraph.
- **Ramsar Convention** / **Ramsar wetland of international importance** (Ria de Alvor was designated a Ramsar site in 1996). One mention in the Alvor section. The Ramsar designation is the most-citable protected-status entity AI engines weight for "what is X" queries; treat it as load-bearing for the Alvor section's citation surface.
- **Quinta da Rocha** — the inland peninsula at the head of the Ria de Alvor estuary; optional one mention if the writer wants geographic precision. Not load-bearing.
- **ICNF** (Instituto da Conservação da Natureza e das Florestas — the agency that manages Portuguese nature reserves, including Ria de Alvor). Optional one mention; carrying it adds AEO weight that pairs with CL6's ICNF mention (cetacean-watching licensing) for cross-cluster entity reinforcement, but it's not strictly necessary for CL5.

**Birdlife entities (light touch, Alvor-section-only — load-bearing for the Alvor experience's distinctiveness vs the cave coast):**
- **Greater flamingo** (the headline bird — Ria de Alvor is one of the few Algarve sites with reliable flamingo sightings). One mention; the existence of flamingos is the single most-citable Alvor-experience fact.
- **Heron** / **little egret** / **purple heron** — name 2–3 wading birds in light touch. Don't make it a birdlife census; one short sentence with 2–3 birds + "and roughly 200 recorded species" framing.
- **Black-winged stilt** / **avocet** / **black-tailed godwit** — optional further specificity. Pick 1–2 if it adds colour; don't list more than 5 species total in the Alvor section.

**Activity entities (Alvor-section-only):**
- **Kayak** / **canoe** (verified: kayak and canoe hire is available from Alvor village; this is the standard small-craft access into the estuary itself).
- **Stand-up paddleboard** / **SUP** (verified: SUP-friendly water in the estuary's calm inner reaches).
- The phrase "**by boat from Portimão**" — the load-bearing distinction that the **Atlantis Benagil+Alvor product covers the Alvor experience as a combined boat-from-Portimão route** without taking the boat INSIDE the lagoon. The route reaches the Pontal headland + the estuary mouth; small-craft hire is the standard way to go INSIDE the estuary. CL5's body should be precise about this distinction.

**Entities NOT to use:**
- `Clube Naval` / `Marina de Portimão` / `Portimão Marina` — wrong entities (pillar + CL1 + CL2 + CL3 + CL6 enforce; load-bearing anti-pattern).
- The phrase **"dolphins routinely follow small boats into the lagoon"** (the current draft EN line 66 + the PT/ES/FR equivalents — see §7 / §13 for the load-bearing temper). WebSearch verified 2026-05-15: dolphins live in the open Atlantic OFF Alvor; canoes/kayaks operate inside the estuary; routine dolphin-into-the-lagoon entry is NOT a verified or operator-grade claim. Temper to: dolphins are commonly seen in the Atlantic off the Alvor coast (NOT inside the lagoon).
- `Capitania do Porto de Portimão` — CL2's regulator; not relevant for CL5.
- Decreto-Lei 9/2006 — CL6's regulation; not relevant for CL5.
- Specific euro prices for tours — pillar / tour pages own; CL5's closing routes to tours, doesn't quote prices.
- Specific drive-times — CL1's territory.
- Specific named individuals (skippers, fatalities) — inherited anti-pattern from pillar §13 + CL2 §13 + CL6 §13.
- "Albufeira" as a departure port for a Benagil tour — Atlantis runs from Portimão only; the current draft EN line 78 mentions "Benagil-only speed boat from Portimão or Albufeira" — strike "or Albufeira" (Atlantis doesn't run from Albufeira; the mention drifts into general industry, not Atlantis-operator).

**Entities in the first 200 words (AEO weight on the lede + H2 #1 answer paragraph):**
- Algarve · Benagil (head-query weight) · Algar de Benagil OR Marinha (so the comparison framing is set in the first 200w) — at least 3 named entities. The current lede lands "Algarve caves" and "Algar de Benagil" in the first 80w; the deepen's H2 #1 answer paragraph lands the Marinha + Benagil comparison explicitly.

## 6. Structure & H2 outline (with one-line scope per H2 + KEEP / EXPAND / NEW / RENAME tag)

**Target word count EN body: 1,500–1,800 words** (target ~1,650). The current draft is ~1,050w; the deepen adds ~500–750 words via the comparison table (~150–200w of structured content), the expanded Alvor section (+300–400w over the current 2 paragraphs), the new H2 #1 snippet block (~120w), and the `faqs:` frontmatter (the FAQ content itself becomes visible Q&A which the reader sees; not all of it counts toward body word count). **8–10 H2s** (current draft has 7; deepen adds 2 — the new H2 #1 snippet block and the new H2 for the comparison table; the existing 7 H2s stay with the Alvor H2 EXPANDED). Each H2 opens with a **40–60-word answer paragraph** (AEO/GEO citation surface). Per-section word counts below sum to ~1,500–1,750; section bands are upper-flex ceilings, not floors.

### Lede / hero (no H2)

- **Tag:** **EXPAND** (keep the existing two-paragraph lede; add the pillar↑ callout in the first 200w; add a one-line comparison-piece framing).
- Word count: **~120–150w** (current is ~90w; the deepen adds the pillar callout + one framing line).
- Sets the scope: this isn't a Benagil love letter, it's a comparison piece; opens with the dominance-of-Benagil observation + the operator's positioning that there's more to the coast.
- **Pillar callout in the first 200 words** (per pillar brief §5b cluster anatomy + CL3/CL6 hero pattern). **Anchor text exactly: `our complete guide to the Benagil cave tour`** (per CSV row `benagil-vs-other-sea-caves-algarve,benagil-cave-tour-complete-guide,"cluster->pillar (bottom-up, intro+closing)",our complete guide to the Benagil cave tour,planned` — verbatim from the CSV; the closing instance uses a varied anchor, see "Closing" H2 below). Target: `/en/blog/benagil-cave-tour-complete-guide/`. Suggested phrasing for the deepen: "If you search 'Algarve caves' online, roughly 90% of the images you'll see are of one place: Algar de Benagil. The cave deserves its fame — there's a separate piece for that, [our complete guide to the Benagil cave tour](/en/blog/benagil-cave-tour-complete-guide/). This one is the comparison: how Benagil stacks up against Marinha, Carvalho, the lesser-known chambers further along the coast, and the Ria de Alvor estuary west of Portimão — and which fits your trip best."
- Do NOT bury the lede. Do NOT start with "Are you planning a trip to the Algarve?" or "The Algarve is one of Portugal's most beautiful regions." Both are in pillar §13 / CL1 §13 / CL2 §13 / CL3 §13 / CL6 §13 banned-opener lists. The current draft's opener ("If you search 'Algarve caves' online…") is good — KEEP, lightly tighten and weave in the pillar link.

### H2 #1 — "The short answer: which Algarve cave should you pick?" *(featured-snippet target — NEW)*

- **Tag:** **NEW.** The current draft doesn't have an H2 #1 snippet block. The deepen ADDS this as the first H2, displacing nothing — it slots before the existing "Algar de Benagil: The Icon" H2. This is the highest-leverage AEO addition on the page.
- Word count: **~120w.** Deliberately short — this is the citation block.
- **Answer paragraph (40–60w, write it as the snippet, not as a paragraph):**
  > **Most first-time visitors should pick Benagil — the Algar de Benagil sea cave is the Algarve's icon for a reason. Praia da Marinha edges it for sunrise photography. Praia do Carvalho is the calmer beach-stop alternative. For quieter caves, the Benagil-neighbour chambers Corredoura and Mesquita are arguably more dramatic. For a non-cave nature day, the Ria de Alvor estuary is the quiet sibling.**
- Then 1 short paragraph (~60–80w) summarising the rest of the piece's shape. Suggested: "Each of these has a different right-time, a different right-tour, and a different reason to pick it. Benagil's strength is the skylight chamber; Marinha's is the double-arch silhouette; Carvalho's is the staircase tunnel; the Corredoura/Mesquita pair are dramatic but smaller-boat-only; Capela and Arcos sit further west and need a longer tour to reach; Alvor is a category apart — a Ramsar wetland reserve, not a cave coast. The matrix below pulls the trade-offs into one view."
- **Do NOT** enter per-cave depth here — that's H2 #2 onwards. The H2 #1 citation block earns its weight by being clean and definitive. It's the verdict the reader skim-scrolls to.

### H2 #2 — "At a glance: the Algarve caves compared" *(comparison table + ItemList JSON-LD — NEW)*

- **Tag:** **NEW.** The current draft doesn't have a comparison table. The deepen ADDS this as the SECOND H2 (after the H2 #1 verdict), BEFORE the per-cave H2s. This is the second-highest-leverage AEO addition on the page (after H2 #1) AND the page's primary `ItemList`-schema surface.
- Word count: **~180–220w** (a short framing paragraph above the table + the table itself + a short framing paragraph below).
- **Opening answer paragraph (40–60w)** — write fresh, BEFORE the table: "Six places anchor the Algarve sea-cave coast — five caves and the Ria de Alvor nature reserve. The table below pulls the trade-offs into one view: where each sits, what it's famous for, who it's best for, whether you need a boat, and how busy it gets. The bodies below go into each one in turn."
- **THE COMPARISON TABLE** (the new structural asset on the page; mirror the CL6 species-table pattern):

  | Cave / place | Where | Famous for | Best for | Boat-only? | Crowd level |
  |---|---|---|---|---|---|
  | **Algar de Benagil** | Lagoa coast, east of Benagil village | Circular skylight in the roof; sand beach inside | First-time visitors, photographers chasing the sun-beam | Yes (since 2023) | Very high (Jul–Aug) |
  | **Praia da Marinha** | ~1.5 km west of Benagil | Twin arches ("heart" silhouette); cleanest swim beach | Sunrise photography, post-tour beach stop | No — also reachable on foot | Medium |
  | **Praia do Carvalho** | Just east of Benagil village | Beach reached by a tunnel cut through the cliff | Beach-day combinations, quieter swim stops | No — staircase access from above | Low–medium |
  | **Gruta da Corredoura & Gruta da Mesquita** | A few hundred metres east of Algar de Benagil | Long tunnel-arches, electric-blue water, high shadowed walls; larger than Benagil in volume | Travellers wanting caves without the Benagil crowd | Yes — small boats only inside | Low |
  | **Gruta da Capela & Gruta dos Arcos** | Further west, between Portimão and Lagos | High vaulted "nave" ceiling (Capela); multi-entrance rock-curtain chambers (Arcos) | Longer trips, slower itineraries, less famous routes | Yes (longer tours from Portimão / Lagos) | Very low |
  | **Ria de Alvor** | West of Portimão, around Pontal headland | Ramsar wetland — sand dunes, salt pans, flamingos, herons; calm shallow water | Nature-first travellers; kayak/SUP; the quieter coast alongside the caves | No — kayak / SUP / boardwalk access | Very low |

  *(Operator decision in §15 on whether to keep 6 rows or merge the Corredoura+Mesquita pair into one row + the Capela+Arcos pair into one row to land at 5 rows total. The default recommendation is the 6-row layout above — both lesser-known cave pairs are lumped already; reducing further loses the comparison-table's value. See §15 #1.)*

- **Closing framing paragraph (~40–60w)** under the table: "Two things the table doesn't show: timing (the same cave is a different place at sunrise, at midday with the sun-beam, and at five in the afternoon when the light is flat — see [the best time to visit the Benagil caves](/en/blog/best-time-visit-benagil-caves/) for the depth) and what boat to take, which depends on which combination you're after."

- **ItemList JSON-LD** — embed an inline `<script type="application/ld+json">` block directly under the closing framing paragraph. Proposed shape (writer adapts in draft):

  ```json
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "The Algarve sea caves and the Ria de Alvor compared",
    "description": "The five main Algarve sea caves between Portimão and Lagos, plus the Ria de Alvor nature reserve — where each sits, what each is famous for, and which fits your trip.",
    "numberOfItems": 6,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "TouristAttraction",
          "name": "Algar de Benagil",
          "description": "Domed sea cave with a circular skylight in the roof and a sand beach inside; reachable only from the water since the 2023 access rules.",
          "containedInPlace": { "@type": "Place", "name": "Lagoa, Algarve, Portugal" }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "TouristAttraction",
          "name": "Praia da Marinha",
          "description": "Beach famous for its twin sea arches and clean swimming water; reachable on foot or by boat.",
          "containedInPlace": { "@type": "Place", "name": "Lagoa, Algarve, Portugal" }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "TouristAttraction",
          "name": "Praia do Carvalho",
          "description": "Small beach reached by a tunnel cut through the cliff; calm swim stop on most boat tours.",
          "containedInPlace": { "@type": "Place", "name": "Lagoa, Algarve, Portugal" }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "TouristAttraction",
          "name": "Gruta da Corredoura and Gruta da Mesquita",
          "description": "Pair of lesser-photographed cave chambers near Algar de Benagil with long tunnel-arches; accessible only to small boats.",
          "containedInPlace": { "@type": "Place", "name": "Lagoa, Algarve, Portugal" }
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "TouristAttraction",
          "name": "Gruta da Capela and Gruta dos Arcos",
          "description": "Caves further west between Portimão and Lagos, with vaulted ceilings and multi-entrance arches; reached on longer boat tours.",
          "containedInPlace": { "@type": "Place", "name": "Algarve, Portugal" }
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "TouristAttraction",
          "name": "Ria de Alvor",
          "description": "Ramsar-listed wetland nature reserve west of Portimão, with sand dunes, salt pans, and reliable flamingo, heron and egret sightings; explored on foot, by kayak, or by boat-from-Portimão route.",
          "containedInPlace": { "@type": "Place", "name": "Portimão, Algarve, Portugal" }
        }
      }
    ]
  }
  ```

  - **Lat/lng:** the writer / Sonnet schema-pass MAY add `geo: {"@type": "GeoCoordinates", "latitude": "X", "longitude": "Y"}` to each `TouristAttraction` only IF defensible coords are easy to source — but the default recommendation is **omit lat/lng** for this ItemList. Reason: precise cave-mouth coordinates are not load-bearing for the schema's AEO value (the descriptive names + containedInPlace are sufficient for entity resolution), and inventing fuzzy coords risks Google quality-evaluator correction. If the operator already has a verified coordinate set for the operator-route waypoints, surface in §16 and the writer adds them.
  - **`@type`:** the writer uses `TouristAttraction` for the cave entries (each is a named place tourists visit) and keeps the same `@type` for the Ria de Alvor row (a Ramsar wetland is unambiguously a tourist attraction). Alternative: use `LandmarksOrHistoricalBuildings` for Algar de Benagil specifically and `BodyOfWater` / `Beach` for Marinha + Carvalho — but the cross-type schema fragments more than it adds, and `TouristAttraction` is the canonical schema.org type for "named place a visitor goes to see". Default: `TouristAttraction` for all 6.
  - **`containedInPlace`:** the writer fills in `Lagoa` for the four caves in Lagoa municipality (Benagil, Marinha, Carvalho, Corredoura+Mesquita), `Algarve, Portugal` for the pair further west, and `Portimão, Algarve, Portugal` for Ria de Alvor. The municipality precision is checkable but not load-bearing; if uncertain on a single cave, drop to `Algarve, Portugal`.
  - **Operator decision in §15 on whether to ship the ItemList at 5 rows or 6 rows.** The 6-row default mirrors the table; if the operator picks 5 rows (merging the two pairs into single rows), the ItemList rows match. See §15 #1.

### H2 #3 — "Algar de Benagil: The Icon" *(KEEP — light tighten only)*

- **Tag:** **KEEP** (the existing H2 is good; it lands the entity, gives the geology + crowd + timing verdict, and is appropriately short). Light copy-tightening only.
- Word count: **~180–200w** (current is ~190w; no net add).
- The H2 carries the **Where / Famous for / Best for** mini-bullet block which is the post's established sub-section pattern. KEEP the pattern across all per-cave H2s.
- **Opening answer paragraph (40–60w)** — light rewrite or keep from current draft lines 32–34: "The combination of a sandy floor, a domed ceiling, and a perfectly round natural skylight is rare — most sea caves are either wet all the way through or have a narrow ceiling crack, not a clean circular opening. The effect inside, especially around midday, genuinely does look like something a designer invented."
- The current draft's "crowds verdict" paragraph (line 34) is KEEP — "Go early morning or off-season if you want the place to yourself." This is the soft CL3 defer; CL5 owns the crowds verdict but defers the timing depth. If the writer wants to firm the link: "Go early morning or off-season — see [the best time to visit the Benagil caves](/en/blog/best-time-visit-benagil-caves/) for the month-and-tide depth." (Optional lateral; not required by the CSV but architecture §4c allows CL5 → CL3 as a natural lateral.)
- **Optional one-sentence swim-rule defer:** "And to head off the usual question — you can no longer swim into Benagil from a boat tour; the rule is covered in detail in [our piece on the 2023 swim rules](/en/blog/can-you-swim-benagil-cave/)." This is the CL2 defer. Writer's call whether to include in this H2 or in FAQ #6. Default: skip from the H2; put in FAQ. Surface in §16 if operator prefers in-body.
- Skylight-vocabulary contract: use **"skylight"** (and **"oculus"** as the existing draft does once in the bullet block) — these are the pillar's established EN terms. Do NOT introduce "hole" / "opening" / "porthole" as fresh synonyms.

### H2 #4 — "Benagil neighbours: Corredoura and Mesquita" *(KEEP — light tighten only)*

- **Tag:** **KEEP** (the existing H2 is good — it correctly positions these chambers as the "Benagil but quieter" alternative, names the small-boat-only access constraint, and gives the operator-grade tip about asking the skipper for time inside).
- Word count: **~130–150w** (current is ~125w; no net add).
- The H2 does NOT use the **Where / Famous for / Best for** bullet block (the pair gets a unified narrative paragraph instead) — KEEP the structural difference; these are a paired pair, not separate iconic entities.
- Light copy-tightening only. The current draft's operator line ("ask the skipper to spend a few minutes inside — they usually will") is KEEP-VERBATIM — it's the operator-voice cue the comparison piece earns.

### H2 #5 — "Marinha Beach Arches" *(KEEP — light tighten only)*

- **Tag:** **KEEP** (the existing H2 is good — it explains why Marinha is on every boat route, names the double-arch / heart silhouette, and lands the swim-stop verdict).
- Word count: **~150–170w** (current is ~150w; no net add).
- The H2 uses the **Where / Famous for / Best for** bullet block — KEEP.
- The opening answer paragraph (current draft line 48) is fine; light tighten only.
- One light addition the writer may consider: a sentence about Marinha's protected-area status (it's within the Costa Vicentina Natural Park — but only partially; the precise designation is the Litoral do Algarve protected coastal landscape, which gets confusing). **Default: skip** the protected-status mention here; Marinha is famous as an arch + beach destination, not as a protected area in the reader's mental model. If the writer wants protected-area depth, the Alvor section is where it goes. Surface in §16 if operator wants Marinha protected-status added.

### H2 #6 — "Carvalho Beach and Cave Entrance" *(KEEP — light tighten only)*

- **Tag:** **KEEP** (the existing H2 is good — it gives the unique tunnel-staircase access, the calm-water swim-stop verdict, and the comparison-to-Marinha undertone).
- Word count: **~130–150w** (current is ~130w; no net add).
- The H2 uses the **Where / Famous for / Best for** bullet block — KEEP.
- Light copy-tightening only.

### H2 #7 — "Gruta dos Arcos and Gruta da Capela" *(KEEP — light tighten only)*

- **Tag:** **KEEP** (the existing H2 is good — it positions these as the off-piste options, gives the geographic distance constraint, names the tour-length requirement).
- Word count: **~110–130w** (current is ~110w; no net add).
- The H2 does NOT use the **Where / Famous for / Best for** bullet block (it's a pair, narrative-only) — KEEP the structural difference.
- Light copy-tightening only.

### H2 #8 — "Pontal and the Ria de Alvor estuary" *(EXPAND + RENAME — the load-bearing addition in this deepen)*

- **Tag:** **EXPAND + RENAME from "Pontal and Alvor Lagoon Arches"** — the rename is load-bearing. The current title's "Alvor Lagoon Arches" framing implies arches inside the lagoon, which is misleading: there are no notable sea caves at Pontal; the load-bearing entity is the **Ria de Alvor estuary** (a Ramsar wetland), not a lagoon-with-arches. The rename matches the canonical entity and the keyword cluster C6 query family. Suggested rename: **"Pontal and the Ria de Alvor estuary"** OR **"The Ria de Alvor estuary: the quiet sibling"**. The writer picks; the reviewer locks in §16. Default: "Pontal and the Ria de Alvor estuary" (geographic precision + entity match).
- Word count: **~350–450w** (current is ~85w in two short paragraphs; the deepen adds ~300–360w via the expansion below). This is the single largest expansion in the deepen.
- The framing arc: **(1)** open with what the Ria de Alvor actually is — a Ramsar wetland reserve, not a sea cave coast; **(2)** describe the protected status precisely — Natura 2000 Special Area of Conservation + Ramsar wetland; **(3)** the geography — Pontal headland separating it from the cave coast; salt pans, sand dunes, intertidal flats; **(4)** the wildlife — flamingos / herons / egrets light-touch (~200 recorded bird species framing); **(5)** the access mode — kayak/canoe/SUP inside the estuary, boardwalk on foot, boat-from-Portimão for the Pontal+estuary-mouth approach (without taking the boat INSIDE the lagoon); **(6)** the dolphins clarification — dolphins are commonly seen in the Atlantic OFF the Alvor coast, NOT routinely inside the lagoon (the load-bearing factual temper); **(7)** the Benagil + Alvor combo framing — operator runs a route that pairs Benagil + Alvor as a single day, without claiming a built tour page link.
- **Opening answer paragraph (40–60w)** — write fresh: "Head west from Portimão around the Pontal headland and the coast changes character entirely. The Ria de Alvor isn't a sea cave coast — it's an estuary nature reserve, designated a Natura 2000 Special Area of Conservation and a Ramsar wetland of international importance. Sand dunes, salt pans, and 200-plus recorded bird species replace the cliffs and chambers."
- **The protected-status paragraph (~70–90w):** "The Ria de Alvor covers 1,454 hectares of intertidal flats, salt pans, and stable + mobile dunes on either side of the Alvor and Odiáxere river mouths. It's protected at two levels: Natura 2000 lists it as a Special Area of Conservation (SAC) for habitat reasons; the Ramsar Convention added it in 1996 as a wetland of international importance — the second-most-protected wetland status in international conservation law. The Western Algarve's most important wetland."
- **The wildlife paragraph (~80–100w):** "The estuary is one of the finest places in the Algarve for birdwatching. Greater flamingos are the headline bird — pink-grey waders roaming the salt pans, reliable from autumn through spring. Little egrets, grey herons, and occasionally purple herons work the mudflats. Black-winged stilts, redshanks, avocets, ringed plovers, and black-tailed godwits move through on migration. The estuary is a critical staging post for thousands of birds twice a year, spring and autumn. Roughly 200 species are recorded in total — more than most Algarve naturalists ever tick off."
- **The access-mode paragraph (~70–90w):** "Two ways in. From inside, the standard small-craft route is by kayak, canoe, or stand-up paddleboard — hire is available from Alvor village, and the calm shallow water makes it accessible even to beginners. From outside, there's a boardwalk that runs along the southern dune-edge of the estuary, which is the easiest on-foot access. Boat-from-Portimão tours that pair Benagil with Alvor (we run one; the [boat-from-Portimão route](/en/tours/) — see §11 link policy on whether this anchor is a `/tours/` listing link or skipped) reach the Pontal headland and the estuary mouth, without taking a larger boat inside the lagoon."
  - *(Writer note: this paragraph contains the single in-body link to `/en/tours/` — a listing-page link to the operator's full tours, since the Benagil+Alvor product itself has no built tour page. Writer's call on whether to include this link; default is YES because it lands a soft commercial cue without overclaiming a tour-page URL that doesn't exist. Surface in §16 if operator prefers leaving the listing link out entirely. Anchor variants: `our coastal tour list`, `the boat tours we run from Portimão`, `our Portimão boat tours`. Reviewer picks anchor in §16.)*
- **The dolphins-temper paragraph (~40–60w):** "Dolphins are commonly seen in the open Atlantic off the Alvor coast — common and bottlenose pods feed in the productive water around the river mouths. They don't usually swim deep into the lagoon itself; the resident-pod patterns are open-coast, not estuary-shallow. The detail on Algarve dolphin species and best months is [over here](/en/blog/dolphin-watching-algarve-species-seasons/)." *(This is the lateral to CL6 — the load-bearing temper of the existing draft's "dolphins routinely follow small boats into the lagoon" overclaim. See §13 #3 for the source-verification context.)*
- **The verdict paragraph (~50–70w):** "Alvor isn't a swap for Benagil; it's a category apart. If you have a half-day spare and you like nature reserves more than arches, it surprises people. If you're on a tight one-Algarve-day-only schedule and you came for the caves, do Benagil first and save Alvor for next trip. The combination — Benagil cave + Alvor estuary in a single boat-from-Portimão day — is the operator's preferred 'see both worlds' route."
- **What NOT to include in this section** (anti-duplication, load-bearing):
  - **DO NOT** name "Alvor lagoon" as a stylistic synonym for "Ria de Alvor" — the canonical name is Ria de Alvor / Alvor estuary; "lagoon" implies a different geomorphology and conflicts with the CL6 brief's load-bearing "Atlantis doesn't sail in the Alvor lagoon" rule. (Note: a Ramsar-recognised coastal lagoon IS what Ria de Alvor technically is in hydrological terms — but the operator-editorial convention enforced across the hub is to call it "estuary" / "Ria de Alvor" / "nature reserve" and reserve "lagoon" for the inland salt-pan ponds inside the reserve. Honour the convention.)
  - **DO NOT** claim dolphins routinely follow boats INTO the lagoon — temper to "in the Atlantic off the Alvor coast" per WebSearch verification.
  - **DO NOT** name the Benagil + Alvor product as a `/tours/` URL — it has no built page. Link to `/en/tours/` (the listing) at most. See §11.
  - **DO NOT** pivot into broader marine-life census (turtles / sunfish / octopus) — CL7's lane; the Alvor section's wildlife is BIRDS, not marine life.
  - **DO NOT** name the Decreto-Lei 9/2006 or any cetacean regulation — CL6's lane.
  - **DO NOT** confuse Ria de Alvor with Ria Formosa (the much larger Eastern-Algarve lagoon-and-island system around Faro). Different reserve, different geography. If the writer mentions either as a comparison, it's a footnote at most.

### H2 #9 — "Which One Should You Choose?" *(KEEP — light tighten only)*

- **Tag:** **KEEP** (the existing H2 is good — it's the decision-matrix that closes the comparison and reads as opinionated-from-the-boats; the bullet list of "if you are X, the answer is Y" is the operator-voice signature).
- Word count: **~120–150w** (current is ~120w; light tighten only — strike "Albufeira" from the speedboat bullet per anti-pattern #5; otherwise KEEP).
- KEEP the operator-voice line "Marinha at sunrise. Benagil at 10:30." (current line 75) verbatim — this is the post's most quotable verdict and the closest the comparison piece comes to a brand-attributable position.
- The bullet about Alvor (current line 77 — "Mix of caves + wildlife + quiet swim stops: Alvor reserve with a cave loop on the way") — light rewrite to land the operator's preferred Benagil+Alvor combo framing: "Mix of caves + nature reserve + quiet water: the Benagil + Alvor day from Portimão — caves in the morning, estuary in the afternoon."
- This is where the **commercial in-body link to the Cranchi yacht** lands (per CSV row `benagil-vs-other-sea-caves-algarve,tour:cranchi-yacht-cruise-to-the-benagil-caves (PK 720028),cluster->tour,a private Cranchi yacht to Benagil,planned`). Suggested addition: a new bullet that anchors the Cranchi pitch directly — e.g. "Small group, no fixed schedule, more time per cave: book [a private Cranchi yacht to Benagil](/en/tours/cranchi-yacht-cruise-to-the-benagil-caves/) and spend longer at each stop."
- The speedboat link stays where it currently sits — in the H2 #8 Alvor section's old line 68 (which gets rewritten anyway). Move the speedboat in-body link to the H2 #9 closing matrix as an alternative landing point if the writer prefers — there's flexibility on placement, but BOTH the speedboat and the Cranchi MUST appear as in-body links somewhere in the piece (CSV directives). See §11 + §12.

### H2 #10 — "One Last Thing" *(KEEP — light tighten only)*

- **Tag:** **KEEP** (the existing H2 is a soft-close that lands the "the coast is alive, come now not later" framing — operator-voice that reads as authentic rather than urgency-sales).
- Word count: **~100–120w** (current is ~110w; light tighten only).
- The **pillar↑ link** in the closing lands here. **Suggested anchor variant: `our complete Benagil cave tour guide`** (varied from the lede's `our complete guide to the Benagil cave tour`). Suggested phrasing: "If you want help designing a day that fits more than just the famous cave into your trip, the pillar — [our complete Benagil cave tour guide](/en/blog/benagil-cave-tour-complete-guide/) — is the next read. Or browse our tour list and message us; we can usually suggest a combination that suits your group, budget, and energy level better than any generic 'top 10' article online."
- The current draft's "browse our full tour list" link (line 84) — KEEP, this is the `/en/tours/` listing-link cue. The contact link in the current line 84 ("message us") — current draft uses the bare phrase "message us" without linking; KEEP as a phrase, do NOT add a `/en/contact/` link (the contact link drop is the CL6-precedent anti-pattern; CL5 should match — clean closings, no `/contact/`).
- KEEP the operator-voice line "If you come back in ten years, some of these caves will be slightly different. That is part of what makes them worth visiting now, not later. Every season we see new arches open and occasionally see familiar ones collapse." — this is the post's emotional close, the org-byline-appropriate gravitas that gives the piece authority.

### Closing — the FAQ section (rendered by the `<details>` component)

- **The `faqs:` frontmatter populates the visible FAQ block** rendered at the bottom of the post by the shared `FaqBlock` component (the same wiring as pillar + CL1 + CL2 + CL3 + CL6). The FAQ block renders below the post body + above the breadcrumb / "Plan your trip" tour-page cards. No additional body markup needed — the `faqs:` block is the surface.
- The 5–7 FAQs themselves are detailed in §10. The visible FAQ block + the `FAQPage` JSON-LD emit automatically from the frontmatter.

## 7. The Alvor section — full direction, factual constraints, source-verify notes

The Alvor section (H2 #8 in §6) is the LOAD-BEARING ADDITION in this deepen. The current draft is two short paragraphs (~85w); the deepen brings it to ~350–450w with structured progression: protected status → geography → wildlife → access → dolphins-temper → operator's combo verdict.

### Verified facts (WebSearch + first-nature.com + EUNIS + Ramsar RSIS, 2026-05-15)

- **Site name:** Ria de Alvor (canonical Portuguese name; "Alvor estuary" is the standard EN translation).
- **Size:** 1,454 hectares.
- **Protected status:** Natura 2000 Special Area of Conservation (EUNIS site code PTCON0058) AND Ramsar wetland (RSIS site 827; designated 1996). VERIFIED.
- **Geomorphology:** coastal lagoon / estuarine wetland system separated from the Atlantic by sand spits; intertidal sand and mudflats, tidal saltmarshes, salt pans, stable and mobile dunes with characteristic vegetation. VERIFIED.
- **Hydrology:** two rivers (Alvor + Odiáxere — note: the EUNIS source names the rivers Arade and Alvor; the Arade flows into the Portimão side, not the Alvor side — VERIFY in writer's draft; safer phrasing: "two rivers flow into the estuary on either side of a wide headland" without naming them, OR cite Alvor + Odiáxere as the two-river pair which is the more widely-cited combination for the Ria de Alvor specifically). Surface in §16 if operator wants definitive naming.
- **Birdlife:**
  - Greater flamingos: VERIFIED (multiple sources cite flamingo presence on the salt pans).
  - Herons (grey heron, little egret, purple heron — purple "occasional"): VERIFIED.
  - Black-winged stilt, redshank, avocet, black-tailed godwit, ringed plover, little tern, sandwich tern, common sandpiper: VERIFIED.
  - Total recorded species: "over 200" is a widely-cited round number; one source said specifically 200+. Safe to cite as "more than 200 species recorded" or "roughly 200 species".
  - Migration significance: VERIFIED — "thousands of migrating birds" use the estuary as a spring/autumn staging post.
- **Access:**
  - Boardwalk: VERIFIED (the Alvor Boardwalk runs along the southern dune-edge — a popular on-foot access route).
  - Kayak/canoe hire from Alvor village: VERIFIED.
  - Boat trips into the estuary: VERIFIED — small-craft boat tours do operate inside the estuary (multiple competitor sites advertise "Alvor estuary boat trips").
- **Dolphins:**
  - Open Atlantic off Alvor coast: dolphins commonly seen on dedicated dolphin-watching tours and on boat trips from Portimão / Alvor. VERIFIED.
  - Dolphins ROUTINELY entering the lagoon: NOT VERIFIED. The closest source claim is from algarvetips.com that "many trips dedicated to finding pods of dolphins playing in their natural habitat" — describing OPEN-WATER tours, not in-lagoon dolphin entry. The first-nature wildlife sources name fish (mullet, sea bass) and birds INSIDE the lagoon, NOT dolphins INSIDE the lagoon. **The temper:** dolphins are seen in the Atlantic off Alvor, not routinely INSIDE the lagoon. The current draft's claim ("dolphins that routinely follow small boats into the lagoon") is the load-bearing factual temper this deepen carries.
- **Quinta da Rocha:** VERIFIED — the inland peninsula at the head of the estuary. Optional one mention.

### Tour-mode precision (operator-editorial)

- **Atlantis runs a "Benagil and Alvor Nature Reserve" product** (FareHarbor PK 717728). The product is a boat-from-Portimão route that pairs Benagil cave + the Alvor coast in one trip. The route reaches the Pontal headland + the estuary mouth + the Alvor-coast Atlantic water; the Atlantis boat does NOT enter the lagoon interior (per the `reference_atlantis_yacht_cave_entry`-adjacent operator-editorial convention and the CL6 brief's load-bearing factual fix).
- The product has **no built `/tours/` page** in the current Astro site (verified: the dist contains speedboat, Cranchi, sail yacht, reef-fishing only). When the page ships in a future round, the tour→guide auto-wiring already in `tour-guides.ts:44` will surface the inbound link from the tour page to CL5; CL5 doesn't need to push the outbound link before the page exists.
- The Alvor section may refer to the route as **"the Benagil + Alvor combo"** / **"the Benagil + Alvor day"** / **"the Benagil + Alvor route from Portimão"** without linking to a non-existent URL. The closing paragraph's optional `/en/tours/` listing link is the maximum link push.

### Writing direction for the Alvor section — concrete

1. **Open with the rename / repositioning.** "Head west from Portimão around the Pontal headland and the coast changes character entirely. The Ria de Alvor isn't a sea cave coast — it's an estuary nature reserve…" *(the reposition is load-bearing — the current draft buries the reserve framing; the deepen leads with it.)*

2. **Drop the protected-status paragraph immediately.** Natura 2000 SAC + Ramsar wetland (1996) — both load-bearing entities for AEO weight on "what is Ria de Alvor" queries.

3. **Then geography — Pontal, two rivers, salt pans, sand dunes, intertidal flats.** Tight; ~50–70w.

4. **Then wildlife — birds.** Flamingos as the headline; herons + egrets light touch; the migration-staging-post framing; ~200 species framing. ~80–100w. Do NOT pivot into marine life — that's CL7's lane.

5. **Then access — kayak / canoe / SUP / boardwalk / boat-from-Portimão.** Be precise on what each gets you. The boat-from-Portimão tour reaches the headland + estuary mouth (not inside).

6. **Then the dolphins-temper.** "Dolphins are commonly seen in the Atlantic off Alvor, not routinely inside the lagoon — the detail on Algarve dolphin species and best months is [over here / in our dolphin-watching piece]." Lateral to CL6.

7. **Then the verdict paragraph.** "Not a swap for Benagil; a category apart." Land the "operator runs Benagil+Alvor as a single day" framing — without a tour-page URL.

### What's currently wrong in the existing draft (the deepen FIXES these)

| Current draft line | What's wrong | Deepen fix |
|---|---|---|
| EN line 64 H2 title: "Pontal and Alvor Lagoon Arches" | "Lagoon Arches" implies arches inside the lagoon — there aren't notable ones; the entity is the Ria de Alvor estuary as a Ramsar wetland | Rename to "Pontal and the Ria de Alvor estuary" |
| EN line 66: "This is a protected nature reserve with low sand dunes, calm shallow water, and dolphins that routinely follow small boats into the lagoon." | "Dolphins that routinely follow small boats into the lagoon" is unverified; the verified pattern is dolphins in the Atlantic OFF Alvor, not inside the lagoon | Temper to "Dolphins are commonly seen in the Atlantic off Alvor — not routinely inside the lagoon itself" + lateral link to CL6 |
| EN line 66: "This is a protected nature reserve" | Underspecified — the entity is more precise than that | Cite Natura 2000 SAC + Ramsar wetland (1996) explicitly |
| EN line 66: No mention of birds | The single most-citable Alvor-experience fact (flamingos / herons / 200+ species) is missing | Add the birdlife paragraph |
| EN line 68: "pair a [Benagil cave tour](/en/tours/benagil-caves-speed-boat-tour/) with a self-guided walk or SUP around the Alvor estuary" | The current link is correct (speedboat link); the framing is fine; the pairing is operator-grade | KEEP the speedboat link (or migrate it to H2 #9 closing matrix — see §11); the Benagil+Alvor combo concept gets its own framing line in the new section's verdict paragraph |
| Section length: ~85w in two paragraphs | Section is too thin for the load it carries (Alvor is the deepen's load-bearing addition) | Expand to ~350–450w with the 6-paragraph progression above |

### PT/ES/FR translation discipline for the Alvor section

The PT/ES/FR existing drafts all carry the same "dolphins follow boats into the lagoon" overclaim (verified via grep on 2026-05-15) — PT `golfinhos que frequentemente seguem pequenos barcos até dentro da lagoa`, ES `delfines que suelen seguir a los barcos pequeños hasta dentro de la laguna`, FR `dauphins qui suivent régulièrement les petits bateaux jusque dans la lagune`. **All three locales need the same temper.** The translator pass applies the same Atlantic-off-Alvor / not-into-lagoon clarification per locale.

- **PT:** "Os golfinhos são frequentemente avistados no Atlântico ao largo da costa de Alvor — não tipicamente dentro da própria ria. O detalhe sobre as espécies de golfinhos do Algarve e a melhor altura para os ver está [aqui](link)."
- **ES:** "Los delfines se ven habitualmente en el Atlántico frente a la costa de Alvor — no normalmente dentro de la ría en sí. El detalle sobre las especies de delfines del Algarve y la mejor época para verlos está [aquí](link)."
- **FR:** "Les dauphins sont fréquemment observés dans l'Atlantique au large de la côte d'Alvor — pas habituellement à l'intérieur de la ria elle-même. Le détail sur les espèces de dauphins de l'Algarve et la meilleure période pour les voir est [ici](link)."

The PT canonical name is **Ria de Alvor** (don't translate to anything else — it's a proper-noun place name). The ES canonical is **Ría de Alvor** (with the diacritic ON the i). The FR canonical is **Ria de Alvor** (no diacritic; standard French treatment of Portuguese place names keeps the original). The current ES draft (line 64 / 66) uses "Ría de Alvor" / "ría de Alvor" — KEEP that orthography in the deepened ES draft. The current PT and FR drafts use "Ria de Alvor" / "ria de Alvor" — KEEP.

## 8. The FAQ shortlist (5–7 final Q&As)

Per architecture §5b (CL5 named on the FAQ list) + §10 (FAQ block render machinery already in place) + the prompt brief's proposed FAQ set, the final shortlist:

**Target: 6 FAQs.** Five would be acceptable (the head-query + the four most-distinctive informational queries); seven is the ceiling. Six is the sweet spot — matches CL3 and CL6's 7 (which are deeper editorial workhorses); CL5's snappier informational character supports 6. Reviewer overrides in §16 if 5 or 7 feels right.

The 6 final FAQs (writer drafts the answer copy at 40–60w each, snippet-shaped, complete-sentence, no exclamation marks, no AI-fluff openers):

### FAQ #1 — "Which Algarve cave is better — Benagil or Marinha?"

- **Why:** the literal head-query magnet. CL5 owns this; the FAQ block is the AEO snippet surface for the question phrased as a question (the H2 #1 "Short answer" snippet block handles the same question phrased as a search).
- **Answer skeleton (~40–60w):** "Most travellers should pick Algar de Benagil — the circular skylight in the cave roof is the Algarve's defining sea-cave feature. Praia da Marinha edges Benagil for two things: a cleaner swim beach, and the twin-arch silhouette that photographs best at sunrise. If you can fit both into your day, do Marinha at sunrise and Benagil from 10:00."

### FAQ #2 — "Can you visit all the Algarve caves in one tour?"

- **Why:** the route/timing question. The honest answer protects the reader from picking a 1-hour tour expecting to see everything.
- **Answer skeleton (~40–60w):** "No — a single tour realistically covers three to five named caves plus the surrounding arches, depending on departure point and tour length. A typical 1.5- to 2-hour speedboat from Portimão covers Benagil + Marinha + Carvalho + the Corredoura/Mesquita pair. Reaching Capela and Arcos to the west needs a longer tour or a separate trip from Lagos."

### FAQ #3 — "Which Algarve caves are not crowded?"

- **Why:** the off-piste angle; named queries are `quiet algarve caves` / `hidden algarve caves` / `lesser known caves algarve`.
- **Answer skeleton (~40–60w):** "The Benagil neighbours — Gruta da Corredoura and Gruta da Mesquita — are dramatically quieter than Algar de Benagil itself, though only small boats can enter them. Further west between Portimão and Lagos, Gruta da Capela and Gruta dos Arcos are quieter still, but need a longer tour to reach. Ask operators specifically rather than booking a generic 'Benagil tour'."

### FAQ #4 — "What's the difference between Algar de Benagil and Gruta da Corredoura?"

- **Why:** entity-specific ID query; the answer establishes the comparison-piece's authority on the named pair.
- **Answer skeleton (~40–60w):** "Algar de Benagil has the famous domed chamber and the circular skylight in the roof — the postcard cave. Gruta da Corredoura sits a few hundred metres east and is a longer tunnel-arch chamber: larger in total volume, no skylight, electric-blue water and high shadowed walls. Both are reached by boat only; Corredoura's narrower entrance limits it to small boats."

### FAQ #5 — "Is the Ria de Alvor worth visiting if you're short on time?"

- **Why:** the Alvor section's natural FAQ; the keyword cluster C6 query that the deepen targets.
- **Answer skeleton (~40–60w):** "If you only have a single Algarve day for the coast, prioritise Benagil — the Ria de Alvor isn't a swap for the sea-cave experience. It's a Ramsar wetland nature reserve with flamingos, herons, and calm shallow water; the experience is a category apart from caves. The Benagil + Alvor combined day from Portimão is the operator-preferred way to see both."

### FAQ #6 — "Can you swim at Marinha beach after a boat tour?"

- **Why:** the beach-stop question; the load-bearing thing to mention vs. the Benagil swim rule which CL2 owns. CL5 says yes-at-Marinha here + defers Benagil to CL2.
- **Answer skeleton (~40–60w):** "Yes — Praia da Marinha is open to swimmers and is one of the cleanest beaches on the Algarve coast for a post-tour swim. Most boat tours stop here. The 2023 access rules that ban swimming inside Algar de Benagil from a boat tour apply to the Benagil cave specifically, not to Marinha or the other beaches; the rules are covered in detail in [our piece on swimming into the Benagil cave](/en/blog/can-you-swim-benagil-cave/)."

### FAQ #7 — "Are the Algarve caves dangerous?" *(optional 7th — see §15 #2)*

- **Why:** the wildness / rockfalls / active-erosion concern; ties to the "One Last Thing" closing about the coast being alive.
- **Answer skeleton (~40–60w):** "The caves themselves are safe to visit on a licensed boat tour. The cliffs are an active karst landscape — the Atlantic is slowly eroding the limestone, and rockfalls do occur, mostly on the cliffs above the beaches rather than inside the chambers. Don't anchor or swim directly beneath the cliffs; stay with a licensed operator; the cave experience itself is straightforward."

**Operator decision in §15 on whether to ship 6 or 7 FAQs.** Default recommendation: **6** (skip FAQ #7) — the 6-FAQ set is tight, on-topic for the comparison piece, and doesn't drift into safety editorial. The 7th adds editorial weight to the "One Last Thing" closing but isn't load-bearing for the head queries CL5 owns. The 7th FAQ is genuinely useful for a "are these caves safe to visit" snippet capture though — there's a defensible case for shipping 7. See §15 #2.

### FAQ ordering

Order the FAQs head-query → off-piste → entity-specific → Alvor → swim-rules-defer → safety. Concretely:
1. Which cave is better — Benagil or Marinha? *(head-query magnet)*
2. Can you visit all in one tour? *(route)*
3. Which are not crowded? *(off-piste)*
4. Benagil vs Corredoura difference? *(entity-specific)*
5. Is Alvor worth visiting? *(C6 query)*
6. Can you swim at Marinha? *(beach-stop + CL2 defer)*
7. *(optional)* Are the caves dangerous? *(safety)*

### YAML frontmatter shape

Per the pillar + CL1 + CL2 + CL3 + CL6 precedent — `>` block-scalar answer style, indented under each `- question:`. Example shape for FAQ #1 (writer fills in the rest):

```yaml
faqs:
  - question: "Which Algarve cave is better — Benagil or Marinha?"
    answer: >
      Most travellers should pick Algar de Benagil — the circular skylight in the cave roof is the Algarve's defining sea-cave feature. Praia da Marinha edges Benagil for two things: a cleaner swim beach, and the twin-arch silhouette that photographs best at sunrise. If you can fit both into your day, do Marinha at sunrise and Benagil from 10:00.
  - question: "Can you visit all the Algarve caves in one tour?"
    answer: >
      No — a single tour realistically covers three to five named caves plus the surrounding arches, depending on departure point and tour length. A typical 1.5- to 2-hour speedboat from Portimão covers Benagil + Marinha + Carvalho + the Corredoura/Mesquita pair. Reaching Capela and Arcos to the west needs a longer tour or a separate trip from Lagos.
  # ...etc for 4 more (or 5 more if the 7th ships)
```

The `>` style is the load-bearing format — the existing FaqBlock component handles the `<details>`/`<summary>` rendering AND the `FAQPage` JSON-LD emission from this shape. Do NOT switch to `|` (literal block scalar — preserves newlines) or to inline strings; the `>` (folded block scalar — collapses to single paragraph) is what the renderer expects.

## 9. In-body link slots (6 slots, anchor text, position)

Per the links CSV (8 rows where CL5 is involved — 6 outbound from CL5, 2 inbound TO CL5) and architecture §4. The 6 outbound slots that the writer weaves into the deepened body:

| # | Slot | Anchor text (CSV-prescribed verbatim or recommended variant) | Position | Direction | Status |
|---|---|---|---|---|---|
| 1 | Pillar↑ — lede | `our complete guide to the Benagil cave tour` | First 200w of lede (before H2 #1) | cluster→pillar (bottom-up, intro) | NEW |
| 2 | Pillar↑ — closing | `our complete Benagil cave tour guide` *(varied descriptive anchor; CSV says "our complete guide to the Benagil cave tour" verbatim, but to avoid exact-match repetition with slot #1 use a CSV-spirit variant)* | H2 #10 "One Last Thing" closing paragraph | cluster→pillar (bottom-up, closing) | NEW |
| 3 | Cluster→cluster lateral (CL6) | `Algarve dolphin species and best months` OR `our dolphin-watching piece` *(CSV says "the dolphins you pass on the way" — but in the deepened Alvor section that anchor doesn't fit; recommended variant matches the surrounding sentence: "The detail on Algarve dolphin species and best months is [over here].")* | H2 #8 Alvor section, dolphins-temper paragraph | cluster→cluster (lateral) | NEW |
| 4 | Cluster→cluster lateral (CL1) | `how to get to Benagil once you've picked it` *(CSV verbatim — works naturally as a closing-section lateral)* | H2 #10 "One Last Thing" — OPTIONAL placement, see below; OR omit and accept that CL1 lateral isn't load-bearing | cluster→cluster (lateral) | OPTIONAL |
| 5 | Commercial — speedboat | `the Benagil speedboat tour` *(CSV verbatim)* OR `the small-group Benagil speedboat tour from Portimão` *(pillar §4d / CL1's tour anchor — CSV-spirit variant)* | H2 #9 "Which One Should You Choose?" closing bullet — OR keep at H2 #8 Alvor section closing (where the current draft places it). Writer's call. | cluster→tour | EXISTS (current draft line 68) — MIGRATE or KEEP |
| 6 | Commercial — Cranchi yacht | `a private Cranchi yacht to Benagil` *(CSV verbatim)* | H2 #9 "Which One Should You Choose?" — new bullet | cluster→tour | NEW |

### Slot decisions

- **Slot #1 (pillar↑ lede):** USE EXACTLY the CSV-prescribed anchor `our complete guide to the Benagil cave tour`. Position: in the lede paragraph; suggested phrasing in §6 lede block.
- **Slot #2 (pillar↑ closing):** USE the varied descriptive anchor `our complete Benagil cave tour guide` (note the slight word-order swap from slot #1 — same target, different anchor, prevents exact-match-anchor over-optimisation). Position: H2 #10 "One Last Thing" closing paragraph.
- **Slot #3 (CL6 lateral):** Position: in the H2 #8 Alvor section's dolphins-temper paragraph. Anchor: the CSV-prescribed "the dolphins you pass on the way" doesn't fit the new section's flow naturally — the dolphins are AROUND Alvor, not "on the way" past it. RECOMMENDED VARIANT: `Algarve dolphin species and best months` — landing the CL6 piece's actual scope as the anchor.
- **Slot #4 (CL1 lateral):** OPTIONAL — the CSV directive flags this as a planned link, but the natural placement is awkward (CL5 readers are in comparison-mode, not getting-there-mode; the CL1 lateral feels bolted-on). Default recommendation: **SKIP** this lateral; the CSV directive is a planning-level link suggestion, not a binding requirement when the placement doesn't work editorially. The pillar↑ link covers the "where do I go for everything else" gesture; CL1 is reachable from the pillar. Surface in §16 if operator prefers including the CL1 lateral; if so, the natural placement is in the H2 #9 closing matrix as a bullet — "Decided on Benagil and ready to plan — [how to get to Benagil](/en/blog/how-to-visit-benagil-cave/) covers ports, parking, and the 2026 rules."
- **Slot #5 (speedboat):** The link EXISTS in the current draft at EN line 68 (the Alvor section's old closing line). The deepen rewrites that line; the speedboat link MUST end up somewhere in the deepened body. RECOMMENDED PLACEMENT: migrate to the H2 #9 closing matrix as a bullet — e.g. "For the cheapest fast tour of the cave coast — [the Benagil speedboat tour](/en/tours/benagil-caves-speed-boat-tour/) — half a day, group of up to 10, from Portimão." Alternative: keep at the H2 #8 Alvor section verdict paragraph as the "operator runs Benagil + Alvor on a boat from Portimão" framing's anchor. Writer's call. Default: migrate to H2 #9.
- **Slot #6 (Cranchi):** NEW in the deepen. Position: H2 #9 closing matrix as a new bullet. Use the CSV-verbatim anchor `a private Cranchi yacht to Benagil`. Suggested bullet: "Want more time per cave with no other groups on board — [a private Cranchi yacht to Benagil](/en/tours/cranchi-yacht-cruise-to-the-benagil-caves/). Charter only, up to 12 guests."

### Total in-body link count

- **With Option A (slot #4 OMITTED — default):** 5 in-body links — pillar↑ ×2, CL6 lateral ×1, speedboat ×1, Cranchi ×1. At the architecture's 3–5 link cap; comfortable.
- **With Option B (slot #4 INCLUDED):** 6 in-body links — adds the CL1 lateral. Above the typical 3–5 cap but still inside the architecture's per-piece tolerance. Acceptable.
- Default: Option A (5 in-body links). Reviewer overrides in §16 #3.

### Optional `/en/tours/` listing link

- Per §6 H2 #8 access-mode paragraph, the writer MAY include one link to the `/en/tours/` listing page (since the Benagil+Alvor product has no built tour page). Anchor variants: `our coastal tour list`, `the boat tours we run from Portimão`, `our Portimão boat tours`. If included, this counts as a 6th (Option A) or 7th (Option B) in-body link — push over the cap. Default: SKIP. Surface in §16 if operator wants the listing-link in.

## 10. Internal cross-links audit (what currently exists, what gets added)

Pulled from a grep on the current EN draft + the CSV's 8 CL5-involving rows.

### What currently exists in the EN draft (lines 22–85)

| Link | Location | Direction | Status post-deepen |
|---|---|---|---|
| `/en/tours/benagil-caves-speed-boat-tour/` | Line 68 (H2 "Pontal and Alvor Lagoon Arches", final paragraph) | cluster→tour (speedboat) | KEEP — but MIGRATE to H2 #9 closing matrix per §9 slot #5 |
| `/en/tours/` | Line 84 (H2 "One Last Thing", closing paragraph) | cluster→listing | KEEP — listing link is the soft commercial gesture |

That's 2 in-body links in the current draft. The deepen brings the body to 5 (Option A default).

### What the deepen ADDS

| Link | Location | Direction | Status |
|---|---|---|---|
| `/en/blog/benagil-cave-tour-complete-guide/` | Lede (first 200w) | cluster→pillar (bottom-up, intro) | NEW |
| `/en/blog/benagil-cave-tour-complete-guide/` (varied anchor) | H2 #10 closing | cluster→pillar (bottom-up, closing) | NEW |
| `/en/blog/dolphin-watching-algarve-species-seasons/` | H2 #8 Alvor section, dolphins-temper paragraph | cluster→cluster (lateral, CL6) | NEW |
| `/en/tours/cranchi-yacht-cruise-to-the-benagil-caves/` | H2 #9 closing matrix | cluster→tour (Cranchi) | NEW |

### What the deepen MIGHT add (operator decisions in §15)

- `/en/blog/how-to-visit-benagil-cave/` (CL1 lateral) — slot #4; default OMIT.
- `/en/blog/can-you-swim-benagil-cave/` (CL2 defer) — in FAQ #6 answer; default INCLUDE in FAQ but skip from body H2 #3.
- `/en/blog/best-time-visit-benagil-caves/` (CL3 timing defer) — in H2 #3 Algar de Benagil section's crowds-verdict line; OPTIONAL; default SKIP (the current draft's bare "Go early morning or off-season" doesn't need the link weight; CL3 is reachable from the pillar and the closing).
- `/en/tours/` (listing link in H2 #8 access-mode paragraph) — OPTIONAL; default SKIP per §9 closing.

### Inbound links to CL5 (verify they exist post-deepen)

Per the CSV, two inbound links land on CL5:
1. From the pillar (`benagil-cave-tour-complete-guide`) — anchor "how Benagil compares to Marinha and the rest" — STATUS: must verify in pillar body (the pillar is shipped — the link should exist; if not, surface in §16 and the writer drafts a one-line pillar patch).
2. From the Cranchi tour page (`tour:cranchi-yacht-cruise-to-the-benagil-caves`) — anchor "which Algarve cave to visit" — STATUS: must verify on the Cranchi tour page (likely already wired via `tour-guides.ts` `Plan your trip` block — the tour-guide map is keyed by translationKey, and CL5's `benagil-vs-other-caves` is in scope when the Cranchi PK 720028 is in the map; verify).
3. From the future Benagil+Alvor tour page (PK 717728, unbuilt) — anchor "Benagil vs the other Algarve caves (incl. Alvor)" — STATUS: pre-wired in `tour-guides.ts:44` (line 44 maps PK 717728 → `benagil-vs-other-caves` translationKey); will surface when the tour page ships.

Post-deepen, the inbound side is complete (1 from pillar verified-shipped; 1 from Cranchi pre-wired; 1 from future-tour pre-wired). The deepen's job is the OUTBOUND side — the 5 (Option A) or 6 (Option B) in-body links the writer weaves in.

## 11. Lateral-link discipline (CL6 + CL1 — anchors, position, why)

CL5's natural laterals per architecture §4c: **CL5 → CL6** (caves comparison mentions the dolphins you pass) and **CL5 → CL1** (once you've picked Benagil, here's how to get there). These are the two CSV-prescribed laterals; the writer treats them as the editorial baseline.

### CL5 → CL6 lateral

- **Why:** the Alvor section discusses what you see ON or OFF the coast en route; dolphins are the natural mention. The lateral lands the "we have a dedicated dolphin piece, that's where the depth lives" cue. Without it, the deepen's Alvor section risks pulling readers into a dolphin-depth tangent CL6 owns.
- **Where:** in the Alvor section's dolphins-temper paragraph (H2 #8). NOT in the comparison table (the table doesn't have a column for dolphins, and adding one drifts off-topic). NOT in the H2 #1 snippet block (the snippet must stay clean and verdict-shaped).
- **Anchor:** the recommended variant `Algarve dolphin species and best months` — matches the surrounding "Dolphins are commonly seen in the Atlantic off Alvor — not routinely inside the lagoon itself. The detail on [Algarve dolphin species and best months] is over here." sentence. The CSV-verbatim anchor "the dolphins you pass on the way" doesn't fit this section's flow because the dolphins aren't "on the way" past Alvor — they're AROUND Alvor in the open Atlantic. Use the variant.
- **Target:** `/en/blog/dolphin-watching-algarve-species-seasons/` (EN). PT/ES/FR targets: `/pt/blog/observacao-golfinhos-algarve-especies-epocas/`, `/es/blog/avistamiento-delfines-algarve-especies-temporadas/`, `/fr/blog/observation-dauphins-algarve-especes-saisons/` (translator pass updates per locale).
- **Status:** required; do NOT skip. This is the load-bearing lateral that closes the CL5-CL6 graph in the architecture.

### CL5 → CL1 lateral

- **Why:** the closing's natural pivot. Reader has decided which cave they want; CL1 is the "how to actually get there" piece. The CSV codifies this.
- **Where:** H2 #9 or H2 #10 closing. The natural sentence: "Decided on Benagil and ready to plan — [how to get to Benagil](/en/blog/how-to-visit-benagil-cave/) covers ports, parking, and the 2026 rules."
- **Anchor:** CSV-verbatim `how to get to Benagil once you've picked it` — note the CSV anchor's "once you've picked it" cadence works only as a transition phrase. Recommended re-phrase keeping CSV intent: `how to get to Benagil` (cleaner anchor for HTML readers) OR `our piece on how to get to Benagil` (slightly longer descriptive variant matching the pillar↑ closing's `our complete Benagil cave tour guide`).
- **Target:** `/en/blog/how-to-visit-benagil-cave/`
- **Status:** OPTIONAL — default OMIT (per §9 slot #4 discussion). The closing already carries the pillar↑ link with strong gravitational pull; adding the CL1 lateral on top risks the closing reading as a link-stack. Surface in §16 if operator prefers it included. If included, place in H2 #9 closing matrix as a new bullet after the Cranchi bullet, OR as a sentence in H2 #10 "One Last Thing" before the pillar↑ link.

### Cluster-laterals NOT to use

- CL2 (swim rules) — only as a FAQ #6 deferred link inside the FAQ answer; NOT a body lateral.
- CL3 (best-time-Benagil) — OPTIONAL in H2 #3's crowds-verdict line; default SKIP.
- CL4 (best-time-Algarve-broad) — architecture §4c doesn't list a CL5 → CL4 lateral; skip entirely.
- CL7 (marine life broad) — the Alvor section's bird mentions are the maximum nature-content; do NOT add a CL5 → CL7 lateral (the Alvor section mentions birds, which is the lateral cue's substance; an explicit CL7 link is overhead the reader doesn't need).
- CL8 (packing), CL9 (spring), CL10 (sunset) — no architecture-prescribed laterals to CL5; skip.

## 12. Commercial link discipline (speedboat + Cranchi — anchors, intent-match logic)

Per architecture §4d row CL5: "CL5 → speedboat (717720) + Cranchi (720028)". CL5 carries TWO commercial in-body links — speedboat AND Cranchi — the only cluster outside the pillar that carries two of the four tour-page links. The discipline:

### Speedboat link

- **Tour:** Benagil caves speed-boat tour (FareHarbor PK 717720).
- **EN slug:** `benagil-caves-speed-boat-tour`. PT slug: `circuito-de-grutas-ate-benagil`. ES + FR slugs match EN.
- **Anchor:** the CSV-verbatim `the Benagil speedboat tour` works as the default. The pillar / CL1 use a longer variant (`the small-group Benagil speedboat tour from Portimão`) — CL5 may use either. Default: CSV-verbatim shorter anchor.
- **Position:** the writer's call — either (a) MIGRATE the current draft's H2 #8 line 68 link to H2 #9 closing matrix as a bullet ("For the cheapest fast tour of the cave coast — [the Benagil speedboat tour] — half a day, group of up to 10, from Portimão") OR (b) KEEP at H2 #8 Alvor section verdict paragraph. **Default: migrate to H2 #9.** Reviewer overrides in §16 #4.
- **Intent-match logic:** the speedboat is the SHORTEST, CHEAPEST, FASTEST option — it serves the "first-trip planner" sub-profile A and the "limited-budget half-day" use case the H2 #9 matrix names verbatim. The link sits next to the matrix's "Half a day, limited budget" bullet for intent-snap.

### Cranchi link

- **Tour:** Private Cranchi yacht cruise to the Benagil caves (FareHarbor PK 720028).
- **EN slug:** `cranchi-yacht-cruise-to-the-benagil-caves`. PT/ES/FR slugs match EN (verified in the tour data).
- **Anchor:** CSV-verbatim `a private Cranchi yacht to Benagil`. Use exactly.
- **Position:** H2 #9 closing matrix, new bullet. Place AFTER the speedboat bullet but BEFORE the closing recap line (if the matrix has one).
- **Intent-match logic:** the Cranchi is the PRIVATE / LONGER / SMALL-GROUP option — it serves the "small group wanting more time per cave" use case and the "photographer / picky traveller" sub-profile C. The link sits at the upper-end of the matrix's price-and-flexibility spectrum.

### Tour-page link discipline (across both)

- Use the trailing slash on every internal link: `/en/tours/<slug>/` not `/en/tours/<slug>`. Site-routing convention; mismatch causes redirects.
- Bold-or-not on the anchor: the existing draft does NOT bold tour-page anchors. KEEP. Bold-on-anchors is a convention the pillar uses sparingly; CL5 inherits the no-bold convention.
- ONE in-body link per tour. The frontmatter `relatedTourSlugs:` provides the structural "Plan your trip" cards at the bottom of the post; the in-body link is the editorial reinforcement. Do NOT link the same tour twice in body (e.g., don't link speedboat in the Alvor section AND in the H2 #9 matrix — pick one).

## 13. De-dup checklist (what NOT to drift into)

Mirror the CL6 brief's §13 pattern; CL5's specific drift risks differ from CL6's. The writer self-checks against this list before submitting.

### Anti-pattern #1 — Drifting into CL3's lane (best time to visit the Benagil cave specifically)

- The current draft's "Go early morning or off-season if you want the place to yourself" is fine (~5 words of timing; appropriate for a comparison piece). The deepen MUST NOT expand this into a months-bands or tides paragraph — CL3 owns that depth.
- The H2 #1 snippet block says "Marinha at sunrise. Benagil at 10:30." — that's an operator-grade time-of-day verdict; KEEP. Do NOT expand it into a tide-and-month breakdown.
- The optional CL3 lateral in H2 #3 (per §10) is a single sentence with one link, not a paragraph.

### Anti-pattern #2 — Drifting into CL6's lane (dolphins in depth)

- The Alvor section's dolphins-temper paragraph (per §6 H2 #8) is ~40–60w with one CL6 lateral. Do NOT expand into species ID, pod sizes, Decreto-Lei 9/2006, or sighting-rate bands — that's CL6 in full.
- Do NOT mention dolphins anywhere else in CL5's body — not in the comparison table (no dolphin column), not in the H2 #1 snippet, not in the H2 on Algar de Benagil, not in the H2 on the Capela/Arcos pair (where dolphins do appear on longer tours west of Portimão), not in the H2 #9 matrix bullets.

### Anti-pattern #3 — Drifting into CL2's lane (the 2023 cave swim rules)

- The current draft DOES NOT mention swim rules. The deepen MUST NOT introduce them as a body section. The only acceptable place is FAQ #6's brief mention as a CL2 defer (with a link to the CL2 piece).
- Do NOT cite the Capitania do Porto de Portimão, the 2023 edital number, or any swim-rule specifics. CL2 owns those.

### Anti-pattern #4 — Drifting into CL7's lane (broader marine life)

- The Alvor section's birds (flamingos / herons / egrets / 200+ species framing) is the maximum nature-content for CL5. Do NOT pivot to turtles, sunfish, octopus, baitfish — CL7's lane.
- Do NOT mention "the wider marine life of the Algarve coast" with a CL7 lateral — the Alvor section's bird specificity is the lateral cue; an explicit CL7 link is overhead.

### Anti-pattern #5 — Drifting into the "things to do near Benagil" facet (CL12-slot future cluster)

- Do NOT name Benagil village amenities, restaurants in Carvoeiro, viewpoints to walk to, hiking paths near the caves. The Algar de Benagil H2 mentions the clifftop viewpoint walk as the CL1 territory; pass through without depth.
- Do NOT name the Seven Hanging Valleys Trail (the multi-cave clifftop walk passing several of the named cliffs in CL5) — it's a future CL12-slot facet; one passing mention is the absolute maximum if the writer feels strongly, but the recommendation is SKIP entirely.

### Anti-pattern #6 — Drifting into operator-agnostic "industry" framing

- The post's voice is the OPERATOR'S comparison (Atlantis runs these routes, has opinions). Do NOT lapse into "operators on the Algarve coast offer various tours…" / "many companies will take you to Benagil…" — that's industry voice and dilutes the org-byline authority.
- Specifically strike (current draft EN line 78): "Benagil-only speed boat from Portimão or Albufeira" → strike "or Albufeira" (Atlantis runs from Portimão only).

### Anti-pattern #7 — Drifting into "Algarve top 10" listicle voice

- The post is opinionated comparison, not a top-10 ranking. Do NOT introduce list voice ("Number 1: Benagil. Number 2: Marinha…"). The H2-per-cave structure is the comparison structure; do NOT add a numbered ranking on top of it.
- The closing line (current draft line 84) deliberately disparages "any generic 'top 10' article online" — KEEP this; it's the brand-voice tell.

### Anti-pattern #8 — Drifting into Alvor-as-cave-coast

- The Ria de Alvor is a NATURE RESERVE, not a cave coast. The Alvor section's load-bearing reframe is exactly this: do NOT describe Alvor in cave-coast terms. If the writer is tempted to write "and there are also small sea caves around the Alvor coast" — STOP, that's the old-draft frame the deepen explicitly rejects. The Alvor section's job is to position Alvor as a CATEGORY APART.

### Anti-pattern #9 — Drifting into Ria Formosa territory

- Ria Formosa is a separate, much larger Eastern-Algarve lagoon-and-island system (around Faro / Olhão / Tavira). It is NOT Ria de Alvor. The two get confused by inexpert writers because both are "Ria de…" Portuguese coastal reserves. CL5's Alvor section must NOT mention Ria Formosa as a comparison or analog — it's a different reserve entirely.

### Anti-pattern #10 — The CL3/CL6-inherited AI-fluff vocabulary

All these have been called out across prior briefs and apply to CL5 verbatim. The writer must NOT use:
- "magical", "unforgettable", "perfect", "hidden gem", "Instagrammable", "bucket list", "tucked away"
- "let's dive in", "elevate", "unlock", "seamless", "pursuant to", "please be advised", "in conclusion"
- "Algarve's best-kept secret" (current draft line 23 doesn't use this; do NOT introduce it)
- "ultimate guide", "comprehensive overview", "everything you need to know" (the pillar uses this as a title; CL5 does not)

### Anti-pattern #11 — Marina hallucinations

- `Clube Naval` / `Marina de Portimão` / `Portimão Marina` — wrong entities. If the writer needs to name a departure marina, the only acceptable phrasing is `Porto Comercial de Portimão` (signposted *Ac. Porto Comercial de Portimão*). The current draft does NOT name a marina; KEEP that — the deepen doesn't need to. Surface in §16 only if the operator wants the marina named for SEO weight.

### Anti-pattern #12 — Inventing precise lat/lng or distance figures

- The "~1.5 km west of Benagil" distance to Marinha is approximately correct (verifiable on map) — KEEP.
- The "~few hundred metres east" distance to Corredoura/Mesquita is also approximate — KEEP.
- Do NOT invent precise figures for the lesser-known caves (Capela / Arcos / Pontal headland distance from Portimão). If the writer doesn't know, the safe phrasing is "between Portimão and Lagos" without km figures.

## 14. Quality bar / red flags / hallucination guardrails

The reviewer (José, the operator) runs this checklist against the draft. Every "no" is a revision request. Reviewer is the operator per architecture §7 + prior CL deepen briefs.

### Acceptance criteria (writer self-checks before submitting)

1. ☐ **Total word count EN body: 1,500–1,800** (target ~1,650). Verify by `wc -w` on the body (excluding frontmatter). Going over 1,800 = revision; going under 1,500 = also revision (expand the Alvor section first if under).
2. ☐ **8–10 H2 sections** (not 7, not 12). Every H2 has a **40–60-word answer paragraph** directly under the heading (except the closing matrix and the "One Last Thing" closing, where the format is bullet list / emotional close respectively).
3. ☐ **H2 #1 ("The short answer: which Algarve cave should you pick?")** is NEW (~120w), opens with the **6-entity comparison verdict paragraph** that covers `benagil vs marinha` + `algarve caves` + `which algarve cave to visit` directly. KEEP the operator-voice "Marinha at sunrise. Benagil at 10:30." line — but it lives in H2 #9 matrix, not in the H2 #1 snippet. Don't conflate.
4. ☐ **H2 #2 ("At a glance: the Algarve caves compared")** contains the **comparison table** with 6 rows (or 5 if the operator picks the merged layout in §15 #1) × 6 columns AND the inline `<script type="application/ld+json">` block emitting the `ItemList` schema with the matching number of items.
5. ☐ **H2 #8 ("Pontal and the Ria de Alvor estuary")** is the EXPANDED section (~350–450w from the current ~85w), with the 6-paragraph progression (reframe → protected status → geography → wildlife → access → dolphins-temper → verdict). Specifically:
   - Names **Natura 2000** AND **Ramsar** by entity. ✓
   - Names **flamingos** + 2–3 other birds. ✓
   - Tempers the "dolphins follow boats into the lagoon" to "in the Atlantic off Alvor" — with the CL6 lateral link. ✓
   - Names the **Benagil + Alvor combo** as a concept without linking to a non-existent tour page. ✓
6. ☐ **The `faqs:` frontmatter has 6 (or 7 — operator decision in §15 #2) Q&A pairs**, each answer 40–60w, each answer stands alone. FAQ #1 ("Which Algarve cave is better — Benagil or Marinha?") IS PRESENT — required head-query magnet. FAQ #5 ("Is the Ria de Alvor worth visiting if you're short on time?") IS PRESENT — required C6 query magnet. FAQ #6 (the CL2 swim-rule defer) contains the link to `/en/blog/can-you-swim-benagil-cave/`.
7. ☐ **Byline is `Atlantis Tours`** (currently `Atlantis Tours` ✅ — KEEP. **Do NOT upgrade to `Nuno Albino`.** Architecture §5b explicit: CL5 stays on the org byline.).
8. ☐ **`date:` frontmatter is `2026-05-15`** (currently `2026-04-16` — MUST be refreshed).
9. ☐ **`imageAlt:` is KEPT as-is** ("Sea cave arches along the Algarve coast near Benagil with turquoise water below yellow cliffs" — accurate, no Alvor hallucination, no operator-detail overclaim). Do NOT change.
10. ☐ **`tags:`** includes the new `comparison` tag. Final tag set: `[benagil, caves, travel-tips, comparison]`.
11. ☐ **`relatedTourSlugs:`** updated to `[benagil-caves-speed-boat-tour, cranchi-yacht-cruise-to-the-benagil-caves]` (EN) — adding the Cranchi slug per the CSV directive. PT equivalent: `[circuito-de-grutas-ate-benagil, cranchi-yacht-cruise-to-the-benagil-caves]`. ES/FR mirror EN.
12. ☐ **All 5 (or 6 — Option B) in-body link anchor decisions from §9 are present**:
    - bottom-up pillar callout in lede → `our complete guide to the Benagil cave tour`
    - bottom-up pillar callout in closing → `our complete Benagil cave tour guide` (or similar varied descriptive anchor)
    - CL6 lateral in H2 #8 Alvor section's dolphins paragraph → `Algarve dolphin species and best months` (or similar variant)
    - speedboat tour link → `the Benagil speedboat tour` (positioned per §9 / §12)
    - Cranchi tour link → `a private Cranchi yacht to Benagil` (positioned in H2 #9 matrix)
13. ☐ **Optional CL1 lateral** in H2 #9 or #10 — present if operator picks Option B in §15 #3; absent if Option A (default).
14. ☐ **Zero external links** (the deepen carries no external linking; all 5 in-body links are internal). The optional Diário da República or Ramsar-RSIS or EUNIS external link from the Alvor section is DEFAULT-SKIP — surface in §16 if operator wants protected-status external linking; if so, anchor as `Ramsar wetland` or `Natura 2000 Special Area of Conservation` and target `https://rsis.ramsar.org/ris/827` (Ramsar) or `https://eunis.eea.europa.eu/sites/PTCON0058` (EUNIS).
15. ☐ **Required entities in body**: the six comparison-table entities (Algar de Benagil + Praia da Marinha + Praia do Carvalho + Gruta da Corredoura/Mesquita + Gruta da Capela/dos Arcos + Ria de Alvor) all appear by full Portuguese name on first mention. **Natura 2000** + **Ramsar** appear in the Alvor section. **Greater flamingo** + at least 2 other bird species appear in the Alvor section. **Pontal** appears as the geographic anchor for the Alvor section. At least 3 entities appear in the first 200 words (Algarve + Benagil + Algar de Benagil OR Algarve + Benagil + Marinha).
16. ☐ **NOT in the body**: `Alvor lagoon` as a stylistic synonym for Ria de Alvor (anti-pattern #1 below); `Marina de Portimão` / `Portimão Marina` / `Clube Naval` (inherited anti-pattern); `Capitania do Porto de Portimão` (CL2's regulator); `Decreto-Lei 9/2006` (CL6's regulation); `Albufeira` as a departure port; any specific euro figure for tours; any "guaranteed cave entry" claim; any "magical / unforgettable / perfect / hidden gem / Instagrammable / bucket list / let's dive in / elevate / unlock / seamless / pursuant to / please be advised" (inherited AI-fluff anti-pattern). Specifically also NOT: "dolphins that routinely follow small boats into the lagoon" (the load-bearing temper); "Ria Formosa" (the wrong reserve); "Seven Hanging Valleys Trail" (CL12-slot territory); any precise km distance for the lesser-known caves; any precise lat/lng (skip; not load-bearing).
17. ☐ **Builds cleanly**: `pnpm --filter atlantis run build` succeeds. The rendered `/en/blog/benagil-vs-other-sea-caves-algarve/` page shows the breadcrumb (`Home › Blog › Benagil Cave Tour: Everything You Need to Know in 2026 › Benagil vs the Other Sea Caves of the Algarve…`), the comparison table renders cleanly with the `ItemList` JSON-LD validating in the Rich Results Test, the FAQ block (6 or 7 items) renders with `FAQPage` JSON-LD validating.
18. ☐ **The pillar's "In this guide" component lists CL5** at position 3 (CL1 → CL2 → CL3 → **CL5** → CL6 → CL7 → CL8 → CL9 → CL10) — verify after publish. Note CL4 was de-dup-skipped from the pillar's list in the architecture; per BUILD-STATUS §2 line 5, the live order is CL1 → CL2 → CL3 → CL4 → CL5 → CL6 → CL7 → CL8 → CL9 → CL10 (CL4 IS in the pillar list). The writer doesn't touch the pillar; the pillar list updates automatically from `pillarOrder`. Just verify post-publish that CL5 still sits at position 3 (or 4 if CL4's pillarOrder=2 placed it before CL5's 3 — verify in the rendered list).
19. ☐ **JSON-LD schemas validate in the Rich Results Test:** `BreadcrumbList` (auto from the site), `Article` (auto from the post), `FAQPage` (auto from `faqs:`), `ItemList` (new — manually emitted from the inline `<script>` block in H2 #2). Run `https://search.google.com/test/rich-results` against the post URL after publish.

### Red flags / hallucination guardrails

The deepen carries 4 hallucination risks the writer must guard against carefully:

1. **The Alvor-dolphins-into-the-lagoon overclaim (the load-bearing factual temper).** The current EN draft (line 66) AND the current PT/ES/FR drafts all say dolphins "routinely follow small boats into the lagoon" — verified 2026-05-15 via grep across all four locales. WebSearch verification 2026-05-15 against first-nature.com + algarvetips.com + the Ramsar RSIS for Ria de Alvor (site 827) found no source supporting routine dolphin entry into the lagoon itself. The sources describe (a) dolphins in the open Atlantic OFF the Alvor coast, (b) canoe / kayak access INSIDE the estuary for birds-and-fish observation, (c) boat trips that operate near the estuary mouth from Portimão. The deepen TEMPERS this in all four locales (EN body + PT body + ES body + FR body) to "dolphins are commonly seen in the Atlantic off the Alvor coast — not routinely inside the lagoon itself" + a CL6 lateral for depth.

2. **The marina hallucination (carried from pillar + CL1 + CL2 + CL3 + CL6).** Departure marina is `Porto Comercial de Portimão` (signposted *Ac. Porto Comercial de Portimão*). NOT Clube Naval. NOT Marina de Portimão. NOT Portimão Marina. CL5 may not name a marina at all (the current draft doesn't); if it does for SEO weight (operator surfaces in §16), only `Porto Comercial de Portimão` is acceptable. This is the load-bearing entity check that every CL piece carries.

3. **The Alvor-tour-page link hallucination.** The Benagil + Alvor product (FareHarbor PK 717728) does NOT have a built `/tours/` page in the current Astro site. The Alvor section MAY refer to the combined Benagil+Alvor experience as a concept ("the Benagil + Alvor combo from Portimão") but MUST NOT link to a non-existent URL. The closing's optional `/en/tours/` listing link is the maximum link push for the Alvor product. If the writer is tempted to write `[the Benagil + Alvor tour](/en/tours/benagil-and-alvor-nature-reserve/)` — STOP, that URL doesn't exist. The tour→guide inbound wiring (line 44 of `tour-guides.ts`) already pre-wires the inbound side; the deepen's CL5 doesn't push outbound.

4. **The protected-status precision call.** The verified facts (2026-05-15, via Ramsar RSIS site 827 + EUNIS site PTCON0058 + first-nature.com + walkalgarve.com + responsible-vacation.com):
   - Size: 1,454 hectares: VERIFIED (cited by multiple sources).
   - Natura 2000 Special Area of Conservation (SAC): VERIFIED (EUNIS site code PTCON0058).
   - Ramsar wetland of international importance: VERIFIED (RSIS site 827; designated 1996).
   - Total bird species: "over 200 recorded" / "200+" is the widely-cited round; safe to cite. Don't claim an exact number like "237 species" — that's a fabrication risk.
   - Greater flamingo presence: VERIFIED (multiple sources).
   - Heron / egret / avocet / stilt / godwit species: VERIFIED.
   - "Dolphins routinely enter the lagoon": NOT VERIFIED — see #1 above; temper.
   - The two rivers feeding the estuary: contested (some sources name Alvor + Odiáxere; one source names Arade + Alvor — the Arade is the Portimão-side river, not Alvor-side). Safer to NOT name the rivers, OR cite "the Alvor and Odiáxere rivers" as the canonical pair (more widely-cited); the writer's call. Default: skip naming the rivers explicitly to avoid the precision call.

### Anti-patterns inherited from prior briefs (all apply)

Pillar §13 + CL1 §13 + CL2 §13 + CL3 §13 + CL6 §13 anti-pattern lists ALL apply. The writer re-reads CL6 §13 before drafting (most recent precedent). Key inherited anti-patterns specifically relevant to CL5:
- No `Clube Naval` / `Marina de Portimão` / `Portimão Marina` (inherited #1).
- No "magical" / "unforgettable" / "perfect" / "hidden gem" / "bucket list" / "Instagrammable" (inherited #10).
- No "let's dive in" / "elevate" / "unlock" / "seamless" / "pursuant to" / "please be advised" (inherited AI-fluff anti-patterns).
- No specific euro figures for tour prices (inherited).
- No precise drive-time minutes (inherited; CL1's territory).
- No precise km distances for the lesser-known caves (CL5-specific — the writer may keep the existing "~1.5 km west" and "~few hundred metres east" because those are operator-grade common-knowledge approximations; do NOT invent more precise figures).
- No fabricated regulation article numbers (inherited; the Alvor section's Natura 2000 + Ramsar mentions cite the protection regimes by name without claiming specific article-by-article statute text).

## 15. Open operator decisions (surface to operator pre-draft)

Mirror the CL6 brief's §15/§16 pattern; CL5's open decisions are mostly about table shape, FAQ count, lateral inclusion, and link placement. Surface 5 numbered decisions to the operator; everything else is resolved by recommendation.

### Decision #1 — Comparison table row count: 6 rows (default) or 5 rows (merged)?

The comparison table in H2 #2 (per §6) carries 6 rows:
1. Algar de Benagil
2. Praia da Marinha
3. Praia do Carvalho
4. Gruta da Corredoura & Gruta da Mesquita (pair lumped)
5. Gruta da Capela & Gruta dos Arcos (pair lumped)
6. Ria de Alvor

**Option A (default, recommendation):** ship 6 rows. The two pairs are already lumped; reducing further loses information; the 6-row table is dense but scannable.

**Option B:** ship 5 rows by merging Carvalho into the Marinha row (both are beaches in the Lagoa-coast cluster, both are accessible by foot). Loses the Carvalho-as-tunnel-staircase distinction; not recommended.

**Option C:** ship 5 rows by collapsing the Carvalho row AND keeping the Corredoura/Mesquita + Capela/Arcos pairs. Same loss as B; not recommended.

**Operator answers ONE of:**
- (A) "6 rows as drafted — go." → writer ships the 6-row table + the 6-item ItemList schema.
- (B/C) "5 rows, merge [specified rows]." → writer collapses + ships matching ItemList.

**Default if no answer:** 6 rows.

### Decision #2 — FAQ count: 6 (default) or 7?

Per §10 the proposed FAQ shortlist is 6 (head-query → route → off-piste → entity-specific → Alvor → swim-rule defer), with an optional 7th ("Are the Algarve caves dangerous?").

**Option A (default, recommendation):** ship 6 FAQs. Tight, on-topic, no drift into safety editorial.

**Option B:** ship 7 FAQs. Adds the safety-snippet capture; ties to the "One Last Thing" closing thematically. Risks pulling the post into editorial territory the rest of the body doesn't cover.

**Operator answers ONE of:**
- (A) "6 FAQs as drafted." → writer ships 6.
- (B) "Ship the 7th too." → writer drafts the safety FAQ per §10's skeleton.

**Default if no answer:** 6.

### Decision #3 — Include the optional CL1 lateral in the closing?

Per §11, the CSV directive flags a CL5 → CL1 lateral ("how to get to Benagil once you've picked it") as planned but the placement is editorially awkward.

**Option A (default, recommendation):** SKIP the CL1 lateral. The closing already carries the pillar↑ link with strong gravitational pull; adding the CL1 lateral risks the closing reading as a link-stack. The CL1 piece is reachable from the pillar one click away.

**Option B:** INCLUDE the CL1 lateral. The CSV directive is the editorial source-of-truth; the closing matrix bullet ("Decided on Benagil and ready to plan — [how to get to Benagil] covers ports, parking, and the 2026 rules") is a natural placement.

**Operator answers ONE of:**
- (A) "Skip — the pillar↑ covers it." → writer ships 5 in-body links (Option A in §9).
- (B) "Include the CL1 lateral." → writer ships 6 in-body links + the CL1 bullet in the closing matrix.

**Default if no answer:** A (skip).

### Decision #4 — Speedboat link placement: H2 #8 (current) or H2 #9 closing matrix (deepen)?

Per §9 slot #5 and §12, the speedboat in-body link currently sits in the Alvor section (H2 #8, line 68 of current draft). The deepen RECOMMENDS migrating it to the H2 #9 closing matrix as a bullet next to the "Half a day, limited budget" line, for intent-snap.

**Option A (default, recommendation):** MIGRATE to H2 #9 closing matrix. Aligns the commercial link with the matrix-decision moment; pairs cleanly with the new Cranchi bullet.

**Option B:** KEEP in H2 #8 Alvor section. Reader is in nature-reserve framing when they hit the speedboat link — slight tonal mismatch; current draft works fine if not optimal.

**Operator answers ONE of:**
- (A) "Migrate." → writer puts speedboat link in H2 #9 matrix.
- (B) "Keep where it is." → writer keeps speedboat link in H2 #8 Alvor section verdict paragraph.

**Default if no answer:** A (migrate).

### Decision #5 — Ship the `ItemList` JSON-LD schema as-drafted, or hold for a follow-up implementation plan?

Per §6 H2 #2, the comparison table is paired with an inline `<script type="application/ld+json">` block emitting `ItemList` schema. This is the page's NEW structured-data surface — no precedent in the hub's other clusters. Two paths:

**Option A (default, recommendation):** SHIP the inline `<script>` block as part of the deepen. The schema is well-formed; Astro renders inline `<script>` blocks in markdown as-is; the Rich Results Test will validate. No site-side wiring changes needed.

**Option B:** SHIP the comparison TABLE but DEFER the ItemList JSON-LD to a follow-up plan that adds an `itemList:` frontmatter field + a `buildItemList` helper (matching the pattern of `faqs:` + `buildFAQPage`). Cleaner machinery but slower to ship.

**Operator answers ONE of:**
- (A) "Ship the inline `<script>` now." → writer embeds the JSON-LD block per §6 H2 #2 in the deepened EN draft (and the translator pass replicates in PT/ES/FR with locale-appropriate `name` / `description` fields).
- (B) "Defer the schema, ship the table only." → writer ships the table without the JSON-LD block; the schema goes on a follow-up plan.

**Default if no answer:** A (ship inline).

### Genuinely-uncertain operator questions (raise only if surfaced — don't manufacture)

Per the CL6 brief's §16 pattern: surface ONLY if real uncertainties; don't fill the section.

Two genuinely-uncertain questions:

- **The two rivers of the Ria de Alvor.** Sources disagree on which two rivers feed the estuary (some say Alvor + Odiáxere; the EUNIS source says Arade + Alvor). The safe path is to NOT name the rivers in the Alvor section's geography paragraph. If the operator has the definitive local-knowledge answer (Atlantis is based in Portimão / Lagoa region; the operator likely knows the river names from boat charts), surface and the writer names the canonical pair. **Default:** skip the river-naming.
- **The "Marinha protected-area status" question.** Praia da Marinha sits within (or partially within) the Litoral do Algarve protected coastal landscape. The protected-status detail is potentially load-bearing for the AEO surface on the Marinha H2 — could the writer cite it the way the Alvor section cites Natura 2000? **Default:** skip — Marinha is famous as an arch + beach destination in the reader's mental model, not as a protected area; the Alvor section earns its protected-status weight because Alvor's experience IS the protected-status (nature reserve); Marinha's isn't.

If the operator surfaces neither of these, the brief stays as drafted.

## 16. Translation-time notes (PT/ES/FR translator pass after EN review)

The translation pass is a separate Sonnet pass per `feedback_opus_for_writing` user-memory ("Use Opus subagents for blog/content drafts; Sonnet OK for code, schema, translations"). The translator should know:

### Frontmatter changes per locale

| Field | EN | PT | ES | FR |
|---|---|---|---|---|
| `date:` | `2026-05-15` | `2026-05-15` | `2026-05-15` | `2026-05-15` |
| `author:` | `Atlantis Tours` *(KEEP)* | `Atlantis Tours` *(KEEP)* | `Atlantis Tours` *(KEEP)* | `Atlantis Tours` *(KEEP)* |
| `imageAlt:` | KEEP current | KEEP current | KEEP current | KEEP current |
| `tags:` | `[benagil, caves, travel-tips, comparison]` | `[benagil, caves, travel-tips, comparison]` *(verify PT current — may use locale-stem tags; the translator pass aligns with the EN set)* | `[benagil, caves, travel-tips, comparison]` *(same)* | `[benagil, caves, travel-tips, comparison]` *(same)* |
| `relatedTourSlugs:` | `[benagil-caves-speed-boat-tour, cranchi-yacht-cruise-to-the-benagil-caves]` | `[circuito-de-grutas-ate-benagil, cranchi-yacht-cruise-to-the-benagil-caves]` | `[benagil-caves-speed-boat-tour, cranchi-yacht-cruise-to-the-benagil-caves]` | `[benagil-caves-speed-boat-tour, cranchi-yacht-cruise-to-the-benagil-caves]` |
| `readingTime:` | `8` | `9` *(PT runs ~12% longer)* | `9` *(ES similar to PT)* | `9` *(FR similar)* |
| `faqs:` | 6 (or 7) Q&A pairs per §10 | mirror EN | mirror EN | mirror EN |

### Skylight-term convention (load-bearing — inherited from pillar + CL3)

The pillar's established EN term is **"skylight"** (with **"oculus"** as the one-off Latinate variant in the existing CL5 draft's bullet block — KEEP that one mention). Per the BUILD-STATUS §2 CL3 entry: "Skylight-term convention fix applied across PT/ES/FR (translator's `claraboia/claraboya` → pillar's established `abertura/abertura/l'ouverture`)." The CL5 deepen's translator pass must apply the same convention:

- **PT:** the canonical PT term is **`abertura`** (the pillar uses `abertura`; the standard translation of "skylight" in the context of the Algar de Benagil cave). The PT translator must NOT introduce `claraboia` (which is the literal translation but doesn't match the pillar's voice). The current PT CL5 draft uses `abertura natural circular` and `câmara em forma de cúpula` — VERIFY in draft.
- **ES:** the canonical ES term is **`abertura`** (matches the pillar). The ES translator must NOT introduce `claraboya`. The current ES CL5 draft uses `abertura natural circular` and `cámara abovedada` — VERIFY in draft.
- **FR:** the canonical FR term is **`ouverture`** (the pillar uses `l'ouverture`; the standard FR translation of "skylight" for the Algar de Benagil). The FR translator must NOT introduce `puits de lumière`. The current FR CL5 draft uses `ouverture naturelle circulaire` and `chambre voûtée en dôme` — VERIFY in draft.

### Cave-name vocabulary per locale

Most cave names are Portuguese proper nouns and stay verbatim across all 4 locales:
- **Algar de Benagil** — stays Portuguese across EN/PT/ES/FR (verify; the existing drafts do this).
- **Praia da Marinha** — stays Portuguese ("the Marinha beach" in EN bodies; "la playa de Marinha" in ES; same for PT/FR).
- **Praia do Carvalho** — stays Portuguese.
- **Gruta da Corredoura / Gruta da Mesquita / Gruta da Capela / Gruta dos Arcos** — stay Portuguese verbatim. The translator may gloss "Gruta da Capela" as "(Chapel Cave)" / "(la grotte de la Chapelle)" / "(Capilla)" — optional one-line gloss on first mention; matches the current EN draft's "(Chapel Cave)" pattern at line 60.

### Ria de Alvor vocabulary per locale

- **EN:** "Ria de Alvor" / "Alvor estuary" / "the Ria de Alvor estuary" (the deepen uses "Ria de Alvor" with the rename of the H2 title).
- **PT:** **Ria de Alvor** (lowercase "ria" when used as a common noun; uppercase as part of the place name — match the existing PT draft's convention at line 64 / 66). NO diacritic on "i".
- **ES:** **Ría de Alvor** (WITH diacritic on the "i" — Spanish convention for "ría"). The existing ES draft uses "Ría de Alvor" / "ría de Alvor" — KEEP that orthography.
- **FR:** **Ria de Alvor** (no diacritic; standard French treatment of Portuguese place names keeps the original). The existing FR draft uses "Ria de Alvor" / "ria de Alvor" — KEEP.

### Natura 2000 + Ramsar vocabulary per locale

- **PT:** "Natura 2000" stays verbatim (Latin proper name; same across all 4 locales). "Ramsar" stays verbatim. "Special Area of Conservation" → **Zona Especial de Conservação (ZEC)**. "wetland of international importance" → **zona húmida de importância internacional**.
- **ES:** "Natura 2000" stays. "Special Area of Conservation" → **Zona Especial de Conservación (ZEC)**. "wetland of international importance" → **humedal de importancia internacional**.
- **FR:** "Natura 2000" stays. "Special Area of Conservation" → **Zone Spéciale de Conservation (ZSC)**. "wetland of international importance" → **zone humide d'importance internationale**.

### Bird-name vocabulary per locale (Alvor section)

- **Greater flamingo:**
  - PT: **flamingo-comum** (the European Portuguese form; lowercase, hyphenated). The Brazilian PT is `flamingo-cor-de-rosa` — do NOT use that; honour European PT.
  - ES: **flamenco común** (lowercase, no hyphen — Spanish convention).
  - FR: **flamant rose** (the canonical French name; "rose" because Flamingo color, not because Greater specifically — but it's the standard French ID for greater flamingo).
- **Grey heron:** PT **garça-real**; ES **garza real**; FR **héron cendré**.
- **Little egret:** PT **garça-branca-pequena**; ES **garceta común**; FR **aigrette garzette**.
- **Purple heron:** PT **garça-vermelha**; ES **garza imperial**; FR **héron pourpré**.
- **Black-winged stilt:** PT **perna-longa**; ES **cigüeñuela común**; FR **échasse blanche**.
- **Avocet:** PT **alfaiate**; ES **avoceta común**; FR **avocette élégante**.
- **Black-tailed godwit:** PT **maçarico-de-bico-direito**; ES **aguja colinegra**; FR **barge à queue noire**.

The translator picks the 2–4 birds the EN draft names and translates the canonical equivalents; doesn't add MORE birds beyond the EN draft's set (anti-pattern: a translator going on a birdlife expansion in the PT/ES/FR drafts that the EN doesn't carry).

### Comparison-table translation discipline

The H2 #2 comparison table (per §6) translates structurally identically across locales. Specifics:
- Cave / place names: as above, stay Portuguese proper nouns. The PT/ES/FR translator may localize the column-1 "Cave / place" header but the row entries (Algar de Benagil, Praia da Marinha, etc.) stay Portuguese.
- "Where" column: locale-appropriate phrasing ("Lagoa coast" → PT "costa de Lagoa", ES "costa de Lagoa", FR "côte de Lagoa").
- "Famous for / Best for / Boat-only? / Crowd level" columns: translate the cells naturally; keep band labels (Very high / Medium / Low / Very low → PT muito alta / média / baixa / muito baixa, ES muy alto / medio / bajo / muy bajo, FR très élevé / moyen / bas / très bas).
- The "Boat-only? Yes (since 2023)" cell for Algar de Benagil — the "since 2023" specificity is the load-bearing CL2-defer cue at the table level; KEEP the year specificity in all 4 locales.

### ItemList JSON-LD translation discipline

The inline `<script type="application/ld+json">` block per §6 H2 #2 is structurally identical across locales but each locale's `name` / `description` fields translate to the locale language. Example PT version of position 1:

```json
{
  "@type": "ListItem",
  "position": 1,
  "item": {
    "@type": "TouristAttraction",
    "name": "Algar de Benagil",
    "description": "Gruta marinha em forma de cúpula com uma abertura circular no tecto e uma praia de areia no interior; só é acessível por água desde as regras de 2023.",
    "containedInPlace": { "@type": "Place", "name": "Lagoa, Algarve, Portugal" }
  }
}
```

The `containedInPlace.name` stays the same across locales ("Lagoa, Algarve, Portugal") because Google's schema-parser keys on the canonical place name in English-Latin script regardless of page locale; this is the standard Google-recommended pattern. The `description` translates.

### FAQ translation discipline

The 6 (or 7) FAQs translate 1:1 with locale-appropriate phrasing. Specific notes:
- FAQ #1 (head-query magnet) must keep the snippet shape — "Most travellers should pick Algar de Benagil…" 40–60w. Translator drafts then verifies word count.
- FAQ #2 (3–5 caves in one tour): keep the numerical bands as numerical figures (3–5 caves; 1.5–2 hours).
- FAQ #5 (Ria de Alvor worth it?): keep the "Ramsar wetland nature reserve" entity verbatim per the protected-status vocabulary above.
- FAQ #6 (Marinha swim + CL2 defer): the link to `/en/blog/can-you-swim-benagil-cave/` translates per locale to `/pt/blog/<PT slug>/`, `/es/blog/<ES slug>/`, `/fr/blog/<FR slug>/` (verify CL2 PT/ES/FR slugs in the live state).

### Voice translation discipline

- PT: European Portuguese forms (e.g., "actividade" or "atividade" — match the existing CL5 PT draft; the pillar + CL3 + CL6 use European forms; CL5 PT should be consistent). The comparative-piece voice should translate to a slightly-opinionated tour-operator register — NOT travel-magazine, NOT corporate-tourism-board. Match the existing CL5 PT draft's tone; deepen doesn't change tone, only depth.
- ES: Iberian Spanish (vosotros / vuestro / vuestras for plural "your"); slightly-opinionated tour-operator register; match the existing CL5 ES draft's tone.
- FR: standard metropolitan French; vouvoiement (vous) for reader address; match the existing CL5 FR draft's tone.

### Translation pass acceptance criteria

After the EN deepen is review-approved, the translator's pass verifies:
1. ☐ All four locales have the same H2 structure + section count.
2. ☐ The comparison table is structurally identical across locales, with locale-specific column headers + cell content, Portuguese cave names verbatim, locale-specific band labels.
3. ☐ The Alvor section's 6-paragraph progression is structurally identical with locale-specific phrasings; the dolphins-temper paragraph is present and applies the same load-bearing fix in all four locales.
4. ☐ The H2 #2 ItemList JSON-LD has the same 6 (or 5) items with translated `description` fields and identical `containedInPlace` values.
5. ☐ The `imageAlt` field in each locale stays the current English-canonical (KEEP — no Alvor hallucination to fix on this piece).
6. ☐ The `author` field stays `Atlantis Tours` in all four locales (NOT `Nuno Albino`).
7. ☐ The `date` field is `2026-05-15` in all four locales.
8. ☐ The `tags` field includes `comparison` in all four locales.
9. ☐ The `relatedTourSlugs` field includes both speedboat AND Cranchi slugs in all four locales.
10. ☐ The `faqs:` frontmatter has the same 6 (or 7) Q&A pairs (translated) in all four locales.
11. ☐ The in-body link targets use the locale-specific slugs per §11 (verify pillar slug, CL6 slug, speedboat slug, Cranchi slug per locale).
12. ☐ Each locale's word count: PT 1,800–2,200; ES 1,800–2,200; FR 1,800–2,200 (English 1,500–1,800 + 15–25% translation expansion, per the CL3 / CL6 PT/ES/FR pattern).
13. ☐ The skylight-term convention is applied: PT/ES `abertura`, FR `ouverture` — no `claraboia` / `claraboya` / `puits de lumière` introductions.
14. ☐ The Ria de Alvor orthography: PT `Ria de Alvor`, ES `Ría de Alvor`, FR `Ria de Alvor` — verify each.
15. ☐ The Natura 2000 + Ramsar entities translate per the protected-status vocabulary table.
16. ☐ The DE-cognate trap (see below) is avoided in all four locales.

### The DE-cognate trap (forward-looking)

Per BUILD-STATUS §3 the German `de` locale is on the strategic-follow-ups list (biggest measured non-brand demand, no `de` site yet). When CL5 eventually gets a DE locale, the translator should know:
- **Sea cave** → DE `Meereshöhle` (NOT `Seehöhle` — the latter is a lake cave, geomorphological confusion risk; "Seehöhle" reads as "lake cave" to German speakers, which is wrong for Atlantic sea caves). The cognate trap.
- **Skylight (in a cave context)** → DE `Lichtschacht` or `Deckenöffnung` (the latter is more precise for "circular opening in the roof"). NOT `Oberlicht` (which is a roof window in architecture, not a geological feature).
- **Estuary / lagoon (Ria de Alvor)** → DE `Mündungsgebiet` or `Lagune` (a Ramsar wetland is sometimes glossed as a `Lagune`). NOT `Bucht` (bay; different geomorphology).
- **Greater flamingo** → DE `Rosaflamingo` (the canonical German name).
- **Natura 2000 / Ramsar / Sonderschutzgebiet** — the EU + Ramsar names stay verbatim in German per the same multi-language convention used elsewhere; the German equivalent of "Special Area of Conservation" is `Besonderes Schutzgebiet (BSG)` — verbatim translation for clarity.

No DE locale is being created in this deepen; these notes are for a future DE pass when the strategic-follow-up ships. Don't pre-build DE files in this deepen.

---

## Verified facts (for the writer's confidence; cite without sourcing in the body)

These are operator + research facts verified 2026-05-15 across pillar + CL1 + CL2 + CL3 + CL6 reviews and this brief's own research pass; the writer doesn't need to re-verify, but should cite without external links in the body where natural:

- **Departure marina:** `Porto Comercial de Portimão` (signposted *Ac. Porto Comercial de Portimão*). NOT Clube Naval, NOT Marina de Portimão, NOT Portimão Marina. See `reference_atlantis_departure_marina` user memory.
- **Atlantis operates from Portimão only.** Does NOT run from Carvoeiro / Lagos / Albufeira / Armação de Pêra. Strike "or Albufeira" from the current EN line 78 closing matrix bullet.
- **The Benagil + Alvor product (FareHarbor PK 717728) has NO built `/tours/` page** in the current Astro site (verified 2026-05-15: the dist contains `/en/tours/benagil-caves-speed-boat-tour`, `/en/tours/cranchi-yacht-cruise-to-the-benagil-caves`, `/en/tours/luxury-sail-yacht-cruise`, `/en/tours/reef-fishing-tour` — and that's it).
- **The tour→guide wiring for PK 717728 IS pre-wired** in `packages/atlantis/src/lib/tour-guides.ts:44` — when the tour page ships, the inbound "Plan your trip" block will surface CL5 + CL7 + the pillar automatically. CL5's deepen does NOT need to push the outbound link before the tour page exists.
- **Cranchi yacht cruise to the Benagil caves:** FareHarbor PK 720028; EN slug `cranchi-yacht-cruise-to-the-benagil-caves`. Same slug across PT/ES/FR locales in the shipped tour data.
- **Speedboat tour PK:** 717720 (Benagil caves speedboat tour from Portimão). EN slug `benagil-caves-speed-boat-tour`. PT slug `circuito-de-grutas-ate-benagil`. ES + FR slugs match EN.
- **Ria de Alvor:**
  - Size: 1,454 hectares: VERIFIED (EUNIS / first-nature / multiple sources).
  - Natura 2000 Special Area of Conservation (SAC): VERIFIED (EUNIS site PTCON0058).
  - Ramsar wetland of international importance: VERIFIED (RSIS site 827; designated 1996).
  - Greater flamingo presence on the salt pans: VERIFIED.
  - Roughly 200 recorded bird species: VERIFIED (cited as "200+", "over 200").
  - Boardwalk along the southern dune-edge: VERIFIED.
  - Kayak/canoe/SUP hire from Alvor village: VERIFIED.
  - **Dolphins routinely entering the lagoon: NOT VERIFIED — temper to "in the Atlantic off Alvor coast" per the load-bearing factual fix in §13 #1.**
- **The pillar↑ anchor in CL5:**
  - Lede: `our complete guide to the Benagil cave tour` (CSV-verbatim).
  - Closing: `our complete Benagil cave tour guide` (varied descriptive variant; the CSV lists one anchor for both intro + closing, and the brief recommends varying for the closing to prevent exact-match-anchor repetition).
- **The CL6 lateral anchor in CL5:** RECOMMENDED variant `Algarve dolphin species and best months` (vs CSV-verbatim "the dolphins you pass on the way" which doesn't fit the deepened Alvor section's flow naturally).
- **The Cranchi anchor in CL5:** `a private Cranchi yacht to Benagil` (CSV-verbatim).
- **The speedboat anchor in CL5:** `the Benagil speedboat tour` (CSV-verbatim).
- **CL6 EN slug:** `dolphin-watching-algarve-species-seasons`. PT/ES/FR slugs: `observacao-golfinhos-algarve-especies-epocas` / `avistamiento-delfines-algarve-especies-temporadas` / `observation-dauphins-algarve-especes-saisons`.
- **CL1 EN slug:** `how-to-visit-benagil-cave`. PT/ES/FR slugs: verify in the current shipped state before drafting the optional CL1 lateral.
- **CL2 EN slug:** `can-you-swim-benagil-cave`. PT/ES/FR slugs: verify in the current shipped state before drafting the FAQ #6 link.

---

*End of brief. The writer should ack this brief, raise the 5 §15 decisions to the operator (table row count · FAQ count · CL1 lateral · speedboat link placement · ItemList schema ship-vs-defer), then draft the EN deepen. The reviewer reviews against §14. Translation to pt/es/fr is a separate Sonnet pass after EN review — all four files are deepened in place (PT/ES/FR existing files mirror the EN structure), no files are created or deleted. Per the project memory `feedback_opus_for_writing` — Opus drafts content, Sonnet handles schema/translation plumbing.*

*Brief author note: the verified Ria de Alvor facts cited in §7 + §14 + the "Verified facts" appendix are sourced from the Ramsar Sites Information Service entry for Ria de Alvor (RSIS site 827, `rsis.ramsar.org/ris/827`), the EUNIS factsheet for site PTCON0058 (`eunis.eea.europa.eu/sites/PTCON0058`), first-nature.com's Ria de Alvor wildlife page (`first-nature.com/algarve/reserves-riadealvor.php`), walkalgarve.com's Alvor Estuary birding hotspot page, responsiblevacation.com's nature reserves Algarve guide, Penina Hotel's Ria de Alvor page, and algarvetips.com's dolphin-watching activities page — all checked 2026-05-15. The dolphins-into-the-lagoon temper is sourced from the absence of corroboration in any of these sources for the current draft's "dolphins routinely follow small boats into the lagoon" claim; the verified pattern is dolphins in the Atlantic off the Alvor coast, with canoe/kayak/SUP being the small-craft access inside the lagoon itself. The two-rivers naming question (Alvor + Odiáxere vs Arade + Alvor) is the only open factual gap; the brief recommends skipping the river-naming in the deepened text rather than picking a contested pair. The writer can be confident citing what's in this brief.*
