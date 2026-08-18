"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
export default function Page() {
  return (
    <MasterCrudPage
      title="States"
      description="Manage state master data for profile forms."
      masterKey="states"
      metaLabel="Code"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
