"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import type { FilterField, FilterValues } from "@/types/filters";
import { FilterField as FilterFieldControl } from "@/components/admin/filters/FilterField";
import { FilterFooter } from "@/components/admin/filters/FilterFooter";

export function CommonFilterDrawer({
  open,
  onClose,
  fields,
  values,
  onChange,
  onApply,
  onReset,
  activeCount = 0,
}: {
  open: boolean;
  onClose: () => void;
  fields: FilterField[];
  values: FilterValues;
  onChange: (name: string, value: string) => void;
  onApply: () => void;
  onReset: () => void;
  activeCount?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const title =
    activeCount > 0 ? `Filters (${activeCount})` : "Filters";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] transition",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close filter drawer"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[25rem] flex-col bg-surface shadow-2xl transition-transform duration-300 sm:w-[min(100%,24rem)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-4">
          <h3 className="font-display text-lg font-bold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-ink-soft transition hover:bg-bg-soft hover:text-ink"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
          <div className="space-y-4">
            {fields.map((field) => (
              <FilterFieldControl
                key={field.name}
                field={field}
                value={values[field.name] ?? ""}
                onChange={(value) => onChange(field.name, value)}
              />
            ))}
          </div>
        </div>

        <FilterFooter
          onReset={onReset}
          onApply={() => {
            onApply();
          }}
        />
      </aside>
    </div>
  );
}
