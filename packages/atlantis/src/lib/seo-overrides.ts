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
 * Mirrors the pattern of `lib/videos.ts` / `lib/trust-items.ts`.
 *
 * TODO(seo): add native ES + FR copy for the four tours below — until then those
 * two locales fall back to a truncated (English) FareHarbor description. Do not
 * machine-translate the English string; write native marketing copy.
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
  },
};

export function getTourSeoOverride(
  itemPk: number | string,
  locale: Locale,
): TourSeoOverride | undefined {
  return OVERRIDES[Number(itemPk)]?.[locale];
}
