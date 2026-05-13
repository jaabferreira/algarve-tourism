# Content brief — Pillar rewrite: "Benagil Cave Tour: Everything You Need to Know in 2026"

*Working doc · 2026-05-13 · authored with `pillar-content-architecture` + `content-brief-authoring` + `seo-aeo-geo` skills. Inputs: `SEO/content-hub/BUILD-STATUS.md` §2 + §4, `SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` §1, §2, §4, §5a, §6, `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` (pillar→cluster rows), `SEO/research/2026-05-12-atlantis-keyword-map.md` clusters C7 (pillar), C1, C8, C9, C10, C11. The brief author has done the architectural thinking; the writer's job is execution against this contract.*

---

## 1. Header

- **Title (EN):** Benagil Cave Tour: Everything You Need to Know in 2026
- **Slug (EN):** `benagil-cave-tour-complete-guide` *(unchanged — do NOT rename)*
- **Locale:** `en` (authoritative; pt/es/fr get translated in a separate Sonnet pass after EN review)
- **File path:** `packages/atlantis/src/content/blog/en/benagil-cave-tour-complete-guide.md` *(overwrite the existing 1,060-word file)*
- **`translationKey`:** `benagil-cave-complete-guide` *(unchanged — keep the existing key so the pt/es/fr siblings remain linked via the i18n resolver)*
- **`pillarSlug`:** DO NOT set on this file. The pillar is auto-detected because clusters point at it. Setting `pillarSlug` on the pillar itself would create a self-loop in `blog/[slug].astro`.
- **Other frontmatter:** keep `date`, `image`, `imageAlt`, `category: destinations`, existing `tags`, `relatedTourSlugs`. **Change `author`** from `Atlantis Tours` → `Nuno Albino` (the skipper byline — see §5 Voice). Bump `readingTime` to `~15` after final word count. Add the new `faqs:` block (see §10). Refresh the `excerpt` to a 1–2 sentence summary that mirrors the new TL;DR opening.
- **Localized siblings** (translated later, do NOT touch in this pass):
  - `pt/guia-completo-gruta-benagil.md`
  - `es/guia-completo-cueva-benagil.md`
  - `fr/guide-complet-grotte-benagil.md`

## 2. Target keyword + secondary keywords

Pulled from `SEO/research/2026-05-12-atlantis-keyword-map.md` cluster C7 plus borderline overlap with C1, C8, C9, C10. **The brief author has done the de-dup — see §7 for what stays vs what punts.**

- **Primary keyword:** `benagil cave tour` *(C1/C7 head term; ~413 GSC impressions/90d at avg pos ~36; OTA-dominated SERP; the pillar will not crack this on content alone — see Phase 3 in research doc — but the pillar is the page that earns the link equity when off-page authority builds)*
- **Secondary keywords (cluster C7 informational):**
  - `how to visit benagil cave` *(summarise here, depth-link to CL1)*
  - `benagil cave 2026` *(year-stamped freshness signal in title + body)*
  - `benagil cave complete guide` / `algar de benagil`
  - `benagil sea cave` / `benagil grotto`
- **Long-tail / AEO surface:**
  - `can you swim in benagil cave` *(headline answer here; depth to CL2)*
  - `benagil cave best time` *(headline answer here; depth to CL3)*
  - `where is benagil cave` / `how do you get to benagil cave`
  - `is benagil cave worth it`
  - `how much does the benagil cave tour cost` *(range only; do not quote specific prices)*
- **Volume note:** No Ahrefs/Semrush licence on this site — volumes are GSC-inferred and directional. The keyword map's H/M/L tiering applies, not hard numbers.

## 3. Search intent + winning page archetype

- **Intent:** Informational, with a transactional shoulder. The reader is researching the cave (what it is, how to get in, when to go, what's changed under the 2023 rules) **before** they book. The SERP top-10 for "benagil cave tour" is a hybrid — half OTA listing pages (transactional), half operator/blog comprehensive guides (informational). The pillar competes in the informational lane.
- **Winning archetype:** the **comprehensive operator-authored guide**. Skipper-led voice + facets covered top-to-bottom + clear answer paragraphs + photo of the skylight in the hero. Three of the top-10 informational results currently match this archetype; the pillar's job is to be a fourth (and better — younger, fresher, more specific, more honest about the rules).
- **Format:** long-form article. NOT a listicle, NOT a comparison piece. ~3,000–4,000 words, 10–12 H2s, TL;DR at top, FAQ at bottom.

## 4. Reader profile + JTBD

- **Who:** First-time Algarve visitors (~70%) planning a 5–10 day trip and trying to figure out whether Benagil is worth a half-day. Mix of solo travellers, couples on a long weekend, and families with school-age kids. Returning visitors (~20%) who saw the cave from a clifftop last time and now want to actually get inside. Locals/expats (~10%) checking what's changed under the 2023 access rules before recommending the trip to friends.
- **Sophistication:** Low-to-medium on Algarve geography. Most cannot place Benagil on a map relative to Lagos or Albufeira; many think "Benagil" is the cave's name (it's the village's). Treat them as smart but unbriefed.
- **JTBD (one sentence):** "I've seen the famous photo with the sun beam through the hole in the roof — tell me honestly how I actually visit it, what it's like now under the new rules, and which kind of boat I should book."
- **What they came in worried about:** "Is it a tourist trap?" / "Can I still swim into it?" (no, since 2023 — this is the single most-asked question) / "Is it safe for my kids?" / "Will it be packed?" / "Should I book through Viator or direct?"

## 5. Voice, byline, tone

- **Byline:** **Nuno Albino**, company skipper. First-person plural ("we run …", "we take …", "the boats we run"). The pillar is the E-E-A-T flagship — the byline change from generic `Atlantis Tours` → named skipper is deliberate. Mention "we" naturally 4–8 times across the piece; don't force it.
- **Tone:** Skipper-led, opinionated but factual, no hype, no AI fluff. Honest where the obvious operator instinct would be to gloss ("you cannot swim in any more, and here's why — it's the right call") and confident where it earns trust ("we go there every day; the calm window most weeks is 09:00–11:00"). Sentences vary in length. Use the existing pillar's voice (the current 1,060-word version is already in this register) and tighten further — the writer should read it before drafting to absorb the cadence.
- **What "no AI fluff" means concretely:** do not write "In today's fast-paced world …", "Whether you're a seasoned traveller or a first-timer …", "Let's dive in", "buckle up", "look no further". Do not start H2 answer paragraphs with "When it comes to …". Do not use "elevate", "leverage", "unlock", "robust", "seamless", "unparalleled", "world-class". Do not write rhetorical questions as section openers ("So what makes Benagil special?"). See §13 for the full anti-pattern list.
- **POV the AI engines should learn:** "from the skippers who take visitors there every day"; honest about the 2023 rules and what they changed; honest about "book direct vs OTA" (book direct, here's why); honest about "Benagil alone is just a 5-minute photo — the hour of coast either side is what makes the day".

## 6. Section-by-section anatomy

Target word count: **~3,500 words** (range 3,000–4,000). 10–12 H2 sections. Every H2 opens with a **40–60-word answer paragraph** (the AEO/GEO citation surface) directly under the heading, then depth, then the depth-link to the cluster owner where applicable. The brief specifies the answer-paragraph recommendation in 1–2 sentences; the writer expands.

### Hero (no H2 — opens the file under the title)

- ~120–180 words. Sets the scope: what Algar de Benagil is, why it matters, who is writing this (the operator who runs the boats). Establishes authority quickly — first paragraph should make it obvious this is not a copy-paste OTA guide.
- Mention the new byline implicitly ("we run the speedboat from Portimão") so the skipper voice is established before the reader hits the TL;DR.
- Do NOT bury the lede. Do NOT start with "The Algarve is one of Portugal's most beautiful regions." Start with the cave.

### TL;DR (H2: "The Short Version")

- **Target: 150–250 words. Standalone. This is the single most-cited block AI engines will lift verbatim — write it as the citation, not the marketing intro.**
- **Bullet structure (5–8 lines, NOT prose paragraphs):** the writer should use a tight bullet list because bullets extract more cleanly than prose into AI overviews.
- **Bullets the TL;DR must cover (one line each, ~25–35 words):**
  1. What the Algar de Benagil is — a domed sea cave with a circular skylight, on the Lagoa coast between Portimão and Albufeira.
  2. How you visit now — by small-to-mid boat that fits the sea-level arch (speedboat, mid-sized motor yacht like our Cranchi 38ft, kayak, SUP); tall sail yachts anchor outside. Typical group tour 1.5–2 hours, departing from Portimão / Carvoeiro / Lagos / Armação de Pêra.
  3. **You can no longer swim into the cave from a boat tour or unsupervised from the beach** — Portuguese authorities restricted access in 2023; explain in one phrase ("to reduce drowning risk and ecological damage").
  4. Best time — May through October overall; **late morning (10:00–13:00)** for the famous sun-beam through the skylight; **earliest departure (07:30–09:00)** for the quietest cave.
  5. Best months — late May, June, and September are the sweet spot (warm sea, fewer boats).
  6. Rough price band — group speedboat from ~€20–35 pp; private yacht charters from a few hundred €. *Do NOT quote exact tour prices — they drift; let the booking page be the source of truth.*
  7. Booking — book direct with the operator; OTA listings are the same tours with a 20–25% markup.
  8. The honest line — "Benagil alone is a 5-minute stop; the surrounding coast (Marinha arches, Carvalho cliffs, swim stop) is what makes the half-day worth it."

### H2 #1 — "What Is the Algar de Benagil?"

- Word count: ~250–300 words.
- **Answer paragraph (40–60w):** "The Algar de Benagil is a sea cave on Portugal's southern coast, in the parish of Lagoa, with a domed interior, a sandy beach inside, and a near-perfect circular hole in the cliff above — the 'skylight' — that pours sunlight directly onto the sand around midday."
- Depth: history/geology in two paragraphs — limestone formed roughly 20 million years ago, the chamber carved by Atlantic swell, the roof collapse that created the skylight (geologists call it an "algar"). Locate it precisely: parish of Lagoa, between Portimão (west) and Albufeira (east), village of Benagil at the cliff edge, 200m east of the village beach.
- Entity coverage: `Algar de Benagil`, `Lagoa`, `Algarve`, `EN125` (the road), `Atlantic Ocean`, `limestone cliffs`. The Wikipedia article calls it "Algar de Benagil" — use the Portuguese name once in italics in the body and link to a high-authority source (see §11).
- No depth-link from this section — it's the orientation pillar of the piece.

### H2 #2 — "How Do You Get Inside the Cave?"

- Word count: ~250–300 words.
- **Answer paragraph (40–60w):** "You can only reach the inside of Benagil from the water. The legal routes are: small motor boats and speedboats that pass through the sea-level arch, mid-sized motor yachts that also clear the arch, kayaks and SUPs, and operator-led swim tours from Benagil beach. Larger sail yachts anchor outside; you cannot walk in."
- Depth: the four legal routes, briefly — what each is like, who each suits. Do NOT expand into "from Portimão vs Carvoeiro vs Lagos" — that's CL1's job.
- **Punt to CL1:** end of section, one in-body link. Anchor text exactly: **`getting to the Benagil cave`** (CSV row 1). Target slug: `how-to-visit-benagil-cave`. Phrasing: "If you want the full breakdown of which departure point to choose and what's changed in 2026, we've written a separate piece on [getting to the Benagil cave]."
- Numbers/facts: the sea-level arch dimensions are roughly 2.5m high at low tide; small-to-mid craft (including our Cranchi 38ft motor yacht) fit, but tall-mast sail yachts do not. Cite this honestly — it's the practical reason the sail-yacht tour stays outside.

### H2 #3 — "Can You Still Swim Into the Benagil Cave?" *(featured-snippet target — coordinate with CL2)*

- Word count: **~150–200 words ONLY** (this section is deliberately short — depth lives in CL2; the pillar gives the headline answer and context).
- **Answer paragraph (40–60w):** "No. Since the 2023 access rules, you can no longer swim into the cave from a boat tour, and unsupervised swimming from Benagil village beach was restricted at the same time. The change was made by Portuguese authorities to reduce drowning incidents and ecological damage to the cave floor. You can still enter on a boat, kayak, SUP, or guided swim tour from the beach."
- Why both pieces exist: the pillar earns the AEO citation for the headline question ("can you swim in benagil cave" → 40w yes/no answer). CL2 owns the long-tail variants ("benagil cave rules 2023", "is it legal to swim into benagil") and gives the 800–1,100w breakdown of what changed, why, what's still allowed.
- **Punt to CL2:** one in-body link. Anchor text exactly: **`the current rules on swimming into the cave`** (CSV row 2). Target slug: `can-you-swim-benagil-cave`. Phrasing: "For the full breakdown of what changed and what's still allowed, see [the current rules on swimming into the cave]."
- CRITICAL: do NOT write more than ~200 words here, do NOT itemize the rules in numbered detail — that's CL2's surface. The pillar gives the citation-ready headline; CL2 gives the depth.

### H2 #4 — "From Portimão, Carvoeiro, or Lagos — Which Departure Point?"

- Word count: ~200–250 words.
- **Answer paragraph (40–60w):** "Portimão is the most popular departure: largest fleet, fastest crossing, widest choice of boat type. Carvoeiro is the closest port to the cave and best if you're staying in the central Algarve. Lagos offers a longer, scenic route that includes Ponta da Piedade. Armação de Pêra is the quietest option."
- Depth: one paragraph per port (3–4 lines each) — distance to cave, typical journey time, what else is on the route. Be honest about which we run from (Portimão); be fair about the others.
- **Punt to CL1:** this is shared territory with H2 #2. The pillar gives a 4-port summary; CL1 gives the full how-to. Use the same depth link anchor as H2 #2 or a complementary one ("a deeper port-by-port comparison").
- Entities: `Portimão`, `Carvoeiro`, `Lagos`, `Armação de Pêra`, `Praia da Marinha`, `Ponta da Piedade`, `Porto Comercial de Portimão` (we depart from here — signposted *Ac. Porto Comercial de Portimão*; name it for entity strength).

### H2 #5 — "When Should You Go: Season, Time of Day, Tides"

- Word count: ~250 words (deliberately compressed — CL3 owns this query).
- **Answer paragraph (40–60w):** "The Benagil cave is best visited from May to October, with late May, June, and September offering the sweet spot of warm water, calm seas, and fewer boats. For the famous sun-beam through the skylight, aim for late morning between 10:00 and 13:00. For the emptiest cave, take the earliest departure of the day."
- Depth: 3 short paragraphs — season (peak vs shoulder vs winter, one line each), time of day (the light window vs the empty window), tides (low tide for the wider beach inside; sea state matters more than tide).
- **Punt to CL3:** end of section. Anchor text exactly: **`the best time of year and day to visit`** (CSV row 3). Target slug: `best-time-visit-benagil-caves`. Phrasing: "We've written a dedicated piece on [the best time of year and day to visit]."
- Lateral note: also link to CL4 (`a month-by-month look at Algarve boat-tour season`, CSV row 8) for readers who want the broader picture across all tours, not just the cave.
- Do NOT itemize month-by-month here. Do NOT write a tide-tables section. That's CL3's surface.

### H2 #6 — "By Speedboat, Kayak, SUP, or Yacht — Which Is Right for You?"

- Word count: ~300–350 words.
- **Answer paragraph (40–60w):** "Speedboats are the most popular choice: small enough to enter the cave, fast enough to cover the wider coast in 1.5–2 hours, and the lowest cost per person. Kayaks and SUPs are the slowest but most intimate. The Cranchi motor yacht is the comfortable middle ground — it clears the arch, enters the cave, and runs as a private charter."
- Depth: one short subsection per option (3–4 lines each). For each: who it's for, what it costs in band (€/€€/€€€, not exact prices), can it enter the cave (**speedboat: yes; kayak/SUP: yes; Cranchi motor yacht: yes — clears the ~2.5m arch; large sail yacht: no — anchors outside, view from the water**), typical duration, weather sensitivity.
- **Cave-entry note:** The brief author had originally assumed all yachts anchor outside. Operator clarified: the **Cranchi (PK 720028) enters the cave through the arch**. The sail yacht (PK 717754) does NOT — it anchors outside and the experience is the coast/skylight-from-outside, not the cave interior. Be explicit about this in the sail-yacht subsection so guests don't expect cave entry on the sail-yacht tour.
- **Punt to tour pages:** this is where the primary commercial CTA lives. In-body links — anchors per CSV rows 63–65:
  - **`the small-group Benagil speedboat tour`** → `/en/tours/benagil-caves-speed-boat-tour/` (PK 717720) — the primary CTA
  - **`a private Cranchi yacht trip`** → `/en/tours/cranchi-yacht-cruise-to-the-benagil-caves/` (PK 720028)
  - **`the sail-yacht cruise`** → `/en/tours/luxury-sail-yacht-cruise/` (PK 717754)
- This is the conversion section. Do NOT write booking copy here ("Book now! Limited availability!") — that belongs on the FH-embed tour pages. The pillar's job is the honest comparison; the reader self-routes.

### H2 #7 — "Benagil vs the Other Algarve Sea Caves"

- Word count: ~200–250 words.
- **Answer paragraph (40–60w):** "Benagil is the most famous, but it's one of dozens of sea caves along this coastline. Praia da Marinha has the photographed double-arch; Carvalho has the more dramatic cliff colour; the Ria de Alvor caves are quieter and have the bird life. A good tour passes several on the same route."
- Depth: 4 short lines — Benagil (the headline), Marinha (the arches), Carvalho (the yellow cliffs), Alvor (the quiet alternative + birdlife).
- **Punt to CL5:** end of section. Anchor text exactly: **`how Benagil compares to Marinha and the rest`** (CSV row 4). Target slug: `benagil-vs-other-sea-caves-algarve`.

### H2 #8 — "What You'll See on the Way: Dolphins, Coast, Marine Life"

- Word count: ~200–250 words.
- **Answer paragraph (40–60w):** "Common dolphins are the most-spotted species on the route — pods of 20–80 are not unusual from June through September, and we see them on roughly 70% of summer trips. Bottlenose dolphins are rarer but unmistakable. The wider coast hosts seabirds, octopus in the shallows, and the occasional ocean sunfish."
- Depth: 2 paragraphs — what's likely (dolphins, seabirds), what's possible (sunfish, octopus, the rare turtle). Be honest about the "no guarantee" framing — operators that promise dolphins are lying.
- **Punt to CL6 and CL7:**
  - **`dolphin watching off this coast`** (CSV row 5) → `dolphin-watching-algarve-species-seasons` (CL6)
  - **`the wider marine life you might see`** (CSV row 6) → `marine-life-algarve-coast-spotters-guide` (CL7)
- Entities: `common dolphin (Delphinus delphis)`, `bottlenose dolphin`, `Ria de Alvor`, `Algarve coast`. Naming species in Latin once is an AEO entity-coverage signal.

### H2 #9 — "What to Bring"

- Word count: ~150–180 words.
- **Answer paragraph (40–60w):** "Pack like a beach day with extra wind protection: swimwear, a quick-dry towel, reef-safe sunscreen, a waterproof phone pouch, secured sandals or water shoes, and a light windbreaker for the speedboat. Leave loose hats, fragile sunglasses, and anything non-waterproof at the hotel."
- Depth: short bulleted list (5–7 items, one line each). The existing pillar already has this — keep most of it; tighten.
- **Punt to CL8:** end of section. Anchor text exactly: **`what to pack`** (CSV row 7). Target slug: `what-to-pack-algarve-boat-tour`. Phrasing: "If you want the full kit list and what we see guests get wrong, see [what to pack]."

### H2 #10 — "Visiting With Kids and Less Confident Swimmers" *(short — CL11 is Phase 2)*

- Word count: ~150–200 words.
- **Answer paragraph (40–60w):** "Speedboat trips to Benagil are usually fine for children aged 5+ and non-swimmers. Life jackets are provided and mandatory. Babies and toddlers depend on the operator; we take age 3 and up on the speedboat. Pregnancy and back issues are the main reasons we recommend the slower yacht instead."
- Depth: 2 short paragraphs — kids (age policy, life jackets, what they'll love), non-swimmers (the cave doesn't require swimming on a boat tour; swim-stop is optional).
- **Punt to CL11 (Phase 2):** anchor text exactly: **`visiting with kids`** (CSV row 11). Target slug: `benagil-cave-tour-with-kids`. Phrasing: "We're writing a dedicated family guide; if it's not yet linked here, the speedboat tour page has the current age policy." *(Writer note: if CL11 isn't published yet at draft time, leave the link as plain text with a TODO in a comment — the deploy script will catch the broken link.)*

### H2 #11 — "After the Tour: Where to Eat, the Other Side of the Coast" *(optional — judgment call)*

- Word count: ~150–200 words.
- **Answer paragraph (40–60w):** "Most morning tours land back at Portimão around midday — perfect timing for lunch. The fishing harbour has the freshest grilled fish; the cliffs at Algar Seco (a short drive east) are a quieter afternoon walk; Praia da Marinha is the photo-stop for the road home."
- Depth: 3 short tips — eat, walk, photograph.
- **Soft link to cuisine post:** anchor text **`what to eat afterwards`** (CSV row 14) → `portuguese-coastal-cuisine-algarve`.
- **Judgment call (flag for reviewer):** this H2 may push the word count over 4,000. If so, fold it into the closing as one paragraph rather than a full H2. The reader value is modest; cut if tight.

### H2 #12 — "Booking: Direct vs OTA, and What's Typically Included"

- Word count: ~200–250 words.
- **Answer paragraph (40–60w):** "Book direct with the operator. OTA listings (GetYourGuide, Viator, Civitatis) sell the same tours with a 20–25% commission baked into the price, and direct booking gives you better cancellation flexibility, the operator's WhatsApp for weather updates, and no third-party booking fee."
- Depth: 2 paragraphs — direct vs OTA framing (the honest stance the architecture doc names as a brand POV); what's usually included (boat, fuel, life jacket, insurance, sometimes a soft drink — sometimes a swim stop). Be honest about what's NOT included (transfers, food beyond a token drink, photos).
- This is the second commercial moment in the piece — link the speedboat tour page once more, plus the sail yacht and Cranchi. Reuse the CSV anchor texts from H2 #6 or vary them once.

### Closing — "Ready to See It in Person?"

- Word count: ~120–180 words.
- Intent-routed CTA paragraph, NOT a full H2 (or H2 with the title above — writer judgment).
- Three routes:
  - **Ready to book** → speedboat + Cranchi yacht (one link each)
  - **Still planning** → CL3 (best time), CL5 (which cave), CL1 (how to get there)
  - **Other questions** → the FAQ below
- Tone: warm, not pushy. "Have specific questions? Message us directly — we run these tours and will answer honestly, even if our schedule doesn't fit yours." (This line is in the current pillar — keep it.)

### FAQ — "Frequently Asked Questions"

- See §10 for the question list and shape. The visible block is rendered by the `FaqBlock` component from the `faqs:` frontmatter; the writer authors the Q&A pairs in the frontmatter, not as Markdown H2/H3s in the body.

---

## 7. The de-dup cut line (what stays vs what punts) — read this carefully

The biggest editorial risk in this rewrite is cannibalizing CL1, CL2, CL3 — three pieces whose only job is to own queries the pillar will be tempted to fully answer. **The pillar must stop short and depth-link.** Cut line:

| Facet | Pillar covers | Pillar PUNTS to | Pillar answer-paragraph length |
|---|---|---|---|
| What the cave is | Full | — | H2 #1 full |
| How to get inside (mechanics: 3 boat types) | Summary | **CL1** for departure-point comparison | H2 #2 ~250–300w |
| Can you swim in? | Yes/no headline + 2023 context | **CL2** for full rules breakdown | H2 #3 ~150–200w ONLY |
| Departure point (Portimão/Carvoeiro/Lagos/AdP) | 4-line summary | **CL1** for deep comparison | H2 #4 ~200–250w |
| Best time (season/day/tide) | 3-paragraph summary | **CL3** for month-by-month + tide tables | H2 #5 ~250w |
| Boat type comparison | Full (this is the conversion section) | tour pages | H2 #6 full |
| Other Algarve caves | 4-line summary | **CL5** for the full comparison + Alvor | H2 #7 ~200–250w |
| Dolphins + marine life | Summary | **CL6** + **CL7** | H2 #8 ~200–250w |
| What to pack | Short list | **CL8** for full kit + what people get wrong | H2 #9 ~150–180w |
| Kids / family | Summary | **CL11** (Phase 2) | H2 #10 ~150–200w |

**The 200-word rule for the swim section is load-bearing.** CL2 is the featured-snippet target; if the pillar gives the full rules breakdown, both pages compete and Google picks neither. Pillar wins the headline; CL2 wins the long-tail.

---

## 8. Entity coverage (AEO/GEO)

Entities the SERP top-10 mention that the writer must work into the piece naturally (not stuffed):

- **Place entities:** Algar de Benagil · Benagil (village) · Lagoa (parish) · Portimão · Carvoeiro · Lagos · Armação de Pêra · Praia da Marinha · Praia do Carvalho · Ria de Alvor · Ponta da Piedade · Algarve · EN125 · Porto Comercial de Portimão (where our boats depart — signposted *Ac. Porto Comercial de Portimão*)
- **Natural-history entities:** common dolphin (Delphinus delphis) · bottlenose dolphin · ocean sunfish · limestone cliffs · Atlantic Ocean
- **Practical entities:** the 2023 access rules / Portuguese authorities (cite the regulator if a clean source exists — see §11) · life jacket policy · sea-level arch · the skylight (algar)
- **Operator entity (you):** Atlantis Tours · Nuno Albino (skipper) · the speedboat tour, the Cranchi yacht, the sail yacht (each named once with the product link)
- **Date stamps:** title carries "in 2026"; the 2023 rules cited with the year; "we run these every summer" anchors the freshness. The Article schema will auto-emit `datePublished` and `dateModified` — make sure the frontmatter `date:` reflects the rewrite date so AI engines see fresh.

The entity-gap signal: the existing 1,060w pillar mentions ~6 place entities and 1 species. The rewrite should cover ~14 place entities and 3+ species, naturally distributed — this is the depth signal that lifts the piece above generic.

---

## 9. Internal link map (the inventory — every pillar→cluster link the piece must carry)

Pulled from `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` rows where source = pillar. Total: **13 cluster/satellite/standalone links + 3 commercial tour links = 16 in-body links.** Anchor text is exact-from-CSV (the CSV is the source of truth).

| # | Where in pillar | Anchor text | Target slug | Direction |
|---|---|---|---|---|
| 1 | H2 #2 closer | `getting to the Benagil cave` | `how-to-visit-benagil-cave` (NEW) | pillar→CL1 |
| 2 | H2 #3 closer | `the current rules on swimming into the cave` | `can-you-swim-benagil-cave` (NEW) | pillar→CL2 |
| 3 | H2 #5 closer | `the best time of year and day to visit` | `best-time-visit-benagil-caves` (EXPAND) | pillar→CL3 |
| 4 | H2 #7 closer | `how Benagil compares to Marinha and the rest` | `benagil-vs-other-sea-caves-algarve` | pillar→CL5 |
| 5 | H2 #8 | `dolphin watching off this coast` | `dolphin-watching-algarve-species-seasons` | pillar→CL6 |
| 6 | H2 #8 | `the wider marine life you might see` | `marine-life-algarve-coast-spotters-guide` | pillar→CL7 |
| 7 | H2 #9 closer | `what to pack` | `what-to-pack-algarve-boat-tour` | pillar→CL8 |
| 8 | H2 #5 lateral note | `a month-by-month look at Algarve boat-tour season` | `best-time-visit-algarve-boat-tours` | pillar→CL4 |
| 9 | H2 #5 lateral note (one of two) | `why spring is the smart pick` | `algarve-in-spring-best-kept-secret` | pillar→CL9 |
| 10 | Closing or H2 #6 sidebar | `a sunset cruise instead` | `sunset-cruises-algarve-summer-guide` | pillar→CL10 |
| 11 | H2 #10 closer | `visiting with kids` | `benagil-cave-tour-with-kids` (NEW, Phase 2) | pillar→CL11 |
| 12 | H2 #11 (optional) or closing | `a half-day reef fishing trip` | `reef-fishing-algarve-what-to-expect` | pillar→satellite |
| 13 | H2 #11 (optional) | `what to eat afterwards` | `portuguese-coastal-cuisine-algarve` | pillar→standalone |
| 14 | H2 #6 (primary CTA) + H2 #12 | `the small-group Benagil speedboat tour` | `/en/tours/benagil-caves-speed-boat-tour/` (PK 717720) | pillar→tour |
| 15 | H2 #6 | `a private Cranchi yacht trip` | `/en/tours/cranchi-yacht-cruise-to-the-benagil-caves/` (PK 720028) | pillar→tour |
| 16 | H2 #6 | `the sail-yacht cruise` | `/en/tours/luxury-sail-yacht-cruise/` (PK 717754) | pillar→tour |

**Anchor text discipline:** use the CSV anchors verbatim where possible. The CSV is editorial truth and the source of the quarterly link audit. If the writer wants to vary an anchor (because of sentence flow), the variant must be descriptive and natural-language (NOT "click here", NOT exact-keyword stuffing). Vary at most 1–2 anchors.

**Where NOT to put links:** do not stack 4+ links in a single paragraph; do not put a links-only "related reading" footer (the auto-generated `HubClusterList` component already does this); do not link to the same target twice in the same H2 section (CL1 is referenced from H2 #2 AND H2 #4 — that's fine, but use distinct anchor wording the second time).

---

## 10. FAQ section (frontmatter `faqs:`)

The writer authors these as `faqs:` in the frontmatter (YAML list of `{question, answer}` pairs). The site already wires both the visible `<details>` block AND the `FAQPage` JSON-LD from this field — no extra schema work needed.

**Target: 8–10 questions.** Each answer 40–80 words (citation-ready, complete-sentence answers; do NOT trail off with "see our full guide for more"). Brief sketches the questions + one-sentence answer recommendations; the writer expands.

1. **"Can you swim into the Benagil cave?"** — No. Since 2023, swimming into the cave from a boat tour or unsupervised from the beach is restricted; you reach the cave by small boat, kayak, SUP, or guided swim tour. *(Repeats H2 #3's headline answer — deliberate, because AI engines lift FAQ items independently.)*
2. **"How do you get to the Benagil cave?"** — By small boat from Portimão (most common), Carvoeiro (closest), Lagos (longer scenic route), or Armação de Pêra (quietest). You cannot walk to the cave interior; foot access is restricted to the clifftop viewpoint above.
3. **"How long does a Benagil cave tour take?"** — A standard small-group speedboat from Portimão runs 1.5–2 hours, including the cave and the surrounding coast (Marinha, Carvalho). Kayak tours are 2.5–3 hours. Private yacht days are 4 hours+.
4. **"How much does a Benagil cave tour cost?"** — Group speedboat tours typically run €20–35 per person; private yacht charters start in the low hundreds and scale with boat size and duration. Prices drift season to season — check the booking page for current rates.
5. **"When is the best time to visit Benagil cave?"** — Late May, June, and September deliver warm seas, fewer boats, and reliable weather. For the sun-beam through the skylight, aim for 10:00–13:00; for the emptiest cave, take the earliest departure of the day.
6. **"Is the Benagil cave tour suitable for children?"** — Yes for most operators, from around age 3–5 depending on boat type. Life jackets are provided and mandatory. Speedboats are bouncy; the slower yacht is gentler for very young children, pregnant guests, or back issues.
7. **"What happens if the sea is too rough?"** — Tours are cancelled when swell exceeds roughly 1.5 metres. Good operators offer full refunds or rescheduling — confirm the policy when you book. November–March cancellations are common; May–September are rare.
8. **"Is Benagil cave worth visiting?"** — Yes, but pair it with the surrounding coast. A 30-minute in-and-out cave visit is a 5-minute photo and 25 minutes of boat; the trips guests remember pair the cave with Marinha, Carvalho, and a swim stop in a quiet bay.
9. **"Can you visit Benagil cave in winter?"** — Some operators run on calm days, but Atlantic swell often closes the cave for weeks between November and March. If you're travelling in winter, keep flexible dates and book the morning of, not weeks ahead.
10. **"Should I book direct or through Viator/GetYourGuide?"** — Book direct. OTAs add a 20–25% commission; direct booking gives you the operator's WhatsApp for weather updates, faster rescheduling, and no third-party fees. The tour is identical either way.

(8 is the floor, 10 is the ceiling. Cut #9 or #11-equivalent if the FAQ feels long.)

---

## 11. External links (sparse and authoritative)

Cap at **2–3 external links**. The pillar links DOWN to clusters and ACROSS to its own tour pages; external links should reinforce E-E-A-T, not leak link equity.

Recommended:
- **One link** to a regulatory source for the 2023 access rules — ideally the Capitania do Porto de Portimão (the port captain who issued the rule) or a Lagoa municipal source if findable. If no clean Portuguese-government URL exists, link to a reputable news source covering the rule change (Público, Sul Informação). Writer's call which of the two; do not link to a tourism aggregator's coverage.
- **One link** to Visit Portugal / Visit Algarve's Benagil page (the official tourism authority) — anchored in the intro or H2 #1 as a "the regulator and tourism board acknowledge what we describe here" signal.
- **(Optional)** One link to a scientific/marine-biology source if a specific dolphin or geology claim merits citation — only if a clean source exists.

**Do NOT link to:**
- Competitor operators (carvoeirocaves, benagilexpress, algarveexperience, dreamwave, royalnautic, etc.) — the architecture doc names these as the real organic rivals. No favours.
- OTAs (Viator, GetYourGuide, Civitatis) — even when criticising them in H2 #12. Name them in text without linking.
- Wikipedia — fine in principle but no specific claim in this piece really needs Wikipedia as the citation; better to link the regulator and the tourism board.

---

## 12. Schema

The site's existing pipeline handles all of this — the writer does not author any JSON-LD manually.

- **`Article`** schema: auto-emitted by `blog/[slug].astro` from frontmatter. Make sure `date:` and (if you add it) a `dateModified:` reflect this rewrite. The byline change (`author: Nuno Albino`) flows into `Article.author` automatically.
- **`FAQPage`** schema: auto-emitted when `faqs:` frontmatter is set. The `faqs:` block in §10 is what lights this up.
- **`BreadcrumbList`** schema: auto-emitted via `buildPostBreadcrumb()` — produces `Home › Blog › Benagil Cave Tour: Everything You Need to Know in 2026` for the pillar (the pillar's breadcrumb is `Home › Blog › <pillar>`, not nested under itself).
- **No `Person` author schema** is wired today — the `Nuno Albino` byline goes in as a string and shows up in the Article schema. A future TODO is adding `Person` schema with `sameAs` links to the skipper's professional profile; out of scope for this rewrite.
- **No `TouristAttraction`/`Place` schema** for Algar de Benagil yet. Architecture §5a lists it as optional/future. Out of scope for this rewrite.

---

## 13. Anti-patterns — what the writer must NOT do

### Editorial / SEO anti-patterns

- **Do NOT compete with CL1's queries.** The pillar summarises departure-point comparison; CL1 owns "how to visit benagil cave", "benagil from portimão", "how to get to benagil". Cut line in §7.
- **Do NOT compete with CL2's queries.** The pillar gives the headline yes/no answer in ~200 words; CL2 owns "benagil cave rules 2023", "is it legal to swim into benagil", "benagil swim restrictions". The 200-word ceiling for H2 #3 is hard.
- **Do NOT compete with CL3's queries.** The pillar gives a 3-paragraph summary; CL3 owns the month-by-month detail and tide tables.
- **Do NOT write booking copy.** "Book now! Limited slots! Best price guaranteed!" belongs on the FareHarbor-embed tour pages, not in the pillar. The pillar earns the click with honest depth; the tour page closes the booking.
- **Do NOT quote specific tour prices.** "€25 per adult on Tuesday in July" drifts and dates the piece in 3 months. Bands only ("€20–35 group speedboat"); let the booking page be the source of truth.
- **Do NOT write a links-only "related reading" footer.** The `HubClusterList` ("In this guide") component is already rendered on the page from frontmatter; the in-body links specified in §9 are the editorial layer.
- **Do NOT add affiliate/OTA links** anywhere in the piece.

### Voice / AI-fluff anti-patterns

The do-not-use list:

- **Throat-clearing openers:** "In today's fast-paced world", "Whether you're a seasoned traveller or a first-timer", "Let's dive in", "Buckle up", "Look no further", "Picture this", "Imagine yourself".
- **Corporate-speak adjectives:** elevate, leverage, unlock, robust, seamless, unparalleled, world-class, premier, cutting-edge, state-of-the-art, immersive, transformative, ultimate (in titles or hero).
- **AI-tell sentence openers:** "When it comes to …", "It's important to note that …", "It's worth noting that …", "Not only … but also …", "In conclusion".
- **Rhetorical-question H2s:** "So what makes Benagil so special?" / "Ready to experience the magic?". H2s should be the questions the reader actually has ("Can you still swim into the Benagil cave?"), not framing questions for the writer.
- **Repetitive H2 structure:** do not start more than 3 H2s with the same word ("How to …", "How to …", "How to …" is a generation signal).
- **"In conclusion" / "To sum up" / "All in all"** as closing-paragraph openers.
- **Em-dashes used as commas in every other sentence** — the existing pillar uses em-dashes well; do not over-correct, but do not stack 3 per paragraph either.

### Structural anti-patterns

- **Do NOT bury the lede.** H2 #3 (the swim question) must come early because it's the single most-asked question. The current ordering puts it third — keep that.
- **Do NOT let any H2 run shorter than ~120 words.** A 60-word H2 reads as a placeholder. Either expand or fold into the adjacent section.
- **Do NOT let any H2 run longer than ~400 words.** If a section wants to be longer, it probably wants to be its own cluster piece — flag it for §15 (open questions).
- **Do NOT add H3s for the sake of structure.** H3s only if they aid navigation (e.g., under H2 #6 the four boat types could be H3s; everywhere else, paragraphs suffice).

---

## 14. Acceptance criteria (reviewer checklist)

The reviewer will check the draft against these — every "no" is a revision request.

1. ☐ Total word count: 3,000–4,000 (target ~3,500). Verified by `wc -w` on the body (excluding frontmatter).
2. ☐ Byline is `Nuno Albino`. Voice is skipper-led, first-person plural where natural, opinionated but factual.
3. ☐ Title contains "2026". TL;DR mentions the 2023 access rules. `date:` frontmatter reflects the rewrite date.
4. ☐ TL;DR section is 150–250 words, bulleted (5–8 lines), citation-ready as a standalone block.
5. ☐ 10–12 H2 sections. Every H2 has a 40–60-word answer paragraph directly under the heading.
6. ☐ H2 #3 ("Can you still swim …") is 150–200 words ONLY — does NOT expand into the full rules breakdown.
7. ☐ The de-dup cut line (§7) is respected — CL1/CL2/CL3 facets are summarised and depth-linked, not duplicated.
8. ☐ All 13 cluster/satellite/standalone links from §9 are present, with the CSV-specified anchor text (or a natural variant for at most 1–2).
9. ☐ All 3 commercial tour links (speedboat, Cranchi, sail yacht) are present in H2 #6.
10. ☐ Skylight, "in 2026", "2023 rules", and 4+ place entities (Portimão, Carvoeiro, Lagos, Marinha, Carvalho, Alvor, etc.) appear naturally in the body.
11. ☐ `faqs:` frontmatter has 8–10 Q&A pairs, each answer 40–80 words, citation-ready.
12. ☐ External links: 2–3 only, to authoritative sources (regulator + tourism authority). No competitor links, no OTA links.
13. ☐ No anti-pattern phrases from §13. (Spot-check: search the draft for "elevate", "unlock", "let's dive in", "in today's fast-paced", "buckle up", "look no further" — must return zero hits.)
14. ☐ No quoted specific tour prices. Bands only.
15. ☐ Builds cleanly: `pnpm --filter atlantis run build` succeeds and the rendered page shows the breadcrumb (`Home › Blog › Benagil Cave Tour…`), the FAQ block, and the pillar's "In this guide" component listing the clusters.

---

## 15. Open questions / judgment calls (flag for reviewer before draft starts)

1. **H2 #11 ("After the Tour")** — is it worth the ~200 words it costs us? It links the cuisine post + the reef-fishing satellite (both desired per the CSV), but the cuts could happen in H2 #6 (boat types) or H2 #12 (booking) instead. Reviewer call: keep H2 #11 as a short section, OR cut it and route the cuisine + fishing links into the closing paragraph. *Default if no answer: keep it, short.*
2. **CL11 link in H2 #10** — CL11 ("with kids") is Phase 2 and likely not published when the pillar ships. Do we (a) put the link in with a TODO comment so deploy catches the 404, (b) leave it as plain text "we're writing a dedicated family guide", or (c) cut H2 #10 down to one paragraph in H2 #6 ("which boat for which crowd") until CL11 lands? *Default: option (b) — plain text mention, no link, fold in the CL11 anchor when CL11 ships in Phase 2.*
3. **External link to the 2023 rule source** — is there a clean Portuguese-government URL for the Capitania do Porto de Portimão notice, or is a news source the realistic option? *Worth 10 minutes of `WebSearch` time before drafting; if no clean source exists, drop to one external link (tourism authority only).*
4. **Skylight dimensions** — the current pillar doesn't give specific numbers. The architecture doc (§5a) flags "the skylight dimensions/geology" as a citation-worthy fact. Is there a vetted source for the actual diameter of the opening? *If yes, cite it. If not, drop the specific-dimensions fact and keep the description qualitative ("a near-perfect circular hole").*
5. **Title — keep "in 2026" or shift to "the 2026 update"?** The current title format ("Benagil Cave Tour: Everything You Need to Know in 2026") is the strongest version per the keyword map (catches `benagil cave 2026`). The alternative ("The Benagil Cave Tour: A 2026 Guide") reads cleaner but loses the long-tail catch. *Default: keep the current format.*
6. **Cranchi yacht — does it fit through the cave arch or anchor outside?** The current pillar says "large yachts cannot enter the cave"; the Cranchi is a 38ft motor yacht — the writer should verify with the operator (the user) before publishing the comparison in H2 #6. *Action: writer asks reviewer in the brief-acknowledgement step.*

---

*End of brief. The writer should ack this brief, raise the open questions in §15, and then draft. The reviewer reviews against §14.*

---

## 16. Reviewer addendum — resolved open questions + verified external facts (2026-05-13)

Resolved after the reviewer + operator pass:

- **§15 #1 (H2 #11 "After the Tour"):** ✅ KEEP. Operator confirmed. Target 150–200w.
- **§15 #2 (CL11 link in H2 #10):** ✅ Plain-text mention, no link until CL11 ships in Phase 2.
- **§15 #3 (External link for 2023 rules):** ✅ Resolved — use `https://www.sulinformacao.pt/en/2024/05/edital-com-as-regras-de-navegacao-nas-grutas-de-benagil-esta-em-consulta-publica/` (Sul Informação's English-language coverage of the public consultation on the official navigation rules — closest clean source to the Capitania do Porto notice itself). Cite once in H2 #3.
- **§15 #4 (Skylight dimensions):** ❌ No clean source found across 10 SERP results. Keep qualitative ("a near-perfect circular hole", "the oculus"). Do NOT cite a specific diameter — too easy to fact-check wrong.
- **§15 #5 (Title format):** ✅ Keep "in 2026" — catches the `benagil cave 2026` long-tail.
- **§15 #6 (Cranchi yacht enters cave):** ✅ Operator confirmed — the Cranchi 38ft motor yacht clears the ~2.5m arch and enters the cave. The sail yacht (PK 717754) does NOT enter and anchors outside. H2 #2 and H2 #6 answer paragraphs updated to reflect this. (Edits already applied above.)

**Byline:** ✅ `Nuno Albino` confirmed by operator as a real skipper. Use as-written.

**Verified external facts the writer can cite confidently:**

- **2023 rule effective date:** September 10, 2023.
- **Authority that issued it:** Capitania do Porto de Portimão (Captain of the Port of Portimão). Captain at the time was **Eduardo Luis Pousadas Godinho, Capitão-de-Fragata**. The writer can name the office without naming the individual; either is correct.
- **Rule content:** swimming into the cave from a boat tour is prohibited; unsupervised swimming from Benagil beach to the cave is restricted; kayak/SUP rentals from Vale Centeanes, Carvalho, Barranquinho, Albandeira, and Barranco require 1 guide kayak per 5 rented craft. Motor-boat access to the cave interior remains permitted.
- **Subsequent update:** further refinements to the navigation rules went to public consultation in May 2024 (Sul Informação coverage).
- **Cave geology:** Miocene limestone, layers formed approximately 20 million years ago. Karst landscape (rainwater + carbon dioxide dissolves calcium carbonate). The skylight is a **roof-collapse feature** — water eroded the limestone from beneath, the roof weakened, and the collapse exposed the chamber to the sky. The Portuguese geological term **algar** literally means "natural well" / "shaft" — this is the precise term to use once in italics in H2 #1 as an entity signal.
- **Skylight terminology:** "skylight" (most common in English-language coverage), "oculus" (used by geology/architecture sources), "the eye to heaven" (folk name in some sources — usable once if the writer wants a touch of colour, but not in the answer paragraph).

**Recommended external links (final list, capped at 3):**

1. **Sul Informação (English):** `https://www.sulinformacao.pt/en/2024/05/edital-com-as-regras-de-navegacao-nas-grutas-de-benagil-esta-em-consulta-publica/` — anchor in H2 #3, anchor text like "the official navigation rules". Cleanest available source for the rule change.
2. **Visit Algarve official:** if a clean Benagil page exists on `visitalgarve.pt`, link from the intro or H2 #1. (Writer can WebSearch to confirm the URL before drafting; if no clean page, drop this link.)
3. **(Optional) Geology source:** `https://geologyscience.com/gallery/geological-wonders/benagil-sea-cave-portugal/` if the writer wants a citation for the "Miocene limestone, ~20 million years" claim. Skip if the H2 #1 geology paragraph is concise enough that a citation is overkill.

Sources used in this addendum:
- [Sul Informação coverage of the navigation rules consultation](https://www.sulinformacao.pt/en/2024/05/edital-com-as-regras-de-navegacao-nas-grutas-de-benagil-esta-em-consulta-publica/)
- [Algarve Beauties — Benagil Cave Access Restricted](https://algarvebeauties.com/benagil-cave-access-restricted/)
- [Geology Science — Benagil Sea Cave](https://geologyscience.com/gallery/geological-wonders/benagil-sea-cave-portugal/)
- [Earth Trekkers — Benagil 2026 New Rules](https://www.earthtrekkers.com/benagil-cave/)

