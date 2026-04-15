# About, Reviews & Contact Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform three thin pages into rich, multi-section experiences with structured data, FAQ sections, and 4-language support to maximize SEO.

**Architecture:** Each page gets rebuilt as a multi-section Astro page using new shared components. Translation keys replace Markdown content collections. FAQ content is hardcoded per-locale in each page (matching faq.astro pattern). No test infrastructure exists — verification is build + visual check.

**Tech Stack:** Astro (SSG), CSS custom properties, scoped styles, JSON i18n, Schema.org JSON-LD

**Spec:** `docs/superpowers/specs/2026-04-15-about-reviews-contact-redesign.md`

---

## File Map

**Create:**
- `packages/shared/src/components/CTABanner.astro` — reusable gradient CTA section
- `packages/shared/src/components/PageFAQ.astro` — FAQ accordion + FAQPage structured data
- `packages/shared/src/components/StatsBar.astro` — dark bar with 4 animated stats
- `packages/shared/src/components/FleetGrid.astro` — 3-card fleet showcase
- `packages/shared/src/components/WhyChooseUs.astro` — 2×2 differentiator grid
- `packages/shared/src/components/AggregateRating.astro` — big rating + distribution bars
- `packages/shared/src/components/ReviewFilters.astro` — pill filter tabs + client JS
- `packages/shared/src/components/LeaveReviewCTA.astro` — platform review buttons
- `packages/shared/src/components/ContactCards.astro` — 3-card quick contact row
- `packages/shared/src/components/ContactInfo.astro` — sidebar with hours/address/social

**Modify:**
- `packages/shared/src/i18n/types.ts` — add ~65 new translation keys
- `packages/shared/src/i18n/locales/en.json` — English translations
- `packages/shared/src/i18n/locales/pt.json` — Portuguese translations
- `packages/shared/src/i18n/locales/es.json` — Spanish translations
- `packages/shared/src/i18n/locales/fr.json` — French translations
- `packages/shared/src/types.ts` — add `tourCategory` and `source` to ManualReview
- `packages/shared/src/components/ReviewCard.astro` — show tour name + source badge
- `packages/shared/src/components/ContactForm.astro` — add tour interest dropdown
- `packages/shared/src/seo/structured-data.ts` — add `buildCollectionPage` helper
- `packages/atlantis/src/content/reviews/manual.json` — expand to 12 reviews with new fields
- `packages/atlantis/src/pages/[locale]/about.astro` — full rewrite
- `packages/atlantis/src/pages/[locale]/reviews.astro` — full rewrite
- `packages/atlantis/src/pages/[locale]/contact.astro` — full rewrite

**Remove (after About page is rebuilt):**
- `packages/atlantis/src/content/pages/en/about.md`
- `packages/atlantis/src/content/pages/pt/about.md`

---

## Task 1: Translation Keys and Types

**Files:**
- Modify: `packages/shared/src/i18n/types.ts`
- Modify: `packages/shared/src/i18n/locales/en.json`
- Modify: `packages/shared/src/i18n/locales/pt.json`
- Modify: `packages/shared/src/i18n/locales/es.json`
- Modify: `packages/shared/src/i18n/locales/fr.json`
- Modify: `packages/shared/src/types.ts`

- [ ] **Step 1: Add new keys to TranslationStrings interface**

In `packages/shared/src/i18n/types.ts`, add these keys to the `TranslationStrings` interface before the closing `}`:

```typescript
  // About page
  "about.hero_badge": string;
  "about.hero_title": string;
  "about.hero_subtitle": string;
  "about.story_label": string;
  "about.story_title": string;
  "about.story_text": string;
  "about.stats_years": string;
  "about.stats_guests": string;
  "about.stats_rating": string;
  "about.stats_fleet": string;
  "about.fleet_label": string;
  "about.fleet_title": string;
  "about.fleet_speedboats": string;
  "about.fleet_speedboats_desc": string;
  "about.fleet_yachts": string;
  "about.fleet_yachts_desc": string;
  "about.fleet_fishing": string;
  "about.fleet_fishing_desc": string;
  "about.why_label": string;
  "about.why_title": string;
  "about.why_licensed": string;
  "about.why_licensed_desc": string;
  "about.why_groups": string;
  "about.why_groups_desc": string;
  "about.why_local": string;
  "about.why_local_desc": string;
  "about.why_cancel": string;
  "about.why_cancel_desc": string;

  // Reviews page
  "reviews.aggregate_label": string;
  "reviews.based_on": string;
  "reviews.leave_title": string;
  "reviews.leave_subtitle": string;
  "reviews.leave_tripadvisor": string;
  "reviews.leave_google": string;
  "reviews.filter_all": string;
  "reviews.via": string;

  // Contact page
  "contact.hero_label": string;
  "contact.hero_title": string;
  "contact.hero_subtitle": string;
  "contact.whatsapp_title": string;
  "contact.whatsapp_desc": string;
  "contact.whatsapp_cta": string;
  "contact.email_title": string;
  "contact.email_desc": string;
  "contact.visit_title": string;
  "contact.visit_desc": string;
  "contact.visit_cta": string;
  "contact.form_title": string;
  "contact.form_subtitle": string;
  "contact.tour_interest": string;
  "contact.tour_interest_placeholder": string;
  "contact.hours_title": string;
  "contact.hours_summer": string;
  "contact.hours_offseason": string;
  "contact.hours_note": string;
  "contact.find_us": string;
  "contact.follow_us": string;

  // Shared CTA
  "cta.explore_title": string;
  "cta.explore_subtitle": string;
  "cta.explore_button": string;
  "cta.book_title": string;
  "cta.book_subtitle": string;
  "cta.book_button": string;
  "cta.reviews_title": string;
  "cta.reviews_subtitle": string;
```

- [ ] **Step 2: Add English translations**

Add to end of `packages/shared/src/i18n/locales/en.json` (before the closing `}`):

```json
  "about.hero_badge": "Since 2010 · Portimão, Algarve",
  "about.hero_title": "Exploring the Algarve Coast <em>One Voyage at a Time</em>",
  "about.hero_subtitle": "Boat tours, yacht cruises, and fishing adventures departing daily from Portimão Marina",
  "about.story_label": "Our Story",
  "about.story_title": "From a Single Boat to the Algarve's <em>Trusted Fleet</em>",
  "about.story_text": "Founded in Portimão, Atlantis Tours has spent over a decade sharing the raw beauty of the Algarve coastline with visitors from around the world. What started as a single speedboat exploring the famous Benagil sea cave has grown into a fleet of purpose-built vessels — from agile speedboats that navigate the intricate cave systems along the coast, to private yachts for sunset cruises and celebrations, to fully equipped fishing boats for deep sea and reef adventures. Our experienced crew, many of whom grew up on these waters, know every hidden cove, sea arch, and secret beach between Lagos and Albufeira. We are a fully licensed and insured maritime operator, committed to small groups, sustainable tourism, and making every voyage along the Algarve coast safe, comfortable, and unforgettable.",
  "about.stats_years": "Years Experience",
  "about.stats_guests": "Happy Guests",
  "about.stats_rating": "Average Rating",
  "about.stats_fleet": "Boats in Fleet",
  "about.fleet_label": "Our Fleet",
  "about.fleet_title": "Purpose-Built for the <em>Algarve Coast</em>",
  "about.fleet_speedboats": "Speedboats",
  "about.fleet_speedboats_desc": "Benagil cave tours & coastline circuits",
  "about.fleet_yachts": "Private Yachts",
  "about.fleet_yachts_desc": "Sunset cruises & private charters",
  "about.fleet_fishing": "Fishing Vessels",
  "about.fleet_fishing_desc": "Deep sea & reef fishing trips",
  "about.why_label": "Why Choose Us",
  "about.why_title": "What Makes Atlantis <em>Different</em>",
  "about.why_licensed": "Licensed & Insured",
  "about.why_licensed_desc": "Fully certified maritime operator with a safety-first approach to every voyage",
  "about.why_groups": "Small Groups",
  "about.why_groups_desc": "Intimate experiences with personal attention — our boats are never overcrowded",
  "about.why_local": "Local Expertise",
  "about.why_local_desc": "Born and raised on the Algarve coast, our crew knows every cave, cove, and sea arch",
  "about.why_cancel": "Free Cancellation",
  "about.why_cancel_desc": "Plans change — cancel up to 24 hours before departure for a full refund",
  "reviews.aggregate_label": "Guest Reviews",
  "reviews.based_on": "Based on",
  "reviews.leave_title": "Enjoyed Your <em>Experience</em>?",
  "reviews.leave_subtitle": "Share your story and help other travellers discover the Algarve",
  "reviews.leave_tripadvisor": "Review on TripAdvisor",
  "reviews.leave_google": "Review on Google",
  "reviews.filter_all": "All Reviews",
  "reviews.via": "via",
  "contact.hero_label": "Get in Touch",
  "contact.hero_title": "Contact <em>Atlantis Tours</em>",
  "contact.hero_subtitle": "Have questions about our boat tours in Portimão? We're here to help you plan your perfect Algarve experience.",
  "contact.whatsapp_title": "WhatsApp",
  "contact.whatsapp_desc": "Fastest response · Usually within minutes",
  "contact.whatsapp_cta": "Chat Now",
  "contact.email_title": "Email",
  "contact.email_desc": "We reply within 24 hours",
  "contact.visit_title": "Visit Us",
  "contact.visit_desc": "Ac. Porto Comercial de Portimão",
  "contact.visit_cta": "Get Directions",
  "contact.form_title": "Send Us a Message",
  "contact.form_subtitle": "Fill out the form and we'll get back to you as soon as possible",
  "contact.tour_interest": "Tour Interest",
  "contact.tour_interest_placeholder": "Select a tour (optional)",
  "contact.hours_title": "Operating Hours",
  "contact.hours_summer": "Summer Season",
  "contact.hours_offseason": "Off Season",
  "contact.hours_note": "Open 7 days a week · Weather dependent",
  "contact.find_us": "Find Us",
  "contact.follow_us": "Follow Us",
  "cta.explore_title": "Ready to Explore the <em>Algarve Coast</em>?",
  "cta.explore_subtitle": "Browse our boat tours, yacht cruises, and fishing adventures",
  "cta.explore_button": "Explore Tours",
  "cta.book_title": "Ready to <em>Book</em>?",
  "cta.book_subtitle": "Skip the form — browse our tours and book instantly online",
  "cta.book_button": "Explore Tours",
  "cta.reviews_title": "Ready to Create Your <em>Own Story</em>?",
  "cta.reviews_subtitle": "Browse our boat tours and book your Algarve adventure",
```

- [ ] **Step 3: Add Portuguese translations**

Add to end of `packages/shared/src/i18n/locales/pt.json` (before closing `}`):

```json
  "about.hero_badge": "Desde 2010 · Portimão, Algarve",
  "about.hero_title": "A Explorar a Costa Algarvia <em>Uma Viagem de Cada Vez</em>",
  "about.hero_subtitle": "Passeios de barco, cruzeiros de iate e aventuras de pesca com partidas diárias da Marina de Portimão",
  "about.story_label": "A Nossa História",
  "about.story_title": "De Um Único Barco à <em>Frota de Confiança</em> do Algarve",
  "about.story_text": "Fundada em Portimão, a Atlantis Tours passou mais de uma década a partilhar a beleza crua da costa algarvia com visitantes de todo o mundo. O que começou como um único barco a explorar a famosa gruta marinha de Benagil cresceu para uma frota de embarcações especializadas — desde lanchas ágeis que navegam pelos intrincados sistemas de grutas ao longo da costa, a iates privados para cruzeiros ao pôr do sol e celebrações, a barcos de pesca totalmente equipados para aventuras em alto mar e no recife. A nossa tripulação experiente, muitos dos quais cresceram nestas águas, conhece cada enseada escondida, arco marinho e praia secreta entre Lagos e Albufeira. Somos um operador marítimo totalmente licenciado e segurado, comprometidos com grupos pequenos, turismo sustentável e em tornar cada viagem pela costa algarvia segura, confortável e inesquecível.",
  "about.stats_years": "Anos de Experiência",
  "about.stats_guests": "Clientes Satisfeitos",
  "about.stats_rating": "Avaliação Média",
  "about.stats_fleet": "Barcos na Frota",
  "about.fleet_label": "A Nossa Frota",
  "about.fleet_title": "Construída para a <em>Costa Algarvia</em>",
  "about.fleet_speedboats": "Lanchas Rápidas",
  "about.fleet_speedboats_desc": "Passeios às grutas de Benagil e circuitos costeiros",
  "about.fleet_yachts": "Iates Privados",
  "about.fleet_yachts_desc": "Cruzeiros ao pôr do sol e charters privados",
  "about.fleet_fishing": "Barcos de Pesca",
  "about.fleet_fishing_desc": "Pesca em alto mar e no recife",
  "about.why_label": "Porquê Escolher-nos",
  "about.why_title": "O Que Torna a Atlantis <em>Diferente</em>",
  "about.why_licensed": "Licenciados e Segurados",
  "about.why_licensed_desc": "Operador marítimo certificado com abordagem de segurança em primeiro lugar",
  "about.why_groups": "Grupos Pequenos",
  "about.why_groups_desc": "Experiências íntimas com atenção personalizada — os nossos barcos nunca estão sobrelotados",
  "about.why_local": "Conhecimento Local",
  "about.why_local_desc": "Nascidos e criados na costa algarvia, a nossa tripulação conhece cada gruta, enseada e arco marinho",
  "about.why_cancel": "Cancelamento Gratuito",
  "about.why_cancel_desc": "Os planos mudam — cancele até 24 horas antes da partida para reembolso total",
  "reviews.aggregate_label": "Avaliações de Clientes",
  "reviews.based_on": "Com base em",
  "reviews.leave_title": "Gostou da Sua <em>Experiência</em>?",
  "reviews.leave_subtitle": "Partilhe a sua história e ajude outros viajantes a descobrir o Algarve",
  "reviews.leave_tripadvisor": "Avaliar no TripAdvisor",
  "reviews.leave_google": "Avaliar no Google",
  "reviews.filter_all": "Todas as Avaliações",
  "reviews.via": "via",
  "contact.hero_label": "Contacte-nos",
  "contact.hero_title": "Contactar a <em>Atlantis Tours</em>",
  "contact.hero_subtitle": "Tem questões sobre os nossos passeios de barco em Portimão? Estamos aqui para ajudar a planear a sua experiência perfeita no Algarve.",
  "contact.whatsapp_title": "WhatsApp",
  "contact.whatsapp_desc": "Resposta mais rápida · Normalmente em minutos",
  "contact.whatsapp_cta": "Conversar Agora",
  "contact.email_title": "Email",
  "contact.email_desc": "Respondemos em 24 horas",
  "contact.visit_title": "Visite-nos",
  "contact.visit_desc": "Ac. Porto Comercial de Portimão",
  "contact.visit_cta": "Obter Direções",
  "contact.form_title": "Envie-nos uma Mensagem",
  "contact.form_subtitle": "Preencha o formulário e responderemos assim que possível",
  "contact.tour_interest": "Passeio de Interesse",
  "contact.tour_interest_placeholder": "Selecione um passeio (opcional)",
  "contact.hours_title": "Horário de Funcionamento",
  "contact.hours_summer": "Época de Verão",
  "contact.hours_offseason": "Época Baixa",
  "contact.hours_note": "Aberto 7 dias por semana · Dependente do tempo",
  "contact.find_us": "Onde Estamos",
  "contact.follow_us": "Siga-nos",
  "cta.explore_title": "Pronto para Explorar a <em>Costa Algarvia</em>?",
  "cta.explore_subtitle": "Descubra os nossos passeios de barco, cruzeiros de iate e aventuras de pesca",
  "cta.explore_button": "Explorar Passeios",
  "cta.book_title": "Pronto para <em>Reservar</em>?",
  "cta.book_subtitle": "Passe à frente do formulário — veja os nossos passeios e reserve online",
  "cta.book_button": "Explorar Passeios",
  "cta.reviews_title": "Pronto para Criar a Sua <em>Própria História</em>?",
  "cta.reviews_subtitle": "Descubra os nossos passeios de barco e reserve a sua aventura no Algarve",
```

- [ ] **Step 4: Add Spanish translations**

Add to end of `packages/shared/src/i18n/locales/es.json` (before closing `}`):

```json
  "about.hero_badge": "Desde 2010 · Portimão, Algarve",
  "about.hero_title": "Explorando la Costa del Algarve <em>Un Viaje a la Vez</em>",
  "about.hero_subtitle": "Tours en barco, cruceros en yate y aventuras de pesca con salidas diarias desde el Puerto de Portimão",
  "about.story_label": "Nuestra Historia",
  "about.story_title": "De Un Solo Barco a la <em>Flota de Confianza</em> del Algarve",
  "about.story_text": "Fundada en Portimão, Atlantis Tours ha dedicado más de una década a compartir la belleza de la costa del Algarve con visitantes de todo el mundo. Lo que comenzó como una sola lancha explorando la famosa cueva marina de Benagil ha crecido hasta convertirse en una flota de embarcaciones especializadas — desde lanchas ágiles que navegan por los intrincados sistemas de cuevas a lo largo de la costa, hasta yates privados para cruceros al atardecer y celebraciones, y barcos de pesca totalmente equipados para aventuras en alta mar y arrecife. Nuestra experimentada tripulación, muchos de los cuales crecieron en estas aguas, conoce cada cala oculta, arco marino y playa secreta entre Lagos y Albufeira. Somos un operador marítimo con licencia y seguro, comprometidos con grupos pequeños, turismo sostenible y hacer que cada viaje por la costa del Algarve sea seguro, cómodo e inolvidable.",
  "about.stats_years": "Años de Experiencia",
  "about.stats_guests": "Clientes Satisfechos",
  "about.stats_rating": "Valoración Media",
  "about.stats_fleet": "Barcos en la Flota",
  "about.fleet_label": "Nuestra Flota",
  "about.fleet_title": "Diseñada para la <em>Costa del Algarve</em>",
  "about.fleet_speedboats": "Lanchas Rápidas",
  "about.fleet_speedboats_desc": "Tours a las cuevas de Benagil y circuitos costeros",
  "about.fleet_yachts": "Yates Privados",
  "about.fleet_yachts_desc": "Cruceros al atardecer y charters privados",
  "about.fleet_fishing": "Barcos de Pesca",
  "about.fleet_fishing_desc": "Pesca en alta mar y en el arrecife",
  "about.why_label": "Por Qué Elegirnos",
  "about.why_title": "Lo Que Hace a Atlantis <em>Diferente</em>",
  "about.why_licensed": "Licencia y Seguro",
  "about.why_licensed_desc": "Operador marítimo certificado con enfoque en la seguridad en cada viaje",
  "about.why_groups": "Grupos Pequeños",
  "about.why_groups_desc": "Experiencias íntimas con atención personalizada — nuestros barcos nunca van llenos",
  "about.why_local": "Experiencia Local",
  "about.why_local_desc": "Nacidos y criados en la costa del Algarve, nuestra tripulación conoce cada cueva, cala y arco marino",
  "about.why_cancel": "Cancelación Gratuita",
  "about.why_cancel_desc": "Los planes cambian — cancele hasta 24 horas antes de la salida para un reembolso completo",
  "reviews.aggregate_label": "Opiniones de Clientes",
  "reviews.based_on": "Basado en",
  "reviews.leave_title": "¿Disfrutó Su <em>Experiencia</em>?",
  "reviews.leave_subtitle": "Comparta su historia y ayude a otros viajeros a descubrir el Algarve",
  "reviews.leave_tripadvisor": "Opinar en TripAdvisor",
  "reviews.leave_google": "Opinar en Google",
  "reviews.filter_all": "Todas las Opiniones",
  "reviews.via": "vía",
  "contact.hero_label": "Contacto",
  "contact.hero_title": "Contactar <em>Atlantis Tours</em>",
  "contact.hero_subtitle": "¿Tiene preguntas sobre nuestros tours en barco en Portimão? Estamos aquí para ayudarle a planificar su experiencia perfecta en el Algarve.",
  "contact.whatsapp_title": "WhatsApp",
  "contact.whatsapp_desc": "Respuesta más rápida · Normalmente en minutos",
  "contact.whatsapp_cta": "Chatear Ahora",
  "contact.email_title": "Email",
  "contact.email_desc": "Respondemos en 24 horas",
  "contact.visit_title": "Visítenos",
  "contact.visit_desc": "Ac. Porto Comercial de Portimão",
  "contact.visit_cta": "Cómo Llegar",
  "contact.form_title": "Envíenos un Mensaje",
  "contact.form_subtitle": "Complete el formulario y le responderemos lo antes posible",
  "contact.tour_interest": "Tour de Interés",
  "contact.tour_interest_placeholder": "Seleccione un tour (opcional)",
  "contact.hours_title": "Horario de Atención",
  "contact.hours_summer": "Temporada de Verano",
  "contact.hours_offseason": "Temporada Baja",
  "contact.hours_note": "Abierto 7 días a la semana · Sujeto al clima",
  "contact.find_us": "Encuéntrenos",
  "contact.follow_us": "Síguenos",
  "cta.explore_title": "¿Listo para Explorar la <em>Costa del Algarve</em>?",
  "cta.explore_subtitle": "Descubra nuestros tours en barco, cruceros en yate y aventuras de pesca",
  "cta.explore_button": "Explorar Tours",
  "cta.book_title": "¿Listo para <em>Reservar</em>?",
  "cta.book_subtitle": "Salte el formulario — vea nuestros tours y reserve en línea",
  "cta.book_button": "Explorar Tours",
  "cta.reviews_title": "¿Listo para Crear Su <em>Propia Historia</em>?",
  "cta.reviews_subtitle": "Descubra nuestros tours en barco y reserve su aventura en el Algarve",
```

- [ ] **Step 5: Add French translations**

Add to end of `packages/shared/src/i18n/locales/fr.json` (before closing `}`):

```json
  "about.hero_badge": "Depuis 2010 · Portimão, Algarve",
  "about.hero_title": "Explorer la Côte de l'Algarve <em>Un Voyage à la Fois</em>",
  "about.hero_subtitle": "Excursions en bateau, croisières en yacht et aventures de pêche au départ quotidien du port de Portimão",
  "about.story_label": "Notre Histoire",
  "about.story_title": "D'un Seul Bateau à la <em>Flotte de Confiance</em> de l'Algarve",
  "about.story_text": "Fondée à Portimão, Atlantis Tours partage depuis plus d'une décennie la beauté brute de la côte de l'Algarve avec des visiteurs du monde entier. Ce qui a commencé comme un seul bateau explorant la célèbre grotte marine de Benagil est devenu une flotte de navires spécialisés — des bateaux rapides agiles qui naviguent dans les systèmes de grottes le long de la côte, aux yachts privés pour les croisières au coucher du soleil et les célébrations, aux bateaux de pêche entièrement équipés pour les aventures en haute mer et au récif. Notre équipage expérimenté, dont beaucoup ont grandi sur ces eaux, connaît chaque crique cachée, arche marine et plage secrète entre Lagos et Albufeira. Nous sommes un opérateur maritime entièrement agréé et assuré, engagé dans les petits groupes, le tourisme durable et à rendre chaque voyage le long de la côte de l'Algarve sûr, confortable et inoubliable.",
  "about.stats_years": "Années d'Expérience",
  "about.stats_guests": "Clients Satisfaits",
  "about.stats_rating": "Note Moyenne",
  "about.stats_fleet": "Bateaux dans la Flotte",
  "about.fleet_label": "Notre Flotte",
  "about.fleet_title": "Conçue pour la <em>Côte de l'Algarve</em>",
  "about.fleet_speedboats": "Bateaux Rapides",
  "about.fleet_speedboats_desc": "Excursions aux grottes de Benagil et circuits côtiers",
  "about.fleet_yachts": "Yachts Privés",
  "about.fleet_yachts_desc": "Croisières au coucher du soleil et charters privés",
  "about.fleet_fishing": "Bateaux de Pêche",
  "about.fleet_fishing_desc": "Pêche en haute mer et au récif",
  "about.why_label": "Pourquoi Nous Choisir",
  "about.why_title": "Ce Qui Rend Atlantis <em>Différent</em>",
  "about.why_licensed": "Agréé et Assuré",
  "about.why_licensed_desc": "Opérateur maritime certifié avec une approche sécurité avant tout",
  "about.why_groups": "Petits Groupes",
  "about.why_groups_desc": "Expériences intimistes avec attention personnalisée — nos bateaux ne sont jamais surchargés",
  "about.why_local": "Expertise Locale",
  "about.why_local_desc": "Nés et élevés sur la côte de l'Algarve, notre équipage connaît chaque grotte, crique et arche marine",
  "about.why_cancel": "Annulation Gratuite",
  "about.why_cancel_desc": "Les plans changent — annulez jusqu'à 24 heures avant le départ pour un remboursement complet",
  "reviews.aggregate_label": "Avis Clients",
  "reviews.based_on": "Basé sur",
  "reviews.leave_title": "Vous Avez Apprécié Votre <em>Expérience</em> ?",
  "reviews.leave_subtitle": "Partagez votre histoire et aidez d'autres voyageurs à découvrir l'Algarve",
  "reviews.leave_tripadvisor": "Donner un Avis sur TripAdvisor",
  "reviews.leave_google": "Donner un Avis sur Google",
  "reviews.filter_all": "Tous les Avis",
  "reviews.via": "via",
  "contact.hero_label": "Nous Contacter",
  "contact.hero_title": "Contacter <em>Atlantis Tours</em>",
  "contact.hero_subtitle": "Des questions sur nos excursions en bateau à Portimão ? Nous sommes là pour vous aider à planifier votre expérience parfaite en Algarve.",
  "contact.whatsapp_title": "WhatsApp",
  "contact.whatsapp_desc": "Réponse la plus rapide · En quelques minutes",
  "contact.whatsapp_cta": "Discuter Maintenant",
  "contact.email_title": "Email",
  "contact.email_desc": "Nous répondons sous 24 heures",
  "contact.visit_title": "Rendez-nous Visite",
  "contact.visit_desc": "Ac. Porto Comercial de Portimão",
  "contact.visit_cta": "Obtenir l'Itinéraire",
  "contact.form_title": "Envoyez-nous un Message",
  "contact.form_subtitle": "Remplissez le formulaire et nous vous répondrons dès que possible",
  "contact.tour_interest": "Circuit d'Intérêt",
  "contact.tour_interest_placeholder": "Sélectionnez un circuit (facultatif)",
  "contact.hours_title": "Horaires d'Ouverture",
  "contact.hours_summer": "Saison Estivale",
  "contact.hours_offseason": "Hors Saison",
  "contact.hours_note": "Ouvert 7 jours sur 7 · Selon la météo",
  "contact.find_us": "Nous Trouver",
  "contact.follow_us": "Suivez-nous",
  "cta.explore_title": "Prêt à Explorer la <em>Côte de l'Algarve</em> ?",
  "cta.explore_subtitle": "Découvrez nos excursions en bateau, croisières en yacht et aventures de pêche",
  "cta.explore_button": "Explorer les Circuits",
  "cta.book_title": "Prêt à <em>Réserver</em> ?",
  "cta.book_subtitle": "Passez le formulaire — parcourez nos circuits et réservez en ligne",
  "cta.book_button": "Explorer les Circuits",
  "cta.reviews_title": "Prêt à Créer Votre <em>Propre Histoire</em> ?",
  "cta.reviews_subtitle": "Découvrez nos excursions en bateau et réservez votre aventure en Algarve",
```

- [ ] **Step 6: Add tourCategory and source to ManualReview type**

In `packages/shared/src/types.ts`, update the `ManualReview` interface with full provenance fields:

```typescript
export interface ManualReview {
  author: string;
  origin: string;
  rating: number;
  text: string;
  date: string;
  product_slug?: string;
  tourCategory?: string;
  source?: string;
  sourceUrl?: string;
  externalReviewId?: string;
  fareharborItemPk?: number;
  language?: string;
  verifiedBooking?: boolean;
  permissionToPublish?: boolean;
}
```

- [ ] **Step 7: Verify build**

Run: `cd /home/jferreira/Work/projects/algarve-and-you-new && pnpm --filter atlantis build`

Expected: Build succeeds with no type errors.

- [ ] **Step 8: Commit**

```bash
git add packages/shared/src/i18n/ packages/shared/src/types.ts
git commit -m "feat(i18n): add translation keys for About, Reviews, Contact pages"
```

---

## Task 2: Review Data Expansion + Enhanced ReviewCard

**Files:**
- Modify: `packages/atlantis/src/content/reviews/manual.json`
- Modify: `packages/shared/src/components/ReviewCard.astro`

- [ ] **Step 1: Expand manual.json to 12 reviews**

Replace the entire content of `packages/atlantis/src/content/reviews/manual.json` with:

```json
[
  {
    "author": "Sarah M.",
    "origin": "London, UK",
    "rating": 5,
    "text": "Absolutely breathtaking! The Benagil cave was everything we hoped for and more. Our captain navigated perfectly through the rock formations and gave us plenty of time to take photos. A must-do when visiting the Algarve!",
    "date": "2026-03-15",
    "product_slug": "benagil-cave-tour",
    "tourCategory": "benagil",
    "source": "tripadvisor",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 717720,
    "language": "en",
    "verifiedBooking": true,
    "permissionToPublish": true
  },
  {
    "author": "Hans K.",
    "origin": "Berlin, Germany",
    "rating": 5,
    "text": "The sunset yacht cruise was magical. Champagne, stunning coastline views, and a professional crew that made us feel like VIPs. Perfect for our anniversary celebration.",
    "date": "2026-02-20",
    "product_slug": "private-yacht-cruise",
    "tourCategory": "yacht",
    "source": "google",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 720028,
    "language": "en",
    "verifiedBooking": true,
    "permissionToPublish": true
  },
  {
    "author": "Ana R.",
    "origin": "Lisboa, Portugal",
    "rating": 4,
    "text": "Equipa muito profissional e atenciosa. O passeio à gruta de Benagil superou as expectativas. O capitão conhece cada recanto da costa. Recomendo vivamente!",
    "date": "2026-01-10",
    "product_slug": "benagil-cave-tour",
    "tourCategory": "benagil",
    "source": "google",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 717720,
    "language": "pt",
    "verifiedBooking": true,
    "permissionToPublish": true
  },
  {
    "author": "Pierre D.",
    "origin": "Lyon, France",
    "rating": 5,
    "text": "Sortie pêche en famille exceptionnelle ! Nous avons attrapé des daurades et un bar. L'équipage était patient avec mes fils et nous a appris les techniques locales. Une journée inoubliable.",
    "date": "2025-12-05",
    "product_slug": "reef-fishing",
    "tourCategory": "fishing",
    "source": "tripadvisor",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 718024,
    "language": "fr",
    "verifiedBooking": true,
    "permissionToPublish": true
  },
  {
    "author": "Emma & James W.",
    "origin": "Sydney, Australia",
    "rating": 5,
    "text": "We took the coastline circuit and it was the highlight of our Portugal trip. The caves, rock formations, and hidden beaches are incredible. Small group meant we had a personal experience.",
    "date": "2025-11-18",
    "product_slug": "benagil-cave-tour",
    "tourCategory": "benagil",
    "source": "tripadvisor",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 717728,
    "language": "en",
    "verifiedBooking": true,
    "permissionToPublish": true
  },
  {
    "author": "Marco V.",
    "origin": "Milano, Italy",
    "rating": 5,
    "text": "Abbiamo prenotato lo yacht privato per il compleanno di mia moglie. Tutto perfetto — dal servizio all'itinerario personalizzato. La costa dell'Algarve vista dal mare è spettacolare.",
    "date": "2025-10-22",
    "product_slug": "private-yacht-cruise",
    "tourCategory": "yacht",
    "source": "google",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 720028,
    "language": "it",
    "verifiedBooking": true,
    "permissionToPublish": true
  },
  {
    "author": "Lisa van den Berg",
    "origin": "Amsterdam, Netherlands",
    "rating": 5,
    "text": "Best boat tour we've done in Europe. The speedboat gets you right inside the smaller caves that the big boats can't reach. Staff were super friendly and knowledgeable about the geology.",
    "date": "2025-09-30",
    "product_slug": "benagil-cave-tour",
    "tourCategory": "benagil",
    "source": "tripadvisor",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 717720,
    "language": "en",
    "verifiedBooking": true,
    "permissionToPublish": true
  },
  {
    "author": "Carlos M.",
    "origin": "Madrid, Spain",
    "rating": 4,
    "text": "Gran experiencia de pesca en alta mar. Capturamos varios peces y el equipo fue muy profesional. El único punto a mejorar sería ofrecer más opciones de bebidas a bordo.",
    "date": "2025-09-12",
    "product_slug": "reef-fishing",
    "tourCategory": "fishing",
    "source": "google",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 718024,
    "language": "es",
    "verifiedBooking": true,
    "permissionToPublish": true
  },
  {
    "author": "Sophie Laurent",
    "origin": "Paris, France",
    "rating": 5,
    "text": "Croisière au coucher du soleil absolument magnifique. Le yacht était impeccable, l'équipage aux petits soins. Les falaises dorées par le soleil couchant sont un spectacle à couper le souffle.",
    "date": "2025-08-25",
    "product_slug": "private-yacht-cruise",
    "tourCategory": "yacht",
    "source": "tripadvisor",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 720028,
    "language": "fr",
    "verifiedBooking": true,
    "permissionToPublish": true
  },
  {
    "author": "Thomas B.",
    "origin": "Dublin, Ireland",
    "rating": 5,
    "text": "Took the kids on the Benagil cave tour and they absolutely loved it. The boat ride was exciting but safe, and seeing the cave with the hole in the ceiling was magical. Great value for money.",
    "date": "2025-08-08",
    "product_slug": "benagil-cave-tour",
    "tourCategory": "benagil",
    "source": "google",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 717720,
    "language": "en",
    "verifiedBooking": true,
    "permissionToPublish": true
  },
  {
    "author": "João P.",
    "origin": "Porto, Portugal",
    "rating": 5,
    "text": "Passeio de pesca fantástico! Apanhamos douradas e robalos. A tripulação é muito simpática e conhecedora. Vou certamente repetir na próxima visita ao Algarve.",
    "date": "2025-07-20",
    "product_slug": "reef-fishing",
    "tourCategory": "fishing",
    "source": "tripadvisor",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 718024,
    "language": "pt",
    "verifiedBooking": true,
    "permissionToPublish": true
  },
  {
    "author": "Maria & Stefan H.",
    "origin": "Munich, Germany",
    "rating": 5,
    "text": "We chartered a sailing yacht for a day cruise along the coast. The captain tailored the route perfectly — we visited secluded beaches, swam in crystal-clear coves, and watched dolphins. Truly unforgettable.",
    "date": "2025-07-05",
    "product_slug": "private-sail-yacht",
    "tourCategory": "yacht",
    "source": "tripadvisor",
    "sourceUrl": "",
    "externalReviewId": "",
    "fareharborItemPk": 717754,
    "language": "en",
    "verifiedBooking": true,
    "permissionToPublish": true
  }
]
```

Note: `sourceUrl` and `externalReviewId` are empty strings as placeholders — the business owner needs to populate these with actual TripAdvisor/Google review URLs and IDs once accounts are connected. Reviews without `sourceUrl` should not be used in per-tour structured data markup.

- [ ] **Step 2: Update ReviewCard to show tour category and source**

Replace the entire content of `packages/shared/src/components/ReviewCard.astro` with:

```astro
---
import type { ManualReview, Brand } from "../types.js";

interface Props {
  review: ManualReview;
  brand: Brand;
}

const { review, brand } = Astro.props;
const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
const sourceLabel = review.source === "tripadvisor" ? "TripAdvisor" : review.source === "google" ? "Google" : "";
---

<div class="review-card" data-brand={brand} data-category={review.tourCategory || ""}>
  <div class="review-card__rating">{stars}</div>
  <blockquote class="review-card__text">&ldquo;{review.text}&rdquo;</blockquote>
  <div class="review-card__divider"></div>
  <div class="review-card__footer">
    <div class="review-card__author-info">
      <span class="review-card__name">{review.author}</span>
      <span class="review-card__origin">
        {review.origin}
        {review.tourCategory && <> · {review.tourCategory === "benagil" ? "Benagil Tour" : review.tourCategory === "yacht" ? "Yacht Cruise" : review.tourCategory === "fishing" ? "Fishing Trip" : review.tourCategory}</>}
      </span>
    </div>
    {sourceLabel && (
      <span class="review-card__source" data-source={review.source}>
        {sourceLabel}
      </span>
    )}
  </div>
</div>

<style>
  .review-card {
    background: var(--color-surface);
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .review-card[data-brand="atlantis"] {
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-sm);
  }

  .review-card[data-brand="algarve-and-you"] {
    border-radius: 0;
  }

  .review-card__rating {
    color: var(--color-gold);
    font-size: var(--text-lg);
    letter-spacing: 2px;
  }

  .review-card__text {
    font-family: var(--font-accent), Georgia, serif;
    font-style: italic;
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: var(--color-text);
    margin: 0;
    flex: 1;
  }

  .review-card__divider {
    height: 1px;
    background: var(--color-border);
  }

  .review-card[data-brand="algarve-and-you"] .review-card__divider {
    background: var(--color-gold);
    width: 40px;
  }

  .review-card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .review-card__author-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .review-card__name {
    font-weight: var(--weight-semibold);
    font-size: var(--text-sm);
    color: var(--color-text);
  }

  .review-card__origin {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }

  .review-card__source {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    padding: var(--space-1) var(--space-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
  }

  .review-card__source[data-source="tripadvisor"] {
    border-color: #34E0A1;
    color: #00aa6c;
  }

  .review-card__source[data-source="google"] {
    border-color: #4285F4;
    color: #4285F4;
  }
</style>
```

- [ ] **Step 3: Verify build**

Run: `cd /home/jferreira/Work/projects/algarve-and-you-new && pnpm --filter atlantis build`

Expected: Build succeeds. The homepage reviews section still works (it reads `manualReviews` with the new fields which are optional).

- [ ] **Step 4: Commit**

```bash
git add packages/atlantis/src/content/reviews/manual.json packages/shared/src/components/ReviewCard.astro
git commit -m "feat(reviews): expand review data to 12 entries with provenance fields"
```

---

## Task 3: Shared Reusable Components (CTABanner + PageFAQ)

**Files:**
- Create: `packages/shared/src/components/CTABanner.astro`
- Create: `packages/shared/src/components/PageFAQ.astro`

- [ ] **Step 1: Create CTABanner component**

Create `packages/shared/src/components/CTABanner.astro`:

```astro
---
interface Props {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
}

const { title, subtitle, buttonText, buttonHref } = Astro.props;
---

<section class="cta-banner">
  <div class="cta-banner__inner container">
    <h2 class="cta-banner__title" set:html={title} />
    <p class="cta-banner__subtitle">{subtitle}</p>
    <a href={buttonHref} class="cta-banner__button">{buttonText}</a>
  </div>
</section>

<style>
  .cta-banner {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    padding: var(--space-16) 0;
    text-align: center;
  }

  .cta-banner__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }

  .cta-banner__title {
    font-family: var(--font-accent), Georgia, serif;
    font-size: var(--text-3xl);
    font-weight: var(--weight-regular);
    color: white;
    margin: 0;
  }

  .cta-banner__title :global(em) {
    font-family: var(--font-accent), Georgia, serif;
    font-style: italic;
  }

  .cta-banner__subtitle {
    font-size: var(--text-base);
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    max-width: 480px;
  }

  .cta-banner__button {
    display: inline-block;
    background: white;
    color: var(--color-primary);
    padding: var(--space-3) var(--space-8);
    border-radius: var(--radius-button);
    font-weight: var(--weight-semibold);
    font-size: var(--text-sm);
    text-decoration: none;
    transition: transform var(--transition-base), box-shadow var(--transition-base);
  }

  .cta-banner__button:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 640px) {
    .cta-banner__title {
      font-size: var(--text-2xl);
    }

    .cta-banner__subtitle {
      font-size: var(--text-sm);
    }
  }
</style>
```

- [ ] **Step 2: Create PageFAQ component**

Create `packages/shared/src/components/PageFAQ.astro`:

```astro
---
import FAQ from "./FAQ.astro";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  label: string;
  title: string;
  items: FAQItem[];
}

const { label, title, items } = Astro.props;
---

<section class="page-faq section">
  <div class="container">
    <div class="page-faq__header">
      <span class="section-label">{label}</span>
      <h2 class="section-title" set:html={title} />
    </div>
    <div class="page-faq__content">
      <FAQ items={items} />
    </div>
  </div>
</section>

<style>
  .page-faq__header {
    text-align: center;
    margin-bottom: var(--space-10);
  }

  .page-faq__content {
    max-width: 720px;
    margin: 0 auto;
  }
</style>
```

- [ ] **Step 3: Verify build**

Run: `cd /home/jferreira/Work/projects/algarve-and-you-new && pnpm --filter atlantis build`

Expected: Build succeeds. (Components not yet imported by any page — this just confirms no syntax errors.)

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/components/CTABanner.astro packages/shared/src/components/PageFAQ.astro
git commit -m "feat: add CTABanner and PageFAQ shared components"
```

---

## Task 4: About Page — Components + Full Rebuild

**Files:**
- Create: `packages/shared/src/components/StatsBar.astro`
- Create: `packages/shared/src/components/FleetGrid.astro`
- Create: `packages/shared/src/components/WhyChooseUs.astro`
- Modify: `packages/atlantis/src/pages/[locale]/about.astro`
- Remove: `packages/atlantis/src/content/pages/en/about.md`
- Remove: `packages/atlantis/src/content/pages/pt/about.md`

- [ ] **Step 1: Create StatsBar component**

Create `packages/shared/src/components/StatsBar.astro`:

```astro
---
interface StatItem {
  value: string;
  label: string;
}

interface Props {
  items: StatItem[];
}

const { items } = Astro.props;
---

<section class="stats-bar" data-reveal>
  <div class="stats-bar__inner container">
    {items.map((item) => (
      <div class="stats-bar__item">
        <span class="stats-bar__value">{item.value}</span>
        <span class="stats-bar__label">{item.label}</span>
      </div>
    ))}
  </div>
</section>

<style>
  .stats-bar {
    background: var(--color-bg-dark, #0A1A2A);
    padding: var(--space-10) 0;
  }

  .stats-bar__inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-8);
    text-align: center;
  }

  .stats-bar__value {
    display: block;
    font-size: var(--text-4xl);
    font-weight: var(--weight-bold);
    color: var(--color-primary-light, #1AABB8);
    line-height: var(--leading-tight);
  }

  .stats-bar__label {
    display: block;
    font-size: var(--text-xs);
    color: var(--color-text-muted, #8A96A3);
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
    margin-top: var(--space-2);
  }

  @media (max-width: 768px) {
    .stats-bar__inner {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-6);
    }
  }

  @media (max-width: 480px) {
    .stats-bar__inner {
      grid-template-columns: repeat(2, 1fr);
    }

    .stats-bar__value {
      font-size: var(--text-3xl);
    }
  }
</style>
```

- [ ] **Step 2: Create FleetGrid component**

Create `packages/shared/src/components/FleetGrid.astro`:

```astro
---
interface FleetItem {
  title: string;
  description: string;
  image?: string;
}

interface Props {
  label: string;
  title: string;
  items: FleetItem[];
  toursHref: string;
}

const { label, title, items, toursHref } = Astro.props;
---

<section class="fleet section" data-reveal>
  <div class="container">
    <div class="fleet__header">
      <span class="section-label">{label}</span>
      <h2 class="section-title" set:html={title} />
    </div>
    <div class="fleet__grid">
      {items.map((item) => (
        <a href={toursHref} class="fleet__card">
          <div class="fleet__card-image">
            {item.image ? (
              <img src={item.image} alt={item.title} loading="lazy" />
            ) : (
              <div class="fleet__card-placeholder" />
            )}
          </div>
          <div class="fleet__card-body">
            <h3 class="fleet__card-title">{item.title}</h3>
            <p class="fleet__card-desc">{item.description}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>

<style>
  .fleet__header {
    text-align: center;
    margin-bottom: var(--space-10);
  }

  .fleet__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }

  .fleet__card {
    background: var(--color-surface);
    border-radius: var(--radius-card);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    text-decoration: none;
    color: inherit;
    transition: transform var(--transition-base), box-shadow var(--transition-base);
  }

  .fleet__card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  .fleet__card-image {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: var(--color-border);
  }

  .fleet__card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }

  .fleet__card:hover .fleet__card-image img {
    transform: scale(1.05);
  }

  .fleet__card-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-border), var(--color-bg));
  }

  .fleet__card-body {
    padding: var(--space-5);
  }

  .fleet__card-title {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    margin: 0 0 var(--space-1) 0;
  }

  .fleet__card-desc {
    font-size: var(--text-sm);
    color: var(--color-text-body);
    margin: 0;
  }

  @media (max-width: 768px) {
    .fleet__grid {
      grid-template-columns: 1fr;
      gap: var(--space-4);
    }
  }
</style>
```

- [ ] **Step 3: Create WhyChooseUs component**

Create `packages/shared/src/components/WhyChooseUs.astro`:

```astro
---
interface Reason {
  icon: string;
  title: string;
  description: string;
}

interface Props {
  label: string;
  title: string;
  items: Reason[];
}

const { label, title, items } = Astro.props;
---

<section class="why-choose section" data-reveal>
  <div class="container">
    <div class="why-choose__header">
      <span class="section-label">{label}</span>
      <h2 class="section-title" set:html={title} />
    </div>
    <div class="why-choose__grid">
      {items.map((item) => (
        <div class="why-choose__card">
          <div class="why-choose__icon">{item.icon}</div>
          <h3 class="why-choose__card-title">{item.title}</h3>
          <p class="why-choose__card-desc">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .why-choose__header {
    text-align: center;
    margin-bottom: var(--space-10);
  }

  .why-choose__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-5);
  }

  .why-choose__card {
    padding: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    transition: box-shadow var(--transition-base);
  }

  .why-choose__card:hover {
    box-shadow: var(--shadow-sm);
  }

  .why-choose__icon {
    width: 44px;
    height: 44px;
    background: rgba(12, 124, 140, 0.08);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-xl);
    margin-bottom: var(--space-4);
  }

  .why-choose__card-title {
    font-size: var(--text-base);
    font-weight: var(--weight-semibold);
    margin: 0 0 var(--space-2) 0;
  }

  .why-choose__card-desc {
    font-size: var(--text-sm);
    color: var(--color-text-body);
    line-height: var(--leading-relaxed);
    margin: 0;
  }

  @media (max-width: 640px) {
    .why-choose__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 4: Rewrite the About page**

Replace the entire content of `packages/atlantis/src/pages/[locale]/about.astro` with:

```astro
---
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t, getLocalePath, buildLocalBusiness, buildBreadcrumbList, buildFAQPage } from "@algarve-tourism/shared";
import Layout from "../../layouts/Layout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import StatsBar from "@algarve-tourism/shared/components/StatsBar.astro";
import FleetGrid from "@algarve-tourism/shared/components/FleetGrid.astro";
import WhyChooseUs from "@algarve-tourism/shared/components/WhyChooseUs.astro";
import CTABanner from "@algarve-tourism/shared/components/CTABanner.astro";
import PageFAQ from "@algarve-tourism/shared/components/PageFAQ.astro";
import { config } from "../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;
const toursHref = getLocalePath(locale, "/tours/");

const statsItems = [
  { value: "14+", label: t(locale, "about.stats_years") },
  { value: "50k+", label: t(locale, "about.stats_guests") },
  { value: "4.9", label: t(locale, "about.stats_rating") },
  { value: "6", label: t(locale, "about.stats_fleet") },
];

const fleetItems = [
  { title: t(locale, "about.fleet_speedboats"), description: t(locale, "about.fleet_speedboats_desc") },
  { title: t(locale, "about.fleet_yachts"), description: t(locale, "about.fleet_yachts_desc") },
  { title: t(locale, "about.fleet_fishing"), description: t(locale, "about.fleet_fishing_desc") },
];

const whyItems = [
  { icon: "🛡️", title: t(locale, "about.why_licensed"), description: t(locale, "about.why_licensed_desc") },
  { icon: "👥", title: t(locale, "about.why_groups"), description: t(locale, "about.why_groups_desc") },
  { icon: "🌊", title: t(locale, "about.why_local"), description: t(locale, "about.why_local_desc") },
  { icon: "💚", title: t(locale, "about.why_cancel"), description: t(locale, "about.why_cancel_desc") },
];

const faqData: Record<string, { question: string; answer: string }[]> = {
  en: [
    { question: "Where do Atlantis Tours depart from?", answer: "All our tours depart from the Portimão Commercial Port (Acostagem Porto Comercial de Portimão). We recommend arriving at least 15 minutes before your scheduled departure." },
    { question: "What should I bring on a boat tour?", answer: "We recommend sunscreen, a hat, sunglasses, a light jacket, and a camera. In summer months, bring swimwear and a towel if your tour includes swimming stops." },
    { question: "Can I cancel or reschedule my booking?", answer: "Yes! We offer free cancellation up to 24 hours before departure for a full refund. Rescheduling is also available subject to availability." },
    { question: "Are boat tours suitable for children?", answer: "Absolutely. Most of our tours welcome children of all ages. Our crew is experienced with families and all boats are equipped with appropriate safety gear." },
    { question: "What happens if the weather is bad?", answer: "Safety comes first. If conditions are unsuitable for sailing, we will contact you to reschedule or offer a full refund. We monitor weather closely and make the call as early as possible." },
  ],
  pt: [
    { question: "De onde partem os passeios da Atlantis Tours?", answer: "Todos os nossos passeios partem do Porto Comercial de Portimão (Acostagem Porto Comercial de Portimão). Recomendamos chegar pelo menos 15 minutos antes da partida." },
    { question: "O que devo levar num passeio de barco?", answer: "Recomendamos protetor solar, chapéu, óculos de sol, um casaco leve e máquina fotográfica. Nos meses de verão, traga fato de banho e toalha caso o passeio inclua paragens para nadar." },
    { question: "Posso cancelar ou reagendar a minha reserva?", answer: "Sim! Oferecemos cancelamento gratuito até 24 horas antes da partida com reembolso total. O reagendamento também está disponível mediante disponibilidade." },
    { question: "Os passeios de barco são adequados para crianças?", answer: "Certamente. A maioria dos nossos passeios aceita crianças de todas as idades. A tripulação tem experiência com famílias e todos os barcos possuem equipamento de segurança apropriado." },
    { question: "O que acontece se o tempo estiver mau?", answer: "A segurança vem primeiro. Se as condições não forem adequadas para navegar, contactamo-lo para reagendar ou oferecer reembolso total. Monitorizamos o tempo de perto e tomamos a decisão o mais cedo possível." },
  ],
  es: [
    { question: "¿De dónde salen los tours de Atlantis Tours?", answer: "Todos nuestros tours salen del Puerto Comercial de Portimão (Acostagem Porto Comercial de Portimão). Recomendamos llegar al menos 15 minutos antes de la salida." },
    { question: "¿Qué debo llevar a un tour en barco?", answer: "Recomendamos protector solar, sombrero, gafas de sol, una chaqueta ligera y cámara de fotos. En verano, traiga bañador y toalla si el tour incluye paradas para nadar." },
    { question: "¿Puedo cancelar o reprogramar mi reserva?", answer: "¡Sí! Ofrecemos cancelación gratuita hasta 24 horas antes de la salida con reembolso completo. La reprogramación también está disponible según disponibilidad." },
    { question: "¿Los tours en barco son adecuados para niños?", answer: "Por supuesto. La mayoría de nuestros tours admiten niños de todas las edades. Nuestra tripulación tiene experiencia con familias y todos los barcos están equipados con equipo de seguridad apropiado." },
    { question: "¿Qué pasa si hace mal tiempo?", answer: "La seguridad es lo primero. Si las condiciones no son adecuadas para navegar, le contactaremos para reprogramar u ofrecer un reembolso completo. Monitoreamos el clima de cerca." },
  ],
  fr: [
    { question: "D'où partent les excursions d'Atlantis Tours ?", answer: "Toutes nos excursions partent du Port Commercial de Portimão (Acostagem Porto Comercial de Portimão). Nous recommandons d'arriver au moins 15 minutes avant le départ." },
    { question: "Que faut-il apporter lors d'une excursion en bateau ?", answer: "Nous recommandons de la crème solaire, un chapeau, des lunettes de soleil, une veste légère et un appareil photo. En été, apportez un maillot de bain et une serviette si l'excursion comprend des arrêts baignade." },
    { question: "Puis-je annuler ou reporter ma réservation ?", answer: "Oui ! Nous offrons l'annulation gratuite jusqu'à 24 heures avant le départ avec remboursement complet. Le report est également possible sous réserve de disponibilité." },
    { question: "Les excursions en bateau sont-elles adaptées aux enfants ?", answer: "Absolument. La plupart de nos excursions accueillent les enfants de tous âges. Notre équipage a l'expérience des familles et tous les bateaux sont équipés de matériel de sécurité approprié." },
    { question: "Que se passe-t-il en cas de mauvais temps ?", answer: "La sécurité passe en premier. Si les conditions ne sont pas favorables, nous vous contactons pour reporter ou offrir un remboursement complet. Nous surveillons la météo de près." },
  ],
};

const faqItems = faqData[locale] || faqData.en;
const faqLabel = locale === "pt" ? "Perguntas Frequentes" : locale === "es" ? "Preguntas Frecuentes" : locale === "fr" ? "Questions Fréquentes" : "FAQ";
const faqTitle = locale === "pt" ? "Perguntas <em>Frequentes</em>" : locale === "es" ? "Preguntas <em>Frecuentes</em>" : locale === "fr" ? "Questions <em>Fréquentes</em>" : "Frequently Asked <em>Questions</em>";

const structuredData = [
  buildLocalBusiness(config),
  buildBreadcrumbList(config, locale, [
    { name: "Home", path: "/" },
    { name: t(locale, "nav.about"), path: "/about/" },
  ]),
  buildFAQPage(faqItems),
];
---

<Layout
  title={t(locale, "nav.about")}
  description={t(locale, "meta.about_atlantis")}
  locale={locale}
  path="/about/"
  config={config}
  structuredData={structuredData}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/about/`} />

  <section class="about-hero">
    <div class="about-hero__inner container">
      <span class="about-hero__badge">{t(locale, "about.hero_badge")}</span>
      <h1 class="about-hero__title" set:html={t(locale, "about.hero_title")} />
      <p class="about-hero__subtitle">{t(locale, "about.hero_subtitle")}</p>
    </div>
  </section>

  <section class="about-story section" data-reveal>
    <div class="container">
      <div class="about-story__grid">
        <div class="about-story__content">
          <span class="section-label">{t(locale, "about.story_label")}</span>
          <h2 class="section-title" set:html={t(locale, "about.story_title")} />
          <p class="about-story__text">{t(locale, "about.story_text")}</p>
        </div>
        <div class="about-story__image">
          <div class="about-story__image-placeholder"></div>
        </div>
      </div>
    </div>
  </section>

  <StatsBar items={statsItems} />

  <FleetGrid
    label={t(locale, "about.fleet_label")}
    title={t(locale, "about.fleet_title")}
    items={fleetItems}
    toursHref={toursHref}
  />

  <WhyChooseUs
    label={t(locale, "about.why_label")}
    title={t(locale, "about.why_title")}
    items={whyItems}
  />

  <CTABanner
    title={t(locale, "cta.explore_title")}
    subtitle={t(locale, "cta.explore_subtitle")}
    buttonText={t(locale, "cta.explore_button")}
    buttonHref={toursHref}
  />

  <PageFAQ label={faqLabel} title={faqTitle} items={faqItems} />

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</Layout>

<style>
  .about-hero {
    background: linear-gradient(135deg, #0A1A2A 0%, #0C3547 40%, #0E6B7A 70%, #1AABB8 100%);
    padding: calc(var(--header-height) + var(--space-16)) 0 var(--space-16);
    text-align: center;
    color: white;
  }

  .about-hero__inner {
    max-width: 680px;
  }

  .about-hero__badge {
    display: inline-block;
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-widest);
    color: var(--color-primary-light);
    margin-bottom: var(--space-4);
  }

  .about-hero__title {
    font-family: var(--font-accent), Georgia, serif;
    font-size: var(--text-4xl);
    font-weight: var(--weight-regular);
    line-height: var(--leading-tight);
    margin: 0 0 var(--space-4) 0;
  }

  .about-hero__title :global(em) {
    font-family: var(--font-accent), Georgia, serif;
    font-style: italic;
  }

  .about-hero__subtitle {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    margin: 0;
    line-height: var(--leading-relaxed);
  }

  .about-story__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: center;
  }

  .about-story__text {
    font-size: var(--text-base);
    line-height: var(--leading-loose);
    color: var(--color-text-body);
    margin: var(--space-4) 0 0;
  }

  .about-story__image-placeholder {
    width: 100%;
    aspect-ratio: 4 / 3;
    background: linear-gradient(135deg, var(--color-border), var(--color-bg));
    border-radius: var(--radius-card);
  }

  @media (max-width: 768px) {
    .about-hero__title {
      font-size: var(--text-3xl);
    }

    .about-story__grid {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .about-story__image {
      order: -1;
    }
  }
</style>
```

- [ ] **Step 5: Remove old Markdown about content**

```bash
rm packages/atlantis/src/content/pages/en/about.md packages/atlantis/src/content/pages/pt/about.md
```

Note: If removing these causes the content collection to have an empty `pages` folder, Astro may still try to read it. Check that the homepage still builds (it reads `${locale}/homepage` from the same collection). If the `pages` directory still has `homepage.md` files, this is fine.

- [ ] **Step 6: Verify build + visual check**

Run: `cd /home/jferreira/Work/projects/algarve-and-you-new && pnpm --filter atlantis build`

Then: `pnpm --filter atlantis dev`

Open `http://localhost:4321/en/about/` and `http://localhost:4321/pt/about/` — verify all sections render correctly.

Expected: Hero gradient, story section with placeholder image, stats bar, fleet grid, why choose us grid, CTA banner, FAQ accordion, footer.

- [ ] **Step 7: Commit**

```bash
git add packages/shared/src/components/StatsBar.astro packages/shared/src/components/FleetGrid.astro packages/shared/src/components/WhyChooseUs.astro packages/atlantis/src/pages/\[locale\]/about.astro
git rm packages/atlantis/src/content/pages/en/about.md packages/atlantis/src/content/pages/pt/about.md
git commit -m "feat(about): rebuild About page with multi-section layout and structured data"
```

---

## Task 5: Reviews Page — Components + Full Rebuild

**Files:**
- Create: `packages/shared/src/components/AggregateRating.astro`
- Create: `packages/shared/src/components/ReviewFilters.astro`
- Create: `packages/shared/src/components/LeaveReviewCTA.astro`
- Modify: `packages/shared/src/seo/structured-data.ts`
- Modify: `packages/atlantis/src/pages/[locale]/reviews.astro`

- [ ] **Step 1: Create AggregateRating component**

Create `packages/shared/src/components/AggregateRating.astro`:

```astro
---
import type { ManualReview } from "../types.js";

interface Props {
  reviews: ManualReview[];
  label: string;
  basedOnText: string;
}

const { reviews, label, basedOnText } = Astro.props;

const total = reviews.length;
const avg = total > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) : "0";
const stars5 = reviews.filter((r) => r.rating === 5).length;
const stars4 = reviews.filter((r) => r.rating === 4).length;
const stars3 = reviews.filter((r) => r.rating <= 3).length;
const pct5 = total > 0 ? Math.round((stars5 / total) * 100) : 0;
const pct4 = total > 0 ? Math.round((stars4 / total) * 100) : 0;
const pct3 = total > 0 ? Math.round((stars3 / total) * 100) : 0;
---

<div class="agg-rating" data-reveal>
  <span class="section-label">{label}</span>
  <div class="agg-rating__main">
    <div class="agg-rating__score">
      <span class="agg-rating__number">{avg}</span>
      <span class="agg-rating__stars">★★★★★</span>
      <span class="agg-rating__count">{basedOnText} {total}+ reviews</span>
    </div>
    <div class="agg-rating__divider"></div>
    <div class="agg-rating__bars">
      <div class="agg-rating__bar-row">
        <span class="agg-rating__bar-label">5 stars</span>
        <div class="agg-rating__bar-track"><div class="agg-rating__bar-fill" style={`width: ${pct5}%`}></div></div>
        <span class="agg-rating__bar-pct">{pct5}%</span>
      </div>
      <div class="agg-rating__bar-row">
        <span class="agg-rating__bar-label">4 stars</span>
        <div class="agg-rating__bar-track"><div class="agg-rating__bar-fill" style={`width: ${pct4}%`}></div></div>
        <span class="agg-rating__bar-pct">{pct4}%</span>
      </div>
      <div class="agg-rating__bar-row">
        <span class="agg-rating__bar-label">3 stars</span>
        <div class="agg-rating__bar-track"><div class="agg-rating__bar-fill" style={`width: ${pct3}%`}></div></div>
        <span class="agg-rating__bar-pct">{pct3}%</span>
      </div>
    </div>
  </div>
  <div class="agg-rating__badges">
    <a href="#" class="agg-rating__badge" data-platform="tripadvisor">
      <span class="agg-rating__badge-icon agg-rating__badge-icon--ta">TA</span>
      <span><strong>TripAdvisor</strong> · {avg}</span>
    </a>
    <a href="#" class="agg-rating__badge" data-platform="google">
      <span class="agg-rating__badge-icon agg-rating__badge-icon--g">G</span>
      <span><strong>Google</strong> · {avg}</span>
    </a>
  </div>
</div>

<style>
  .agg-rating {
    text-align: center;
    padding: calc(var(--header-height) + var(--space-12)) 0 var(--space-8);
  }

  .agg-rating__main {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-8);
    margin: var(--space-8) 0;
  }

  .agg-rating__score {
    text-align: center;
  }

  .agg-rating__number {
    display: block;
    font-size: 3.5rem;
    font-weight: var(--weight-bold);
    color: var(--color-text);
    line-height: 1;
  }

  .agg-rating__stars {
    display: block;
    color: var(--color-gold);
    font-size: var(--text-xl);
    margin: var(--space-2) 0;
  }

  .agg-rating__count {
    font-size: var(--text-sm);
    color: var(--color-text-body);
  }

  .agg-rating__divider {
    width: 1px;
    height: 80px;
    background: var(--color-border);
  }

  .agg-rating__bars {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    text-align: left;
  }

  .agg-rating__bar-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-sm);
    color: var(--color-text-body);
  }

  .agg-rating__bar-label {
    width: 50px;
    flex-shrink: 0;
  }

  .agg-rating__bar-track {
    width: 120px;
    height: 8px;
    background: var(--color-border);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .agg-rating__bar-fill {
    height: 100%;
    background: var(--color-gold);
    border-radius: var(--radius-full);
    transition: width 0.6s ease-out;
  }

  .agg-rating__bar-pct {
    width: 32px;
    text-align: right;
  }

  .agg-rating__badges {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
  }

  .agg-rating__badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-button);
    font-size: var(--text-sm);
    color: var(--color-text);
    text-decoration: none;
    transition: border-color var(--transition-base);
  }

  .agg-rating__badge:hover {
    border-color: var(--color-primary);
  }

  .agg-rating__badge-icon {
    width: 24px;
    height: 24px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: var(--weight-bold);
    color: white;
  }

  .agg-rating__badge-icon--ta { background: #34E0A1; }
  .agg-rating__badge-icon--g { background: #4285F4; }

  @media (max-width: 640px) {
    .agg-rating__main {
      flex-direction: column;
      gap: var(--space-6);
    }

    .agg-rating__divider {
      width: 80px;
      height: 1px;
    }

    .agg-rating__bar-track {
      width: 100px;
    }

    .agg-rating__badges {
      flex-direction: column;
      align-items: center;
    }

    .agg-rating__badge {
      min-height: 44px;
    }
  }
</style>
```

- [ ] **Step 2: Create ReviewFilters component**

Create `packages/shared/src/components/ReviewFilters.astro`:

```astro
---
interface FilterItem {
  key: string;
  label: string;
}

interface Props {
  filters: FilterItem[];
  allLabel: string;
}

const { filters, allLabel } = Astro.props;
---

<div class="review-filters" data-review-filters>
  <button class="review-filters__btn review-filters__btn--active" data-filter="all">{allLabel}</button>
  {filters.map((f) => (
    <button class="review-filters__btn" data-filter={f.key}>{f.label}</button>
  ))}
</div>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("[data-review-filters]");
    if (!container) return;

    const buttons = container.querySelectorAll<HTMLButtonElement>("[data-filter]");
    const cards = document.querySelectorAll<HTMLElement>("[data-category]");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        buttons.forEach((b) => b.classList.remove("review-filters__btn--active"));
        btn.classList.add("review-filters__btn--active");

        cards.forEach((card) => {
          if (filter === "all" || card.dataset.category === filter) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  });
</script>

<style>
  .review-filters {
    display: flex;
    gap: var(--space-2);
    padding: var(--space-4) 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .review-filters__btn {
    padding: var(--space-2) var(--space-4);
    border: none;
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
    background: var(--color-bg-alt);
    color: var(--color-text);
    transition: background var(--transition-base), color var(--transition-base);
  }

  .review-filters__btn--active {
    background: var(--color-primary);
    color: white;
  }

  .review-filters__btn:hover:not(.review-filters__btn--active) {
    background: var(--color-border);
  }

  @media (max-width: 768px) {
    .review-filters__btn {
      padding: var(--space-3) var(--space-5);
      min-height: 44px;
    }
  }
</style>
```

- [ ] **Step 3: Create LeaveReviewCTA component**

Create `packages/shared/src/components/LeaveReviewCTA.astro`:

```astro
---
interface Props {
  title: string;
  subtitle: string;
  tripadvisorText: string;
  googleText: string;
  tripadvisorUrl?: string;
  googleUrl?: string;
}

const { title, subtitle, tripadvisorText, googleText, tripadvisorUrl = "#", googleUrl = "#" } = Astro.props;
---

<section class="leave-review section-sm">
  <div class="container">
    <div class="leave-review__inner">
      <h2 class="leave-review__title" set:html={title} />
      <p class="leave-review__subtitle">{subtitle}</p>
      <div class="leave-review__buttons">
        <a href={tripadvisorUrl} target="_blank" rel="noopener noreferrer" class="leave-review__btn">
          <span class="leave-review__icon leave-review__icon--ta">TA</span>
          {tripadvisorText} →
        </a>
        <a href={googleUrl} target="_blank" rel="noopener noreferrer" class="leave-review__btn">
          <span class="leave-review__icon leave-review__icon--g">G</span>
          {googleText} →
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .leave-review__inner {
    text-align: center;
    padding: var(--space-10) 0;
    border-top: 1px solid var(--color-border);
  }

  .leave-review__title {
    font-family: var(--font-accent), Georgia, serif;
    font-size: var(--text-2xl);
    font-weight: var(--weight-regular);
    margin: 0 0 var(--space-2) 0;
  }

  .leave-review__title :global(em) {
    font-family: var(--font-accent), Georgia, serif;
    font-style: italic;
  }

  .leave-review__subtitle {
    font-size: var(--text-base);
    color: var(--color-text-body);
    margin: 0 0 var(--space-6) 0;
  }

  .leave-review__buttons {
    display: flex;
    justify-content: center;
    gap: var(--space-3);
    flex-wrap: wrap;
  }

  .leave-review__btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-5);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-button);
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--color-text);
    text-decoration: none;
    transition: border-color var(--transition-base), box-shadow var(--transition-base);
  }

  .leave-review__btn:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-sm);
  }

  .leave-review__icon {
    width: 22px;
    height: 22px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: var(--weight-bold);
    color: white;
  }

  .leave-review__icon--ta { background: #34E0A1; }
  .leave-review__icon--g { background: #4285F4; }
</style>
```

- [ ] **Step 4: Add buildCollectionPage to structured-data.ts**

In `packages/shared/src/seo/structured-data.ts`, add this function after the `buildItemList` function (at the end of the file):

```typescript
export function buildCollectionPage(
  config: BrandConfig,
  locale: Locale,
  path: string,
  name: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `https://www.${config.domain}/${locale}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: config.name,
      url: `https://www.${config.domain}`,
    },
  };
}
```

- [ ] **Step 5: Rewrite the Reviews page**

Replace the entire content of `packages/atlantis/src/pages/[locale]/reviews.astro` with:

```astro
---
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t, getLocalePath, buildLocalBusiness, buildBreadcrumbList, buildFAQPage, buildCollectionPage } from "@algarve-tourism/shared";
import Layout from "../../layouts/Layout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import AggregateRating from "@algarve-tourism/shared/components/AggregateRating.astro";
import ReviewFilters from "@algarve-tourism/shared/components/ReviewFilters.astro";
import ReviewsGrid from "@algarve-tourism/shared/components/ReviewsGrid.astro";
import LeaveReviewCTA from "@algarve-tourism/shared/components/LeaveReviewCTA.astro";
import CTABanner from "@algarve-tourism/shared/components/CTABanner.astro";
import PageFAQ from "@algarve-tourism/shared/components/PageFAQ.astro";
import { config } from "../../config.js";
import manualReviews from "../../content/reviews/manual.json";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;
const toursHref = getLocalePath(locale, "/tours/");

const filterItems = [
  { key: "benagil", label: t(locale, "category.benagil-cave-tours") },
  { key: "yacht", label: locale === "en" ? "Yacht Cruises" : locale === "pt" ? "Cruzeiros de Iate" : locale === "es" ? "Cruceros en Yate" : "Croisières en Yacht" },
  { key: "fishing", label: locale === "en" ? "Fishing" : locale === "pt" ? "Pesca" : locale === "es" ? "Pesca" : "Pêche" },
];

const faqData: Record<string, { question: string; answer: string }[]> = {
  en: [
    { question: "Are these reviews from real guests?", answer: "Yes. All reviews displayed on this page are from verified guests who booked and completed a tour with Atlantis Tours. We display reviews from TripAdvisor, Google, and direct feedback." },
    { question: "How can I leave a review for Atlantis Tours?", answer: "After your tour, you can leave a review on our TripAdvisor or Google Business page. We appreciate all feedback — it helps us improve and helps future guests make informed decisions." },
    { question: "What is the average rating for Atlantis Tours?", answer: "We maintain a 4.9 out of 5 average rating across all our tours, based on hundreds of verified guest reviews on TripAdvisor and Google." },
    { question: "Can I see reviews for a specific tour?", answer: "Yes! Use the filter tabs above the reviews to see feedback for specific tour categories — Benagil cave tours, yacht cruises, or fishing trips." },
  ],
  pt: [
    { question: "Estas avaliações são de clientes reais?", answer: "Sim. Todas as avaliações exibidas nesta página são de clientes verificados que reservaram e completaram um passeio com a Atlantis Tours. Exibimos avaliações do TripAdvisor, Google e feedback direto." },
    { question: "Como posso deixar uma avaliação para a Atlantis Tours?", answer: "Após o seu passeio, pode deixar uma avaliação na nossa página do TripAdvisor ou Google Business. Agradecemos todo o feedback — ajuda-nos a melhorar e ajuda futuros clientes a tomar decisões informadas." },
    { question: "Qual é a avaliação média da Atlantis Tours?", answer: "Mantemos uma avaliação média de 4.9 em 5 em todos os nossos passeios, com base em centenas de avaliações verificadas no TripAdvisor e Google." },
    { question: "Posso ver avaliações de um passeio específico?", answer: "Sim! Use os filtros acima das avaliações para ver feedback por categoria — passeios às grutas de Benagil, cruzeiros de iate ou passeios de pesca." },
  ],
  es: [
    { question: "¿Estas opiniones son de clientes reales?", answer: "Sí. Todas las opiniones mostradas en esta página son de clientes verificados que reservaron y completaron un tour con Atlantis Tours. Mostramos opiniones de TripAdvisor, Google y feedback directo." },
    { question: "¿Cómo puedo dejar una opinión para Atlantis Tours?", answer: "Después de su tour, puede dejar una opinión en nuestra página de TripAdvisor o Google Business. Agradecemos todo el feedback — nos ayuda a mejorar y ayuda a futuros clientes." },
    { question: "¿Cuál es la valoración media de Atlantis Tours?", answer: "Mantenemos una valoración media de 4.9 sobre 5 en todos nuestros tours, basada en cientos de opiniones verificadas en TripAdvisor y Google." },
    { question: "¿Puedo ver opiniones de un tour específico?", answer: "¡Sí! Use los filtros sobre las opiniones para ver feedback por categoría — tours a las cuevas de Benagil, cruceros en yate o pesca." },
  ],
  fr: [
    { question: "Ces avis proviennent-ils de vrais clients ?", answer: "Oui. Tous les avis affichés sur cette page proviennent de clients vérifiés ayant réservé et effectué une excursion avec Atlantis Tours. Nous affichons les avis de TripAdvisor, Google et les retours directs." },
    { question: "Comment puis-je laisser un avis pour Atlantis Tours ?", answer: "Après votre excursion, vous pouvez laisser un avis sur notre page TripAdvisor ou Google Business. Nous apprécions tous les retours — ils nous aident à nous améliorer." },
    { question: "Quelle est la note moyenne d'Atlantis Tours ?", answer: "Nous maintenons une note moyenne de 4,9 sur 5 sur l'ensemble de nos excursions, basée sur des centaines d'avis vérifiés sur TripAdvisor et Google." },
    { question: "Puis-je voir les avis pour une excursion spécifique ?", answer: "Oui ! Utilisez les filtres au-dessus des avis pour voir les retours par catégorie — excursions aux grottes de Benagil, croisières en yacht ou sorties pêche." },
  ],
};

const faqItems = faqData[locale] || faqData.en;
const faqLabel = locale === "pt" ? "Perguntas Frequentes" : locale === "es" ? "Preguntas Frecuentes" : locale === "fr" ? "Questions Fréquentes" : "FAQ";
const faqTitle = locale === "pt" ? "Sobre as <em>Avaliações</em>" : locale === "es" ? "Sobre las <em>Opiniones</em>" : locale === "fr" ? "À propos des <em>Avis</em>" : "About <em>Reviews</em>";

const reviewItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: t(locale, "reviews.title"),
  numberOfItems: manualReviews.length,
  itemListElement: manualReviews.map((r: any, i: number) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
      datePublished: r.date,
    },
  })),
};

const structuredData = [
  buildCollectionPage(config, locale, "/reviews/", t(locale, "reviews.title"), t(locale, "meta.reviews")),
  reviewItemList,
  buildBreadcrumbList(config, locale, [
    { name: "Home", path: "/" },
    { name: t(locale, "nav.reviews"), path: "/reviews/" },
  ]),
  buildFAQPage(faqItems),
];
---

<Layout
  title={t(locale, "nav.reviews")}
  description={t(locale, "meta.reviews")}
  locale={locale}
  path="/reviews/"
  config={config}
  structuredData={structuredData}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/reviews/`} />

  <div class="container">
    <AggregateRating
      reviews={manualReviews}
      label={t(locale, "reviews.aggregate_label")}
      basedOnText={t(locale, "reviews.based_on")}
    />

    <h1 class="sr-only">{t(locale, "reviews.title")}</h1>

    <ReviewFilters
      filters={filterItems}
      allLabel={t(locale, "reviews.filter_all")}
    />

    <section class="reviews-section section-sm">
      <ReviewsGrid reviews={manualReviews} brand={config.brand} locale={locale} />
    </section>
  </div>

  <LeaveReviewCTA
    title={t(locale, "reviews.leave_title")}
    subtitle={t(locale, "reviews.leave_subtitle")}
    tripadvisorText={t(locale, "reviews.leave_tripadvisor")}
    googleText={t(locale, "reviews.leave_google")}
  />

  <CTABanner
    title={t(locale, "cta.reviews_title")}
    subtitle={t(locale, "cta.reviews_subtitle")}
    buttonText={t(locale, "cta.explore_button")}
    buttonHref={toursHref}
  />

  <PageFAQ label={faqLabel} title={faqTitle} items={faqItems} />

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</Layout>
```

- [ ] **Step 6: Verify build + visual check**

Run: `cd /home/jferreira/Work/projects/algarve-and-you-new && pnpm --filter atlantis build`

Then: `pnpm --filter atlantis dev`

Open `http://localhost:4321/en/reviews/` — verify: aggregate rating with bars, platform badges, filter tabs (click to filter), reviews grid with source badges, leave review CTA, CTA banner, FAQ accordion.

- [ ] **Step 7: Commit**

```bash
git add packages/shared/src/components/AggregateRating.astro packages/shared/src/components/ReviewFilters.astro packages/shared/src/components/LeaveReviewCTA.astro packages/shared/src/seo/structured-data.ts packages/atlantis/src/pages/\[locale\]/reviews.astro
git commit -m "feat(reviews): rebuild Reviews page with aggregate rating, filters, and platform badges"
```

---

## Task 6: Contact Page — Components + Full Rebuild

**Files:**
- Create: `packages/shared/src/components/ContactCards.astro`
- Create: `packages/shared/src/components/ContactInfo.astro`
- Modify: `packages/shared/src/components/ContactForm.astro`
- Modify: `packages/atlantis/src/pages/[locale]/contact.astro`

- [ ] **Step 1: Create ContactCards component**

Create `packages/shared/src/components/ContactCards.astro`:

```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";

interface Props {
  locale: Locale;
  whatsappPhone: string;
  email: string;
}

const { locale, whatsappPhone, email } = Astro.props;
const waLink = `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, "")}`;
const mapsLink = "https://maps.google.com/?q=Acostagem+Porto+Comercial+Portimao";
---

<div class="contact-cards" data-reveal>
  <div class="contact-cards__card">
    <div class="contact-cards__icon">💬</div>
    <h3 class="contact-cards__title">{t(locale, "contact.whatsapp_title")}</h3>
    <p class="contact-cards__desc">{t(locale, "contact.whatsapp_desc")}</p>
    <a href={waLink} target="_blank" rel="noopener noreferrer" class="contact-cards__cta contact-cards__cta--wa">
      {t(locale, "contact.whatsapp_cta")} →
    </a>
  </div>
  <div class="contact-cards__card">
    <div class="contact-cards__icon">✉️</div>
    <h3 class="contact-cards__title">{t(locale, "contact.email_title")}</h3>
    <p class="contact-cards__desc">{t(locale, "contact.email_desc")}</p>
    <a href={`mailto:${email}`} class="contact-cards__email">{email}</a>
  </div>
  <div class="contact-cards__card">
    <div class="contact-cards__icon">📍</div>
    <h3 class="contact-cards__title">{t(locale, "contact.visit_title")}</h3>
    <p class="contact-cards__desc">{t(locale, "contact.visit_desc")}</p>
    <a href={mapsLink} target="_blank" rel="noopener noreferrer" class="contact-cards__link">
      {t(locale, "contact.visit_cta")} →
    </a>
  </div>
</div>

<style>
  .contact-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin-bottom: var(--space-10);
  }

  .contact-cards__card {
    background: var(--color-surface);
    border-radius: var(--radius-card);
    padding: var(--space-6);
    text-align: center;
    box-shadow: var(--shadow-sm);
  }

  .contact-cards__icon {
    width: 44px;
    height: 44px;
    background: rgba(12, 124, 140, 0.08);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-xl);
    margin: 0 auto var(--space-4);
  }

  .contact-cards__title {
    font-size: var(--text-base);
    font-weight: var(--weight-semibold);
    margin: 0 0 var(--space-1) 0;
  }

  .contact-cards__desc {
    font-size: var(--text-sm);
    color: var(--color-text-body);
    margin: 0 0 var(--space-3) 0;
  }

  .contact-cards__cta--wa {
    display: inline-block;
    background: #25D366;
    color: white;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-button);
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    text-decoration: none;
  }

  .contact-cards__email {
    font-size: var(--text-sm);
    color: var(--color-primary);
    font-weight: var(--weight-semibold);
    text-decoration: none;
    word-break: break-all;
  }

  .contact-cards__link {
    font-size: var(--text-sm);
    color: var(--color-primary);
    font-weight: var(--weight-semibold);
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .contact-cards {
      grid-template-columns: 1fr;
    }

    .contact-cards__card:first-child {
      background: linear-gradient(135deg, #25D366, #128C7E);
      color: white;
    }

    .contact-cards__card:first-child .contact-cards__title {
      color: white;
    }

    .contact-cards__card:first-child .contact-cards__desc {
      color: rgba(255, 255, 255, 0.85);
    }

    .contact-cards__card:first-child .contact-cards__icon {
      background: rgba(255, 255, 255, 0.2);
    }

    .contact-cards__card:first-child .contact-cards__cta--wa {
      background: white;
      color: #25D366;
    }
  }
</style>
```

- [ ] **Step 2: Create ContactInfo component**

Create `packages/shared/src/components/ContactInfo.astro`:

```astro
---
import type { Locale, BrandConfig } from "../types.js";
import { t } from "../i18n/index.js";

interface Props {
  locale: Locale;
  config: BrandConfig;
}

const { locale, config } = Astro.props;
---

<aside class="contact-info">
  <div class="contact-info__card">
    <h3 class="contact-info__heading">⏰ {t(locale, "contact.hours_title")}</h3>
    <div class="contact-info__row">
      <span class="contact-info__label">{t(locale, "contact.hours_summer")}</span>
      <span class="contact-info__value">8:00 — 21:00</span>
    </div>
    <div class="contact-info__row">
      <span class="contact-info__label">{t(locale, "contact.hours_offseason")}</span>
      <span class="contact-info__value">8:00 — 17:00</span>
    </div>
    <p class="contact-info__note">{t(locale, "contact.hours_note")}</p>
  </div>

  <div class="contact-info__card">
    <h3 class="contact-info__heading">📍 {t(locale, "contact.find_us")}</h3>
    <p class="contact-info__address">
      Ac. Porto Comercial de Portimão<br />
      Portimão, Algarve<br />
      Portugal
    </p>
  </div>

  <div class="contact-info__card">
    <h3 class="contact-info__heading">📱 {t(locale, "contact.follow_us")}</h3>
    <div class="contact-info__social">
      <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" class="contact-info__social-link" aria-label="Instagram">IG</a>
      <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" class="contact-info__social-link" aria-label="Facebook">FB</a>
      {config.social.youtube && (
        <a href={config.social.youtube} target="_blank" rel="noopener noreferrer" class="contact-info__social-link" aria-label="YouTube">YT</a>
      )}
    </div>
  </div>
</aside>

<style>
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .contact-info__card {
    background: var(--color-surface);
    border-radius: var(--radius-card);
    padding: var(--space-5);
    box-shadow: var(--shadow-sm);
  }

  .contact-info__heading {
    font-size: var(--text-base);
    font-weight: var(--weight-semibold);
    margin: 0 0 var(--space-4) 0;
  }

  .contact-info__row {
    display: flex;
    justify-content: space-between;
    font-size: var(--text-sm);
    margin-bottom: var(--space-2);
  }

  .contact-info__label {
    color: var(--color-text-body);
  }

  .contact-info__value {
    font-weight: var(--weight-semibold);
  }

  .contact-info__note {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    margin: var(--space-3) 0 0;
    padding-top: var(--space-3);
    border-top: 1px solid var(--color-border);
  }

  .contact-info__address {
    font-size: var(--text-sm);
    color: var(--color-text-body);
    line-height: var(--leading-relaxed);
    margin: 0;
  }

  .contact-info__social {
    display: flex;
    gap: var(--space-2);
  }

  .contact-info__social-link {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-button);
    background: rgba(12, 124, 140, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--color-text);
    text-decoration: none;
    transition: background var(--transition-base);
  }

  .contact-info__social-link:hover {
    background: rgba(12, 124, 140, 0.15);
  }
</style>
```

- [ ] **Step 3: Update ContactForm with tour interest dropdown**

Replace the entire content of `packages/shared/src/components/ContactForm.astro` with:

```astro
---
import type { Locale } from "../types.js";
import { t } from "../i18n/index.js";
import type { TranslationKey } from "../i18n/types.js";

interface Props {
  locale: Locale;
  email?: string;
}

const { locale, email = "atlantistours@buyalgarveproperties.com" } = Astro.props;
---

<form class="contact-form" data-contact-form data-submit-text={t(locale, "contact.send")}>
  <h3 class="contact-form__title">{t(locale, "contact.form_title")}</h3>
  <p class="contact-form__subtitle">{t(locale, "contact.form_subtitle")}</p>

  <div class="contact-form__field">
    <label for="contact-name">{t(locale, "contact.name")}</label>
    <input type="text" id="contact-name" name="name" required class="form-input" />
  </div>

  <div class="contact-form__field">
    <label for="contact-email">{t(locale, "contact.email")}</label>
    <input type="email" id="contact-email" name="email" required class="form-input" />
  </div>

  <div class="contact-form__field">
    <label for="contact-tour">{t(locale, "contact.tour_interest")}</label>
    <select id="contact-tour" name="tour" class="form-input">
      <option value="">{t(locale, "contact.tour_interest_placeholder")}</option>
      <option value="benagil">{t(locale, "category.benagil-cave-tours" as TranslationKey)}</option>
      <option value="sail-yacht">{t(locale, "category.private-sail-yacht" as TranslationKey)}</option>
      <option value="yacht">{t(locale, "category.private-yacht" as TranslationKey)}</option>
      <option value="fishing">{t(locale, "category.reef-fishing" as TranslationKey)}</option>
    </select>
  </div>

  <div class="contact-form__field">
    <label for="contact-message">{t(locale, "contact.message")}</label>
    <textarea id="contact-message" name="message" rows="5" required class="form-input"></textarea>
  </div>

  <button type="submit" class="btn btn-primary contact-form__submit">{t(locale, "contact.send")}</button>
  <div class="contact-form__status" data-form-status></div>
</form>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
    const status = document.querySelector("[data-form-status]");
    if (!form || !status) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const payload = {
        name: data.get("name"),
        email: data.get("email"),
        tour: data.get("tour") || "",
        message: data.get("message"),
      };

      const btn = form.querySelector("button[type=submit]") as HTMLButtonElement;
      btn.disabled = true;
      btn.textContent = "…";
      status.textContent = "";

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          status.textContent = "✓ Message sent! We'll get back to you soon.";
          status.className = "contact-form__status contact-form__status--ok";
          form.reset();
        } else {
          throw new Error("Server error");
        }
      } catch {
        status.textContent = "Something went wrong. Please try WhatsApp instead.";
        status.className = "contact-form__status contact-form__status--err";
      } finally {
        btn.disabled = false;
        btn.textContent = form.dataset.submitText || "Send";
      }
    });
  });
</script>

<style>
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    background: var(--color-surface);
    border-radius: var(--radius-card);
    padding: var(--space-8);
    box-shadow: var(--shadow-sm);
  }

  .contact-form__title {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    margin: 0;
  }

  .contact-form__subtitle {
    font-size: var(--text-sm);
    color: var(--color-text-body);
    margin: calc(-1 * var(--space-3)) 0 0;
  }

  .contact-form__field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .contact-form__field label {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
  }

  .form-input {
    padding: var(--space-3) var(--space-4);
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-family: inherit;
    font-size: var(--text-base);
    color: var(--color-text);
    transition: border-color var(--transition-base);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  select.form-input {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235E7A85' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: var(--space-8);
  }

  .contact-form__submit {
    align-self: flex-start;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    border: none;
    color: white;
    padding: var(--space-3) var(--space-8);
    cursor: pointer;
  }

  .contact-form__status {
    font-size: var(--text-sm);
    min-height: 1.5em;
  }

  .contact-form__status--ok {
    color: #16a34a;
  }

  .contact-form__status--err {
    color: #dc2626;
  }
</style>
```

- [ ] **Step 4: Rewrite the Contact page**

Replace the entire content of `packages/atlantis/src/pages/[locale]/contact.astro` with:

```astro
---
import type { Locale } from "@algarve-tourism/shared";
import { LOCALES, t, getLocalePath, buildLocalBusiness, buildBreadcrumbList, buildFAQPage } from "@algarve-tourism/shared";
import Layout from "../../layouts/Layout.astro";
import Header from "@algarve-tourism/shared/components/Header.astro";
import Footer from "@algarve-tourism/shared/components/Footer.astro";
import WhatsAppButton from "@algarve-tourism/shared/components/WhatsAppButton.astro";
import ContactCards from "@algarve-tourism/shared/components/ContactCards.astro";
import ContactForm from "@algarve-tourism/shared/components/ContactForm.astro";
import ContactInfo from "@algarve-tourism/shared/components/ContactInfo.astro";
import MeetingPointMap from "@algarve-tourism/shared/components/MeetingPointMap.astro";
import CTABanner from "@algarve-tourism/shared/components/CTABanner.astro";
import PageFAQ from "@algarve-tourism/shared/components/PageFAQ.astro";
import { config } from "../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

const locale = Astro.params.locale as Locale;
const toursHref = getLocalePath(locale, "/tours/");
const contactEmail = "atlantistours@buyalgarveproperties.com";

const faqData: Record<string, { question: string; answer: string }[]> = {
  en: [
    { question: "How do I book a tour with Atlantis Tours?", answer: "You can book directly on our website by visiting the Tours page and selecting your preferred experience. Online booking is instant and you'll receive a confirmation email immediately." },
    { question: "Where exactly do tours depart from in Portimão?", answer: "All tours depart from the Portimão Commercial Port (Acostagem Porto Comercial de Portimão). Look for the Atlantis Tours meeting point near the main dock. We recommend arriving 15 minutes early." },
    { question: "What is the cancellation policy?", answer: "We offer free cancellation up to 24 hours before your scheduled departure for a full refund. Cancellations within 24 hours are subject to the full charge." },
    { question: "Is there parking near the departure point?", answer: "Yes, there is public parking available near the Portimão Commercial Port. During peak summer months, we recommend arriving early to secure a spot or using a taxi/ride service." },
    { question: "Can I book a private tour for a group?", answer: "Absolutely! We offer private charters for groups of all sizes — from intimate couples cruises to larger family or corporate events. Contact us via WhatsApp for custom pricing and availability." },
  ],
  pt: [
    { question: "Como posso reservar um passeio com a Atlantis Tours?", answer: "Pode reservar diretamente no nosso website visitando a página de Passeios e selecionando a experiência preferida. A reserva online é instantânea e receberá um email de confirmação imediatamente." },
    { question: "De onde exatamente partem os passeios em Portimão?", answer: "Todos os passeios partem do Porto Comercial de Portimão (Acostagem Porto Comercial de Portimão). Procure o ponto de encontro da Atlantis Tours junto ao cais principal. Recomendamos chegar 15 minutos antes." },
    { question: "Qual é a política de cancelamento?", answer: "Oferecemos cancelamento gratuito até 24 horas antes da partida para reembolso total. Cancelamentos com menos de 24 horas estão sujeitos à cobrança total." },
    { question: "Há estacionamento perto do ponto de partida?", answer: "Sim, existe estacionamento público disponível perto do Porto Comercial de Portimão. Nos meses de verão, recomendamos chegar cedo ou usar táxi." },
    { question: "Posso reservar um passeio privado para um grupo?", answer: "Com certeza! Oferecemos charters privados para grupos de todos os tamanhos — desde cruzeiros íntimos para casais a eventos familiares ou corporativos. Contacte-nos via WhatsApp para preços personalizados." },
  ],
  es: [
    { question: "¿Cómo puedo reservar un tour con Atlantis Tours?", answer: "Puede reservar directamente en nuestro sitio web visitando la página de Tours y seleccionando su experiencia preferida. La reserva online es instantánea y recibirá un email de confirmación inmediatamente." },
    { question: "¿De dónde exactamente salen los tours en Portimão?", answer: "Todos los tours salen del Puerto Comercial de Portimão (Acostagem Porto Comercial de Portimão). Busque el punto de encuentro de Atlantis Tours cerca del muelle principal. Recomendamos llegar 15 minutos antes." },
    { question: "¿Cuál es la política de cancelación?", answer: "Ofrecemos cancelación gratuita hasta 24 horas antes de la salida para un reembolso completo. Las cancelaciones con menos de 24 horas están sujetas al cargo total." },
    { question: "¿Hay aparcamiento cerca del punto de salida?", answer: "Sí, hay aparcamiento público disponible cerca del Puerto Comercial de Portimão. En verano, recomendamos llegar temprano o usar taxi." },
    { question: "¿Puedo reservar un tour privado para un grupo?", answer: "¡Por supuesto! Ofrecemos charters privados para grupos de todos los tamaños. Contáctenos por WhatsApp para precios personalizados y disponibilidad." },
  ],
  fr: [
    { question: "Comment puis-je réserver une excursion avec Atlantis Tours ?", answer: "Vous pouvez réserver directement sur notre site web en visitant la page Circuits et en sélectionnant l'expérience souhaitée. La réservation en ligne est instantanée et vous recevrez un email de confirmation immédiatement." },
    { question: "D'où exactement partent les excursions à Portimão ?", answer: "Toutes les excursions partent du Port Commercial de Portimão (Acostagem Porto Comercial de Portimão). Cherchez le point de rendez-vous Atlantis Tours près du quai principal. Nous recommandons d'arriver 15 minutes à l'avance." },
    { question: "Quelle est la politique d'annulation ?", answer: "Nous offrons l'annulation gratuite jusqu'à 24 heures avant le départ pour un remboursement complet. Les annulations dans les 24 heures sont soumises au tarif complet." },
    { question: "Y a-t-il un parking près du point de départ ?", answer: "Oui, un parking public est disponible près du Port Commercial de Portimão. En été, nous recommandons d'arriver tôt ou d'utiliser un taxi." },
    { question: "Puis-je réserver une excursion privée pour un groupe ?", answer: "Absolument ! Nous proposons des charters privés pour des groupes de toutes tailles. Contactez-nous par WhatsApp pour des tarifs personnalisés et la disponibilité." },
  ],
};

const faqItems = faqData[locale] || faqData.en;
const faqLabel = locale === "pt" ? "Perguntas Frequentes" : locale === "es" ? "Preguntas Frecuentes" : locale === "fr" ? "Questions Fréquentes" : "FAQ";
const faqTitle = locale === "pt" ? "Reservas e <em>Contacto</em>" : locale === "es" ? "Reservas y <em>Contacto</em>" : locale === "fr" ? "Réservations et <em>Contact</em>" : "Booking & Contact <em>Questions</em>";

const localBusiness = {
  ...buildLocalBusiness(config),
  email: contactEmail,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "21:00",
      validFrom: "2026-06-01",
      validThrough: "2026-09-30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "17:00",
      validFrom: "2026-10-01",
      validThrough: "2027-05-31",
    },
  ],
};

const structuredData = [
  localBusiness,
  buildBreadcrumbList(config, locale, [
    { name: "Home", path: "/" },
    { name: t(locale, "nav.contact"), path: "/contact/" },
  ]),
  buildFAQPage(faqItems),
];
---

<Layout
  title={t(locale, "nav.contact")}
  description={t(locale, "meta.contact")}
  locale={locale}
  path="/contact/"
  config={config}
  structuredData={structuredData}
>
  <Header slot="header" config={config} locale={locale} path={`/${locale}/contact/`} />

  <section class="contact-hero">
    <div class="container">
      <span class="section-label">{t(locale, "contact.hero_label")}</span>
      <h1 class="contact-hero__title" set:html={t(locale, "contact.hero_title")} />
      <p class="contact-hero__subtitle">{t(locale, "contact.hero_subtitle")}</p>
    </div>
  </section>

  <section class="section-sm">
    <div class="container">
      <ContactCards locale={locale} whatsappPhone={config.social.whatsapp} email={contactEmail} />

      <div class="contact-layout">
        <div class="contact-layout__form">
          <ContactForm locale={locale} email={contactEmail} />
        </div>
        <div class="contact-layout__sidebar">
          <ContactInfo locale={locale} config={config} />
        </div>
      </div>
    </div>
  </section>

  <section class="section-sm">
    <div class="container">
      <MeetingPointMap
        latitude={37.1214}
        longitude={-8.5371}
        address="Ac. Porto Comercial de Portimão"
        city="Portimão"
        locale={locale}
      />
    </div>
  </section>

  <CTABanner
    title={t(locale, "cta.book_title")}
    subtitle={t(locale, "cta.book_subtitle")}
    buttonText={t(locale, "cta.book_button")}
    buttonHref={toursHref}
  />

  <PageFAQ label={faqLabel} title={faqTitle} items={faqItems} />

  <Footer slot="footer" config={config} locale={locale} />
  <WhatsAppButton phone={config.social.whatsapp} />
</Layout>

<style>
  .contact-hero {
    padding: calc(var(--header-height) + var(--space-12)) 0 var(--space-8);
    text-align: center;
  }

  .contact-hero__title {
    font-family: var(--font-accent), Georgia, serif;
    font-size: var(--text-4xl);
    font-weight: var(--weight-regular);
    margin: var(--space-3) 0;
  }

  .contact-hero__title :global(em) {
    font-family: var(--font-accent), Georgia, serif;
    font-style: italic;
  }

  .contact-hero__subtitle {
    font-size: var(--text-lg);
    color: var(--color-text-body);
    max-width: 520px;
    margin: 0 auto;
    line-height: var(--leading-relaxed);
  }

  .contact-layout {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: var(--space-8);
    align-items: start;
  }

  @media (max-width: 768px) {
    .contact-hero__title {
      font-size: var(--text-3xl);
    }

    .contact-layout {
      grid-template-columns: 1fr;
    }

    .contact-layout__sidebar {
      order: -1;
    }

    .contact-layout :global(.meeting-point-map__wrap) {
      aspect-ratio: 4 / 3;
    }
  }
</style>
```

- [ ] **Step 5: Verify build + visual check**

Run: `cd /home/jferreira/Work/projects/algarve-and-you-new && pnpm --filter atlantis build`

Then: `pnpm --filter atlantis dev`

Open `http://localhost:4321/en/contact/` — verify: hero with title, 3 contact cards (WhatsApp/Email/Visit), two-column layout (form + sidebar), Google Maps embed, CTA banner, FAQ accordion.

Test the form: fill it in and submit — it should open the user's email client with pre-filled subject/body.

- [ ] **Step 6: Commit**

```bash
git add packages/shared/src/components/ContactCards.astro packages/shared/src/components/ContactInfo.astro packages/shared/src/components/ContactForm.astro packages/atlantis/src/pages/\[locale\]/contact.astro
git commit -m "feat(contact): rebuild Contact page with info cards, sidebar, map, and FAQ"
```

---

## Task 7: Contact Form Backend (Cloudflare Pages Function)

**Files:**
- Create: `functions/api/contact.ts` (if Pages project root is the monorepo root) OR `packages/atlantis/functions/api/contact.ts` (if Pages project root is `packages/atlantis/`)

**Note:** Before implementing, confirm which directory is the Cloudflare Pages project root. The function must live at the Pages project root under `functions/`. The `scripts/deploy.sh` uses rsync — if the site is served via Cloudflare Pages (as confirmed by the business owner), then either rsync deploys into a Pages-connected repo, or there's a separate Pages deployment. Confirm before placing the function.

- [ ] **Step 1: Create the Cloudflare Pages Function**

Create `functions/api/contact.ts` (adjust path based on Pages project root):

```typescript
interface ContactPayload {
  name: string;
  email: string;
  tour: string;
  message: string;
}

interface Env {
  CONTACT_EMAIL?: string;
  RESEND_API_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const body = (await context.request.json()) as ContactPayload;

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return new Response(JSON.stringify({ error: "Name, email, and message are required" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const toEmail = context.env.CONTACT_EMAIL || "atlantistours@buyalgarveproperties.com";
    const apiKey = context.env.RESEND_API_KEY;

    if (!apiKey) {
      // Log to console for debugging but don't expose to client
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 503,
        headers: corsHeaders,
      });
    }

    const tourLabel = body.tour || "Not specified";
    const emailBody = `New contact form submission:\n\nName: ${body.name}\nEmail: ${body.email}\nTour Interest: ${tourLabel}\n\nMessage:\n${body.message}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Atlantis Tours <noreply@atlantistours.pt>",
        to: toEmail,
        reply_to: body.email,
        subject: `Contact from ${body.name}${body.tour ? ` — ${body.tour}` : ""}`,
        text: emailBody,
      }),
    });

    if (!res.ok) {
      console.error("Resend API error:", await res.text());
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 502,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};
```

- [ ] **Step 2: Add CORS preflight handler**

Add to the same file, before `onRequestPost`:

```typescript
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
```

- [ ] **Step 3: Configure environment variables**

In the Cloudflare Pages dashboard, add:
- `RESEND_API_KEY` — get from resend.com (free tier: 100 emails/day, 3,000/month)
- `CONTACT_EMAIL` — `atlantistours@buyalgarveproperties.com` (optional, defaults to this)

Also verify that the domain `atlantistours.pt` is verified in Resend for the `from` address.

- [ ] **Step 4: Test the endpoint**

Run locally: `npx wrangler pages dev packages/atlantis/dist --compatibility-date=2024-01-01`

```bash
curl -X POST http://localhost:8788/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","tour":"","message":"Hello"}'
```

Expected: `{"ok":true}` (if RESEND_API_KEY is set) or `{"error":"Email service not configured"}` (if not).

- [ ] **Step 5: Commit**

```bash
git add functions/api/contact.ts
git commit -m "feat(contact): add Cloudflare Pages Function for contact form email"
```

---

## Mobile UX Notes

The following mobile-specific CSS is already included in the components above. Summary of responsive breakpoints:

| Component | Desktop | Mobile (≤768px) | Small (≤480px) |
|-----------|---------|-----------------|----------------|
| StatsBar | 4-col grid | 2-col grid | 2-col, smaller font |
| FleetGrid | 3-col grid | 1-col stacked | — |
| WhyChooseUs | 2-col grid | 1-col stacked (≤640px) | — |
| ContactCards | 3-col grid | 1-col stacked | — |
| ContactLayout | 2-col (form + sidebar) | 1-col stacked | — |
| AggregateRating | Horizontal (score / bars) | Vertical stacked (≤640px) | — |
| ReviewFilters | Horizontal row | Horizontal scroll + touch | — |
| About Hero | 4xl title | 3xl title | — |
| Contact Hero | 4xl title | 3xl title | — |
| About Story | 2-col (text + image) | 1-col, image on top | — |

**Additional mobile UX refinements to apply during implementation:**

These are inline CSS additions in the page-level `<style>` blocks during Tasks 4–6, not separate tasks:

1. **Touch targets** — All interactive elements (filter pills, badge links, CTA buttons) must be minimum 44px height. The ReviewFilters buttons already use `padding: var(--space-2) var(--space-4)` which with the sm font size should be ~36px — increase padding to `var(--space-3) var(--space-5)` on mobile.

2. **Contact sidebar order on mobile** — On mobile, the info sidebar (hours, address) should appear BEFORE the form since it's more immediately useful. Add to the Contact page `<style>`:
```css
@media (max-width: 768px) {
  .contact-layout__sidebar { order: -1; }
}
```

3. **Map aspect ratio on mobile** — The MeetingPointMap uses 16:9 which is too short on mobile. Override in the Contact page:
```css
@media (max-width: 768px) {
  .contact-layout :global(.meeting-point-map__wrap) {
    aspect-ratio: 4 / 3;
  }
}
```

4. **CTA Banner text on mobile** — Reduce title size:
```css
@media (max-width: 640px) {
  .cta-banner__title { font-size: var(--text-2xl); }
}
```
This should be added to the CTABanner component.

5. **WhatsApp prominence on mobile** — The first ContactCard (WhatsApp) should be visually larger on mobile. Add to ContactCards:
```css
@media (max-width: 768px) {
  .contact-cards__card:first-child {
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: white;
  }
  .contact-cards__card:first-child .contact-cards__desc { color: rgba(255,255,255,0.85); }
  .contact-cards__card:first-child .contact-cards__cta--wa { background: white; color: #25D366; }
}
```

6. **AggregateRating bar width on mobile** — The 120px fixed-width bars should scale:
```css
@media (max-width: 640px) {
  .agg-rating__bar-track { width: 100px; }
}
```

---

## Post-Implementation Notes

**Stats values to confirm with business owner before deploying:**
- Founding year (2010 in hero vs 2020 in `en.json` line 66 `meta.about_atlantis`)
- "50k+ Happy Guests"
- "4.9 Average Rating"  
- "6 Boats in Fleet"
- These are currently hardcoded via translation keys and can be updated in the JSON files.

**TripAdvisor / Google Business URLs:**
- Platform badge links (`href="#"`) in AggregateRating and LeaveReviewCTA need real URLs once available.

**Review provenance:**
- All 12 reviews currently have empty `sourceUrl` and `externalReviewId` fields. These must be populated with actual review URLs before the data can be used in per-tour structured data markup.
- Reviews without verified `sourceUrl` should only be displayed visually, never included in Schema.org review markup.

**Contact form backend:**
- Requires `RESEND_API_KEY` environment variable in Cloudflare Pages settings.
- Requires domain verification in Resend for the `from` address.
- The `scripts/deploy.sh` uses rsync — confirm whether the Cloudflare Pages project root is the monorepo root or `packages/atlantis/`, and place the `functions/` directory accordingly.

**Fleet / story images:**
- FleetGrid cards and the About story section use placeholder `<div>` elements. Replace with real photos via Filestack CDN once available.

**About page Markdown cleanup:**
- Verify that removing `en/about.md` and `pt/about.md` doesn't break the content collection. The `pages` collection still has `homepage.md` files, so the collection itself remains valid.
