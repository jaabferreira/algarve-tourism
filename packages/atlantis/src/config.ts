import type { BrandConfig } from "@algarve-tourism/shared";

export const config: BrandConfig = {
  name: "Atlantis Tours",
  domain: "atlantistours.pt",
  tagline: "Discover the Algarve Coast",
  fh: {
    shortname: "atlantis-tours",
    categories: ["boats"],
  },
  logo: "/logo-atlantis.svg",
  social: {
    instagram: "https://www.instagram.com/atlantistours.pt/",
    facebook: "https://www.facebook.com/atlantistours.pt/",
    whatsapp: "+351000000000",
    youtube: "https://www.youtube.com/@atlantistours",
  },
  analytics: {
    gtag: "G-7MKYTWY07D",
  },
  defaultLocale: "en",
  locales: ["en", "pt", "es", "fr"],
};
