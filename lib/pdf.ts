import type { CalcResult } from "./types";

/**
 * Client-side document generation. This is the workflow moat: every tool
 * turns a number into a downloadable, dated, source-cited document. Runs
 * entirely in the browser — nothing is uploaded or stored.
 */

export interface LetterMeta {
  /** Document title, e.g. "Statutory Redundancy Pay — Estimate". */
  title: string;
  /** Intro paragraph(s) explaining what the document is. */
  intro: string;
  /** Source citation line for E-E-A-T / credibility. */
  source: string;
  /** Optional closing/disclaimer paragraph. */
  disclaimer?: string;
}

const MARGIN = 20;
const LINE = 7;

export async function generateLetter(result: CalcResult, meta: LetterMeta): Promise<void> {
  // Lazy-load jsPDF so it stays out of the initial page bundle (Core Web Vitals).
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - MARGIN * 2;
  let y = MARGIN;

  const today = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const writeWrapped = (text: string, size: number, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, usableWidth) as string[];
    for (const line of lines) {
      if (y > 270) {
        doc.addPage();
        y = MARGIN;
      }
      doc.text(line, MARGIN, y);
      y += LINE;
    }
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(meta.title, MARGIN, y);
  y += LINE + 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generated ${today} · EmploymentTools`, MARGIN, y);
  doc.setTextColor(0);
  y += LINE + 3;

  writeWrapped(meta.intro, 11);
  y += 2;

  // Headline figure
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(result.headline, MARGIN, y + 4);
  y += 12;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(result.headlineCaption, MARGIN, y);
  doc.setTextColor(0);
  y += LINE + 2;

  // Breakdown table
  writeWrapped("Breakdown", 12, true);
  y += 1;
  for (const line of result.breakdown) {
    doc.setFont("helvetica", line.emphasis ? "bold" : "normal");
    doc.setFontSize(11);
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    doc.text(line.label, MARGIN, y);
    doc.text(line.value, pageWidth - MARGIN, y, { align: "right" });
    y += LINE;
  }
  y += 3;

  // Notes
  if (result.notes.length) {
    writeWrapped("Notes", 12, true);
    for (const note of result.notes) {
      writeWrapped(`•  ${note}`, 10);
    }
    y += 2;
  }

  // Source + disclaimer
  doc.setDrawColor(200);
  doc.line(MARGIN, y, pageWidth - MARGIN, y);
  y += LINE;
  writeWrapped(`Source: ${meta.source}`, 9);
  writeWrapped(
    meta.disclaimer ??
      "This document is an estimate for informational purposes only and is not legal or financial advice.",
    9,
  );

  const filename = meta.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  doc.save(`${filename}.pdf`);
}
