"use client";

import { ADSENSE_SCRIPT_SRC } from "@/lib/adsense";

const ENABLED =
  process.env.NEXT_PUBLIC_ADSENSE_READY === "true" &&
  process.env.NEXT_PUBLIC_ADSENSE_CMP_READY === "true";

export function AdSenseScript() {
  if (!ENABLED) return null;

  return <script async src={ADSENSE_SCRIPT_SRC} crossOrigin="anonymous" />;
}
