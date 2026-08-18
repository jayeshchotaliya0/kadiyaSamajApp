"use client";

import { SearchableSelect } from "@/components/common/SearchableSelect";
import type { FilterFieldOption } from "@/types/filters";

export function FilterSelect({
  name,
  label,
  value,
  options,
  searchable,
  onChange,
}: {
  name: string;
  label: string;
  value: string;
  options: FilterFieldOption[];
  searchable?: boolean;
  onChange: (value: string) => void;
}) {
  const allOptions: FilterFieldOption[] = [
    { label: "All", value: "" },
    ...options,
  ];

  if (searchable) {
    return (
      <SearchableSelect
        label={label}
        name={name}
        value={value}
        options={allOptions}
        onChange={onChange}
        placeholder="All"
        clearable
      />
    );
  }

  return (
    <div className="space-y-1">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        className="field py-2.5"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {allOptions.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
