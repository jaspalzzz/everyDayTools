# MyPayRights.com — SEO Action Plan

Derived from `FULL-AUDIT-REPORT.md`. Priority definitions: **Critical** = blocks indexing/causes penalties (fix immediately) · **High** = significantly impacts rankings (within 1 week) · **Medium** = optimization opportunity (within 1 month) · **Low** = backlog.

---

## Phase 1 — Critical Fixes (Week 1)

**None outstanding.** The critical/high-severity issues found during this session's broader correctness work have already been fixed and pushed to `main`:

| Issue | Status |
|---|---|
| Unfair dismissal compensatory award cap stale by 2 years (£115,115 → correct £123,543) | ✅ Fixed |
| UK Vento injury-to-feelings bands stale in two different wrong versions across pages | ✅ Fixed |
| Class 4 National Insurance rate wrong in page copy (said 9%, engine correctly used 6%) | ✅ Fixed |
| Two dead source links (`gov.uk/giving-staff-notice-pay`, `acas.org.uk/garden-leave`) | ✅ Fixed |
| AdSense script lost consent + readiness gating in a refactor — script would load for every visitor regardless of cookie consent | ✅ Fixed |
| Mobile: review-history rows overflowing the viewport, homepage situation cards leaving a dangling gap | ✅ Fixed |
| Desktop nav dropdowns non-functional on touch devices (hover-only); once fixed, got stuck open with no close path | ✅ Fixed |

---

## Phase 2 — High-Impact Improvements (Weeks 2-3)

- [x] **Run a real PageSpeed Insights / Lighthouse pass.** Done — Lighthouse doesn't reach this environment as a hosted service, but the CLI runs locally against the actual production static build (not dev mode, not inferred). Ran it against the homepage, a calculator page, and a state page: **Performance 98-99, Accessibility 100, Best Practices 100, SEO 100** on every page tested. LCP 2.2-2.3s, CLS 0, TBT 20-30ms. This replaces the earlier "inferred, not measured" caveat with real lab data. *(commit `1143f3a`)* Real CrUX field data (from actual user traffic) is still a separate, later step once the site has traffic.
- [x] **Validate JSON-LD via Google's Rich Results Test.** The live hosted tool wasn't run, but direct source review caught two real, concrete schema defects instead: (1) the homepage's `SearchAction` schema claimed a `?q=` search capability the code never implemented — fixed and verified live; (2) `Organization.sameAs` pointed to a GitHub code repo instead of a brand/social profile — removed. *(commit `6e45eda`)*

## Phase 3 — Content & Authority (Month 2)

- [x] **Sharpen sitemap `lastmod` precision for US state pages.** Done — added an honest per-record `lastContentUpdate` field, populated only where content genuinely changed (the 4 states that got new `localContext` paragraphs), falling back to the existing shared date everywhere else rather than fabricating precision that doesn't exist. Verified in the built `sitemap.xml`: California shows the real edit date, Alabama (untouched) still shows the honest shared date. *(commit `1143f3a`)*
- [x] **Continue the official-source re-verification sweep.** Done for the listed calculators (day rate, pro-rata salary, salary-to-hourly, pay rise, garden leave, working days, payslip analyser, IR35, AU annual leave/notice/redundancy) — read each engine's hardcoded assumptions and cross-checked every statutory figure against a live official source (GOV.UK, HMRC, IRS, SSA, Fair Work Act text). Found and fixed two real, material staleness bugs:
  - `lib/rates.ts` `US_INCOME_TAX.brackets` were labelled "2026" but were actually the 2025 thresholds — confirmed against the IRS's own Rev. Proc. 2025-32 announcement and corrected. This affected every US calculator that imports the shared rate (IR35/1099 comparison, bonus tax, take-home pay, unemployment, self-employment tax). *(commit `d3e96c9`)*
  - `payslipAnalyser.ts`'s student loan Plan 1/2/4 repayment thresholds had drifted (Plan 1 £22,015→£26,900, Plan 2 £27,295→£29,385, Plan 4 £27,660→£33,795) — confirmed live against GOV.UK and corrected. *(commit `f7f268d`)*
  - Everything else checked (UK redundancy cap, SSP, SMP, NI rates, pension auto-enrolment band, SSA wage base, Fair Work Act NES tables for AU leave/notice/redundancy) verified as already correct — no change needed.
  - Known gap, spawned as a separate task rather than blocking this sweep: the payslip analyser doesn't yet recognise Plan 5 student loans (new since August 2023 courses).
- [x] **(Not originally planned, done anyway)** Addressed the separate `PROGRAMMATIC-SEO-REPORT.md` findings: added a `region` field + "Compare nearby states" cross-linking to all 153 US state pages, and genuine distinguishing content to the four highest-traffic states (CA, TX, NY, FL). *(commit `11a3809`)*

## Phase 4 — Monitoring & Iteration (Ongoing)

- [x] **Re-check the AdSense consent gate after any future refactor.** It broke silently a second time this session (different commit, same root cause), was caught and fixed again, and this time got the actual automated guard: `test/AdSenseScript.test.tsx`, 5 tests covering every ready/consent/revoked combination, running in the normal test suite so a future refactor breaks CI instead of shipping silently. *(commit `1143f3a`)*
- [ ] **Re-run this audit quarterly** — not yet applicable, too soon; this is a standing recurring task, not a one-time fix.
- [ ] **Once real traffic and Search Console access exist**, re-audit with real indexation/click/impression/CrUX data — still blocked on access, not on anything actionable today.

---

## What This Plan Deliberately Does Not Include

No backlink-building tasks, no keyword-targeting changes, and no content-volume recommendations. This audit found a technically sound, well-sourced, actively-maintained site — the highest-leverage next step is closing the **measurement gap** (real performance and search-console data), not adding more surface area before the current surface area is verified end-to-end.
