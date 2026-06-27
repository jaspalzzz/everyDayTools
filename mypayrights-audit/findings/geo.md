# GEO / AI Search Readiness Findings — mypayrights-site.pages.dev

Audit date: 2026-06-27

## ✅ What Works

- `llms.txt` present and comprehensive: all 23 tools listed with URLs and descriptions
- Covers 4 jurisdictions: UK, US, Canada, Australia
- Contact email in llms.txt ✓
- Clear "About" section in llms.txt with site purpose ✓
- Organised by category (Employment & Separation, Pay & Tax, Leave & Benefits)
- Tool descriptions are answer-first and factual — ideal for AI citation
- All pages have unique, factual content blocks citing statutory rates with effective dates
- Page titles follow "Tool Name · My Pay Rights" pattern — highly citable

## ⚠️ Findings

### MEDIUM — llms.txt missing `garden-leave-calculator` in leave section
- Working Days Calculator appears in Pay & Tax section — could be better categorised
- Some tools listed without jurisdiction label (e.g., "Working Days Calculator")
- Fix: Add jurisdiction labels to all tool descriptions in llms.txt

### MEDIUM — No `AI:true` or `X-Robots-Tag: AI-allowed` headers
- Some AI crawlers look for explicit permission signals
- robots.txt: `Allow: /` covers all crawlers including AI bots
- Consider adding specific `User-Agent: GPTBot / Allow: /` entries to robots.txt for explicit permission

### LOW — No `<link rel="me">` or author schema to establish E-E-A-T authorship
- About page has "Who built this" section but no linked author profiles
- Fix: Add `sameAs` links to Organization schema pointing to LinkedIn/GitHub/Twitter profiles

### LOW — Brand mentions score
- New domain (mypayrights.com) — no external citation data available yet
- llms.txt provides a good foundation for AI crawlers to understand the site
- Action: Submit to relevant employment law resource directories, Reddit (r/UKPersonalFinance, r/personalfinance), and HR publication links

### INFO — AI crawler access
- GPTBot, Google-Extended, anthropic-ai, CCBot: all allowed by robots.txt (Allow: /)
- No blocking of major AI crawlers
- Rate: excellent
