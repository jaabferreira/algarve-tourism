/**
 * "Plan your trip" — guide-post slugs to surface on each tour page, keyed by FareHarbor item PK.
 * Source: SEO/content-hub/2026-05-12-atlantis-benagil-hub-architecture.md §4e.
 * NOTE: `how-to-visit-benagil-cave` and `can-you-swim-benagil-cave` are planned new posts;
 * the RelatedGuides component filters to posts that exist, so unwritten slugs are simply skipped.
 */
const GUIDES_BY_PK: Record<number, string[]> = {
  // Benagil Caves Speed Boat Tour (€20 entry product)
  717720: [
    "benagil-cave-tour-complete-guide",
    "how-to-visit-benagil-cave",
    "can-you-swim-benagil-cave",
    "best-time-visit-benagil-caves",
    "dolphin-watching-algarve-species-seasons",
  ],
  // Cranchi Yacht Cruise to the Benagil Caves (private)
  720028: [
    "benagil-cave-tour-complete-guide",
    "benagil-vs-other-sea-caves-algarve",
    "sunset-cruises-algarve-summer-guide",
    "best-time-visit-benagil-caves",
  ],
  // Luxury Sail Yacht Cruise
  717754: [
    "sunset-cruises-algarve-summer-guide",
    "algarve-in-spring-best-kept-secret",
    "what-to-pack-algarve-boat-tour",
  ],
  // Reef Fishing Tour
  718024: [
    "reef-fishing-algarve-what-to-expect",
    "reef-fishing-portimao-half-day-guide",
    "fishing-traditions-algarve-coast",
  ],
  // Benagil and Alvor Nature Reserve — not yet a published item (not in config.fh.itemPks), so this entry is currently inert
  717728: [
    "benagil-vs-other-sea-caves-algarve",
    "marine-life-algarve-coast-spotters-guide",
    "benagil-cave-tour-complete-guide",
  ],
};

export const TOUR_GUIDE_PKS: number[] = Object.keys(GUIDES_BY_PK).map(Number);

/** Guide-post slugs to show in the "Plan your trip" block for the given FareHarbor item PK. */
export function getTourRelatedGuides(itemPk: number | string): string[] {
  return GUIDES_BY_PK[Number(itemPk)] ?? [];
}
