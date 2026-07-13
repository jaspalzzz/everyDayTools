import { describe, expect, it } from "vitest";
import { buildPdfDocumentCopy, type LetterMeta } from "@/lib/pdf";

const meta: LetterMeta = {
  title: "Redundancy Pay — Estimate",
  intro: "This document records the estimate.",
  source: "Official source",
};

describe("PDF document variants", () => {
  it("keeps the normal estimate copy concise", () => {
    expect(buildPdfDocumentCopy(meta, "estimate")).toEqual({
      title: meta.title,
      intro: meta.intro,
      filenameSuffix: "estimate",
    });
  });

  it("builds a calculation worksheet variant", () => {
    const copy = buildPdfDocumentCopy(meta, "worksheet");
    expect(copy.title).toContain("Calculation Worksheet");
    expect(copy.intro).toContain("inputs, result, assumptions and source");
  });

  it("builds an employer review request without presenting it as legal advice", () => {
    const copy = buildPdfDocumentCopy(meta, "employer-request");
    expect(copy.title).toContain("Employer Review Request");
    expect(copy.intro).toContain("Please review");
    expect(copy.intro).not.toContain("legal advice");
  });
});
