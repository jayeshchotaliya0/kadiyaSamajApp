import type { SelectOption } from "@/components/common/SearchableSelect";
import {
  CITIES,
  SURNAMES,
  STATES,
  citiesByState,
  getCitiesForState,
} from "@/data/locations";
import {
  DEGREES,
  EDUCATION_LEVELS,
  INCOME_RANGES,
  JOB_TYPES,
  MARITAL_STATUSES,
  MOTHER_TONGUES,
} from "@/data/education";
import { OCCUPATIONS } from "@/data/occupations";

export const REGISTER_STEPS = [
  "Basic Details",
  "Community",
  "Education & Career",
  "Personal Details",
  "Photo",
  "Partner Preference",
] as const;

export function toSelectOptions(
  items: readonly string[] | string[],
): SelectOption[] {
  return items.map((item) => ({ label: item, value: item }));
}

export const lookingForOptions = toSelectOptions(["Bride", "Groom"]);
export const genderOptions = toSelectOptions(["male", "female"]);
export const subCommunityOptions = toSelectOptions([
  "Kadiya Kumbhar",
  "Prajapati",
  "Kumhar",
]);
export const stateOptions = toSelectOptions([...STATES]);
export const cityOptions = toSelectOptions(CITIES.map((city) => city.name));
export const educationOptions = toSelectOptions([...EDUCATION_LEVELS]);
export const degreeOptions = toSelectOptions([...DEGREES]);
export const occupationOptions = toSelectOptions(OCCUPATIONS);
export const jobTypeOptions = toSelectOptions([...JOB_TYPES]);
export const incomeOptions = toSelectOptions([...INCOME_RANGES]);
export const maritalStatusOptions = toSelectOptions([...MARITAL_STATUSES]);
export const motherTongueOptions = toSelectOptions([...MOTHER_TONGUES]);
export const lifestyleOptions = toSelectOptions([
  "Traditional",
  "Modern Traditional",
  "Modern",
]);
export const familyTypeOptions = toSelectOptions(["Joint", "Nuclear"]);
export const familyStatusOptions = toSelectOptions([
  "Middle Class",
  "Upper Middle Class",
  "Rich",
]);
export const surnameOptions = toSelectOptions([...SURNAMES]);
export const ageOptions = toSelectOptions(
  Array.from({ length: 30 }, (_, i) => String(i + 18)),
);

export function getCityOptionsForState(state: string): SelectOption[] {
  return toSelectOptions(getCitiesForState(state));
}

export { citiesByState, getCitiesForState };

export const initialRegisterForm = {
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
};

export type RegisterFormState = typeof initialRegisterForm;
