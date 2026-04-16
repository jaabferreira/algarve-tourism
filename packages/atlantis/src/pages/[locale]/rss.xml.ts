import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { LOCALES } from "@algarve-tourism/shared";
import { config } from "../../config.js";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

export async function GET(context: APIContext) {
  const locale = context.params.locale as string;
  const posts = await getCollection("blog");
  const localePosts = posts
    .filter((post) => post.data.locale === locale)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: config.name,
    description: config.tagline,
    site: context.site!.toString(),
    items: localePosts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: new Date(post.data.date),
      link: `/${locale}/blog/${post.slug.replace(`${locale}/`, "")}/`,
    })),
  });
}
