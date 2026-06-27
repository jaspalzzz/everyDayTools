import Link from "next/link";
import Image from "next/image";
import { TOOLS, CATEGORY_META, type ToolCategory } from "@/data/tools";
import { SITE } from "@/lib/seo";

const POPULAR_FAQS = [
  { label: "Can employer refuse redundancy pay?", href: "/faq/can-employer-refuse-redundancy-pay" },
  { label: "Is redundancy pay tax free?", href: "/faq/is-redundancy-pay-tax-free" },
  { label: "What is PILON?", href: "/faq/what-is-pilon-uk" },
  { label: "What is garden leave?", href: "/faq/what-is-garden-leave-uk" },
  { label: "How much is a settlement agreement worth?", href: "/faq/how-much-is-a-settlement-agreement-worth" },
  { label: "US state PTO payout laws", href: "/us/pto-payout" },
  { label: "UK redundancy rights guide", href: "/uk/redundancy" },
  { label: "US overtime law explained", href: "/us/overtime" },
];

const CATEGORY_ORDER: ToolCategory[] = ["leaving-job", "pay-tax", "parental-leave", "benefits"];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-surface-line">
      <div className="mx-auto max-w-content px-5 py-10">
        {/* Tool columns */}
        <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {CATEGORY_ORDER.map((cat) => (
            <div key={cat}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-brand-600">
                {CATEGORY_META[cat].label}
              </p>
              <ul className="flex flex-col gap-1.5">
                {TOOLS.filter((t) => t.category === cat).map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/${tool.slug}`}
                      className="text-xs text-ink-faint transition-colors hover:text-ink-soft"
                    >
                      {tool.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular guides & FAQs */}
        <div className="mb-10 border-t border-surface-line pt-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-brand-600">
            Popular guides & questions
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
            {POPULAR_FAQS.map((f) => (
              <li key={f.href}>
                <Link href={f.href} className="text-xs text-ink-faint transition-colors hover:text-ink-soft">
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-surface-line pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Brand */}
            <div className="flex flex-col gap-1.5">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo-mark.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-ink">{SITE.name}</span>
              </Link>
              <p className="max-w-xs text-xs text-ink-faint">
                Estimates for general information only.{" "}
                <Link href="/disclaimer" className="underline-offset-2 hover:underline">
                  Not legal or financial advice.
                </Link>{" "}
                Always confirm figures with the relevant official authority.
              </p>
            </div>

            {/* Legal links */}
            <nav aria-label="Footer legal" className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/" className="text-xs text-ink-faint hover:text-ink-soft">Home</Link>
              <Link href="/about" className="text-xs text-ink-faint hover:text-ink-soft">About</Link>
              <Link href="/methodology" className="text-xs text-ink-faint hover:text-ink-soft">Methodology</Link>
              <Link href="/editorial-policy" className="text-xs text-ink-faint hover:text-ink-soft">Editorial policy</Link>
              <Link href="/privacy" className="text-xs text-ink-faint hover:text-ink-soft">Privacy</Link>
              <Link href="/terms" className="text-xs text-ink-faint hover:text-ink-soft">Terms</Link>
              <Link href="/disclaimer" className="text-xs text-ink-faint hover:text-ink-soft">Disclaimer</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
