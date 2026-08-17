"use client";

import Image from "next/image";
import { cn } from "@/utils/cn";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

export function DataTable<T extends { id: number | string }>({
  columns,
  rows,
  emptyMessage = "No records found",
}: {
  columns: Column<T>[];
  rows: T[];
  emptyMessage?: string;
}) {
  if (!rows.length) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center text-ink-soft">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-sm scrollbar-thin">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-bg/80 text-ink-soft">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "whitespace-nowrap px-4 py-3 font-semibold",
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-line hover:bg-bg/50">
              {columns.map((column) => (
                <td key={column.key} className={cn("px-4 py-3 align-middle", column.className)}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TablePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-line">
      <Image src={src} alt={alt} fill className="object-cover" sizes="44px" />
    </div>
  );
}

export function StatusPill({
  status,
}: {
  status: string | boolean;
}) {
  const label = String(status);
  const tone =
    label === "active" || label === "true" || label === "verified"
      ? "bg-success/10 text-success"
      : label === "pending"
        ? "bg-warning/10 text-warning"
        : "bg-ink/5 text-ink-soft";
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold capitalize", tone)}>
      {label}
    </span>
  );
}
