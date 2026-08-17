"use client";

import { OccupationProfilesPage } from "@/components/admin/OccupationProfilesPage";
import { profiles } from "@/data/profiles";

export default function Page() {
  return (
    <OccupationProfilesPage
      title="Civil Engineer Profiles"
      occupation="Civil Engineer"
      profiles={profiles}
      preset="Civil Engineer"
    />
  );
}
