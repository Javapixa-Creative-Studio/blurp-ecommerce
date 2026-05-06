"use client";

import { useEffect, useState } from "react";

/**
 * Simulates an async loading state for the given duration (ms).
 * Returns `true` while loading, then flips to `false` after the timeout fires.
 * Defaults to 700ms — long enough to feel like a real fetch, short enough to stay snappy.
 *
 * Set `durationMs` to 0 (or less) to opt out — the hook returns `false` immediately.
 *
 * Note: `durationMs` is captured on first render. Changing it later does not
 * restart the timer; this is intentional to keep the hook simple and avoid
 * cascading renders from re-running the effect.
 */
export function useSimulatedLoading(durationMs = 700): boolean {
  const [isLoading, setIsLoading] = useState<boolean>(() => durationMs > 0);

  useEffect(() => {
    if (durationMs <= 0) return;
    const t = setTimeout(() => setIsLoading(false), durationMs);
    return () => clearTimeout(t);
  }, [durationMs]);

  return isLoading;
}
