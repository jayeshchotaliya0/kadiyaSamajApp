import type { FilterField, FilterFieldOption } from "@/types/filters";
import type { FilterOption } from "@/hooks/useAdminListing";

const SEARCHABLE_THRESHOLD = 8;

const SEARCHABLE_KEYS = new Set([
  "city",
  "state",
  "surname",
  "gotra",
  "education",
  "degree",
  "occupation",
  "meta",
]);

export function dedupeOptions(options: string[]): FilterFieldOption[] {
  const seen = new Set<string>();
  const result: FilterFieldOption[] = [];

  for (const option of options) {
    if (seen.has(option)) continue;
    seen.add(option);
    result.push({ label: option, value: option });
  }

  return result;
}

export function toFilterFields(filterOptions: FilterOption[]): FilterField[] {
  return filterOptions.map((filter) => {
    const options = dedupeOptions(filter.options);
    const searchable =
      SEARCHABLE_KEYS.has(filter.key) || options.length > SEARCHABLE_THRESHOLD;

    return {
      name: filter.key,
      label: filter.label,
      type: "select" as const,
      options,
      searchable,
    };
  });
}
