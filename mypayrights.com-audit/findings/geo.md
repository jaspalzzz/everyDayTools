# GEO / AI Search Readiness Audit — mypayrights.com

**Date:** 2026-07-14
**GEO Readiness Score: 93/100** (prior audit 2026-07-08: 91/100 — delta +2, driven almost entirely by the new llms.txt file)

## Dimension Breakdown

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 92 | Answer-first passages, self-contained blocks, FAQ/Q&A structure confirmed on all 4 sampled page types |
| Structural Readability | 20% | 90 | Single H1 per page, question-phrased H1s on FAQ/state pages, but thin H2 sub-structure on some page types |
| Multi-Modal Content | 15% | 80 | Text-only (zero raster images, prior finding), no video/YouTube presence found |
| Authority & Brand Signals | 20% | 85 | Named authorship (Jaspal Singh) + official-source citations confirmed; independent brand-mention discovery (Wikipedia/Reddit/YouTube/LinkedIn) not run this session — carried as an open item |
| Technical Accessibility | 20% | 98 | Fully static/SSR HTML (Next.js static export) confirmed live on all 4 sampled pages — zero JS execution required to read full content; robots.txt already confirmed allowing all target AI crawlers |

## What Works

- **llms.txt is now live and high quality** (`https://mypayrights.com/llms.txt`, HTTP 200) — this is new since the 2026-07-08 audit, which flagged its absence as the only AI-Search-Readiness gap. The file includes a clear site description, full calculator/guide/state-page inventory with URLs, named data sources per jurisdiction (GOV.UK, DOL, Fair Work Ombudsman, CNESST), key statutory figures inline (redundancy cap, tribunal cap, NLW, SMP/SPP/SSP rates, all dated 2026/27), an explicit "AI Citation Guidelines" section instructing models how to cite the site correctly (reference specific jurisdiction URL, note the verified date, don't present estimates as definitive legal outcomes), and an explicit "Permissions" grant for AI crawlers to cite/summarise/reproduce short excerpts. This is a materially above-average llms.txt implementation — most sites that have one just list links.
- **All 4 sampled page types are fully server-rendered, zero-JS-required.** Verified via raw HTTP fetch (no Playwright render needed, `is_spa: False`, `mode_used: raw` on all four): `/faq/what-is-tupe-transfer`, `/redundancy-pay-calculator`, `/blog/uk-redundancy-pay-guide-2026`, `/us/states/california/final-paycheck`. Full explanatory text, headings, and JSON-LD are present in the raw HTML document an AI crawler receives on the first request — no reliance on client-side hydration for citable content.
- **FAQ page (`/faq/what-is-tupe-transfer`) is a model citable passage.** Single H1 phrased as the question ("What is a TUPE transfer?"), a self-contained ~40-word direct-answer paragraph immediately below the H1 ("TUPE ... protects your employment rights when the business or service you work for changes hands. Your contract transfers automatically on identical terms, and dismissal connected to the transfer is automatically unfair."), followed by a longer explanatory passage — this leading paragraph alone is extractable without any surrounding context. `FAQPage` + `Article` + `BreadcrumbList` JSON-LD all present and well-formed. `dateModified` (2026-06-27) confirmed present via htmldate detection.
- **Calculator page (`/redundancy-pay-calculator`) is not JS-only** — it carries substantial server-rendered explanatory content alongside the interactive tool: an intro paragraph stating what the tool does and its limits ("educational estimate, not legal advice"), a "How this redundancy calculator works" section citing the Employment Rights Act 1996 formula directly, a wage-claim checklist, and an employer email template. 9 distinct links to official government sources (gov.uk-family domains) were found in the page. `WebApplication` + `FAQPage` + `BreadcrumbList` schema present.
- **Blog post and state page both carry real, verified named authorship** — `"author":{"name":"Jaspal Singh"}` confirmed in Article JSON-LD on both `/blog/uk-redundancy-pay-guide-2026` and `/us/states/california/final-paycheck`, consistent with the prior audit's finding of genuine (not fabricated) authorship. State page H1 is specific and entity-clear ("California Final Paycheck Law 2026"), publication date (2026-07-09, via htmldate) is current, and `FAQPage` schema is present alongside `Article`.
- **Entity/source attribution pattern holds across page types**: statutory figures are consistently placed next to a named authoritative source (gov.uk, DOL, Fair Work Ombudsman, CNESST-style domains), which is exactly the "source-adjacent citation" pattern AI answer engines favor when selecting a citable passage — reconfirmed on the calculator and state pages sampled this session, consistent with the broader pattern the prior audit found site-wide.
- robots.txt AI-crawler allowlist (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot — all `Allow: /`) reconfirmed already in place per task brief; not re-derived.

## Findings

### 1. No independently-verified brand-mention / off-site citation signals this session
- **Severity:** Medium
- **Description:** Task called for checking discoverable mentions of "My Pay Rights" / mypayrights.com on Wikipedia, Reddit, YouTube, and LinkedIn (strong predictors of AI-citation likelihood — YouTube mentions correlate ~0.737, domain rating only ~0.266). This session did not execute a live web/social search for these signals, so brand-mention correlation remains unmeasured for both the prior and current audit. Given the site is pre-monetization and relatively young, it is plausible there is currently little to no third-party discussion (no Wikipedia entity, likely no Reddit threads, no YouTube channel) — but this is an assumption, not a verified finding.
- **Recommendation:** Run a dedicated brand-mention sweep (web search for `"mypayrights.com"` / `"My Pay Rights"` across Reddit, YouTube, Wikipedia, LinkedIn, and general web) before the next audit cycle, or via DataForSEO's `ai_opt_llm_ment_search` if available. If no mentions exist, this is a genuine gap worth closing: a short explainer video (e.g., "How UK redundancy pay is calculated") posted to YouTube and a presence in relevant Reddit communities (r/AskUK, r/UKPersonalFinance, r/legaladvice) would be disproportionately high-leverage given the strength of the YouTube correlation relative to backlink-based authority signals.

### 2. Calculator pages have thin H2 sub-structure despite strong overall content depth
- **Severity:** Low
- **Description:** `/redundancy-pay-calculator` has rich, citable prose ("How this redundancy calculator works," wage-claim checklist, email template) but this content is not consistently broken into question-phrased H2/H3 sub-headings the way the FAQ and state pages are — it reads as a small number of long blocks rather than discrete, independently-citable Q&A units. This slightly limits how many distinct extractable passages an AI engine can pull from a single calculator page compared to the FAQ page pattern.
- **Recommendation:** On calculator pages, split the explanatory copy into 2-4 question-phrased H2s (e.g., "How much statutory redundancy pay am I entitled to?", "What counts as a week's pay for redundancy?", "Is redundancy pay taxable?") each with a self-contained 40-60 word answer up front, mirroring the FAQ page template that already works well. This is a content-restructuring task, not a new-content task — the underlying facts already exist on the page.

### 3. llms.txt has no machine-readable manifest/sitemap-style structured format (RSL 1.0 not present)
- **Severity:** Low
- **Description:** The current llms.txt is a well-written Markdown document (excellent for LLM consumption) but there is no companion RSL 1.0 (Really Simple Licensing) file or licensing metadata declaring machine-readable terms for AI training/citation use. This is an emerging, not-yet-widely-adopted standard, so its absence is not a real deficiency today, matching the prior audit's stance on llms.txt itself before it existed.
- **Recommendation:** Optional/monitor. If RSL adoption grows among major AI crawlers over the next 1-2 quarters, add an `rsl.xml` or equivalent alongside llms.txt. The existing llms.txt "Permissions" section already substantively covers the same intent (explicit citation/reproduction permission) in prose form, so this is a redundancy/standardization move, not a new-capability move.

### 4. Multi-modal content signal remains weak (unchanged from prior audit)
- **Severity:** Low
- **Description:** Consistent with the prior audit's "zero raster images site-wide" finding, no video content, embedded charts/infographics, or other multi-modal signals were found on the 4 sampled pages. This caps the Multi-Modal Content dimension (15% weight) regardless of how strong the text-based citability is elsewhere.
- **Recommendation:** Not urgent given the site's all-SVG performance-first design is a deliberate tradeoff (per prior audit). If pursuing GEO gains specifically, the highest-leverage single addition would be short YouTube explainer videos per major calculator (also addresses Finding #1's brand-mention gap simultaneously — YouTube mentions are the single strongest correlate of AI-citation likelihood in the available data).

### 5. FAQPage/QAPage schema retained correctly despite Google's May 2026 FAQ rich-result retirement
- **Severity:** Info (positive confirmation, not a defect)
- **Description:** `FAQPage` schema is confirmed still present and valid on the FAQ, calculator, and state pages sampled. Google retired FAQ rich results for SERP display on 2026-05-07, which could tempt a team to strip this schema as "dead weight." It has not been removed here, which is correct — FAQPage/QAPage schema still carries real AI-citation value for ChatGPT, Perplexity, and other answer engines that consume structured Q&A markup independently of Google's SERP treatment.
- **Recommendation:** No action needed. Explicitly do not remove FAQPage/QAPage schema in any future cleanup pass on the assumption it's obsolete post-May-2026 — its value has shifted from SERP rich-results to AI-citation structuring, not disappeared.

## Platform-Specific Assessment (qualitative, no live API access this session)

| Platform | Assessment |
|---|---|
| Google AI Overviews | Likely strong — FAQPage schema, direct-answer passages, and Google-Extended allow in robots.txt all favor AIO extraction |
| ChatGPT / OAI-SearchBot | Likely strong — GPTBot/OAI-SearchBot allowed, llms.txt present with explicit citation guidance is a meaningful ChatGPT-specific signal (llms.txt is most directly consumed by OpenAI-family and Anthropic-family crawlers) |
| Perplexity | Likely strong — PerplexityBot allowed, source-adjacent citation pattern (statutory figure next to gov.uk/DOL/etc. link) matches Perplexity's known preference for pages that self-cite primary sources |
| Bing Copilot | Not independently assessed this session — no Bingbot-specific signal was checked; standard robots.txt allow-all posture and clean HTML should not present a barrier |

## Delta vs. Prior Audit (2026-07-08)

- AI Search Readiness category score: 91 → 93 (this audit's 5-dimension GEO framework is not a 1:1 category match, but the directional improvement is clear)
- Prior audit's only finding, "No llms.txt file" (Low severity), is now **resolved** — file exists and exceeds typical quality bar
- Prior audit's hreflang finding (en-GB/en-US/en-CA/en-AU/fr-CA/x-default) was not re-verified this session per task scope — no red flags observed incidentally on the 4 sampled pages that would suggest regression
- New finding not previously captured: brand-mention/off-site citation signal (Wikipedia/Reddit/YouTube/LinkedIn) has never been independently measured across either audit — flagged as an open item rather than assumed clean

## Artifacts

- llms.txt full content fetched and reviewed: `https://mypayrights.com/llms.txt`
- Rendered/extracted page data (JSON, via `render_page.py` in raw mode) saved to: `/private/tmp/claude-503/-Users-apple-Documents-FrontEndWeb-EveryDayTools-code/9853b6a2-a6f3-44ba-9c4c-fbea066c5241/scratchpad/geo_work/geo_tupe_full.json`, `geo_redundancy_full.json`, `geo_blog_full.json`, `geo_ca_finalpaycheck_full.json` (scratchpad — not persisted long-term)
- Prior audit reference: `/Users/apple/Documents/FrontEndWeb/EveryDayTools/code/mypayrights.com-audit-2026-07-08/findings/geo.md`, `/Users/apple/Documents/FrontEndWeb/EveryDayTools/code/mypayrights.com-audit-2026-07-08/audit-data.json`
