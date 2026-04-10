import type { BrandConfig } from "@algarve-tourism/shared";

export const config: BrandConfig = {
  brand: "atlantis",
  name: "Atlantis Tours",
  domain: "atlantistours.pt",
  tagline: "Discover the Algarve Coast",
  fh: {
    shortname: "atlantistours",
    categories: ["boats"],
    itemPks: [717720, 717754, 718016, 717728, 718024],
    flow: "1602637",
  },
  logo: "/logo-atlantis.png",
  social: {
    instagram: "https://www.instagram.com/atlantis.tours/",
    facebook: "https://www.facebook.com/atlantistoursbap/",
    whatsapp: "+351969703185",
    youtube: "https://www.youtube.com/@atlantistours9867",
  },
  analytics: {
    gtag: "G-7MKYTWY07D",
  },
  defaultLocale: "en",
  locales: ["en", "pt", "es", "fr"],
};
