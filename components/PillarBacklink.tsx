import Link from "next/link";

export function PillarBacklink({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-label="UK redundancy topic guide"
      className={`rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-sm ${className}`}
    >
      <span className="text-ink-soft">Part of our UK redundancy rights guide. </span>
      <Link href="/uk/redundancy" className="font-semibold text-brand-700 underline underline-offset-2">
        Explore the full redundancy guide →
      </Link>
    </aside>
  );
}
