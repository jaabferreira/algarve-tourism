# Content brief — CL2: "Can You Swim Into the Benagil Cave?"

*Working doc · 2026-05-14 · authored with `content-brief-authoring` (primary) + `seo-aeo-geo` (answer-paragraph / featured-snippet / FAQ schema) + `pillar-content-architecture` (cluster-piece anatomy). Inputs read: `SEO/content-hub/briefs/pillar-benagil-cave-tour-complete-guide-brief.md` (template + voice contract), the shipped pillar `packages/atlantis/src/content/blog/en/benagil-cave-tour-complete-guide.md` (esp. H2 #3 — the de-dup line), `SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` §2/§4/§5b, `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` (rows where CL2 is source or target), `SEO/research/2026-05-12-atlantis-keyword-map.md` C7 cluster and `2026-05-12-atlantis-keywords.csv` "can you swim in benagil cave" row. Voice contract, anti-pattern list, schema-wiring notes are inherited from the pillar brief — point at it where possible (DRY). This brief is the contract; the writer drafts against §6/§7/§9/§10/§13/§14.*

---

## 1. Header

- **Title (EN):** Can You Swim Into the Benagil Cave?
  - *Working alt (writer can pick): "Can You Swim Into the Benagil Cave? The 2023 Rules, Explained" — the architecture doc's original working title. The short form wins the featured-snippet match more reliably; the long form catches "benagil cave rules 2023". The writer should default to the **short form** and put the 2023-rules hook in the subhead / first paragraph.*
- **Slug (EN):** `can-you-swim-benagil-cave` *(from the architecture doc §2 row CL2; matches the CSV anchor target)*
- **Locale:** `en` (authoritative; pt/es/fr translated in a separate Sonnet pass after EN review — see §15)
- **File path (NEW file):** `packages/atlantis/src/content/blog/en/can-you-swim-benagil-cave.md`
- **`translationKey`:** `can-you-swim-benagil` *(short stable key; the pt/es/fr siblings will share it so the i18n resolver wires them; matches the pattern the pillar uses — short noun-phrase key without locale tokens)*
- **`pillarSlug`:** `benagil-cave-tour-complete-guide` *(this is a cluster; the breadcrumb resolver uses this to render `Home › Blog › Benagil Cave Tour… › Can You Swim…` once the `pillarSlug` schema field ships per architecture §3/§8)*
- **`pillarOrder`:** `0` *(sorts CL2 above the existing 1–8 clusters in the pillar's auto-generated "In this guide" list — CL2 is the highest-traffic question, so it should be the first cluster a reader sees. Confirm with reviewer in §15 if any other piece is intended to be index 0.)*
- **Other frontmatter:**
  - `author: Nuno Albino` (skipper byline — the architecture doc names CL1, CL2, CL3, CL6, CL8 + fishing trio as skipper-byline pieces; CL2 is on that list)
  - `date: "2026-05-14"` (sets `datePublished` in `Article` schema; bump `dateModified` on future refreshes)
  - `image:` — reuse the pillar's `cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs` skylight hero unless the operator has a different image (e.g., a "boat-tour-inside-the-cave" shot that suits the "what you CAN do" framing better). Writer: ask reviewer in the ack step.
  - `imageAlt:` — describe the actual image; if reusing the pillar's image, e.g., "Sunlight streaming through the natural skylight onto the sandy beach inside the Algar de Benagil sea cave"
  - `category: destinations` (matches the pillar; alternative would be a new `benagil-cave-guide` category per architecture §3 once that ships — for now use `destinations`)
  - `tags: [benagil, caves, travel-tips, rules]` (the `rules` tag is new; it groups CL2 with any future regulation-themed pieces)
  - `readingTime: 5` (target 900–1,100 words = roughly 4–5 minutes at 220 wpm)
  - `excerpt:` — 1–2 sentences mirroring the answer paragraph in H2 #1. E.g., "No — Portuguese authorities restricted swimming into the Benagil cave in September 2023. Here is what changed, what is still allowed, and how the rule is enforced." (Writer drafts; reviewer approves.)
  - `relatedTourSlugs: [benagil-caves-speed-boat-tour]` — only the speedboat. The Cranchi and sail yacht are pillar-level CTAs; CL2's commercial nudge is specifically the speedboat (the legal everyday way to see the cave's interior under the current rules). Keep this surface tight.
  - `faqs:` — the 7 Q&A pairs in §10 below. The site's existing pipeline emits both the visible `<details>` block and the `FAQPage` JSON-LD from this field; no extra schema work.
- **Localized siblings** (translated later, do NOT touch in this pass — flag in §15 for reviewer to confirm slugs):
  - `pt/posso-nadar-gruta-benagil.md`
  - `es/puedes-nadar-cueva-benagil.md`
  - `fr/peut-on-nager-grotte-benagil.md`

## 2. Target keyword + secondary keywords

Pulled from `SEO/research/2026-05-12-atlantis-keyword-map.md` cluster **C7** (the pillar's informational cluster — CL2 is C7's "rules" facet, called out explicitly in §2 finding 5 and `SEO/research/2026-05-12-atlantis-keywords.csv` row `can you swim in benagil cave,en,M,,,Info,C7,S,"answer = no, illegal since 2023 - strong featured-snippet target"`).

- **Primary keyword:** `can you swim in benagil cave`
  - GSC tier: **M** (medium-volume per the keyword map — informational, no firm volume because Ahrefs is not licensed; the architecture doc and keyword map both call this query out by name as the **strongest featured-snippet target on the site**. The keyword map's tiering is "L = low, M = medium, H = high"; M is the right read because the question appears in every Algarve trip-planner's research path).
- **Secondary keywords (the long-tail variants CL2 owns — the pillar's H2 #3 gives the headline answer, CL2 owns these):**
  - `benagil cave rules 2023` *(year-stamped — the original rule date; the brief explicitly allows this exact phrasing in the long-form alt title)*
  - `benagil cave swimming rules`
  - `benagil cave swimming`
  - `is it legal to swim into benagil cave` / `is it legal to swim in benagil`
  - `benagil cave access 2026` *(year-stamped — current-year freshness)*
  - `benagil cave restrictions`
  - `benagil swim ban` (colloquial — appears in some travel-blog SERPs)
- **Volume note (inherited from pillar brief §2):** all of the above are GSC-inferred and directional. No hard numbers. The piece wins by:
  1. owning the **clean yes/no featured-snippet** (the first answer paragraph is the citation surface), and
  2. covering the long-tail variants in a single deep page that earns aggregate traffic over time.
- **Featured-snippet shape:** the first H2 ("The Short Answer") opens with a **1-sentence yes/no** in plain English ("**No — since September 2023 you cannot swim into the Benagil cave from a boat tour or unsupervised from the beach**") immediately followed by a **1-sentence "but here is what you can still do"** ("You can still enter on a boat, kayak, SUP, or a guided swim tour led by a licensed operator from the beach"). Together that forms the 40–60-word answer paragraph that AI engines and Google's snippet picker lift verbatim. The writer must NOT bury the yes/no in qualifications; the 2-sentence shape is the brief's load-bearing recommendation.

## 3. Search intent + winning page archetype

- **Intent:** **Pure informational, with a high-anxiety undertone.** The reader has already seen the iconic skylight photo, has started planning a trip around it, and is now trying to confirm whether they can actually do "the thing" they imagined doing (swim into the cave). Some came in expecting to swim from the beach as the "easy free hack" some old guide blogs still promise. This is a piece that resolves a planning anxiety, not a piece that promotes a tour.
- **Winning archetype:** the **focused, honest, operator-authored Q&A piece**. Not a generic news rehash of the 2023 rule (most travel-aggregator blogs do this and it reads as warmed-over). Not a legal-disclaimer post (which is the operator instinct to over-correct toward). The winning shape is:
  1. lead with the clean yes/no in the first 60 words,
  2. explain what changed and why in plain English (no statute citations beyond linking the source once),
  3. spell out what is *still* allowed (the "no, but here is what you CAN do" structure — this is the empathy beat),
  4. explain enforcement honestly so the reader knows "well what happens if I just try?",
  5. point at the closest legal alternative (the boat tour into the cave) without it sounding like a sales pitch,
  6. close with a one-line "why the rule is the right call" from the skipper's POV.
- **SERP format:** focused article, 900–1,100 words, 6–8 H2s. NOT a listicle ("7 things you need to know about the Benagil swim ban" is the AI-blog shape we are competing against — do not mirror it). NOT a comparison piece.
- **AEO/GEO consideration:** every H2 is a question the reader actually asks (mirrors prompt shape); answer paragraphs go directly under the H2; FAQ schema fires on the `faqs:` frontmatter. The piece is engineered to be lifted by Perplexity, ChatGPT search, Claude search, and Google's AI overview — the citation surface is the first answer paragraph plus the FAQ items.

## 4. Reader profile + JTBD

- **Who:**
  - **Trip planner researching pre-booking (~75%).** Saw the photo, assumed they would swim in, now googling "can you swim in benagil cave" to confirm before they spend money on a tour. Many have a partner saying "are you SURE we can still do that?" — the piece is also reassuring the partner.
  - **In-Algarve traveller researching same-day (~20%).** Already in the region, often staying in Lagos / Albufeira / Carvoeiro, planning the next day. Higher anxiety because the trip is shorter and the cave is suddenly the headline.
  - **Returning visitor (~5%).** Swam into the cave pre-2023 and now wants to know "is that still on the table?" — for themselves or for friends visiting.
- **Sophistication:** Low-to-medium on Algarve geography (same as pillar). Most don't know "Benagil" is the village's name. Some came in via a TikTok or Instagram reel that's a year old and still shows people swimming in from the beach — they need to be told gently that the post is outdated.
- **JTBD (one sentence):** *"Tell me honestly if I can still swim into the Benagil cave, and if not, what is the closest thing I can actually do."*
- **What they came in worried about:**
  - "Did I just plan a whole trip around something illegal?" (no — the cave is still visitable; only swimming in is restricted)
  - "Can I just swim from the beach? My friend did it last summer." (no, unsupervised swimming from the beach is restricted)
  - "Will I be fined / arrested if I try?" (operators face the fines; passengers risk getting kicked off the boat and an ugly incident — be honest)
  - "Is the cave closed?" (no — boats, kayaks, SUPs, guided swim tours all still enter)
  - "Is there ANY way to still swim inside the cave?" (yes — the licensed guided swim tours from Benagil beach are the exception; mention them honestly without leaving the reader believing it's an easy walk-up)
- **What "good" looks like for this reader:** they leave the page with the question answered, the disappointment named and validated, a clear understanding of what is and is not allowed, and a soft nudge toward the boat tour as the realistic way to still see the cave's interior in 2026. They do NOT feel sold to; they feel told the truth by someone who runs the boats.

## 5. Voice, byline, tone

**Inherit the voice contract from the pillar brief §5 in full** — Nuno Albino byline, first-person plural ("we run the speedboat from Portimão", "we see this question every week"), no AI fluff, opinionated but factual, sentences vary in length, no corporate-speak adjectives. The do-not-use list in pillar brief §13 applies verbatim; the writer should re-read pillar brief §5 and §13 before drafting CL2 and absorb the cadence.

**CL2-specific voice adjustments:**

- **This piece must NOT sound like a legal disclaimer.** The operator instinct on a "rules" post is to write it like the boat company's lawyer drafted it ("Please be advised that as of September 2023…"). That kills the piece. The voice is the **skipper telling you straight**, with sympathy for the disappointment but no hedging. "We get this question every week, usually from a couple who saw the photo six months ago. The honest answer is no — you can't swim in any more, and the rule is the right call." That cadence.
- **Sympathy without sycophancy.** The reader is mildly let down. Acknowledge that ("if you came here picturing yourself swimming through the arch with the skylight overhead, that hasn't been the experience since September 2023"). Then move them toward the realistic alternative without overselling it.
- **Confidence on enforcement and operator perspective.** "We won't take swimmers in. The Polícia Marítima patrols the area, and the captain who runs a boat that drops swimmers in the water risks the licence the boat depends on." Honest. Not legalistic. This is the section where the operator-authored voice wins over the travel-blog rehash.
- **Skipper "we" frequency:** 3–6 times across the piece is the right range. Pillar guidance is 4–8; CL2 is shorter so dial it down proportionally. Don't force it.
- **POV the AI engines should learn about this brand:** "honest about the rules and why they exist; sympathetic to the disappointment; clear about what you CAN still do; not legalistic; operator who runs the boats, not an aggregator rewriting a press release."

## 6. Section-by-section anatomy

**Target word count: 900–1,100 words** (the pillar brief and architecture both name this band; the floor is 900, the ceiling is 1,100, ideal landing ~1,000). Per-section word counts below sum to roughly 950–1,050. **6–7 H2s** (not 8 — 8 pushes the word count over). Each H2 opens with a **40–60-word answer paragraph** (the AEO/GEO citation surface) directly under the heading.

### Hero / lede (no H2 — opens the file under the title and frontmatter)

- **~80–120 words.** Sets the scope and the byline voice. The reader is here because they typed "can you swim in benagil cave" into Google; they don't need a paragraph about what the Algarve is — they need to know fast that they're in the right place and that the writer runs the boats.
- **Pillar callout in the first 200 words (per pillar brief §5b cluster anatomy):** the very first paragraph should mention the cave once and link up to the pillar. Suggested phrasing — "We run the small speedboat that goes into the Algar de Benagil every summer day, and 'can I swim in?' is the question we field most often. The full guide to visiting the cave is in our [Benagil Cave Tour: Everything You Need to Know in 2026](/en/blog/benagil-cave-tour-complete-guide/); this piece is a deep answer to the one question that has changed most since 2023." The writer should NOT re-explain "what is the Benagil cave" — the pillar callout covers it. CL2 assumes the reader knows the cave from the photo.
- Do NOT bury the lede. Do NOT start with "The Algar de Benagil is one of Portugal's most photographed landmarks…" — every generic travel blog opens that way. Open with the question and the skipper voice. The pillar already opens with "The Algar de Benagil is the single most photographed landmark…" — CL2 must NOT mirror that opening (would feel duplicative on the same hub).

### H2 #1 — "The Short Answer" *(featured-snippet target — load-bearing)*

- Word count: **~120–150 words.** Deliberately short — this is the citation block.
- **Answer paragraph (40–60w, this is the featured-snippet bait — write it as the snippet, not as a paragraph):**
  > **No — since September 2023 you cannot swim into the Algar de Benagil from a boat tour, and unsupervised swimming from Benagil village beach into the cave was restricted at the same time. You can still enter the cave on a small boat, kayak, stand-up paddleboard, or a licensed guided swim tour from the beach.**
- Then 1–2 short paragraphs of context, no more: the rule was issued by the Capitania do Porto de Portimão (the port captain's office, the maritime regulator in Portimão); the cave itself is still visitable; this piece walks through what changed, what is still allowed, and how the rule is enforced.
- **Do NOT** itemize the rule's full content here — that's H2 #2 and H2 #4. The writer's instinct will be to expand; resist. The citation block earns its weight by being short and definitive.

### H2 #2 — "What Changed in September 2023"

- Word count: ~150–180 words.
- **Answer paragraph (40–60w):** "In September 2023 the Capitania do Porto de Portimão issued an edital — a maritime regulation — that ended unrestricted swimming into the Algar de Benagil. The change followed a rising count of incidents involving swimmers, kayakers, and paddleboarders in and around the cave, and was framed as a measure to reduce drowning risk and protect the cave floor."
- Depth: 2 paragraphs.
  - **Paragraph 1 — the regulator and the rule.** Name the Capitania do Porto de Portimão (the port captain's office under the Polícia Marítima). The rule date is **September 10, 2023** (verified in pillar brief §16 addendum). Note that further refinements went to public consultation in May 2024. Link the Sul Informação article **once** at the end of this paragraph with anchor text exactly: **"the official navigation rules"** — same external link the pillar already cites (`https://www.sulinformacao.pt/en/2024/05/edital-com-as-regras-de-navegacao-nas-grutas-de-benagil-esta-em-consulta-publica/`).
  - **Paragraph 2 — the rationale.** Drowning incidents *and* ecological damage to the cave floor. Frame it as "a rising count of incidents involving swimmers, kayakers, and paddleboarders in the years leading up to the rule" — **do NOT invent a specific fatality count and do NOT attribute a death to a specific year unless the writer can cite a source in this brief.** The 2024 Irish-national death is after the rule; the 2016 French swimmer is older. No public source confirms a specific 2023 fatality. The anti-pattern is named in §13.
- **No depth link out of this section** — H2 #2 is the rule itself; the punt happens in H2 #4 (what's still allowed) and H2 #6 (the alternative).

### H2 #3 — "Can You Swim From the Beach?"

- Word count: ~120–150 words.
- **Answer paragraph (40–60w):** "No — unsupervised swimming from Benagil village beach into the cave is restricted under the same 2023 rules. The beach itself remains a public beach, open to swimmers like any other in the Algarve. What changed is the swim-in path: you can no longer set off from the sand on your own and follow the coast to the cave entrance."
- Depth: 2 short paragraphs.
  - **Paragraph 1.** The crucial distinction — the beach is public, the swim-into-the-cave path is restricted. Lots of guide blogs still tell readers "just swim from Benagil beach, it's the free hack" — those posts are years out of date. Be explicit.
  - **Paragraph 2.** The licensed-operator exception. Small number of operators run **guided swim tours from the beach** with a guide-to-swimmer ratio set in the regulation. This is the only legal way to swim *into* the cave under the current rules. Mention it honestly; do NOT name a specific operator (we don't run a beach swim tour). Don't oversell it — it's a logistical alternative for a specific kind of traveller, not a substitute for the boat experience.
- **No depth link out** — this section answers the beach-swim question directly.

### H2 #4 — "What Is Still Allowed in 2026"

- Word count: ~160–200 words.
- **Answer paragraph (40–60w):** "Plenty. The cave is open and visitable — what is restricted is the act of swimming into it from the open sea. You can still enter on a small motor boat, a speedboat, a mid-sized motor yacht like the Cranchi 38ft, a kayak, a stand-up paddleboard, or a licensed guided swim tour from Benagil beach."
- Depth: a short list, 5 items, one line each (the writer chooses prose or a tight bulleted list — bullets extract more cleanly into AI overviews, prose reads warmer; either is fine; recommend **bullets** to mirror the pillar's TL;DR shape):
  - **Small motor boats and speedboats** — the most common legal route; clears the ~2.5m sea-level arch.
  - **Mid-sized motor yachts** — specifically the **Cranchi 38ft** (the brief notes the Cranchi clears the arch and enters the cave; the sail yacht does NOT — mast clearance — and anchors outside; this is critical because guides booking the sail yacht expecting cave entry get disappointed).
  - **Kayaks and stand-up paddleboards** — launch from Benagil beach with a licensed guide; under the 2023 rules, kayak and SUP rentals along the Lagoa stretch (Vale Centeanes, Carvalho, Barranquinho, Albandeira, Barranco) require one guide kayak for every five rented craft.
  - **Licensed guided swim tours from the beach** — the only legal way to swim *into* the cave.
  - **The clifftop viewpoint** — separate short walk above the cave; not "inside" but worth a mention for completeness (it is foot-accessible from Benagil village).
- **One in-body link out (lateral to CL1):** the kayak/SUP/clifftop logistics belong to CL1's surface; CL2 mentions them in this bulleted list with a single in-body link. Anchor text exactly: **"how to get to the cave"** (matches the CSV `how-to-visit-benagil-cave (NEW),can-you-swim-benagil-cave (NEW),cluster<->cluster (lateral),how to get to the cave,planned` row — the lateral direction is documented as "how to get to the cave" as the anchor when CL1 is the target). Target slug: `how-to-visit-benagil-cave`. Phrasing: "For the full breakdown of which departure point to choose and how the four boat types compare, see our piece on [how to get to the cave]."
- **Critical**: this section enforces the **Cranchi enters / sail yacht does not** distinction per the operator-verified pillar brief §16 addendum. Do NOT write that "yachts anchor outside the cave" generically; the Cranchi (PK 720028) enters, the sail yacht (PK 717754) does not. The pillar's H2 #6 makes this distinction explicit; CL2 must echo it.

### H2 #5 — "How the Rule Is Enforced"

- Word count: ~130–170 words.
- **Answer paragraph (40–60w):** "The Polícia Marítima patrols the cave entrance and the Lagoa coast under the authority of the Capitania do Porto de Portimão. The enforcement risk lands on operators, not passengers: a captain who lets guests swim in faces fines and risks the licence the boat depends on. Passengers won't be arrested, but the boat won't take you in."
- Depth: 2 short paragraphs.
  - **Paragraph 1 — who enforces.** Polícia Marítima + Capitania do Porto de Portimão. Patrols during the busy season. Both are named entities (AEO/GEO weight); use them once in this paragraph.
  - **Paragraph 2 — what actually happens if you try.** Honest, operator-voiced answer to "what if I swim in anyway?". Three plain facts:
    1. The boat operators won't drop swimmers in — the fines and licence risk land on them, not on passengers.
    2. Independent swimmers from the beach face less personal consequence than the operator does, but the patrols are there and the situation gets ugly fast if there's an incident.
    3. The Atlantic swell and the cave's interior currents are unforgiving — the rule exists because people got hurt; the enforcement is a backstop, not the deterrent.
  - Skipper-voice line: "We won't take swimmers in. The Polícia Marítima patrols this stretch in summer, and the captain who runs a boat that drops swimmers in the water risks the licence the boat depends on. We don't roll that dice for any guest."
- **Do NOT name a specific fine amount.** Fines schedules drift; quoting "€XXX per incident" dates the piece and risks being factually wrong in 3 months. The anti-pattern is named in §13.

### H2 #6 — "The Closest Legal Alternative"

- Word count: ~150–180 words.
- **Answer paragraph (40–60w):** "The honest closest alternative to swimming into the cave is taking a small boat in. A speedboat clears the sea-level arch, slips inside, and the skipper holds position for 5–10 minutes while you take photos with the skylight overhead. It is not the same experience as swimming through — it is the lawful 2026 version of it."
- Depth: 2 paragraphs.
  - **Paragraph 1 — what the boat experience actually is.** Be honest about the duration (5–10 minutes inside; the surrounding coast is the rest of the half-day). Honest about what you do (you stay on board; the skipper holds position; you photograph the skylight; you back out). Do NOT oversell ("the cave on a boat is somehow better than swimming" — that's hype). Do say it's the realistic legal version.
  - **Paragraph 2 — the operator's options briefly + the in-body link to the speedboat.** Mention briefly that there are a few legal boat options (speedboat, mid-sized motor yacht like the Cranchi), then link to the speedboat as the everyday primary CTA. **One in-body link out (commercial):** anchor text exactly **"our Benagil speedboat tour"** (matches CSV row `can-you-swim-benagil-cave (NEW),tour:benagil-caves-speed-boat-tour (PK 717720),cluster->tour,our Benagil speedboat tour,planned`). Target: `/en/tours/benagil-caves-speed-boat-tour/`. Phrasing: "If you want the simplest, most affordable way to still see the cave's interior in 2026, [our Benagil speedboat tour] from Portimão is the everyday option — small group, ~1.5–2 hours, the cave plus the surrounding coast." Departure marina: **Porto Comercial de Portimão**, signposted *Ac. Porto Comercial de Portimão*. **NOT Clube Naval.** (Pillar §16 addendum verified.) Mention the marina once for entity strength; do NOT make this paragraph about the marina.
- This section is the conversion moment. Do NOT write booking copy ("Book now! Best price guaranteed!"). The reader self-routes.

### H2 #7 — "Why the Rule Is the Right Call" *(short — closing skipper note)*

- Word count: ~80–120 words.
- **Answer paragraph (40–60w):** "The rule exists because people were getting hurt. The cave's interior has surge, the Atlantic swell stacks the entrance, and an unguided swim from the beach is a 200m crossing past boat traffic in water that hides its currents. The 2023 restriction shifted the risk from the swimmer to the operator — and the operators are the ones who can manage it."
- Depth: 1 paragraph of skipper POV. Don't moralize; don't lecture. The brand voice is honest, opinionated, but never preachy. "Most days the cave is calm and the photo is easy; one day a year it's not, and that's the day people get into trouble. The rule trades a bit of independence for a much-smaller drowning rate. We think that's the right trade." Close with one line that bridges back to the realistic alternative.
- **No depth link out** of this section.

### Closing — short CTA + pillar callout (no H2, or H2 titled "Planning Your Visit")

- Word count: ~60–80 words.
- Two routes only (this is a cluster, not a pillar — keep it tight):
  - **Pillar callout (bottom-up — the discipline that makes the pillar compound per architecture §4b).** Link back up to the pillar once more in the closing. Anchor text: **"complete Benagil Cave Tour guide"** (matches CSV row `can-you-swim-benagil-cave (NEW),benagil-cave-tour-complete-guide,"cluster->pillar (bottom-up, intro+closing)",complete Benagil Cave Tour guide,planned`). Target: `/en/blog/benagil-cave-tour-complete-guide/`. Suggested phrasing: "If you want the full picture on visiting the cave in 2026 — boats, ports, timing, what to pack — our [complete Benagil Cave Tour guide] is the next read."
  - **Soft tour CTA.** Optional — only if the speedboat hasn't already been linked in H2 #6 with enough emphasis. If H2 #6's link reads warm enough, skip the second tour link here (the architecture limits cluster→tour in-body links to one per piece by default; a second mention is fine but not required).
- Tone: warm, not pushy. "Have questions about access we didn't answer here? Message us — we run these tours and will tell you straight what's possible on any given day." (Echoes the pillar's closing voice; CL2 closes shorter.)

### FAQ — `faqs:` frontmatter (NOT a body H2 — the `FaqBlock` component renders this)

- See §10 for the 7 Q&A pairs. The writer authors these in the YAML `faqs:` block, not as Markdown headings in the body. The site's existing pipeline emits the visible `<details>` block AND the `FAQPage` JSON-LD from this frontmatter — no extra schema work.

### Section sum-check (writer verifies before submitting)

| Section | Target words |
|---|---|
| Lede | 80–120 |
| H2 #1 The Short Answer | 120–150 |
| H2 #2 What Changed in September 2023 | 150–180 |
| H2 #3 Can You Swim From the Beach? | 120–150 |
| H2 #4 What Is Still Allowed in 2026 | 160–200 |
| H2 #5 How the Rule Is Enforced | 130–170 |
| H2 #6 The Closest Legal Alternative | 150–180 |
| H2 #7 Why the Rule Is the Right Call | 80–120 |
| Closing | 60–80 |
| **Total body** | **1,050–1,350 → target 950–1,050** |

The summed bands run ~50–250 over the 1,100 ceiling; the writer must cut on the way down. Section bands are upper-flex ceilings, not floors. If the draft lands at 1,150, trim H2 #2 and H2 #5 first (those expand most under writer enthusiasm).

---

## 7. The de-dup cut line (pillar vs CL2 vs CL1) — read this carefully

The biggest editorial risk for CL2 is **bloating back into pillar territory** (rewriting the entire 2023 rules + everything about visiting the cave) and **cannibalizing CL1** (re-explaining how to get there). The cut line:

| Facet | Pillar (H2 #3) covers | **CL2 covers** | CL1 will cover |
|---|---|---|---|
| Can you swim in? — yes/no headline | 150–200w headline answer, links to CL2 | **900–1,100w deep treatment of the rule, what's still allowed, why, enforcement, alternative** | — |
| Rule date / regulator / rationale | One sentence ("the Capitania issued the rule to reduce drowning incidents") | **Full paragraph naming the regulator, the rationale, link to the Sul Informação source** | — |
| What's still allowed | 1-line in pillar's H2 #2 answer paragraph | **Full H2 #4 with the 5-route breakdown including the Cranchi/sail yacht distinction** | mention briefly in CL1 logistics |
| Enforcement / what happens if you try | not covered in pillar | **Full H2 #5 — operator-voiced answer** | — |
| Boat-type comparison (speedboat / Cranchi / sail / kayak) | full breakdown in pillar's H2 #6 | **brief mention only — point at H2 #6 of pillar** | full route comparison from each port |
| Departure-point comparison (Portimão/Carvoeiro/Lagos/AdP) | pillar's H2 #4 covers | **DO NOT enter this territory** — that's CL1 | full owner of port comparison |
| Best time of year / day | pillar's H2 #5 + CL3 own | **DO NOT enter this territory** | — |
| Booking direct vs OTA | pillar's H2 #12 owns | **DO NOT enter this territory** | — |

**The load-bearing rules for CL2:**

1. **Stay under 1,100 words.** If the writer wants more, that's a signal a section belongs in pillar or CL1. Word count is a discipline, not a target.
2. **Pillar's H2 #3 is the headline; CL2 is the depth.** The pillar gives the 150–200w yes/no answer in its H2 #3 and links here. CL2's H2 #1 ("The Short Answer") gives a tighter 40–60w featured-snippet shape, then expands across 6 more H2s.
3. **Do NOT duplicate the pillar's H2 #2 "How Do You Get Inside the Cave?".** CL2's H2 #4 ("What Is Still Allowed in 2026") is the legal-routes lens of the same content — it's allowed to overlap conceptually but the framing is "what's permitted under the 2023 rule", not "how do you visit". Same facts, different angle. The pillar covers the experience; CL2 covers the legality.
4. **Do NOT itemize the rule like a statute.** "The regulation, in Portuguese, states that…" is the AI-blog rehash voice. The skipper voice paraphrases plain-English: "the rule says, in practice, no swimming in from a boat, no swimming in from the beach without a guide."

---

## 8. Entity coverage (AEO/GEO)

Named entities the piece must work in naturally (not stuffed). The pillar's entity list applies broadly; CL2 has a tighter regulator-and-place focus.

**Entities required (with the H2 that's the natural home):**

- **Algar de Benagil** — H2 #1 and once or twice through the body. Use the Portuguese name once in italics in the lede or H2 #1 ("the *Algar de Benagil*") for entity-precision weight. *Algar* is the Portuguese geological term for a natural well / shaft — the pillar's H2 #1 already explains this; CL2 doesn't need to redefine.
- **Capitania do Porto de Portimão** — H2 #2 (the regulator that issued the rule), H2 #5 (the authority Polícia Marítima reports to). Use the full name once; "Capitania" or "the port captain's office" thereafter.
- **Polícia Marítima** — H2 #5. The enforcement agency. Named entity for AEO weight.
- **2023 access rules** / **September 2023** — H2 #1, H2 #2 (the precise date — September 10, 2023, per pillar §16 addendum). H2 #4 title's "in 2026" balances the year-stamped freshness.
- **Benagil village beach** — H2 #3. Distinguish from the cave itself.
- **Porto Comercial de Portimão** — H2 #6. Where our boats depart; signposted *Ac. Porto Comercial de Portimão*. Named once for entity strength + to enforce the anti-pattern (NOT Clube Naval).
- **Cranchi 38ft** — H2 #4. The mid-sized motor yacht that enters the cave. Critical for the "sail yacht doesn't enter, Cranchi does" distinction.
- **Lagoa** (parish/municipality) — H2 #4 or H2 #3 (the kayak/SUP rental coastline along the Lagoa stretch). Once is enough.

**Entities in the first 200 words (AEO weight on the lede + H2 #1 answer paragraph):**

- Algar de Benagil
- September 2023 (the date stamp)
- Capitania do Porto de Portimão *(if it fits cleanly — otherwise the entity weight is fine to land in H2 #2's first sentence; do NOT cram all three regulator entities into the lede)*

**Entities NOT to use:**

- Specific named individuals (e.g., the captain at the time — Eduardo Luis Pousadas Godinho — is on the pillar's §16 verified list but the cluster doesn't need name-level granularity; name the office, not the person).
- Specific fatality names (e.g., the 2024 Irish-national death) — the anti-pattern is named in §13.
- Specific fine amounts.

## 9. Internal link map (every in-body link CL2 must carry)

Pulled from `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` rows where CL2 is the source (3 outbound) + a check on the row where CL2 is the target (1 — tour→guide direction; not authored in CL2, that's a separate tour-page wiring task). Total in-body links the writer must include: **3**.

| # | Where in CL2 | Anchor text | Target | Direction | CSV source row |
|---|---|---|---|---|---|
| 1 | Lede (first 200 words) AND closing | `complete Benagil Cave Tour guide` | `/en/blog/benagil-cave-tour-complete-guide/` | cluster → pillar (bottom-up, intro + closing) | CSV row 2 |
| 2 | H2 #4 (the bulleted "what's allowed" list — on the kayak/SUP or boat-type line) | `how to get to the cave` | `/en/blog/how-to-visit-benagil-cave/` | cluster ↔ cluster (lateral, CL2 → CL1) | CSV row "how-to-visit-benagil-cave (NEW),can-you-swim-benagil-cave (NEW),cluster<->cluster (lateral),how to get to the cave,planned" (read the *reverse* direction — anchor is the same) |
| 3 | H2 #6 (the closest legal alternative paragraph) | `our Benagil speedboat tour` | `/en/tours/benagil-caves-speed-boat-tour/` (PK 717720) | cluster → tour | CSV row "can-you-swim-benagil-cave (NEW),tour:benagil-caves-speed-boat-tour (PK 717720),cluster->tour,our Benagil speedboat tour,planned" |

**Pillar callout discipline (link #1):** the architecture's cluster-piece anatomy (§5b) requires the pillar callout in the **first ~150–200 words** AND the **closing section**. CL2 uses the same anchor text in both positions (`complete Benagil Cave Tour guide`) — this is fine; varied anchor text is a discipline applied across the hub, not within a single short cluster piece.

**Lateral CL1 link (link #2) — handling that CL1 doesn't exist yet:**

CL1 (`how-to-visit-benagil-cave`) is the next cluster in the build order per architecture §8B step 3 (CL2 is step 2, CL1 is step 3). **CL1 will not be live when CL2 ships.** Two options:

- **Option A (recommended):** draft the link with the target slug `/en/blog/how-to-visit-benagil-cave/` so it goes live the moment CL1 ships. The link is broken for the window between CL2 publish and CL1 publish — typically days to a couple of weeks. The Atlantis site's deploy script doesn't have a broken-internal-link blocker today (the pillar already links to `/en/blog/can-you-swim-benagil-cave/` and the build passes), so this is operationally safe; the cost is a brief 404 window if a reader clicks during the gap.
- **Option B:** temporarily link to the pillar's "Getting there / How Do You Get Inside the Cave?" H2 (#2 in the pillar) — anchor `getting to the Benagil cave` to `/en/blog/benagil-cave-tour-complete-guide/#how-do-you-get-inside-the-cave`. Less ideal because it sends the reader back to a section they may have just come from, and because the H2 anchor depends on the slugified heading rendering, which can drift.
- **Recommendation: Option A.** Draft the link with the target slug. The CL1→CL2 lateral direction is already planned in the CSV; the inverse is structurally guaranteed to land. Brief 404 window is acceptable cost.

**Where NOT to put links:**

- Do NOT add 4+ links to the piece. The architecture's cluster-piece anatomy caps in-body links at ~3–5; CL2 with 900–1,100 words lands at 3 (1 pillar callout × 2 placements counts once for the anchor variety check + 1 CL1 lateral + 1 tour CTA).
- Do NOT add a "related reading" footer. The `HubClusterList` "In this guide" component renders elsewhere on the page from frontmatter.
- Do NOT add an OTA link, an affiliate link, or a competitor-operator link.
- Do NOT link out to any pillar facet that is NOT the pillar itself or CL1. CL3 (best time), CL5 (which cave), CL6 (dolphins) are not natural lateral links from CL2 — the piece's focused scope is the rule + what's allowed + the closest legal alternative.

## 10. FAQ section (frontmatter `faqs:`)

The writer authors these in the YAML `faqs:` frontmatter block (same shape as the pillar — see the shipped pillar's `faqs:` block at lines 19–49 of `benagil-cave-tour-complete-guide.md` for the exact YAML structure). The site's existing pipeline emits both the visible `<details>` block AND the `FAQPage` JSON-LD from this field; no extra schema authoring.

**Target: 7 Q&A pairs.** Each answer 40–80 words — citation-ready, complete-sentence answers. Don't end any answer with "see our full guide for more" — every answer must stand alone (AI engines lift FAQ items independently). The pillar already covers the 8 "obvious" Benagil FAQs; CL2's 7 are specifically the swim/rules-themed long-tails the pillar's FAQ doesn't own.

Below are the questions + recommended answers in full (the writer pastes these into the frontmatter and edits for voice, but the substance is correct; reviewer-verified facts come from pillar brief §16).

1. **Q: "Can you swim into the Benagil cave in 2026?"**
   A: No. Since September 2023, swimming into the Algar de Benagil from a boat tour or unsupervised from Benagil village beach has been restricted by the Capitania do Porto de Portimão. The cave itself is still visitable — you can enter on a small boat, a kayak, a stand-up paddleboard, or a licensed guided swim tour led by a registered operator from the beach.

2. **Q: "Is Benagil village beach still open?"**
   A: Yes. The beach itself remains a public Algarve beach, open to swimmers, sunbathers, and day-trippers like any other. What changed in 2023 is the swim-in path — you can no longer set off from the sand and follow the coast into the cave unsupervised. Operator-led guided swim tours from the beach are the legal exception.

3. **Q: "Can children swim near the Benagil cave?"**
   A: Children can swim at Benagil village beach the same way they swim at any Algarve beach — within the supervised swimming zone, with the usual care for Atlantic currents and boat traffic. They cannot swim into the cave itself; that path is restricted for everyone. On boat tours, children stay on board, wearing the mandatory life jacket, and enter the cave with the boat.

4. **Q: "What happens if I try to swim in anyway?"**
   A: The enforcement risk lands on operators, not passengers. Boat captains who drop swimmers in the water face fines and risk the licence the boat depends on, so no licensed operator will take swimmers in. Independent swimmers from the beach face less personal consequence but the Polícia Marítima patrols the area in summer, and the cave's currents are unforgiving — the rule exists because people got hurt.

5. **Q: "Can you swim inside the cave once you're there on a boat?"**
   A: No. The rule restricts swimming anywhere in or around the cave interior, including from a boat that's already inside. On a tour, you stay on board, the skipper holds position while you take photos under the skylight for five to ten minutes, and the boat then backs out. The boat trip's swim stop happens later in the tour, in a quiet bay along the coast.

6. **Q: "Are kayaks and stand-up paddleboards still allowed in the cave?"**
   A: Yes, both kayaks and SUPs can still enter the cave through the sea-level arch. Under the 2023 rules, kayak and SUP rentals along the Lagoa stretch — Vale Centeanes, Carvalho, Barranquinho, Albandeira, Barranco — require one guide kayak for every five rented craft, so most legitimate rentals now come with a guide. Self-paddled trips from elsewhere remain permitted but unguided crossings into the cave are discouraged.

7. **Q: "Is there a guided swim tour into the Benagil cave?"**
   A: Yes — a small number of licensed operators run guided swim tours from Benagil village beach into the cave, with a regulated guide-to-swimmer ratio. We don't run a beach swim tour ourselves, so we won't recommend a specific operator, but it is the only legal way to swim into the cave under the current rules. Most visitors choose the boat tour instead — it is faster, more weather-tolerant, and covers the surrounding coast.

**Cuts if the FAQ feels long (drop to 6):** the most cuttable is #3 (children swimming near the cave) — it's a natural pillar FAQ shoulder rather than CL2-specific. Keep all 7 unless the visible page feels heavy.

## 11. External links (sparse and authoritative)

**Cap at 1 external link.** The pillar lands at 2–3; CL2 is half the length and uses the SAME external source as the pillar (the Sul Informação coverage of the 2023 rule). Inheriting one external link is efficient and consistent.

**The one external link:**

- **Sul Informação (English):** `https://www.sulinformacao.pt/en/2024/05/edital-com-as-regras-de-navegacao-nas-grutas-de-benagil-esta-em-consulta-publica/` — anchored in **H2 #2** ("What Changed in September 2023") at the end of the paragraph naming the Capitania. Anchor text: **"the official navigation rules"** (same anchor the pillar uses — consistency across the hub is good; varied within a piece, consistent across the hub for the same external source). This is the cleanest source the pillar-brief reviewer found for the rule; CL2 uses it once.

**Do NOT add:**

- A second external link to Visit Algarve, Visit Portugal, or any tourism authority — the pillar handles tourism-authority signal; CL2 doesn't need it.
- A Capitania do Porto de Portimão direct URL (no clean Portuguese-government source was found in the pillar reviewer's pass — see pillar brief §15 #3 and §16; if the writer finds one in their drafting research that the pillar reviewer missed, escalate to reviewer rather than adding a second link on writer-initiative).
- A scientific geology source — irrelevant to CL2's scope.
- A Diário da República link (the official Portuguese government gazette) — none confirmed live.
- Competitor operators, OTAs, Wikipedia, tourism aggregators — all named in the pillar's anti-pattern list (§13) and inherited here.

**Writer note:** if no clean external link can be confirmed at draft time (e.g., Sul Informação has dead-linked the URL), omit the external link entirely. Better one fewer link than one bad link. Do not substitute with a weaker source on writer-initiative; escalate to reviewer.

## 12. Schema

The site's existing pipeline handles all of this — the writer does not author any JSON-LD manually. Mirrors the pillar setup exactly.

- **`Article`** schema — auto-emitted by `blog/[slug].astro` from frontmatter. `datePublished` reflects `date: "2026-05-14"`. The `author: Nuno Albino` flows into `Article.author` as a string. (No `Person` schema is wired today — the pillar brief §12 flags this as a future TODO; out of scope here.)
- **`FAQPage`** schema — auto-emitted when `faqs:` frontmatter is set. The 7 Q&A pairs in §10 light this up.
- **`BreadcrumbList`** schema — auto-emitted via `buildPostBreadcrumb()`. Per architecture §3, once the `pillarSlug` schema field ships (architecture §8A step 1), the breadcrumb on CL2 becomes `Home › Blog › Benagil Cave Tour: Everything You Need to Know in 2026 › Can You Swim Into the Benagil Cave?`. Until that field ships, the breadcrumb defaults to `Home › Blog › Destinations › Can You Swim Into the Benagil Cave?` (current category-based shape). Either is acceptable for CL2's publish; the breadcrumb upgrade is a site-side wiring task, not a content task.
- **No additional schema work needed.** No `HowTo` (CL2 isn't a procedure), no `TouristAttraction` (out of scope per pillar brief §12), no `LegalDocument` schema (would be overkill; the piece is a guide, not a statute).

## 13. Anti-patterns — what the writer must NOT do

**Copy the pillar brief's §13 anti-pattern list verbatim** (editorial/SEO, voice/AI-fluff, and structural anti-patterns all apply). Re-read pillar brief §13 before drafting. Plus the CL2-specific anti-patterns below — these are the ones that will trip the writer up *because* the piece is about a rule and the temptation to over-correct on accuracy or tone is high.

### CL2-specific anti-patterns (in addition to pillar brief §13)

1. **Do NOT invent a specific 2023 fatality count or attribute a death to a specific year unless the writer can cite a source in this brief itself.** The 2024 Irish-national death happened **after** the rule; the 2016 French swimmer death is older. No public source confirms a specific 2023 fatality that triggered the rule. The verified framing in pillar brief §16 is "a rising count of incidents involving swimmers, kayakers, and paddleboarders in and around the cave during the years leading up to the rule" — use *that* phrasing or a close paraphrase. **If the writer is tempted to write "after [N] deaths in [year]", stop and verify; if it cannot be verified from this brief or pillar brief §16, use the rising-incidents phrasing instead.**

2. **Do NOT call the marina `Clube Naval`.** It is **Porto Comercial de Portimão**, signposted *Ac. Porto Comercial de Portimão*. This is the single most common drafting hallucination on Atlantis content (logged in the project memory as `reference_atlantis_departure_marina`). The pillar's H2 #4 already names this correctly; CL2 must echo it once in H2 #6 when naming where the speedboat departs from. The architecture doc §6 had `Clube Naval de Portimão` in the entity list — that was the wrong entity and has been corrected on the pillar; CL2 must NOT re-introduce the mistake.

3. **Do NOT say the cave is closed to all visitors.** It is not. Only swimming-in is restricted. The cave remains visitable by boat, kayak, SUP, and licensed guided swim tour. A reader who leaves the page believing "the cave is closed" is the worst-case outcome — they cancel a trip they could still take. The lede, H2 #1, H2 #4, and the closing all need to reinforce that the cave is open; only one specific path in is restricted.

4. **Do NOT write that the sail yacht enters the cave.** The pillar brief §16 verified: the Cranchi 38ft (PK 720028) enters; the sail yacht (PK 717754) does NOT — the mast doesn't clear the arch and the sail yacht anchors outside. H2 #4's bulleted list of legal routes must reflect this. The pillar's H2 #6 already makes this distinction — CL2 must NOT contradict it.

5. **Do NOT make the piece feel like a legal disclaimer.** This is a skipper-authored explanation, not the boat company's lawyer's note. Voice anti-patterns: "Please be advised that…", "Pursuant to the regulation issued by…", "Visitors should be aware that…", "It is incumbent upon the visitor to…", "Failure to comply may result in…". The skipper voice paraphrases the rule in plain English; the legal-disclaimer voice quotes the statute.

6. **Do NOT bloat past 1,100 words.** Word count discipline is load-bearing for CL2. If a section wants to be longer, it belongs in the pillar or in CL1. The 1,100 ceiling is informed by the architecture's cluster word band (800–2,000) and the brief author's choice to land CL2 at the short end because the piece's value is depth on one question, not breadth on the topic. Going to 1,400 is not "more value" — it's facet drift.

7. **Do NOT repeat the pillar's "what is the Algar de Benagil" intro.** The pillar's lede and H2 #1 already cover the cave's geology, history, location, and the skylight. CL2 assumes the reader knows the cave from the photo and has either already read the pillar or will after CL2. The pillar callout in CL2's lede is what handles "but I don't know what the cave is" — the reader follows the link. CL2's body does NOT redefine "Algar de Benagil"; the term appears with an italicized first mention and the reader is presumed to recognise it.

8. **Do NOT quote a specific fine amount.** Fines schedules drift; quoting "€X per incident" dates the piece. Say "operators face fines" without a euro figure.

9. **Do NOT cite the rule's full Portuguese statute number, edital number, or Diário da República reference.** This is the legalistic over-correction. Name the regulator (Capitania do Porto de Portimão), the date (September 10, 2023), and link the Sul Informação coverage once. Anything more is the lawyer's voice, not the skipper's.

10. **Do NOT speculate about future rule changes.** The pillar brief §16 mentions a May 2024 public consultation on rule refinements; mention it once in H2 #2 with the Sul Informação link, then move on. Do NOT write "the rule may change in 2027 to…" — that's punditry, not reporting.

## 14. Acceptance criteria (reviewer checklist)

The reviewer runs this checklist against the draft. Every "no" is a revision request. The reviewer is the operator (José) per architecture §7 — same reviewer as the pillar; the standard is consistent across the hub.

1. ☐ **Total word count: 900–1,100** (target ~1,000). Verify by `wc -w` on the body (excluding frontmatter).
2. ☐ **6–7 H2 sections** (not 5, not 8). Every H2 has a **40–60-word answer paragraph** directly under the heading.
3. ☐ **H2 #1 ("The Short Answer")** is **120–150 words**, leads with the **1-sentence yes/no + 1-sentence "but you can still…"** featured-snippet shape.
4. ☐ **Byline is `Nuno Albino`.** Voice is skipper-led, first-person plural where natural, opinionated but factual. Not legalistic. Not preachy.
5. ☐ **`date:` frontmatter is `2026-05-14`** (or later if the writer revises). **`pillarSlug: benagil-cave-tour-complete-guide`** is set. **`pillarOrder: 0`** is set (subject to §15 reviewer confirmation).
6. ☐ **`relatedTourSlugs:` is `[benagil-caves-speed-boat-tour]`** — only the speedboat; no Cranchi, no sail yacht in this field.
7. ☐ **All 3 in-body links from §9 are present** with the CSV-specified anchor text (variation acceptable on at most 1, per pillar §13's "at most 1–2" rule applied proportionally to CL2's smaller link surface):
   - bottom-up pillar callout in lede (first 200 words) + closing → `complete Benagil Cave Tour guide`
   - lateral to CL1 in H2 #4 → `how to get to the cave` (link can be drafted with target slug even though CL1 isn't live yet — see §9 Option A)
   - tour CTA in H2 #6 → `our Benagil speedboat tour`
8. ☐ **1 external link**, in H2 #2, to Sul Informação at the verified URL, anchor `the official navigation rules`. **No** competitor links, OTA links, Wikipedia, or aggregator links.
9. ☐ **Required entities in body**: Algar de Benagil (with italic first mention), Capitania do Porto de Portimão, Polícia Marítima, September 2023, Benagil village beach, Porto Comercial de Portimão, Cranchi 38ft, Lagoa. At least 3 of these appear in the first 200 words.
10. ☐ **NOT in the body**: `Clube Naval`, any specific fatality count, any euro fine amount, any sail-yacht-enters-the-cave claim, the phrase "the cave is closed".
11. ☐ **`faqs:` frontmatter has 7 Q&A pairs** (or 6 if #3 was cut per §10 cut note), each answer 40–80 words, each answer stands alone (does NOT end with "see our guide for more").
12. ☐ **No anti-pattern phrases from pillar brief §13 or CL2 §13.** Spot-check by searching the draft for: `elevate`, `unlock`, `seamless`, `let's dive in`, `in today's fast-paced`, `buckle up`, `look no further`, `please be advised`, `pursuant to`, `Clube Naval`. All must return zero hits.
13. ☐ **The piece resolves the reader's anxiety.** A test read by a Trip-planner persona who knew nothing about the rule should leave understanding: yes the cave is open, no I can't swim in, here's what I can do instead, here's the realistic boat option. If the reader leaves more confused than they arrived, the piece failed.
14. ☐ **Builds cleanly**: `pnpm --filter atlantis run build` succeeds. The rendered `/en/blog/can-you-swim-benagil-cave/` page shows the breadcrumb, the FAQ block (7 items), and the JSON-LD `Article` + `FAQPage` schema validates in the Rich Results Test.
15. ☐ **The pillar's "In this guide" component lists CL2** at the top of the cluster list (driven by `pillarOrder: 0`) — verify after publish.

## 15. Open questions / judgment calls (flag for reviewer before draft starts)

The writer should ack the brief and raise these in the reviewer-ack step. Defaults are named where the writer can proceed without an answer; reviewer answers go into §16 once resolved.

1. **`pillarOrder: 0` (CL2 sorts above existing clusters in pillar's "In this guide")** — confirm this is intended. The architecture §2 lists CL1–CL11 in build order with CL2 as step 2 of the brief sequence (after the pillar rewrite); the keyword map names CL2 as the strongest featured-snippet target. Sorting it at the top of the cluster list is the natural read but may conflict with a future explicit ordering. *Default if no answer: ship with `pillarOrder: 0`; reviewer can re-sort post-publish via frontmatter.*

2. **Localized slug proposals for pt/es/fr** — confirm or correct:
   - pt: `posso-nadar-gruta-benagil` ("posso nadar gruta benagil" — "can I swim Benagil cave" — natural PT-pt phrasing; alternative: `pode-se-nadar-gruta-benagil`)
   - es: `puedes-nadar-cueva-benagil` ("can you swim Benagil cave" — natural ES phrasing; alternative: `se-puede-nadar-cueva-benagil`)
   - fr: `peut-on-nager-grotte-benagil` ("can one swim Benagil cave" — natural FR phrasing)
   - *Defaults: the slugs above. Reviewer confirms in the localization pass; the EN piece ships with the translationKey in place and the Sonnet translation step picks up the slugs from this brief.*

3. **Include a specific euro fine amount?** Pillar §16 has no verified fine figure. **Recommendation: NO.** Fines schedules drift; quoting a number dates the piece. Say "operators face fines" without the number.

4. **Name a specific 2024 Irish-national fatality as context?** The death occurred AFTER the rule and so doesn't motivate it; including it would be illustrative ("incidents have continued post-rule") but it personalises tragedy and the brief's framing doesn't need it. **Recommendation: NO** unless the writer finds a citable source they want to use AND can place it carefully (e.g., one sentence in H2 #2: "incidents have continued in the years since"). The rule's rationale reads stronger without naming individuals.

5. **Lateral link to CL1 drafted with target slug now, or wait for CL1 publish?** Per §9 Option A vs Option B. **Recommendation: Option A — draft the link now.** Brief 404 window is acceptable cost; the alternative (linking to a pillar anchor or omitting the link) is worse for CL2's link inventory long-term.

6. **Hero image — reuse the pillar's skylight image, or commission a different one?** A "boat-tour-inside-the-cave" shot (skipper view from a speedboat) would suit the "what you CAN do" framing better than the iconic skylight tourism shot. *Default if no answer: reuse the pillar's `cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs` skylight image; reviewer can swap on publish if a better asset is available.*

7. **The `rules` tag (new) — confirm or replace?** CL2 adds a new `rules` tag to group regulation-themed pieces. If reviewer prefers the existing tag taxonomy (`benagil`, `caves`, `travel-tips`), drop `rules`. *Default: include `rules`; it's a small taxonomy addition with clear future utility.*

8. **The H2 #4 list — bullets or prose?** Bullets extract more cleanly into AI overviews; prose reads warmer. The pillar's TL;DR uses bullets; the pillar's H2 #2 ("How Do You Get Inside the Cave?") uses prose. **Recommendation: bullets** (5 items, one line each) — CL2's whole reason for existing is featured-snippet performance, and bullets win the snippet test more often than prose. Writer keeps editorial discretion.

9. **Title — short form or long form?** Short: "Can You Swim Into the Benagil Cave?" (cleanest featured-snippet match). Long: "Can You Swim Into the Benagil Cave? The 2023 Rules, Explained" (catches `benagil cave rules 2023` long-tail). **Recommendation: short form for the title**, put the "2023 rules" hook in the subhead/lede/excerpt. Reviewer confirms.

---

## 16. Reviewer addendum — resolved questions + verified facts (2026-05-14)

**All 9 §15 open questions resolved before draft.** Recommendations accepted across the board; three operator-only judgment calls confirmed by the operator (José) via AskUserQuestion.

1. **`pillarOrder: 0`** — ✅ ship with `pillarOrder: 0`. Sorts CL2 to the top of the pillar's auto-generated "In this guide" list. Per BUILD-STATUS §4 rule: `0` is reserved for CL1 + CL2 (the highest-traffic featured-snippet targets); existing 1–8 stay; CL11 gets 9.

2. **Localized slugs for pt/es/fr** — ✅ keep the proposed defaults:
   - pt: `posso-nadar-gruta-benagil`
   - es: `puedes-nadar-cueva-benagil`
   - fr: `peut-on-nager-grotte-benagil`
   Operator confirmed. Sonnet translation pass uses these slugs verbatim.

3. **Specific euro fine amount?** — ✅ NO. Brief enforces "operators face fines" without a number. Anti-pattern list in §13 already forbids quoting a specific figure.

4. **Name a specific 2024 Irish-national fatality?** — ✅ NO. Rule predates it; the rationale reads stronger without naming individuals. Writer may say "incidents have continued in the years since" without identifying any specific person.

5. **Lateral link to CL1 drafted with target slug now?** — ✅ YES (Option A). Anchor `how to get to the cave` → `/en/blog/how-to-visit-benagil-cave/`. Brief 404 window is acceptable; CL1 is next on the build queue per BUILD-STATUS §2.

6. **Hero image** — ✅ reuse the pillar's skylight image (`cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs`). Operator confirmed. Swap on a future refresh if a better asset surfaces.

7. **New `rules` tag** — ✅ INCLUDE. Operator confirmed. Final tag set: `[benagil, caves, travel-tips, rules]`. Future regulation-themed pieces join this taxonomy.

8. **H2 #4 — bullets or prose?** — ✅ BULLETS (5 items, one line each). Featured-snippet match is the load-bearing reason CL2 exists; bullets win the snippet test more often than prose.

9. **Title** — ✅ SHORT form: "Can You Swim Into the Benagil Cave?" The "2023 rules" hook lives in the subhead/lede and the `excerpt` frontmatter.

**Verified operator facts (re-confirmed for this brief, no changes since pillar):**
- Departure marina is `Porto Comercial de Portimão` (signposted *Ac. Porto Comercial de Portimão*). NOT Clube Naval. (See [[reference_atlantis_departure_marina]].)
- Cranchi 38ft yacht DOES enter the cave (mid-sized motor; clears the sea-level arch). Sail yacht does NOT (mast clearance). (See [[reference_atlantis_yacht_cave_entry]].)
- 2023 rule rationale: drowning incidents + ecological damage to the cave floor. NO confirmed specific 2023 fatality count; "rising count of incidents involving swimmers, kayakers, and paddleboarders in and around the cave" is the verified framing inherited from the pillar.

Writer: brief is ready. Proceed to draft.

*Empty placeholder for the reviewer pass. After the writer acks this brief and the reviewer answers §15, resolved decisions land here in the same shape as the pillar brief's §16. Verified external facts the writer can cite confidently (e.g., the September 10, 2023 effective date, the Capitania's authority, the kayak-guide ratio per the 2023 rule) are inherited from pillar brief §16 — re-quoting them here is optional; the writer can cite the pillar §16 by reference.*

---

*End of brief. The writer should ack this brief, raise the §15 open questions, then draft the EN piece. The reviewer reviews against §14. Translation to pt/es/fr is a separate Sonnet pass after EN review (per the project memory `feedback_opus_for_writing` — Opus drafts content, Sonnet handles schema/translation plumbing).*
