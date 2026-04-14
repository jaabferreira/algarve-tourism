import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.algarveandyou.com",
  integrations: [
    sitemap({
      filter: (page) => page !== "https://www.algarveandyou.com/",
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
