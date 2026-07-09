// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

/**
 * Regression guard for the AdSense consent + readiness gate. This exact
 * gate was silently dropped twice in one session by unrelated refactors
 * (once converting the component to an unconditional server-rendered
 * <script>, once again in a later "verification tags" change) -- each
 * time meaning Google's ad script would load for every visitor regardless
 * of cookie consent, contradicting the ConsentBanner's own promise and
 * creating a real GDPR/UK-PECR risk on a UK-facing site. This test exists
 * so a future refactor breaks CI instead of shipping silently.
 *
 * AdSenseScript reads NEXT_PUBLIC_ADSENSE_READY at module-eval time, so
 * each case resets modules and re-imports after setting the env var.
 */

const CONSENT_KEY = "mpr_cookie_consent";

async function loadAdSenseScript(ready: boolean) {
  vi.resetModules();
  if (ready) vi.stubEnv("NEXT_PUBLIC_ADSENSE_READY", "true");
  else vi.stubEnv("NEXT_PUBLIC_ADSENSE_READY", "");
  const mod = await import("@/components/AdSenseScript");
  return mod.AdSenseScript;
}

describe("AdSenseScript consent + readiness gate", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    // React 19 hoists <script> tags as document-global resources deduped by
    // src, outside RTL's container -- cleanup() alone won't remove them, so
    // each test would otherwise see scripts left over from a previous one.
    document.querySelectorAll('script[src*="adsbygoogle"]').forEach((el) => el.remove());
  });

  it("never renders the ad script when ADSENSE_READY is unset, even with consent given", async () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    const AdSenseScript = await loadAdSenseScript(false);
    render(<AdSenseScript />);
    expect(document.querySelector('script[src*="adsbygoogle"]')).toBeNull();
  });

  it("never renders the ad script when ready but consent was rejected", async () => {
    window.localStorage.setItem(CONSENT_KEY, "rejected");
    const AdSenseScript = await loadAdSenseScript(true);
    render(<AdSenseScript />);
    expect(document.querySelector('script[src*="adsbygoogle"]')).toBeNull();
  });

  it("never renders the ad script when ready but no consent choice has been made yet", async () => {
    const AdSenseScript = await loadAdSenseScript(true);
    render(<AdSenseScript />);
    expect(document.querySelector('script[src*="adsbygoogle"]')).toBeNull();
  });

  it("renders the ad script only when both ready AND consent were given", async () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    const AdSenseScript = await loadAdSenseScript(true);
    render(<AdSenseScript />);
    expect(document.querySelector('script[src*="adsbygoogle"]')).not.toBeNull();
  });

  it("does not add the ad script on a fresh mount after consent was revoked", async () => {
    // React 19 hoists <script> as a persistent document resource and
    // deliberately won't retract an already-executing external script mid
    // -session (you can't "unexecute" JS that already ran) -- so revoking
    // consent stops *future* loads rather than instantly killing a script
    // that already fired. What matters for the regression this guards
    // against is that a later mount (e.g. next page navigation) honors the
    // revoked consent and never (re-)adds the script.
    window.localStorage.setItem(CONSENT_KEY, "rejected");
    const AdSenseScript = await loadAdSenseScript(true);
    render(<AdSenseScript />);
    expect(document.querySelector('script[src*="adsbygoogle"]')).toBeNull();
  });
});
