import { describe, it, expect } from "vitest";
import { t, getLocaleFromPath, getPathInLocale } from "./index.js";

describe("t()", () => {
  it("returns English string for known key", () => {
    expect(t("en", "nav.tours")).toBe("Tours");
  });

  it("returns Portuguese string for known key", () => {
    expect(t("pt", "nav.tours")).toBe("Passeios");
  });

  it("falls back to English for missing locale key", () => {
    expect(t("fr", "nav.tours")).toBe("Circuits");
  });

  it("returns key itself if not found in any locale", () => {
    expect(t("en", "nonexistent.key" as any)).toBe("nonexistent.key");
  });
});

describe("getLocaleFromPath()", () => {
  it("extracts locale from path", () => {
    expect(getLocaleFromPath("/en/tours/")).toBe("en");
    expect(getLocaleFromPath("/pt/about")).toBe("pt");
  });

  it("defaults to en for invalid locale", () => {
    expect(getLocaleFromPath("/xx/tours/")).toBe("en");
  });

  it("defaults to en for root path", () => {
    expect(getLocaleFromPath("/")).toBe("en");
  });
});

describe("getPathInLocale()", () => {
  it("switches locale prefix in path", () => {
    expect(getPathInLocale("/en/tours/benagil", "pt")).toBe("/pt/tours/benagil/");
  });

  it("handles root locale path", () => {
    expect(getPathInLocale("/en/", "fr")).toBe("/fr/");
  });
});
