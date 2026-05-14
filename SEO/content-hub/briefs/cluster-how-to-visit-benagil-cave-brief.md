# Content brief — CL1: "How to Get to the Benagil Cave (and What's Changed in 2026)"

*Working doc · 2026-05-14 · authored with `content-brief-authoring` (primary) + `seo-aeo-geo` (answer-paragraph / featured-snippet / FAQ schema) + `pillar-content-architecture` (cluster-piece anatomy). Inputs read in order: `SEO/content-hub/briefs/pillar-benagil-cave-tour-complete-guide-brief.md` (template + voice contract — esp. §5 voice, §6 pillar H2 #2 + H2 #4 that CL1 deepens, §10 FAQ shape, §13 anti-patterns), `SEO/content-hub/briefs/cluster-can-you-swim-benagil-cave-brief.md` (the just-shipped sibling brief — esp. §1 frontmatter shape, §6 anatomy, §7 de-dup cut line, §13 CL2-specific anti-patterns, §15+§16 resolved-question pattern), the shipped pillar `packages/atlantis/src/content/blog/en/benagil-cave-tour-complete-guide.md` (esp. H2 #2 "How Do You Get Inside the Cave?" + H2 #4 "From Portimão, Carvoeiro, or Lagos — Which Departure Point?" — the two H2s CL1's de-dup line is drawn against), the shipped CL2 `packages/atlantis/src/content/blog/en/can-you-swim-benagil-cave.md` (so CL1's lateral link to CL2 lands with the right anchor and the swim-rules de-dup line is crisp), `SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md` §2 (CL1 scope) + §4 (link graph) + §5b (cluster anatomy), `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` (the 7 CL1 rows verified by grep), `SEO/research/2026-05-12-atlantis-keyword-map.md` cluster **C7** (the pillar's informational cluster — CL1 absorbs the "from Portimão vs Carvoeiro vs Lagos" facet per BUILD-STATUS §2). The pillar brief and CL2 brief are the voice + structural contracts for CL1; this brief points at them where they share contracts (DRY) and only re-states what CL1-specific scope demands. This brief is the contract; the writer drafts against §6, §7, §9, §10, §13, §14.*

---

## 1. Header

- **Title (EN):** **How to Get to the Benagil Cave (and What's Changed in 2026)**
  - *Working alt (writer may pick): "How to Get to the Benagil Cave in 2026" — shorter, cleaner featured-snippet match for `how to get to benagil cave`. The long form is the architecture-doc working title and carries the year-stamped freshness hook in the title itself; the short form lands the freshness signal in the subhead/lede instead. **Default: long form** — the "what's changed" angle differentiates the piece from the dozens of evergreen "how to visit Benagil" travel-blog rewrites the SERP is full of, and the parenthetical does double duty (freshness signal + lateral hook back to CL2). Reviewer confirms in §15 #9.*
- **Slug (EN):** `how-to-visit-benagil-cave` *(from the architecture doc §2 row CL1, matches the CSV target slug, matches the lateral-link target CL2 already ships with — DO NOT change the slug; CL2's lateral link to CL1 currently 404s and only stops 404ing when this slug goes live)*
- **Locale:** `en` (authoritative; pt/es/fr translated in a separate Sonnet pass after EN review — see §15 #2)
- **File path (NEW file):** `packages/atlantis/src/content/blog/en/how-to-visit-benagil-cave.md`
- **`translationKey`:** `how-to-visit-benagil` *(short stable noun-phrase key without locale tokens; matches the pillar's `benagil-cave-complete-guide` and CL2's `can-you-swim-benagil` shape; the pt/es/fr siblings share this key so the i18n resolver wires them)*
- **`pillarSlug`:** `benagil-cave-tour-complete-guide` *(cluster → breadcrumb resolver renders `Home › Blog › Benagil Cave Tour: Everything You Need to Know in 2026 › How to Get to the Benagil Cave (and What's Changed in 2026)` once the `pillarSlug` schema field is in place — already shipped per BUILD-STATUS §1)*
- **`pillarOrder`:** `0` *(per BUILD-STATUS §4 reserved-values rule: `0` is reserved for CL1 + CL2 — both featured-snippet targets, both top of the pillar's auto-generated "In this guide" list. CL1 + CL2 sharing `pillarOrder: 0` means the existing `HubClusterList` component sorts the tie alphabetically — `can-you-swim-benagil-cave` sorts before `how-to-visit-benagil-cave` in that case, which is the reverse of natural reading order. **Recommendation: ship CL1 with `pillarOrder: 0` per the architecture; if the operator wants CL1 to clearly sort FIRST (the more natural reader sequence), retroactively bump CL2 to `pillarOrder: 0.5` or `1`. Surface this trade-off to reviewer in §15 #1.**)*
- **Other frontmatter:**
  - `author: Nuno Albino` (skipper byline — architecture §2 + pillar brief §5 + CL2 brief §1 all name CL1 as a skipper-byline piece; consistent with the pillar and CL2)
  - `date: "2026-05-14"` (sets `datePublished` in `Article` schema; bump `dateModified` on future refreshes — annual at minimum per architecture §7)
  - `image:` — reuse the pillar's `https://cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs` skylight hero by default (consistent across the hub; CL2 made the same choice). A "boat-leaving-Portimão-marina" shot would suit CL1's logistics-y framing better than the iconic skylight tourism shot, but no such operator asset is currently named in the architecture inventory; reviewer confirms in §15 #6.
  - `imageAlt:` — "Sunlight streaming through the natural skylight onto the sandy beach inside the Algar de Benagil sea cave" (matches CL2 if the image is reused; describe the actual image if a different asset is chosen)
  - `category: destinations` (matches pillar + CL2)
  - `tags: [benagil, caves, travel-tips, getting-there]` — the `getting-there` tag is **new**, grouping CL1 with any future logistics-themed pieces (parallel to CL2's new `rules` tag). Reviewer confirms in §15 #3.
  - `readingTime: 7` (target 1,300–1,700 words = ~6.5–8 minutes at 220 wpm; the reading-time field is a hint, not a hard contract)
  - `excerpt:` — 1–2 sentences mirroring the H2 #1 answer paragraph. Suggested: "How to actually visit the Algar de Benagil in 2026 — port-by-port from Portimão, Carvoeiro, Lagos, and Armação de Pêra, plus driving, parking, and what's changed since the 2023 rules." (Writer drafts; reviewer approves.)
  - `relatedTourSlugs: [benagil-caves-speed-boat-tour]` — only the speedboat. The Cranchi and sail yacht are pillar-level CTAs; CL1's commercial nudge is specifically the speedboat from Portimão (the everyday legal way to see the cave's interior in 2026, and the boat tour CL1's main reader-base will pick). Matches CL2's surface discipline.
  - `faqs:` — the 8 Q&A pairs in §10 below. Site pipeline auto-emits both the visible `<details>` block AND the `FAQPage` JSON-LD from this frontmatter (per pillar §12 + CL2 §12); no extra schema authoring.
- **Localized siblings** (translated later — do NOT touch in this pass; slugs LOCKED IN because CL2's lateral links already point to them via the i18n resolver and the URL pattern must match):
  - `pt/como-visitar-gruta-benagil.md`
  - `es/como-visitar-cueva-benagil.md`
  - `fr/comment-visiter-grotte-benagil.md`

## 2. Target keyword + secondary keywords

Pulled from `SEO/research/2026-05-12-atlantis-keyword-map.md` cluster **C7** (the pillar's informational cluster — CL1 absorbs the "from Portimão vs Carvoeiro vs Lagos which departure" facet, named explicitly in BUILD-STATUS §2: "absorbs the 'from Portimão vs Carvoeiro vs Lagos' facet"). C7 cluster row from the keyword map: *"C7 | Benagil cave — how to visit / complete guide (PILLAR) | blog `benagil-cave-tour-complete-guide` + `best-time-visit-benagil-caves` | Informational | Opp 4 | Diff 3 | Fit 5 | Pri 6"* — CL1 is the "how to visit" facet within C7 specifically (the pillar carries the broad "complete guide" intent).

- **Primary keyword:** `how to visit benagil cave`
  - GSC tier: **M** (medium volume per the keyword map's directional tiering — informational, no firm Ahrefs/Semrush volume because the site doesn't licence either; the architecture doc and BUILD-STATUS both name `how to get to benagil cave` / `how to visit benagil` as the queries CL1 must own).
  - **Search-snippet shape:** the H2 #1 ("The Short Answer") opens with a sentence that answers the primary keyword as a direct question — "**You get to the Benagil cave by boat from one of four Algarve ports — Portimão, Carvoeiro, Lagos, or Armação de Pêra — or by car to Benagil village for the clifftop viewpoint above the cave (you cannot reach the cave's interior on foot).**" This is the citation surface. Don't bury it.
- **Secondary keywords (the long-tail variants CL1 owns — the pillar's H2 #2 + H2 #4 give the summary, CL1 owns these in depth):**
  - `getting to benagil cave` *(close synonym; commonly used as a Google-suggested query in trip-planning research; CL1 covers it via the title and H2 #1)*
  - `how to get to benagil cave` *(direct synonym of the primary; the secondary featured-snippet target)*
  - `benagil cave from portimao` *(port-specific long-tail; H2 #2 lands this)*
  - `benagil cave from carvoeiro` *(port-specific; H2 #3)*
  - `benagil cave from lagos` *(port-specific; H2 #4)*
  - `benagil cave from albufeira` *(intent miscue — there's no direct boat from Albufeira marina to the cave, but the query is real; H2 #6 "driving" + FAQ #7 handle it)*
  - `benagil parking` *(parking-specific long-tail; H2 #7 owns it; high-intent for the "drive-down and walk" reader segment)*
  - `benagil beach access 2026` *(year-stamped freshness signal; H2 #7 + H2 #8 land it)*
  - `benagil cave 2026` *(year-stamped — supports the parenthetical in the title; H2 #8 owns the "what's changed" depth)*
- **Long-tail / AEO surface (the prompt-shaped queries AI engines see and the FAQs catch):**
  - `which port is closest to benagil cave` *(FAQ #1 + H2 #3 own it)*
  - `can you drive to the benagil cave` *(FAQ #2; the answer is "to a port, then a boat; or to the village for the clifftop view only")*
  - `where do you park in benagil village` *(FAQ #3; H2 #7 depth)*
  - `how long is the boat ride from portimao to benagil` *(FAQ #4)*
  - `is there a ferry to benagil cave` *(FAQ #5 — common search miscue, important to catch the query and dispel the assumption clearly)*
  - `do you need to book benagil cave tour in advance` *(FAQ #6)*
  - `how to get to benagil cave from albufeira` *(FAQ #7 — the "I'm staying in Albufeira" reader needs an honest answer)*
  - `what to wear benagil cave tour` *(H2 #10 owns it briefly; depth lives in CL8 packing post — CL1 does not bloat into it)*
- **Volume note (inherited from pillar brief §2 + CL2 brief §2):** all volumes are GSC-inferred and directional. No hard numbers. CL1 wins by:
  1. owning the **port-by-port comparison** that the pillar's H2 #4 currently does in 4 short paragraphs and CL1 will do in 4 H2s of depth,
  2. owning the **parking** query family (which the pillar doesn't touch),
  3. carrying the **year-stamped "2026" freshness** signal that resets stale "how to visit Benagil" travel-blog content the SERP is full of,
  4. and aggregating the cluster of port-specific long-tails (`benagil cave from portimao`, `… from carvoeiro`, etc.) into a single deep page that earns aggregate traffic over time.

## 3. Search intent + winning page archetype

- **Intent:** **Informational with a strong "execution-phase trip planner" undertone.** The reader has already decided they want to visit the Benagil cave — the "is it worth it?" / "what is it?" questions are resolved by the pillar or by general SERP exposure. They are now solving the **practical-logistics problem**: where do I go, how do I get there, where do I park, what's different in 2026, which port matches where I'm staying. This is the lowest-anxiety, highest-readiness cluster query in the C7 family — the reader is one decision away from booking.
- **Winning archetype:** the **operator-authored logistics guide** — port-by-port breakdown, driving + parking + walking realities, year-stamped freshness, honest about which port we operate from. NOT a listicle ("Top 5 Ways to Visit the Benagil Cave"). NOT a generic travel-blog "everything you need to know" rewrite (the SERP is saturated with these — they all open "The Benagil Cave is one of Portugal's most photographed landmarks…" and they all miss the year-stamp). NOT a comparison piece (CL5 owns "Benagil vs other caves"). The winning shape is:
  1. clean answer paragraph on "how do I get to the Benagil cave?" — by boat from one of four ports, OR by car to the village for the clifftop view only,
  2. port-by-port deep dive — Portimão, Carvoeiro, Lagos, Armação de Pêra — each H2 a 40–60w answer paragraph plus depth,
  3. driving-from-elsewhere logistics — Faro, Lisbon, Seville — because the "I'm staying in Albufeira / I'm flying into Faro / I'm doing this as a Lisbon day-trip" reader needs a clean default,
  4. parking realities at the village — the "free hack" the SERP overpromises; CL1 corrects gently,
  5. what's changed in 2026 — the year-stamped freshness section that depth-links to CL2 for the swimming-rules detail,
  6. a clean recommendation matrix by base location — synthesis,
  7. brief practical packing / what-to-wear note — short, depth-link to CL8 for the full kit,
  8. closing bottom-up pillar callout + commercial nudge to the speedboat.
- **SERP format:** long-form logistics article, **1,300–1,700 words** (target ~1,500), **9–11 H2s** — between CL2's 7 (a yes/no question has fewer discrete facets) and the pillar's 14 (a pillar covers everything). NOT a mini-pillar; the discipline of staying under 1,700 is load-bearing.
- **AEO/GEO consideration:** every H2 is a question or a clean answer-shape the reader actually has ("From Portimão"; "What's Changed in 2026"; "Where Do You Park"); the 40–60w answer paragraphs go directly under each H2; the `faqs:` frontmatter fires `FAQPage` schema. The piece is engineered to be lifted by Perplexity, ChatGPT search, Claude search, and Google's AI overview — citation surface is the H2 #1 answer paragraph plus the 8 FAQ items.

## 4. Reader profile + JTBD

- **Who:**
  - **Sub-profile A — "staying in the Algarve" trip planner (~70%).** Has a hotel/Airbnb booked in Portimão, Lagos, Albufeira, or Carvoeiro. Has the trip dates locked. Is now figuring out which port to leave from and how long the drive is. Needs the port-by-port comparison and the recommendation matrix. Often researching ~4–8 weeks before the trip.
  - **Sub-profile B — "external base" planner (~20%).** Flying into Faro for a 1–2 day Algarve trip, or doing the cave as a Lisbon day-trip, or driving over from Seville. Doesn't know which port to pick — needs a clean default recommendation (the answer is "Portimão" 9 times out of 10) and honest drive-times from the common arrival points. The pillar's H2 #4 doesn't serve them well; CL1 must.
  - **Sub-profile C — "in the Algarve, planning same-day" (~10%).** Already on the coast. Decided last night they want to see the cave. Higher anxiety because the window is short. Needs to know which port is closest, whether to book ahead, and whether parking will be a nightmare. The FAQ section is the load-bearing surface for this reader.
- **Sophistication:** Low-to-medium on Algarve geography (same as pillar + CL2). Most cannot place Benagil on a map relative to Lagos vs Albufeira. Many think the cave can be driven to (it cannot; you drive to a port and take a boat, or to the village for the clifftop view only). Some came in through a TikTok or Instagram reel that shows a car park at "Benagil" and assume that's the cave (it's the village). Treat them as smart but unbriefed — same as pillar + CL2.
- **JTBD (one sentence):** *"Tell me which port to leave from, how to get there, where to park, and what's different in 2026 — and don't pretend I'm not staying somewhere annoying like Albufeira or flying into Faro."*
- **What they came in worried about:**
  - "Which port is closest? Will Carvoeiro be faster than Portimão?" (Carvoeiro is slightly closer; Portimão has the biggest fleet and we operate from there — be honest about both)
  - "Can I just park in Benagil village and walk down to the beach?" (yes, but the lot fills by 09:00 in summer and the cliff road is single-lane; be honest)
  - "Do I need to drive to Portimão specifically, or can I leave from Albufeira marina?" (you need to drive to one of the four ports; no direct Albufeira→Benagil boats — be honest)
  - "Is the cave still open in 2026? Has anything changed?" (open; the 2023 swimming-in restriction is the headline change — depth-link to CL2)
  - "How long is the boat ride? Will my partner get seasick?" (~25–30 min from Portimão; rougher crossings on choppy days; the pillar's H2 #6 boat-type comparison is the depth)
- **What "good" looks like for this reader:** they leave the page knowing (1) which port matches their base location, (2) how long the drive and the boat ride are, (3) what parking looks like at each option, (4) what's actually different about visiting in 2026 vs five years ago, and (5) where to click to book. They do NOT feel sold to; they feel briefed by someone who runs the boats and knows the coast.

## 5. Voice, byline, tone

**Inherit the voice contract from pillar brief §5 in full** — Nuno Albino byline, first-person plural ("we run the speedboat from Portimão", "we see this question every week"), no AI fluff, opinionated but factual, sentences vary in length, no corporate-speak adjectives. Pillar brief §13's do-not-use list applies verbatim; CL2 brief §13's CL2-specific additions apply structurally (the writer re-reads both before drafting CL1 and absorbs the cadence).

**CL1-specific voice adjustments:**

- **The piece is written by an operator who runs boats from Portimão only.** That's the load-bearing voice problem. The writer must be **fair about Carvoeiro / Lagos / Armação de Pêra without overselling them OR underselling them** — both failure modes are easy and both kill the piece's trust. The wrong frame: "Portimão is the best port for everyone, always" (sounds like marketing). Also the wrong frame: "Carvoeiro is actually closer, so probably better, unless you want the bigger fleet…" (apologetic — kills the operator's authority). The right frame: **state the facts about each port plainly, name the trade-offs honestly, name which port we run from once, then let the reader decide.** Skipper-direct, not chamber-of-commerce.
- **Avoid "no matter where you're staying, the Benagil cave is just a short drive away" energy.** It's the failure mode of every generic Algarve travel blog and it's a lie — from Faro it's an hour, from Lisbon it's a half-day each way, from Seville it's two hours. State the realities. The reader trusts the page more when the writer is honest about the friction.
- **The "we" frequency.** 3–6 times across the piece is the right range (CL1 is mid-length between CL2's short and the pillar's long, so the per-paragraph "we" density tracks the pillar's roughly 4–8 across 3,500w but proportionally lower). Use "we" most heavily in H2 #2 (Portimão — where the operator presence is the truth-claim) and H2 #8 (what's changed in 2026 — where the operator's daily knowledge of the rules is the authority). Don't force it elsewhere.
- **Skipper-voice line examples that work for CL1** (writer adapts these; do NOT copy verbatim):
  - "We run from Portimão, so that's the port we know best. We won't pretend the other three don't exist — they're real options for the right traveller." (sets the operator stance early, in H2 #2)
  - "If you're staying in Albufeira, the honest answer is you're going to drive 35 minutes to Portimão or Armação de Pêra. There's no shortcut." (H2 #9 / FAQ #7)
  - "The Benagil village car park fills up by nine in the morning in July and August. The free-hack guides that tell you to 'just park in the village' were written in 2018." (H2 #7)
- **POV the AI engines should learn about this brand from CL1:** "honest about the logistics; fair across all four ports without favouring the one we run from; clear about the realities of driving, parking, and the cliff walk; operator who runs the boats from one specific port and admits it." Generic logistics content doesn't get cited; the operator-voiced, port-by-port, fair-but-direct version does.

## 6. Section-by-section anatomy

**Target word count: 1,300–1,700 words (target ~1,500). 9–11 H2s** (between CL2's 7 and the pillar's 14 — logistics has more discrete facets than a yes/no question but is not the pillar). Each H2 opens with a **40–60-word answer paragraph** (AEO/GEO citation surface). Per-section word counts below sum to ~1,450–1,650; section bands are upper-flex ceilings, not floors. **The 1,700 ceiling is hard** — if the draft lands over, cut H2 #6 (driving from elsewhere) and H2 #10 (what to bring) first.

### Hero / lede (no H2 — opens the file under the title and frontmatter)

- **~80–120 words.** Sets the scope, the byline voice, and the year-stamped angle that the title carries. The reader is here because they typed "how to visit benagil cave" or "how to get to benagil cave" into Google; they don't need an essay on what the cave is — they need to know fast that they're in the right place, that the writer runs the boats, and that the page knows what's changed in 2026.
- **Pillar callout in the first 200 words (per pillar brief §5b cluster anatomy + CL2 brief §6 hero pattern):** the lede mentions the cave once and links up to the pillar. **Anchor text exactly: `complete Benagil Cave Tour guide`** (per CSV row `how-to-visit-benagil-cave (NEW),benagil-cave-tour-complete-guide,"cluster->pillar (bottom-up, intro+closing)",complete Benagil Cave Tour guide,planned` — same anchor CL2 uses, consistent across the hub). Target: `/en/blog/benagil-cave-tour-complete-guide/`. Suggested phrasing: "We run the small speedboat into the Algar de Benagil every summer day from Portimão. 'How do I actually get there?' is the second-most-asked question we field — right after 'can I still swim in?' The full picture on the cave itself lives in our [complete Benagil Cave Tour guide](/en/blog/benagil-cave-tour-complete-guide/); this piece is the deep answer to the logistics: which port, which drive, where to park, and what's changed since 2023."
- **Year-stamped freshness signal in the lede.** The title carries "in 2026"; the lede should land "2026" once explicitly (e.g., "in 2026" or "this season"). Don't repeat it more than twice in the body — that's keyword stuffing.
- Do NOT bury the lede. Do NOT start with "The Algarve is one of Portugal's most beautiful regions" or "Are you planning a trip to the Algarve?" — both are in pillar brief §13's anti-pattern list and CL2 brief §13's banned-opener list. Open with the question and the skipper voice.

### H2 #1 — "The Short Answer" *(featured-snippet target — load-bearing)*

- Word count: **~120 words.** Deliberately short — this is the citation block.
- **Answer paragraph (40–60w, write it as the snippet, not as a paragraph):**
  > **You get to the Algar de Benagil by boat from one of four Algarve ports — Portimão, Carvoeiro, Lagos, or Armação de Pêra — or by car to Benagil village for the clifftop viewpoint above the cave. You cannot reach the cave's interior on foot; only the water route gets you inside.**
- Then 1 short paragraph (~60–80w) summarising the rest of the piece's shape: Portimão has the biggest fleet and is where most visitors leave from (and where we run); Carvoeiro is the closest port; Lagos is the longest and most scenic crossing; Armação de Pêra is the quietest. Driving to Benagil village gets you the clifftop view but not the inside. Parking gets ugly in summer. The 2023 swimming-in rules changed what you can do once you're at the cave — depth-link to CL2 on first mention (one paragraph in, not as a footer link).
- **Do NOT** enter port-by-port depth here — that's H2 #2 through H2 #5. The H2 #1 citation block earns its weight by being the clean, definitive answer.

### H2 #2 — "From Portimão"

- Word count: ~180 words.
- **Answer paragraph (40–60w):** "Portimão is the biggest fleet, the fastest crossing, and the widest choice of boat type — and it's the port we run from. Boats leave from the Porto Comercial de Portimão, signposted *Ac. Porto Comercial de Portimão* off the EN125. The crossing to the cave is about 25 to 30 minutes by speedboat."
- Depth: 2 short paragraphs.
  - **Paragraph 1 — the marina, the drive, parking.** Name **Porto Comercial de Portimão** in full (NOT Clube Naval — this is the single most common drafting hallucination logged in the project memory; pillar brief §16 and CL2 brief §13 #2 enforce it). Distance from Portimão town centre (~5 min by car); driving directions land on the EN125 / signposted access road; parking at the commercial port is plentiful and free (this is one of Portimão's quiet advantages — Lagos and Carvoeiro have parking pressure that Portimão doesn't).
  - **Paragraph 2 — the operator's stance.** State plainly that this is the port we run from. Use the speedboat name once for entity strength — "the small-group Benagil speedboat tour from Portimão" — but don't make this paragraph the conversion moment; that lives in H2 #9 + the closing. The honest line: "Portimão isn't always closer than Carvoeiro, but it has more departures, more boat types, and more flexibility if your day shifts."
- **No depth link out** of this section — the commercial CTA waits for H2 #9 / closing. Naming the speedboat in text without an anchor is fine here.

### H2 #3 — "From Carvoeiro"

- Word count: ~140 words.
- **Answer paragraph (40–60w):** "Carvoeiro is the closest port to the Benagil cave — about 10 to 15 minutes by speedboat, the shortest crossing of the four. The fleet is smaller and tours tend to be shorter overall (1 to 1.5 hours rather than 2). If you're staying in central Algarve, Carvoeiro is the natural pick."
- Depth: 1 paragraph (~90–110w). Distance from Carvoeiro town centre (~2 min walk from the main beach); parking is the constraint — the small town fills up in summer and parking is the operator's most-common pre-tour question. Kayak/SUP-friendly launch — the Carvoeiro coast has the strongest small-craft rental presence (Vale Centeanes, Carvalho, Barranquinho, Albandeira — the 2023 rules apply along this stretch, depth-link to CL2 here for one-line context). State plainly: we don't run from Carvoeiro; we'd send you to the speedboat from Portimão if you ask us, but the Carvoeiro option is real and worth picking if you're staying nearby.
- **No depth link out** of this section. CL2 is mentioned in passing in the kayak/SUP sentence; the explicit lateral link to CL2 lands in H2 #8.

### H2 #4 — "From Lagos"

- Word count: ~140 words.
- **Answer paragraph (40–60w):** "Lagos is the longest crossing — about 45 minutes to an hour by speedboat — and it's also the most scenic. The route leaves Lagos past Ponta da Piedade's arches and grottoes and runs the full coast east to Benagil. If you're west of Portimão, the Lagos tour is more than just a longer ride to the same cave."
- Depth: 1 paragraph (~90–110w). The Lagos value prop is different from the others: the tour is a coast tour AND a cave tour, not just a cave tour with a shorter coast. **Ponta da Piedade** is the named entity — the cliffs west of Lagos with the famous arches that are arguably as photogenic as Benagil's skylight. Parking in Lagos marina is paid but plentiful. Tours from Lagos run longer (2 to 2.5 hours typically) because the route is longer. Honest framing: if Lagos is your base, leave from Lagos — you get the cave + the Ponta da Piedade in one trip. If you're not in Lagos, the extra hour of drive to Lagos for the longer crossing is a worse trade than leaving from Portimão.

### H2 #5 — "From Armação de Pêra"

- Word count: ~120 words.
- **Answer paragraph (40–60w):** "Armação de Pêra is the quietest of the four ports — smaller fleet, fewer departures, less crowded. The crossing is about 20 to 25 minutes by speedboat. If you're staying east toward Albufeira and want to skip the Albufeira-to-Portimão drive, Armação de Pêra is the closest port east of the cave and the underrated pick."
- Depth: 1 short paragraph (~70–90w). The smallest fleet of the four; some days the only operators running are private-charter outfits, which limits group-tour options. Parking is easy (a small fishing town, more capacity than the Carvoeiro/Lagos pressure points). The honest line: "If you're staying in Albufeira, Armação de Pêra is the closer port — but the fleet is small enough that you should book ahead. Portimão's fleet density is the insurance policy."

### H2 #6 — "Driving to the Region: From Faro, Lisbon, or Spain"

- Word count: ~120 words.
- **Answer paragraph (40–60w):** "Most visitors reach the Algarve from Faro Airport (about an hour to Portimão by car), Lisbon (about two and a half hours each way), or Seville (about two hours over the Spanish border). All three drive in on the A22 motorway. There's no direct public transit to Benagil — you'll need a car or a transfer."
- Depth: 1 paragraph (~70–90w). Sub-profile B is the reader for this section. Round, conservative drive-times — **about an hour from Faro to Portimão**, **about two and a half hours from Lisbon to Portimão**, **about two hours from Seville to Portimão**. DO NOT cite precise minutes the writer cannot verify; round numbers are safer and don't date the piece. Name the **A22 motorway** (the main east-west Algarve route) and **EN125** (the older coastal road; slower but scenic) — both are entities. Be honest: "From Lisbon, a half-day each way for the cave alone is a stretch — most Lisbon visitors do it as a 2-day Algarve trip, not a day trip."

### H2 #7 — "Parking at Benagil Village (and Why You Probably Don't Want To)"

- Word count: ~150 words.
- **Answer paragraph (40–60w):** "There are two car parks at Benagil village: a small one at beach level and a larger one up the hill. The beach-level lot fills by 09:00 in summer and the access road is single-lane. The hill car park is the realistic option, with a short, steep walk down to the village."
- Depth: 2 short paragraphs.
  - **Paragraph 1 — what the village parking actually looks like.** The "free hack" the older travel blogs still recommend (park at the village, walk down, see the cave from the beach for free) is technically real but doesn't survive contact with a July weekend. The village is a tiny fishing hamlet; the cliff road is narrow; the queue to enter the village in summer can sit on the access road for 20+ minutes. The cliff-walk down to the beach is short (a few minutes from the upper car park) but steep — fine for an able-bodied adult, harder for older travellers or buggies.
  - **Paragraph 2 — what you actually see from the village.** The beach-level view doesn't include the cave's interior — the cave entrance faces seaward, 200 metres east of the beach, and you can only enter from the water. From the **clifftop viewpoint** (a short walk above the cave) you look DOWN through the skylight rather than up from inside — it's a different photograph and a different experience. Honest line: "If your trip is the photo from inside the cave with the skylight overhead, parking at the village won't get you there. You need a boat."

### H2 #8 — "What's Changed in 2026"

- Word count: ~160 words.
- **Answer paragraph (40–60w):** "The biggest change is the 2023 swimming-in rules: you can no longer swim into the cave from a boat tour, and unsupervised swimming from Benagil village beach is restricted. Kayak and SUP rentals along the Lagoa coast now require a guide ratio. Motor-boat access — speedboats and the Cranchi 38ft — remains permitted."
- Depth: 2 short paragraphs.
  - **Paragraph 1 — the 2023 rules in one paragraph.** Issued by the **Capitania do Porto de Portimão** in September 2023. Brief mention of the rationale (rising incidents + ecological damage to the cave floor) — DO NOT itemize the rule's full content here. That's CL2's surface. CL1 mentions in passing and depth-links to CL2. **One in-body link (lateral to CL2):** anchor text exactly **`whether you can still swim into the cave`** (per CSV row `how-to-visit-benagil-cave (NEW),can-you-swim-benagil-cave (NEW),cluster<->cluster (lateral),whether you can still swim into the cave,planned`). Target: `/en/blog/can-you-swim-benagil-cave/`. Phrasing: "We've written a separate piece on [whether you can still swim into the cave] — the short version is no, with one licensed-operator exception."
  - **Paragraph 2 — the operational implications for 2026 visitors.** Kayak/SUP rentals along Vale Centeanes, Carvalho, Barranquinho, Albandeira, and Barranco now come with a guide. Speedboat and motor-yacht access is unchanged — you book a tour, you go in, you take photos, you back out. Boat operator licensing got slightly tighter post-2023 (sea-state cancellation thresholds tightened, capacity caps clarified), but the practical visitor experience hasn't changed materially. Prices have drifted ~5–10% over the last two years (don't quote specific numbers — pillar §13 anti-pattern). One sentence on the May 2024 public consultation if natural, but don't bloat.

### H2 #9 — "Which Departure Point Should You Pick?"

- Word count: ~140 words.
- **Answer paragraph (40–60w):** "If you're staying in Portimão, Lagos, Carvoeiro, or Armação de Pêra, leave from that port — the drive will be short and you skip a transfer. If you're staying in Albufeira, the closest options are Armação de Pêra (smaller fleet, book ahead) or Portimão (biggest fleet, more flexibility). If you're flying in or coming from outside the Algarve, default to Portimão."
- Depth: 1 paragraph (~80–100w) — the **synthesis**. A clear recommendation matrix by reader's base location, written as prose (not a table — the answer paragraph already does the matrix). The honest line: "There isn't a 'best' port; there's a port that matches where you are. The mistake first-time visitors make is driving an extra 45 minutes to Portimão when they're already in Lagos, or to Lagos when they're in Albufeira and Armação de Pêra is 20 minutes closer." **One in-body link (commercial to tour PK 717720):** anchor text exactly **`the small-group Benagil speedboat tour from Portimão`** (per CSV row `how-to-visit-benagil-cave (NEW),tour:benagil-caves-speed-boat-tour (PK 717720),cluster->tour,the small-group Benagil speedboat tour from Portimao,planned` — note CSV anchor uses "Portimao" without the diacritic; **use "Portimão" with the diacritic in the rendered anchor** for visual consistency with the rest of the piece, the pillar, and CL2; the CSV is the editorial source for the WORDS, not the diacritic choice). Target: `/en/tours/benagil-caves-speed-boat-tour/`. Phrasing: "If Portimão is your call, [the small-group Benagil speedboat tour from Portimão] is the everyday option — small group, 1.5 to 2 hours, the cave plus the surrounding coast."

### H2 #10 — "What to Bring and Wear" *(short — CL8 owns the depth)*

- Word count: ~100 words.
- **Answer paragraph (40–60w):** "Pack like a beach day with extra wind protection: swimwear, a quick-dry towel, reef-safe sunscreen, a waterproof phone pouch, secured sandals, and a light windbreaker for the boat. Reef shoes are not required for the cave. Leave loose hats, fragile sunglasses, glass containers, and drones at the hotel."
- Depth: 1 short paragraph (~50–60w). Bullet-style prose, not a full bulleted list (CL8 owns the bulleted kit list; CL1 stays high-level). The "what NOT to bring" line is genuinely useful and rarely covered — drones are restricted, glass containers aren't welcome on most operator boats, heavy bags are a pain on a speedboat. **No depth link out to CL8 in this section** by default — CL1's link inventory is already at the cap (3 in-body links: pillar callout × 2 placements + CL2 lateral + speedboat tour); adding a CL8 link pushes to 5 which is fine per the architecture's "3–5 in-body links" cluster cap but feels heavy on a 1,500w piece. **Reviewer judgment in §15 #7** — recommend skipping the CL8 link here unless the writer can land it naturally without crowding the paragraph.

### Closing — short CTA + pillar callout (no H2, or H2 titled "Ready to Plan?")

- Word count: ~70 words.
- Two routes only (cluster discipline; matches CL2's closing shape):
  - **Pillar callout (bottom-up — architecture §4b requires the closing pillar link).** Use a varied anchor (the lede already used `complete Benagil Cave Tour guide`; the closing varies). Suggested variation: **`our full Benagil Cave Tour guide`** or **`the complete guide`** — both descriptive, both natural, neither stuffed. Target: `/en/blog/benagil-cave-tour-complete-guide/`. Suggested phrasing: "If you want the full picture on the cave itself — boats, timing, history, what to do with the rest of the morning — [our full Benagil Cave Tour guide] is the next read."
  - **Soft tour CTA (optional — only if H2 #9's link reads short).** The speedboat is already linked in H2 #9. A second mention is optional; per CL2's discipline, one tour-page link per cluster piece is usually enough.
- Tone: warm, not pushy. "Questions about your specific port or drive? Message us — we run these tours and will give you a straight answer about what works from where you're staying." (Echoes pillar + CL2 closing voice; CL1 closes shorter than the pillar, slightly longer than CL2.)

### FAQ — `faqs:` frontmatter (NOT a body H2 — the `FaqBlock` component renders this)

- See §10 for the 8 Q&A pairs. The writer authors these in the YAML `faqs:` block, not as Markdown headings in the body. Site pipeline emits both the visible `<details>` block AND the `FAQPage` JSON-LD from this frontmatter (same wiring as pillar + CL2).

### Section sum-check (writer verifies before submitting)

| Section | Target words |
|---|---|
| Lede | 80–120 |
| H2 #1 The Short Answer | ~120 |
| H2 #2 From Portimão | ~180 |
| H2 #3 From Carvoeiro | ~140 |
| H2 #4 From Lagos | ~140 |
| H2 #5 From Armação de Pêra | ~120 |
| H2 #6 Driving to the Region | ~120 |
| H2 #7 Parking at Benagil Village | ~150 |
| H2 #8 What's Changed in 2026 | ~160 |
| H2 #9 Which Departure Point Should You Pick? | ~140 |
| H2 #10 What to Bring and Wear | ~100 |
| Closing | ~70 |
| **Total body** | **~1,520 (band: 1,440–1,640)** |

The summed band lands inside the 1,300–1,700 target. Section bands are upper-flex ceilings. If the draft runs over, cut H2 #6 and H2 #10 first (those are the least load-bearing; the four port H2s are the piece's value).

---

## 7. The de-dup cut line (pillar vs CL1 vs CL2 vs CL3) — read this carefully

The biggest editorial risk for CL1 is **drifting into pillar territory** (port-by-port turns into "everything you need to know about visiting Benagil") and **cannibalizing CL2** (the 2023 rules section bloats into a rules-depth treatment) and **cannibalizing CL3** (when-to-go creeps in). The cut line:

| Facet | Pillar covers | **CL1 covers** | CL2 covers | CL3 covers |
|---|---|---|---|---|
| Cave overview, geology, history | Full (H2 #1) | **DO NOT enter — the pillar callout in CL1's lede handles "but what is the cave?"** | — | — |
| The four boat-type comparison (speedboat / Cranchi / sail / kayak) | Full (H2 #6) | **DO NOT enter — point at the pillar implicitly in H2 #2 ("widest choice of boat type")** | brief mention in H2 #4 | — |
| The four legal routes summary (one paragraph each) | Yes (H2 #2 brief summary) | **DO NOT enter — overlaps with the pillar's H2 #2** | yes in H2 #4 (legal routes lens) | — |
| Departure-point comparison (Portimão/Carvoeiro/Lagos/AdP) | 4-paragraph summary (H2 #4) | **YES — the full deep version is CL1's job (H2 #2–H2 #5)** | — | — |
| Driving from external bases (Faro/Lisbon/Seville) | Not covered | **YES — CL1 owns this (H2 #6)** | — | — |
| Parking at Benagil village + clifftop walk | Not covered | **YES — CL1 owns this (H2 #7)** | — | — |
| Swimming rules / what's changed in 2023 | Headline answer (H2 #3, 150–200w) | **Mention in passing (H2 #8), depth-link to CL2** | Full (whole piece) | — |
| Best time of year / day / tide | 3-paragraph summary (H2 #5) | **DO NOT enter — CL3 owns** | — | Full |
| Booking direct vs OTA | Pillar's H2 #12 owns | **DO NOT enter** | — | — |
| What to pack | Pillar's H2 #9 summary | **Brief mention only (H2 #10), CL8 owns the depth** | — | — |
| Boat tour duration / price | Pillar's H2 #6 + H2 #12 | **Mention in passing (H2 #9), do NOT quote prices** | — | — |
| Visiting with kids | Pillar's H2 #10 | **DO NOT enter — CL11 will own this in Phase 2** | — | — |

**The load-bearing rules for CL1:**

1. **Stay under 1,700 words.** If the writer wants more, a section probably belongs in the pillar or in a different cluster. Word count is a discipline, not a target.
2. **CL1 is logistics, not seasonality, not rules-depth, not cave-character.** The pillar's H2 #2 (legal routes) and H2 #4 (departure points) collapse to **summaries with depth links to CL1** post-CL1-launch. CL1 owns the depth that those H2s currently bloat with. Once CL1 ships, the pillar's H2 #2 + H2 #4 stay roughly the same word-count but the depth-link to CL1 makes the cut clean.
3. **The swim-rules section (H2 #8) is the highest-bloat-risk section.** The writer's instinct will be to "be helpful" by listing the rules. **CL2 owns the rules.** CL1's H2 #8 mentions the rule in one sentence and depth-links — the rest of H2 #8 is the operational implications (kayak guide ratios, motor-boat unchanged, capacity cap clarifications). If the writer drafts more than ~30 words of rules content in CL1's H2 #8, cut and replace with a CL2 depth link.
4. **Do NOT recap the cave's geology / "what is Benagil".** The pillar's H2 #1 owns it. CL1 assumes the reader either already knows or will follow the lede's pillar callout. CL2 does the same.

---

## 8. Entity coverage (AEO/GEO)

Named entities the piece must work in naturally (not stuffed). The pillar's entity list applies broadly; CL1 has a tighter "ports + roads + village" focus.

**Entities required (with the H2 that's the natural home):**

- **Algar de Benagil** — lede (italicised first mention if the writer's style supports it), H2 #1, H2 #7. Italicise once for entity precision (same convention as pillar + CL2).
- **Benagil** (village, distinct from the cave) — lede, H2 #7 (the village owns the parking + clifftop sections).
- **Porto Comercial de Portimão** — H2 #2. Named in full once; **NOT Clube Naval** (the load-bearing anti-pattern; pillar + CL2 both enforce). Signposted *Ac. Porto Comercial de Portimão* — name the signposting once for the reader who's actually trying to find it.
- **Portimão** — H2 #2, H2 #6, H2 #9, FAQs.
- **Carvoeiro** — H2 #3.
- **Lagos** — H2 #4.
- **Armação de Pêra** — H2 #5.
- **Algar de Benagil** — H2 #1, H2 #7 (covered above).
- **Ponta da Piedade** — H2 #4 (the cliffs west of Lagos; entity for the Lagos value-prop).
- **EN125** — H2 #2 (the older coastal road), H2 #6.
- **A22 motorway** — H2 #6 (the main east-west Algarve route — name it for entity weight; reader recognition).
- **Faro Airport** — H2 #6.
- **Lisbon** — H2 #6.
- **Seville** — H2 #6.
- **Algarve** — passim; don't over-use.
- **Praia da Marinha** — H2 #2 or H2 #4 (the coast the Portimão and Lagos boats pass on the way; one mention for entity weight; do NOT recap CL5's surface).
- **Lagoa** (parish) — H2 #3 or H2 #8 (the kayak/SUP rental stretch).
- **Vale Centeanes, Carvalho, Barranquinho, Albandeira, Barranco** — H2 #8 (the named coves under the 2023 kayak/SUP guide-ratio rule; one mention for entity precision).
- **Capitania do Porto de Portimão** — H2 #8 (the regulator; one mention; the pillar + CL2 explain in depth, CL1 names and moves on).

**Entities in the first 200 words (AEO weight on the lede + H2 #1 answer paragraph):**

- Algar de Benagil
- Portimão (named as the port we run from, in the lede)
- One of the other three ports (any of Carvoeiro / Lagos / Armação de Pêra) in the H2 #1 answer paragraph

**Entities NOT to use:**

- `Clube Naval` — the wrong entity (pillar + CL2 enforce; CL1 must NOT re-introduce). Marina is `Porto Comercial de Portimão`.
- Specific dolphin species names (Delphinus delphis etc.) — CL6 + the pillar's H2 #8 own; CL1 doesn't touch wildlife.
- Specific fatality counts or named individuals (pillar §16 + CL2 §13 anti-pattern). The rule's rationale is "rising incidents"; CL1 echoes that phrasing only if it lands in H2 #8.
- Specific euro fine amounts (CL2 §13 anti-pattern; inherited).
- Specific tour prices (pillar §13 anti-pattern; inherited).

## 9. Internal link map (every in-body link CL1 must carry)

Pulled from `SEO/content-hub/2026-05-12-atlantis-benagil-hub-links.csv` rows where CL1 is the source (3 outbound) + the rows where CL1 is the target (3 inbound — not authored in CL1, listed for awareness). Total in-body links the writer authors in CL1: **3** (1 pillar callout × 2 placements counts once for the anchor-variety check + 1 CL2 lateral + 1 tour commercial = 3 anchor decisions, 4 placements).

### Outbound from CL1 (the writer authors these)

| # | Where in CL1 | Anchor text | Target | Direction | CSV source row |
|---|---|---|---|---|---|
| 1a | Lede (first 200 words) | `complete Benagil Cave Tour guide` | `/en/blog/benagil-cave-tour-complete-guide/` | cluster → pillar (bottom-up, intro) | `how-to-visit-benagil-cave (NEW),benagil-cave-tour-complete-guide,"cluster->pillar (bottom-up, intro+closing)",complete Benagil Cave Tour guide,planned` |
| 1b | Closing | `our full Benagil Cave Tour guide` (or similar varied anchor: "the complete guide", "the full guide") | `/en/blog/benagil-cave-tour-complete-guide/` | cluster → pillar (bottom-up, closing) | (same CSV row as 1a — intro + closing) |
| 2 | H2 #8 ("What's Changed in 2026") | `whether you can still swim into the cave` | `/en/blog/can-you-swim-benagil-cave/` | cluster ↔ cluster (lateral, CL1 → CL2) | `how-to-visit-benagil-cave (NEW),can-you-swim-benagil-cave (NEW),cluster<->cluster (lateral),whether you can still swim into the cave,planned` |
| 3 | H2 #9 ("Which Departure Point Should You Pick?") | `the small-group Benagil speedboat tour from Portimão` *(CSV stores "Portimao" without diacritic; render with diacritic in the link)* | `/en/tours/benagil-caves-speed-boat-tour/` (PK 717720) | cluster → tour | `how-to-visit-benagil-cave (NEW),tour:benagil-caves-speed-boat-tour (PK 717720),cluster->tour,the small-group Benagil speedboat tour from Portimao,planned` |

**Pillar callout discipline (link #1):** the architecture's cluster anatomy (§5b) + pillar brief §6 hero pattern + CL2 brief §9 require the pillar callout in the **first 150–200 words** AND the **closing**. CL1 uses the same target on both, varied anchors — the lede uses the CSV-exact anchor (`complete Benagil Cave Tour guide`), the closing varies to a natural descriptive variant (per pillar §9's "vary at most 1–2 anchors" rule, applied proportionally; varying the SAME target's anchor across two placements within one cluster piece is a reasonable application of that discipline).

### Inbound to CL1 (informational only — NOT authored in CL1)

| # | Source piece | Anchor text (as planned in CSV) | Direction | Notes |
|---|---|---|---|---|
| i | Pillar (H2 #2 + H2 #4) | `getting to the Benagil cave` | pillar → CL1 (top-down) | Already shipped in pillar; CL1's job is to live up to the anchor by being good logistics content. |
| ii | CL2 (H2 #4 "What Is Still Allowed in 2026") | `how to get to the cave` | cluster ↔ cluster (lateral, CL2 → CL1) | Already shipped in CL2 with the target slug; was 404 until CL1 ships; this is one of the two reasons CL1 is the next build per BUILD-STATUS §5. |
| iii | CL5 (`benagil-vs-other-sea-caves-algarve`) | `how to get to Benagil once you've picked it` | cluster → cluster (lateral, CL5 → CL1) | NOT yet shipped — will land when CL5 is refreshed (architecture §8B step 6). CL1 receives this link without authoring it; informational only. |
| iv | Tour page (PK 717720, speedboat) | `how to visit the Benagil cave` | tour → guide | Auto-wired via the existing `RelatedGuides` component on the tour page (per architecture §4e / §8A step 3 — already shipped). No manual work needed in CL1. |

**Where NOT to put links:**

- Do NOT add 4+ in-body links to the piece beyond the 4 placements named above (3 unique anchor decisions). The architecture's cluster-piece anatomy caps in-body links at ~3–5; CL1 with 1,500 words lands at 4 placements / 3 anchor decisions, which is in-band.
- Do NOT add a "related reading" footer. The `HubClusterList` "In this guide" component renders elsewhere on the page from frontmatter.
- Do NOT link to CL3 (best time), CL5 (which cave), CL6 (dolphins), CL7 (marine life), or CL8 (packing) — none are natural lateral links from CL1's focused logistics scope. The pillar callout and the CL2 lateral are the only off-page references CL1 needs.
- Do NOT add an OTA link, an affiliate link, or a competitor-operator link (inherited from pillar + CL2).

## 10. FAQ section (frontmatter `faqs:`)

The writer authors these in the YAML `faqs:` frontmatter block (same shape as the pillar — see the shipped pillar's `faqs:` block at lines 19–49 of `benagil-cave-tour-complete-guide.md` for the exact YAML structure; CL2 mirrors). Site pipeline auto-emits both the visible `<details>` block AND the `FAQPage` JSON-LD; no extra schema authoring.

**Target: 8 Q&A pairs** — pillar brief §10 floor is 8, CL2 brief §10 lands 7; CL1 has more discrete logistics questions to catch and lands at 8. **Each answer 40–80 words** — citation-ready, complete-sentence answers. Don't end any answer with "see our full guide for more"; every answer stands alone (AI engines lift FAQ items independently). The pillar and CL2 already cover broader Benagil FAQs; CL1's 8 are specifically the logistics-themed long-tails neither owns.

Below are the questions + recommended answers in full (the writer pastes into the frontmatter and edits for voice; the substance is correct per pillar §16 + CL2 §16 + operator memory).

1. **Q: "What's the closest port to the Benagil cave?"**
   A: Carvoeiro is the closest — about 10 to 15 minutes by speedboat. Armação de Pêra is the next closest at 20 to 25 minutes, then Portimão at 25 to 30 minutes, then Lagos at 45 minutes to an hour. Distance alone is not the only factor: Portimão has the biggest fleet and the most flexibility, which matters more if your day shifts.

2. **Q: "Can you drive to the Benagil cave?"**
   A: Not to the cave itself. The cave's interior is reachable only by water — speedboat, motor yacht, kayak, SUP, or a licensed guided swim tour from the beach. You can drive to Benagil village for the clifftop viewpoint above the cave, where you look down through the skylight, but the inside is a boat-only experience.

3. **Q: "Where do you park in Benagil village?"**
   A: There are two car parks: a small one at beach level and a larger one up the hill. The beach-level lot fills by 09:00 in summer and the access road is single-lane. The hill car park is the realistic option, with a short, steep cliff walk down to the village. In July and August, expect a queue on the access road.

4. **Q: "How long is the boat ride to the Benagil cave from Portimão?"**
   A: About 25 to 30 minutes each way by speedboat. The standard small-group tour from Portimão runs 1.5 to 2 hours total, including the cave visit and the surrounding coast — typically Praia da Marinha and Praia do Carvalho on the return loop. Private motor-yacht charters from Portimão run half-day or longer with a swim stop.

5. **Q: "Can I take a ferry to the Benagil cave?"**
   A: No. There is no ferry service to the cave. Small-boat tours from one of four Algarve ports — Portimão, Carvoeiro, Lagos, or Armação de Pêra — are the only sea route. The "ferry" search miscue is common; if you've been looking for a ferry, what you actually want is a speedboat or motor-yacht tour from one of the four ports.

6. **Q: "Do I need to book a Benagil cave tour in advance?"**
   A: In July and August, yes — typically four or five days ahead. In May, June, and September, one or two days ahead is usually enough. From November through March, operators run on calm days only and you can often book the morning of, but availability is weather-dependent. Booking direct gives the fastest weather updates if a tour shifts.

7. **Q: "Is the cave reachable from Albufeira?"**
   A: Yes, but you drive to a port first. The two closest options from Albufeira are Armação de Pêra (about 20 minutes by car, then a 20 to 25 minute boat ride) and Portimão (about 35 to 40 minutes by car, then a 25 to 30 minute boat ride). There are no direct boats from Albufeira marina to the Benagil cave.

8. **Q: "Is the Benagil cliff walk family-friendly?"**
   A: The walk from the upper car park down to Benagil village is short — a few minutes — but it's steep, with uneven steps in places. It's manageable for most able-bodied adults and older children; harder for very young children in carriers, older travellers, or anyone with knee or back issues. The hill car park is the easier alternative to the beach-level lot.

**Cuts if the FAQ feels long (drop to 7):** the most cuttable is #8 (cliff walk) — useful but more secondary than the port-and-drive-time questions. Keep all 8 unless the visible page feels heavy. The FAQ ordering above mirrors the body H2 sequence loosely (port → drive → parking → boat time → ferry-miscue → booking → from-Albufeira → cliff walk).

## 11. External links (sparse and authoritative)

**Cap: zero externals — recommendation.** The pillar carries 2–3 externals (Sul Informação on the 2023 rules, optionally Visit Algarve, optionally a geology source). CL2 carries 1 (the same Sul Informação link). CL1's content is **logistics** — there is no high-authority external for "drive-times from Faro to Portimão" or "parking at Benagil village" that improves the piece. The Algarve official tourism site is shallow on the cave; the municipal sites in PT are not English-friendly; AA / RAC route-planner pages drift and aren't authoritative for the entity weight CL1 needs. **Recommendation: ZERO external links.** Better one fewer link than one bad link (inherited from CL2 §11).

**The exception the writer can take:** if a clean Visit Algarve or Visit Portugal page exists for Benagil and the writer wants to add one external link to the lede or H2 #1 as a "tourism authority acknowledges this" signal, that's acceptable — anchor as `the official Algarve tourism page on Benagil` or similar, capped at 1 external link total. Reviewer confirms in §15 #5.

**Do NOT add:**

- The Sul Informação link to H2 #8. CL1's H2 #8 depth-links to CL2 instead; CL2 carries the regulatory citation. Re-citing the same external from CL1 dilutes CL2's role in the link graph.
- Competitor operators (carvoeirocaves, benagilexpress, algarveexperience, etc.) — pillar brief §11 anti-pattern, inherited.
- OTAs (Viator, GetYourGuide, Civitatis) — pillar brief §11 anti-pattern, inherited.
- Google Maps / route-planner URLs — those drift and aren't a "source" in the citation sense.
- Wikipedia — pillar brief §11 anti-pattern, inherited.

## 12. Schema

The site's existing pipeline handles all of this — the writer does not author any JSON-LD manually. Mirrors the pillar + CL2 setup exactly.

- **`Article`** schema — auto-emitted by `blog/[slug].astro` from frontmatter. `datePublished` reflects `date: "2026-05-14"`. The `author: Nuno Albino` flows into `Article.author` as a string. (No `Person` schema is wired today — pillar brief §12 flags this as a future TODO; out of scope here.)
- **`FAQPage`** schema — auto-emitted when `faqs:` frontmatter is set. The 8 Q&A pairs in §10 light this up.
- **`BreadcrumbList`** schema — auto-emitted via `buildPostBreadcrumb()`. Per architecture §3 + BUILD-STATUS §1, the `pillarSlug` field has shipped, so CL1's breadcrumb renders `Home › Blog › Benagil Cave Tour: Everything You Need to Know in 2026 › How to Get to the Benagil Cave (and What's Changed in 2026)`.
- **`HowTo` schema — flag for reviewer (recommend NO, default to `Article`).** CL1 is the "how to" cluster by title, which might suggest `HowTo` schema. But `HowTo` requires step-by-step structure with a clear end-state and an unambiguous procedure. CL1's content is **comparative** ("from Portimão OR Carvoeiro OR Lagos OR Armação de Pêra") rather than sequential — there is no single ordered sequence of steps; the reader picks one of four port branches and goes. `HowTo` schema for branching content reads as schema spam and Google has been quietly demoting it since 2023. **Recommendation: `Article` (default). Do NOT add `HowTo` schema.** Reviewer confirms in §15 #8.
- **No additional schema work needed.** No `TouristAttraction` (out of scope per pillar brief §12), no `Place` for Benagil village (overkill for a cluster piece).

## 13. Anti-patterns — what the writer must NOT do

**Copy the pillar brief's §13 anti-pattern list verbatim** (editorial/SEO, voice/AI-fluff, and structural anti-patterns all apply). **Copy CL2 brief's §13 CL2-specific list as inherited structural anti-patterns** (especially #2 marina hallucination, #3 "cave is closed" framing, #4 sail-yacht-enters-the-cave, #5 legal-disclaimer voice). Re-read both before drafting. Plus the CL1-specific anti-patterns below — the ones that will trip the writer up *because* the piece is about port-by-port comparison and the temptation to oversell, undersell, or over-correct on each port is high.

### CL1-specific anti-patterns (in addition to pillar §13 + CL2 §13)

1. **Do NOT call the marina `Clube Naval`.** It is **Porto Comercial de Portimão**, signposted *Ac. Porto Comercial de Portimão*. This is the single most common drafting hallucination on Atlantis content (logged in the project memory as `reference_atlantis_departure_marina`). The pillar's H2 #4 and CL2's H2 #6 already name this correctly; CL1 must echo it in H2 #2 (where the marina is the load-bearing entity, not just a passing mention) and again in any FAQ answer that names where boats depart. CL1 is the piece most likely to trip this hallucination because the marina is mentioned more times here than anywhere else.

2. **Do NOT claim we operate from Carvoeiro / Lagos / Armação de Pêra.** We run boats from **Portimão only**. H2 #3, H2 #4, and H2 #5 describe those ports honestly without claiming a fleet. The "we" pronoun is reserved for Portimão context; the other three ports use the third-person ("Carvoeiro is the closest port", not "we operate from Carvoeiro"). This is the single biggest trust-erosion risk in CL1 — a reader who clicks through to the speedboat tour page expecting a Carvoeiro departure churns hard.

3. **Do NOT recap the cave's geology / "what is Benagil".** The pillar's H2 #1 owns it. The pillar callout in CL1's lede is what handles "but I don't know what the cave is" — the reader follows the link. CL1's body does NOT redefine "Algar de Benagil"; the term appears with an italicized first mention and the reader is presumed to recognise it (same discipline as CL2 §13 #7).

4. **Do NOT bloat the swimming-rules section (H2 #8).** That's CL2's job. CL1's H2 #8 mentions the rule in one sentence with the depth-link to CL2; the rest of H2 #8 is the operational implications (kayak ratios, motor-boat unchanged). If the writer drafts more than ~30 words of rules-content in H2 #8, cut and replace with the depth link to CL2.

5. **Do NOT write "no matter where you're staying, getting to Benagil is easy."** It isn't always. From Faro it's an hour each way; from Lisbon it's two and a half hours each way; from Seville it's two hours. Be honest about the friction in H2 #6. The reader trusts the page more when the writer names the realities. This is the single most-common framing anti-pattern in generic Algarve travel-blog content and the writer must NOT echo it.

6. **Do NOT invent specific bus / ferry routes to the cave.** There is no direct public transit to Benagil and no ferry to the cave. The "ferry" FAQ (#5) is engineered to catch the search miscue and dispel the assumption. Do NOT name a non-existent service. Do NOT write "the Algarve Express bus runs from Faro" (it doesn't go to Benagil); do NOT write "a ferry leaves Lagos for Benagil" (it doesn't).

7. **Do NOT bloat past 1,700 words.** Word count discipline is load-bearing for CL1. If a section wants to be longer, it belongs in the pillar (boat-type depth, geology) or in a different cluster (CL3 timing, CL5 caves comparison, CL8 packing). Going to 2,000 is not "more value" — it's facet drift.

8. **Do NOT cite specific tour prices.** Pillar §13 + CL2 §13 enforce; CL1 inherits. Prices drift. Bands only if necessary; the booking page is the source of truth.

9. **Do NOT cite a precise drive-time (e.g., "55 minutes from Faro Airport to Portimão").** Drive-times vary by traffic, season, and route. Use round, conservative numbers — "about an hour from Faro", "about two and a half hours from Lisbon", "about two hours from Seville". The writer's instinct will be to look up a Google Maps figure and quote it; resist. Round numbers don't date the piece and don't get fact-checked wrong.

10. **Do NOT write the parking section as "here's the free hack".** The older travel blogs do this and it produces an angry reader who shows up to a full car park at 10am in July. Be honest in H2 #7 about the realities — the lot fills by 09:00 in summer, the access road is single-lane, the cliff walk down is fine for some readers and not for others. The skipper voice is honest; the listicle voice is salesy.

11. **Do NOT speculate about future port developments.** No "a new marina is planned for Albufeira in 2027"; no "Carvoeiro may add capacity for Benagil tours". Both are real news beats that have appeared in the local press over the years; both drift and date the piece in months.

12. **Do NOT write "H2 #2: How to Get to Benagil from Portimão" then "H2 #3: How to Get to Benagil from Carvoeiro" then "H2 #4: How to Get to Benagil from Lagos"**. Repeating the same H2 stem 4× is an AI-generation tell (pillar §13). The H2 stems in §6 above use "From Portimão", "From Carvoeiro", "From Lagos", "From Armação de Pêra" — shorter, varied enough, scans cleanly. Don't undo this.

## 14. Acceptance criteria (reviewer checklist)

The reviewer runs this checklist against the draft. Every "no" is a revision request. The reviewer is the operator (José) per architecture §7 + CL2 §14 — same reviewer as the pillar and CL2; the standard is consistent across the hub.

1. ☐ **Total word count: 1,300–1,700** (target ~1,500). Verify by `wc -w` on the body (excluding frontmatter). Going over 1,700 = revision.
2. ☐ **9–11 H2 sections** (not 8, not 12). Every H2 has a **40–60-word answer paragraph** directly under the heading.
3. ☐ **H2 #1 ("The Short Answer")** opens with the **port-list answer paragraph** that names all four ports + the clifftop alternative; covers the keyword `how to visit benagil cave` directly.
4. ☐ **Byline is `Nuno Albino`.** Voice is skipper-led, first-person plural where natural (concentrated in H2 #2 and H2 #8), opinionated but factual. Fair across all four ports without favouring Portimão (despite that being the port we operate from).
5. ☐ **`date:` frontmatter is `2026-05-14`** (or later if the writer revises). **`pillarSlug: benagil-cave-tour-complete-guide`** is set. **`pillarOrder: 0`** is set (subject to §15 #1 reviewer confirmation).
6. ☐ **`tags:`** includes the new `getting-there` tag (subject to §15 #3 reviewer confirmation).
7. ☐ **`relatedTourSlugs:` is `[benagil-caves-speed-boat-tour]`** — only the speedboat; no Cranchi, no sail yacht in this field (CL2's discipline; CL1 matches).
8. ☐ **All 3 in-body link decisions from §9 are present** with the CSV-specified anchor text (variation acceptable on the closing pillar callout per pillar §13's "at most 1–2 anchor variations" rule):
   - bottom-up pillar callout in lede (first 200 words) → `complete Benagil Cave Tour guide`
   - bottom-up pillar callout in closing → `our full Benagil Cave Tour guide` (or similar varied descriptive anchor)
   - lateral to CL2 in H2 #8 → `whether you can still swim into the cave`
   - tour CTA in H2 #9 → `the small-group Benagil speedboat tour from Portimão` (with diacritic in rendered link)
9. ☐ **Zero external links** (or 1 max, only if the writer adds a Visit Algarve / Visit Portugal Benagil page per §11; reviewer approves in §15 #5).
10. ☐ **Required entities in body**: Algar de Benagil (italicised first mention), Portimão, Carvoeiro, Lagos, Armação de Pêra, Porto Comercial de Portimão, Ponta da Piedade, EN125, A22, Faro Airport, Lisbon, Seville, Capitania do Porto de Portimão. At least 3 of these appear in the first 200 words (Portimão + one other port + Algar de Benagil at minimum).
11. ☐ **NOT in the body**: `Clube Naval` (anti-pattern #1), any claim we operate from Carvoeiro/Lagos/Armação de Pêra (anti-pattern #2), any specific tour price, any specific drive-time minute figure beyond round numbers, any invented bus/ferry route, "no matter where you're staying" framing, any geology recap.
12. ☐ **`faqs:` frontmatter has 8 Q&A pairs** (or 7 if #8 was cut per §10 cut note), each answer 40–80 words, each answer stands alone (does NOT end with "see our guide for more").
13. ☐ **No anti-pattern phrases from pillar §13, CL2 §13, or CL1 §13.** Spot-check by searching the draft for: `elevate`, `unlock`, `seamless`, `let's dive in`, `in today's fast-paced`, `buckle up`, `look no further`, `please be advised`, `pursuant to`, `Clube Naval`, `no matter where you're staying`. All must return zero hits.
14. ☐ **The piece resolves the reader's logistics question.** A test read by a Trip-planner persona (Sub-profile A or B from §4) should leave understanding: (1) which port matches their base location, (2) how long the drive and the boat ride are, (3) what parking looks like, (4) what changed in 2026 (depth-link to CL2), and (5) where to book. If the reader leaves more confused than they arrived, the piece failed.
15. ☐ **Year-stamped freshness signal in title + subhead/lede.** Title contains "in 2026" (or "2026" in the short-form alt). Lede lands "2026" once.
16. ☐ **Builds cleanly**: `pnpm --filter atlantis run build` succeeds. The rendered `/en/blog/how-to-visit-benagil-cave/` page shows the breadcrumb, the FAQ block (8 items), and the JSON-LD `Article` + `FAQPage` schema validates in the Rich Results Test.
17. ☐ **The pillar's "In this guide" component lists CL1** at the top of the cluster list (driven by `pillarOrder: 0`, tied with CL2) — verify after publish. If §15 #1 resolves to "bump CL2 to 0.5 or 1", confirm CL1 lands first.
18. ☐ **CL2's lateral link to CL1 stops 404ing.** After CL1 deploys, navigate to CL2's H2 #4 and verify the anchor `how to get to the cave` resolves cleanly to CL1.

## 15. Open questions / judgment calls (flag for reviewer before draft starts)

The writer should ack the brief and raise these in the reviewer-ack step. Defaults are named where the writer can proceed without an answer; reviewer answers go into §16 once resolved.

1. **`pillarOrder` shared with CL2 — both `0`?** Per BUILD-STATUS §4: `0` is reserved for CL1 + CL2 (the two highest-traffic featured-snippet targets, both top of "In this guide"). The existing `HubClusterList` component sorts ties — likely alphabetically, which means `can-you-swim-benagil-cave` sorts before `how-to-visit-benagil-cave` (the reverse of natural reading order). **Two options:**
   - **Option A (BUILD-STATUS default):** ship CL1 with `pillarOrder: 0`. CL2 stays `0`. Tie-break is alphabetical → CL2 sorts first.
   - **Option B (more reader-friendly sort):** ship CL1 with `pillarOrder: 0` and retroactively bump CL2 to `pillarOrder: 0.5` (or `1`, with existing 1–8 shifting to 2–9). CL1 sorts first; reader hits "how to get there" before "can I swim in".
   - *Default if no answer: Option A* (ship per BUILD-STATUS spec; reviewer can re-sort post-publish via a one-line frontmatter edit on CL2). **Strong recommendation: Option B** — the natural reader sequence is "how do I get there?" before "can I swim?", because the swim question only becomes relevant once the reader has decided how they're getting there. But Option A is the documented spec; defer to reviewer.

2. **Localized slug proposals for pt/es/fr — LOCKED IN per CL2's lateral links.** No reviewer action needed; informational only:
   - pt: `como-visitar-gruta-benagil` (matches CL2 §1's stated localised lateral-link target pattern)
   - es: `como-visitar-cueva-benagil`
   - fr: `comment-visiter-grotte-benagil`
   - *Default and final: the slugs above. The translation pass uses these verbatim; no judgment call here, just notation that CL2's lateral links to localised CL1 versions already use these slugs.*

3. **New `getting-there` tag — include?** CL1 adds a new `getting-there` tag to group logistics-themed pieces (parallel to CL2's new `rules` tag). If reviewer prefers the existing tag taxonomy (`benagil`, `caves`, `travel-tips`), drop `getting-there`. *Default: include `getting-there`; it's a small taxonomy addition with clear future utility (e.g., a future "How to Get to the Alvor Nature Reserve" piece would join the tag).*

4. **Drive-time facts — verified vs ranged?** The H2 #6 drive times (Faro→Portimão ~1h, Lisbon→Portimão ~2.5h, Seville→Portimão ~2h) are round, conservative numbers based on common road-trip references. They are NOT verified against a current routing tool. **Recommendation: use round numbers as drafted ("about an hour", "about two and a half hours", "about two hours"); do NOT cite precise minutes the writer cannot verify.** The anti-pattern #9 in §13 enforces this. Reviewer confirms but no action expected.

5. **External link — zero or one?** Per §11, the recommendation is zero externals. If the writer finds a clean Visit Algarve / Visit Portugal page for Benagil during drafting research, the writer may add one external link to the lede or H2 #1. *Default: zero externals. If the writer adds one, reviewer approves in this step.*

6. **Hero image — reuse the pillar's skylight or commission/use a different one?** A "boat-leaving-Portimão-marina" shot would suit CL1's logistics-y framing better than the iconic skylight tourism shot — but no such operator asset is currently named in the architecture inventory. *Default if no answer: reuse the pillar's `cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs` skylight image (matches CL2's choice); reviewer can swap on publish if a better asset is available.*

7. **CL8 packing depth-link in H2 #10 — include or skip?** CL1's H2 #10 ("What to Bring and Wear") is the cluster surface where CL8's depth would normally land. CL1's link inventory is already at 3 anchor decisions / 4 placements, which is comfortably in-band but leaves no room for a CL8 link without going to 5. **Recommendation: skip the CL8 link in H2 #10 by default.** The reader who wants the packing depth will find CL8 via the pillar's "In this guide" component or via the pillar's H2 #9 link. If the writer can land the CL8 link naturally without crowding H2 #10's paragraph, the link is fine — but the discipline is "stay at 3 anchor decisions for a 1,500w piece". Reviewer confirms.

8. **Schema — `HowTo` or `Article`?** Per §12, recommendation is `Article`. `HowTo` requires step-by-step structure with a clear end-state; CL1 is comparative (four port branches), not sequential. **Recommendation: `Article` (default). Do NOT add `HowTo` schema.** Reviewer confirms.

9. **Title — long form or short form?** Long: "How to Get to the Benagil Cave (and What's Changed in 2026)" — carries the freshness hook + lateral-link signal to CL2's territory. Short: "How to Get to the Benagil Cave in 2026" — cleaner featured-snippet match. **Recommendation: long form** (the parenthetical earns its weight by differentiating from the dozens of evergreen "how to visit Benagil" travel-blog rewrites the SERP is saturated with, and by signalling the year-stamped freshness in the title rather than relying on the lede alone). Reviewer confirms.

10. **Should CL1 mention the Algarve Express ferry / bus services at all?** They don't exist as direct services to Benagil — there is no rail to the south coast that serves Benagil, and the regional bus network drops you at Carvoeiro or Portimão town centre, not at the marina. **Recommendation: do NOT mention them in the body** — including them invites the "where's the bus?" search miscue to land on a piece that tells them no, which is a worse reader experience than the FAQ catching the miscue. The FAQ #5 ("Can I take a ferry to the Benagil cave?") handles the miscue cleanly; the body stays focused on driving + boat. Reviewer confirms; this is the same posture pillar §13 takes for invented bus routes.

---

## 16. Reviewer addendum — resolved questions + verified facts (2026-05-14)

**All 10 §15 open questions resolved before draft.** Eight applied by recommendation (defaults); two operator-only judgment calls confirmed by the operator (José) via AskUserQuestion.

1. **`pillarOrder` tie-break with CL2** — ✅ **Option B (CL1 first).** CL1 ships with `pillarOrder: 0`; **CL2 retroactively bumped to `pillarOrder: 1`** across all 4 locale files (`packages/atlantis/src/content/blog/{en,pt,es,fr}/can-you-swim-…` / `posso-nadar-…` / `puedes-nadar-…` / `peut-on-nager-…`). Existing 1–8 stay; CL2 now sits at 1; CL11 stays at 9. Natural reader sequence: how do I get there → can I swim in → best time → … The CL2 bump has already been applied before draft starts; writer can verify by `grep pillarOrder` in any of CL2's frontmatter.

2. **Localized slug proposals for pt/es/fr** — ✅ LOCKED IN (informational; matches CL2's lateral-link targets):
   - pt: `como-visitar-gruta-benagil`
   - es: `como-visitar-cueva-benagil`
   - fr: `comment-visiter-grotte-benagil`

3. **New `getting-there` tag** — ✅ INCLUDE. Final tag set: `[benagil, caves, travel-tips, getting-there]`. Same precedent as CL2's `rules` tag — small taxonomy addition with future utility.

4. **Drive-time facts — round vs precise** — ✅ ROUND/RANGED. "About an hour from Faro", "about two and a half hours from Lisbon", "about two hours from Seville". DO NOT cite precise minute figures. Anti-pattern #9 in §13 enforces this.

5. **External link — zero or one?** — ✅ ZERO externals. Logistics doesn't have a high-authority external; Visit Algarve / Visit Portugal pages on Benagil are shallow. The piece holds its own.

6. **Hero image** — ✅ reuse the pillar's skylight image (`cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs`). Operator already confirmed this default for CL2; carries to CL1. Swap on a future refresh if a marina-shot asset becomes available.

7. **CL8 packing depth-link in H2 #10** — ✅ SKIP. CL1's link inventory stays at 3 anchor decisions / 4 placements; H2 #10 ("What to Bring") is treated as a short standalone section. Readers who want packing depth find CL8 via the pillar's "In this guide" component.

8. **Schema — `HowTo` vs `Article`** — ✅ `Article` only (the existing wiring auto-emits `Article` + `FAQPage`). NO `HowTo` schema. Content is comparative (4-port branch), not sequential.

9. **Title — long form or short form?** — ✅ LONG form: **"How to Get to the Benagil Cave (and What's Changed in 2026)"**. Operator confirmed. The year-stamped freshness signal lives in the title (CL1's differentiator vs evergreen "how to visit Benagil" SERP results) and reinforces the lateral-link signal to CL2's "2023 rules" territory.

10. **Algarve Express / regional bus in body?** — ✅ NO. Body stays focused on driving + boat. FAQ #5 ("Can I take a ferry to the Benagil cave?") catches the search miscue cleanly. Anti-pattern #6 in §13 enforces.

**Verified operator facts (re-confirmed for this brief, no changes since pillar/CL2):**
- Departure marina is `Porto Comercial de Portimão` (signposted *Ac. Porto Comercial de Portimão*). NOT Clube Naval. See [[reference_atlantis_departure_marina]].
- Cranchi 38ft yacht DOES enter the cave (mid-sized motor; clears the sea-level arch). Sail yacht does NOT (mast clearance). See [[reference_atlantis_yacht_cave_entry]].
- We operate boats from Portimão only. We do NOT run from Carvoeiro / Lagos / Albufeira / Armação de Pêra.
- The "September 10, 2023" specific date was REMOVED from CL2 at review time (unsourced beyond "September 2023" in the pillar). CL1 should NOT introduce a specific day; "September 2023" is the verified framing.

Writer: brief is ready. Proceed to draft.

---

*End of brief. The writer should ack this brief, raise the §15 open questions (especially #1 on the `pillarOrder` tie-break), then draft the EN piece. The reviewer reviews against §14. Translation to pt/es/fr is a separate Sonnet pass after EN review (per the project memory `feedback_opus_for_writing` — Opus drafts content, Sonnet handles schema/translation plumbing).*
