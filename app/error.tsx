"use client";

import Link from "next/link";
import { useEffect } from "react";
import { TablerIcon } from "@/components/TablerIcon";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-5 py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <TablerIcon name="ti-alert-triangle" className="text-2xl text-red-500" size={24} aria-hidden="true" />
      </span>
      <div>
        <h1 className="text-xl font-medium text-ink">Something went wrong</h1>
        <p className="mt-2 text-sm text-ink-soft">
          The calculator hit an unexpected error. Your data has not been saved.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border border-surface-line px-4 py-2 text-sm font-medium text-ink-soft hover:bg-surface-muted"
        >
          Back to all tools
        </Link>
      </div>
    </div>
  );
}
