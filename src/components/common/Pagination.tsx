"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

const PAGE_SIZES = [5, 10, 20, 50];

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, "ellipsis", total];
  }

  if (current >= total - 2) {
    return [1, "ellipsis", total - 2, total - 1, total];
  }

  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

export function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onChange,
  onPageSize,
  variant = "standalone",
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onChange: (page: number) => void;
  onPageSize?: (size: number) => void;
  variant?: "standalone" | "table-footer";
}) {
  if (totalItems === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  const pages = getPageNumbers(page, totalPages);

  const navButtonClass =
    "inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-line bg-white text-ink-soft transition hover:border-secondary/30 hover:bg-bg-soft hover:text-ink disabled:cursor-not-allowed disabled:opacity-40";

  const pageButtonClass = (active: boolean) =>
    cn(
      "inline-flex h-7 min-w-7 items-center justify-center rounded-md border text-xs font-semibold transition",
      active
        ? "border-secondary bg-secondary text-white shadow-sm"
        : "border-line bg-white text-ink-soft hover:border-secondary/30 hover:bg-bg-soft hover:text-ink",
    );

  const content = (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <p className="text-xs text-ink-soft">
        Showing{" "}
        <span className="font-semibold text-ink">{start}</span> to{" "}
        <span className="font-semibold text-ink">{end}</span> of{" "}
        <span className="font-semibold text-ink">{totalItems}</span> entries
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {onPageSize ? (
          <label className="admin-toolbar-field">
            <span className="admin-toolbar-label">Page size</span>
            <select
              className="admin-toolbar-select w-[4.75rem]"
              value={String(pageSize)}
              onChange={(e) => onPageSize(Number(e.target.value))}
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {totalPages > 1 ? (
          <nav
            className="flex items-center gap-1.5"
            aria-label="Pagination navigation"
          >
            <button
              type="button"
              className={navButtonClass}
              disabled={page <= 1}
              onClick={() => onChange(page - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {pages.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="inline-flex h-7 min-w-7 items-center justify-center text-xs text-ink-soft"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  className={pageButtonClass(item === page)}
                  onClick={() => onChange(item)}
                  aria-current={item === page ? "page" : undefined}
                >
                  {item}
                </button>
              ),
            )}

            <button
              type="button"
              className={navButtonClass}
              disabled={page >= totalPages}
              onClick={() => onChange(page + 1)}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        ) : null}
      </div>
    </div>
  );

  if (variant === "table-footer") {
    return (
      <div className="border-t border-line px-3 py-2 sm:px-4">{content}</div>
    );
  }

  return <div className="surface-card p-3">{content}</div>;
}
