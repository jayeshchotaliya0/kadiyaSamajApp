"use client";

import { useMemo, useState } from "react";
import { SelectField } from "@/components/forms/SelectField";
import { ProfileGrid } from "@/components/profile/ProfileGrid";
import { CITIES, STATES, SURNAMES } from "@/data/locations";
import { EDUCATION_LEVELS, MARITAL_STATUSES } from "@/data/education";
import { OCCUPATION_HINTS, OCCUPATIONS } from "@/data/occupations";
import { profiles } from "@/data/profiles";
import { filterProfiles } from "@/utils/filters";

export default function PartnerPreferencesPage() {
  const [form, setForm] = useState({
    ageFrom: "24",
    ageTo: "32",
    city: "",
    state: "Gujarat",
    education: "",
    occupation: "Business",
    maritalStatus: "Never Married",
    surname: "",
  });

  const hint = OCCUPATION_HINTS[form.occupation] ?? "";

  const matches = useMemo(
    () =>
      filterProfiles(profiles, {
        gender: "female",
        ageFrom: Number(form.ageFrom),
        ageTo: Number(form.ageTo),
        city: form.city || undefined,
        state: form.state || undefined,
        education: form.education || undefined,
        occupation: form.occupation || undefined,
        maritalStatus: form.maritalStatus || undefined,
        surname: form.surname || undefined,
      }).slice(0, 8),
    [form],
  );

  return (
    <div className="container-wide py-10">
      <div className="mb-8 max-w-2xl">
        <h1 className="section-title">Partner Preferences</h1>
        <p className="section-subtitle">
          Adjust preferences and preview matching mock profiles instantly.
        </p>
      </div>

      <div className="surface-card mb-8 grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-4">
        <SelectField label="Age From" id="ageFrom" value={form.ageFrom} onChange={(v) => setForm((s) => ({ ...s, ageFrom: v }))} options={Array.from({ length: 30 }, (_, i) => String(i + 18))} />
        <SelectField label="Age To" id="ageTo" value={form.ageTo} onChange={(v) => setForm((s) => ({ ...s, ageTo: v }))} options={Array.from({ length: 30 }, (_, i) => String(i + 18))} />
        <SelectField label="City" id="city" value={form.city} onChange={(v) => setForm((s) => ({ ...s, city: v }))} options={CITIES.map((c) => c.name)} />
        <SelectField label="State" id="state" value={form.state} onChange={(v) => setForm((s) => ({ ...s, state: v }))} options={[...STATES]} />
        <SelectField label="Education" id="education" value={form.education} onChange={(v) => setForm((s) => ({ ...s, education: v }))} options={[...EDUCATION_LEVELS]} />
        <SelectField label="Occupation" id="occupation" value={form.occupation} onChange={(v) => setForm((s) => ({ ...s, occupation: v }))} options={OCCUPATIONS} />
        <SelectField label="Marital Status" id="maritalStatus" value={form.maritalStatus} onChange={(v) => setForm((s) => ({ ...s, maritalStatus: v }))} options={[...MARITAL_STATUSES]} />
        <SelectField label="Surname" id="surname" value={form.surname} onChange={(v) => setForm((s) => ({ ...s, surname: v }))} options={[...SURNAMES]} />
      </div>

      {hint ? (
        <div className="mb-8 rounded-2xl border border-secondary/20 bg-secondary/5 px-4 py-3 text-sm font-medium text-secondary">
          {hint}
        </div>
      ) : null}

      <h2 className="mb-5 font-display text-2xl font-bold">Matching preview</h2>
      <ProfileGrid profiles={matches} />
    </div>
  );
}
