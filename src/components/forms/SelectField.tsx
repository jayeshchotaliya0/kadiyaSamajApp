"use client";

import { FormField } from "@/components/forms/FormField";

/** Native select field used across filters/admin. Prefer SearchableSelect for searchable UX. */
export function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  placeholder = "Select",
  error,
  disabled = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[] | string[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <FormField label={label} htmlFor={id} error={error}>
      <select
        id={id}
        className="field"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FormField>
  );
}
