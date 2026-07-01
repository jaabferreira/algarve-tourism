import type { FHItem, NormalizedItem, SiteSource } from "../types.js";
import { slugify } from "./slugify.js";
import { getFromPrice } from "./prices.js";

const FH_BASE_URL = "https://fareharbor.com/api/external/v1";

/**
 * FareHarbor zero-commission affiliate shortnames, one per originating site.
 *
 * A booking made through an embed carrying `?asn=<shortname>` arrives in the
 * FareHarbor API tagged with that affiliate identity, which the helm reporting
 * system reads to attribute revenue per site. These strings are hard-coded in
 * the reporting system and MUST match exactly — the `-eur` currency suffix is
 * part of the shortname as FareHarbor assigns it.
 *
 * This replaces the dead `cf-<id>` custom-field URL param: FareHarbor support
 * confirmed in writing that private custom fields cannot be populated on online
 * bookings, so that param was silently dropped on every booking.
 */
const FH_AFFILIATE_SHORTNAME: Record<SiteSource, string> = {
  "atlantis-tours": "atlantis-tours-eur",
  any: "any-eur",
};

interface FHEmbedUrlOptions {
  /** FareHarbor operator account, e.g. `atlantistours`. */
  companyShortname: string;
  /** Originating website — selects the affiliate shortname (`asn`). */
  siteSource: SiteSource;
  /** Originating site domain, e.g. `atlantistours.pt` — for FH dashboard `ref`/`button-tags`. */
  domain: string;
  /** When set, builds a single-item embed; otherwise a company-wide embed. */
  itemPk?: number;
  /** FareHarbor flow id, for company-wide embeds (the header "Book now" CTA). */
  flow?: string;
  /**
   * Page locale as a FareHarbor language code (e.g. `es`, `fr`). When set, the
   * lightframe booking modal opens in this language to match the localized page
   * it was launched from. The customer can still switch language in FareHarbor's
   * own menu, so this sets the default rather than locking it.
   */
  language?: string;
}

/**
 * Builds a FareHarbor lightframe embed URL with affiliate attribution.
 *
 * `asn` carries the originating site to the reporting system; `ref` and
 * `button-tags` feed FareHarbor's own dashboard conversion tracking.
 */
export function buildFHEmbedUrl({
  companyShortname,
  siteSource,
  domain,
  itemPk,
  flow,
  language,
}: FHEmbedUrlOptions): string {
  const path = itemPk !== undefined ? `items/${itemPk}/` : "";

  const params = new URLSearchParams();
  params.set("button-tags", domain);
  params.set("ref", domain);
  params.set("asn", FH_AFFILIATE_SHORTNAME[siteSource]);
  params.set("full-items", "yes");
  if (flow !== undefined) params.set("flow", flow);
  if (language !== undefined) params.set("language", language);

  return `https://fareharbor.com/embeds/book/${companyShortname}/${path}?${params}`;
}

interface FHClientConfig {
  appKey: string;
  userKey: string;
}

export function createFHClient(config: FHClientConfig) {
  const headers = {
    "X-FareHarbor-API-App": config.appKey,
    "X-FareHarbor-API-User": config.userKey,
    "Content-Type": "application/json",
  };

  return {
    async getItems(shortname: string, lang?: string): Promise<FHItem[]> {
      const params = lang ? `?language=${lang}` : "";
      const url = `${FH_BASE_URL}/companies/${shortname}/items/${params}`;
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(
          `FH API error: ${response.status} ${response.statusText} for ${url}`,
        );
      }
      const data = await response.json();
      return data.items as FHItem[];
    },
  };
}

const CATEGORY_OVERRIDES: Record<number, string> = {};

const CATEGORY_RULES: [RegExp, string][] = [
  [/Transfer/i, "transfers"],
  [/Passeio de (?:dia inteiro|meio dia)|Dia inteiro O Melhor/i, "land-tours"],
  [/Restaurante|Noite (?:de Fado|Árabe|Espanhola)|Chef em Casa/i, "gastronomy"],
  [/Centro de Check|Check-in Centre|Massagens|Ginásio|Guardar Bagagem|BEM ESTAR|Duche|Vestiário|Shower|Changing Room/i, "spa"],
];

function categorizeItem(item: FHItem): string {
  if (CATEGORY_OVERRIDES[item.pk]) return CATEGORY_OVERRIDES[item.pk];
  for (const [pattern, category] of CATEGORY_RULES) {
    if (pattern.test(item.name)) return category;
  }
  return "boats";
}

export function normalizeItem(
  item: FHItem,
  overrides?: { category?: string; slug?: string },
): NormalizedItem {
  const firstLocation = item.locations[0] ?? null;

  return {
    pk: item.pk,
    name: item.name,
    headline: item.headline,
    slug: overrides?.slug ?? slugify(item.name),
    description_html: item.description_safe_html,
    description_text: item.description_text,
    description_bullets: item.description_bullets,
    image_url: item.image_cdn_url,
    images: item.images.map((img) => ({
      url: img.image_cdn_url,
      gallery: img.gallery,
    })),
    location: firstLocation
      ? {
          latitude: firstLocation.latitude,
          longitude: firstLocation.longitude,
          address: firstLocation.address.street,
          city: firstLocation.address.city,
        }
      : null,
    price_from: getFromPrice(item.customer_prototypes),
    price_from_including_tax: item.customer_prototypes.length > 0
      ? Math.min(...item.customer_prototypes.map((p) => p.total_including_tax))
      : 0,
    customer_types: item.customer_prototypes.map((p) => ({
      name: p.display_name,
      price: p.total,
    })),
    cancellation_policy_html: item.cancellation_policy_safe_html,
    category: overrides?.category ?? categorizeItem(item),
  };
}
