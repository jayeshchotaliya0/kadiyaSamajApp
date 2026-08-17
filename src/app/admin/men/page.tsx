"use client";

import { AdminProfilesPage } from "@/components/admin/AdminProfilesPage";
import { profiles } from "@/data/profiles";

export default function AdminMenPage() {
  return (
    <AdminProfilesPage
      title="Men Profiles"
      initialProfiles={profiles.filter((p) => p.gender === "male")}
    />
  );
}
