#!/usr/bin/env bash
# AdSense resubmission convergence check for https://mypayrights.com
#
# Context: AdSense rejected the site for "Low value content". The cause was ~225
# template-generated jurisdiction pages (US states, CA provinces, AU states),
# which were deleted from the build. Only three manually curated US state hubs
# remain live. Every other jurisdiction URL must return 404. Some stale copies
# were stuck in Cloudflare edge caches and expire on their own.
#
# This script is READ-ONLY: it only issues HTTP requests and prints a report.
# Exit code 0 = all convergence gates green, 1 = something still outstanding.

set -uo pipefail

SITE="${SITE:-https://mypayrights.com}"
EXPECTED_SITEMAP_URLS="${EXPECTED_SITEMAP_URLS:-194}"

REMOVED_PATHS=(
  /us/states/texas
  /ca/provinces/ontario
  /us/states/california
  /us/states/vermont
  /us/states/new-york
  /ca/provinces/alberta
  /ca/provinces/quebec
  /au/states/queensland
  /au/states/victoria
  /us/states/kansas/minimum-wage
  /us/states/wyoming/final-paycheck
  /us/states/mississippi/pto-payout
)

LIVE_PATHS=(
  /
  /us/states/kansas
  /us/states/mississippi
  /us/states/wyoming
  /redundancy-pay-calculator
  /pto-payout-calculator
  /guides
  /us
)

fail=0

echo "== AdSense convergence check =="
echo "site: $SITE"
echo "utc:  $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo

# ---------------------------------------------------------------- check 1 ----
# Removed pages must 404 on normal (non-cache-busted) requests. A 200 here means
# a stale object is still served from some Cloudflare POP.
echo "-- 1. removed pages must 404 (6 hits each, no cache-buster) --"
stuck=0
for p in "${REMOVED_PATHS[@]}"; do
  codes=""; pops=""; saw200=0; age=""
  for _ in 1 2 3 4 5 6; do
    read -r code pop hdr_age < <(
      curl -sS -D - -o /dev/null --max-time 20 "$SITE$p" 2>/dev/null |
      awk 'BEGIN{c="?";r="?";a="-"}
           /^HTTP/{c=$2}
           tolower($1)=="cf-ray:"{n=split($2,x,"-"); r=x[n]}
           tolower($1)=="age:"{a=$2}
           END{print c, r, a}' | tr -d '\r'
    )
    codes="$codes$code "; pops="$pops$pop "
    if [ "$code" = "200" ]; then saw200=1; age="$hdr_age"; fi
  done
  if [ "$saw200" = "1" ]; then
    echo "  STILL 200  $p"
    echo "             codes: $codes"
    echo "             pops:  $pops"
    echo "             age:   ${age:-unknown} (stale edge object; clears when its TTL expires)"
    stuck=$((stuck + 1)); fail=1
  else
    echo "  ok 404     $p"
  fi
done
echo "  -> stale-at-edge paths: $stuck"
echo

# ---------------------------------------------------------------- check 2 ----
# Cache-busted requests bypass the edge cache and reveal origin truth. A 200 here
# is a genuine regression (the page was NOT actually removed from the build).
echo "-- 2. origin truth (cache-busted; any 200 is a real regression) --"
regressions=0
for p in "${REMOVED_PATHS[@]}"; do
  code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "$SITE$p?cb=$RANDOM$RANDOM" 2>/dev/null)
  if [ "$code" != "404" ]; then
    echo "  REGRESSION $code  $p"
    regressions=$((regressions + 1)); fail=1
  fi
done
[ "$regressions" = "0" ] && echo "  ok: all removed paths 404 at origin"
echo

# ---------------------------------------------------------------- check 3 ----
echo "-- 3. live pages must be 200 --"
for p in "${LIVE_PATHS[@]}"; do
  code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 "$SITE$p" 2>/dev/null)
  if [ "$code" != "200" ]; then
    echo "  BROKEN $code  $p"; fail=1
  else
    echo "  ok 200       $p"
  fi
done
echo

# ---------------------------------------------------------------- check 4 ----
echo "-- 4. sitemap health --"
tmp=$(mktemp)
curl -sS --max-time 30 "$SITE/sitemap.xml" 2>/dev/null | grep -oE 'https://[^<]+' > "$tmp"
count=$(grep -c . "$tmp" 2>/dev/null || echo 0)
echo "  sitemap URLs: $count (expected $EXPECTED_SITEMAP_URLS)"
[ "$count" != "$EXPECTED_SITEMAP_URLS" ] && { echo "  WARNING: unexpected sitemap size"; fail=1; }

# -n1 keeps each invocation to a single URL; without it xargs packs every URL
# into one command line and fails with "cannot be assembled, too long" -- which
# previously produced an empty result that was misread as success.
# -n1 keeps one URL per invocation; without it xargs packs every URL into a
# single command line and dies with "cannot be assembled, too long" -- which
# previously yielded an empty result that was misread as success. The inner
# `exit 0` keeps xargs' status meaningful: it must stay 0 when pages are fine
# (a bare `[ ... ] && echo` would exit 1 on every healthy 200).
swept=$(wc -l < "$tmp")
bad=$(xargs -n1 -P 12 -I{} sh -c 'c=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 20 "$1" 2>/dev/null); [ "$c" != "200" ] && echo "$c $1"; exit 0' _ {} < "$tmp")
sweep_status=$?
if [ "$sweep_status" != "0" ]; then
  echo "  ERROR: sitemap sweep did not run cleanly (xargs exit $sweep_status)"; fail=1
elif [ "$swept" -lt "$EXPECTED_SITEMAP_URLS" ]; then
  echo "  ERROR: only $swept URLs were swept"; fail=1
elif [ -n "$bad" ]; then
  echo "  NON-200 SITEMAP URLS:"; echo "$bad" | sed 's/^/    /'; fail=1
else
  echo "  ok: every sitemap URL returns 200"
fi

# Sitemap must not contain any jurisdiction URL other than the 3 curated hubs.
stray=$(grep -E '/us/states/|/ca/provinces/|/au/states/' "$tmp" \
  | grep -vE '/us/states/(kansas|mississippi|wyoming)$' || true)
if [ -n "$stray" ]; then
  echo "  STRAY JURISDICTION URLS IN SITEMAP:"; echo "$stray" | sed 's/^/    /'; fail=1
else
  echo "  ok: only the 3 curated state hubs are listed"
fi
rm -f "$tmp"
echo

# ---------------------------------------------------------------- check 5 ----
echo "-- 5. cache headers --"
html_cc=$(curl -sS -D - -o /dev/null --max-time 20 "$SITE/?cb=$RANDOM" 2>/dev/null | grep -i '^cache-control:' | tr -d '\r')
echo "  html:   ${html_cc:-<none>}"
asset=$(curl -sS --max-time 20 "$SITE/?cb=$RANDOM" 2>/dev/null | grep -oE '/_next/static/[^"]+\.(css|js)' | head -1)
if [ -n "$asset" ]; then
  asset_cc=$(curl -sS -D - -o /dev/null --max-time 20 "$SITE$asset" 2>/dev/null | grep -i '^cache-control:' | tr -d '\r')
  echo "  asset:  ${asset_cc:-<none>}"
  echo "$asset_cc" | grep -q 's-maxage' && echo "  NOTE: hashed asset still carries s-maxage (rule-merge leak)"
fi
echo

echo "== VERDICT =="
if [ "$fail" = "0" ]; then
  echo "ALL GREEN - live-site convergence gates pass."
  echo "Remaining before clicking AdSense 'Request review' (needs your dashboards):"
  echo "  - Google Search no longer surfaces removed jurisdiction pages"
  echo "  - Search Console lists them as Not found (404) / excluded"
  echo "  - AdSense shows ads.txt Authorized"
  echo "  - A Google-certified CMP message is selected (EEA/UK/CH)"
  echo "  - Auto ads stay OFF and runtime flags stay false until approval"
else
  echo "NOT READY - see flagged items above."
  [ "$regressions" != "0" ] && echo "  * origin regressions are code issues - investigate immediately."
  [ "$stuck" != "0" ] && echo "  * stale-edge 200s are Cloudflare cache objects; they expire on their own."
fi
exit "$fail"
