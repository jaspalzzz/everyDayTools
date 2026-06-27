import Link from "next/link";
import { TOOLS } from "@/data/tools";
import { TablerIcon } from "@/components/TablerIcon";
import { CARD_THEMES, type CardTheme } from "./cardThemes";

function count(category: string) {
  return TOOLS.filter((t) => t.category === category).length;
}

const CATEGORIES: { title: string; icon: string; theme: CardTheme; href: string; count: number }[] = [
  { title: "Leaving a Job", icon: "ti-briefcase", theme: "blue", href: "#cat-leaving-job", count: count("leaving-job") },
  { title: "Pay & Tax", icon: "ti-cash", theme: "green", href: "#cat-pay-tax", count: count("pay-tax") },
  { title: "Parental Leave", icon: "ti-users", theme: "purple", href: "#cat-parental-leave", count: count("parental-leave") },
  { title: "Benefits & Entitlements", icon: "ti-gift", theme: "red", href: "#cat-benefits", count: count("benefits") },
  { title: "Workplace Issues", icon: "ti-shield-check", theme: "blue", href: "/tribunal-compensation-calculator", count: 6 },
  { title: "Guides & Tools", icon: "ti-file-text", theme: "orange", href: "/guides", count: 15 },
];

const TRUST = [
  { icon: "ti-shield-check", title: "100% Free", desc: "Always free forever", theme: "blue" as const },
  { icon: "ti-scale", title: "Law Backed", desc: "Based on official legislation", theme: "blue" as const },
  { icon: "ti-world", title: "Multi-Country", desc: "UK, US, CA & AU coverage", theme: "blue" as const },
  { icon: "ti-users", title: "Trusted by Users", desc: "Thousands of employees", theme: "green" as const },
  { icon: "ti-lock", title: "Private & Secure", desc: "We don't store your personal data", theme: "green" as const },
];

export function BrowseByCategory() {
  return (
    <section aria-labelledby="category-heading" className="mt-6">
      <h2 id="category-heading" className="mb-8 text-2xl font-bold text-ink">
        Browse by category
      </h2>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="flex items-center gap-3 rounded-xl border border-surface-line bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-px hover:border-brand-600 hover:shadow-md"
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${CARD_THEMES[c.theme]}`}>
              <TablerIcon name={c.icon} size={18} aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="text-[13px] font-bold text-ink">{c.title}</span>
              <span className="text-[11px] text-ink-soft">{c.count} calculators</span>
            </span>
          </Link>
        ))}
      </div>

      {/* Trust pill box */}
      <div className="flex flex-col items-stretch gap-5 rounded-2xl border border-brand-100 bg-brand-50 px-8 py-5 lg:flex-row lg:items-center lg:justify-between">
        {TRUST.map((t) => (
          <div key={t.title} className="flex flex-1 items-center gap-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${t.theme === "green" ? "text-emerald-500" : "text-brand-600"}`}>
              <TablerIcon name={t.icon} size={18} aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="text-[13px] font-bold text-ink">{t.title}</span>
              <span className="text-[11px] text-ink-soft">{t.desc}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
