"use client";

import { useState } from "react";
import type { CalcResult } from "@/lib/types";
import type { LetterMeta } from "@/lib/pdf";
import { generateLetter } from "@/lib/pdf";
import { TablerIcon } from "./TablerIcon";

/**
 * Live-updating result panel shared by every tool. Renders the headline
 * figure, an itemised breakdown, notes, and the PDF-download CTA.
 * Updates on every keystroke — no submit button.
 */
export function ResultPanel({
  result,
  letterMeta,
}: {
  result: CalcResult;
  letterMeta: LetterMeta;
}) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(false);

  const handleDownload = async () => {
    setError(false);
    setGenerating(true);
    try {
      await generateLetter(result, letterMeta);
    } catch {
      setError(true);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-surface-line bg-surface-muted p-5">
      {/* Headline */}
      <div>
        <div
          className={`text-4xl font-semibold tabular-nums tracking-tight ${
            result.valid ? "text-brand-700" : "text-ink-faint"
          }`}
          aria-live="polite"
          aria-atomic="true"
        >
          {result.headline}
        </div>
        <p className="mt-1 text-sm text-ink-soft">{result.headlineCaption}</p>
      </div>

      {/* Breakdown */}
      {result.valid && result.breakdown.length > 0 && (
        <dl className="flex flex-col gap-1.5 border-t border-surface-line pt-4">
          {result.breakdown.map((line) => (
            <div
              key={line.label}
              className={`flex items-baseline justify-between gap-4 rounded px-1 py-0.5 ${
                line.emphasis
                  ? "bg-brand-50 font-semibold text-brand-800"
                  : "text-ink-soft"
              }`}
            >
              <dt className="text-sm">{line.label}</dt>
              <dd className="text-sm tabular-nums">{line.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* Notes */}
      {result.notes.length > 0 && (
        <ul className="flex flex-col gap-1.5 border-t border-surface-line pt-3">
          {result.notes.map((note, i) => (
            <li key={i} className="flex gap-2 text-xs leading-relaxed text-ink-faint">
              <TablerIcon name="ti-info-circle" className="mt-px shrink-0 text-brand-300" size={14} aria-hidden="true" />
              {note}
            </li>
          ))}
        </ul>
      )}

      {/* PDF CTA */}
      {result.valid && (
        <div className="mt-1 flex flex-col gap-1.5 border-t border-surface-line pt-4">
          <button
            type="button"
            onClick={handleDownload}
            disabled={generating}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
          >
            <TablerIcon name={generating ? "ti-loader-2" : "ti-file-download"} className={generating ? "animate-spin" : undefined} size={16} aria-hidden="true" />
            {generating ? "Preparing…" : "Download PDF summary"}
          </button>
          {error && (
            <p role="alert" className="text-xs text-red-700">
              The PDF could not be generated. Please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
