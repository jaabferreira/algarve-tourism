/**
 * "Plan your trip" — guide blog posts to surface on each tour page, keyed by FareHarbor item PK.
 *
 * Values are blog-post `translationKey` strings (locale-independent), NOT bare slugs.
 * Because pt/es/fr posts have localized slugs, keying on `translationKey` is the only
 * way the same map renders on every locale's tour page.
 *
 * The resolver in `pages/[locale]/tours/[slug].astro` matches each value against
 * `bp.data.translationKey` and links to the post's actual localized slug.
 *
 * Source: SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md §4e.
 * NOTE: `how-to-visit-benagil` and `can-you-swim-benagil` are planned new posts;
 * `RelatedGuides` filters to posts that exist, so unwritten keys are simply skipped.
 */
const GUIDES_BY_PK: Record<number, string[]> = {
  // Benagil Caves Speed Boat Tour (€20 entry product)
  717720: [
    "benagil-cave-complete-guide",
    "how-to-visit-benagil",
    "can-you-swim-benagil",
    "best-time-benagil",
    "dolphin-watching-algarve",
    "benagil-speedboat-vs-yacht",
  ],
  // Cranchi Yacht Cruise to the Benagil Caves (private)
  720028: [
    "benagil-cave-complete-guide",
    "benagil-vs-other-caves",
    "sunset-cruises-guide",
    "best-time-benagil",
    "benagil-speedboat-vs-yacht",
  ],
  // Luxury Sail Yacht Cruise
  717754: [
    "sunset-cruises-guide",
    "algarve-spring-secret",
    "what-to-pack-boat-tour",
    "benagil-speedboat-vs-yacht",
  ],
  // Reef Fishing Tour
  718024: [
    "reef-fishing-algarve-what-to-expect",
    "reef-fishing-portimao-guide",
    "fishing-traditions-algarve",
  ],
  // Benagil and Alvor Nature Reserve — not yet a published item (not in config.fh.itemPks), so this entry is currently inert
  717728: [
    "benagil-vs-other-caves",
    "marine-life-spotters-guide",
    "benagil-cave-complete-guide",
  ],
};

export const TOUR_GUIDE_PKS: number[] = Object.keys(GUIDES_BY_PK).map(Number);

/** Blog-post `translationKey`s to show in the "Plan your trip" block for the given FareHarbor item PK. */
export function getTourRelatedGuides(itemPk: number | string): string[] {
  return GUIDES_BY_PK[Number(itemPk)] ?? [];
}
