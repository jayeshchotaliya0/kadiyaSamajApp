"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
import { masterGotras } from "@/data/masters";

export default function Page() {
  return (
    <MasterCrudPage
      title="Gotra"
      description="Gotra master records for community profiles."
      initialItems={masterGotras}
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
