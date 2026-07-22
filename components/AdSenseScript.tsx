"use client";

import { usePathname } from "next/navigation";
import {
  ADSENSE_RUNTIME_ENABLED,
  ADSENSE_SCRIPT_SRC,
  isAdSenseEligiblePathname,
} from "@/lib/adsense";

export function AdSenseScript() {
  const pathname = usePathname();
  if (!ADSENSE_RUNTIME_ENABLED || !isAdSenseEligiblePathname(pathname)) return null;

  return <script async src={ADSENSE_SCRIPT_SRC} crossOrigin="anonymous" />;
}
