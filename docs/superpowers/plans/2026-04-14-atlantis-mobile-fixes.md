# Atlantis Tours Mobile UX Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix mobile UX issues across the Atlantis Tours website so the site works well as a sales tool on phones.

**Architecture:** Targeted CSS/JS fixes to individual shared components and Atlantis page files. No design system changes. All shared component fixes intentionally apply to both brands. The only Atlantis-specific code is the sticky mobile booking bar on the tour detail page.

**Tech Stack:** Astro 5, vanilla CSS (custom properties), vanilla JS, pnpm monorepo

**Spec:** `docs/superpowers/specs/2026-04-14-atlantis-mobile-fixes-design.md`

**Testing:** These are visual CSS/JS changes — no unit tests. Verify each task by running the dev server (`pnpm dev:atlantis`) and checking at 375px viewport width in browser DevTools. Confirm no desktop regressions at 1280px. After all tasks are done, run `pnpm build` to catch any import/typing regressions.

---

### Task 1: Mobile menu — scroll lock, hamburger animation, touch target, overflow

**Files:**
- Modify: `packages/shared/src/components/Header.astro`

- [ ] **Step 1: Update the mobile toggle HTML to add `aria-expanded`**

In `packages/shared/src/components/Header.astro`, change the toggle button (line 69):

```astro
<!-- Before -->
<button class="mobile-toggle" aria-label="Open menu" data-mobile-toggle>

<!-- After -->
<button class="mobile-toggle" aria-label="Open menu" aria-expanded="false" data-mobile-toggle>
```

- [ ] **Step 2: Update the toggle script for scroll lock, button class, and aria-expanded**

Replace the entire `<script>` block at the bottom of `Header.astro` (lines 341–347):

```astro
<script>
  const toggle = document.querySelector("[data-mobile-toggle]");
  const nav = document.querySelector("[data-mobile-nav]");
  toggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
    toggle?.classList.toggle("open");
    const isOpen = nav?.classList.contains("open");
    document.body.style.overflow = isOpen ? "hidden" : "";
    toggle?.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
</script>
```

- [ ] **Step 3: Add hamburger-to-X CSS and touch target sizing**

In the `<style>` block, add these rules after the existing `.mobile-toggle span` block (after line 183):

```css
.mobile-toggle.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.mobile-toggle.open span:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
```

Also update the existing `.mobile-toggle` rule (lines 167–175) to add touch target sizing. Add `min-width` and `min-height` to the existing declaration:

```css
.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: var(--space-2);
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
}
```

- [ ] **Step 4: Add overflow-y to mobile menu**

In the `.mobile-menu` rule (lines 186–196), add `overflow-y: auto`:

```css
.mobile-menu {
  display: none;
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  padding: var(--space-8) var(--space-6);
  flex-direction: column;
  gap: var(--space-8);
  overflow-y: auto;
}
```

- [ ] **Step 5: Verify in browser**

Run: `pnpm dev:atlantis`

Open `http://localhost:4321/en/` in browser DevTools at 375px width:
- Hamburger icon visible, tappable, has adequate size
- Clicking it opens mobile menu with smooth X animation
- Page does not scroll behind the open menu
- Clicking X closes menu, hamburger returns
- At 1280px: no visible changes (hamburger is hidden, nav is unchanged)

- [ ] **Step 6: Commit**

```bash
git add packages/shared/src/components/Header.astro
git commit -m "fix: mobile menu scroll lock, hamburger animation, touch target, overflow"
```

---

### Task 2: BookingWidget sticky position fix

**Files:**
- Modify: `packages/shared/src/components/BookingWidget.astro`

- [ ] **Step 1: Add mobile position override**

In `packages/shared/src/components/BookingWidget.astro`, add a media query at the end of the `<style>` block (after the `.booking-widget__option-btn:hover` rule, before the closing `</style>`):

```css
@media (max-width: 768px) {
  .booking-widget {
    position: static;
  }
}
```

- [ ] **Step 2: Verify in browser**

Open a tour detail page (e.g., `http://localhost:4321/en/tours/` — click any tour). At 375px width:
- Booking widget flows naturally in the single-column layout
- No sticky behavior while scrolling
- At 1280px: widget still sticks in the sidebar as before

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/BookingWidget.astro
git commit -m "fix: remove BookingWidget sticky position on mobile"
```

---

### Task 3: Tour detail page — sticky booking bar, body padding, WhatsApp offset

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/tours/[slug].astro`

- [ ] **Step 1: Add formatPrice to the shared import**

In `packages/atlantis/src/pages/[locale]/tours/[slug].astro`, add `formatPrice` to the existing import on line 3. Keep `parseDescription` which is already there:

```astro
import { LOCALES, t, buildBreadcrumbList, parseDescription, formatPrice } from "@algarve-tourism/shared";
```

- [ ] **Step 2: Verify BookingWidget props are correct**

Confirm that the BookingWidget call (lines 106–110) already passes `item={item}` and `companyShortname={config.fh.shortname}`. No change needed — this was already fixed in a prior commit.

- [ ] **Step 3: Add the FareHarbor URL variable in the frontmatter**

In the frontmatter section (after line 61, before the closing `---`), add:

```ts
const fhUrl = `https://fareharbor.com/embeds/book/${config.fh.shortname}/items/${item.pk}/?full-items=yes`;
```

- [ ] **Step 4: Add the mobile booking bar HTML**

Add the booking bar element just before the closing `</Layout>` tag (before line 122). Place it after the `WhatsAppButton` and before `</Layout>`:

```astro
  <WhatsAppButton phone={config.social.whatsapp} locale={locale} />

  <div class="mobile-booking-bar">
    <div class="mobile-booking-bar__price">
      {t(locale, "product.from")} {formatPrice(item.price_from_including_tax)}
    </div>
    <a href={fhUrl} class="mobile-booking-bar__cta">
      {t(locale, "product.book_now")}
    </a>
  </div>
</Layout>
```

- [ ] **Step 5: Add the mobile booking bar styles, body padding, and WhatsApp offset**

Add these rules inside the existing `<style>` block (after the existing `@media (max-width: 768px)` block):

```css
/* Mobile booking bar */
.mobile-booking-bar {
  display: none;
}

@media (max-width: 768px) {
  .mobile-booking-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 91;
    background: rgba(247, 250, 251, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid var(--color-border);
    padding: var(--space-3) var(--space-5);
    padding-bottom: calc(var(--space-3) + env(safe-area-inset-bottom));
  }

  .mobile-booking-bar__price {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: var(--weight-bold);
    color: var(--color-text);
  }

  .mobile-booking-bar__cta {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    padding: var(--space-2) var(--space-5);
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    color: #fff;
    font-size: 13px;
    font-weight: var(--weight-semibold);
    border-radius: 8px;
    text-decoration: none;
    white-space: nowrap;
  }

  :global(body) {
    padding-bottom: calc(60px + env(safe-area-inset-bottom));
  }

  :global(.whatsapp-btn) {
    bottom: calc(var(--space-6) + 60px + env(safe-area-inset-bottom));
  }
}
```

- [ ] **Step 6: Verify in browser**

Open a tour detail page at 375px width:
- Fixed booking bar visible at bottom with price and "Book Now" button
- "Book Now" links to FareHarbor
- WhatsApp button sits above the booking bar, not overlapping
- Footer content is not hidden behind the bar (scroll to very bottom)
- At 1280px: no booking bar visible, WhatsApp button in normal position

- [ ] **Step 7: Commit**

```bash
git add 'packages/atlantis/src/pages/[locale]/tours/[slug].astro'
git commit -m "feat: add mobile sticky booking bar on tour detail page"
```

---

### Task 4: Homepage typography and section header stacking

**Files:**
- Modify: `packages/atlantis/src/pages/[locale]/index.astro`

- [ ] **Step 1: Add mobile overrides to the page's scoped styles**

In `packages/atlantis/src/pages/[locale]/index.astro`, add a media query at the end of the `<style>` block (before the closing `</style>` tag, after line 164):

```css
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }
  .section-title {
    font-size: var(--text-2xl);
  }
}
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:4321/en/` at 375px width:
- Section headers stack vertically (title above "See all" link)
- Section titles are smaller, not oversized
- At 1280px: section headers remain side-by-side, titles unchanged

- [ ] **Step 3: Commit**

```bash
git add 'packages/atlantis/src/pages/[locale]/index.astro'
git commit -m "fix: stack section headers and reduce title size on mobile"
```

---

### Task 5: Marquee and TrustBar mobile spacing

**Files:**
- Modify: `packages/shared/src/components/Marquee.astro`
- Modify: `packages/shared/src/components/TrustBar.astro`

- [ ] **Step 1: Add marquee mobile font size**

In `packages/shared/src/components/Marquee.astro`, add a media query at the end of the `<style>` block (before the closing `</style>`, after the `prefers-reduced-motion` query):

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

- [ ] **Step 2: Add trust bar mobile padding**

In `packages/shared/src/components/TrustBar.astro`, add the padding rule inside the existing `@media (max-width: 768px)` block (line 73). Add it before the `.trust-bar-inner` rule:

```css
@media (max-width: 768px) {
  .trust-bar {
    padding: var(--space-8) var(--space-5);
  }
  .trust-bar-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
  }
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:4321/en/` at 375px width:
- Marquee text is smaller, proportional to the screen
- Trust bar padding aligns with the container padding (no extra-wide gutters)
- At 1280px: marquee and trust bar unchanged

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/Marquee.astro packages/shared/src/components/TrustBar.astro
git commit -m "fix: reduce marquee font size and trust bar padding on mobile"
```

---

### Task 6: Product hero — thumbnails and title size

**Files:**
- Modify: `packages/shared/src/components/ProductHero.astro`

- [ ] **Step 1: Add mobile title size and thumbnail breakpoint**

In `packages/shared/src/components/ProductHero.astro`, add to the existing `@media (max-width: 768px)` block (line 258, after the `grid-template-columns: 1fr` rule):

```css
@media (max-width: 768px) {
  .product-hero {
    grid-template-columns: 1fr;
  }
  .product-hero__info h1 {
    font-size: var(--text-2xl);
  }
}
```

Then add a new 480px breakpoint after that block:

```css
@media (max-width: 480px) {
  .product-hero__thumbs {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 2: Verify in browser**

Open a tour detail page at 375px width:
- Title is smaller, fits well on screen
- Thumbnails show as 2-column grid (larger, easier to tap)
- At 768px+: thumbnails remain 4-across, title is full size

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/ProductHero.astro
git commit -m "fix: reduce product hero title size and thumbnail grid on mobile"
```

---

### Task 7: Touch targets — footer social icons and language switcher

**Files:**
- Modify: `packages/shared/src/components/Footer.astro`
- Modify: `packages/shared/src/components/LanguageSwitcher.astro`

- [ ] **Step 1: Add footer social icon sizing**

In `packages/shared/src/components/Footer.astro`, add the social icon rule inside the existing `@media (max-width: 768px)` block (line 303). Add it after the `.footer__brand` rule:

```css
@media (max-width: 768px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8) var(--space-6);
  }

  .footer__brand {
    grid-column: 1 / -1;
  }

  .footer__social a {
    width: 44px;
    height: 44px;
  }
}
```

- [ ] **Step 2: Add language switcher touch target sizing**

In `packages/shared/src/components/LanguageSwitcher.astro`, add a media query at the end of the `<style>` block (before the closing `</style>`, after line 56):

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

- [ ] **Step 3: Verify in browser**

Open `http://localhost:4321/en/` at 375px width:
- Footer social icons are visually larger and easy to tap
- Open mobile menu: language switcher items have adequate touch target size
- At 1280px: footer icons and language switcher unchanged

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/Footer.astro packages/shared/src/components/LanguageSwitcher.astro
git commit -m "fix: increase footer social icons and language switcher touch targets on mobile"
```

---

### Task 8: Reviews grid overflow fix

**Files:**
- Modify: `packages/shared/src/components/ReviewsGrid.astro`

- [ ] **Step 1: Update the grid-template-columns base rule**

In `packages/shared/src/components/ReviewsGrid.astro`, change the `.reviews-grid` rule (line 25):

```css
/* Before */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

/* After */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
  gap: var(--space-6);
}
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:4321/en/reviews/` (or the homepage reviews section) at 320px width:
- No horizontal scrollbar
- Reviews stack to single column
- At 1280px: reviews grid unchanged (3 columns)

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/components/ReviewsGrid.astro
git commit -m "fix: prevent reviews grid horizontal overflow on narrow viewports"
```

---

### Task 9: Final build verification

- [ ] **Step 1: Run full build**

```bash
pnpm build
```

Expected: Both sites build successfully with no import or type errors. If there are errors, fix them before proceeding.

- [ ] **Step 2: Verify no regressions at desktop width**

Run `pnpm dev:atlantis` and open `http://localhost:4321/en/` at 1280px width. Spot-check:
- Homepage: hero, product grid, trust bar, reviews, footer all unchanged
- Tour detail page: gallery, booking widget sidebar, footer all unchanged
- Header navigation works normally
