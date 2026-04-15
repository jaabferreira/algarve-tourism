# About, Reviews & Contact Page Redesign — Atlantis Tours

**Goal:** Transform three thin, SEO-weak pages into rich, multi-section pages that match the homepage quality, maximize keyword coverage, and improve search visibility through content depth and structured data.

**Approach:** Maximum SEO — every page gets structured data, FAQ sections (valuable for users and long-tail search), internal links to tours, and content in all 4 languages (EN, PT, ES, FR).

**Note on rich snippets:** Google currently limits FAQ rich results to well-known authoritative sites (government, health). FAQPage schema is still included for semantic correctness and future eligibility, but rich snippet display is not guaranteed. Similarly, business-level review rich snippets are ineligible for self-controlled reviews per Google's review snippet guidelines — review structured data is only used on individual tour pages where per-item reviews are eligible.

**Business info:**
- Address: Ac. Porto Comercial de Portimão, Portimão, Algarve, Portugal
- Email: atlantistours@buyalgarveproperties.com
- WhatsApp: +351 969 703 185
- Hours: Summer 8:00–21:00, Off-season 8:00–17:00
- TripAdvisor & Google Business profiles: to be connected later (design with placeholder URLs)

**Stats requiring user confirmation:** The following values appear in the homepage and are reused in the spec. Verify before shipping:
- Founding year: homepage says "since 2010" but `en.json` line 66 says "since 2020" — resolve which is correct
- "50k+ Happy Guests" — needs confirmation
- "4.9 Average Rating" — needs confirmation against live TripAdvisor/Google profiles
- "6 Boats in Fleet" — needs confirmation
- Address is the default departure point; legal entity address may differ (check terms/privacy pages)

---

## 1. About Page

Sections top-to-bottom:

### 1.1 Hero Banner
- Gradient background (navy → teal), matching site's "Coastal Modern" theme
- "Since 2010 · Portimão, Algarve" label badge
- Headline: editorial style with `<em>` accent (Instrument Serif italic), e.g. "Exploring the Algarve Coast *One Voyage at a Time*"
- Keyword-rich subtitle mentioning boat tours, yacht cruises, fishing, Portimão Marina

### 1.2 Our Story
- Two-column layout: narrative copy (left) + photo placeholder (right)
- ~200 words of SEO copy per language. Natural keyword placement: "boat tours Portimão", "Algarve coast", "Benagil cave tours", "since 2010"
- Covers: founding story, growth, love for the coastline, commitment to guest experience

### 1.3 Stats Bar
- Dark background bar (reuses homepage pattern)
- 4 stats: 14+ Years Experience, 50k+ Happy Guests, 4.9 Average Rating, 6 Boats in Fleet
- Animated count-up on scroll (reuse existing reveal animation pattern)

### 1.4 Our Fleet
- Centered section header with accent label + editorial title
- 3-card grid: Speedboats (Benagil/coast), Private Yachts (sunset/charters), Fishing Vessels (deep sea/reef)
- Each card: photo placeholder, boat type name, short description
- Cards link to `/[locale]/tours/` (the tours listing page), not to individual category routes (Atlantis only has `["boats"]` in `config.fh.categories`, so granular category pages don't exist)
- Cards use existing card styling (rounded corners, shadow, hover lift)

### 1.5 Why Choose Us
- 2×2 grid of differentiator cards with icon, title, and short description
- Items: Licensed & Insured, Small Groups, Local Expertise, Free Cancellation
- Bordered cards with icon backgrounds (reuse TrustBar content conceptually but in richer card format)

### 1.6 Explore Tours CTA
- Full-width gradient banner (teal → light teal)
- Headline with editorial italic accent
- CTA button linking to `/[locale]/tours/` — internal link passes page authority

### 1.7 FAQ Section
- Accordion using existing `<details>/<summary>` pattern (same as FAQ page)
- 5 questions per language, keyword-optimized:
  1. Where do Atlantis Tours depart from?
  2. What should I bring on a boat tour?
  3. Can I cancel or reschedule my booking?
  4. Are boat tours suitable for children?
  5. What happens if the weather is bad?
- Generates FAQPage structured data (for semantic correctness; rich snippet display not guaranteed for non-authoritative sites)

### 1.8 Structured Data
- `Organization` schema: name, url, logo, foundingDate (user to confirm), address, contactPoint
- `LocalBusiness` with `TouristAttraction` type
- `FAQPage` with all Q&A pairs
- `BreadcrumbList`: Home > About

### 1.9 Content Requirements
- About page content in all 4 locales: EN, PT, ES, FR
- Move from Markdown content collection to direct Astro page with i18n translation keys (the page structure is now too complex for a simple Markdown render — multiple sections, components, structured layouts)
- Remove the existing `about.md` content collection files (EN, PT) once the new page is built
- All translatable strings go into the locale JSON files as new keys

---

## 2. Reviews Page

### 2.1 Aggregate Rating Hero
- Centered layout with large rating number (4.9), 5-star display, "Based on X+ reviews" count
- Star distribution bar chart (5-star: 90%, 4-star: 8%, 3-star: 2%)
- Vertical divider separating score from distribution (desktop), stacked on mobile

### 2.2 Platform Badges
- Horizontal row of badges below the rating: TripAdvisor (green circle + score) and Google (blue circle + score)
- Each badge links to the respective profile page (placeholder URLs for now)
- Bordered pill style matching site's design language

### 2.3 Category Filter Tabs
- Horizontal scrollable row of pill-shaped filter buttons
- Categories: All Reviews (active/primary color), Benagil Tours, Yacht Cruises, Fishing
- Client-side filtering — shows/hides reviews by `tour` field in review data
- Each review in the data gets a `tour` category field

### 2.4 Reviews Grid
- Responsive grid: 2 columns desktop, 1 column mobile (using existing ReviewsGrid pattern)
- Each ReviewCard shows: star rating, quoted text (Instrument Serif italic), author name + origin, tour name, source platform (TripAdvisor/Google badge)
- Staggered reveal animation on scroll (existing pattern)

### 2.5 Review Data Model
Replace the current `manual.json` (3 hardcoded reviews) with a structured data model that tracks provenance:

```json
{
  "source": "first_party | tripadvisor | google | fareharbor",
  "sourceUrl": "https://...",
  "externalReviewId": "optional",
  "tourSlug": "benagil-cave-tour",
  "fareharborItemPk": 717720,
  "tourCategory": "benagil | yacht | fishing",
  "rating": 5,
  "authorName": "Sarah M.",
  "authorLocation": "London, UK",
  "text": "...",
  "language": "en",
  "datePublished": "2025-08-15",
  "verifiedBooking": true,
  "permissionToPublish": true
}
```

- Expand from 3 to 10-15 real reviews
- Reviews should cover all tour categories and multiple nationalities/languages
- Only first-party, user-submitted, permissioned reviews attached to a specific tour are eligible for structured data markup — and that markup goes on the individual tour page, not on this Reviews listing page
- TripAdvisor/Google reviews can be displayed with source badges and linked back, but are not aggregated into Atlantis' own review schema

### 2.6 Leave a Review CTA
- Centered section with headline "Enjoyed Your *Experience*?"
- Two buttons side-by-side: "Review on TripAdvisor →" and "Review on Google →"
- Each button has platform icon and links to review submission page (placeholder URLs)

### 2.7 Explore Tours CTA
- Same gradient banner pattern as About page
- "Ready to Create Your *Own Story*?" headline
- CTA to tours listing page

### 2.8 FAQ Section
- 4 questions:
  1. Are these reviews from real guests?
  2. How can I leave a review for Atlantis Tours?
  3. What is the average rating for Atlantis Tours?
  4. Can I see reviews for a specific tour?
- FAQPage structured data (for semantic correctness; rich snippet display not guaranteed)

### 2.9 Structured Data
- `CollectionPage` + `ItemList` — semantically describes a page listing reviews
- `FAQPage` with Q&A pairs
- `BreadcrumbList`: Home > Reviews
- **No** `AggregateRating` or `Review` schema on this page — Google's review snippet guidelines exclude self-serving business-level reviews. The aggregate rating display (4.9 stars, distribution bars) is shown visually for trust, but not marked up as structured data.
- Per-tour review structured data belongs on individual tour detail pages (`/tours/[slug]`), where first-party verified reviews can be attached to the specific `Product` schema. This is handled in a separate enhancement to the tour detail page.

---

## 3. Contact Page

### 3.1 Header Section
- Centered headline "Contact *Atlantis Tours*" with accent label
- Keyword-rich subtitle: "boat tours in Portimão", "Algarve experience"

### 3.2 Quick Contact Cards
- 3-card horizontal grid:
  - **WhatsApp**: icon, "Fastest response · Usually within minutes", green "Chat Now" button → wa.me link
  - **Email**: icon, "We reply within 24 hours", email address displayed
  - **Visit Us**: icon, address, "Get Directions" link → Google Maps
- Stacks to single column on mobile

### 3.3 Two-Column Layout
**Left — Contact Form (wider column):**
- Fields: Name, Email, Tour Interest (dropdown with tour categories — optional), Message
- Submit button with gradient styling
- Form submission: Cloudflare Pages Function that sends email to atlantistours@buyalgarveproperties.com
- Success/error states with inline feedback

**Right — Info Sidebar:**
- **Operating Hours card**: Summer 8:00–21:00, Off-season 8:00–17:00, "Open 7 days a week · Weather dependent"
- **Address card**: Full address with locality
- **Social Links card**: Instagram, Facebook, YouTube icons (links from site config)

### 3.4 Embedded Map
- Full-width Google Maps embed showing Porto Comercial de Portimão
- Reuse existing `MeetingPointMap` component pattern (click-to-interact overlay)
- "Open in Google Maps" link overlay

### 3.5 Book Now CTA
- Gradient banner: "Ready to *Book*?" with link to tours page
- Provides conversion shortcut for users who don't need to contact support

### 3.6 FAQ Section
- 5 questions:
  1. How do I book a tour with Atlantis Tours?
  2. Where exactly do tours depart from in Portimão?
  3. What is the cancellation policy?
  4. Is there parking near the departure point?
  5. Can I book a private tour for a group?
- FAQPage structured data (for semantic correctness; rich snippet display not guaranteed)

### 3.7 Structured Data
- `LocalBusiness`: name, address (PostalAddress), telephone, email, openingHoursSpecification (summer + off-season), geo coordinates, url, image
- `FAQPage` with Q&A pairs
- `BreadcrumbList`: Home > Contact

### 3.8 Form Backend
- Cloudflare Pages Function — must be placed at the root of the Cloudflare Pages project (not inside `packages/atlantis/dist/`). The exact path depends on how the Pages project is configured:
  - If Pages builds from the monorepo root: `functions/api/contact.ts`
  - If Pages builds from `packages/atlantis/`: `packages/atlantis/functions/api/contact.ts`
  - Verify the Pages project's build output directory and root before placing the function
- Accepts POST with name, email, tour interest, message
- Validates inputs server-side (required fields, email format)
- Sends notification email to atlantistours@buyalgarveproperties.com (using Cloudflare's MailChannels integration or a simple fetch to an email API)
- Returns JSON success/error response
- Client-side: fetch POST, show success message or error inline

---

## 4. Cross-Cutting Concerns

### 4.1 i18n
- All page content in 4 languages: EN, PT, ES, FR
- New translation keys added to all locale JSON files for all three pages
- FAQ content per locale (hardcoded in components via translation keys, same pattern as existing FAQ page)
- About page moves from Markdown content collection to translation keys — no more `about.md` files. All text lives in `en.json`, `pt.json`, `es.json`, `fr.json`

### 4.2 SEO
- Every page: unique `<title>`, `<meta description>`, Open Graph tags, Twitter cards
- hreflang alternate links for all 4 locales (already handled by SEO component)
- Breadcrumb structured data on all pages
- Internal links from every page to the tours listing (authority distribution)

### 4.3 Design Consistency
- All new sections use existing design tokens (CSS custom properties)
- Card styles: `--radius-card: 14px`, existing shadow scale
- Typography: Space Grotesk for headings/body, Instrument Serif for editorial accents
- Color palette: teal primary, navy dark, sand alt, terracotta accent
- Animations: reuse existing scroll-reveal IntersectionObserver pattern

### 4.4 Components
- New components needed:
  - `AboutHero.astro` — gradient hero for About page
  - `FleetGrid.astro` — 3-card fleet showcase
  - `WhyChooseUs.astro` — 2×2 differentiator grid
  - `AggregateRating.astro` — big rating display with distribution bars
  - `ReviewFilters.astro` — category filter tabs (client-side JS)
  - `LeaveReviewCTA.astro` — platform review buttons
  - `ContactCards.astro` — 3-card quick contact row
  - `ContactInfo.astro` — sidebar with hours, address, social
  - `CTABanner.astro` — reusable gradient CTA section (used on all 3 pages)
  - `PageFAQ.astro` — FAQ accordion with structured data generation (reusable across pages)
- Existing components reused: `MeetingPointMap`, `ContactForm` (enhanced), `ReviewsGrid`, `ReviewCard` (enhanced), `TrustBar` pattern
- All new components are shared (in `/packages/shared/`) with brand-aware styling via `data-brand`

### 4.5 Responsive
- All sections must work on mobile (single column stacking)
- Quick contact cards: 3-col → 1-col
- Two-column layouts: grid → stacked
- Fleet grid: 3-col → scrollable horizontal or stacked
- Review filters: horizontally scrollable on mobile
