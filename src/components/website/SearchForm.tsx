"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Briefcase, ChevronDown, MapPin, Search, UserRound } from "lucide-react";
import type { HeroSearchParams } from "@/types";
import { CITIES, STATES } from "@/data/locations";
import { OCCUPATIONS } from "@/data/occupations";

const ages = Array.from({ length: 33 }, (_, i) => String(i + 18));

function HeroSelect({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Any",
  icon,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[] | string[];
  placeholder?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="group block min-w-0">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">
        {label}
      </span>
      <span className="relative block">
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/70">
            {icon}
          </span>
        ) : null}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-2xl border border-line/90 bg-[#fbfaf8] py-3.5 pr-10 text-sm font-semibold text-ink outline-none transition duration-200 hover:border-secondary/30 focus:border-secondary/50 focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,92,86,0.1)] ${
            icon ? "pl-11" : "pl-4"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft transition group-hover:text-secondary" />
      </span>
    </label>
  );
}

export function SearchForm() {
  const router = useRouter();
  const [form, setForm] = useState<HeroSearchParams>({
    lookingFor: "Bride",
    ageFrom: "21",
    ageTo: "30",
    city: "",
    state: "",
    occupation: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.lookingFor === "Bride") params.set("gender", "female");
    if (form.lookingFor === "Groom") params.set("gender", "male");
    if (form.ageFrom) params.set("ageFrom", form.ageFrom);
    if (form.ageTo) params.set("ageTo", form.ageTo);
    if (form.city) params.set("city", form.city);
    if (form.state) params.set("state", form.state);
    if (form.occupation) params.set("occupation", form.occupation);
    router.push(`/profiles?${params.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/95 p-5 shadow-[0_30px_80px_rgba(8,28,26,0.28)] backdrop-blur-xl sm:p-7"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary via-accent to-primary" />

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
            Start your search
          </p>
          <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
            Find compatible matches
          </h2>
        </div>

        <div
          className="inline-flex rounded-full border border-line bg-[#f6f3ef] p-1"
          role="group"
          aria-label="Looking for"
        >
          {(["Bride", "Groom"] as const).map((option) => {
            const active = form.lookingFor === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setForm((s) => ({ ...s, lookingFor: option }))}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  active
                    ? "bg-secondary text-white shadow-sm"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className="grid grid-cols-2 gap-3 sm:col-span-2 lg:col-span-1 xl:col-span-1">
          <HeroSelect
            id="ageFrom"
            label="Age From"
            value={form.ageFrom}
            onChange={(v) => setForm((s) => ({ ...s, ageFrom: v }))}
            options={ages}
            placeholder="From"
          />
          <HeroSelect
            id="ageTo"
            label="Age To"
            value={form.ageTo}
            onChange={(v) => setForm((s) => ({ ...s, ageTo: v }))}
            options={ages}
            placeholder="To"
          />
        </div>

        <HeroSelect
          id="city"
          label="City"
          value={form.city}
          onChange={(v) => setForm((s) => ({ ...s, city: v }))}
          options={CITIES.map((c) => c.name)}
          placeholder="Any city"
          icon={<MapPin className="h-4 w-4" />}
        />

        <HeroSelect
          id="state"
          label="State"
          value={form.state}
          onChange={(v) => setForm((s) => ({ ...s, state: v }))}
          options={[...STATES]}
          placeholder="Any state"
          icon={<MapPin className="h-4 w-4" />}
        />

        <HeroSelect
          id="occupation"
          label="Occupation"
          value={form.occupation}
          onChange={(v) => setForm((s) => ({ ...s, occupation: v }))}
          options={OCCUPATIONS}
          placeholder="Any occupation"
          icon={<Briefcase className="h-4 w-4" />}
        />

        <div className="flex flex-col justify-end sm:col-span-2 lg:col-span-3 xl:col-span-1">
          <button
            type="submit"
            className="group inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-primary-deep px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(166,28,74,0.28)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(166,28,74,0.34)]"
          >
            <Search className="h-4 w-4 transition group-hover:scale-110" />
            Find Matches
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/80 pt-4 text-xs text-ink-soft">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <UserRound className="h-3.5 w-3.5 text-secondary" />
          Looking for a {form.lookingFor.toLowerCase()}
        </span>
        <span className="hidden h-1 w-1 rounded-full bg-line sm:inline-block" />
        <span>
          Ages {form.ageFrom || "21"}–{form.ageTo || "30"}
        </span>
        <span className="hidden h-1 w-1 rounded-full bg-line sm:inline-block" />
        <span>Trusted {form.state || "community"} profiles</span>
      </div>
    </form>
  );
}
