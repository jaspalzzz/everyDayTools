import type { Metadata } from "next";
import Link from "next/link";
import { FinalPaycheckLateChecker } from "@/components/calculators/FinalPaycheckLateChecker";
import { SITE, jsonLd } from "@/lib/seo";

const url = `${SITE.url}/us/final-paycheck/was-my-final-paycheck-late`;

export const metadata: Metadata = {
  title: "Was My Final Paycheck Late? State Deadline Checker",
  description:
    "Enter your state, last day worked, final paycheck date, and how employment ended to estimate whether your final paycheck was late.",
  alternates: { canonical: url },
};

export default function LatePaycheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Was my final paycheck late checker",
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
          <span>Late checker</span>
        </nav>
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Was my final paycheck late?
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Use state timing rules and your actual payment date to estimate whether your
            final paycheck missed the legal deadline.
          </p>
        </div>
        <FinalPaycheckLateChecker />
      </main>
    </>
  );
}
