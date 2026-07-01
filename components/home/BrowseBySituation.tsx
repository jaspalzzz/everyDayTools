import Link from "next/link";

const SITUATIONS = [
  {
    icon: "£",
    title: "I left or lost my job",
    desc: "Final pay, notice, redundancy, severance and termination payments.",
    cta: "Check final pay",
    href: "/redundancy-pay-calculator",
  },
  {
    icon: "$",
    title: "I was not paid correctly",
    desc: "Missing wages, overtime, commission, deductions and payslip issues.",
    cta: "Find wage tools",
    href: "/payslip-analyser",
  },
  {
    icon: "+",
    title: "I am sick or on leave",
    desc: "Sick pay, holiday pay, maternity pay and workplace absence rules.",
    cta: "Check leave pay",
    href: "/holiday-entitlement-calculator",
  },
  {
    icon: "↔",
    title: "My hours changed",
    desc: "Salary to hourly, working days, overtime rates and take-home checks.",
    cta: "Review hours",
    href: "/take-home-overtime-calculator",
  },
  {
    icon: "?",
    title: "I do not know what to use",
    desc: "Answer a few questions and get matched to the right calculator.",
    cta: "Start matcher",
    href: "/#all-calculators",
  },
] as const;

export function BrowseBySituation() {
  return (
    <section aria-labelledby="situation-title">
      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <h2 id="situation-title" className="text-[1.625rem] font-bold leading-tight text-ink">
            Start with what happened
          </h2>
          <p className="mt-2 text-[15px] text-ink-soft">
            Pay-rights questions are easier when they begin with the real-life situation, not a legal term.
          </p>
        </div>
        <Link
          href="/#all-calculators"
          className="hidden shrink-0 text-[14px] font-bold hover:underline sm:block"
          style={{ color: "#0f56bd" }}
        >
          View all situations →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
        {SITUATIONS.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group flex min-h-[166px] flex-col justify-between rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
            style={{ borderColor: "#d8e2ec", boxShadow: "0 1px 0 rgba(16,32,51,.02)" }}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg text-base font-black"
              style={{ background: "#eaf3ff", color: "#1769e0" }}
            >
              {s.icon}
            </span>
            <div>
              <strong className="block text-[15px] font-bold leading-snug text-ink">{s.title}</strong>
              <p className="mb-3.5 mt-2 text-[13px] leading-snug text-ink-soft">{s.desc}</p>
              <span className="text-[13px] font-bold" style={{ color: "#0f56bd" }}>
                {s.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
