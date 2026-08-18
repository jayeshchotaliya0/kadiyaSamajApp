"use client";

import Image from "next/image";
import { cn } from "@/utils/cn";
import { Pagination } from "@/components/common/Pagination";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

export interface TablePagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onChange: (page: number) => void;
  onPageSize?: (size: number) => void;
}

export function DataTable<T extends { id: number | string }>({
  columns,
  rows,
  emptyMessage = "No records found",
  pagination,
}: {
  columns: Column<T>[];
  rows: T[];
  emptyMessage?: string;
  pagination?: TablePagination;
}) {
  if (!rows.length && !pagination?.totalItems) {
    return (
      <div className="admin-table-card px-6 py-14 text-center text-ink-soft">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="admin-table-card overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="admin-table min-w-full text-left">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(column.className)}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row) => (
                <tr key={row.id} className="admin-table-row">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(column.className)}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="!whitespace-normal px-3 py-8 text-center text-sm text-ink-soft"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination ? (
        <Pagination
          variant="table-footer"
          page={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          onChange={pagination.onChange}
          onPageSize={pagination.onPageSize}
        />
      ) : null}
    </div>
  );
}

export function TablePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-line bg-bg-soft">
      <Image src={src} alt={alt} fill className="object-cover" sizes="32px" />
    </div>
  );
}

export function StatusPill({
  status,
}: {
  status: string | boolean;
}) {
  const label = String(status);
  const normalized = label.toLowerCase();

  const tone =
    normalized === "active" || normalized === "true" || normalized === "verified"
      ? "bg-success/10 text-success ring-1 ring-success/15"
      : normalized === "inactive" || normalized === "rejected"
        ? "bg-danger/10 text-danger ring-1 ring-danger/15"
        : normalized === "pending"
          ? "bg-warning/10 text-warning ring-1 ring-warning/15"
          : "bg-ink/5 text-ink-soft ring-1 ring-line";

  const display =
    normalized === "male"
      ? "Male"
      : normalized === "female"
        ? "Female"
        : label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize leading-tight",
        tone,
      )}
    >
      {display}
    </span>
  );
}
