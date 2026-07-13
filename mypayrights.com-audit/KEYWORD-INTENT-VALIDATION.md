# Keyword & Intent Validation (SERP-based)

**Method & honest scope.** No paid keyword tool (Ahrefs/Semrush) or Google
Keyword Planner is connected, and GSC has no data yet, so this does **not**
contain monthly search volumes — none are invented. Instead this is *SERP
backwards analysis*: real Google searches on a representative sample of the
site's target query patterns, reading (a) whether the query returns an
established SERP = real demand, (b) which page **types** rank = intent match,
and (c) who the incumbents are = competition tier. This answers the validation
question ("do the ~335 programmatic pages target real demand, and does our page
type fit?") with observable data, minus the volume dimension.

Sample: 8 queries spanning every major cluster.

---

## Findings per cluster

| Cluster (sample query) | Demand | Intent match | Incumbents on page 1 | Tier |
|---|---|---|---|---|
| US state PTO payout (`california pto payout law`) | ✅ real | ✅ state-law + calculator | Paycor, Paycom, Rippling, Nolo, law firms, **remotelaws PTO calc** | Medium |
| US state PTO, small state (`mississippi pto payout`) | ✅ real | ✅ (model validated) | **calculatepto.com, ptogenius, vacationtracker** run the *same* per-state model | Medium |
| US final paycheck (`texas final paycheck law`) | ✅ real | ✅ informational | **TWC (gov)**, texaslawhelp, law firms | Hard (gov-owned) |
| US minimum wage (`ohio minimum wage 2026`) | ✅ real | ⚠️ single-fact | **Ohio.gov**, news, payroll SaaS | Weakest (gov owns the fact) |
| UK situations (`employer not paying wages uk`) | ✅ real (high BOFU) | ✅ advice | **Citizens Advice, ACAS**, solicitors | Hard (definitive-source owned) |
| UK calculator (`redundancy pay calculator`) | ✅ real | ✅ tool | **GOV.UK #1, MoneyHelper**, but independents (salarytools, redundancy-calculator.co.uk) rank p1 | Medium (top-10 winnable) |
| Compare (`pilon vs garden leave`) | ✅ real | ✅ comparison | HR SaaS + mid law firms — **no gov incumbent** | **Softest / best** |
| CA severance (`ontario severance pay calculator`) | ✅ real | ⚠️ intent gap | Ontario.gov calc, **severancepaycalculator.com**, law firms | Hard + intent gap |

---

## Conclusions

**1. Demand is validated — Phase 4 was not built on phantom queries.**
Every tested cluster returns a rich, established SERP with multiple commercial
competitors. The programmatic per-state model is directly validated: competitors
(calculatepto.com, ptogenius, vacationtracker) run the *identical* page-per-state
PTO model and rank. The pages target things people actually search.

**2. Intent mostly matches — two gaps flagged.**
- **Minimum-wage pages** target single-fact queries ("what's the rate") that
  Google answers from the government source in a snippet. Low differentiation;
  the weakest cluster to invest further in.
- **CA province pages** are law-reference tables, but the severance SERP wants a
  *calculator* (ESA vs common-law estimate). Intent gap — a calculator would fit
  better than a reference page here.

**3. Ranking is authority-gated — this is the real bottleneck.**
Every head term has a high-authority incumbent: GOV.UK, Citizens Advice/ACAS,
TWC, Ohio.gov, or high-DA payroll SaaS (Rippling/Paycor/Paycom). A new site with
**zero backlinks** (current state) will not crack top 3 on these regardless of
on-page quality. This closes the loop with the phase framework: **the constraint
is Phase 5 (off-page/authority), not more content.** The content is well-aimed;
it lacks the authority to outrank incumbents.

**4. Where to actually win first (highest ROI):**
- **Compare cluster** — softest SERP (no gov incumbent), real demand, we already
  have the pages. Best near-term ranking opportunity.
- **Long-tail state queries** — smaller states / specific "X pto payout when
  fired" phrasings where per-state programmatic competitors are beatable.
- **UK calculators for top-10** (not #1) — independents rank page 1 alongside
  GOV.UK; achievable with modest authority.

---

## The one thing this can't answer (and the fix)
This validates demand *exists* and intent *matches*, but not **relative volume**
— which cluster is biggest. That needs a volume tool or field data. The free
fix is already wired: **GSC (Phase 0) will show impressions per page in ~1–2
weeks** — a real volume proxy at zero cost. Revisit then to rank clusters by
actual impressions and concentrate effort.

## Recommended actions
1. **Prioritize the compare cluster + authority-building (Phase 5)** over minting
   more programmatic pages — demand is proven, competition is the blocker.
2. **Reconsider the minimum-wage pages' depth** — single-fact + gov-owned = low
   ceiling; either add genuine differentiation or deprioritize.
3. **Consider a CA severance calculator** to close the CA intent gap.
4. **Re-run this with GSC impression data in ~2 weeks** to add the volume layer.
