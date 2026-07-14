import Link from "next/link";
import { SITE } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="border-t bg-white" style={{ borderColor: "#EAE5D8" }}>
      <div
        className="mx-auto grid max-w-[1180px] grid-cols-2 md:grid-cols-5 gap-8 px-6 py-9"
      >
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-flex items-center" style={{ gap: 10 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 84 84" aria-hidden="true">
              <g transform="translate(6 6) scale(.75)">
                <path d="M26 14h30l16 16v48H26z" fill="#FFFFFF"/>
                <path d="M56 14v16h16" fill="#EAF0F8"/>
                <path d="M26 14h30l16 16v48H26z" fill="none" stroke="#16324F" strokeWidth="5" strokeLinejoin="round"/>
                <path d="M56 14v16h16" fill="none" stroke="#16324F" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M36 35h18M36 47h22M36 59h14" fill="none" stroke="#16324F" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="67" cy="66" r="16" fill="#1E4E8C"/>
                <path d="M59 66l6 6 12-14" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </svg>
            <span style={{ color: "#102033", fontWeight: 800, fontSize: 16 }}>{SITE.name}</span>
          </Link>
          <p className="mt-2.5 max-w-[330px] text-[13px] leading-relaxed" style={{ color: "#52616f" }}>
            Source-led employment pay calculators for the UK, US, Canada and Australia. Built to show assumptions, review dates and correction paths.
          </p>
        </div>

        {/* Leaving a job */}
        <div>
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-[.06em]" style={{ color: "#16324f" }}>
            Leaving a job
          </h2>
          <Link href="/redundancy-pay-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Redundancy pay</Link>
          <Link href="/notice-period-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Notice pay</Link>
          <Link href="/final-paycheck-deadline-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Final paycheck</Link>
          <Link href="/settlement-agreement-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Settlement agreement</Link>
        </div>

        {/* Pay & tax */}
        <div>
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-[.06em]" style={{ color: "#16324f" }}>
            Pay &amp; tax
          </h2>
          <Link href="/take-home-pay-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Take-home pay</Link>
          <Link href="/take-home-overtime-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Overtime pay</Link>
          <Link href="/pay-rise-calculator" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Pay rise</Link>
          <Link href="/payslip-analyser" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Payslip analyser</Link>
        </div>

        {/* Countries */}
        <div>
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-[.06em]" style={{ color: "#16324f" }}>
            Countries
          </h2>
          <Link href="/uk" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>United Kingdom</Link>
          <Link href="/us" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>United States</Link>
          <Link href="/ca" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Canada</Link>
          <Link href="/au" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Australia</Link>
        </div>

        {/* Company */}
        <div>
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-[.06em]" style={{ color: "#16324f" }}>
            Company
          </h2>
          <Link href="/about" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>About</Link>
          <Link href="/methodology" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Methodology</Link>
          <Link href="/editorial-policy" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Editorial policy</Link>
          <Link href="/updates" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Update log</Link>
          <Link href="/research/us-final-paycheck-laws" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>US law dataset</Link>
          <Link href="/contact" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Contact</Link>
          <Link href="/contact" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Corrections</Link>
          <Link href="/privacy" className="flex items-center py-2 text-[13px] font-semibold underline underline-offset-2" style={{ color: "#52616f", minHeight: 44 }}>Privacy policy</Link>
          <Link href="/terms" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Terms</Link>
          <Link href="/disclaimer" className="block py-2 text-[13px] font-semibold" style={{ color: "#52616f" }}>Disclaimer</Link>
        </div>
      </div>

      {/* Bottom note */}
      <div className="border-t" style={{ borderColor: "#EAE5D8" }}>
        <p className="mx-auto max-w-[1180px] px-6 py-4 text-[12px]" style={{ color: "#52616f" }}>
          © 2026 {SITE.name}. All figures are educational estimates and are not legal or financial advice.{" "}
          Figures are reviewed against official sources, labelled with assumptions and corrected through the published correction path.{" "}
          <Link href="/methodology" className="underline-offset-2 hover:underline">Methodology</Link>
          {" · "}
          <Link href="/editorial-policy" className="underline-offset-2 hover:underline">Editorial policy</Link>
          {" · "}
          <Link href="/updates" className="underline-offset-2 hover:underline">Update log</Link>
          {" · "}
          <Link href="/disclaimer" className="underline-offset-2 hover:underline">Disclaimer</Link>
        </p>
      </div>
    </footer>
  );
}
