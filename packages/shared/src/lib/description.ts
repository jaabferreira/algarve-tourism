export interface ParsedDescription {
  duration?: string;
  accessibility?: string;
  description?: string;
  itinerary?: string[];
  restrictions?: string[];
  extras?: string[];
  disclaimers?: string;
}

const LABELS = [
  "duration",
  "accessibility",
  "description",
  "itinerary",
  "restrictions",
  "extras",
  "disclaimers",
] as const;

type Label = (typeof LABELS)[number];

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
    label: Label;
    matchStart: number;
    contentStart: number;
  }> = [];

  for (const label of LABELS) {
    const match = new RegExp(`(?:^|\n)\\s*${label}:\\s*`, "i").exec(text);
    if (match) {
      positions.push({
        label,
        matchStart: match.index,
        contentStart: match.index + match[0].length,
      });
    }
  }

  positions.sort((a, b) => a.matchStart - b.matchStart);

  const result: ParsedDescription = {};

  for (let i = 0; i < positions.length; i++) {
    const { label, contentStart } = positions[i];
    const end =
      i + 1 < positions.length ? positions[i + 1].matchStart : text.length;
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
