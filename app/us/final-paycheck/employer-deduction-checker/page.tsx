import type { Metadata } from "next";
import Link from "next/link";
import { EmployerDeductionChecker } from "@/components/calculators/EmployerDeductionChecker";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/us/final-paycheck/employer-deduction-checker`;

export const metadata: Metadata = {
  title: "Can My Employer Deduct From My Final Paycheck?",
  description:
    "Check whether an employer deduction for equipment, uniforms, shortages, damage, taxes, or written authorization needs review before accepting final pay.",
  alternates: { canonical: url },
};

export default function DeductionCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Employer final paycheck deduction checker",
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
          <Link href="/us/final-paycheck" className="hover:text-ink-soft">Final paycheck</Link>
          <span className="mx-1.5">/</span>
          <span>Deduction checker</span>
        </nav>
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Can my employer deduct from my final paycheck?
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Employer deductions from final wages are highly state-specific. This checker
            flags common deduction types that need closer review before you accept the
            final paycheck or file a wage claim.
          </p>
        </div>
        <EmployerDeductionChecker />
      </main>
    </>
  );
}
