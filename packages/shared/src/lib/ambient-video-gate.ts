export function shouldEnableAmbientVideo(win: Window): boolean {
  const isDesktop = win.matchMedia("(min-width: 769px)").matches;
  if (!isDesktop) return false;

  const reducedMotion = win.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return false;

  const conn = (win.navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  if (conn?.saveData === true) return false;

  return true;
}
