"use client";

import { Search } from "lucide-react";

export function CommonSearch({
  value,
  onChange,
  onSearch,
  placeholder = "Search records...",
}: {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}) {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
      <label className="relative block min-w-0 flex-1">
        <span className="sr-only">{placeholder}</span>
        <input
          className="admin-toolbar-search w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSearch();
            }
          }}
          placeholder={placeholder}
        />
      </label>
      <button
        type="button"
        className="btn-secondary shrink-0 px-5 py-2.5 text-sm"
        onClick={onSearch}
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    </div>
  );
}
