"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";

export default function Page() {
  return (
    <MasterCrudPage
      title="Degrees"
      description="Degree master data for education filters."
      masterKey="degrees"
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
