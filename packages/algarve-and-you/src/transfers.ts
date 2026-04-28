import type { Locale } from "@algarve-tourism/shared";
import { t } from "@algarve-tourism/shared";

type Airport = "faro" | "lisbon";
type VariantKind = "oneway-out" | "oneway-in" | "round-trip";

interface TransferVariant {
  kind: VariantKind;
  airport: Airport;
  destination: string;
}

const TRANSFER_VARIANTS: Record<number, TransferVariant> = {
  // Faro
  718075: { kind: "oneway-out", airport: "faro", destination: "Albufeira" },
  720350: { kind: "oneway-in", airport: "faro", destination: "Albufeira" },
  718083: { kind: "oneway-out", airport: "faro", destination: "Portimão/Carvoeiro" },
  720354: { kind: "round-trip", airport: "faro", destination: "Portimão/Carvoeiro" },
  718087: { kind: "oneway-out", airport: "faro", destination: "Armação de Pêra" },
  720356: { kind: "oneway-in", airport: "faro", destination: "Armação de Pêra" },
  718096: { kind: "oneway-out", airport: "faro", destination: "Vilamoura/Almancil" },
  720357: { kind: "oneway-in", airport: "faro", destination: "Vilamoura/Almancil" },
  // Lisbon
  718103: { kind: "oneway-out", airport: "lisbon", destination: "Albufeira" },
  720358: { kind: "oneway-in", airport: "lisbon", destination: "Albufeira" },
  718109: { kind: "oneway-out", airport: "lisbon", destination: "Portimão/Carvoeiro" },
  720361: { kind: "round-trip", airport: "lisbon", destination: "Portimão/Carvoeiro" },
  718112: { kind: "oneway-out", airport: "lisbon", destination: "Armação de Pêra" },
  720362: { kind: "oneway-in", airport: "lisbon", destination: "Armação de Pêra" },
  718115: { kind: "oneway-out", airport: "lisbon", destination: "Vilamoura/Almancil" },
  720365: { kind: "oneway-in", airport: "lisbon", destination: "Vilamoura/Almancil" },
};

export function getTransferVariant(pk: number): TransferVariant | undefined {
  return TRANSFER_VARIANTS[pk];
}

export function transferLabel(pk: number, locale: Locale): string | undefined {
  const v = TRANSFER_VARIANTS[pk];
  if (!v) return undefined;
  const airportName = t(locale, `transfer.airport.${v.airport}`);
  if (v.kind === "round-trip") {
    return `${t(locale, "transfer.roundtrip")} · ${airportName} ⇆ ${v.destination}`;
  }
  if (v.kind === "oneway-out") {
    return `${t(locale, "transfer.oneway")} · ${airportName} → ${v.destination}`;
  }
  return `${t(locale, "transfer.oneway")} · ${v.destination} → ${airportName}`;
}

export type DestinationGroup = {
  airport: Airport;
  destination: string;
  primaryPk: number;
  variantPks: number[];
};

const DESTINATIONS_BY_AIRPORT: Record<Airport, DestinationGroup[]> = {
  faro: [
    { airport: "faro", destination: "Albufeira", primaryPk: 718075, variantPks: [720350] },
    { airport: "faro", destination: "Portimão/Carvoeiro", primaryPk: 718083, variantPks: [720354] },
    { airport: "faro", destination: "Armação de Pêra", primaryPk: 718087, variantPks: [720356] },
    { airport: "faro", destination: "Vilamoura/Almancil", primaryPk: 718096, variantPks: [720357] },
  ],
  lisbon: [
    { airport: "lisbon", destination: "Albufeira", primaryPk: 718103, variantPks: [720358] },
    { airport: "lisbon", destination: "Portimão/Carvoeiro", primaryPk: 718109, variantPks: [720361] },
    { airport: "lisbon", destination: "Armação de Pêra", primaryPk: 718112, variantPks: [720362] },
    { airport: "lisbon", destination: "Vilamoura/Almancil", primaryPk: 718115, variantPks: [720365] },
  ],
};

export function getDestinationsForAirport(airport: Airport): DestinationGroup[] {
  return DESTINATIONS_BY_AIRPORT[airport];
}

export const AIRPORTS: Airport[] = ["faro", "lisbon"];
export type { Airport, VariantKind, TransferVariant };
