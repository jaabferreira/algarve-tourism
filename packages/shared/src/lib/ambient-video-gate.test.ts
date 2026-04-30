import { describe, it, expect } from "vitest";
import { shouldEnableAmbientVideo } from "./ambient-video-gate.js";

interface Env {
  desktopMatches: boolean;
  reducedMotionMatches: boolean;
  saveData: boolean | undefined;
}

const matchMediaFor = (env: Env) => (query: string) => ({
  matches:
    query === "(min-width: 769px)"
      ? env.desktopMatches
      : query === "(prefers-reduced-motion: reduce)"
        ? env.reducedMotionMatches
        : false,
});

const fakeWindow = (env: Env) =>
  ({
    matchMedia: matchMediaFor(env),
    navigator: { connection: { saveData: env.saveData } },
  }) as unknown as Window;

describe("shouldEnableAmbientVideo", () => {
  it("returns true on desktop with motion allowed and no save-data", () => {
    expect(
      shouldEnableAmbientVideo(
        fakeWindow({
          desktopMatches: true,
          reducedMotionMatches: false,
          saveData: false,
        }),
      ),
    ).toBe(true);
  });

  it("returns false on mobile (≤768px)", () => {
    expect(
      shouldEnableAmbientVideo(
        fakeWindow({
          desktopMatches: false,
          reducedMotionMatches: false,
          saveData: false,
        }),
      ),
    ).toBe(false);
  });

  it("returns false when prefers-reduced-motion: reduce", () => {
    expect(
      shouldEnableAmbientVideo(
        fakeWindow({
          desktopMatches: true,
          reducedMotionMatches: true,
          saveData: false,
        }),
      ),
    ).toBe(false);
  });

  it("returns false when navigator.connection.saveData is true", () => {
    expect(
      shouldEnableAmbientVideo(
        fakeWindow({
          desktopMatches: true,
          reducedMotionMatches: false,
          saveData: true,
        }),
      ),
    ).toBe(false);
  });

  it("returns true when navigator.connection is undefined (older browsers)", () => {
    const win = {
      matchMedia: matchMediaFor({
        desktopMatches: true,
        reducedMotionMatches: false,
        saveData: false,
      }),
      navigator: {},
    } as unknown as Window;
    expect(shouldEnableAmbientVideo(win)).toBe(true);
  });
});
