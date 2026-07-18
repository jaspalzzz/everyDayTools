import { describe, expect, it } from "vitest";
import { BLOG_POSTS } from "@/data/blogPosts";
import { getFaq } from "@/data/faqs";
import { getTool } from "@/data/tools";

describe("GSC keyword-intent alignment", () => {
  it("maps the three calculator query clusters to focused metadata", () => {
    const notice = getTool("notice-period-calculator")!;
    const settlement = getTool("settlement-agreement-calculator")!;
    const tribunal = getTool("tribunal-compensation-calculator")!;

    expect(notice.seoTitle).toMatch(/UK Notice Period Calculator/i);
    expect(notice.description).toMatch(/one month, four weeks/i);
    expect(settlement.seoTitle).toMatch(/Settlement & Compromise Agreement Calculator/i);
    expect(tribunal.seoTitle).toMatch(/Unfair Dismissal & Tribunal Compensation Calculator/i);

    for (const tool of [notice, settlement, tribunal]) {
      expect(tool.seoTitle?.length, `${tool.slug} SEO title length`).toBeLessThanOrEqual(60);
      expect(tool.description.length, `${tool.slug} description length`).toBeLessThanOrEqual(155);
    }
  });

  it("keeps the high-impression overtime article on the current federal threshold", () => {
    const post = BLOG_POSTS.find((item) => item.slug === "us-overtime-law-explained")!;
    expect(post.title).toMatch(/US Overtime Law 2026.*FLSA/i);
    expect(post.quickAnswer).toContain("$684 per week");
    expect(post.quickAnswer).not.toMatch(/\$1,128|\$58,656/);
    expect(post.dateModified).toBe("2026-07-18");
  });

  it("supports salary sacrifice and salary exchange intent with sourced current facts", () => {
    const faq = getFaq("what-is-salary-sacrifice-uk")!;
    expect(faq.question).toMatch(/salary sacrifice \(salary exchange\)/i);
    expect(faq.shortAnswer.length).toBeLessThanOrEqual(155);
    expect(faq.answer.join(" ")).toMatch(/8% employee National Insurance/i);
    expect(faq.answer.join(" ")).toMatch(/15%/);
    expect(faq.answer.join(" ")).toMatch(/6 April 2029/);
    expect(faq.sourceLinks).toHaveLength(3);
    expect(faq.sourceLinks?.every((source) => source.href.startsWith("https://www.gov.uk/"))).toBe(true);
    expect(faq.dateModified).toBe("2026-07-18");
  });
});
