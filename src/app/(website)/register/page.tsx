"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/forms/FormField";
import { SelectField } from "@/components/forms/SelectField";
import { FileUpload, type UploadItem } from "@/components/forms/FileUpload";
import { CITIES, GOTRAS, STATES, SURNAMES } from "@/data/locations";
import {
  DEGREES,
  EDUCATION_LEVELS,
  INCOME_RANGES,
  JOB_TYPES,
  MARITAL_STATUSES,
  MOTHER_TONGUES,
} from "@/data/education";
import { OCCUPATION_HINTS, OCCUPATIONS } from "@/data/occupations";

const steps = [
  "Basic Details",
  "Community",
  "Education & Career",
  "Personal Details",
  "Photo",
  "Partner Preference",
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [images, setImages] = useState<UploadItem[]>([]);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    lookingFor: "Groom",
    fullName: "",
    gender: "female",
    dob: "",
    age: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    community: "Kadiya Kumbhar / Prajapati",
    subCommunity: "Prajapati",
    surname: "",
    gotra: "",
    nativePlace: "",
    city: "",
    state: "",
    education: "",
    degree: "",
    occupation: "",
    company: "",
    jobType: "",
    income: "",
    workCity: "",
    height: "",
    maritalStatus: "Never Married",
    motherTongue: "Gujarati",
    lifestyle: "Modern Traditional",
    familyType: "Joint",
    familyStatus: "Middle Class",
    prefAgeFrom: "24",
    prefAgeTo: "32",
    prefCity: "",
    prefState: "",
    prefEducation: "",
    prefOccupation: "",
    prefMaritalStatus: "Never Married",
    prefSurname: "",
  });

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const occupationHint = useMemo(() => {
    if (!form.prefOccupation) return "";
    return OCCUPATION_HINTS[form.prefOccupation] ?? OCCUPATION_HINTS.Other;
  }, [form.prefOccupation]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  if (done) {
    return (
      <div className="container-page py-16">
        <div className="surface-card mx-auto max-w-xl p-8 text-center">
          <h1 className="font-display text-3xl font-bold">Registration complete</h1>
          <p className="mt-3 text-ink-soft">
            Your profile UI is ready. This was a frontend-only demo submission.
          </p>
          <button
            type="button"
            className="btn-primary mt-6"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="mb-8 max-w-2xl">
        <h1 className="section-title">Create your profile</h1>
        <p className="section-subtitle">
          Multi-step registration UI for the Kadiya Kumbhar / Prajapati community.
          No API submission — demo only.
        </p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(index)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${
              index === step
                ? "bg-secondary text-white"
                : index < step
                  ? "bg-secondary/10 text-secondary"
                  : "bg-white text-ink-soft border border-line"
            }`}
          >
            {index + 1}. {label}
          </button>
        ))}
      </div>

      <div className="surface-card p-5 sm:p-8">
        {step === 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField label="Looking for" id="lookingFor" value={form.lookingFor} onChange={(v) => set("lookingFor", v)} options={["Bride", "Groom"]} />
            <FormField label="Full Name" htmlFor="fullName">
              <input id="fullName" className="field" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
            </FormField>
            <SelectField label="Gender" id="gender" value={form.gender} onChange={(v) => set("gender", v)} options={["male", "female"]} />
            <FormField label="Date of Birth" htmlFor="dob">
              <input id="dob" type="date" className="field" value={form.dob} onChange={(e) => set("dob", e.target.value)} />
            </FormField>
            <FormField label="Age" htmlFor="age">
              <input id="age" className="field" value={form.age} onChange={(e) => set("age", e.target.value)} />
            </FormField>
            <FormField label="Mobile" htmlFor="mobile">
              <input id="mobile" className="field" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} />
            </FormField>
            <FormField label="Email" htmlFor="email">
              <input id="email" type="email" className="field" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </FormField>
            <FormField label="Password" htmlFor="password">
              <input id="password" type="password" className="field" value={form.password} onChange={(e) => set("password", e.target.value)} />
            </FormField>
            <FormField label="Confirm Password" htmlFor="confirmPassword">
              <input id="confirmPassword" type="password" className="field" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} />
            </FormField>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Community" htmlFor="community">
              <input id="community" className="field" value={form.community} onChange={(e) => set("community", e.target.value)} />
            </FormField>
            <SelectField label="Sub-community" id="subCommunity" value={form.subCommunity} onChange={(v) => set("subCommunity", v)} options={["Kadiya Kumbhar", "Prajapati", "Kumhar"]} />
            <SelectField label="Surname" id="surname" value={form.surname} onChange={(v) => set("surname", v)} options={[...SURNAMES]} />
            <SelectField label="Gotra" id="gotra" value={form.gotra} onChange={(v) => set("gotra", v)} options={[...GOTRAS]} />
            <FormField label="Native Place" htmlFor="nativePlace">
              <input id="nativePlace" className="field" value={form.nativePlace} onChange={(e) => set("nativePlace", e.target.value)} />
            </FormField>
            <SelectField label="City" id="city" value={form.city} onChange={(v) => set("city", v)} options={CITIES.map((c) => c.name)} />
            <SelectField label="State" id="state" value={form.state} onChange={(v) => set("state", v)} options={[...STATES]} />
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField label="Education" id="education" value={form.education} onChange={(v) => set("education", v)} options={[...EDUCATION_LEVELS]} />
            <SelectField label="Degree" id="degree" value={form.degree} onChange={(v) => set("degree", v)} options={[...DEGREES]} />
            <SelectField label="Occupation" id="occupation" value={form.occupation} onChange={(v) => set("occupation", v)} options={OCCUPATIONS} />
            <FormField label="Company" htmlFor="company">
              <input id="company" className="field" value={form.company} onChange={(e) => set("company", e.target.value)} />
            </FormField>
            <SelectField label="Job Type" id="jobType" value={form.jobType} onChange={(v) => set("jobType", v)} options={[...JOB_TYPES]} />
            <SelectField label="Annual Income" id="income" value={form.income} onChange={(v) => set("income", v)} options={[...INCOME_RANGES]} />
            <SelectField label="Work City" id="workCity" value={form.workCity} onChange={(v) => set("workCity", v)} options={CITIES.map((c) => c.name)} />
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Height" htmlFor="height">
              <input id="height" className="field" value={form.height} onChange={(e) => set("height", e.target.value)} placeholder={`5'6"`} />
            </FormField>
            <SelectField label="Marital Status" id="maritalStatus" value={form.maritalStatus} onChange={(v) => set("maritalStatus", v)} options={[...MARITAL_STATUSES]} />
            <SelectField label="Mother Tongue" id="motherTongue" value={form.motherTongue} onChange={(v) => set("motherTongue", v)} options={[...MOTHER_TONGUES]} />
            <SelectField label="Lifestyle" id="lifestyle" value={form.lifestyle} onChange={(v) => set("lifestyle", v)} options={["Traditional", "Modern Traditional", "Modern"]} />
            <SelectField label="Family Type" id="familyType" value={form.familyType} onChange={(v) => set("familyType", v)} options={["Joint", "Nuclear"]} />
            <SelectField label="Family Status" id="familyStatus" value={form.familyStatus} onChange={(v) => set("familyStatus", v)} options={["Middle Class", "Upper Middle Class", "Rich"]} />
          </div>
        )}

        {step === 4 && (
          <FileUpload
            images={images}
            onAdd={(files) => {
              if (!files?.length) return;
              const file = files[0];
              const url = URL.createObjectURL(file);
              setImages((prev) => [
                ...prev,
                { id: String(Date.now()), url, primary: prev.length === 0 },
              ]);
            }}
            onRemove={(id) => setImages((prev) => prev.filter((img) => img.id !== id))}
            onSetPrimary={(id) =>
              setImages((prev) => prev.map((img) => ({ ...img, primary: img.id === id })))
            }
          />
        )}

        {step === 5 && (
          <div className="space-y-4">
            <p className="font-semibold text-ink">
              What type of partner are you looking for?
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField label="Age From" id="prefAgeFrom" value={form.prefAgeFrom} onChange={(v) => set("prefAgeFrom", v)} options={Array.from({ length: 30 }, (_, i) => String(i + 18))} />
              <SelectField label="Age To" id="prefAgeTo" value={form.prefAgeTo} onChange={(v) => set("prefAgeTo", v)} options={Array.from({ length: 30 }, (_, i) => String(i + 18))} />
              <SelectField label="City" id="prefCity" value={form.prefCity} onChange={(v) => set("prefCity", v)} options={CITIES.map((c) => c.name)} />
              <SelectField label="State" id="prefState" value={form.prefState} onChange={(v) => set("prefState", v)} options={[...STATES]} />
              <SelectField label="Education" id="prefEducation" value={form.prefEducation} onChange={(v) => set("prefEducation", v)} options={[...EDUCATION_LEVELS]} />
              <SelectField label="Occupation" id="prefOccupation" value={form.prefOccupation} onChange={(v) => set("prefOccupation", v)} options={OCCUPATIONS} />
              <SelectField label="Marital Status" id="prefMaritalStatus" value={form.prefMaritalStatus} onChange={(v) => set("prefMaritalStatus", v)} options={[...MARITAL_STATUSES]} />
              <SelectField label="Surname" id="prefSurname" value={form.prefSurname} onChange={(v) => set("prefSurname", v)} options={[...SURNAMES]} />
            </div>
            {occupationHint ? (
              <div className="rounded-2xl border border-secondary/20 bg-secondary/5 px-4 py-3 text-sm font-medium text-secondary">
                {occupationHint}
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <button type="button" className="btn-ghost" onClick={back} disabled={step === 0}>
            Back
          </button>
          {step < steps.length - 1 ? (
            <button type="button" className="btn-primary" onClick={next}>
              Continue
            </button>
          ) : (
            <button type="button" className="btn-primary" onClick={() => setDone(true)}>
              Finish Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
