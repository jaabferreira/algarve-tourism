/**
 * Consent-state persistence + Google Consent Mode v2 signal mapping.
 *
 * Pure module — no DOM, no globals — so it is unit-testable and safe to import
 * into the browser bundle. Cookie I/O lives in the CookieConsent component
 * script; this file only serializes/parses the stored value and maps a choice
 * to gtag's consent signals.
 */

/** Bump to invalidate every stored consent choice and re-prompt all visitors. */
export const CONSENT_VERSION = "v1";

export interface ConsentChoice {
  analytics: boolean;
  marketing: boolean;
}

type ConsentValue = "granted" | "denied";

export interface ConsentSignals {
  analytics_storage: ConsentValue;
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
}

/** Encode a choice as the `aty_consent` cookie value, e.g. `v1|analytics=1|marketing=0`. */
export function serializeConsent(choice: ConsentChoice): string {
  return [
    CONSENT_VERSION,
    `analytics=${choice.analytics ? 1 : 0}`,
    `marketing=${choice.marketing ? 1 : 0}`,
  ].join("|");
}

/**
 * Parse a stored cookie value. Returns null for missing, malformed, or
 * version-mismatched input — all of which mean "re-prompt this visitor".
 */
export function parseConsent(
  raw: string | null | undefined,
): ConsentChoice | null {
  if (!raw) return null;
  const parts = raw.split("|");
  if (parts[0] !== CONSENT_VERSION) return null;
  const flags = new Map<string, string>();
  for (const part of parts.slice(1)) {
    const [key, value] = part.split("=");
    if (key && value !== undefined) flags.set(key, value);
  }
  if (!flags.has("analytics") || !flags.has("marketing")) return null;
  return {
    analytics: flags.get("analytics") === "1",
    marketing: flags.get("marketing") === "1",
  };
}

/** Map a choice to the object passed to `gtag('consent', 'update', …)`. */
export function toConsentSignals(choice: ConsentChoice): ConsentSignals {
  const analytics: ConsentValue = choice.analytics ? "granted" : "denied";
  const marketing: ConsentValue = choice.marketing ? "granted" : "denied";
  return {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  };
}
