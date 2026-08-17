"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
import { masterEducation } from "@/data/masters";

export default function Page() {
  return (
    <MasterCrudPage
      title="Education"
      description="Education level master data."
      initialItems={masterEducation}
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
