# mypayrights.com — GEO / AI Search Optimization Analysis

**Analysis date:** 2026-07-14
**Method:** Live HTTP/HTML inspection of 5 representative pages (homepage, FAQ, calculator, blog, US state page), raw robots.txt/llms.txt fetch, direct web search verification of brand-mention presence (Wikipedia/Reddit/YouTube/LinkedIn), heading-hierarchy and passage-length analysis against Google's AI Optimization Guide criteria.
**Framing:** Per Google's official position, GEO/AEO findings below are SEO fundamentals applied to AI-search surfaces, not a separate discipline. Where community folklore (chunking gimmicks, `llms.txt` as a ranking lever, mention-farming) would contradict that, this report defers to Google and says so explicitly.

**Related prior work:** A `seo-geo` subagent scored this site 93/100 during the 2026-07-14 full site audit (`mypayrights.com-audit/findings/geo.md`). That score is **not comparable** to the one below — it used a lighter, presence/absence-style rubric and had not yet verified brand mentions via actual search. This report applies the full 5-category weighted rubric from the `seo-geo` skill and — for the first time — empirically confirms (rather than flags as "unmeasured") that the site has zero footprint on the platforms that correlate most strongly with AI citation. That single piece of new evidence is the main driver of the lower score here. See "Reconciling the two GEO scores" at the end.

---

## 1. GEO Readiness Score: 70/100

| Category | Weight | Score | Contribution |
|---|---|---|---|
| Citability Score | 25% | 78 | 19.5 |
| Structural Readability | 20% | 85 | 17.0 |
| Multi-Modal Content | 15% | 45 | 6.75 |
| Authority & Brand Signals | 20% | 40 | 8.0 |
| Technical Accessibility | 20% | 96 | 19.2 |
| **Weighted total** | | | **70.45 → 70** |

**Read:** this is a technically excellent, well-structured site with a real brand-authority gap. Every lever the codebase controls directly (rendering, crawler access, heading structure, source citations) is strong-to-excellent. The two weak categories — Multi-Modal and Authority & Brand — are the two that require off-site work (getting mentioned elsewhere, adding visual content), not more on-page engineering.

---

## 2. Platform Breakdown

| Platform | Estimated Score | Reasoning |
|---|---|---|
| **Google AI Overviews** | ~65/100 | Strongly ranking-correlated — cites pages that already rank. Technical/content fundamentals are strong (91-94 on the parallel technical/performance audits), but real ranking/indexation data is unavailable this session (GSC service account lacks property access — see the 2026-07-14 full audit's Performance section). Score is a reasoned estimate from on-page strength, not measured SERP presence. |
| **Google AI Mode (Gemini 3.5 Flash)** | ~55/100 | Weakly ranking-correlated; draws from a broader pool (~9 domains/query) where freshness and entity authority outweigh raw position. Freshness is good (many pages dated within the last 2-4 weeks of this analysis). Entity authority is weak — zero verified brand-mention footprint (see §5) directly caps this platform more than AI Overviews. |
| **ChatGPT** | ~35/100 | Cites Wikipedia 47.9% and Reddit 11.3% of the time. This site has **zero** confirmed presence on either (verified via direct search this session, not assumed). Strong content quality doesn't compensate for a citation-source mix the site isn't in at all. |
| **Perplexity** | ~30/100 | Cites Reddit 46.7% and Wikipedia heavily — same zero-presence gap as ChatGPT, slightly worse given Perplexity's even heavier Reddit weighting. |
| **Bing Copilot** | ~50/100 | Fully SSR/static and crawlable by Bing, but IndexNow is not implemented (confirmed absent — no key file, no repo references; already tracked as task T3.10 in `TASKS.md`), so new/updated pages rely on Bing's normal crawl cadence rather than push-based discovery. |

**Only ~11% of domains get cited by both ChatGPT and Google AI Overviews for the same query** (Ahrefs) — the platform split above is the reason platform-specific work, not a single "GEO score," is the right lens for prioritization.

---

## 3. AI Crawler Access Status

Fetched live from `https://mypayrights.com/robots.txt`:

| Crawler | Owner | Status |
|---|---|---|
| `*` (default) | — | ✅ `Allow: /` |
| GPTBot | OpenAI | ✅ Explicitly allowed |
| anthropic-ai | Anthropic | ✅ Explicitly allowed |
| ClaudeBot | Anthropic | ✅ Explicitly allowed |
| Google-Extended | Google (AI training/Gemini) | ✅ Explicitly allowed |
| PerplexityBot | Perplexity | ✅ Explicitly allowed |
| CCBot | Common Crawl | ✅ Explicitly allowed (a deliberate choice — many sites block this; allowing it is fine, not a defect, since Common Crawl feeds several downstream AI training pipelines) |
| OAI-SearchBot | OpenAI (search) | Not individually listed, but covered by the `User-Agent: *` wildcard `Allow: /` |
| ChatGPT-User | OpenAI (live browsing) | Not individually listed, but covered by the wildcard |
| Bytespider | ByteDance | Not individually listed, but covered by the wildcard |
| cohere-ai | Cohere | Not individually listed, but covered by the wildcard |

**Verdict:** No crawler is blocked. The explicit per-bot `Allow` rules for the highest-value crawlers plus a permissive wildcard for everything else is the correct posture — no changes needed.

---

## 4. llms.txt Status: Present, Excellent

Fetched live from `https://mypayrights.com/llms.txt` — genuinely one of the more thorough implementations seen in this category:

- Structured `# Title` / `> description` header
- Full calculator/tool inventory grouped by category (Employment & Separation, Pay & Tax, Leave & Entitlements) with one-line descriptions
- Interactive tools and situation guides listed separately
- State/province/territory page patterns documented (not every one of 411 URLs individually — correctly summarized)
- Named data sources per jurisdiction (GOV.UK, DOL, Fair Work Ombudsman, provincial standards offices, CNESST) with an "applied within 48 hours" freshness commitment
- Explicit "AI Citation Guidelines" (cite specific URL, note verified date, don't present estimates as definitive, note UK tax year) and a "Permissions" section explicitly inviting citation/summarization

**Important caveat, per this skill's own primary-source guidance:** `llms.txt` is not currently a citation-ranking lever for any major AI search system (see `references/llmstxt-evidence.md` — Mueller, Illyes, and independent server-log audits all confirm major crawlers don't specially parse it yet). This file's value is as a high-quality **content map for a human or an AI's general-purpose fetch/browse step**, and as a permissions/attribution signal — not as something that will move a citation-ranking score. Keep it (it's well done and costs nothing), but don't expect it to explain or fix the platform-breakdown gaps in §2.

**No RSL 1.0 manifest** — checked `/rsl.xml` and `/.well-known/rsl.xml`, both 404. Optional/emerging standard; the llms.txt Permissions section already covers the substance. Not a priority fix.

---

## 5. Brand Mention Analysis — Verified via Direct Search

This is the one section of this report that required active verification rather than page inspection, and it's the main reason the score above (70) reads lower than the full audit's earlier GEO score (93), which had explicitly left this unmeasured.

| Platform | Correlation w/ AI citation | Result |
|---|---|---|
| YouTube | ~0.737 (strongest) | **Zero mentions found.** Search for `"mypayrights.com" site:youtube.com` returned no relevant results — only unrelated "MyPay"-branded fintech/payroll channels. |
| Reddit | High | **Zero mentions found.** `"mypayrights.com" site:reddit.com` returned no results at all. |
| Wikipedia | High | **Zero presence.** No article, no citation as a source, nothing indexed under "My Pay Rights" or "mypayrights.com". |
| LinkedIn | Moderate | **Zero mentions found.** Same search as YouTube returned only unrelated "MyPay"-branded companies (MyPay, MyPayNow, MyPayPro — different products, easily confused by name collision but not this site). |
| General web | — | A broad search for "mypayrights.com" / "My Pay Rights" redundancy calculator surfaced zero results for this site — competing UK redundancy calculators (MoneyHelper, Citation, Avensure, etc.) dominate instead. |

**This is expected for a young, pre-outreach site** (consistent with the near-zero backlink profile found in the same day's full audit — the domain doesn't even appear in the latest Common Crawl snapshot). It is not a content-quality problem; it's a distribution problem. Given brand mentions correlate **3x more strongly** with AI visibility than backlinks (Ahrefs, 75,000-brand study), this is the single highest-leverage lever available for the AI-search platforms specifically (ChatGPT and Perplexity above all, given their heavy Reddit/Wikipedia weighting) — more leverage, category-for-category, than any further on-page GEO polish.

---

## 6. Passage-Level Citability

Optimal citable-passage length per the SE Ranking study is **134-167 words**, front-loaded (44% of AI citations come from the first 30% of a page).

| Page | Opening passage | Word count | Verdict |
|---|---|---|---|
| `/blog/uk-redundancy-pay-guide-2026` | "What is statutory redundancy pay?" → direct "X is..." definition, cites Employment Rights Act 1996 s.135–154, states the exact £22,530 cap | 123 | **Strong** — just under the optimal band but genuinely self-contained, specific, sourced. Best example on the site. |
| `/faq/what-is-tupe-transfer` | "What is a TUPE transfer?" → direct "TUPE ... protects your employment rights ..." | ~73 (whole page is short by design) | **Good** — correct definitional pattern, but the page is a single short Q&A rather than a passage *within* a longer page, so there's less depth to be citable *about*. |
| `/us/states/california/final-paycheck` | Title + subtitle, then jumps straight into conditional blocks ("If you were terminated" → "Immediately...") | — | **Adequate, not optimal** — no single opening sentence directly answers "what is California's final paycheck deadline?" before the conditional branches start. An AI system has to infer the general rule from the conditional structure rather than lift one clean sentence. |
| `/redundancy-pay-calculator` | Conversion-oriented hook ("Just been made redundant? Calculate exactly what your employer must pay you...") rather than a definition | — | **Weakest of the four** — leads with a CTA, not a citable factual statement. The FAQ section further down the page (confirmed present via H2 "Frequently asked questions") is likely more citable than the hero copy, but that pushes the citable content past the highest-value "first 30% of the page" zone. |

**Recommendation:** add one direct, self-contained "X is..." sentence at the top of the state-page and calculator-page templates — before the conditional/interactive content — mirroring the pattern already used successfully on the blog and FAQ templates. This is a template-level change (propagates to all ~225 state/province pages and ~30 calculators at once).

---

## 7. Server-Side Rendering Check

Confirmed via direct fetch (not JS-executed) across all 5 sampled pages: **100% SSR, zero JavaScript dependency for content.** This is a Next.js static export (`output: "export"` in `next.config.mjs`) — every page's full text, headings, and JSON-LD are present in the raw HTML response an AI crawler receives on the first request, with no client-side hydration required to reveal content. This is the strongest possible technical posture for AI crawlers, which do not execute JavaScript.

---

## 8. Top 5 Highest-Impact Changes

1. **[High impact / high effort]** Build real brand-mention presence — the single highest-leverage lever given the 3x brand-mention-vs-backlink correlation and this site's confirmed zero presence on YouTube/Reddit/Wikipedia/LinkedIn. Concretely: post genuinely useful answers (not links-only) in relevant r/UKPersonalFinance, r/employmentlaw-adjacent, r/AskHR threads when organically relevant; consider a short YouTube explainer walking through one calculator (highest single correlation, 0.737); pursue a Wikipedia citation as a source on an existing employment-law article rather than trying to create a page about the brand itself (much easier bar to clear and still counts as presence).
2. **[Medium impact / low effort]** Add a direct, self-contained definitional opening sentence to the calculator and state-page templates (see §6) — template-level fix, propagates across ~255 pages at once.
3. **[Medium impact / low effort]** Add IndexNow support (already tracked as `TASKS.md` T3.10) — directly improves the Bing Copilot platform score, which currently lags on discovery speed alone despite being otherwise crawlable.
4. **[Medium impact / medium effort]** Add at least one non-decorative visual per major template — a simple SVG timeline/flowchart for process pages (e.g., "how a TUPE transfer works" as a 4-step diagram) or a comparison chart on state pages — to address the 45/100 Multi-Modal score. The 156%-higher-selection-rate stat applies to genuinely informative visuals, not filler images, so prioritize diagrams that convey structure over stock photography (this site's zero-raster-image architecture is otherwise a deliberate, sound performance choice — don't undo that for generic photos).
5. **[Low impact / low effort]** Convert the blog post's question-phrased H2 sections (`/blog/uk-redundancy-pay-guide-2026` already has 9 of them) into explicit FAQPage schema alongside the existing Article schema — the content is already structured as Q&A, it's just not marked up that way on this one page type (FAQPage is already present on FAQ/calculator/state pages, just missing on blog posts specifically).

---

## 9. Schema Recommendations

- **Add FAQPage schema to blog posts** whose H2 structure is already question-phrased (see §8.5) — low effort, the content already exists in the right shape.
- **Person schema for the author** already exists (`FOUNDER_PERSON` in `lib/seo.ts`, rendering "Jaspal Singh" with `jobTitle: "Founder"`) — this is correctly implemented for *authorship* attribution. It is deliberately **not** a substitute for a credentialed legal-reviewer signal (`LEGAL_REVIEWER` in the same file is an optional, env-var-gated field currently unset) — that's a real E-E-A-T/authority gap already tracked in the 2026-07-14 full audit and `TASKS.md`, not a schema-markup gap. Don't add fabricated credentials to close this; it's explicitly designed to stay empty until real ones exist.
- **No new Organization/WebSite schema changes needed** — already comprehensive per the same-day full audit's schema findings (`mypayrights.com-audit/findings/schema.md`).

---

## 10. Content Reformatting Suggestions

- **State pages** (`/us/states/[state]/final-paycheck` and siblings): add one lead sentence directly answering "what is the [state] final paycheck deadline?" before the "If you were terminated / If you resigned" conditional blocks. Keep the conditional structure — it's genuinely useful and already well-built — just don't make it the *first* thing an AI system has to parse.
- **Calculator pages**: replace or supplement the conversion-hook opening ("Just been made redundant? Calculate exactly...") with a one-sentence factual lead ("Statutory redundancy pay in the UK is calculated using age, length of service, and weekly pay, capped at £751/week (2026/27)...") before the interactive tool itself. The hook can stay as a sub-headline; the definitional sentence should come first for citability.
- **FAQ pages**: no change needed — the existing pattern (direct question as H1, immediate "X is..." definition) is the strongest citability pattern on the site and should be treated as the template to extend elsewhere, not something to rework.
- **Blog posts**: no structural change needed (9 question-phrased H2s is already best-in-class); the only gap is the missing FAQPage schema noted in §9.

---

## Reconciling the Two GEO Scores (93 vs. 70)

Both are honest, neither is wrong — they measured different things:

- The **2026-07-14 full-audit `seo-geo` pass (93/100)** used a lighter rubric weighted heavily toward what's directly verifiable from the page itself: crawler access, llms.txt quality, schema presence, SSR. It explicitly flagged brand-mention verification as **not yet done** ("a live web/social search... was not executed this session").
- **This report (70/100)** applies the seo-geo skill's full 5-category weighted rubric, which assigns Authority & Brand Signals a full 20% weight and Multi-Modal Content 15% — and, critically, **actually ran the brand-mention search** this time and found zero presence across every platform checked. That single piece of new, verified evidence — not a regression on the site's part — accounts for most of the gap between the two scores.

**Action:** treat 70/100 as the current, more rigorously-verified number. Re-run this specific check in 60-90 days after any brand-mention-building work (§8.1) to see real movement, since that's the only category likely to shift meaningfully on its own timeline.
