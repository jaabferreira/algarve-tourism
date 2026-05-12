const ELLIPSIS = "…";

/**
 * Shorten `text` to at most `maxLen` characters without cutting a word in half.
 *
 * Whitespace runs are collapsed to single spaces first. If the (collapsed) text
 * already fits, it is returned unchanged. Otherwise it is cut at the last word
 * boundary that keeps the result — including a trailing ellipsis — within
 * `maxLen`; trailing whitespace and punctuation are stripped before the
 * ellipsis is appended. If no word boundary fits, the text is hard-cut.
 *
 * Used for meta descriptions / OG descriptions so machine-generated copy never
 * shows up in a SERP snippet cut mid-word.
 */
export function truncateAtWord(text: string, maxLen: number): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLen) return normalized;

  const budget = maxLen - ELLIPSIS.length;
  const window = normalized.slice(0, budget + 1);
  const lastSpace = window.lastIndexOf(" ");
  const body = lastSpace > 0 ? normalized.slice(0, lastSpace) : normalized.slice(0, budget);

  return body.replace(/[\s\p{P}]+$/u, "") + ELLIPSIS;
}
