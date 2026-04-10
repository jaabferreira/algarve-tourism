import { createFHClient, normalizeItem } from "../packages/shared/src/lib/fareharbor.js";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appKey = process.env.FH_APP_KEY;
const userKey = process.env.FH_USER_KEY;
const atlantisShortname = process.env.FH_ATLANTIS_SHORTNAME;
const ayShortname = process.env.FH_AY_SHORTNAME;

// Languages available in FareHarbor. PT is the default (account language).
const FH_LANGUAGES = ["pt", "en"] as const;

if (!appKey || !userKey) {
  console.error("Missing FH_APP_KEY or FH_USER_KEY environment variables");
  process.exit(1);
}

const client = createFHClient({ appKey, userKey });
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, "../packages/shared/data");

async function fetchAndSave(shortname: string) {
  mkdirSync(dataDir, { recursive: true });

  // 1. Fetch PT (canonical) — determines slugs and categories
  console.log(`Fetching PT items for ${shortname}...`);
  const ptItems = await client.getItems(shortname, "pt");
  const ptNormalized = ptItems.map((item) => normalizeItem(item));

  // Build PK → { slug, category } map from canonical PT data
  const canonicalMap = new Map<number, { slug: string; category: string }>();
  for (const item of ptNormalized) {
    canonicalMap.set(item.pk, { slug: item.slug, category: item.category });
  }

  // Save PT
  const ptPath = resolve(dataDir, `${shortname}.pt.json`);
  writeFileSync(ptPath, JSON.stringify(ptNormalized, null, 2));
  console.log(`Wrote ${ptNormalized.length} PT items to ${ptPath}`);

  // 2. Fetch other languages, using canonical slugs and categories
  for (const lang of FH_LANGUAGES) {
    if (lang === "pt") continue;

    console.log(`Fetching ${lang.toUpperCase()} items for ${shortname}...`);
    const rawItems = await client.getItems(shortname, lang);
    const normalized = rawItems.map((item) => {
      const canonical = canonicalMap.get(item.pk);
      return normalizeItem(item, canonical);
    });

    const outPath = resolve(dataDir, `${shortname}.${lang}.json`);
    writeFileSync(outPath, JSON.stringify(normalized, null, 2));
    console.log(`Wrote ${normalized.length} ${lang.toUpperCase()} items to ${outPath}`);
  }
}

async function main() {
  if (atlantisShortname) {
    await fetchAndSave(atlantisShortname);
  }
  if (ayShortname) {
    await fetchAndSave(ayShortname);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error("Fetch failed:", err);
  process.exit(1);
});
