"use client";

import { OccupationProfilesPage } from "@/components/admin/OccupationProfilesPage";
import { profiles } from "@/data/profiles";

export default function Page() {
  return (
    <OccupationProfilesPage
      title="Software Engineer Profiles"
      occupation="Software Engineer"
      profiles={profiles}
      preset="Software Engineer"
    />
  );
}
