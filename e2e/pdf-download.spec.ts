import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { TOOLS } from "../data/tools";

function extractPdfLiteralText(bytes: Buffer): string {
  const source = bytes.toString("latin1");
  return [...source.matchAll(/\(((?:\\.|[^\\)])*)\)/g)]
    .map((match) =>
      (match[1] ?? "")
        .replace(/\\([\\()])/g, "$1")
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "\r"),
    )
    .join(" ");
}

function normalizeExtractedText(value: string): string {
  return value.replace(/[—–\x97]/g, "-").replace(/\s+/g, " ").trim();
}

// The document-output moat must hold for EVERY tool, not just one. Each Tier 1
// calculator computes a valid result from its defaults, so the download CTA is
// present on load and must yield genuine PDF bytes.
for (const tool of TOOLS) {
  test.describe(`document output — ${tool.shortName}`, () => {
    test("renders the tool above the fold with the exact-keyword H1", async ({ page }) => {
      await page.goto(`/${tool.slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(tool.name);
      // Results are live: there is never a calculate/submit button.
      await expect(page.getByRole("button", { name: /calculate|submit/i })).toHaveCount(0);
    });

    test("produces a real PDF on download", async ({ page }) => {
      await page.goto(`/${tool.slug}`);

      const downloadBtn = page.getByRole("button", { name: /download private estimate/i });
      await expect(downloadBtn).toBeVisible();
      const firstBreakdownLabel = await page.getByTestId("result-breakdown-label").first().innerText();

      const [download] = await Promise.all([
        page.waitForEvent("download"),
        downloadBtn.click(),
      ]);

      expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
      const path = await download.path();
      const bytes = await readFile(path);
      const head = bytes.subarray(0, 5).toString("latin1");
      expect(head).toBe("%PDF-");
      const text = extractPdfLiteralText(bytes);
      expect(text).toContain("Breakdown");
      expect(normalizeExtractedText(text)).toContain(normalizeExtractedText(firstBreakdownLabel));
    });
  });
}

test("redundancy result updates live as inputs change", async ({ page }) => {
  await page.goto("/redundancy-pay-calculator");
  await page.getByLabel("Gross weekly pay").fill("600");
  // 6 years (default) × £600 = £3,600 — headline updates with no submit.
  await expect(page.getByText("£3,600").first()).toBeVisible();
});

test("personalised employer-review PDF contains the selected document text", async ({ page }) => {
  await page.goto("/redundancy-pay-calculator");
  await page.getByText("Personalise PDF or choose document type").click();
  await page.getByLabel("PDF document type").selectOption("employer-request");
  await page.getByLabel("Your name (optional)").fill("Alex Example");
  await page.getByLabel("Employer (optional)").fill("Example Employer Ltd");
  await page.getByLabel("Reference date (optional)").fill("2026-07-13");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /download private estimate/i }).click(),
  ]);

  expect(download.suggestedFilename()).toContain("employer-review-request");
  const path = await download.path();
  const text = extractPdfLiteralText(await readFile(path));
  expect(text).toContain("Employer Review Request");
  expect(text).toContain("Prepared for");
  expect(text).toContain("Alex Example");
  expect(text).toContain("Example Employer Ltd");
  expect(text).toContain("Breakdown");
  expect(text).toContain("Things to check");
});
