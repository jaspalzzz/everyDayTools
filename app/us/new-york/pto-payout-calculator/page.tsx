import type { Metadata } from "next";
import Link from "next/link";
import { PtoPayoutCalculator } from "@/components/calculators/PtoPayoutCalculator";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/us/new-york/pto-payout-calculator`;

export const metadata: Metadata = {
  title: "New York PTO Payout Calculator 2026 - Unused Vacation Pay",
  description:
    "Estimate unused PTO or vacation payout in New York and understand when employer policy controls the payout rule.",
  alternates: { canonical: url },
};

export default function NewYorkPtoPayoutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "New York PTO payout calculator",
          url,
          applicationCategory: "FinanceApplication",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        })}
      />
      <main className="mx-auto max-w-content px-5 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-faint">
          <Link href="/" className="hover:text-ink-soft">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/us/pto-payout" className="hover:text-ink-soft">US PTO payout</Link>
          <span className="mx-1.5">/</span>
          <span>New York</span>
        </nav>
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            New York PTO payout calculator
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            New York generally lets a clearly communicated employer policy control
            whether unused vacation or PTO is forfeited or paid out. Use the calculator
            to estimate the gross value, then compare it with your written policy.
          </p>
        </div>
        <PtoPayoutCalculator presetStateCode="NY" />
        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
          <h2 className="mb-2 text-base font-bold">New York policy check</h2>
          <p>
            Save your handbook, offer letter, PTO balance, and final payslip. If the
            policy is silent, unclear, or was not communicated before separation, ask
            payroll to explain the legal basis for forfeiting accrued time.
          </p>
        </section>
      </main>
    </>
  );
}
