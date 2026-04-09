import { describe, it, expect } from "vitest";
import { formatPrice, getFromPrice } from "./prices.js";
import type { FHCustomerPrototype } from "../types.js";

describe("formatPrice()", () => {
  it("formats cents to EUR", () => {
    expect(formatPrice(1750)).toBe("€17.50");
  });

  it("formats whole amounts", () => {
    expect(formatPrice(5500)).toBe("€55.00");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("€0.00");
  });
});

describe("getFromPrice()", () => {
  it("returns lowest price from customer prototypes", () => {
    const prototypes: FHCustomerPrototype[] = [
      { pk: 1, display_name: "Adult", total: 5500, total_including_tax: 5500, note: "" },
      { pk: 2, display_name: "Child", total: 3200, total_including_tax: 3200, note: "" },
      { pk: 3, display_name: "Senior", total: 4500, total_including_tax: 4500, note: "" },
    ];
    expect(getFromPrice(prototypes)).toBe(3200);
  });

  it("returns 0 for empty prototypes", () => {
    expect(getFromPrice([])).toBe(0);
  });
});
