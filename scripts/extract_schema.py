#!/usr/bin/env python3
"""Extract JSON-LD, Microdata, and RDFa from URLs using requests + beautifulsoup or curl."""
import sys
import json
import re
import subprocess
import urllib.request
import urllib.error

URLS = [
    "https://mypayrights.com",
    "https://mypayrights.com/redundancy-pay-calculator",
    "https://mypayrights.com/settlement-agreement-calculator",
    "https://mypayrights.com/faqs/what-is-constructive-dismissal-uk",
    "https://mypayrights.com/blog/uk-sick-pay-rights-2026",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
}

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        return None

def extract(url, html):
    print(f"\n{'='*80}")
    print(f"URL: {url}")
    if not html:
        print("FETCH FAILED")
        return {}

    pattern = re.compile(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        re.DOTALL | re.IGNORECASE
    )
    blocks = pattern.findall(html)
    print(f"JSON-LD blocks found: {len(blocks)}")

    parsed_blocks = []
    for i, block in enumerate(blocks):
        block = block.strip()
        try:
            parsed = json.loads(block)
            print(f"\n--- JSON-LD Block {i} ---")
            print(json.dumps(parsed, indent=2))
            parsed_blocks.append(parsed)
        except json.JSONDecodeError as e:
            print(f"--- JSON-LD Block {i} (PARSE ERROR: {e}) ---")
            print(block[:500])

    has_microdata = bool(re.search(r'itemscope|itemtype=', html, re.IGNORECASE))
    has_rdfa = bool(re.search(r'typeof=|property="[a-z]+:', html, re.IGNORECASE))
    print(f"\nMicrodata: {'YES' if has_microdata else 'None'}")
    print(f"RDFa: {'YES' if has_rdfa else 'None'}")

    return {"url": url, "jsonld": parsed_blocks, "microdata": has_microdata, "rdfa": has_rdfa}

all_results = []
for url in URLS:
    html = fetch(url)
    result = extract(url, html)
    all_results.append(result)

print("\n\n=== SUMMARY JSON ===")
print(json.dumps(all_results, indent=2))
