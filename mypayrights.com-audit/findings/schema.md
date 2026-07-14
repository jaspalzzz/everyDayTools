# Schema.org / Structured Data Audit — mypayrights.com

**Score: 80/100** (prior audit 2026-07-08: 85/100 — see "Delta from prior audit" below)

Pages sampled live (raw HTML, non-SPA, JSON-LD fully server-rendered — confirmed no client-injection gap): homepage, `/redundancy-pay-calculator`, `/us/states/california`, `/blog/uk-redundancy-pay-guide-2026`, `/faq/what-is-tupe-transfer`, `/compare/pilon-vs-garden-leave`, `/guides`, `/about`. Also ran `node scripts/score-schema-seo.mjs` against the full static `out/` export (411 sitemap URLs) for site-wide coverage.

## What Works

- **JSON-LD used exclusively** (no Microdata/RDFa), `@context: "https://schema.org"` (https, correct) on every block checked, all URLs absolute, all dates ISO 8601 (`YYYY-MM-DD`) — no placeholder text anywhere.
- **100% JSON-LD coverage across the site**: `node scripts/score-schema-seo.mjs` confirms all 411 sitemap URLs have parseable JSON-LD, zero parse errors, expected types present per page-type pattern (raw score 100/100 — see caveat below on what this script does *not* check).
- **Homepage**: `WebSite` (with `SearchAction`) + `Organization` (name, url, logo as ImageObject, founder as Person, contactPoint, areaServed for all 4 markets) both present and valid.
- **Calculator pages**: `WebApplication` with `applicationCategory`, `offers` (price/currency correctly localized — GBP confirmed on the UK redundancy calculator), `isAccessibleForFree: true`, `featureList`, plus `maintainer` pointing at a real editorial-policy page.
- **BreadcrumbList** present and correct (2+ `ListItem`s, sequential `position`, absolute `item` URLs) on every deep page sampled: calculator, state page, blog post, FAQ page, compare page, guides hub.
- **Article/BlogPosting-style schema** (blog posts, FAQ detail pages, compare pages) consistently includes real named `author` (Person: Jaspal Singh, Founder — not a fabricated "editorial team"), `reviewedBy` (Organization), `datePublished`/`dateModified` — genuine E-E-A-T signal, not boilerplate.
- **State pages** carry a well-formed `WebPage` schema (`about`, `areaServed` as `State`, `dateModified`, `author`, `reviewedBy`, `publisher`) plus a multi-question `FAQPage` (5 real, state-specific Q&As on the California page, not templated filler).
- No deprecated schema types in active use for rich results (no HowTo, no SpecialAnnouncement, no CourseInfo/EstimatedSalary/LearningVideo).

## Delta from prior audit (2026-07-08, scored 85/100)

The prior pass reviewed schema in source but flagged "not run through Google's Rich Results Test" as its one open item. This pass did a field-by-field validation against Google's actual Article requirements and cross-template consistency, which surfaced two real, previously-uncaught defects (missing `image` on Article schema; publisher name inconsistency) that the repo's own `score-schema-seo.mjs` doesn't check for — hence the score moving from 85 to 80 despite no regressions in what was previously checked. This is a detection improvement, not a site regression.

## Findings

1. **Title:** Article/BlogPosting schema is missing the `image` property (Google-required)
   **Severity:** High
   **Description:** None of the `Article` blocks sampled (blog post, FAQ-as-Article, compare page) include an `image` field. Google's Article structured-data documentation lists `image` as a **required** property (alongside `headline`, `author`, `datePublished`, `dateModified`) for Article rich-result/Google Discover eligibility — this is independent of the FAQPage rich-result retirement. The gap traces to the site's deliberate all-SVG/zero-raster-image build (noted in the prior audit), so there was no obvious image asset to reference. However, the site already generates a valid 1200×630 OG/Twitter image per route (`/redundancy-pay-calculator/opengraph-image` is confirmed live; blog/faq/compare pages currently fall back to one generic sitewide `/twitter-image`, and have no per-page `og:image` at all — a related gap outside schema scope worth flagging to the on-page SEO track).
   **Recommendation:** Add `"image"` to every `Article`/`BlogPosting` JSON-LD block, pointing at the existing per-route `opengraph-image` endpoint (generate one per blog/faq/compare page the same way the calculator pages already do, rather than reusing the generic sitewide fallback). Minimum viable fix: reference the generic `https://mypayrights.com/opengraph-image` site-wide image now, then follow up with true per-page OG images.

2. **Title:** Inconsistent publisher entity name across templates ("My Pay Rights" vs "MyPayRights")
   **Severity:** Medium
   **Description:** Homepage `Organization`, blog posts (`app/blog/[slug]/page.tsx`, uses `SITE.name`), and state pages render `publisher.name` as `"My Pay Rights"` (with space, matching the canonical brand name). But 14+ templates — every `/faq/[slug]`, `/compare/[slug]`, all `/guides/*` pages, and both `/us/states/[state]/minimum-wage` and `/final-paycheck` — hardcode `publisher.name: "MyPayRights"` (no space) instead of using the shared `SITE.name` constant. Inconsistent entity naming across a large share of the site's structured data weakens entity resolution for Google's Knowledge Graph and for AI answer engines trying to confirm this is a single, consistent publisher.
   **Recommendation:** Replace the 14 hardcoded `"MyPayRights"` string literals with the shared `SITE.name` constant (already correctly used in `app/blog/[slug]/page.tsx`) so every template emits the identical canonical name. Small, mechanical, low-risk fix — grep for `name: "MyPayRights"` across `app/`.

3. **Title:** `publisher` on Article schema lacks `logo` (Google-recommended)
   **Severity:** Low
   **Description:** Every `Article`/`BlogPosting` publisher object contains only `name` and `url` — no `logo` ImageObject. The homepage `Organization` block does define a proper logo (`https://mypayrights.com/logo-mark.svg`, 64×64), so the asset already exists; it's just not referenced from the Article-level publisher object.
   **Recommendation:** Add `logo: { "@type": "ImageObject", "url": "https://mypayrights.com/logo-mark.svg", "width": 64, "height": 64 }` to the `publisher` object wherever it appears on Article-type schema, matching the homepage Organization block.

4. **Title:** `FAQPage` present sitewide (370 instances) — no Google SERP benefit as of May 7, 2026, but keep as-is
   **Severity:** Info
   **Description:** Google fully retired FAQ rich results for all sites on May 7, 2026 (superseding the Aug 2023 gov/health-only restriction). The site's 370 `FAQPage` blocks (calculator pages, state pages, `/faq/[slug]`, `/compare/[slug]`) no longer produce any SERP rich-result feature. This is a policy change external to the site, not a defect. These FAQ pages are editorially authored (not user-submitted community Q&A), so `QAPage` is not a better fit — `FAQPage` remains the schematically correct type; it simply carries no more rich-result weight. Markup should be retained because AI Overviews/AI Mode still use structured Q&A data for entity resolution and claim verification during answer synthesis, giving it ongoing AI-citation value.
   **Recommendation:** No action needed. Do not remove existing FAQPage markup. Do not add new FAQPage schema anywhere expecting a Google SERP benefit — treat any future additions purely as an AI/GEO-visibility play.

5. **Title:** `Dataset` schema on `/research/us-final-paycheck-laws` has lost its rich-result surface
   **Severity:** Info
   **Description:** Google discontinued the Dataset Search feature in late 2025, so `Dataset`-typed structured data (found on this one page) no longer drives any dedicated rich-result/search surface. The schema itself is valid (`schema.org` still recognizes the type) and does no harm; it may still carry some AI-citation/entity value.
   **Recommendation:** No urgent action. Optionally supplement with (not replace by) a `Article`/`WebPage` type on the same page for continued conventional SEO value, since `Dataset` alone no longer buys any Google-side visibility.

6. **Title:** Stale year reference embedded inside FAQPage answer text on the California state page
   **Severity:** Low
   **Description:** The California state page's `FAQPage` (`dateModified: 2026-07-09`) contains a Q&A pair titled "What is the minimum wage in California in 2025?" — the question and part of the answer text still reference 2025 even though the page was modified in July 2026. This is a content-accuracy issue surfaced through structured-data review: AI answer engines may cite the FAQPage answer text verbatim, so a stale year reference inside the schema itself (not just prose) can propagate an outdated claim.
   **Recommendation:** Update the question/answer text to reference the current year (or drop the year from the question wording entirely and let `dateModified` carry the freshness signal), and spot-check other state-page FAQ answers for the same pattern of a hardcoded year that predates `dateModified`.

## Other minor/optional notes
- `Organization` (homepage) has no `sameAs` (social profile links) — optional property, not required for any rich result; add only if the brand has active social profiles worth linking.
- `WebApplication` publisher object (`{"name": "My Pay Rights"}`, no `url`) is less complete than the `Organization`/`Article` publisher objects elsewhere — minor consistency nit, bundle with Finding 2's cleanup pass.
