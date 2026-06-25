import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

test.describe("document output (the workflow moat)", () => {
  test("redundancy calculator produces a real PDF on download", async ({ page }) => {
    await page.goto("/redundancy-pay-calculator");

    // Tool renders above the fold with the exact-keyword H1.
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/redundancy pay calculator/i);

    // Default inputs compute a valid result, so the download CTA is present.
    const downloadBtn = page.getByRole("button", { name: /download pdf summary/i });
    await expect(downloadBtn).toBeVisible();

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      downloadBtn.click(),
    ]);

    // Filename is a .pdf
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    // The bytes are a genuine PDF (magic header "%PDF-").
    const path = await download.path();
    const head = (await readFile(path)).subarray(0, 5).toString("latin1");
    expect(head).toBe("%PDF-");
  });

  test("live result updates as inputs change, with no submit button", async ({ page }) => {
    await page.goto("/redundancy-pay-calculator");

    const weekly = page.getByLabel("Gross weekly pay");
    await weekly.fill("600");
    // 6 years (default) × £600 = £3,600 — appears in the headline immediately.
    await expect(page.getByText("£3,600").first()).toBeVisible();

    // No submit/calculate button exists — results are live.
    await expect(page.getByRole("button", { name: /calculate|submit/i })).toHaveCount(0);
  });
});
