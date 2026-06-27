#!/usr/bin/env python3
import sys, re, json

url = sys.argv[1] if len(sys.argv) > 1 else "unknown"
html = sys.stdin.read()

pattern = re.compile(
    r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.DOTALL | re.IGNORECASE
)
blocks = pattern.findall(html)
print(f"JSON-LD blocks: {len(blocks)}")
for i, b in enumerate(blocks):
    print(f"--- Block {i} ---")
    try:
        print(json.dumps(json.loads(b.strip()), indent=2))
    except Exception as e:
        print(f"PARSE ERROR: {e}")
        print(b[:300])

has_micro = bool(re.search(r'itemscope|itemtype=', html, re.IGNORECASE))
has_rdfa = bool(re.search(r'typeof=|property="[a-z]+:', html, re.IGNORECASE))
print(f"Microdata: {'YES' if has_micro else 'None'}")
print(f"RDFa: {'YES' if has_rdfa else 'None'}")
