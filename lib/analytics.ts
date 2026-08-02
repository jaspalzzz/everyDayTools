import { ADSENSE_RUNTIME_ENABLED } from "@/lib/adsense";

/**
 * Privacy-safe GA4 events used to measure whether the calculators help people.
 * Calculator inputs, result amounts and PDF personalisation are deliberately
 * excluded from the event payload.
 */
export type CalculatorAnalyticsEvent =
  | "calculator_view"
  | "calculator_start"
  | "calculator_result"
  | "calculator_pdf_download"
  | "calculator_share"
  | "calculator_source_click";

export interface CalculatorAnalyticsParams {
  tool_slug: string;
  tool_region: string;
  tool_category: string;
}

export const ANALYTICS_READY_EVENT = "mpr-analytics-ready";
export const TOOL_ACTION_EVENT = "mpr-tool-action";

export function sendCalculatorAnalyticsEvent(
  eventName: CalculatorAnalyticsEvent,
  params: CalculatorAnalyticsParams,
) {
  if (
    typeof window === "undefined" ||
    ADSENSE_RUNTIME_ENABLED ||
    window.localStorage.getItem("mpr_cookie_consent") !== "accepted" ||
    typeof window.gtag !== "function"
  ) {
    return false;
  }

  window.gtag("event", eventName, params);
  return true;
}

/** Announce a successful calculator action without coupling shared UI to GA. */
export function announceToolAction(
  action: Extract<CalculatorAnalyticsEvent, "calculator_pdf_download" | "calculator_share">,
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(TOOL_ACTION_EVENT, { detail: { action } }));
}
