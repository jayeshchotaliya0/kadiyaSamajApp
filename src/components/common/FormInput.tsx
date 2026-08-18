"use client";

import type { ChangeEvent, InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type FormInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  error?: string;
  maxLength?: number;
  className?: string;
  id?: string;
};

export function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  type = "text",
  error,
  maxLength,
  className,
  id,
}: FormInputProps) {
  const inputId = id ?? name;

  return (
    <div className={cn("space-y-1", className)}>
      <label className="label" htmlFor={inputId}>
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        className={cn("field", disabled && "cursor-not-allowed opacity-60")}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
      />
      {error ? <p className="text-xs font-medium text-danger">{error}</p> : null}
    </div>
  );
}
