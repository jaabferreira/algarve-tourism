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
 * Reads raw data file (bypassing itemPks filter) so variant PKs are always reachable.
 * Returns [] if the item is not part of any group.
 */
export function getVariants(primaryPk: number, locale: Locale = "en"): NormalizedItem[] {
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
