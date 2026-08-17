"use client";

import type { ProfileFilters } from "@/types";
import { CITIES, STATES, SURNAMES } from "@/data/locations";
import {
  DEGREES,
  EDUCATION_LEVELS,
  INCOME_RANGES,
  JOB_TYPES,
  MARITAL_STATUSES,
} from "@/data/education";
import { OCCUPATIONS } from "@/data/occupations";
import { FormField } from "@/components/forms/FormField";
import { SelectField } from "@/components/forms/SelectField";

const ages = Array.from({ length: 33 }, (_, i) => String(i + 18));

export function ProfileFilter({
  value,
  onChange,
  onReset,
}: {
  value: ProfileFilters;
  onChange: (next: ProfileFilters) => void;
  onReset: () => void;
}) {
  const set = <K extends keyof ProfileFilters>(key: K, val: ProfileFilters[K]) =>
    onChange({ ...value, [key]: val });

  return (
    <aside className="surface-card h-fit space-y-5 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold">Filters</h2>
        <button type="button" className="text-sm font-semibold text-primary" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">Basic</p>
        <SelectField
          label="Gender"
          id="gender"
          value={value.gender ?? ""}
          onChange={(v) => set("gender", v || undefined)}
          options={["male", "female"]}
        />
        <div className="grid grid-cols-2 gap-3">
          <SelectField
            label="Age From"
            id="ageFrom"
            value={value.ageFrom ? String(value.ageFrom) : ""}
            onChange={(v) => set("ageFrom", v ? Number(v) : undefined)}
            options={ages}
          />
          <SelectField
            label="Age To"
            id="ageTo"
            value={value.ageTo ? String(value.ageTo) : ""}
            onChange={(v) => set("ageTo", v ? Number(v) : undefined)}
            options={ages}
          />
        </div>
        <SelectField
          label="City"
          id="city"
          value={value.city ?? ""}
          onChange={(v) => set("city", v || undefined)}
          options={CITIES.map((c) => c.name)}
        />
        <SelectField
          label="State"
          id="state"
          value={value.state ?? ""}
          onChange={(v) => set("state", v || undefined)}
          options={[...STATES]}
        />
        <SelectField
          label="Surname"
          id="surname"
          value={value.surname ?? ""}
          onChange={(v) => set("surname", v || undefined)}
          options={[...SURNAMES]}
        />
        <SelectField
          label="Marital Status"
          id="maritalStatus"
          value={value.maritalStatus ?? ""}
          onChange={(v) => set("maritalStatus", v || undefined)}
          options={[...MARITAL_STATUSES]}
        />
      </div>

      <div className="space-y-4 border-t border-line pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
          Education
        </p>
        <SelectField
          label="Education"
          id="education"
          value={value.education ?? ""}
          onChange={(v) => set("education", v || undefined)}
          options={[...EDUCATION_LEVELS]}
        />
        <SelectField
          label="Degree"
          id="degree"
          value={value.degree ?? ""}
          onChange={(v) => set("degree", v || undefined)}
          options={[...DEGREES]}
        />
      </div>

      <div className="space-y-4 border-t border-line pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">Career</p>
        <SelectField
          label="Occupation"
          id="occupation"
          value={value.occupation ?? ""}
          onChange={(v) => set("occupation", v || undefined)}
          options={OCCUPATIONS}
        />
        <SelectField
          label="Job Type"
          id="jobType"
          value={value.jobType ?? ""}
          onChange={(v) => set("jobType", v || undefined)}
          options={[...JOB_TYPES]}
        />
        <SelectField
          label="Income"
          id="income"
          value={value.income ?? ""}
          onChange={(v) => set("income", v || undefined)}
          options={[...INCOME_RANGES]}
        />
      </div>

      <div className="space-y-3 border-t border-line pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">Profile</p>
        {(
          [
            ["verified", "Verified"],
            ["withPhoto", "With Photo"],
            ["recentlyJoined", "Recently Joined"],
          ] as const
        ).map(([key, label]) => (
          <FormField key={key} label={label} htmlFor={key}>
            <label className="inline-flex items-center gap-2 text-sm font-medium">
              <input
                id={key}
                type="checkbox"
                checked={Boolean(value[key])}
                onChange={(e) => set(key, e.target.checked || undefined)}
                className="h-4 w-4 accent-secondary"
              />
              Show only {label.toLowerCase()}
            </label>
          </FormField>
        ))}
      </div>
    </aside>
  );
}
