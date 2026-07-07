# MyPayRights SEO, Indexing, AdSense, and Growth Audit

Audit date: 7 July 2026  
Requested site: https://www.mypayrights.com/  
Configured canonical host in code: https://mypayrights.com  
Codebase evidence: static export and audit reports in this repository  
Primary inventory: [seo-url-inventory-2026-07-07.csv](./seo-url-inventory-2026-07-07.csv)

## 1. Executive Summary

MyPayRights is technically close to launch-ready for organic search: the current static audit covers 358 routes with 0 indexability failures and 0 warnings. The site now has canonical tags, index/follow robots directives, sitemap coverage, structured data on major templates, responsive tests, official-source references, legal/editorial trust pages, and AdSense-aware layout controls.

The remaining work is not basic SEO hygiene. It is production hardening and authority building. The biggest risks before Search Console and AdSense submission are:

1. Live production verification must be completed after deploy on the exact canonical host. The code currently canonicalizes to apex `https://mypayrights.com`, so `https://www.mypayrights.com/` must 301 to apex consistently unless the business deliberately changes the canonical policy.
2. E-E-A-T is good for a new site but not yet strong enough for a YMYL-adjacent employment/pay rights site. Add visible reviewer credentials, author bios, legal disclaimer prominence, review history, and source freshness across every calculator and guide.
3. Programmatic expansion must stay controlled. State/province/country pages should continue to include unique rules, official links, calculators, examples, FAQs, and “what to do next” sections. Thin, duplicated location pages would be the fastest way to create a Search Console quality problem.
4. Hreflang is not yet a mature international system. The French Canada pages are a good start, but regional English alternates need a clear policy before scaling.
5. AdSense readiness is strong structurally, but ad placement should remain conservative until traffic and trust stabilize. Do not place ads inside calculators, between form fields, above legal disclaimers, or in source/review-history cards.

Verdict: approve for controlled production deployment after live-host validation. Do not mass-publish more pages until Search Console confirms indexing and no coverage anomalies.

## 2. SEO Scorecard

| Area | Score | Status | Reason |
|---|---:|---|---|
| Technical SEO | 92/100 | Strong | Static export, canonical tags, metadata, sitemap, responsive tests, and clean route audit are in place. Live host validation remains. |
| Indexing and Crawlability | 94/100 | Strong | 358 audited routes, 0 failures, 0 warnings. Sitemap generated from data sources. |
| Sitemap SEO | 88/100 | Strong | All major templates included with priorities and lastmod. Future segmentation needed if routes exceed 500-1,000. |
| Programmatic SEO | 82/100 | Good | Location and FAQ templates are useful, but need ongoing anti-duplication QA. |
| On-Page SEO | 86/100 | Good | Titles/H1/canonicals present. Some pages should gain richer examples and stronger above-fold intent matching. |
| Content Quality | 84/100 | Good | Helpful calculators and official-source references. Add reviewer bios and deeper unique commentary to strategic pages. |
| E-E-A-T | 76/100 | Needs Work | Methodology/editorial pages exist, but visible author/reviewer credentials need strengthening. |
| Source Authority | 85/100 | Good | Official source strategy is strong. Maintain external-link audit due to frequent government URL changes. |
| Schema | 86/100 | Good | WebApplication, FAQPage, Article, Breadcrumb, WebSite, Organization are used. Validate rich-result eligibility after deploy. |
| GEO / AI Search | 80/100 | Good | Clear definitions and source-backed answers help AI search. Need compact answer blocks and citation consistency. |
| Regional SEO | 84/100 | Good | UK/US/CA/AU structure is useful. Local intent pages should include more jurisdiction-specific examples. |
| Hreflang / I18N | 68/100 | Needs Work | French Canada exists, but alternate mapping strategy is incomplete. |
| Image SEO | 74/100 | Needs Work | OG images and icons exist. Add stronger descriptive images only where they help user understanding. |
| SXO / UX | 88/100 | Strong | Search flows, fallback tabs, mobile menu, and responsive issues were addressed. Keep running mobile audits. |
| Internal Linking | 86/100 | Good | Hubs, related tools, guides, FAQs, and source pages interlink. Add more “next step” contextual links. |
| AdSense Readiness | 82/100 | Good | Privacy/terms/disclaimer/editorial policy exist. Avoid aggressive ads and preserve content-first UX. |
| Overall | 85/100 | Production Candidate | Ready for controlled launch, Search Console setup, and AdSense preparation after live validation. |

## 3. Full URL Inventory

The full URL inventory is stored in `docs/seo-url-inventory-2026-07-07.csv`.

Summary from `reports/indexability-audit.json`:

| Page Type | Count |
|---|---:|
| Home | 1 |
| Core country/index/legal pages | 26 |
| Calculator/tool pages | 32 |
| UK guides | 15 |
| Situation pages | 9 |
| French/Canada pages | 4 |
| US state/state-detail pages | 153 |
| Canada province pages | 13 |
| Australia state pages | 8 |
| Comparison pages | 10 |
| FAQ pages | 76 |
| Blog/news pages | 11 |
| Total audited routes | 358 |

Every route in the inventory includes route, full URL, inferred template type, title, canonical, robots directive, JSON-LD count, H1, word count, and minimum word threshold.

## 4. Critical Technical SEO Issues

### Issue 1

Type: Production host and canonical verification gap  
Severity: Critical before launch  
Affected pages: All pages  
Problem: The code/static export passes local audits, but the exact deployed canonical host must be verified in production. The repository currently uses apex `https://mypayrights.com` as canonical and includes redirects from `www` to apex.  
Why it matters: Search Console, AdSense, and Googlebot will judge the live site, not the local export.  
Evidence: Local route audit passes 358 routes, but live `www` access must be checked after deployment.  
Recommended fix: Verify canonical host redirects, status codes, robots.txt, sitemap.xml, and canonical URLs on the production domain. In Search Console, use a Domain property if possible so both apex and `www` are covered.  
Priority: P0  

### Issue 2

Type: E-E-A-T depth  
Severity: High  
Affected pages: Calculators, guides, FAQ pages, blog pages  
Problem: Methodology and editorial policy exist, but YMYL-adjacent pages need stronger visible authorship and review signals.  
Why it matters: Google emphasizes trust for topics that can affect financial stability and welfare.  
Evidence: The site covers pay, employment rights, severance, deductions, overtime, final wages, and legal deadlines.  
Recommended fix: Add reviewed-by blocks, author/reviewer bios, update dates, source-review dates, and credentials to every guide/calculator template.  
Priority: P1  

### Issue 3

Type: Hreflang maturity  
Severity: Medium  
Affected pages: `/fr`, `/fr/ca/*`, future localized pages  
Problem: International alternate mapping is partial.  
Why it matters: Google requires explicit alternate mapping for localized/regional versions. URL structure alone is not enough.  
Evidence: French Canada pages exist, but comprehensive reciprocal hreflang is not yet visible across equivalent page groups.  
Recommended fix: Define localized clusters and add reciprocal `en`, `en-ca`, `fr-ca`, and `x-default` only where real equivalent pages exist.  
Priority: P2  

### Issue 4

Type: External authority link volatility  
Severity: Medium  
Affected pages: Legal source cards and state/province source links  
Problem: Government URLs change frequently and sometimes block crawlers with 403 even when pages are valid for users.  
Why it matters: Broken or stale official links undermine trust and AdSense quality review.  
Evidence: External link audit found no 404 pattern in the fixed source set, but some official sites returned 403.  
Recommended fix: Keep weekly external link audit; for 403-only government sites, store verified manual status and add alternate source where possible.  
Priority: P2  

## 5. Indexing And Crawlability Audit

Status: Pass locally.

Findings:

- 358 static routes audited.
- 0 missing titles.
- 0 missing canonicals.
- 0 canonical mismatches.
- 0 noindex errors.
- 0 missing H1 failures.
- 0 missing required structured data failures.
- `robots.ts` allows all search crawlers and points to `/sitemap.xml`.
- All route templates should remain static-export compatible.

Required live checks:

- `curl -I https://www.mypayrights.com/` should return a 301 to `https://mypayrights.com/` if apex remains canonical.
- `curl -I https://mypayrights.com/` should return 200.
- `curl -I https://www.mypayrights.com/sitemap.xml`
- `curl -I https://www.mypayrights.com/robots.txt`
- `curl -I https://www.mypayrights.com/non-existent-test-url`
- Confirm non-canonical host 301s to the selected canonical host.
- Confirm 404 pages return HTTP 404, not soft-404 200.

## 6. Sitemap SEO Audit

The sitemap is generated in `app/sitemap.ts` from structured data sources:

- `TOOLS`
- `GUIDES`
- `US_STATES`
- `CA_PROVINCES`
- `AU_STATES`
- `COMPARISONS`
- `FAQS`
- `BLOG_POSTS`

Strengths:

- Sitemap is data-driven.
- Country hubs, calculators, guides, situations, state/province pages, comparisons, FAQs, and blog pages are included.
- `lastModified`, `changeFrequency`, and priority are set.

Risks:

- `lastModified` dates should reflect meaningful content/source changes, not cosmetic deploys.
- Once the site grows, split sitemap by template: calculators, guides, US states, Canada provinces, Australia, FAQ, blog.
- Sitemap does not guarantee indexing. Internal linking and page quality still decide discovery and retention.

## 7. Programmatic SEO Strategy

Current model is good: calculators + legal explanations + official sources + regional pages. Continue with a controlled expansion model:

| Cluster | Page Type | Expansion Rule |
|---|---|---|
| US final paycheck | State + final paycheck pages | Include deadline, deductions, penalties, official source, example scenario, calculator CTA. |
| US minimum wage | State minimum wage pages | Include state rate, tip credit, local exceptions where relevant, source date, calculator CTA. |
| Canada termination/severance | Province pages | Include employment standards source, federal/provincial distinction, notice/severance examples. |
| Australia Fair Work | National + state support pages | Keep national law primary; state pages should clarify where state relevance exists. |
| UK statutory rights | Calculator + guide pairs | Each calculator needs a long-form guide, FAQ, source card, and next-action links. |
| Comparisons | Cross-country pages | Use only where user intent is real: notice pay UK vs Australia, final paycheck US vs Canada, PTO vs holiday pay. |

Anti-thin-content rules:

- Minimum target: 700+ useful words for strategic programmatic pages, unless the calculator itself carries the value.
- Every location page must include at least one unique rule, exception, source, example, or next-step module.
- No page should exist only to swap a country/state name.
- Do not create pages for keywords unless the page can answer the query better than the current SERP.

## 8. Keyword And Topic Cluster Strategy

Primary organic clusters:

| Cluster | Intent | Priority Pages |
|---|---|---|
| Redundancy / severance | Calculate owed pay after job loss | `/redundancy-pay-calculator`, `/severance-pay-calculator`, `/au-redundancy-pay-calculator`, `/guides/uk-redundancy-pay` |
| Notice period / notice pay | Understand termination notice and pay in lieu | `/notice-period-calculator`, `/au-notice-period-calculator`, `/employer-notice-pay-calculator`, `/guides/uk-notice-period-law` |
| Final paycheck | Deadline and deductions after leaving | `/final-paycheck-deadline-calculator`, `/us/final-paycheck`, `/us/states/*/final-paycheck` |
| PTO / holiday / annual leave | Accrued leave payout and entitlement | `/pto-payout-calculator`, `/holiday-entitlement-calculator`, `/au-annual-leave-calculator`, `/guides/us-pto-payout-laws-by-state` |
| Overtime and unpaid wages | Missing wages and overtime eligibility | `/take-home-overtime-calculator`, `/us/overtime`, `/payslip-analyser` |
| Family leave pay | Maternity, paternity, adoption, shared parental | `/maternity-pay-calculator`, `/paternity-pay-calculator`, `/adoption-pay-calculator`, `/shared-parental-leave-calculator` |
| Settlement / tribunal | Negotiation and compensation estimates | `/settlement-agreement-calculator`, `/tribunal-compensation-calculator`, `/guides/uk-settlement-agreement` |

Recommended keyword format:

- `[country/state] + [pay right] + calculator`
- `[country/state] + final paycheck deadline`
- `[country/state] + PTO payout laws`
- `[country/state] + notice period`
- `how much [redundancy/severance/holiday/overtime] pay am I owed`
- `[official term] explained plain English`

## 9. Single Page / On-Page SEO Audit

### Home Page

URL: `/`  
Current strengths: Strong H1, calculator-led intent, country tabs, search flow, structured data.  
Recommended changes: Add a compact “popular problems” internal-link block above the fold on mobile after the search form. Keep the exact-match search direct-jump behavior.  
Priority: P1

### Calculator Pages

Representative URLs: `/redundancy-pay-calculator`, `/notice-period-calculator`, `/pto-payout-calculator`, `/au-annual-leave-calculator`  
Current strengths: WebApplication schema, FAQ schema, legal-source blocks, review history, calculator UX.  
Recommended changes: Add visible “Reviewed by / last source checked” blocks and one worked example per calculator.  
Priority: P1

### Guide Pages

Representative URLs: `/guides/uk-redundancy-pay`, `/guides/uk-notice-period-law`, `/guides/us-pto-payout-laws-by-state`  
Current strengths: Article schema, byline strategy, clear guide intent.  
Recommended changes: Add table of contents, author/reviewer cards, and “calculator next” CTA after the first answer section.  
Priority: P1

### US State Pages

Representative URLs: `/us/states/california`, `/us/states/new-york/final-paycheck`, `/us/states/texas/minimum-wage`  
Current strengths: Massive long-tail opportunity and source-backed data.  
Recommended changes: Add more unique examples and penalty/exception notes for high-demand states first.  
Priority: P1

### FAQ Pages

Representative URLs: `/faq/*`  
Current strengths: 76 indexed answer pages, good support for long-tail informational intent.  
Recommended changes: Ensure each FAQ links to one best calculator, one guide, and one official source or methodology page. Avoid isolated answer pages.  
Priority: P2

## 10. E-E-A-T SEO Audit

Current trust assets:

- `/about`
- `/contact`
- `/methodology`
- `/editorial-policy`
- `/privacy`
- `/terms`
- `/disclaimer`
- Official source cards on calculators
- Review history blocks
- Correction path messaging

Required upgrades:

- Add author pages or author sections with named expertise.
- Add reviewer identity and role for employment/pay content.
- Add “source last checked” dates on all calculators and guides.
- Link every legal/source card to methodology.
- Add a consistent warning: estimates are informational, not legal advice.
- Keep correction email visible.
- Build citations from official source names, not vague “government guidance.”

## 11. Source Link And Authority Strategy

The source strategy is one of the site’s biggest strengths. Official sources should be treated as product data, not casual outbound links.

Rules:

- Every calculator must have at least one primary legal/source card.
- Every source link must be audited before deploy.
- Store source title, jurisdiction, source type, URL, verified date, and fallback URL.
- If a government URL returns 403 to automated checks but opens in browser, mark as “manual verified” and add an alternate supporting source.
- Never link to unofficial legal blogs as primary authority for statutory calculations.

External link audit:

- Current saved audit: `reports/external-link-audit.json`
- Status: no known repeated 404 pattern after fixes.
- Known behavior: some official government sites return 403 to automated crawlers; treat separately from broken URLs.

## 12. Schema SEO Audit

Current schema types detected in code:

- `WebSite`
- `Organization`
- `WebApplication`
- `FAQPage`
- `BreadcrumbList`
- `Article`
- `WebPage`
- `ItemList`
- `ContactPage`

Schema strengths:

- Calculator pages use WebApplication schema.
- Guides and blogs use Article schema.
- FAQ pages use FAQPage where visible FAQ content exists.
- Homepage has WebSite and Organization schema.

Schema risks:

- Google requires structured data to match visible page content.
- Do not mark up hidden or misleading content.
- FAQ rich results are not guaranteed and should not be the only reason FAQ pages exist.

Next validation:

- Run Google Rich Results Test on top 20 templates after deployment.
- Add Organization `sameAs` only after official social/profile pages exist.
- Add `reviewedBy` style metadata in visible content before expanding schema claims.

## 13. GEO / AI Search SEO Strategy

AI search eligibility starts with ordinary Google eligibility: pages must be indexed and eligible for snippets. There are no special technical requirements beyond the normal Search technical requirements, but the content must be easy to quote and trust.

Actions:

- Add concise answer blocks near the top of guides: “Short answer”, “What this means”, “Next step”.
- Use direct, source-backed definitions for legal/pay terms.
- Add tables for rates, deadlines, and exceptions.
- Keep official source names close to claims.
- Add examples with inputs and outputs for calculators.
- Avoid generic introductions that delay the answer on mobile.

## 14. Local / Regional SEO Strategy

This is not a local business SEO site; it is regional legal/pay intent. Optimize by jurisdiction, not by map-pack signals.

Recommendations:

- Keep `/uk`, `/us`, `/ca`, `/au` as country hubs.
- Use `/us/states/[state]` and subpages for state-specific law.
- Use `/ca/provinces/[province]` for province-specific standards.
- Use `/au/states/[state]` carefully because many Fair Work rules are national.
- Add internal links from each regional page to the most relevant calculator.
- Add “applies to” and “does not apply to” sections to prevent user confusion.

## 15. Hreflang / I18N SEO Strategy

Do not add hreflang at scale until equivalent localized pages exist.

Recommended policy:

- English country hubs can use regional targeting if equivalent pages exist: `en-gb`, `en-us`, `en-ca`, `en-au`.
- French Canada pages should use `fr-ca`.
- Add `x-default` to the country/language selector page or homepage.
- Every hreflang cluster must be reciprocal.
- Do not map non-equivalent pages just because topics are related.

Near-term implementation:

- Cluster `/ca` and `/fr` only if `/fr` is intended as the French Canada landing page equivalent.
- Cluster `/fr/ca/preavis` with its English Canada notice equivalent only after the English equivalent is a true same-intent page.

## 16. Image SEO And Asset Optimization

Current position:

- The site is primarily calculator/content led.
- OG images and icon assets exist for sharing.
- Image SEO is not the main traffic lever, but image quality still affects page experience and social snippets.

Actions:

- Keep every meaningful image with descriptive `alt`.
- Avoid decorative images that slow mobile.
- Use `next/image` or optimized static assets for large images.
- Add unique OG images for top calculators and guides.
- Use real explanatory visuals only where they help: timelines, pay breakdowns, jurisdiction maps, and example payslip diagrams.

## 17. SXO / Search Experience Optimization

SXO goal: user should land, identify country/topic, calculate or read, and know the next step without feeling lost.

Already improved:

- Homepage search direct-jumps exact calculator matches.
- Unknown search fallback scrolls to the tabs section so users see options.
- Mobile menu behavior was fixed for scrolled pages.
- Overflow issues were audited and fixed.
- Guide card spacing was fixed.

Next UX actions:

- Add “recommended next step” after every calculator result.
- Keep mobile form buttons visible above the fold where possible.
- Add sticky mini-nav only if it does not obscure content.
- Keep calculator inputs compact and one-column on small screens.
- Continue running 320px, 375px, 768px viewport audits before every deploy.

## 18. Content Quality Audit

Content strengths:

- Site has a clear purpose: pay rights calculators and plain-English employment guidance.
- The pages help users complete a task, not just read.
- Official sources and methodology improve trust.
- Route coverage supports major employment-pay problems.

Thin-content risks:

- Some programmatic pages may feel similar if source data is sparse.
- FAQ pages can become thin if they only answer one narrow question without next steps.
- Blog/news pages must not become generic “updates” without calculator/guide linkage.

Quality rules:

- Every page should answer: what rule applies, what user should check, what source supports it, what calculator/tool is next.
- Avoid content that only summarizes official pages. Add practical interpretation and examples.
- Do not create content only because a keyword has volume.

## 19. Internal Linking Strategy

Core internal-link graph:

- Home -> country hubs -> calculators/guides/state pages
- Calculator -> guide -> official source -> related calculators
- Guide -> calculator -> FAQ -> situation page
- State/province -> local calculator/context -> national hub
- Blog -> calculator or guide, not isolated news consumption

Recommendations:

- Add 3-5 contextual internal links in each guide body.
- Add a “Use this calculator next” block near the top of every guide.
- Add “Related official source” and “Related FAQ” blocks to calculator pages.
- Add breadcrumbs everywhere, including programmatic pages.
- Ensure footer links include key trust pages and country hubs.

## 20. Competitor And SERP Gap Analysis

Likely competitors by cluster:

- Official government sites: GOV.UK, DOL, Fair Work Ombudsman, Canada.ca
- Payroll platforms: ADP, Gusto, PayFit, BrightHR-style content
- Legal publishers and employment-law firms
- Calculator-only sites

SERP gap opportunity:

- Government pages are authoritative but often hard to read and not calculator-led.
- Legal firms are detailed but often not neutral or calculator-first.
- Payroll vendors explain concepts but may not cover multi-country edge cases.
- MyPayRights can win by combining official-source trust, calculators, plain English, and country/state specificity.

SERP feature targets:

- Featured snippets for definitions and deadlines.
- People Also Ask via concise FAQ blocks.
- Sitelinks from clear hub architecture.
- AI Overview citations via source-backed answer blocks.

## 21. AdSense + SEO Alignment

Current readiness:

- Privacy, terms, disclaimer, contact, about, methodology, and editorial policy pages exist.
- Content has a clear user purpose.
- Calculators provide original utility.
- The editorial policy already separates content decisions from advertising.

AdSense risk controls:

- Do not show ads before the primary calculator on mobile.
- Do not put ads between input labels and fields.
- Do not place ads inside result cards.
- Do not use sticky bottom ads on small screens until usability is proven.
- Keep disclaimers and source links visible.
- Avoid thin auto-generated pages.
- Keep navigation and search usable without ad obstruction.

Pre-AdSense checklist:

- Verify ownership in Search Console.
- Submit sitemap.
- Confirm all policy pages are linked sitewide.
- Confirm no broken source links.
- Confirm no placeholder/dev text.
- Confirm no intrusive ad layout in production.

## 22. Implementation Roadmap

### Week 0: Launch Gate

- Deploy to production.
- Verify host redirects and canonical domain.
- Verify sitemap and robots on live host.
- Run live URL Inspection for home, one calculator, one guide, one state page, one FAQ.
- Submit sitemap in Search Console.
- Run Rich Results Test on key templates.

### Week 1: Trust Hardening

- Add reviewer/author blocks to calculator and guide templates.
- Add source last-checked dates.
- Add worked examples to top calculators.
- Add visible correction path to more pages.

### Weeks 2-4: Content Expansion

- Strengthen top 20 pages by search intent.
- Improve US state final paycheck pages for top states.
- Improve Canada province termination/severance coverage.
- Add comparison pages only where intent is clear.

### Month 2: Authority and Analytics

- Review Search Console indexing data.
- Fix discovered crawl/index anomalies.
- Build digital PR around original calculators and datasets.
- Add high-quality backlinks from HR, payroll, legal education, and small business resources.

## 23. Top 50 SEO Actions

1. Verify `www` and non-`www` canonical redirect behavior.
2. Verify live `/robots.txt`.
3. Verify live `/sitemap.xml`.
4. Submit sitemap to Search Console.
5. Inspect 10 representative URLs in Search Console.
6. Confirm 404 pages return HTTP 404.
7. Confirm no soft 404 on thin/error pages.
8. Run `npm run audit:indexability` before every deploy.
9. Run `npm run audit:responsive` before every deploy.
10. Run `npm run audit:external-links` weekly.
11. Add visible reviewed-by blocks to calculator templates.
12. Add author/reviewer bio pages or sections.
13. Add source last-checked dates to all calculators.
14. Add worked examples to top 10 calculators.
15. Add source summaries that explain why each official source matters.
16. Add table of contents to long guides.
17. Add “calculator next” CTAs near top of guides.
18. Add internal links from FAQ pages to calculators.
19. Add internal links from blog pages to calculators.
20. Add “applies to / does not apply to” blocks to regional pages.
21. Strengthen top US state final paycheck pages.
22. Strengthen top US PTO payout pages.
23. Strengthen Canada province severance pages.
24. Strengthen Australia annual leave and notice pages.
25. Keep Australia state pages national-law-aware to avoid misleading local targeting.
26. Validate structured data with Rich Results Test.
27. Keep FAQ schema only where FAQ content is visible.
28. Avoid review/rating schema unless real user reviews exist.
29. Define hreflang policy before adding more locales.
30. Add reciprocal hreflang only for true equivalent pages.
31. Add x-default only to a suitable selector/default page.
32. Optimize OG images for top calculators.
33. Add descriptive alt text to meaningful visuals.
34. Avoid decorative media that slows mobile.
35. Check Core Web Vitals after deploy.
36. Keep calculator result pages/snippets indexable only if they are not user-specific generated URLs.
37. Do not create query-parameter indexable variants.
38. Add sitemap segmentation when route count grows.
39. Keep lastmod dates tied to meaningful updates.
40. Add source fallback URLs for volatile government pages.
41. Keep correction email visible.
42. Keep editorial policy linked in footer.
43. Keep methodology linked from source cards.
44. Keep legal disclaimer visible but not alarming.
45. Avoid ads above primary calculator forms.
46. Avoid ads inside forms/results.
47. Keep mobile hamburger/menu tested on scrolled pages.
48. Keep 320px viewport overflow tests.
49. Track Search Console queries by cluster weekly.
50. Pause programmatic expansion if indexed/page-quality ratios drop.

## 24. Final Verdict

MyPayRights is a strong production candidate for SEO and AdSense preparation. The technical foundation is now much stronger than a typical new content site: 358 routes pass indexability audit, the sitemap is generated from structured data, the site has calculator-led utility, and the content model is anchored to official sources.

The site should not be treated as “finished.” It should launch with a strict QA loop: live-host checks, Search Console inspection, weekly external-link audits, monthly content/source reviews, and careful programmatic expansion. If that operating discipline is followed, the site has a realistic path to organic growth because it solves high-intent problems better than generic blog content.

## Official Guidance Used

- Google Search Central: [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Google Search Central: [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- Google Search Central: [Structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- Google Search Central: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Google Search Central: [Localized versions and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Google Search Central: [Image SEO best practices](https://developers.google.com/search/docs/appearance/google-images)
- Google AdSense Help: [Eligibility requirements](https://support.google.com/adsense/answer/9724)
