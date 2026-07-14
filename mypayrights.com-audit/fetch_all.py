import sys, json, os
sys.path.insert(0, os.path.expanduser("~/.claude/skills/seo/scripts"))
from render_page import render_page

urls = [
    "https://mypayrights.com/us/states/california/final-paycheck",
    "https://mypayrights.com/us/states/texas/final-paycheck",
    "https://mypayrights.com/us/states/wyoming/final-paycheck",
    "https://mypayrights.com/us/states/mississippi/final-paycheck",
    "https://mypayrights.com/us/states/kansas/final-paycheck",
    "https://mypayrights.com/us/states/california/minimum-wage",
    "https://mypayrights.com/us/states/texas/minimum-wage",
    "https://mypayrights.com/us/states/wyoming/minimum-wage",
    "https://mypayrights.com/us/states/mississippi/minimum-wage",
    "https://mypayrights.com/us/states/kansas/minimum-wage",
    "https://mypayrights.com/us/states/california/pto-payout",
    "https://mypayrights.com/us/states/texas/pto-payout",
    "https://mypayrights.com/us/states/california",
    "https://mypayrights.com/us/states/texas",
    "https://mypayrights.com/us/states/wyoming",
    "https://mypayrights.com/us/states/kansas",
    "https://mypayrights.com/us/states/mississippi",
]

os.makedirs("raw_text", exist_ok=True)
for u in urls:
    fname = u.replace("https://mypayrights.com/", "").replace("/", "_")
    res = render_page(u, mode="never")
    text = res.get("extracted_text") or ""
    with open(f"raw_text/{fname}.txt", "w") as f:
        f.write(text)
    print(fname, len(text), "words:", len(text.split()))
