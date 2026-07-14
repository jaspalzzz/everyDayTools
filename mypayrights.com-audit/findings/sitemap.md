# Sitemap Audit — mypayrights.com/sitemap.xml

**Score: 60/100**

Fetched directly via `curl -s https://mypayrights.com/sitemap.xml` (411 URLs, 44,255 bytes). Validated with `xmllint`.

---

## What Works

- **XML is well-formed** — passes `xmllint --noout` with zero errors. Correct `<urlset>` namespace, correct `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`.
- **Served correctly** — `content-type: application/xml`, HTTP 200, proper caching/ETag headers.
- **No deprecated tags** — zero `priority`/`changefreq` occurrences (both correctly omitted; Google ignores them).
- **No duplicate `<loc>` entries and no trailing-slash inconsistency** — every URL appears exactly once, consistent no-trailing-slash convention.
- **Well under the 50,000 URL / 50MB single-file limit** — 411 URLs / 44KB. A sitemap index is unnecessary; single-file format is correct and should stay that way for the foreseeable future (would need ~120x growth to require splitting).
- **robots.txt correctly references the sitemap** (`Sitemap: https://mypayrights.com/sitemap.xml`) and has no `Disallow` rules blocking crawlers, including AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc. all explicitly `Allow: /`).
- **All 28 spot-checked URLs return HTTP 200** with no redirects, across every page-type bucket: homepage, `/uk`, `/us`, `/ca`, `/au`, guides, situations, compare, faq, blog, calculators, `/us/states/alabama` (+ `/final-paycheck` variant), `/ca/provinces/ontario`, `/au/states/victoria`, `/fr`, `/fr/ca/preavis`, `/tupe-wizard`, `/methodology`, `/editorial-policy`, `/updates`, `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`, `/press`, `/research/us-final-paycheck-laws`.
- **No noindex tags found** on any sampled page, including the location-page cluster (`<meta name="robots" content="index, follow"/>` confirmed on `/us/states/wyoming/pto-payout`, `/au/states/tasmania`, `/ca/provinces/nunavut`, `/us/new-york/pto-payout-calculator`, `/blog`).
- **Hub pages for CA and AU location clusters link out completely** — `/ca` links to all 13 provinces, `/au` links to all 8 states, `/us` links to all 51 state hubs.

---

## Findings

### 1. [CRITICAL — HARD-STOP QUALITY GATE] ~225 location-style pages (54.7% of the sitemap) — structural index-bloat risk
**Severity: Critical**
The sitemap contains 204 `/us/states/{state}[/final-paycheck|/minimum-wage|/pto-payout]` URLs (51 states+DC × 4), 13 `/ca/provinces/{province}` URLs, and 8 `/au/states/{state}` URLs — **225 location-pattern URLs out of 411 total (54.7% of the entire site's indexable inventory)**. This is 4.5x past the quality-gate WARNING threshold (30+ pages) and 4.5x past the HARD STOP threshold (50+ pages). Per the sitemap-architecture quality gates, a cluster this size requires **explicit user justification** to remain live as-is; this finding is that documented flag, not an approval.

This agent owns the **sitemap-structure/index-bloat** angle (a separate seo-content agent independently assessed on-page content uniqueness). From that lens, the evidence is mixed:
- **Positive structural signal**: the cluster is organized under a single, logical hub→child hierarchy (`/us` → `/us/states/{state}` → 3 topic variants), linked from one canonical parent per country — the "right" shape *if* the underlying pages are genuinely differentiated.
- **Negative structural signals that undercut a "cohesive, editorially-maintained section" reading and instead resemble templated inventory**:
  - 188 of the 204 US state URLs (92%) share one identical `lastmod` (`2025-01-01`) — a machine-generated constant, not evidence of per-page review (see Finding 2).
  - The `/pto-payout` variant is never linked from its own state's hub page for every state checked (AL, TX, CA) — meaning roughly 51 of the 204 US location URLs get materially weaker internal link equity than their siblings, an inconsistency inconsistent with "one cohesive well-organized site section" (see Finding 3).
  - All 13 CA province pages and all 8 AU state pages carry a single identical `lastmod` each (batch/deploy-stamped, not per-page).

**Recommendation**: Do not add further location pages until (a) `lastmod` reflects genuine per-page content revisions rather than a shared constant, and (b) internal linking is uniform across all variants in the cluster. Obtain explicit user sign-off to keep the existing ~225-page inventory live, per the hard-stop quality gate, and cross-reference the seo-content agent's content-uniqueness findings before treating this as resolved.

### 2. [HIGH] Stale/batched lastmod dates — 2026-07-08 finding still confirmed
**Severity: High**
Distinct `lastmod` value counts across all 411 URLs: `2025-01-01` ×188, `2026-06-27` ×110, `2026-07-01` ×74, `2026-07-09` ×29, `2026-01-01` ×8, `2026-07-12` ×2. Only 6 distinct dates exist across 411 URLs — a strong signal of batch/deploy timestamps rather than real per-page edit tracking.
- The prior Jul 8 audit finding ("~150+ US state pages share a single generic 2025-01-01 verifiedYear constant") is **still true and has gotten worse in absolute count**: 188 of 204 US state-cluster URLs (92%) — every state except California, Florida, New York, and Texas — remain stamped `2025-01-01`.
- The 4 refreshed states (16 URLs) all share one identical date, `2026-07-09` — consistent with a batch redeploy touching a handful of states, not individual verification.
- All 8 AU state pages share `2026-01-01` (again a Jan-1 constant, never updated since apparent launch).
- All 13 CA province pages share `2026-07-09` (identical batch stamp).
- Guides/situations/compare/faq/blog (110 URLs) share one flat `2026-06-27`; top-level hub pages (74 URLs) share one flat `2026-07-01`.
For a YMYL-adjacent site publishing employment-law figures (minimum wage, statutory pay rates) that change annually, `lastmod` accuracy is a legitimate freshness/E-E-A-T signal. Constant, Jan-1-style dates make it easy for both Google and users to infer the underlying content hasn't actually been verified per-page.
**Recommendation**: Tie `lastmod` to real content-revision timestamps (e.g., last time statutory rates/legal text changed for that specific page), not a shared "verifiedYear" constant or deploy timestamp.

### 3. [HIGH] Confirmed orphan pages — several page groups undiscoverable except via the sitemap
**Severity: High**
Verified by crawling hub/parent pages directly (not inferred):
- **All 9 `/situations/*` URLs** — not linked from the homepage, `/uk` hub, or sampled `/guides`, `/blog`, `/faq`, `/compare` content pages. No internal path to these pages was found in any page crawled.
- **`/press`** — not linked from homepage, `/about`, `/contact`, `/methodology`, `/editorial-policy`, or `/updates`.
- **~51 `/us/states/{state}/pto-payout` URLs** — systematically absent from internal linking. Checked Alabama, Texas, and California state hub pages directly: each links to its `/final-paycheck` and `/minimum-wage` siblings but never to `/pto-payout`. This pattern held across all 3 states sampled, indicating it's a template-wide omission affecting the full 51-state cluster, not an isolated bug.
- **11 of 15 `/guides/*` pages** — the `/guides` hub page links to only 4 child guides (`uk-redundancy-pay`, `uk-notice-period-law`, `uk-take-home-pay`, `uk-maternity-pay`); the other 11 (`uk-constructive-dismissal`, `uk-settlement-agreement`, `uk-pilon`, `uk-unfair-dismissal`, `uk-tupe`, `uk-paternity-pay`, `uk-holiday-entitlement`, `uk-sick-pay`, `uk-adoption-pay`, `uk-shared-parental-leave`, `us-pto-payout-laws-by-state`) were not found linked from the hub or from sampled blog/faq cross-links.

In total, roughly 60-70 of 411 sitemap URLs (~15-17%) appear to rely on the sitemap as their sole discovery path. Orphaned pages get materially less crawl frequency and weaker internal PageRank flow, and compound the index-bloat concern in Finding 1 (a quarter of the entire US location cluster is under-linked).
**Recommendation**: Add the missing internal links (state hub → pto-payout variant; `/guides` hub → all 15 children; link `/situations/*` from `/uk`/`/us` hubs or relevant guides; link `/press` from the footer/about page). This is a cheap, high-leverage fix.

### 4. [MEDIUM] Location cluster's internal linking is uneven, weakening the "cohesive section" argument
**Severity: Medium**
Directly tied to Findings 1 and 3: the CA (13/13 provinces linked) and AU (8/8 states linked) clusters are fully and consistently linked from their hubs, but the larger US cluster (204 URLs) has one of its three per-state variants (`pto-payout`) unlinked for every state checked. Consistency of internal linking is one of the clearer machine-detectable signals distinguishing a legitimate topical section from a programmatically-generated one; the US cluster currently fails that consistency test.
**Recommendation**: Bring the `/us/states/*` internal linking pattern up to parity with the CA/AU clusters as part of remediating Finding 3.

### 5. [LOW] No sitemap-format issues remain to fix
**Severity: Low / Informational**
Priority/changefreq are already correctly absent, there are no duplicate URLs, no trailing-slash inconsistencies, and the file is within the size limit by a wide margin. No action needed here; flagged only for completeness against the standard checklist.

---

## Missing / Extra Pages
- **Missing from sitemap**: None identified. Cross-checked internal links from homepage, `/us`, `/uk`, `/ca`, `/au`, `/guides`, `/faq`, `/compare`, `/blog`, and sampled state/province/territory pages — no linked page was found missing from the 411-URL sitemap.
- **Extra/broken in sitemap**: None found. All 28 spot-checked URLs across every bucket returned HTTP 200 with no redirects and no noindex tags.

## Orphan-Page Risk Summary
Confirmed orphans (linked from nowhere sampled): 9 `/situations/*` pages, 1 `/press` page, ~51 `/us/states/{state}/pto-payout` pages, 11 `/guides/*` pages not reachable from the `/guides` hub — approximately 60-70 URLs (~15-17% of the sitemap) with sitemap-only discoverability.
