// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

const navigation = vi.hoisted(() => ({ pathname: "/redundancy-pay-calculator" }));
vi.mock("next/navigation", () => ({ usePathname: () => navigation.pathname }));

/**
 * Regression guard for the AdSense approval + certified-CMP gate. The
 * publisher meta tag and ads.txt remain available for account review, but
 * the runtime must not load until approval and Google CMP setup are both
 * explicitly confirmed. Once enabled, Google's script must load before a
 * consent choice so its certified privacy message can be displayed.
 *
 * AdSenseScript reads its public environment flags at module-eval time, so
 * each case resets modules and re-imports after setting them.
 */

async function loadAdSenseScript(ready: boolean, cmpReady: boolean) {
  vi.resetModules();
  if (ready) vi.stubEnv("NEXT_PUBLIC_ADSENSE_READY", "true");
  else vi.stubEnv("NEXT_PUBLIC_ADSENSE_READY", "");
  if (cmpReady) vi.stubEnv("NEXT_PUBLIC_ADSENSE_CMP_READY", "true");
  else vi.stubEnv("NEXT_PUBLIC_ADSENSE_CMP_READY", "");
  const mod = await import("@/components/AdSenseScript");
  return mod.AdSenseScript;
}

describe("AdSenseScript approval + CMP gate", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    // React 19 hoists <script> tags as document-global resources deduped by
    // src, outside RTL's container -- cleanup() alone won't remove them, so
    // each test would otherwise see scripts left over from a previous one.
    document.querySelectorAll('script[src*="adsbygoogle"]').forEach((el) => el.remove());
    navigation.pathname = "/redundancy-pay-calculator";
  });

  it("does not render when AdSense approval has not been confirmed", async () => {
    const AdSenseScript = await loadAdSenseScript(false, true);
    render(<AdSenseScript />);
    expect(document.querySelector('script[src*="adsbygoogle"]')).toBeNull();
  });

  it("does not render when the certified CMP has not been confirmed", async () => {
    const AdSenseScript = await loadAdSenseScript(true, false);
    render(<AdSenseScript />);
    expect(document.querySelector('script[src*="adsbygoogle"]')).toBeNull();
  });

  it("renders only when approval and certified-CMP setup are confirmed", async () => {
    const AdSenseScript = await loadAdSenseScript(true, true);
    render(<AdSenseScript />);
    expect(document.querySelector('script[src*="adsbygoogle"]')).not.toBeNull();
  });

  it("does not load on non-calculator, trust, legal, or generated pages", async () => {
    const AdSenseScript = await loadAdSenseScript(true, true);
    for (const pathname of ["/", "/privacy", "/about", "/us/states/california", "/404"]) {
      navigation.pathname = pathname;
      const view = render(<AdSenseScript />);
      expect(document.querySelector('script[src*="adsbygoogle"]'), pathname).toBeNull();
      view.unmount();
    }
  });
});
