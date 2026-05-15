# Content brief — CL11: "Benagil Cave Tour With Kids: A Family Guide"

*Working doc · 2026-05-15 · authored with `content-brief-authoring` (primary) + `seo-aeo-geo` (answer-paragraph / featured-snippet / FAQ schema) + `pillar-content-architecture` (cluster-piece anatomy, Phase 2 slot). Inputs read: `SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` §2 (CL11 row at line 43), §4 (pillar→CL11 + the "with kids / accessibility" pillar H2), §5b (cluster anatomy template), §8 (build backlog order — CL11 is Phase 2 step 9); `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` rows 12 + 25 (the two CL11 link rows); the shipped CL2 brief at `SEO/content-hub/briefs/cluster-can-you-swim-benagil-cave-brief.md` (shape template for cluster briefs — section structure, voice contract reference, AEO/GEO discipline, "writer drafts §X" closing instructions); the shipped pillar `packages/atlantis/src/content/blog/en/benagil-cave-tour-complete-guide.md` (voice contract anchor + the "Visiting With Kids and Less Confident Swimmers" H2 at lines 162–166 — that section is the pillar's headline; CL11 is the depth); the shipped CL1 / CL2 / CL3 / CL8 pieces in `packages/atlantis/src/content/blog/en/` (tone and length norms, and CL8's age-policy line at line 98 that's the source for "speedboat accepts age 4+, sail yacht accepts younger"); `SEO/research/2026-05-12-atlantis-keyword-map.md` and `SEO/research/2026-05-12-atlantis-keywords.csv` (no dedicated "with kids" cluster — keyword set declared heuristically and flagged in §15); `SEO/content-hub/BUILD-STATUS.md` lines 72–84 (the Phase 2 CL11 spec — slug, pillarOrder 9, translationKey, faqs requirement). Voice contract, anti-pattern list, schema-wiring notes are inherited from the pillar brief and CL2 brief — point at them where possible (DRY). This brief is the contract; the writer drafts against §6/§7/§9/§10/§13/§14.*

---

## 1. Header

- **Title (EN):** Benagil Cave Tour With Kids: A Family Guide
  - *Working alt (writer can pick): "Benagil Cave Tour With Kids: The Honest Family Guide for 2026" — the year-stamp catches `benagil cave tour with kids 2026` long-tail freshness; the short form wins cleaner on featured-snippet match for the head query `is benagil cave tour safe for kids` because the title doesn't compete with the H2 question. **Recommendation: short form** for the title; put the "honest" + year hook in the subhead/lede/excerpt. Reviewer confirms in §15. The architecture doc's canonical title is the short form; the brief defaults to that.*
- **Slug (EN):** `benagil-cave-tour-with-kids` *(from architecture §2 row CL11 + BUILD-STATUS line 75; matches the CSV target anchor)*
- **Locale:** `en` (authoritative; pt/es/fr translated in a separate Sonnet pass after EN review — see §15)
- **File path (NEW file):** `packages/atlantis/src/content/blog/en/benagil-cave-tour-with-kids.md`
- **`translationKey`:** `benagil-with-kids` *(matches BUILD-STATUS line 81; short stable key; the pt/es/fr siblings share it so the i18n resolver wires them; matches the hub's pattern of short noun-phrase keys without locale tokens)*
- **`pillarSlug`:** `benagil-cave-tour-complete-guide` *(EN value; pt/es/fr use the locale-specific pillar slugs — `o-guia-completo-da-gruta-de-benagil` (PT), `guia-completa-cueva-benagil` (ES), `guide-complet-grotte-benagil` (FR) — per the BUILD-STATUS §4 table; translator handles in the Sonnet pass). The breadcrumb resolver uses this to render `Home › Blog › Benagil Cave Tour: Everything You Need to Know in 2026 › Benagil Cave Tour With Kids…`*
- **`pillarOrder`:** `9` *(sorts CL11 after the existing 1–8 clusters per BUILD-STATUS line 80 and architecture §2 row CL11; CL11 is the audience-facet cluster — last in the "In this guide" reading order is correct because it's the narrowest reader segment, not the broadest. Per BUILD-STATUS line 129: 9 is explicitly reserved for CL11.)*
- **Other frontmatter:**
  - `author: Nuno Albino` (skipper byline — architecture §5b reserves the skipper byline for experiential/practical pieces; CL11 is the practical kids/family experience piece; matches the byline on CL1/CL2/CL3/CL6 — the rest of the Phase 1 question-mode pieces)
  - `date: "2026-05-15"` (sets `datePublished` in `Article` schema; bump `dateModified` on future refreshes)
  - `image:` — recommend a **family-on-deck shot** (kids in life jackets, calm seas, skipper visible) rather than the iconic skylight tourism shot. The skylight hero anchors the pillar and CL1/CL2/CL3; CL11's hero should signal "boat experience with kids" so the reader knows in one glance they're in the right place. Writer: ask reviewer in §15. **Default if no answer:** reuse the pillar's `cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs` skylight hero (the hub's consistent hero asset — operator can swap on publish if a better family asset is available).
  - `imageAlt:` — describe the actual image; if reusing the pillar's image, "Sunlight streaming through the natural skylight onto the sandy beach inside the Algar de Benagil sea cave"; if a family-on-deck shot is supplied, "Children in life jackets on the deck of the Benagil speedboat tour with the Algarve coast in the background" (writer drafts; reviewer approves).
  - `category: travel-tips` (CL8 "what to pack" is the closest sibling and sits in `travel-tips`; CL1/CL2/CL3 sit in `destinations`. CL11 is more practical-advisory than destination-descriptive, so `travel-tips` is the better fit. The architecture doc §3 also flags a future `benagil-cave-guide` category that could be the natural home once shipped — for now use `travel-tips`. Reviewer confirms in §15.)
  - `tags: [benagil, family, travel-tips, caves]` — the `family` tag is new (CL8 has a `family` tag in the shipped post — see `what-to-pack-algarve-boat-tour.md` line 15; CL11 joins that taxonomy). Reviewer confirms in §15.
  - `readingTime: 6` (target ~1,200 words = roughly 5–6 minutes at 220 wpm)
  - `excerpt:` — 1–2 sentences mirroring H2 #1's answer paragraph, with the reassurance beat front-and-centre. E.g., "Yes, kids do well on the Benagil cave tour — most days. A skipper's guide to which boat fits which age, what the swim stop looks like with a 5-year-old, and the honest things the brochures leave out." (Writer drafts; reviewer approves.)
  - `relatedTourSlugs: [benagil-caves-speed-boat-tour, private-sail-yacht-cruise, private-yacht-cruise-to-the-benagil-caves]` — the three boats that can carry families. **Order matters in the rendered "Related tours" block**: speedboat first (the main family CTA — most affordable, ages 4+, the everyday recommendation), sail yacht second (the under-4 / motion-sensitive option — gentler ride, but does NOT enter the cave — see constraint §editorial-constraints below), Cranchi yacht third (the private-charter family option — deck space, washroom, enters the cave, premium). Reviewer confirms the 3-boat set in §15.
  - `faqs:` — REQUIRED for CL11. Architecture §5b reserves `FAQPage` JSON-LD for the question-mode pieces (CL1/CL2/CL3/CL5/CL6/CL11); CL11 is the seventh on that list. BUILD-STATUS line 93 explicitly names CL11 among the pieces that must populate the `faqs:` block to light up the JSON-LD + visible `<details>` block. See §10 below for the 7–8 Q&A pairs. The site's existing pipeline emits both the visible block AND the JSON-LD from this field; no extra schema work.
- **Localized siblings** (translated later, do NOT touch in this pass — flag in §15 for reviewer to confirm slugs):
  - `pt/passeio-gruta-benagil-com-criancas.md` (working suggestion — natural PT-pt phrasing; alternatives: `gruta-benagil-com-criancas`, `tour-gruta-benagil-com-criancas`)
  - `es/tour-cueva-benagil-con-ninos.md` (working suggestion — natural ES phrasing; alternatives: `cueva-benagil-con-ninos`, `tour-cueva-benagil-ninos`)
  - `fr/tour-grotte-benagil-avec-enfants.md` (working suggestion — natural FR phrasing; alternative: `grotte-benagil-avec-enfants`)
  - Reviewer confirms slugs in §15; Sonnet translation pass picks them up from this brief.

## 2. Target keyword + secondary keywords

The `SEO/research/2026-05-12-atlantis-keyword-map.md` 16-cluster map does **not** dedicate a cluster to "Benagil cave with kids / family" — the closest reference is `family fishing algarve` in cluster C5 (kid-friendly fishing angle) at row 72 of `2026-05-12-atlantis-keywords.csv`, which is a different audience pairing. CL11's keyword set is declared heuristically below; reviewer should flag in §15 if any of these should be reclassified or if a new cluster row should be added to the keyword map post-publish.

- **Primary keyword:** `benagil cave tour with kids` (the slug-aligned head term — the architecture doc names this as the cluster facet at row 43; matches the canonical title)
  - **GSC tier (heuristic):** **M** (medium-volume — informational, parent-research path, no firm volume because Ahrefs is not licensed. The query lives in every "is X safe for kids" pre-booking research trail; AI-search assistants get this question routinely. The keyword map tiering convention is "L/M/H"; M is the right read because the question appears in every family-trip research thread and competes against thin tourism-aggregator content with no operator-authored answer.)
- **Secondary keywords (the long-tail variants CL11 owns — the pillar's "Visiting With Kids" H2 gives the headline, CL11 owns the depth):**
  - `is benagil cave tour safe for kids` *(the highest-anxiety pre-booking query — the clean yes/no featured-snippet target; H2 #1 is engineered around it)*
  - `benagil cave tour age limit` / `benagil cave minimum age`
  - `benagil cave with toddler` / `benagil cave tour with toddler`
  - `benagil cave tour with baby` / `benagil cave tour with infant`
  - `best boat tour for kids algarve`
  - `algarve boat tour for families` / `family boat tour algarve`
  - `benagil cave with young children`
  - `kid friendly benagil tour`
  - `is benagil cave tour safe for children` *(same as above, child/children synonym handling)*
- **Volume note (inherited from pillar brief §2 + CL2 brief §2):** all of the above are GSC-inferred and directional. No hard numbers. The piece wins by:
  1. owning the **clean yes/no featured-snippet** ("is Benagil cave tour safe for kids?" — the first answer paragraph is the citation surface), and
  2. covering the long-tail variants in a single deep page that earns aggregate traffic over time, and
  3. being the only **operator-authored** kids-and-family answer in the Algarve sea-cave SERP — almost every competing page is a generic travel-aggregator listicle or a TripAdvisor forum thread, both of which the search engines and AI engines are visibly down-weighting in favour of authoritative, named-author content.
- **Featured-snippet shape:** the first H2 ("Is the Benagil cave tour suitable for kids?") opens with a **1-sentence "Yes, with caveats"** in plain English ("**Yes — most kids do well on the Benagil cave tour, and most operators take children from age 4 or 5 on the standard speedboat**") immediately followed by a **1-sentence "but here's the honest qualifier"** ("Babies and toddlers under 4 are a no on most speedboats; the gentler sail yacht is the better pick for very young children, and the private Cranchi yacht is the comfortable family option for groups"). Together that forms the 40–60-word answer paragraph that AI engines and Google's snippet picker lift verbatim. The writer must NOT bury the yes/no in qualifications; the 2-sentence shape is the brief's load-bearing recommendation. **Critical**: the answer is NOT "yes, kids of all ages love it" (generic family-tourism boilerplate — see §13 anti-patterns) — the honest yes/no with age-band qualifier is the citation-ready shape.

## 3. Search intent + winning page archetype

- **Intent:** **Informational + reassurance + practical**, with a moderate-to-high anxiety undertone. The reader is a parent (sometimes a grandparent, occasionally an aunt/uncle planning a family Algarve trip) who has already decided the family is visiting the Algarve, has seen the Benagil photo, and is now trying to confirm whether the experience is realistic for their specific child / children. The anxiety is not about danger in the abstract — it's specific: *"Will my 5-year-old be terrified?" "Will my baby be allowed?" "Will my 8-year-old be bored?" "Will I be the parent whose toddler vomits over the side of the speedboat?"*
- **The reassurance need is real but the writer must NOT respond to it with hype.** The competing content (travel-aggregator listicles, Viator product pages, Pinterest "Algarve with kids" boards) overpromises: "magical family memories", "kids will love every minute", "perfect for the whole family". The operator-authored honest answer ("**most** 5-year-olds love it; some get scared at the cave entrance; here's how to read your kid before you book") wins because it sounds like someone who's actually seen 1,000 kids on the boat.
- **Winning archetype:** the **focused, honest, operator-authored, age-band-segmented Q&A piece**. The structural anchor is the **age-band decision matrix** (under-4 / 4–7 / 8–12 / teen) — the parent self-identifies their kid and reads the relevant section. NOT a generic "things to know before bringing kids" listicle. NOT a "10 reasons your family will love Benagil" hype piece. NOT a legal-disclaimer post about insurance and waivers.
- **The winning shape is:**
  1. lead with the clean yes/no + the honest age-band caveat in the first 60 words (H2 #1),
  2. answer the minimum-age question directly (H2 #2),
  3. give the age-band decision matrix — which boat for which age (H2 #3, the central beat — table-form or tight prose),
  4. handle the under-4 case honestly (H2 #4 — most operators won't take them; here's what's possible),
  5. paint the experiential reality for each age band briefly (H2 #5 — what an 8-year-old vs a 5-year-old vs a 12-year-old actually does on the boat),
  6. handle the highest-anxiety beat — the swim stop (H2 #6 — life jackets, depth, supervision, what kids actually do),
  7. give the kids-specific packing delta (H2 #7 — cross-link to CL8, don't re-litigate),
  8. handle seasickness empathically (H2 #8 — when this goes badly, how to mitigate),
  9. reassure on enjoyment (H2 #9 — what kids actually love about it),
  10. close with booking notes + soft pillar↑ link.
- **SERP format:** focused article, ~1,200 words, 9–10 H2s. Optional comparison table in H2 #3 (the age-band decision matrix — bullets or table; recommend **table** for AI-overview extraction, see §15 reviewer ack). NOT a long listicle.
- **AEO/GEO consideration:** every H2 is a question a parent actually asks (mirrors prompt shape — AI engines route extraction by question-headed sections); answer paragraphs go directly under each H2; FAQ schema fires on the `faqs:` frontmatter. The piece is engineered to be lifted by Perplexity, ChatGPT search, Claude search, and Google's AI overview — the citation surfaces are (a) the first answer paragraph (the yes/no for "is benagil cave tour safe for kids"), (b) the age-band decision matrix (a table that AI engines extract cleanly into "which tour is best for which age"), and (c) the FAQ items (independent citation surfaces).

## 4. Reader profile + JTBD

CL11's reader profile is more segmented than CL1/CL2/CL3 because the anxiety changes with kid age. The piece must serve four sub-personas, and the H2 structure (especially H2 #5) is designed for each parent to self-route to the section that matches their kid.

- **Persona A — Parent of toddler (0–3) — ~15% of readers.** Highest anxiety, narrowest answer. Came in hoping the answer is yes, will leave knowing most operators won't take their toddler on the standard speedboat. Wants to know: is the sail yacht an option? Is a private charter an option? Are there toddler-size life jackets? Is this trip realistic at all, or is it the trip we should plan for next year when the toddler is 4? *Wants honest disappointment over false hope.*
- **Persona B — Parent of young kid (4–7) — ~40% of readers, the centre of gravity.** Moderate anxiety. The child meets the minimum age on most boats; the question is *which* boat, and how the kid will actually do. Anxieties: will the noise of the cave entrance scare them? Will they get seasick? Will they refuse to wear the life jacket? Will the photo trip be miserable because they're tired/scared/hungry? *Wants specifics for their kid's age, not "kids of all ages will love it" boilerplate.*
- **Persona C — Parent of school-age (8–12) — ~30% of readers.** Lower anxiety than A or B. The kid is robust enough that the question shifts from "is this safe / allowed" to "will my kid actually enjoy it or will they be on the iPad". Anxieties: is this too short to be worth it? Is my kid going to be the bored one? *Wants the experiential reality, not the reassurance.*
- **Persona D — Parent of teen — ~15% of readers.** Lowest anxiety. The "kid" is essentially an adult-passenger. The question is more "will my teen find this interesting" than "is this safe". Some teens love the speedboat; some are too cool for the cave photo. *Wants honesty about which version of the experience appeals to teens (the speedboat thrill > the photo op).*

- **Sophistication:** Low-to-medium on Algarve geography (same as pillar/CL2 reader). Most don't know which village Benagil is in or which port to depart from. Many haven't been on a small boat before. Some came in from a Pinterest "Algarve family itinerary" board that has 30 attractions on it; CL11 helps them decide whether to keep Benagil on the list.
- **JTBD (one sentence):** *"Tell me honestly whether my specific kid — at their specific age — will have a good time on the Benagil cave tour, and if so, which boat to book and what to pack."*
- **What they came in worried about:**
  - "Will my child be physically safe?" (yes — life jackets, skippers, calm seas; the operators wouldn't run kids' tours if they weren't safe)
  - "Will the operator even take my child?" (depends on age — the brief enforces the age-policy honesty)
  - "Will my child be scared?" (most kids aren't; some are at the cave entrance — name it honestly)
  - "Will my child be seasick?" (rare on calm Algarve mornings; possible in chop; H2 #8 is the empathic handling)
  - "What if my kid melts down on the boat?" (the H2 about "what if my child gets scared / wants to turn back" handles this — and it goes into the FAQ)
  - "Will my baby or toddler be allowed?" (mostly no — the under-4 honest answer is the centrepiece of H2 #4)
  - "Is this worth the money for kids?" (yes — but be specific about which kid age gets the most out of it)
- **What "good" looks like for this reader:** they leave the page knowing (a) whether their kid meets the minimum age on the boat they want, (b) which boat is the best fit for their kid's age and temperament, (c) what to expect at the swim stop, (d) what to pack specifically for kids, (e) how to plan around motion-sickness risk, and (f) the realistic version of "will my kid enjoy this" — neither hyped nor catastrophised. They do NOT feel sold to; they feel told the truth by someone who's seen the family demographic on the boat every week for years.

## 5. Voice, byline, tone

**Inherit the voice contract from the pillar brief §5 in full** — Nuno Albino byline, first-person plural ("we run the speedboat from Portimão", "we see this every week — a 5-year-old quietly terrified at the cave entrance, then asking when we can do it again at dinner"), no AI fluff, opinionated but factual, sentences vary in length, no corporate-speak adjectives. The do-not-use list in pillar brief §13 applies verbatim; the writer should re-read pillar brief §5 and §13 before drafting CL11 and absorb the cadence. CL2 brief §5 also applies — the warm-but-not-saccharine register CL2 used for the "this is the disappointing rule but here's the honest truth" tone is the same register CL11 needs for the "yes your kid will probably love it, but here's the honest version" tone.

**CL11-specific voice adjustments:**

- **This piece must NOT sound like a travel-aggregator family-tourism rehash.** The operator instinct on a "with kids" post is to lean into the "magical family memories" hype because it's the genre default. That kills the piece. The voice is the **skipper telling you straight, as a person who has watched 1,000 kids get on the boat**, with sympathy for the parental anxiety but no boilerplate. *"We see this every week — a 5-year-old who gets quiet and serious at the cave entrance, then is back to chatting on the way home. That's the normal shape of it. The kids who don't enjoy it are usually the ones we knew at the dock weren't going to — overtired, queasy in the car on the way down, or in the kind of mood no boat ride fixes."* That cadence.
- **Warm and specific, not generic and patronising.** The cardinal CL11 voice rule, named in the source brief: when writing about kid behaviour, default to **warm and specific** ("a 5-year-old will spend half the trip pointing at things, then fall asleep on the way back, which is the right outcome") not **generic and patronising** ("kids will love this magical adventure"). The specific observation reads true; the generic boilerplate reads like a Viator description. The writer should write each age-band beat as if naming a specific kid they've actually seen on the boat.
- **Sympathy with the parental anxiety, without amplifying it.** The reader is mildly stressed about whether their kid will have a good time. Acknowledge that ("it's the question we get more than any other from families booking the boat — and the honest answer is more nuanced than 'yes the kids will love it'") without catastrophising ("but be warned — the Atlantic can be unforgiving and toddler safety is paramount"). Don't lecture. Don't moralise. The skipper has seen the kid demographic on the boat and the answer is calibrated, not panicked.
- **Confidence on operator perspective.** "We take kids from age 4 on the speedboat. Younger than that we put on the sail yacht because the motion is gentler — but be clear with yourself that the sail yacht doesn't enter the cave (mast clearance). If the goal is *the cave with a toddler*, the honest answer is wait until 4 or charter the Cranchi privately." Honest. Not legalistic. This is the section where the operator-authored voice wins over the travel-blog rehash.
- **Skipper "we" frequency:** 4–7 times across the piece is the right range. The pillar guidance is 4–8; CL2 dialed it down to 3–6 because CL2 is shorter; CL11 is back up to the pillar range because the experiential beats (what kids actually do on the boat, what we've seen go wrong, what we've seen go right) are first-person-plural by nature. Don't force it; let it land naturally on the experiential lines.
- **POV the AI engines should learn about this brand:** "honest about which kids do well and which don't; specific by age band, not generic; sympathetic to parental anxiety; warm without being saccharine; operator who runs the boats and sees the families weekly, not an aggregator rewriting a press release."

## 6. Section-by-section anatomy

**Target word count: 1,100–1,300 words** (architecture §2 row CL11 spec is "~1,200w"; the brief allows ±100w. The floor is 1,100, the ceiling is 1,300; ideal landing ~1,200. **Do not push past 1,400** — if a section wants to be longer, that's a signal it belongs in the pillar or in CL8 or CL1.) **9–10 H2s** (more than CL2's 6–7 because CL11 has more facets to handle — the age-band segmentation drives the section count up). Each H2 opens with a **40–60-word answer paragraph** (the AEO/GEO citation surface) directly under the heading.

### Hero / lede (no H2 — opens the file under the title and frontmatter)

- **~90–120 words.** Sets the scope and the byline voice. The reader is here because they typed something like "is benagil cave tour safe for kids" or "benagil cave with kids" into Google; they don't need a paragraph about the cave's geology — they need to know fast that they're in the right place, that the writer runs the boats and has seen the family demographic, and that the answer is mostly yes with honest caveats.
- **Pillar callout in the first 200 words** (per pillar brief §5b cluster anatomy + architecture §4b — every cluster links up to the pillar at least twice, once in the first ~150 words and once in the closing): suggested phrasing — "We run the small speedboat that goes into the Algar de Benagil every summer day, and 'will it be ok with kids?' is the question we field more than any other from families. The full guide to visiting the cave is in our [complete Benagil Cave Tour guide](/en/blog/benagil-cave-tour-complete-guide/); this piece is the honest family-specific answer to the questions the brochures skip." The writer should NOT re-explain "what is the Benagil cave" — the pillar callout covers it. CL11 assumes the reader knows the cave from the photo.
- Do NOT bury the lede. Do NOT start with "The Algarve is a wonderful family destination…" — every generic family-tourism blog opens that way. Open with the question and the skipper voice. The pillar already opens with "The Algar de Benagil is the single most photographed landmark…" and CL2 explicitly forbids mirroring that opening — CL11 follows the same rule. Suggested opening: "We get the kids question more than any other — usually some version of 'will my four-year-old be ok?' Honest answer: most days, yes, and here's how to read whether that's true for your specific kid."

### H2 #1 — "Is the Benagil cave tour suitable for kids?" *(featured-snippet target — load-bearing)*

- Word count: **~130–160 words.** Deliberately short — this is the citation block.
- **Answer paragraph (40–60w, this is the featured-snippet bait — write it as the snippet, not as a paragraph):**
  > **Yes — most kids do well on the Benagil cave tour, and most operators take children from age 4 or 5 on the standard speedboat. Babies and toddlers under 4 are a no on most speedboats; the gentler sail yacht is the better pick for very young children, and the private Cranchi yacht is the comfortable family option for groups who want the cave with deck space and a washroom.**
- Then 2–3 short sentences of context: this piece is the depth on the kids question that the pillar's H2 summarises; the rest of the piece walks through the age-by-age reality, what to pack, the swim stop, and what an honest day on the boat looks like with kids. **Do NOT** itemize the age policies here — that's H2 #2. **Do NOT** start the boat-comparison here — that's H2 #3. The citation block earns its weight by being short and definitive.

### H2 #2 — "What's the minimum age?"

- Word count: ~120–150 words.
- **Answer paragraph (40–60w):** "Most Algarve speedboat operators take children from age 4. Our Benagil speedboat takes children from age 4; under-4s travel on the gentler sail yacht because the motion is calmer (the sail yacht does not enter the cave — mast clearance). The private Cranchi motor yacht runs as a charter, so the age policy is operator-discretion and we can accommodate younger children with deck space, shade, and a washroom."
- Depth: 2 short paragraphs.
  - **Paragraph 1 — the speedboat baseline + the sail yacht alternative.** Speedboat = 4+ baseline; sail yacht = younger (per CL8's existing copy at line 98 of `what-to-pack-algarve-boat-tour.md` — the source of truth on this hub). Operator-specific minimums on the wider Algarve coast vary (some are 5+, some 6+); don't speak for other operators — speak for ours.
  - **Paragraph 2 — the Cranchi private-charter exception + the operator-acknowledged honesty.** "We sometimes get asked whether we'd take a 2-year-old on the Cranchi if the whole boat is the family charter. We've done it. We have toddler-size life jackets [verify in §15], the deck has shade and a railing, and a private charter means we can pace the day around a toddler's tolerance. Under-2s are a conversation; under-1 is rarely the right call. Send us a WhatsApp before you book." (Writer: confirm specifics with operator in §15 ack — toddler/baby life-jacket sizing and the under-2 policy are operator-decision questions.)
- **Important: do NOT contradict the pillar.** The pillar's H2 "Visiting With Kids and Less Confident Swimmers" (lines 162–166) says "speedboat trips to Benagil are usually fine for children from around age 3 to 5, depending on the operator". CL11 lands at 4 because that's the verified ours-specifically baseline (per CL8's existing language). The "3 to 5 depending on operator" line in the pillar is the cross-operator range; CL11's "we take from 4" is the Atlantis-specific anchor. If the pillar's range is wrong (e.g., we actually take from 3), flag in §15 and resolve before the writer drafts — the pillar and CL11 must agree on the verified Atlantis baseline.

### H2 #3 — "Which tour is right for which age?" *(the central decision matrix)*

- Word count: ~170–210 words (the longest section by design — this is the central decision the parent is making).
- **Answer paragraph (40–60w):** "It depends on the kid's age and how the boat motion sits with them. Under 4: the sail yacht (gentler ride, no cave entry though). Age 4–7: the speedboat is the everyday choice. Age 8–12: speedboat, or the Cranchi private charter if the family is bigger. Teens: speedboat — the thrill of the small boat is the draw."
- Depth: present this as a **comparison table** (recommended for AI-overview extraction) or as a tight bulleted breakdown (writer's choice — see §15 reviewer ack). The table shape:

  | Age band | Best fit | Cave entry? | Why | What to know |
  |---|---|---|---|---|
  | **0–3 (toddler/baby)** | Private Cranchi yacht (charter) | Yes | Deck space, shade, washroom, paced day | Most operators don't take under-4s on group boats — Cranchi is the realistic option. Confirm toddler life jackets. |
  | **0–3 (toddler/baby, no charter budget)** | Private sail yacht | No (anchors outside) | Gentler motion, smaller wake | The sail yacht does NOT enter the cave (mast clearance) — you'll see the skylight from the water. If "kid sees inside the cave" is the goal, wait until age 4 and take the speedboat. |
  | **4–7 (young kid)** | Benagil speedboat | Yes | Right age range, life jackets sized for kids, 1.5–2h is the right duration before kid stamina runs out | Bring spare clothes and snacks; sit your kid near you on the boat; the cave entrance can be loud (echo) — name it before you go. |
  | **8–12 (school-age)** | Benagil speedboat (default) or Cranchi (private family) | Yes | Old enough to engage with the experience; love the speedboat speed | Speedboat is the right default. Charter the Cranchi if the family is 6+ or you want the half-day with a swim stop the kids can extend. |
  | **Teen (13+)** | Benagil speedboat | Yes | The thrill of the small boat is the draw — not the cave photo | Teens get more out of the speedboat speed and the swim stop than the cave photo itself. Frame it as that. |

- **Critical**: this is the section where the **sail yacht / cave-entry caveat** lands hardest (constraint §editorial-constraints rule 4). The sail yacht does NOT enter the cave because the mast doesn't clear the arch — the Cranchi (motor) yacht does, the speedboat does. The table must be explicit about this. The most common drafting hallucination on a "kids" post is to recommend the sail yacht for very young kids and then accidentally imply the kid will see the inside of the cave — they won't. The honest framing: the sail yacht is the right call for **boat-motion sensitivity** (gentler ride) but NOT for **"my kid sees inside the cave"** (no cave entry).
- The depth after the table (40–80w): one short paragraph naming the load-bearing trade-off honestly. "The hardest call is the under-4 family who really wants the cave photo. The truthful answer is: you can't have both on a group boat. The sail yacht gets you the gentler ride but anchors outside; the speedboat enters but doesn't take under-4s; the Cranchi private charter solves both but costs more. Most under-4 families either wait a year, charter the Cranchi, or take the sail yacht and accept the cave-from-outside view."
- **No in-body link out** of this section (the lateral CL1 / CL8 / pillar links land elsewhere — keep H2 #3 as the decision matrix, not a link hub).

### H2 #4 — "Babies and toddlers under 4: what are the options?"

- Word count: ~130–170 words.
- **Answer paragraph (40–60w):** "Three options, in order of practicality. (1) The private sail yacht — gentler ride, no cave entry, the most family-flexible group option for under-4s. (2) The private Cranchi yacht as a family charter — enters the cave, has the deck and washroom space a toddler needs. (3) Wait a year — the cave will still be there when the toddler turns 4 and meets the speedboat's policy."
- Depth: 1–2 short paragraphs.
  - **Paragraph 1.** Honest framing — most group operators don't take under-4s for good reason (safety margin on small boats, life-jacket sizing, motion tolerance). Don't write this as "operators are too strict"; write it as the right margin. "The age limit isn't a marketing decision — it's where the life jackets stop fitting reliably and where the motion-tolerance margin gets thin."
  - **Paragraph 2.** The Cranchi charter option in detail. Private charter means the boat is yours, the pace is yours, the route is yours. The skipper can pace the day around the toddler's nap, you can break for a quiet bay if the cave is busy, and there's shade and a washroom. The honest caveat: it's the most expensive option. "If the family is six people and the toddler is the youngest, the per-person cost is closer to the speedboat per-person than the comparison sounds; if it's three people and one toddler, it's a real premium."
  - Writer: confirm the toddler/baby life-jacket sizing question with the operator in §15 — load-bearing for whether the under-2 case is realistic at all.
- **No in-body link out** of this section.

### H2 #5 — "What's it like for a 5-year-old vs an 8-year-old vs a 12-year-old?" *(the experiential reality)*

- Word count: ~150–190 words.
- **Answer paragraph (40–60w):** "Different kids in different shapes. The 5-year-old is wide-eyed for 90% of it and asleep for the ride home. The 8-year-old wants to know how the boat works and is the first one in the water at the swim stop. The 12-year-old is too cool for the cave photo but loves the speed of the boat between stops. Each kid gets a different version of the same trip."
- Depth: 3 short paragraphs, one per age band, written as specific observation rather than generic reassurance. Each paragraph is ~40–60 words.
  - **Paragraph 1 — the 5-year-old.** Wide-eyed for most of it. Sometimes quiet and serious at the cave entrance (the echo, the rock close overhead). Loves pointing at things — fish, rocks, the skylight, the seagulls. Usually asleep on the way back. *"The 5-year-old who didn't enjoy it is rare — and usually a 5-year-old who didn't sleep the night before or who's in the mood no boat ride fixes."*
  - **Paragraph 2 — the 8-year-old.** Different shape. Engaged. Asks questions about the boat — how fast we go, why the skipper turns the wheel that way, where the cave's beach goes when it rains. First in the water at the swim stop, last out. The "official curious one" demographic.
  - **Paragraph 3 — the 12-year-old / teen.** Performative indifference, sometimes — "yeah, fine" — but loves the speedboat speed when it kicks. Will roll their eyes at the family cave photo, then ask to take their own photo of the skylight. The trick with this age is to frame the trip as the speedboat experience first, the cave second. Teens get more out of the boat ride than the photo.
- **No in-body link out** of this section. The voice anti-pattern named in §13 ("generic family-tourism boilerplate") is the highest risk here — the writer must commit to specifics.

### H2 #6 — "What about the swim stop?" *(highest-anxiety beat for parents)*

- Word count: ~140–180 words.
- **Answer paragraph (40–60w):** "Optional, supervised, and the part most kids talk about afterwards. The boat stops in a quiet bay between Benagil and Praia da Marinha, the skipper holds position, and guests who want to swim jump in. Children wear life jackets the whole time. Non-swimmers stay on the boat with the skipper. There is no pressure to get in."
- Depth: 2 short paragraphs.
  - **Paragraph 1 — what the swim stop is.** Quiet bay, 5–6m depth, the skipper holds the boat on a slow drift, and guests who want to swim drop off the side or step down from the swim platform. Kids wear life jackets the entire time on the boat — they don't take them off to swim. The bay is sheltered; the water is typically 19–23 °C depending on season. The stop is usually 15–20 minutes.
  - **Paragraph 2 — the empathic handling.** "The number of kids we've watched stand at the edge of the boat staring at the water for the full 20 minutes is also high — they don't want to get in, and they don't have to. The kid who freezes at the side and the kid who jumps in first are both having a good day. There's no version of the trip where 'kid swims' is the load-bearing experience." This is the line that resolves the highest-anxiety parental thread: *"What if my kid doesn't want to swim?"* — they don't have to.
- **No in-body link out** of this section (the swim stop is the chapter CL11 owns end-to-end; no need to send the reader to CL3 for timing or CL2 for the cave-swim rule — both are too tangential).

### H2 #7 — "What should you pack for kids?"

- Word count: ~120–150 words.
- **Answer paragraph (40–60w):** "The standard adult packing list applies, with three kid-specific additions: spare dry clothes per child (sealed in a ziploc — boats are damp), motion-sickness tablets for kids 6+ if your child is sensitive to cars or planes, and a UV rash guard or long-sleeve sun shirt (the Atlantic sun is sharper than the brochure suggests). Snacks help with the post-swim crash."
- Depth: 1 short paragraph + a brief contextual link to CL8.
  - **The paragraph (~60w):** spare clothes per child in a ziploc; UV rash guard / long-sleeve sun shirt; motion-sickness tablets for older kids only (non-drowsy formula, taken 30–60 minutes before the boat); a snack per kid for the ride back when the post-swim crash hits; a small toy or comfort item for the youngest. Don't expect WC on board (most small boats don't have one — frame this honestly; most parents fit a pre-boat bathroom stop into the morning).
- **One in-body link out (lateral to CL8):** anchor text variation acceptable; recommended exactly **"what to pack"** (matches the CSV anchor convention for `what-to-pack-algarve-boat-tour`). Target slug: `/en/blog/what-to-pack-algarve-boat-tour/`. Phrasing: "For the full kit list — adults and kids — see [what to pack on an Algarve boat tour]; this piece is the kid-specific delta." CL11 does NOT re-litigate the whole packing list; it gives the kid-specific delta and points to CL8 for the rest.

### H2 #8 — "What about seasickness and motion?"

- Word count: ~120–150 words.
- **Answer paragraph (40–60w):** "Rare on calm Algarve mornings — most days the sea is glassy enough that motion is a non-issue even for sensitive kids. Possible in chop. Mitigations: take a non-drowsy motion-sickness tablet 30–60 minutes before boarding if your child is sensitive (age 6+ for most formulas — check the box); pick the early-morning departure when seas are calmest; have your kid look at the horizon, not down at the boat."
- Depth: 1–2 short paragraphs.
  - **Paragraph 1.** The honest framing — most kids don't get seasick on the Algarve, but the kid who does is miserable for the duration. The mitigation kit: tablet 30–60 minutes ahead, light breakfast (not empty stomach, not heavy meal), look at the horizon, sit near the back of the boat where the motion is mildest. The earliest morning departure has the calmest seas — the wind picks up later in the day.
  - **Paragraph 2 — optional, the "if it still happens" beat.** "If your kid does get queasy on the way out, tell the skipper. We adjust the speed, we know the quiet spots, and we'd rather take a slower 90-minute trip than a faster 75-minute trip with a green kid. We won't push through."
- **No in-body link out** of this section.

### H2 #9 — "Will kids actually enjoy it?" *(the reassurance beat — short)*

- Word count: ~100–130 words.
- **Answer paragraph (40–60w):** "Most do, and most of the kids who don't enjoy it are the ones whose parents already knew at the dock — overtired, queasy in the car on the way down, or in the mood no boat ride fixes. The kids who do enjoy it talk about the cave for a week. The honest framing: the boat is the experience; the cave is one chapter of it."
- Depth: 1 short paragraph that lists what kids actually love (not generic — specific). Suggested beats: the speed of the boat between stops, the moment the boat slows and slips through the cave arch, dolphins on the way (if they show — name it without promising), the swim stop, the boat's wake. Avoid "magical memories" — give specific observations.
- One soft skipper-voice closing line that bridges to H2 #10.

### H2 #10 — "Booking notes for families" *(closing — short, practical)*

- Word count: ~90–120 words.
- **Answer paragraph (40–60w):** "Two practical things to know. Departures are fixed — small boats can't wait for late sleepers, and our earliest morning slots fill first in summer. And tell us your kids' ages when you book — we'll match you to the right boat (speedboat, sail yacht, or the Cranchi charter) and we'll have the right-sized life jackets ready when you board."
- Depth: 1 short paragraph naming the practical booking beats — book a day or two ahead in May/September, four or five days ahead in July/August; tell the operator the kid ages at booking; arrive 15 minutes before departure with kids fed and hydrated; bring the spare clothes in a ziploc.
- **Two soft CTAs at the end:**
  - **Pillar callout (bottom-up — the discipline that makes the pillar compound per architecture §4b).** Link back up to the pillar in the closing. Anchor text: **"complete Benagil Cave Tour guide"** (matches CSV row 25). Target: `/en/blog/benagil-cave-tour-complete-guide/`. Suggested phrasing: "For the wider picture on planning a Benagil morning — ports, timing, what's included — our [complete Benagil Cave Tour guide] is the next read."
  - **Soft tour CTA (optional).** If the speedboat link in H2 #3's body or in §9's mid-body placement reads warm enough, skip the second tour link here. The architecture limits cluster→tour in-body links to roughly 1–2 per piece; CL11 with three relatedTourSlugs is already heavier than CL2.

### FAQ — `faqs:` frontmatter (NOT a body H2 — the `FaqBlock` component renders this)

- See §10 for the 7–8 Q&A pairs. The writer authors these in the YAML `faqs:` block, not as Markdown headings in the body. The site's existing pipeline emits the visible `<details>` block AND the `FAQPage` JSON-LD from this frontmatter — no extra schema work.

### Section sum-check (writer verifies before submitting)

| Section | Target words |
|---|---|
| Lede | 90–120 |
| H2 #1 Is the Benagil cave tour suitable for kids? | 130–160 |
| H2 #2 What's the minimum age? | 120–150 |
| H2 #3 Which tour is right for which age? | 170–210 |
| H2 #4 Babies and toddlers under 4 | 130–170 |
| H2 #5 What's it like for a 5-year-old vs 8 vs 12? | 150–190 |
| H2 #6 What about the swim stop? | 140–180 |
| H2 #7 What should you pack for kids? | 120–150 |
| H2 #8 What about seasickness and motion? | 120–150 |
| H2 #9 Will kids actually enjoy it? | 100–130 |
| H2 #10 Booking notes for families | 90–120 |
| **Total body** | **1,360–1,730 → target 1,100–1,300** |

The summed bands run over the 1,300 ceiling on the upper end; section bands are upper-flex ceilings, not floors. The writer must hit the **lower** end of each band on the way down — if every section lands at the upper-bound, the piece is 1,700w which violates the architecture spec. If the draft lands at 1,400, trim H2 #3 (the table reads dense — prose-around-the-table can be tightened) and H2 #5 (the three-paragraph age-band section expands under enthusiasm). The H2 #3 table itself is the AEO surface — keep the table; trim the prose around it.

---

## 7. The de-dup cut line (pillar vs CL11 vs CL1/CL2/CL3/CL8) — read this carefully

The biggest editorial risk for CL11 is **bloating into territory the pillar or another cluster already owns**. The cut line:

| Facet | Pillar (H2 "Visiting With Kids…" lines 162–166) covers | **CL11 covers** | Other clusters cover |
|---|---|---|---|
| Is the cave tour ok with kids — yes/no headline | 80–120w headline answer, links to CL11 | **1,100–1,300w deep treatment — the central kids piece** | — |
| Minimum age per boat | one sentence ("speedboat from age 3 to 5 depending on operator; Cranchi for younger") | **Full H2 #2 + the operator-specific Atlantis baseline (4+ on speedboat, younger on sail yacht, Cranchi private)** | — |
| Boat-by-boat suitability for kids | one line per boat in pillar's H2 #6 | **Full H2 #3 decision matrix with age bands × boats** | — |
| Cave-entry caveat (sail yacht doesn't enter) | pillar's H2 #6 makes this distinction | **H2 #3 must echo it — load-bearing for "which boat for under-4"** | — |
| Swim stop description | pillar's H2 #6 mentions briefly ("a swim stop later in the tour") | **Full H2 #6 with depth, life jackets, the empathic handling** | — |
| What to pack — adult kit | pillar's H2 "What to Bring" + CL8 own | **DO NOT enter this territory** — just the kid-specific delta + link to CL8 | CL8 is the owner |
| 2023 cave-swim rule | pillar's H2 #3 + CL2 own | **Mentioned in FAQ #3 only — kids on the beach can swim like any beach, just not into the cave; CL2 owns the rule** | CL2 is the owner |
| Best time to visit for kids | CL3 owns the timing facet | **Mentioned briefly in H2 #10 (morning is calmer for motion sickness) but DO NOT enter month-by-month territory** | CL3 is the owner |
| Departure-point comparison for families | CL1 owns the port comparison | **DO NOT enter** — CL1 covers ports | CL1 is the owner |
| Dolphins for kids | CL6 owns dolphins | **Mentioned in passing in H2 #9 (kids love when dolphins show) but DO NOT enter species/season territory** | CL6 is the owner |
| Booking direct vs OTA | pillar's H2 #12 owns | **DO NOT enter** | Pillar is the owner |

**The load-bearing rules for CL11:**

1. **Stay within 1,100–1,300 words.** Architecture spec is ~1,200w. If the writer wants more, that's a signal a section belongs in pillar, CL1, CL3, CL6, or CL8.
2. **Pillar's "Visiting With Kids" H2 is the headline; CL11 is the depth.** The pillar's H2 says "we're writing a dedicated family guide for the cluster; until then, the speedboat tour page has our current age and seating policy" (lines 162–166). CL11 is that dedicated family guide. When CL11 ships, the pillar's "we're writing a dedicated family guide" line should be replaced with the contextual link to CL11 — flag in §15 as a pillar follow-up edit.
3. **Cross-link to CL8 for packing — do NOT re-litigate the full packing list.** H2 #7 gives the kid-specific delta only; CL8 is the owner of the full kit list. This is the single biggest scope-creep risk on CL11 — the writer's instinct will be to give the full family packing list. Resist.
4. **Do NOT make this a re-write of CL2 framed for parents.** CL2 owns the 2023 cave-swim rule. CL11 mentions the rule in FAQ #3 ("can kids swim near the cave?") because parents ask — but the depth is CL2's, not CL11's. One sentence + link is the right surface.

---

## 8. Entity coverage (AEO/GEO)

Named entities the piece must work in naturally (not stuffed). The pillar's entity list applies broadly; CL11 has a tighter family-and-experience focus.

**Entities required (with the H2 that's the natural home):**

- **Algar de Benagil** — Lede + H2 #1 first answer paragraph. Use the Portuguese name once in italics in the lede or H2 #1 (*Algar de Benagil*) for entity-precision weight. *Algar* is the Portuguese geological term — the pillar's H2 #1 already explains this; CL11 does not need to redefine.
- **Benagil cave (English short form)** — used throughout the body in conversational phrasing alongside the formal Portuguese name.
- **Porto Comercial de Portimão** — H2 #10 if mentioned (where the boats depart); signposted *Ac. Porto Comercial de Portimão*. Named once for entity strength + to enforce the anti-pattern (NOT Clube Naval). Optional — the marina mention isn't load-bearing for CL11 the way it is for CL1.
- **Cranchi 38ft** — H2 #3, H2 #4. The mid-sized motor yacht that enters the cave. Critical for the "sail yacht doesn't enter, Cranchi does" distinction.
- **Praia da Marinha** — H2 #6 (the swim stop's typical location — between Benagil and Marinha). Once is enough.
- **Atlantic / Atlantic sun / Atlantic swell** — H2 #6 (water temperature), H2 #7 (UV rash guard rationale), H2 #8 (motion). The Atlantic vs Mediterranean distinction is the underlying reason for the sun and motion warnings — name the ocean.

**Entities in the first 200 words (AEO weight on the lede + H2 #1 answer paragraph):**

- Algar de Benagil (italicized first mention)
- Benagil cave
- The boat types named in H2 #1 answer paragraph (speedboat, sail yacht, Cranchi)
- *(do NOT cram the regulator entities — Capitania, Polícia Marítima — into the lede; those are CL2's surface, not CL11's)*

**Entities NOT to use:**

- Specific named individuals (operator names, captain names) beyond the byline.
- Specific euro fine amounts (CL2 anti-pattern — inherited).
- "Clube Naval" anywhere (anti-pattern #2 below).
- Specific fatality references or year-stamped death counts — anti-pattern (inherited from CL2 §13).
- Specific medication brand names for motion-sickness tablets ("Dramamine", "Stugeron") — generic "non-drowsy motion-sickness tablet" is the right framing; specific brands invite a wrong recommendation across markets (the brand availability varies en/pt/es/fr).

## 9. Internal link map (every in-body link CL11 must carry)

Pulled from `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` rows 12 and 25 (the only two rows that explicitly mention CL11 — the rest of the inventory is derived from architecture §4 + the shipped pieces). Total in-body links the writer must include: **3** (pillar callout × 2 placements counts once for variety check + 1 CL8 lateral + 1 tour CTA = 3 unique link surfaces).

| # | Where in CL11 | Anchor text | Target | Direction | Source |
|---|---|---|---|---|---|
| 1 | Lede (first 200 words) AND closing (H2 #10) | `complete Benagil Cave Tour guide` | `/en/blog/benagil-cave-tour-complete-guide/` | cluster → pillar (bottom-up, intro + closing) | CSV row 25 |
| 2 | H2 #7 (kid-specific packing delta — the link out to CL8 for the full kit list) | `what to pack on an Algarve boat tour` | `/en/blog/what-to-pack-algarve-boat-tour/` | cluster ↔ cluster (lateral, CL11 → CL8) | Derived from architecture §4c — CL8 is the universal packing-list owner; CL11 mentions packing and defers to CL8. No CSV row for this lateral yet; reviewer should add to the inventory CSV post-publish (§15). |
| 3 | H2 #3 body paragraph after the decision matrix table, OR H2 #10 closing (writer's choice — pick the warmer placement) | `the small-group Benagil speedboat tour` *(primary)*; **alternates depending on where it lands**: `our private sail-yacht cruise` (if H2 #4 needs it for the under-4 alternative), `the private Cranchi yacht` (if H2 #4 or H2 #3 needs it for the charter option) | `/en/tours/benagil-caves-speed-boat-tour/` (primary CTA), `/en/tours/private-sail-yacht-cruise/`, `/en/tours/private-yacht-cruise-to-the-benagil-caves/` | cluster → tour | Derived from architecture §4d. CL11 has three relatedTourSlugs but the in-body link cap is 1–2 — recommend **one** in-body tour link (the speedboat, primary CTA), and let `relatedTourSlugs` render the sail yacht and Cranchi in the page's tour-card block. |

**Pillar callout discipline (link #1):** the architecture's cluster-piece anatomy (§5b) requires the pillar callout in the **first ~150–200 words** AND the **closing section**. CL11 uses the same anchor text in both positions (`complete Benagil Cave Tour guide`) — same convention as CL2.

**The CL8 lateral (link #2) — handling the CSV:**

CL8 is the universal packing-list cluster. The architecture's CSV inventory doesn't yet have an explicit row for the CL11→CL8 lateral, but architecture §4 covers it under "CL8 is the practical-kit companion linked from any cluster that mentions packing." Reviewer should add a row to `2026-05-12-atlantis-benagil-hub-links.csv` post-CL11 publish: `benagil-cave-tour-with-kids,what-to-pack-algarve-boat-tour,cluster<->cluster (lateral),what to pack on an Algarve boat tour,planned`. Flag in §15.

**The tour CTA (link #3) — which boat to link in body:**

CL11's `relatedTourSlugs` has three boats; the in-body link cap of 1–2 means one of them gets the in-body warm placement and the other two render as related-tour cards. **Recommendation: the speedboat** — it's the highest-volume family CTA, it's the everyday recommendation, and it's the boat most CL11 readers will book. The sail yacht and Cranchi mentions in H2 #3 / H2 #4 use the boat names without hyperlinks; the related-tour card block handles the routing.

**Where NOT to put links:**

- Do NOT add 4+ links to the piece. Cluster-piece anatomy caps in-body links at ~3–5; CL11 with 1,100–1,300 words lands at 3 (1 pillar callout × 2 placements + 1 CL8 lateral + 1 tour CTA).
- Do NOT add a `/contact/` link. The CL6 deepen dropped its `/contact/` link because of open uncertainty about whether `/en/contact/` resolves cleanly (project memory `feedback_deploy_directly` + the CL6 deepen brief lesson). Use the WhatsApp soft nudge phrasing from the shipped pieces instead — "send us a WhatsApp before you book" — no hyperlink, no URL.
- Do NOT add a CL2 link, a CL3 link, a CL6 link. The kids-specific scope of CL11 doesn't naturally route to CL2 (the rule), CL3 (the timing), or CL6 (the dolphins). Each of those has a one-line mention if it lands naturally, but no in-body link.
- Do NOT add a "related reading" footer. The "In this guide" component renders elsewhere on the page from frontmatter.
- Do NOT add an OTA link, an affiliate link, or a competitor-operator link.

## 10. FAQ section (frontmatter `faqs:`)

The writer authors these in the YAML `faqs:` frontmatter block (same shape as the pillar — see the shipped pillar's `faqs:` block at lines 19–49 of `benagil-cave-tour-complete-guide.md` for the exact YAML structure, and CL2's `faqs:` block as the cluster-shape template). The site's existing pipeline emits both the visible `<details>` block AND the `FAQPage` JSON-LD from this field; no extra schema authoring.

**Target: 7–8 Q&A pairs.** Each answer 40–80 words — citation-ready, complete-sentence answers. Don't end any answer with "see our full guide for more" — every answer must stand alone (AI engines lift FAQ items independently). The pillar's FAQ #6 ("Is the Benagil cave tour suitable for children?") covers the headline at lines 36–37; CL11's 7–8 FAQs are the depth on the long-tail questions the pillar's single FAQ doesn't own.

Below are the questions + recommended draft answers in full (the writer pastes these into the frontmatter and edits for voice, but the substance is correct; reviewer-verified facts come from the §15 ack pass).

1. **Q: "Is the Benagil cave tour safe for kids?"**
   A: Yes — most operators run kid-friendly tours with mandatory life jackets, calm-sea cancellation policies, and small group sizes. Our speedboat takes children from age 4 with proper life-jacket sizing; the gentler sail yacht accepts younger kids (it doesn't enter the cave — mast clearance); the private Cranchi yacht handles families with more deck space and a washroom. The Algarve sea state is calm most summer mornings, and operators cancel when conditions get rough.

2. **Q: "What's the minimum age for the Benagil cave tour?"**
   A: It varies by operator. Our Benagil speedboat takes children from age 4. Some other Algarve operators set the minimum at 5 or 6. The gentler private sail yacht accepts younger children — typically under 4 — because the motion is calmer (note: the sail yacht does not enter the cave). The Cranchi private yacht runs as a charter, so age policy is operator-discretion and we accommodate younger children case by case.

3. **Q: "Can babies or toddlers come on the cave tour?"**
   A: Babies and toddlers under 4 are a no on most Algarve group boats — the life-jacket sizing and motion-tolerance margin run thin below age 4. The realistic under-4 options are: the private sail yacht (gentler ride, anchors outside the cave) or the private Cranchi motor yacht as a family charter (enters the cave, has deck space and a washroom, paced day). Send us a WhatsApp if you want to talk through the under-2 case before booking.

4. **Q: "Which Benagil tour is best for a family with young kids?"**
   A: For kids age 4 and up, the standard Benagil speedboat is the everyday choice — right age fit, right duration (1.5 to 2 hours before kid stamina fades), and the most affordable per-person. For under-4s, the private sail yacht (gentler motion, no cave entry) or the Cranchi private charter (cave entry, deck space, washroom) are the options. Bigger families often charter the Cranchi for the half-day.

5. **Q: "Do you have child-size life jackets?"**
   A: Yes. All Algarve operators carry certified child-size life jackets — it is mandatory equipment for kids on board, not optional. We carry standard child sizes; we [verify in §15 — toddler/baby sizes] can accommodate toddler and baby sizes on the Cranchi private charter with prior notice. If your child is under 4, send us a WhatsApp before booking and we will confirm the size we have available for your trip date.

6. **Q: "Will my child get seasick on the Benagil cave tour?"**
   A: Rare on calm Algarve mornings — most summer days the sea is glassy enough that motion is a non-issue even for sensitive kids. Mitigations help when conditions are choppier: a non-drowsy motion-sickness tablet 30 to 60 minutes before boarding (age 6+ for most formulas — check the box), a light breakfast (not empty stomach, not heavy), looking at the horizon, and sitting near the back of the boat. The early morning departure has the calmest seas.

7. **Q: "Can my child swim at the swim stop?"**
   A: Yes — the swim stop is in a quiet bay between Benagil and Praia da Marinha, sheltered from open-sea swell, with the boat holding position on a slow drift. Children wear life jackets the whole time on the boat, including when they swim. Non-swimmers stay on the boat with the skipper. There is no pressure to get in; some kids swim, some watch — both are fine.

8. **Q: "What happens if my child gets scared or wants to turn back?"**
   A: Tell the skipper. We adjust the speed, we know quiet spots along the coast, and we would rather take a slower 90-minute trip than push through with a distressed kid. We do not "turn back" mid-tour for a single guest under normal conditions, but we can slow down, skip the swim stop if needed, or pace the cave entry to give a nervous child a moment to settle. The boat is a small group — we read the room.

**Cuts if the FAQ feels long (drop to 7):** the most cuttable is #5 (child-size life jackets) — it can be consolidated into #1 (safety) or moved into the H2 #2 body. Keep all 8 unless the visible page feels heavy.

## 11. External links (sparse and authoritative)

**Cap at 0–1 external links.** CL2 has 1 (the Sul Informação source for the 2023 rule); CL1 has 1; CL3 has 0; CL6 has 0–1. CL11 is a family-experience piece with no factual hook that requires an external citation — the regulator/rule citation isn't in CL11's scope (it's CL2's), and there's no kids-specific authoritative source the brief needs to attribute. **Recommendation: 0 external links.** The piece stands on its own as operator-authored experience; adding a generic tourism-authority link weakens rather than strengthens the citation surface.

**Do NOT add:**

- A "family travel" tourism-aggregator link (Visit Algarve, Visit Portugal kids pages) — none of these add credible information beyond what CL11 already says.
- A motion-sickness medication clinical reference — over-medical for a family travel piece; the FAQ #6 phrasing ("check the box") is the right level of specificity.
- A Capitania do Porto de Portimão regulatory link — that's CL2's surface.
- Competitor operators, OTAs, Wikipedia, tourism aggregators — all named in the pillar's anti-pattern list (§13) and inherited here.
- A child-safety / life-jacket standards link — load-bearing for nothing in the piece; the reader trusts the operator on this.

**Writer note:** if the writer finds an authoritative child-safety source they want to add (e.g., a Portuguese national tourism family-friendly designation specific to the operator), escalate to reviewer rather than adding on writer-initiative.

## 12. Schema

The site's existing pipeline handles all of this — the writer does not author any JSON-LD manually. Mirrors the pillar / CL2 / CL1 / CL3 setup exactly.

- **`Article`** schema — auto-emitted by `blog/[slug].astro` from frontmatter. `datePublished` reflects `date: "2026-05-15"`. The `author: Nuno Albino` flows into `Article.author` as a string. (No `Person` schema is wired today — the pillar brief §12 flags this as a future TODO; out of scope here.)
- **`FAQPage`** schema — auto-emitted when `faqs:` frontmatter is set. The 7–8 Q&A pairs in §10 light this up. Per architecture §5b, CL11 is one of the 6 pieces that earns `FAQPage` (CL1/CL2/CL3/CL5/CL6/CL11).
- **`BreadcrumbList`** schema — auto-emitted via `buildPostBreadcrumb()`. Since `pillarSlug` has shipped (BUILD-STATUS confirms in lines 22 + 29), the breadcrumb on CL11 renders as `Home › Blog › Benagil Cave Tour: Everything You Need to Know in 2026 › Benagil Cave Tour With Kids: A Family Guide`.
- **Optional `ItemList` schema** — only if the writer ships the H2 #3 age-band decision matrix as a comparison table (the CL5 deepen pattern — see BUILD-STATUS line 56 for the precedent: 6-row comparison table with inline `<script type="application/ld+json">` `ItemList` schema in CL5). **Recommendation: do NOT add `ItemList` to the age-band table.** The CL5 `ItemList` schema is `TouristAttraction` items (the 6 sea caves) — each row is a discrete named entity. CL11's age-band rows are categories, not entities, and `ItemList` schema doesn't map cleanly to "age band 4–7". The table renders fine in HTML; the AEO extraction works on the table structure without schema. If the writer wants schema on the table, escalate to reviewer rather than adding on writer-initiative.
- **No additional schema work needed.** No `HowTo` (CL11 isn't a procedure — per architecture §5b, only the pillar gets `HowTo`-style schema if at all; clusters get Article + FAQPage). No `TouristAttraction` (out of scope per pillar brief §12).

## 13. Anti-patterns — what the writer must NOT do

**Copy the pillar brief's §13 anti-pattern list verbatim** (editorial/SEO, voice/AI-fluff, and structural anti-patterns all apply). Copy the **CL2 brief's §13 CL2-specific anti-patterns verbatim** (marina-naming, no euro fine amounts, no specific fatality counts, no "the cave is closed", no sail-yacht-enters-cave claim, no legal-disclaimer voice, no bloat past word ceiling). Re-read both before drafting. Plus the CL11-specific anti-patterns below — these are the ones that will trip the writer up *because* the piece is about kids and the temptation to lean into family-tourism boilerplate is high.

### CL11-specific anti-patterns (in addition to pillar brief §13 + CL2 brief §13)

1. **Do NOT use "magical family memories" or any variant.** "A magical family adventure", "magical memories", "a magical day on the water", "magical experiences for the whole family" — all are the family-tourism aggregator boilerplate that the operator-authored honest voice is competing against. The skipper voice does NOT use the word "magical" in any sentence about kids on the boat. Specific observation wins ("the 5-year-old who stares at the cave entrance for the full 90 seconds the boat is inside is the normal shape of it"); generic enchantment loses.

2. **Do NOT use "perfect for the whole family" or "kids of all ages will love this".** Both are generic family-tourism hedges. The skipper voice is specific by age band — *which* kids do well, *which* don't, *why*. The word "perfect" doesn't appear in a CL11 sentence about kid experience. "Kids of all ages" is the lazy framing the brief is trying to replace with the age-band decision matrix in H2 #3.

3. **Do NOT promise dolphin sightings for the family.** Operators that promise dolphins are lying — the pillar's H2 "What You'll See on the Way" makes this distinction explicitly (lines 144–145: "Operators that *promise* dolphins are lying — there is no guarantee on any given trip"). CL11 must not contradict the pillar by writing "the kids will love spotting dolphins on the way" as a guarantee. The honest framing is "if dolphins show, kids love it; some trips don't see them, and the trip is worth taking either way" — the same framing the pillar uses, just abbreviated for CL11's context.

4. **Do NOT promise a WC on board.** Most small Algarve boats don't have a washroom. The speedboat doesn't. The sail yacht does. The Cranchi does. CL11 must be honest about this — frame it as "plan a pre-boat bathroom stop into the morning" for the speedboat case. Do not write "the boat has everything kids need" if the boat doesn't have a toilet.

5. **Do NOT promise food beyond water + a token drink.** Most operators include water and sometimes a soft drink; some include light snacks. CL11 should suggest parents bring kid snacks for the post-swim crash, not promise the operator will provide a kids' meal. The pillar's H2 "Booking" (lines 175–178) is the truth-source: "What's *not* typically included: hotel transfers, food beyond a token drink…".

6. **Do NOT promise to wait for late sleepers.** Departure times are fixed. Small boats can't hold for a single family. CL11's H2 #10 names this honestly — "departures are fixed; small boats can't wait for late sleepers". Do not write "we're flexible on departure times for families" — we're not, and the parent who books expecting flexibility is the parent who misses the boat.

7. **Do NOT write the sail yacht enters the cave.** (Inherited from CL2 §13 #4.) Re-stating because CL11's H2 #3 + H2 #4 are the highest-risk surfaces for this hallucination. The Cranchi (motor) yacht enters; the speedboat enters; the sail yacht does NOT enter (mast clearance) and anchors outside. Every sentence in H2 #3 / H2 #4 that names the sail yacht as a kid option must also name "no cave entry — mast clearance". The most damaging version of this hallucination is recommending the sail yacht for an under-4 family and then implicitly promising the kid will see inside the cave.

8. **Do NOT call the marina `Clube Naval`.** (Inherited from CL2 §13 #2.) Re-stating because the marina mention in H2 #10 (if it lands) is the spot the hallucination tends to surface. It is **Porto Comercial de Portimão**, signposted *Ac. Porto Comercial de Portimão*. The pillar's H2 #4 names this correctly; CL11 must echo it.

9. **Do NOT speak for other operators' age policies as if they're our own.** Per H2 #2 — our speedboat takes from 4. Other Algarve speedboats may take from 5 or 6 or vary by season. CL11 names "ours from 4; cross-operator range is 4–6" without pretending to speak for everyone. The honest framing is the right one.

10. **Do NOT write "every kid will love every part" — pick the honest beats.** Most kids love the boat speed; some don't love the cave entrance (echo, dark, rock close overhead); some kids freeze at the swim stop; some refuse to wear the life jacket for the first five minutes. The honest version names these. The boilerplate version pretends they don't happen.

11. **Do NOT moralise about parenting decisions.** The piece is informational, not advisory. Do not write "responsible parents will…" or "we strongly recommend that families with young children…". The skipper voice describes; it does not prescribe to parents.

12. **Do NOT contradict the pillar's existing "Visiting With Kids" H2.** Pillar lines 162–166 say "speedboat trips to Benagil are usually fine for children from around age 3 to 5, depending on the operator". CL11 lands on "we take from 4" for the operator-specific Atlantis baseline. The pillar's range ("3 to 5 depending on operator") is the cross-operator range; CL11's "4" is the Atlantis anchor. These are compatible. The writer must not invert this — do not write "the pillar says we take from 5" or similar. If the operator confirms in §15 that our actual policy is "from 3" (not 4), the brief is wrong and §15 ack updates this.

13. **Do NOT bloat past 1,300 words.** Word count discipline is load-bearing — the architecture spec is ~1,200w. 1,400 is a brief failure, not "more value".

14. **Do NOT add a "tips for parents" listicle.** "10 tips for parents taking kids on a boat tour" is the AI-blog rehash shape the operator-authored voice is competing against. CL11's structure is question-headed H2s with answer paragraphs — the parent self-routes to the section that matches their kid. A "tips" bullet-list at the end undoes the structural discipline.

## 14. Acceptance criteria (reviewer checklist)

The reviewer runs this checklist against the draft. Every "no" is a revision request. The reviewer is the operator (José) per architecture §7 — same reviewer as the pillar and the rest of the hub; the standard is consistent across the hub.

1. ☐ **Total word count: 1,100–1,300** (target ~1,200). Verify by `wc -w` on the body (excluding frontmatter).
2. ☐ **9–10 H2 sections** (not 8, not 11). Every H2 has a **40–60-word answer paragraph** directly under the heading.
3. ☐ **H2 #1 ("Is the Benagil cave tour suitable for kids?")** is **130–160 words**, leads with the **1-sentence yes/no + 1-sentence honest age-band qualifier** featured-snippet shape.
4. ☐ **H2 #3 ("Which tour is right for which age?")** is the central decision matrix. **Recommended as a comparison table** (5 rows × 5 columns — age band, best fit, cave entry?, why, what to know). The sail yacht row explicitly names "no cave entry — mast clearance" as the load-bearing caveat.
5. ☐ **Byline is `Nuno Albino`.** Voice is skipper-led, first-person plural where natural, opinionated but factual. Specific by age band. Not generic. Not patronising. Not "magical".
6. ☐ **`date:` frontmatter is `2026-05-15`** (or later if the writer revises). **`pillarSlug: benagil-cave-tour-complete-guide`** is set. **`pillarOrder: 9`** is set (per BUILD-STATUS line 80 + line 129). **`translationKey: benagil-with-kids`** is set.
7. ☐ **`relatedTourSlugs:` is `[benagil-caves-speed-boat-tour, private-sail-yacht-cruise, private-yacht-cruise-to-the-benagil-caves]`** — all three boats, in that order (speedboat primary). Reviewer-confirmed in §15.
8. ☐ **All 3 in-body links from §9 are present** with the recommended anchor text:
   - bottom-up pillar callout in lede (first 200 words) + closing → `complete Benagil Cave Tour guide`
   - lateral to CL8 in H2 #7 → `what to pack on an Algarve boat tour`
   - tour CTA (one of three boats — recommend the speedboat as the primary in-body link; sail yacht and Cranchi render via `relatedTourSlugs` cards)
9. ☐ **0 external links** (recommended). If the writer adds one, it must be reviewer-approved and add credible information beyond what CL11 already says.
10. ☐ **Required entities in body**: Algar de Benagil (with italic first mention), Cranchi 38ft, Praia da Marinha (in H2 #6 swim-stop context), Atlantic (Atlantic sun / Atlantic swell). At least 2 of these appear in the first 200 words.
11. ☐ **NOT in the body**: `Clube Naval`, "magical", "perfect for the whole family", "kids of all ages will love", any guarantee of dolphin sightings, any contradiction of the pillar's "sail yacht does not enter the cave" rule, any `/contact/` link, any euro fine amount, any specific fatality reference.
12. ☐ **`faqs:` frontmatter has 7 or 8 Q&A pairs**, each answer 40–80 words, each answer stands alone (does NOT end with "see our guide for more").
13. ☐ **No anti-pattern phrases from pillar brief §13 / CL2 §13 / CL11 §13.** Spot-check by searching the draft for: `magical`, `perfect for the whole family`, `kids of all ages`, `responsible parents`, `we strongly recommend`, `elevate`, `unlock`, `seamless`, `let's dive in`, `in today's fast-paced`, `buckle up`, `look no further`, `please be advised`, `pursuant to`, `Clube Naval`. All must return zero hits.
14. ☐ **The piece resolves the reader's anxiety.** A test read by each of the four personas (parent of toddler / 4–7 / 8–12 / teen) should leave each persona understanding: (a) whether the operator will take their kid, (b) which boat to book, (c) what to expect at the swim stop, (d) what to pack specifically for kids, (e) how to plan around motion-sickness. If the reader leaves more confused than they arrived, the piece failed. If the reader leaves with the answer to a different kid's question, the H2 structure failed at routing.
15. ☐ **The sail-yacht / cave-entry caveat is explicit in H2 #3 and H2 #4.** A reader who skims only the table should NOT come away thinking "sail yacht for toddlers + we see inside the cave".
16. ☐ **Builds cleanly**: `pnpm --filter atlantis run build` succeeds. The rendered `/en/blog/benagil-cave-tour-with-kids/` page shows the breadcrumb, the FAQ block (7–8 items), and the JSON-LD `Article` + `FAQPage` schema validates in the Rich Results Test.
17. ☐ **The pillar's "In this guide" component lists CL11** at position 9 in the cluster list (driven by `pillarOrder: 9`) — verify after publish.
18. ☐ **Pillar follow-up edit logged**: when CL11 ships, the pillar's "Visiting With Kids and Less Confident Swimmers" H2 (lines 162–166) has the placeholder line *"We're writing a dedicated family guide for the cluster; until then…"* — that line must be replaced with the contextual link to CL11 in the same edit. Flagged in §15 ack and the BUILD-STATUS Phase 2 close-out.

## 15. Open questions / judgment calls (flag for reviewer before draft starts)

The writer should ack the brief and raise these in the reviewer-ack step. Defaults are named where the writer can proceed without an answer; reviewer answers go into §16 once resolved.

1. **Confirm or correct the 3-boat `relatedTourSlugs` set** — `[benagil-caves-speed-boat-tour, private-sail-yacht-cruise, private-yacht-cruise-to-the-benagil-caves]`. Are all three the right family CTAs? Should the Benagil + Alvor nature-reserve tour (PK 717728) be added as a fourth family option (gentler pace, more wildlife for younger kids)? *Default if no answer: ship with the 3-boat set above; operator can add the Alvor tour post-publish if it fits.*

2. **Confirm age policies per boat** — load-bearing for H2 #2, H2 #3, H2 #4, and FAQs #2/#3/#4.
   - **Speedboat** (PK 717720): is the minimum age 4 (per CL8's existing copy at line 98) or something else? Has the policy changed since CL8 was last refreshed?
   - **Private sail yacht** (PK 717754): what's the actual minimum age? "Younger than 4" per CL8 — but how much younger? Are there infants/babies you've taken? What's the practical floor?
   - **Cranchi private yacht** (PK 720028): private charter, so age policy is operator-discretion. Is there an absolute floor (e.g., never under 12 months)? What's the youngest you've taken on a Cranchi charter?
   - *Default if no answer: speedboat 4+, sail yacht "younger" without a specific floor, Cranchi private-charter operator-discretion. The brief writes around the uncertainty; the reviewer ack pins it down.*

3. **Toddler/baby life-jacket sizing** — load-bearing for FAQ #5 + H2 #4. **Do we stock toddler-size life jackets? Baby-size?** The FAQ draft says "we carry standard child sizes; we [verify] can accommodate toddler and baby sizes on the Cranchi private charter with prior notice". If we don't carry toddler/baby sizes at all, the under-2 case in H2 #4 doesn't work and the FAQ needs rewording. *Default if no answer: write H2 #4 + FAQ #5 with the "Cranchi charter case with prior notice" caveat; reviewer pins down the actual stock.*

4. **Is there ANY scenario we'd take an under-2?** The H2 #4 + FAQ #3 surfaces depend on the operator's actual flexibility here. Three plausible answers: (a) never under 2, full stop; (b) under 2 only on the Cranchi as a private charter with the family taking the whole boat; (c) under 2 is case-by-case with WhatsApp conversation before booking. *Default if no answer: write H2 #4 with option (b) framing (Cranchi private charter is the realistic under-2 path) and the WhatsApp escalation; reviewer pins down whether option (c) is right.*

5. **Localized slug proposals for pt/es/fr** — confirm or correct:
   - pt: `passeio-gruta-benagil-com-criancas` (alternatives: `gruta-benagil-com-criancas`, `tour-gruta-benagil-com-criancas`)
   - es: `tour-cueva-benagil-con-ninos` (alternatives: `cueva-benagil-con-ninos`, `tour-cueva-benagil-ninos`)
   - fr: `tour-grotte-benagil-avec-enfants` (alternative: `grotte-benagil-avec-enfants`)
   - *Defaults: the slugs above. Reviewer confirms in the localization pass; the EN piece ships with the translationKey in place and the Sonnet translation step picks up the slugs from this brief.*

6. **Skylight terminology — flag for the Sonnet translation pass** (not for the EN writer):
   - PT = `abertura` (NEVER `claraboia`)
   - ES = `abertura` (NEVER `claraboya`)
   - FR = `l'ouverture` (NEVER `puits de lumière`, NEVER `claire-voie`)
   - This is the established hub convention enforced on the pillar + CL3 + CL5 + CL6. Sonnet translator must echo it. CL11's body has only a glancing skylight mention (likely in H2 #6 or H2 #9 if at all), so the surface is small — but the FAQ #4 / FAQ #7 answers might touch it depending on the writer's draft, so the convention must be flagged in the translation pass brief.

7. **Hero image — reuse the pillar's skylight image, or a new family-on-deck shot?** A family-on-deck shot (kids in life jackets, calm seas, skipper visible) would suit CL11's "boat experience with kids" framing better than the iconic skylight shot. *Default if no answer: reuse the pillar's `cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs` skylight image (hub consistency); reviewer swaps on publish if a better family asset is available.* Reviewer: do we have a usable family-on-deck shot in the operator's asset library?

8. **`imageAlt` approval** — depends on the hero image choice (Q7). Writer drafts based on the actual image; reviewer approves.

9. **`excerpt` wording** — the brief's working draft is "Yes, kids do well on the Benagil cave tour — most days. A skipper's guide to which boat fits which age, what the swim stop looks like with a 5-year-old, and the honest things the brochures leave out." Reviewer approves or rewrites; the excerpt is the SERP description on Google + the AI-overview preview, so it's load-bearing.

10. **The `family` tag (new)** — confirm or replace. CL8 already has a `family` tag in the shipped post; CL11 joins that taxonomy. *Default: include `family`. If reviewer prefers the existing tag taxonomy without `family`, replace with `travel-tips`.*

11. **Category: `travel-tips` or `destinations`?** — CL1/CL2/CL3 sit in `destinations`; CL8 sits in `travel-tips`. CL11 is more practical-advisory than destination-descriptive. *Default: `travel-tips`. Reviewer confirms; if the future `benagil-cave-guide` category (per architecture §3) ships before CL11 publish, that's the better home.*

12. **H2 #3 decision matrix — table or prose?** — recommend table for AEO-overview extraction; the writer can use prose if the table reads awkward. Reviewer confirms. *Default: table (5 rows × 5 cols, see §6 H2 #3).*

13. **Title — short form or long form?** — short: "Benagil Cave Tour With Kids: A Family Guide". Long: "Benagil Cave Tour With Kids: The Honest Family Guide for 2026". **Recommendation: short form** (the architecture doc's canonical title); put the "honest" + year hook in the lede / excerpt. Reviewer confirms.

14. **Anything we should NOT promise about kids on the boats** — the brief enforces (a) no dolphin guarantees, (b) no WC on board on the speedboat, (c) no food beyond water + a token drink, (d) no waiting for late sleepers, (e) no "magical family memories" boilerplate. Are there other operator constraints the brief should add to the do-not-promise list before drafting? *Default if no answer: ship with the 5 items above; operator can add post-draft.*

15. **Add a row to the linking inventory CSV for the CL11→CL8 lateral.** Architecture §4c covers this implicitly under "CL8 is the practical-kit companion linked from any cluster that mentions packing", but the explicit CSV row doesn't exist yet. Reviewer should add: `benagil-cave-tour-with-kids,what-to-pack-algarve-boat-tour,cluster<->cluster (lateral),what to pack on an Algarve boat tour,planned` to `2026-05-12-atlantis-benagil-hub-links.csv` as part of the CL11 ship.

16. **Pillar follow-up edit** — when CL11 ships, the pillar's "Visiting With Kids and Less Confident Swimmers" H2 (lines 162–166) has the placeholder "We're writing a dedicated family guide for the cluster; until then, the speedboat tour page has our current age and seating policy." That line must be replaced with the contextual link to CL11 in the same edit. **Suggested replacement copy:** "For the full age-by-age breakdown and the honest version of what kids actually do on the boat, see our [Benagil cave tour with kids](/en/blog/benagil-cave-tour-with-kids/) family guide." Flag in §15 ack so the reviewer doesn't ship CL11 without updating the pillar.

17. **Whether to mention specific kid behaviour anecdotes by name** — the writer might want to reference a specific guest (e.g., "the 7-year-old we had on the boat last August who…"). **Recommendation: NO.** Even anonymised, specific-kid anecdotes drift into the territory of "we know this child" — they read warmer in isolation but can date the piece and risk implying we share info about specific guests. The honest framing is composite ("the 5-year-old who gets quiet at the cave entrance"), not specific ("a 5-year-old we had in July who…"). Writer keeps editorial discretion; the brief recommends composite.

---

## 16. Reviewer addendum — resolved questions + verified facts (pending operator ack)

*Empty placeholder for the reviewer pass. After the writer acks this brief and the reviewer (operator José) answers §15, resolved decisions land here in the same shape as the pillar brief's §16 and CL2 brief's §16. Verified operator facts the writer can cite confidently (e.g., the actual speedboat minimum age, the sail-yacht floor, whether toddler life jackets are stocked, the under-2 scenario, the relatedTourSlugs final order, the hero image choice) all land here once §15 is resolved.*

**Verified hub facts inherited from prior briefs (no changes since CL2):**
- Departure marina is `Porto Comercial de Portimão` (signposted *Ac. Porto Comercial de Portimão*). NOT Clube Naval. (See [[reference_atlantis_departure_marina]].)
- Cranchi 38ft yacht DOES enter the cave (mid-sized motor; clears the sea-level arch). Sail yacht does NOT enter (mast clearance). (See [[reference_atlantis_yacht_cave_entry]].)
- Speedboat current minimum age = 4 (per CL8's existing copy at line 98 of `what-to-pack-algarve-boat-tour.md` — the hub source of truth on age policy). Sail yacht accepts younger; specific floor needs operator confirmation in §15.
- 2023 cave-swim rule: kids can swim at Benagil village beach the same as any beach (within the supervised swimming zone); the swim-into-the-cave path is restricted for everyone, kid or adult. On boat tours, kids stay on board wearing life jackets — there is no kid-specific exception to the rule. (CL2 §16 verified.)
- No dolphin sighting guarantee — pillar lines 144–145 are the source of truth.

Writer: ack this brief, raise the §15 open questions with the operator, then draft the EN piece. The reviewer reviews against §14. Translation to pt/es/fr is a separate Sonnet pass after EN review (per the project memory `feedback_opus_for_writing` — Opus drafts content, Sonnet handles schema/translation plumbing).

---

*End of brief.*
