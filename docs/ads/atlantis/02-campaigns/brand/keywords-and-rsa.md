# Brand Campaign — Keywords & RSA

**Campaign goal:** capture 90%+ impression share on people already searching for "Atlantis Tours". These users are downstream of OTA listings, social posts, word-of-mouth — they know the brand. We pay a tiny CPC to convert them direct instead of letting them click an OTA listing (Google organic) and pay 20-30% commission.

**Why this campaign exists at all** (your CEO will ask): we don't *need* to bid on our own brand to rank #1 organically — but if we don't, OTAs (GetYourGuide, Viator, TripAdvisor) **will** bid on it and steal the click for €0.20–0.50. Bidding ourselves is cheap insurance.

---

## Campaign settings

| Field | Value |
|---|---|
| Campaign name | `BRAND — Atlantis Tours` |
| Campaign type | Search |
| Bid strategy (Phase 1) | **Manual CPC**, max CPC €0.50 |
| Bid strategy (Phase 2, after conversion data) | Maximize Conversion Value, then Target ROAS |
| Daily budget | **€5/day** (€150/mo) — brand traffic is small but high-converting |
| Networks | Search only (NO display, NO search partners) |
| Locations | Portugal + UK + Ireland + Germany + Netherlands + France + Spain |
| Location targeting | "People in or regularly in your targeted locations" (NOT "interested in") |
| Languages | English, Portuguese, Spanish, French |
| Devices | Mobile +20% bid adjustment, Tablet -20%, Desktop default |
| Ad rotation | "Optimize: prefer best-performing ads" |
| Ad schedule | All day, all week |
| Final URL suffix | leave blank |
| Tracking template | leave blank |

**Why no Search Partners:** brand intent only exists on Google itself. Search partner sites (smaller search engines syndicating Google ads) often serve junk traffic on brand queries.

**Why "in or regularly in":** "Interested in" includes anyone *researching* those countries, which dilutes your brand signal and inflates costs.

---

## Ad groups

Brand campaign uses **one ad group per language** so we can serve the locale-correct landing page.

### Ad group: `BRAND — EN`

**Final URL:** `https://atlantistours.pt/en/`
**Display path:** `Portimão` / `Direct`
**Language targeting (within ad group):** English

**Keywords (all exact match unless noted):**

```
[atlantis tours]
[atlantis tours portimão]
[atlantis tours portimao]
[atlantis tours algarve]
[atlantis tours portugal]
[atlantis boat tours]
[atlantis boat tours portimão]
[atlantis boat tours algarve]
[atlantis tours benagil]
[atlantis cave tours]
[atlantistours]
[atlantistours.pt]
"atlantis tours"
"atlantis boat tours"
[atlantic tours portimão]
[atlantis tour portimão]
```

> The two phrase-match terms catch long-tail variants like "atlantis tours review" or "atlantis tours reviews 2026". The two typos at the bottom catch "Atlantic" misspellings and the singular "tour".

### Ad group: `BRAND — PT`

**Final URL:** `https://atlantistours.pt/pt/`
**Display path:** `Portimão` / `Direto`
**Language targeting:** Portuguese

```
[atlantis tours portimao]
[atlantis tours portimão]
[atlantis tours algarve]
[atlantis passeios]
[atlantis passeios barco]
[passeios atlantis]
[atlantis grutas]
[atlantis grutas benagil]
[atlantistours]
"atlantis passeios"
"atlantis grutas"
```

### Ad group: `BRAND — ES`

**Final URL:** `https://atlantistours.pt/es/`
**Display path:** `Portimão` / `Directo`
**Language targeting:** Spanish

```
[atlantis tours portimao]
[atlantis tours algarve]
[atlantis paseos en barco]
[atlantis cuevas benagil]
[atlantis grutas benagil]
[atlantistours]
"atlantis paseos"
```

### Ad group: `BRAND — FR`

**Final URL:** `https://atlantistours.pt/fr/`
**Display path:** `Portimão` / `Direct`
**Language targeting:** French

```
[atlantis tours portimao]
[atlantis tours algarve]
[atlantis bateau]
[atlantis bateau portimao]
[atlantis grottes benagil]
[atlantistours]
"atlantis bateau"
```

---

## Responsive Search Ad (RSA) — same copy across all 4 ad groups

> Google's RSA format requires 3-15 headlines and 2-4 descriptions. Google mixes & matches them in real-time per query. **Pinning** locks specific assets to specific positions so brand recognition is consistent.

### Headlines (15) — each ≤30 chars

| # | Headline | Chars | Pin |
|---|---|---|---|
| 1 | Atlantis Tours — Official | 26 | **Pin to position 1** |
| 2 | Book Direct, Skip OTA Fees | 26 | **Pin to position 2** |
| 3 | Atlantis Tours Portimão | 24 | **Pin to position 2** |
| 4 | Algarve Boat Tours | 18 | unpinned |
| 5 | Benagil Caves & More | 21 | unpinned |
| 6 | 4.9★ on TripAdvisor | 19 | unpinned |
| 7 | Free Cancellation 24h | 21 | unpinned |
| 8 | Daily Departures Portimão | 25 | unpinned |
| 9 | Licensed & Insured | 18 | unpinned |
| 10 | Operating Since 2018 | 20 | unpinned |
| 11 | Cave Tours from €20 | 19 | unpinned |
| 12 | Private Yacht Charters | 22 | unpinned |
| 13 | Small-Group Experience | 22 | unpinned |
| 14 | Talk to Real Captains | 21 | unpinned |
| 15 | Best Price Guaranteed | 21 | unpinned |

> **Why pinning #1 and #2/3:** prevents Google from leading with "Free Cancellation 24h" and burying the brand name. With brand keywords, the user already knows you — confirming "yes, this IS the official Atlantis Tours site" is the #1 conversion signal.

### Descriptions (4) — each ≤90 chars

| # | Description | Chars |
|---|---|---|
| 1 | Book directly with Atlantis Tours and skip the OTA fees. Daily Algarve boat tours. | 82 |
| 2 | Cave tours, yacht cruises and reef fishing — operating from Portimão since 2018. | 80 |
| 3 | Free cancellation 24h before. Licensed boats, small groups, captains who know the coast. | 88 |
| 4 | Talk to our team in EN, PT, ES, FR. Best price at atlantistours.pt. | 67 |

---

## PT translations of the RSA copy

Use these in the `BRAND — PT` ad group (other locales reuse the EN copy unless we get translations later).

### Headlines (PT)

| # | Headline (PT) | Chars | Pin |
|---|---|---|---|
| 1 | Atlantis Tours — Oficial | 25 | **Pin 1** |
| 2 | Reserva Direta, Sem Taxas | 25 | **Pin 2** |
| 3 | Atlantis Tours Portimão | 24 | **Pin 2** |
| 4 | Passeios de Barco no Algarve | 28 | — |
| 5 | Grutas de Benagil e Mais | 24 | — |
| 6 | 4.9★ no TripAdvisor | 19 | — |
| 7 | Cancelamento Gratuito 24h | 25 | — |
| 8 | Partidas Diárias de Portimão | 28 | — |
| 9 | Licenciado e Segurado | 21 | — |
| 10 | A Operar Desde 2018 | 20 | — |
| 11 | Grutas Desde €20 | 17 | — |
| 12 | Iates Privados | 14 | — |
| 13 | Grupos Pequenos | 15 | — |
| 14 | Fala com os Capitães | 21 | — |
| 15 | Melhor Preço Garantido | 22 | — |

### Descriptions (PT)

| # | Description (PT) | Chars |
|---|---|---|
| 1 | Reserva direto na Atlantis Tours e evita as taxas das OTAs. Passeios diários no Algarve. | 87 |
| 2 | Grutas, iates e pesca — a operar desde Portimão desde 2018. | 60 |
| 3 | Cancelamento gratuito até 24h antes. Barcos licenciados e grupos pequenos. | 75 |
| 4 | Equipa que fala PT, EN, ES, FR. Melhor preço em atlantistours.pt. | 65 |

---

## ES translations of the RSA copy

Use these in the `BRAND — ES` ad group.

### Headlines (ES)

| # | Headline (ES) | Chars | Pin |
|---|---|---|---|
| 1 | Atlantis Tours — Oficial | 25 | **Pin 1** |
| 2 | Reserva Directa, Sin Comisiones | 31 → trim to "Reserva Directa, Sin Tasas" (26) | **Pin 2** |
| 3 | Atlantis Tours Portimão | 24 | **Pin 2** |
| 4 | Paseos en Barco en el Algarve | 29 | — |
| 5 | Cuevas de Benagil y Más | 23 | — |
| 6 | 4.9★ en TripAdvisor | 19 | — |
| 7 | Cancelación Gratuita 24h | 24 | — |
| 8 | Salidas Diarias desde Portimão | 30 | — |
| 9 | Licenciados y Asegurados | 24 | — |
| 10 | Operando Desde 2018 | 19 | — |
| 11 | Cuevas Desde €20 | 16 | — |
| 12 | Yates Privados | 14 | — |
| 13 | Grupos Reducidos | 16 | — |
| 14 | Habla con los Capitanes | 23 | — |
| 15 | Mejor Precio Garantizado | 24 | — |

> Headline #2 final form: **"Reserva Directa, Sin Tasas"** (26 chars). The longer "Sin Comisiones" version exceeds 30; use the short one.

### Descriptions (ES)

| # | Description (ES) | Chars |
|---|---|---|
| 1 | Reserva directo en Atlantis Tours y evita las tasas de las OTAs. Paseos diarios. | 80 |
| 2 | Cuevas, yates y pesca de fondo — operando desde Portimão desde 2018. | 67 |
| 3 | Cancelación gratuita hasta 24h antes. Barcos licenciados, grupos reducidos. | 75 |
| 4 | Equipo que habla ES, EN, PT, FR. Mejor precio en atlantistours.pt. | 65 |

---

## FR translations of the RSA copy

Use these in the `BRAND — FR` ad group.

### Headlines (FR)

| # | Headline (FR) | Chars | Pin |
|---|---|---|---|
| 1 | Atlantis Tours — Officiel | 25 | **Pin 1** |
| 2 | Réservez en Direct, Sans Frais | 30 | **Pin 2** |
| 3 | Atlantis Tours Portimão | 24 | **Pin 2** |
| 4 | Excursions en Bateau Algarve | 28 | — |
| 5 | Grottes de Benagil et Plus | 26 | — |
| 6 | 4.9★ sur TripAdvisor | 20 | — |
| 7 | Annulation Gratuite 24h | 23 | — |
| 8 | Départs Quotidiens Portimão | 27 | — |
| 9 | Licenciés et Assurés | 20 | — |
| 10 | Depuis 2018 | 11 | — |
| 11 | Grottes Dès €20 | 15 | — |
| 12 | Yachts Privés | 13 | — |
| 13 | Petits Groupes | 14 | — |
| 14 | Parlez aux Capitaines | 21 | — |
| 15 | Meilleur Prix Garanti | 21 | — |

### Descriptions (FR)

| # | Description (FR) | Chars |
|---|---|---|
| 1 | Réservez directement chez Atlantis Tours et évitez les frais des OTA. Tours quotidiens. | 87 |
| 2 | Grottes, yachts et pêche en mer — opérant depuis Portimão depuis 2018. | 70 |
| 3 | Annulation gratuite jusqu'à 24h avant. Bateaux licenciés, petits groupes. | 73 |
| 4 | Équipe qui parle FR, EN, PT, ES. Meilleur prix sur atlantistours.pt. | 67 |

---

## Asset extensions (apply at campaign level)

Sitelinks, callouts, structured snippets, call extension, and location extension are **shared across the entire account** — those will be defined in `docs/ads/atlantis/04-extensions/`. The brand campaign uses all of them.

The one extension worth calling out here:

- **Call extension** — `+351 969 703 185`. On mobile, this turns into a tap-to-call button next to the ad. Show only during business hours (set in extension settings).

---

## Expected KPIs (Phase 1, brand campaign only)

| Metric | Target | Notes |
|---|---|---|
| Impression share (exact brand) | ≥ 90% | If lower, raise max CPC |
| Avg CPC | €0.10 – €0.30 | Brand QS = 9–10/10 keeps it cheap |
| CTR | ≥ 12% | Brand search CTRs are high because intent matches |
| Conv. rate (click → FH purchase) | ≥ 4% | Cold paid traffic on non-brand will be much lower |
| Cost per booking | €2 – €8 | These are mostly recovered OTA-bound clicks |
| Monthly spend | €100 – €150 | Cap via €5/day budget |

⚠️ **Don't judge brand campaign on ROAS** — its job is to defend, not to drive incremental volume. If you "turn off the brand campaign and revenue stays the same", that's a sign organic is doing the heavy lifting and you can shrink the brand budget. We'll test this in Phase 2 with a brand-pause holdout.

---

## Maintenance checklist

- **Week 1:** check search-terms report daily for any non-brand queries triggering brand keywords (e.g. "atlantis the lost city" slipping past negatives). Add to the account negatives list (`01-keywords/negatives-account.md`).
- **Week 2-4:** check impression share. If <80%, raise max CPC by €0.10 increments.
- **Month 2:** if conversion data is solid, switch bidding to Maximize Conversion Value with the €5/day cap.
- **Month 3:** start collecting baseline for the brand-pause holdout test (Phase 2).

