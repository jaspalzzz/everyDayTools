# Search Experience Optimization Findings — mypayrights-site.pages.dev

Audit date: 2026-06-27

## Search Intent Analysis

### Primary queries this site targets

| Query | Intent | Page Match | Verdict |
|---|---|---|---|
| "redundancy pay calculator uk" | Transactional — instant answer | /redundancy-pay-calculator | ✅ Perfect match |
| "how much redundancy pay am I entitled to" | Informational + Transactional | Same page + FAQs | ✅ Covered |
| "take home pay calculator uk" | Transactional | /take-home-pay-calculator | ✅ Perfect match |
| "uk statutory paternity pay" | Informational | /paternity-pay-calculator | ✅ Good match |
| "unemployment benefits by state" | Informational + Transactional | /unemployment-benefit-calculator | ✅ Good match |
| "how much notice period uk" | Informational | /notice-period-calculator | ✅ Good match |
| "what is IR35" | Informational | /ir35-calculator | ⚠️ Calculator first, explanation secondary |
| "pto payout laws by state" | Informational | /pto-payout-calculator | ⚠️ Partial — tool covers payout but not full law detail |

## ✅ What Works

- Page type matches query intent: all tool pages are transactional/interactive
- FAQs address informational flanking queries on same page
- H1 matches primary query keyword ("Redundancy pay calculator")
- Calculator is above fold — zero scroll to start using tool
- Trust signals: "Verified [date]" citation bar, source links, law citations
- No intrusive pop-ups or newsletter gates

## ⚠️ Findings

### HIGH — Homepage H1 is generic, not keyword-targeted
- Current: "Pay rights calculators that know your country's rules"
- Better: "Free Pay Rights Calculators — UK, US & More" or similar keyword-forward
- Impact: homepage doesn't rank well for "pay rights calculator" or "employment calculator" without a strong H1

### MEDIUM — Tool pages missing internal linking between related tools
- Redundancy pay → no link to Notice Period or Severance
- Take-home pay → no link to IR35 or Self-employment tax
- This is a significant missed signal: Google uses internal links to understand site architecture
- Fix: Add "Related calculators" section at bottom of each tool page

### MEDIUM — No "breadcrumb trail" visible in UI
- BreadcrumbList schema exists but no visible breadcrumb navigation on tool pages
- Visible breadcrumbs improve SERP appearance and user orientation
- Fix: Add `<nav aria-label="Breadcrumb">` with Home → Tool Name links

### LOW — About page not linked from footer prominently
- About is in footer but not in main navigation
- For E-E-A-T, About should be easily accessible
- Current nav: just the logo (home link) in header

### LOW — Homepage only has 1 H2
- "Why use My Pay Rights?" is the only H2
- More H2 sections (grouped by tool category) would improve content hierarchy and internal linking anchor text
