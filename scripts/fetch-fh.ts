import { createFHClient, normalizeItem } from "../packages/shared/src/lib/fareharbor.js";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appKey = process.env.FH_APP_KEY;
const userKey = process.env.FH_USER_KEY;
const atlantisShortname = process.env.FH_ATLANTIS_SHORTNAME;
const ayShortname = process.env.FH_AY_SHORTNAME;

if (!appKey || !userKey) {
  console.error("Missing FH_APP_KEY or FH_USER_KEY environment variables");
  process.exit(1);
}

const client = createFHClient({ appKey, userKey });
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, "../packages/shared/data");

async function fetchAndSave(shortname: string, defaultCategory: string) {
  console.log(`Fetching items for ${shortname}...`);
  const items = await client.getItems(shortname);
  const normalized = items.map((item) => normalizeItem(item, defaultCategory));
  const outPath = resolve(dataDir, `${shortname}.json`);
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(outPath, JSON.stringify(normalized, null, 2));
  console.log(`Wrote ${normalized.length} items to ${outPath}`);
}

async function main() {
  if (atlantisShortname) {
    await fetchAndSave(atlantisShortname, "boats");
  }
  if (ayShortname) {
    await fetchAndSave(ayShortname, "boats");
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error("Fetch failed:", err);
  process.exit(1);
});
