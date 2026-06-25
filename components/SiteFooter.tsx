import Link from "next/link";
import { SITE } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-surface-line">
      <div className="mx-auto max-w-content px-5 py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
              <span className="text-sm font-medium text-ink">{SITE.name}</span>
            </div>
            <p className="max-w-sm text-xs text-ink-faint">
              Estimates for general information only.{" "}
              <Link href="/disclaimer" className="underline-offset-2 hover:underline">
                Not legal or financial advice.
              </Link>{" "}
              Always confirm figures with the relevant official authority.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/" className="text-xs text-ink-faint hover:text-ink-soft">
              Home
            </Link>
            <Link href="/about" className="text-xs text-ink-faint hover:text-ink-soft">
              About
            </Link>
            <Link href="/privacy" className="text-xs text-ink-faint hover:text-ink-soft">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-ink-faint hover:text-ink-soft">
              Terms
            </Link>
            <Link href="/disclaimer" className="text-xs text-ink-faint hover:text-ink-soft">
              Disclaimer
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
