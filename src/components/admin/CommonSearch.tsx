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
    <div className="flex w-full min-w-0 flex-1 gap-2 sm:max-w-md lg:max-w-lg">
      <label className="relative block min-w-0 flex-1">
        <span className="sr-only">{placeholder}</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        <input
          className="field pl-10"
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
      <button type="button" className="btn-secondary shrink-0 px-4 py-2.5 text-sm" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
