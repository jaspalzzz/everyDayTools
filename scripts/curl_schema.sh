#!/bin/bash
# Fetch schema from all 5 pages using curl
URLS=(
  "https://mypayrights.com"
  "https://mypayrights.com/redundancy-pay-calculator"
  "https://mypayrights.com/settlement-agreement-calculator"
  "https://mypayrights.com/faqs/what-is-constructive-dismissal-uk"
  "https://mypayrights.com/blog/uk-sick-pay-rights-2026"
)

for url in "${URLS[@]}"; do
  echo "============================================================"
  echo "URL: $url"
  html=$(curl -s -L --max-time 30 -A "Mozilla/5.0" "$url")
  echo "HTML length: ${#html}"
  echo "$html" | python3 /Users/apple/Documents/FrontEndWeb/EveryDayTools/code/scripts/parse_schema.py "$url"
done
