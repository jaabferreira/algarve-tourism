import type { NormalizedItem } from "@algarve-tourism/shared";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "./config.js";

function findDataFile(): string | null {
  const candidates = [
    resolve(process.cwd(), "../shared/data/atlantistours.json"),
    resolve(process.cwd(), "packages/shared/data/atlantistours.json"),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

export function loadItems(): NormalizedItem[] {
  try {
    const dataPath = findDataFile();
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
