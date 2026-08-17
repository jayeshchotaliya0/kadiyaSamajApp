import { FormField } from "@/components/forms/FormField";

export function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  placeholder = "Select",
  error,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[] | string[];
  placeholder?: string;
  error?: string;
}) {
  return (
    <FormField label={label} htmlFor={id} error={error}>
      <select
        id={id}
        className="field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FormField>
  );
}
