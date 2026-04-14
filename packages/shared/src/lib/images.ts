const FILESTACK_PREFIX = "https://cdn.filestackcontent.com/";

/**
 * Add resize/quality/format transforms to a Filestack CDN URL.
 * Non-Filestack URLs are returned unchanged.
 * If the URL already has transforms, they are replaced.
 */
export function optimizeImageUrl(
  url: string,
  width: number,
  quality = 80,
): string {
  if (!url.startsWith(FILESTACK_PREFIX)) return url;

  const path = url.slice(FILESTACK_PREFIX.length);
  // Handle is always the last path segment (no slashes, no = signs)
  const segments = path.split("/");
  const handle = segments[segments.length - 1];

  return `${FILESTACK_PREFIX}resize=width:${width},fit:max/quality=value:${quality}/output=format:webp/${handle}`;
}
