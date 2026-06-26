import Link from "next/link";
import Image from "next/image";
import { TOOLS } from "@/data/tools";
import { SITE } from "@/lib/seo";

export function SiteHeader() {
  return (
    <header className="border-b border-surface-line">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-mark.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
            priority
            aria-hidden="true"
          />
          <span className="text-base font-medium tracking-tight text-ink">{SITE.name}</span>
        </Link>
        <nav aria-label="Tools" className="hidden items-center gap-5 sm:flex">
          {TOOLS.filter((t) => t.hero).map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {tool.shortName}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
