import { describe, it, expect } from "vitest";
import { buildBlogPosting, buildVideoObject } from "./structured-data.js";
import type { BrandConfig } from "../types.js";

const mockConfig = {
  brand: "atlantis",
  name: "Atlantis Tours",
  domain: "atlantistours.pt",
  tagline: "",
  fh: { shortname: "x", categories: [], flow: "" },
  logo: "",
  social: { instagram: "", facebook: "", whatsapp: "" },
  analytics: { gtag: "" },
  defaultLocale: "en",
  locales: ["en", "pt", "es", "fr"],
} as BrandConfig;

const basePost = {
  title: "Test Post",
  excerpt: "Test excerpt",
  date: "2026-04-30",
  slug: "test-post",
};

describe("buildBlogPosting", () => {
  it("emits Organization author when authorBio and authorImage are absent", () => {
    const result = buildBlogPosting(
      mockConfig,
      { ...basePost, author: "Atlantis Tours" },
      "en",
    );
    expect(result.author).toEqual({
      "@type": "Organization",
      name: "Atlantis Tours",
    });
  });

  it("emits Person author when author differs from config.name and both bio + image are present", () => {
    const result = buildBlogPosting(
      mockConfig,
      {
        ...basePost,
        author: "Nuno Albino",
        authorBio: "Skipper since 2018.",
        authorImage: "/authors/nuno-albino.jpg",
      },
      "en",
    );
    expect(result.author).toEqual({
      "@type": "Person",
      name: "Nuno Albino",
      description: "Skipper since 2018.",
      image: "/authors/nuno-albino.jpg",
    });
  });

  it("falls back to Organization when only authorBio is present", () => {
    const result = buildBlogPosting(
      mockConfig,
      {
        ...basePost,
        author: "Nuno Albino",
        authorBio: "Skipper since 2018.",
      },
      "en",
    );
    expect(result.author).toEqual({
      "@type": "Organization",
      name: "Atlantis Tours",
    });
  });

  it("falls back to Organization when only authorImage is present", () => {
    const result = buildBlogPosting(
      mockConfig,
      {
        ...basePost,
        author: "Nuno Albino",
        authorImage: "/authors/nuno-albino.jpg",
      },
      "en",
    );
    expect(result.author).toEqual({
      "@type": "Organization",
      name: "Atlantis Tours",
    });
  });

  it("falls back to Organization when author equals config.name even if bio + image are present", () => {
    const result = buildBlogPosting(
      mockConfig,
      {
        ...basePost,
        author: "Atlantis Tours",
        authorBio: "Bio.",
        authorImage: "/img.jpg",
      },
      "en",
    );
    expect(result.author).toEqual({
      "@type": "Organization",
      name: "Atlantis Tours",
    });
  });
});

describe("buildVideoObject", () => {
  const sample = {
    youtubeId: "dQw4w9WgXcQ",
    name: "Atlantis Tours (Caves) + Allgarbe",
    description: "Boat tour through Benagil sea caves.",
    uploadDate: "2022-06-15",
    duration: "PT3M39S",
  };

  it("returns a VideoObject with all required fields", () => {
    const result = buildVideoObject(sample);
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("VideoObject");
    expect(result.name).toBe(sample.name);
    expect(result.description).toBe(sample.description);
    expect(result.uploadDate).toBe(sample.uploadDate);
    expect(result.duration).toBe(sample.duration);
  });

  it("derives thumbnailUrl, contentUrl, and embedUrl from youtubeId", () => {
    const result = buildVideoObject(sample);
    expect(result.thumbnailUrl).toBe(
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    );
    expect(result.contentUrl).toBe(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    );
    expect(result.embedUrl).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
  });
});
