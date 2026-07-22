"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  ADSENSE_CLIENT,
  ADSENSE_RUNTIME_ENABLED,
  isAdSenseEligiblePathname,
} from "@/lib/adsense";

interface Props {
  /** Slot ID from the AdSense dashboard, e.g. "1234567890" */
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

const CLIENT = ADSENSE_RUNTIME_ENABLED ? ADSENSE_CLIENT : undefined;

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, never>>;
  }
}

/**
 * Renders a Google AdSense unit only after approval and certified-CMP setup.
 * Slot IDs are configured per placement in ToolLayout. Disabled production
 * builds render nothing, rather than empty boxes labelled as advertisements.
 */
export function AdSlot({ slot, format = "auto", className = "" }: Props) {
  const pathname = usePathname();
  const pathEligible = isAdSenseEligiblePathname(pathname);
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!CLIENT || !pathEligible || pushed.current || !ref.current) return;
    try {
      // AdSense's asynchronous tag uses this array as a pre-load queue, so a
      // unit can be registered safely before the external loader has finished.
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // Ad blockers and network failures must not break the calculator page.
    }
  }, [pathEligible]);

  if (!CLIENT || !pathEligible) return null;

  return (
    <ins
      ref={ref}
      aria-label="Advertisement"
      className={`adsbygoogle ${className}`}
      style={{ display: "block", minHeight: "100px" }}
      data-ad-client={CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
