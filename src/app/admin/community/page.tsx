"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
import { masterCommunities } from "@/data/masters";

export default function Page() {
  return (
    <MasterCrudPage
      title="Community"
      description="Community and sub-community master data."
      initialItems={masterCommunities}
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
