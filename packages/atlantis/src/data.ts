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
    return items;
  } catch {
    return [];
  }
}
