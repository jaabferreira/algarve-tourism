import { describe, it, expect } from "vitest";
import { slugify } from "./slugify.js";

describe("slugify()", () => {
  it("converts name to lowercase slug", () => {
    expect(slugify("Full Caves Circuit and Coast Sightseeing")).toBe(
      "full-caves-circuit-and-coast-sightseeing",
    );
  });

  it("removes special characters", () => {
    expect(slugify("Luxury Sail Yacht Cruise — Sunset")).toBe(
      "luxury-sail-yacht-cruise-sunset",
    );
  });

  it("handles accented characters", () => {
    expect(slugify("Passeio às Grutas de Benagil")).toBe(
      "passeio-as-grutas-de-benagil",
    );
  });

  it("collapses multiple dashes", () => {
    expect(slugify("Rio   Arade   Tour")).toBe("rio-arade-tour");
  });

  it("trims leading/trailing dashes", () => {
    expect(slugify(" -Fishing Trip- ")).toBe("fishing-trip");
  });
});
