// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  ANALYTICS_CONSENT_KEY,
  ConsentBanner,
} from "@/components/ConsentBanner";
import { PrivacyChoicesButton } from "@/components/PrivacyChoicesButton";

describe("PrivacyChoicesButton", () => {
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    delete window.googlefc;
    document.body.classList.remove("has-consent-banner");
  });

  it("reopens analytics choices and queues Google's consent-revocation flow", async () => {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, "accepted");
    const showRevocationMessage = vi.fn();
    window.googlefc = { callbackQueue: [], showRevocationMessage };

    render(
      <>
        <ConsentBanner />
        <PrivacyChoicesButton />
      </>,
    );

    await waitFor(() => expect(screen.queryByLabelText("Cookie consent")).toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "Privacy and cookie settings" }));

    expect(window.localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBeNull();
    expect(await screen.findByLabelText("Cookie consent")).not.toBeNull();
    expect(window.googlefc.callbackQueue).toContain(showRevocationMessage);
  });
});
