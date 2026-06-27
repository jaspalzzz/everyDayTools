# Schema / Structured Data Findings — mypayrights-site.pages.dev

Audit date: 2026-06-27

## ✅ What Works

- All 23 tool pages implement three JSON-LD schemas:
  - `BreadcrumbList` (with correct ListItem positions)
  - `WebApplication` (applicationCategory: FinanceApplication, featureList, offers with correct priceCurrency per region)
  - `FAQPage` (3–6 questions per page)
- Homepage implements `WebSite` + `Organization` with contactPoint
- `priceCurrency` correctly mapped per region: UK→GBP, US→USD
- `featureList` array present on all WebApplication schemas
- `publisher` correctly references Organization on all tools

## ⚠️ Findings

### HIGH — About page has no JSON-LD
- Evidence: 0 schema blocks found on `/about`
- Impact: Missed opportunity for Organization and WebPage rich results
- Fix: Add `<script type="application/ld+json">` with Organization + WebPage schema to `app/about/page.tsx`

### MEDIUM — Homepage missing `WebApplication` schema
- The homepage has WebSite + Organization but no aggregate WebApplication or ItemList schema
- Impact: Missed opportunity for Google to understand the site as an application hub
- Fix: Add `ItemList` schema pointing to top 5 tools, or a `WebApplication` for the site

### MEDIUM — No `SiteLinksSearchBox` schema on homepage
- With 23 tools, a SearchAction/SiteLinksSearchBox could improve SERP appearance
- Current WebSite schema doesn't include `potentialAction`

### LOW — Privacy/Terms/Disclaimer pages: no schema
- These support pages have no structured data
- Low priority; Google handles these fine without schema

### INFO — Schema validation
- No schema validation errors detected via regex parse
- All @type values are valid Schema.org types
- priceCurrency uses correct ISO 4217 codes (GBP, USD)
