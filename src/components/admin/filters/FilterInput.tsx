"use client";

export function FilterInput({
  name,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
}: {
  name: string;
  label: string;
  type?: "text" | "number" | "date";
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        className="field py-2.5"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
