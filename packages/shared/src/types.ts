export interface BrandConfig {
  name: string;
  domain: string;
  tagline: string;
  fh: {
    shortname: string;
    categories: string[];
  };
  logo: string;
  social: {
    instagram: string;
    facebook: string;
    whatsapp: string;
    youtube?: string;
  };
  analytics: {
    gtag: string;
  };
  defaultLocale: Locale;
  locales: Locale[];
}

export type Locale = "en" | "pt" | "es" | "fr";

export const LOCALES: Locale[] = ["en", "pt", "es", "fr"];

export interface FHItem {
  pk: number;
  name: string;
  headline: string;
  description: string;
  description_text: string;
  description_safe_html: string;
  description_bullets: string[];
  image_cdn_url: string;
  images: FHImage[];
  locations: FHLocation[];
  customer_prototypes: FHCustomerPrototype[];
  cancellation_policy: string;
  cancellation_policy_safe_html: string;
  is_pickup_ever_available: boolean;
}

export interface FHImage {
  pk: number;
  image_cdn_url: string;
  gallery: string;
}

export interface FHLocation {
  pk: number;
  type: string;
  note: string;
  note_safe_html: string;
  latitude: number;
  longitude: number;
  google_place_id: string;
  tripadvisor_url: string;
  address: {
    street: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
  };
}

export interface FHCustomerPrototype {
  pk: number;
  display_name: string;
  total: number;
  total_including_tax: number;
  note: string;
}

export interface NormalizedItem {
  pk: number;
  name: string;
  headline: string;
  slug: string;
  description_html: string;
  description_text: string;
  description_bullets: string[];
  image_url: string;
  images: { url: string; gallery: string }[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
  } | null;
  price_from: number;
  price_from_including_tax: number;
  customer_types: { name: string; price: number }[];
  cancellation_policy_html: string;
  category: string;
}

export interface ManualReview {
  author: string;
  origin: string;
  rating: number;
  text: string;
  date: string;
  product_slug?: string;
}
