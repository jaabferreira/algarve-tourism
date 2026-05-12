import type { Locale } from "@algarve-tourism/shared";

export interface TourSeoOverride {
  /** Overrides the `<title>` (the ` | Atlantis Tours` suffix is added by SEO.astro). */
  title?: string;
  /** Overrides the meta description / OG / Twitter description and `Product.description`. Keep ≤ ~160 chars. */
  description?: string;
}

/**
 * Hand-written SEO copy for the tour pages, keyed by FareHarbor item PK → locale.
 *
 * The FareHarbor `description` field is logistics prose ("Meet at the dock…") and
 * makes a poor SERP snippet — these are the money pages (and the Google Ads
 * landing pages), so they get hand-written copy. Locales without an entry fall
 * back to a word-boundary truncation of the FareHarbor description (see
 * `pages/[locale]/tours/[slug].astro`), so adding an override is always optional.
 *
 * Mirrors the pattern of `lib/videos.ts` / `lib/trust-items.ts`. Localized
 * copy is hand-written per locale (not machine-translated).
 */
const OVERRIDES: Record<number, Partial<Record<Locale, TourSeoOverride>>> = {
  // 717720 — Benagil Caves Speed Boat Tour (from €20, ~2h, small group, dolphins often spotted)
  717720: {
    en: {
      title: "Benagil Caves Speed Boat Tour from Portimão",
      description:
        "See the Benagil sea cave up close on a small-group speedboat from Portimão — about 2 hours, dolphins often spotted. Free cancellation. From €20.",
    },
    pt: {
      title: "Passeio de Lancha às Grutas de Benagil — Portimão",
      description:
        "Veja a gruta de Benagil de perto numa lancha em pequeno grupo, a partir de Portimão — cerca de 2 horas, golfinhos frequentes. Desde 20 €.",
    },
    es: {
      title: "Tour en Lancha a las Cuevas de Benagil — Portimão",
      description:
        "Ve la cueva de Benagil de cerca en lancha rápida y grupo reducido, desde Portimão — unas 2 horas, delfines frecuentes. Cancelación gratuita. Desde 20 €.",
    },
    fr: {
      title: "Excursion en Vedette aux Grottes de Benagil — Portimão",
      description:
        "Découvrez la grotte de Benagil de près en vedette et en petit groupe, au départ de Portimão — environ 2 h, dauphins fréquents. Dès 20 €.",
    },
  },

  // 717754 — Luxury Sail Yacht Cruise (private sailing-yacht charter from Portimão)
  717754: {
    en: {
      title: "Private Luxury Sailing Yacht Cruise from Portimão",
      description:
        "Charter a private sailing yacht along the Algarve coast from Portimão — swim stops, golden cliffs, your group only. Skipper and drinks included.",
    },
    pt: {
      title: "Cruzeiro Privado em Iate à Vela de Luxo — Portimão",
      description:
        "Iate à vela privado pela costa do Algarve, a partir de Portimão — paragens para nadar, falésias douradas, só o seu grupo. Skipper e bebidas incluídos.",
    },
    es: {
      title: "Crucero Privado en Velero de Lujo — Portimão",
      description:
        "Velero de lujo privado por la costa del Algarve desde Portimão — paradas para nadar, acantilados dorados, solo tu grupo. Patrón y bebidas incluidos.",
    },
    fr: {
      title: "Croisière Privée en Voilier de Luxe — Portimão",
      description:
        "Voilier de luxe privé sur la côte de l’Algarve au départ de Portimão — pauses baignade, falaises dorées, votre groupe seul. Skipper et boissons inclus.",
    },
  },

  // 720028 — Cranchi Yacht Cruise to the Benagil Caves (private motor-yacht charter)
  720028: {
    en: {
      title: "Private Cranchi Yacht Cruise to the Benagil Caves",
      description:
        "Private Cranchi motor-yacht charter from Portimão to the Benagil caves — swim stops, golden cliffs, your group only. Skipper and drinks included.",
    },
    pt: {
      title: "Cruzeiro Privado de Iate Cranchi às Grutas de Benagil",
      description:
        "Iate a motor Cranchi privado, de Portimão até às grutas de Benagil — paragens para nadar, falésias douradas, só o seu grupo. Bebidas incluídas.",
    },
    es: {
      title: "Crucero Privado en Yate Cranchi a las Cuevas de Benagil",
      description:
        "Yate a motor Cranchi privado, de Portimão a las cuevas de Benagil — paradas para nadar, acantilados dorados, solo tu grupo. Patrón y bebidas incluidos.",
    },
    fr: {
      title: "Croisière Privée en Yacht Cranchi aux Grottes de Benagil",
      description:
        "Yacht à moteur Cranchi privé, de Portimão aux grottes de Benagil — pauses baignade, falaises dorées, votre groupe seul. Skipper et boissons inclus.",
    },
  },

  // 718024 — Reef Fishing Tour (from €75, half-day, beginners welcome)
  718024: {
    en: {
      title: "Reef Fishing Tour from Portimão — Half Day",
      description:
        "Half-day reef fishing off Portimão with a local skipper — rods, bait and licence included. Beginners welcome; keep or release your catch. From €75.",
    },
    pt: {
      title: "Pesca de Fundo em Portimão — Meio Dia",
      description:
        "Meio dia de pesca de fundo ao largo de Portimão com um skipper local — canas, isco e licença incluídos. Iniciantes bem-vindos. Desde 75 €.",
    },
    es: {
      title: "Pesca de Fondo en Portimão — Media Jornada",
      description:
        "Media jornada de pesca de fondo frente a Portimão con un patrón local — cañas, cebo y licencia incluidos. Principiantes bienvenidos. Desde 75 €.",
    },
    fr: {
      title: "Pêche au Fond à Portimão — Demi-Journée",
      description:
        "Demi-journée de pêche au fond au large de Portimão avec un skipper local — cannes, appâts et permis inclus. Débutants bienvenus. Dès 75 €.",
    },
  },
};

export function getTourSeoOverride(
  itemPk: number | string,
  locale: Locale,
): TourSeoOverride | undefined {
  return OVERRIDES[Number(itemPk)]?.[locale];
}
