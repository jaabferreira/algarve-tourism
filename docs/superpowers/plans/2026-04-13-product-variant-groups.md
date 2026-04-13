# Product Variant Groups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show one product card per experience, with a variant selector in the booking widget that lets users choose duration or group size — all labels and prices sourced from FareHarbor data.

**Architecture:** Add `productGroups` to `BrandConfig.fh` (structure only), expose a `findVariantItems` pure helper in `data.ts`, and update `BookingWidget.astro` to render a stacked option list when variants are present. The detail page calls `getVariants(item.pk, locale)` and passes results to the widget. Variant PKs are removed from `itemPks` so they have no standalone cards or pages.

**Tech Stack:** Astro 5, TypeScript, Vitest, FareHarbor JSON data files

**Spec:** `docs/superpowers/specs/2026-04-13-product-variant-groups-design.md`

---

### Task 1: Add `productGroups` type + `product.choose_option` i18n key

**Files:**
- Modify: `packages/shared/src/types.ts`
- Modify: `packages/shared/src/i18n/types.ts`
- Modify: `packages/shared/src/i18n/locales/en.json`
- Modify: `packages/shared/src/i18n/locales/pt.json`
- Modify: `packages/shared/src/i18n/locales/es.json`
- Modify: `packages/shared/src/i18n/locales/fr.json`

- [ ] **Step 1: Add `productGroups` to `BrandConfig.fh` in `types.ts`**

In `packages/shared/src/types.ts`, update the `fh` block inside `BrandConfig`:

```ts
fh: {
  shortname: string;
  categories: string[];
  itemPks?: number[];
  flow: string;
  productGroups?: Array<{ primary: number; variants: number[] }>;
};
```

- [ ] **Step 2: Add `product.choose_option` to `TranslationStrings` in `i18n/types.ts`**

In `packages/shared/src/i18n/types.ts`, add after `"product.location": string;`:

```ts
"product.choose_option": string;
```

- [ ] **Step 3: Add `product.choose_option` to all four locale JSON files**

`packages/shared/src/i18n/locales/en.json` — add after `"product.location"`:
```json
"product.choose_option": "Choose your option",
```

`packages/shared/src/i18n/locales/pt.json` — add after `"product.location"`:
```json
"product.choose_option": "Escolha a sua opção",
```

`packages/shared/src/i18n/locales/es.json` — add after `"product.location"`:
```json
"product.choose_option": "Elija su opción",
```

`packages/shared/src/i18n/locales/fr.json` — add after `"product.location"`:
```json
"product.choose_option": "Choisissez votre option",
```

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/types.ts packages/shared/src/i18n/
git commit -m "feat: add productGroups type and product.choose_option i18n key"
```

---

### Task 2: Add `findVariantItems` + `getVariants` helpers with tests

**Files:**
- Modify: `packages/algarve-and-you/src/data.ts`
- Create: `packages/algarve-and-you/src/data.test.ts`
- Modify: `vitest.config.ts`

- [ ] **Step 1: Expand vitest config to include algarve-and-you tests**

In `vitest.config.ts`, change the `include` pattern:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/*/src/**/*.test.ts"],
  },
});
```

- [ ] **Step 2: Write the failing test**

Create `packages/algarve-and-you/src/data.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { findVariantItems } from "./data.js";
import type { NormalizedItem } from "@algarve-tourism/shared";

const makeItem = (pk: number, name: string): NormalizedItem => ({
  pk,
  name,
  headline: "",
  slug: name.toLowerCase().replace(/\s/g, "-"),
  description_html: "",
  description_text: "",
  description_bullets: [],
  image_url: "",
  images: [],
  location: null,
  price_from: 1000,
  price_from_including_tax: 1000,
  customer_types: [],
  cancellation_policy_html: "",
  category: "boats",
});

const groups = [
  { primary: 100, variants: [101, 102] },
  { primary: 200, variants: [201] },
];

const items = [
  makeItem(100, "Yacht Tour"),
  makeItem(101, "Yacht Tour Half Day"),
  makeItem(102, "Yacht Tour Full Day"),
  makeItem(200, "Cave Tour"),
  makeItem(201, "Cave Tour Small Group"),
];

describe("findVariantItems()", () => {
  it("returns variant NormalizedItems for a known primary PK", () => {
    const result = findVariantItems(100, groups, items);
    expect(result).toHaveLength(2);
    expect(result[0].pk).toBe(101);
    expect(result[1].pk).toBe(102);
  });

  it("returns empty array when primary PK has no group", () => {
    const result = findVariantItems(999, groups, items);
    expect(result).toHaveLength(0);
  });

  it("returns empty array when groups is undefined", () => {
    const result = findVariantItems(100, undefined, items);
    expect(result).toHaveLength(0);
  });

  it("skips variant PKs not found in items", () => {
    const groupsWithMissing = [{ primary: 100, variants: [101, 999] }];
    const result = findVariantItems(100, groupsWithMissing, items);
    expect(result).toHaveLength(1);
    expect(result[0].pk).toBe(101);
  });

  it("preserves variant order from groups config", () => {
    const reversed = [{ primary: 100, variants: [102, 101] }];
    const result = findVariantItems(100, reversed, items);
    expect(result[0].pk).toBe(102);
    expect(result[1].pk).toBe(101);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
cd /home/jferreira/Work/projects/algarve-and-you-new
pnpm vitest run packages/algarve-and-you/src/data.test.ts
```

Expected: error — `findVariantItems` is not exported from `./data.js`

- [ ] **Step 4: Add `findVariantItems` and `getVariants` to `data.ts`**

In `packages/algarve-and-you/src/data.ts`, add imports and two new exports:

```ts
import type { NormalizedItem, Locale } from "@algarve-tourism/shared";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "./config.js";

// Map site locales to FareHarbor languages. Unsupported locales fall back to EN.
const FH_LOCALE_MAP: Record<string, string> = {
  en: "en",
  pt: "pt",
};

function findDataFile(locale: Locale): string | null {
  const fhLang = FH_LOCALE_MAP[locale] ?? "en";
  const filename = `atlantistours.${fhLang}.json`;
  const fallback = "atlantistours.en.json";
  const legacyFallback = "atlantistours.json";

  const bases = [
    resolve(process.cwd(), "../shared/data"),
    resolve(process.cwd(), "packages/shared/data"),
  ];

  for (const name of [filename, fallback, legacyFallback]) {
    for (const base of bases) {
      const p = resolve(base, name);
      if (existsSync(p)) return p;
    }
  }
  return null;
}

export function loadItems(locale: Locale = "en"): NormalizedItem[] {
  try {
    const dataPath = findDataFile(locale);
    if (!dataPath) return [];
    const raw = readFileSync(dataPath, "utf-8");
    let items = JSON.parse(raw) as NormalizedItem[];
    if (config.fh.itemPks?.length) {
      const allowed = new Set(config.fh.itemPks);
      items = items.filter((item) => allowed.has(item.pk));
    }
    return items;
  } catch {
    return [];
  }
}

/**
 * Pure helper — looks up variant NormalizedItems for a primary PK.
 * Exported separately so it can be unit-tested without file system access.
 */
export function findVariantItems(
  primaryPk: number,
  groups: Array<{ primary: number; variants: number[] }> | undefined,
  items: NormalizedItem[],
): NormalizedItem[] {
  if (!groups) return [];
  const group = groups.find((g) => g.primary === primaryPk);
  if (!group) return [];
  return group.variants
    .map((pk) => items.find((item) => item.pk === pk))
    .filter((item): item is NormalizedItem => item !== undefined);
}

/**
 * Returns variant NormalizedItems for a primary PK, using live FH data.
 * Returns [] if the item is not part of any group.
 */
export function getVariants(primaryPk: number, locale: Locale = "en"): NormalizedItem[] {
  // Load all items (unfiltered by itemPks) so variant PKs are always reachable
  const dataPath = findDataFile(locale);
  if (!dataPath) return [];
  try {
    const raw = readFileSync(dataPath, "utf-8");
    const allItems = JSON.parse(raw) as NormalizedItem[];
    return findVariantItems(primaryPk, config.fh.productGroups, allItems);
  } catch {
    return [];
  }
}
```

Note: `getVariants` reads from the raw data file (bypassing `itemPks` filter) so variant PKs, which are not in `itemPks`, are still accessible.

- [ ] **Step 5: Run tests to verify they pass**

```bash
pnpm vitest run packages/algarve-and-you/src/data.test.ts
```

Expected: all 5 tests pass.

- [ ] **Step 6: Commit**

```bash
git add packages/algarve-and-you/src/data.ts packages/algarve-and-you/src/data.test.ts vitest.config.ts
git commit -m "feat: add findVariantItems and getVariants helpers with tests"
```

---

### Task 3: Update config with product groups and remove variant PKs

**Files:**
- Modify: `packages/algarve-and-you/src/config.ts`

- [ ] **Step 1: Add `productGroups` and remove variant PKs from `itemPks`**

Replace the full `config.ts` content with:

```ts
import type { BrandConfig } from "@algarve-tourism/shared";

export const config: BrandConfig = {
  brand: "algarve-and-you",
  name: "Algarve & You",
  domain: "algarveandyou.com",
  tagline: "Your Algarve Experience",
  fh: {
    shortname: "atlantistours",
    categories: ["boats", "gastronomy", "land-tours", "transfers", "spa"],
    flow: "1602637",
    itemPks: [
      717720, 717754,
      720028,
      718024,
      718031, 718047, 718048, 718071, 718072,
      718075, 718080, 718083, 718085, 718087, 718093,
      718096, 718101, 718103, 718107, 718109, 718110,
      718112, 718113, 718115, 718116,
      718423, 718429, 718456,
      718459, 718464, 718470,
      718473, 718494, 718481, 718509, 718514,
    ],
    productGroups: [
      { primary: 717754, variants: [718007, 718013] },
      { primary: 720028, variants: [720080, 720086] },
      { primary: 718423, variants: [718426] },
      { primary: 718429, variants: [718430] },
      { primary: 718456, variants: [718457] },
      { primary: 718459, variants: [718460] },
      { primary: 718464, variants: [718467] },
      { primary: 718470, variants: [718472] },
      { primary: 718473, variants: [718474] },
    ],
  },
  logo: "/logo-ay.png",
  social: {
    instagram: "https://www.instagram.com/algarveandyou/",
    facebook: "https://www.facebook.com/algarveandyou/",
    whatsapp: "+351964332489",
  },
  analytics: {
    gtag: "G-GZJJYPE72L",
  },
  defaultLocale: "en",
  locales: ["en", "pt", "es", "fr"],
};
```

Variant PKs removed from `itemPks`: `718007, 718013, 720080, 720086, 718426, 718430, 718457, 718460, 718467, 718472, 718474`

- [ ] **Step 2: Commit**

```bash
git add packages/algarve-and-you/src/config.ts
git commit -m "feat: add productGroups to config and remove variant PKs from itemPks"
```

---

### Task 4: Update BookingWidget to render variant selector

**Files:**
- Modify: `packages/shared/src/components/BookingWidget.astro`

- [ ] **Step 1: Replace `BookingWidget.astro` with variant-aware version**

Full replacement of `packages/shared/src/components/BookingWidget.astro`:

```astro
---
import type { Locale, NormalizedItem } from "../types.js";
import { t } from "../i18n/index.js";
import { formatPrice } from "../lib/prices.js";

interface Props {
  item: NormalizedItem;
  companyShortname: string;
  locale: Locale;
  variants?: NormalizedItem[];
}

const { item, companyShortname, locale, variants = [] } = Astro.props;

const fhUrl = (pk: number) =>
  `https://fareharbor.com/embeds/book/${companyShortname}/items/${pk}/?full-items=yes`;

const allOptions = variants.length > 0 ? [item, ...variants] : [];
---

<div class="booking-widget">
  {allOptions.length > 0 ? (
    <div class="booking-widget__options">
      <p class="booking-widget__label">{t(locale, "product.choose_option")}</p>
      {allOptions.map((option) => (
        <div class="booking-widget__option">
          <div class="booking-widget__option-info">
            <span class="booking-widget__option-name">{option.name}</span>
            <span class="booking-widget__option-price">
              {t(locale, "product.from")} {formatPrice(option.price_from_including_tax)}
            </span>
          </div>
          <a href={fhUrl(option.pk)} class="booking-widget__option-btn">
            {t(locale, "product.book_now")}
          </a>
        </div>
      ))}
    </div>
  ) : (
    <a href={fhUrl(item.pk)} class="btn btn-primary booking-widget__btn">
      {t(locale, "product.book_now")}
    </a>
  )}
</div>

<style>
  .booking-widget {
    position: sticky;
    top: calc(var(--header-height) + var(--space-6));
    padding: var(--space-6);
    background: var(--color-surface);
    border-radius: var(--radius-card);
    border: 1px solid var(--color-border);
  }

  /* Single-option: full-width book button */
  .booking-widget__btn {
    display: block;
    width: 100%;
    padding: var(--space-4) var(--space-8);
    font-size: var(--text-base);
    font-family: var(--font-body);
    background: var(--color-primary);
    border-radius: var(--radius-button);
    text-align: center;
    text-decoration: none;
  }

  /* Variant selector */
  .booking-widget__label {
    font-size: 11px;
    font-weight: var(--weight-medium);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin-bottom: var(--space-3);
  }

  .booking-widget__options {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .booking-widget__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-4) 0;
    border-bottom: 1px solid var(--color-border);
  }

  .booking-widget__option:last-child {
    border-bottom: none;
  }

  .booking-widget__option-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  .booking-widget__option-name {
    font-size: 14px;
    font-weight: var(--weight-medium);
    color: var(--color-text);
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .booking-widget__option-price {
    font-size: 13px;
    font-style: italic;
    color: var(--color-text-muted);
    font-family: var(--font-display);
  }

  .booking-widget__option-btn {
    flex-shrink: 0;
    padding: var(--space-2) var(--space-4);
    background: var(--color-primary);
    color: #fff;
    font-size: 11px;
    font-weight: var(--weight-semibold);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    border-radius: var(--radius-button);
    text-decoration: none;
    white-space: nowrap;
    transition: background var(--transition-fast);
  }

  .booking-widget__option-btn:hover {
    background: var(--color-primary-dark);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/shared/src/components/BookingWidget.astro
git commit -m "feat: update BookingWidget to render variant option selector"
```

---

### Task 5: Wire variants into the tour detail page

**Files:**
- Modify: `packages/algarve-and-you/src/pages/[locale]/tours/[slug].astro`

- [ ] **Step 1: Add `getVariants` import and pass to BookingWidget**

In `packages/algarve-and-you/src/pages/[locale]/tours/[slug].astro`:

Change the import line from:
```ts
import { loadItems } from "../../../data.js";
```
to:
```ts
import { loadItems, getVariants } from "../../../data.js";
```

Change the `<BookingWidget>` call from:
```astro
<BookingWidget
  itemPk={item.pk}
  companyShortname={config.fh.shortname}
  locale={locale}
/>
```
to:
```astro
<BookingWidget
  item={item}
  companyShortname={config.fh.shortname}
  locale={locale}
  variants={getVariants(item.pk, locale)}
/>
```

- [ ] **Step 2: Start dev server and verify**

```bash
pnpm --filter @algarve-tourism/algarve-and-you dev
```

Open http://localhost:4322/en/tours/luxuoso-iate-a-vela/ — the booking widget sidebar should show three options (Luxuoso Iate à vela, Meio Dia, Dia Inteiro) each with a price and Book button.

Open http://localhost:4322/en/tours/circuito-de-grutas-ate-benagil/ — no variants, single Book Now button as before.

Check that `/en/tours/luxuoso-iate-a-vela-meio-dia/` returns a 404 (no standalone page for variants).

- [ ] **Step 3: Run full test suite**

```bash
pnpm vitest run
```

Expected: all tests pass.

- [ ] **Step 4: Commit and push**

```bash
git add packages/algarve-and-you/src/pages/[locale]/tours/[slug].astro
git commit -m "feat: wire product variant selector into tour detail page"
git push
```
