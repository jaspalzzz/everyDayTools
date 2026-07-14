# Phase 5 — Off-Page / Link-Earning Playbook

**Status:** on-site foundation shipped; outreach is manual and yours to run.

Backlinks are the biggest untouched ranking lever, and the only part of SEO
that can't be done from inside the repo. This playbook is the execution guide.
The golden rule for an AdSense site: **earn links, never manufacture them.**
Paid links, link exchanges, PBNs and comment spam are exactly what Google's
link-spam systems (and AdSense policy review) punish — a manual action here
would cost both rankings *and* ad revenue. Everything below is white-hat.

---

## 1. What's now in place (code)

- **Citable flagship asset** — `/guides/us-pto-payout-laws-by-state` (all 50
  states, grouped by rule) now has a "Cite this page" block with a copyable
  citation. This is the primary asset outreach points at.
- **`Organization.sameAs` is config-ready** — set `NEXT_PUBLIC_SOCIAL_PROFILES`
  (comma-separated real profile URLs) in Cloudflare and the homepage schema
  emits `sameAs`. Empty until you have real profiles — never point it at a
  placeholder.

### Your one-time setup
1. Create real brand profiles (LinkedIn company page + X/Twitter at minimum;
   optionally a Crunchbase/Muck Rack profile). Then set
   `NEXT_PUBLIC_SOCIAL_PROFILES` in Cloudflare → redeploy.
2. Onboard a named reviewer (see E-E-A-T note in §5) when possible.

---

## 2. Linkable-asset inventory (what to pitch)

| Asset | URL | Why it earns links |
|---|---|---|
| PTO payout by state | `/guides/us-pto-payout-laws-by-state` | Comprehensive 50-state reference; HR blogs, payroll SaaS and journalists cite state-by-state tables |
| Final-paycheck deadlines by state | `/us/states/*/final-paycheck` | Same pattern; "when is my last check due in X" is heavily searched |
| Free calculators | `/redundancy-pay-calculator`, `/pto-payout-calculator`, etc. | Tools get linked as "useful resources" from guides and forums |
| Situation guides | `/situations/*` | "What to do if…" pages are cited by legal-aid and advice sites |

**Best first asset to push:** the PTO-by-state guide — most comprehensive,
evergreen, and low-competition for citations.

---

## 3. Target list (white-hat, by channel)

**A. Resource-page / "useful links" outreach**
- HR and payroll blogs, employment-law firm resource pages, university career
  centers, and state legal-aid orgs that maintain "employee rights" link lists.
- Search operators to find them:
  `"employee rights" + "resources" + inurl:links`,
  `"PTO payout" + "by state"`, `"final paycheck" + intitle:resources`.

**B. Digital PR / journalist outreach**
- Reporters covering labor, pay transparency, and "quit your job" trend pieces
  (personal-finance desks at regional outlets, niche HR press).
- Pitch angle: original angle off your own data — e.g. "X states still let
  employers keep your unused vacation" — with the guide as the citation source.
- Use Connectively (formerly HARO) / Featured / Qwoted to answer reporter
  queries on employment pay; each answer can cite a specific page.

**C. Community / genuine participation** (no link-dropping)
- r/legaladvice, r/AskHR, r/personalfinance, employment-law Q&A on Quora:
  answer real questions thoroughly; link only where a calculator/guide is the
  best answer. Value first — spammy links get removed and hurt reputation.

**D. Unlinked-mention reclamation**
- Once you have traffic, search for sites quoting your data or brand without a
  link (`"mypayrights"` -site:mypayrights.com) and ask for attribution.

**E. Partnerships**
- Payroll/HR software with a blog, freelancer platforms, redundancy-support
  charities — offer the calculators as an embeddable/free resource.

---

## 4. Cadence & tracking
- Aim for ~5–10 genuine, personalized outreach emails/week. Volume-blasting
  identical templates is both ineffective and a spam signal.
- Track in a simple sheet: target, contact, asset pitched, date, status.
- Measure in GSC → **Links** report (external links, top linking sites) and
  watch referring-domain growth, not raw link count.

---

## 5. E-E-A-T dependency (unblocks authority)
The single biggest on-site authority gap is that `/editorial-policy` still
states there is **no named independent legal reviewer**. For a YMYL
(money/legal) site this caps trust. When you onboard a qualified employment
solicitor or MCIPD reviewer:
- Add them as a `Person` with credentials and surface "Reviewed by [name]" on
  key pages (the `reviewedBy` schema slot already exists — it's a config/data
  change, not a rebuild).
- This makes every subsequent outreach pitch stronger ("reviewed by a
  qualified employment lawyer").

---

## 6. Do-not-do (AdSense + link-spam safety)
- ❌ Buying links, paid guest posts with followed links, link exchanges, PBNs.
- ❌ Automated/scaled comment or forum link drops.
- ❌ `sameAs` or citations pointing at fake/placeholder profiles.
- ✅ Earn links by being the most useful, most-cited reference in the niche.
