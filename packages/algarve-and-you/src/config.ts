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
      718075, 720350, 718083, 720354, 718087, 720356,
      718096, 720357, 718103, 720358, 718109, 720361,
      718112, 720362, 718115, 720365,
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
