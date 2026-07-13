import { SITE } from "./seo";
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
  /** Source citation label for E-E-A-T / credibility. */
  source: string;
  /** Optional source URL rendered with the source label. */
  sourceUrl?: string;
  /** Optional statutory/rate effective date used in the standard disclaimer. */
  effectiveDate?: string;
  /** Optional snapshot of the user inputs that produced this document. */
  inputs?: Array<{ label: string; value: string }>;
  /** Optional closing/disclaimer paragraph that overrides the standard disclaimer. */
  disclaimer?: string;
}

export type PdfDocumentType = "estimate" | "worksheet" | "employer-request";

export interface PdfPersonalization {
  personName?: string;
  employerName?: string;
  referenceDate?: string;
}

export interface PdfGenerationOptions {
  documentType?: PdfDocumentType;
  personalization?: PdfPersonalization;
}

export interface PdfDocumentCopy {
  title: string;
  intro: string;
  filenameSuffix: string;
}

export function buildPdfDocumentCopy(
  meta: LetterMeta,
  documentType: PdfDocumentType = "estimate",
): PdfDocumentCopy {
  if (documentType === "worksheet") {
    return {
      title: `${meta.title} — Calculation Worksheet`,
      intro: `This calculation worksheet records the inputs, result, assumptions and source used for the estimate. ${meta.intro}`,
      filenameSuffix: "calculation-worksheet",
    };
  }
  if (documentType === "employer-request") {
    return {
      title: `${meta.title} — Employer Review Request`,
      intro: `Please review the pay or entitlement calculation recorded in this document and confirm the inputs, applicable rule, any deductions, and the expected payment or review date. ${meta.intro}`,
      filenameSuffix: "employer-review-request",
    };
  }
  return { title: meta.title, intro: meta.intro, filenameSuffix: "estimate" };
}

const MARGIN = 20;
const LINE = 7;

export async function generateLetter(
  result: CalcResult,
  meta: LetterMeta,
  options: PdfGenerationOptions = {},
): Promise<void> {
  // Lazy-load jsPDF so it stays out of the initial page bundle (Core Web Vitals).
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - MARGIN * 2;
  const documentType = options.documentType ?? "estimate";
  const copy = buildPdfDocumentCopy(meta, documentType);
  const personalization = options.personalization ?? {};
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

  const ensureSpace = (height = LINE) => {
    if (y + height > 270) {
      doc.addPage();
      y = MARGIN;
    }
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(copy.title, MARGIN, y);
  y += LINE + 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generated ${today} · ${SITE.name}`, MARGIN, y);
  doc.setTextColor(0);
  y += LINE + 3;

  writeWrapped(copy.intro, 11);
  y += 2;

  const documentDetails = [
    personalization.personName?.trim()
      ? { label: "Prepared for", value: personalization.personName.trim() }
      : null,
    personalization.employerName?.trim()
      ? { label: "Employer", value: personalization.employerName.trim() }
      : null,
    personalization.referenceDate
      ? { label: "Reference date", value: personalization.referenceDate }
      : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  if (documentDetails.length) {
    writeWrapped("Document details", 12, true);
    y += 1;
    for (const detail of documentDetails) {
      ensureSpace();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(detail.label, MARGIN, y);
      doc.text(detail.value, pageWidth - MARGIN, y, { align: "right" });
      y += LINE;
    }
    y += 3;
  }

  if (meta.inputs?.length) {
    writeWrapped("Your inputs", 12, true);
    y += 1;
    for (const input of meta.inputs) {
      ensureSpace();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(input.label, MARGIN, y);
      doc.text(input.value, pageWidth - MARGIN, y, { align: "right" });
      y += LINE;
    }
    y += 3;
  }

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
    writeWrapped("Things to check", 12, true);
    for (const note of result.notes) {
      writeWrapped(`•  ${note}`, 10);
    }
    y += 2;
  }

  // Source + disclaimer
  doc.setDrawColor(200);
  ensureSpace(LINE * 4);
  doc.line(MARGIN, y, pageWidth - MARGIN, y);
  y += LINE;
  const sourceCitation = meta.sourceUrl
    ? `Source: ${meta.source} — ${meta.sourceUrl}`
    : `Source: ${meta.source}`;
  writeWrapped(sourceCitation, 9);
  writeWrapped(
    meta.disclaimer ??
      `Disclaimer: This document is an estimate generated by ${SITE.url.replace(
        /^https?:\/\//,
        "",
      )} for informational purposes only. It is not legal advice. Figures are based on statutory rates${
        meta.effectiveDate ? ` effective ${meta.effectiveDate}` : ""
      }. Always verify with your employer, HMRC, your state agency, or a qualified employment lawyer before taking action.`,
    9,
  );

  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(220);
    doc.line(MARGIN, 285, pageWidth - MARGIN, 285);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(110);
    doc.text(`${SITE.name} · Private, client-side document`, MARGIN, 290);
    doc.text(`Page ${page} of ${totalPages}`, pageWidth - MARGIN, 290, { align: "right" });
    doc.setTextColor(0);
  }

  const filename = `${meta.title}-${copy.filenameSuffix}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  doc.save(`${filename}.pdf`);
}
