"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
import { masterMotherTongues } from "@/data/masters";

export default function Page() {
  return (
    <MasterCrudPage
      title="Mother Tongue"
      description="Mother tongue master list."
      initialItems={masterMotherTongues}
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
