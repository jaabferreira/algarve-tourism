import { describe, it, expect } from "vitest";
import { getTourRelatedGuides, TOUR_GUIDE_PKS } from "./tour-guides.js";

describe("getTourRelatedGuides", () => {
  it("returns the guide slugs for the Benagil speedboat (PK 717720)", () => {
    const slugs = getTourRelatedGuides(717720);
    expect(slugs).toContain("benagil-cave-tour-complete-guide");
    expect(slugs).toContain("dolphin-watching-algarve-species-seasons");
    expect(slugs.length).toBeGreaterThanOrEqual(3);
  });

  it("accepts a string PK", () => {
    expect(getTourRelatedGuides("717720")).toEqual(getTourRelatedGuides(717720));
  });

  it("returns an empty array for a tour with no configured guides", () => {
    expect(getTourRelatedGuides(999999)).toEqual([]);
  });

  it("every configured tour lists 1–6 unique non-empty slugs and includes the pillar where Benagil-related", () => {
    for (const pk of TOUR_GUIDE_PKS) {
      const slugs = getTourRelatedGuides(pk);
      expect(slugs.length).toBeGreaterThanOrEqual(1);
      expect(slugs.length).toBeLessThanOrEqual(6);
      expect(new Set(slugs).size).toBe(slugs.length); // no dupes
      expect(slugs.every((s) => s.length > 0)).toBe(true);
    }
    // the speedboat, the private Cranchi and the Benagil+Alvor tours all reference the pillar
    for (const pk of [717720, 720028, 717728]) {
      expect(getTourRelatedGuides(pk)).toContain("benagil-cave-tour-complete-guide");
    }
  });
});
