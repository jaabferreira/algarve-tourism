# Algarve / Generic Boat Tour Campaign — Keywords & RSA

**Campaign goal:** capture broad-intent searches like "Algarve boat tour" / "Portimão boat tour" where the user hasn't decided *which* tour. Land them on the `/tours/` listing so they self-select. Lower conversion rate than Benagil-specific traffic, but the volume is meaningful.

**Why this campaign exists separate from Benagil:** if we tried to bid on "Algarve boat tour" inside the Benagil campaign, we'd pay full Benagil-tier CPCs to send mismatched intent to a single product page. Splitting it lets us bid lower, route to the listing, and let users browse.

**Routing:** all clicks go to the `/tours/` listing page (which on Atlantis shows all 4 boat-tour products). Users self-select between Benagil speedboat (€20), private yachts (€368-473), or fishing (€75).

---

## Campaign settings

| Field | Value |
|---|---|
| Campaign name | `NB — Algarve Generic` |
| Campaign type | Search |
| Bid strategy (Phase 1) | **Manual CPC**, max CPC **€0.50** |
| Bid strategy (Phase 2, after ≥30 conversions) | Maximize Conversion Value, then Target ROAS 400% |
| Daily budget | **€15/day** (€450/mo) |
| Networks | Search only (NO display, NO search partners) |
| Locations | Portugal + UK + Ireland + Germany + Netherlands + France + Spain |
| Location targeting | "People in or regularly in your targeted locations" |
| Location bid adjustment | **+30% in: Portimão, Lagoa, Carvoeiro, Lagos, Albufeira** |
| Languages | English, Portuguese, Spanish, French |
| Devices | Mobile +30%, Tablet -20%, Desktop default |
| Ad rotation | "Optimize: prefer best-performing ads" |
| Ad schedule | All day, all week |

**Why max CPC €0.50** (lower than Benagil's €0.80): generic intent has lower conv rate (~2% target vs 3-5% on Benagil). To stay under our €16 CPA target on a €80 avg booking, max CPC must drop in proportion. Math: €16 CPA × 2% conv = €0.32, plus a buffer for the listing page's slightly weaker conversion — €0.50 is the practical ceiling.

---

## Within-campaign negative keywords

These are **critical** for this campaign because broad-intent queries overlap with our other campaigns. Without these negatives, the generic ad would steal traffic from the higher-converting per-product campaigns.

```
benagil
benagi
"private yacht"
"private boat"
yacht
charter
"sail yacht"
sailing
fishing
"fishing tour"
"deep sea fishing"
"reef fishing"
sunset
"sunset cruise"
"sunset tour"
dolphin
"dolphin watching"
"whale watching"
cranchi
luxury
```

**Why:** if someone searches "benagil boat tour" we want the **Benagil campaign** to win it (better RSA, better landing page = better conv rate). Same for "yacht charter algarve" → Cranchi/Sail campaigns. This campaign only catches the truly-generic remainder.

---

## Ad groups

### Ad group: `ALGARVE — EN`

**Final URL:** `https://atlantistours.pt/en/tours/`
**Display path:** `Algarve` / `Boats`
**Language targeting:** English

**Keywords:**

```
[algarve boat tour]
[algarve boat tours]
[algarve boat trip]
[algarve boat trips]
[algarve boat excursion]
[algarve boat excursions]
[boat tour algarve]
[boat tours algarve]
[boat trip algarve]
[boat trips algarve]
[boat tour portimão]
[boat tours portimão]
[boat trip portimão]
[boat tour portimao]
[boat tours portimao]
[boat tour lagoa]
[boat tour carvoeiro]
[boat tour albufeira]
[boat tour lagos]
[best boat tour algarve]
[best boat tours algarve]
[algarve coast tour]
[algarve coast boat]
[algarve sightseeing boat]
[algarve sea tour]
[algarve sea trip]
"algarve boat tour"
"boat tour algarve"
"boat tour portimão"
"algarve coast boat"
"algarve sightseeing boat"
```

### Ad group: `ALGARVE — PT`

**Final URL:** `https://atlantistours.pt/pt/tours/`
**Display path:** `Algarve` / `Barcos`
**Language targeting:** Portuguese

```
[passeio de barco algarve]
[passeios de barco algarve]
[passeio barco algarve]
[passeios barco algarve]
[passeio de barco portimão]
[passeios de barco portimão]
[passeio barco portimao]
[passeios barco portimao]
[passeio de barco lagoa]
[passeio de barco carvoeiro]
[passeio de barco albufeira]
[passeio de barco lagos]
[passeio costa algarve]
[passeio mar algarve]
[melhor passeio barco algarve]
"passeio barco algarve"
"passeio barco portimão"
"passeio costa algarve"
```

### Ad group: `ALGARVE — ES`

**Final URL:** `https://atlantistours.pt/es/tours/`
**Display path:** `Algarve` / `Barcos`
**Language targeting:** Spanish

```
[paseo en barco algarve]
[paseos en barco algarve]
[paseo barco algarve]
[paseo en barco portimao]
[paseo en barco portimão]
[paseo en barco lagoa]
[paseo en barco lagos]
[paseo en barco albufeira]
[excursion barco algarve]
[excursión barco algarve]
[mejor paseo barco algarve]
[costa algarve barco]
"paseo en barco algarve"
"paseo barco portimão"
"excursion barco algarve"
```

### Ad group: `ALGARVE — FR`

**Final URL:** `https://atlantistours.pt/fr/tours/`
**Display path:** `Algarve` / `Bateaux`
**Language targeting:** French

```
[excursion bateau algarve]
[excursions bateau algarve]
[tour bateau algarve]
[balade bateau algarve]
[excursion bateau portimao]
[excursion bateau portimão]
[excursion bateau lagoa]
[excursion bateau lagos]
[excursion bateau albufeira]
[meilleure excursion bateau algarve]
[côte algarve bateau]
[bateau algarve]
"excursion bateau algarve"
"bateau portimão"
"côte algarve bateau"
```

---

## Responsive Search Ad — EN

### Headlines (15) — each ≤30 chars

| # | Headline | Chars | Pin |
|---|---|---|---|
| 1 | Algarve Boat Tours — Direct | 27 | **Pin to position 1** |
| 2 | From €20 — Daily Departures | 27 | **Pin to position 2** |
| 3 | Boats from Portimão | 19 | **Pin to position 2** |
| 4 | Caves, Cliffs & Coast | 21 | unpinned |
| 5 | Cave Tours, Yachts, Fishing | 27 | unpinned |
| 6 | 4.9★ on TripAdvisor | 19 | unpinned |
| 7 | Free Cancellation 24h | 21 | unpinned |
| 8 | Small Groups, Big Adventure | 27 | unpinned |
| 9 | Licensed & Insured | 18 | unpinned |
| 10 | Daily Departures | 16 | unpinned |
| 11 | Book Direct, Skip OTA Fees | 26 | unpinned |
| 12 | Family-Friendly Tours | 21 | unpinned |
| 13 | Local Captains, Real Stories | 28 | unpinned |
| 14 | Operating Since 2018 | 20 | unpinned |
| 15 | Algarve's Best-Loved Tours | 26 | unpinned |

### Descriptions (4) — each ≤90 chars

| # | Description | Chars |
|---|---|---|
| 1 | Daily boat tours from Portimão — Benagil caves, yacht cruises, fishing. From €20. | 81 |
| 2 | Small groups, free cancellation 24h, licensed boats. Tours in EN, PT, ES, FR. | 76 |
| 3 | Skip the OTA fees. Book direct on atlantistours.pt — best price guaranteed. | 75 |
| 4 | Discover sea caves, cliffs and the Algarve coast. Operating from Portimão since 2018. | 86 |

---

## Responsive Search Ad — PT

### Headlines (PT)

| # | Headline (PT) | Chars | Pin |
|---|---|---|---|
| 1 | Passeios de Barco no Algarve | 28 | **Pin 1** |
| 2 | Desde €20 — Diário | 18 | **Pin 2** |
| 3 | Barcos de Portimão | 18 | **Pin 2** |
| 4 | Grutas, Falésias e Costa | 24 | — |
| 5 | Grutas, Iates, Pesca | 20 | — |
| 6 | 4.9★ no TripAdvisor | 19 | — |
| 7 | Cancelamento Gratuito 24h | 25 | — |
| 8 | Grupos Pequenos | 15 | — |
| 9 | Licenciado e Segurado | 21 | — |
| 10 | Partidas Diárias | 16 | — |
| 11 | Reserva Direta, Sem Taxas | 25 | — |
| 12 | Para Toda a Família | 19 | — |
| 13 | Capitães Locais | 15 | — |
| 14 | A Operar Desde 2018 | 19 | — |
| 15 | Os Melhores Passeios | 20 | — |

### Descriptions (PT)

| # | Description (PT) | Chars |
|---|---|---|
| 1 | Passeios diários de barco em Portimão — Grutas de Benagil, iates, pesca. Desde €20. | 84 |
| 2 | Grupos pequenos, cancelamento grátis 24h, barcos licenciados. PT, EN, ES, FR. | 77 |
| 3 | Sem taxas de OTA. Reserva direta em atlantistours.pt — melhor preço garantido. | 78 |
| 4 | Grutas, falésias e a costa do Algarve. A operar desde Portimão desde 2018. | 73 |

---

## Responsive Search Ad — ES

### Headlines (ES)

| # | Headline (ES) | Chars | Pin |
|---|---|---|---|
| 1 | Paseos en Barco — Algarve | 25 | **Pin 1** |
| 2 | Desde €20 — Diario | 18 | **Pin 2** |
| 3 | Barcos desde Portimão | 21 | **Pin 2** |
| 4 | Cuevas, Acantilados, Costa | 26 | — |
| 5 | Cuevas, Yates, Pesca | 20 | — |
| 6 | 4.9★ en TripAdvisor | 19 | — |
| 7 | Cancelación Gratuita 24h | 24 | — |
| 8 | Grupos Reducidos | 16 | — |
| 9 | Licenciado y Asegurado | 22 | — |
| 10 | Salidas Diarias | 15 | — |
| 11 | Reserva Directa, Sin Tasas | 26 | — |
| 12 | Para Toda la Familia | 20 | — |
| 13 | Capitanes Locales | 17 | — |
| 14 | Operando Desde 2018 | 19 | — |
| 15 | Los Mejores Paseos | 18 | — |

### Descriptions (ES)

| # | Description (ES) | Chars |
|---|---|---|
| 1 | Paseos diarios desde Portimão — Cuevas de Benagil, yates, pesca de fondo. Desde €20. | 85 |
| 2 | Grupos reducidos, cancelación gratis 24h, barcos licenciados. ES, EN, PT, FR. | 77 |
| 3 | Sin tasas de OTA. Reserva directa en atlantistours.pt — mejor precio garantizado. | 80 |
| 4 | Cuevas, acantilados y la costa del Algarve. Operando desde Portimão desde 2018. | 79 |

---

## Responsive Search Ad — FR

### Headlines (FR)

| # | Headline (FR) | Chars | Pin |
|---|---|---|---|
| 1 | Excursions Bateau — Algarve | 27 | **Pin 1** |
| 2 | Dès €20 — Quotidien | 19 | **Pin 2** |
| 3 | Bateaux depuis Portimão | 23 | **Pin 2** |
| 4 | Grottes, Falaises, Côte | 23 | — |
| 5 | Grottes, Yachts, Pêche | 22 | — |
| 6 | 4.9★ sur TripAdvisor | 20 | — |
| 7 | Annulation Gratuite 24h | 23 | — |
| 8 | Petits Groupes | 14 | — |
| 9 | Licenciés et Assurés | 20 | — |
| 10 | Départs Quotidiens | 18 | — |
| 11 | Réservez en Direct, Sans Frais | 30 | — |
| 12 | Famille Bienvenue | 17 | — |
| 13 | Capitaines Locaux | 17 | — |
| 14 | Depuis 2018 | 11 | — |
| 15 | Les Meilleures Excursions | 25 | — |

### Descriptions (FR)

| # | Description (FR) | Chars |
|---|---|---|
| 1 | Excursions quotidiennes depuis Portimão — Grottes Benagil, yachts, pêche. Dès €20. | 83 |
| 2 | Petits groupes, annulation gratuite 24h, bateaux licenciés. FR, EN, PT, ES. | 75 |
| 3 | Sans frais d'OTA. Réservez en direct sur atlantistours.pt — meilleur prix garanti. | 81 |
| 4 | Grottes, falaises et la côte de l'Algarve. Opérant depuis Portimão depuis 2018. | 78 |

---

## Expected KPIs (Phase 1, Algarve generic)

**Working assumption:** avg booking = €80 (mostly Benagil self-selection, with occasional yacht uplift).

| Metric | Target | Notes |
|---|---|---|
| Avg CPC | €0.30 – €0.50 | Capped by max CPC €0.50 |
| CTR | ≥ 4% | Listing-page click-through is lower than product-page; rely on bold ad copy |
| Conv. rate (click → FH purchase) | ≥ 1.5% | Listing page adds a step → lower conv than direct product |
| Cost per booking (CPA) | **€15 – €25** | Higher than Benagil because of the extra browse step |
| ROAS | ≥ 3× | Lower than Benagil; this campaign is volume-fill, not margin |
| Bookings/month (target) | 20 – 50 | At €15/day budget |

⚠️ **Hard floor:** if CPA exceeds **€30** over a 14-day window, pause the campaign. The math doesn't work above that on €80 avg booking.

⚠️ **Watch for benagil cannibalization:** if the search-terms report shows queries containing "benagil" landing here despite the negatives, the Benagil campaign isn't outranking us — diagnose Quality Score in the Benagil campaign first before adjusting bids here.

---

## Maintenance checklist

- **Day 1-7:** daily search-terms review. This campaign will pull in the most variety of queries — expect to add 5-10 new negatives per week initially.
- **Week 2:** check share of queries that include city names (Lagoa, Carvoeiro, etc.) — if a city is driving 20%+ of clicks, consider promoting it to its own ad group with custom copy.
- **Month 2:** if conversion volume ≥ 30 in last 30 days, switch bidding to Maximize Conversion Value with Target ROAS 300% as starting point.
