import Link from "next/link";
import { TOOLS } from "@/data/tools";
import { TablerIcon } from "@/components/TablerIcon";

export default function NotFound() {
  const heroTools = TOOLS.filter((t) => t.hero).slice(0, 4);

  return (
    <div className="mx-auto max-w-content px-5 py-20">
      <div className="mx-auto max-w-md text-center">
        <p className="text-5xl font-medium text-brand-200">404</p>
        <h1 className="mt-4 text-xl font-medium text-ink">Page not found</h1>
        <p className="mt-2 text-sm text-ink-soft">
          That page doesn't exist. Try one of our most popular calculators below.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
        >
          <TablerIcon name="ti-home" size={16} aria-hidden="true" />
          All tools
        </Link>
      </div>

      <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
        {heroTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="flex items-center gap-3 rounded-lg border border-surface-line bg-white px-4 py-3 hover:bg-surface-muted"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-muted text-ink-soft">
              <TablerIcon name={tool.icon} size={16} aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-ink">{tool.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
