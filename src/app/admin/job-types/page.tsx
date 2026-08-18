"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";

export default function Page() {
  return (
    <MasterCrudPage
      title="Job Types"
      description="Job type master records."
      masterKey="jobTypes"
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
