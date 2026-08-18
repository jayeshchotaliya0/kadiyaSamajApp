"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";

export default function Page() {
  return (
    <MasterCrudPage
      title="Marital Status"
      description="Marital status master list."
      masterKey="maritalStatuses"
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
