"use client";

import { OccupationProfilesPage } from "@/components/admin/OccupationProfilesPage";
import { profiles } from "@/data/profiles";

export default function Page() {
  return (
    <OccupationProfilesPage
      title="Job Profiles"
      
      profiles={profiles}
      preset="Jobs"
    />
  );
}
