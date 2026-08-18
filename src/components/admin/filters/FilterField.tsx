"use client";

import type { FilterField as FilterFieldConfig } from "@/types/filters";
import { FilterInput } from "@/components/admin/filters/FilterInput";
import { FilterSelect } from "@/components/admin/filters/FilterSelect";

export function FilterField({
  field,
  value,
  onChange,
}: {
  field: FilterFieldConfig;
  value: string;
  onChange: (value: string) => void;
}) {
  switch (field.type) {
    case "select":
    case "multiSelect":
      return (
        <FilterSelect
          name={field.name}
          label={field.label}
          value={value}
          options={field.options ?? []}
          searchable={field.searchable}
          onChange={onChange}
        />
      );
    case "number":
      return (
        <FilterInput
          name={field.name}
          label={field.label}
          type="number"
          value={value}
          placeholder={field.placeholder}
          onChange={onChange}
        />
      );
    case "date":
      return (
        <FilterInput
          name={field.name}
          label={field.label}
          type="date"
          value={value}
          placeholder={field.placeholder}
          onChange={onChange}
        />
      );
    case "text":
    default:
      return (
        <FilterInput
          name={field.name}
          label={field.label}
          type="text"
          value={value}
          placeholder={field.placeholder}
          onChange={onChange}
        />
      );
  }
}
