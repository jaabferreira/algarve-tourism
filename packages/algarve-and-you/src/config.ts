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
      717720, 717754, 718007, 718013,
      720028, 720080, 720086,
      718024,
      718031, 718047, 718048, 718071, 718072,
      718075, 718080, 718083, 718085, 718087, 718093,
      718096, 718101, 718103, 718107, 718109, 718110,
      718112, 718113, 718115, 718116,
      718423, 718426, 718429, 718430, 718456, 718457,
      718459, 718460, 718464, 718467, 718470, 718472,
      718473, 718474, 718494, 718481, 718509, 718514,
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
