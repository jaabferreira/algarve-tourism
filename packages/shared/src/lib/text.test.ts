import { describe, it, expect } from "vitest";
import { truncateAtWord } from "./text.js";

describe("truncateAtWord()", () => {
  it("returns the text unchanged when it is within the limit", () => {
    expect(truncateAtWord("Short and sweet.", 155)).toBe("Short and sweet.");
  });

  it("returns the text unchanged when it is exactly at the limit", () => {
    const text = "x".repeat(20);
    expect(truncateAtWord(text, 20)).toBe(text);
  });

  it("truncates at the last word boundary and appends an ellipsis", () => {
    const text =
      "Meet at the Portimao dock and get ready for an unforgettable adventure. After a brief but important safety briefing, board an agile boat, ready to explore the world";
    const result = truncateAtWord(text, 80);
    expect(result.length).toBeLessThanOrEqual(80);
    expect(result.endsWith("…")).toBe(true);
    expect(result).not.toMatch(/\s…$/); // no space before the ellipsis
    // never cuts mid-word: everything before the ellipsis is a prefix of a whole word
    const body = result.slice(0, -1);
    expect(text.startsWith(body.trimEnd())).toBe(true);
    expect(text[body.trimEnd().length]).toBe(" ");
  });

  it("strips trailing punctuation and whitespace before the ellipsis", () => {
    expect(truncateAtWord("One two three, four five six.", 18)).toBe(
      "One two three…",
    );
  });

  it("hard-cuts when there is no word boundary within the limit", () => {
    expect(truncateAtWord("Supercalifragilisticexpialidocious", 10)).toBe(
      "Supercali…",
    );
  });

  it("collapses internal whitespace runs while measuring", () => {
    expect(truncateAtWord("alpha   beta   gamma   delta", 14)).toBe(
      "alpha beta…",
    );
  });
});
