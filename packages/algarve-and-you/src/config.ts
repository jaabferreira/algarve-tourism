import type { BrandConfig } from "@algarve-tourism/shared";

export const config: BrandConfig = {
  brand: "algarve-and-you",
  name: "Algarve & You",
  domain: "algarveandyou.com",
  tagline: "Your Algarve Experience",
  fh: {
    shortname: "atlantistours",
    categories: ["boats", "gastronomy", "land-tours", "transfers", "spa"],
    flow: "1602637",
    itemPks: [
      717720, 717754,
      720028,
      718024,
      718031, 718047, 718048, 718071, 718072,
      718075, 718080, 718083, 718085, 718087, 718093,
      718096, 718101, 718103, 718107, 718109, 718110,
      718112, 718113, 718115, 718116,
      718423, 718429, 718456,
      718459, 718464, 718470,
      718473, 718494, 718481, 718509, 718514,
    ],
    productGroups: [
      { primary: 717754, variants: [718007, 718013] },
      { primary: 720028, variants: [720080, 720086] },
      { primary: 718423, variants: [718426] },
      { primary: 718429, variants: [718430] },
      { primary: 718456, variants: [718457] },
      { primary: 718459, variants: [718460] },
      { primary: 718464, variants: [718467] },
      { primary: 718470, variants: [718472] },
      { primary: 718473, variants: [718474] },
    ],
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
