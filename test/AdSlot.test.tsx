// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

async function loadAdSlot(ready: boolean, cmpReady: boolean) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_ADSENSE_READY", ready ? "true" : "");
  vi.stubEnv("NEXT_PUBLIC_ADSENSE_CMP_READY", cmpReady ? "true" : "");
  const mod = await import("@/components/AdSlot");
  return mod.AdSlot;
}

describe("AdSlot activation", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    delete window.adsbygoogle;
  });

  it("renders no empty advertising placeholder before approval", async () => {
    const AdSlot = await loadAdSlot(false, false);
    const { container } = render(<AdSlot slot="1234567890" />);
    expect(container.innerHTML).toBe("");
  });

  it("renders an ad unit only after approval and CMP confirmation", async () => {
    window.adsbygoogle = [];
    const AdSlot = await loadAdSlot(true, true);
    const { container } = render(<AdSlot slot="1234567890" />);
    expect(container.querySelector("ins.adsbygoogle")).not.toBeNull();
    expect(window.adsbygoogle).toHaveLength(1);
  });

  it("queues a unit safely before the asynchronous loader is ready", async () => {
    const AdSlot = await loadAdSlot(true, true);
    render(<AdSlot slot="1234567890" />);
    expect(window.adsbygoogle).toHaveLength(1);
  });
});
