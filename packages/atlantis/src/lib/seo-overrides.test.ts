import { describe, it, expect } from "vitest";
import { getTourSeoOverride } from "./seo-overrides.js";

const MONEY_PAGE_PKS = [717720, 717754, 720028, 718024] as const;
const ALL_LOCALES = ["en", "pt", "es", "fr"] as const;

describe("getTourSeoOverride()", () => {
  it("returns hand-written English copy for the Benagil speedboat tour", () => {
    const o = getTourSeoOverride(717720, "en");
    expect(o?.title).toMatch(/Benagil/i);
    expect(o?.description).toBeTruthy();
  });

  it("accepts the item PK as a string", () => {
    expect(getTourSeoOverride("717720", "en")).toEqual(
      getTourSeoOverride(717720, "en"),
    );
  });

  it("returns undefined for a tour with no override", () => {
    expect(getTourSeoOverride(999999, "en")).toBeUndefined();
  });

  it("returns undefined for every locale when the PK is unknown", () => {
    for (const loc of ALL_LOCALES) {
      expect(getTourSeoOverride(424242, loc)).toBeUndefined();
    }
  });

  it("has a title + description for all four money pages in all four locales", () => {
    for (const pk of MONEY_PAGE_PKS) {
      for (const loc of ALL_LOCALES) {
        const o = getTourSeoOverride(pk, loc);
        expect(o?.title, `pk=${pk} loc=${loc} title`).toBeTruthy();
        expect(o?.description, `pk=${pk} loc=${loc} description`).toBeTruthy();
      }
    }
  });

  it("keeps every configured description within the meta-description limit", () => {
    for (const pk of MONEY_PAGE_PKS) {
      for (const loc of ALL_LOCALES) {
        const d = getTourSeoOverride(pk, loc)?.description;
        if (d) expect(d.length, `pk=${pk} loc=${loc}`).toBeLessThanOrEqual(160);
      }
    }
  });
});
