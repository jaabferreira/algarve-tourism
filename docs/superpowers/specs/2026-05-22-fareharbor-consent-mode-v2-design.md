# FareHarbor visibility — Cookie consent + Google Consent Mode v2

**Date:** 2026-05-22
**Status:** Design approved — ready for implementation plan
**Sites:** Atlantis Tours (`atlantistours.pt`) and Algarve & You (`algarveandyou.com`) — shared Astro monorepo

## Problem

Both sites have **no cookie-consent solution at all**. `gtag.js` fires
unconditionally on every page load (`PageLayout.astro`), and FareHarbor already
loads each site's GA4 property inside its booking lightframe — so booking data
already reaches GA4 (this is what produced the `fareharbor.com` referral leak fixed
on 2026-04-30). None of that collection is gated on consent.

Per FareHarbor's "Cookies under privacy laws" article, Portugal / Spain / France /
Germany are all **Category 1 (opt-in)** — analytics cookies must not load until the
user consents. With no consent solution on the page, FareHarbor's booking system
cannot tell whether the visitor consented, so it loads GA4 cookies regardless — a
stated non-compliance risk. The booking/analytics data is being collected; it is
being collected unlawfully.

This is a **compliance** deliverable, not a conversion-visibility one — the banner
makes data the sites already collect lawful, and lets FareHarbor's integration
respect the visitor's choice. For consenting visitors nothing changes; for
non-consenting visitors, data (including their bookings) shifts from observed to
modeled.

FareHarbor integrates only with: OneTrust, Complianz, Cookiebot, iubenda,
**Google Consent Mode v2** (including custom solutions that implement it), and
legacy Cookie Law Info. CookieYes is explicitly unsupported. FareHarbor's GA4
integration script "respects cookie consent" — but only when a supported consent
signal exists on the page for it to read.

## Goal

Ship a custom cookie-consent banner wired to **Google Consent Mode v2**, shared by
both sites, translated into all four locales (en/pt/es/fr). This is the single
engineering deliverable. The FareHarbor dashboard + GA4 Admin steps are
configuration (no code) and are documented in §7.

A secondary benefit: Atlantis runs Google Ads, and Consent Mode v2 is also Google's
requirement for EEA ad tracking — this banner closes that gap too.

## Approach (decided)

**Custom banner + Google Consent Mode v2.** Rejected alternative: a third-party CMP
(Cookiebot / iubenda) — it costs money across two domains, injects a heavy
render-blocking third-party script that would regress the active Atlantis CWV
tuning, and resists the dual-brand design system. A custom solution is free,
on-brand, lightweight, and explicitly supported by FareHarbor.

## Architecture

### File footprint

| File | Change |
|---|---|
| `packages/shared/src/components/CookieConsent.astro` | **New** — banner bar + preferences modal markup + bundled client script |
| `packages/shared/src/lib/consent.ts` | **New** — pure serialize/parse helpers for the consent cookie (unit-tested) |
| `packages/shared/src/lib/consent.test.ts` | **New** — unit tests for serialize/parse + version-bump behaviour |
| `packages/shared/src/layouts/PageLayout.astro` | Add Consent Mode v2 **bootstrap** (`is:inline`) in `<head>` before the gtag config; render `<CookieConsent>` before `</body>` |
| `packages/shared/src/components/Footer.astro` | Add a "Cookie settings" button in the bottom bar that reopens the preferences modal |
| `packages/shared/src/i18n/*` | New keys for all banner/modal strings + `footer.cookie_settings`, × en/pt/es/fr |
| `packages/atlantis/src/pages/[locale]/privacy.astro` | Expand the existing cookies section into a category table |
| `packages/algarve-and-you/src/pages/[locale]/privacy.astro` | Same expansion |

One shared component covers both sites. Only the GA4 Measurement IDs differ, and
those already live in each `config.ts` (`G-YE21ZWJNY7` Atlantis,
`G-GZJJYPE72L` A&Y).

### Consent Mode v2 model

Three categories. Non-essential categories default to **denied** — FareHarbor
requires non-essential cookies not be pre-selected.

| Banner category | Consent Mode v2 signals | Default | Banner control |
|---|---|---|---|
| **Necessary** | `functionality_storage`, `security_storage` | granted | shown, locked on, no toggle |
| **Analytics** | `analytics_storage` | **denied** | toggle, off |
| **Marketing** | `ad_storage`, `ad_user_data`, `ad_personalization` | **denied** | toggle, off |

While ad consent is denied, the bootstrap also sets `ads_data_redaction: true` and
`url_passthrough: true` for better Ads modelling.

### Consent flow

1. **`<head>` bootstrap** (`is:inline`, synchronous, before `gtag('config', …)`):
   - Initialises `dataLayer` + `gtag()`.
   - `gtag('consent', 'default', { …non-essential denied…, wait_for_update: 500 })`.
   - `gtag('set', 'ads_data_redaction', true)` and `gtag('set', 'url_passthrough', true)`.
   - Reads the `aty_consent` cookie synchronously. If a **valid current-version**
     cookie exists → `gtag('consent', 'update', …)` with the stored values and sets
     `data-consent="set"` on `<html>`.
2. `gtag.js` loads (async) and runs `gtag('config', …)` — starts in
   cookieless/modeling mode while denied.
3. `CookieConsent.astro` renders the banner bar + modal at end of `<body>`. CSS
   keys banner visibility off `<html data-consent>`:
   - `data-consent="set"` present → banner hidden (returning visitor, no flash).
   - absent → banner shown (first visit, no flash of content-before-banner because
     the head script ran synchronously before body paint).
4. User chooses **Accept all** / **Reject all** / **Save** (from Customize):
   - `gtag('consent', 'update', …)` with the chosen values.
   - Write the `aty_consent` cookie.
   - Set `data-consent="set"`, hide the banner / close the modal.
5. FareHarbor's deferred embed script (loaded on first interaction, see
   `PageLayout.astro`) reads the standard Consent Mode v2 state from the page and
   forwards it into the lightframe. **No FareHarbor-specific code is required** — we
   implement plain Consent Mode v2; FareHarbor consumes it.

### Geo strategy

**Default-deny globally** — no geo-detection edge function. The audience is
overwhelmingly EU (pt/es/fr/en Algarve tourism). Consent Mode v2 still sends modeled
conversions while denied, so the data loss from non-EU visitors who never see/accept
the banner is negligible and not worth a Cloudflare Pages function.

### No-flash mechanism

The `<head>` bootstrap is `is:inline` and synchronous — it sets `data-consent` on
`<html>` before `<body>` paints. CSS shows/hides the banner off that attribute, so:
returning visitors never see a banner flash; first-time visitors never see content
render before the banner. The banner is `position: fixed` (out of document flow) →
**zero CLS**, which preserves the active Atlantis CWV work.

## Components

### `CookieConsent.astro`

**Props:** `config: BrandConfig`, `locale: Locale` — same shape as `Footer.astro`.

**Renders:**
- `.cookie-banner` — slim bar pinned to the bottom of the viewport. One line of
  text + a link to `/privacy/#cookies`, and three buttons: **Accept all**,
  **Reject all**, **Customize**.
- `.cookie-prefs` — a small modal (hidden by default). Lists the three categories;
  Necessary is shown locked-on with an "Always on" label, Analytics and Marketing
  are real toggles defaulting to off. A **Save preferences** button.
- A bundled `<script>` (Astro default — not `is:inline`, so it may
  `import` from `../lib/consent.ts`) that wires: button handlers, cookie write,
  `gtag('consent','update', …)`, modal open/close, focus trap + ESC, and a listener
  for clicks on `[data-cookie-settings]` (the Footer button) to reopen the modal.

**Styling:** existing design tokens; `data-brand`-aware exactly like `Footer.astro`;
translated via `t(locale, …)`.

**Accessibility:** modal has `role="dialog"` + `aria-modal`, focus is trapped while
open and restored on close, ESC closes it, toggles are labelled `<input>`s.

### `lib/consent.ts`

Pure, unit-tested helpers — no DOM:
- `serializeConsent({ analytics, marketing }) → string` — produces the cookie value.
- `parseConsent(raw: string) → { analytics, marketing } | null` — returns `null` on
  a missing/malformed value **or a version mismatch** (forces a re-prompt).
- A `CONSENT_VERSION` constant (`"v1"`). Bumping it invalidates all stored consent
  and re-prompts every visitor — used when categories change.

The `<head>` bootstrap cannot import this module (it must be `is:inline` and
synchronous). It re-implements a minimal read inline — a small, deliberate, and
documented duplication. `CONSENT_VERSION` is the single source of truth; the inline
bootstrap checks the same `v1|` prefix.

### Cookie

- Name: `aty_consent`. First-party, JS-readable (not `httpOnly`).
- Value: `v1|analytics=0|1|marketing=0|1` (version-prefixed; see `CONSENT_VERSION`).
- Attributes: `path=/; max-age=15552000` (180 days)`; SameSite=Lax; Secure`.
  Host-only (no `Domain`) — each site sets its own.

### `PageLayout.astro` changes

- Insert the Consent Mode v2 bootstrap `<script is:inline>` inside `<head>`,
  **before** the existing gtag block, gated on `config.analytics.gtag` (same gate as
  the existing gtag block). Order in DOM guarantees the `consent default` push lands
  in `dataLayer` before the `config` push.
- Render `<CookieConsent config={config} locale={locale} />` just before `</body>`,
  same gate.
- The existing `web_vitals` reporting script is unchanged — with `analytics_storage`
  denied its events are simply sent cookieless, which is correct.

### `Footer.astro` changes

Add a **Cookie settings** `<button data-cookie-settings>` to the `.footer__bottom`
bar (next to the copyright line). It is a button, not a link — clicking it dispatches
to the `CookieConsent` script, which opens the preferences modal. This satisfies
FareHarbor's "modify or withdraw consent at any time" requirement.

### Privacy page changes

Expand the **existing** cookies section in each site's `privacy.astro` into a
category table — Necessary / Analytics / Marketing — naming the concrete cookies
(`_ga`, `_gid` → Analytics; FareHarbor's booking-system cookies), and stating that
consent can be changed anytime via the footer "Cookie settings" button. No separate
cookie-policy page — the privacy page already has the section, so this is YAGNI.

## Testing

- **Unit (`consent.test.ts`, vitest):** `serializeConsent`/`parseConsent` round-trip;
  `parseConsent` returns `null` for malformed input and for a version mismatch.
- **Manual verification (build + preview both sites):**
  - First visit shows the banner once; a choice persists it and it does not return.
  - **Reject all** → GA4 DebugView shows `analytics_storage: denied`; **Accept all**
    → `granted`.
  - Footer "Cookie settings" reopens the modal; changing a toggle updates the signal.
  - A FareHarbor lightframe booking produces a `purchase` event in GA4 once the
    dashboard steps in §7 are done.
  - No CLS regression — banner is `position: fixed`.

## §7 — FareHarbor dashboard + GA4 Admin steps (no code)

Executed by the site owner (has FareHarbor dashboard + GA4 Admin access). The
implementation plan will carry these as a final verification checklist.

1. **FareHarbor dashboard — verify the GA4 connection.** FareHarbor already loads
   GA4 in the lightframe, so a connection exists. Confirm each FareHarbor dashboard
   has the correct GA4 Measurement ID and is on FareHarbor's current GA4 integration
   (the structured ecommerce events listed above — `view_item_description`,
   `add_to_cart`, `purchase`, etc.). Exact navigation per FareHarbor's "Setting up
   GA4 to work with FareHarbor" article; general path: Dashboard → Settings →
   integrations → Google Analytics. IDs: `G-YE21ZWJNY7` (Atlantis),
   `G-GZJJYPE72L` (A&Y).
2. **GA4 Admin — cross-domain.** In each GA4 property: Admin → Data Streams → the web
   stream → Configure tag settings → Configure your domains → add `fareharbor.com`
   alongside the site domain. Enables session continuity into the lightframe.
3. **Verify.** In GA4 DebugView / Realtime, confirm FareHarbor events arrive
   (`view_item_description`, `add_to_cart`, `purchase`) and that the consent state
   reflects the banner choice.

## Out of scope

- Geo-targeted consent defaults (Cloudflare edge function) — default-deny globally.
- A separate, dedicated cookie-policy page — the privacy page section is expanded.
- A third-party CMP and its cookie auto-scanner.
- Any change to the FareHarbor affiliate-attribution (`asn`) work — unrelated.

## Logging note

Per `CLAUDE.md`, once the GA4 ↔ FareHarbor integration goes live, append an entry to
`GoogleAds/atlantis/06-changelog.md` (it affects ad-performance attribution).
