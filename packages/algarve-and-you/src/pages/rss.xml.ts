import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { config } from "../config.js";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  const enPosts = posts
    .filter((post) => post.data.locale === "en")
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: config.name,
    description: config.tagline,
    site: context.site!.toString(),
    items: enPosts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: new Date(post.data.date),
      link: `/en/blog/${post.slug.replace("en/", "")}/`,
    })),
  });
}
