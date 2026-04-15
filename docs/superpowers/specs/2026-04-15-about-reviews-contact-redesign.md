# About, Reviews & Contact Page Redesign — Atlantis Tours

**Goal:** Transform three thin, SEO-weak pages into rich, multi-section pages that match the homepage quality, maximize keyword coverage, and earn Google rich snippets.

**Approach:** Maximum SEO — every page gets structured data, FAQ sections (FAQPage schema), internal links to tours, and content in all 4 languages (EN, PT, ES, FR).

**Business info:**
- Address: Ac. Porto Comercial de Portimão, Portimão, Algarve, Portugal
- Email: atlantistours@buyalgarveproperties.com
- WhatsApp: +351 969 703 185
- Hours: Summer 8:00–21:00, Off-season 8:00–17:00
- TripAdvisor & Google Business profiles: to be connected later (design with placeholder URLs)

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
- Each card: photo placeholder, boat type name, short description, implicit link to relevant tour category
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
- Generates FAQPage structured data

### 1.8 Structured Data
- `Organization` schema: name, url, logo, foundingDate (2010), address, contactPoint
- `LocalBusiness` with `TouristAttraction` type
- `FAQPage` with all Q&A pairs
- `BreadcrumbList`: Home > About

### 1.9 Content Requirements
- About page content must exist in all 4 locales: EN, PT, ES, FR (currently only EN and PT exist)
- Move from Markdown content collection to direct Astro page content (the page structure is now too complex for a simple Markdown render)

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

### 2.5 Review Data Expansion
- Expand `manual.json` from 3 reviews to 10-15 reviews
- Add fields to each review: `tour` (category for filtering), `source` (tripadvisor/google)
- Reviews should cover all tour categories and multiple nationalities/languages

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
- FAQPage structured data

### 2.9 Structured Data
- `AggregateRating`: ratingValue, reviewCount, bestRating, worstRating
- Individual `Review` schema for each review (author, reviewRating, reviewBody, datePublished, itemReviewed)
- `FAQPage` with Q&A pairs
- `BreadcrumbList`: Home > Reviews

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
- FAQPage structured data

### 3.7 Structured Data
- `LocalBusiness`: name, address (PostalAddress), telephone, email, openingHoursSpecification (summer + off-season), geo coordinates, url, image
- `FAQPage` with Q&A pairs
- `BreadcrumbList`: Home > Contact

### 3.8 Form Backend
- Cloudflare Pages Function at `/functions/contact.ts`
- Accepts POST with name, email, tour interest, message
- Validates inputs server-side (required fields, email format)
- Sends notification email to atlantistours@buyalgarveproperties.com
- Returns JSON success/error response
- Client-side: fetch POST, show success message or error inline

---

## 4. Cross-Cutting Concerns

### 4.1 i18n
- All page content in 4 languages: EN, PT, ES, FR
- New translation keys added to all locale JSON files
- FAQ content per locale (hardcoded in components, same pattern as existing FAQ page)
- About page: ES and FR content files must be created (currently missing)

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
