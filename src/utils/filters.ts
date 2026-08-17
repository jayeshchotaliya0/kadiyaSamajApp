import type { Profile, ProfileFilters, MatchIndicator } from "@/types";

export function filterProfiles(profiles: Profile[], filters: ProfileFilters) {
  return profiles.filter((profile) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = [
        profile.name,
        profile.city,
        profile.state,
        profile.surname,
        profile.occupation,
        profile.education,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.gender && profile.gender !== filters.gender) return false;
    if (filters.ageFrom && profile.age < filters.ageFrom) return false;
    if (filters.ageTo && profile.age > filters.ageTo) return false;
    if (filters.city && profile.city !== filters.city) return false;
    if (filters.state && profile.state !== filters.state) return false;
    if (filters.surname && profile.surname !== filters.surname) return false;
    if (filters.maritalStatus && profile.maritalStatus !== filters.maritalStatus)
      return false;
    if (filters.education && profile.education !== filters.education) return false;
    if (filters.degree && profile.degree !== filters.degree) return false;
    if (filters.occupation && profile.occupation !== filters.occupation)
      return false;
    if (filters.jobType && profile.jobType !== filters.jobType) return false;
    if (filters.income && profile.income !== filters.income) return false;
    if (filters.verified && !profile.verified) return false;
    if (filters.withPhoto && !profile.withPhoto) return false;
    if (filters.recentlyJoined && !profile.recentlyJoined) return false;
    return true;
  });
}

export function getMatchIndicators(
  profile: Profile,
  viewerPrefs?: Profile["partnerPreferences"],
): MatchIndicator[] {
  const prefs = viewerPrefs ?? {
    ageFrom: 24,
    ageTo: 32,
    city: profile.city,
    state: profile.state,
    education: "Graduate",
    occupation: profile.occupation,
    maritalStatus: "Never Married",
    community: "Kadiya Kumbhar / Prajapati",
  };

  return [
    {
      label: "Age",
      matched: profile.age >= prefs.ageFrom && profile.age <= prefs.ageTo,
    },
    { label: "City", matched: !prefs.city || profile.city === prefs.city },
    { label: "State", matched: !prefs.state || profile.state === prefs.state },
    {
      label: "Education",
      matched: !prefs.education || profile.education === prefs.education,
    },
    {
      label: "Occupation",
      matched: !prefs.occupation || profile.occupation === prefs.occupation,
    },
    {
      label: "Marital Status",
      matched:
        !prefs.maritalStatus || profile.maritalStatus === prefs.maritalStatus,
    },
    {
      label: "Community",
      matched: !prefs.community || profile.community === prefs.community,
    },
  ];
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
  };
}
