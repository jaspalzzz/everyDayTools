import { ImageResponse } from "next/og";

// Pre-render once at build time so the image ships as a static asset (output: export).
export const dynamic = "force-static";
export const alt = "My Pay Rights — Law-backed pay rights calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Brand dot + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#2563eb",
            }}
          />
          <span style={{ fontSize: "22px", fontWeight: 600, color: "#6b7280" }}>
            My Pay Rights
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.15,
            margin: "0 0 24px 0",
            maxWidth: "900px",
          }}
        >
          Law-backed pay rights calculators
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "26px",
            color: "#6b7280",
            margin: 0,
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Redundancy · PTO payout · Notice · Severance · Overtime — and 11 more.
          Live results. Instant PDF. No signup.
        </p>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#2563eb",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
