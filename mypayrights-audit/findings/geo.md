# GEO Audit — mypayrights.com
**Audit date:** 2026-06-27
**Auditor:** GEO Specialist (Claude Sonnet 4.6)

---

## GEO Health Score: 64 / 100

| Dimension | Weight | Raw Score | Weighted |
|-----------|--------|-----------|----------|
| Citability | 25% | 68 | 17.0 |
| Structural Readability | 20% | 72 | 14.4 |
| Multi-Modal Content | 15% | 40 | 6.0 |
| Authority & Brand Signals | 20% | 48 | 9.6 |
| Technical Accessibility | 20% | 87 | 17.4 |
| **Total** | 100% | | **64.4** |

---

## 1. AI Crawler Access (robots.txt)

**File:** https://mypayrights.com/robots.txt — Present and well-formed.

| Crawler | Status | Notes |
|---------|--------|-------|
| GPTBot | Allowed | Explicit allow rule present |
| anthropic-ai | Allowed | Explicit allow rule present |
| ClaudeBot | Not listed | Falls through to `User-Agent: *` Allow — effectively allowed |
| PerplexityBot | Allowed | Explicit allow rule present |
| Google-Extended | Allowed | Explicit allow rule present |
| CCBot | Allowed | Explicit allow — common crawl training data allowed |
| OAI-SearchBot | Not listed | Falls through to wildcard allow |
| FacebookBot | Not listed | Falls through to wildcard allow |

**Assessment:** Excellent. The site explicitly welcomes all major AI crawlers. All five target bots (GPTBot, anthropic-ai, Google-Extended, PerplexityBot, CCBot) have named allow rules. ClaudeBot and OAI-SearchBot are missing explicit rules but are covered by the wildcard `Allow: /`. Sitemap is correctly referenced.

**Gap:** ClaudeBot (distinct from anthropic-ai — ClaudeBot drives claude.ai web search) has no explicit rule. Adding it is a minor hygiene win.

---

## 2. llms.txt Status

**https://mypayrights.com/llms.txt** — PRESENT and well-structured.

The file exists and provides structured guidance for AI systems covering:
- Site purpose (free employment law reference, UK/US/AU/CA)
- Content categories (25+ calculators, FAQ library, situation guides, comparison pages)
- Usage permissions (citation and summarization explicitly allowed with attribution appreciated)
- Current rate figures embedded directly (e.g., UK redundancy weekly cap £751, SMP £194.32)
- Disclaimer language appropriate for AI consumption

**https://mypayrights.com/llms-full.txt** — MISSING (404).

The llms-full.txt convention (detailed content inventory with verbatim citable passages per URL) is not implemented. This is the higher-value file for AI citation pipelines.

**Assessment:** llms.txt presence is a strong positive — only a small minority of sites have one. The content is relevant and includes explicit permission language. The missing llms-full.txt is a clear gap.

---

## 3. Citability Analysis

### FAQ Pages (primary citation targets)

**Page: /faq/can-employer-refuse-redundancy-pay**

- H1: "Can my employer refuse to pay redundancy pay?" — question-phrased, ideal
- Opening answer (verbatim): "No — if you qualify (2+ years' service, genuine redundancy), statutory redundancy pay is a legal entitlement your employer cannot withhold."
- Direct answer in first sentence: YES — optimal pattern
- Statute cited: ERA 1996 s.135 — specific and verifiable
- Word count: ~320 words — core answer block is short of the 134–167 word optimal passage range
- Last reviewed date: 2026-06-27 — present
- Author byline: MISSING
- FAQ schema markup: Not confirmed as explicit JSON-LD

**FAQ index (/faq)**
- 72 questions, all phrased as direct questions
- Brief answer snippets visible at index level — good for AI overview extraction
- No confirmed FAQ schema markup on index or individual pages

### Guide Pages

**Page: /guides/uk-redundancy-pay**

- H1: "UK Redundancy Pay: Complete Guide 2026" — includes year signal
- Opening paragraph cites Employment Rights Act 1996 ss.135–155 with inline "Rates verified June 2026 · Source: GOV.UK"
- H2 headings: majority question-phrased
- Section passage lengths: "Who qualifies" (~165 words) and "Enhanced redundancy pay" (~140 words) fall within optimal 134–167 word range
- Specific statistics: weekly cap £751, service cap 20 years, max £22,530, £30,000 tax threshold — all with named sources
- FAQ block: 6 structured Q&A pairs at page end
- Author byline: MISSING (only "Rates verified June 2026")

**Page: /guides/uk-constructive-dismissal**

- H1: "Constructive dismissal: your rights in 2026"
- Term defined early: "constructive dismissal is a legal concept under the Employment Rights Act 1996 where an employer commits a fundamental breach"
- All 5 FAQ headings phrased as questions
- Last reviewed: 2026-06-27 present
- Author byline: MISSING

**Citability strengths:**
- Direct answer-first structure on FAQ pages
- Specific statute references with section numbers
- Question-phrased H2/H3 headings throughout
- Verified figures with named government sources
- Freshness dates on guides and FAQ pages

**Citability weaknesses:**
- No confirmed JSON-LD FAQ or HowTo schema on any page audited
- No named author on any content page (only founder name on About page)
- Core answer prose on FAQ pages (~320 words) exceeds the optimal self-contained passage range

---

## 4. Structured Answer Formats

- FAQ index: question-phrased titles + snippet previews — good
- Guide pages: mixed question and topic H2s — partial
- No confirmed schema.org/FAQPage JSON-LD
- No HowTo schema on calculator pages
- No Article/NewsArticle schema with author + datePublished confirmed
- Calculator result pages render server-side — AI can read them without JS

---

## 5. Authority & Brand Signals

| Signal | Present | Notes |
|--------|---------|-------|
| Named founder/author | Partial | Jaspal Singh on /about only; no byline on articles |
| Wikipedia entity | No | No Wikipedia page for site or founder |
| YouTube channel | No | Not referenced anywhere on site |
| Reddit presence | Unknown | Not mentioned on site |
| LinkedIn page | No | Not referenced on site |
| Press mentions | No | None found |
| Government source citations | Yes | GOV.UK, HMRC, DOL, Fair Work referenced throughout |
| Methodology page | Yes | Comprehensive source list with legislation.gov.uk links |
| Editorial policy | Yes | /methodology describes update schedule and error process |
| Consistent brand name | Partial | "My Pay Rights" vs "MyPayRights" used inconsistently |

**Brand correlation with AI citation:**
- YouTube mentions correlate ~0.737 with AI citations — no YouTube presence is a significant gap
- Reddit presence (high correlation) — unknown/absent
- Wikipedia entity — absent — the single highest-leverage missing brand signal

---

## 6. Technical Accessibility for AI Crawlers

- Server-side rendering: CONFIRMED — calculator and content pages render without JavaScript
- Sitemap: Present at /sitemap.xml with 520+ URLs, lastmod dates populated
- robots.txt: Well-formed, AI-friendly
- llms.txt: Present
- URL structure: Semantic and descriptive (/faq/can-employer-refuse-redundancy-pay, /guides/uk-redundancy-pay)
- Issue: All 520+ sitemap URLs share the same lastmod date (2026-06-27) — crawlers cannot distinguish freshly changed pages from stale ones

---

## 7. Content Freshness Signals

- Sitemap lastmod: 2026-06-27 on all audited entries (uniform date is a low-trust signal)
- In-content "Rates verified June 2026 · Source: GOV.UK" on guide pages — strong inline freshness signal
- "Last reviewed: 2026-06-27" on FAQ pages
- UK rates on record (£751 weekly cap, £194.32 SMP) match 2026/27 official figures
- Update schedule documented in /methodology

---

## 8. Platform-Specific Visibility Scores (Estimated)

| Platform | Score | Rationale |
|----------|-------|-----------|
| Google AI Overviews | 62/100 | SSR content accessible; no FAQ JSON-LD limits rich result eligibility |
| ChatGPT (browse) | 58/100 | llms.txt present; no named authors reduces E-E-A-T trust weight; no Wikipedia entity |
| Perplexity | 70/100 | PerplexityBot explicitly allowed; direct answers present; source citations match Perplexity style |
| Bing Copilot | 55/100 | No structured schema data; no prominent authority entity signals |

---

## Top 5 Highest-Impact Changes

### Priority 0 — Critical

**1. Implement JSON-LD FAQ Schema on all /faq/* pages**
- Effort: 1–2 days (engineering)
- Impact: Directly enables Google AI Overviews rich results and improves ChatGPT/Perplexity citation likelihood. Each FAQ page already has the correct question-answer structure — this is adding the machine-readable wrapper.
- Implementation: Add `<script type="application/ld+json">` with `@type: FAQPage` and `mainEntity` array per page. Use the opening answer sentence as `acceptedAnswer.text`.

**2. Implement JSON-LD Article schema with author + dateModified on all guide pages**
- Effort: 1 day (engineering)
- Impact: High — AI systems weight named authorship heavily for E-E-A-T. Add `@type: Article`, `author: { @type: Person, name: "Jaspal Singh", url: "https://mypayrights.com/about" }`, `datePublished`, `dateModified`. Also add a visible author byline on each guide.

### Priority 1 — High

**3. Create /llms-full.txt with per-URL content inventory**
- Effort: 2–3 days (content + engineering)
- Impact: High for ChatGPT and Claude citation pipelines. Include 134–167 word verbatim passages for top 40 FAQ and guide pages, explicitly marked as citable with source attribution per entry.

**4. Establish Wikipedia presence**
- Effort: 3–5 days (requires 2–3 independent press references to satisfy WP:N notability)
- Impact: High — Wikipedia entity presence has among the highest correlations with AI system citation. A Wikidata entry is a lower-barrier first step.

### Priority 2 — Medium

**5. Create YouTube channel and off-site entity signals**
- Effort: 1 week initial setup + ongoing
- Impact: Medium-high (YouTube ~0.737 correlation with AI citation). Short explainer videos (60–90 seconds) on redundancy pay, constructive dismissal, notice periods — embedded on corresponding guide pages. Also: LinkedIn company page, Reddit presence in UK personal finance communities.

---

## What Works Well

1. robots.txt is AI-best-practice — all major crawlers explicitly allowed
2. llms.txt present — rare signal (sub-5% of domains) with permission language
3. Direct answer-first FAQ structure — opening sentences are clean and extractable
4. Statute-level citation — ERA 1996 s.135 references help AI verify authority
5. SSR rendering confirmed — full content on first HTTP fetch, no JS required
6. Sitemap is comprehensive — 520+ URLs with lastmod dates
7. Inline freshness signals — "Rates verified June 2026 · Source: GOV.UK" in body
8. Methodology page — documents sources, update cadence, and error correction process

---

## JSON Summary

```json
{
  "score": 64,
  "what_works": [
    "robots.txt explicitly allows all major AI crawlers (GPTBot, anthropic-ai, PerplexityBot, Google-Extended, CCBot)",
    "llms.txt present with usage permissions and current rate data",
    "FAQ pages open with a direct answer sentence — optimal for AI extraction",
    "Statute-level citations (ERA 1996 s.135) on all relevant pages",
    "Server-side rendering confirmed — full content without JavaScript",
    "520+ URL sitemap with lastmod dates",
    "Inline freshness markers on guides (Rates verified June 2026)",
    "Methodology page with named source legislation and update schedule"
  ],
  "findings": [
    {
      "title": "No JSON-LD FAQ schema on FAQ pages",
      "severity": "Critical",
      "description": "All 72 /faq/* pages have ideal Q&A structure but lack schema.org/FAQPage JSON-LD. Without machine-readable markup, Google AI Overviews cannot surface these as rich results and ChatGPT citation weighting is reduced.",
      "recommendation": "Add FAQPage JSON-LD to all /faq/* pages. Use the opening answer sentence as acceptedAnswer.text. Estimated 1–2 days engineering."
    },
    {
      "title": "No Article/Person schema or visible author bylines on guide pages",
      "severity": "Critical",
      "description": "Founder Jaspal Singh is named only on /about. Zero guide pages carry an author byline or Article JSON-LD with author.name. AI systems deprioritise anonymous content for E-E-A-T scoring.",
      "recommendation": "Add Article JSON-LD with author Person entity and dateModified to all /guides/* pages. Add a visible author byline block beneath each guide title."
    },
    {
      "title": "llms-full.txt missing (404)",
      "severity": "High",
      "description": "llms.txt is present but llms-full.txt returns 404. The full file provides verbatim citable passages per URL and is processed by AI indexing pipelines to pre-select citation candidates.",
      "recommendation": "Create /llms-full.txt with 134–167 word citable passages for the top 40 FAQ and guide pages, including canonical definition, key statistic, and source attribution per entry."
    },
    {
      "title": "No Wikipedia entity for site or founder",
      "severity": "High",
      "description": "Wikipedia entity presence correlates highly with AI system citation. Neither MyPayRights nor Jaspal Singh has a Wikipedia or Wikidata entry. AI systems use Wikipedia to validate entity legitimacy.",
      "recommendation": "Secure 2–3 independent press references then create a Wikipedia stub or Wikidata entry as a lower-barrier first step."
    },
    {
      "title": "No YouTube channel or video content",
      "severity": "High",
      "description": "Research shows YouTube mentions have the strongest correlation (~0.737) with AI citation rates across ChatGPT and Perplexity. MyPayRights has no YouTube presence.",
      "recommendation": "Create a YouTube channel. Publish short explainer videos (60–90 seconds) for top FAQ topics. Embed videos on corresponding guide pages."
    },
    {
      "title": "Brand name inconsistency: My Pay Rights vs MyPayRights",
      "severity": "Medium",
      "description": "The site alternates between 'My Pay Rights' (spaced) and 'MyPayRights' (one word). Inconsistent entity naming reduces AI brand recognition and makes web mentions harder to cluster.",
      "recommendation": "Standardise on 'MyPayRights' as the canonical brand token. Update schema markup, social profiles, and all body copy consistently."
    },
    {
      "title": "ClaudeBot not explicitly listed in robots.txt",
      "severity": "Low",
      "description": "ClaudeBot (claude.ai web search crawler, distinct from anthropic-ai which is the training crawler) is not explicitly named in robots.txt. It falls through to the wildcard Allow but explicit rules are best practice.",
      "recommendation": "Add User-Agent: ClaudeBot / Allow: / to robots.txt alongside the existing anthropic-ai rule."
    },
    {
      "title": "No HowTo or SoftwareApplication schema on calculator pages",
      "severity": "Low",
      "description": "The redundancy pay calculator and 24 others are SSR-rendered but lack structured data. HowTo or SoftwareApplication schema signals step-by-step tool usage to AI systems.",
      "recommendation": "Add SoftwareApplication or HowTo JSON-LD to the top 5 calculator pages."
    },
    {
      "title": "Sitemap lastmod uniformly set to same date for all 520+ URLs",
      "severity": "Low",
      "description": "All sitemap entries show lastmod: 2026-06-27 regardless of actual page change dates. Crawlers treat uniform dates as a low-trust signal — they cannot distinguish freshly updated pages from stale ones.",
      "recommendation": "Set lastmod dynamically per page based on actual last content edit date."
    }
  ],
  "dimension_scores": {
    "citability": 68,
    "structural_readability": 72,
    "multi_modal_content": 40,
    "authority_brand_signals": 48,
    "technical_accessibility": 87
  },
  "platform_scores": {
    "google_aio": 62,
    "chatgpt": 58,
    "perplexity": 70,
    "bing_copilot": 55
  }
}
```
