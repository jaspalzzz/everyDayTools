// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { BrowseByCategory } from "@/components/home/BrowseByCategory";
import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { GUIDES } from "@/data/guides";

const PRIORITY_CALCULATORS = [
  "/adoption-pay-calculator",
  "/au-annual-leave-calculator",
  "/bonus-tax-calculator",
  "/day-rate-calculator",
  "/employer-notice-pay-calculator",
  "/employer-redundancy-cost-calculator",
  "/holiday-entitlement-calculator",
  "/ir35-calculator",
  "/maternity-pay-calculator",
  "/pro-rata-salary-calculator",
  "/self-employment-tax-calculator",
  "/severance-pay-calculator",
  "/statutory-sick-pay-calculator",
  "/tupe-wizard",
  "/us/new-york/pto-payout-calculator",
  "/working-days-calculator",
] as const;

function hrefs(container: HTMLElement): Set<string> {
  return new Set(
    Array.from(container.querySelectorAll<HTMLAnchorElement>("a[href]"))
      .map((link) => link.getAttribute("href"))
      .filter((href): href is string => Boolean(href)),
  );
}

describe("crawlable contextual directories", () => {
  afterEach(cleanup);

  it("keeps every priority calculator link in the homepage's initial markup", () => {
    const { container } = render(<BrowseByCategory />);
    const links = hrefs(container);
    for (const href of PRIORITY_CALCULATORS) {
      expect(links.has(href), `missing homepage discovery link ${href}`).toBe(true);
    }
  });

  it("keeps every guide and its matching calculator in the guide directory markup", () => {
    const { container } = render(<GuidesIndex guides={GUIDES} />);
    const links = hrefs(container);
    for (const guide of GUIDES) {
      expect(links.has(`/guides/${guide.slug}`), `missing guide link ${guide.slug}`).toBe(true);
      expect(links.has(`/${guide.relatedTool}`), `missing calculator link ${guide.relatedTool}`).toBe(true);
    }
  });
});
