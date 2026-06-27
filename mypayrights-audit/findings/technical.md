# Technical SEO Findings — mypayrights-site.pages.dev

Audit date: 2026-06-27

## ✅ What Works

- HTTPS with HSTS (max-age=63072000, includeSubDomains, preload) — excellent
- X-Frame-Options: DENY ✓
- X-Content-Type-Options: nosniff ✓
- Referrer-Policy: strict-origin-when-cross-origin ✓
- Permissions-Policy: geolocation, microphone, camera, interest-cohort blocked ✓
- Content-Security-Policy: comprehensive, restricts inline scripts appropriately ✓
- robots.txt: User-Agent *, Allow: / — correct, no accidental blocks ✓
- sitemap.xml: 28 URLs, all tool pages included ✓
- site.webmanifest: valid, theme_color matches brand (#0C447C) ✓
- favicon.svg: navy rounded-square background, crisp at small sizes ✓
- Favicons complete: ico, svg, 192, 512, apple-touch-icon ✓
- HTTP/2 ✓
- TTFB: ~146ms (excellent for Cloudflare Pages) ✓
- Preconnect hint for cdn.jsdelivr.net ✓
- Preload for /logo-mark.svg ✓
- No noindex on any page ✓
- All 23 tool OG images resolve (HTTP 200) ✓

## ⚠️ Findings

### HIGH — Homepage missing canonical tag
- **Evidence**: `<link rel="canonical">` is absent on `/` — confirmed via meta scan
- **Impact**: Google may index multiple variants (with/without trailing slash, mypayrights.com vs pages.dev domain)
- **Fix**: Add `alternates: { canonical: SITE.url }` to homepage metadata in `app/page.tsx`

### MEDIUM — Tool OG images served as application/octet-stream
- **Evidence**: All 23 `/[slug]/opengraph-image` endpoints return `content-type: application/octet-stream` instead of `image/png`
- **Impact**: Some social crawlers (LinkedIn, Slack) may not render preview images; Twitter/X typically still works
- **Fix**: Export `export const contentType = "image/png"` from each `opengraph-image.tsx` file (Next.js uses this to set the Content-Type header). The `OG_CONTENT_TYPE` constant is defined in `lib/ogImage.tsx` but not exported from the route files.

### MEDIUM — Sitemap uses production domain, not preview domain
- **Evidence**: All 28 sitemap `<loc>` entries use `https://mypayrights.com/` — correct for production but means the preview deployment's sitemap advertises a different domain
- **Impact**: No issue for production deployment; could confuse Cloudflare Pages if it tries to submit this sitemap. Low risk.
- **Status**: Acceptable once production domain goes live.

### LOW — Homepage response not gzip/brotli compressed
- **Evidence**: `Content-Encoding: none` on 45KB HTML response
- **Impact**: Slower load on mobile; 45KB uncompressed vs ~10KB compressed
- **Fix**: Cloudflare Pages typically auto-compresses; may be a Pages configuration issue or test environment artifact. Verify in production.

### LOW — robots.txt Sitemap URL uses production domain
- **Evidence**: `Sitemap: https://mypayrights.com/sitemap.xml` 
- **Impact**: Correct for production. No action needed unless auditing preview deployment only.
