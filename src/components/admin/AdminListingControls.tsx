"use client";

import { ChevronDown, Filter, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CommonSearch } from "@/components/admin/CommonSearch";
import { FormField } from "@/components/forms/FormField";
import type { FilterOption } from "@/hooks/useAdminListing";
import { cn } from "@/utils/cn";
import { Drawer } from "@/components/common/Drawer";
import { useEffect, useState } from "react";

const SORT_OPTIONS = ["Newest", "Oldest", "Name A-Z", "Name Z-A"];
const PAGE_SIZES = ["5", "10", "20", "50"];

export function AdminListingControls({
  draftSearch,
  onDraftSearchChange,
  onSearch,
  onReset,
  sort,
  onSort,
  pageSize,
  onPageSize,
  filtersOpen,
  onToggleFilters,
  activeFilterCount,
  draftFilters,
  onDraftFilterChange,
  filterOptions,
  sortOptions = SORT_OPTIONS,
}: {
  draftSearch: string;
  onDraftSearchChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  sort: string;
  onSort: (value: string) => void;
  pageSize: number;
  onPageSize: (value: number) => void;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  activeFilterCount: number;
  draftFilters: Record<string, string>;
  onDraftFilterChange: (key: string, value: string) => void;
  filterOptions: FilterOption[];
  sortOptions?: string[];
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const filterFields = (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {filterOptions.map((filter) => (
        <FormField key={filter.key} label={filter.label} htmlFor={`filter-${filter.key}`}>
          <select
            id={`filter-${filter.key}`}
            className="field py-2.5"
            value={draftFilters[filter.key] ?? ""}
            onChange={(e) => onDraftFilterChange(filter.key, e.target.value)}
          >
            <option value="">All</option>
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>
      ))}
    </div>
  );

  const filterActions = (
    <div className="mt-4 flex flex-wrap justify-end gap-2">
      <button type="button" className="btn-ghost px-4 py-2 text-sm" onClick={onReset}>
        Reset
      </button>
      <button type="button" className="btn-secondary px-4 py-2 text-sm" onClick={onSearch}>
        Search
      </button>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="surface-card p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <CommonSearch
            value={draftSearch}
            onChange={onDraftSearchChange}
            onSearch={onSearch}
          />

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <span className="whitespace-nowrap font-semibold text-ink-soft">Sort</span>
              <select
                className="field w-auto min-w-[8.5rem] py-2.5"
                value={sort}
                onChange={(e) => onSort(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <span className="whitespace-nowrap font-semibold text-ink-soft">Page size</span>
              <select
                className="field w-auto min-w-[4.5rem] py-2.5"
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

            {filterOptions.length > 0 ? (
              <button
                type="button"
                className={cn(
                  "btn-ghost inline-flex items-center gap-2 px-3 py-2.5 text-sm",
                  filtersOpen && "border-secondary/40 bg-secondary/5 text-secondary",
                  activeFilterCount > 0 && "border-secondary/40 text-secondary",
                )}
                onClick={onToggleFilters}
                aria-expanded={filtersOpen}
              >
                <Filter className="h-4 w-4" />
                Filter
                {activeFilterCount > 0 ? (
                  <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                ) : (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition",
                      filtersOpen && "rotate-180",
                    )}
                  />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {filterOptions.length > 0 && !isMobile ? (
        <AnimatePresence initial={false}>
          {filtersOpen ? (
            <motion.div
              key="filters"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="surface-card p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-display text-base font-bold">Filters</h3>
                  <button
                    type="button"
                    className="rounded-full p-1.5 text-ink-soft hover:bg-bg"
                    onClick={onToggleFilters}
                    aria-label="Close filters"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {filterFields}
                {filterActions}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}

      {filterOptions.length > 0 && isMobile ? (
        <Drawer
          open={filtersOpen}
          onClose={onToggleFilters}
          title="Filters"
          side="right"
        >
          {filterFields}
          {filterActions}
        </Drawer>
      ) : null}
    </div>
  );
}
