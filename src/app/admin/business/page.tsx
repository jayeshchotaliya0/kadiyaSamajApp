"use client";

import { OccupationProfilesPage } from "@/components/admin/OccupationProfilesPage";
import { profiles } from "@/data/profiles";

export default function Page() {
  return (
    <OccupationProfilesPage
      title="Business Profiles"
      occupation="Business"
      profiles={profiles}
      preset="Business"
    />
  );
}
