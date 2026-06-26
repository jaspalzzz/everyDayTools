import type { FaqItem } from "@/lib/types";

/**
 * Static FAQ block targeting People Also Ask. Rendered server-side so Q&A
 * text is in the initial HTML for crawlers. Uses <details> for native,
 * accessible, no-JS expand/collapse with an explicit aria-expanded mirror
 * for AT that don't map the open attribute.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq-heading" className="mt-10">
      <h2 id="faq-heading" className="text-lg font-medium text-ink">
        Frequently asked questions
      </h2>
      <div className="mt-4 flex flex-col divide-y divide-surface-line border-y border-surface-line">
        {items.map((item) => (
          <details key={item.question} className="group py-3">
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink"
              aria-expanded="false"
            >
              {item.question}
              <i
                className="ti ti-chevron-down shrink-0 text-ink-faint transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-2 pr-6 text-sm leading-relaxed text-ink-soft">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
