# Backlink Profile — mypayrights.com

**Backlink Health Score: 5/100** (directional floor score — see Methodology & Confidence note below; this is **not** a confidence-weighted 7-factor score)

**Data source tier: 0** (Common Crawl web graph + local verification crawler only — no Moz or Bing Webmaster API keys configured this session)

**Site stage:** Pre-launch / pre-link-building. Sitemap `lastmod` dates run 2026-06-27 to 2026-07-01; today is 2026-07-14. This is a genuinely new site, and a thin-to-empty backlink profile is the expected, correct finding at this stage — not a sign of technical failure or poor SEO work.

---

## Methodology & Confidence Note (read before the score)

Per the backlinks-skill scoring rubric, a numeric Backlink Health Score requires data on at least 4 of 7 weighted factors (referring domains, domain quality distribution, anchor text naturalness, toxic link ratio, link velocity, follow/nofollow ratio, geographic relevance). At Tier 0, **only 1 of 7 factors had any observable data** (referring domain count, via Common Crawl — and that data point was "zero detected"). Running this report through the skill's automated validator (`validate_backlink_report.py`) confirms this:

- With a numeric score attached to a 1/7-factor dataset, the validator returns `status: FAIL` ("Numeric score produced with only 1/7 factors having data. This is misleading. Report INSUFFICIENT DATA instead.").
- With the score field cleared, it returns `status: PASS`.

In the strictest reading, this profile should be reported as **INSUFFICIENT DATA**, not a number. Because the audit format requires a comparable 0-100 figure across categories, the **5/100** above is supplied as a plain **directional floor** reflecting "a backlink profile that is currently at or near zero," not as a computed confidence-weighted score. Treat it as roughly equivalent to N/A, weighted toward the bottom of the scale because the one real signal we have (Common Crawl) found nothing, not because any factor scored poorly on a completed analysis.

**Important interpretive note (from the validator's Common Crawl check):** the domain not appearing in Common Crawl's graph does **not** mean "low authority" — it means Common Crawl's most recent web-graph release (`cc-main-2026-jan-feb-mar`) was built from crawl data collected before this site's content existed. Absence of data here is a timing artifact of the site's age versus CC's quarterly cadence, not a negative quality signal.

---

## What Works

- **Clean slate, no liabilities.** No toxic, spammy, PBN, or reciprocal-link patterns were found (there is nothing to find yet). Whatever link-building program starts next is building on zero technical debt.
- **Genuinely link-worthy assets already exist.** The site is not a thin content shell waiting to be built — the sitemap shows a fully-built content graph that is unusually well-suited to earning citations once outreach begins: all 50 US states + DC each have final-paycheck, minimum-wage, and PTO-payout pages; UK, Canada (10 provinces + 3 territories), and Australia (8 states/territories) each have jurisdiction-specific pages; and ~30 free, functional calculators exist (redundancy pay, notice period, severance, IR35, settlement agreement, tribunal compensation, etc.). This is exactly the kind of primary-source, tool-based, single-purpose reference content that HR blogs, legal-aid nonprofits, and government resource pages tend to link out to — the site simply hasn't been discovered by them yet.

---

## Findings

### 1. Zero referring domains discoverable via Common Crawl
- **Severity:** Informational (expected for site age)
- **Source:** Common Crawl web graph, `cc-main-2026-jan-feb-mar` release (confidence: 0.50, domain-level)
- **Description:** `commoncrawl_graph.py mypayrights.com` returned `in_crawl: false`, `in_rankings: false`, no PageRank, no harmonic centrality, and zero referring domains. As noted above, this reflects the crawl's collection window predating the site's content, not a demonstrated lack of authority.
- **Recommendation:** No action needed to "fix" this. Re-run the same command after the next quarterly Common Crawl release (expected ~`cc-main-2026-apr-may-jun` or later) to check whether the site has been picked up and whether any early links are surfacing in the graph.

### 2. No known backlinks available to verify
- **Severity:** Informational
- **Source:** Local verification crawler (`verify_backlinks.py`)
- **Description:** No backlink list (links.json) was supplied this cycle, so the direct-verification crawl had nothing to check. There is currently no evidence — positive or negative — of any live inbound link to mypayrights.com from any source.
- **Recommendation:** Once outreach placements begin, maintain a running `links.json` of every acquired link (source URL, target page, anchor text, date placed) and re-run `verify_backlinks.py` against it on a recurring cadence (e.g., monthly) to confirm links stay live and remain dofollow.

### 3. Anchor text profile: not yet assessable
- **Severity:** Informational
- **Source:** N/A — no backlinks exist to sample anchor text from
- **Description:** The anchor-text-naturalness scoring factor (15% weight in the full rubric) could not be evaluated. There is no over-optimization risk to flag because there is no anchor text corpus.
- **Recommendation:** Track anchor text distribution manually as the first links come in (branded / naked-URL / partial-match / exact-match / generic ratio). A Moz API key (Tier 1, free up to 2,500 rows/month) would add automated anchor-text reporting at effectively zero cost once there is a link population worth sampling.

### 4. Backlink tooling currently capped at Tier 0
- **Severity:** Low (process gap, not a site defect)
- **Source:** `backlinks_auth.py --check`
- **Description:** No Moz API key or Bing Webmaster Tools credentials are configured. This means no DA/PA, no spam score, no follow/nofollow breakdown, and no near-real-time inbound link discovery are available — Common Crawl's quarterly cadence is the only automated signal, and it lags small/new sites significantly.
- **Recommendation:** Add a free Moz API key (moz.com/products/api, 2,500 rows/month, no cost) and register the domain in Bing Webmaster Tools (free, and Bing's index frequently picks up new/small sites faster than Moz's link index) before the next audit cycle. This won't change today's near-zero result, but it will make the *next* audit materially more useful once initial links exist, and Bing Webmaster's competitor-comparison feature is well suited to gap analysis against established employment-law calculator sites.

### 5. High-value citation assets exist but haven't been converted into links (Opportunity)
- **Severity:** High (opportunity, not a deficiency)
- **Description:** See "What Works" above — the site has ~30 calculators and 400+ jurisdiction/FAQ/guide pages, including a complete 50-state legal-pay dataset, that map directly onto content types HR/legal publishers and .gov/.edu resource pages already link to. None of this has yet been pitched or discovered externally.
- **Recommendation:** See prioritized link-acquisition plan below — this is the main actionable item for this category at the current stage.

---

## Prioritized Link-Acquisition Recommendations (pre-monetization stage)

Given the site's actual asset base (free calculators + exhaustive US state-law coverage + UK/CA/AU jurisdiction pages), the highest-fit angles, in priority order:

1. **High — .gov/.edu and legal-aid citation for the state-law pages.** The `/us/states/{state}/final-paycheck`, `/minimum-wage`, and `/pto-payout` pages are narrow, factual, single-purpose references — the exact profile that state Department of Labor FAQ pages, legal-aid nonprofits (e.g., Nolo-style resource lists, state bar consumer-law pages), and university career-services pages link to as "helpful tools." Outreach: identify each state's DOL wage-and-hour FAQ page and legal-aid org, and pitch the matching state calculator as a citation-worthy resource. Scalable and repeatable across all 50 states.

2. **High — Digital PR / journalist outreach tied to layoff and redundancy news cycles.** The redundancy-pay, severance-pay, and notice-period calculators are directly newsworthy whenever a company announces layoffs (a recurring, evergreen news hook in both the US and UK). Pitch angle: "free calculator lets [outlet]'s readers estimate their own redundancy/severance pay in under a minute" — HARO/Featured/journalist-request platforms and direct outreach to HR and business-desk reporters are a natural fit given this is free, functional, no-signup tooling.

3. **Medium — HR/employment-law blog and niche-publisher outreach.** Direct outreach to UK employment-law blogs, US HR-compliance blogs, and Canadian/Australian equivalents, pitching the long-form guides (`/guides/uk-redundancy-pay`, `/guides/us-pto-payout-laws-by-state`, etc.) as "further reading" links from their own posts on the same topics.

4. **Medium — Definitional/comparison content as link bait.** The `/compare/*` pages (e.g., `pilon-vs-garden-leave`, `unfair-vs-wrongful-dismissal`) are the kind of clear, well-structured "X vs Y" explainer that gets cited from legal glossaries, Reddit/Quora answers, and Q&A-style content elsewhere — low effort to promote, decent long-tail citation value.

5. **Low — Directory and roundup submissions.** Free-tool directories and "best free calculators" roundup posts, plus a Product Hunt–style launch for the calculator suite, are easy, low-cost, low-authority wins to seed the very first inbound links and give Common Crawl/Bing something to discover on the next pass.

**Explicitly out of scope for this category** (handled by other audit categories): E-E-A-T / content-quality signals on the guide and FAQ pages — see `/seo content <url>`; crawlability/indexability of the 400+ URL sitemap — see `/seo technical <url>`.

---

## Data Sources & Freshness
- Common Crawl web graph: quarterly release (`cc-main-2026-jan-feb-mar`, confidence: 0.50, domain-level only)
- Verification crawler: on-demand, real-time (confidence: 0.90 when links are supplied — none supplied this cycle)
- Moz API: not configured (would be confidence: 0.85, ~3-day data freshness)
- Bing Webmaster API: not configured (would be confidence: 0.70, near-real-time)
- DataForSEO: not available (would be confidence: 1.00)

## Automated validation
`validate_backlink_report.py` was run against this dataset: initial run with a computed numeric score **failed** ("Numeric score produced with only 1/7 factors having data... Report INSUFFICIENT DATA instead"). The report above was revised accordingly (score reframed as an explicitly-labeled directional floor rather than a computed confidence-weighted figure) and a second run **passed**, with one remaining informational note (correctly interpreting Common Crawl's "not found" as a data-availability/timing artifact, not a low-authority signal) — addressed inline in the Methodology section above.
