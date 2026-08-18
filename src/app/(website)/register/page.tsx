"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/common/FormInput";
import { SearchableSelect } from "@/components/common/SearchableSelect";
import { FileUpload, type UploadItem } from "@/components/forms/FileUpload";
import { OCCUPATION_HINTS } from "@/data/occupations";
import {
  REGISTER_STEPS,
  ageOptions,
  cityOptions,
  degreeOptions,
  educationOptions,
  familyStatusOptions,
  familyTypeOptions,
  genderOptions,
  getCityOptionsForState,
  getCitiesForState,
  incomeOptions,
  initialRegisterForm,
  jobTypeOptions,
  lifestyleOptions,
  lookingForOptions,
  maritalStatusOptions,
  motherTongueOptions,
  occupationOptions,
  stateOptions,
  subCommunityOptions,
  surnameOptions,
  type RegisterFormState,
} from "@/data/registerData";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [images, setImages] = useState<UploadItem[]>([]);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<RegisterFormState>(initialRegisterForm);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setField = <K extends keyof RegisterFormState>(
    name: K,
    value: RegisterFormState[K],
  ) => setForm((prev) => ({ ...prev, [name]: value }));

  const handleStateChange = (state: string) => {
    setForm((prev) => {
      const cities = getCitiesForState(state);
      const cityStillValid = !prev.city || cities.includes(prev.city);
      return {
        ...prev,
        state,
        city: cityStillValid ? prev.city : "",
      };
    });
  };

  const communityCityOptions = useMemo(
    () => getCityOptionsForState(form.state),
    [form.state],
  );

  const occupationHint = useMemo(() => {
    if (!form.prefOccupation) return "";
    return OCCUPATION_HINTS[form.prefOccupation] ?? OCCUPATION_HINTS.Other;
  }, [form.prefOccupation]);

  const next = () => setStep((s) => Math.min(s + 1, REGISTER_STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  if (done) {
    return (
      <div className="container-page py-16">
        <div className="surface-card mx-auto max-w-xl p-8 text-center">
          <h1 className="font-display text-3xl font-bold">
            Registration complete
          </h1>
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
          Multi-step registration UI for the Kadiya Kumbhar / Prajapati
          community. No API submission — demo only.
        </p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {REGISTER_STEPS.map((label, index) => (
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
            <SearchableSelect
              label="Looking for"
              name="lookingFor"
              value={form.lookingFor}
              options={lookingForOptions}
              onChange={(v) => setField("lookingFor", v)}
              placeholder="Select"
            />
            <FormInput
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
            <SearchableSelect
              label="Gender"
              name="gender"
              value={form.gender}
              options={genderOptions}
              onChange={(v) => setField("gender", v)}
              placeholder="Select"
            />
            <FormInput
              label="Date of Birth"
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
            />
            <FormInput
              label="Age"
              name="age"
              value={form.age}
              onChange={handleChange}
            />
            <FormInput
              label="Mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Community"
              name="community"
              value={form.community}
              onChange={handleChange}
            />
            <SearchableSelect
              label="Sub-community"
              name="subCommunity"
              value={form.subCommunity}
              options={subCommunityOptions}
              onChange={(v) => setField("subCommunity", v)}
              placeholder="Select"
            />
            <FormInput
              label="Surname"
              name="surname"
              value={form.surname}
              onChange={handleChange}
            />
            <FormInput
              label="Gotra"
              name="gotra"
              value={form.gotra}
              onChange={handleChange}
            />
            <FormInput
              label="Native Place"
              name="nativePlace"
              value={form.nativePlace}
              onChange={handleChange}
            />
            <SearchableSelect
              label="City"
              name="city"
              value={form.city}
              options={communityCityOptions}
              onChange={(v) => setField("city", v)}
              placeholder="Select city"
              searchPlaceholder="Search city..."
              emptyMessage="No city found"
            />
            <SearchableSelect
              label="State"
              name="state"
              value={form.state}
              options={stateOptions}
              onChange={handleStateChange}
              placeholder="Select state"
              searchPlaceholder="Search state..."
              emptyMessage="No state found"
            />
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 md:grid-cols-2">
            <SearchableSelect
              label="Education"
              name="education"
              value={form.education}
              options={educationOptions}
              onChange={(v) => setField("education", v)}
              placeholder="Select"
            />
            <SearchableSelect
              label="Degree"
              name="degree"
              value={form.degree}
              options={degreeOptions}
              onChange={(v) => setField("degree", v)}
              placeholder="Select"
            />
            <SearchableSelect
              label="Occupation"
              name="occupation"
              value={form.occupation}
              options={occupationOptions}
              onChange={(v) => setField("occupation", v)}
              placeholder="Select"
            />
            <FormInput
              label="Company"
              name="company"
              value={form.company}
              onChange={handleChange}
            />
            <SearchableSelect
              label="Job Type"
              name="jobType"
              value={form.jobType}
              options={jobTypeOptions}
              onChange={(v) => setField("jobType", v)}
              placeholder="Select"
            />
            <SearchableSelect
              label="Annual Income"
              name="income"
              value={form.income}
              options={incomeOptions}
              onChange={(v) => setField("income", v)}
              placeholder="Select"
            />
            <SearchableSelect
              label="Work City"
              name="workCity"
              value={form.workCity}
              options={cityOptions}
              onChange={(v) => setField("workCity", v)}
              placeholder="Select"
              searchPlaceholder="Search city..."
              emptyMessage="No city found"
            />
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Height"
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder={`5'6"`}
            />
            <SearchableSelect
              label="Marital Status"
              name="maritalStatus"
              value={form.maritalStatus}
              options={maritalStatusOptions}
              onChange={(v) => setField("maritalStatus", v)}
              placeholder="Select"
            />
            <SearchableSelect
              label="Mother Tongue"
              name="motherTongue"
              value={form.motherTongue}
              options={motherTongueOptions}
              onChange={(v) => setField("motherTongue", v)}
              placeholder="Select"
            />
            <SearchableSelect
              label="Lifestyle"
              name="lifestyle"
              value={form.lifestyle}
              options={lifestyleOptions}
              onChange={(v) => setField("lifestyle", v)}
              placeholder="Select"
            />
            <SearchableSelect
              label="Family Type"
              name="familyType"
              value={form.familyType}
              options={familyTypeOptions}
              onChange={(v) => setField("familyType", v)}
              placeholder="Select"
            />
            <SearchableSelect
              label="Family Status"
              name="familyStatus"
              value={form.familyStatus}
              options={familyStatusOptions}
              onChange={(v) => setField("familyStatus", v)}
              placeholder="Select"
            />
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
                {
                  id: String(Date.now()),
                  url,
                  primary: prev.length === 0,
                },
              ]);
            }}
            onRemove={(id) =>
              setImages((prev) => prev.filter((img) => img.id !== id))
            }
            onSetPrimary={(id) =>
              setImages((prev) =>
                prev.map((img) => ({ ...img, primary: img.id === id })),
              )
            }
          />
        )}

        {step === 5 && (
          <div className="space-y-4">
            <p className="font-semibold text-ink">
              What type of partner are you looking for?
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <SearchableSelect
                label="Age From"
                name="prefAgeFrom"
                value={form.prefAgeFrom}
                options={ageOptions}
                onChange={(v) => setField("prefAgeFrom", v)}
                placeholder="Select"
              />
              <SearchableSelect
                label="Age To"
                name="prefAgeTo"
                value={form.prefAgeTo}
                options={ageOptions}
                onChange={(v) => setField("prefAgeTo", v)}
                placeholder="Select"
              />
              <SearchableSelect
                label="City"
                name="prefCity"
                value={form.prefCity}
                options={cityOptions}
                onChange={(v) => setField("prefCity", v)}
                placeholder="Select city"
                searchPlaceholder="Search city..."
                emptyMessage="No city found"
              />
              <SearchableSelect
                label="State"
                name="prefState"
                value={form.prefState}
                options={stateOptions}
                onChange={(v) => setField("prefState", v)}
                placeholder="Select state"
                searchPlaceholder="Search state..."
                emptyMessage="No state found"
              />
              <SearchableSelect
                label="Education"
                name="prefEducation"
                value={form.prefEducation}
                options={educationOptions}
                onChange={(v) => setField("prefEducation", v)}
                placeholder="Select"
              />
              <SearchableSelect
                label="Occupation"
                name="prefOccupation"
                value={form.prefOccupation}
                options={occupationOptions}
                onChange={(v) => setField("prefOccupation", v)}
                placeholder="Select"
              />
              <SearchableSelect
                label="Marital Status"
                name="prefMaritalStatus"
                value={form.prefMaritalStatus}
                options={maritalStatusOptions}
                onChange={(v) => setField("prefMaritalStatus", v)}
                placeholder="Select"
              />
              <SearchableSelect
                label="Surname"
                name="prefSurname"
                value={form.prefSurname}
                options={surnameOptions}
                onChange={(v) => setField("prefSurname", v)}
                placeholder="Select"
              />
            </div>
            {occupationHint ? (
              <div className="rounded-2xl border border-secondary/20 bg-secondary/5 px-4 py-3 text-sm font-medium text-secondary">
                {occupationHint}
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <button
            type="button"
            className="btn-ghost"
            onClick={back}
            disabled={step === 0}
          >
            Back
          </button>
          {step < REGISTER_STEPS.length - 1 ? (
            <button type="button" className="btn-primary" onClick={next}>
              Continue
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setDone(true)}
            >
              Finish Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
