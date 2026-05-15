import type { NormalizedItem, Locale } from "@algarve-tourism/shared";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "./config.js";

// Map site locales to FareHarbor languages. Unsupported locales fall back to EN.
const FH_LOCALE_MAP: Record<string, string> = {
  en: "en",
  pt: "pt",
};

// Per-category display order overrides. Items listed by pk appear first
// in the given order; anything else keeps the FH API order after them.
const CATEGORY_ORDER: Record<string, number[]> = {
  spa: [
    718494, // Centro de Check in - Guardar Bagagem (featured)
    718514, // Centro de Check in - Ginásio
    730255, // Área de Duche e Vestiário
    718481, // Check-in Centre - BEM ESTAR - Circuito Zen
    718509, // Massagens
  ],
};

function applyCategoryOrder(items: NormalizedItem[]): NormalizedItem[] {
  const byCategory = new Map<string, NormalizedItem[]>();
  for (const item of items) {
    const list = byCategory.get(item.category) ?? [];
    list.push(item);
    byCategory.set(item.category, list);
  }

  for (const [category, order] of Object.entries(CATEGORY_ORDER)) {
    const list = byCategory.get(category);
    if (!list) continue;
    const rank = new Map<number, number>(order.map((pk, i) => [pk, i]));
    list.sort((a: NormalizedItem, b: NormalizedItem) => {
      const ra = rank.get(a.pk) ?? Number.POSITIVE_INFINITY;
      const rb = rank.get(b.pk) ?? Number.POSITIVE_INFINITY;
      return ra - rb;
    });
  }

  const result: NormalizedItem[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.category)) continue;
    seen.add(item.category);
    result.push(...(byCategory.get(item.category) ?? []));
  }
  return result;
}

function findDataFile(locale: Locale): string | null {
  const fhLang = FH_LOCALE_MAP[locale] ?? "en";
  const filename = `atlantistours.${fhLang}.json`;
  const fallback = "atlantistours.en.json";
  const legacyFallback = "atlantistours.json";

  const bases = [
    resolve(process.cwd(), "../shared/data"),
    resolve(process.cwd(), "packages/shared/data"),
  ];

  // Try locale-specific, then EN fallback, then legacy file
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
    return applyCategoryOrder(items);
  } catch {
    return [];
  }
}
