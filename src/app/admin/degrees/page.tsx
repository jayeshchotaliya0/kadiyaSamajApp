"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
import { masterDegrees } from "@/data/masters";

export default function Page() {
  return (
    <MasterCrudPage
      title="Degrees"
      description="Degree master data for education filters."
      initialItems={masterDegrees}
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
