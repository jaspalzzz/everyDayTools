import Link from "next/link";

function SketchPayslip() {
  return (
    <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <rect width="260" height="150" fill="#e8f2fb"/>
      {/* Document outline */}
      <rect x="55" y="18" width="110" height="114" rx="5" fill="white" stroke="#7aaedc" strokeWidth="2"/>
      {/* Fold corner */}
      <path d="M140 18 L165 18 L165 43 Z" fill="#c8dff2" stroke="#7aaedc" strokeWidth="1.5"/>
      <path d="M140 18 L140 43 L165 43" fill="none" stroke="#7aaedc" strokeWidth="1.5"/>
      {/* Header bar */}
      <rect x="55" y="18" width="110" height="24" rx="5" fill="#1769e0" opacity="0.12"/>
      {/* Lines of text */}
      <line x1="70" y1="55" x2="155" y2="55" stroke="#a0bcd8" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="70" y1="67" x2="140" y2="67" stroke="#a0bcd8" strokeWidth="2" strokeLinecap="round"/>
      {/* Row items */}
      <line x1="70" y1="82" x2="115" y2="82" stroke="#c2d8ec" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="130" y1="82" x2="155" y2="82" stroke="#1769e0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="70" y1="93" x2="110" y2="93" stroke="#c2d8ec" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="130" y1="93" x2="152" y2="93" stroke="#1769e0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="70" y1="104" x2="118" y2="104" stroke="#c2d8ec" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="130" y1="104" x2="155" y2="104" stroke="#1769e0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      {/* Divider */}
      <line x1="65" y1="113" x2="160" y2="113" stroke="#b3ceea" strokeWidth="1" strokeDasharray="4 3"/>
      {/* Total */}
      <line x1="70" y1="122" x2="108" y2="122" stroke="#7aaedc" strokeWidth="2" strokeLinecap="round"/>
      <rect x="126" y="117" width="32" height="10" rx="3" fill="#1769e0" opacity="0.18"/>
      {/* Coins bottom right */}
      <circle cx="205" cy="110" r="22" fill="#dceef9" stroke="#7aaedc" strokeWidth="1.5"/>
      <circle cx="205" cy="110" r="15" fill="white" stroke="#7aaedc" strokeWidth="1.5"/>
      <text x="205" y="115" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1769e0">£</text>
      <circle cx="222" cy="95" r="14" fill="#eaf3ff" stroke="#7aaedc" strokeWidth="1.5"/>
    </svg>
  );
}

function SketchScales() {
  return (
    <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <rect width="260" height="150" fill="#fef6e8"/>
      {/* Centre pole */}
      <line x1="130" y1="28" x2="130" y2="120" stroke="#c8a96b" strokeWidth="3" strokeLinecap="round"/>
      {/* Base */}
      <rect x="108" y="118" width="44" height="8" rx="4" fill="#c8a96b"/>
      {/* Beam */}
      <line x1="60" y1="50" x2="200" y2="50" stroke="#b7791f" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Left chain */}
      <line x1="75" y1="50" x2="75" y2="78" stroke="#c8a96b" strokeWidth="1.5" strokeDasharray="4 3"/>
      {/* Right chain */}
      <line x1="185" y1="50" x2="185" y2="68" stroke="#c8a96b" strokeWidth="1.5" strokeDasharray="4 3"/>
      {/* Left pan */}
      <path d="M55 78 Q75 88 95 78" fill="#fdedc8" stroke="#b7791f" strokeWidth="2"/>
      {/* Right pan (lower — unbalanced) */}
      <path d="M165 68 Q185 78 205 68" fill="#fdedc8" stroke="#b7791f" strokeWidth="2"/>
      {/* Left pan items (coins) */}
      <circle cx="68" cy="77" r="7" fill="#f7c873" stroke="#b7791f" strokeWidth="1.5"/>
      <circle cx="82" cy="77" r="7" fill="#f7c873" stroke="#b7791f" strokeWidth="1.5"/>
      {/* Right pan item (heavier — legal doc) */}
      <rect x="173" y="52" width="24" height="16" rx="3" fill="white" stroke="#b7791f" strokeWidth="1.5"/>
      <line x1="177" y1="57" x2="193" y2="57" stroke="#b7791f" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="177" y1="62" x2="190" y2="62" stroke="#b7791f" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Alert icon top-right */}
      <circle cx="210" cy="30" r="14" fill="#fff4df" stroke="#b7791f" strokeWidth="1.5"/>
      <text x="210" y="35" textAnchor="middle" fontSize="14" fontWeight="900" fill="#b7791f">!</text>
      {/* Gavel bottom-left */}
      <rect x="42" y="100" width="30" height="10" rx="3" fill="#c8a96b" stroke="#b7791f" strokeWidth="1.5" transform="rotate(-30 57 105)"/>
      <rect x="32" y="112" width="8" height="22" rx="3" fill="#c8a96b" stroke="#b7791f" strokeWidth="1.5" transform="rotate(-30 36 123)"/>
    </svg>
  );
}

function SketchGlobe() {
  return (
    <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <rect width="260" height="150" fill="#e8f4ef"/>
      {/* Globe circle */}
      <circle cx="120" cy="75" r="52" fill="white" stroke="#16835b" strokeWidth="2"/>
      {/* Latitude lines */}
      <ellipse cx="120" cy="75" rx="52" ry="18" fill="none" stroke="#a3d4bf" strokeWidth="1.5"/>
      <ellipse cx="120" cy="75" rx="52" ry="36" fill="none" stroke="#a3d4bf" strokeWidth="1"/>
      {/* Meridian */}
      <ellipse cx="120" cy="75" rx="22" ry="52" fill="none" stroke="#a3d4bf" strokeWidth="1.5"/>
      <line x1="120" y1="23" x2="120" y2="127" stroke="#a3d4bf" strokeWidth="1"/>
      {/* Equator */}
      <line x1="68" y1="75" x2="172" y2="75" stroke="#a3d4bf" strokeWidth="1"/>
      {/* Country pins */}
      <circle cx="108" cy="62" r="5" fill="#1769e0"/>
      <line x1="108" y1="62" x2="108" y2="50" stroke="#1769e0" strokeWidth="1.5"/>
      <circle cx="133" cy="70" r="5" fill="#16835b"/>
      <line x1="133" y1="70" x2="133" y2="58" stroke="#16835b" strokeWidth="1.5"/>
      <circle cx="120" cy="88" r="5" fill="#b7791f"/>
      <line x1="120" y1="88" x2="120" y2="76" stroke="#b7791f" strokeWidth="1.5"/>
      {/* Calendar to the right */}
      <rect x="185" y="40" width="52" height="52" rx="5" fill="white" stroke="#16835b" strokeWidth="2"/>
      <rect x="185" y="40" width="52" height="14" rx="5" fill="#16835b"/>
      <line x1="200" y1="35" x2="200" y2="45" stroke="#16835b" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="222" y1="35" x2="222" y2="45" stroke="#16835b" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Calendar grid */}
      {[0,1,2].map(row => [0,1,2,3].map(col => (
        <circle key={`${row}-${col}`} cx={197+col*12} cy={62+row*12} r="3" fill={row===0&&col===0 ? "#16835b" : "#d0e9e0"}/>
      )))}
    </svg>
  );
}

const GUIDES = [
  {
    badge: "UK guide",
    title: "What should be in your final paycheck?",
    desc: "Understand wages, notice pay, holiday pay and deductions after leaving work.",
    href: "/guides/uk-final-paycheck",
    Illustration: SketchPayslip,
    bg: "#e8f2fb",
  },
  {
    badge: "Workplace pay",
    title: "When unpaid wages become a legal issue",
    desc: "How to identify missing pay, gather evidence and raise the problem clearly.",
    href: "/guides/uk-unpaid-wages",
    Illustration: SketchScales,
    bg: "#fef6e8",
  },
  {
    badge: "Notice pay",
    title: "Notice period rights by country",
    desc: "Compare how notice periods, dismissal and final pay timing differ by location.",
    href: "/guides/notice-period-rights",
    Illustration: SketchGlobe,
    bg: "#e8f4ef",
  },
] as const;

export function GuidesResources() {
  return (
    <section aria-labelledby="guides-title" style={{ marginTop: 58 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 20 }}>
        <div>
          <h2 id="guides-title" style={{ margin: 0, color: "#102033", fontSize: 28, lineHeight: 1.15 }}>
            Guides that explain your rights
          </h2>
          <p style={{ maxWidth: 560, margin: "8px 0 0", color: "#52616f", fontSize: 15 }}>
            Plain-English guides to employment law — understand your rights before taking action.
          </p>
        </div>
        <Link href="/guides" style={{ color: "#0f56bd", fontSize: 14, fontWeight: 850, whiteSpace: "nowrap" }}>
          View all guides →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
        {GUIDES.map((g) => (
          <article key={g.title} style={{ border: "1px solid #d8e2ec", borderRadius: 8, background: "#fff", overflow: "hidden" }}>
            {/* Sketch illustration area */}
            <div style={{ position: "relative", height: 150, background: g.bg }}>
              <g.Illustration />
              <span
                style={{ position: "absolute", bottom: 12, left: 12, display: "inline-flex", borderRadius: 999, background: "rgba(255,255,255,.92)", color: "#16324f", padding: "5px 9px", fontSize: 11, fontWeight: 850 }}
              >
                {g.badge}
              </span>
            </div>
            {/* Body */}
            <div style={{ padding: 17 }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 18, lineHeight: 1.25, color: "#102033" }}>
                {g.title}
              </h3>
              <p style={{ margin: "0 0 14px", color: "#52616f", fontSize: 14 }}>
                {g.desc}
              </p>
              <Link href={g.href} style={{ color: "#0f56bd", fontSize: 13, fontWeight: 850 }}>
                Read guide →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
