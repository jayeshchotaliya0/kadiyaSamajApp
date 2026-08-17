"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
import { masterStates } from "@/data/masters";

export default function Page() {
  return (
    <MasterCrudPage
      title="States"
      description="Manage state master data for profile forms."
      initialItems={masterStates}
      metaLabel="Code"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
