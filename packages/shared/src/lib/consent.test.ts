import { describe, it, expect } from "vitest";
import {
  serializeConsent,
  parseConsent,
  toConsentSignals,
  CONSENT_VERSION,
} from "./consent.js";

describe("serializeConsent()", () => {
  it("encodes both categories granted", () => {
    expect(serializeConsent({ analytics: true, marketing: true })).toBe(
      "v1|analytics=1|marketing=1",
    );
  });

  it("encodes both categories denied", () => {
    expect(serializeConsent({ analytics: false, marketing: false })).toBe(
      "v1|analytics=0|marketing=0",
    );
  });

  it("starts with the current consent version", () => {
    expect(
      serializeConsent({ analytics: true, marketing: false }).startsWith(
        CONSENT_VERSION + "|",
      ),
    ).toBe(true);
  });
});

describe("parseConsent()", () => {
  it("round-trips a serialized value", () => {
    const raw = serializeConsent({ analytics: true, marketing: false });
    expect(parseConsent(raw)).toEqual({ analytics: true, marketing: false });
  });

  it("returns null for null or empty input", () => {
    expect(parseConsent(null)).toBeNull();
    expect(parseConsent(undefined)).toBeNull();
    expect(parseConsent("")).toBeNull();
  });

  it("returns null for a malformed value", () => {
    expect(parseConsent("garbage")).toBeNull();
    expect(parseConsent("v1|analytics=1")).toBeNull();
  });

  it("returns null for a version mismatch (forces a re-prompt)", () => {
    expect(parseConsent("v0|analytics=1|marketing=1")).toBeNull();
  });
});

describe("toConsentSignals()", () => {
  it("maps analytics to analytics_storage only", () => {
    expect(toConsentSignals({ analytics: true, marketing: false })).toEqual({
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });

  it("maps marketing to all three ad signals", () => {
    expect(toConsentSignals({ analytics: false, marketing: true })).toEqual({
      analytics_storage: "denied",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
  });
});
