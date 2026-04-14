# Atlantis Tours — Mobile UX Fixes

**Date:** 2026-04-14
**Scope:** Mobile-only CSS/JS fixes. No desktop changes. Shared component fixes apply to both brands intentionally — both sites benefit from the same mobile improvements. Brand-specific additions (sticky booking bar) are scoped to Atlantis page files.
**Approach:** Targeted per-component fixes (Approach A). No design system refactor.
**Breakpoint:** 768px primary, 480px secondary where noted.

---

## Context

The Atlantis Tours website is functional on mobile but has significant UX issues: the mobile menu lacks scroll locking and visual feedback, the booking widget behaves incorrectly in single-column layout, typography is oversized, touch targets are too small, and key layout elements don't adapt properly to narrow screens.

This is a sales website for a tourism business where mobile is the primary device. Every fix prioritizes the booking conversion funnel.

## Files Affected

Most components live in `packages/shared/src/components/` and are shared between both brands. Mobile fixes to shared components (menu, touch targets, overflow, typography, spacing) intentionally apply to both sites — these are universally correct improvements. Only the sticky booking bar and its related WhatsApp offset are Atlantis-specific, living in Atlantis page files.

- `Header.astro` — mobile menu fixes
- `BookingWidget.astro` — sticky position fix
- `[locale]/tours/[slug].astro` (Atlantis) — sticky booking bar, prop fix, WhatsApp offset
- `ProductHero.astro` — thumbnail grid mobile breakpoint
- `Marquee.astro` — font size reduction
- `TrustBar.astro` — padding fix
- `Footer.astro` — social icon touch targets
- `LanguageSwitcher.astro` — touch target padding
- `ReviewsGrid.astro` — min-width overflow fix
- `[locale]/index.astro` (Atlantis) — section header stacking, section title size

---

## Fix 1: Mobile Menu

**File:** `packages/shared/src/components/Header.astro`

### 1a. Body scroll lock

Update the toggle script to add `overflow: hidden` on `document.body` when the menu opens, and remove it on close.

```js
toggle?.addEventListener("click", () => {
  nav?.classList.toggle("open");
  document.body.style.overflow = nav?.classList.contains("open") ? "hidden" : "";
});
```

### 1b. Hamburger-to-X animation

Update the toggle script to also add `.open` on the toggle button itself (not just the menu). Then add CSS rules targeting `.mobile-toggle.open span`:

- Top span (`nth-child(1)`): `transform: translateY(7px) rotate(45deg)` (7px = half gap + half height, centers the line)
- Middle span (`nth-child(2)`): `opacity: 0`
- Bottom span (`nth-child(3)`): `transform: translateY(-7px) rotate(-45deg)`

All transitions use `var(--transition-base)` for consistency. The spans already have `transition: all var(--transition-base)` set.

### 1c. Hamburger touch target

The `.mobile-toggle` button is roughly 38x31px from current padding/span geometry. Add minimum touch target sizing and `aria-expanded` for accessibility:

CSS (no media query needed — button is already `display: none` above 768px):
```css
.mobile-toggle {
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
}
```

Update the toggle script to also set `aria-expanded`:
```js
toggle?.setAttribute("aria-expanded", nav?.classList.contains("open") ? "true" : "false");
```

Also update the initial HTML attribute from `aria-label="Open menu"` to include `aria-expanded="false"`.

### 1d. Menu overflow safety

Add `overflow-y: auto` to `.mobile-menu` so content scrolls if it exceeds the viewport (landscape orientation, small phones).

---

## Fix 2: Mobile Booking Experience

### 2a. BookingWidget sticky position fix

**File:** `packages/shared/src/components/BookingWidget.astro`

At 768px, override `position: sticky` to `position: static`. The widget flows naturally in the single-column layout.

```css
@media (max-width: 768px) {
  .booking-widget {
    position: static;
  }
}
```

### 2b. Prop mismatch fix

**File:** `packages/atlantis/src/pages/[locale]/tours/[slug].astro` (lines 104-108)

The BookingWidget is called with `itemPk` but the component interface expects `item` (a `NormalizedItem`) and `companyShortname`. Fix to pass the correct props:

```astro
<BookingWidget
  item={item}
  companyShortname={config.fh.shortname}
  locale={locale}
/>
```

Note: Atlantis config currently has no `productGroups`, so `variants` will always be empty and the widget renders the single "Book Now" button. No `variants` prop needed until product groups are added to Atlantis config.

### 2c. Sticky bottom booking bar (mobile only)

**File:** `packages/atlantis/src/pages/[locale]/tours/[slug].astro`

Add a new element at the bottom of the page, visible only below 768px. Structure:

Compute values from existing helpers:
- Price text: `${t(locale, "product.from")} ${formatPrice(item.price_from_including_tax)}`
- Booking URL: `` `https://fareharbor.com/embeds/book/${config.fh.shortname}/items/${item.pk}/?full-items=yes` ``
- CTA text: `t(locale, "product.book_now")`

```astro
<div class="mobile-booking-bar">
  <div class="mobile-booking-bar__price">
    {t(locale, "product.from")} {formatPrice(item.price_from_including_tax)}
  </div>
  <a href={fhUrl} class="mobile-booking-bar__cta">
    {t(locale, "product.book_now")}
  </a>
</div>
```

Behavior: CTA always links directly to the FareHarbor URL for the current item. No variant logic — Atlantis has no `productGroups`. If variants are added to Atlantis in the future, the booking bar will be updated in that spec.

Styling:
- `position: fixed; bottom: 0; left: 0; right: 0`
- Background: `rgba(247, 250, 251, 0.95)` with `backdrop-filter: blur(16px)` (matches header)
- Border-top: `1px solid var(--color-border)`
- `z-index: 91` (above WhatsApp button at 90)
- Padding: `var(--space-3) var(--space-5)`, plus `padding-bottom: calc(var(--space-3) + env(safe-area-inset-bottom))` for iOS home indicator
- Flex row: price left, CTA button right
- `display: none` above 768px

Content coverage: Add a scoped `:global(body)` bottom padding in the tour detail page at 768px so the footer clears the fixed bar. The footer lives outside `<main>` in `PageLayout.astro`, so page-level element padding won't suffice — body padding is required:

```css
@media (max-width: 768px) {
  :global(body) {
    padding-bottom: calc(60px + env(safe-area-inset-bottom));
  }
}
```

### 2d. WhatsApp button offset on tour pages

**File:** `packages/atlantis/src/pages/[locale]/tours/[slug].astro`

Add a scoped style that bumps the WhatsApp button up on mobile when the sticky booking bar is present:

```css
@media (max-width: 768px) {
  :global(.whatsapp-btn) {
    bottom: calc(var(--space-6) + 60px + env(safe-area-inset-bottom));
  }
}
```

The `60px` accounts for the booking bar height (padding + content). The `env(safe-area-inset-bottom)` matches the bar's own safe-area padding so the button clears it on iOS home-indicator devices.

---

## Fix 3: Typography & Spacing

### 3a. Section title mobile size

**File:** `packages/atlantis/src/pages/[locale]/index.astro`

Add mobile override:

```css
@media (max-width: 768px) {
  .section-title {
    font-size: var(--text-2xl);
  }
}
```

### 3b. Section header stacking

**File:** `packages/atlantis/src/pages/[locale]/index.astro`

```css
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }
}
```

### 3c. Marquee font reduction

**File:** `packages/shared/src/components/Marquee.astro`

```css
@media (max-width: 768px) {
  .marquee__text {
    font-size: var(--text-xl);
  }
  .marquee__sep {
    font-size: var(--text-lg);
  }
}
```

### 3d. Trust bar padding

**File:** `packages/shared/src/components/TrustBar.astro`

```css
@media (max-width: 768px) {
  .trust-bar {
    padding: var(--space-8) var(--space-5);
  }
}
```

---

## Fix 4: Product Hero Thumbnails

**File:** `packages/shared/src/components/ProductHero.astro`

Add a 480px breakpoint for the thumbnail grid:

```css
@media (max-width: 480px) {
  .product-hero__thumbs {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

This gives thumbnails adequate size for touch on small screens. The 768px breakpoint already collapses the hero to single column.

Also add a mobile size reduction for the product hero title in the existing 768px block:

```css
@media (max-width: 768px) {
  .product-hero__info h1 {
    font-size: var(--text-2xl);
  }
}
```

---

## Fix 5: Touch Targets

### 5a. Footer social icons

**File:** `packages/shared/src/components/Footer.astro`

In the existing 768px media query, add:

```css
@media (max-width: 768px) {
  .footer__social a {
    width: 44px;
    height: 44px;
  }
}
```

### 5b. Language switcher

**File:** `packages/shared/src/components/LanguageSwitcher.astro`

```css
@media (max-width: 768px) {
  .lang-switcher__item {
    padding: var(--space-2) var(--space-3);
    min-height: 44px;
    min-width: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
```

---

## Fix 6: Reviews Grid Overflow

**File:** `packages/shared/src/components/ReviewsGrid.astro`

Change the grid column minimum to prevent overflow on sub-320px devices:

```css
.reviews-grid {
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
}
```

This is a base style change (not behind a media query) since `min()` is a no-op when the container is wider than 320px.

---

## Out of Scope

- Container padding tablet breakpoint (769px-1024px) — touches design system
- Desktop design changes of any kind
- Responsive typography in the base token system
- Algarve & You site-specific fixes (separate pass later; shared component fixes apply to both brands)
- Adding View Transitions or SPA navigation
