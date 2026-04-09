import { describe, it, expect, vi } from "vitest";
import { normalizeItem } from "./fareharbor.js";
import type { FHItem } from "../types.js";

const mockItem: FHItem = {
  pk: 123,
  name: "Full Caves Circuit and Coast Sightseeing",
  headline: "Explore Benagil",
  description: "A great tour",
  description_text: "A great tour",
  description_safe_html: "<p>A great tour</p>",
  description_bullets: ["See Benagil Cave", "90 minute trip"],
  image_cdn_url: "https://cdn.fareharbor.com/img1.jpg",
  images: [
    { pk: 1, image_cdn_url: "https://cdn.fareharbor.com/img1.jpg", gallery: "main" },
    { pk: 2, image_cdn_url: "https://cdn.fareharbor.com/img2.jpg", gallery: "main" },
  ],
  locations: [
    {
      pk: 1,
      type: "meeting",
      note: "Marina de Portimão",
      note_safe_html: "Marina de Portimão",
      latitude: 37.1195,
      longitude: -8.5370,
      google_place_id: "abc123",
      tripadvisor_url: "",
      address: {
        street: "Marina de Portimão",
        city: "Portimão",
        province: "Faro",
        postal_code: "8500-000",
        country: "PT",
      },
    },
  ],
  customer_prototypes: [
    { pk: 1, display_name: "Adult", total: 1750, total_including_tax: 1750, note: "" },
    { pk: 2, display_name: "Child", total: 1000, total_including_tax: 1000, note: "" },
  ],
  cancellation_policy: "Free cancellation",
  cancellation_policy_safe_html: "<p>Free cancellation</p>",
  is_pickup_ever_available: false,
};

describe("normalizeItem()", () => {
  it("normalizes an FH item into site format", () => {
    const result = normalizeItem(mockItem, "boats");

    expect(result.pk).toBe(123);
    expect(result.name).toBe("Full Caves Circuit and Coast Sightseeing");
    expect(result.slug).toBe("full-caves-circuit-and-coast-sightseeing");
    expect(result.description_html).toBe("<p>A great tour</p>");
    expect(result.description_bullets).toEqual(["See Benagil Cave", "90 minute trip"]);
    expect(result.image_url).toBe("https://cdn.fareharbor.com/img1.jpg");
    expect(result.images).toHaveLength(2);
    expect(result.price_from).toBe(1000);
    expect(result.category).toBe("boats");
    expect(result.location).toEqual({
      latitude: 37.1195,
      longitude: -8.5370,
      address: "Marina de Portimão",
      city: "Portimão",
    });
    expect(result.customer_types).toEqual([
      { name: "Adult", price: 1750 },
      { name: "Child", price: 1000 },
    ]);
  });

  it("handles item with no locations", () => {
    const noLocation = { ...mockItem, locations: [] };
    const result = normalizeItem(noLocation, "boats");
    expect(result.location).toBeNull();
  });

  it("handles item with no customer prototypes", () => {
    const noPrice = { ...mockItem, customer_prototypes: [] };
    const result = normalizeItem(noPrice, "boats");
    expect(result.price_from).toBe(0);
  });
});
