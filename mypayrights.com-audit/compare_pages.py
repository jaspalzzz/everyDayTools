import difflib, itertools, os

def load(name):
    with open(f"raw_text/{name}.txt") as f:
        return f.read()

pairs_to_check = [
    ("us_states_california_final-paycheck", "us_states_texas_final-paycheck"),
    ("us_states_california_final-paycheck", "us_states_wyoming_final-paycheck"),
    ("us_states_texas_final-paycheck", "us_states_wyoming_final-paycheck"),
    ("us_states_mississippi_final-paycheck", "us_states_kansas_final-paycheck"),
    ("us_states_california_minimum-wage", "us_states_texas_minimum-wage"),
    ("us_states_california_minimum-wage", "us_states_wyoming_minimum-wage"),
    ("us_states_texas_minimum-wage", "us_states_wyoming_minimum-wage"),
    ("us_states_mississippi_minimum-wage", "us_states_kansas_minimum-wage"),
    ("us_states_texas_minimum-wage", "us_states_mississippi_minimum-wage"),
    ("us_states_wyoming_minimum-wage", "us_states_kansas_minimum-wage"),
    ("us_states_california_pto-payout", "us_states_texas_pto-payout"),
    ("us_states_california", "us_states_texas"),
    ("us_states_california", "us_states_wyoming"),
    ("us_states_texas", "us_states_wyoming"),
    ("us_states_kansas", "us_states_mississippi"),
]

for a, b in pairs_to_check:
    ta, tb = load(a), load(b)
    ratio = difflib.SequenceMatcher(None, ta, tb).ratio()
    print(f"{a:45s} vs {b:45s}  similarity={ratio*100:5.1f}%  unique={100-ratio*100:5.1f}%  wcA={len(ta.split())} wcB={len(tb.split())}")
