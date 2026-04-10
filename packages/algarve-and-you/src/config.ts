import type { BrandConfig } from "@algarve-tourism/shared";

export const config: BrandConfig = {
  brand: "algarve-and-you",
  name: "Algarve & You",
  domain: "algarveandyou.com",
  tagline: "Your Algarve Experience",
  fh: {
    shortname: "atlantistours",
    categories: ["boats", "gastronomy", "land-tours", "transfers", "spa"],
  },
  logo: "/logo-ay.png",
  social: {
    instagram: "https://www.instagram.com/algarveandyou/",
    facebook: "https://www.facebook.com/algarveandyou/",
    whatsapp: "+351964332489",
  },
  analytics: {
    gtag: "G-GZJJYPE72L",
  },
  defaultLocale: "en",
  locales: ["en", "pt", "es", "fr"],
};
