import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.atlantistours.pt",
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt", "es", "fr"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
