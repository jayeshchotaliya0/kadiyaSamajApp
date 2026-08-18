"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
export default function Page() {
  return (
    <MasterCrudPage
      title="Locations"
      description="Combined locations overview using city master data."
      masterKey="cities"
      metaLabel="State"
      filterOptions={[{ key: "meta", label: "State", options: ["Gujarat", "Maharashtra", "Rajasthan", "Madhya Pradesh", "Delhi", "Karnataka"] }, { key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
