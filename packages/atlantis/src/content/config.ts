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
    readingTime: z.number().optional(),
    relatedTourSlugs: z.array(z.string()).optional(),
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
