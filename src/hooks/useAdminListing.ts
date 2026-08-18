"use client";

import { useCallback, useMemo, useState } from "react";

export type FilterOption = {
  key: string;
  label: string;
  options: string[];
};

export function useAdminListing({
  defaultSort = "Newest",
  defaultPageSize = 10,
}: {
  defaultSort?: string;
  defaultPageSize?: number;
} = {}) {
  const [draftSearch, setDraftSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [draftFilters, setDraftFilters] = useState<Record<string, string>>({});
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>({});
  const [sort, setSort] = useState(defaultSort);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount = useMemo(
    () => Object.values(appliedFilters).filter((value) => Boolean(value)).length,
    [appliedFilters],
  );

  const setDraftFilter = useCallback((key: string, value: string) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applySearch = useCallback(() => {
    setAppliedSearch(draftSearch.trim());
    setPage(1);
  }, [draftSearch]);

  const applyFilters = useCallback(() => {
    setAppliedFilters({ ...draftFilters });
    setPage(1);
    setFiltersOpen(false);
  }, [draftFilters]);

  const resetFilters = useCallback(() => {
    setDraftFilters({});
    setAppliedFilters({});
    setPage(1);
  }, []);

  const openFilters = useCallback(() => {
    setDraftFilters({ ...appliedFilters });
    setFiltersOpen(true);
  }, [appliedFilters]);

  const closeFilters = useCallback(() => {
    setDraftFilters({ ...appliedFilters });
    setFiltersOpen(false);
  }, [appliedFilters]);

  const apply = useCallback(() => {
    applySearch();
  }, [applySearch]);

  const reset = useCallback(() => {
    setDraftSearch("");
    setAppliedSearch("");
    setDraftFilters({});
    setAppliedFilters({});
    setSort(defaultSort);
    setPageSize(defaultPageSize);
    setPage(1);
  }, [defaultSort, defaultPageSize]);

  const onPageSizeChange = useCallback((value: number) => {
    setPageSize(value);
    setPage(1);
  }, []);

  return {
    draftSearch,
    setDraftSearch,
    appliedSearch,
    draftFilters,
    setDraftFilter,
    appliedFilters,
    sort,
    setSort,
    page,
    setPage,
    pageSize,
    setPageSize: onPageSizeChange,
    filtersOpen,
    setFiltersOpen,
    activeFilterCount,
    applySearch,
    applyFilters,
    resetFilters,
    openFilters,
    closeFilters,
    apply,
    reset,
  };
}

export function matchesSearch(
  values: Array<string | number | undefined | null>,
  query: string,
) {
  if (!query) return true;
  const q = query.toLowerCase();
  return values
    .filter((value) => value !== undefined && value !== null)
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export function matchesFilters<T extends object>(
  row: T,
  filters: Record<string, string>,
) {
  return Object.entries(filters).every(([key, value]) => {
    if (!value) return true;
    const rowValue = row[key as keyof T];
    if (typeof rowValue === "boolean") {
      return String(rowValue) === value;
    }
    return String(rowValue ?? "") === value;
  });
}
