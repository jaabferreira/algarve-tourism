# Luxury Sail Yacht Campaign — Keywords & RSA

**Campaign goal:** capture sail-specific premium charter intent — "sail yacht charter Algarve", "sailing trip Portimão", "private sailing Benagil". Same buyer tier as Cranchi (premium private charter) but a different sub-segment: people who specifically want **sail** (slow, quiet, eco) rather than **motor** (fast, powerful, splashy).

**Why this campaign exists separate from Cranchi:** the user intent is genuinely different. Someone searching "sailing yacht algarve" doesn't want a motor yacht, and vice versa — the boats look, sound, and feel completely different on the water. Forcing one ad to convert both would dilute relevance and Quality Score.

**Routing:** all clicks land on the Luxury Sail Yacht product page (PK `717754`, EN slug `luxury-sail-yacht-cruise`).

**Product reality check:**

| Variant | PK | Duration | Price from |
|---|---|---|---|
| Standard cruise | 717754 | 2h30 | €368.42 |
| Half Day | 718007 | 3h30 | €610.53 |
| Full Day | 718013 | 6h | €789.47 |

All variants: **up to 12 guests** (vs 10 on Cranchi), private (your group + captain/crew), departures from Portimão. Optional paid water-toy add-ons (Seabob, Hydrofoil, JetSki) on the Half/Full day variants — not in this campaign's copy yet (would require splitting into per-duration ad groups, see Open Questions).

---

## Campaign settings

| Field | Value |
|---|---|
| Campaign name | `NB — Sail Yacht` |
| Campaign type | Search |
| Bid strategy (Phase 1) | **Manual CPC**, max CPC **€2.20** |
| Bid strategy (Phase 2, after ≥30 conversions) | Maximize Conversion Value, then Target ROAS 400% |
| Daily budget | **€10/day** (€300/mo) |
| Networks | Search only |
| Locations | Portugal + UK + Ireland + Germany + Netherlands + France + Spain |
| Location targeting | "People in or regularly in your targeted locations" |
| Location bid adjustment | **+20% in: Portimão, Lagoa, Carvoeiro, Lagos, Albufeira** |
| Languages | English, Portuguese, Spanish, French |
| Devices | Mobile **+10%**, Tablet -10%, Desktop default |
| Ad rotation | "Optimize: prefer best-performing ads" |
| Ad schedule | All day, all week |

**Why max CPC €2.20** (slightly lower than Cranchi's €2.50): avg booking value is a little lower (€368 base vs €473 base), and sail-specific search volume is smaller. €2.20 is the right ceiling to stay within ~15-20% CPA on the avg ~€500 booking.

---

## Within-campaign negative keywords

```
shared
group
"group tour"
"join a group"
"per person"
"per pax"
benagil cave tour
"benagil tour"
fishing
kayak
sup
"stand up paddle"
swim
"motor yacht"
[motor yacht charter]
speedboat
"speed boat"
"power boat"
[powerboat]
catamaran
[catamaran charter algarve]
[catamaran tour algarve]
"yacht week"
"how to buy"
"for sale"
"used yacht"
classified
```

**Why "motor yacht" / "speedboat" / "power boat":** wrong product. Sail Yacht is a sailing monohull. Motor-intent searchers belong in the Cranchi campaign.

**Why "catamaran":** different boat type (multi-hull). Most people who specifically search "catamaran" want that distinct experience.

**Why "benagil cave tour":** that exact intent belongs in the Benagil campaign — let it win there.

---

## Ad groups

### Ad group: `SAIL — EN`

**Final URL:** `https://atlantistours.pt/en/tours/luxury-sail-yacht-cruise/`
**Display path:** `Portimão` / `Sail`
**Language targeting:** English

**Keywords:**

```
[sail yacht algarve]
[sail yacht charter algarve]
[sail yacht portimão]
[sail yacht portimao]
[sailing yacht algarve]
[sailing yacht portimão]
[sailing yacht charter algarve]
[sailing charter algarve]
[sailing charter portimão]
[sailing trip algarve]
[sailing trip portimão]
[sailing tour algarve]
[sailing tour portimão]
[sailing experience algarve]
[private sailing algarve]
[private sailing portimão]
[private sailing trip algarve]
[private sail boat algarve]
[private sail boat portimão]
[sail boat charter algarve]
[sail boat hire algarve]
[sail boat rental algarve]
[luxury sailing algarve]
[luxury sailing portimão]
[luxury sail yacht algarve]
[romantic sailing algarve]
[sunset sailing algarve]
[sunset sail yacht algarve]
[half day sailing algarve]
[full day sailing algarve]
"sail yacht algarve"
"sailing yacht algarve"
"private sailing algarve"
"sailing trip algarve"
"luxury sailing algarve"
```

### Ad group: `SAIL — PT`

**Final URL:** `https://atlantistours.pt/pt/tours/luxuoso-iate-a-vela/`
**Display path:** `Portimão` / `Vela`
**Language targeting:** Portuguese

```
[iate a vela algarve]
[iate a vela portimão]
[iate a vela portimao]
[veleiro algarve]
[veleiro portimão]
[veleiro privado algarve]
[passeio veleiro algarve]
[passeio veleiro portimão]
[passeio vela algarve]
[charter vela algarve]
[charter veleiro algarve]
[aluguer veleiro algarve]
[aluguer iate vela algarve]
[passeio velejar algarve]
[velejar algarve]
[velejar portimão]
[iate vela luxo algarve]
[meio dia veleiro algarve]
[dia inteiro veleiro algarve]
"iate a vela algarve"
"veleiro algarve"
"passeio veleiro algarve"
"velejar portimão"
```

### Ad group: `SAIL — ES`

**Final URL:** `https://atlantistours.pt/es/tours/luxury-sail-yacht-cruise/`
**Display path:** `Portimão` / `Vela`
**Language targeting:** Spanish

```
[velero algarve]
[velero portimao]
[velero portimão]
[velero privado algarve]
[paseo en velero algarve]
[paseo en velero portimao]
[charter velero algarve]
[alquiler velero algarve]
[alquiler velero portimao]
[yate de vela algarve]
[yate vela algarve]
[yate vela portimao]
[navegar a vela algarve]
[navegar algarve]
[velero de lujo algarve]
[medio dia velero algarve]
[dia entero velero algarve]
"velero algarve"
"yate de vela algarve"
"paseo en velero algarve"
```

### Ad group: `SAIL — FR`

**Final URL:** `https://atlantistours.pt/fr/tours/luxury-sail-yacht-cruise/`
**Display path:** `Portimão` / `Voile`
**Language targeting:** French

```
[voilier algarve]
[voilier portimao]
[voilier portimão]
[voilier privé algarve]
[location voilier algarve]
[location voilier portimao]
[charter voilier algarve]
[balade voilier algarve]
[excursion voilier algarve]
[excursion voile algarve]
[yacht à voile algarve]
[yacht à voile portimao]
[navigation à voile algarve]
[voile algarve]
[voile portimão]
[voilier de luxe algarve]
[demi journée voilier algarve]
[journée voilier algarve]
"voilier algarve"
"yacht à voile algarve"
"location voilier algarve"
```

---

## Responsive Search Ad — EN

### Headlines (15) — each ≤30 chars

| # | Headline | Chars | Pin |
|---|---|---|---|
| 1 | Private Sail Yacht — Algarve | 28 | **Pin to position 1** |
| 2 | From €368 — 12 Guests | 21 | **Pin to position 2** |
| 3 | Sailing from Portimão | 21 | **Pin to position 2** |
| 4 | 2h30, Half Day or Full Day | 26 | unpinned |
| 5 | Just You & Your Group | 21 | unpinned |
| 6 | Captain & Crew Included | 23 | unpinned |
| 7 | Quiet, Slow, Magical | 20 | unpinned |
| 8 | 4.9★ on TripAdvisor | 19 | unpinned |
| 9 | Free Cancellation 24h | 21 | unpinned |
| 10 | Skip the OTA Markup | 19 | unpinned |
| 11 | Sail to Benagil Coast | 21 | unpinned |
| 12 | Couples, Families, Friends | 26 | unpinned |
| 13 | Special Occasions Welcome | 25 | unpinned |
| 14 | Licensed & Insured | 18 | unpinned |
| 15 | Operating Since 2018 | 20 | unpinned |

> **Why "Quiet, Slow, Magical":** sail-yacht searchers want the *opposite* of motor-yacht. The differentiator is no engine noise, slower pace, sails-up vibe. Lean into it.

### Descriptions (4) — each ≤90 chars

| # | Description | Chars |
|---|---|---|
| 1 | Private sail yacht cruise from Portimão. Up to 12 guests, from €368, 2h30. | 75 |
| 2 | Just you and your group — captain and crew included. Sail along the Algarve coast. | 82 |
| 3 | Skip the OTA markup. Book direct on atlantistours.pt for the best price. | 72 |
| 4 | Quiet sailing, golden cliffs, magical caves. Perfect for couples and special days. | 82 |

---

## Responsive Search Ad — PT

### Headlines (PT)

| # | Headline (PT) | Chars | Pin |
|---|---|---|---|
| 1 | Iate à Vela Privado | 19 | **Pin 1** |
| 2 | Desde €368 — 12 Pessoas | 23 | **Pin 2** |
| 3 | A Velejar de Portimão | 21 | **Pin 2** |
| 4 | 2h30, Meio Dia ou Dia Inteiro | 29 | — |
| 5 | Só Tu e o Teu Grupo | 19 | — |
| 6 | Capitão e Tripulação | 20 | — |
| 7 | Calmo, Lento, Mágico | 20 | — |
| 8 | 4.9★ no TripAdvisor | 19 | — |
| 9 | Cancelamento Gratuito 24h | 25 | — |
| 10 | Sem Taxas de OTA | 16 | — |
| 11 | Velejar até Benagil | 19 | — |
| 12 | Casais, Famílias, Amigos | 24 | — |
| 13 | Ocasiões Especiais | 18 | — |
| 14 | Licenciado e Segurado | 21 | — |
| 15 | A Operar Desde 2018 | 19 | — |

### Descriptions (PT)

| # | Description (PT) | Chars |
|---|---|---|
| 1 | Passeio privado em iate à vela de Portimão. Até 12 pessoas, desde €368, 2h30. | 78 |
| 2 | Só tu e o teu grupo — capitão e tripulação incluídos. Velejar na costa do Algarve. | 82 |
| 3 | Sem taxas de OTA. Reserva direta em atlantistours.pt — melhor preço garantido. | 78 |
| 4 | Vela calma, falésias douradas, grutas mágicas. Perfeito para casais e dias especiais. | 84 |

---

## Responsive Search Ad — ES

### Headlines (ES)

| # | Headline (ES) | Chars | Pin |
|---|---|---|---|
| 1 | Velero Privado — Algarve | 24 | **Pin 1** |
| 2 | Desde €368 — 12 Personas | 24 | **Pin 2** |
| 3 | Navegar desde Portimão | 22 | **Pin 2** |
| 4 | 2h30, Medio Día o Día Entero | 28 | — |
| 5 | Solo Tú y Tu Grupo | 18 | — |
| 6 | Capitán y Tripulación | 21 | — |
| 7 | Tranquilo, Lento, Mágico | 24 | — |
| 8 | 4.9★ en TripAdvisor | 19 | — |
| 9 | Cancelación Gratuita 24h | 24 | — |
| 10 | Sin Tasas de OTA | 16 | — |
| 11 | Navegar a Benagil | 17 | — |
| 12 | Parejas, Familias, Amigos | 25 | — |
| 13 | Ocasiones Especiales | 20 | — |
| 14 | Licenciado y Asegurado | 22 | — |
| 15 | Operando Desde 2018 | 19 | — |

### Descriptions (ES)

| # | Description (ES) | Chars |
|---|---|---|
| 1 | Crucero privado en velero desde Portimão. Hasta 12 personas, desde €368, 2h30. | 79 |
| 2 | Solo tú y tu grupo — capitán y tripulación incluidos. Navegar por la costa del Algarve. | 85 |
| 3 | Sin tasas de OTA. Reserva directa en atlantistours.pt — mejor precio garantizado. | 80 |
| 4 | Vela tranquila, acantilados dorados, cuevas mágicas. Perfecto para parejas. | 76 |

---

## Responsive Search Ad — FR

### Headlines (FR)

| # | Headline (FR) | Chars | Pin |
|---|---|---|---|
| 1 | Voilier Privé — Algarve | 23 | **Pin 1** |
| 2 | Dès €368 — 12 Personnes | 23 | **Pin 2** |
| 3 | Naviguer depuis Portimão | 24 | **Pin 2** |
| 4 | 2h30, Demi-Journée ou Journée | 29 | — |
| 5 | Vous et Votre Groupe | 20 | — |
| 6 | Capitaine et Équipage | 21 | — |
| 7 | Calme, Lent, Magique | 20 | — |
| 8 | 4.9★ sur TripAdvisor | 20 | — |
| 9 | Annulation Gratuite 24h | 23 | — |
| 10 | Sans Frais d'OTA | 16 | — |
| 11 | Naviguer vers Benagil | 21 | — |
| 12 | Couples, Familles, Amis | 23 | — |
| 13 | Occasions Spéciales | 19 | — |
| 14 | Licenciés et Assurés | 20 | — |
| 15 | Depuis 2018 | 11 | — |

### Descriptions (FR)

| # | Description (FR) | Chars |
|---|---|---|
| 1 | Croisière privée en voilier depuis Portimão. Jusqu'à 12 personnes, dès €368. | 76 |
| 2 | Vous et votre groupe — capitaine et équipage inclus. Naviguer sur la côte algarvienne. | 86 |
| 3 | Sans frais d'OTA. Réservez en direct sur atlantistours.pt — meilleur prix garanti. | 81 |
| 4 | Voile calme, falaises dorées, grottes magiques. Parfait pour couples et occasions. | 82 |

---

## Expected KPIs (Phase 1, Sail Yacht)

**Working assumption:** avg booking value ~€500 (mix of 2h30 €368, half-day €611, full-day €789).

| Metric | Target | Notes |
|---|---|---|
| Avg CPC | €1.30 – €2.20 | Premium intent; fewer bidders than Cranchi (sail is a smaller search niche) |
| CTR | ≥ 4% | Lean into the "quiet/slow/magical" differentiator |
| Conv rate (click → FH purchase) | ≥ 1.5% (target 3%) | High consideration; comparison-heavy |
| Cost per booking (CPA) | **€50 – €100** | 10-20% of €500 avg booking value |
| ROAS | ≥ 5× | Premium product margin supports this |
| Bookings/month (target) | 2 – 6 | Sail is a smaller niche than motor — accept lower volume |

⚠️ **Hard floor:** if CPA exceeds **€125** (25% of €500) over a 30-day window, pause and reassess.

⚠️ **Sail vs motor cross-shopping:** some users browse both yacht types before deciding. If the search-terms report shows the same query strings hitting both Sail and Cranchi campaigns, that's expected — the auctions for those queries will go to whichever campaign has better Quality Score and bid that day. Don't try to "fix" overlap by tightening — let the auction sort it out.

---

## Maintenance checklist

- **Week 1-2:** daily search-terms review. Watch for "catamaran" / "motor yacht" / "speedboat" slipping through and add to within-campaign negatives.
- **Week 3:** if no conversions yet, **don't pause** — sail-yacht consideration is even longer than Cranchi (often 14-30 days). Wait until day 21+.
- **Month 2:** if conversion volume ≥ 10 in last 30 days, switch bidding to **Maximize Conversion Value** (price spread €368-€789 makes value optimization important).
- **Month 3:** consider splitting into per-duration ad groups (Standard / Half Day / Full Day) — would let us advertise the Seabob/Hydrofoil/JetSki extras specifically for the longer trips where they're available.

---

## Decisions log

- **2026-04-23**: Dedicated sunset sail ad group — **deferred to Phase 2**.
- **2026-04-23**: Romantic / proposal / honeymoon ad group — **deferred to Phase 2**.
