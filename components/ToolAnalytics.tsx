"use client";

import { useEffect, useRef } from "react";
import {
  ANALYTICS_READY_EVENT,
  TOOL_ACTION_EVENT,
  sendCalculatorAnalyticsEvent,
  type CalculatorAnalyticsEvent,
  type CalculatorAnalyticsParams,
} from "@/lib/analytics";

type SuccessfulAction = Extract<
  CalculatorAnalyticsEvent,
  "calculator_pdf_download" | "calculator_share"
>;

const SUCCESSFUL_ACTIONS = new Set<SuccessfulAction>([
  "calculator_pdf_download",
  "calculator_share",
]);

/**
 * Measures the calculator funnel without collecting any entered or calculated
 * values. One instance is rendered by ToolLayout, covering every calculator.
 */
export function ToolAnalytics({
  toolSlug,
  toolRegion,
  toolCategory,
}: {
  toolSlug: string;
  toolRegion: string;
  toolCategory: string;
}) {
  const viewSent = useRef(false);
  const startSent = useRef(false);
  const resultSent = useRef(false);

  useEffect(() => {
    const params: CalculatorAnalyticsParams = {
      tool_slug: toolSlug,
      tool_region: toolRegion,
      tool_category: toolCategory,
    };

    const sendView = () => {
      if (viewSent.current) return;
      viewSent.current = sendCalculatorAnalyticsEvent("calculator_view", params);
    };

    const sendResultWhenReady = () => {
      if (resultSent.current) return;
      const root = document.querySelector<HTMLElement>(
        `[data-calculator-inputs="${toolSlug}"]`,
      );
      const validResult = root?.querySelector(
        '[data-calculator-result-valid="true"]',
      );
      if (validResult) {
        resultSent.current = sendCalculatorAnalyticsEvent("calculator_result", params);
      }
    };

    const handleInputChange = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const inputGroup = target.closest("form, [data-calculator-form]");
      if (!inputGroup?.closest(`[data-calculator-inputs="${toolSlug}"]`)) return;

      if (!startSent.current) {
        startSent.current = sendCalculatorAnalyticsEvent("calculator_start", params);
      }

      // React updates the result after the input event. Waiting for the next
      // frame lets us observe the new validity state without reading its value.
      window.requestAnimationFrame(sendResultWhenReady);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const clickDrivenTool = target.closest(
        `[data-calculator-inputs="${toolSlug}"] [data-calculator-click-start]`,
      );
      if (clickDrivenTool) {
        if (!startSent.current) {
          startSent.current = sendCalculatorAnalyticsEvent("calculator_start", params);
        }
        window.requestAnimationFrame(sendResultWhenReady);
      }

      const sourceLink = target.closest<HTMLElement>(
        `[data-calculator-source="${toolSlug}"]`,
      );
      if (sourceLink) {
        sendCalculatorAnalyticsEvent("calculator_source_click", params);
      }
    };

    const handleToolAction = (event: Event) => {
      const action = (event as CustomEvent<{ action?: string }>).detail?.action;
      if (!action || !SUCCESSFUL_ACTIONS.has(action as SuccessfulAction)) return;
      sendCalculatorAnalyticsEvent(action as SuccessfulAction, params);
    };

    sendView();
    window.addEventListener(ANALYTICS_READY_EVENT, sendView);
    document.addEventListener("input", handleInputChange, true);
    document.addEventListener("change", handleInputChange, true);
    document.addEventListener("click", handleClick, true);
    window.addEventListener(TOOL_ACTION_EVENT, handleToolAction);

    return () => {
      window.removeEventListener(ANALYTICS_READY_EVENT, sendView);
      document.removeEventListener("input", handleInputChange, true);
      document.removeEventListener("change", handleInputChange, true);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener(TOOL_ACTION_EVENT, handleToolAction);
    };
  }, [toolCategory, toolRegion, toolSlug]);

  return null;
}
