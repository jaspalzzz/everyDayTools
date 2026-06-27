# Content Quality Findings — mypayrights-site.pages.dev

Audit date: 2026-06-27

## ✅ What Works

- All 23 tool pages have substantive content blocks (1,600–2,980 words total page)
- Answer-first structure: H1 → calculator → content block → FAQs
- FAQs on every tool page (3–6 questions each)
- About page has E-E-A-T sections: "How we verify the rates", "Who built this"
- All descriptions are unique and keyword-relevant
- Statutory rates cited with effective dates on every page
- llms.txt present and comprehensive — all 23 tools described with URLs

## Word Count by Page (estimated total including UI labels)

| Page | Est. Content Words | Assessment |
|---|---|---|
| ir35-calculator | 2,979 | ✅ Excellent |
| self-employment-tax-calculator | 2,764 | ✅ Excellent |
| day-rate-calculator | 2,736 | ✅ Excellent |
| take-home-pay-calculator | 2,901 | ✅ Excellent |
| unemployment-benefit-calculator | 2,403 | ✅ Good |
| final-paycheck-deadline-calculator | 2,461 | ✅ Good |
| pto-payout-calculator | 2,364 | ✅ Good |
| statutory-sick-pay-calculator | 2,360 | ✅ Good |
| bonus-tax-calculator | 2,327 | ✅ Good |
| redundancy-pay-calculator | 2,312 | ✅ Good |
| notice-period-calculator | 2,285 | ✅ Good |
| take-home-overtime-calculator | 2,269 | ✅ Good |
| holiday-entitlement-calculator | 2,272 | ✅ Good |
| maternity-pay-calculator | 2,232 | ✅ Good |
| severance-pay-calculator | 2,198 | ✅ Good |
| salary-to-hourly-calculator | 2,197 | ✅ Good |
| pay-rise-calculator | 2,190 | ✅ Good |
| garden-leave-calculator | 2,139 | ✅ Good |
| pro-rata-salary-calculator | 2,045 | ✅ Good |
| working-days-calculator | 1,927 | ✅ Adequate |
| paternity-pay-calculator | 1,627 | ⚠️ Borderline thin |
| shared-parental-leave-calculator | 1,635 | ⚠️ Borderline thin |
| adoption-pay-calculator | 1,622 | ⚠️ Borderline thin |

## ⚠️ Findings

### MEDIUM — Three leave calculators are borderline thin (~1,600 words)
- Paternity, adoption, and shared parental leave pages are at the lower edge
- These are competitive terms; 600–800 more words would help
- Recommendation: expand content blocks with qualification criteria, worked examples, and HMRC reclaim guidance

### MEDIUM — Homepage word count low (1,188 words)
- Homepage serves primarily as a navigation hub but could benefit from more editorial content
- Currently has one H2 ("Why use My Pay Rights?") with a feature strip
- Consider adding a "How it works" section or an intro paragraph about employment law complexity

### LOW — About page has no FAQ schema or structured data
- 884 words with good E-E-A-T content but no JSON-LD
- No Organization or WebPage schema
- Fix: Add `WebPage` + `Organization` schema to about page

### INFO — llms.txt is comprehensive
- All 23 calculators listed with URLs and descriptions
- Covers UK/US/CA/AU jurisdictions
- Good AI citation signal
