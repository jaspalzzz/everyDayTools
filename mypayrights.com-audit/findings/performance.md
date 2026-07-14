# Performance (Core Web Vitals) — Lab/Synthetic Findings

**Score: 94/100**

**Method:** Google PageSpeed Insights v5 API (real Lighthouse run against the live URL, both mobile and desktop strategies), run 2026-07-14, for three representative pages: homepage (`/`), calculator (`/redundancy-pay-calculator`), and content page (`/blog/uk-redundancy-pay-guide-2026`). CrUX field data was requested but returned empty (`field_metrics: {}` on every page/strategy) — the origin has insufficient 28-day Chrome traffic to populate CrUX; this is expected and is being cross-checked separately by the seo-google agent against CrUX/GSC. This report is lab-data-only, superseding the fully-inferred (no-tooling) 78/100 estimate from the 2026-07-08 audit with real Lighthouse numbers.

## Delta vs. 2026-07-08 audit
The prior audit's Performance (CWV) score of 78/100 was explicitly an *inferred* score — no PSI/Lighthouse/CrUX access was available at the time, and response-time samples via curl (0.49s–1.82s) were used as a rough proxy. With a real Lighthouse run now available, actual measured performance is materially better than the prior estimate: mobile Lighthouse Performance scores of 97–100 and desktop scores of 100 across all three pages, CLS of 0 everywhere, and no PSI-flagged "opportunities" (i.e., zero render-blocking-resource, image-sizing, or critical-request-chain issues detected). The prior audit's structural read (zero raster images, single render-blocking stylesheet, async JS, static export on Cloudflare edge) is confirmed correct by these results.

## Lab Metrics Summary

| Page | Strategy | Perf Score | LCP | CLS | TBT (INP proxy) | FCP | Total Byte Weight |
|---|---|---|---|---|---|---|---|
| Homepage | Mobile | 97 | 2.56s ⚠️ | 0 | 55ms | 1.0s | 198 KiB |
| Homepage | Desktop | 100 | 0.54s | 0 | 0ms | 0.3s | — |
| Redundancy calculator | Mobile | 100 | 1.68s | 0 | 28.5ms | 1.0s | 268 KiB |
| Redundancy calculator | Desktop | 100 | 0.49s | 0 | 3ms | 0.3s | — |
| Blog guide | Mobile | 100 | 1.69s | 0 | 43ms | 1.0s | 254 KiB |
| Blog guide | Desktop | 100 | 0.38s | 0 | 51ms | 0.3s | — |

⚠️ = homepage mobile LCP (2.56s) sits just past the 2.5s "Good" boundary, technically landing in "Needs Improvement" on this single lab run (see Finding 1).

TBT (Total Blocking Time) is used here as the standard lab-side proxy for INP since INP itself cannot be measured outside real user interaction; all TBT values are well under the 200ms INP "Good" threshold, suggesting strong real-world responsiveness once actual field data exists (calculator page — the most interaction-heavy page — has the lowest TBT of the three, 28.5ms mobile / 3ms desktop).

## What Works

- CLS is a perfect 0 on every page and every device/strategy tested — no layout-shift risk detected in lab conditions, consistent with the site's zero-raster-image, fully-SVG/CSS visual approach confirmed in the prior audit.
- Desktop performance is essentially flawless everywhere: LCP 0.38s–0.54s, TBT 0–51ms, Perf score 100 on all three pages.
- Total page weight is very light: 198–268 KiB across all three page types, well under any payload-size concern threshold. This is consistent with prior confirmation of zero raster images site-wide.
- PSI returned **zero flagged "opportunities"** (no render-blocking-resources, no unsized images, no critical-request-chain warnings) on any of the three pages — the static export + Cloudflare edge delivery model is working as intended.
- The calculator page (the most JS-interactive page tested, given it runs client-side redundancy-pay math) has excellent responsiveness signals: 28.5ms TBT mobile, only 1 long task — no evidence of heavy event-handler jank from the calculation logic.
- Total byte weight and TBT strongly suggest `adsbygoogle.js` is **not currently loading** on any of the three pages tested (a ~198–268 KiB total footprint is far too light to include the AdSense loader + ad iframe, which alone typically add 40–100+ KiB and measurable main-thread cost). This is consistent with the prior audit's finding that AdSense is CSP-wired but not yet serving ads.

## Findings

1. **Homepage mobile LCP is right at the Good/Needs-Improvement boundary (2.56s)**
   - Severity: Medium
   - Description: On this Lighthouse run, homepage LCP on mobile measured 2.56s — 0.06s past the 2.5s "Good" cutoff, landing technically in "Needs Improvement" (2.5s–4.0s band), while the calculator and blog pages both came in comfortably under 1.7s. A single Lighthouse run has run-to-run variance (typically ±10–15%), so this could pass or fail the 2.5s bar depending on network/CPU throttling conditions on any given run; it is not yet confirmed against real-user (CrUX) 75th-percentile data since field data is unavailable for this origin.
   - Recommendation: Identify and preload the homepage's actual LCP element (likely a hero heading/text block or first above-the-fold SVG) with `<link rel="preload">`/`fetchpriority="high"` if it's a background-loaded asset, and audit whether the homepage's async JS chunks are competing for bandwidth/CPU ahead of the LCP paint relative to the lighter calculator/blog pages. Re-test with `npx lighthouse` (3–5 runs, median) or repeat PSI checks after any change to confirm the fix moves LCP durably under 2.5s with margin, not just barely under.

2. **No CrUX field data available to confirm real-world 75th-percentile pass rate**
   - Severity: Medium
   - Description: PageSpeed Insights returned `field_metrics: {}` for all three pages on both mobile and desktop — the origin does not yet have enough 28-day Chrome traffic for CrUX to report. This means the excellent lab scores above (97–100) cannot yet be validated against real users, and Google's actual ranking-relevant CWV assessment (which uses field data, not lab data) is currently unmeasurable for this site.
   - Recommendation: No action needed structurally — this resolves itself as traffic grows. Re-run PSI/CrUX checks monthly; prioritize investigating field data the first time it populates, since real-user conditions (slower devices, weaker networks, cache-cold visits) will likely show higher LCP than these lab numbers, especially on the homepage given Finding 1.

3. **Minor unused JavaScript on the blog/guide page (~20 KiB estimated savings)**
   - Severity: Low
   - Description: PSI flagged `unused-javascript` on the blog guide page with an estimated 20 KiB in unused bytes (diagnostic score 0.5, the only diagnostic below a perfect score across all three pages/strategies tested). Homepage and calculator pages did not flag this.
   - Recommendation: Check whether a shared JS chunk (e.g., a component or library used elsewhere on the site) is being loaded on blog pages without being needed there — likely a bundling/code-splitting granularity issue rather than a single large unused library. Low priority given the absolute byte count is small and doesn't currently move the Lighthouse score, but worth a look during the next bundle-analysis pass.

4. **2 long tasks detected on homepage (mobile)**
   - Severity: Low
   - Description: The homepage mobile run flagged 2 long tasks (>50ms main-thread tasks) versus 1 each on the calculator and blog pages. Total Blocking Time is still low (55ms, well under the 200ms INP "Good" threshold), so this is not currently a scoring problem, but the homepage has more main-thread contention than the more JS-interactive calculator page, which is slightly counter-intuitive and worth understanding.
   - Recommendation: Profile the homepage's hydration/init JS (likely mega-menu, search, or theme-switcher initialization mentioned in recent commits) to confirm no single task approaches the 50ms threshold meaningfully; not urgent given current TBT margin, but relevant if homepage traffic/interaction patterns grow.

5. **Forward-looking regression risk: AdSense is provisioned but not yet loading**
   - Severity: Info
   - Description: The CSP already allow-lists `pagead2.googlesyndication.com`, `googletagservices.com`, `partner.googleadservices.com`, `tpc.googlesyndication.com`, and `googleads.g.doubleclick.net`, but current total page weight (198–268 KiB) and TBT numbers indicate `adsbygoogle.js` is not currently executing on any of the three pages tested — consistent with the prior audit's finding that AdSense is consent/readiness-gated but not yet live. All of today's excellent lab scores reflect a pre-AdSense baseline.
   - Recommendation: Before flipping AdSense live, re-run this same PSI check (all three page types, mobile + desktop) as a before/after comparison. Reserve ad-slot dimensions via CSS (fixed-height containers) ahead of time to prevent CLS regression from late-loading ad iframes, and consider `loading="lazy"` for below-the-fold ad units to protect LCP/TBT on first paint. This is the single most likely event to erode the current 94/100 score if not handled carefully.
