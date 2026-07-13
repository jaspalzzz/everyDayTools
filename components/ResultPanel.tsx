"use client";

import { useState } from "react";
import type { CalcResult } from "@/lib/types";
import type { LetterMeta, PdfDocumentType } from "@/lib/pdf";
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
  const [documentType, setDocumentType] = useState<PdfDocumentType>("estimate");
  const [personName, setPersonName] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [referenceDate, setReferenceDate] = useState("");

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
      await generateLetter(result, letterMeta, {
        documentType,
        personalization: { personName, employerName, referenceDate },
      });
    } catch {
      setError(true);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div
      data-testid="result-panel"
      style={{
        border: "1px solid #E4DECF",
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
          borderBottom: "1px solid #EAE5D8",
          background: "#FBF9F3",
        }}
      >
        <p style={{ margin: "0 0 6px", color: "#52616f", fontSize: 13, fontWeight: 850 }}>
          Your estimate
        </p>
        <p
          data-testid="result-headline"
          style={{
            margin: 0,
            color: result.valid ? "#163C6B" : "#8795a3",
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
                borderBottom: line.emphasis ? "none" : "1px solid #EAE5D8",
                padding: "11px 0",
                color: line.emphasis ? "#102033" : "#52616f",
                fontSize: 13,
                fontWeight: line.emphasis ? 750 : 700,
                ...(line.emphasis
                  ? {
                      margin: "4px -10px 0",
                      borderRadius: 8,
                      background: "#EAF0F8",
                      padding: "11px 10px",
                    }
                  : {}),
              }}
            >
              <span data-testid="result-breakdown-label">{line.label}</span>
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
              <span style={{ position: "absolute", left: 0, top: 1, color: "#1E4E8C" }}>·</span>
              {note}
            </li>
          ))}
        </ul>
      )}

      {/* Actions */}
      {result.valid && (
        <div style={{ display: "grid", gap: 10, padding: "0 22px 22px" }}>
          <details
            style={{
              border: "1px solid #E4DECF", borderRadius: 8,
              background: "#FBF9F3", padding: "12px 14px",
            }}
          >
            <summary style={{ color: "#25384c", cursor: "pointer", fontSize: 13, fontWeight: 850 }}>
              Personalise PDF or choose document type
            </summary>
            <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
              <label style={PDF_FIELD_LABEL_STYLE}>
                Document type
                <select
                  aria-label="PDF document type"
                  value={documentType}
                  onChange={(event) => setDocumentType(event.target.value as PdfDocumentType)}
                  style={PDF_FIELD_STYLE}
                >
                  <option value="estimate">Private estimate</option>
                  <option value="worksheet">Calculation worksheet</option>
                  <option value="employer-request">Employer review request</option>
                </select>
              </label>
              <label style={PDF_FIELD_LABEL_STYLE}>
                Your name (optional)
                <input
                  value={personName}
                  onChange={(event) => setPersonName(event.target.value)}
                  autoComplete="name"
                  style={PDF_FIELD_STYLE}
                />
              </label>
              <label style={PDF_FIELD_LABEL_STYLE}>
                Employer (optional)
                <input
                  value={employerName}
                  onChange={(event) => setEmployerName(event.target.value)}
                  autoComplete="organization"
                  style={PDF_FIELD_STYLE}
                />
              </label>
              <label style={PDF_FIELD_LABEL_STYLE}>
                Reference date (optional)
                <input
                  type="date"
                  value={referenceDate}
                  onChange={(event) => setReferenceDate(event.target.value)}
                  style={PDF_FIELD_STYLE}
                />
              </label>
              <p style={{ margin: 0, color: "#6b7885", fontSize: 11, lineHeight: 1.5 }}>
                These details stay in your browser and are used only to create the downloaded PDF.
              </p>
            </div>
          </details>
          <button
            type="button"
            onClick={handleDownload}
            disabled={generating}
            style={{
              minHeight: 46, display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8,
              borderRadius: 8, border: "none",
              background: generating ? "#6b9fd4" : "#1E4E8C",
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
              borderRadius: 8, border: "1px solid #E4DECF",
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

const PDF_FIELD_LABEL_STYLE = {
  display: "grid",
  gap: 5,
  color: "#52616f",
  fontSize: 12,
  fontWeight: 750,
} as const;

const PDF_FIELD_STYLE = {
  width: "100%",
  minHeight: 40,
  border: "1px solid #C9D0D6",
  borderRadius: 7,
  background: "#fff",
  color: "#102033",
  padding: "8px 10px",
  fontSize: 13,
} as const;
