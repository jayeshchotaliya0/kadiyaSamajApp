export type Gender = "male" | "female";
export type ProfileStatus = "active" | "inactive" | "pending" | "rejected";
export type MaritalStatus = "Never Married" | "Divorced" | "Widowed" | "Awaiting Divorce";

export interface PartnerPreference {
  ageFrom: number;
  ageTo: number;
  heightFrom?: string;
  heightTo?: string;
  city?: string;
  state?: string;
  education?: string;
  occupation?: string;
  maritalStatus?: string;
  community?: string;
  surname?: string;
}

export interface Profile {
  id: number;
  name: string;
  gender: Gender;
  age: number;
  dateOfBirth?: string;
  height: string;
  city: string;
  state: string;
  surname: string;
  gotra: string;
  community: string;
  subCommunity: string;
  nativePlace: string;
  education: string;
  degree: string;
  occupation: string;
  jobType: string;
  company: string;
  experience: string;
  income: string;
  workCity: string;
  maritalStatus: MaritalStatus;
  religion: string;
  motherTongue: string;
  lifestyle: string;
  familyType: string;
  familyStatus: string;
  fatherOccupation: string;
  motherOccupation: string;
  brothers: number;
  sisters: number;
  about: string;
  hobbies: string[];
  foodPreference: string;
  smoking: string;
  drinking: string;
  verified: boolean;
  withPhoto: boolean;
  recentlyJoined: boolean;
  status: ProfileStatus;
  createdAt: string;
  image: string;
  gallery: string[];
  partnerPreferences: PartnerPreference;
  // Occupation-specific optional fields
  businessName?: string;
  businessType?: string;
  businessLocation?: string;
  specialization?: string;
  hospital?: string;
  technology?: string;
  aboutBusiness?: string;
  mobile?: string;
  email?: string;
}

export interface ChildProfile {
  id: number;
  name: string;
  age: number;
  gender: Gender;
  city: string;
  state: string;
  surname: string;
  parentGuardian: string;
  status: ProfileStatus;
  image: string;
  createdAt: string;
}

export interface SuccessStory {
  id: number;
  brideName: string;
  groomName: string;
  story: string;
  date: string;
  image: string;
  city: string;
}

export interface MasterItem {
  id: number;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
  meta?: string;
}

export interface LocationItem extends MasterItem {
  state?: string;
  type: "state" | "city";
}

export interface ProfileFilters {
  gender?: string;
  ageFrom?: number;
  ageTo?: number;
  city?: string;
  state?: string;
  surname?: string;
  maritalStatus?: string;
  education?: string;
  degree?: string;
  occupation?: string;
  jobType?: string;
  income?: string;
  verified?: boolean;
  withPhoto?: boolean;
  recentlyJoined?: boolean;
  search?: string;
}

export interface HeroSearchParams {
  lookingFor: string;
  ageFrom: string;
  ageTo: string;
  city: string;
  state: string;
  occupation: string;
}

export interface MatchIndicator {
  label: string;
  matched: boolean;
}
