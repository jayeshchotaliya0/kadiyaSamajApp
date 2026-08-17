import type { ChildProfile, MasterItem } from "@/types";
import { CITIES, GOTRAS, STATES, SURNAMES } from "@/data/locations";
import {
  DEGREES,
  EDUCATION_LEVELS,
  JOB_TYPES,
  MARITAL_STATUSES,
  MOTHER_TONGUES,
} from "@/data/education";
import { OCCUPATIONS } from "@/data/occupations";

function toMaster(items: readonly string[], prefix = "item"): MasterItem[] {
  return items.map((name, index) => ({
    id: index + 1,
    name,
    status: index % 7 === 0 ? "inactive" : "active",
    createdAt: `2025-${String((index % 12) + 1).padStart(2, "0")}-10`,
    meta: prefix,
  }));
}

export const masterStates: MasterItem[] = toMaster(STATES, "state");
export const masterCities: MasterItem[] = CITIES.map((city, index) => ({
  id: index + 1,
  name: city.name,
  status: "active",
  createdAt: `2025-${String((index % 12) + 1).padStart(2, "0")}-12`,
  meta: city.state,
}));
export const masterSurnames: MasterItem[] = toMaster(SURNAMES, "surname");
export const masterGotras: MasterItem[] = toMaster(GOTRAS, "gotra");
export const masterCommunities: MasterItem[] = toMaster(
  ["Kadiya Kumbhar", "Prajapati", "Kumhar"],
  "community",
);
export const masterEducation: MasterItem[] = toMaster(EDUCATION_LEVELS, "education");
export const masterDegrees: MasterItem[] = toMaster(DEGREES, "degree");
export const masterOccupations: MasterItem[] = toMaster(OCCUPATIONS, "occupation");
export const masterJobTypes: MasterItem[] = toMaster(JOB_TYPES, "job-type");
export const masterMaritalStatuses: MasterItem[] = toMaster(
  MARITAL_STATUSES,
  "marital",
);
export const masterMotherTongues: MasterItem[] = toMaster(
  MOTHER_TONGUES,
  "language",
);

export const childProfiles: ChildProfile[] = [
  {
    id: 1,
    name: "Aarav Prajapati",
    age: 8,
    gender: "male",
    city: "Ahmedabad",
    state: "Gujarat",
    surname: "Prajapati",
    parentGuardian: "Rahul Prajapati",
    status: "active",
    image: "/images/placeholders/child.svg",
    createdAt: "2026-01-10",
  },
  {
    id: 2,
    name: "Anaya Kumbhar",
    age: 6,
    gender: "female",
    city: "Surat",
    state: "Gujarat",
    surname: "Kumbhar",
    parentGuardian: "Amit Kumbhar",
    status: "active",
    image: "/images/placeholders/child.svg",
    createdAt: "2026-02-02",
  },
  {
    id: 3,
    name: "Vivaan Kadiya",
    age: 10,
    gender: "male",
    city: "Vadodara",
    state: "Gujarat",
    surname: "Kadiya",
    parentGuardian: "Karan Kadiya",
    status: "pending",
    image: "/images/placeholders/child.svg",
    createdAt: "2026-03-14",
  },
  {
    id: 4,
    name: "Myra Prajapati",
    age: 7,
    gender: "female",
    city: "Pune",
    state: "Maharashtra",
    surname: "Prajapati",
    parentGuardian: "Vivek Prajapati",
    status: "active",
    image: "/images/placeholders/child.svg",
    createdAt: "2026-04-01",
  },
  {
    id: 5,
    name: "Kabir Kumbhar",
    age: 9,
    gender: "male",
    city: "Jaipur",
    state: "Rajasthan",
    surname: "Kumbhar",
    parentGuardian: "Harsh Kumbhar",
    status: "inactive",
    image: "/images/placeholders/child.svg",
    createdAt: "2026-05-20",
  },
];
