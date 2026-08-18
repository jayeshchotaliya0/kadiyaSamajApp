"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/utils/cn";

export type SelectOption = {
  label: string;
  value: string;
};

export type SearchableSelectProps = {
  label: string;
  name: string;
  value: string;
  options: SelectOption[] | readonly string[] | string[];
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  clearable?: boolean;
  className?: string;
  id?: string;
};

function normalizeOptions(
  options: SelectOption[] | readonly string[] | string[],
): SelectOption[] {
  if (!options.length) return [];
  if (typeof options[0] === "string") {
    return (options as readonly string[]).map((item) => ({
      label: item,
      value: item,
    }));
  }
  return options as SelectOption[];
}

export function SearchableSelect({
  label,
  name,
  value,
  options,
  onChange,
  placeholder = "Select",
  searchPlaceholder,
  emptyMessage = "No results found",
  required,
  disabled,
  error,
  clearable = false,
  className,
  id,
}: SearchableSelectProps) {
  const inputId = id ?? name;
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);

  const normalized = useMemo(() => normalizeOptions(options), [options]);

  const selected = useMemo(
    () => normalized.find((option) => option.value === value) ?? null,
    [normalized, value],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return normalized;
    return normalized.filter(
      (option) =>
        option.label.toLowerCase().includes(q) ||
        option.value.toLowerCase().includes(q),
    );
  }, [normalized, query]);

  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const selectOption = (next: string) => {
    onChange(next);
    close();
  };

  const displayValue = open ? query : selected?.label ?? "";
  const searchText = searchPlaceholder ?? `Search ${label.toLowerCase()}...`;

  return (
    <div className={cn("space-y-1", className)}>
      <label className="label" htmlFor={inputId}>
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </label>

      <div ref={rootRef} className="relative">
        <div className="relative">
          <input
            id={inputId}
            name={name}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              open && filtered[highlight]
                ? `${listId}-option-${highlight}`
                : undefined
            }
            className={cn(
              "field pr-10",
              disabled && "cursor-not-allowed opacity-60",
            )}
            value={displayValue}
            disabled={disabled}
            placeholder={open ? searchText : selected ? selected.label : placeholder}
            onFocus={() => {
              if (disabled) return;
              setOpen(true);
              setQuery("");
            }}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onKeyDown={(e) => {
              if (disabled) return;
              if (e.key === "Escape") {
                e.preventDefault();
                close();
                return;
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
                setHighlight((prev) =>
                  filtered.length ? (prev + 1) % filtered.length : 0,
                );
                return;
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setOpen(true);
                setHighlight((prev) =>
                  filtered.length
                    ? (prev - 1 + filtered.length) % filtered.length
                    : 0,
                );
                return;
              }
              if (e.key === "Enter" && open && filtered[highlight]) {
                e.preventDefault();
                selectOption(filtered[highlight].value);
              }
            }}
            autoComplete="off"
          />

          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
            {clearable && value && !disabled ? (
              <button
                type="button"
                aria-label={`Clear ${label}`}
                className="rounded p-1 text-ink-soft hover:bg-secondary/5 hover:text-ink"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onChange("")}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
            <ChevronDown
              className={cn(
                "pointer-events-none h-4 w-4 text-ink-soft transition-transform",
                open && "rotate-180",
              )}
            />
          </div>
        </div>

        {open && !disabled ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-[0.9rem] border border-line bg-white py-1 shadow-lg"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2.5 text-sm text-ink-soft">{emptyMessage}</li>
            ) : (
              filtered.map((option, index) => (
                <li
                  key={`${option.value}-${index}`}
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={option.value === value}
                >
                  <button
                    type="button"
                    className={cn(
                      "w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary/5",
                      option.value === value &&
                        "bg-secondary/10 font-semibold text-secondary",
                      index === highlight && "bg-secondary/5",
                    )}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setHighlight(index)}
                    onClick={() => selectOption(option.value)}
                  >
                    {option.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        ) : null}
      </div>

      {error ? <p className="text-xs font-medium text-danger">{error}</p> : null}
    </div>
  );
}
