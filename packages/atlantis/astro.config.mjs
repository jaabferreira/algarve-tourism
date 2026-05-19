import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Pre-index blog frontmatter `date:` per URL so the sitemap can emit
// <lastmod>. Without it Google has no freshness signal on refreshes.
const blogLastmod = (() => {
  const map = new Map();
  const root = new URL("./src/content/blog", import.meta.url).pathname;
  for (const locale of ["en", "pt", "es", "fr"]) {
    const dir = join(root, locale);
    let files;
    try {
      files = readdirSync(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const slug = file.replace(/\.md$/, "");
      const fm = readFileSync(join(dir, file), "utf8");
      const m = fm.match(/^date:\s*["']?([0-9]{4}-[0-9]{2}-[0-9]{2})["']?\s*$/m);
      if (!m) continue;
      map.set(
        `https://www.atlantistours.pt/${locale}/blog/${slug}/`,
        m[1],
      );
    }
  }
  return map;
})();

export default defineConfig({
  site: "https://www.atlantistours.pt",
  integrations: [
    sitemap({
      filter: (page) =>
        page !== "https://www.atlantistours.pt/" &&
        !page.includes("/partners/"),
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", pt: "pt", es: "es", fr: "fr" },
      },
      serialize(item) {
        const lastmod = blogLastmod.get(item.url);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt", "es", "fr"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    envDir: "../..",
  },
});
