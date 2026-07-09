import Link from "next/link";
import { relatedSituations, situationTools } from "@/data/relatedContent";

/**
 * Cross-link block for /situations/* pages: sibling situations + the
 * calculators relevant to this situation. Drives inbound links between the
 * high-intent situation pages (which were previously orphaned) and out to the
 * calculators, in one shared, data-driven place.
 */
export function SituationRelated({ slug }: { slug: string }) {
  const peers = relatedSituations(slug);
  const tools = situationTools(slug);

  if (peers.length === 0 && tools.length === 0) return null;

  return (
    <section
      aria-labelledby="situation-related-heading"
      className="mt-12 max-w-2xl border-t border-surface-line pt-8"
    >
      {peers.length > 0 && (
        <>
          <h2 id="situation-related-heading" className="mb-4 text-sm font-semibold text-ink">
            Related situations
          </h2>
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {peers.map((p) => (
              <Link
                key={p.slug}
                href={`/situations/${p.slug}`}
                className="rounded-lg border border-surface-line bg-white px-4 py-3 text-ink transition-colors hover:bg-surface-muted"
              >
                <span className="block text-xs font-semibold">{p.label} →</span>
                <span className="mt-1 block text-[11px] font-medium leading-snug text-ink-soft">{p.blurb}</span>
              </Link>
            ))}
          </div>
        </>
      )}

      {tools.length > 0 && (
        <>
          <h2 className="mb-4 text-sm font-semibold text-ink">Work out what you&apos;re owed</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className="rounded-lg border border-surface-line bg-white px-4 py-3 text-xs font-medium text-ink transition-colors hover:bg-surface-muted"
              >
                {t.name} →
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
