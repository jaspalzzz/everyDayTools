"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const ANALYTICS_CONSENT_KEY = "mpr_cookie_consent";

type ConsentValue = "accepted" | "rejected";

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "accepted";
}

export function resetAnalyticsConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
  window.dispatchEvent(new Event("mpr-consent-reset"));
  window.dispatchEvent(new CustomEvent("mpr-consent-change", { detail: null }));
}

export function ConsentBanner() {
  const [choice, setChoice] = useState<ConsentValue | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") setChoice(stored);

    const reset = () => setChoice(null);
    window.addEventListener("mpr-consent-reset", reset);
    return () => window.removeEventListener("mpr-consent-reset", reset);
  }, []);

  // The banner is `position: fixed`, so it never affects document flow --
  // without this, it can visually sit on top of whatever's at the bottom of
  // the viewport on first paint (e.g. the homepage hero's search widget).
  // Reserve matching space on <body> only while the banner is actually shown.
  useEffect(() => {
    if (choice) return;
    document.body.classList.add("has-consent-banner");
    return () => document.body.classList.remove("has-consent-banner");
  }, [choice]);

  const save = (value: ConsentValue) => {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    setChoice(value);
    window.dispatchEvent(new CustomEvent("mpr-consent-change", { detail: value }));
  };

  if (choice) return null;

  return (
    <section
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: 12,
        right: 12,
        bottom: 12,
        zIndex: 80,
        maxWidth: 760,
        margin: "0 auto",
        border: "1px solid #E4DECF",
        borderRadius: 10,
        background: "#fff",
        boxShadow: "0 18px 44px rgba(16,32,51,.16)",
        padding: 14,
      }}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <p style={{ margin: 0, color: "#25384c", fontSize: 13, lineHeight: 1.55 }}>
          Allow optional analytics? We remember your choice locally. If ads are enabled,
          Google&apos;s separate privacy message manages ad consent.{" "}
          <Link href="/privacy" style={{ color: "#163C6B", fontWeight: 850, textDecoration: "underline", textUnderlineOffset: 2 }}>
            Privacy policy
          </Link>
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={() => save("rejected")}
            style={{
              minHeight: 44,
              minWidth: 72,
              border: "1px solid #E4DECF",
              borderRadius: 8,
              background: "#fff",
              color: "#25384c",
              padding: "0 14px",
              fontSize: 13,
              fontWeight: 850,
            }}
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            style={{
              minHeight: 44,
              minWidth: 72,
              border: "none",
              borderRadius: 8,
              background: "#1E4E8C",
              color: "#fff",
              padding: "0 14px",
              fontSize: 13,
              fontWeight: 850,
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}
