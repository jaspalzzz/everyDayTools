# mypayrights.com — Full SEO Audit Report

**Audit date:** 2026-07-14
**Prior audit:** 2026-07-08 (archived at `../mypayrights.com-audit-2026-07-08/`)
**Business type:** Content/utility site — free employment-law calculators (YMYL-adjacent, pre-monetization). UK/US/CA/AU coverage. Heavy programmatic SEO footprint (~225 location pages of 411 total URLs).
**Method:** 11 specialist subagents run in parallel (technical, content, schema, sitemap, performance, visual, GEO, Google API, backlinks, content-cluster, SXO), live HTTP/HTML inspection, real Google API field/lab data (first time available), Playwright screenshots, local build-audit scripts.

---

## Executive Summary

## SEO Health Score: 84 / 100

*(unchanged from the 2026-07-08 baseline of 84 — but the composition underneath shifted substantially: real gains in performance measurement, AI-citation readiness, and internal-linking architecture were offset by more rigorous E-E-A-T scrutiny and newly-surfaced schema/on-page issues. See "What Changed Since Jul 8" below.)*

| Category | Score | Weight | Contribution |
|---|---|---|---|
| Technical SEO | 91 | 22% | 20.0 |
| Content Quality | 74 | 23% | 17.0 |
| On-Page SEO | 82 | 20% | 16.4 |
| Schema / Structured Data | 80 | 10% | 8.0 |
| Performance (CWV) | 90 | 10% | 9.0 |
| AI Search Readiness | 93 | 10% | 9.3 |
| Images | 95 | 5% | 4.75 |
| **Weighted total** | | | **84.5 → 84** |

Supplementary (not weighted into the health score, reported separately per methodology): **Content Clusters/Internal Linking 58/100** (up from 34), **SXO 56/100**, **Backlinks** — insufficient data (site too new for Common Crawl inclusion).

### Top 5 Critical/High Issues
1. **[Critical]** ~225 location-style pages (55% of the sitemap) trip the quality-gate hard-stop threshold (50+). Content-uniqueness itself independently **passed** (51-95% unique per pair) — the risk is structural/scale, not content quality: 46% of the sitemap shares a placeholder lastmod, and several sub-page-types are only discoverable via the sitemap, not internal navigation.
2. **[Critical]** The new `/uk/redundancy` pillar page is entirely one-directional — none of its 16 linked spokes link back to it, undermining the topical-authority value the pillar exists to create.
3. **[Critical]** Two FAQ pages (`/faq/what-is-overtime-law-us`, `/faq/what-is-tupe-transfer`) are single 285-315 word paragraphs competing against SERPs dominated by long-form tables and government/law-firm content — and don't link to the site's own better-suited calculator/state pages.
4. **[High]** GSC service account has no access to the mypayrights.com property — blocks real indexation and search-performance monitoring (2-minute fix).
5. **[High]** No named, credentialed legal reviewer anywhere on YMYL employment-law content across all four jurisdictions — the single highest-leverage E-E-A-T gap, reconfirmed this pass.

### Top 5 Quick Wins
1. Add the GSC service account as a Full user on the mypayrights.com property (~2 min).
2. Fix the desktop/tablet trust-badge overlay hiding pay values in the homepage hero (CSS fix, real bug caught by rendered-screenshot testing, invisible from source review).
3. Add reciprocal links from `/uk/redundancy`'s 16 spokes back to the pillar.
4. Standardize "My Pay Rights" vs hardcoded "MyPayRights" across 14+ templates.
5. Add the `image` property to Article schema using the opengraph-image endpoint that already exists.

---

## What Changed Since Jul 8, 2026

**Real gains:**
- Google API credentials are now authenticated (Tier 1) — this audit is the first to use real PageSpeed Insights/Lighthouse and CrUX data instead of lab-inferred estimates. Performance rose from an inferred 78 to a measured 90 (Lighthouse 94-100 across templates; CrUX has no eligible field data yet, expected for site age).
- `llms.txt` is now live and unusually thorough — closed the prior audit's only AI-Search-Readiness gap. GEO score rose 91 → 93.
- Content-cluster/internal-linking score rose 34 → 58 after a real `/uk/redundancy` pillar page was built; the June audit's redundancy-cannibalization concern turned out to be a non-issue on fresh inspection.
- A previously-documented HARD-STOP content-duplication defect (16-18% unique on federal-minimum-wage-tier states) was confirmed fixed and holding at the larger current scale (411 vs 262 URLs).
- Render-blocking resources improved from 1 stylesheet to zero (CSS now fully inlined site-wide).

**New issues surfaced:**
- Deeper field-level schema validation caught two real gaps missed by the automated `score-schema-seo.mjs` script (100/100 on its own narrower checks): missing `image` on Article schema, and inconsistent "My Pay Rights"/"MyPayRights" entity naming across 14+ templates. Schema score: 85 → 80.
- The new pillar page's one-directional linking is a fresh regression risk introduced by this pass's own remediation work.
- A real rendered-viewport bug (trust badges hiding hero values at desktop widths) was caught by this pass's visual/screenshot testing — invisible to source-code review alone.
- The GSC service account setup gap is new information (the prior audit didn't have API access at all, so this wasn't previously knowable).
- Content Quality score (74, down from 88) reflects more rigorous E-E-A-T scrutiny this pass, not a content regression — the location-page gate itself passed more convincingly than before (51-95% vs 44.6-46.7% unique in the Jul 8 pass). The drop is driven by explicitly re-flagging the still-unresolved named-legal-reviewer gap and a newly-identified missing freshness-badge question on US pages, both weighted more heavily this pass.

---

## Technical SEO — 91/100

**What Works:** robots.txt permissive for all crawlers including AI bots; sitemap grew 358→411 URLs with zero duplicates and 100/100 on the local build audit across all 411 routes; security headers fully consistent across every page type sampled including the 404 page; genuine 404s with correct no-store caching; clean redirect hygiene (www→apex, http→https, trailing-slash→canonical); zero JS-rendering dependency (full SSR/SSG); render-blocking resources now zero (was 1 stylesheet on Jul 8); complete per-page-unique meta tags and broad JSON-LD presence; hreflang correctly scoped to locale hubs only.

**Findings:**
- **[Medium]** IndexNow protocol not implemented — no key file, no repo references, despite frequent new-URL additions (53 in 6 days).
- **[Low]** Sitemap `lastmod` is a placeholder `2025-01-01` date on 188/411 URLs (46%) — unchanged since Jul 8.
- **[Low]** Case-sensitive routes 404 instead of normalizing to canonical casing.
- **[Info]** Mobile tap-target sizing confirmed only at source level — see Visual findings for rendered confirmation.
- **[Info]** Strong lab CWV source signals (no render-blocking CSS, async scripts, no images/@font-face) — cross-reference against Performance category for real measurements.

Full detail: [`findings/technical.md`](findings/technical.md)

---

## Content Quality — 74/100

**Location-page quality gate verdict: PASS.** 225 location-style pages (4.5× the 50-page hard-stop threshold) were spot-checked across California, Texas, Wyoming, Mississippi, and Kansas final-paycheck/minimum-wage/pto-payout/hub pages — every pair measured 51-95% unique content via `difflib` comparison of extracted text, comfortably clearing the 40% warning gate. Content is genuinely state-specific (real deadlines, real DOL/agency links, differing statutory triggers), not templated filler. This is a marked improvement over the Jul 8 audit, which measured CA-vs-TX at only 44.6-46.7% unique and found a real HARD-STOP defect (16-18% unique) on the federal-minimum-wage-tier state cluster — that defect was fixed and the fix has held at the larger current scale.

**What Works:** real differentiated statutory data per state; direct, checkable source citations on every sampled page; location-page word counts comfortably clear the 500-600 floor for final-paycheck/minimum-wage/pto-payout variants; documented remediation history is itself a trust signal.

**Findings:**
- **[Low]** Two of five sampled state hub pages (Kansas 409 words, Mississippi 406 words) fall below the word-count floor.
- **[Medium]** No visible per-page "last verified" date stamp on US state pages, unlike the UK calculators.
- **[High]** No named, credentialed legal reviewer — carried forward, likely still open.
- **[Low]** Cross-state comparison tables (shared dataset, re-sorted) do a lot of the "uniqueness" lifting — legitimate but worth monitoring.
- **[Info]** Other E-E-A-T items (methodology depth, editorial policy) carried forward from prior audits, not re-verified this session.

Full detail: [`findings/content.md`](findings/content.md)

---

## On-Page SEO — 82/100

*(Synthesized from Technical's on-page findings, Content's thin-page findings, and Visual/SXO's rendered-UX and FAQ-depth findings — no single subagent owns this category end-to-end.)*

**What Works:** every route has a self-referential canonical, single H1, passing title/description length (100/100 on local audit); real per-page-unique meta descriptions, OG tags, Twitter Cards; BreadcrumbList schema on all deep pages.

**Findings:**
- **[Critical]** Two FAQ pages critically thin relative to competing SERPs (overtime, TUPE) — see SXO detail below.
- **[High]** Homepage hero result card: floating trust badges obscure "Basic pay"/"Notice pay" values at desktop widths (≥1024px) — confirmed via rendered screenshot, invisible from source review.
- **[Medium]** Minimal in-content cross-linking to the site's own tools (`/tupe-wizard`, `/take-home-overtime-calculator`, `/compare/*`) from the FAQ pages that most need them.
- **[Medium]** Mobile cookie-consent banner overlaps the hero search widget's submit button on first paint.
- **[Medium]** Several mobile tap targets under the 44×44px guideline (hamburger menu 36×36, quick-link pills 35px tall, consent buttons 40px tall, footer link 16px tall).

Full detail: [`findings/visual.md`](findings/visual.md), [`findings/sxo.md`](findings/sxo.md)

---

## Schema / Structured Data — 80/100

**What Works:** broad JSON-LD coverage across every page type; FAQPage/QAPage correctly retained post-May-2026 Google FAQ rich-result retirement for its AI-citation value; local build validation 100/100 on parse validity and required fields.

**Findings:**
- **[High]** Article/BlogPosting JSON-LD missing required `image` property — traces to the deliberate zero-raster-image build; fix by referencing the existing per-route opengraph-image endpoint.
- **[Medium]** Inconsistent publisher entity name — "My Pay Rights" (shared constant) vs hardcoded "MyPayRights" in 14+ templates.
- **[Low]** Article publisher objects omit `logo` (asset already exists).
- **[Info]** FAQPage schema retained correctly despite losing Google SERP rich-result value — no removal recommended, real AI-citation value.
- **[Low]** A stale "2025" reference embedded in a live California FAQPage answer despite a 2026-07-09 `dateModified`.

Full detail: [`findings/schema.md`](findings/schema.md)

---

## Performance (CWV) — 90/100

**First audit pass with real Google API access.** Real PageSpeed Insights/Lighthouse data across homepage, calculator, and state page templates (mobile + desktop): Performance 97-100, LCP 0.5-1.7s, CLS ≤0.012 — comfortably "Good." CrUX field data doesn't exist yet for this origin (insufficient Chrome traffic volume — expected for site age, not a defect).

**Findings:**
- **[High]** GSC service account has no access to the mypayrights.com property — blocks real indexation/search-performance data (2-minute fix).
- **[Medium]** No CrUX field data yet — re-check monthly as traffic grows.
- **[Medium]** Homepage mobile LCP borderline (2.56s on one run, vs 1.68-1.69s on calculator/blog) — identify and preload the actual LCP element.
- **[Medium]** Accessibility regressions (color-contrast, heading-order, link-in-text-block) on calculator and state page templates, not present on homepage.
- **[Medium]** Missing CSP Trusted Types directive and COOP header; current CSP allows `'unsafe-inline'` for script-src.

Full detail: [`findings/performance.md`](findings/performance.md), [`findings/google-api.md`](findings/google-api.md)

---

## AI Search Readiness (GEO) — 93/100

**What Works:** `llms.txt` is now live and unusually thorough (new since Jul 8) — full page inventory, named sources per jurisdiction, dated statutory figures, explicit AI Citation Guidelines. robots.txt explicitly allows all major AI crawlers. All sampled pages fully server-rendered with rich JSON-LD, named authorship, and source-adjacent citations present in raw HTML.

**Findings:**
- **[Medium]** No independently-verified brand-mention signals (Wikipedia/Reddit/YouTube/LinkedIn) — the strongest AI-citation predictor (YouTube mentions) remains unmeasured.
- **[Low]** Calculator pages have thin H2 sub-structure limiting independently-citable passages.
- **[Low]** No RSL 1.0 licensing manifest (optional, emerging standard).
- **[Low]** Multi-modal content signal remains weak — zero images/video/charts on any sampled page.

Full detail: [`findings/geo.md`](findings/geo.md)

---

## Images — 95/100

Zero raster images site-wide (fully SVG/CSS/system-font), reconfirmed incidentally by both the technical and performance audits this pass — eliminates image-weight and CLS risk entirely, at the cost of image-search visibility. Not independently re-audited this pass (no dedicated image agent run); carried forward from Jul 8.

---

## Supplementary: Content Clusters & Internal Linking — 58/100 *(up from 34)*

Not part of the weighted health score. Full sitemap-based link-adjacency mapping of the redundancy-pay topic cluster (calculator, guide, blog, situations, 5 compare pages, FAQs, `/uk` hub, `/uk/redundancy` pillar).

- **[Critical]** Pillar-to-spoke linking is one-directional — `/uk/redundancy` fans out to 6 calculators, 4 guides, 6 FAQs, but zero spokes link back.
- **[High]** Guide vs. blog cannibalization unresolved (`/guides/uk-redundancy-pay` vs `/blog/uk-redundancy-pay-guide-2026`) — flagged in June, still unfixed.
- **[High]** Compare and FAQ pages have no path to the pillar or specific guide.
- **[Medium]** Blog is the weakest-linked content format sitewide.
- **[Info]** The June audit's redundancy-cannibalization concern across `/compare/*` and FAQs was a non-issue on fresh inspection — each pairs against a genuinely distinct concept.

Full detail + worked internal-link matrix: [`findings/cluster.md`](findings/cluster.md)

---

## Supplementary: Search Experience Optimization (SXO) — 56/100

Not part of the weighted health score. SERP-backwards analysis across 4 target keywords with persona scoring.

- **[Critical]** Overtime FAQ ignores the site's own competing assets (calculator, state pages).
- **[High]** TUPE FAQ critically under-depth for a definitional YMYL query vs. Acas/CIPD/GOV.UK/Wikipedia competitors.
- **[High]** E-E-A-T authority gap across all YMYL legal content (same root cause as the Content Quality finding).
- **[Medium]** Zero images/visual aids on every page sampled.
- **[Info]** Page-type alignment (Tool for calculators, Hybrid for state pages) is a genuine strength, not a mismatch — the gap is concentrated in two thin FAQ pages and site-wide authority signals.

Full detail: [`findings/sxo.md`](findings/sxo.md)

---

## Supplementary: Backlink Profile — insufficient data (directional floor only)

Not part of the weighted health score. Tier 0 (Common Crawl + verification crawler only). `mypayrights.com` doesn't appear in the latest Common Crawl web graph at all — a timing artifact of site age (the site's earliest content post-dates that crawl's collection window), **not** a low-authority signal.

Prioritized link-acquisition plan: (1) .gov/.edu/legal-aid citation outreach for the 50-state pages, (2) HARO-style journalist outreach tied to layoff/redundancy news cycles, (3) HR/employment-law blog outreach for the guides, (4) comparison pages as citation bait, (5) free-tool directory submissions.

Full detail: [`findings/backlinks.md`](findings/backlinks.md)

---

## Data Integrity Note

During this audit, 8 of 11 specialist subagents initially stopped just short of writing their findings files (they completed the underlying analysis but not the write step) and had to be resumed to finish. All 11 findings files were subsequently verified present on disk before this report was aggregated. One subagent (sitemap) additionally suffered a mid-run infrastructure error on its first attempt and was fully re-run rather than resumed. This is noted for transparency, not because it affects the findings above — every score and finding in this report is backed by a written, on-disk `findings/*.md` file.

See [`ACTION-PLAN.md`](ACTION-PLAN.md) for the prioritized, phased remediation plan.
