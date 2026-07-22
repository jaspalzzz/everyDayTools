// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

/**
 * Regression guard for the Google Analytics consent gate. Mirrors the
 * AdSenseScript test: GA must never load for visitors who reject or have not
 * chosen, and must stay off entirely when NEXT_PUBLIC_GA_ID is unset. This
 * exists so a future refactor that drops the gate breaks CI instead of
 * silently shipping analytics cookies to non-consenting UK visitors.
 *
 * Analytics reads NEXT_PUBLIC_GA_ID at module-eval time, so each case resets
 * modules and re-imports after setting the env var.
 */

const CONSENT_KEY = "mpr_cookie_consent";
const GA_SELECTOR = 'script[src*="googletagmanager"]';

async function loadAnalytics(gaId: string, adsenseReady = false, cmpReady = false) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_GA_ID", gaId);
  vi.stubEnv("NEXT_PUBLIC_ADSENSE_READY", adsenseReady ? "true" : "");
  vi.stubEnv("NEXT_PUBLIC_ADSENSE_CMP_READY", cmpReady ? "true" : "");
  const mod = await import("@/components/Analytics");
  return mod.Analytics;
}

describe("Analytics consent + configuration gate", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    // React 19 hoists <script> tags as document-global resources deduped by
    // src, outside RTL's container -- remove any left over between tests.
    document.querySelectorAll(GA_SELECTOR).forEach((el) => el.remove());
  });

  it("never loads GA when NEXT_PUBLIC_GA_ID is unset, even with consent given", async () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    const Analytics = await loadAnalytics("");
    render(<Analytics />);
    expect(document.querySelector(GA_SELECTOR)).toBeNull();
  });

  it("never loads GA when configured but consent was rejected", async () => {
    window.localStorage.setItem(CONSENT_KEY, "rejected");
    const Analytics = await loadAnalytics("G-TEST123");
    render(<Analytics />);
    expect(document.querySelector(GA_SELECTOR)).toBeNull();
  });

  it("never loads GA when configured but no consent choice has been made yet", async () => {
    const Analytics = await loadAnalytics("G-TEST123");
    render(<Analytics />);
    expect(document.querySelector(GA_SELECTOR)).toBeNull();
  });

  it("loads GA only when both configured AND consent was given", async () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    const Analytics = await loadAnalytics("G-TEST123");
    render(<Analytics />);
    expect(document.querySelector(GA_SELECTOR)).not.toBeNull();
  });

  it("does not add GA on a fresh mount after consent was revoked", async () => {
    window.localStorage.setItem(CONSENT_KEY, "rejected");
    const Analytics = await loadAnalytics("G-TEST123");
    render(<Analytics />);
    expect(document.querySelector(GA_SELECTOR)).toBeNull();
  });

  it("stays disabled when the certified advertising CMP is active", async () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    const Analytics = await loadAnalytics("G-TEST123", true, true);
    render(<Analytics />);
    expect(document.querySelector(GA_SELECTOR)).toBeNull();
  });
});
