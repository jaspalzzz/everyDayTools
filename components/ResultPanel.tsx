"use client";

import { useState } from "react";
import type { CalcResult } from "@/lib/types";
import type { LetterMeta } from "@/lib/pdf";
import { generateLetter } from "@/lib/pdf";

export function ResultPanel({
  result,
  letterMeta,
}: {
  result: CalcResult;
  letterMeta: LetterMeta;
}) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent */
    }
  };

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
    <div
      style={{
        border: "1px solid #c8d9ea",
        borderRadius: 10,
        background: "#fff",
        boxShadow: "0 10px 24px rgba(16,32,51,.05)",
        overflow: "hidden",
      }}
    >
      {/* Result head */}
      <div
        style={{
          padding: "22px 22px 18px",
          borderBottom: "1px solid #e7edf3",
          background: "#f8fbff",
        }}
      >
        <p style={{ margin: "0 0 6px", color: "#52616f", fontSize: 13, fontWeight: 850 }}>
          Your estimate
        </p>
        <p
          style={{
            margin: 0,
            color: result.valid ? "#0f56bd" : "#8795a3",
            fontSize: 44,
            lineHeight: 1,
            fontWeight: 900,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-.01em",
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          {result.headline}
        </p>
        <p style={{ margin: "9px 0 0", color: "#25384c", fontSize: 13, lineHeight: 1.5 }}>
          {result.headlineCaption}
        </p>
      </div>

      {/* Breakdown */}
      {result.valid && result.breakdown.length > 0 && (
        <div style={{ padding: "8px 22px 18px" }}>
          {result.breakdown.map((line) => (
            <div
              key={line.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                borderBottom: line.emphasis ? "none" : "1px solid #e7edf3",
                padding: "11px 0",
                color: line.emphasis ? "#102033" : "#52616f",
                fontSize: 13,
                fontWeight: line.emphasis ? 750 : 700,
                ...(line.emphasis
                  ? {
                      margin: "4px -10px 0",
                      borderRadius: 8,
                      background: "#eaf3ff",
                      padding: "11px 10px",
                    }
                  : {}),
              }}
            >
              <span>{line.label}</span>
              <strong style={{ color: "#102033", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                {line.value}
              </strong>
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      {result.notes.length > 0 && (
        <ul
          style={{
            margin: 0, padding: "0 22px 14px",
            listStyle: "none", display: "flex", flexDirection: "column", gap: 6,
          }}
        >
          {result.notes.map((note, i) => (
            <li
              key={i}
              style={{ color: "#52616f", fontSize: 12, lineHeight: 1.5, paddingLeft: 14, position: "relative" }}
            >
              <span style={{ position: "absolute", left: 0, top: 1, color: "#1769e0" }}>·</span>
              {note}
            </li>
          ))}
        </ul>
      )}

      {/* Actions */}
      {result.valid && (
        <div style={{ display: "grid", gap: 10, padding: "0 22px 22px" }}>
          <button
            type="button"
            onClick={handleDownload}
            disabled={generating}
            style={{
              minHeight: 46, display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8,
              borderRadius: 8, border: "none",
              background: generating ? "#6b9fd4" : "#1769e0",
              color: "#fff", fontSize: 14, fontWeight: 900,
              cursor: generating ? "default" : "pointer",
              transition: "background 150ms",
            }}
          >
            {generating ? "Preparing…" : "Download private estimate"}
          </button>
          <button
            type="button"
            onClick={handleShare}
            style={{
              minHeight: 46, display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8,
              borderRadius: 8, border: "1px solid #d8e2ec",
              background: "#fff", color: "#25384c",
              fontSize: 14, fontWeight: 900,
              cursor: "pointer",
            }}
          >
            {copied ? "✓ Link copied!" : "Share these results"}
          </button>
          {error && (
            <p role="alert" style={{ margin: 0, color: "#c0392b", fontSize: 12 }}>
              The PDF could not be generated. Please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
