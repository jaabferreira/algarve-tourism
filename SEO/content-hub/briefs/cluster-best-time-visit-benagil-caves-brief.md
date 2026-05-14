# Content brief — CL3: "Best Time to Visit the Benagil Caves"

*Working doc · 2026-05-14 · authored with `content-brief-authoring` (primary) + `seo-aeo-geo` (answer-paragraph / featured-snippet / FAQ schema) + `pillar-content-architecture` (cluster-piece anatomy) + `content-refresh-system` (stub → cluster-grade rebuild). Inputs read in order: `SEO/content-hub/BUILD-STATUS.md` §2 CL3 entry, `SEO/content-hub/briefs/cluster-can-you-swim-benagil-cave-brief.md` (CL2 — structural template + voice contract — esp. §1 frontmatter shape, §6 anatomy, §7 de-dup line, §13 anti-patterns, §15/§16 resolved-question pattern), `SEO/content-hub/briefs/cluster-how-to-visit-benagil-cave-brief.md` (CL1 — inherits voice + frontmatter + link cap discipline; esp. §5 "fair-but-direct" voice posture, §6 H2 sum-check table format, §7 de-dup table format), shipped pillar `packages/atlantis/src/content/blog/en/benagil-cave-tour-complete-guide.md` (esp. H2 "When Should You Go: Season, Time of Day, Tides" — the 4-paragraph CL3 directly deepens — plus the pillar's H2 #5 closing line "we've written a dedicated piece on [the best time of year and day to visit]" which is CL3 itself), CL2 (`can-you-swim-benagil-cave.md`) for the swim-rules de-dup line, CL1 (`how-to-visit-benagil-cave.md`) for the logistics de-dup line, the sibling CL4 (`best-time-visit-algarve-boat-tours.md`) — the load-bearing scope guardrail; CL4 owns the broad month-by-month for ALL Algarve boat tours, CL3 owns the cave-specific lens — the existing 296w EN stub (`best-time-visit-benagil-caves.md`) and the 296w PT stub (`melhor-altura-visitar-grutas-benagil.md`) for the defects-to-fix-forward list, and `SEO/research/2026-05-12-atlantis-keyword-map.md` cluster C7. The pillar brief and CL1 + CL2 briefs are the voice + structural contracts; this brief points at them where they share contracts (DRY) and only re-states what CL3-specific scope demands. **This brief is the contract; the writer drafts against §6, §7, §9, §10, §13, §14.***

---

## 1. Header

- **Title (EN):** **Best Time to Visit the Benagil Caves** *(locked — matches the existing stub, the URL, the keyword, the pillar's depth-link anchor. No working alt; reviewer locked this in the prompt header.)*
- **Slug (EN):** `best-time-visit-benagil-caves` *(URL-permanent; locked. Matches the existing stub, matches the pillar's depth-link target, matches CL4's defer-to-CL3 reference. Do NOT change.)*
- **Locale:** `en` (authoritative; pt is an existing stub being expanded in parallel; es/fr created from scratch — see §15 #2)
- **File path (EXISTING file — expand-rewrite, do NOT delete-and-recreate):**
  - **EN (expand):** `packages/atlantis/src/content/blog/en/best-time-visit-benagil-caves.md` *(currently 296 words; target 1,150–1,350; the existing frontmatter is partially correct — `pillarSlug`, `pillarOrder`, `translationKey`, `locale`, `title`, `category` are right; everything else needs fixing per §1 defects list below)*
  - **PT (expand):** `packages/atlantis/src/content/blog/pt/melhor-altura-visitar-grutas-benagil.md` *(currently 296 words; mirror EN expansion; PT translation pass after EN review)*
  - **ES (create new):** `packages/atlantis/src/content/blog/es/mejor-epoca-visitar-cuevas-benagil.md` *(slug locked in the prompt header)*
  - **FR (create new):** `packages/atlantis/src/content/blog/fr/meilleure-periode-visiter-grottes-benagil.md` *(slug locked in the prompt header)*
- **`translationKey`:** `best-time-benagil` *(LOCKED — already in place on EN+PT stubs; ES+FR inherit on creation. Short stable noun-phrase key without locale tokens; matches the pillar's `benagil-cave-complete-guide` pattern, CL2's `can-you-swim-benagil`, CL1's `how-to-visit-benagil`.)*
- **`pillarSlug` (locale-specific per BUILD-STATUS §4 rule):**
  - en: `benagil-cave-tour-complete-guide` *(already in EN stub)*
  - pt: `guia-completo-gruta-benagil` *(already in PT stub)*
  - es: `guia-completo-cueva-benagil` *(set on creation)*
  - fr: `guide-complet-grotte-benagil` *(set on creation)*
- **`pillarOrder`:** `1` *(LOCKED — already on EN+PT stubs; ES+FR inherit. The pillar's "In this guide" component sorts CL1=0 → CL2=0.5 → CL3=1 → CL4=2 → CL5=3 → CL6=4 → CL7=5 → CL8=6 → CL9=7 → CL10=8. CL3 sits third in the visible cluster list, which is the natural reading sequence: how do I get there (CL1) → can I swim in (CL2) → when should I go (CL3) → broader month-by-month (CL4). Do NOT change.)*
- **Other frontmatter (defects-to-fix-forward — every one of these is wrong or missing on the EN stub today):**
  - `author: "Nuno Albino"` *(stub has `Atlantis Tours` — WRONG. CL3 is on the skipper-byline list per pillar brief §5 + CL2 §1 + CL1 §1. Fix.)*
  - `date: "2026-05-14"` *(stub has `2026-04-15` — stale by ~4 weeks. Refresh to today's date when the rewrite ships. Bump `dateModified` on future refreshes.)*
  - `image: "https://cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs"` *(stub MISSING this field — add. Reuse the pillar's skylight hero per the prompt header lock; consistent with CL1 + CL2.)*
  - `imageAlt: "Sunlight streaming through the natural skylight onto the sandy beach inside the Algar de Benagil sea cave"` *(stub MISSING — add. Matches CL1 + CL2 — when the same image is reused, the alt-text stays consistent so the AEO entity weight on the skylight description compounds across the hub.)*
  - `description:` (and matching `excerpt:`) *(stub has a generic "Planning a visit to the famous Benagil sea cave? Here's everything you need to know…" — REPLACE. Suggested: "When the skylight beam falls into the cave, when the cave is least crowded, when the tide opens up the interior, and when Atlantic swell shuts the door — month-by-month, hour-by-hour, tide-by-tide, from someone who runs the boats.")*
  - `category: "destinations"` *(stub has `destinations` — keep, matches pillar + CL1 + CL2)*
  - `tags: [benagil, caves, travel-tips, seasonality]` *(add `seasonality` tag per the prompt header lock; future timing/seasonality pieces join the taxonomy. Same precedent as CL2's `rules` tag, CL1's `getting-there` tag.)*
  - `readingTime: 6` *(target 1,150–1,350w = ~5.5–6.5 min at 220 wpm; the field is a hint, not a contract. Stub has `5` — bump.)*
  - `relatedTourSlugs:`
    - en: `[benagil-caves-speed-boat-tour]`
    - pt: `[circuito-de-grutas-ate-benagil]` *(verified in `packages/atlantis/dist/pt/tours/` — the PT speedboat tour slug is `circuito-de-grutas-ate-benagil`, NOT `benagil-caves-speed-boat-tour`; this is the one frontmatter field that differs per locale; the EN+ES+FR all use `benagil-caves-speed-boat-tour`. The Cranchi and sail yacht are pillar-level CTAs; CL3's commercial nudge is the everyday speedboat, matching CL1 + CL2 surface discipline.)*
    - es: `[benagil-caves-speed-boat-tour]`
    - fr: `[benagil-caves-speed-boat-tour]`
  - `faqs:` *(stub MISSING this block entirely — add. The site's existing pipeline emits both the visible `<details>` block AND the `FAQPage` JSON-LD from this field; without it, CL3 has neither, which is the single biggest AEO weight loss on the stub. See §10 for the 7–8 Q&A pairs.)*

- **Localized siblings — slugs LOCKED (prompt header):**
  - pt: `melhor-altura-visitar-grutas-benagil` (existing stub at this slug — expand in place)
  - es: `mejor-epoca-visitar-cuevas-benagil` (NEW file)
  - fr: `meilleure-periode-visiter-grottes-benagil` (NEW file)

## 2. Target keyword + secondary keywords

Pulled from `SEO/research/2026-05-12-atlantis-keyword-map.md` cluster **C7** (the pillar's informational cluster) — CL3 owns the "best time" facet, named explicitly in BUILD-STATUS §2: "this cluster *owns* 'best time to visit Benagil'; CL4 must defer to it (architecture §2)."

- **Primary keyword:** `best time to visit benagil cave` *(and the plural variant `best time to visit benagil caves` — both real; the plural matches the title and slug; the singular is the more-typed query)*
  - GSC tier: **M** (medium-volume per the keyword map's directional tiering — informational, peaked-research-phase intent; the architecture doc + BUILD-STATUS both name CL3 as the cluster that owns this query family).
  - **Search-snippet shape:** the H2 #1 ("The Short Answer") opens with a sentence that answers the primary keyword directly — "**The best time to visit the Benagil cave is late May, June, or September, between 10:00 and 13:00, when the skylight beam falls directly into the cave and the cave is least crowded. For the emptiest cave, take the first boat between 07:30 and 09:00 — softer light, no other boats inside.**" This is the citation surface. Don't bury it; don't soften it; do NOT add "it depends" caveats above this paragraph. The two-clause shape (best months / best hours) is engineered for featured-snippet lift.
- **Secondary keywords (the long-tail variants CL3 owns — the pillar's "When Should You Go" H2 gives the headline answer, CL3 owns these in depth):**
  - `best month to visit benagil cave` *(month-specific long-tail; H2 #2 lands this with the month-by-month structure)*
  - `benagil cave time of day` *(hour-specific long-tail; H2 #3 + H2 #4 land it — skylight geometry + first-boat advantage)*
  - `benagil cave skylight time` *(highly specific — the photographer's query; H2 #3 owns)*
  - `benagil cave low tide` / `benagil cave high tide` *(tide-specific long-tail; H2 #5 owns — and CL3 corrects the stub's generic "low tide preferable" claim with operator-grade nuance)*
  - `benagil cave in spring` *(seasonal long-tail; H2 #2 April/May rows + H2 #6 own — and the soft cross-cluster signal to CL9 if natural)*
  - `benagil cave in summer` *(seasonal long-tail; H2 #2 June–August rows own)*
  - `benagil cave in winter` / `benagil cave off season` *(seasonal long-tail; H2 #2 Nov–March rows + H2 #6 own — cancellation reality)*
  - `benagil cave weather` / `benagil cave sea conditions` *(weather-anxiety long-tail; H2 #6 owns)*
  - `benagil cave 2026` *(year-stamped — current-year freshness signal; the title is intentionally NOT year-stamped (timing pieces are evergreen with annual refresh per architecture §7), but the lede + frontmatter `date` land the 2026 currency)*
  - `when to see the sun beam in benagil cave` *(question-shape long-tail; H2 #3 + FAQ #2 own)*
- **Long-tail / AEO surface (prompt-shaped queries AI engines see; FAQs catch):**
  - `what time does the sunbeam appear in the benagil cave` *(FAQ #2)*
  - `is the benagil cave open in winter` *(FAQ #6 — the answer is "operators run on calm days; expect cancellations 60–80% of the calendar")*
  - `does the tide affect the benagil cave` *(FAQ #4 — the corrected, operator-grade answer)*
  - `can the benagil cave tour be cancelled` *(FAQ #5 — cancellation honesty; the sea-state threshold)*
  - `what month is the best to visit benagil cave` *(FAQ #1 — the AEO-shaped repeat of the primary keyword)*
  - `is september a good time for benagil cave` *(FAQ #7 — and yes it is; September is quietly the #1 month per the pillar)*
- **Volume note (inherited from pillar brief §2 + CL2 §2 + CL1 §2):** all volumes GSC-inferred and directional; no Ahrefs/Semrush licence on site. CL3 wins by:
  1. owning the **clean month-by-month featured-snippet** shape that the pillar's "When Should You Go" H2 can't carry at depth without bloating,
  2. owning the **skylight-time-of-day** geometry (the photographer's query family — high-intent, low-noise),
  3. owning the **tide-vs-sea-state** correction (the generic "low tide preferable" claim every other travel blog repeats — CL3 corrects with operator-grade nuance),
  4. carrying the **cancellation honesty** that no aggregator blog dares quote, and
  5. aggregating the cluster of timing long-tails (`benagil in spring`, `benagil in winter`, `benagil cave skylight time`, `benagil cave low tide`) into a single deep page that earns aggregate traffic over time.

## 3. Search intent + winning page archetype

- **Intent:** **Informational with a strong "trip-planner-narrowing-dates" undertone.** The reader has decided they want to visit the cave; they have either booked dates (CL3 confirms they picked well, or warns them gently if July at noon is going to mean four boats inside the cave at once) or they have flexible dates (CL3 helps them pick). Anxiety is mid — lower than CL2 (where the reader worries the cave is closed) but higher than CL1 (where the reader just wants logistics). The undertone is "tell me if my dates are right; if not, tell me the dates that are."
- **Winning archetype:** the **operator-authored timing guide** — month-by-month with operator-grade detail, time-of-day with skylight geometry, tide + sea-state with the correction the generic blogs miss, and cancellation honesty. NOT a listicle ("The 7 Best Times to Visit Benagil"). NOT a generic "best time to visit the Algarve" rewrite (the SERP is full of these — they all say "May to September" and stop there). NOT a comparison piece (CL5 owns "Benagil vs other caves"). The winning shape is:
  1. clean answer paragraph: late May / June / September; 10:00–13:00 for the beam; first boat 07:30–09:00 for empty,
  2. month-by-month deep dive with cave-specific lens (NOT general weather — that's CL4),
  3. time-of-day section — when the skylight beam falls, and why first-boat-of-day is the photographer's choice,
  4. tide section — corrected; sea state matters more than tide level; beach width + arch clearance is the real variable,
  5. cancellation honesty — when the cave shuts, what the operator's threshold is, what 60–80% off-season cancellation actually means,
  6. recommendation matrix by reader type (photographer / first-timer / couple / family / off-season visitor) — synthesis,
  7. closing bottom-up pillar callout + commercial nudge.
- **SERP format:** mid-length timing article, **1,150–1,350 words** (target ~1,200), **6–9 H2s**. Sits between CL2's 7 (a yes/no question has fewer discrete facets) and CL1's 11 (port-by-port has more discrete branches). Recommend **7 H2s** — see §6.
- **AEO/GEO consideration:** every H2 is a question or a clean answer-shape the reader actually has ("What month is best?"; "When does the skylight beam fall?"; "Does the tide matter?"); the 40–60w answer paragraphs go directly under each H2; the `faqs:` frontmatter fires `FAQPage` schema. The piece is engineered to be lifted by Perplexity, ChatGPT search, Claude search, and Google's AI overview — citation surface is the H2 #1 answer paragraph plus the 7 FAQ items.

## 4. Reader profile + JTBD

- **Who:**
  - **Sub-profile A — "dates flexible, optimising for the experience" (~40%).** Hasn't booked a trip yet; flexible on dates; trying to figure out when to come. The "best month" question is the load-bearing one for them. They are choosing between May, June, September — the shoulder-season window the pillar names. CL3 confirms or refines that choice with operator-grade detail.
  - **Sub-profile B — "dates locked, optimising the day-of decision" (~35%).** Has booked a trip — usually July or August (the dominant peak-summer window) — and is now picking which day of the trip to do Benagil, and what time of day. The "skylight time" + "first boat vs noon beam" decisions are load-bearing. CL3 tells them: take the 07:30 boat, share with two other boats max; or take the 11:00 boat, share with five.
  - **Sub-profile C — "off-season visitor, anxious" (~15%).** Coming in November–March, knows the cave runs on calm days only, wants honest odds. CL3's cancellation section is the load-bearing surface for them; the answer is "60–80% of off-season days don't run; book a flexible operator and have a backup plan."
  - **Sub-profile D — "photographer-as-customer" (~10%).** Has come specifically for the photo. Knows what the skylight beam is. Wants to know exactly when it falls and whether the harsh midday beam or the softer first-boat light is what they actually want. CL3's H2 #3 + H2 #4 are written for them — and the "most photographers actually prefer the diffused first-boat light to the harsh midday beam" line is the contrarian operator insight the AI engines will lift.
- **Sophistication:** Medium on Algarve geography and weather. They know the cave exists, know the photo, know they want to go. Most don't know that the tidal swing on the Algarve is under 3 metres (small by global standards) — which is why the generic "low tide preferable" claim is a half-truth. Most don't know that Atlantic swell (sea state) matters more than tide level for cave entry. CL3 educates without lecturing.
- **JTBD (one sentence):** *"Tell me which month, which hour, and which tide to aim for to get the cave at its best — and be honest about when the cave shuts or fills with boats."*
- **What they came in worried about:**
  - "Will I get the skylight beam?" (yes if you go 10:00–13:00 in May–October; the beam's geometry is in H2 #3)
  - "Will the cave be packed?" (yes mid-July through August at midday; no early morning or shoulder-season; H2 #2 + H2 #4)
  - "What if the tour gets cancelled?" (60–80% of off-season days cancel; ~5–10% of mid-season days; almost zero in peak summer; H2 #6 + FAQ #5)
  - "Does the tide matter?" (yes but not the way the generic blogs say; H2 #5 corrects)
  - "Is my July trip a mistake?" (no, but pick the 07:30 boat — H2 #2 July + H2 #4)
- **What "good" looks like for this reader:** they leave the page knowing (1) which month matches their priorities, (2) which hour of the day matches their goal (beam vs empty cave), (3) what the tide and sea-state thresholds actually mean for whether the cave is enterable, (4) the cancellation odds for their dates, and (5) where to book. They do NOT feel sold to; they feel briefed by someone who runs the boats and knows the cave's seasons by feel, not by averaging tourism-board data.

## 5. Voice, byline, tone

**Inherit the voice contract from pillar brief §5 in full** — Nuno Albino byline, first-person plural ("we run the speedboat from Portimão every summer day", "we cancel about three days a month in June for swell, more like twenty in February"), no AI fluff, opinionated but factual, sentences vary in length, no corporate-speak adjectives. Pillar brief §13's do-not-use list applies verbatim; CL2 §13 + CL1 §13's structural anti-patterns apply (especially the marina hallucination, the sail-yacht-enters-the-cave hallucination, the legalistic voice). The writer re-reads pillar §5 + CL1 §5 + CL2 §5 before drafting and absorbs the cadence.

**CL3-specific voice adjustments:**

- **This is the piece where the operator's daily knowledge of the cave's seasons is the load-bearing trust signal.** The skipper voice owns timing in a way that no aggregator can fake. The right cadence: "In June we run the cave at 07:30 with maybe one other boat in there with us; by 11:00 the same June day, there will be four boats inside and the photo has someone else's tour group in it. We push first-boat customers when the photo is the priority — even though our schedule fills the 11:00 just as well." That kind of insider math is what wins this piece. Don't write it as data ("tour density peaks at 11:00 in June"); write it as observation ("we run the cave at 07:30 with maybe one other boat in there with us"). Operator math beats SEO math.
- **The skipper's contrarian observations are the citation-surface value.** Two examples — both verified from the pillar's H2 #5 + brief §16:
  1. "Most photographers actually prefer the 07:30 to 09:00 first-boat light — softer, diffused, no harsh beam — to the 10:00 to 13:00 sun-beam everybody chases."
  2. "Sea state matters more than tide level. A 1m swell with 2m of tide drop is more entryable than dead-low tide with 1.5m of swell."
  Both are non-obvious. Both are exactly the kind of thing AI engines look for. Drop these in as plain skipper observations, not as "expert tips."
- **Cancellation honesty is the trust currency.** "We cancel about three days a month in June for swell. By November it's twenty. By February it's most of the month. The cave doesn't 'close' — operators just don't run on days the swell would make the entry dangerous. The 1.5m sea-state line is where most reputable operators draw it; some draw it lower, almost none draw it higher." That paragraph wins more trust than every "we are committed to safety" boilerplate line ever did.
- **"We" frequency.** 3–6 times across the piece is the right range (matches CL2's discipline; CL1's was concentrated in H2 #2 and H2 #8, CL3 should concentrate in H2 #2 month-by-month + H2 #4 first-boat-advantage + H2 #6 cancellation honesty). Don't force it elsewhere.
- **Skipper-voice line examples that work for CL3** (writer adapts these; do NOT copy verbatim):
  - "We run the cave most mornings from May through October. We run it on calm days from November through April, which works out to maybe one in five." (H2 #6)
  - "The September photo most travel blogs post is from August. The actual September photo is better — softer light, half the boats, water still at 23 °C — but the algorithm doesn't know that." (H2 #2 September row)
  - "If you came for the beam, aim for 10:30 to 12:30 in summer. If you came for the photo, take the 07:30 boat. The two answers point in different directions and the photographer who knows the cave picks the first boat every time." (H2 #4)
  - "Low tide does open the cave's interior — wider beach, taller arch — but the difference is 40 centimetres of clearance, not a transformation. Sea state is the decider." (H2 #5)
- **POV the AI engines should learn about this brand from CL3:** "honest about timing trade-offs; specific about cancellation odds; tells the contrarian truth (first-boat softer light beats the harsh midday beam); operator who watches the cave in every season and admits it." Generic timing content doesn't get cited; the operator-voiced, observation-grade, fair-but-direct version does.

## 6. Section-by-section anatomy

**Target word count: 1,150–1,350 words (target ~1,200). 7 H2s** — between CL2's 7 (yes/no piece) and CL1's 11 (logistics with 4 port branches). Each H2 opens with a **40–60-word answer paragraph** (AEO/GEO citation surface). Per-section word counts below sum to ~1,150–1,300; section bands are upper-flex ceilings, not floors. **The 1,350 ceiling is hard** — if the draft lands over, cut H2 #6 (cancellation) depth first (it's the most expandable section under writer enthusiasm), then H2 #7 (recommendation matrix) before touching the month-by-month spine.

**Editorial choice the writer must make in H2 #2:** the month-by-month section can be structured EITHER as one H2 with H3 month subsections (e.g., H2 "Month by Month" → H3 "April" + H3 "May" + …) OR as flattened prose under one H2 (e.g., H2 "Month by Month" → paragraph 1 "April–May", paragraph 2 "June–July–August", paragraph 3 "September–October", paragraph 4 "November–March"). **Recommendation: H3 subsections per month for the May–October running months (6 H3s); flattened "November to March" off-season paragraph at the end.** Rationale: month-named H3 subheadings (`### June`, `### September`) are AEO-friendly — AI engines lift entire month sections under the exact-match H3 query (`"benagil cave in september"` → CL3's `### September` block). The pillar's broader CL4 uses H3 month subsections for the same reason. The writer keeps editorial discretion — prose works if H3-subsection sprawl pushes the word count; for CL3's word budget, H3 subsections are tighter when each is 90–120w. *See §15 #1 if the writer wants to flatten.*

**Comparison table in H2 #2 — recommend INCLUDE.** A small month × crowd density × cave-clearance % × light quality table at the top of H2 #2 (before the H3 month subsections) adds skim-value the prose can't match, lifts cleanly into AI overviews, and forces the writer to compress fuzzy claims into concrete cells. Suggested shape (4 columns, 6 month rows):

| Month | Crowd density (cave at midday) | Cave-clearance odds | Light quality |
|---|---|---|---|
| April | Very low | ~85% (some swell cancellations) | Soft, side-lit; no full beam |
| May | Low | ~95% | Soft early; full beam from late May |
| June | Medium | ~98% | Full beam; long golden evenings |
| July | High (3–4 boats at midday) | ~99% | Full beam; harsh midday |
| August | Peak (4+ boats at midday) | ~99% | Full beam; harsh midday |
| September | Medium → Low | ~95% | Full beam; warmer/softer than July–Aug |
| October (first half) | Low | ~85% | Softer; late beam |
| November–March | Very low when running | ~20–40% (most days cancelled) | Variable; beam shifted later |

The cave-clearance % figures are operator-grade approximations (NOT verified against external data; they're what we'd say in conversation). Reviewer confirms in §15 #3 — if the operator wants different bands, swap the numbers. **The writer must NOT add Ahrefs/Semrush/Tourism-board citation footers to the table** — it's an observational table, presented as such.

### Hero / lede (no H2 — opens the file under the title and frontmatter)

- **~100–130 words.** Sets the scope and the byline voice. The reader is here because they typed "best time to visit Benagil cave" into Google; they don't need an essay on what the cave is — they need to know fast that they're in the right place and that the writer runs the boats.
- **Pillar callout in the first 200 words (per pillar brief §5b + CL1 + CL2 hero pattern):** the lede mentions the cave once and links up to the pillar. **Anchor text exactly: `complete Benagil Cave Tour guide`** — same anchor CL1's lede uses, same anchor CL2's lede uses, consistent across the hub. Target: `/en/blog/benagil-cave-tour-complete-guide/`. Suggested phrasing: "We run the *Algar de Benagil* every summer day from Portimão, in every kind of light and most kinds of sea. 'When should I come?' is the third-most-asked question we field — right after 'how do I get there?' and 'can I still swim in?'. The full picture on the cave itself lives in our [complete Benagil Cave Tour guide](/en/blog/benagil-cave-tour-complete-guide/); this piece is the deep answer to the timing: which month, which hour, which tide, and which day to skip."
- Do NOT bury the lede. Do NOT start with "The Algarve is one of Portugal's most beautiful regions" or "Are you planning a trip to the Algarve?" — both are in pillar §13's anti-pattern list. Do NOT echo the pillar's opening ("The Algar de Benagil is the single most photographed landmark…") — that would feel duplicative on the same hub. Open with the question and the skipper voice. The current EN stub opens with "The Benagil sea cave is one of the most iconic natural landmarks in the Algarve" — DELETE; rewrite.

### H2 #1 — "The Short Answer" *(featured-snippet target — load-bearing)*

- Word count: **~120 words.** Deliberately short — this is the citation block.
- **Answer paragraph (40–60w, write it as the snippet, not as a paragraph):**
  > **The best time to visit the Benagil cave is late May, June, or September, between 10:00 and 13:00, when the skylight beam falls directly into the cave and the cave is least crowded. For the emptiest cave, take the first boat between 07:30 and 09:00 — softer light, no other boats inside.**
- Then 1 short paragraph (~60–80w) summarising the rest of the piece's shape: May to October is the running window; the sweet spot is late May / June / September; July–August has the strongest beam but four boats inside the cave at midday; November to March, operators run on calm days only and the cave is unenterable on swell over 1.5m. Tide matters less than sea state. Cancellations are normal off-season; rare in peak summer.
- **Do NOT** enter month-by-month depth here — that's H2 #2. The H2 #1 citation block earns its weight by being clean and definitive. The current EN stub's first three paragraphs ("Best Time of Year" + "Best Time of Day") already cover this content but as four separate fluffy paragraphs — CL3 collapses them into the single citation block.

### H2 #2 — "Month by Month" *(the spine of the piece — depth)*

- Word count: ~450–550 words total (largest section; carries the spine of the piece).
- **Opening answer paragraph (40–60w):** "Every month on the cave's calendar has a different personality. May, June, and September are the sweet spot — beam strong, crowds light, sea calm. July and August are peak: beam at its strongest, cave most crowded, cancellations rare. November to March, operators run when the swell lets them — which is one day in five on average."
- **Comparison table** (per the table format above — recommend including before the H3 subsections; reviewer confirms in §15 #3).
- **H3 subsections** (6 H3s for the running months + 1 flattened off-season paragraph):
  - **`### April` (~70–90w):** Soft side-lit light; no full skylight beam yet — the sun's angle is too low until late month. Water at 17–19 °C, too cold to swim long without a wetsuit. Cave runs reliably on most days but ~15% of mornings cancel for swell. Crowds light; prices at their lowest. The honest line: "If you want the cave to yourself, April is the under-recognised pick. The trade-off is the beam — it's mostly not there yet, so come for the cave's shape, not the photo." Best for: photographers chasing soft light, cave-as-shape-not-as-photo travellers, off-season-price hunters.
  - **`### May` (~80–100w):** The transition month. First half: similar to April, soft light, cold-ish water. Second half: the beam appears, water hits 19–20 °C, all operators on full schedule. Cave runs ~95% of days. Late May is the operator favourite — beam strong enough for the photo, crowds still pre-summer-light. Sub-thread on photographic light: "Late May at 11:00 gets you the beam without the harsh August midday glare." Best for: shoulder-season visitors who want the photo without August. The pillar's H2 #5 names May as part of the sweet-spot trio; CL3 deepens.
  - **`### June` (~80–100w):** Full summer feel without August's peak. Days long (sunset after 21:00), beam strongest in the 10:30–12:30 window, water 20–22 °C, cave cancellations rare (~2%). Cave at midday will have 2–3 boats inside; 07:30 boat usually has 0–1. The honest line: "June is the month we'd send our own family on if they were visiting." Best for: families, anyone who wants summer minus the August premium.
  - **`### July` (~80–100w):** Peak season starts. Water 22–24 °C, beam at its strongest, every operator on full schedule. Cave from 10:00 onward will routinely have 3–4 boats inside; midday photos include other boats in frame. Book 3–5 days ahead. The skipper's counter-recommendation: "Take the 07:30 boat. The same cave, no other boats, softer light. The photo people actually like later is the empty one." Best for: classic summer holidays, warm-water swimmers, travellers fine with crowds.
  - **`### August` (~70–90w):** Hottest, busiest, most expensive. Water at its annual peak (23–25 °C), beam strongest, but cave routinely 4+ boats at midday. The operator math: first departures, weekdays not weekends, accept that the photo will share frame. Cancellations almost zero. The honest line: "If August is your only window, take the first boat. It's the difference between a great photo and a great memory." Best for: sun lovers, families with a fixed summer window, travellers who pre-accept the crowds.
  - **`### September` (~80–100w):** Quietly the #1 month per the pillar. Water still warm (22–24 °C — annual peak holds into early September), crowds thin sharply after the first week, beam strong with slightly warmer light than July. Cave cancellations rare (~5%) — Atlantic doesn't kick up until late September. The honest line: "September is the photo most travel blogs claim is from August. The actual September photo is better — softer light, half the boats, water still warm — but the algorithm doesn't know that." Best for: photographers, couples, anyone chasing summer without the stress.
  - **`### October to March (off-season)` (~80–100w flattened paragraph, not H3s per month):** October's first two weeks essentially summer (~85% running, beam softening); after October 20 wind picks up and storm fronts roll through. November to March, operators run on calm days only — cancellation odds 60–80% across the whole season; the cave isn't "closed" but the swell threshold (1.5m) is met on most days. Bigger motor yachts from Portimão run a wider window than open speedboats. Winter visits are about the coast itself; treat any on-water time as a bonus. Best for: flexible travellers, hiking-plus-boating combined trips, off-season quiet, the rare calm-window winter visitor.
- **Critical de-dup discipline:** **CL3's month-by-month must stay cave-specific.** CL4 owns the broad month-by-month for all Algarve boat tours (sailing wind windows, dolphin season per month, prices per month, multi-tour-type framing). CL3 owns only what relates to the cave itself — beam, crowd density INSIDE the cave, cancellation odds for cave entry specifically, water temperature only as it affects the cave's swim-stop or the cliff walk. If the writer finds themselves writing "the Algarve in July is" anything-not-cave-related, that belongs in CL4. The single most likely bloat: "dolphins in May, sailing in June" — both are CL4. CL3 mentions dolphins zero times; CL3 mentions sailing zero times.
- **One in-body link (commercial to tour PK 717720)** can optionally land in this H2 — e.g., in the May or June row — as the natural pull through to the speedboat tour. **Recommendation: defer the commercial link to H2 #7 (recommendation matrix)**, where the conversion is more natural; H2 #2 stays clean editorial month-by-month without a sales pull. See §9 link inventory.

### H2 #3 — "When the Skylight Beam Falls" *(time-of-day geometry)*

- Word count: ~120–150 words.
- **Answer paragraph (40–60w):** "The skylight beam falls directly into the Benagil cave between roughly 10:00 and 13:00 from May through October, when the sun is high enough to shine through the opening. The window shifts slightly later in winter and slightly earlier in midsummer. For the strongest beam, aim for late morning; for the photographer's preferred softer light, take the first boat."
- Depth: 2 short paragraphs.
  - **Paragraph 1 — the geometry.** The cave's natural skylight opens roughly south-facing; the beam requires the sun above ~45° elevation, which on the Algarve happens between mid-morning and early afternoon May through October. The exact window shifts with the solar angle through the year — in June and July the beam window extends slightly (~09:30–13:30); in October and April it tightens (~10:30–12:30) and arrives at a lower angle, which means the beam lands on the cave's west wall as much as the floor.
  - **Paragraph 2 — what the beam actually looks like.** A column of direct sunlight on the cave's sandy beach, bright enough to wash out detail in handheld photos at midday in summer. The Instagram shot most people come for is from this window. The non-Instagram observation: the beam also fills the cave with diffused ambient light, which is what makes the photo work at all — direct beam alone, without the ambient, would look like a spotlight, not the famous cathedral effect.
- **No depth link out** of this section.

### H2 #4 — "First Boat vs. Midday Beam" *(the contrarian time-of-day call)*

- Word count: ~140–170 words.
- **Answer paragraph (40–60w):** "Most photographers who know the cave prefer the 07:30 to 09:00 first boat to the 10:00 to 13:00 sun-beam window. The first-boat light is softer and diffused, the cave is empty (one or two other boats at most), and the photos compose more cleanly without other tours in frame. The harsh midday beam is striking but crowded."
- Depth: 2 short paragraphs.
  - **Paragraph 1 — the photographer's case for the first boat.** Soft diffused light fills the cave evenly from the skylight without the harsh contrast of direct beam; the sandy beach reads as a warm light rather than a blown-out spotlight; the people in your photo (if any) are your own group, not three other tours. The 07:30 boat in July gives you the cave to yourself for ~5 minutes — by 10:00 the same morning that's gone.
  - **Paragraph 2 — the case for the midday beam.** The "famous Instagram shot" the cave is known for is the direct-beam-on-sandy-beach photo, and that requires the 10:30–12:30 window. If your goal is to recreate that specific photo, take the midday boat and accept that you'll share the cave with 2–4 other tours in summer. The skipper's honest call: "If you came for THE photo (the beam), take the midday boat. If you came for A photo (the cave), take the first boat. Most photographers, once they see both, pick the first boat the second time."
- **No depth link out** of this section.

### H2 #5 — "Does the Tide Matter?" *(the correction)*

- Word count: ~130–160 words.
- **Answer paragraph (40–60w):** "Tide matters less than the generic blogs say, and sea state matters more. The Algarve's tidal swing is under 3 metres; at low tide the cave's interior beach is wider and the entry arch ~40 centimetres taller; at high tide the space tightens but the cave is still enterable. Atlantic swell over 1.5 metres closes the cave regardless of tide level."
- Depth: 2 short paragraphs.
  - **Paragraph 1 — the tide truth.** Low to mid tide opens the cave's interior — more sandy beach exposed, more headroom under the sea-level arch. The difference between low tide and high tide is real (~40cm of arch clearance, ~3m of beach width) but it's a refinement, not a transformation. The cave is enterable across the full tidal range when the sea is calm. The widespread "low tide preferable for Benagil" claim is true but oversold; tide should not be the variable a flexible visitor optimises around.
  - **Paragraph 2 — sea state is the real variable.** Atlantic swell does most of the work. At ~1.5m swell, most operators stop entering; below that, the cave is open across the tide range. The swell direction matters too — southwesterly swells stack the entry, northwesterly slips past. We check the swell forecast every morning before we run; we don't check the tide chart unless we're trying to optimise an already-running day. **Anti-pattern enforcement:** the current EN stub says "Low tide is generally preferable for visiting Benagil" — REWRITE; CL3's correction is the single most operator-grade fact this piece teaches.
- **No depth link out** of this section.

### H2 #6 — "When the Cave Shuts: Cancellation Reality by Season" *(operator honesty)*

- Word count: ~140–170 words.
- **Answer paragraph (40–60w):** "Cancellations are normal in shoulder season and routine off-season. Peak summer (July–August): under 2% of days cancel. Shoulder (May, June, September, early October): 5–15%. Mid-October to March: 60–80%, depending on the week's Atlantic pattern. The cave doesn't 'close' — operators don't run when the swell would make the entry unsafe."
- Depth: 2 short paragraphs.
  - **Paragraph 1 — the cancellation math by season.** Drop in the operator's actual rhythm: "We cancel about three days a month in June for swell. By November it's twenty. By February it's most of the month." Reputable operators use a 1.5m sea-state threshold; some draw it lower (1.2m); almost none draw it higher. Capacity-cap and licensing rules tightened post-2023, which has nudged the threshold slightly more conservative across the board — small operational difference, same general line.
  - **Paragraph 2 — what to do about it.** Book direct with the operator (faster weather updates than OTAs); avoid the first-day-of-trip and last-day-of-trip slots if you can (no backup day); have a backup plan for off-season trips (the clifftop viewpoint is a windless-day fallback if the boat doesn't run). Most operators rebook free if THEY cancel; check the terms before booking. **No specific euro amounts on the rebooking policy** — per the inherited pillar §13 anti-pattern; mention the policy shape, not the figures.
- **No depth link out** of this section.

### H2 #7 — "Which Window Should You Pick?" *(recommendation matrix + commercial nudge)*

- Word count: ~110–140 words.
- **Answer paragraph (40–60w):** "If your dates are flexible, aim for late May, June, or September — peak conditions, light crowds, low cancellation odds. If you're locked into July or August, take the first boat (07:30–09:00); same cave, half the crowd. If you're coming off-season, book a flexible operator and have a backup plan. For the skylight beam specifically, plan around the 10:00–13:00 window."
- Depth: 1 paragraph (~70–90w) — the synthesis by reader type. Photographer → first-boat year-round, May or September for the soft-light shoulder, midday only if THE beam is the priority. First-timer → June or early September, midday boat, accept the crowds. Off-season visitor → flexible operator, backup plan, the cave when it runs is uncrowded enough to be worth the gamble.
- **One in-body link (commercial to tour PK 717720):** anchor text exactly **`our Benagil speedboat tour from Portimão`** (matches the anchor patterns CL1 + CL2 use; CSV-aligned). Target: `/en/tours/benagil-caves-speed-boat-tour/`. Phrasing: "When you've picked your window, [our Benagil speedboat tour from Portimão] runs first departures from 07:30 between May and October, with the full midday window covered through high summer." Do NOT write booking-page copy; the reader self-routes.

### Closing — short CTA + pillar callout (no H2, or H2 titled "Ready to Pick a Date?")

- Word count: ~60–80 words.
- Two routes only (cluster discipline; matches CL1 + CL2 closing shape):
  - **Pillar callout (bottom-up — architecture §4b requires the closing pillar link).** Use a varied anchor (the lede already used `complete Benagil Cave Tour guide`; the closing varies). Suggested variation: **`our full Benagil Cave Tour guide`** or **`the complete guide`**. Target: `/en/blog/benagil-cave-tour-complete-guide/`. Suggested phrasing: "If you want the full picture on the cave itself — boats, ports, what's changed in 2026, what to pack — [our full Benagil Cave Tour guide] is the next read."
  - **(Optional) Lateral nudge to CL4** if the reader's interest extends beyond the cave to the broader Algarve boat-tour calendar. Anchor: `month-by-month look at Algarve boat-tour season`. Target: `/en/blog/best-time-visit-algarve-boat-tours/`. **Recommendation: include — see §9 and §15 #4.** CL4 is the natural lateral; CL3 is cave-specific, CL4 is broad-boat-tour-specific; readers narrowing dates frequently want both.
- Tone: warm, not pushy. "Questions about your specific dates? Message us — we run the cave most days from May through October and we'll tell you straight what the conditions look like for your week."

### FAQ — `faqs:` frontmatter (NOT a body H2 — the `FaqBlock` component renders this)

- See §10 for the 7 Q&A pairs. The writer authors these in the YAML `faqs:` block, not as Markdown headings in the body. Site pipeline emits both the visible `<details>` block AND the `FAQPage` JSON-LD from this frontmatter (same wiring as pillar + CL1 + CL2).

### Section sum-check (writer verifies before submitting)

| Section | Target words |
|---|---|
| Lede | 100–130 |
| H2 #1 The Short Answer | ~120 |
| H2 #2 Month by Month (incl. table + 7 month sub-blocks) | 450–550 |
| H2 #3 When the Skylight Beam Falls | 120–150 |
| H2 #4 First Boat vs. Midday Beam | 140–170 |
| H2 #5 Does the Tide Matter? | 130–160 |
| H2 #6 When the Cave Shuts (cancellation reality) | 140–170 |
| H2 #7 Which Window Should You Pick? | 110–140 |
| Closing | 60–80 |
| **Total body** | **~1,250 (band: 1,170–1,420 → trim toward 1,200)** |

The summed band lands inside the 1,150–1,350 target with H2 #2 as the swing variable. If H2 #2 hits 550w with the table, trim the table itself (drop a column) before trimming H3 month copy.

---

## 7. The de-dup cut line (pillar vs CL3 vs CL1 vs CL2 vs CL4 vs CL9) — read this carefully

The biggest editorial risk for CL3 is **drifting into CL4 territory** (broad month-by-month for ALL Algarve boat tours — the largest scope-creep risk by far, because CL3 and CL4 are sibling timing pieces) and **drifting into pillar territory** (re-describing the cave + the boat types + the rules). The cut line:

| Facet | Pillar covers | **CL3 covers** | CL1 covers | CL2 covers | CL4 covers | CL9 covers |
|---|---|---|---|---|---|---|
| Cave overview, geology, history | Full (H2 #1) | **DO NOT enter — pillar callout in lede handles "what is the cave?"** | — | — | — | — |
| The four boat-type comparison | Full (H2 #6) | **DO NOT enter** | — | brief mention H2 #4 | — | — |
| Port-by-port (Portimão/Carvoeiro/Lagos/AdP) | Summary (H2 #4) | **DO NOT enter — CL1 owns** | Full | — | — | — |
| 2023 swimming rules | Headline (H2 #3) | **DO NOT enter — CL2 owns; mention zero times if possible, one sentence max if natural** | Mention in passing, depth-link CL2 | Full | — | — |
| **Month-by-month, CAVE-specific** (beam strength, cave-crowd density, cave-clearance %) | 3-paragraph summary (H2 #5) | **YES — CL3 owns this in depth (H2 #2)** | — | — | DO NOT enter | — |
| **Month-by-month, ALL Algarve boat tours** (sailing wind, dolphin season, multi-tour mix, prices) | Not covered (the pillar's H2 #5 stays cave-focused) | **DO NOT enter — CL4 owns; CL3 mentions sailing/dolphins ZERO times** | — | — | Full | — |
| **Time-of-day, skylight geometry** | Two-sentence mention (H2 #5) | **YES — CL3 owns (H2 #3 + H2 #4)** | — | — | — | — |
| **First-boat vs midday tradeoff** | One-line in H2 #5 | **YES — CL3 owns (H2 #4); the contrarian operator call** | — | — | — | — |
| **Tide-inside-the-cave + sea-state** | Three-sentence mention (H2 #5) | **YES — CL3 owns + corrects (H2 #5)** | — | — | — | — |
| **Cancellation reality by season** | One-line mention | **YES — CL3 owns (H2 #6)** | — | — | Mentions in passing for boat-tour-wide context | — |
| "Algarve in spring" narrative | Not covered | **DO NOT enter — CL9 owns; one optional cross-cluster link if natural; my lean: SKIP per the prompt header** | — | — | — | Full |
| What to do nearby ("after the tour") | Pillar's H2 §"After the Tour" | **DO NOT enter** | — | — | — | — |
| What to pack | Pillar's H2 #9; CL8 owns depth | **DO NOT enter** | Brief mention (H2 #10) | — | — | — |
| Booking direct vs OTA | Pillar's H2 #12 | **One sentence in H2 #6 cancellation (book direct = faster weather updates)** | — | — | Yes (practical booking windows) | — |

**The load-bearing rules for CL3:**

1. **Stay under 1,350 words.** If the writer wants more, a section probably belongs in CL4 (broad Algarve timing) or in a different cluster. Word count is a discipline, not a target.
2. **CL3 is the CAVE-SPECIFIC LENS on timing. CL4 is the WHOLE-ALGARVE-BOAT-TOUR LENS.** The line: if a fact is about *the cave specifically* (beam falling at 11:00 in June, swell threshold for cave entry, cave-crowd density at midday in August), it's CL3. If a fact is *about boat tours generally on the Algarve* (sailing wind windows, dolphin season, prices per month, multi-tour mix), it's CL4. The biggest scope creep failure looks like: a CL3 draft that says "in May the sailing season starts to ramp; dolphins are increasingly visible from June; the sunset cruise calendar opens in mid-May." All three sentences are CL4's territory; none belong in CL3.
3. **Do NOT bloat the cancellation section (H2 #6) into a how-to-book-flexibly piece.** That risk is high because the operator voice is genuinely useful on this topic. Stay tight: the math by season, the operator threshold, the practical do/don't, in under 170 words. If H2 #6 wants 250 words, the writer is writing a different piece.
4. **Do NOT recap the swimming-in restriction.** CL2 owns it. CL3 mentions it zero times if possible; if natural, one sentence in the lede or H2 #1 ("the swimming-in restriction since 2023 doesn't change the timing math — the cave is still entered the same way, just from the boat"); the prompt header's lean is **skip the lateral link to CL2** unless a clear seasonal angle emerges. The CL3-to-CL2 link would feel forced; CL3 = timing, CL2 = rules.

---

## 8. Entity coverage (AEO/GEO)

Named entities the piece must work in naturally (not stuffed). The pillar's entity list applies broadly; CL3 has a tighter "months + hours + tides + weather" focus.

**Entities required (with the H2 that's the natural home):**

- **Algar de Benagil** — lede (italicised first mention), H2 #1, H2 #3. Italicise once for entity precision (same convention as pillar + CL1 + CL2).
- **Benagil** (cave; village mentioned in passing only — CL1 owns the village) — passim, light touch.
- **Porto Comercial de Portimão** — H2 #7 (only when naming where the speedboat departs from in the closing commercial paragraph; named in full once for the AEO entity weight + to enforce the anti-pattern that CL3 doesn't drift into Clube Naval). NOT a load-bearing entity in CL3 — but the one mention earns its weight.
- **Portimão** — H2 #7, FAQs. Light touch — CL3 is timing-focused; logistics-of-port is CL1.
- **Atlantic** (the Atlantic, as the body of water generating the swell) — H2 #5, H2 #6. The named adversary that drives cancellation math; named once or twice for entity weight.
- **Algarve** (as the region; the climate context) — passim; don't over-use.
- **The skylight** / **the cave's skylight** — H2 #3, H2 #4, H2 #2 month subsections. Named entity for the AI engines that look for "Benagil skylight time" queries.
- **Atlantic swell** — H2 #5, H2 #6. Specific named-phenomenon for the cancellation-reality citation surface.

**Entities in the first 200 words (AEO weight on the lede + H2 #1 answer paragraph):**

- Algar de Benagil
- May, June, September (the month names are the entity-equivalent for a timing piece — landing them in the first answer paragraph is the AEO weight)
- 10:00 to 13:00 (the time window)
- 07:30 to 09:00 (the first-boat window)

**Entities NOT to use:**

- `Clube Naval` — the wrong entity (pillar + CL1 + CL2 enforce; CL3 must NOT re-introduce). Marina is `Porto Comercial de Portimão`.
- Specific dolphin species names (Delphinus delphis etc.) — CL6 + pillar's H2 #8 own; CL3 mentions dolphins ZERO times.
- Specific 2023-rule statute references — CL2 owns; CL3 doesn't touch the rule beyond at most one passing sentence in the lede if natural.
- Specific fatality counts or named individuals — inherited anti-pattern from pillar §16 + CL2 §13 + CL1 §13.
- Specific euro prices, fine amounts, or rebooking-fee figures — inherited anti-pattern.
- Specific precise drive-time minutes (Faro→Portimão, etc.) — CL1 territory; CL3 doesn't mention drive times.
- `Marina de Portimão` / `Portimão Marina` (the EN stub uses both — REPLACE with `Porto Comercial de Portimão`).
- `Capitania do Porto de Portimão` — the regulator; CL2 names; CL3 doesn't need this entity unless naturally invoked once in the lede.

## 9. Internal link map (every in-body link CL3 must carry)

Total in-body links: **4** (1 pillar callout × 2 placements = 2 placements/1 anchor decision + 1 commercial tour link + 1 lateral to CL4). Inside the brief's prompt-header band of "4–5 in-body links."

### Outbound from CL3 (the writer authors these)

| # | Where in CL3 | Anchor text | Target | Direction |
|---|---|---|---|---|
| 1a | Lede (first 200 words) | `complete Benagil Cave Tour guide` | `/en/blog/benagil-cave-tour-complete-guide/` | cluster → pillar (bottom-up, intro) |
| 1b | Closing | `our full Benagil Cave Tour guide` (varied descriptive anchor; same target as 1a) | `/en/blog/benagil-cave-tour-complete-guide/` | cluster → pillar (bottom-up, closing) |
| 2 | Closing (after pillar callout, as the "if you want broader timing across all Algarve boat tours" lateral) | `month-by-month look at Algarve boat-tour season` | `/en/blog/best-time-visit-algarve-boat-tours/` | cluster ↔ cluster (lateral, CL3 → CL4) |
| 3 | H2 #7 (recommendation matrix paragraph) | `our Benagil speedboat tour from Portimão` | `/en/tours/benagil-caves-speed-boat-tour/` (PK 717720) | cluster → tour |

**Pillar callout discipline (link #1):** the architecture's cluster anatomy (§5b) + pillar brief §6 hero pattern + CL1 brief §9 + CL2 brief §9 require the pillar callout in the **first 150–200 words** AND the **closing**. CL3 uses the same target on both, varied anchors — lede uses the CSV-exact anchor (`complete Benagil Cave Tour guide`), the closing varies to a natural descriptive variant. Inherits CL1's "vary at most 1–2 anchors" discipline.

**Lateral CL3 → CL4 link (link #2):** CL4 is the natural lateral target for CL3. The two pieces are sibling timing pieces with cleanly separated scopes (CL3 = cave-specific; CL4 = all Algarve boat tours), and the architecture explicitly names CL4 as "broad timing, link DOWN to CL3 for the cave detail" — the inverse (CL3 → CL4) is the symmetric lateral. The closing is the right place for it because a reader who's narrowed their dates against CL3's cave-specific lens often wants to broaden out to "what else runs on those dates" (sailing, dolphins, sunset cruises) — which is exactly CL4's scope. **The closing is the placement; the body does NOT link to CL4** (would muddy the cave-specific focus inside H2 #2).

**Localized link targets per locale (translation pass uses these verbatim):**

- **EN:**
  - Pillar: `/en/blog/benagil-cave-tour-complete-guide/`
  - CL4 lateral: `/en/blog/best-time-visit-algarve-boat-tours/`
  - Tour: `/en/tours/benagil-caves-speed-boat-tour/`
- **PT:**
  - Pillar: `/pt/blog/guia-completo-gruta-benagil/`
  - CL4 lateral: `/pt/blog/melhor-altura-visitar-algarve-passeios-de-barco/` *(verify exact slug from `packages/atlantis/src/content/blog/pt/` during the translation pass; if the PT CL4 file uses a different slug, use that)*
  - Tour: `/pt/tours/circuito-de-grutas-ate-benagil/`
- **ES:**
  - Pillar: `/es/blog/guia-completo-cueva-benagil/`
  - CL4 lateral: `/es/blog/mejor-epoca-visitar-algarve-tours-en-barco/` *(verify slug from `packages/atlantis/src/content/blog/es/`)*
  - Tour: `/es/tours/benagil-caves-speed-boat-tour/`
- **FR:**
  - Pillar: `/fr/blog/guide-complet-grotte-benagil/`
  - CL4 lateral: `/fr/blog/meilleure-periode-visiter-algarve-tours-bateau/` *(verify slug from `packages/atlantis/src/content/blog/fr/`)*
  - Tour: `/fr/tours/benagil-caves-speed-boat-tour/`

**Where NOT to put links:**

- Do NOT link to CL2 (the swimming-in rules). Prompt header's lean is skip — CL3 = timing, CL2 = rules; the lateral would feel forced. Anti-pattern enforced in §13 below.
- Do NOT link to CL9 (Algarve in spring) — prompt header's lean is skip unless the April/May section runs strong on "spring is the underrated window"; the writer's call, but the default is skip. If included, anchor would be `why spring is the smart pick` matching the pillar's anchor.
- Do NOT link to CL5 (Benagil vs other caves), CL6 (dolphins), CL7 (marine life), CL8 (packing) — none are natural laterals from CL3's focused timing scope.
- Do NOT add an OTA link, an affiliate link, or a competitor-operator link (inherited from pillar + CL1 + CL2).
- Do NOT add 5+ in-body links. The 4-link inventory is in-band; going to 5 with a CL2 or CL9 link is the most likely scope creep.

## 10. FAQ section (frontmatter `faqs:`)

The writer authors these in the YAML `faqs:` frontmatter block (same shape as the pillar + CL1 + CL2 — see pillar's `faqs:` block at lines 19–49 of `benagil-cave-tour-complete-guide.md` for the exact YAML structure; CL2 + CL1 mirror). Site pipeline auto-emits both the visible `<details>` block AND the `FAQPage` JSON-LD; no extra schema authoring.

**Target: 7 Q&A pairs** — matches CL2; lighter than CL1's 8 because timing has fewer discrete sub-questions than logistics. **Each answer 40–80 words** — citation-ready, complete-sentence answers. Don't end any answer with "see our full guide for more"; every answer stands alone (AI engines lift FAQ items independently). The pillar covers broader Benagil FAQs; CL3's 7 are specifically the timing-themed long-tails neither pillar nor CL1/CL2 owns.

Below are the questions + recommended answers in full (writer pastes into frontmatter and edits for voice; substance is correct per pillar §16 + this brief's own §6 anatomy):

1. **Q: "What is the best month to visit the Benagil cave?"** *(snippet-shaped repeat of the primary keyword — the AEO/Google-overview lift target — REQUIRED per prompt header)*
   A: Late May, June, and September are the operator-preferred months — the skylight beam is strong, the cave isn't yet crowded, the water is warm enough for the swim stop, and cancellations are rare. July and August deliver the strongest beam but the cave routinely holds three to four other boats at midday. April and October are uncrowded but the beam is softer; November to March, operators run on calm days only.

2. **Q: "What time does the sunbeam appear in the Benagil cave?"**
   A: The skylight beam falls into the cave between roughly 10:00 and 13:00 from May through October, when the sun is high enough to shine through the opening. The window shifts slightly later in winter and slightly earlier in midsummer. For the strongest, sharpest beam, aim for late morning — around 11:00 in June and July; closer to 12:00 in April and October.

3. **Q: "Is it better to visit the Benagil cave in the morning or at midday?"**
   A: Both work, for different reasons. The 07:30 to 09:00 first boat gives you the cave to yourself with softer, more diffused light — most photographers who know the cave prefer this window. The 10:00 to 13:00 midday window gives you the famous direct skylight beam but you'll share the cave with two to four other tours in summer. Pick by goal.

4. **Q: "Does the tide affect the Benagil cave?"**
   A: Mildly. The Algarve's tidal swing is under three metres, so the difference between low and high tide inside the cave is about 40 centimetres of arch clearance and roughly three metres of interior beach width. Low to mid tide is a refinement, not a transformation. Sea state — Atlantic swell — matters far more than tide level; over 1.5 metres of swell and the cave is unenterable regardless of tide.

5. **Q: "How often are Benagil cave tours cancelled?"**
   A: It depends on the season. In peak summer (July and August), under 2% of days cancel. In shoulder season (May, June, September, early October), 5 to 15% — usually for swell or wind. From mid-October through March, 60 to 80% of days don't run; operators only go when the Atlantic gives them a calm window. Book direct for the fastest weather updates.

6. **Q: "Is the Benagil cave open in winter?"**
   A: The cave itself never closes — what changes is whether operators can safely run boats to it. From November through March, expect most days to be cancelled for Atlantic swell over the 1.5-metre operator threshold. On the calm days that do run, the cave is essentially empty. If you're coming off-season, book a flexible operator, leave room in your schedule, and treat any on-water time as a bonus.

7. **Q: "Is September a good month for the Benagil cave?"**
   A: Yes — quietly the operator-preferred month. The water is at its annual warmest (22 to 24 °C — peak summer warmth holds into early September), the beam is strong with slightly softer light than July and August, the crowds thin sharply after the first week, and cancellation odds are low. The "August" photo most travel blogs post is often actually a September photo — softer light, half the boats.

**Cut if FAQ feels long (drop to 6):** the most cuttable is #6 (winter) — useful but overlapping with H2 #6's cancellation section. Keep all 7 unless the visible `<details>` block feels heavy.

## 11. External links (sparse and authoritative)

**Cap: zero externals — recommendation.** The pillar carries 2–3 externals; CL2 carries 1 (Sul Informação on the 2023 rules); CL1 carries 0. CL3's content is **timing observation** — there is no high-authority external for "best month to visit Benagil" or "skylight beam timing" that improves the piece. Tourism-board pages on Benagil are shallow on timing nuance; weather-aggregator pages drift and aren't authoritative; tide-table sites are utility resources, not citation sources. **Recommendation: ZERO external links.** Better one fewer link than one bad link (inherited from CL1 §11 + CL2 §11).

**Do NOT add:**

- A tide-table link (windguru, tides.mobilegeographics, accuweather). Utility, not source.
- The Sul Informação 2023-rules link. CL2 owns the rules citation; CL3 doesn't touch the rules at depth.
- A weather aggregator or marine-forecast site. Not authoritative for "best time" in the citation sense.
- Competitor operators, OTAs (Viator, GetYourGuide, Civitatis), Wikipedia, tourism aggregators — all named in pillar §13 anti-pattern list and inherited here.

**Writer note:** if a clean Visit Algarve or Visit Portugal page exists with substantive Benagil timing content (not boilerplate), the writer may consider one external — anchor as `the official Algarve tourism page on Benagil` or similar. **Default: skip.** Escalate to reviewer rather than adding on writer-initiative if the writer finds something genuinely citation-worthy.

## 12. Schema

The site's existing pipeline handles all of this — the writer does not author any JSON-LD manually. Mirrors the pillar + CL1 + CL2 setup exactly.

- **`Article`** schema — auto-emitted by `blog/[slug].astro` from frontmatter. `datePublished` reflects `date: "2026-05-14"`. The `author: Nuno Albino` flows into `Article.author` as a string. (No `Person` schema is wired today — flagged in pillar brief §12 as a future TODO; out of scope here.)
- **`FAQPage`** schema — auto-emitted when `faqs:` frontmatter is set. The 7 Q&A pairs in §10 light this up.
- **`BreadcrumbList`** schema — auto-emitted via `buildPostBreadcrumb()`. Per architecture §3 + BUILD-STATUS §1, the `pillarSlug` field has shipped, so CL3's breadcrumb renders `Home › Blog › Benagil Cave Tour: Everything You Need to Know in 2026 › Best Time to Visit the Benagil Caves`.
- **`HowTo` schema — NO.** Same reasoning as CL1 §12 — CL3 is comparative ("April vs May vs June vs … vs September") not sequential. Adding `HowTo` to a branching timing piece reads as schema spam.
- **No additional schema work needed.** No `TouristAttraction`, no `Place`, no `Event` (the skylight isn't an event), no `WeatherObservation` (would be overkill).

## 13. Anti-patterns — what the writer must NOT do

**Copy the pillar brief's §13 anti-pattern list verbatim** (editorial/SEO, voice/AI-fluff, structural anti-patterns all apply). **Copy CL1 brief's §13 + CL2 brief's §13 as inherited structural anti-patterns** (especially CL2 #2 marina hallucination, CL1 #1 marina hallucination — same anti-pattern enforced twice now — CL2 #4 sail-yacht-enters-the-cave, CL1 #5 "no matter where you're staying" framing, CL1 #9 precise drive-time citation). Re-read all three before drafting. Plus the CL3-specific anti-patterns below — the ones that will trip the writer up *because* the piece is about timing and the temptation to over-broaden into "best time to visit the Algarve" is high.

### CL3-specific anti-patterns (in addition to pillar §13 + CL1 §13 + CL2 §13)

1. **Do NOT call the marina `Marina de Portimão` or `Portimão Marina` (or worst, `Clube Naval`).** It is **Porto Comercial de Portimão**, signposted *Ac. Porto Comercial de Portimão*. The current EN stub uses `Portimão Marina` — this is the load-bearing hallucination to fix forward. CL3 names this entity exactly once (in H2 #7 the commercial paragraph) and gets it right. The pillar's H2 #4, CL1's H2 #2, CL2's H2 #6 all enforce the same correction; CL3 must NOT regress.

2. **Do NOT drift into CL4's scope.** CL3 is the CAVE-SPECIFIC LENS on timing. CL4 is the WHOLE-ALGARVE-BOAT-TOUR LENS. The biggest scope-creep failure looks like: a CL3 draft that mentions sailing wind windows, or dolphin season per month, or sunset cruise calendars, or multi-tour mix, or prices per month. **CL3 mentions sailing ZERO times. CL3 mentions dolphins ZERO times. CL3 mentions sunset cruises ZERO times. CL3 mentions prices ZERO times.** If the writer finds themselves writing any of these, the sentence belongs in CL4 — cut, point at CL4 via the closing lateral.

3. **Do NOT write the generic "low tide is preferable" line.** The current EN stub says: "Low tide is generally preferable for visiting Benagil. When the tide is low, more of the cave's sandy beach is exposed…" — this is the half-truth every travel blog repeats. CL3's H2 #5 corrects it with operator-grade nuance: tide matters (40cm of arch clearance, 3m of beach width — a refinement) but sea state matters more (1.5m swell = cave closes regardless of tide). The single most operator-grade fact CL3 teaches; do NOT regress to the generic claim.

4. **Do NOT write the generic "May to September is the best time" line as the whole answer.** Every aggregator blog says this and stops. CL3's job is to deepen — late May / June / September is the operator answer (NOT June–August); the time-of-day refinement (first boat vs midday beam) is the operator insight; the cancellation honesty is the trust currency. Just repeating "May to September" without the operator-grade math is the failure mode that makes CL3 indistinguishable from the SERP it's trying to beat.

5. **Do NOT bloat past 1,350 words.** Word count discipline is load-bearing for CL3. If a section wants to be longer, it probably belongs in CL4 (broad timing) or in a different cluster. Going to 1,600 is not "more value" — it's CL4 facet drift.

6. **Do NOT cite a specific 2023-rule fatality count, named individual, or statute reference.** Inherited from pillar §16 + CL2 §13 + CL1 §13. CL3 mentions the 2023 rules zero times at depth; if a passing mention is natural in the lede, "since 2023" is sufficient — no specific day (no "September 10, 2023" — pillar §16 + CL2 + CL1 §16 #4 verified this: REMOVED from CL2 at review time as unsourced beyond "September 2023").

7. **Do NOT name specific euro prices, fine amounts, or rebooking fees.** Inherited from pillar §13 + CL1 §13 + CL2 §13.

8. **Do NOT cite precise minute drive-times** (Faro→Portimão, etc.). CL1's territory; CL3 doesn't mention drive times.

9. **Do NOT recap the cave's geology / "what is Benagil".** Pillar §H2 #1 owns. The pillar callout in CL3's lede handles "but I don't know what the cave is" — the reader follows the link. CL3's body does NOT redefine "Algar de Benagil"; the term appears with an italicised first mention and the reader is presumed to recognise it (same discipline as CL1 §13 #3 + CL2 §13 #7).

10. **Do NOT speculate about future climate / seasonality shifts.** No "as climate change pushes summers warmer, the cave's peak season may extend into October"; no "the rule may change in 2027 to shift the off-season threshold." Both drift and date the piece.

11. **Do NOT cite Ahrefs / Semrush / SEMrush volumes** in the body (e.g., "according to Google Trends, the query peaks in July"). The piece's authority is operator observation, not aggregated search data. Citing search-volume data in a timing piece reads as SEO-meta and undercuts the skipper voice.

12. **Do NOT write the month-by-month subsections in identical structure** (e.g., every H3 opens "[Month] is the…", every H3 ends "Best for: …"). Match CL4's varied sentence shapes per month — each H3 is roughly the same length but the sentence rhythms differ. The "Best for:" line is fine on some H3s, not all — the writer's call. Repeating the same H3 structural template 7× is an AI-generation tell.

13. **Do NOT use the words "magical", "magical experience", "unforgettable", "must-do", "hidden gem", "bucket list", or "Instagrammable"** anywhere in the body. Inherited from pillar §13 + CL1 §13 + CL2 §13. The current EN stub uses "unforgettable" in the lede — REWRITE.

14. **Do NOT write "the perfect experience" or "perfect time to visit" anywhere.** The current EN stub uses "the perfect experience" in the meta-description — REWRITE. Perfection is the travel-aggregator voice; the skipper voice talks about trade-offs, not perfection.

15. **Do NOT link to CL2 in the body.** The prompt header's lean is SKIP — CL3 is timing, CL2 is rules; the lateral would feel forced. If the writer is tempted to mention the swimming-in restriction at depth, stop — that's CL2's territory.

## 14. Acceptance criteria (reviewer checklist)

The reviewer runs this checklist against the draft. Every "no" is a revision request. Reviewer is the operator (José) per architecture §7 + CL1 §14 + CL2 §14 — same reviewer as pillar + CL1 + CL2; the standard is consistent across the hub.

1. ☐ **Total word count: 1,150–1,350** (target ~1,200). Verify by `wc -w` on the body (excluding frontmatter). Going over 1,350 = revision; going under 1,150 = also revision (expand H2 #2 or H2 #6).
2. ☐ **7 H2 sections** (not 5, not 9). Every H2 has a **40–60-word answer paragraph** directly under the heading.
3. ☐ **H2 #1 ("The Short Answer")** opens with the **late-May/June/September + 10:00–13:00 + first-boat-07:30–09:00 answer paragraph** that covers the primary keyword directly.
4. ☐ **H2 #2 ("Month by Month")** has 6 H3 subsections (April, May, June, July, August, September) + 1 flattened off-season paragraph (October–March), with the comparison table at the top.
5. ☐ **Byline is `Nuno Albino`** (stub had `Atlantis Tours` — must be fixed forward). Voice is skipper-led, first-person plural where natural (concentrated in H2 #2 spine, H2 #4 first-boat call, H2 #6 cancellation honesty), opinionated but factual.
6. ☐ **`date:` frontmatter is `2026-05-14`** (stub had `2026-04-15` — must be refreshed). **`pillarSlug: benagil-cave-tour-complete-guide`** is set. **`pillarOrder: 1`** is set.
7. ☐ **`tags:`** includes the new `seasonality` tag.
8. ☐ **`image:` + `imageAlt:` + `description:`** are set on the frontmatter (stub MISSING all three — must be added).
9. ☐ **`relatedTourSlugs:`** is `[benagil-caves-speed-boat-tour]` for EN/ES/FR; `[circuito-de-grutas-ate-benagil]` for PT. Only the speedboat (CL1 + CL2 discipline; CL3 matches).
10. ☐ **All 4 in-body link placements from §9 are present** with anchor text:
    - bottom-up pillar callout in lede (first 200 words) → `complete Benagil Cave Tour guide`
    - bottom-up pillar callout in closing → `our full Benagil Cave Tour guide` (or similar varied descriptive anchor)
    - lateral to CL4 in closing → `month-by-month look at Algarve boat-tour season`
    - tour CTA in H2 #7 → `our Benagil speedboat tour from Portimão`
11. ☐ **Zero external links.**
12. ☐ **Required entities in body**: Algar de Benagil (italicised first mention), Porto Comercial de Portimão (once in H2 #7), Portimão, Atlantic / Atlantic swell, the skylight, May/June/September month names, 10:00–13:00 + 07:30–09:00 time windows. At least 3 entities appear in the first 200 words (Algar de Benagil + May/June/September + 10:00–13:00 at minimum).
13. ☐ **NOT in the body**: `Marina de Portimão` / `Portimão Marina` / `Clube Naval` (anti-pattern #1), any sailing/dolphins/sunset-cruise/pricing content from CL4's scope (anti-pattern #2), the generic "low tide is preferable" line (anti-pattern #3), any cited euro figure, any precise drive-time minute figure, any link to CL2 (anti-pattern #15), the words "magical/unforgettable/perfect/hidden gem/Instagrammable/bucket list" (anti-pattern #13–14).
14. ☐ **`faqs:` frontmatter has 7 Q&A pairs** (or 6 if #6 was cut per §10 cut note), each answer 40–80 words, each answer stands alone. FAQ #1 ("What is the best month to visit the Benagil cave?") IS PRESENT — required per prompt header (the snippet-shaped repeat of the primary keyword).
15. ☐ **No anti-pattern phrases from pillar §13, CL1 §13, CL2 §13, or CL3 §13.** Spot-check by searching the draft for: `elevate`, `unlock`, `seamless`, `let's dive in`, `in today's fast-paced`, `buckle up`, `look no further`, `please be advised`, `pursuant to`, `Clube Naval`, `Marina de Portimão`, `Portimão Marina`, `no matter where you're staying`, `magical`, `unforgettable`, `perfect`, `bucket list`, `hidden gem`, `Instagrammable`. All must return zero hits.
16. ☐ **Comparison table in H2 #2** renders cleanly in the MDX → HTML pipeline (verify in preview build); if a column doesn't read well, drop a column rather than rephrasing all 8 rows.
17. ☐ **The piece resolves the reader's timing question.** A test read by each of the 4 sub-profiles in §4 should leave the reader knowing: (1) which month matches their priorities, (2) which hour matches their goal, (3) what tide and sea state mean for their day, (4) the cancellation odds for their dates, (5) where to book. If the reader leaves more confused than they arrived, the piece failed.
18. ☐ **Builds cleanly**: `pnpm --filter atlantis run build` succeeds. Rendered `/en/blog/best-time-visit-benagil-caves/` page shows the breadcrumb, the FAQ block (7 items), and the JSON-LD `Article` + `FAQPage` schema validates in the Rich Results Test.
19. ☐ **The pillar's "In this guide" component lists CL3** at the correct position (CL1=0 → CL2=0.5 → **CL3=1** → CL4=2 → …) — verify after publish.
20. ☐ **PT/ES/FR siblings shipped or queued.** The translation pass uses the locked slugs (pt: `melhor-altura-visitar-grutas-benagil`, es: `mejor-epoca-visitar-cuevas-benagil`, fr: `meilleure-periode-visiter-grottes-benagil`), the locked `translationKey: best-time-benagil`, the locked locale-specific `pillarSlug`, and translates the body 1:1 with locale-appropriate phrasing (PT-pt, ES-es, FR-fr). PT relatedTour slug is `circuito-de-grutas-ate-benagil` (NOT `benagil-caves-speed-boat-tour`).

## 15. Open questions / judgment calls (flag for reviewer before draft starts)

Most decisions resolved in §16 below per prompt header instruction ("resolve as many as you can in the brief itself"). The few that remain genuinely require operator judgment:

1. **Month-by-month structure — H3 subsections (recommended) or flattened prose?** *Default: H3 subsections per month for May–October running months; one flattened "November to March" paragraph for off-season.* Rationale per §6 anatomy: H3 month subheadings (`### June`, `### September`) are AEO-friendly for exact-match month queries; CL4 uses the same structure. **Resolved: H3 subsections.**

2. **Comparison table in H2 #2 — include?** *Default: YES.* Adds skim-value; lifts cleanly into AI overviews; forces compression. The cave-clearance % numbers (~85%/~95%/~98% etc.) are operator-grade approximations; reviewer confirms specific bands or swaps. **Resolved: include the table.**

3. **The cave-clearance % numbers in the table** — operator-grade approximations:
   - April ~85%, May ~95%, June ~98%, July ~99%, August ~99%, September ~95%, October (first half) ~85%, November–March ~20–40%. *Default if no answer: use these figures; reviewer may swap. They're not verified against external data — they're "what we'd say in conversation."* **Reviewer-operator confirms** OR adjusts — the only genuine open question that cannot be resolved from the brief alone.

4. **CL4 lateral link in closing — include or skip?** *Recommendation: include (link #2 in §9).* The two pieces are sibling timing pieces with cleanly separated scopes; the closing is the natural place for the broaden-out signal. **Resolved: include.**

5. **CL9 lateral link (Algarve in spring) — include or skip?** Prompt header's lean is SKIP unless the April/May section runs a strong "spring is the underrated window" thread. *Default: SKIP.* CL3's April/May H3 rows already carry the "soft light, low crowds, lowest prices" frame; the explicit lateral link would crowd the link inventory (would push to 5). **Resolved: skip.**

6. **CL2 lateral link — include or skip?** Prompt header's lean is SKIP — CL3 = timing, CL2 = rules; the lateral would feel forced. *Default: SKIP.* If the writer finds a clean seasonal angle on the 2023 rules (e.g., the rule's enforcement timeline shifted at start of 2024 season), escalate to reviewer rather than adding on writer-initiative. **Resolved: skip.**

7. **Hero image** — reuse the pillar's skylight image per prompt header lock. **Resolved: reuse** `cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs`. Operator may swap on a future refresh if a marina/seasonal/beam-specific asset surfaces.

8. **`seasonality` tag — confirm.** Prompt header locks. *Default: include.* **Resolved: include.** Final tag set: `[benagil, caves, travel-tips, seasonality]`.

9. **Title — locked.** Prompt header locks. **Resolved: "Best Time to Visit the Benagil Caves"** (plural, no year stamp, matches stub + slug + pillar's depth-link anchor).

10. **Slugs (4 locales) — locked.** Prompt header locks all four URL-permanent. **Resolved.**

11. **`pillarOrder: 1` — locked.** Prompt header locks. CL1=0, CL2=0.5, CL3=1, CL4=2, CL5=3, etc. **Resolved.**

12. **Stub's `September 10, 2023` precision** — pillar §16 + CL2 + CL1 §16 #4 verified: REMOVED from CL2 at review time as unsourced beyond "September 2023". CL3 stub doesn't currently reference the rule date at all. **Resolved: do NOT introduce a specific day in CL3.** If a passing mention of the rule appears at all (which the prompt header discourages — CL3 should mention the swim restriction zero times if possible), "September 2023" is the verified framing.

---

## 16. Reviewer addendum — resolved questions + verified facts (2026-05-14)

**Most §15 open questions resolved by recommendation; one (the cave-clearance % bands in the table) remains for operator confirmation pre-draft.**

**Resolved (recommendations applied):**

1. **Month-by-month structure** — ✅ H3 subsections for May–October running months; flattened paragraph for November–March off-season.
2. **Comparison table in H2 #2** — ✅ INCLUDE. Adds skim-value + AI-overview lift surface.
4. **CL4 lateral link in closing** — ✅ INCLUDE. The natural broaden-out signal; CL3 → CL4 closing anchor `month-by-month look at Algarve boat-tour season`.
5. **CL9 lateral link** — ✅ SKIP. Default per prompt header lean.
6. **CL2 lateral link** — ✅ SKIP. Default per prompt header lean. CL3 mentions the swim restriction zero times at depth; one passing sentence in the lede is acceptable if natural.
7. **Hero image** — ✅ REUSE the pillar's skylight (`cdn.filestackcontent.com/KrQCqauLRe2bmZ68HqQs`).
8. **`seasonality` tag** — ✅ INCLUDE.
9. **Title** — ✅ LOCKED: "Best Time to Visit the Benagil Caves".
10. **Slugs (4 locales)** — ✅ LOCKED per prompt header (URL-permanent).
11. **`pillarOrder: 1`** — ✅ LOCKED.
12. **No specific 2023-rule day** — ✅ "September 2023" only, if at all.

**The single open question for the operator:**

3. **Cave-clearance % bands in the comparison table** — flag for operator confirm pre-draft. Suggested figures:
   - April ~85% (some swell cancellations)
   - May ~95%
   - June ~98%
   - July ~99%
   - August ~99%
   - September ~95%
   - October (first half) ~85%
   - November–March ~20–40% (most days cancelled)
   These are operator-grade approximations, not verified external data. The operator should confirm or adjust before draft starts — the writer should NOT invent bands on draft-initiative if the operator hasn't confirmed. **If the operator's actual operating year diverges materially (e.g., July is closer to ~95%, not ~99%), the writer needs the corrected bands to keep the table honest.**

**Verified operator facts (re-confirmed for this brief, no changes since pillar/CL1/CL2):**

- Departure marina is `Porto Comercial de Portimão` (signposted *Ac. Porto Comercial de Portimão*). NOT Clube Naval, NOT Marina de Portimão, NOT Portimão Marina. See [[reference_atlantis_departure_marina]]. The current EN stub uses "Portimão Marina" — must be fixed forward in the rewrite.
- Cranchi 38ft yacht DOES enter the cave (mid-sized motor; clears the sea-level arch). Sail yacht does NOT (mast clearance). See [[reference_atlantis_yacht_cave_entry]]. (Not load-bearing for CL3 — CL3 doesn't enter boat-type comparison territory — but the constraint applies if the writer is tempted to mention "even yachts can enter on a calm day".)
- We operate boats from Portimão only. We do NOT run from Carvoeiro / Lagos / Albufeira / Armação de Pêra.
- The "September 10, 2023" specific date was REMOVED from CL2 at review time (unsourced beyond "September 2023" in the pillar). CL3 should NOT introduce a specific day. **CL3's preferred posture: mention the 2023 rules zero times at depth; if a passing mention appears in the lede, "since 2023" is sufficient.**

Writer: brief is ready pending the §16 #3 operator confirm on the cave-clearance % bands. Proceed to ack and surface that one question; everything else is locked.

---

*End of brief. The writer should ack this brief, raise §16 #3 (cave-clearance % bands) with the operator, then draft the EN piece. The reviewer reviews against §14. Translation to pt/es/fr is a separate Sonnet pass after EN review — pt expands the existing stub in place; es + fr are new files (per the project memory `feedback_opus_for_writing` — Opus drafts content, Sonnet handles schema/translation plumbing).*
