import { describe, it, expect } from "vitest";
import { buildPostBreadcrumb } from "./breadcrumbs.js";

describe("buildPostBreadcrumb", () => {
  it("ordinary post → Home › Blog › <category> › <post>", () => {
    const crumbs = buildPostBreadcrumb({
      locale: "en",
      postTitle: "What to Pack",
      postSlug: "what-to-pack-algarve-boat-tour",
      category: { slug: "travel-tips", label: "Travel Tips" },
    });
    expect(crumbs.map((c) => c.name)).toEqual([
      "Home",
      "Blog",
      "Travel Tips",
      "What to Pack",
    ]);
    expect(crumbs.map((c) => c.path)).toEqual([
      "/",
      "/blog/",
      "/blog/category/travel-tips/",
      "/blog/what-to-pack-algarve-boat-tour/",
    ]);
  });

  it("cluster post with a pillar → Home › <pillar title> › <post>", () => {
    const crumbs = buildPostBreadcrumb({
      locale: "en",
      postTitle: "Best Time to Visit the Benagil Caves",
      postSlug: "best-time-visit-benagil-caves",
      pillar: { slug: "benagil-cave-tour-complete-guide", title: "Benagil Cave Tour: The Complete Guide" },
      category: { slug: "destinations", label: "Destinations" },
    });
    expect(crumbs.map((c) => c.name)).toEqual([
      "Home",
      "Benagil Cave Tour: The Complete Guide",
      "Best Time to Visit the Benagil Caves",
    ]);
    expect(crumbs.map((c) => c.path)).toEqual([
      "/",
      "/blog/benagil-cave-tour-complete-guide/",
      "/blog/best-time-visit-benagil-caves/",
    ]);
  });

  it("the pillar's own page → Home › Blog › <pillar title>", () => {
    const crumbs = buildPostBreadcrumb({
      locale: "en",
      postTitle: "Benagil Cave Tour: The Complete Guide",
      postSlug: "benagil-cave-tour-complete-guide",
      isPillar: true,
      category: { slug: "destinations", label: "Destinations" },
    });
    expect(crumbs.map((c) => c.name)).toEqual([
      "Home",
      "Blog",
      "Benagil Cave Tour: The Complete Guide",
    ]);
    expect(crumbs.map((c) => c.path)).toEqual([
      "/",
      "/blog/",
      "/blog/benagil-cave-tour-complete-guide/",
    ]);
  });
});
