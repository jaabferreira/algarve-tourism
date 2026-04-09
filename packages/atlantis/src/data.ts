import type { NormalizedItem } from "@algarve-tourism/shared";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function loadItems(): NormalizedItem[] {
  try {
    const dataPath = resolve(
      process.cwd(),
      "packages/shared/data/atlantistours.json",
    );
    const raw = readFileSync(dataPath, "utf-8");
    return JSON.parse(raw) as NormalizedItem[];
  } catch {
    return [];
  }
}
