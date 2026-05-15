# Content brief — CL6 DEEPEN: "Dolphin Watching in the Algarve: Species, Seasons, and Ethical Tours"

*Working doc · 2026-05-14 · authored with `content-brief-authoring` (primary) + `seo-aeo-geo` (snippet-shaped answer paragraphs, FAQPage schema, entity-coverage for AI engines) + `content-refresh-system` (refresh-vs-merge-vs-delete framing — this is a **DEEPEN**, not a rewrite; old body is mostly kept, additions are surgical) + `pillar-content-architecture` (cluster-piece anatomy under the Benagil pillar). Inputs read in order: `SEO/content-hub/BUILD-STATUS.md` §2 CL6 entry, `SEO/content-hub/briefs/cluster-best-time-visit-benagil-caves-brief.md` (CL3 — the closest analog: also a deepen with operator-data bands, also a month-by-month table, also the §16 single-question pattern), `SEO/content-hub/briefs/cluster-can-you-swim-benagil-cave-brief.md` (CL2 — voice contract, FAQ cadence, regulator-naming discipline applicable to the Decreto-Lei section), `SEO/content-hub/briefs/cluster-how-to-visit-benagil-cave-brief.md` (CL1 — frontmatter shape, fair-but-direct voice posture, link-cap discipline), the four shipped CL6 locale files (`packages/atlantis/src/content/blog/{en,pt,es,fr}/<slug>.md` — the existing 1,050w bodies that this deepen builds on, NOT replaces), the shipped pillar `packages/atlantis/src/content/blog/en/benagil-cave-tour-complete-guide.md` (esp. H2 #8 "What you'll see on the way" — the pillar's two-line dolphin mention that CL6 deepens), `SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` §2 row CL6 + §4 link graph rows, `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` rows where CL6 is source or target (verified by grep — 5 rows: 1 inbound from pillar, 1 outbound to pillar, 1 lateral to CL7, 1 inbound from CL7, 1 inbound from CL5, 1 cluster→tour, 1 inbound from speedboat tour), `SEO/research/2026-05-12-atlantis-keyword-map.md` cluster **C9** (the dolphin cluster — explicitly named in §1 finding #3 as one of the "already at GSC pos 7–12, push to page 1" quick wins; in §4 production-order step 2 as "deepen CL6 with species table, month-by-month, ethical-operator section, FAQ schema"), `SEO/research/2026-05-12-atlantis-keywords.csv` rows 96–100 for C9 query family. The pillar brief + CL2 brief + CL1 brief + CL3 brief are the voice + structural contracts; CL3 is the closest analog because both are deepens with operator-data bands. **This brief is the contract; the writer drafts against §6, §7, §8, §9, §10, §11, §13, §14.***

---

## 1. Header

- **Title (EN):** **Dolphin Watching in the Algarve: Species, Seasons, and Ethical Tours**
  - *Working alt (writer may pick): the existing title is good as it is — it covers the three load-bearing facets (species · seasons · ethics) and reads cleanly. The deepen does NOT change the title. **Default: keep verbatim.** Reviewer locks in §16.*
- **Slug (EN):** `dolphin-watching-algarve-species-seasons` *(URL-permanent; LOCKED in the prompt header; matches the existing file; do NOT change — would orphan inbound links from the pillar, CL5, CL7, and the speedboat tour page)*
- **Locale:** `en` (authoritative for the deepen pass — the EN draft is the source of truth; pt/es/fr translated in a separate Sonnet pass after EN review per `feedback_opus_for_writing` user-memory)
- **File paths (EXISTING files — deepen in place, do NOT delete-and-recreate):**
  - **EN (deepen):** `packages/atlantis/src/content/blog/en/dolphin-watching-algarve-species-seasons.md` *(currently 1,050w; target 1,400–1,700w; the existing frontmatter is mostly correct — `locale`, `translationKey`, `category`, `pillarSlug`, `pillarOrder: 4`, `relatedTourSlugs` are right; defects to fix: `author`, `date`, `imageAlt`, missing `faqs:`, missing `seasonality` tag — see "frontmatter defects" below)*
  - **PT (deepen):** `packages/atlantis/src/content/blog/pt/observacao-golfinhos-algarve-especies-epocas.md` *(currently ~1,050w; mirror EN deepen; PT translation pass after EN review; PT body scales to ~1,650–2,050w per the translation pattern observed on CL3 — PT runs +15–25% over EN for word count)*
  - **ES (deepen):** `packages/atlantis/src/content/blog/es/avistamiento-delfines-algarve-especies-temporadas.md` *(currently ~1,050w; mirror EN deepen; ES translation pass after EN review)*
  - **FR (deepen):** `packages/atlantis/src/content/blog/fr/observation-dauphins-algarve-especes-saisons.md` *(currently ~1,050w; mirror EN deepen; FR translation pass after EN review)*
- **`translationKey`:** `dolphin-watching-algarve` *(LOCKED — already in place on all four locales; do NOT change. The i18n resolver wires the four siblings via this key; touching it orphans them.)*
- **`pillarSlug` (locale-specific per BUILD-STATUS §4 rule):**
  - en: `benagil-cave-tour-complete-guide` *(already in EN file ✅)*
  - pt: `guia-completo-gruta-benagil` *(already in PT file ✅)*
  - es: `guia-completo-cueva-benagil` *(already in ES file ✅)*
  - fr: `guide-complet-grotte-benagil` *(already in FR file ✅)*
- **`pillarOrder`:** `4` *(LOCKED per BUILD-STATUS §2 + §4 rule — already in place on all four locales ✅. CL6 sits 4th in the pillar's auto-generated "In this guide" component, after CL1=0 → CL2=1 → CL3=2 (post the §16 retroactive bumps documented in CL1's brief §16) → and ahead of CL5=3, CL7=5, CL8=6, CL9=7, CL10=8. Actually verify the CL3/CL5 sort positions in the current pillar render — BUILD-STATUS §2 line 5 names the live order as CL1 → CL2 → CL3 → CL4 → CL5 → CL6 → CL7 → CL8 → CL9 → CL10. Treat the current `pillarOrder: 4` as load-bearing; do NOT touch.)*
- **Frontmatter defects to fix forward (every one of these is wrong, missing, or stale on the live file):**
  - `author: "Nuno Albino"` *(currently `Atlantis Tours` — WRONG. Architecture doc §6b names CL6 on the skipper-byline list explicitly: "Skipper byline (Nuno Albino, with bio/image) on the experiential/practical pieces — CL1, CL2, CL3, **CL6**, CL8, the fishing trio." Fix forward.)*
  - `date: "2026-05-14"` *(currently `2026-04-16` — stale by ~4 weeks. Refresh to today's date when the deepen ships. The article-modified date will future-bump on subsequent refreshes per the content-refresh-system discipline; for this pass the date frontmatter is the load-bearing freshness signal.)*
  - `imageAlt:` *(currently mentions "Alvor lagoon nature reserve" — **factually wrong**. Atlantis boats depart from Porto Comercial de Portimão and run the Portimão–Benagil coast; they do NOT operate in the Alvor lagoon (separate FareHarbor product `benagil-and-alvor-nature-reserve`, PK 717728, runs the Alvor leg, and it's not the boat shown here). **Replace with:** "Bottlenose dolphins riding the wake alongside an Atlantis Tours speedboat off the Algarve coast" (EN). Locale-appropriate translations for PT/ES/FR — see §15 translation notes for exact phrasings. This is a load-bearing factual correction; the wrong alt has shipped for ~4 weeks and is the single most-likely hallucination to propagate downstream.)*
  - `image:` — current value `https://cdn.filestackcontent.com/btJvs7ETdSHHh2QskU2g` is fine **IF** the image actually shows bottlenose alongside the boat. **Reviewer confirms in §16.** Do NOT change the image URL on the deepen unless the operator surfaces a better asset — image swaps are a separate workstream from content deepens. If a marina-specific or bow-wave-with-pod asset surfaces later, the operator swaps on a future refresh.
  - `tags:` *(currently `[dolphins, marine-life, family]` — ADD `seasonality`. Matches CL3's precedent — `seasonality` was added to CL3 in its deepen, groups all "month-by-month / when's the best time" pieces in the taxonomy. Final tag set for CL6: `[dolphins, marine-life, family, seasonality]`.)*
  - `faqs:` *(currently MISSING entirely — ADD. This is the single biggest AEO weight loss on the live file: no `faqs:` frontmatter means no `<details>` FAQ block visible AND no `FAQPage` JSON-LD emitted, which is the most-citable schema surface AI engines look for. See §10 for the 7 Q&A pairs.)*
  - `excerpt:` — current is fine ("The waters off the Algarve coast are home to three resident dolphin species and a handful of rarer visitors. Here's how to recognise them, when sightings peak, and how to pick a tour that doesn't harass the wildlife.") — KEEP as-is. The deepen doesn't justify rewriting the excerpt; it already lands the three load-bearing facets (species · seasons · ethics).
  - `readingTime: 7` *(currently `6`; bump to `7` to reflect the ~1,400–1,700w target — roughly 6.5–8 min at 220 wpm. The reading-time field is a hint, not a contract.)*
  - `category: marine-life` *(currently `marine-life` ✅ — keep. Matches CL7's `marine-life` category; consistent across the two siblings.)*
- **Localized siblings — slugs LOCKED (URL-permanent, already shipped):**
  - pt: `observacao-golfinhos-algarve-especies-epocas`
  - es: `avistamiento-delfines-algarve-especies-temporadas`
  - fr: `observation-dauphins-algarve-especes-saisons`

## 2. The query landscape this piece owns

Pulled from `SEO/research/2026-05-12-atlantis-keyword-map.md` cluster **C9** (the dolphin cluster — explicitly named in §1 finding #3 as one of the "already at GSC pos 7–12, push to page 1" quick wins). C9 cluster row from the keyword map: *"C9 | Dolphin watching Algarve & Portimão | blog `dolphin-watching-…` + `marine-life-…`; + a dolphin anchor on the speedboat page | Info → Commercial | Opp 3 | Diff 2 | Fit 4 | Pri **5**"* — CL6 is C9's primary "dolphin watching" facet (CL7 carries the broader marine-life lens; speedboat tour page carries the commercial anchor). The keyword map's production-order §4 step 2 names this deepen by its exact components: *"Deepen `dolphin-watching-algarve-species-seasons` (species table, month-by-month, ethical-operator section, FAQ schema), interlink it with `marine-life-…`, and add a 'dolphins are often spotted on this tour' section/anchor on the speedboat page. Targets `best time to see dolphins in algarve` (8.7→p1), `portimao dolphin tour` (6.8→p1)."*

### Primary keyword (head query)
- **`dolphin watching algarve`** — the head query CL6 owns. GSC tier **M** (medium volume per the keyword map's directional tiering; no Ahrefs/Semrush licence on site). Currently sitting ~p7–12 per the keyword map and the BUILD-STATUS quick-win note. The deepen is engineered to push this query onto page 1 within 8–12 weeks via:
  1. the **species comparison table** under H2 "The Three Resident Species" (AI-engine citation surface — the table is the highest-leverage AEO asset on the page),
  2. the **month-by-month sighting chart** inside H2 "When are sightings most likely?" (the AEO-shaped "when to see dolphins in algarve" answer surface),
  3. the **expanded ethical-operator section** with the Decreto-Lei 9/2006 citation (entity-coverage signal + topical-authority signal that no other Algarve-dolphin SERP page carries),
  4. the **`faqs:` frontmatter** emitting `FAQPage` JSON-LD (currently missing — single biggest AEO uplift on this page),
  5. the **operator-voiced sighting bands** (Atlantis tour-log inferred — operator-grade specificity that no aggregator competitor can fake),
  6. consistent **internal links up to the pillar** (intro + closing) + **lateral to CL7** (the marine-life sibling).
- **Search-snippet shape:** the H2 #1 ("The short answer" — see §6 for the full anatomy) opens with a sentence that answers the head query directly — "**Dolphins are commonly seen off the Algarve coast from May through October, especially on calm mornings between 07:00 and 11:00. Three species are resident — common, bottlenose, and striped — with bottlenose the only true year-round pod. Calm-morning sighting rates are typically 70–85%; afternoon rates drop to 30–50%.**" This is the citation surface. Don't bury it; don't soften it; do NOT add "it depends" caveats above this paragraph.

### Secondary keywords (the long-tail variants CL6 owns)
- **`best time to see dolphins in algarve`** — the keyword map names this explicitly: ~p8.7, the closest-to-page-1 query in the whole atlantis GSC set. The month-by-month table is the AEO surface for this; the H2 #1 answer paragraph is the snippet shape. **Primary deepen target.**
- **`portimao dolphin watching`** — ~p11.6, the second-closest. The "ethical-operator" section + the operator-voice lines about how Atlantis runs from Portimão specifically are the AEO surfaces.
- **`portimao dolphin tour`** — ~p6.8, already on the edge of page 1 with commercial intent. The closing tour-page link + the H2 "Cave tour vs dedicated dolphin tour" decision matrix carry this.
- **`dolphin watching algarve`** — head query as above; GSC tier M, currently ranking soft.
- **`dolphin watching portimao`** — commercial intent. The speedboat tour page is the primary surface; CL6 links to it once.
- **`dolphin species algarve`** — the species comparison table is the AEO surface; this is the snippet target for ID queries.
- **`when to see dolphins algarve`** — synonym of "best time to see dolphins"; the month-by-month chart owns.
- **`bottlenose dolphins algarve`** / `common dolphins algarve` / `striped dolphins algarve` — species-specific long-tails; each species H3 block + the comparison table own.
- **`ethical dolphin watching algarve`** / `wild dolphin swimming portugal legal` — ethics-themed long-tails; H2 "What an ethical dolphin tour looks like" (renamed for snippet shape) + the Decreto-Lei 9/2006 paragraph own. AI-engine-shaped queries about legality.

### Long-tail / AEO surface (prompt-shaped queries AI engines see; FAQs catch)
- `what is the best time of year to see dolphins in the algarve` *(FAQ #1 — the head-query magnet)*
- `what are the chances of seeing dolphins on a benagil cave tour` *(FAQ #2 — sighting odds)*
- `which dolphin species can you see in the algarve` *(FAQ #3 — species ID)*
- `is dolphin watching in the algarve ethical / regulated` *(FAQ #4 — ethics + Decreto-Lei mention)*
- `is it legal to swim with dolphins in portugal` *(FAQ #5 — short clean answer: no)*
- `is a benagil cave tour or a dolphin watching tour better for dolphins` *(FAQ #6 — decision matrix)*
- `what should i bring for dolphin watching in the algarve` / `when should i book a dolphin tour` *(FAQ #7 — combined logistics)*

### Volume note (inherited from pillar §2, CL2 §2, CL1 §2, CL3 §2)
All volumes GSC-inferred and directional; no Ahrefs/Semrush licence on site. CL6's "almost page 1" position is the strategic context that makes this deepen the highest-ROI move in the hub right now — modest content depth + the FAQ schema + the lateral CL7 link + the species table is enough to push pos 8.7 → page 1 per the keyword map's diagnosis. The piece does NOT need to win on volume; it needs to win on snippet-shaped answer paragraphs, entity coverage (Decreto-Lei 9/2006, ICNF, Polícia Marítima, three species' Latin binomials), and the operator-voiced citation surface that aggregator blogs can't fake.

## 3. Reader/intent profile + JTBD

- **Intent:** **Mid-funnel informational with a "narrowing-which-tour-to-book" undertone.** The reader has decided dolphins are interesting; they're now figuring out (a) what species they'd see, (b) what month/time to come, (c) whether the cave tour they're considering also catches dolphins or whether they need a dedicated dolphin tour, (d) whether the whole industry is ethical. Anxiety is mid — lower than CL2 (which resolves a planning anxiety) but higher than CL1 (which is pure logistics). The undertone is "tell me if I'll actually see dolphins, when, on which kind of tour, and that I'm not paying for something that harms them."
- **Commercial intent grade:** **mixed → commercial-leaning** (matches the keyword map's C9 row: "Info → Commercial"). The "best time" / "species" queries are informational; the "portimao dolphin tour" query is commercial. CL6 serves both — the body answers the informational questions, the closing tour-page link captures the commercial.
- **Who:**
  - **Sub-profile A — "flexible dates, optimising the experience" (~40%).** Hasn't booked yet; flexible on dates; trying to figure out the best window. The month-by-month chart is load-bearing for them. They're choosing between May–June (peak common dolphin season) vs July–August (peak everything but most crowded) vs September (operator-preferred). CL6 confirms or refines their pick.
  - **Sub-profile B — "dates locked, picking the right tour" (~35%).** Has a trip booked, often the Benagil cave tour, now wondering whether to add a dedicated dolphin tour or whether the cave tour will deliver dolphins too. The "cave tour vs dedicated dolphin tour" decision matrix (H2) is load-bearing. The honest answer from operator data: on a calm morning May–Oct, the cave tour delivers dolphins ~50–60% of the time; a dedicated tour goes higher (~75–85%) but covers less coast.
  - **Sub-profile C — "ethics-anxious researcher" (~15%).** Has seen the captivity-industry exposés, has read about boat harassment of wild pods elsewhere in Europe, wants to confirm the Portuguese industry is regulated. The Decreto-Lei 9/2006 paragraph + the operator-voice anti-harassment lines are load-bearing. The honest answer: yes, it's regulated; the rules are robust on paper; enforcement is patchy; reputable operators self-police harder than the law requires.
  - **Sub-profile D — "wildlife photographer / serious birder type" (~10%).** Knows the species names already; wants the operator-grade detail on which species per month, what pod sizes, where to look on the coast. The species table + the month-by-month chart serve them; the H3 species sections give them what no other Algarve SERP page does (ID marks, behaviour-near-boats, characteristic pod sizes).
- **Sophistication:** Medium on dolphin biology. Most readers know "common dolphin" is the most common Atlantic species; most don't know that bottlenose are the only year-round Algarve residents; most don't know striped dolphins are migratory through the Gulf of Cádiz. Most know swimming with dolphins is sometimes legal-sometimes-not and don't know Portugal's posture. Treat them as smart but unbriefed.
- **JTBD (one sentence):** *"Tell me which dolphins live here, when I'll see them, what my odds are, whether the cave tour I'm thinking of doing will deliver them, and reassure me the industry is actually regulated."*
- **What they came in worried about:**
  - "Will I actually see dolphins, or am I being sold a maybe?" (yes most calm mornings May–Oct; honest sighting bands in the month-by-month chart)
  - "Which species will I see?" (most likely common dolphin in summer; bottlenose if you're lucky; striped only on longer-range tours)
  - "Is it ethical? Are these wild dolphins or some weird captive set-up?" (wild, regulated under Decreto-Lei 9/2006; the operator-voiced enforcement reality is the trust-currency)
  - "Should I book the cave tour or a dedicated dolphin tour?" (depends on priority — decision matrix in H2 #7)
  - "Can I swim with them?" (no, illegal in Portuguese waters; FAQ #5 owns)
- **What "good" looks like for this reader:** they leave the page knowing (1) the three species + ID marks, (2) the month-by-month odds, (3) the morning-vs-afternoon difference, (4) whether the cave tour catches dolphins, (5) that the industry is regulated and what regulation means in practice, and (6) where to book if they decide. They do NOT feel sold to; they feel briefed by someone who runs the boats.

## 4. Anti-duplication (what other pieces own; where the boundaries are)

The biggest editorial risk for CL6 is **drifting into CL7's broader marine-life lane** (turtles, seabirds, sunfish, octopus) and **drifting into CL3's territory** (cave-tour timing, not dolphin timing) and **drifting into CL2's territory** (the 2023 cave swim rules — those are CAVE rules; CL6's regulatory citation is about CETACEAN-WATCHING rules under Decreto-Lei 9/2006, a completely different statute). The cut line:

| Facet | Pillar covers | **CL6 covers** | CL2 covers | CL3 covers | CL7 covers | Speedboat tour page covers |
|---|---|---|---|---|---|---|
| What is the Benagil cave / geology / skylight | Full (H2 #1) | **DO NOT enter — pillar callout in lede handles "what is the cave?"** | — | — | — | — |
| Boat-type comparison (speedboat / Cranchi / sail / kayak) | Full (H2 #6) | **DO NOT enter** | brief mention H2 #4 | — | — | — |
| Port-by-port (Portimão/Carvoeiro/Lagos/AdP) | Summary (H2 #4) | **DO NOT enter — CL1 owns** | — | — | — | — |
| 2023 cave swimming rules (Capitania edital) | Headline (H2 #3) | **DO NOT enter — completely different statute from Decreto-Lei 9/2006; mention zero times** | Full | — | — | — |
| Best time to visit the **cave** | Full month-by-month (CL3 deepens) | **DO NOT enter — CL3 owns cave timing** | — | Full | — | — |
| **Best time to see DOLPHINS** | One-line in H2 #8 | **YES — CL6 owns this in depth (the month-by-month sighting chart)** | — | DO NOT enter | mention in passing only, defer to CL6 | — |
| **Three dolphin species + ID marks** | Two-line mention in H2 #8 | **YES — CL6 owns (species table + 3 H3 species sections)** | — | — | DO NOT enter — defer to CL6 | — |
| **Decreto-Lei 9/2006 (cetacean-watching regulation)** | Not covered | **YES — CL6 owns (the ethical-operator section)** | — | — | DO NOT enter — defer to CL6 | — |
| **Cave tour vs dedicated dolphin tour decision matrix** | Not covered | **YES — CL6 owns (H2 #7)** | — | — | — | — |
| **What to bring for DOLPHIN SPOTTING specifically** (polarised glasses, fast-shutter camera) | Not covered | **YES — CL6 owns (H2 "What to bring") — KEEP from current draft, light tighten** | — | — | — | — |
| Whale-watching (minke, sperm, orca) | Not covered | **MENTION ONLY — "Rarer Visitors" section stays as-is; do NOT expand into whale-watching territory; that's a future cluster not currently scoped** | — | — | — | — |
| **General marine life (turtles, seabirds, sunfish, octopus)** | Not covered at depth | **DO NOT enter — CL7 owns this; link to CL7 ONCE for "the rest of the Algarve coast's marine life"** | — | — | Full | — |
| **Commercial booking depth, prices** | Pillar H2 #12 | **DO NOT enter — closing tour link + speedboat page own** | — | — | — | Full |
| Departure point details, drive-times, parking | Pillar H2 #4 + CL1 owns | **DO NOT enter — CL1 owns** | — | — | — | — |

### The load-bearing rules for CL6

1. **Stay under 1,700 words EN body.** If the writer wants more, a section probably belongs in CL7 (broader marine life) or in a different cluster. Word count is a discipline, not a target. **The 1,700 ceiling is hard.** PT/ES/FR will run +15–25% per the translation pattern, which is fine — the EN ceiling is what we enforce.
2. **CL6 is the DOLPHIN-SPECIFIC LENS. CL7 is the EVERYTHING-ELSE-MARINE-LIFE lens.** The line: if a fact is about dolphins specifically (species ID, pod size, sighting odds per month, dolphin-watching regulation), it's CL6. If a fact is about other marine life (turtles, seabirds, sunfish, octopus, baitfish), it's CL7. The "Rarer Visitors" section in the current EN draft (lines 52–61) names whales + Risso's dolphin + orcas — that section is fine to keep, light tighten only. Risso's dolphins technically belong here (they're dolphins). Whales/orcas are conceptually CL7 territory but the existing one-line mentions are appropriate for a cluster boundary handoff; do NOT expand them.
3. **Do NOT build a whale-watching section.** The "Rarer Visitors" bullets stay as bullets. The prompt is explicit: "Do NOT cover whales beyond what already exists." If a reader wants whale-watching depth, they're a future-cluster reader; not CL6's job.
4. **Do NOT recap cave timing.** CL3 owns "best time to visit the Benagil cave." CL6 owns "best time to see dolphins" — those are different answers (cave is May–October at midday for the skylight; dolphins are May–October calm mornings 07:00–11:00). The piece may incidentally note "this also happens to be when the cave tours run" — but the timing logic CL6 deploys is dolphin-biology + sea-state + baitfish, not cave-geometry.
5. **Do NOT recap the 2023 cave swim rules.** CL2 owns those (Capitania do Porto de Portimão edital from September 2023, cave-entry specific). CL6's regulatory citation is **Decreto-Lei 9/2006** — a totally separate national-law statute governing cetacean watching. The reader who came in for dolphins is not the same reader as the one who came in for "can I swim in the cave"; do NOT conflate. Zero mentions of the Capitania, the 2023 edital, or "can you swim in the cave" in CL6's body. If the writer is tempted to write "and you can no longer swim into the cave either" — STOP, that's CL2's lane.

## 5. SEO/AEO/GEO targets

### Featured-snippet target (the citation block)
The H2 #1 ("The short answer") opens with the 40–60-word answer paragraph in §2 above. That's the featured-snippet target for `dolphin watching algarve`, `best time to see dolphins in algarve`, and `when to see dolphins algarve`. Don't bury it; don't soften it.

### `FAQPage` schema target (the AEO surface)
The `faqs:` frontmatter block emits both the visible `<details>` Q&A list AND the `FAQPage` JSON-LD via the existing site pipeline (same wiring as pillar + CL1 + CL2 + CL3). Each FAQ answer is 40–60w, snippet-shaped, complete-sentence. FAQ #1 ("What is the best time of year to see dolphins in the Algarve?") is the head-query magnet; FAQ #5 ("Is it legal to swim with dolphins in Portugal?") is the AI-engine-shaped legality query. See §10 for the full 7 Q&A pairs.

### Entity-coverage list (AEO/GEO — named entities AI engines look for; load-bearing)

Required entities the piece must work in naturally (not stuffed). The pillar's entity list applies broadly; CL6 has a tight "species + months + regulators + waters" focus.

**Species entities (load-bearing for AI-engine ID query handling):**
- **Common dolphin** (*Delphinus delphis*) — H2 "Three resident species" + species table + H3 block. Italicise the Latin binomial once at first mention.
- **Bottlenose dolphin** (*Tursiops truncatus*) — same treatment.
- **Striped dolphin** (*Stenella coeruleoalba*) — same treatment.
- **Risso's dolphin** (*Grampus griseus*) — one mention in "Rarer Visitors" (optional Latin binomial; the existing draft doesn't italicise it; the deepen may add — writer's call).
- **Short-finned pilot whale** (*Globicephala macrorhynchus*) — one mention in "Rarer Visitors" (optional Latin binomial).

**Geographic entities:**
- **Algarve** (passim) · **Portimão** (lede, H2 "From the wheelhouse" passages, H2 #7 decision matrix) · **Porto Comercial de Portimão** (one mention in the closing if departure is named; do NOT name Marina de Portimão, do NOT name Clube Naval — load-bearing anti-pattern carried from pillar + CL1 + CL2 + CL3) · **Gulf of Cádiz** (one mention in striped dolphin H3 — the Gulf-of-Cádiz migration is what makes striped dolphins seasonal in the Algarve; entity for biological precision) · **Atlantic** (passim — the body of water; entity for AEO weight).

**Regulatory entities (load-bearing — these are the citation surfaces no other Algarve-dolphin SERP page carries):**
- **Decreto-Lei n.º 9/2006** (the regulation governing cetacean-watching activities in continental Portuguese waters; entered into force 7 January 2006) — the ethical-operator section centers on this. Cite by exact decreto-lei number. The official source: `https://diariodarepublica.pt/dr/detalhe/decreto-lei/9-2006-168231` (Diário da República — Portuguese government gazette) — optional external link, see §11.
- **ICNF** (Instituto da Conservação da Natureza e das Florestas — the licensing authority for cetacean-watching operators under Decreto-Lei 9/2006) — one mention; entity for AEO weight.
- **Polícia Marítima** — enforcement at sea; one mention; same agency named in CL2.
- **Capitania** — not relevant for CL6 (CL2's regulator); do NOT mention.

**Behaviour / biology entities (light touch):**
- **baitfish** (the sardine/anchovy schools that drive dolphin foraging behaviour) — one mention in the month-by-month section (baitfish movement explains why winter sighting rates drop).
- **bow-riding** (the technical term for dolphins surfing a boat's pressure wave) — one mention in the bottlenose H3 section.

**Entities in the first 200 words (AEO weight on the lede + H2 #1 answer paragraph):**
- Algarve · dolphin (head-query weight) · the three species names (common, bottlenose, striped) — at least 3 named entities in the first 200w. The lede already lands "Algarve coast" and "three different species" in the first 80w; the deepen's H2 #1 answer paragraph lands the three names explicitly.

**Entities NOT to use:**
- `Clube Naval` / `Marina de Portimão` / `Portimão Marina` — wrong entities (pillar + CL1 + CL2 + CL3 enforce; load-bearing anti-pattern).
- `Alvor lagoon` / `Ria de Alvor` / `Alvor nature reserve` — Atlantis boats do NOT operate in the Alvor lagoon; the current imageAlt makes this hallucination. Removed in the deepen; do NOT reintroduce in body copy.
- `Capitania do Porto de Portimão` — CL2's regulator (governs cave entry, not cetacean watching); not relevant here.
- Specific euro prices, fine amounts for cetacean operators — *see §13 #5 and §11 on the Decreto-Lei 9/2006 fine bracket; the bracket is genuinely on the regulation but the writer must NOT round/invent figures. Use the bracket as verified, or omit the figure.*
- Specific drive-times — CL1's territory.
- Specific named individuals (skippers, fatalities) — inherited anti-pattern from pillar §13 + CL2 §13.

## 6. Structure & H2 outline (with one-line scope per H2 + KEEP / EXPAND / NEW / RENAME tag)

**Target word count EN body: 1,400–1,700 words** (target ~1,500). The current draft is 1,050w; the deepen adds ~400–650 words via the two tables, the expanded ethical-operator section, and the FAQ block (the `faqs:` frontmatter doesn't count toward body word count, but the FAQ content itself becomes visible Q&A which the reader sees). **9–10 H2s** (current draft has 7; deepen adds 2 — the renamed timing H2 promotes from a subsection, and the new H2 split for ethical-operator that needs the room). Each H2 opens with a **40–60-word answer paragraph** (AEO/GEO citation surface). Per-section word counts below sum to ~1,450–1,650; section bands are upper-flex ceilings, not floors.

### Lede / hero (no H2)

- **Tag:** **EXPAND** (keep the existing two-paragraph lede; add the pillar↑ callout in the first 200w; add a "From the wheelhouse" framing line in operator voice; bump the byline emphasis).
- Word count: **~120–150w** (current is ~90w; the deepen adds the pillar callout + one operator-voice line).
- Sets the scope, the skipper byline voice, the dolphin-as-wildlife-not-aquarium framing.
- **Pillar callout in the first 200 words** (per pillar brief §5b cluster anatomy + CL1/CL2/CL3 hero pattern). **Anchor text exactly: `the full Benagil Cave Tour guide`** (per CSV row `dolphin-watching-algarve-species-seasons,benagil-cave-tour-complete-guide,"cluster->pillar (bottom-up, intro+closing)",the full Benagil Cave Tour guide,planned` — note this anchor differs from CL1/CL2/CL3's `complete Benagil Cave Tour guide` — the CSV says "the full"; use what the CSV says, this is the editorial source for the anchor). Target: `/en/blog/benagil-cave-tour-complete-guide/`. Suggested phrasing for the deepen: "We run the speedboat into the Algar de Benagil every summer day from Portimão; we see dolphins most weeks of the year. 'Will we see any?' is the second-most-asked question we field (after 'can I still swim in?'). The full picture on the cave tour itself lives in [the full Benagil Cave Tour guide](/en/blog/benagil-cave-tour-complete-guide/); this piece is the deep answer to the dolphin question — which species, which months, what your odds are, and how the regulated operators do it right."
- **Operator-voice line in the lede** (the "From the wheelhouse" framing the prompt names). Suggested: "On a flat-calm July morning we'll spot common dolphins from a kilometre off, sometimes a pod of 50 or more streaming under the bow. On a choppy October afternoon we may run the full coast and see nothing." That cadence — concrete, observational, no marketing — sets the voice contract.
- Do NOT bury the lede. Do NOT start with "Are you planning a trip to the Algarve?" or "The Algarve is one of Portugal's most beautiful regions." Both are in pillar §13 / CL1 §13 / CL2 §13 / CL3 §13 banned-opener lists. Open with the observation and the skipper voice.

### H2 #1 — "The short answer" *(featured-snippet target — NEW)*

- **Tag:** **NEW.** The current draft doesn't have an H2 #1 snippet block. The deepen ADDS this as the first H2, displacing nothing — it slots before the existing "Three Resident Species" H2. This is the highest-leverage AEO addition on the page.
- Word count: **~120w.** Deliberately short — this is the citation block.
- **Answer paragraph (40–60w, write it as the snippet, not as a paragraph):**
  > **Dolphins are commonly seen off the Algarve coast from May through October, especially on calm mornings between 07:00 and 11:00. Three species are resident — common, bottlenose, and striped — with bottlenose the only true year-round pod. Calm-morning sighting rates are typically 70–85%; afternoon rates drop to 30–50%.**
- Then 1 short paragraph (~60–80w) summarising the rest of the piece's shape. Suggested: "Common dolphins are the most-seen species in summer; bottlenose are the resident pod you'll meet on calm mornings; striped dolphins favour deeper water on longer-range tours. Atlantic baitfish movement is the seasonal driver, not the calendar. The Portuguese cetacean-watching industry is regulated under Decreto-Lei 9/2006 — swimming with wild dolphins is illegal; reputable operators self-police harder than the law requires."
- **Do NOT** enter species-ID depth here — that's H2 #2. The H2 #1 citation block earns its weight by being clean and definitive.

### H2 #2 — "The three resident species" *(species table + 3 H3 species sections)*

- **Tag:** **EXPAND + RENAME from "The Three Resident Species"** (the current draft has this H2 as `## The Three Resident Species` — keep the H2; the rename is a Title-Case → sentence-case style call that the writer makes once across the piece for consistency with H2 #1's "The short answer". If the operator prefers Title Case across the piece, keep "The Three Resident Species" — style call, not load-bearing.) The EXPAND: add the **species comparison table** at the top of this H2, BEFORE the three H3 species sections; lightly tighten the existing H3 species copy; ensure each H3 species block carries the species-Latin-binomial in italics on first mention (the current EN draft has all three correctly).
- Word count: ~500–600w (largest section; carries the spine of the piece). Current EN H2 is ~430w (incl. all three H3s); the deepen adds the table (~150w of structured content) + light copy tightening across the three H3s (no net add to prose).
- **Opening answer paragraph (40–60w)** — write fresh, BEFORE the table: "Three species of dolphin live off the Algarve coast: the common dolphin, the bottlenose dolphin, and the striped dolphin. Common dolphins are the most-seen species in summer; bottlenose are the only year-round resident pod; striped dolphins favour deeper, offshore water. Sightings of all three peak from May through October, with bottlenose visible year-round on calm days."
- **THE SPECIES COMPARISON TABLE** (the highest-leverage AEO asset on the page — write directly under the answer paragraph, BEFORE the three H3 species sections):

  | Species | Size | Pod size | Best season | ID marks at a glance | Behaviour near boats |
  |---|---|---|---|---|---|
  | **Common dolphin** (*Delphinus delphis*) | ~1.7–2.4 m | 10–500+ | May–Oct (peak Jun–Aug) | Yellow-gold hourglass on flanks; dark "cape" across back | Acrobatic; breaches clear of water; bow-rides; tail-slaps |
  | **Bottlenose dolphin** (*Tursiops truncatus*) | ~2.5–3.5 m | 5–15 | Year-round (best Apr–Oct in calm seas) | Larger and stockier; uniform grey; rounded "bottle" beak; scarring on dorsal fins | Curious; approaches boats deliberately; slow swim-bys; rarely breaches |
  | **Striped dolphin** (*Stenella coeruleoalba*) | ~1.8–2.5 m | 20–100 | Jun–Sep, on longer-range tours | Dark blue-black stripes along a pale grey body; pale flank patches | Fast, athletic; doesn't linger near boats; spectacular breaches when it does |

  The table is the load-bearing AEO asset. AI engines and SERP feature crawlers will lift this verbatim. Use **bold** for the species names + Latin binomials in italics — the formatting is what the AI engines parse cleanly into structured answer cards. Reviewer-operator confirms the rows in §16 if any cell is off (pod sizes, size ranges, "best season" pattern are inferred from biology + Atlantis tour log; reviewer adjusts if reality diverges).

- **H3 subsections** (3 H3s — KEEP the current copy with light tightening; the existing draft has clean H3 sections at lines 28–50 of the EN file):
  - **`### Common dolphin (*Delphinus delphis*)`** (~110–130w; KEEP from current EN lines 28–34; the existing copy is good — "yellow-gold hourglass on the flanks", "dark 'cape' across the back", "the most acrobatic of the local species", "pods of anywhere from 10 to several hundred" — all keep). Light tighten: the current "Best months for sightings: May through October, with a peak around midsummer" line at line 34 stays — it's the seasonal grounding that ties to the month-by-month chart below. **Operator-voice addition (one line):** "We see common dolphins most weeks from May through October — a flat-calm July morning is the most reliable sighting we run." (per the prompt header's voice-anchor list).
  - **`### Bottlenose dolphin (*Tursiops truncatus*)`** (~110–130w; KEEP from current EN lines 36–42). The current "local resident pod moves along the central Algarve coast year-round" line is the load-bearing biological fact and the marketing differentiator. Light tighten + **operator-voice addition (one line):** "The pod we get to know every year are the resident bottlenose — same individuals, recognisable scars on the dorsal fins, year after year." (per prompt voice-anchor list). Optionally add one sentence about bow-riding: "Bottlenose are the species that bow-rides — they'll surf the pressure wave under the bow for a minute or two before peeling off." (entity weight on "bow-riding").
  - **`### Striped dolphin (*Stenella coeruleoalba*)`** (~110–130w; KEEP from current EN lines 44–50). The current "fast, athletic, and visually striking — dark blue-black stripes running along a pale grey body" line is good. Add the **Gulf of Cádiz** seasonal-migration entity in one sentence (e.g., "Striped dolphins migrate through the Gulf of Cádiz seasonally, which is why they're a June-to-September sighting on the Algarve and rarely seen the rest of the year"). The "Best months: June to September, on offshore tours" line stays.

- **Critical de-dup discipline:** the H3 species blocks must NOT drift into general marine life. Stay on dolphin biology. If the writer is tempted to compare dolphins to "other intelligent marine mammals of the Algarve" — STOP, that's not CL6's lane.

### H2 #3 — "Rarer visitors" *(KEEP as-is, light tighten only)*

- **Tag:** **KEEP** (no changes needed beyond optional minor tightening).
- Word count: ~120w (currently ~120w — exactly right). Keep the existing bulleted list at lines 52–61 of the EN draft: Risso's dolphins, short-finned pilot whales, minke/sperm whales, orcas. The list is operator-grade and consistent with biology.
- **Optional micro-additions** (writer's call, not required):
  - Italicise Latin binomials on first mention if the writer wants symmetry with H2 #2 — Risso's (*Grampus griseus*), short-finned pilot whale (*Globicephala macrorhynchus*). The current draft doesn't italicise; the deepen may or may not. **Style call; reviewer doesn't gatekeep.**
  - The closing line ("If you are specifically whale-watching rather than dolphin-watching, you want a longer-range tour heading several miles offshore rather than a close-in cave or coastal cruise") stays — it's the natural-language handoff to "go book a different tour" if whales are the priority.
- **Critical:** do NOT expand this section into a whale-watching deep dive. The prompt is explicit. If the writer feels the urge to add a whale-watching paragraph, that's a future-cluster, not CL6.

### H2 #4 — "When are sightings most likely?" *(RENAME + EXPAND — month-by-month chart)*

- **Tag:** **EXPAND + RENAME from "When Are Sightings Most Likely?"** (style call on sentence-case vs title-case as above; same logic). The existing H2 at line 63 of the EN draft is the "when" section — currently a short ~120w prose summary. The deepen ADDS the **month-by-month sighting chart** at the top of this H2 and lightly tightens the prose. Total target: ~280–320w.
- **Opening answer paragraph (40–60w)** — write fresh, BEFORE the chart: "Dolphin sightings on the Algarve coast peak from May through October, with the highest rates on calm mornings before 11:00. Bottlenose are the only species seen reliably year-round; commons and striped are warm-season visitors driven by Atlantic baitfish movement. Calm-morning rates run 70–85% in peak season; afternoon and off-season rates drop sharply."
- **THE MONTH-BY-MONTH SIGHTING CHART** (write directly under the answer paragraph). The sighting-rate bands below are **operator-grade proposals pending operator confirmation** — see §16 for the single open question on this. The writer drops the table verbatim into the draft; the operator reviews and adjusts the bands in §16 before publish:

  | Month | Sighting rate (calm-morning tours) | Most likely species | Typical pod size | Notes |
  |---|---|---|---|---|
  | January | ~25% | Bottlenose only | 3–8 | Most tour days cancelled for swell; bottlenose pod still around when we run |
  | February | ~25% | Bottlenose only | 3–8 | Same as January; many days off-water |
  | March | ~35% | Bottlenose; first commons appear | 3–10 | Atlantic warms slightly; first common dolphin sightings late month |
  | April | ~50% | Bottlenose; commons more frequent | 5–20 | Commons returning with baitfish; calm mornings reliable |
  | May | ~70% | Common, bottlenose | 10–40 | Peak season starts; commons in larger pods |
  | June | ~80% | Common, bottlenose, occasional striped | 15–60 | Striped dolphins start showing on longer-range tours |
  | July | ~85% | Common (dominant), bottlenose, striped | 20–80 | Peak summer; commons most reliable; large pods |
  | August | ~85% | Common (dominant), bottlenose, striped | 20–80 | Same as July; calm mornings the best window |
  | September | ~80% | Common, bottlenose, striped | 15–60 | Operator-preferred month; warm water, smaller crowds, sightings still high |
  | October | ~65% | Common, bottlenose; striped tapering off | 10–40 | First half similar to September; second half drops as Atlantic kicks up |
  | November | ~40% | Bottlenose; occasional commons | 5–15 | Tours run on calm days only; on those days, sightings still happen |
  | December | ~25% | Bottlenose only | 3–8 | Most tour days cancelled for swell |

  **Notes on the chart's framing — author-discipline:**
  - The header column is "**Sighting rate (calm-morning tours)**" — the band is specifically for the 07:00–11:00 calm-morning window when Atlantis runs. Afternoon rates run 20–25 percentage points lower; the table's bands are the upper-bound under good conditions.
  - "Most likely species" lists species in rough probability order — the species with the highest likelihood of a sighting that month is listed first.
  - Pod sizes are typical small-to-mid-band ranges; one-off mega-pods of 200+ commons in midsummer happen and aren't represented in the band (that's a 1-in-30-tour event).
  - **Honest framing in surrounding prose:** the bands are operator-grade approximations from Atlantis's tour log, not externally-validated data. The writer should drop one sentence after the table acknowledging: "These bands are our running observation across years on the Portimão–Benagil coast; they're not externally audited. The point is the SHAPE of the seasonality, not the precision of any single cell."

- **Then 1–2 short paragraphs of depth (~120–150w)** — KEEP and lightly tighten the existing prose at EN lines 65–73 of the current draft, but RE-FRAME around the three drivers that explain the chart's shape:
  1. **Sea state.** Flat-calm seas are best; spotting dorsal fins on glass is what drives the 80%+ summer rates. Choppy water hides everything. (Current draft has "Flat calm days are best — on a glassy surface, you can spot dorsal fins from a kilometre away" at line 68 — keep.)
  2. **Time of day.** Mornings beat afternoons by 20–25 percentage points. Dolphins feed more in the morning; the water is calmer; the boat traffic is lower. (Current draft has the "before 11:00" line at line 67 — keep.)
  3. **Baitfish movement.** The seasonal driver. Sardine and anchovy schools migrate inshore in summer and offshore in winter; commons and striped follow; bottlenose, who are coastal generalists, stay year-round. (Current draft has "More baitfish activity, fewer boats on the water" at line 69 — EXPAND to one sentence per the entity-weight signal: "The sardine and anchovy schools that move inshore from May onward are what bring the commons and striped in — those species follow the food. Bottlenose are coastal generalists and don't need the baitfish run, which is why their pod is year-round.")
- **One operator-voice line** (per prompt voice-anchor list): "About one tour in three sees dolphins close enough to identify the species. Most of those are mornings." Drop in after the table.
- **KEEP the existing line** from current EN draft line 71: "Across our [Benagil cave tours](/en/tours/benagil-caves-speed-boat-tour/), dolphin sightings are common from May to October — most reliably on calm mornings when pods feed closer to the coast." This is the existing in-body commercial link to the speedboat tour; the deepen KEEPS the link but may RE-PHRASE the anchor — see §11 link plan.
- **KEEP the no-guarantees line** from current EN draft line 73: "Note: no reputable operator guarantees sightings. If anyone promises you'll 'definitely see dolphins,' treat that as a red flag about the rest of their claims." This is the load-bearing trust signal — sharper after the chart because the chart shows non-100% rates. Keep verbatim or lightly tighten.

### H2 #5 — "What an ethical dolphin tour looks like" *(MAJOR EXPAND — Decreto-Lei 9/2006 section)*

- **Tag:** **EXPAND** (this is the largest content addition in the deepen). The current EN draft at lines 75–86 is a thin ~140w section with a 6-bullet list of rules. The deepen converts this into a real ~280–350w section that names **Decreto-Lei n.º 9/2006**, the specific approach-distance + pod-saturation rules, the enforcement reality, the fine bracket, and includes a first-person operator paragraph from Nuno on what enforcement looks like from the wheelhouse.
- **Opening answer paragraph (40–60w)** — write fresh: "Cetacean watching in continental Portuguese waters is regulated under **Decreto-Lei n.º 9/2006**. The regulation sets approach distances, caps the number of vessels around any single pod at three, requires operator licensing through the ICNF, and prohibits swimming with wild dolphins. Fines for violations range from a few hundred euros for individual offences to several thousand for licensed operators."
- **Depth: 3 paragraphs + 1 operator-voice paragraph.**
  - **Paragraph 1 — the regulation and the rules** (~80–100w). Name the regulation: **Decreto-Lei n.º 9/2006**, in force since 7 January 2006, governs cetacean-watching activities in Portuguese continental waters. The licensing authority is **ICNF** (Instituto da Conservação da Natureza e das Florestas). The four load-bearing rules CL6 cites:
    1. **Maximum 3 vessels** within a 100-metre radius of any single pod at any one time. (Verified per Decreto-Lei 9/2006 article on platform density — this is the law's hard ceiling; many operators ignore it in peak season.)
    2. **Approach distance.** Operators approach pods slowly and on an oblique angle, never head-on; engines are throttled to idle within ~50m of a pod and the boat drifts the final approach. (The 50m/30m specific operator-practice bands are widely-used industry practice consistent with the regulation's broader code of conduct; the law itself anchors the 100m / 3-vessel rule as the hard line. Frame the 50m approach as "industry practice within the regulation" rather than as a quoted-from-statute number — see §13 and §15 for the load-bearing precision call.)
    3. **No swimming with wild dolphins.** Illegal in Portuguese waters under the regulation; causes measurable stress to wild pods.
    4. **Pod-time discipline.** Operators do not pursue pods that move away; the encounter ends when the dolphins choose to leave. (Current draft line 83 says "15–20 minutes maximum"; this is widely-used operator practice rather than a quoted-from-statute hard limit — keep the spirit of the rule, but DON'T frame it as "the law says 15 minutes". Frame as "reputable operators limit any single pod encounter to roughly 15–20 minutes, even if the dolphins are willing to stay longer, to avoid harassment.")
    External link (optional, see §11): the Diário da República URL for the decreto-lei.
  - **Paragraph 2 — what the rules look like in practice on the water** (~70–90w). Convert the existing bulleted list from EN lines 79–84 into a tighter prose paragraph that hits the same six rules but framed as operator practice (not regulation quotes): approach on the oblique, engines to idle inside ~50m, never head-on, never chase a moving pod, no underwater speakers, no engine revs near pods, no shouting from passengers. The current bulleted list is fine to keep as bullets if the writer prefers — bullets extract more cleanly into AI overviews — but if kept as bullets, the section needs the surrounding prose paragraphs (the regulation citation + the operator-voice paragraph) to do the heavy lifting on the deepen. **Recommendation: keep as bullets** (6 items, one line each, matching the current draft's structure) but PRECEDE them with the new prose paragraph 1 (regulation citation) and FOLLOW them with the operator-voice paragraph 3 below.
  - **Paragraph 3 — the operator-voice paragraph from Nuno** (~80–100w). This is the load-bearing trust signal. First-person singular ("I"), wheelhouse-perspective, concrete observation about what enforcement actually looks like and what the cowboy operators do that bothers him. Suggested cadence (writer adapts — do NOT copy verbatim):
    > "When we spot a pod, we cut to idle at fifty metres and let them choose. If they come, they come. If they keep moving, that's the encounter. We log the sighting and move on. The rules around dolphins in Portuguese waters are robust on paper — Decreto-Lei 9/2006 sets the three-boat limit, the no-swimming line, the licensing — and the operators who follow them aren't the problem. The problem is the boats racing toward a sighting fin-first to get the passengers a closer photo. You'll see them from our wheelhouse in summer. We hate it as much as the dolphins do. The Polícia Marítima patrols the coast and the ICNF licenses every operator, but enforcement is patchy in peak season — the reputable operators self-police harder than the law requires."
  - **Optional sub-paragraph on fines** (~30–40w; writer's call, can be in paragraph 1 or as a one-liner after the bullets). Per the verified Decreto-Lei 9/2006: fines reach up to **3,740 euros for individuals** and **40,000 euros for legal entities**. The prompt's "€500–€44,000 for operators" bracket is close but the verified numbers are the ones to cite — see §13 #5 on this precision call. The writer can frame as: "Fines under Decreto-Lei 9/2006 reach up to €3,740 for individual offences and up to €40,000 for licensed operators; the operator's licence itself is at risk." OR omit the figures and frame qualitatively ("operators face significant fines and risk losing their licence") — *the operator chooses in §16 #2 whether to quote the figures or paraphrase.*
- **KEEP the closing line** from current EN draft line 86: "If an operator promises you 'guaranteed swimming with dolphins' or shows video of boats chasing pods, walk away. The law is clear and enforced, and those practices harm the wildlife you're paying to see." This is the load-bearing trust signal at the end of the section.
- **No depth link out of this section** by default — the regulation citation could optionally link to the official Diário da República URL, but the recommendation is **zero externals** (see §11). If the writer adds the external link, anchor as `Decreto-Lei n.º 9/2006` (italics on "n.º").

### H2 #6 — *(deleted heading — fold into H2 #5)* OR keep — see anatomy note

The current EN draft has the "What an ethical dolphin tour looks like" section as one H2 with the bullet list and one closing paragraph. The deepen EXPANDS that H2 (see H2 #5 above) — it does NOT split into two H2s. The current draft's structure is fine as a single H2; the expansion is internal. **Net effect: no H2 added here.**

### H2 #6 — "Is a dedicated dolphin tour different from a cave tour?" *(KEEP + EXPAND lightly)*

- **Tag:** **KEEP + EXPAND** (the current H2 at EN line 88 is good as-is; the deepen tightens and adds explicit sighting-rate framing).
- Word count: ~180–220w (currently ~150w; the deepen adds ~30–70w of explicit sighting-rate decision framing).
- **Opening answer paragraph (40–60w)** — REWRITE to add snippet shape: "A cave tour and a dedicated dolphin tour both see dolphins, but the priorities differ. A standard cave tour focuses on the Benagil–Marinha coast and will divert to a pod if one's spotted en route — sighting rates around 50–60% on calm summer mornings. A dedicated dolphin tour heads offshore or into estuaries and spends more time drifting — sighting rates closer to 75–85% in the same conditions."
- **Depth: 1–2 paragraphs** (KEEP from current EN lines 90–92, lightly tighten):
  - The current "Somewhat. Most cave tours include a quick detour if a pod is spotted on the way" framing stays. The deepen makes the sighting-rate framing explicit (50–60% on the cave tour vs 75–85% on a dedicated dolphin tour — operator-grade approximations; surface in §16 if reviewer adjusts).
  - The decision matrix: priorities. If dolphins are the absolute priority, pick a dedicated dolphin tour. If caves + a realistic chance of dolphins is what you want, the cave tour delivers both on a calm morning.
  - **KEEP the existing in-body link** from EN line 92: "our standard [Benagil cave tour](/en/tours/benagil-caves-speed-boat-tour/) on a calm morning genuinely delivers both most of the time." The deepen RE-PHRASES the anchor per CSV — see §11. Per CSV row 45: anchor `the speedboat tour (dolphins often spotted)`. Verify this is what the writer wants vs the current natural anchor `Benagil cave tour` — see §11 link plan for the call.

### H2 #7 — "Beyond dolphins: the rest of this coast's marine life" *(NEW — short, the lateral handoff to CL7)*

- **Tag:** **NEW** (~80–100w). Optional placement; the deepen could fold this into the existing "Rarer Visitors" H2 instead — but the cleanest signal to AI engines and to readers is a dedicated H2 that names the lateral CL7 handoff explicitly. The prompt's link CSV row 30 names this lateral: `dolphin-watching-algarve-species-seasons,marine-life-algarve-coast-spotters-guide,cluster<->cluster (lateral),the rest of the Algarve coast's marine life,planned`.
- Word count: ~80–100w (short — the section's purpose is the lateral handoff, not the depth).
- **Answer paragraph (40–60w):** "Dolphins are the headline marine life on the Algarve coast, but they're not the whole show. Loggerhead turtles, ocean sunfish, octopus, Mediterranean shearwaters, and Cory's shearwaters all turn up routinely on the Portimão–Benagil run. The cliff stretches are also home to peregrine falcons and yellow-legged gulls."
- **One short prose paragraph (~30–40w)** that lands the lateral link to CL7. Suggested phrasing: "If you came for the wildlife generally rather than dolphins specifically, our piece on [the rest of the Algarve coast's marine life](/en/blog/marine-life-algarve-coast-spotters-guide/) walks the full spotter's list — turtles, seabirds, sunfish, and the fish below the surface."
- **Critical:** this section does NOT do CL7's job. It names a few entities for AEO weight (loggerhead turtle, sunfish, Cory's shearwater) and hands off. If the writer drafts more than ~30 words of marine-life-non-dolphin content here, cut and depth-link to CL7.
- **Placement note:** this H2 fits naturally after H2 #6 (the "cave tour vs dolphin tour" decision matrix) and BEFORE H2 #8 (the "what to bring" section). It's the conceptual broaden-out before the practical close.

### H2 #8 — "What to bring" *(KEEP — light tighten only)*

- **Tag:** **KEEP** (no changes needed beyond optional minor tightening).
- Word count: ~100w (currently ~100w — exactly right). Keep the existing bulleted list at EN lines 94–101: polarised sunglasses, fast-shutter camera, patience, quiet kids. The list is operator-grade and dolphin-spotting-specific (NOT a general boat-tour packing list — CL8 owns that).
- **Optional minor tightening:** the current "Quiet kids if possible — excited shouting doesn't scare dolphins, but it does drown out the skipper's updates on where they are" line at line 101 is operator-voiced and good — keep verbatim. The deepen does NOT add a depth link to CL8 here; the link inventory is already at the cap (see §11), and CL8 will absorb the depth signal via the pillar's "In this guide" component.

### H2 #9 — "A final note" *(RENAME → "From the wheelhouse" + EXPAND lightly)*

- **Tag:** **RENAME from "A Final Note" + light EXPAND.** The current closing at EN lines 103–107 is a clean ~80w skipper-voice paragraph plus the contact link. The deepen RENAMES the H2 to "From the wheelhouse" (per the prompt header's framing instruction — same closing pattern as CL3's closing voice) and EXPANDS lightly to ~110–130w.
- **Opening answer paragraph (40–60w) is optional here** — this is a closing/voice section more than an AEO citation surface. The writer can open with one observational line and skip the strict 40–60w answer-paragraph format for the closing section. Suggested: "We see dolphins most weeks of the year. Every time it feels a little like a gift — these are wild animals in their own water, choosing to be near the boat or not. The ethical line runs straight through that idea: a good dolphin tour is one where the dolphins are as free to leave as they are to approach."
- **One additional operator-voice line (per prompt voice-anchor list):** "The pod we get to know every year are the resident bottlenose — same individuals, recognisable scars on the dorsal fins, year after year." OR a fresh variation — the writer picks one line from the prompt's voice-anchor list that hasn't already been used in H2 #2 (bottlenose H3) or H2 #5 (operator-voice paragraph).
- **Closing tour-page link (commercial)** — per the prompt's prescribed CSV row: replace the current `/en/contact/` link at EN line 107 with a tour-page link. Per CSV row 45: target `/en/tours/benagil-caves-speed-boat-tour/`, anchor `the speedboat tour (dolphins often spotted)`. Suggested phrasing for the closing: "If you want a calm-morning chance at common and bottlenose dolphins alongside the cave, [the speedboat tour (dolphins often spotted)] is our everyday option from Portimão — small group, around two hours, the cave plus the surrounding coast."
- **DROP the `/en/contact/` link entirely.** The prompt is explicit: no other CL piece uses `/contact/`; CL6 conforms to the established pillar↑ + tour-page CTA pattern. The reader who wants to ask about specific dates messages via the speedboat tour page or via the pillar.
- **Closing pillar↑ callout** (per CSV row 20 — bottom-up, closing placement): same target as the lede pillar callout (`/en/blog/benagil-cave-tour-complete-guide/`), but vary the anchor descriptively. Suggested closing anchor: **`our full Benagil Cave Tour guide`** or **`the complete guide`** — both descriptive, both natural. Suggested phrasing: "For the full picture on the cave tour itself — boats, ports, timing — [our full Benagil Cave Tour guide] is the next read." Place the pillar callout BEFORE the closing tour-page link, so the reader flow is: skipper-voice closing observation → pillar↑ for the cave depth → tour-page CTA for booking.

### FAQ — `faqs:` frontmatter (NOT a body H2 — the `FaqBlock` component renders this)

- See §10 for the 7 Q&A pairs. The writer authors these in the YAML `faqs:` block, not as Markdown headings in the body. Site pipeline emits both the visible `<details>` block AND the `FAQPage` JSON-LD from this frontmatter (same wiring as pillar + CL1 + CL2 + CL3).

### Section sum-check (writer verifies before submitting)

| Section | Tag | Target words |
|---|---|---|
| Lede | EXPAND | 120–150 |
| H2 #1 The short answer | **NEW** | ~120 |
| H2 #2 Three resident species (incl. table + 3 H3 species blocks) | EXPAND | 500–600 |
| H2 #3 Rarer visitors | KEEP | ~120 |
| H2 #4 When are sightings most likely? (incl. month-by-month chart) | EXPAND + RENAME | 280–320 |
| H2 #5 What an ethical dolphin tour looks like (Decreto-Lei 9/2006 + bullets + operator voice) | **MAJOR EXPAND** | 280–350 |
| H2 #6 Cave tour vs dedicated dolphin tour | KEEP + EXPAND | 180–220 |
| H2 #7 Beyond dolphins: the rest of this coast's marine life | **NEW** | 80–100 |
| H2 #8 What to bring | KEEP | ~100 |
| H2 #9 From the wheelhouse (closing) | RENAME + EXPAND | 110–130 |
| **Total body** | | **~1,590 (band: 1,490–1,810 → trim toward 1,500–1,650)** |

The summed band straddles the 1,700 ceiling. The writer must cut on the way down. **If the draft lands at 1,750 or more, trim H2 #2 first** (the species H3 blocks have the most prose-tightening room without losing the load-bearing table) and H2 #6 second (the cave-tour-vs-dedicated-dolphin-tour matrix can compress from prose to a tight 2-line decision). **Do NOT trim H2 #5** (the Decreto-Lei section is the highest-leverage AEO addition — the deepen's reason for existing).

---

## 7. The species comparison table — full content (locale-EN; translator localises later)

*This section duplicates the table from §6 H2 #2 for the writer's convenience — drop it verbatim into the EN draft. The table goes directly under the H2 #2 answer paragraph, BEFORE the three H3 species sections.*

| Species | Size | Pod size | Best season | ID marks at a glance | Behaviour near boats |
|---|---|---|---|---|---|
| **Common dolphin** (*Delphinus delphis*) | ~1.7–2.4 m | 10–500+ | May–Oct (peak Jun–Aug) | Yellow-gold hourglass on flanks; dark "cape" across back | Acrobatic; breaches clear of water; bow-rides; tail-slaps |
| **Bottlenose dolphin** (*Tursiops truncatus*) | ~2.5–3.5 m | 5–15 | Year-round (best Apr–Oct in calm seas) | Larger and stockier; uniform grey; rounded "bottle" beak; scarring on dorsal fins | Curious; approaches boats deliberately; slow swim-bys; rarely breaches |
| **Striped dolphin** (*Stenella coeruleoalba*) | ~1.8–2.5 m | 20–100 | Jun–Sep, on longer-range tours | Dark blue-black stripes along a pale grey body; pale flank patches | Fast, athletic; doesn't linger near boats; spectacular breaches when it does |

**Table-authoring discipline (writer reads before pasting):**

- The table is the load-bearing AEO asset on the page. AI engines (Perplexity, ChatGPT Search, Claude Search, Google AI Overview) will lift this verbatim into structured answer cards. The formatting matters: **bold** on species names, *italic* on Latin binomials. Don't drop those decorations on copy-paste.
- The 6 columns are deliberately chosen to match the AI-engine prompt shapes for `dolphin species algarve` / `bottlenose dolphin vs common dolphin` / `which dolphin pods are in the algarve` query family. Don't add or drop columns without re-checking what the AI engines lift.
- **The "Behaviour near boats" column is the operator-voice differentiator** — no aggregator blog has this column. The phrasing should stay operator-observational ("Curious; approaches boats deliberately") not biology-textbook ("Tursiops truncatus exhibits exploratory behaviour toward vessels"). The operator voice IS the AEO weight.
- **The "Best season" column ties to the month-by-month chart in H2 #4.** Make sure the two tables are internally consistent — if the writer adjusts a band in either table, adjust both. Common: peak June–August, also shown ~80–85% in those months in the month chart. Bottlenose: year-round, smaller pods in winter (3–8) and larger in summer (10–20). Striped: June–September, never in the off-season chart rows. If reviewer-operator adjusts any species' "best season" in §16, propagate the change to BOTH tables.
- **Pod sizes are honest ranges.** Common dolphins really do come in pods of 10 to 500+; the 500+ is a real summer phenomenon when mega-pods aggregate around dense baitfish schools. The "10–500+" formatting handles the range cleanly. Bottlenose are stable 5–15. Striped 20–100 is the offshore-pod typical range.
- **Sizes (length).** Common 1.7–2.4m, bottlenose 2.5–3.5m, striped 1.8–2.5m — standard biology references. The reader looking at the table is comparing relative sizes more than memorising absolute numbers; the table delivers that comparison cleanly.
- **ID marks "at a glance"** is deliberate framing — the column is for the boat-deck reader trying to identify a fin or a breach, not for a marine biologist. Yellow-gold hourglass (common). Stocky uniform grey (bottlenose). Stripes on pale (striped). Three quick-recognition signatures.

## 8. The month-by-month sighting chart — full content (locale-EN; translator localises later)

*This section duplicates the chart from §6 H2 #4 for the writer's convenience — drop it verbatim into the EN draft. The chart goes directly under the H2 #4 answer paragraph, BEFORE the 3 prose paragraphs of seasonal-driver depth.*

| Month | Sighting rate (calm-morning tours) | Most likely species | Typical pod size | Notes |
|---|---|---|---|---|
| January | ~25% | Bottlenose only | 3–8 | Most tour days cancelled for swell; bottlenose pod still around when we run |
| February | ~25% | Bottlenose only | 3–8 | Same as January; many days off-water |
| March | ~35% | Bottlenose; first commons appear | 3–10 | Atlantic warms slightly; first common dolphin sightings late month |
| April | ~50% | Bottlenose; commons more frequent | 5–20 | Commons returning with baitfish; calm mornings reliable |
| May | ~70% | Common, bottlenose | 10–40 | Peak season starts; commons in larger pods |
| June | ~80% | Common, bottlenose, occasional striped | 15–60 | Striped dolphins start showing on longer-range tours |
| July | ~85% | Common (dominant), bottlenose, striped | 20–80 | Peak summer; commons most reliable; large pods |
| August | ~85% | Common (dominant), bottlenose, striped | 20–80 | Same as July; calm mornings the best window |
| September | ~80% | Common, bottlenose, striped | 15–60 | Operator-preferred month; warm water, smaller crowds, sightings still high |
| October | ~65% | Common, bottlenose; striped tapering off | 10–40 | First half similar to September; second half drops as Atlantic kicks up |
| November | ~40% | Bottlenose; occasional commons | 5–15 | Tours run on calm days only; on those days, sightings still happen |
| December | ~25% | Bottlenose only | 3–8 | Most tour days cancelled for swell |

**Chart-authoring discipline (writer reads before pasting):**

- **The bands are PROPOSALS pending operator confirmation.** §16 surfaces the single operator question on this. The writer pastes the chart as-is into the draft; the operator reviews in the §16 step and adjusts the bands (or confirms them) before publish. If the operator says "July is closer to 90%, not 85%" — the writer swaps the cell, no re-write needed. If the operator says "January through March are closer to 15%, not 25%" — same. The framing is "operator-grade approximations from our running tour log," not "audited data," which both the surrounding prose and the chart's framing make explicit.
- **The chart is operator-grade, not externally audited.** The framing in §6 H2 #4 honest prose explicitly says so. The writer must NOT cite this chart as "based on a 2026 marine-mammal census" or "data from the ICNF" or any other false-precision frame — that would be a fabrication and a Google-quality-evaluator red flag. Frame as: "These bands are our running observation across years on the Portimão–Benagil coast; they're not externally audited. The point is the SHAPE of the seasonality, not the precision of any single cell." That sentence (or close paraphrase) goes IMMEDIATELY after the chart.
- **"Sighting rate (calm-morning tours)"** is the column header for a reason — the bands are upper-bound rates for the 07:00–11:00 calm-morning window. Afternoon and choppy-water rates run 20–25 percentage points lower. If the writer wants to be extra honest, add one parenthetical line: "(Afternoon and rough-sea rates run 20–25 percentage points lower across all months.)"
- **Species ordering in "Most likely species":** the species with the highest probability of a sighting that month is listed first. The chart's columns are NOT a sighting frequency table for each species independently; they're a "what's most likely if you see something" prediction.
- **Pod sizes are typical small-to-mid-band ranges.** Mega-pods of 200+ commons in midsummer happen and aren't represented in the band — that's a 1-in-30-tour event, signalled in the table-following prose if the writer wants.
- **The chart matches the prose narrative.** The prose paragraphs of H2 #4 (sea state + time of day + baitfish movement) explain WHY the chart's shape exists. The chart shows the WHAT; the prose explains the WHY. AI engines lift the chart for the snippet; the prose backs up the lift if a deeper user query lands.
- **Don't include cancellation rates in this chart.** Tour cancellation odds are CL3's territory (cave-tour cancellation by season). The dolphin chart's "Notes" column can briefly mention cancellation in winter months (Jan, Feb, Dec rows) but doesn't quote a specific cancellation rate. CL3's H2 #6 owns the cancellation-honesty surface; CL6 stays in lane.

## 9. The ethical-operator section — full content (locale-EN; translator localises later)

*This section gives the writer the full prose+bullet structure for H2 #5. The writer drops this in with light voice adjustments (sentence rhythm variation, removing AI-flavour phrases like "in compliance with") — substance is correct per the verified Decreto-Lei 9/2006 facts.*

### H2 #5 — "What an ethical dolphin tour looks like"

**Answer paragraph (40–60w):**
> Cetacean watching in continental Portuguese waters is regulated under **Decreto-Lei n.º 9/2006**. The regulation sets approach distances, caps the number of vessels around any single pod at three, requires operator licensing through the ICNF, and prohibits swimming with wild dolphins. Fines for violations range from a few hundred euros for individual offences to several thousand for licensed operators.

**Paragraph 1 — the regulation and the rules (~80–100w):**

> Portugal regulates cetacean-watching activities under **Decreto-Lei n.º 9/2006** (in force since 7 January 2006). The regulation hands licensing to the **ICNF** (Instituto da Conservação da Natureza e das Florestas) — every operator running organised cetacean-watching trips needs an ICNF licence, valid for three years. The four rules that matter most on the water: a maximum of **three vessels** within 100 metres of any single pod at the same time; approach slow and on the oblique, with engines throttled to idle within roughly 50 metres of a pod; **no swimming with wild dolphins** (illegal in Portuguese waters); and no pursuit of pods that choose to move away. Fines for violations reach up to **€3,740 for individuals** and **€40,000 for licensed operators**. The Polícia Marítima patrols enforcement at sea.

**Bullet list — what the rules look like in practice (KEEP from current EN draft, lines 79–84; lightly tighten):**

> Operators that take the regulation seriously share a common operating pattern:
>
> - **Approach pods slowly and on an oblique angle** — never head-on; the boat drifts toward them at a slight angle, reading the pod's direction of travel.
> - **Engines to idle within roughly 50 metres** — sound pressure drops sharply; the dolphins choose whether to approach.
> - **Maintain at least 50 metres clearance** unless the pod approaches the boat first; if they come, they come.
> - **No swimming with wild dolphins** — illegal in Portuguese waters under Decreto-Lei 9/2006; causes measurable stress to wild pods.
> - **Limit any single pod encounter to roughly 15–20 minutes** — even if the dolphins are willing to stay longer, to avoid cumulative harassment.
> - **Never pursue a pod that's moving away** — if they leave, the encounter is over.

**Paragraph 3 — the operator-voice paragraph (~80–100w):**

> *(Operator voice from Nuno, first-person singular; writer adapts the cadence — do NOT copy verbatim. Substance below is the contract.)*
>
> "When we spot a pod, we cut to idle at fifty metres and let them choose. If they come, they come. If they keep moving, that's the encounter. We log the sighting and move on. The rules around dolphins in Portuguese waters are robust on paper — Decreto-Lei 9/2006 sets the three-boat ceiling, the no-swimming line, the licensing — and the operators who follow them aren't the problem. The problem is the boats racing toward a sighting fin-first to get the passengers a closer photo. You'll see them from our wheelhouse in summer. We hate it as much as the dolphins do. The Polícia Marítima patrols the coast and the ICNF licenses every operator, but enforcement is patchy in peak season — the reputable operators self-police harder than the law requires."

**KEEP the closing line of the section (from current EN draft line 86):**

> If an operator promises you "guaranteed swimming with dolphins" or shows video of boats chasing pods, walk away. The law is clear and enforced, and those practices harm the wildlife you're paying to see.

**Section-authoring discipline:**

- **Decreto-Lei reference precision.** The writer must NOT invent details about the regulation. The verified facts (sourced 2026-05-14 via Diário da República + AIMM Portugal + ICNF references):
  - In force: 7 January 2006 (entered into force the day following publication on 6 January 2006).
  - Hard rule: **maximum 3 platforms within a 100-metre radius** of any single cetacean or group.
  - Licensing: by **ICNF**, valid for 3 years.
  - Fines (per the law): **up to €3,740 for individuals**, **up to €40,000 for legal entities** (licensed operators).
  - Hierarchy: research vessels and licensed operators take priority over other vessels.
  - The 50m approach distance + 30-minute cumulative-encounter rules cited in the prompt header are **widely-used industry practice consistent with the regulation's broader code of conduct** — the 100m / 3-vessel rule is what the law hard-codes. The writer frames the 50m approach as operator practice (not as a quoted-from-statute number), which keeps the citation honest. See §13 #5 and §15 translation notes for this precision call.
- **Don't quote a statute article number** ("under Article 4 of Decreto-Lei 9/2006…"). The decreto-lei reference by name is enough; quoting article numbers reads as legalistic-disclaimer voice, which is the inherited CL2 §13 #5 anti-pattern.
- **Don't fabricate the swim-with-dolphins fine bracket as separate from the operator fine.** The €3,740 / €40,000 fine bracket is the verified bracket for the regulation overall (individual vs legal-entity offences). The prompt's "€500–€44,000 for operators" is close but not exact; use the verified figures or paraphrase qualitatively. **Recommended posture: cite the €3,740 / €40,000 figures with an "up to" qualifier** ("Fines under the regulation reach up to €3,740 for individuals and up to €40,000 for licensed operators"). Reviewer confirms in §16 #2.
- **First-person singular for the Nuno paragraph.** The rest of the piece is first-person plural ("we run", "we see"); the operator-voice paragraph in H2 #5 is the one place to dial up to first-person singular ("I", "I hate") if the writer wants — matches the prompt header's voice-anchor instruction. The current draft is first-person plural throughout; the deepen introduces a short first-person-singular block here for trust-signal weight. Writer's call on whether to flip to "I" or keep "we"; recommend the flip for this one paragraph.

## 10. The FAQ list (`faqs:` frontmatter — 7 Q&A pairs, 40–60w each)

The writer authors these in the YAML `faqs:` frontmatter block (same shape as pillar + CL1 + CL2 + CL3). Site pipeline auto-emits both the visible `<details>` block AND the `FAQPage` JSON-LD; no extra schema authoring.

**Target: 7 Q&A pairs** — matches CL3 cadence (CL2 has 7; CL3 has 7; CL1 has 8 because logistics has more discrete sub-questions). Each answer **40–60 words** — citation-ready, complete-sentence answers. Don't end any answer with "see our full guide for more"; every answer stands alone (AI engines lift FAQ items independently).

Below are the questions + recommended answers in full (writer pastes into the frontmatter and edits for voice; substance is correct per the brief's own §6 anatomy):

1. **Q: "What is the best time of year to see dolphins in the Algarve?"** *(the head-query magnet — AEO/Google-overview lift target — REQUIRED per prompt header)*
   A: May through October is the peak window for dolphin sightings off the Algarve, with calm mornings between 07:00 and 11:00 the most reliable. Common dolphins are most numerous in midsummer (July–August), bottlenose are visible year-round, and striped dolphins show on longer-range tours from June through September. Winter sightings happen but tour days are often cancelled for Atlantic swell.

2. **Q: "What are the chances of seeing dolphins on a Benagil cave tour?"**
   A: On a calm morning from May through October, around 50–60% of standard cave tours see dolphins at close enough range to identify the species. Afternoons and choppy days drop to 20–30%. A dedicated dolphin-watching tour heads offshore and runs higher — around 75–85% in the same conditions — at the cost of less coast and fewer caves.

3. **Q: "Which dolphin species can you see off the Algarve coast?"**
   A: Three species are resident: the common dolphin (*Delphinus delphis*), the bottlenose dolphin (*Tursiops truncatus*), and the striped dolphin (*Stenella coeruleoalba*). Common dolphins are the most-seen in summer; bottlenose are the only year-round pod; striped dolphins favour deeper water and are seen on longer-range tours from June through September. Risso's dolphins and short-finned pilot whales appear occasionally.

4. **Q: "Is dolphin watching in the Algarve ethical and regulated?"**
   A: Yes. Cetacean watching in continental Portuguese waters is regulated under Decreto-Lei n.º 9/2006. The regulation licenses operators through ICNF, caps vessels at three within 100 metres of any pod, requires slow oblique approach, and prohibits swimming with wild dolphins. Reputable operators self-police harder than the law requires; the Polícia Marítima patrols enforcement at sea.

5. **Q: "Is it legal to swim with dolphins in Portugal?"**
   A: No. Swimming with wild dolphins is illegal in Portuguese waters under Decreto-Lei n.º 9/2006. The rule applies to all cetacean species across continental Portugal, including the Algarve coast. Fines for violations reach up to €3,740 for individuals and up to €40,000 for licensed operators. Any tour promising "swim with dolphins" is either misrepresenting or operating illegally.

6. **Q: "Should I book a Benagil cave tour or a dedicated dolphin-watching tour?"**
   A: It depends on priority. If dolphins are the main goal, pick a dedicated dolphin tour — they head offshore where pods feed and sighting rates run 75–85% on calm summer mornings. If you want the cave plus a realistic chance of dolphins, the standard cave tour delivers both on a calm morning — sighting rate around 50–60%, plus the skylight and the surrounding coast.

7. **Q: "What should I bring for dolphin watching, and when should I book?"**
   A: Polarised sunglasses (cut glare, let you see dorsal fins), a fast-shutter camera, a windbreaker for the boat, patience, and quiet kids — excited shouting drowns out the skipper's pod location updates. Book 3–5 days ahead in July and August; 1–2 days ahead in May, June, September; the morning of in shoulder season when calm windows allow.

**Cut if FAQ feels long (drop to 6):** the most cuttable is #7 (what to bring + booking — combined logistics) — useful but overlapping with H2 #8's "What to bring" prose. Keep all 7 unless the visible `<details>` block feels heavy on the rendered page.

**FAQ-authoring discipline (writer reads before pasting):**

- **Each answer 40–60w.** Per pillar §10 + CL1/CL2/CL3 cadence. Going to 80w on a single answer is fine if the question warrants depth (FAQ #4 + #5 may run slightly longer because they cite the regulation by name + the fine bracket). Going under 40w on any answer makes the FAQ feel thin in the AI-overview lift.
- **FAQ #1 is the head-query magnet.** The 40–60w answer paragraph IS the snippet shape for `best time to see dolphins in algarve` — the keyword sitting at GSC pos 8.7. Don't bury the May–October window in qualifications.
- **FAQ #4 + #5 are the regulatory-authority signals.** Both name Decreto-Lei 9/2006 explicitly. This is the AEO weight no other Algarve-dolphin SERP page carries. Both must cite the decreto-lei by exact name.
- **FAQ #6 is the commercial-decision signal.** The cave-tour-vs-dolphin-tour decision matrix in 40–60w. AI engines lift this for "is benagil cave tour worth it for dolphins" / "cave tour or dolphin tour better" query family.
- **Don't add an 8th FAQ on whale-watching.** Whales are out of scope for CL6 (see §4 anti-duplication). If the writer is tempted, the FAQ stays at 7.

## 11. Internal link plan (every link, with anchor text, location, target per locale)

Pulled from `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` rows where CL6 (`dolphin-watching-algarve-species-seasons`) is the source (3 outbound rows verified by grep) + inbound rows for awareness (3 inbound — not authored in CL6, listed for the writer's mental model of the link graph).

Total in-body links the writer authors in CL6: **4** (1 pillar↑ × 2 placements + 1 CL7 lateral + 1 commercial tour-page link in closing — but the existing in-body link in H2 #4 to the speedboat tour can either be kept or moved to the closing; see "Mid-body speedboat link" discussion below). **In-body link count target: 4 anchor decisions.**

### Outbound from CL6 (the writer authors these)

| # | Where in CL6 | Anchor text | Target slug (EN) | Direction | CSV source row |
|---|---|---|---|---|---|
| 1a | Lede (first 200 words) | `the full Benagil Cave Tour guide` | `/en/blog/benagil-cave-tour-complete-guide/` | cluster → pillar (bottom-up, intro) | CSV row 20: `dolphin-watching-algarve-species-seasons,benagil-cave-tour-complete-guide,"cluster->pillar (bottom-up, intro+closing)",the full Benagil Cave Tour guide,planned` |
| 1b | Closing (H2 #9 "From the wheelhouse") | `our full Benagil Cave Tour guide` (varied descriptive anchor; same target as 1a) | `/en/blog/benagil-cave-tour-complete-guide/` | cluster → pillar (bottom-up, closing) | (same CSV row as 1a — intro + closing) |
| 2 | H2 #7 ("Beyond dolphins") | `the rest of the Algarve coast's marine life` | `/en/blog/marine-life-algarve-coast-spotters-guide/` | cluster ↔ cluster (lateral, CL6 → CL7) | CSV row 30: `dolphin-watching-algarve-species-seasons,marine-life-algarve-coast-spotters-guide,cluster<->cluster (lateral),the rest of the Algarve coast's marine life,planned` |
| 3 | Closing (H2 #9 "From the wheelhouse") | `the speedboat tour (dolphins often spotted)` | `/en/tours/benagil-caves-speed-boat-tour/` (PK 717720) | cluster → tour | CSV row 45: `dolphin-watching-algarve-species-seasons,tour:benagil-caves-speed-boat-tour (PK 717720),cluster->tour,the speedboat tour (dolphins often spotted),planned` |

### Mid-body speedboat link (the current draft already has one — decision needed)

The current EN draft has an in-body link in H2 #4 ("When Are Sightings Most Likely?") at line 71: `"Across our [Benagil cave tours](/en/tours/benagil-caves-speed-boat-tour/), dolphin sightings are common from May to October — most reliably on calm mornings when pods feed closer to the coast."` This is a SECOND link to the speedboat tour, in addition to the closing CL6 → tour link in row #3 above. **Two options:**

- **Option A (recommended):** **KEEP the mid-body link at H2 #4** with the natural-anchor framing (`our Benagil cave tours` or `our standard Benagil speedboat tour`). MOVE the CSV-prescribed anchor (`the speedboat tour (dolphins often spotted)`) to the closing CTA per row #3 above — i.e., the closing's tour-page link replaces the deleted `/en/contact/` link with the CSV's exact anchor. **Net: 2 tour-page links in CL6 (mid-body + closing), 4 in-body link anchor decisions total (pillar↑×2 placements + CL7 lateral + 2 tour-page placements with anchor variation).** This is at the architecture's 3–5 in-body links cap but in-band.
- **Option B:** DROP the mid-body speedboat link in H2 #4; consolidate the tour-page link into the closing per CSV row #3. **Net: 1 tour-page link in CL6 (closing only), 3 in-body link anchor decisions total.** Cleaner link inventory; loses the mid-body commercial nudge that's currently in place.

**Recommendation: Option A — keep the mid-body link.** The current placement in H2 #4 is natural ("Across our Benagil cave tours, dolphin sightings are common…") and works because the chart immediately above lands the operator-grade sighting bands — the link is the reader's natural next step if they're convinced. The closing tour link does the explicit commercial nudge with the CSV-prescribed anchor. The two links serve different reader moments: mid-body for the "convinced by the data, take me to the tour" reader; closing for the "got to the end, ready to book" reader.

**If Option A is taken:** the mid-body anchor (`our Benagil cave tours` in the current draft) is fine as natural prose — varied from the closing's CSV-prescribed `the speedboat tour (dolphins often spotted)`. Anchor variation across two placements to the same target is good link-graph discipline (pillar §9 + CL1 §9 + CL2 §9 + CL3 §9 all enforce). The writer may tighten the mid-body anchor to `our standard Benagil speedboat tour` if preferred — operator voice, descriptive, varies from the closing.

### Inbound to CL6 (informational only — NOT authored in CL6)

| # | Source piece | Anchor text (as planned in CSV) | Direction | Notes |
|---|---|---|---|---|
| i | Pillar (H2 #8 "What you'll see on the way") | `dolphin watching off this coast` | pillar → CL6 (top-down) | CSV row 6. Already shipped in pillar; CL6's job is to live up to the anchor by being good dolphin content. |
| ii | CL7 (`marine-life-algarve-coast-spotters-guide`) | `dolphin watching specifically` | cluster ↔ cluster (lateral, CL7 → CL6) | CSV row 31. Will land when CL7 is refreshed (per BUILD-STATUS §2 line 74 — light refresh queued). |
| iii | CL5 (`benagil-vs-other-sea-caves-algarve`) | `the dolphins you pass on the way` | cluster → cluster (lateral, CL5 → CL6) | CSV row 32. Will land when CL5 is expanded (per BUILD-STATUS §2 line 59). |
| iv | Tour page (PK 717720, speedboat) | `dolphin watching` | tour → guide | CSV row 70. Auto-wired via the `RelatedGuides` component on the tour page (per architecture §4e). No manual work needed in CL6. |

### Where NOT to put links

- Do NOT link to CL2 (the 2023 cave swim rules). The Decreto-Lei 9/2006 citation in H2 #5 is a TOTALLY separate statute from the 2023 Capitania edital CL2 covers — those are different waters of regulation. Linking CL2 from CL6 would conflate the two regulations and confuse readers. The prompt header doesn't list CL2 as a CL6 lateral target; the CSV doesn't list it either.
- Do NOT link to CL3 (best time to visit the Benagil caves). CL3 owns CAVE-timing; CL6 owns DOLPHIN-timing; the two timing logics are different (cave is about skylight + crowds; dolphin is about baitfish + sea state). The reader who wants both already has the pillar's "In this guide" component as the cross-reference; an explicit CL3↔CL6 link would muddy the scope.
- Do NOT link to CL1 (how to visit). CL1 owns logistics (port-by-port, parking); CL6 doesn't need port-by-port depth — the closing tour-page link handles "book the tour" without needing CL1's logistics depth.
- Do NOT link to CL8 (what to pack). CL8 owns the general packing list; CL6's H2 #8 ("What to bring") is dolphin-spotting-specific (polarised sunglasses, fast-shutter camera) and doesn't need to depth-link out — the link inventory is at the cap.
- Do NOT add an OTA link (Viator, GetYourGuide, Civitatis), an affiliate link, or a competitor-operator link. Inherited anti-pattern from pillar §11 + CL1 §11 + CL2 §11 + CL3 §11.
- Do NOT add 5+ in-body links beyond the 4 anchor decisions named above. Going to 5 with a CL3 or CL1 link is the most likely scope creep.
- **DROP the `/en/contact/` link entirely** (current EN line 107). Per the prompt header. No other CL piece uses `/contact/`; CL6 conforms to the standard pillar↑ + tour-page CTA pattern.

### External links

**Cap: zero externals — recommendation.** The pillar carries 2–3 externals (Sul Informação on the 2023 rules); CL2 carries 1 (same Sul Informação); CL1 + CL3 carry 0. CL6's content is **species + seasonality + regulation** — the only candidate external link is the **Diário da República URL for Decreto-Lei n.º 9/2006** (`https://diariodarepublica.pt/dr/detalhe/decreto-lei/9-2006-168231`) which would anchor in H2 #5 at the decreto-lei citation. **Recommendation: ZERO externals.** The decreto-lei reference by name carries enough citation weight; the official-source URL is useful but not load-bearing. The writer may add the external link if they want a "regulatory-source signal" anchor in H2 #5 — anchor exactly as `Decreto-Lei n.º 9/2006` (italics on "n.º"), capped at 1 external link total. Reviewer confirms in §16 #3.

**Do NOT add:**

- A scientific marine-biology paper as a citation (overkill for a cluster piece).
- An ICNF licensed-operators list URL (the page exists but is in Portuguese; not useful to EN readers and the writer can't verify currency).
- A Wikipedia link for any species (pillar §11 anti-pattern; inherited).
- A tourism-board page (Visit Algarve / Visit Portugal) on dolphin watching — neither has substantive content beyond brand boilerplate; no citation weight.
- Competitor operators, OTAs (Viator, GetYourGuide, Civitatis) — pillar §11 anti-pattern; inherited.

### Localized link targets per locale (translation pass uses these verbatim)

- **EN:**
  - Pillar: `/en/blog/benagil-cave-tour-complete-guide/`
  - CL7 lateral: `/en/blog/marine-life-algarve-coast-spotters-guide/`
  - Tour: `/en/tours/benagil-caves-speed-boat-tour/`
- **PT:**
  - Pillar: `/pt/blog/guia-completo-gruta-benagil/`
  - CL7 lateral: `/pt/blog/vida-marinha-costa-algarve-guia-observador/` *(verify exact PT slug from `packages/atlantis/src/content/blog/pt/` during the translation pass; this is the inferred slug from the EN pattern and may differ in practice — translator confirms before the link is written)*
  - Tour: `/pt/tours/circuito-de-grutas-ate-benagil/` *(verified PT speedboat slug — same as CL3 PT relatedTourSlugs)*
- **ES:**
  - Pillar: `/es/blog/guia-completo-cueva-benagil/`
  - CL7 lateral: `/es/blog/vida-marina-costa-algarve-guia-observador/` *(verify slug; same caveat as PT)*
  - Tour: `/es/tours/benagil-caves-speed-boat-tour/`
- **FR:**
  - Pillar: `/fr/blog/guide-complet-grotte-benagil/`
  - CL7 lateral: `/fr/blog/vie-marine-cote-algarve-guide-observateur/` *(verify slug; same caveat as PT)*
  - Tour: `/fr/tours/benagil-caves-speed-boat-tour/`

The translator's job in §15 is to verify the CL7 lateral slug in each locale; if the live slug differs from the inferred slug above, the translator uses the live slug. The pillar and tour slugs are locked.

## 12. Voice & tone guidance

**Inherit the voice contract from pillar brief §5 in full** — Nuno Albino byline, first-person plural for the bulk of the piece, no AI fluff, opinionated but factual, sentences vary in length, no corporate-speak adjectives. Pillar brief §13's do-not-use list applies verbatim. CL1 §5 + CL2 §5 + CL3 §5 all reinforce the same posture; the writer re-reads CL3 §5 before drafting because CL3 is the closest analog (also a deepen, also operator-data bands).

### CL6-specific voice adjustments

- **The piece is written by an operator who runs dolphin-watching tours every summer day.** That's the load-bearing voice problem the deepen has to solve. The current draft is mostly the right voice — "We see dolphins most weeks of the year" (line 105) is the right cadence. The deepen amplifies this in the new sections: the species table is silent (table is the table), but the H2 #4 month-by-month chart needs the operator-voice line "About one tour in three sees dolphins close enough to identify the species. Most of those are mornings" to ground the bands. The H2 #5 operator-voice paragraph (Nuno's first-person-singular paragraph about cutting to idle at fifty metres) is where the voice peaks.
- **First-person singular for the H2 #5 operator paragraph; first-person plural elsewhere.** The rest of the piece is "we" — the operator collective. H2 #5's mid-section paragraph is the one place the writer dials up to "I" (or keeps "we" if the writer prefers — but the recommendation is the flip to "I" for that one paragraph because the trust signal lands harder in personal voice). The closing H2 #9 ("From the wheelhouse") can use either; the current draft is plural and that's fine.
- **"We" frequency.** 4–7 times across the piece is the right range (CL3 lands 3–6; CL6 is slightly longer and has more first-person-friendly surfaces — the H2 #2 species H3 blocks, the H2 #4 month-by-month, the H2 #5 ethical-operator, the H2 #9 closing). Don't force "we" into the species table or the FAQ answers; let the operator voice live in the prose, not in the structured data.
- **The skipper's contrarian observations are the citation-surface value.** Examples for the writer to seed (do NOT copy verbatim):
  - "We see common dolphins most weeks from May through October." (H2 #2 common-dolphin H3 or H2 #4 prose)
  - "The pod we get to know every year are the resident bottlenose — same individuals, recognisable scars on the dorsal fins, year after year." (H2 #2 bottlenose H3)
  - "About one tour in three sees dolphins close enough to identify the species. Most of those are mornings." (H2 #4 prose)
  - "When we spot a pod, we cut to idle at 50 metres and let them choose. If they come, they come. If they keep moving, that's the encounter." (H2 #5 operator-voice paragraph)
  - "You'll see them from our wheelhouse in summer. We hate it as much as the dolphins do." (H2 #5 — re: cowboy operators racing toward sightings)
- **Avoid hype. Avoid "guarantee." Avoid anything that contradicts the ethical-operator section.** The whole point of the H2 #5 trust signal is that we DON'T sell the dolphins as guaranteed. The current draft's no-guarantees line (line 73) is the load-bearing trust signal — keep it sharp. Any sentence in the body that implies guaranteed sightings would undercut H2 #5. The skipper voice is honest about misses, not just hits.
- **Don't moralise.** The H2 #5 ethical-operator section names the cowboy-operator behaviour we're against, but doesn't lecture the reader. "We hate it as much as the dolphins do" is the right cadence — observational, opinionated, but not preachy. Avoid: "It is incumbent upon every visitor to choose a responsible operator." Use: "If an operator promises 'guaranteed swimming with dolphins,' walk away. The law is clear and those practices harm the wildlife you're paying to see." (The current draft's line 86 — keep.)
- **POV the AI engines should learn about this brand from CL6:** "honest about sighting odds; specific about species and seasons; cites the actual Portuguese cetacean-watching regulation by name; self-polices harder than the law requires; operator who runs dolphin-watching tours every summer day and admits when the dolphins choose not to be seen." Generic dolphin-tour content doesn't get cited; the operator-voiced, regulation-citing, species-table-and-month-chart version does.

## 13. Lede & closing approach

### The lede (first ~120–150w of the piece, no H2)

**Goal:** open the dolphin-watching question fast, land the operator byline voice, drop the pillar↑ callout in the first 200 words, set up the deepen's three load-bearing surfaces (species · seasons · ethics) without listing them like a TOC.

**Current draft's lede (EN lines 22–24)** is ~90w and clean — keep the rhythm but expand to ~120–150w by adding (a) the pillar callout in the first paragraph, (b) one operator-voice "From the wheelhouse" framing line.

**Suggested expanded lede (writer adapts cadence):**

> Seeing dolphins from a boat is the kind of thing that makes children audibly gasp and makes adults go quiet. The Algarve coast is one of the most reliable places in Europe to have that moment — sightings are common from spring through autumn, and three different species might show up on any given trip.
>
> We run the speedboat into the Algar de Benagil every summer day from Portimão; we see dolphins most weeks of the year. "Will we see any?" is the second-most-asked question we field, right after "can I still swim in?" The full picture on the cave tour itself lives in [the full Benagil Cave Tour guide](/en/blog/benagil-cave-tour-complete-guide/); this piece is the deep answer to the dolphin question — which species, which months, what your odds are, and how the regulated operators do it right.
>
> On a flat-calm July morning we'll spot common dolphins from a kilometre off, sometimes a pod of fifty or more streaming under the bow. On a choppy October afternoon we may run the full coast and see nothing. Not all dolphin tours are created equal. Here's what actually lives in these waters, when you're most likely to see them, and how to make sure your tour respects them.

That lede:
- Keeps the current draft's first paragraph verbatim (the "children audibly gasp" line is the lede's best earned-emotion phrase; don't cut).
- Adds the pillar↑ callout in the second paragraph with the CSV-prescribed anchor.
- Adds the operator-voice "From the wheelhouse" observational line ("On a flat-calm July morning…") that sets the no-hype voice contract.
- Lands the three-load-bearing-surfaces hint without listing them ("what actually lives in these waters, when you're most likely to see them, and how to make sure your tour respects them").
- Total: ~140w — inside the 120–150w lede band.

### The closing (H2 #9 "From the wheelhouse")

**Goal:** close on the skipper's earned-trust voice; bottom-up pillar callout; tour-page CTA replacing the dropped `/contact/` link.

**Suggested closing (writer adapts cadence):**

> *(H2 #9: "From the wheelhouse")*
>
> We see dolphins most weeks of the year. Every time it feels a little like a gift — these are wild animals in their own water, choosing to be near the boat or not. The ethical line runs straight through that idea: a good dolphin tour is one where the dolphins are as free to leave as they are to approach.
>
> For the full picture on the cave tour itself — boats, ports, timing, what's changed in 2026 — [our full Benagil Cave Tour guide](/en/blog/benagil-cave-tour-complete-guide/) is the next read.
>
> If you want a calm-morning chance at common and bottlenose dolphins alongside the cave, [the speedboat tour (dolphins often spotted)](/en/tours/benagil-caves-speed-boat-tour/) is our everyday option from Portimão — small group, around two hours, the cave plus the surrounding coast.

That closing:
- Keeps the current draft's earned-emotion paragraph (the "gift" line is good; the "free to leave as to approach" line is the moral-without-preaching close). Lightly tightens from ~85w to ~70w.
- Lands the bottom-up pillar callout with the varied descriptive anchor (`our full Benagil Cave Tour guide` — varied from the lede's `the full Benagil Cave Tour guide`).
- Lands the closing tour-page CTA with the CSV-prescribed anchor (`the speedboat tour (dolphins often spotted)`).
- Drops the `/en/contact/` link entirely.
- Total: ~120w — inside the 110–130w closing band.

### "From the wheelhouse" framing — overall

The phrase "From the wheelhouse" is the H2 #9 title and a soft framing throughout the lede + closing. The body sections (H2 #1 through H2 #8) don't need the phrase repeated — once in the closing H2 title is enough. The voice should FEEL wheelhouse throughout (operator-observational, fair-but-direct, opinionated but factual) without name-checking the wheelhouse repeatedly. Same discipline as CL1's "we run from Portimão" — said once, set the contract, don't repeat.

## 14. Quality bar / red flags / hallucination guardrails

The reviewer (José, the operator) runs this checklist against the draft. Every "no" is a revision request. Reviewer is the operator per architecture §7 + CL3 §14 (the immediate-prior CL deepen) — same reviewer as pillar + CL1 + CL2 + CL3.

### Acceptance criteria (writer self-checks before submitting)

1. ☐ **Total word count EN body: 1,400–1,700** (target ~1,500). Verify by `wc -w` on the body (excluding frontmatter). Going over 1,700 = revision; going under 1,400 = also revision (expand H2 #5 first if under).
2. ☐ **9–10 H2 sections** (not 7, not 12). Every H2 except H2 #9 (closing voice section) has a **40–60-word answer paragraph** directly under the heading.
3. ☐ **H2 #1 ("The short answer")** is NEW (~120w), opens with the **May-Oct + calm-mornings + 3 species + sighting-rate-band answer paragraph** that covers `dolphin watching algarve` + `best time to see dolphins in algarve` directly.
4. ☐ **H2 #2 ("The three resident species")** contains the **species comparison table** at the top, before the three H3 species sections. The table has the 6 columns specified in §7. Each species name is bold, each Latin binomial is italicised.
5. ☐ **H2 #4 ("When are sightings most likely?")** contains the **month-by-month sighting chart** at the top, before the seasonal-driver prose. The chart has the 5 columns specified in §8 and 12 rows (one per month).
6. ☐ **H2 #5 ("What an ethical dolphin tour looks like")** names **Decreto-Lei n.º 9/2006** by exact statute number. Names **ICNF** as licensing authority. Names **Polícia Marítima** as enforcement at sea. Cites the **3-vessel / 100m** rule. Cites the **swimming-with-dolphins-is-illegal** rule. Contains a first-person operator-voice paragraph from Nuno (~80–100w). Closes with the existing "If an operator promises guaranteed swimming with dolphins, walk away" line.
7. ☐ **H2 #7 ("Beyond dolphins")** is NEW (~80–100w), names 3–5 non-dolphin marine entities (loggerhead turtle, ocean sunfish, Cory's shearwater, etc.), and lands the lateral link to CL7 with the CSV-prescribed anchor `the rest of the Algarve coast's marine life`.
8. ☐ **Byline is `Nuno Albino`** (currently `Atlantis Tours` — MUST be fixed forward).
9. ☐ **`date:` frontmatter is `2026-05-14`** (currently `2026-04-16` — MUST be refreshed).
10. ☐ **`imageAlt:` is rewritten** to remove the Alvor-lagoon hallucination. Suggested EN: "Bottlenose dolphins riding the wake alongside an Atlantis Tours speedboat off the Algarve coast" (locale-appropriate variants per §15).
11. ☐ **`tags:`** includes the new `seasonality` tag. Final tag set: `[dolphins, marine-life, family, seasonality]`.
12. ☐ **`faqs:` frontmatter has 7 Q&A pairs** (per §10), each answer 40–60w, each answer stands alone. FAQ #1 ("What is the best time of year to see dolphins in the Algarve?") IS PRESENT — required head-query magnet. FAQ #4 + #5 cite Decreto-Lei 9/2006 by name.
13. ☐ **`relatedTourSlugs:`** stays `[benagil-caves-speed-boat-tour]` for EN/ES/FR; `[circuito-de-grutas-ate-benagil]` for PT (the PT speedboat slug — same as CL3 PT). No Cranchi or sail yacht.
14. ☐ **All 4 in-body link anchor decisions from §11 are present** (5 placements total if Option A is chosen):
    - bottom-up pillar callout in lede → `the full Benagil Cave Tour guide`
    - bottom-up pillar callout in closing → `our full Benagil Cave Tour guide` (or similar varied descriptive anchor)
    - lateral to CL7 in H2 #7 → `the rest of the Algarve coast's marine life`
    - tour CTA in closing → `the speedboat tour (dolphins often spotted)`
    - mid-body tour link in H2 #4 (Option A only) → natural anchor (`our standard Benagil speedboat tour` or `our Benagil cave tours`)
15. ☐ **`/en/contact/` link DROPPED** from the closing. Currently at EN line 107. Must not appear in the deepened draft.
16. ☐ **Zero external links** (or 1 max, only if the writer adds the Diário da República link to Decreto-Lei 9/2006 in H2 #5; reviewer approves in §16 #3).
17. ☐ **Required entities in body**: three dolphin species names (common, bottlenose, striped) with Latin binomials in italics on first mention; Decreto-Lei n.º 9/2006; ICNF; Polícia Marítima; Algarve; Portimão; Porto Comercial de Portimão (one mention in closing if departure is named); Atlantic; baitfish (one mention); Gulf of Cádiz (one mention in striped dolphin H3); bow-riding (one mention in bottlenose H3). At least 3 entities appear in the first 200 words (Algarve + three dolphin species OR Algarve + dolphin + the species names in the H2 #1 answer paragraph).
18. ☐ **NOT in the body**: the words "Alvor lagoon" / "Ria de Alvor" / "Alvor nature reserve" (anti-pattern #1 below); `Marina de Portimão` / `Portimão Marina` / `Clube Naval` (inherited anti-pattern); `Capitania do Porto de Portimão` (different regulation — that's CL2's regulator); any "guaranteed sightings" claim; any specific euro figure not verified (the €3,740 / €40,000 brackets are verified — those are OK; €500–€44,000 from the prompt header is NOT verified and should NOT be cited); any fabricated regulation article numbers (no "Article 4 of Decreto-Lei 9/2006"); any sail-yacht-enters-the-cave claim (inherited anti-pattern, doesn't apply to CL6 content but watch for stray mentions); the words "magical / unforgettable / perfect / hidden gem / Instagrammable / bucket list / let's dive in / elevate / unlock / seamless / pursuant to / please be advised" (inherited anti-pattern from pillar §13 + CL2 §13 + CL1 §13 + CL3 §13).
19. ☐ **Builds cleanly**: `pnpm --filter atlantis run build` succeeds. The rendered `/en/blog/dolphin-watching-algarve-species-seasons/` page shows the breadcrumb (`Home › Blog › Benagil Cave Tour: Everything You Need to Know in 2026 › Dolphin Watching in the Algarve…`), the FAQ block (7 items), the JSON-LD `Article` + `FAQPage` schema validates in the Rich Results Test.
20. ☐ **The pillar's "In this guide" component lists CL6** at position 4 (CL1=0 → CL2=1 → CL3=2 → CL4 → CL5 → **CL6** → CL7 → …) — verify after publish.

### Red flags / hallucination guardrails

The deepen carries 5 hallucination risks the writer must guard against carefully:

1. **The Alvor lagoon hallucination (the load-bearing factual fix).** The current `imageAlt` mentions "Alvor lagoon nature reserve." Atlantis boats do NOT operate in the Alvor lagoon. The Benagil + Alvor product (PK 717728) runs the Alvor leg as a SEPARATE tour — not the speedboat shown in this image. The Alvor lagoon is conceptually CL7's territory (it's a habitat for shorebirds and seahorses, not dolphins). The deepen REMOVES the Alvor mention from the imageAlt. The body must NOT introduce the Alvor lagoon anywhere — not in the rare-visitors section, not in the marine-life lateral, not in the closing. Inherited from `reference_atlantis_departure_marina` + user memory's "common drafting hallucination to correct."

2. **The marina hallucination (carried from pillar + CL1 + CL2 + CL3).** Departure marina is `Porto Comercial de Portimão`. NOT Clube Naval. NOT Marina de Portimão. NOT Portimão Marina. CL6 may not even name the marina depending on how the closing reads — if it does, only `Porto Comercial de Portimão` (signposted *Ac. Porto Comercial de Portimão*) is acceptable. This is the load-bearing entity check that every CL piece carries.

3. **The Decreto-Lei 9/2006 precision call.** The verified facts (2026-05-14, via Diário da República + AIMM Portugal + ICNF):
   - In force: 7 January 2006.
   - Max 3 vessels within 100m of any pod: VERIFIED.
   - Licensing by ICNF, valid 3 years: VERIFIED.
   - Fines up to €3,740 (individuals) / €40,000 (legal entities): VERIFIED.
   - 50m approach distance + 30-min cumulative encounter: WIDELY-USED OPERATOR PRACTICE consistent with the regulation's broader code of conduct; NOT explicitly cited from the statute in the sources I reviewed. The writer frames the 50m / 30-min specifics as "operator practice within the regulation," NOT as "the law says X." If reviewer-operator wants harder regulation-text confirmation on the 50m/30min figures before publish, surface in §16 #1.
   - **The prompt header's "€500–€44,000 for operators" fine bracket is close but not exact.** Use the verified €3,740 / €40,000 figures with "up to" qualifiers, OR paraphrase qualitatively ("operators face significant fines and risk their licence"). DO NOT use €500–€44,000 verbatim — it's a range I could not verify, and citing it risks Google quality-evaluator correction.

4. **The sighting-rate bands as "data."** The month-by-month chart bands (~25% in January up to ~85% in July) are **operator-grade approximations from Atlantis's tour log**, NOT externally-validated marine-mammal census data. The framing prose IMMEDIATELY after the chart says so. DO NOT cite the chart as "data from a 2026 marine-mammal census" or "ICNF-published rates" — both would be fabrications. The honest framing is: "These bands are our running observation across years on the Portimão–Benagil coast; they're not externally audited. The point is the SHAPE of the seasonality, not the precision of any single cell."

5. **The "no guarantees" line must stay sharp.** Current EN line 73 ("If anyone promises you'll 'definitely see dolphins,' treat that as a red flag…") is load-bearing. After the chart shows non-100% rates, this line is even more important — readers see "85% in July" and need the honest follow-up that 85% is not a guarantee. Keep verbatim or lightly tighten; do NOT soften.

### Anti-patterns inherited from prior briefs (all apply)

- Pillar §13 + CL1 §13 + CL2 §13 + CL3 §13 anti-pattern lists ALL apply. The writer re-reads CL3 §13 before drafting (closest analog). Key inherited anti-patterns specifically relevant to CL6:
  - No `Clube Naval` / `Marina de Portimão` / `Portimão Marina` (inherited #1 across all CLs).
  - No "magical" / "unforgettable" / "perfect" / "hidden gem" / "bucket list" / "Instagrammable" (inherited #13 from CL3).
  - No "let's dive in" / "elevate" / "unlock" / "seamless" / "pursuant to" / "please be advised" (inherited AI-fluff anti-patterns).
  - No specific euro figures for tour prices (inherited #5).
  - No precise drive-time minutes (inherited; CL1's territory).
  - No "no matter where you're staying" (inherited from CL1 §13 #5).
  - No fabricated regulation article numbers (inherited from CL2 §13 #9 — "Do NOT cite the rule's full Portuguese statute number, edital number, or Diário da República reference" — for CL2 that was about NOT citing Article-by-article from the 2023 edital; CL6's same posture applies to Decreto-Lei 9/2006 — name the decreto-lei by number, but don't pretend to quote specific articles).

## 15. Translation notes (PT/ES/FR translator pass after EN review)

The translation pass is a separate Sonnet pass per `feedback_opus_for_writing` user-memory ("Use Opus subagents for blog/content drafts; Sonnet OK for code, schema, translations"). The translator should know:

### Species names per locale (already verified in the current locale files — keep verbatim)

- **PT (European Portuguese):**
  - Common dolphin → **golfinho-comum** (lowercase, hyphenated; the current PT file uses this correctly)
  - Bottlenose dolphin → **roaz** (singular) / **roazes** (plural). The current PT draft uses "roazes" in the "5–15" line and "golfinho-comum" / "golfinhos-comuns" elsewhere — consistent.
  - Striped dolphin → **golfinho-riscado** (lowercase, hyphenated). The current PT draft uses this.
  - Risso's dolphin → **golfinho-de-Risso** (with hyphens and capitalised Risso). Current PT draft uses "golfinhos-de-Risso".
  - Short-finned pilot whale → **baleia-piloto-de-barbatana-curta** (multi-hyphen compound). Current PT draft uses this.
  - **European Portuguese reminder:** the deepen's translator must use European Portuguese forms throughout (e.g., "actividade" vs "atividade" — European drops the c-pre-t; "secção" vs "seção" — European keeps c; "Maio/Junho/Julho" — month names capitalised in European usage; verb forms like "verá" vs "vai ver" — European tends toward the synthetic future). The current PT draft is largely European-correct (e.g., "actividade" at line 81 — though the May-2024 orthographic reform makes "atividade" acceptable too; honour the current draft's choices, don't introduce Brazilian forms). When in doubt, match the existing pillar PT + CL1 PT + CL2 PT + CL3 PT forms.

- **ES:**
  - Common dolphin → **delfín común** (the current ES draft uses this).
  - Bottlenose dolphin → **delfín mular** (the current ES draft uses this; "mular" is the standard Iberian Spanish term).
  - Striped dolphin → **delfín listado** (the current ES draft uses this).
  - Risso's dolphin → **delfín de Risso** (standard Spanish form).
  - Short-finned pilot whale → **calderón común** OR **calderón de aleta corta**. The current ES draft uses **calderón de aleta corta** — keep.

- **FR:**
  - Common dolphin → **dauphin commun** (the current FR draft uses this).
  - Bottlenose dolphin → **grand dauphin** (the current FR draft uses this; "grand dauphin" is the standard French term).
  - Striped dolphin → **dauphin bleu et blanc** (the current FR draft uses this; literal "blue and white dolphin" — standard French taxonomy).
  - Risso's dolphin → **dauphin de Risso** (standard French form).
  - Short-finned pilot whale → **globicéphale tropical** OR **globicéphale à nageoires courtes**. The current FR draft uses **globicéphales à nageoires courtes** — keep.

### imageAlt translations (the load-bearing fix)

The EN imageAlt becomes "Bottlenose dolphins riding the wake alongside an Atlantis Tours speedboat off the Algarve coast." Locale equivalents:

- **PT:** "Roazes a nadar junto à esteira de uma lancha rápida da Atlantis Tours na costa algarvia"
- **ES:** "Delfines mulares nadando junto a la estela de una lancha rápida de Atlantis Tours en la costa del Algarve"
- **FR:** "Grands dauphins surfant le sillage d'un bateau rapide d'Atlantis Tours au large de la côte de l'Algarve"

These are translator-suggested phrasings; the translator may adjust for natural cadence per locale. The load-bearing constraint is **remove the Alvor lagoon reference from all four locale files** — the current PT, ES, FR files all carry the same hallucination (the Alvor reference) in their imageAlt fields and must all be fixed.

### Table translation discipline

- **Species comparison table (H2 #2)** — the 6 columns translate naturally; the Latin binomials stay italicised and untranslated; the species common names use the locale terms above; the "ID marks at a glance" and "Behaviour near boats" columns translate the observational language carefully (e.g., "Acrobatic; breaches clear of water; bow-rides; tail-slaps" → PT "Acrobático; salta completamente fora de água; segue a esteira dos barcos; bate com a cauda" — close to what the current draft already says in the prose).
- **Month-by-month sighting chart (H2 #4)** — month names are capitalised in PT (Janeiro, Fevereiro, …) and FR (janvier in lowercase — French convention is lowercase month names), and ES is lowercase (enero, febrero, …). The "Notes" column translates the operator-voice observations (e.g., "Most tour days cancelled for swell" → PT "Maioria dos dias de tour cancelados por ondulação"). Keep the sighting-rate percentages as numerical figures with "%" — no locale-specific number formatting needed (% works in all four locales).
- **Decreto-Lei 9/2006** — the regulation name stays Portuguese in all locales. "Decreto-Lei n.º 9/2006" is the canonical form; ES translators sometimes render as "Decreto-Lei nº 9/2006" (without the masculine ordinal indicator), FR sometimes as "Décret-loi n° 9/2006" — but for a Portuguese statute the Portuguese form is the citation surface. Keep "Decreto-Lei n.º 9/2006" verbatim in all four locales. The translator may add a one-line gloss in parentheses for non-PT readers (e.g., FR: "Decreto-Lei n.º 9/2006 (le décret-loi portugais qui régit l'observation des cétacés)") — optional, writer's call.

### FAQ translation discipline

The 7 FAQs (§10) translate 1:1 with locale-appropriate phrasing. Specific notes:
- FAQ #1 (head-query magnet) must keep the snippet shape — May-October window + calm-morning specificity in 40–60w. Translator drafts then verifies word count.
- FAQ #4 + #5 (regulatory) must keep the Decreto-Lei 9/2006 reference + the fine figures (€3,740 / €40,000) verbatim.
- FAQ #6 (cave tour vs dolphin tour) translates the operator-grade sighting rates (50–60% / 75–85%) as numerical bands — easy across locales.

### Voice translation discipline

- PT: European Portuguese forms; respect the current draft's tone (the current draft is operator-friendly, NOT formal-tourism-board voice). The "From the wheelhouse" framing should translate to something like "Do leme" or "Da ponte" or "Do barco" — translator's call on which feels most natural.
- ES: Iberian Spanish (vosotros/vosotros tense conventions; "vuestro" for "your" plural; "tío/tía" colloquialisms NOT appropriate — keep tourism-trade voice). The "From the wheelhouse" framing translates to "Desde el puesto de mando" or "Desde la cabina" — translator's call.
- FR: standard metropolitan French; vouvoiement (vous) for the reader address — same as the current FR draft. "From the wheelhouse" → "Depuis la timonerie" or "Vu du bord" — translator's call.

### Translation pass acceptance criteria

After the EN deepen is review-approved, the translator's pass verifies:
1. ☐ All four locales have the same H2 structure + section count.
2. ☐ The species comparison table is structurally identical across locales, with locale-specific common species names + verbatim italicised Latin binomials.
3. ☐ The month-by-month sighting chart is structurally identical with locale-specific month names + verbatim numerical bands.
4. ☐ The H2 #5 ethical-operator section names **Decreto-Lei n.º 9/2006** verbatim in all four locales.
5. ☐ The `imageAlt` field in each locale removes the Alvor lagoon reference.
6. ☐ The `author` field is `Nuno Albino` in all four locales.
7. ☐ The `date` field is `2026-05-14` in all four locales.
8. ☐ The `tags` field includes `seasonality` in all four locales.
9. ☐ The `faqs:` frontmatter has the same 7 Q&A pairs (translated) in all four locales.
10. ☐ The in-body link targets use the locale-specific slugs per §11.
11. ☐ The `/en/contact/` link (and its PT/ES/FR equivalents in current drafts: `/pt/contact/`, `/es/contact/`, `/fr/contact/` — VERIFY current draft state per locale) is DROPPED.
12. ☐ Each locale's word count: PT 1,650–2,050; ES 1,650–2,050; FR 1,650–2,050 (English 1,400–1,700 + 15–25% translation expansion, per the CL3 PT/ES/FR pattern).

## 16. Open questions for the operator (resolve pre-draft)

Mirror the CL3 brief's §16 pattern. Surface EXACTLY ONE operator-only question on the sighting-rate bands; everything else is resolved by recommendation.

### The single operator-only question — sighting-rate bands

The month-by-month sighting-rate bands in §8 are operator-grade proposals based on biology + the prompt header's "what operator reality looks like" framing + the keyword map's research notes. **Reviewer-operator confirms the bands match Atlantis's actual tour-log experience, or adjusts.** Proposed bands repeated here for the operator's confirmation:

| Month | Proposed sighting rate (calm-morning tours) | Reasoning |
|---|---|---|
| January | ~25% | Bottlenose pod still around; most tour days cancelled for swell; on the few days that run, the bottlenose are findable |
| February | ~25% | Same as January |
| March | ~35% | Atlantic warms slightly; first common-dolphin sightings late month |
| April | ~50% | Commons returning with baitfish; calm mornings reliable |
| May | ~70% | Peak season starts; commons in larger pods |
| June | ~80% | Striped dolphins start showing on longer-range tours; commons reliable |
| July | ~85% | Peak summer; commons most reliable; large pods |
| August | ~85% | Same as July |
| September | ~80% | Operator-preferred month; warm water, smaller crowds, sightings still high |
| October | ~65% | First half similar to September; second half drops as Atlantic kicks up |
| November | ~40% | Tours run on calm days only; on those days, bottlenose still findable; occasional commons |
| December | ~25% | Most tour days cancelled for swell; bottlenose only |

**Operator answers ONE of:**
- (A) "These bands match what we see — go." → writer ships the chart as-is.
- (B) "Adjust these cells: [Month: new band]; [Month: new band]; etc." → writer swaps the specified cells; rest of chart stays.
- (C) "The whole band shape is wrong because [reason]." → writer re-runs the chart with the operator's actual seasonal feel.

The writer does NOT proceed to draft on this section until the operator answers. The rest of the brief is unblocked — the writer can start everything else and slot the chart in at the end.

### Other resolved questions (recommendations applied — operator confirms or overrides at review)

1. **The €3,740 / €40,000 fine bracket vs the prompt header's €500–€44,000** — ✅ USE THE VERIFIED €3,740 / €40,000 FIGURES with "up to" qualifiers. The prompt header's range is unverified; the verified figures from Diário da República + AIMM Portugal sources are the ones to cite. If the operator prefers qualitative paraphrase ("operators face significant fines and risk their licence") instead of any euro figures, override here. Default: cite the verified figures.

2. **External link to Diário da República for Decreto-Lei 9/2006** — ✅ DEFAULT: SKIP. Zero externals across the deepen. If the operator prefers one external link as a "regulatory-source signal" in H2 #5, anchor as `Decreto-Lei n.º 9/2006` (italics on "n.º"), target `https://diariodarepublica.pt/dr/detalhe/decreto-lei/9-2006-168231`. Cap at 1 external. Default: skip; operator overrides if desired.

3. **Mid-body speedboat link in H2 #4 (current EN line 71)** — ✅ KEEP (Option A in §11). Net 4 in-body link anchor decisions + 5 placements (pillar↑ ×2, CL7 lateral ×1, tour-page ×2 with anchor variation). At the architecture's 3–5 cap but in-band; serves two reader moments. If the operator prefers the leaner Option B (single tour link in closing only), drop the mid-body link.

4. **Image swap on the deepen** — ✅ DEFAULT: KEEP CURRENT IMAGE URL. The deepen fixes the imageAlt hallucination; it doesn't swap the image. If the operator surfaces a marina-specific or bow-wave-with-pod asset later, swap on a future refresh. The current image (`https://cdn.filestackcontent.com/btJvs7ETdSHHh2QskU2g`) is assumed to show bottlenose-alongside-the-boat per the prompt header's recommended new alt-text; operator verifies image content before publish.

5. **The 50m approach / 30-min cumulative encounter regulation precision** — ✅ FRAME AS OPERATOR PRACTICE. The 100m / 3-vessel rule is the hard law; the 50m approach + 30-min cumulative encounter are widely-used operator practice consistent with the law's broader code of conduct. The writer frames the 50m / 30-min specifics carefully ("Engines to idle within roughly 50 metres" / "Reputable operators limit any single pod encounter to roughly 15–20 minutes") rather than as quoted-statute numbers. If the operator has firmer source on these specific figures being hard-coded in the statute, the writer adjusts the framing to "the law requires X" — surface the source in §16 if so. Default: operator-practice framing per the verified source set.

6. **The species table's pod-size bands** — ✅ DEFAULT: use as-drafted (Common 10–500+; Bottlenose 5–15; Striped 20–100). These are standard biology references. If the operator's actual observations diverge (e.g., "we mostly see common dolphins in pods of 20–80, not 50–500"), the writer adjusts the band to match operator reality. Surface in §16 if so.

7. **The "Best season" cells in the species table** vs the month-by-month chart — ✅ DEFAULT: keep both in sync. Common: May–Oct (peak Jun–Aug). Bottlenose: year-round (best Apr–Oct in calm seas). Striped: Jun–Sep, on longer-range tours. If the operator adjusts the month-by-month chart in §16's load-bearing question, the species table's "Best season" column should match.

### Genuinely-uncertain operator questions (raise only if surfaced — don't manufacture)

The prompt instruction: "If you find other genuinely-uncertain operator questions (e.g., the bad-operator behaviour Nuno would call out), surface them ONLY if they're real uncertainties — don't manufacture questions to fill the section."

Reviewing the draft against the operator's likely review focus, the genuinely-uncertain questions beyond the sighting-rate bands are:

- **What specifically do the cowboy operators do that bothers you?** The H2 #5 operator-voice paragraph names "boats racing toward a sighting fin-first to get the passengers a closer photo." If Nuno would prefer a different specific behaviour to call out (e.g., "operators dropping passengers in for an illegal swim", "operators ignoring the 3-vessel cap and clustering 5+ boats on a single pod", "operators using underwater speakers"), surface and adjust the operator-voice paragraph accordingly. **Default: keep the "racing toward a sighting fin-first" framing — it's specific, observable, common, and connects to the broader speed/proximity rules.**
- **Anything else missing from the ethical-operator section?** The verified rules are 3-vessel cap + 50m oblique approach + 15–20min pod limit + no swimming + no underwater speakers. If Nuno's day-to-day enforcement reality involves another rule the brief omits (e.g., "minimum-distance from a pod with calves" — the regulation does set tighter rules around mothers-and-calves; the brief doesn't currently surface this), surface and add.

If the operator surfaces neither of these, the brief stays as drafted.

---

## Verified facts (for the writer's confidence; cite without sourcing in the body)

These are operator + research facts verified 2026-05-14 across pillar + CL1 + CL2 + CL3 reviews and this brief's own research pass; the writer doesn't need to re-verify, but should cite without external links in the body where natural:

- **Departure marina:** `Porto Comercial de Portimão` (signposted *Ac. Porto Comercial de Portimão*). NOT Clube Naval, NOT Marina de Portimão, NOT Portimão Marina. See `reference_atlantis_departure_marina` user memory.
- **Atlantis operates from Portimão only.** Does NOT run from Carvoeiro / Lagos / Albufeira / Armação de Pêra. (Not directly relevant for CL6 — the piece doesn't name multiple ports — but the constraint applies if the writer's closing references departure.)
- **Atlantis boats do NOT operate in the Alvor lagoon.** That's a separate FareHarbor product (PK 717728). The current imageAlt's Alvor-lagoon reference is the load-bearing factual fix.
- **Decreto-Lei n.º 9/2006:**
  - In force since 7 January 2006.
  - Maximum 3 platforms within 100m of any cetacean group: VERIFIED.
  - Licensing by ICNF (Instituto da Conservação da Natureza e das Florestas), valid 3 years: VERIFIED.
  - Fines: up to €3,740 (individuals), up to €40,000 (legal entities): VERIFIED.
  - Hierarchy: research vessels + licensed operators take priority over other vessels.
  - 50m approach + 30-min cumulative encounter specifics: industry practice consistent with the regulation; not explicitly cited from the statute in the sources reviewed.
- **Three resident dolphin species:** common dolphin (*Delphinus delphis*), bottlenose dolphin (*Tursiops truncatus*), striped dolphin (*Stenella coeruleoalba*). Bottlenose is the only true year-round Algarve resident; common + striped are seasonal/migratory through the Gulf of Cádiz.
- **The pillar-↑ anchor in CL6:** `the full Benagil Cave Tour guide` (lede) / `our full Benagil Cave Tour guide` (closing) — note this differs from CL1/CL2/CL3's `complete Benagil Cave Tour guide` (the CSV is explicit; "the full" is what CL6 carries).
- **Speedboat tour PK:** 717720 (Benagil caves speedboat tour from Portimão). EN slug `benagil-caves-speed-boat-tour`. PT slug `circuito-de-grutas-ate-benagil`. ES + FR slugs match EN.
- **CL7 (marine-life piece):** EN slug `marine-life-algarve-coast-spotters-guide`. PT/ES/FR slugs to be verified in the translation pass.

---

*End of brief. The writer should ack this brief, raise §16's single operator-question (sighting-rate bands) to the operator, then draft the EN deepen. The reviewer reviews against §14. Translation to pt/es/fr is a separate Sonnet pass after EN review — all four files are deepened in place (PT/ES/FR existing files mirror the EN structure), no files are created or deleted. Per the project memory `feedback_opus_for_writing` — Opus drafts content, Sonnet handles schema/translation plumbing.*

*Brief author note: the verified Decreto-Lei 9/2006 facts cited in §9 + §14 + the "Verified facts" appendix are sourced from Diário da República (`diariodarepublica.pt/dr/detalhe/decreto-lei/9-2006-168231`), AIMM Portugal's code-of-conduct page, and ICNF cetacean-watching references — all checked 2026-05-14. The fine bracket (€3,740 / €40,000) is the canonical statute figure; the prompt header's "€500–€44,000" was not verifiable from primary sources and is not used in the brief. The 50m approach + 30-minute cumulative encounter rules are framed as industry practice rather than quoted statute language because the verified statute text foregrounds the 100m / 3-vessel platform-density rule, not the 50m / 30-min specifics. The writer can be confident citing what's in this brief.*
