import { HomeToolList } from "@/components/HomeToolList";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-content px-5">
      <section className="py-12 text-center sm:py-16">
        <p className="text-xs font-medium uppercase tracking-widest text-ink-faint">
          Free · No signup · Instant results
        </p>
        <h1 className="mx-auto mt-4 max-w-xl text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
          Employment calculators that know <span className="text-brand-600">your country&apos;s rules</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          Redundancy, PTO payout, notice, severance and overtime — with the law built in. Enter
          your numbers, get your answer, download a PDF.
        </p>
      </section>

      <HomeToolList />

      <section className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-surface-line bg-surface-line sm:grid-cols-4">
        {[
          { icon: "ti-bolt", title: "Live results", sub: "Updates as you type" },
          { icon: "ti-world", title: "Country-aware", sub: "UK, US, CA, AU rules" },
          { icon: "ti-file-download", title: "PDF output", sub: "Download a summary" },
          { icon: "ti-lock", title: "Nothing stored", sub: "Runs in your browser" },
        ].map((p) => (
          <div key={p.title} className="bg-white px-4 py-5 text-center">
            <i className={`ti ${p.icon} text-xl text-ink-faint`} aria-hidden="true" />
            <p className="mt-2 text-xs font-medium text-ink">{p.title}</p>
            <p className="text-[11px] text-ink-faint">{p.sub}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
