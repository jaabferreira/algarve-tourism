# Product Variant Groups

## Summary

Some FareHarbor products are variants of the same experience (different durations or group sizes). Currently they appear as separate cards on the website. This spec defines a grouping system: one card per experience, with a variant selector in the booking widget on the detail page. All labels and prices come from FareHarbor data — nothing is hardcoded.

## Scope

Only applies to the `algarve-and-you` site. The `atlantis` site is unaffected.

## Product Groups

| Primary PK | Primary Name | Variant PKs |
|---|---|---|
| 717754 | Luxuoso Iate à vela | 718007, 718013 |
| 720028 | Cranchi Yacht Cruise até às Grutas de Benagil | 720080, 720086 |
| 718423 | O Melhor do Oeste no Algarve - Grupos 6+ | 718426 |
| 718429 | Passeio em Sevilha - Grupos 6+ | 718430 |
| 718456 | Passeio em Lisboa - Grupos 6+ | 718457 |
| 718459 | Passeio em Lagos e Sagres - Grupos 6+ | 718460 |
| 718464 | Passeio Silves e Monchique - Grupos 6+ | 718467 |
| 718470 | Passeio ao Sotavento Algarvio - Grupos 6+ | 718472 |
| 718473 | Passeio Algarve Tradicional - Grupos 6+ | 718474 |

## Architecture

### 1. `packages/shared/src/types.ts`

Add `productGroups` field to `BrandConfig.fh`:

```ts
fh: {
  shortname: string;
  categories: string[];
  itemPks?: number[];
  flow: string;
  productGroups?: Array<{ primary: number; variants: number[] }>;
};
```

### 2. `packages/algarve-and-you/src/config.ts`

- Add `productGroups` array with all groups from the table above
- Remove all variant PKs from `itemPks` so they don't appear as standalone cards

Variant PKs to remove from `itemPks`:
`718007, 718013, 720080, 720086, 718426, 718430, 718457, 718460, 718467, 718472, 718474`

### 3. `packages/algarve-and-you/src/data.ts`

Add a `getVariants(primaryPk: number, locale: Locale): NormalizedItem[]` helper:

- Looks up `primaryPk` in `config.fh.productGroups`
- If found, loads all items for the locale and returns the `NormalizedItem` for each variant PK
- Returns `[]` if no group found or `productGroups` is not set

### 4. `packages/shared/src/components/BookingWidget.astro`

Add optional `variants` prop (`NormalizedItem[]`).

**When `variants` is empty or absent (current behaviour):**
Single "Book Now" button linking to `fareharbor.com/embeds/book/{shortname}/items/{itemPk}/?full-items=yes`.

**When `variants` is present:**
Replace single button with a stacked option list. Each row shows:
- Item name (from FH data)
- "from €X" price (from FH data, `price_from_including_tax`)
- "Book" button/link opening FareHarbor lightbox for that specific item PK

The primary item is the first row, followed by variants in the order defined in config.

All FareHarbor links use the existing lightbox pattern:
```
href="https://fareharbor.com/embeds/book/{shortname}/items/{pk}/?full-items=yes"
```

### 5. `packages/algarve-and-you/src/pages/[locale]/tours/[slug].astro`

- Import `getVariants` from `data.ts`
- Call `getVariants(item.pk, locale)` to get variant items
- Pass result as `variants` prop to `BookingWidget`

## Data flow

```
config.productGroups (structure only)
         ↓
getVariants(primaryPk, locale)
         ↓
loads atlantistours.{lang}.json (FH data)
         ↓
returns NormalizedItem[] for variant PKs
         ↓
BookingWidget renders name + price + book link per variant
```

Prices and names update automatically when `fetch-fh` is run and the site is redeployed. No manual maintenance required.

## What does not change

- `atlantis` site — untouched
- `fetch-fh.ts` script — untouched
- FareHarbor data files — untouched
- All other pages and components — untouched
- Static path generation in `[slug].astro` — variant PKs are not in `itemPks` so they have no standalone pages; only primary PKs generate pages
