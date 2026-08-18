"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";

export default function Page() {
  return (
    <MasterCrudPage
      title="Gotra"
      description="Gotra master records for community profiles."
      masterKey="gotras"
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
