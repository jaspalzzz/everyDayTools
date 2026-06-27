# Schema / Structured Data Audit — mypayrights.com

**Audit date:** 2026-06-27  
**Auditor:** Schema.org markup specialist  
**Pages examined:** homepage, /about, /methodology, /faq, /blog/*, /guides/*, /compare/*, all 23 calculator tool pages

---

## 1. Detection Results — What Schema Exists

### Homepage (`/`)
- `WebSite` — present, `@context https://schema.org`, includes `name`, `url`, `description`
- `Organization` — present, `name`, `url`, `logo`, `contactPoint`
- **Missing:** `potentialAction` / `SearchAction` (SiteLinksSearchBox)
- **Missing:** `sameAs` on Organization

### Calculator Tool Pages (`/[slug]` — 23 pages)
- `BreadcrumbList` — present on all 23 pages, `ListItem` positions correct
- `WebApplication` — present on all 23 pages
  - `applicationCategory: FinanceApplication`
  - `featureList` array present
  - `offers` with `priceCurrency` region-mapped (GBP for UK tools, USD for US tools)
  - `publisher` references Organization correctly
- `FAQPage` — present on all 23 pages, 3–6 `Question`/`Answer` pairs per page

### FAQ page (`/faq`)
- `FAQPage` — present (confirmed)
- `BreadcrumbList` — present (confirmed)

### Blog posts (`/blog/*`)
- `Article` — present
  - **Issue:** `author` is typed as `Organization`, not `Person`
  - `publisher` references Organization correctly

### /about, /methodology, /guides/*, /compare/*
- **Zero schema blocks detected** on any of these page types

---

## 2. Validation Results

### WebSite (Homepage)
| Check | Result |
|---|---|
| `@context` is `https://schema.org` | PASS |
| `@type` valid | PASS |
| `name` present | PASS |
| `url` absolute | PASS |
| `potentialAction` / SearchAction | FAIL — absent |
| `sameAs` for entity disambiguation | FAIL — absent |

### Organization (Homepage)
| Check | Result |
|---|---|
| `@context` is `https://schema.org` | PASS |
| `name`, `url`, `logo` present | PASS |
| `logo` is absolute URL | PASS |
| `sameAs` array | FAIL — absent |
| `contactPoint` present | PASS |

### WebApplication (Tool Pages — all 23)
| Check | Result |
|---|---|
| `@context` is `https://schema.org` | PASS |
| `@type: WebApplication` | PASS |
| `name` present | PASS |
| `applicationCategory` present | PASS |
| `offers` with `priceCurrency` | PASS |
| `priceCurrency` ISO 4217 compliant | PASS (GBP, USD) |
| `featureList` present | PASS |
| `publisher` references Organization | PASS |
| `url` absolute | PASS |

### FAQPage (Tool Pages and /faq)
| Check | Result |
|---|---|
| `@context` is `https://schema.org` | PASS |
| `mainEntity` array with `Question` types | PASS |
| `acceptedAnswer` with `Answer` type | PASS |
| `text` on Answer | PASS |
| Google rich result eligibility | INFO — Google retired FAQ rich results for all sites on 2026-05-07; no SERP feature, but markup still aids AI/LLM citation and entity resolution |

### BreadcrumbList (Tool Pages)
| Check | Result |
|---|---|
| `@context` is `https://schema.org` | PASS |
| `ListItem` with `position`, `name`, `item` | PASS |
| `item` URLs absolute | PASS |
| Positions sequential from 1 | PASS |

### Article (Blog Posts)
| Check | Result |
|---|---|
| `@context` is `https://schema.org` | PASS |
| `@type: Article` | PASS |
| `headline` present | PASS |
| `author` present | PASS |
| `author @type` is `Person` | FAIL — typed as `Organization` |
| `datePublished` ISO 8601 | PASS |
| `publisher` references Organization | PASS |
| `image` present | UNCONFIRMED |

---

## 3. Missing Schema Opportunities

### /about page
**Priority: High**  
Zero schema on a page with strong E-E-A-T content (team background, verification process, editorial policy). This is the single biggest gap — Google and AI systems use About pages heavily for entity verification.

Recommended types: `Organization` (expanded with founding date, description, area served) + `AboutPage` (subtype of WebPage).

### /methodology page
**Priority: Medium**  
Editorial methodology pages support E-E-A-T signals. A `WebPage` with `author` referencing the Organization and `about` referencing the site's domain topic would help AI systems verify sourcing.

Recommended types: `WebPage` (with `@type: ["WebPage"]`, `name`, `description`, `author`).

### /guides/* pages
**Priority: High**  
Guide pages are long-form editorial content covering employment law topics (UK unfair dismissal, TUPE, redundancy, etc.). These are strong Article/NewsArticle candidates. Currently carrying zero schema despite being crawlable, indexable content.

Recommended types: `Article` (or `NewsArticle` for time-sensitive regulatory content) with `author` as `Person`, `datePublished`, `dateModified`, `about` with relevant legal topic.

### /compare/* pages
**Priority: Medium**  
Comparison pages covering employment law differences between jurisdictions. These benefit from `WebPage` schema at minimum, and potentially `Table` or `ItemList` if structured comparison data is present.

Recommended types: `WebPage` + optionally `ItemList` for the compared entities.

### Homepage — SearchAction / SiteLinksSearchBox
**Priority: Medium**  
With 23 tools and a search-oriented UX, a `potentialAction` with `SearchAction` on the `WebSite` schema would qualify the homepage for a Google SiteLinks Search Box in SERPs. Currently absent.

### Homepage — ItemList for tools
**Priority: Low**  
An `ItemList` listing the top tools by category would help Google understand the site as an application directory and improve AI summarisation of what the site offers.

### Organization — sameAs
**Priority: Low**  
The `Organization` schema on the homepage has no `sameAs` links. Adding verified social/professional profile URLs (LinkedIn, GitHub) strengthens Knowledge Graph entity resolution and AI citation accuracy.

---

## 4. Generated JSON-LD — Recommended Additions

### 4a. About Page (`/about`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://mypayrights.com/about#webpage",
      "url": "https://mypayrights.com/about",
      "name": "About MyPayRights — Our Team and Methodology",
      "description": "Learn about the team behind MyPayRights, our editorial process, and how we verify statutory pay rates for the UK, US, Canada, and Australia.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://mypayrights.com/#website"
      },
      "about": {
        "@id": "https://mypayrights.com/#organization"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://mypayrights.com/#organization",
      "name": "MyPayRights",
      "url": "https://mypayrights.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mypayrights.com/logo.svg"
      },
      "description": "Free employment pay calculators covering statutory rights for workers in the UK, US, Canada, and Australia.",
      "areaServed": ["GB", "US", "CA", "AU"],
      "sameAs": []
    }
  ]
}
```

### 4b. Methodology Page (`/methodology`)

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mypayrights.com/methodology#webpage",
  "url": "https://mypayrights.com/methodology",
  "name": "Editorial Methodology — How MyPayRights Verifies Statutory Pay Rates",
  "description": "Our process for researching, verifying, and updating employment law data across UK, US, Canada, and Australia.",
  "inLanguage": "en",
  "author": {
    "@id": "https://mypayrights.com/#organization"
  },
  "isPartOf": {
    "@id": "https://mypayrights.com/#website"
  }
}
```

### 4c. Guide Pages (`/guides/[slug]`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://mypayrights.com/guides/[slug]#article",
      "url": "https://mypayrights.com/guides/[slug]",
      "headline": "[Guide Title]",
      "description": "[Guide meta description]",
      "datePublished": "[YYYY-MM-DD]",
      "dateModified": "[YYYY-MM-DD]",
      "inLanguage": "en",
      "author": {
        "@type": "Organization",
        "@id": "https://mypayrights.com/#organization"
      },
      "publisher": {
        "@id": "https://mypayrights.com/#organization"
      },
      "isPartOf": {
        "@id": "https://mypayrights.com/#website"
      },
      "about": {
        "@type": "Thing",
        "name": "[Topic — e.g. Unfair Dismissal UK]"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://mypayrights.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Guides",
          "item": "https://mypayrights.com/guides"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "[Guide Title]",
          "item": "https://mypayrights.com/guides/[slug]"
        }
      ]
    }
  ]
}
```

### 4d. Blog Posts — Fix author type

Replace the current `author` block on `Article` schema from:

```json
"author": {
  "@type": "Organization",
  "name": "MyPayRights"
}
```

With a `Person` type (if a named author exists) or keep `Organization` only if no individual author is credited. Google's Article guidelines strongly prefer `Person` for `author`:

```json
"author": {
  "@type": "Person",
  "name": "[Author Full Name]",
  "url": "https://mypayrights.com/about"
}
```

If content is genuinely institutional (no named author), retain `Organization` but add `@id` referencing the site's Organization node so Google can resolve the entity.

### 4e. Homepage — Add SearchAction to WebSite schema

Add `potentialAction` to the existing `WebSite` block:

```json
"potentialAction": {
  "@type": "SearchAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://mypayrights.com/?q={search_term_string}"
  },
  "query-input": "required name=search_term_string"
}
```

Note: Only implement if the site has a functional search feature at that URL pattern. Do not add if there is no working search endpoint — Google will validate the template.

### 4f. Organization — Add sameAs

Add to the `Organization` block on the homepage:

```json
"sameAs": [
  "https://www.linkedin.com/company/mypayrights",
  "https://github.com/mypayrights"
]
```

Replace placeholder URLs with actual verified profiles only.

---

## 5. Priority Summary

| Finding | Severity | Page(s) | Effort |
|---|---|---|---|
| Guide pages have zero schema | High | /guides/* (multiple pages) | Medium |
| About page has zero schema | High | /about | Low |
| Blog Article author typed as Organization not Person | Medium | /blog/* | Low |
| Methodology page has zero schema | Medium | /methodology | Low |
| Compare pages have zero schema | Medium | /compare/* | Low |
| Homepage missing SearchAction on WebSite | Medium | / | Low |
| Organization missing sameAs | Low | / | Low |
| Homepage missing ItemList for tools | Low | / | Low |
| FAQPage rich results retired (existing markup) | Info | /faq, tool pages | None required — markup aids AI |

---

## 6. What Is Working Well

- WebApplication + BreadcrumbList + FAQPage triple-schema pattern on all 23 tool pages is a strong implementation
- `priceCurrency` is correctly region-mapped (GBP/USD) — a detail many sites miss
- `featureList` array adds semantic richness to WebApplication declarations
- BreadcrumbList `ListItem` positions are sequential and use absolute URLs throughout
- WebSite + Organization on the homepage follows the canonical homepage schema pattern
- No deprecated schema types detected (`HowTo`, `SpecialAnnouncement`, etc. are all absent)
- All `@context` values use `https://schema.org` (not `http`)
- No placeholder text detected in existing schema values
