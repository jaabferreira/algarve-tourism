import { t } from "../i18n/index.js";
import type { Locale } from "../types.js";

export interface Crumb {
  name: string;
  path: string;
}

export interface PostBreadcrumbInput {
  locale: Locale;
  postTitle: string;
  postSlug: string;
  /** If this post is itself the pillar of a hub. Trumps `pillar`. */
  isPillar?: boolean;
  /** If this post is a cluster page, the pillar post it sits under. */
  pillar?: { slug: string; title: string };
  /** The post's category (used for non-hub posts). */
  category?: { slug: string; label: string };
}

/**
 * Breadcrumb trail for a blog post.
 * - Pillar's own page: Home › Blog › <pillar title>
 * - Cluster page:      Home › <pillar title> › <post>
 * - Ordinary post:     Home › Blog › <category> › <post>
 */
export function buildPostBreadcrumb(input: PostBreadcrumbInput): Crumb[] {
  const { locale, postTitle, postSlug, isPillar, pillar, category } = input;
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }];

  if (isPillar) {
    crumbs.push({ name: t(locale, "nav.blog"), path: "/blog/" });
  } else if (pillar) {
    crumbs.push({ name: pillar.title, path: `/blog/${pillar.slug}/` });
  } else {
    crumbs.push({ name: t(locale, "nav.blog"), path: "/blog/" });
    if (category) {
      crumbs.push({ name: category.label, path: `/blog/category/${category.slug}/` });
    }
  }

  crumbs.push({ name: postTitle, path: `/blog/${postSlug}/` });
  return crumbs;
}
