# Benagil Campaign — Keywords & RSA

**Campaign goal:** capture the highest-volume Algarve search query — "Benagil cave tour" — at scale, with our €20 group speedboat as the entry product. This is the campaign that pays for the rest of Phase 1.

**Why Benagil first:** it's the single most-searched Algarve attraction. Tourists already want it; they just don't know who to book with. Whoever shows up first with a clear "from Portimão / from €20 / book direct" message wins the click.

**Routing:** all Benagil-campaign clicks go to the **speedboat product page** (PK 717720, €20 entry price). The two private-yacht products (which also visit Benagil) get their own campaigns (C5, C6) because the intent + price-point + buyer profile are completely different.

---

## Campaign settings

| Field | Value |
|---|---|
| Campaign name | `NB — Benagil Cave Tour` |
| Campaign type | Search |
| Bid strategy (Phase 1) | **Manual CPC**, max CPC **€0.80** |
| Bid strategy (Phase 2, after ≥30 conversions) | Maximize Conversion Value, then Target ROAS 500% |
| Daily budget | **€30/day** (€900/mo) — volume driver |
| Networks | Search only (NO display, NO search partners) |
| Locations | Portugal (in-Algarve focus) + UK + Ireland + Germany + Netherlands + France + Spain |
| Location targeting | "People in or regularly in your targeted locations" |
| Location bid adjustment | **+30% in: Portimão, Lagoa, Carvoeiro, Lagos, Albufeira** (in-trip last-minute bookers) |
| Languages | English, Portuguese, Spanish, French |
| Devices | Mobile **+30%**, Tablet -20%, Desktop default |
| Ad rotation | "Optimize: prefer best-performing ads" |
| Ad schedule | All day, all week (revisit after 30d data) |

**Why mobile +30%:** in-Algarve last-minute bookers are almost entirely on mobile. Brand campaign was +20%; this campaign is +30% because the audience skew is even stronger.

**Why the 5-city +30% bid adjustment:** matches our 80/20 audience strategy. Targeting those 5 cities (vs the whole Algarve postal range) keeps spend on the towns where the customer is *near the dock*. Tourists staying in Faro/Tavira/Sagres are too far to be a same-day booker — they convert at lower rates and aren't worth the +30% premium.

**Why max CPC dropped from €1.50 to €0.80:** at avg booking value €80 (4 pax × €20), a sustainable CPA is €12-€16 (15-20% of revenue). At a 3% click→booking conv rate, that requires max CPC ≤ €0.50; at a 5% conv rate, ≤ €0.80. Starting at €0.80 lets us discover real conv rate before tightening.

---

## Within-campaign negative keywords

These run **on top of** the account-wide negatives (`01-keywords/negatives-account.md`). They block product-type confusion specific to Benagil.

```
kayak
canoe
"stand up paddle"
sup
paddleboard
swim
"swim to"
"swim through"
"swimming pool"
helicopter
drone
"drone shot"
"drone footage"
"4k"
"video"
hike
hiking
trail
walk
"walking tour"
"on foot"
hotel
airbnb
"car park"
parking
"how to drive"
"drive to"
"from above"
geology
"geological"
formation
photography
"photo location"
instagram
tiktok
```

**Why "kayak" / "SUP":** Benagil is also offered by kayak/SUP operators. We're not them. Sending a SUP-intent click to a speedboat page = bounce.

**Why "swim":** Benagil cave is famous for the open ceiling — many people search "swim into Benagil cave". You **cannot legally swim into the cave from a boat tour anymore** (regulation since 2023). Send swim-intent traffic away.

**Why "helicopter / drone / 4K / video":** these are research / content-creator intent, not booking intent.

---

## Ad groups

One ad group per language. Each ad group has its own keywords (translated) and one RSA pointing to that locale's tour page.

### Ad group: `BENAGIL — EN`

**Final URL:** `https://atlantistours.pt/en/tours/benagil-caves-speed-boat-tour/`
**Display path:** `Portimão` / `Benagil`
**Language targeting:** English

**Keywords:**

```
[benagil cave tour]
[benagil cave tours]
[benagil caves tour]
[benagil caves tours]
[benagil cave boat tour]
[benagil caves boat tour]
[benagil sea cave tour]
[benagil tour]
[benagil tours]
[benagil boat tour]
[boat tour benagil]
[boat tour benagil cave]
[boat trip benagil]
[boat to benagil]
[benagil from portimão]
[benagil cave from portimão]
[benagil tour from portimão]
[benagil from carvoeiro]
[benagil cave from carvoeiro]
[benagil from lagos]
[benagil from albufeira]
[visit benagil cave]
[visit benagil caves]
[how to visit benagil]
[how to visit benagil cave]
[how to get to benagil]
[how to get to benagil cave]
[best benagil cave tour]
"benagil cave tour"
"benagil tour"
"boat to benagil"
"visit benagil"
"how to get to benagil"
```

### Ad group: `BENAGIL — PT`

**Final URL:** `https://atlantistours.pt/pt/tours/circuito-de-grutas-ate-benagil/`
**Display path:** `Portimão` / `Benagil`
**Language targeting:** Portuguese

```
[passeio grutas benagil]
[passeio gruta benagil]
[passeio de barco benagil]
[passeios benagil]
[grutas benagil]
[gruta benagil]
[grutas de benagil]
[gruta de benagil]
[circuito grutas benagil]
[passeio grutas portimão]
[passeio grutas portimao]
[passeio barco portimão]
[barco para benagil]
[visita gruta benagil]
[visitar grutas benagil]
[como chegar benagil]
[como ir grutas benagil]
"grutas benagil"
"passeio benagil"
"barco benagil"
"visitar benagil"
```

### Ad group: `BENAGIL — ES`

**Final URL:** `https://atlantistours.pt/es/tours/benagil-caves-speed-boat-tour/`
**Display path:** `Portimão` / `Benagil`
**Language targeting:** Spanish

```
[cuevas de benagil tour]
[cueva de benagil tour]
[tour cuevas benagil]
[tour cueva benagil]
[paseo en barco benagil]
[paseo barco cuevas benagil]
[barco a benagil]
[barco cuevas benagil]
[cuevas benagil portimao]
[cuevas benagil desde portimao]
[visitar cuevas benagil]
[visitar cueva benagil]
[como llegar benagil]
[como llegar a las cuevas de benagil]
"cuevas de benagil"
"cueva benagil"
"tour benagil"
"barco benagil"
```

### Ad group: `BENAGIL — FR`

**Final URL:** `https://atlantistours.pt/fr/tours/benagil-caves-speed-boat-tour/`
**Display path:** `Portimão` / `Benagil`
**Language targeting:** French

```
[grottes de benagil tour]
[grotte de benagil tour]
[tour grottes benagil]
[excursion grottes benagil]
[bateau grottes benagil]
[bateau benagil]
[bateau pour benagil]
[grottes benagil portimao]
[grottes benagil depuis portimao]
[visiter grottes benagil]
[visiter benagil]
[comment aller benagil]
[comment visiter benagil]
"grottes de benagil"
"grotte benagil"
"bateau benagil"
"visiter benagil"
```

---

## Responsive Search Ad — EN

### Headlines (15) — each ≤30 chars

| # | Headline | Chars | Pin |
|---|---|---|---|
| 1 | Benagil Cave Tour — Direct | 26 | **Pin to position 1** |
| 2 | From €20 — Daily Tours | 22 | **Pin to position 2** |
| 3 | Departure from Portimão | 23 | **Pin to position 2** |
| 4 | 1h30 — Visit Benagil Cave | 25 | unpinned |
| 5 | Speed Boat to Benagil | 21 | unpinned |
| 6 | 4.9★ on TripAdvisor | 19 | unpinned |
| 7 | Free Cancellation 24h | 21 | unpinned |
| 8 | Small Groups, Big Adventure | 27 | unpinned |
| 9 | Licensed & Insured | 18 | unpinned |
| 10 | Daily Departures | 16 | unpinned |
| 11 | Book Direct, Skip OTA Fees | 26 | unpinned |
| 12 | Caves, Cliffs & Coastline | 25 | unpinned |
| 13 | Family-Friendly Tour | 20 | unpinned |
| 14 | Local Captains, Real Stories | 28 | unpinned |
| 15 | Operating Since 2018 | 20 | unpinned |

> **Pinning logic:** position 1 always identifies the product ("Benagil Cave Tour — Direct"). Position 2 rotates between the price hook ("From €20") and the location hook ("Departure from Portimão") — both are major decision triggers for last-minute bookers. Everything else rotates freely so Google can optimize the rest.

### Descriptions (4) — each ≤90 chars

| # | Description | Chars |
|---|---|---|
| 1 | Visit the iconic Benagil sea cave on a 1h30 speedboat tour from Portimão. From €20. | 84 |
| 2 | Small groups, daily departures, free cancel 24h before. Licensed boats, insured. | 80 |
| 3 | Skip the OTA fees. Book direct on atlantistours.pt — best price guaranteed. | 75 |
| 4 | Discover sea caves, cliffs and the magic of Benagil. Tours in EN, PT, ES, FR. | 76 |

---

## Responsive Search Ad — PT

### Headlines (PT)

| # | Headline (PT) | Chars | Pin |
|---|---|---|---|
| 1 | Grutas de Benagil — Direto | 26 | **Pin 1** |
| 2 | Desde €20 — Diário | 18 | **Pin 2** |
| 3 | Saída de Portimão | 17 | **Pin 2** |
| 4 | 1h30 — Visita às Grutas | 23 | — |
| 5 | Lancha Rápida até Benagil | 25 | — |
| 6 | 4.9★ no TripAdvisor | 19 | — |
| 7 | Cancelamento Gratuito 24h | 25 | — |
| 8 | Grupos Pequenos | 15 | — |
| 9 | Licenciado e Segurado | 21 | — |
| 10 | Partidas Diárias | 16 | — |
| 11 | Reserva Direta, Sem Taxas | 25 | — |
| 12 | Grutas, Falésias e Costa | 24 | — |
| 13 | Para Toda a Família | 19 | — |
| 14 | Capitães Locais | 15 | — |
| 15 | A Operar Desde 2018 | 19 | — |

### Descriptions (PT)

| # | Description (PT) | Chars |
|---|---|---|
| 1 | Visita a icónica Gruta de Benagil num passeio de lancha de 1h30 desde Portimão. €20. | 85 |
| 2 | Grupos pequenos, partidas diárias, cancelamento grátis 24h antes. Barcos licenciados. | 86 |
| 3 | Sem taxas de OTA. Reserva direta em atlantistours.pt — melhor preço garantido. | 78 |
| 4 | Grutas, falésias e a magia de Benagil. Passeios em PT, EN, ES, FR. | 65 |

---

## Responsive Search Ad — ES

### Headlines (ES)

| # | Headline (ES) | Chars | Pin |
|---|---|---|---|
| 1 | Cuevas de Benagil — Directo | 27 | **Pin 1** |
| 2 | Desde €20 — Diario | 18 | **Pin 2** |
| 3 | Salida desde Portimão | 21 | **Pin 2** |
| 4 | 1h30 — Visita a las Cuevas | 26 | — |
| 5 | Lancha Rápida a Benagil | 23 | — |
| 6 | 4.9★ en TripAdvisor | 19 | — |
| 7 | Cancelación Gratuita 24h | 24 | — |
| 8 | Grupos Reducidos | 16 | — |
| 9 | Licenciado y Asegurado | 22 | — |
| 10 | Salidas Diarias | 15 | — |
| 11 | Reserva Directa, Sin Tasas | 26 | — |
| 12 | Cuevas, Acantilados y Costa | 27 | — |
| 13 | Para Toda la Familia | 20 | — |
| 14 | Capitanes Locales | 17 | — |
| 15 | Operando Desde 2018 | 19 | — |

### Descriptions (ES)

| # | Description (ES) | Chars |
|---|---|---|
| 1 | Visita la icónica Cueva de Benagil en un paseo en lancha de 1h30 desde Portimão. €20. | 86 |
| 2 | Grupos reducidos, salidas diarias, cancelación gratis 24h antes. Barcos licenciados. | 84 |
| 3 | Sin tasas de OTA. Reserva directa en atlantistours.pt — mejor precio garantizado. | 80 |
| 4 | Cuevas, acantilados y la magia de Benagil. Tours en ES, EN, PT, FR. | 67 |

---

## Responsive Search Ad — FR

### Headlines (FR)

| # | Headline (FR) | Chars | Pin |
|---|---|---|---|
| 1 | Grottes de Benagil — Direct | 27 | **Pin 1** |
| 2 | Dès €20 — Quotidien | 19 | **Pin 2** |
| 3 | Départ de Portimão | 18 | **Pin 2** |
| 4 | 1h30 — Visite des Grottes | 25 | — |
| 5 | Bateau Rapide à Benagil | 23 | — |
| 6 | 4.9★ sur TripAdvisor | 20 | — |
| 7 | Annulation Gratuite 24h | 23 | — |
| 8 | Petits Groupes | 14 | — |
| 9 | Licenciés et Assurés | 20 | — |
| 10 | Départs Quotidiens | 18 | — |
| 11 | Réservez en Direct, Sans Frais | 30 | — |
| 12 | Grottes, Falaises et Côte | 25 | — |
| 13 | Famille Bienvenue | 17 | — |
| 14 | Capitaines Locaux | 17 | — |
| 15 | Depuis 2018 | 11 | — |

### Descriptions (FR)

| # | Description (FR) | Chars |
|---|---|---|
| 1 | Visitez l'iconique Grotte de Benagil en bateau rapide de 1h30 depuis Portimão. €20. | 84 |
| 2 | Petits groupes, départs quotidiens, annulation gratuite 24h avant. Bateaux licenciés. | 86 |
| 3 | Sans frais d'OTA. Réservez en direct sur atlantistours.pt — meilleur prix garanti. | 81 |
| 4 | Grottes, falaises et la magie de Benagil. Tours en FR, EN, PT, ES. | 67 |

---

## Expected KPIs (Phase 1, Benagil campaign)

**Working assumption:** avg booking = 4 pax × €20 = **€80 booking value**. Target keeping CPA ≤ 20% of booking value.

| Metric | Target | Notes |
|---|---|---|
| Avg CPC | €0.40 – €0.80 | Capped by max CPC €0.80 |
| CTR | ≥ 6% | Strong RSA + relevant landing should hold this |
| Conv. rate (click → FH purchase) | ≥ 3% (target 5%) | Core volume product, low price → high conv. rate |
| Cost per booking (CPA) | **€10 – €16** | 12-20% of €80 booking value |
| ROAS (revenue ÷ ad spend) | **≥ 5×** | i.e. €5 booking revenue per €1 ad spend |
| Bookings/month (target) | 60 – 150 | At €30/day budget; tied to actual CTR/conv |

⚠️ **Margin floor:** if CPA exceeds **€20** (25% of booking value) over a 14-day window, pause and tighten — either drop max CPC, kill underperforming keywords, or shrink geo. Don't tolerate >€20 CPA hoping for improvement.

⚠️ **Watch avg booking value in GA4** — if the campaign starts attracting solo travellers (avg drops below €60), the math breaks. Counter by adding "from €80 for 4" or "family of 4 from €80" framing to the RSA.

---

## Maintenance checklist

- **Day 1-3:** check the search-terms report **3x/day**. Add wasted-spend terms to within-campaign negatives or escalate to account negatives.
- **Day 4-14:** daily search-terms review. Look for new long-tail variants to add as exact-match keywords (cheaper CPCs than phrase-match).
- **Week 3+:** if conversion volume ≥ 30 in last 30 days, switch bidding to **Maximize Conversion Value**.
- **Month 2:** consider splitting "From [city]" keywords into their own ad group if volume justifies it (different copy can mention the specific transfer/distance).
