const PAY_LINES = [
  { label: "Basic pay", value: "£5,200.00" },
  { label: "Notice pay", value: "£1,560.00" },
  { label: "Holiday pay", value: "£840.00" },
  { label: "Other payments", value: "£820.00" },
] as const;

export function HeroResultCard() {
  return (
    <div
      aria-label="Example pay rights estimate"
      className="relative hidden lg:grid"
      style={{ minHeight: 460, placeItems: "center" }}
    >
      {/* Floating note 1 */}
      <div
        className="absolute flex items-center gap-2.5"
        style={{ top: 58, right: 0, width: 190, border: "1px solid #E4DECF", borderRadius: 8, background: "#fff", boxShadow: "0 10px 28px rgba(16,32,51,.08)", padding: 12, color: "#52616f", fontSize: 12, fontWeight: 700 }}
      >
        <span style={{ width: 34, height: 34, flex: "0 0 auto", display: "grid", placeItems: "center", borderRadius: 8, background: "#EAF0F8", color: "#1E4E8C", fontWeight: 900 }}>§</span>
        <span>Country and state rules</span>
      </div>

      {/* Floating note 2 */}
      <div
        className="absolute flex items-center gap-2.5"
        style={{ top: 142, right: -22, width: 190, border: "1px solid #E4DECF", borderRadius: 8, background: "#fff", boxShadow: "0 10px 28px rgba(16,32,51,.08)", padding: 12, color: "#52616f", fontSize: 12, fontWeight: 700 }}
      >
        <span style={{ width: 34, height: 34, flex: "0 0 auto", display: "grid", placeItems: "center", borderRadius: 8, background: "#EAF0F8", color: "#1E4E8C", fontWeight: 900 }}>!</span>
        <span>Official-source checks</span>
      </div>

      {/* Floating note 3 */}
      <div
        className="absolute flex items-center gap-2.5"
        style={{ bottom: 82, right: 0, width: 190, border: "1px solid #E4DECF", borderRadius: 8, background: "#fff", boxShadow: "0 10px 28px rgba(16,32,51,.08)", padding: 12, color: "#52616f", fontSize: 12, fontWeight: 700 }}
      >
        <span style={{ width: 34, height: 34, flex: "0 0 auto", display: "grid", placeItems: "center", borderRadius: 8, background: "#EAF0F8", color: "#1E4E8C", fontWeight: 900 }}>✓</span>
        <span>No account required</span>
      </div>

      {/* Estimate card */}
      <article
        style={{ width: "min(100%,430px)", border: "1px solid #E4DECF", borderRadius: 12, background: "#fff", boxShadow: "0 18px 42px rgba(16,32,51,.11)", overflow: "hidden" }}
      >
        {/* Head */}
        <div style={{ padding: 20, background: "linear-gradient(180deg,#FBF9F3 0%,#fff 100%)", borderBottom: "1px solid #EAE5D8" }}>
          <p style={{ margin: "0 0 6px", color: "#52616f", fontSize: 13, fontWeight: 750 }}>
            Estimated amount potentially owed
          </p>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
            <strong style={{ color: "#102033", fontSize: 42, lineHeight: 1, letterSpacing: 0 }}>£8,420.00</strong>
            <span style={{ borderRadius: 999, background: "#e9f7f1", color: "#0b6848", padding: "7px 10px", fontSize: 12, fontWeight: 850 }}>
              Eligible estimate
            </span>
          </div>
        </div>

        {/* Lines */}
        <div style={{ padding: "8px 20px 18px" }}>
          {PAY_LINES.map((line, i) => (
            <div
              key={line.label}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                padding: "13px 0", borderBottom: i < PAY_LINES.length - 1 ? "1px solid #EAE5D8" : "none",
                color: "#52616f", fontSize: 14, fontWeight: 700,
              }}
            >
              <span>{line.label}</span>
              <span style={{ color: "#102033", fontWeight: 850 }}>{line.value}</span>
            </div>
          ))}
        </div>

        {/* Case panel */}
        <div style={{ margin: "0 20px 20px", border: "1px solid #A6C2E0", borderRadius: 8, background: "#FBF9F3", padding: 14 }}>
          <strong style={{ display: "block", color: "#16324f", fontSize: 14, marginBottom: 3 }}>Based on your answers</strong>
          <p style={{ margin: 0, color: "#52616f", fontSize: 13 }}>
            This estimate separates statutory figures, assumptions and next steps. It is educational, not legal advice.
          </p>
        </div>
      </article>
    </div>
  );
}
