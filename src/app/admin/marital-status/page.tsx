"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
import { masterMaritalStatuses } from "@/data/masters";

export default function Page() {
  return (
    <MasterCrudPage
      title="Marital Status"
      description="Marital status master list."
      initialItems={masterMaritalStatuses}
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
