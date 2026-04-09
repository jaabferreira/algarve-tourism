import type { BrandConfig } from "@algarve-tourism/shared";

export const config: BrandConfig = {
  name: "Algarve & You",
  domain: "algarveandyou.com",
  tagline: "Your Algarve Experience",
  fh: {
    shortname: "algarve-and-you",
    categories: ["boats", "gastronomy", "land-tours", "transfers", "spa"],
  },
  logo: "/logo-ay.svg",
  social: {
    instagram: "https://www.instagram.com/algarveandyou/",
    facebook: "https://www.facebook.com/algarveandyou/",
    whatsapp: "+351000000000",
  },
  analytics: {
    gtag: "G-GZJJYPE72L",
  },
  defaultLocale: "en",
  locales: ["en", "pt", "es", "fr"],
};
