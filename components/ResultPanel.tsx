"use client";

import { useState } from "react";
import type { CalcResult } from "@/lib/types";
import type { LetterMeta } from "@/lib/pdf";
import { generateLetter } from "@/lib/pdf";

/**
 * Live-updating result panel shared by every tool. Renders the headline
 * figure, an itemised breakdown, notes, and the document-download CTA
 * (the workflow moat). Updates on every keystroke — no submit button.
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
    <div className="flex flex-col gap-4 rounded-lg border border-surface-line bg-surface-muted p-5">
      <div>
        <div
          className={`text-3xl font-medium tabular-nums ${
            result.valid ? "text-brand-800" : "text-ink-faint"
          }`}
        >
          {result.headline}
        </div>
        <p className="mt-1 text-sm text-ink-soft">{result.headlineCaption}</p>
      </div>

      {result.valid && result.breakdown.length > 0 && (
        <dl className="flex flex-col gap-2 border-t border-surface-line pt-4">
          {result.breakdown.map((line) => (
            <div
              key={line.label}
              className={`flex items-baseline justify-between gap-4 ${
                line.emphasis ? "font-medium text-ink" : "text-ink-soft"
              }`}
            >
              <dt className="text-sm">{line.label}</dt>
              <dd className="text-sm tabular-nums">{line.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {result.notes.length > 0 && (
        <ul className="flex flex-col gap-1.5 border-t border-surface-line pt-4">
          {result.notes.map((note, i) => (
            <li key={i} className="text-xs leading-relaxed text-ink-soft">
              {note}
            </li>
          ))}
        </ul>
      )}

      {result.valid && (
        <div className="mt-1 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleDownload}
            disabled={generating}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
          >
            <i
              className={generating ? "ti ti-loader-2 animate-spin" : "ti ti-file-download"}
              aria-hidden="true"
            />
            {generating ? "Preparing…" : "Download PDF summary"}
          </button>
          {error && (
            <p role="alert" className="text-xs text-red-700">
              Sorry — the PDF could not be generated. Please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
