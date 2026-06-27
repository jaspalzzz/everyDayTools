import Link from "next/link";

const GUIDES = [
  {
    badge: "UK guide",
    bgStyle: {
      background: "linear-gradient(180deg,rgba(16,32,51,.05) 0%,rgba(16,32,51,.76) 100%), linear-gradient(135deg,#23435f 0%,#d9e8f4 48%,#1769e0 100%)",
    },
    title: "What should be in your final paycheck?",
    desc: "Understand wages, notice pay, holiday pay and deductions after leaving work.",
    href: "/guides/uk-final-paycheck",
  },
  {
    badge: "Workplace pay",
    bgStyle: {
      background: "linear-gradient(180deg,rgba(16,32,51,.02) 0%,rgba(16,32,51,.76) 100%), linear-gradient(135deg,#16324f 0%,#f7c873 52%,#fff4df 100%)",
    },
    title: "When unpaid wages become a legal issue",
    desc: "How to identify missing pay, gather evidence and raise the problem clearly.",
    href: "/guides/uk-unpaid-wages",
  },
  {
    badge: "Notice pay",
    bgStyle: {
      background: "linear-gradient(180deg,rgba(16,32,51,.02) 0%,rgba(16,32,51,.76) 100%), linear-gradient(135deg,#1c5c46 0%,#b5ead4 50%,#f7fafc 100%)",
    },
    title: "Notice period rights by country",
    desc: "Compare how notice periods, dismissal and final pay timing differ by location.",
    href: "/guides/notice-period-rights",
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
            Use editorial content for confidence and context, not as another row of tiny product cards.
          </p>
        </div>
        <Link href="/guides" style={{ color: "#0f56bd", fontSize: 14, fontWeight: 850, whiteSpace: "nowrap" }}>
          View all guides →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
        {GUIDES.map((g) => (
          <article
            key={g.title}
            style={{ border: "1px solid #d8e2ec", borderRadius: 8, background: "#fff", overflow: "hidden" }}
          >
            {/* Gradient image area */}
            <div
              style={{ minHeight: 150, display: "grid", alignContent: "end", padding: 16, color: "#fff", ...g.bgStyle }}
            >
              <span
                style={{ display: "inline-flex", width: "fit-content", borderRadius: 999, background: "rgba(255,255,255,.92)", color: "#16324f", padding: "5px 9px", fontSize: 11, fontWeight: 850 }}
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
