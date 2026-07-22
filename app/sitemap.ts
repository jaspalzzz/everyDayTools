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
import {
  isIndexableAuState,
  isIndexableCaProvince,
  isIndexableUsState,
} from "@/lib/contentQuality";

// Generated once at build time for the static export.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const guideEntries: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE.url}/guides/${g.slug}`,
    lastModified: g.dateModified,
  }));

  // Official source review completed 1 July 2026 after the 2026/27 UK rate change.
  const RATES_UPDATED = "2026-07-01";
  // Significant crawl-discovery edits: homepage calculator links and the
  // complete guide directory were added to the initial HTML on this date.
  const DISCOVERY_LINKS_UPDATED = "2026-07-18";

  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE.url}/${tool.slug}`,
    lastModified: RATES_UPDATED,
  }));

  // State pages remain browsable from /us, but only manually curated,
  // current-year records belong in search inventory. Template wording
  // variation alone is not a sufficient quality signal for AdSense or Search.
  // Only the curated state *hub* is published. The minimum-wage / final-paycheck
  // / pto-payout child routes were removed because they rendered mostly template
  // variants without the hub's sourced local analysis; a child route may return
  // only once it has its own separately sourced, route-specific content.
  const stateEntries: MetadataRoute.Sitemap = US_STATES
    .filter(isIndexableUsState)
    .map((s) => ({
      url: `${SITE.url}/us/states/${s.slug}`,
      lastModified: s.lastContentUpdate ?? `${s.verifiedYear}-01-01`,
    }));

  // MAINTENANCE: the /ca/provinces/[province] route was deleted (no province is
  // curated yet). This filter yields nothing today, but if you curate a province
  // so it passes isIndexableCaProvince, you MUST first restore the route file
  // (app/ca/provinces/[province]/page.tsx) or this emits a sitemap URL that 404s.
  // The contentQuality test asserts every province is currently non-indexable,
  // so it fails loudly the moment one qualifies without the route.
  const provinceEntries: MetadataRoute.Sitemap = CA_PROVINCES
    .filter(isIndexableCaProvince)
    .map((p) => ({
      url: `${SITE.url}/ca/provinces/${p.slug}`,
      lastModified: p.lastContentUpdate ?? `${p.verifiedYear}-01-01`,
    }));

  const faqEntries: MetadataRoute.Sitemap = FAQS.map((f) => ({
    url: `${SITE.url}/faq/${f.slug}`,
    lastModified: f.dateModified,
  }));

  // MAINTENANCE: the /au/states/[state] route was deleted (no state is curated
  // yet). Same contract as provinceEntries above — restore the route file
  // (app/au/states/[state]/page.tsx) before any state can pass isIndexableAuState,
  // or this emits a sitemap URL that 404s.
  const auStateEntries: MetadataRoute.Sitemap = AU_STATES
    .filter(isIndexableAuState)
    .map((s) => ({
      url: `${SITE.url}/au/states/${s.slug}`,
      lastModified: s.lastContentUpdate ?? `${s.verifiedYear}-01-01`,
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
    { url: SITE.url, lastModified: DISCOVERY_LINKS_UPDATED },
    { url: `${SITE.url}/uk`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/us`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/ca`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/au`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/guides`, lastModified: DISCOVERY_LINKS_UPDATED },
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
    { url: `${SITE.url}/fr/informations-legales`, lastModified: "2026-07-14" },
    { url: `${SITE.url}/fr/ca/indemnite-de-depart`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/fr/ca/preavis`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/fr/ca/paie-de-vacances`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/tupe-wizard`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/blog`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/methodology`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/editorial-policy`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/updates`, lastModified: "2026-07-12" },
    { url: `${SITE.url}/about`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/contact`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/privacy`, lastModified: "2026-07-22" },
    { url: `${SITE.url}/terms`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/disclaimer`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/press`, lastModified: RATES_UPDATED },
    { url: `${SITE.url}/research/us-final-paycheck-laws`, lastModified: "2026-07-12" },
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
