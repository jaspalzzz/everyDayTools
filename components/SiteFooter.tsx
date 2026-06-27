import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-white" style={{ borderColor: "#e7edf3" }}>
      <div
        className="mx-auto grid max-w-[1180px] gap-6 px-6 py-9"
        style={{ gridTemplateColumns: "1.2fr repeat(4, 1fr)" }}
      >
        {/* Brand column */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 font-extrabold" style={{ color: "#16324f" }}>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-[7px] text-sm font-black"
              style={{ border: "1px solid #b7d3f4", background: "#f2f7fd", color: "#1769e0" }}
            >
              M
            </span>
            MyPayRights
          </Link>
          <p className="mt-2.5 max-w-[330px] text-[13px] leading-relaxed" style={{ color: "#52616f" }}>
            Private educational calculators for pay, leave, termination and workplace money questions. Estimates are not legal advice.
          </p>
        </div>

        {/* Leaving a job */}
        <div>
          <h4 className="mb-3 text-[13px] font-bold uppercase tracking-[.06em]" style={{ color: "#16324f" }}>
            Leaving a job
          </h4>
          <Link href="/redundancy-pay-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Redundancy pay</Link>
          <Link href="/notice-period-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Notice pay</Link>
          <Link href="/final-paycheck-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Final paycheck</Link>
          <Link href="/settlement-agreement-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Settlement agreement</Link>
        </div>

        {/* Pay & tax */}
        <div>
          <h4 className="mb-3 text-[13px] font-bold uppercase tracking-[.06em]" style={{ color: "#16324f" }}>
            Pay &amp; tax
          </h4>
          <Link href="/take-home-pay-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Take-home pay</Link>
          <Link href="/overtime-pay-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Overtime pay</Link>
          <Link href="/pay-rise-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Pay rise</Link>
          <Link href="/unpaid-wages-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Unpaid wages</Link>
        </div>

        {/* Countries */}
        <div>
          <h4 className="mb-3 text-[13px] font-bold uppercase tracking-[.06em]" style={{ color: "#16324f" }}>
            Countries
          </h4>
          <Link href="/uk" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>United Kingdom</Link>
          <Link href="/us" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>United States</Link>
          <Link href="/ca" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Canada</Link>
          <Link href="/au" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Australia</Link>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-3 text-[13px] font-bold uppercase tracking-[.06em]" style={{ color: "#16324f" }}>
            Company
          </h4>
          <Link href="/about" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>About</Link>
          <Link href="/privacy" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Privacy</Link>
          <Link href="/terms" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Terms</Link>
          <Link href="/disclaimer" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Disclaimer</Link>
        </div>
      </div>

      {/* Bottom note */}
      <div className="border-t" style={{ borderColor: "#e7edf3" }}>
        <p className="mx-auto max-w-[1180px] px-6 py-4 text-[12px]" style={{ color: "#6d7b88" }}>
          © {new Date().getFullYear()} MyPayRights. All figures are educational estimates and are not legal or financial advice.{" "}
          <Link href="/disclaimer" className="underline-offset-2 hover:underline">Read the disclaimer.</Link>
        </p>
      </div>
    </footer>
  );
}
