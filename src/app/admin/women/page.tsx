"use client";

import { AdminProfilesPage } from "@/components/admin/AdminProfilesPage";
import { profiles } from "@/data/profiles";

export default function AdminWomenPage() {
  return (
    <AdminProfilesPage
      title="Women Profiles"
      initialProfiles={profiles.filter((p) => p.gender === "female")}
    />
  );
}
