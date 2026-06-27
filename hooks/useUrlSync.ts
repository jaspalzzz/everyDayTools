"use client";
import { useEffect, useRef } from "react";

/**
 * Reads numeric URL search params on mount and calls the matching setter for
 * each one found. Safe to call during SSR — all window access is inside
 * useEffect.
 */
export function readUrlParamsOnMount(
  setters: Record<string, (v: number) => void>,
  onDone?: (foundAny: boolean) => void,
): void {
  // This is called inside a useEffect in the consumer component.
  const p = new URLSearchParams(window.location.search);
  let found = false;
  for (const [key, setter] of Object.entries(setters)) {
    const raw = p.get(key);
    if (raw !== null) {
      const n = Number(raw);
      if (!Number.isNaN(n) && n > 0) {
        setter(n);
        found = true;
      }
    }
  }
  onDone?.(found);
}

/**
 * Writes numeric values to URL search params via history.replaceState.
 * Values that are 0 or falsy are omitted.
 */
export function writeUrlParams(values: Record<string, number>): void {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(values)) {
    if (v > 0) p.set(k, String(v));
  }
  const qs = p.toString();
  history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
}

/**
 * Hook that syncs numeric calculator state with URL search params.
 *
 * On mount: reads URL params and calls the matching setter for each found value.
 * On every render: debounces a history.replaceState with the latest values.
 *
 * Usage:
 *   useUrlSync(
 *     { age, years, pay },            // current values
 *     { age: setAge, years: setYears, pay: setWeeklyPay },  // setters
 *     { onHasParams: () => setEligible(true) },  // optional callbacks
 *   );
 */
export function useUrlSync(
  values: Record<string, number>,
  setters: Record<string, (v: number) => void>,
  options?: { onHasParams?: () => void },
): void {
  const initialized = useRef(false);

  // Mount: seed state from URL
  useEffect(() => {
    readUrlParamsOnMount(setters, (found) => {
      if (found) options?.onHasParams?.();
    });
    initialized.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Write to URL after every render (debounced, skips first render)
  useEffect(() => {
    if (!initialized.current) return;
    const timer = setTimeout(() => writeUrlParams(values), 400);
    return () => clearTimeout(timer);
  });
}
