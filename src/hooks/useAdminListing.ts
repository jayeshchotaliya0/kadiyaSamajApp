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

  const apply = useCallback(() => {
    setAppliedSearch(draftSearch.trim());
    setAppliedFilters({ ...draftFilters });
    setPage(1);
  }, [draftSearch, draftFilters]);

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
    return String(row[key as keyof T] ?? "") === value;
  });
}
