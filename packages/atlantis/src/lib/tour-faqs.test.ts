import { describe, it, expect } from "vitest";
import { getTourFaqs } from "./tour-faqs.js";

const BENAGIL_MONEY_PKS = [717720, 720028, 717754] as const;

describe("getTourFaqs()", () => {
  it("returns EN FAQs for the Benagil speedboat tour", () => {
    const faqs = getTourFaqs(717720, "en");
    expect(faqs.length).toBeGreaterThanOrEqual(4);
    expect(faqs[0]).toHaveProperty("question");
    expect(faqs[0]).toHaveProperty("answer");
  });

  it("accepts the item PK as a string", () => {
    expect(getTourFaqs("717720", "en")).toEqual(getTourFaqs(717720, "en"));
  });

  it("returns an empty array for an unknown PK", () => {
    expect(getTourFaqs(999999, "en")).toEqual([]);
  });

  it("returns an empty array for an unpopulated locale (EN-first rollout)", () => {
    expect(getTourFaqs(717720, "pt")).toEqual([]);
  });

  it("has 4-8 non-empty EN FAQs for each Benagil money page", () => {
    for (const pk of BENAGIL_MONEY_PKS) {
      const faqs = getTourFaqs(pk, "en");
      expect(faqs.length, `pk=${pk}`).toBeGreaterThanOrEqual(4);
      expect(faqs.length, `pk=${pk}`).toBeLessThanOrEqual(8);
      for (const f of faqs) {
        expect(f.question.length, `pk=${pk} question`).toBeGreaterThan(0);
        expect(f.answer.length, `pk=${pk} answer`).toBeGreaterThan(0);
      }
    }
  });

  it("never claims the sail yacht (717754) enters the cave", () => {
    const text = getTourFaqs(717754, "en").map((f) => f.answer).join(" ").toLowerCase();
    // The sail yacht does NOT enter the cave (mast clearance) — guard the known hallucination.
    expect(text).toContain("mast");
  });
});
