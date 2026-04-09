import type { NormalizedItem } from "@algarve-tourism/shared";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

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
    return JSON.parse(raw) as NormalizedItem[];
  } catch {
    return [];
  }
}
