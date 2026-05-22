# FareHarbor Cookie Consent + Google Consent Mode v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a custom cookie-consent banner wired to Google Consent Mode v2, shared by both Astro sites, so analytics/ad cookies (and FareHarbor's lightframe tracking) only load with the visitor's consent.

**Architecture:** A pure `consent.ts` module (serialize/parse the consent cookie + map a choice to gtag consent signals) is unit-tested. A shared `CookieConsent.astro` component renders the banner + preferences modal and owns the browser interaction. `PageLayout.astro` gets an `is:inline` Consent Mode v2 bootstrap in `<head>` (consent defaults to denied, before `gtag('config')`) and renders the component. `Footer.astro` gets a "Cookie settings" button that reopens the modal. The privacy page's cookie section is expanded.

**Tech Stack:** Astro 5, TypeScript, Vitest, pnpm workspaces, Google Consent Mode v2 (`gtag`).

**Spec:** `docs/superpowers/specs/2026-05-22-fareharbor-consent-mode-v2-design.md`

---

## Task 1: Consent logic module (`consent.ts`)

Pure, DOM-free serialize/parse + signal-mapping logic. Unit-tested. Safe to import into the browser bundle.

**Files:**
- Create: `packages/shared/src/lib/consent.ts`
- Test: `packages/shared/src/lib/consent.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/shared/src/lib/consent.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  serializeConsent,
  parseConsent,
  toConsentSignals,
  CONSENT_VERSION,
} from "./consent.js";

describe("serializeConsent()", () => {
  it("encodes both categories granted", () => {
    expect(serializeConsent({ analytics: true, marketing: true })).toBe(
      "v1|analytics=1|marketing=1",
    );
  });

  it("encodes both categories denied", () => {
    expect(serializeConsent({ analytics: false, marketing: false })).toBe(
      "v1|analytics=0|marketing=0",
    );
  });

  it("starts with the current consent version", () => {
    expect(
      serializeConsent({ analytics: true, marketing: false }).startsWith(
        CONSENT_VERSION + "|",
      ),
    ).toBe(true);
  });
});

describe("parseConsent()", () => {
  it("round-trips a serialized value", () => {
    const raw = serializeConsent({ analytics: true, marketing: false });
    expect(parseConsent(raw)).toEqual({ analytics: true, marketing: false });
  });

  it("returns null for null or empty input", () => {
    expect(parseConsent(null)).toBeNull();
    expect(parseConsent(undefined)).toBeNull();
    expect(parseConsent("")).toBeNull();
  });

  it("returns null for a malformed value", () => {
    expect(parseConsent("garbage")).toBeNull();
    expect(parseConsent("v1|analytics=1")).toBeNull();
  });

  it("returns null for a version mismatch (forces a re-prompt)", () => {
    expect(parseConsent("v0|analytics=1|marketing=1")).toBeNull();
  });
});

describe("toConsentSignals()", () => {
  it("maps analytics to analytics_storage only", () => {
    expect(toConsentSignals({ analytics: true, marketing: false })).toEqual({
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });

  it("maps marketing to all three ad signals", () => {
    expect(toConsentSignals({ analytics: false, marketing: true })).toEqual({
      analytics_storage: "denied",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm vitest run packages/shared/src/lib/consent.test.ts`
Expected: FAIL — `Failed to resolve import "./consent.js"` (the module does not exist yet).

- [ ] **Step 3: Write the implementation**

Create `packages/shared/src/lib/consent.ts`:

```ts
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm vitest run packages/shared/src/lib/consent.test.ts`
Expected: PASS — all 11 tests green.

- [ ] **Step 5: Commit**

```bash
git add packages/shared/src/lib/consent.ts packages/shared/src/lib/consent.test.ts
git commit -m "feat(consent): consent-cookie serialize/parse + Consent Mode v2 signal mapping"
```

---

## Task 2: Translation keys (4 locales)

Add the banner/modal/footer/privacy keys to the `TranslationStrings` interface and all four locale JSON files. `t()` falls back to English for any missing key, but every locale gets a real translation here.

**Files:**
- Modify: `packages/shared/src/i18n/types.ts`
- Modify: `packages/shared/src/i18n/locales/en.json`
- Modify: `packages/shared/src/i18n/locales/pt.json`
- Modify: `packages/shared/src/i18n/locales/es.json`
- Modify: `packages/shared/src/i18n/locales/fr.json`

- [ ] **Step 1: Add the keys to the `TranslationStrings` interface**

In `packages/shared/src/i18n/types.ts`, find the line `  "home.view_all_posts": string;` (the last key, immediately before the interface's closing `}`). Replace it with:

```ts
  "home.view_all_posts": string;

  "consent.banner_text": string;
  "consent.accept_all": string;
  "consent.reject_all": string;
  "consent.customize": string;
  "consent.policy_link": string;
  "consent.prefs_title": string;
  "consent.prefs_intro": string;
  "consent.cat_necessary": string;
  "consent.cat_necessary_desc": string;
  "consent.always_on": string;
  "consent.cat_analytics": string;
  "consent.cat_analytics_desc": string;
  "consent.cat_marketing": string;
  "consent.cat_marketing_desc": string;
  "consent.save": string;
  "consent.close": string;
  "footer.cookie_settings": string;
  "privacy.cookies_necessary": string;
  "privacy.cookies_analytics": string;
  "privacy.cookies_marketing": string;
  "privacy.cookies_manage": string;
```

- [ ] **Step 2: Add English strings**

In `packages/shared/src/i18n/locales/en.json`, the file ends with `  "home.view_all_posts": "View all posts"` then `}`. Add a comma after that value and insert the block before the closing `}`:

```json
  "home.view_all_posts": "View all posts",
  "consent.banner_text": "We use cookies to measure site traffic and improve your experience. Accept all, reject non-essential cookies, or choose what to allow.",
  "consent.accept_all": "Accept all",
  "consent.reject_all": "Reject all",
  "consent.customize": "Customize",
  "consent.policy_link": "Cookie details",
  "consent.prefs_title": "Cookie preferences",
  "consent.prefs_intro": "Choose which cookies we may use. You can change this at any time from the “Cookie settings” link in the footer.",
  "consent.cat_necessary": "Necessary",
  "consent.cat_necessary_desc": "Required for the website and the FareHarbor booking system to work. Always active.",
  "consent.always_on": "Always on",
  "consent.cat_analytics": "Analytics",
  "consent.cat_analytics_desc": "Google Analytics — helps us understand how visitors use the site. Off until you allow it.",
  "consent.cat_marketing": "Marketing",
  "consent.cat_marketing_desc": "Lets us measure advertising performance. Off until you allow it.",
  "consent.save": "Save preferences",
  "consent.close": "Close",
  "footer.cookie_settings": "Cookie settings",
  "privacy.cookies_necessary": "<strong>Necessary</strong> — required for the website and the FareHarbor booking system to function. Always active.",
  "privacy.cookies_analytics": "<strong>Analytics</strong> — Google Analytics cookies (_ga, _gid) measure how visitors use the site. Loaded only with your consent.",
  "privacy.cookies_marketing": "<strong>Marketing</strong> — used to measure advertising performance. Loaded only with your consent.",
  "privacy.cookies_manage": "You can change or withdraw your consent at any time using the “Cookie settings” link in the website footer."
}
```

- [ ] **Step 3: Add Portuguese strings**

In `packages/shared/src/i18n/locales/pt.json`, the file ends with `  "home.view_all_posts": "Ver todos os artigos"` then `}`. Add a comma and insert before the closing `}`:

```json
  "home.view_all_posts": "Ver todos os artigos",
  "consent.banner_text": "Utilizamos cookies para medir o tráfego do site e melhorar a sua experiência. Aceite todos, rejeite os não essenciais ou escolha o que permitir.",
  "consent.accept_all": "Aceitar todos",
  "consent.reject_all": "Rejeitar todos",
  "consent.customize": "Personalizar",
  "consent.policy_link": "Detalhes dos cookies",
  "consent.prefs_title": "Preferências de cookies",
  "consent.prefs_intro": "Escolha que cookies podemos utilizar. Pode alterar esta opção a qualquer momento através da ligação “Definições de cookies” no rodapé.",
  "consent.cat_necessary": "Necessários",
  "consent.cat_necessary_desc": "Necessários para o funcionamento do site e do sistema de reservas FareHarbor. Sempre ativos.",
  "consent.always_on": "Sempre ativos",
  "consent.cat_analytics": "Análise",
  "consent.cat_analytics_desc": "Google Analytics — ajuda-nos a perceber como os visitantes utilizam o site. Desativado até autorizar.",
  "consent.cat_marketing": "Marketing",
  "consent.cat_marketing_desc": "Permite-nos medir o desempenho da publicidade. Desativado até autorizar.",
  "consent.save": "Guardar preferências",
  "consent.close": "Fechar",
  "footer.cookie_settings": "Definições de cookies",
  "privacy.cookies_necessary": "<strong>Necessários</strong> — necessários para o funcionamento do site e do sistema de reservas FareHarbor. Sempre ativos.",
  "privacy.cookies_analytics": "<strong>Análise</strong> — os cookies do Google Analytics (_ga, _gid) medem como os visitantes utilizam o site. Carregados apenas com o seu consentimento.",
  "privacy.cookies_marketing": "<strong>Marketing</strong> — utilizados para medir o desempenho da publicidade. Carregados apenas com o seu consentimento.",
  "privacy.cookies_manage": "Pode alterar ou retirar o seu consentimento a qualquer momento através da ligação “Definições de cookies” no rodapé do site."
}
```

- [ ] **Step 4: Add Spanish strings**

In `packages/shared/src/i18n/locales/es.json`, the file ends with `  "home.view_all_posts": "Ver todos los artículos"` then `}`. Add a comma and insert before the closing `}`:

```json
  "home.view_all_posts": "Ver todos los artículos",
  "consent.banner_text": "Utilizamos cookies para medir el tráfico del sitio y mejorar su experiencia. Acepte todas, rechace las no esenciales o elija qué permitir.",
  "consent.accept_all": "Aceptar todas",
  "consent.reject_all": "Rechazar todas",
  "consent.customize": "Personalizar",
  "consent.policy_link": "Detalles de las cookies",
  "consent.prefs_title": "Preferencias de cookies",
  "consent.prefs_intro": "Elija qué cookies podemos utilizar. Puede cambiar esta opción en cualquier momento desde el enlace “Configuración de cookies” en el pie de página.",
  "consent.cat_necessary": "Necesarias",
  "consent.cat_necessary_desc": "Necesarias para que el sitio web y el sistema de reservas FareHarbor funcionen. Siempre activas.",
  "consent.always_on": "Siempre activas",
  "consent.cat_analytics": "Analítica",
  "consent.cat_analytics_desc": "Google Analytics — nos ayuda a entender cómo los visitantes usan el sitio. Desactivado hasta que lo permita.",
  "consent.cat_marketing": "Marketing",
  "consent.cat_marketing_desc": "Nos permite medir el rendimiento de la publicidad. Desactivado hasta que lo permita.",
  "consent.save": "Guardar preferencias",
  "consent.close": "Cerrar",
  "footer.cookie_settings": "Configuración de cookies",
  "privacy.cookies_necessary": "<strong>Necesarias</strong> — necesarias para que el sitio web y el sistema de reservas FareHarbor funcionen. Siempre activas.",
  "privacy.cookies_analytics": "<strong>Analítica</strong> — las cookies de Google Analytics (_ga, _gid) miden cómo los visitantes usan el sitio. Se cargan solo con su consentimiento.",
  "privacy.cookies_marketing": "<strong>Marketing</strong> — se utilizan para medir el rendimiento de la publicidad. Se cargan solo con su consentimiento.",
  "privacy.cookies_manage": "Puede cambiar o retirar su consentimiento en cualquier momento mediante el enlace “Configuración de cookies” en el pie de página del sitio."
}
```

- [ ] **Step 5: Add French strings**

In `packages/shared/src/i18n/locales/fr.json`, the file ends with `  "home.view_all_posts": "Voir tous les articles"` then `}`. Add a comma and insert before the closing `}`:

```json
  "home.view_all_posts": "Voir tous les articles",
  "consent.banner_text": "Nous utilisons des cookies pour mesurer le trafic du site et améliorer votre expérience. Acceptez tout, refusez les cookies non essentiels ou choisissez ce que vous autorisez.",
  "consent.accept_all": "Tout accepter",
  "consent.reject_all": "Tout refuser",
  "consent.customize": "Personnaliser",
  "consent.policy_link": "Détails des cookies",
  "consent.prefs_title": "Préférences de cookies",
  "consent.prefs_intro": "Choisissez les cookies que nous pouvons utiliser. Vous pouvez modifier ce choix à tout moment via le lien « Paramètres des cookies » dans le pied de page.",
  "consent.cat_necessary": "Nécessaires",
  "consent.cat_necessary_desc": "Nécessaires au fonctionnement du site et du système de réservation FareHarbor. Toujours actifs.",
  "consent.always_on": "Toujours actifs",
  "consent.cat_analytics": "Analyse",
  "consent.cat_analytics_desc": "Google Analytics — nous aide à comprendre comment les visiteurs utilisent le site. Désactivé tant que vous ne l'autorisez pas.",
  "consent.cat_marketing": "Marketing",
  "consent.cat_marketing_desc": "Nous permet de mesurer la performance publicitaire. Désactivé tant que vous ne l'autorisez pas.",
  "consent.save": "Enregistrer les préférences",
  "consent.close": "Fermer",
  "footer.cookie_settings": "Paramètres des cookies",
  "privacy.cookies_necessary": "<strong>Nécessaires</strong> — nécessaires au fonctionnement du site et du système de réservation FareHarbor. Toujours actifs.",
  "privacy.cookies_analytics": "<strong>Analyse</strong> — les cookies Google Analytics (_ga, _gid) mesurent la façon dont les visiteurs utilisent le site. Chargés uniquement avec votre consentement.",
  "privacy.cookies_marketing": "<strong>Marketing</strong> — utilisés pour mesurer la performance publicitaire. Chargés uniquement avec votre consentement.",
  "privacy.cookies_manage": "Vous pouvez modifier ou retirer votre consentement à tout moment via le lien « Paramètres des cookies » dans le pied de page du site."
}
```

- [ ] **Step 6: Verify the JSON is valid and tests still pass**

Run: `node -e "['en','pt','es','fr'].forEach(l=>require('./packages/shared/src/i18n/locales/'+l+'.json'))" && pnpm test`
Expected: no JSON parse error; all existing tests still PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/shared/src/i18n/types.ts packages/shared/src/i18n/locales/
git commit -m "feat(i18n): cookie-consent banner + privacy strings (en/pt/es/fr)"
```

---

## Task 3: `CookieConsent.astro` component

The shared banner + preferences modal + browser interaction script.

**Files:**
- Create: `packages/shared/src/components/CookieConsent.astro`

- [ ] **Step 1: Create the component**

Create `packages/shared/src/components/CookieConsent.astro` with this exact content:

```astro
---
import type { BrandConfig, Locale } from "../types.js";
import { t } from "../i18n/index.js";
import { getLocalePath } from "../config.js";

interface Props {
  config: BrandConfig;
  locale: Locale;
}

const { config, locale } = Astro.props;
const brand = config.brand;
const cookieDetailsHref = `${getLocalePath(locale, "/privacy/")}#cookies`;
---

<div class="cookie" data-brand={brand}>
  <div class="cookie-banner" role="region" aria-label={t(locale, "consent.prefs_title")}>
    <p class="cookie-banner__text">
      {t(locale, "consent.banner_text")}
      <a href={cookieDetailsHref}>{t(locale, "consent.policy_link")}</a>
    </p>
    <div class="cookie-banner__actions">
      <button type="button" class="cookie-btn cookie-btn--ghost" data-consent-customize>
        {t(locale, "consent.customize")}
      </button>
      <button type="button" class="cookie-btn cookie-btn--ghost" data-consent-reject>
        {t(locale, "consent.reject_all")}
      </button>
      <button type="button" class="cookie-btn cookie-btn--solid" data-consent-accept>
        {t(locale, "consent.accept_all")}
      </button>
    </div>
  </div>

  <div class="cookie-prefs" hidden>
    <div class="cookie-prefs__backdrop" data-consent-close></div>
    <div
      class="cookie-prefs__dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-prefs-title"
    >
      <div class="cookie-prefs__head">
        <h2 id="cookie-prefs-title">{t(locale, "consent.prefs_title")}</h2>
        <button
          type="button"
          class="cookie-prefs__close"
          data-consent-close
          aria-label={t(locale, "consent.close")}
        >&times;</button>
      </div>
      <p class="cookie-prefs__intro">{t(locale, "consent.prefs_intro")}</p>

      <div class="cookie-cat">
        <div class="cookie-cat__row">
          <span class="cookie-cat__name">{t(locale, "consent.cat_necessary")}</span>
          <span class="cookie-cat__lock">{t(locale, "consent.always_on")}</span>
        </div>
        <p class="cookie-cat__desc">{t(locale, "consent.cat_necessary_desc")}</p>
      </div>

      <label class="cookie-cat">
        <div class="cookie-cat__row">
          <span class="cookie-cat__name">{t(locale, "consent.cat_analytics")}</span>
          <input type="checkbox" data-consent-toggle="analytics" />
        </div>
        <p class="cookie-cat__desc">{t(locale, "consent.cat_analytics_desc")}</p>
      </label>

      <label class="cookie-cat">
        <div class="cookie-cat__row">
          <span class="cookie-cat__name">{t(locale, "consent.cat_marketing")}</span>
          <input type="checkbox" data-consent-toggle="marketing" />
        </div>
        <p class="cookie-cat__desc">{t(locale, "consent.cat_marketing_desc")}</p>
      </label>

      <div class="cookie-prefs__actions">
        <button type="button" class="cookie-btn cookie-btn--solid" data-consent-save>
          {t(locale, "consent.save")}
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Banner — fixed to the viewport bottom, so it never causes layout shift. */
  .cookie-banner {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    gap: var(--space-6);
    flex-wrap: wrap;
    padding: var(--space-4) var(--space-6);
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
  }

  /* The PageLayout head bootstrap sets data-consent="set" when a valid cookie
     exists — keeps returning visitors from ever seeing a banner flash. */
  :global(html[data-consent="set"]) .cookie-banner {
    display: none;
  }

  .cookie-banner__text {
    flex: 1 1 320px;
    margin: 0;
    font-size: 13px;
    line-height: var(--leading-normal);
    color: var(--color-text-body);
  }

  .cookie-banner__text a {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .cookie-banner__actions {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  .cookie-btn {
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-button);
    cursor: pointer;
    border: 1px solid var(--color-border);
    transition: background var(--transition-fast), color var(--transition-fast);
  }

  .cookie-btn--ghost {
    background: transparent;
    color: var(--color-text);
  }

  .cookie-btn--ghost:hover {
    background: var(--color-bg);
  }

  .cookie-btn--solid {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: #fff;
  }

  .cookie-btn--solid:hover {
    background: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
  }

  /* Preferences modal */
  .cookie-prefs {
    position: fixed;
    inset: 0;
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-4);
  }

  .cookie-prefs[hidden] {
    display: none;
  }

  .cookie-prefs__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(10, 26, 42, 0.55);
  }

  .cookie-prefs__dialog {
    position: relative;
    width: 100%;
    max-width: 460px;
    max-height: 85vh;
    overflow-y: auto;
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: var(--space-6);
  }

  .cookie-prefs__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .cookie-prefs__head h2 {
    margin: 0;
    font-size: 18px;
    font-family: var(--font-display);
  }

  .cookie-prefs__close {
    background: none;
    border: none;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    color: var(--color-text-muted);
    padding: 0 var(--space-1);
  }

  .cookie-prefs__intro {
    margin: var(--space-3) 0 var(--space-5);
    font-size: 13px;
    line-height: var(--leading-normal);
    color: var(--color-text-body);
  }

  .cookie-cat {
    display: block;
    padding: var(--space-4) 0;
    border-top: 1px solid var(--color-border);
  }

  label.cookie-cat {
    cursor: pointer;
  }

  .cookie-cat__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .cookie-cat__name {
    font-weight: 600;
    color: var(--color-text);
  }

  .cookie-cat__lock {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .cookie-cat__desc {
    margin: var(--space-2) 0 0;
    font-size: 13px;
    line-height: var(--leading-normal);
    color: var(--color-text-body);
  }

  .cookie-cat input {
    width: 18px;
    height: 18px;
    accent-color: var(--color-primary);
    cursor: pointer;
  }

  .cookie-prefs__actions {
    margin-top: var(--space-5);
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 560px) {
    .cookie-banner__actions {
      width: 100%;
    }
    .cookie-banner__actions .cookie-btn {
      flex: 1 1 auto;
    }
  }
</style>

<script>
  import { serializeConsent, parseConsent, toConsentSignals } from "../lib/consent.js";

  const COOKIE_NAME = "aty_consent";
  const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

  function readConsentCookie(): string | null {
    const match = document.cookie.match(/(?:^|; )aty_consent=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  function writeConsentCookie(value: string): void {
    document.cookie =
      COOKIE_NAME +
      "=" +
      encodeURIComponent(value) +
      "; path=/; max-age=" +
      COOKIE_MAX_AGE +
      "; SameSite=Lax; Secure";
  }

  function gtag(): void {
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  }

  const root = document.querySelector<HTMLElement>(".cookie");
  if (root) {
    const modal = root.querySelector<HTMLElement>(".cookie-prefs");
    const dialog = root.querySelector<HTMLElement>(".cookie-prefs__dialog");
    const analyticsToggle = root.querySelector<HTMLInputElement>(
      '[data-consent-toggle="analytics"]',
    );
    const marketingToggle = root.querySelector<HTMLInputElement>(
      '[data-consent-toggle="marketing"]',
    );
    let lastFocused: HTMLElement | null = null;

    function applyConsent(choice: { analytics: boolean; marketing: boolean }): void {
      gtag("consent", "update", toConsentSignals(choice));
      writeConsentCookie(serializeConsent(choice));
      document.documentElement.setAttribute("data-consent", "set");
      closeModal();
    }

    function trapFocus(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        closeModal();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>("button, input, a[href]"),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function openModal(): void {
      const stored = parseConsent(readConsentCookie());
      if (analyticsToggle) analyticsToggle.checked = stored ? stored.analytics : false;
      if (marketingToggle) marketingToggle.checked = stored ? stored.marketing : false;
      lastFocused = document.activeElement as HTMLElement;
      modal?.removeAttribute("hidden");
      dialog?.querySelector<HTMLElement>("button, input")?.focus();
      document.addEventListener("keydown", trapFocus);
    }

    function closeModal(): void {
      if (!modal || modal.hasAttribute("hidden")) return;
      modal.setAttribute("hidden", "");
      document.removeEventListener("keydown", trapFocus);
      lastFocused?.focus();
    }

    root
      .querySelector("[data-consent-accept]")
      ?.addEventListener("click", () =>
        applyConsent({ analytics: true, marketing: true }),
      );
    root
      .querySelector("[data-consent-reject]")
      ?.addEventListener("click", () =>
        applyConsent({ analytics: false, marketing: false }),
      );
    root
      .querySelector("[data-consent-customize]")
      ?.addEventListener("click", openModal);
    root.querySelector("[data-consent-save]")?.addEventListener("click", () =>
      applyConsent({
        analytics: Boolean(analyticsToggle?.checked),
        marketing: Boolean(marketingToggle?.checked),
      }),
    );
    root
      .querySelectorAll("[data-consent-close]")
      .forEach((el) => el.addEventListener("click", closeModal));

    // The footer "Cookie settings" button lives outside this component.
    document
      .querySelectorAll("[data-cookie-settings]")
      .forEach((el) => el.addEventListener("click", openModal));
  }
</script>
```

- [ ] **Step 2: Commit**

```bash
git add packages/shared/src/components/CookieConsent.astro
git commit -m "feat(consent): CookieConsent banner + preferences modal component"
```

> Note: this component is verified by the build + manual checks in Task 7. There is no DOM test harness in this repo, so it is not unit-tested.

---

## Task 4: Wire into `PageLayout.astro`

Add the Consent Mode v2 `is:inline` bootstrap to `<head>` (before `gtag('config')`), and render `<CookieConsent>` before `</body>`.

**Files:**
- Modify: `packages/shared/src/layouts/PageLayout.astro`

- [ ] **Step 1: Import the component**

In `packages/shared/src/layouts/PageLayout.astro`, find line 2:

```astro
import SEO from '../components/SEO.astro';
```

Replace it with:

```astro
import SEO from '../components/SEO.astro';
import CookieConsent from '../components/CookieConsent.astro';
```

- [ ] **Step 2: Add the Consent Mode v2 bootstrap to `<head>`**

Find this block in `<head>`:

```astro
  {config.analytics.gtag && (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.gtag}`}></script>
      <script define:vars={{ gtagId: config.analytics.gtag }}>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', gtagId);
      </script>
    </>
  )}
```

Replace it with:

```astro
  {config.analytics.gtag && (
    <>
      {/* Consent Mode v2 — must run before gtag('config'). Non-essential
          storage defaults to denied; a valid `aty_consent` cookie upgrades it.
          The 'v1|' prefix MUST match CONSENT_VERSION in lib/consent.ts. */}
      <script is:inline>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted',
          wait_for_update: 500
        });
        gtag('set', 'ads_data_redaction', true);
        gtag('set', 'url_passthrough', true);
        try {
          var fhMatch = document.cookie.match(/(?:^|; )aty_consent=([^;]*)/);
          if (fhMatch) {
            var fhConsent = decodeURIComponent(fhMatch[1]);
            if (fhConsent.indexOf('v1|') === 0) {
              var fhA = fhConsent.indexOf('analytics=1') !== -1 ? 'granted' : 'denied';
              var fhM = fhConsent.indexOf('marketing=1') !== -1 ? 'granted' : 'denied';
              gtag('consent', 'update', {
                analytics_storage: fhA,
                ad_storage: fhM,
                ad_user_data: fhM,
                ad_personalization: fhM
              });
              document.documentElement.setAttribute('data-consent', 'set');
            }
          }
        } catch (e) {}
      </script>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.gtag}`}></script>
      <script define:vars={{ gtagId: config.analytics.gtag }}>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', gtagId);
      </script>
    </>
  )}
```

- [ ] **Step 3: Render the component before `</body>`**

Find these lines near the end of the file (the end of the FareHarbor defer script):

```astro
      setTimeout(load, 30000);
    })();
  </script>
</body>
```

Replace them with:

```astro
      setTimeout(load, 30000);
    })();
  </script>
  {config.analytics.gtag && <CookieConsent config={config} locale={locale as Locale} />}
</body>
```

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/layouts/PageLayout.astro
git commit -m "feat(consent): wire Consent Mode v2 bootstrap + banner into PageLayout"
```

---

## Task 5: Footer "Cookie settings" button

Add a button to the footer bottom bar. It carries `data-cookie-settings`; the `CookieConsent` script (Task 3) already listens for clicks on that selector and opens the preferences modal.

**Files:**
- Modify: `packages/shared/src/components/Footer.astro`

- [ ] **Step 1: Add the button to the footer bottom bar**

In `packages/shared/src/components/Footer.astro`, find:

```astro
  <div class="container footer__bottom">
    <p class="footer__copy">&copy; {year} {config.name}. {t(locale, "footer.rights")}</p>
  </div>
```

Replace it with:

```astro
  <div class="container footer__bottom">
    <p class="footer__copy">&copy; {year} {config.name}. {t(locale, "footer.rights")}</p>
    <button type="button" class="footer__cookie-btn" data-cookie-settings>
      {t(locale, "footer.cookie_settings")}
    </button>
  </div>
```

- [ ] **Step 2: Update the footer-bottom styles**

Find this rule:

```css
  .footer__bottom {
    margin-top: var(--space-12);
    padding-top: var(--space-6);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
```

Replace it with:

```css
  .footer__bottom {
    margin-top: var(--space-12);
    padding-top: var(--space-6);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
  }
```

- [ ] **Step 3: Add the button style**

Immediately after the `.footer__copy` rule:

```css
  .footer__copy {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: var(--tracking-wide);
  }
```

Add:

```css
  .footer__cookie-btn {
    font: inherit;
    font-size: 12px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: var(--tracking-wide);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color var(--transition-fast);
  }

  .footer__cookie-btn:hover {
    color: #fff;
  }
```

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/Footer.astro
git commit -m "feat(consent): footer Cookie settings button to reopen preferences"
```

---

## Task 6: Expand the privacy-page cookie section

Add an `id="cookies"` anchor (the banner links to `/privacy/#cookies`) and a category breakdown. The same edit applies to both sites — their privacy pages share this exact section.

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/privacy.astro`
- Modify: `packages/algarve-and-you/src/pages/[locale]/privacy.astro`

- [ ] **Step 1: Update the Atlantis privacy page**

In `packages/atlantis/src/pages/[locale]/privacy.astro`, find:

```astro
      <h2>{t(locale, "privacy.cookies")}</h2>
      <p>{t(locale, "privacy.cookies_body")}</p>
```

Replace it with:

```astro
      <h2 id="cookies">{t(locale, "privacy.cookies")}</h2>
      <p>{t(locale, "privacy.cookies_body")}</p>
      <ul>
        <li set:html={t(locale, "privacy.cookies_necessary")} />
        <li set:html={t(locale, "privacy.cookies_analytics")} />
        <li set:html={t(locale, "privacy.cookies_marketing")} />
      </ul>
      <p>{t(locale, "privacy.cookies_manage")}</p>
```

- [ ] **Step 2: Update the Algarve & You privacy page**

In `packages/algarve-and-you/src/pages/[locale]/privacy.astro`, find the identical block:

```astro
      <h2>{t(locale, "privacy.cookies")}</h2>
      <p>{t(locale, "privacy.cookies_body")}</p>
```

Replace it with:

```astro
      <h2 id="cookies">{t(locale, "privacy.cookies")}</h2>
      <p>{t(locale, "privacy.cookies_body")}</p>
      <ul>
        <li set:html={t(locale, "privacy.cookies_necessary")} />
        <li set:html={t(locale, "privacy.cookies_analytics")} />
        <li set:html={t(locale, "privacy.cookies_marketing")} />
      </ul>
      <p>{t(locale, "privacy.cookies_manage")}</p>
```

- [ ] **Step 3: Commit**

```bash
git add "packages/atlantis/src/pages/[locale]/privacy.astro" "packages/algarve-and-you/src/pages/[locale]/privacy.astro"
git commit -m "feat(consent): expand privacy cookie section + #cookies anchor"
```

---

## Task 7: Build + manual verification

**Files:** none — verification only.

- [ ] **Step 1: Run the full test suite**

Run: `pnpm test`
Expected: PASS — including the 11 `consent.test.ts` tests.

- [ ] **Step 2: Build both sites**

Run: `pnpm build`
Expected: both `@algarve-tourism/atlantis` and `@algarve-tourism/algarve-and-you` build with no errors. If the build reports an unresolved import for `../lib/consent.js` in the component script, the fix is to confirm the file exists at `packages/shared/src/lib/consent.ts` (Vite resolves the `.js` specifier to it).

- [ ] **Step 3: Preview Atlantis and verify the banner**

Run: `pnpm dev:atlantis`, open the local URL in a fresh/incognito window, and confirm:
- The banner appears pinned to the bottom of the viewport with **Accept all**, **Reject all**, **Customize**, and a **Cookie details** link.
- Translated text shows for `/pt/`, `/es/`, `/fr/` paths (not raw keys like `consent.banner_text`).
- "Cookie details" links to `/{locale}/privacy/#cookies` and scrolls to the expanded cookie section.
- **Customize** opens the modal; Necessary shows "Always on" with no toggle; Analytics and Marketing toggles are **unchecked** by default; ESC and the × close it.
- The page does not visibly shift when the banner appears (it is `position: fixed`).

- [ ] **Step 4: Verify consent persistence and Consent Mode**

In the previewed Atlantis site, with DevTools open:
- Before any choice: Application → Cookies has no `aty_consent`. In the Console, run `dataLayer.filter(e => e[0]==='consent')` — the `default` entry shows `analytics_storage: 'denied'`.
- Click **Accept all** → the banner disappears, `aty_consent` cookie is set to `v1|analytics=1|marketing=1`, and `dataLayer` shows a `consent`/`update` entry granting `analytics_storage`.
- Reload → the banner does NOT reappear, and no flash occurs.
- Click the footer **Cookie settings** button → the modal reopens with both toggles **checked** (reflecting the stored choice).
- Clear the `aty_consent` cookie, reload, click **Reject all** → cookie is `v1|analytics=0|marketing=0` and the `update` entry keeps `analytics_storage: 'denied'`.

- [ ] **Step 5: Spot-check Algarve & You**

Run: `pnpm dev:ay` and confirm the banner renders and the footer **Cookie settings** button opens the modal. (Same shared component — a render check is enough.)

- [ ] **Step 6: Commit (only if Step 2–5 required code fixes)**

If any fix was needed, commit it:

```bash
git add -A
git commit -m "fix(consent): build/verification fixes"
```

If no fixes were needed, skip this step.

---

## Task 8: Changelog entry + FareHarbor dashboard handoff

The code change alters how GA4/Ads data is collected, so it must be logged per `CLAUDE.md`. The dashboard steps are run by the site owner (who has FareHarbor dashboard + GA4 Admin access).

**Files:**
- Modify: `GoogleAds/atlantis/06-changelog.md`

- [ ] **Step 1: Prepend the changelog entry**

In `GoogleAds/atlantis/06-changelog.md`, find the line `---` (just below the `**Format:**` line) and the first entry below it (`## 2026-05-20 — …`). Insert this new entry between the `---` and the `## 2026-05-20` entry. **Set the date to the actual deploy date** if it differs from 2026-05-22:

```markdown
## 2026-05-22 — Cookie consent + Google Consent Mode v2 shipped on both sites

**What:** Added a custom cookie-consent banner wired to Google Consent Mode v2 across both sites (shared `CookieConsent` component). `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization` now default to **denied** and only flip to `granted` when the visitor accepts. The banner offers Accept all / Reject all / Customize; the choice persists in the `aty_consent` cookie (180 days); a footer "Cookie settings" link reopens it.

**Why:** FareHarbor onboarding item 5 — both sites had no consent solution, so GA4 cookies (and FareHarbor's lightframe analytics) loaded without consent, a GDPR exposure in PT/ES/FR. Consent Mode v2 is FareHarbor-supported and is also Google's EEA requirement for ad tracking.

**Expected effect:** for non-consenting EU visitors, GA4/Ads data shifts from observed to modeled (cookieless pings + conversion modeling); consenting visitors are unchanged. Expect a step-down in observed users/sessions and a modeled share in conversions from the deploy date — this is a measurement-basis change, **not** a campaign regression; do not read it as one.

**Verify on/after:** 2026-06-05 — in GA4 DebugView confirm the consent state reflects the banner choice; check the consented/modeled split in GA4's consent reporting.
```

- [ ] **Step 2: Commit**

```bash
git add GoogleAds/atlantis/06-changelog.md
git commit -m "docs(changelog): cookie consent + Consent Mode v2 rollout"
```

- [ ] **Step 3: Hand off the dashboard steps to the site owner**

These are not code — surface them to the site owner to run after deploy (full detail in the spec, §7):

1. **FareHarbor dashboard — verify the GA4 connection.** FareHarbor already loads GA4 in the lightframe, so a connection exists. Confirm each FareHarbor dashboard has the correct GA4 Measurement ID (`G-YE21ZWJNY7` Atlantis, `G-GZJJYPE72L` A&Y) and is on FareHarbor's current GA4 integration. Path: Dashboard → Settings → integrations → Google Analytics.
2. **GA4 Admin — cross-domain.** In each GA4 property: Admin → Data Streams → web stream → Configure tag settings → Configure your domains → add `fareharbor.com`.
3. **Verify.** In GA4 DebugView / Realtime, confirm FareHarbor events arrive (`view_item_description`, `add_to_cart`, `purchase`) and the consent state matches the banner choice.

---

## Self-Review

**Spec coverage:**
- Consent Mode v2 model (3 categories, denied defaults, `ads_data_redaction`/`url_passthrough`) → Task 4 bootstrap + Task 1 `toConsentSignals`. ✓
- `CookieConsent.astro` (banner + modal, brand-aware, translated, focus trap, ESC) → Task 3. ✓
- `lib/consent.ts` pure helpers + unit tests + `CONSENT_VERSION` → Task 1. ✓
- `PageLayout.astro` head bootstrap before gtag config + render component → Task 4. ✓
- `Footer.astro` "Cookie settings" button → Task 5. ✓
- i18n keys × 4 locales → Task 2. ✓
- Privacy cookie section expansion + `#cookies` anchor → Task 6. ✓
- Cookie `aty_consent`, 180d, `SameSite=Lax; Secure`, versioned → Task 3 (`writeConsentCookie`) + Task 1 (`CONSENT_VERSION`). ✓
- No-flash via `data-consent` attribute → Task 4 bootstrap + Task 3 CSS. ✓
- Zero CLS (fixed-position banner) → Task 3 CSS, verified Task 7 Step 3. ✓
- §7 dashboard steps + changelog → Task 8. ✓

**Placeholder scan:** none — every step has exact paths, full code, and explicit commands.

**Type consistency:** `ConsentChoice` (`{analytics, marketing}`) is used identically in `serializeConsent`, `parseConsent`, `toConsentSignals` (Task 1) and in the component's `applyConsent` (Task 3). `serializeConsent` output (`v1|analytics=1|marketing=1`) matches the regex parsing in the Task 4 bootstrap and in `parseConsent`. The `data-consent="set"` attribute is written by both the Task 4 bootstrap and Task 3 `applyConsent`, and read by the Task 3 CSS selector. `data-cookie-settings` is emitted in Task 5 and queried in Task 3. Consistent. ✓
