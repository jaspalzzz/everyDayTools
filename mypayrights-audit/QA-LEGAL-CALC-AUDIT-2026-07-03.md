# My Pay Rights production QA, legal-source, calculator, SEO, UX, and AdSense audit

Audit date: 3 July 2026  
Production host tested: https://www.mypayrights.com/ -> 301 -> https://mypayrights.com/  
Scope: live production crawl, representative live mobile rendering, local calculator/unit tests, local source review, and targeted official-source validation.  
Important limitation: this audit validates many high-risk formulas and source patterns, but it is not a legal opinion and does not replace jurisdiction-by-jurisdiction attorney review.

## 1. Executive Summary

My Pay Rights has a strong, commercially sensible USP: source-backed calculators for employment pay, leave, final wage, and workplace-rights topics. The product is significantly better than a thin calculator farm: it has 358 live sitemap URLs, 32 calculator/tool URLs, official-source blocks on most calculators, privacy/terms/disclaimer/about/contact/editorial pages, HSTS/security headers, no broken sitemap URLs in the live crawl, no sampled mobile overflow, and FAQ detail pages are correctly noindexed.

The site is still not ready to be marketed broadly as "law-backed calculators" across every country/state. The biggest risk is accuracy and proof density. The US 2026 federal income-tax brackets in `lib/rates.ts` are stale even though the standard deduction was updated. That affects take-home pay, self-employment tax, and IR35/contractor comparison US paths. State-law calculators for PTO and final paycheck are high-value, but their source architecture is still too generic: many results rely on DOL directory/fact-sheet links instead of exact official state statutes or labor-agency pages.

AdSense should wait. The site has the required policy pages and a placeholder `ads.txt`, but YMYL-style accuracy/source defects should be fixed before monetization is turned on.

## 2. Brutal Product Diagnosis

My Pay Rights is trying to be a high-trust employment/pay rights utility, not merely a wage calculator. The positioning is clear: "law-backed pay calculators" with official sources and downloadable estimates.

The believable core is UK statutory employment pay: redundancy, SSP, SMP/SPP/SAP/ShPP, holiday entitlement, notice, settlement, and tribunal calculations. The weakest areas are broad US state-law claims, Canada positioning, and generic salary/tax calculators that are useful but not meaningfully "law-backed."

The site feels more serious than a thin SEO site, but the trust proof is uneven. A user sees a polished calculator and official-source section, then discovers some active-jurisdiction results point to generic source pages. That gap is dangerous because official sourcing is the USP.

Most likely to rank: UK redundancy pay, statutory sick pay 2026, maternity/paternity/adoption/shared parental pay, US PTO payout by state, US final paycheck deadline by state, unemployment benefit estimator.  
Least likely to rank without a sharper angle: pay rise, salary-to-hourly, day rate, bonus tax, generic severance.

Before scaling, the site needs stricter rate governance, exact per-jurisdiction source URLs, and a named reviewer model.

## 3. Full Website Inventory

Live crawl inventory:

- Sitemap URLs: 358.
- Duplicate sitemap loc entries: 2.
- Broken sitemap URLs: 0.
- Calculator/tool URLs in sitemap: 32.
- Noindexed URLs detected in sitemap crawl: 76, primarily FAQ detail pages.
- Core pages present: `/`, `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`, `/methodology`, `/editorial-policy`, `/press`.
- Robots: `/robots.txt` allows crawling and declares `https://mypayrights.com/sitemap.xml`.
- Host canonicalization: `https://www.mypayrights.com/` redirects to `https://mypayrights.com/`.
- Security headers present on homepage response: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- Expected calculators present: take-home, self-employment tax, day rate, IR35, redundancy, PTO payout, notice period, severance, overtime, salary-to-hourly, holiday entitlement, maternity, paternity, adoption, shared parental leave, SSP, final paycheck deadline, unemployment benefit, pay rise, pro-rata salary, bonus tax, working days, garden leave.
- Extra calculators/tools present: settlement agreement, tribunal compensation, AU redundancy, AU notice, AU annual leave, employer redundancy cost, employer notice pay, payslip analyser, TUPE wizard.

Sitemap duplicate locs:

- `https://mypayrights.com/faq/what-is-acas-early-conciliation`
- `https://mypayrights.com/faq/what-is-warn-act`

## 4. Critical Issues

Issue: Stale 2026 US federal income-tax brackets  
Severity: Critical  
Page/URL: `/take-home-pay-calculator`, `/self-employment-tax-calculator`, `/ir35-calculator` US path  
Category: Calculation accuracy  
Evidence: `lib/rates.ts` uses single-filer brackets beginning 10% to `$11,925`, 12% to `$48,475`, 22% to `$103,350`, etc. IRS tax-year 2026 OBBB rates are 10% to `$12,400`, 12% over `$12,400`, 22% over `$50,400`, 24% over `$105,700`, 32% over `$201,775`, 35% over `$256,225`, and 37% over `$640,600`.  
Expected: 2026 IRS brackets and current IRS release/source URL.  
Actual: Standard deduction is updated to `$16,100`, but bracket thresholds remain older.  
Why it matters: Wrong tax estimates directly harm a pay calculator's trust and can mislead users.  
Official source: https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill  
Recommended fix: Update `US_INCOME_TAX.brackets`, update source URL, add boundary tests for each 2026 threshold and one known-salary fixture.  
Retest steps: Run `npm test`; manually test US single filer `$75,000` gross. Taxable income should be `$58,900`; federal tax should be `$7,670` before FICA.  
Priority: P0

Issue: US state-law calculators do not expose exact state official sources  
Severity: Critical  
Page/URL: `/pto-payout-calculator`, `/final-paycheck-deadline-calculator`, `/us/new-york/pto-payout-calculator`, `/us/states/*`  
Category: Legal source quality  
Evidence: Live source-link scan found `/pto-payout-calculator` has 1 official external link, a federal DOL vacation fact sheet, and `/final-paycheck-deadline-calculator` relies on federal/DOL state payday links. `/us/new-york/pto-payout-calculator` showed 0 official external links. Local source data does not store exact `sourceUrl` per state rule.  
Expected: The active state result should show the official state labor/statute page supporting that exact state's PTO/final-paycheck rule.  
Actual: Broad federal or directory links are used.  
Why it matters: "Law-backed" is not believable for all 50 states without state-specific primary sources.  
Official source: Examples: California PTO https://www.dir.ca.gov/dlse/faq_vacation.htm and California final wages https://www.dir.ca.gov/dlse/faq_paydays.htm  
Recommended fix: Add per-state `sourceUrl`, `sourceLabel`, `lastVerified`, and `ruleSummary` to PTO/final-paycheck datasets; show the selected state's source beside the result.  
Retest steps: Spot-check CA, NY, TX, CO, IL, MA, MN, OR, FL, GA against official state pages.  
Priority: P0

Issue: Unsupported or overbroad Canada claims remain visible  
Severity: High  
Page/URL: `/take-home-pay-calculator`, `/self-employment-tax-calculator`, `/notice-period-calculator`, `/severance-pay-calculator`, `/ca`  
Category: Product accuracy / trust  
Evidence: Tool copy advertises UK/US/Canada support in places, while calculation engines return or imply "UK and US are currently supported" for take-home/self-employment paths. Notice uses "Canada (Ontario baseline)" while broader copy says UK and Canada. Severance uses federal Canada Labour Code rules but most Canadian employees are provincially regulated.  
Expected: Region labels match implemented jurisdiction logic.  
Actual: Canada appears broader than the implementation supports.  
Why it matters: A jurisdiction mismatch is a YMYL trust problem.  
Official source: Canada federal standards are limited to federally regulated workplaces: https://www.canada.ca/en/employment-social-development/services/labour-standards.html  
Recommended fix: Either implement province-by-province Canada support or relabel unsupported calculators as UK/US only and mark federal Canada tools narrowly.  
Retest steps: Use Canada selection on every calculator advertising Canada and verify the result, source, and disclaimer.  
Priority: P0

Issue: Stale SSP/waiting-day copy in metadata/PDF/guides  
Severity: High  
Page/URL: `/statutory-sick-pay-calculator`, `/guides/uk-sick-pay`, sick-pay PDF copy  
Category: Content accuracy / SEO  
Evidence: `data/tools.ts` still says SSP includes "the 3 unpaid waiting days"; `components/calculators/SickPayCalculator.tsx` PDF description still says it accounts for 3 unpaid waiting days. Some guide FAQ copy says qualifying requires earning at least GBP129/week, while the current calculator/source copy says the Lower Earnings Limit condition was abolished from 6 April 2026.  
Expected: Current 2026 wording: SSP is up to GBP123.25/week and payable from the first qualifying day; low earners receive the lower 80%-of-earnings calculation.  
Actual: Mixed old/new rule wording.  
Why it matters: Users and Google see inconsistent legal rules.  
Official source: GOV.UK SSP page states up to GBP123.25/week: https://www.gov.uk/statutory-sick-pay  
Recommended fix: Replace old waiting-day/LEL copy in metadata, guide FAQ, and PDF strings; add a text-regression test for "3 unpaid waiting days" in SSP contexts.  
Retest steps: `rg "waiting days|Lower Earnings Limit|earn at least" data app components` and verify only historical/explanatory mentions remain.  
Priority: P1

Issue: Duplicate sitemap entries  
Severity: Medium  
Page/URL: `/sitemap.xml`  
Category: Technical SEO  
Evidence: Fresh crawl found duplicate loc entries for two FAQ URLs.  
Expected: Sitemap contains unique loc entries.  
Actual: 2 duplicate locs.  
Why it matters: Minor crawl hygiene issue; not a ranking disaster but easy to fix.  
Official source: Sitemaps protocol expects URL entries to identify canonical URLs: https://www.sitemaps.org/protocol.html  
Recommended fix: De-duplicate source arrays in `app/sitemap.ts`; add a sitemap uniqueness test.  
Retest steps: Build and parse `out/sitemap.xml`, assert `new Set(urls).size === urls.length`.  
Priority: P2

Issue: Named reviewer/authorship is still too thin for YMYL positioning  
Severity: High  
Page/URL: Sitewide calculators and guides  
Category: Trust / Google quality  
Evidence: Pages include review/correction blocks, but there is no named payroll/legal reviewer with credentials and no visible reviewer profile.  
Expected: High-trust employment/pay claims should show who reviewed them, qualifications, update cadence, and correction SLA.  
Actual: "editorial team" style trust language is better than nothing but not enough for broad legal/payroll claims.  
Why it matters: Authority and accountability matter for users, Google, and AdSense.  
Official source: Google Search quality guidance emphasizes clear responsibility and trust for YMYL topics: https://developers.google.com/search/docs/fundamentals/creating-helpful-content  
Recommended fix: Add author/reviewer profiles, credentials, jurisdiction scope, and correction SLA; do not imply attorney review unless real.  
Retest steps: Check every calculator has visible author, reviewer, last reviewed, sources, and correction route.  
Priority: P1

## 5. Calculator Accuracy Test Results

Calculator: Take-home Pay Calculator  
URL: `/take-home-pay-calculator`  
Scenario: US single filer, annual salary 75000  
Inputs: Country US, gross annual salary 75000, standard deduction  
Expected formula: 75000 - 16100 = 58900 taxable; tax = 12400*10% + 38000*12% + 8500*22% = 7670; FICA = 4650 SS + 1087.50 Medicare.  
Expected result: Federal tax 7670; FICA 5737.50; net before state/local 61592.50.  
Actual result: Current constants use stale brackets, giving about 7872 federal tax.  
Pass/Fail: Fail  
Difference: About 202 too much federal tax.  
Official source link: https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill  
Notes: UK path passed local tests; US path needs bracket update.  
Severity if failed: Critical

Calculator: Self-Employment Tax Calculator  
URL: `/self-employment-tax-calculator`  
Scenario: US net profit 75000  
Inputs: Country US, net profit 75000  
Expected formula: SE tax on 92.35% net earnings using 12.4% SS and 2.9% Medicare, half-SE deduction, then current 2026 IRS income-tax brackets.  
Expected result: SE mechanics should use 2026 SSA wage base 184500 and 2026 IRS brackets.  
Actual result: SE mechanics are structurally sound in tests, but income-tax stage inherits stale 2026 brackets.  
Pass/Fail: Fail  
Difference: Federal tax varies by income band; materially wrong in affected bands.  
Official source link: https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes  
Notes: Also verify SSA 2026 wage base separately each release.  
Severity if failed: Critical

Calculator: Day Rate Calculator  
URL: `/day-rate-calculator`  
Scenario: Salary/day-rate conversion  
Inputs: Annual salary, working days, holiday days, uplift  
Expected formula: salary divided by billable/working days; contractor uplift applied if selected.  
Expected result: Arithmetic result from user assumptions.  
Actual result: Local unit tests pass.  
Pass/Fail: Pass with positioning caveat  
Difference: None found in unit fixtures.  
Official source link: Methodology/source page is enough; this is not a statutory entitlement.  
Notes: Do not over-frame as law-backed.  
Severity if failed: N/A

Calculator: IR35 Calculator  
URL: `/ir35-calculator`  
Scenario: Inside vs outside comparison  
Inputs: UK/US contractor inputs  
Expected formula: Compare tax outcomes while avoiding status-determination claims.  
Expected result: Estimate only; HMRC CEST/source should be prominent.  
Actual result: Local tests pass; US path may inherit stale US tax brackets.  
Pass/Fail: Fail for US tax-rate dependency; pass with caveat for UK positioning.  
Difference: Same stale US bracket risk where US mode is used.  
Official source link: https://www.gov.uk/guidance/understanding-off-payroll-working-ir35  
Notes: Add stronger "not an IR35 status determination" wording inside result.  
Severity if failed: High

Calculator: Redundancy Pay Calculator  
URL: `/redundancy-pay-calculator`  
Scenario: UK statutory maximum  
Inputs: Age 61, 30 years service, weekly pay 2000  
Expected formula: 20 years cap * 1.5 weeks * GBP751 weekly cap.  
Expected result: GBP22530.  
Actual result: Local tests pass.  
Pass/Fail: Pass  
Difference: 0 in test fixture.  
Official source link: https://www.gov.uk/redundancy-your-rights/redundancy-pay  
Notes: Strongest calculator group.  
Severity if failed: N/A

Calculator: PTO Payout Calculator  
URL: `/pto-payout-calculator`  
Scenario: California unused PTO  
Inputs: CA, 80 hours, 30/hour  
Expected formula: 80 * 30 = 2400 gross; CA treats earned vacation as wages and requires payout.  
Expected result: 2400 gross.  
Actual result: Formula passes local tests; source architecture fails.  
Pass/Fail: Formula pass, source fail  
Difference: 0 for CA arithmetic.  
Official source link: https://www.dir.ca.gov/dlse/faq_vacation.htm  
Notes: Needs exact source for selected state in the result panel.  
Severity if failed: High

Calculator: Notice Period Calculator  
URL: `/notice-period-calculator`  
Scenario: UK statutory notice, 6 complete years  
Inputs: UK, years 6  
Expected formula: one week per complete year from 2 to 12 years.  
Expected result: 6 weeks.  
Actual result: Local tests pass.  
Pass/Fail: UK pass; Canada caveat  
Difference: None for UK fixture.  
Official source link: https://www.legislation.gov.uk/ukpga/1996/18/section/86  
Notes: Canada must be province-specific or clearly Ontario/federal-only.  
Severity if failed: High for Canada positioning

Calculator: Severance Pay Calculator  
URL: `/severance-pay-calculator`  
Scenario: Canada federal severance  
Inputs: Canada federal, qualifying service, weekly pay  
Expected formula: Canada Labour Code Part III only for federally regulated employees; most workers need province rules.  
Expected result: Federal estimate must be labeled narrowly.  
Actual result: Local tests pass formula, but broad positioning is legally weak.  
Pass/Fail: Pass with high trust caveat  
Difference: Not a math defect; scope defect.  
Official source link: https://www.canada.ca/en/employment-social-development/services/labour-standards/reports/severance-pay.html  
Notes: Add province selector or narrow title.  
Severity if failed: High

Calculator: Overtime Pay Calculator  
URL: `/take-home-overtime-calculator`  
Scenario: US 40 regular + 10 overtime at 20/hour  
Inputs: Rate 20, regular 40, overtime 10, multiplier 1.5  
Expected formula: 40*20 + 10*20*1.5.  
Expected result: 1100 gross.  
Actual result: Local tests pass.  
Pass/Fail: Pass  
Difference: 0 in fixture.  
Official source link: https://www.dol.gov/agencies/whd/overtime  
Notes: Keep wording as gross pay unless tax is actually calculated.  
Severity if failed: N/A

Calculator: Salary To Hourly Calculator  
URL: `/salary-to-hourly-calculator`  
Scenario: Annual salary conversion  
Inputs: 52000 annual, 40 hours/week, 52 weeks  
Expected formula: 52000 / (40*52).  
Expected result: 25/hour.  
Actual result: Local tests pass.  
Pass/Fail: Pass  
Difference: 0 in fixture.  
Official source link: Methodology plus wage-law links for context.  
Notes: Not inherently legal.  
Severity if failed: N/A

Calculator: Holiday Entitlement Calculator  
URL: `/holiday-entitlement-calculator`  
Scenario: UK 5 days/week  
Inputs: 5 working days/week  
Expected formula: 5.6 weeks * 5 days, capped at 28 days.  
Expected result: 28 days.  
Actual result: Local tests pass.  
Pass/Fail: Pass  
Difference: 0 in fixture.  
Official source link: https://www.gov.uk/holiday-entitlement-rights  
Notes: Show bank-holiday assumptions near result.  
Severity if failed: N/A

Calculator: Maternity Pay Calculator  
URL: `/maternity-pay-calculator`  
Scenario: AWE 500  
Inputs: Average weekly earnings 500  
Expected formula: 6 weeks at 90% AWE + 33 weeks at lower of GBP194.32 or 90% AWE.  
Expected result: 6*450 + 33*194.32 = GBP9112.56.  
Actual result: Local tests pass.  
Pass/Fail: Pass  
Difference: 0 in fixture pattern.  
Official source link: https://www.gov.uk/maternity-pay-leave/pay  
Notes: Eligibility remains simplified; make continuity/notice caveats visible.  
Severity if failed: N/A

Calculator: Paternity Pay Calculator  
URL: `/paternity-pay-calculator`  
Scenario: AWE above statutory rate  
Inputs: AWE above GBP215.91, 2 weeks  
Expected formula: lower of GBP194.32 or 90% AWE for 1 or 2 weeks.  
Expected result: GBP388.64 for 2 weeks where AWE is above cap.  
Actual result: Local tests pass.  
Pass/Fail: Pass  
Difference: 0 in fixture.  
Official source link: https://www.gov.uk/paternity-pay-leave/pay  
Notes: Timing/notice rules are more complex than payment formula.  
Severity if failed: N/A

Calculator: Adoption Pay Calculator  
URL: `/adoption-pay-calculator`  
Scenario: AWE 500  
Inputs: Average weekly earnings 500  
Expected formula: Same statutory pattern as SMP/SAP: 6 weeks at 90%, then 33 weeks lower of cap or 90%.  
Expected result: GBP9112.56.  
Actual result: Local tests pass.  
Pass/Fail: Pass  
Difference: 0 in fixture pattern.  
Official source link: https://www.gov.uk/adoption-pay-leave/pay  
Notes: Eligibility simplified.  
Severity if failed: N/A

Calculator: Shared Parental Leave Pay Calculator  
URL: `/shared-parental-leave-calculator`  
Scenario: 20 paid weeks, AWE above cap  
Inputs: Paid weeks 20, AWE above cap  
Expected formula: paid weeks * GBP194.32, subject to available remaining ShPP weeks.  
Expected result: GBP3886.40 for 20 weeks above cap.  
Actual result: Local tests pass.  
Pass/Fail: Pass with caveat  
Difference: 0 in fixture.  
Official source link: https://www.gov.uk/shared-parental-leave-and-pay  
Notes: Curtailment/eligibility rules are complex; keep estimate wording.  
Severity if failed: N/A

Calculator: Statutory Sick Pay Calculator  
URL: `/statutory-sick-pay-calculator`  
Scenario: 5 qualifying days/week, 10 sick days, AWE high enough  
Inputs: 5 qualifying days, 10 days off, AWE 200  
Expected formula: GBP123.25 / 5 * 10.  
Expected result: GBP246.50.  
Actual result: Local tests pass.  
Pass/Fail: Pass formula, fail some surrounding copy  
Difference: 0 formula; stale wording elsewhere.  
Official source link: https://www.gov.uk/statutory-sick-pay  
Notes: Remove stale "3 unpaid waiting days" text from metadata/PDF copy.  
Severity if failed: High for copy; formula pass

Calculator: Final Paycheck Deadline Calculator  
URL: `/final-paycheck-deadline-calculator`  
Scenario: California fired and California quit without 72h notice  
Inputs: CA fired; CA quit without notice  
Expected formula: fired/discharged due immediately; quit without 72h notice due within 72 hours.  
Expected result: Immediate / within 72 hours.  
Actual result: Local tests pass for sampled states; source architecture generic.  
Pass/Fail: Formula pass, source fail  
Difference: None for CA sample.  
Official source link: https://www.dir.ca.gov/dlse/faq_paydays.htm  
Notes: Needs per-state source and exception notes.  
Severity if failed: High

Calculator: Unemployment Benefit Calculator  
URL: `/unemployment-benefit-calculator`  
Scenario: California high-quarter wages 12000  
Inputs: CA, highest quarter wages 12000  
Expected formula: 12000 / 26 = 461.54, capped at 450.  
Expected result: 450 weekly benefit estimate.  
Actual result: Local tests pass.  
Pass/Fail: Pass with caveat  
Difference: 0 in fixture.  
Official source link: https://oui.doleta.gov/unemploy/content/sigpros/2020-2029/January2026.pdf  
Notes: Eligibility is always simplified.  
Severity if failed: N/A

Calculator: Pay Rise Calculator  
URL: `/pay-rise-calculator`  
Scenario: 50000 to 55000  
Inputs: Old salary 50000, new salary 55000  
Expected formula: increase 5000; increase percent 10%.  
Expected result: 5000 and 10%.  
Actual result: Local tests pass.  
Pass/Fail: Pass  
Difference: 0.  
Official source link: Methodology only; tax links only if after-tax wording appears.  
Notes: Generic.  
Severity if failed: N/A

Calculator: Pro-Rata Salary Calculator  
URL: `/pro-rata-salary-calculator`  
Scenario: 40h full-time, 20h part-time  
Inputs: Full-time salary 40000, full-time hours 40, part-time hours 20  
Expected formula: 40000 * 20/40.  
Expected result: 20000.  
Actual result: Local tests pass.  
Pass/Fail: Pass  
Difference: 0.  
Official source link: https://www.gov.uk/part-time-worker-rights  
Notes: Add date-based partial-year mode only if advertised.  
Severity if failed: N/A

Calculator: Bonus Tax Calculator  
URL: `/bonus-tax-calculator`  
Scenario: US supplemental wage withholding  
Inputs: Bonus 10000, flat supplemental withholding 22%  
Expected formula: 10000 * 22% withholding = 2200.  
Expected result: 7800 before FICA/state and annual reconciliation.  
Actual result: Local tests pass.  
Pass/Fail: Pass with naming caveat  
Difference: 0 in fixture.  
Official source link: https://www.irs.gov/publications/p15  
Notes: Label as withholding estimate, not final tax.  
Severity if failed: N/A

Calculator: Working Days Calculator  
URL: `/working-days-calculator`  
Scenario: Weekday count excluding weekends  
Inputs: Start/end dates  
Expected formula: Count weekdays according to inclusive/exclusive setting; subtract official holidays only if selected.  
Expected result: Fixture-dependent.  
Actual result: Local tests pass.  
Pass/Fail: Pass  
Difference: 0 in unit fixtures.  
Official source link: https://www.gov.uk/bank-holidays  
Notes: Holiday calendars must stay jurisdiction-specific.  
Severity if failed: N/A

Calculator: Garden Leave Calculator  
URL: `/garden-leave-calculator`  
Scenario: Salary over garden-leave period  
Inputs: Salary and garden-leave period  
Expected formula: Prorated salary over garden-leave period; legal entitlement depends on contract/notice.  
Expected result: Arithmetic estimate.  
Actual result: Local tests pass.  
Pass/Fail: Pass with caveat  
Difference: 0 in unit fixtures.  
Official source link: https://www.acas.org.uk/notice-periods  
Notes: Source scan found only legislation link on page; add Acas garden-leave/notice source if making legal context claims.  
Severity if failed: Medium

## 6. Calculator-by-Calculator Findings

- Take-home pay: P0 US bracket defect; Canada support overclaim.
- Self-employment tax: P0 inherited US bracket defect; Canada overclaim.
- Day rate: mathematically fine, weak as a "law-backed" product.
- IR35: add stronger CEST/status-disclaimer and fix US tax dependency.
- Redundancy: strong, source-backed, ranking-worthy.
- PTO payout: valuable but under-sourced by state.
- Notice period: UK strong; Canada needs province-level support or narrower label.
- Severance: federal Canada scope must be clearer.
- Overtime: gross-pay formula aligns with FLSA baseline; avoid take-home wording.
- Salary-to-hourly: useful arithmetic, not legal.
- Holiday entitlement: strong UK basis; expand irregular-hours examples.
- Maternity/paternity/adoption/shared parental: formula/rates pass sampled tests; eligibility simplifications need prominent caveats.
- SSP: formula current; stale old-rule text remains in metadata/PDF/guide copy.
- Final paycheck: high-value; state-specific source architecture is missing.
- Unemployment: good source base; eligibility caveats required.
- Pay rise/pro-rata/bonus/working-days/garden-leave: usable utilities, but not core "law-backed" differentiators.

## 7. Source Link Audit

Live calculator source-link scan:

- Good: UK statutory calculators generally include official legislation/GOV.UK/Acas links.
- Good: AU tools include Fair Work/legislation links.
- Good: SSP, redundancy, settlement, tribunal, maternity, paternity, adoption, and shared parental tools have multiple official links.
- Weak: `/us/new-york/pto-payout-calculator` has 0 official external source links.
- Weak: `/pto-payout-calculator` has only 1 official link, and it is generic federal DOL vacation guidance.
- Weak: `/final-paycheck-deadline-calculator` has federal/DOL state payday links but not exact state-law links.
- Weak: source links are often below the calculator; the active result should cite the selected jurisdiction inline.

Source system recommendation: every legal rule row should include `sourceType`, `sourceLabel`, `sourceUrl`, `lastVerified`, `jurisdiction`, `ruleSummary`, and `appliesToInputs`.

## 8. Incorrect Or Unsupported Claims

- "UK, US and Canada" take-home support is unsupported by the engine.
- Self-employment tax Canada support is unsupported by the engine.
- Broad Canada severance/notice wording hides federal/provincial limitations.
- SSP metadata/PDF copy still references old waiting-day logic.
- US 2026 federal tax source URL omits the live OBBB IRS slug and points to an older/general-looking URL.
- State PTO/final-paycheck "law-backed" claims are not fully proven by generic source links.

## 9. UX And Mobile Issues

Live mobile smoke at 320px and 375px passed for sampled pages:

- `/`
- `/take-home-pay-calculator`
- `/redundancy-pay-calculator`
- `/statutory-sick-pay-calculator`
- `/pto-payout-calculator`
- `/final-paycheck-deadline-calculator`
- `/us/final-paycheck`
- `/us/new-york/pto-payout-calculator`
- `/faq/can-employer-refuse-redundancy-pay`

Remaining UX issues:

- Severity: High. Source proof is too low on the page for a source-backed USP. Put active source links in the result panel.
- Severity: Medium. Generic calculators compete visually with stronger legal calculators; keep final-paycheck/PTO/redundancy prominent.
- Severity: Medium. Some result/download labels should say "estimate" consistently, not imply official entitlement.
- Severity: Medium. State tools need clearer "policy controls" warnings where law does not mandate payout.

## 10. Technical SEO And Indexing Issues

Passes:

- `www` redirects to apex.
- HTTPS/HSTS present.
- Sitemap fetched.
- 358 sitemap URLs returned 2xx.
- Sampled pages have titles, descriptions, canonicals, and H1s.
- FAQ detail pages are noindexed.
- Robots allows crawl and references sitemap.

Issues:

- Duplicate sitemap locs: 2.
- Several calculator titles are too generic and should include jurisdiction/year where relevant.
- Some meta descriptions contain stale legal wording.
- State-law pages need stronger unique sourcing to avoid looking programmatic.
- Add CI tests for sitemap uniqueness, metadata presence, and noindex expectations.

## 11. Content Quality And Google Search Review

Page group scores:

- Homepage: Content 80, Trust 75, Ranking potential 72. Clear product, but needs stronger above-fold source proof.
- UK statutory calculators: Content 85, Trust 82, Ranking potential 86. Best part of the site.
- US state-law calculators: Content 74, Trust 58, Ranking potential 85 after source fixes.
- Canada pages/tools: Content 60, Trust 52, Ranking potential 58 until province support is deeper.
- AU tools: Content 70, Trust 70, Ranking potential 68.
- Generic arithmetic calculators: Content 58, Trust 58, Ranking potential 45.
- FAQ detail pages: Correctly noindexed until expanded.

Google-quality risk: the site has enough structure to be useful, but "law-backed" must be earned page-by-page. Unsupported jurisdiction breadth is the main quality threat.

## 12. Legal/Trust/Disclaimer Review

Strengths:

- Privacy, Terms, Disclaimer, Methodology, Editorial Policy, About, Contact pages exist.
- Calculators include estimate/not-advice language.
- Many pages show last-reviewed/source-review style blocks.
- Correction/contact pathway exists.

Gaps:

- No named legal/payroll reviewer profile.
- State-law sources are not exact enough.
- Canada scope disclaimers must be stronger.
- Result panels should say what is included/excluded.
- "Law-backed" should be reserved for calculators with direct primary-source support.

## 13. AdSense Readiness Review

Verdict: wait.

Positive:

- Required policy pages exist.
- Navigation is clear.
- Content is original enough in the sampled pages.
- `ads.txt` exists as a placeholder.
- Consent handling exists in the codebase.

Blockers before applying/serving ads:

- Fix P0 calculation accuracy defect.
- Add state-specific official sources for PTO/final paycheck.
- Replace placeholder `ads.txt` only after a real publisher ID is available.
- Keep AdSense disabled until high-quality pages are live and reviewed.
- Do not place ads inside result panels, source blocks, warning boxes, wage-claim flows, or employer-email templates.

Best future placements:

- Below calculator result area.
- Midway through long guides after primary answer.
- Bottom of FAQs/guides.

Avoid:

- Above primary calculator inputs.
- Near official-source links.
- Near legal warnings/disclaimers.
- Any fake/download-ad adjacency.

## 14. Security And Privacy Review

Pass:

- HTTPS enforced.
- HSTS present.
- X-Frame-Options DENY.
- X-Content-Type-Options nosniff.
- Referrer-Policy strict-origin-when-cross-origin.
- Permissions-Policy restricts sensitive APIs.
- CSP present.

Risks:

- CSP still permits `'unsafe-inline'`.
- `Access-Control-Allow-Origin: *` appears on the homepage response; likely harmless for static public pages but should be intentional.
- AdSense domains are in CSP even while ads should remain gated.
- Payslip/salary tools must keep stating that sensitive pay data is browser-local.

## 15. Competitor Gap Analysis

Government sites: higher authority, weaker UX. My Pay Rights can win by making official rules usable and calculator-driven.

Payroll calculators: stronger tax depth, weaker employment-rights context. My Pay Rights should not compete as a full payroll engine until tax maintenance is airtight.

Employment-law firms: stronger nuance, weaker instant tools. My Pay Rights can win for first-pass estimates and source navigation.

Generic calculator sites: more breadth, weaker sourcing. My Pay Rights should lean hard into official-source proof, last-reviewed dates, and correction policy.

Where the site can win now: UK statutory pay calculators and US final-pay/PTO clusters after source hardening.  
Where it cannot win yet: broad Canada claims and generic tax calculators versus mature providers.

## 16. Top Improvements Required

1. Fix US 2026 federal income-tax brackets.
2. Add state-specific official source URLs to PTO and final-paycheck datasets.
3. Remove or implement unsupported Canada support claims.
4. Fix stale SSP waiting-day/LEL text.
5. Add source/current-rate regression tests.
6. Add sitemap uniqueness test.
7. Add named author/reviewer profiles.
8. Move active jurisdiction source links into result panels.
9. Tighten "law-backed" wording on generic arithmetic calculators.
10. Expand state hubs with examples, official links, and edge cases.

## 17. Must-Fix Before Scaling

- P0 US tax brackets.
- P0 state-law source architecture.
- P0 unsupported jurisdiction labels.
- P1 SSP stale copy cleanup.
- P1 reviewer/trust model.
- P1 automated source freshness checks.
- P2 duplicate sitemap entries.

## 18. Must-Fix Before AdSense

- Fix calculation accuracy defects.
- Fix weak/missing source links on high-risk legal calculators.
- Replace placeholder `ads.txt` with real publisher ID only after account approval.
- Keep ad loading behind readiness and consent.
- Confirm privacy/cookie language covers personalized/non-personalized ads.
- Verify no broken pages and no placeholder content.
- Avoid ads around calculator results, source links, and legal-warning blocks.

## 19. Source Link Improvement Plan

Priority 1: State law tables.

- PTO payout: add official source for all 50 states + DC.
- Final paycheck: add official source for all 50 states + DC.
- State pages: show state labor-agency source near the relevant claim.
- New York PTO calculator: add NY DOL/statute/policy-control source.

Priority 2: Tax and statutory rate tables.

- Add IRS 2026 OBBB source URL to `US_INCOME_TAX`.
- Add tests for bracket thresholds and standard deduction.
- Verify FICA/SSA base source yearly.
- Add annual UK statutory-rate test fixtures.

Priority 3: Canada.

- Add province source tables or narrow federal tools.
- Label federally regulated Canada calculators explicitly.

## 20. Calculator Methodology Improvement Plan

- Classify each calculator as statutory entitlement, policy-dependent legal estimate, tax/withholding estimate, or plain arithmetic.
- Show "included" and "excluded" in every result panel.
- Add one official-source fixture per calculator where an official example exists.
- Add boundary tests for thresholds, caps, rates, dates, and state/country selectors.
- Add PDF text regression tests so stale legal wording cannot remain in downloadable reports.
- Add Playwright no-overflow checks for the calculator template at 320px and 375px.
- Add source URL coverage tests for every legal calculator.

## 21. Final QA Checklist

Completed during this audit:

- Read attached QA brief.
- Fetched live homepage, robots.txt, and sitemap.
- Confirmed `www` -> apex redirect.
- Crawled 358 sitemap URLs: 0 broken; 2 duplicate locs.
- Confirmed sampled pages have titles, meta descriptions, canonicals, and H1s.
- Confirmed 76 noindexed FAQ detail pages.
- Ran live mobile smoke at 320px and 375px: passed on sampled key routes.
- Ran live calculator source-link scan across 32 tool URLs.
- Ran local unit tests: 25 files, 159 tests passed.
- Checked local calculator constants and source architecture.
- Validated high-risk official references for IRS 2026 brackets, GOV.UK SSP, GOV.UK redundancy, California PTO, and California final wages.

Still required for complete legal-grade certification:

- 51-state PTO official source audit.
- 51-state final-paycheck official source audit.
- Canada province-by-province review.
- Full manual browser input matrix for every calculator.
- Accessibility scan with keyboard/focus and screen-reader checks.
- Structured data validation with Google's Rich Results/Test tools.

## 22. Final Verdict

Overall site score: 73/100  
Calculation accuracy score: 74/100  
Source quality score: 66/100  
SEO readiness score: 82/100  
AdSense readiness score: 62/100  
User trust score: 70/100

Top 10 must-fix items:

1. Fix stale 2026 US income-tax brackets.
2. Add exact official state sources for PTO payout.
3. Add exact official state sources for final paycheck deadlines.
4. Remove or implement unsupported Canada claims.
5. Fix stale SSP waiting-day/LEL copy in metadata/PDF/guides.
6. Add named author/reviewer credentials.
7. Add source URL coverage tests for state-law datasets.
8. De-duplicate sitemap URLs.
9. Move active source links beside calculator results.
10. Keep AdSense disabled until the P0/P1 trust issues are fixed.

Ready for Google indexing growth: partially. The UK statutory cluster is ready to grow; US state-law clusters need source hardening first.  
Ready for AdSense: not yet.  
Is "law-backed calculators" currently believable: yes for selected UK statutory calculators; not yet as a whole-site claim.  
What must happen next: fix US tax brackets, harden state-source data, reduce unsupported jurisdiction claims, then rerun full calculator/source/mobile QA before monetization or major SEO scaling.
