import type { BrandConfig, ManualReview, Locale } from "../types.js";

export function buildLocalBusiness(config: BrandConfig) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TourOperator"],
    name: config.name,
    url: `https://www.${config.domain}`,
    telephone: config.social.whatsapp,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Portimão",
      addressRegion: "Faro",
      addressCountry: "PT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.1214,
      longitude: -8.5371,
    },
    sameAs: [
      config.social.instagram,
      config.social.facebook,
      ...(config.social.youtube ? [config.social.youtube] : []),
    ],
  };
}

export function buildFAQPage(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildAggregateRating(reviews: ManualReview[]) {
  const total = reviews.length;
  if (total === 0) return null;
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
  return {
    "@type": "AggregateRating",
    ratingValue: avg.toFixed(1),
    reviewCount: total,
    bestRating: 5,
    worstRating: 1,
  };
}

export function buildReviewList(reviews: ManualReview[]) {
  return reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
    },
    reviewBody: r.text,
    datePublished: r.date,
  }));
}

export function buildBlogPosting(
  config: BrandConfig,
  post: {
    title: string;
    excerpt: string;
    date: string;
    lastModified?: string;
    author?: string;
    image?: string;
    slug: string;
    category?: string;
    tags?: string[];
  },
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    ...(post.lastModified && { dateModified: post.lastModified }),
    ...(post.category && { articleSection: post.category }),
    ...(post.tags && post.tags.length > 0 && { keywords: post.tags.join(", ") }),
    author: {
      "@type": "Organization",
      name: config.name,
    },
    publisher: {
      "@type": "Organization",
      name: config.name,
      url: `https://www.${config.domain}`,
    },
    ...(post.image && { image: post.image }),
    mainEntityOfPage: `https://www.${config.domain}/${locale}/blog/${post.slug}/`,
  };
}

export function buildBreadcrumbList(
  config: BrandConfig,
  locale: Locale,
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `https://www.${config.domain}/${locale}${crumb.path}`,
    })),
  };
}

export function buildItemList(
  config: BrandConfig,
  locale: Locale,
  items: { name: string; slug: string; image_url?: string }[],
  listName: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.${config.domain}/${locale}/tours/${item.slug}/`,
      name: item.name,
      ...(item.image_url && { image: item.image_url }),
    })),
  };
}

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
