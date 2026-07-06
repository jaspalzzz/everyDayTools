import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { TOOLS } from "../data/tools";

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

      const [download] = await Promise.all([
        page.waitForEvent("download"),
        downloadBtn.click(),
      ]);

      expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
      const path = await download.path();
      const head = (await readFile(path)).subarray(0, 5).toString("latin1");
      expect(head).toBe("%PDF-");
    });
  });
}

test("redundancy result updates live as inputs change", async ({ page }) => {
  await page.goto("/redundancy-pay-calculator");
  await page.getByLabel("Gross weekly pay").fill("600");
  // 6 years (default) × £600 = £3,600 — headline updates with no submit.
  await expect(page.getByText("£3,600").first()).toBeVisible();
});
