import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.atlantistours.pt",
  integrations: [
    sitemap({
      filter: (page) => page !== "https://www.atlantistours.pt/",
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt", "es", "fr"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
