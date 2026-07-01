import { describe, it, expect } from "vitest";
import { parseDescription } from "./description.js";

// Mirrors the real FareHarbor description shape: known display labels
// interleaved with non-rendered structural keys (max_age, group_size,
// highlights, check_in_details, special_requirements).
const FH_HTML =
  "<p>duration: 1 hora y 30 minutos<br>\n" +
  "max_age: 99<br>\n" +
  "group_size: 99 pasajeros<br>\n" +
  "accessibility: No accesible para sillas de ruedas.<br>\n" +
  "description: Preséntese en el muelle de Portimão.</p>\n" +
  "<p>itinerary: 1. Portimão<br>\n2. Algar Seco<br>\n" +
  "highlights: - Navega por aguas cristalinas<br>\n" +
  "check_in_details: Llegue 20 minutos antes.<br>\n" +
  "special_requirements: Los menores deben ir acompañados.</p>";

describe("parseDescription()", () => {
  it("extracts the clean duration without absorbing following structural keys", () => {
    const parsed = parseDescription(FH_HTML);
    expect(parsed.duration).toBe("1 hora y 30 minutos");
  });

  it("extracts the itinerary stops without leaking later structural keys", () => {
    const parsed = parseDescription(FH_HTML);
    expect(parsed.itinerary).toEqual(["Portimão", "Algar Seco"]);
  });

  it("never surfaces raw FareHarbor field keys anywhere in the output", () => {
    const parsed = parseDescription(FH_HTML);
    const blob = JSON.stringify(parsed);
    for (const key of [
      "max_age",
      "group_size",
      "highlights",
      "check_in_details",
      "special_requirements",
    ]) {
      expect(blob).not.toContain(key);
    }
  });

  it("still captures the narrative description", () => {
    const parsed = parseDescription(FH_HTML);
    expect(parsed.description).toContain("Preséntese en el muelle");
  });
});
