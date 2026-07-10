import Link from "next/link";
import { TablerIcon } from "@/components/TablerIcon";

const TOOLS = [
  {
    icon: "R",
    title: "Redundancy pay calculator",
    desc: "Estimate statutory or common redundancy pay based on country rules.",
    href: "/redundancy-pay-calculator",
  },
  {
    icon: "N",
    title: "Notice pay calculator",
    desc: "Check what notice pay may be owed after resignation or dismissal.",
    href: "/notice-period-calculator",
  },
  {
    icon: "H",
    title: "Holiday pay calculator",
    desc: "Calculate accrued holiday, unused leave and holiday entitlement.",
    href: "/holiday-entitlement-calculator",
  },
  {
    icon: "F",
    title: "Final paycheck deadline calculator",
    desc: "Find when your final wage payment should be made.",
    href: "/final-paycheck-deadline-calculator",
  },
] as const;

const RIGHTS_ITEMS = [
  "Official-source rate checks",
  "Country-aware calculation logic",
  "Private calculation flow",
  "Clear assumptions and next steps",
] as const;

export function PopularCalculators() {
  return (
    <section aria-labelledby="popular-title">
      <div
        className="grid gap-6 lg:grid-cols-2"
        style={{ alignItems: "start" }}
      >
        {/* Left: featured tool list */}
        <div
          className="overflow-hidden rounded-lg border bg-white"
          style={{ borderColor: "#c6d8ea", boxShadow: "0 10px 28px rgba(16,32,51,.08)" }}
        >
          <div className="flex items-center justify-between gap-4 border-b p-5" style={{ borderColor: "#EAE5D8" }}>
            <h2 id="popular-title" className="text-[1.375rem] font-bold text-ink">
              Most used calculators
            </h2>
            <span
              className="rounded-full px-2.5 py-1.5 text-[12px] font-bold whitespace-nowrap"
              style={{ background: "#e9f7f1", color: "#0b6848" }}
            >
              Current rules
            </span>
          </div>

          <div>
            {TOOLS.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group flex min-h-[86px] items-center gap-3.5 border-b px-5 py-3.5 transition-colors last:border-b-0 hover:bg-[#f5f9fe]"
                style={{ borderColor: "#EAE5D8" }}
              >
                <span
                  className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg text-[15px] font-black"
                  style={{ background: "#EAF0F8", color: "#1E4E8C" }}
                >
                  {tool.icon}
                </span>
                <span className="flex-1 min-w-0">
                  <strong className="block text-[15px] font-bold text-ink group-hover:text-brand-600">{tool.title}</strong>
                  <p className="mt-0.5 text-[13px] text-ink-soft">{tool.desc}</p>
                </span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-[#1E4E8C]"
                  style={{ background: "#EAF0F8" }}
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: navy rights panel */}
        <aside
          className="relative min-h-full overflow-hidden rounded-lg p-7 text-white"
          style={{ background: "#16324f" }}
        >
          {/* Decorative circle */}
          <div
            className="pointer-events-none absolute -right-[120px] -top-[120px] h-[280px] w-[280px] rounded-full"
            style={{ background: "rgba(255,255,255,.08)" }}
          />

          <h2 className="relative mb-3 text-[1.875rem] font-bold leading-[1.1]">
            Serious tools for sensitive pay questions.
          </h2>
          <p className="relative mb-5 text-[15px] leading-[1.62]" style={{ color: "#dce8f4" }}>
            Employment pay issues are personal. The product should feel calm, precise and usable enough to share with someone who needs a straight answer before taking the next step.
          </p>

          <ul className="relative mb-6 flex flex-col gap-2.5">
            {RIGHTS_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[14px] font-bold" style={{ color: "#f5fbff" }}>
                <span
                  className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[13px] font-black text-white"
                  style={{ background: "rgba(22,131,91,.95)" }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/#all-calculators"
            className="relative inline-flex min-h-[48px] items-center justify-center rounded-lg bg-white px-5 text-[14px] font-bold transition-opacity hover:opacity-90"
            style={{ color: "#16324f" }}
          >
            Start a private check
          </Link>
        </aside>
      </div>
    </section>
  );
}
