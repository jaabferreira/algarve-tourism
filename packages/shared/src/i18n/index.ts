import type { Locale } from "../types.js";
import type { TranslationKey, TranslationStrings } from "./types.js";
import en from "./locales/en.json" with { type: "json" };
import pt from "./locales/pt.json" with { type: "json" };
import es from "./locales/es.json" with { type: "json" };
import fr from "./locales/fr.json" with { type: "json" };

const translations: Record<Locale, TranslationStrings> = {
  en: en as TranslationStrings,
  pt: pt as TranslationStrings,
  es: es as TranslationStrings,
  fr: fr as TranslationStrings,
};

const VALID_LOCALES = new Set<string>(["en", "pt", "es", "fr"]);

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

export function getLocaleFromPath(path: string): Locale {
  const segment = path.split("/").filter(Boolean)[0];
  if (segment && VALID_LOCALES.has(segment)) {
    return segment as Locale;
  }
  return "en";
}

export function getPathInLocale(path: string, targetLocale: Locale): string {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return `/${targetLocale}/`;
  const currentLocale = segments[0];
  if (VALID_LOCALES.has(currentLocale)) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  return `/${segments.join("/")}/`.replace(/\/+/g, "/");
}

export type { TranslationKey, TranslationStrings } from "./types.js";
