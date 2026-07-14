# Google API Data — mypayrights.com
Data source: Google API (field + lab data) | Tier 1 (API key + service account authenticated; GA4 not configured, skipped)
Collected: 2026-07-14

This is the first audit run with real Google API access for this site. The prior audit (2026-07-08) explicitly flagged the absence of CrUX/GSC/Lighthouse data as a gap — this run closes that gap for PageSpeed Insights and CrUX, and surfaces a **new gap**: the GSC service account does not have access to the `mypayrights.com` property.

---

## 1. PageSpeed Insights v5 (Lighthouse lab data)

| Page | Strategy | Perf | Access. | Best Practices | SEO | FCP | LCP | TBT | CLS | TTI |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` (home) | Mobile | 100 | 100 | 100 | 100 | 1.0 s | 1.7 s | 20 ms | 0 | 2.4 s |
| `/` (home) | Desktop | 100 | 100 | 100 | 100 | 0.4 s | 0.6 s | 40 ms | 0 | 0.6 s |
| `/redundancy-pay-calculator` | Mobile | 100 | 91 | 100 | 100 | 1.0 s | 1.7 s | 40 ms | 0.012 | 2.4 s |
| `/redundancy-pay-calculator` | Desktop | 100 | 91 | 100 | 100 | 0.3 s | 0.5 s | 20 ms | 0 | 0.6 s |
| `/us/states/california` | Mobile | 100 | 89 | 100 | 100 | 0.9 s | 1.7 s | 20 ms | 0 | 2.3 s |
| `/us/states/california` | Desktop | 100 | 89 | 100 | 100 | 0.3 s | 0.5 s | 0 ms | 0 | 0.5 s |

Note: Lighthouse reports **TBT** (Total Blocking Time), not INP directly — INP is a field-only metric (RUM), so it cannot be measured via Lighthouse lab runs. All TBT values above are excellent (≤ 40 ms), a strong proxy signal for good INP once real-user data exists.

Server response time (TTFB, lab-measured from Google's test infrastructure — not representative of real global user latency): 5-7 ms across all pages/strategies. This is unusually low even for an edge-cached static export and reflects the PSI test runner's proximity to Cloudflare's edge; do not treat as real-world TTFB for distant users.

### CWV traffic-light rating (lab data, all pages/strategies)

| Metric | Value range observed | Threshold | Rating |
|---|---|---|---|
| LCP | 0.5 s – 1.7 s | ≤ 2.5 s Good | 🟢 Good |
| CLS | 0 – 0.012 | ≤ 0.1 Good | 🟢 Good |
| INP | Not measurable (no field data) | N/A | ⚪ Unknown |
| TBT (proxy for INP) | 0 – 40 ms | N/A (diagnostic) | 🟢 Good |

### Accessibility regressions found (real Lighthouse audits, not present on homepage)
- `/redundancy-pay-calculator` and `/us/states/california` (mobile + desktop): **color-contrast** failure, **heading-order** failure (non-sequential heading levels), **link-in-text-block** (links rely on color alone to be distinguishable).
- `/us/states/california` desktop only: **label-content-name-mismatch** ("Switch country" button — visible label doesn't match accessible name).
- Homepage scores 100/100 accessibility; these are page-template-level issues on the calculator/state templates, likely present across all calculator and state pages (redundancy-pay-calculator and california are representative samples of two different templates).

### Security/best-practice diagnostics (present on all pages, does not affect the 100 Best Practices score but flagged by Lighthouse "insights")
- No `Content-Security-Policy` header with Trusted Types directive (DOM XSS mitigation gap).
- No `Cross-Origin-Opener-Policy` (COOP) header (High severity per Lighthouse).
- CSP allows `'unsafe-inline'` for `script-src` and relies on host allowlisting (bypassable).

---

## 2. CrUX Field Data (real user Chrome data)

- **CrUX API (current 28-day window)**: No data for homepage, calculator page, or state page individually or at origin level.
- **CrUX History API (25-week trend, origin-level)**: No history data either.
- Error returned by both endpoints: *"No CrUX data for this origin. The site likely has insufficient Chrome traffic volume for eligibility."*

This is expected and consistent with a low-traffic/newer site — CrUX requires a sustained minimum volume of eligible Chrome page loads before Google publishes aggregated field data. This is **not a site defect**; it means Google does not yet have enough real-user samples to populate the Core Web Vitals report in Search Console or the CrUX dashboard for this origin. Re-check CrUX monthly as organic traffic grows — this is the single most important recurring check now that the API is wired up.

---

## 3. Google Search Console

**Verification status: NOT accessible.** The authenticated service account (`claude-seo@demoin-1057.iam.gserviceaccount.com`) has exactly one GSC property in its accessible-sites list — `sc-domain:easyphoto.in` — and does **not** have any permission on `sc-domain:mypayrights.com` or `https://mypayrights.com/`.

Direct calls against the property confirm this:
- `gsc_query` (search performance): `Permission denied for property 'sc-domain:mypayrights.com'. Ensure the service account email is added as a user in Google Search Console > Settings > Users and permissions.`
- `gsc_inspect` (URL Inspection, homepage): `Permission denied. Add the service account as an Owner in GSC property 'sc-domain:mypayrights.com'.`

**This is a setup gap, not a "no data" result.** Search performance (clicks/impressions/CTR/position), URL Inspection (indexation status, Google-selected canonical, coverage issues), and sitemap status could not be retrieved for mypayrights.com this run.

**Action required (one-time, ~2 minutes):** In Search Console → Settings → Users and permissions for the `mypayrights.com` property, add `claude-seo@demoin-1057.iam.gserviceaccount.com` as at least a **Full user** (Owner not required for read-only query/inspect calls). Once added, re-run this check to get real indexation and search performance data.

---

## 4. GA4

Skipped per task instructions — GA4 property ID is not configured in this environment (`ga4_property_id` missing from `/Users/apple/.config/claude-seo/google-api.json`). Not attempted.

---

## Performance (CWV) Category — Score Contribution: 90/100

**Basis for score:**
- Lab CWV (LCP, CLS, TBT/INP-proxy) are excellent across all 3 page templates tested (home, calculator, state), both mobile and desktop — no deductions there.
- No real-user field data (CrUX) exists yet to confirm lab results translate to real-world experience — this caps the score below 100 because Google's own ranking systems for "page experience" rely on field data (CrUX), not lab data, when it's available. Until CrUX has enough volume, Search Console's Core Web Vitals report will show "Not enough data," meaning this signal is currently invisible to Google's own dashboards even though the underlying page is fast.
- Small deduction for the missing security headers (CSP Trusted Types, COOP) since these affect the Best Practices/robustness pillar adjacent to performance security hardening, and for the two accessibility regressions on non-homepage templates (contrast/heading order), which sit just outside pure CWV but affect the same page-experience umbrella Google evaluates holistically.

| Sub-signal | Weight | Result | Notes |
|---|---|---|---|
| Lab LCP/CLS/TBT (all templates) | 60% | 100/100 | Green across the board |
| Field data (CrUX) availability | 25% | 60/100 | Not yet eligible — expected for site's traffic stage, re-check monthly |
| Page-experience adjacent (security headers, template a11y) | 15% | 80/100 | Missing CSP Trusted Types/COOP; contrast + heading-order issues on calculator/state templates |

**Weighted score: ~90/100** (up from the prior audit's inferred 78/100, now backed by real Lighthouse data instead of structural inference).

---

## Findings

| # | Title | Severity | Description | Recommendation |
|---|---|---|---|---|
| 1 | GSC service account lacks access to mypayrights.com property | High | The Search Console API returns "Permission denied" for both search-performance queries and URL Inspection on `sc-domain:mypayrights.com`. Only `easyphoto.in` is currently accessible to this service account. No indexation status, coverage issues, canonical-selection data, or search performance (clicks/impressions/CTR/position) could be retrieved. | Add `claude-seo@demoin-1057.iam.gserviceaccount.com` as a Full user (or Owner) on the mypayrights.com property in Search Console → Settings → Users and permissions, then re-run this check. |
| 2 | No CrUX field data available yet (expected, not a defect) | Medium | Both CrUX API and CrUX History API return "insufficient Chrome traffic volume for eligibility" for the origin and for all 3 sampled URLs. Google's Search Console Core Web Vitals report will show "Not enough data" until this resolves. | No code action needed. Re-run CrUX checks monthly as organic traffic grows; treat current lab data as the best available proxy for real-user experience in the meantime. |
| 3 | Real Lighthouse lab data confirms strong Core Web Vitals across all templates | Low (positive finding) | Homepage, calculator page, and state page all score 100/100 Lighthouse Performance on mobile and desktop, with LCP 0.5-1.7s and CLS ≤0.012 — comfortably in the "Good" CWV band and consistent with the site's zero-image, static-export architecture noted in the 2026-07-08 audit. | No action needed; maintain current build/deploy pattern (static export, async JS chunks, no render-blocking CSS) as new pages are added. |
| 4 | Accessibility regressions on calculator and state page templates (not present on homepage) | Medium | Real Lighthouse audits on `/redundancy-pay-calculator` and `/us/states/california` fail color-contrast, heading-order, and link-in-text-block checks (accessibility scores 89-91 vs. 100 on homepage). The state page additionally fails a label/accessible-name mismatch on the "Switch country" control (desktop). | Fix insufficient text/background contrast ratios and non-sequential heading levels on the calculator and state page templates; ensure links are distinguishable by more than color alone; give the "Switch country" button an accessible name matching its visible label. Since these are template-level (not page-level) issues, one fix should propagate across all calculator pages and all state pages. |
| 5 | Missing CSP Trusted Types and COOP headers site-wide | Medium | Lighthouse flags "No Content-Security-Policy header with Trusted Types directive" and "No COOP header found" as High-severity security diagnostics on every page tested. Current CSP also allows `'unsafe-inline'` for script-src, which is bypassable. | Add a `Cross-Origin-Opener-Policy: same-origin` header and a Trusted-Types-enforcing CSP (replacing `'unsafe-inline'`/host-allowlist with nonces or hashes) at the Cloudflare/edge config level. |
| 6 | GA4 not configured — organic traffic/landing-page data unavailable | Low | GA4 Data API credentials exist but no property ID is set, so organic traffic volume, engagement, and top landing pages could not be cross-referenced with GSC/CrUX this run. | Add `ga4_property_id` to `/Users/apple/.config/claude-seo/google-api.json` (or `GA4_PROPERTY_ID` env var) once a GA4 property is provisioned for mypayrights.com, to unlock Tier 2 checks in future audits. |

---

## Data Freshness Notes
- **PageSpeed Insights / Lighthouse**: real-time lab run, timestamp 2026-07-14T07:01 UTC.
- **CrUX / CrUX History**: would be a 28-day rolling window (current) / 25-week trend (history) if data existed; currently N/A (no eligible data).
- **GSC**: N/A this run (permission denied); once granted, expect standard 2-3 day reporting lag.
- **GA4**: not configured, not attempted.
