# mypayrights.com — Prioritized Action Plan

**Audit date:** 2026-07-14 | Health Score: 84/100 | Full detail: [`FULL-AUDIT-REPORT.md`](FULL-AUDIT-REPORT.md)

Each item below carries: the observation it rests on, what it depends on/unblocks, how you'd know it failed, and a leading indicator to monitor.

> **Status — 17 July 2026:** A source-level re-check (not just trusting commit
> messages) confirmed the following are now done in code, still pending only
> a `git push` + deploy: **1.2** (hero badge), **1.3** (pillar backlinks — now
> including the 6 calculator spokes, not just guides/FAQs/blog), **1.4** (FAQ
> depth for overtime + TUPE), **2.2** (entity naming), **2.3** (schema
> image/logo), **2.4** (guide/blog cross-link), **2.5** (accessibility),
> **2.6** (COOP/CSP), **2.7** (consent-banner overlap + all 4 tap targets —
> confirmed live in a browser at 375px, not just read from source), and
> **3.2** (IndexNow). See `TASKS.md` TIER 3/4/5 for the verified detail.
> Genuinely still open: **1.1** (GSC access — external, needs Search Console
> admin), **1.5** (a documentation/business decision, not code), **3.1**
> (freshness badge — done on 2 of 4 US templates, missing on
> final-paycheck/pto-payout specifically), **3.3** (3 state pages still below
> the word floor), **3.4** (blog internal links), **3.5/3.6** (backlink/brand
> outreach — external, unstarted).

---

## Phase 1: Critical Fixes (Week 1)

### 1.1 Add GSC service account access to the mypayrights.com property
- **Why now:** Blocks every future audit's real indexation/search-performance data — the highest-leverage 2-minute fix available.
- **Depends on / unblocks:** Unblocks re-running `seo-google` with real data on the next audit; no dependency on anything else.
- **How you'd know it failed:** Re-running the GSC query still returns "Permission denied" after adding the account.
- **Leading indicator:** Search Console's Core Web Vitals report and Performance report populate with real data within 2-3 days of granting access.

### 1.2 Fix desktop/tablet trust-badge overlay hiding hero pay values
- **Why now:** A genuinely broken UI element on the homepage's primary value-prop card, at ≥1024px — real users see this today. Only caught by rendered-screenshot testing, invisible from source review.
- **Depends on / unblocks:** Independent — pure CSS/layout fix.
- **How you'd know it failed:** Re-screenshot at 1024/1280/1366/1920px after the fix; "Basic pay" and "Notice pay" values must be fully visible and unobstructed.
- **Leading indicator:** Manual QA pass at the 4 breakpoints above; add to the visual regression matrix per the visual audit's own recommendation.

### 1.3 Add reciprocal links from `/uk/redundancy`'s 16 spokes back to the pillar
- **Why now:** The pillar page currently gets zero internal-link equity back from the very pages it was built to organize — a mechanical, low-effort fix with high topical-authority payoff.
- **Depends on / unblocks:** Use the link matrix in `findings/cluster.md` directly; unblocks re-scoring the Content Clusters category above 58 on the next audit.
- **How you'd know it failed:** Re-crawl the 6 redundancy-topic page types; each should now contain a link to `/uk/redundancy`.
- **Leading indicator:** GSC "Links" report should show `/uk/redundancy` gaining internal-link count from these pages within one crawl cycle after publish + IndexNow ping (see 3.2).

### 1.4 Expand the two critically-thin FAQ pages and link them to the site's own tools
- **Pages:** `/faq/what-is-overtime-law-us` (285 words), `/faq/what-is-tupe-transfer` (315 words)
- **Why now:** Both compete against SERPs dominated by long-form tables/government content at roughly 1/5 the depth, and both fail to link to the site's own better-suited pages (`/take-home-overtime-calculator`, `/us/states/*` for overtime; `/tupe-wizard` for TUPE).
- **Depends on / unblocks:** Independent of other work; directly improves both the On-Page and SXO scores.
- **How you'd know it failed:** Re-run the SXO SERP comparison for these two keywords; word count and structural depth should approach what's currently ranking.
- **Leading indicator:** Track ranking position and impressions for "what is tupe transfer" / "us overtime law" once GSC access is granted (1.1).

### 1.5 Document an explicit justification for the ~225 location-page footprint
- **Why now:** This is a hard-stop-tier quality gate (4.5× the 50-page threshold). The content-uniqueness check independently passed — but the scale itself, combined with 46% of the sitemap sharing a placeholder lastmod and several sub-types being sitemap-only-discoverable, is a structural risk worth a deliberate, documented decision rather than silent accumulation.
- **Depends on / unblocks:** Informs whether Phase 3's lastmod and orphan-page fixes are "good enough" or whether the page count itself should be pruned/consolidated for lower-value clusters (e.g., pto-payout variants for states with no PTO statute).
- **How you'd know it failed:** If the next audit's content spot-check finds any pair below 40% unique, treat the earlier "pass" as no longer valid and revisit scale, not just quality.
- **Leading indicator:** GSC Coverage report (once 1.1 is done) showing whether Google is actually indexing all 225 pages or silently excluding a subset as low-value.

---

## Phase 2: High-Impact Improvements (Weeks 2-3)

### 2.1 Engage a qualified employment-law professional per jurisdiction
- **Why now:** The single highest-leverage E-E-A-T fix available, reconfirmed independently by both the Content Quality and SXO audits this pass. No template/content fix can substitute for it on YMYL content.
- **Depends on / unblocks:** Should happen before or alongside 1.4's FAQ expansion, so expanded content carries real reviewer authority from the start rather than being re-reviewed later.
- **How you'd know it failed:** Byline/credential still absent on a fresh audit pass; no named reviewer with dated review on calculator or guide pages.
- **Leading indicator:** Track any ranking movement on YMYL-sensitive queries (redundancy pay, unfair dismissal, overtime law) 4-8 weeks after the reviewer is added and credited.

### 2.2 Standardize "My Pay Rights" entity naming across 14+ templates
- **Why now:** Weakens entity-resolution consistency for Google/AI systems trying to identify the publisher.
- **Depends on / unblocks:** Independent, mechanical find-replace using the existing `SITE.name` constant.
- **How you'd know it failed:** Grep the built `out/` export for literal "MyPayRights" (no space) — should return zero matches.
- **Leading indicator:** None needed beyond the grep check — this is a binary pass/fail fix.

### 2.3 Add `image` and `logo` to Article/BlogPosting JSON-LD
- **Why now:** `image` is a Google-required Article property; the fix is trivial since the opengraph-image endpoint and logo asset already exist.
- **Depends on / unblocks:** Independent.
- **How you'd know it failed:** Re-run `score-schema-seo.mjs` extended to check for `image`/`logo` presence (currently doesn't check these — worth adding to the script itself).
- **Leading indicator:** Rich Results Test / Search Console Enhancements report showing zero Article-schema errors.

### 2.4 Cross-link or differentiate the guide/blog cannibalization pair
- **Pages:** `/guides/uk-redundancy-pay` vs `/blog/uk-redundancy-pay-guide-2026`
- **Why now:** Flagged in the June 27 audit, still unfixed — near-identical titles/H1s/structure at comparable depth with zero cross-link.
- **Depends on / unblocks:** Should be resolved before or alongside 1.3's pillar-linking work, since both pages are redundancy-cluster spokes.
- **How you'd know it failed:** Both pages still rank/compete for the same query in GSC's Performance report (once 1.1 is done) rather than one clearly outranking or the two serving distinct intents.
- **Leading indicator:** GSC query-level cannibalization check for "uk redundancy pay guide"-adjacent terms.

### 2.5 Fix accessibility regressions on calculator/state page templates
- **Issues:** color-contrast, heading-order, link-in-text-block, label/accessible-name mismatch
- **Why now:** Template-level issues — one fix propagates across every calculator page and every state page.
- **Depends on / unblocks:** Independent.
- **How you'd know it failed:** Re-run Lighthouse accessibility audit; scores should return to 100 (matching homepage) rather than the current 89-91.
- **Leading indicator:** Lighthouse accessibility score, re-checked via the `seo-google` PSI integration on the next audit.

### 2.6 Add COOP header and Trusted-Types-enforcing CSP
- **Why now:** Lighthouse flags both as High-severity security diagnostics; current CSP's `'unsafe-inline'` is bypassable.
- **Depends on / unblocks:** Edge/Cloudflare config change — coordinate with the AdSense CSP allowlist already in place so ad domains aren't broken.
- **How you'd know it failed:** Lighthouse "Best Practices" security insights still flag missing COOP/Trusted Types after deploy.
- **Leading indicator:** Re-run PSI/Lighthouse post-deploy; verify AdSense (once live) still renders correctly under the tightened CSP.

### 2.7 Fix mobile consent-banner overlap and under-sized tap targets
- **Why now:** The consent banner blocks the primary CTA on first mobile paint; several tap targets sit well under the 44×44px guideline.
- **Depends on / unblocks:** Independent, standard responsive-CSS fix.
- **How you'd know it failed:** Re-screenshot mobile (375×812) before/after; submit button and all listed elements (hamburger, quick-link pills, consent buttons, footer link) must clear 44×44px and not be obscured.
- **Leading indicator:** Mobile bounce rate on first-session visits, once GA4 is configured (see Phase 3).

---

## Phase 3: Content & Authority (Month 2)

### 3.1 Add dated "last verified" freshness badges to US/CA/AU state pages
- **Why now:** UK calculators already have this pattern ("Rates verified 6 April 2026"); US/CA/AU pages appear to lack it — a low-effort, high-value E-E-A-T and AI-citation signal.
- **Falsifiability:** Confirm via raw HTML/DOM inspection first (the content audit flagged this may be a trafilatura extraction artifact, not a real gap) before building the fix.

### 3.2 Implement IndexNow protocol
- **Why now:** Site adds new URLs frequently (53 in 6 days) without pinging Bing/Yandex/Naver on publish.
- **Falsifiability:** Post-deploy, verify via Bing Webmaster Tools that submitted URLs show as received.

### 3.3 Add state-specific content blocks to hub pages below the word-count floor
- **Pages:** Kansas (409 words), Mississippi (406 words), Wyoming (456 words)
- **Falsifiability:** Re-run the `difflib` uniqueness check after the addition — should stay ≥60% unique, not just clear the word-count floor with more shared boilerplate.

### 3.4 Add contextual links from blog posts to calculators/guides/FAQs
- **Why now:** Cluster audit found blog is the weakest-linked content format sitewide (only 2 calculator links across 11 posts).

### 3.5 Begin prioritized link-acquisition outreach
- **Sequence:** .gov/legal-aid citations first (highest authority-to-effort ratio for a YMYL site), then HARO-style journalist outreach tied to layoff news cycles, then HR/employment-law blog outreach, then comparison-page citation bait, then directory submissions.
- **Leading indicator:** Register free Moz + Bing Webmaster API keys now so the next audit can measure real progress (currently Tier 0, Common Crawl only).

### 3.6 Run a dedicated brand-mention sweep
- **Why now:** YouTube mentions are the single highest-correlation AI-citation predictor (~0.737) per the GEO audit's own research, yet completely unmeasured so far.
- **Falsifiability:** A zero-mentions result is itself informative — it means brand-building work (3.5, plus a possible YouTube explainer) should be prioritized before further on-page GEO polish.

---

## Phase 4: Monitoring & Iteration (Ongoing)

- **Re-check CrUX field data monthly** — no eligible data yet, expected at current traffic level; this is the leading indicator that determines whether the Performance category's 90/100 (lab-only) score is holding up in the real world.
- **Fix case-sensitive route 404s** with a lowercase-and-301 `_redirects` rule.
- **Fix the 46% placeholder-lastmod sitemap issue** — wire the US state-page generator to a real content-verified date, or omit `lastmod` where no real date exists (a missing value is safer than a uniform fake one).
- **Periodically re-sample the most-similar state-page pairs** to confirm the location-page uniqueness gate continues to pass as new pages are added — this is the single check most likely to catch a silent quality regression before it becomes a hard-stop-tier problem again.
- **Re-run this full audit** after Phase 1-2 items land to confirm the health score reflects the fixes, and specifically re-verify: GSC access (1.1), pillar linking (1.3), and the FAQ depth expansion (1.4).
