# My Pay Rights — SEO Action Plan
**Generated:** 2026-06-26

---

## Phase 1: Critical Fixes (This week — 1–3 hours total)

### 1. Add per-page `og:title`, `og:description`, `og:url` to all tool metadata
**File:** every `app/<slug>/page.tsx`  
**Impact:** Every social share, Slack preview, and LinkedIn post shows the correct tool name instead of the homepage headline.  
**How:** In each tool page, add to the `metadata` export:
```ts
openGraph: {
  title: tool.name,
  description: tool.description,
  url,
},
twitter: {
  title: tool.name,
  description: tool.description,
},
```
Or centralise in a `toolMetadata(tool)` helper in `lib/seo.ts` so each page calls it once.

### 2. Add `WebSite` + `Organization` JSON-LD to the homepage
**File:** `app/page.tsx`  
**Impact:** Enables Google sitelinks, brand Knowledge Panel, AI brand entity.  
**How:**
```ts
// In app/page.tsx, add:
import { jsonLd, SITE } from "@/lib/seo";
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  contactPoint: { "@type": "ContactPoint", email: SITE.contactEmail, contactType: "customer support" }
};
// Render both via <script dangerouslySetInnerHTML={jsonLd(websiteSchema)} />
```

### 3. Add favicon
**Files:** `public/favicon.ico`, `public/apple-touch-icon.png`  
**Impact:** Fixes browser tab icon, SERP favicon, iOS shortcut.  
**How:** Create a 32×32 favicon.ico and 180×180 apple-touch-icon.png in `/public/`. Then in `app/layout.tsx`:
```ts
icons: {
  icon: "/favicon.ico",
  apple: "/apple-touch-icon.png",
},
```

---

## Phase 2: High-Impact Improvements (This week — 2–4 hours)

### 4. Fix `priceCurrency` in WebApplication schema
**File:** `lib/seo.ts`  
**Impact:** Schema validation; correct currency for UK tool rich results.  
**How:** Pass `region` to `webApplicationSchema()` and derive currency:
```ts
export function webApplicationSchema(params: {
  name: string; description: string; url: string; region: string;
}) {
  const currency = params.region === "UK" ? "GBP" : "USD";
  return { ...schema, offers: { "@type": "Offer", price: "0", priceCurrency: currency } };
}
```

### 5. Add `BreadcrumbList` JSON-LD to tool pages
**File:** `components/ToolLayout.tsx`  
**Impact:** Breadcrumb rich results in SERP ("mypayrights.com › Redundancy pay").  
**How:** Add to `ToolLayout` a breadcrumb schema rendered via `jsonLd()`:
```ts
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: tool.name, item: `${SITE.url}/${tool.slug}` }
  ]
};
```

### 6. Add `<link rel="preconnect">` for Tabler Icons CDN
**File:** `app/layout.tsx`  
**How:**
```tsx
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
```

### 7. Improve About page with E-E-A-T signals
**File:** `app/about/page.tsx`  
**Impact:** YMYL credibility — critical for financial/employment tools.  
**How:** Add a named author or contributor with credentials (e.g. "Built by [Name], an employment law researcher with X years experience"), or at minimum "verified by employment law professionals." Link to a professional profile if available.

---

## Phase 3: Content & Authority (Month 1)

### 8. Create `/public/llms.txt`
**Impact:** AI search readiness — Perplexity, Claude, ChatGPT, Bing Copilot.  
**Example content:**
```
# My Pay Rights
> Law-backed pay rights calculators for redundancy, PTO, notice, severance, overtime and more.

## Calculators
- [Redundancy Pay Calculator](https://mypayrights.com/redundancy-pay-calculator): UK statutory redundancy pay by age, service, and weekly pay.
- [PTO Payout Calculator](https://mypayrights.com/pto-payout-calculator): US unused PTO payout by state.
... (one line per tool)

## About
All figures are estimates based on current statutory rates. Source citations on each page.
Contact: hello@mypayrights.com
```

### 9. Add H2 to homepage
**File:** `app/page.tsx`  
**Impact:** Heading structure for crawlers; anchor for the feature strip.  
**How:** Add `<h2 className="...">Why use My Pay Rights?</h2>` before the feature strip section.

### 10. Add `featureList` to WebApplication schema
**File:** `lib/seo.ts` → `webApplicationSchema()`  
**How:** Accept a `features?: string[]` param and add to the schema:
```ts
featureList: features ?? ["Live results", "PDF download", "No signup required"]
```

### 11. Per-page OG images (stretch)
Generate programmatic OG images using Next.js `ImageResponse` (already supported in the App Router). A template with the tool name renders a unique 1200×630 card per page. This significantly improves social click-through.

---

## Phase 4: Monitoring & Iteration (Ongoing)

- **Submit sitemap** to Google Search Console once `mypayrights.com` custom domain is live.
- **Monitor Core Web Vitals** in GSC — the static export and Cloudflare edge delivery should score well; track LCP/CLS after any CSS changes.
- **Re-verify statutory rates** each April (UK budget) and January (US DOL annual update). The `effectiveDate` fields in `lib/rates.ts` make this auditable.
- **Track PAA appearances** for FAQ-targeted queries (redundancy pay calculator UK, PTO payout by state, etc.).

---

## Summary scorecard

| Fix | Effort | SEO Impact |
|---|---|---|
| Per-page OG tags | Low (1h) | High |
| WebSite + Org schema on homepage | Low (30m) | High |
| favicon.ico | Low (20m) | Medium |
| Fix priceCurrency | Low (15m) | Medium |
| BreadcrumbList JSON-LD | Low (30m) | Medium |
| preconnect for CDN | Trivial (5m) | Low |
| llms.txt | Low (15m) | High (AI search) |
| About page E-E-A-T | Medium (1h) | High (YMYL) |
| Homepage H2 | Trivial (5m) | Low |
