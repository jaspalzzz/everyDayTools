import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Inline SVG paths from logo-mark.svg — avoids fs/fetch in edge/static context
const LOGO_MARK = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="56"
    height="56"
    viewBox="0 0 96 96"
  >
    <rect x="9" y="9" width="78" height="78" rx="20" fill="#0C447C" />
    <path
      d="M24 65V30l17 21 17-21v35"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="6.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M62 31h8.5a8.5 8.5 0 0 1 0 17H62V31Z"
      fill="none"
      stroke="#C7DFF5"
      strokeWidth="5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M63 48l12 15"
      fill="none"
      stroke="#C7DFF5"
      strokeWidth="5.5"
      strokeLinecap="round"
    />
    <path
      d="M25 73h46"
      fill="none"
      stroke="#E6F1FB"
      strokeWidth="3.25"
      strokeLinecap="round"
    />
  </svg>
);

/** Region pill label — shown in the top-right corner of tool OG images. */
function regionLabel(region: string): string {
  if (region === "UK") return "🇬🇧 UK";
  if (region === "US") return "🇺🇸 US";
  if (region === "UK/CA") return "🇬🇧 UK · CA";
  return "🌍 Multi-region";
}

/** Shared OG card for the homepage. */
export function homepageOgCard() {
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
        <div
          style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}
        >
          {LOGO_MARK}
          <span style={{ fontSize: "24px", fontWeight: 600, color: "#374151" }}>
            My Pay Rights
          </span>
        </div>
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
        <p
          style={{
            fontSize: "26px",
            color: "#6b7280",
            margin: 0,
            maxWidth: "820px",
            lineHeight: 1.4,
          }}
        >
          Redundancy · PTO payout · Notice · Severance · Overtime — and more.
          Live results. Instant PDF. No signup.
        </p>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#0C447C",
          }}
        />
      </div>
    ),
    { ...OG_SIZE },
  );
}

/** Per-tool OG card. Shows tool name, description snippet, and region badge. */
export function toolOgCard(params: {
  name: string;
  description: string;
  region: string;
}) {
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
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top: logo + site name + region badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {LOGO_MARK}
            <span style={{ fontSize: "22px", fontWeight: 600, color: "#374151" }}>
              My Pay Rights
            </span>
          </div>
          <span
            style={{
              fontSize: "18px",
              color: "#0C447C",
              background: "#EFF6FF",
              padding: "6px 16px",
              borderRadius: "100px",
              fontWeight: 500,
            }}
          >
            {regionLabel(params.region)}
          </span>
        </div>

        {/* Middle: tool name */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1, justifyContent: "center" }}>
          <h1
            style={{
              fontSize: "60px",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.1,
              margin: 0,
              maxWidth: "960px",
            }}
          >
            {params.name}
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#6b7280",
              margin: 0,
              maxWidth: "840px",
              lineHeight: 1.45,
            }}
          >
            {params.description}
          </p>
        </div>

        {/* Bottom: free label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            color: "#9ca3af",
            fontSize: "18px",
          }}
        >
          <span>Free</span>
          <span>·</span>
          <span>No signup</span>
          <span>·</span>
          <span>Live results</span>
          <span>·</span>
          <span>Instant PDF</span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#0C447C",
          }}
        />
      </div>
    ),
    { ...OG_SIZE },
  );
}
