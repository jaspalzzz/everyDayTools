"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { hasAdvertisingConsent } from "./ConsentBanner";

const CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_READY === "true"
    ? process.env.NEXT_PUBLIC_ADSENSE_CLIENT
    : undefined;

export function AdSenseScript() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(hasAdvertisingConsent());
    sync();
    window.addEventListener("mpr-consent-change", sync);
    return () => window.removeEventListener("mpr-consent-change", sync);
  }, []);

  if (!CLIENT || !allowed) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
