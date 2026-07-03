# My Pay Rights deep QA, legal-source, calculator, SEO, UX, and AdSense audit

Audit date: 1 July 2026  
Production host tested: https://mypayrights.com  
Requested host tested: https://www.mypayrights.com -> 301 to https://mypayrights.com  
Scope: production crawl, local source review, unit/e2e tests, targeted official-source validation, Playwright mobile checks.

## 1. Executive Summary

My Pay Rights is a strong idea with a credible foundation, but it is not yet safe to market broadly as "law-backed calculators" across all listed jurisdictions. UK statutory calculators are the strongest part of the product. The weakest parts are US 2026 federal tax rates, US state law sourcing, Canada positioning, and mobile polish.

Production is technically crawlable: `robots.txt` allows crawlers, sitemap has 358 URLs, all sitemap URLs returned 2xx in my crawl, HTTPS/HSTS/security headers are present, and `www` correctly redirects to the apex host. The site has privacy, terms, disclaimer, about, contact, methodology, editorial policy, and ads.txt pages.

The most serious issue is a live calculation accuracy defect: the 2026 US federal income tax brackets in `lib/rates.ts` are stale/wrong versus the IRS 2026 OBBB brackets. This affects take-home pay and self-employment tax. For a $75,000 single filer, the calculator overstates federal tax by about $202.

## 2. Brutal Product Diagnosis

My Pay Rights is trying to be a multi-country employment/pay-rights utility: part calculator catalog, part legal-source index, part SEO content cluster. The positioning is clear and marketable. The problem is proof density: the site claims law-backed breadth faster than the implementation supports.

"Law-backed" is believable for UK redundancy, UK SSP/SMP/SPP/SAP/ShPP, US unemployment max-benefit data, and simple mathematical calculators. It is not yet believable for all US state PTO/final-paycheck rows, Canadian notice/severance, or broad take-home/pay-tax promises.

Strong calculators: UK redundancy, UK statutory sick pay, UK maternity/adoption/paternity/shared parental pay, US unemployment estimator, overtime gross-pay calculator, working-days calculator.

Weak/generic calculators: severance estimator, day-rate calculator, salary-to-hourly, pay-rise, bonus tax, garden leave. These are useful but not distinctive unless the methodology and legal caveats are sharper.

Most likely to rank: UK redundancy pay calculator, statutory sick pay calculator 2026, PTO payout by state, final paycheck deadline by state, unemployment benefit calculator by state.

Least likely to rank yet: generic pay rise, salary-to-hourly, bonus tax, day-rate, broad severance.

## 3. Full Website Inventory

Production sitemap contains 358 URLs. Key public inventory:

- Core pages: `/`, `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`, `/methodology`, `/editorial-policy`, `/press`.
- Robots: `/robots.txt` allows normal and AI crawlers and declares the sitemap.
- Ads: `/ads.txt` exists but is placeholder only.
- Calculator pages present: all expected calculators from the brief are present, plus settlement agreement, tribunal compensation, AU redundancy, AU notice, AU annual leave, employer redundancy cost, employer notice pay, payslip analyser.
- Hubs: `/uk`, `/us`, `/ca`, `/au`, `/guides`, `/compare`, `/faq`, `/blog`, situation pages, US state pages, CA province pages, AU state pages, French Canada pages.
- 404: app-level custom `not-found.tsx` exists; sitemap did not include broken URLs.
- Sitemap defect: duplicate loc entries for `/faq/what-is-acas-early-conciliation` and `/faq/what-is-warn-act`.

## 4. Critical Issues

Issue: Wrong 2026 US federal tax brackets  
Severity: Critical  
Page/URL: `/take-home-pay-calculator`, `/self-employment-tax-calculator`  
Category: Calculation accuracy / YMYL trust  
Evidence: `lib/rates.ts:206-213` uses 10% ceiling $11,925, 12% ceiling $48,475, 22% ceiling $103,350, etc. IRS 2026 OBBB page says 10% to $12,400, 12% over $12,400, 22% over $50,400, 24% over $105,700, 32% over $201,775, 35% over $256,225, 37% over $640,600 for single filers.  
Expected: 2026 IRS brackets from current IRS release.  
Actual: Older bracket table.  
Why it matters: Tax calculators are high-trust; this creates wrong take-home and SE-tax estimates.  
Official source: https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill  
Recommended fix: Update `US_INCOME_TAX.brackets`, update the source URL, add tests asserting each 2026 bracket threshold.  
Retest steps: Run `npm test`, then test US salary $75,000: taxable income $58,900; federal tax should be $7,670 before FICA.  
Priority: P0

Issue: State-law calculators cite generic DOL state-office page instead of exact state laws  
Severity: High  
Page/URL: `/pto-payout-calculator`, `/final-paycheck-deadline-calculator`  
Category: Source quality / legal trust  
Evidence: `lib/calculators/ptoPayout.ts:10-12` and `lib/calculators/finalPaycheck.ts:12-14` cite only the DOL state-office directory. Code comments say rows were cross-checked against payroll-law aggregators.  
Expected: Each state row has a primary state labor department/statute URL supporting the exact claim.  
Actual: One generic directory link is used for all states.  
Why it matters: The USP is official source links. Generic source links do not prove 51 different state rules.  
Official source examples: CA PTO https://www.dir.ca.gov/dlse/faq_vacation.htm; CA final wages https://www.dir.ca.gov/dlse/faq_paydays.htm  
Recommended fix: Add `sourceUrl` and `sourceLabel` per state row; surface it in the result and legal-source block.  
Retest steps: Spot-check CA, TX, NY, MA, CO, IL, FL, GA, MN, OR against official pages.  
Priority: P0

Issue: Canada support is overstated  
Severity: High  
Page/URL: `/take-home-pay-calculator`, `/self-employment-tax-calculator`, `/notice-period-calculator`, `/severance-pay-calculator`  
Category: Product accuracy / trust  
Evidence: `data/tools.ts:60-61` says take-home covers UK, US and Canada, but `calcTakeHomePay` returns "UK and US are currently supported" for Canada. `data/tools.ts:74` marks self-employment tax as US/UK/CA, but engine supports UK/US only. Notice uses an Ontario baseline while presenting Canada.  
Expected: Either Canada fully supported or Canada removed from labels/meta until implemented.  
Actual: Region badges and descriptions promise more than engines deliver.  
Why it matters: Users and Google see country promises that the calculator cannot fulfill.  
Official source: Use CRA tax packages and province employment standards pages if implementing.  
Recommended fix: Remove CA from unsupported tools or implement federal/provincial Canada logic with province selector and official sources.  
Retest steps: Choose Canada on each relevant calculator and confirm result is valid and sourced.  
Priority: P0

Issue: Mobile calculator pages overflow horizontally  
Severity: High  
Page/URL: sampled calculator pages at 320px and 375px  
Category: UX / mobile SEO  
Evidence: Playwright measured 397px document width on 320/375px calculator pages. Offender is review-history rows using `gridTemplateColumns: "150px 1fr"` at `components/ToolLayout.tsx:491-494`.  
Expected: No horizontal scroll at 320px.  
Actual: Calculator pages overflow.  
Why it matters: Mobile users are likely the main audience; overflow hurts UX and Core Web Vitals perception.  
Official source: Google mobile usability principles; browser evidence from Playwright.  
Recommended fix: Make changelog rows single-column below `sm`, or use CSS grid with `minmax(0, 1fr)` and responsive template.  
Retest steps: Playwright check `scrollWidth <= clientWidth` at 320, 375, 768, 1366.  
Priority: P1

Issue: SSP meta description is stale after April 2026 rule change  
Severity: High  
Page/URL: `/statutory-sick-pay-calculator`  
Category: SEO / content accuracy  
Evidence: `data/tools.ts:297` says "including the 3 unpaid waiting days"; the page body and calculator say waiting days were abolished from 6 April 2026.  
Expected: Meta and SERP snippet reflect current 2026 SSP rule.  
Actual: Search snippet implies old waiting-day rule.  
Why it matters: This is exactly the kind of stale legal snippet that damages trust.  
Official source: https://www.gov.uk/statutory-sick-pay  
Recommended fix: Change description to "including first-day SSP and the 80%-of-earnings cap from April 2026."  
Retest steps: Fetch metadata and verify description.  
Priority: P1

## 5. Calculator Accuracy Test Results

Calculator: Take-home pay calculator  
URL: `/take-home-pay-calculator`  
Scenario: US single filer, $75,000 gross  
Inputs: country US, grossAnnual 75000  
Expected formula: $75,000 - $16,100 standard deduction = $58,900 taxable; tax = 12,400*10% + 38,000*12% + 8,500*22% = $7,670; FICA = $4,650 SS + $1,087.50 Medicare; expected take-home = $61,592.50 before state/local.  
Actual result: Uses old federal brackets; federal tax about $7,872; take-home about $61,390.50.  
Pass/Fail: Fail  
Difference: About -$202 take-home  
Official source link: https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill  
Notes: UK branch passed sampled tests; US branch must be fixed.  
Severity if failed: Critical

Calculator: Self-employment tax calculator  
URL: `/self-employment-tax-calculator`  
Scenario: US net profit uses same stale income-tax table  
Inputs: country US, netProfit 75000  
Expected formula: SE tax on 92.35% of profit using 12.4% SS + 2.9% Medicare; half SE deduction; then 2026 IRS tax brackets.  
Actual result: SE mechanics mostly align with IRS/SSA, but federal income tax stage uses stale brackets.  
Pass/Fail: Fail  
Difference: Depends on half-SE adjusted taxable income; federal tax is overstated around the affected bands.  
Official source link: https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes and https://www.ssa.gov/oact/cola/cbb.html  
Notes: SSA confirms 2026 OASDI base $184,500 and 12.4% SE OASDI.  
Severity if failed: Critical

Calculator: Day rate calculator  
URL: `/day-rate-calculator`  
Scenario: Annual salary to day rate  
Inputs: typical annual salary, working days, holiday days  
Expected formula: annual salary / billable working days; no statutory legal claim unless tax/pension assumptions are included.  
Actual result: Unit tests pass project methodology.  
Pass/Fail: Pass with caveat  
Difference: None found in sampled tests  
Official source link: Methodology source needed rather than law.  
Notes: Generic calculator; "law-backed" framing should be weaker.  
Severity if failed: N/A

Calculator: IR35 calculator  
URL: `/ir35-calculator`  
Scenario: inside vs outside comparison  
Inputs: default/sample contractor inputs  
Expected formula: Must avoid implying HMRC status determination; should cite HMRC IR35/CEST.  
Actual result: Unit tests pass, but precision risk remains.  
Pass/Fail: Pass with caveat  
Difference: Not source-failed in sampled tests  
Official source link: https://www.gov.uk/guidance/understanding-off-payroll-working-ir35  
Notes: Add stronger "not a status determination" language near result.  
Severity if failed: Medium

Calculator: Redundancy pay calculator  
URL: `/redundancy-pay-calculator`  
Scenario: Statutory maximum  
Inputs: age 61, service 30, weekly pay 2000  
Expected formula: 20 years cap, 1.5 weeks for 41+ years, weekly cap £751 => 30 * 751 = £22,530.  
Actual result: £22,530  
Pass/Fail: Pass  
Difference: £0  
Official source link: https://www.gov.uk/redundancy-your-rights/redundancy-pay  
Notes: Strongest calculator; sources are appropriate.  
Severity if failed: N/A

Calculator: PTO payout calculator  
URL: `/pto-payout-calculator`  
Scenario: California PTO payout  
Inputs: CA, 80 hours, $30/hour  
Expected formula: earned unused PTO/vacation * final hourly rate = $2,400; CA requires payout.  
Actual result: $2,400  
Pass/Fail: Formula pass, source-system fail  
Difference: $0  
Official source link: https://www.dir.ca.gov/dlse/faq_vacation.htm  
Notes: State classification must cite state-specific official sources, not only DOL directory.  
Severity if failed: High

Calculator: Notice period calculator  
URL: `/notice-period-calculator`  
Scenario: UK 6 complete years  
Inputs: region UK, completedYears 6, contractual 0  
Expected formula: ERA 1996 s.86 one week per complete year from 2 to 12 => 6 weeks.  
Actual result: 6 weeks  
Pass/Fail: UK pass; Canada fail/caveat  
Difference: UK £/weeks none; Canada not province-specific.  
Official source link: https://www.legislation.gov.uk/ukpga/1996/18/section/86  
Notes: Canada path is Ontario baseline and source is GOV.UK, which is wrong for Canada.  
Severity if failed: High for Canada positioning

Calculator: Severance pay calculator  
URL: `/severance-pay-calculator`  
Scenario: Canada statutory minimum  
Inputs: CA, 5 years, $1,000 weekly, 1 week/year policy  
Expected formula: Federal Canada severance is not a universal provincial severance estimate; depends on jurisdiction, eligibility, payroll size, and common law.  
Actual result: Uses federal 2 days/year minimum converted to weeks only as floor against policy weeks.  
Pass/Fail: Fail as broad "Canada severance" framing  
Difference: Legal entitlement can differ materially.  
Official source link: https://www.canada.ca/en/services/jobs/workplace/federal-labour-standards.html  
Notes: Needs province/federal selector and stronger disclaimer.  
Severity if failed: High

Calculator: Overtime pay calculator  
URL: `/take-home-overtime-calculator`  
Scenario: US 40 regular + 10 overtime at $20  
Inputs: country US, rate 20, regular 40, overtime 10  
Expected formula: 40*20 + 10*(20*1.5) = $1,100 gross.  
Actual result: Unit tests pass.  
Pass/Fail: Pass  
Difference: $0 in sampled formula  
Official source link: https://www.dol.gov/agencies/whd/overtime  
Notes: Keep wording as gross pay, not take-home.  
Severity if failed: N/A

Calculator: Salary to hourly calculator  
URL: `/salary-to-hourly-calculator`  
Scenario: Annual to hourly  
Inputs: annual salary, weekly hours, weeks/year  
Expected formula: salary / (hours per week * weeks per year).  
Actual result: Unit tests pass.  
Pass/Fail: Pass  
Difference: None found  
Official source link: Methodology only  
Notes: Not inherently legal; avoid "law-backed" overclaim.  
Severity if failed: N/A

Calculator: Holiday entitlement calculator  
URL: `/holiday-entitlement-calculator`  
Scenario: UK full-time 5 days/week  
Inputs: 5 days/week  
Expected formula: 5.6 weeks * 5 = 28 days capped statutory entitlement.  
Actual result: Unit tests pass.  
Pass/Fail: Pass  
Difference: None found  
Official source link: https://www.gov.uk/holiday-entitlement-rights  
Notes: Needs explicit bank holiday assumptions visible near result.  
Severity if failed: N/A

Calculator: Maternity pay calculator  
URL: `/maternity-pay-calculator`  
Scenario: AWE £500  
Inputs: average weekly earnings 500  
Expected formula: 6 weeks at 90% (£450) + 33 weeks at min(£194.32, £450) = £9,111 approx.  
Actual result: Formula implemented correctly.  
Pass/Fail: Pass  
Difference: None found  
Official source link: https://www.gov.uk/maternity-pay-leave/pay  
Notes: Eligibility simplified to earnings only; source page also has continuity/notice rules.  
Severity if failed: N/A

Calculator: Paternity pay calculator  
URL: `/paternity-pay-calculator`  
Scenario: AWE above statutory rate  
Inputs: average weekly earnings above £215.91  
Expected formula: up to 2 weeks at lower of £194.32 or 90% AWE.  
Actual result: Unit tests pass.  
Pass/Fail: Pass  
Difference: None found  
Official source link: https://www.gov.uk/paternity-pay-leave/pay  
Notes: Eligibility and timing complexity should remain prominent.  
Severity if failed: N/A

Calculator: Adoption pay calculator  
URL: `/adoption-pay-calculator`  
Scenario: AWE £500  
Inputs: average weekly earnings 500  
Expected formula: same statutory pattern as SMP/SAP: 6 weeks at 90%, then 33 weeks lower of statutory rate or 90%.  
Actual result: Unit tests pass.  
Pass/Fail: Pass  
Difference: None found  
Official source link: https://www.gov.uk/adoption-pay-leave/pay  
Notes: Eligibility simplified.  
Severity if failed: N/A

Calculator: Shared parental leave pay calculator  
URL: `/shared-parental-leave-calculator`  
Scenario: 20 paid weeks, AWE above rate  
Inputs: eligible weeks and AWE  
Expected formula: paid weeks at lower of £194.32 or 90% AWE, up to statutory cap.  
Actual result: Unit tests pass.  
Pass/Fail: Pass with caveat  
Difference: None found  
Official source link: https://www.gov.uk/shared-parental-leave-and-pay  
Notes: Eligibility/curtailment rules are complex; do not overclaim precision.  
Severity if failed: N/A

Calculator: Statutory sick pay calculator  
URL: `/statutory-sick-pay-calculator`  
Scenario: 5 qualifying days, 10 sick days, AWE high enough  
Inputs: qdpw 5, daysOff 10, AWE above cap  
Expected formula: £123.25 / 5 * 10 = £246.50 from first qualifying day in 2026/27.  
Actual result: Engine follows this logic.  
Pass/Fail: Pass  
Difference: None found  
Official source link: https://www.gov.uk/statutory-sick-pay  
Notes: Meta description is stale and must be fixed.  
Severity if failed: N/A

Calculator: Final paycheck deadline calculator  
URL: `/final-paycheck-deadline-calculator`  
Scenario: California fired and quit  
Inputs: CA fired, CA quit  
Expected formula: fired = immediate; quit without 72h notice = within 72h.  
Actual result: "On your last day" and "Within 72 hours."  
Pass/Fail: Formula pass, source-system fail  
Difference: None for CA sample  
Official source link: https://www.dir.ca.gov/dlse/faq_paydays.htm  
Notes: Add per-state exact source links.  
Severity if failed: High

Calculator: Unemployment benefit calculator  
URL: `/unemployment-benefit-calculator`  
Scenario: California HQ wages $12,000  
Inputs: CA, highestQuarterWages 12000  
Expected formula: 12000 / 26 = $461.54, capped at $450.  
Actual result: Unit tests pass project data.  
Pass/Fail: Pass with caveat  
Difference: None found in sampled formula  
Official source link: https://oui.doleta.gov/unemploy/content/sigpros/2020-2029/January2026.pdf  
Notes: Source PDF exists and was last modified 30 June 2026.  
Severity if failed: N/A

Calculator: Pay rise calculator  
URL: `/pay-rise-calculator`  
Scenario: Old/new salary comparison  
Inputs: 50000 -> 55000  
Expected formula: increase 5000; percentage 10%.  
Actual result: Unit tests pass.  
Pass/Fail: Pass  
Difference: None found  
Official source link: Methodology only  
Notes: Not legal; position as arithmetic.  
Severity if failed: N/A

Calculator: Pro-rata salary calculator  
URL: `/pro-rata-salary-calculator`  
Scenario: 40h full-time, 20h part-time  
Inputs: £40,000, 40, 20  
Expected formula: 40000 * 20/40 = £20,000.  
Actual result: Unit tests pass.  
Pass/Fail: Pass  
Difference: None found  
Official source link: Methodology only  
Notes: If date-based partial-year support is advertised, add start/end logic.  
Severity if failed: N/A

Calculator: Bonus tax calculator  
URL: `/bonus-tax-calculator`  
Scenario: US bonus $10,000, default 22%  
Inputs: country US, bonus 10000, deduction 22  
Expected formula: withholding estimate $2,200; take-home $7,800 before FICA/state.  
Actual result: Unit tests pass.  
Pass/Fail: Pass with caveat  
Difference: None found  
Official source link: https://www.irs.gov/publications/p15  
Notes: It is a withholding calculator, not final tax liability. Rename to reduce risk.  
Severity if failed: N/A

Calculator: Working days calculator  
URL: `/working-days-calculator`  
Scenario: weekday range excluding weekends  
Inputs: start/end dates  
Expected formula: count weekdays, clarify inclusive/exclusive behavior; holidays only if selected.  
Actual result: Unit tests pass.  
Pass/Fail: Pass  
Difference: None found  
Official source link: Methodology/calendar source  
Notes: Public holidays need jurisdiction-specific official calendars if included.  
Severity if failed: N/A

Calculator: Garden leave calculator  
URL: `/garden-leave-calculator`  
Scenario: Annual salary over garden-leave weeks  
Inputs: salary, period  
Expected formula: salary / pay period * garden-leave period; legal caveat that contract/notice controls.  
Actual result: Unit tests pass.  
Pass/Fail: Pass with caveat  
Difference: None found  
Official source link: https://www.acas.org.uk/garden-leave  
Notes: This is pay arithmetic plus legal context, not a statutory entitlement calculator.  
Severity if failed: N/A

## 6. Calculator-by-Calculator Findings

- Take-home pay: UK okay in sampled tests; US 2026 brackets wrong; Canada advertised but unsupported.
- Self-employment tax: UK/US mechanics mostly okay; US federal tax inherited wrong; Canada advertised but unsupported.
- Day rate: useful but generic; needs methodology-first framing.
- IR35: needs stronger "not CEST/status determination" warning.
- Redundancy: strong and source-backed.
- PTO payout: formula simple; state classifications require per-state official citations.
- Notice: UK okay; Canada is too broad and source mismatch exists.
- Severance: broad "severance" positioning is legally weak.
- Overtime: gross pay formula aligns with DOL FLSA baseline.
- Salary to hourly: arithmetic, not law-backed.
- Holiday entitlement: good UK statutory basis; edge cases should include irregular hours and bank holiday assumptions.
- Maternity/paternity/adoption/shared parental: rates align with GOV.UK sampled pages; eligibility simplification needs visible caveats.
- SSP: engine aligns with 2026 first-day logic; metadata stale.
- Final paycheck: high-value tool but source architecture insufficient.
- Unemployment: source is strong and current; formulas are necessarily simplified for many states.
- Pay rise/pro-rata/bonus/working days/garden leave: useful tools but lower legal defensibility.

## 7. Source Link Audit

Good source practices:

- UK redundancy cites ERA 1996, GOV.UK redundancy rights, and official calculator.
- UK maternity/SSP pages cite GOV.UK pages with current rates.
- US FICA uses IRS Topic 751 and SSA contribution base.
- US unemployment uses current DOL Significant Provisions PDF.
- Legal-source block is visible below FAQs on calculator pages.

Weak/missing source practices:

- US PTO and final-paycheck calculators need exact state official links per state.
- Notice calculator source is GOV.UK even when Canada selected.
- Severance calculator source is a broad Canada federal-labour page, not a complete statutory/provincial severance basis.
- Generic arithmetic calculators should not imply official legal sourcing where none exists.
- Source links are mostly below the calculator; result panels should show the exact source for the active jurisdiction/result.

## 8. Incorrect Or Unsupported Claims

- "Take-home pay ... UK, US and Canada" is unsupported for Canada.
- "Self-employment tax ... US/UK/CA" region is unsupported for Canada.
- SSP description "including the 3 unpaid waiting days" is outdated for April 2026 rules.
- "No secondary aggregators" in the source block overstates reality for state-law tables whose code comments reference payroll-law aggregators.
- "PDF summary" page copy is inconsistent with the button label "Download private estimate"; e2e test expected "Download PDF summary."

## 9. UX And Mobile Issues

- High: horizontal overflow on calculator pages at 320/375px caused by review-history fixed grid.
- Medium: multiple visible interactive elements under 32px height in Playwright touch-target sampling.
- Medium: source links are present but too low on the page for a "law-backed" USP.
- Medium: result panels do not show active jurisdiction-specific source inline.
- Low: copy says PDF summary, button says private estimate; align wording.

## 10. Technical SEO And Indexing Issues

- Pass: `www` -> apex 301 confirmed.
- Pass: sitemap exists and all 358 sitemap URLs returned 2xx in crawl.
- Pass: canonical tags present on sampled pages.
- Pass: robots allows crawling and references sitemap.
- Pass: HTTPS/HSTS/security headers present.
- Issue: duplicate sitemap URLs for two FAQ pages.
- Issue: no `X-Robots-Tag` issues found in sampled headers, but full header validation should be added to CI.
- Issue: SSP meta description stale.
- Issue: some title tags remain generic and could include country/year for CTR.

## 11. Content Quality And Google Search Review

Scores by page group:

- Homepage: Content 78, Trust 72, Ranking potential 70. Clear product, but needs stronger source proof above fold.
- UK statutory calculators: Content 82, Trust 80, Ranking potential 84.
- US state-law calculators: Content 70, Trust 55, Ranking potential 82 after source fix.
- Canada/AU hubs: Content 58, Trust 52, Ranking potential 60 until depth/sources improve.
- Generic calculators: Content 55, Trust 55, Ranking potential 45.
- Blog/guides: likely useful for topical authority, but must avoid thin/duplicative programmatic content.

## 12. Legal/Trust/Disclaimer Review

The disclaimer is visible and says estimates only, not legal or financial advice. Privacy, terms, contact, methodology, editorial-policy pages exist. That is a good base.

Trust gaps:

- No named legal/payroll reviewer.
- "My Pay Rights editorial team" is too anonymous for high-trust employment/pay content.
- Source review says "official sources reviewed" even where state-law sources are generic.
- No visible correction SLA or changelog per rate table beyond a generic review history.
- Multi-country scope is too broad for current source depth.

## 13. AdSense Readiness Review

Not ready to apply aggressively.

Blockers:

- `ads.txt` is placeholder only.
- Mobile overflow on calculator pages.
- High-trust/YMYL accuracy defects.
- Some content/tool pages overclaim unsupported jurisdictions.
- Need to ensure ads never appear inside result panels, source blocks, warning/disclaimer blocks, or near wage-claim/employer-template CTAs.

Best ad placements after fixes: below calculator, between methodology and FAQ, bottom of long guides. Avoid ads above the calculator, inside results, next to official-source links, or near legal disclaimer text.

## 14. Security And Privacy Review

Pass:

- HTTPS enforced.
- HSTS present.
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, CSP present.
- Privacy page says calculations/PDF are browser-local.

Risks:

- CSP allows `'unsafe-inline'`; common for Next/static style, but still weaker.
- `Access-Control-Allow-Origin: *` is present on apex response; likely harmless for static pages but should be intentional.
- AdSense domains are pre-allowed before approval.
- Payslip analyser must be especially clear that no uploaded/sensitive pay data leaves the browser.

## 15. Competitor Gap Analysis

Government sites do authority better but UX worse. Payroll calculators do tax UX better but legal-source context worse. Employment-law firms do legal nuance better but often lack instant calculators. Generic calculator sites do breadth better but usually have weak sourcing.

Where My Pay Rights can win: source-backed calculators with official links, current statutory rates, no signup, downloadable records, clear correction process.

Where it cannot win yet: broad Canada/province law, US state-law tables without exact citations, tax calculations versus mature payroll/tax providers.

## 16. Top Improvements Required

1. Fix 2026 US tax brackets and tests.
2. Add per-state official sources to PTO and final paycheck.
3. Remove or implement unsupported Canada claims.
4. Fix mobile overflow.
5. Fix SSP stale meta description.
6. Add named legal/payroll reviewer or at least transparent editorial credentials.
7. Move active source link nearer each result.
8. Align PDF copy/button/test wording.
9. Add sitemap duplicate prevention test.
10. Add annual statutory-rate audit checklist to CI/release process.

## 17. Must-Fix Before Scaling

- P0 calculation defects.
- P0 unsupported jurisdiction labels.
- P0 state-law source architecture.
- P1 mobile overflow.
- P1 named reviewer/trust model.
- P1 thin/generic calculator positioning.

## 18. Must-Fix Before AdSense

- Replace placeholder `ads.txt` after approval.
- Fix mobile overflow.
- Fix calculation/source issues.
- Keep ads away from result/source/legal warning zones.
- Update privacy/cookie language for AdSense cookies/personalized ads before ads go live.

## 19. Source Link Improvement Plan

For every calculator, store sources as structured data tied to jurisdiction and result rule:

- `jurisdiction`
- `claim`
- `sourceLabel`
- `sourceUrl`
- `sourceType`
- `lastVerified`
- `quoteOrRuleSummary`
- `appliesToInputs`

Priority source additions:

- PTO: 51 official state pages/statutes.
- Final paycheck: 51 official state pages/statutes.
- Canada notice/severance: province/federal sources, not one generic Canada page.
- Tax: IRS release URL and Revenue Procedure URL for brackets.
- Bonus: Publication 15 section for supplemental wages.

## 20. Calculator Methodology Improvement Plan

- Separate "statutory minimum", "policy estimate", "tax withholding estimate", and "plain arithmetic" calculator classes.
- Show "what this result includes" and "what this result excludes" inside result panel.
- Add tests against official example values where available.
- Add snapshot tests for all rate constants and source URLs.
- Add state/province source validation tests.
- Add mobile no-overflow tests for all calculator templates.

## 21. Final QA Checklist

- `npm test`: passed, 159 tests.
- `npm run e2e`: 32 passed, 31 failed because tests expect "Download PDF summary" while UI button says "Download private estimate."
- Manual production PDF check: passed for redundancy; downloaded `%PDF-` file.
- Production sitemap crawl: 358 URLs, all 2xx, 2 duplicate loc entries.
- Production metadata sample: canonical and descriptions present.
- Mobile Playwright: calculator pages overflow at 320/375px.
- Official-source checks completed for UK redundancy, UK maternity, UK SSP, IRS 2026 brackets, IRS/SSA FICA, IRS SE tax, DOL overtime, CA PTO, CA final wages, DOL UI PDF.

## 22. Final Verdict

Overall site score: 69/100  
Calculation accuracy score: 72/100  
Source quality score: 61/100  
SEO readiness score: 78/100  
AdSense readiness score: 58/100  
User trust score: 64/100

Top 10 must-fix items:

1. Fix 2026 US income-tax brackets.
2. Add exact official state sources for PTO.
3. Add exact official state sources for final paycheck deadlines.
4. Remove/implement unsupported Canada claims.
5. Fix mobile overflow from review-history grid.
6. Fix stale SSP meta description.
7. Add named reviewer and stronger editorial credentials.
8. Align PDF copy, button label, and e2e tests.
9. De-duplicate sitemap URLs.
10. Add rate/source freshness tests.

Ready for Google indexing growth: partially, but do not scale programmatic pages until source depth is fixed.  
Ready for AdSense: not yet.  
"Law-backed calculators" currently believable: yes for selected UK statutory tools; no as a whole-site claim across all calculators.  
What must happen next: fix P0 calculation/source issues, reduce unsupported jurisdiction claims, and rerun full unit/e2e/mobile/source QA before further SEO expansion.

