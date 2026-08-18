export type FilterFieldType =
  | "text"
  | "select"
  | "multiSelect"
  | "number"
  | "date"
  | "dateRange"
  | "checkbox"
  | "radio";

export type FilterFieldOption = {
  label: string;
  value: string;
};

export type FilterField = {
  name: string;
  label: string;
  type: FilterFieldType;
  placeholder?: string;
  options?: FilterFieldOption[];
  searchable?: boolean;
};

export type FilterValues = Record<string, string>;
