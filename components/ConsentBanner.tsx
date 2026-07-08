"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "mpr_cookie_consent";

type ConsentValue = "accepted" | "rejected";

export function hasAdvertisingConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CONSENT_KEY) === "accepted";
}

export function ConsentBanner() {
  const [choice, setChoice] = useState<ConsentValue | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") setChoice(stored);
  }, []);

  const save = (value: ConsentValue) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setChoice(value);
    window.dispatchEvent(new CustomEvent("mpr-consent-change", { detail: value }));
  };

  if (choice) return null;

  return (
    <section
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 80,
        maxWidth: 760,
        margin: "0 auto",
        border: "1px solid #c8d9ea",
        borderRadius: 10,
        background: "#fff",
        boxShadow: "0 18px 44px rgba(16,32,51,.16)",
        padding: 16,
      }}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <p style={{ margin: 0, color: "#25384c", fontSize: 13, lineHeight: 1.55 }}>
          My Pay Rights uses essential cookies for the site to work. If advertising is enabled,
          Google ad placements and related cookies load only after you accept.{" "}
          <Link href="/privacy" style={{ color: "#0f56bd", fontWeight: 850 }}>
            Privacy policy
          </Link>
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={() => save("rejected")}
            style={{
              minHeight: 40,
              border: "1px solid #d8e2ec",
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
              minHeight: 40,
              border: "none",
              borderRadius: 8,
              background: "#1769e0",
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
