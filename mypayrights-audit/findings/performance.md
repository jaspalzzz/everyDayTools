# Performance Findings — mypayrights-site.pages.dev

Audit date: 2026-06-27
Lab measurement only (no CrUX field data — site too new for Google's CrUX database)

## ✅ What Works

- TTFB: ~146ms — excellent (Cloudflare edge, global CDN)
- HTTP/2 enabled ✓
- Static export (Next.js output: export) — no server-side computation on request
- Critical CSS inlined by Next.js ✓
- logo-mark.svg preloaded with `<link rel="preload" as="image">` ✓
- Preconnect to cdn.jsdelivr.net ✓
- Icons served from same origin ✓
- No heavy third-party analytics scripts detected

## ⚠️ Findings

### HIGH — No response compression on HTML
- Evidence: `Content-Encoding: none`, 45KB HTML response uncompressed
- Expected: Cloudflare Pages auto-compresses static assets; may be missing for dynamic paths or a Pages config issue
- Target: <10KB gzipped
- Fix: Verify Cloudflare Pages compression settings; test from different regions

### MEDIUM — Tabler Icons webfont loaded from CDN (render-blocking)
- Evidence: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/...">` in `<head>`
- Impact: Adds a CDN round-trip; webfont CSS can block rendering
- Fix: Either self-host the icon subset needed, use `display:swap`, or switch to SVG icon imports (tree-shaken)

### MEDIUM — OG images: 35–41KB per image
- Individual OG image sizes range 35–41KB
- Acceptable for social sharing but could be optimised further
- Next.js ImageResponse PNG output; sizes are normal for this use case

### LOW — No `dns-prefetch` for CDN
- preconnect covers CDN but dns-prefetch as fallback for older browsers is absent
- Minor; preconnect is sufficient for modern browsers

### INFO — LCP estimate
- Largest element is likely the H1 text (hero area) — no large hero image to block
- Estimated LCP: <1.5s from CDN (excellent target: <2.5s)
- INP: Calculator components are client-side but lightweight React; estimated low
