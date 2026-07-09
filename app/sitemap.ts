import type { MetadataRoute } from "next";
import { TOOLS } from "@/data/tools";
import { GUIDES } from "@/data/guides";
import { US_STATES } from "@/data/usStates";
import { CA_PROVINCES } from "@/data/caProvinces";
import { AU_STATES } from "@/data/auStates";
import { COMPARISONS } from "@/data/comparisons";
import { FAQS } from "@/data/faqs";
import { BLOG_POSTS } from "@/data/blogPosts";
import { SITE } from "@/lib/seo";

// Generated once at build time for the static export.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const guideEntries: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE.url}/guides/${g.slug}`,
    lastModified: g.dateModified,
  }));

  // Official source review completed 1 July 2026 after the 2026/27 UK rate change.
  const RATES_UPDATED = "2026-07-01";

  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE.url}/${tool.slug}`,
    lastModified: RATES_UPDATED,
  }));

  const stateEntries: MetadataRoute.Sitemap = US_STATES.flatMap((s) => {
    // Reflects the actual last edit to this state's page content where known
    // (e.g. a state that got a genuinely new localContext paragraph), rather
    // than a single blanket date shared across all 51 states regardless of
    // whether anything about that specific page actually changed.
    const lastModified = s.lastContentUpdate ?? `${s.verifiedYear}-01-01`;
    return [
      {
        url: `${SITE.url}/us/states/${s.slug}`,
        lastModified,
      },
      {
        url: `${SITE.url}/us/states/${s.slug}/final-paycheck`,
        lastModified,
      },
      {
        url: `${SITE.url}/us/states/${s.slug}/minimum-wage`,
        lastModified,
      },
      {
        url: `${SITE.url}/us/states/${s.slug}/pto-payout`,
        lastModified,
      },
    ];
  });

  const provinceEntries: MetadataRoute.Sitemap = CA_PROVINCES.map((p) => ({
    url: `${SITE.url}/ca/provinces/${p.slug}`,
    lastModified: p.lastContentUpdate ?? `${p.verifiedYear}-01-01`,
  }));

  const faqEntries: MetadataRoute.Sitemap = FAQS.map((f) => ({
    url: `${SITE.url}/faq/${f.slug}`,
    lastModified: f.dateModified,
  }));

  const auStateEntries: MetadataRoute.Sitemap = AU_STATES.map((s) => ({
    url: `${SITE.url}/au/states/${s.slug}`,
    lastModified: `${s.verifiedYear}-01-01`,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.dateModified,
  }));

  const compareEntries: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: `${SITE.url}/compare/${c.slug}`,
    lastModified: c.dateModified,
  }));

  return [
    { url: SITE.url, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/uk`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/us`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/ca`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/au`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/guides`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/compare`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/faq`, lastModified: RATES_UPDATED },
    ...guideEntries,
    { url: `${SITE.url}/situations/made-redundant-uk`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/unfair-dismissal-uk`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/leaving-job-uk`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/employer-not-paying`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/constructive-dismissal-uk`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/sacked-while-pregnant-uk`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/employer-gone-bust`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/workplace-discrimination-uk`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/situations/us-wrongful-termination`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/fr`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/fr/ca/indemnite-de-depart`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/fr/ca/preavis`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/fr/ca/paie-de-vacances`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/tupe-wizard`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/blog`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/methodology`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/editorial-policy`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/about`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/contact`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/privacy`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/terms`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/disclaimer`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/press`, lastModified: RATES_UPDATED },
    // Pillar pages
    { url: `${SITE.url}/uk/redundancy`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/uk/maternity-leave`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/uk/pay-rights`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/uk/leaving-job`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/us/overtime`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/us/pto-payout`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/us/final-paycheck`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/us/final-paycheck/was-my-final-paycheck-late`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/us/final-paycheck/employer-deduction-checker`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/us/new-york/pto-payout-calculator`, lastModified: RATES_UPDATED },
    ...toolEntries,
    ...stateEntries,
    ...provinceEntries,
    ...auStateEntries,
    ...compareEntries,
    ...faqEntries,
    ...blogEntries,
  ];
}
