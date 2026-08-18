"use client";

import { SlidersHorizontal } from "lucide-react";
import { CommonSearch } from "@/components/admin/CommonSearch";
import { CommonFilterDrawer } from "@/components/admin/filters/CommonFilterDrawer";
import type { FilterOption } from "@/hooks/useAdminListing";
import { toFilterFields } from "@/utils/filterFields";
import { cn } from "@/utils/cn";
import { useMemo } from "react";

export function AdminListingControls({
  draftSearch,
  onDraftSearchChange,
  onSearch,
  filtersOpen,
  onOpenFilters,
  onCloseFilters,
  onApplyFilters,
  onResetFilters,
  activeFilterCount,
  draftFilters,
  onDraftFilterChange,
  filterOptions,
  searchPlaceholder = "Search records...",
}: {
  draftSearch: string;
  onDraftSearchChange: (value: string) => void;
  onSearch: () => void;
  filtersOpen: boolean;
  onOpenFilters: () => void;
  onCloseFilters: () => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  draftFilters: Record<string, string>;
  onDraftFilterChange: (key: string, value: string) => void;
  filterOptions: FilterOption[];
  searchPlaceholder?: string;
}) {
  const filterFields = useMemo(
    () => toFilterFields(filterOptions),
    [filterOptions],
  );

  return (
    <>
      <div className="admin-table-toolbar">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <CommonSearch
            value={draftSearch}
            onChange={onDraftSearchChange}
            onSearch={onSearch}
            placeholder={searchPlaceholder}
          />

          {filterOptions.length > 0 ? (
            <button
              type="button"
              className={cn(
                "admin-toolbar-filter-btn shrink-0",
                activeFilterCount > 0 &&
                  "border-secondary/30 bg-secondary/5 text-secondary",
              )}
              onClick={onOpenFilters}
              aria-expanded={filtersOpen}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 ? (
                <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              ) : null}
            </button>
          ) : null}
        </div>
      </div>

      {filterOptions.length > 0 ? (
        <CommonFilterDrawer
          open={filtersOpen}
          onClose={onCloseFilters}
          fields={filterFields}
          values={draftFilters}
          onChange={onDraftFilterChange}
          onApply={onApplyFilters}
          onReset={onResetFilters}
          activeCount={activeFilterCount}
        />
      ) : null}
    </>
  );
}
