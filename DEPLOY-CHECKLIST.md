# Launch checklist — My Pay Rights (mypayrights.com)

Static export hosted on Cloudflare Pages. Run through this once at first deploy.

## 1. Cloudflare Pages project

- [ ] Project created from the `everyDayTools` GitHub repo
- [ ] Production branch: `main`
- [ ] Build command: `npm run build`
- [ ] Build output directory: `out`
- [ ] Env var (Production **and** Preview): `NEXT_PUBLIC_SITE_URL=https://mypayrights.com`
- [ ] `NODE_VERSION=20` env var set (only if the default build image is older)
- [ ] First deploy succeeded; build log shows `Exporting (2/2)`

## 2. Domain & TLS

- [ ] `mypayrights.com` added under **Custom domains**
- [ ] `www.mypayrights.com` added and redirecting to apex (or vice-versa) — pick one canonical host
- [ ] TLS certificate issued (green padlock on `https://mypayrights.com`)
- [ ] HTTP → HTTPS redirect active (Cloudflare default)

## 3. Static output sanity (curl or browser)

- [ ] `https://mypayrights.com/` returns 200 with the correct `<title>`
- [ ] A tool page loads and the calculator updates live as you type
- [ ] PDF download works on at least one tool (e.g. redundancy)
- [ ] `https://mypayrights.com/sitemap.xml` lists `mypayrights.com` URLs (not localhost / old domain)
- [ ] `https://mypayrights.com/robots.txt` points at the correct sitemap URL

## 4. Headers (verify `public/_headers` applied)

```bash
curl -sI https://mypayrights.com/opengraph-image | grep -i content-type   # → image/png
curl -sI https://mypayrights.com/ | grep -i -E 'content-security|strict-transport|x-frame'
```

- [ ] `/opengraph-image` and `/twitter-image` serve `Content-Type: image/png`
- [ ] CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options` present on page responses

## 5. Social / SEO previews

- [ ] Paste `https://mypayrights.com` into [opengraph.xyz](https://www.opengraph.xyz) — image + title render
- [ ] Share into Slack/WhatsApp — preview card shows the branded OG image
- [ ] Google Search Console: add `mypayrights.com` property, verify ownership
- [ ] Submit `sitemap.xml` in Search Console
- [ ] Bing Webmaster Tools: add + submit sitemap (optional but cheap)

## 6. Analytics & monitoring

- [ ] Cloudflare Web Analytics enabled (free, privacy-friendly, no cookie banner needed)
- [ ] Confirm no console errors on the live site (DevTools → Console)
- [ ] Run Lighthouse on the live homepage + one tool page (target: Perf/SEO/Best-Practices ≥ 95)

## 7. Post-launch

- [ ] Tag the release commit (`git tag v1.0.0 && git push --tags`)
- [ ] Diarise the **April** statutory-rate review (see README "drift moat" table)
- [ ] Diarise the next **US benefit-year** unemployment-cap review

---

### Notes

- The site is fully static — there is **no server, no database, no secrets** in the deploy.
  The only build-time config is `NEXT_PUBLIC_SITE_URL`.
- State-law datasets (PTO payout, final paycheck) carry **anchor regression tests** for the
  high-stakes jurisdictions, plus integrity tests. Full per-state primary-source certification
  remains a tracked follow-up (see `TASKS.md`) — treat secondary-sourced rows as "confirm with
  your state labor office", which every result already states.
