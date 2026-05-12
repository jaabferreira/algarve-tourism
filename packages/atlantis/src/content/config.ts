import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    lastModified: z.string().optional(),
    excerpt: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    locale: z.enum(["en", "pt", "es", "fr"]),
    translationKey: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional().default([]),
    author: z.string().default("Atlantis Tours"),
    authorBio: z.string().optional(),
    authorImage: z.string().optional(),
    readingTime: z.number().optional(),
    relatedTourSlugs: z.array(z.string()).optional(),
    /** If this post is a cluster page of a hub, the slug of the pillar post it sits under. */
    pillarSlug: z.string().optional(),
    /** Sort order within the pillar's "In this guide" list (ascending; unset = last). */
    pillarOrder: z.number().optional(),
    /** Q&A pairs rendered as a FAQ block + emitted as FAQPage JSON-LD. */
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, pages };
