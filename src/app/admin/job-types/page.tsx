"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
import { masterJobTypes } from "@/data/masters";

export default function Page() {
  return (
    <MasterCrudPage
      title="Job Types"
      description="Job type master records."
      initialItems={masterJobTypes}
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
