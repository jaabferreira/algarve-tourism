import type { Locale } from "@algarve-tourism/shared";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Hand-written FAQ Q&A for the tour pages, keyed by FareHarbor item PK → locale.
 *
 * Tour pages are otherwise 100% FareHarbor-data-driven; this is the per-tour
 * equivalent of `lib/seo-overrides.ts`. Rendered with the shared `FAQ` component
 * and emitted as FAQPage JSON-LD in `pages/[locale]/tours/[slug].astro`.
 *
 * Facts these answers depend on (do NOT drift from them):
 *  - Departure is Porto Comercial de Portimão (NOT Clube Naval).
 *  - The speedboat (717720) and the Cranchi motor yacht (720028) ENTER the
 *    Benagil cave (conditions permitting); the sail yacht (717754) does NOT
 *    (mast clearance).
 *
 * EN-first: PT/ES/FR are added in a later translation pass. Locales without an
 * entry return [] and render nothing.
 */
const FAQS: Record<number, Partial<Record<Locale, FaqItem[]>>> = {
  // 717720 — Benagil Caves Speed Boat Tour (from €20, ~2h, small group)
  717720: {
    en: [
      {
        question: "How long is the Benagil caves speed boat tour?",
        answer:
          "About 2 hours on the water. You cover the coast between Portimão and the Benagil cave, with time at the main caves and arches along the way.",
      },
      {
        question: "Where does the speed boat depart from?",
        answer:
          "From Porto Comercial de Portimão (signposted “Ac. Porto Comercial de Portimão”). Full meeting-point details are on your booking confirmation.",
      },
      {
        question: "Does the speed boat go inside the Benagil cave?",
        answer:
          "Yes — sea conditions permitting, the speedboat enters the Algar de Benagil so you see the domed roof and skylight from inside. If swell makes entry unsafe on the day, the skipper gets you as close as conditions allow.",
      },
      {
        question: "Is the tour suitable for children?",
        answer:
          "Yes, families are welcome. Children wear a life jacket (provided) and need to sit through the ride. Tell us their ages when you book so we can advise.",
      },
      {
        question: "Will we see dolphins?",
        answer:
          "Often, but never guaranteed — dolphins are wild. They are spotted on a large share of trips, especially in the morning.",
      },
      {
        question: "What should I bring?",
        answer:
          "Sunscreen, a hat, sunglasses, a light layer and a camera. We provide life jackets and all safety equipment.",
      },
      {
        question: "What happens if the weather is bad?",
        answer:
          "Safety comes first. If conditions are unsafe we reschedule or offer a full refund. Free cancellation up to 24 hours before departure.",
      },
    ],
  },

  // 720028 — Private Cranchi Yacht Cruise to the Benagil Caves (private motor yacht)
  720028: {
    en: [
      {
        question: "Is this a private tour?",
        answer:
          "Yes — the yacht is chartered for your group only, with your own skipper. No strangers on board.",
      },
      {
        question: "Does the yacht enter the Benagil cave?",
        answer:
          "Yes — conditions permitting, the Cranchi motor yacht enters the Algar de Benagil. (The sail yacht cannot, due to mast height, so this is the private option that still gets you inside.)",
      },
      {
        question: "What is included?",
        answer:
          "A private skipper, fuel, safety equipment and swim stops along the coast. Inclusions can vary by season — check the booking page for the latest.",
      },
      {
        question: "Are there swim stops?",
        answer:
          "Yes — the skipper anchors at a sheltered spot so you can swim in the clear water off the cliffs.",
      },
      {
        question: "How is this different from the shared speed boat?",
        answer:
          "Privacy, comfort and pace. The shared speedboat (from €20pp) is fast and focused on the caves; the private Cranchi is your group only, with room to relax and swim. Both enter the cave.",
      },
      {
        question: "Is it suitable for families or celebrations?",
        answer:
          "Yes — it is a popular choice for families, groups of friends and special occasions. Tell us about your group when booking.",
      },
      {
        question: "Where does it depart from?",
        answer:
          "From Porto Comercial de Portimão. Meeting-point details are on your confirmation.",
      },
    ],
  },

  // 717754 — Private Luxury Sailing Yacht Cruise (does NOT enter the cave)
  717754: {
    en: [
      {
        question: "Does the sailing yacht go into the Benagil cave?",
        answer:
          "No — the mast is too tall to clear the cave entrance. The sailing cruise focuses on the open coast, the golden cliffs and swim stops. If entering the cave is a must, choose the speedboat or the private Cranchi yacht.",
      },
      {
        question: "Is it private?",
        answer:
          "Yes — the yacht is yours and your group’s only, with a skipper. No shared seats.",
      },
      {
        question: "What is included?",
        answer:
          "A skipper, drinks and swim stops along the Algarve coast. See the booking page for current inclusions.",
      },
      {
        question: "Who is this cruise best for?",
        answer:
          "Anyone after a relaxed day under sail — couples, families, groups of friends and celebrations. It is the calm, scenic option rather than the fast cave run.",
      },
      {
        question: "Are there swim stops?",
        answer:
          "Yes — the skipper anchors in a sheltered spot for swimming in the clear water.",
      },
      {
        question: "Where does it depart from, and how long is it?",
        answer:
          "From Porto Comercial de Portimão. Durations vary by option — check the booking page for the cruise length that suits you.",
      },
    ],
  },
};

/** Hand-written FAQ Q&A for the given FareHarbor item PK + locale; [] when none. */
export function getTourFaqs(itemPk: number | string, locale: Locale): FaqItem[] {
  return FAQS[Number(itemPk)]?.[locale] ?? [];
}
