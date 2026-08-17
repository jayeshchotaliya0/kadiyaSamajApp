"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
import { masterOccupations } from "@/data/masters";

export default function Page() {
  return (
    <MasterCrudPage
      title="Occupations"
      description="Occupation master data used across website and admin."
      initialItems={masterOccupations}
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
