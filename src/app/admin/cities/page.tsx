"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
import { masterCities } from "@/data/masters";

export default function Page() {
  return (
    <MasterCrudPage
      title="Cities"
      description="Manage city master data linked to states."
      initialItems={masterCities}
      metaLabel="State"
      filterOptions={[{ key: "meta", label: "State", options: ["Gujarat", "Maharashtra", "Rajasthan", "Madhya Pradesh", "Delhi", "Karnataka"] }, { key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
