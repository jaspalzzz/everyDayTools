import { TOOLS } from "@/data/tools";

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-8825078307302402";

export const ADSENSE_PUBLISHER_ID = ADSENSE_CLIENT.replace(/^ca-/, "");

export const ADSENSE_SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

export const ADSENSE_RUNTIME_ENABLED =
  process.env.NEXT_PUBLIC_ADSENSE_READY === "true" &&
  process.env.NEXT_PUBLIC_ADSENSE_CMP_READY === "true";

/**
 * Monetisation is deliberately limited to substantive calculator pages.
 * Directory, generated jurisdiction, legal, search, error and trust pages do
 * not load the advertising runtime. Auto ads must remain disabled in AdSense;
 * the single manual unit in ToolLayout is the only intended placement.
 */
const ADSENSE_ELIGIBLE_PATHS = new Set(
  TOOLS
    .filter((tool) => tool.slug !== "payslip-analyser")
    .map((tool) => `/${tool.slug}`),
);

export function isAdSenseEligiblePathname(pathname: string): boolean {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return ADSENSE_ELIGIBLE_PATHS.has(normalized);
}
