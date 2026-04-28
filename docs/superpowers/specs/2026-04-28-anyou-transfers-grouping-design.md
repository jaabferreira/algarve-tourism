---
date: 2026-04-28
project: algarve-and-you
status: approved
---

# Algarve & You — Transfers grouping by airport

## Problem

The transfers category currently renders all 16 priced transfer products in a single flat grid at `/tours/transfers/`. The grid is cluttered: 8 destinations × 2 airports × multiple direction variants make it hard to find the right product. There's also a separate orphan stub at `/transfers/` that nothing links to.

## Goals

- Group transfers visually by departure/arrival airport (Faro, Lisbon).
- Surface the existing product-variant pattern (same as the yacht booking widget) so each destination shows its one-way and/or round-trip options on a single page.
- Keep all curated FH PKs (16) reachable; do not add new products.

## Active product inventory

13 priced FH products are visible across 24 records (the other 11 are zero-priced duplicates). The 16 curated PKs in `algarve-and-you/src/config.ts` `itemPks` map onto:

| Destination | Outbound (Airport→Dest) | Reverse (Dest→Airport) | Round-trip |
|---|---|---|---|
| Faro / Albufeira | 718075 | 720350 | — |
| Faro / Portimão-Carvoeiro | 718083 | — | 720354 |
| Faro / Armação de Pêra | 718087 | 720356 | — |
| Faro / Vilamoura-Almancil | 718096 | 720357 | — |
| Lisbon / Albufeira | 718103 | 720358 | — |
| Lisbon / Portimão-Carvoeiro | 718109 | — | 720361 |
| Lisbon / Armação de Pêra | 718112 | 720362 | — |
| Lisbon / Vilamoura-Almancil | 718115 | 720365 | — |

Each destination has exactly two variants. PC's variant is round-trip; the other three destinations' variant is the reverse one-way.

## Architecture

### Routes

| URL | What it shows |
|---|---|
| `/tours/transfers/` | New chooser — two airport cards (Faro, Lisbon) |
| `/tours/transfers/faro/` | Airport page — 4 destination cards |
| `/tours/transfers/lisbon/` | Airport page — 4 destination cards |
| `/tours/<existing-slug>/` | Existing tour-detail page (unchanged template), now wired with variants via `productGroups` |
| `/transfers/` (orphan) | 301 → `/tours/transfers/` |

A static `/tours/transfers/index.astro` overrides the dynamic `[category]/index.astro` for the `transfers` category only. Other categories keep their flat grid.

### Variant wiring

The outbound product (Airport→Destination) is the primary; the reverse one-way or round-trip is the variant. Add 8 entries to `productGroups` in `packages/algarve-and-you/src/config.ts`:

```ts
{ primary: 718075, variants: [720350] },   // Faro / Albufeira
{ primary: 718083, variants: [720354] },   // Faro / PC
{ primary: 718087, variants: [720356] },   // Faro / Armação
{ primary: 718096, variants: [720357] },   // Faro / Vilamoura
{ primary: 718103, variants: [720358] },   // Lisbon / Albufeira
{ primary: 718109, variants: [720361] },   // Lisbon / PC
{ primary: 718112, variants: [720362] },   // Lisbon / Armação
{ primary: 718115, variants: [720365] },   // Lisbon / Vilamoura
```

The destination detail page is the existing `/tours/[slug]/` for the primary PK. The shared `BookingWidget` already supports primary + variants — same pattern as the yacht.

### Variant labels

The shared `BookingWidget` renders `option.name`, but the raw FH names are too long ("Private Transfers - Faro Airport - Albufeira"). The page transforms transfer items before passing to the widget:

- Outbound: "One way · Faro Airport → Albufeira"
- Reverse one-way: "One way · Albufeira → Faro Airport"
- Round-trip: "Round trip · Faro Airport ⇆ Portimão/Carvoeiro"

Implementation: a small `transferVariants.ts` helper in the AnY package maps PK → `{ kind, airport, destination }`. The `[slug].astro` page calls a `transferLabel(pk, locale)` helper to produce the localized string and clones items with overridden `name` only when the item is a transfer. No change to `BookingWidget`; yacht behaviour untouched.

### i18n

Five new shared translation keys (en/pt/es/fr):

- `transfer.oneway` — "One way"
- `transfer.roundtrip` — "Round trip"
- `transfer.airport.faro` — "Faro Airport" (and localized equivalents)
- `transfer.airport.lisbon` — "Lisbon Airport"
- `transfers.choose_airport_title` — chooser page title
- `transfers.choose_airport_blurb` — chooser blurb
- `transfers.faro_blurb` — Faro card blurb
- `transfers.lisbon_blurb` — Lisbon card blurb
- `transfers.from_airport_title` — "Transfers from {airport}" (interpolated client-side)
- `transfers.choose_destination` — airport-page subhead

Place names (Albufeira, Portimão/Carvoeiro, Armação de Pêra, Vilamoura/Almancil) stay as proper nouns, untranslated.

### Redirects

Add to `packages/algarve-and-you/public/_redirects`:

```
/en/transfers/  /en/tours/transfers/  301
/pt/transfers/  /pt/tours/transfers/  301
/es/transfers/  /es/tours/transfers/  301
/fr/transfers/  /fr/tours/transfers/  301
```

Delete `packages/algarve-and-you/src/pages/[locale]/transfers.astro`.

## Out of scope

- Adding the 8 missing FH products (round-trips for non-PC destinations, reverse one-ways for PC). The user has chosen to live with the asymmetric two-variant model.
- Atlantis package — transfers are not a category there.
- Faro asymmetric pricing (€116 outbound vs €69.60 inbound for Albufeira). Treated as data, not a UI concern.

## Verification

- `pnpm build` succeeds in `packages/algarve-and-you/`.
- New routes are emitted under `dist/{en,pt,es,fr}/tours/transfers/{,faro,lisbon}/index.html`.
- Existing tour-detail pages for transfer slugs render with two booking options instead of one.
- `/transfers/` redirects to `/tours/transfers/` in browser.
