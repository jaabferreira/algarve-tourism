import { describe, it, expect } from "vitest";
import { findVariantItems } from "./data.js";
import type { NormalizedItem } from "@algarve-tourism/shared";

const makeItem = (pk: number, name: string): NormalizedItem => ({
  pk,
  name,
  headline: "",
  slug: name.toLowerCase().replace(/\s/g, "-"),
  description_html: "",
  description_text: "",
  description_bullets: [],
  image_url: "",
  images: [],
  location: null,
  price_from: 1000,
  price_from_including_tax: 1000,
  customer_types: [],
  cancellation_policy_html: "",
  category: "boats",
});

const groups = [
  { primary: 100, variants: [101, 102] },
  { primary: 200, variants: [201] },
];

const items = [
  makeItem(100, "Yacht Tour"),
  makeItem(101, "Yacht Tour Half Day"),
  makeItem(102, "Yacht Tour Full Day"),
  makeItem(200, "Cave Tour"),
  makeItem(201, "Cave Tour Small Group"),
];

describe("findVariantItems()", () => {
  it("returns variant NormalizedItems for a known primary PK", () => {
    const result = findVariantItems(100, groups, items);
    expect(result).toHaveLength(2);
    expect(result[0].pk).toBe(101);
    expect(result[1].pk).toBe(102);
  });

  it("returns empty array when primary PK has no group", () => {
    const result = findVariantItems(999, groups, items);
    expect(result).toHaveLength(0);
  });

  it("returns empty array when groups is undefined", () => {
    const result = findVariantItems(100, undefined, items);
    expect(result).toHaveLength(0);
  });

  it("skips variant PKs not found in items", () => {
    const groupsWithMissing = [{ primary: 100, variants: [101, 999] }];
    const result = findVariantItems(100, groupsWithMissing, items);
    expect(result).toHaveLength(1);
    expect(result[0].pk).toBe(101);
  });

  it("preserves variant order from groups config", () => {
    const reversed = [{ primary: 100, variants: [102, 101] }];
    const result = findVariantItems(100, reversed, items);
    expect(result[0].pk).toBe(102);
    expect(result[1].pk).toBe(101);
  });
});
