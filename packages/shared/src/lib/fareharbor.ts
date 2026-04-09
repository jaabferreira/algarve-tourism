import type { FHItem, NormalizedItem } from "../types.js";
import { slugify } from "./slugify.js";
import { getFromPrice } from "./prices.js";

const FH_BASE_URL = "https://fareharbor.com/api/external/v1";

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
    async getItems(shortname: string): Promise<FHItem[]> {
      const url = `${FH_BASE_URL}/companies/${shortname}/items/`;
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

export function normalizeItem(item: FHItem, category: string): NormalizedItem {
  const firstLocation = item.locations[0] ?? null;

  return {
    pk: item.pk,
    name: item.name,
    headline: item.headline,
    slug: slugify(item.name),
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
    category,
  };
}
