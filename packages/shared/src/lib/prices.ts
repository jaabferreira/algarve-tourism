import type { FHCustomerPrototype } from "../types.js";

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

export function getFromPrice(prototypes: FHCustomerPrototype[]): number {
  if (prototypes.length === 0) return 0;
  return Math.min(...prototypes.map((p) => p.total));
}
