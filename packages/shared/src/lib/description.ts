export interface ParsedDescription {
  duration?: string;
  accessibility?: string;
  description?: string;
  itinerary?: string[];
  restrictions?: string[];
  extras?: string[];
  disclaimers?: string;
}

// Labels whose content we render on the tour page.
const EMIT_LABELS = [
  "duration",
  "accessibility",
  "description",
  "itinerary",
  "restrictions",
  "extras",
  "disclaimers",
] as const;

type Label = (typeof EMIT_LABELS)[number];

// FareHarbor emits extra structural "key: value" fields we do NOT render
// (max_age, group_size, highlights, check-in notes, …). They must still be
// recognized as section boundaries, otherwise their raw "key: value" text
// bleeds into an adjacent rendered section (e.g. `duration` or `itinerary`) and
// surfaces an untranslated English field label to visitors — most visibly on
// the localized /es/ and /fr/ pages. These are FareHarbor field identifiers
// (language-independent), so the list is the same for every locale. We match an
// explicit key list rather than a generic `word:` pattern so that legitimate
// colons inside prose or menus (e.g. "Bebidas:", "Coste:") are never mistaken
// for a boundary.
const NON_EMIT_BOUNDARY_KEYS = [
  "max_age",
  "min_age",
  "group_size",
  "meeting_point",
  "highlights",
  "check_in_details",
  "special_requirements",
  "cancellation_summary",
] as const;

const BOUNDARY_KEYS: readonly string[] = [
  ...EMIT_LABELS,
  ...NON_EMIT_BOUNDARY_KEYS,
];

const EMIT_SET: ReadonlySet<string> = new Set(EMIT_LABELS);

export function parseDescription(html: string): ParsedDescription {
  const text = html
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

  const positions: Array<{
    key: string;
    matchStart: number;
    contentStart: number;
  }> = [];

  for (const key of BOUNDARY_KEYS) {
    const match = new RegExp(`(?:^|\n)\\s*${key}:\\s*`, "i").exec(text);
    if (match) {
      positions.push({
        key,
        matchStart: match.index,
        contentStart: match.index + match[0].length,
      });
    }
  }

  positions.sort((a, b) => a.matchStart - b.matchStart);

  const result: ParsedDescription = {};

  for (let i = 0; i < positions.length; i++) {
    const { key, contentStart } = positions[i];
    const end =
      i + 1 < positions.length ? positions[i + 1].matchStart : text.length;

    // Non-emit keys only terminate the previous section; their content is dropped.
    if (!EMIT_SET.has(key)) continue;
    const label = key as Label;

    const raw = text.slice(contentStart, end).trim();

    if (label === "itinerary") {
      result.itinerary = raw
        .split("\n")
        .map((s) => s.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean);
    } else if (label === "restrictions") {
      result.restrictions = raw
        .split("\n")
        .map((s) => s.replace(/^[-•]\s*/, "").trim())
        .filter(Boolean);
    } else if (label === "extras") {
      result.extras = raw
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      (result as Record<string, string | undefined>)[label] = raw;
    }
  }

  return result;
}
