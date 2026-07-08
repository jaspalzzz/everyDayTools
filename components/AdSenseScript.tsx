"use client";

import { useEffect, useState } from "react";
import { ADSENSE_SCRIPT_SRC } from "@/lib/adsense";
import { hasAdvertisingConsent } from "./ConsentBanner";

const READY = process.env.NEXT_PUBLIC_ADSENSE_READY === "true";

export function AdSenseScript() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!READY) return;
    const sync = () => setAllowed(hasAdvertisingConsent());
    sync();
    window.addEventListener("mpr-consent-change", sync);
    return () => window.removeEventListener("mpr-consent-change", sync);
  }, []);

  if (!READY || !allowed) return null;

  return <script async src={ADSENSE_SCRIPT_SRC} crossOrigin="anonymous" />;
}
