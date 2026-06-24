import Link from "next/link";
import { SITE } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-surface-line">
      <div className="mx-auto flex max-w-content flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
          <span className="text-sm font-medium text-ink">{SITE.name}</span>
          <span className="text-xs text-ink-faint">
            — informational only. Not legal or financial advice.
          </span>
        </div>
        <nav aria-label="Footer" className="flex gap-4">
          <Link href="/" className="text-xs text-ink-faint hover:text-ink-soft">
            Home
          </Link>
          <Link href="/about" className="text-xs text-ink-faint hover:text-ink-soft">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
