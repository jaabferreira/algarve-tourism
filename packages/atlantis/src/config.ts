import type { BrandConfig } from "@algarve-tourism/shared";

export const config: BrandConfig = {
  brand: "atlantis",
  name: "Atlantis Tours",
  domain: "atlantistours.pt",
  tagline: "Discover the Algarve Coast",
  fh: {
    shortname: "atlantistours",
    categories: ["boats"],
    itemPks: [717720, 717728, 717754, 720028, 718024],
    flow: "1602637",
    productGroups: [
      { primary: 717754, variants: [718007, 718013] },
      { primary: 720028, variants: [720080, 720086] },
    ],
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

export const tourCategories = [
  { key: "benagil-cave-tours", pks: [717720, 717728] },
  { key: "private-sail-yacht", pks: [717754] },
  { key: "private-yacht", pks: [720028] },
  { key: "reef-fishing", pks: [718024] },
];
