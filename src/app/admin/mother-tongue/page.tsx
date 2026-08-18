"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";

export default function Page() {
  return (
    <MasterCrudPage
      title="Mother Tongue"
      description="Mother tongue master list."
      masterKey="motherTongues"
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
