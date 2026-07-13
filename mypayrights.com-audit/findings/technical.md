# Technical SEO — Raw Evidence

## robots.txt (live, 2026-07-08)
```
User-Agent: *
Allow: /

User-Agent: GPTBot
Allow: /

User-Agent: anthropic-ai
Allow: /

User-Agent: ClaudeBot
Allow: /

User-Agent: Google-Extended
Allow: /

User-Agent: PerplexityBot
Allow: /

User-Agent: CCBot
Allow: /

Sitemap: https://mypayrights.com/sitemap.xml
```

## Redirect chain verification
```
https://www.mypayrights.com/  -> 301 -> https://mypayrights.com/     (single hop)
https://mypayrights.com/      -> 200                                  (canonical host serves directly)
http://mypayrights.com/       -> 301 -> https://mypayrights.com/     (single hop)
```

## Response headers (homepage)
```
HTTP/2 200
strict-transport-security: max-age=63072000; includeSubDomains; preload
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline'
  https://pagead2.googlesyndication.com https://googletagservices.com
  https://partner.googleadservices.com https://tpc.googlesyndication.com
  https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'
  https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net data:;
  img-src 'self' data: blob: https://pagead2.googlesyndication.com
  https://googleads.g.doubleclick.net; connect-src 'self'
  https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com
  https://cloudflareinsights.com; frame-src https://googleads.g.doubleclick.net
  https://tpc.googlesyndication.com; object-src 'none'; base-uri 'self';
  form-action 'self'; frame-ancestors 'none'
permissions-policy: geolocation=(), microphone=(), camera=(), interest-cohort=()
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-frame-options: DENY
server: cloudflare
```
No `x-robots-tag` header present on any page checked (confirmed absent = no accidental header-level noindex).

## Sitemap
- 358 `<url>` entries in `sitemap.xml` (single file, no sitemap index needed at this scale)
- `lastmod` sample: `2025-01-01` (US state pages, shared generic date), `2026-06-27`, `2026-07-01` (real per-page dates on guides/other content)

## hreflang (verified live)

**On homepage:**
```html
<link rel="alternate" hrefLang="en" href="https://mypayrights.com"/>
<link rel="alternate" hrefLang="en-GB" href="https://mypayrights.com/uk"/>
<link rel="alternate" hrefLang="en-US" href="https://mypayrights.com/us"/>
<link rel="alternate" hrefLang="en-CA" href="https://mypayrights.com/ca"/>
<link rel="alternate" hrefLang="en-AU" href="https://mypayrights.com/au"/>
<link rel="alternate" hrefLang="fr-CA" href="https://mypayrights.com/fr"/>
<link rel="alternate" hrefLang="x-default" href="https://mypayrights.com"/>
```

**On /fr (reciprocal check):**
```html
<link rel="alternate" hrefLang="fr-CA" href="https://mypayrights.com/fr"/>
<link rel="alternate" hrefLang="en-CA" href="https://mypayrights.com/ca"/>
<link rel="alternate" hrefLang="en-GB" href="https://mypayrights.com/uk"/>
<link rel="alternate" hrefLang="en-US" href="https://mypayrights.com/us"/>
<link rel="alternate" hrefLang="en-AU" href="https://mypayrights.com/au"/>
<link rel="alternate" hrefLang="x-default" href="https://mypayrights.com"/>
```
Reciprocal and complete — no orphaned or one-directional hreflang references found.

## 404 handling
Unknown path (`/this-page-does-not-exist-xyz`) returns a genuine HTTP `404`, not a soft-404 (200 with "not found" copy).

## Render-blocking resources (homepage `<head>`)
```html
<link rel="stylesheet" href="/_next/static/css/ff34e3f03ecc24ca.css" data-precedence="next"/>
<script src="/_next/static/chunks/4bd1b696-...js" async>
<script src="/_next/static/chunks/1255-...js" async>
<script src="/_next/static/chunks/main-app-...js" async>
... (all remaining chunks load async or as noModule polyfill)
```
Exactly one render-blocking stylesheet; every script tag loads `async`.

## Response time sample (curl, 3 requests to the same calculator page)
```
0.55s
1.82s
0.49s
```
Variance likely reflects CDN edge cache state, not application logic — not a substitute for real field data.
