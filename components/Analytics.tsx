"use client";

import { useEffect, useState } from "react";
import { hasAnalyticsConsent } from "./ConsentBanner";

/**
 * Consent-gated Google Analytics 4.
 *
 * Mirrors AdSenseScript exactly: the GA loader is injected only after the
 * visitor accepts cookies (same ConsentBanner choice + `mpr-consent-change`
 * event), so no analytics cookies are set for visitors who reject or have not
 * chosen yet -- required for GDPR / UK-PECR on a UK-facing site.
 *
 * Inert until NEXT_PUBLIC_GA_ID is set, so a build without a measurement ID
 * ships nothing. Unlike AdSense (a single external script), GA needs an init
 * call; we run it in an effect rather than an inline <script> tag because
 * React does not execute inline `dangerouslySetInnerHTML` scripts on the client.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const sync = () => setAllowed(hasAnalyticsConsent());
    sync();
    window.addEventListener("mpr-consent-change", sync);
    return () => window.removeEventListener("mpr-consent-change", sync);
  }, []);

  useEffect(() => {
    if (!GA_ID || !allowed) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // GA expects the raw arguments object pushed onto the dataLayer queue.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
  }, [allowed]);

  if (!GA_ID || !allowed) return null;

  return <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />;
}
