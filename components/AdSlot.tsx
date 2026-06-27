"use client";

import { useEffect, useRef } from "react";

interface Props {
  /** Slot ID from the AdSense dashboard, e.g. "1234567890" */
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/**
 * Renders a Google AdSense unit when NEXT_PUBLIC_ADSENSE_CLIENT is set.
 * Falls back to a placeholder div in development and before AdSense approval.
 * Slot IDs are configured per placement in ToolLayout.
 */
export function AdSlot({ slot, format = "auto", className = "" }: Props) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!CLIENT || pushed.current || !ref.current) return;
    try {
      pushed.current = true;
      // @ts-expect-error — adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not yet loaded — no-op
    }
  }, []);

  if (!CLIENT) {
    return (
      <div
        className={`flex items-center justify-center rounded-md border border-dashed border-surface-line bg-surface-muted py-3 ${className}`}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-wide text-ink-faint">Advertisement</span>
      </div>
    );
  }

  return (
    <ins
      ref={ref}
      className={`adsbygoogle ${className}`}
      style={{ display: "block", minHeight: "100px" }}
      data-ad-client={CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
