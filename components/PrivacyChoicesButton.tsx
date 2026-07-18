"use client";

import { resetAnalyticsConsent } from "./ConsentBanner";

declare global {
  interface Window {
    googlefc?: {
      callbackQueue: Array<() => void>;
      showRevocationMessage: () => void;
    };
  }
}

export function PrivacyChoicesButton() {
  const openChoices = () => {
    resetAnalyticsConsent();

    const googlefc = window.googlefc;
    if (googlefc?.callbackQueue && googlefc.showRevocationMessage) {
      googlefc.callbackQueue.push(googlefc.showRevocationMessage);
    }
  };

  return (
    <button
      type="button"
      onClick={openChoices}
      className="block min-h-11 py-2 text-left text-[13px] font-semibold underline underline-offset-2"
      style={{ color: "#52616f" }}
    >
      Privacy and cookie settings
    </button>
  );
}
