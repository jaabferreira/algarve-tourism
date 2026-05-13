import { describe, it, expect } from "vitest";
import { getTourRelatedGuides, TOUR_GUIDE_PKS } from "./tour-guides.js";

// These are blog-post `translationKey` values (locale-independent), not bare slugs.
// The resolver in tours/[slug].astro matches `bp.data.translationKey === wantKey`,
// which makes the "Plan your trip" block render correctly on every locale.

describe("getTourRelatedGuides", () => {
  it("returns the guide translationKeys for the Benagil speedboat (PK 717720)", () => {
    const keys = getTourRelatedGuides(717720);
    expect(keys).toContain("benagil-cave-complete-guide");
    expect(keys).toContain("dolphin-watching-algarve");
    expect(keys.length).toBeGreaterThanOrEqual(3);
  });

  it("accepts a string PK", () => {
    expect(getTourRelatedGuides("717720")).toEqual(getTourRelatedGuides(717720));
  });

  it("returns an empty array for a tour with no configured guides", () => {
    expect(getTourRelatedGuides(999999)).toEqual([]);
  });

  it("every configured tour lists 1–6 unique non-empty keys and includes the pillar where Benagil-related", () => {
    for (const pk of TOUR_GUIDE_PKS) {
      const keys = getTourRelatedGuides(pk);
      expect(keys.length).toBeGreaterThanOrEqual(1);
      expect(keys.length).toBeLessThanOrEqual(6);
      expect(new Set(keys).size).toBe(keys.length); // no dupes
      expect(keys.every((s) => s.length > 0)).toBe(true);
    }
    // the speedboat, the private Cranchi and the Benagil+Alvor tours all reference the pillar
    for (const pk of [717720, 720028, 717728]) {
      expect(getTourRelatedGuides(pk)).toContain("benagil-cave-complete-guide");
    }
  });
});
