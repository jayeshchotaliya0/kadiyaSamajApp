"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
import { masterSurnames } from "@/data/masters";

export default function Page() {
  return (
    <MasterCrudPage
      title="Surnames"
      description="Community surname master list."
      initialItems={masterSurnames}
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
