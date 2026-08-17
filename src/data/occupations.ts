import { OCCUPATION_OPTIONS } from "@/constants/brand";

export const OCCUPATIONS = [...OCCUPATION_OPTIONS];

export const OCCUPATION_HINTS: Record<string, string> = {
  Business: "We will show you profiles matching your business preference.",
  Doctor: "We will show you profiles matching your doctor preference.",
  "Civil Engineer": "We will show you profiles matching your civil engineer preference.",
  "Software Engineer": "We will show you profiles matching your software engineer preference.",
  "Government Job": "We will show you profiles matching your government job preference.",
  "Private Job": "We will show you profiles matching your private job preference.",
  Teacher: "We will show you profiles matching your teacher preference.",
  Accountant: "We will show you profiles matching your accountant preference.",
  Lawyer: "We will show you profiles matching your lawyer preference.",
  Other: "We will show you profiles matching your selected preference.",
};
