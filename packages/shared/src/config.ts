import type { BrandConfig, Locale } from "./types.js";

export function getLocalePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

export function getAlternateLocales(
  config: BrandConfig,
  _currentLocale: Locale,
  path: string,
): { locale: Locale; href: string }[] {
  return config.locales.map((locale) => ({
    locale,
    href: `https://www.${config.domain}${getLocalePath(locale, path)}`,
  }));
}
