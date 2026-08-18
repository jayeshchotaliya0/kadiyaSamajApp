"use client";

import { MasterCrudPage } from "@/components/admin/MasterCrudPage";
export default function Page() {
  return (
    <MasterCrudPage
      title="Surnames"
      description="Community surname master list."
      masterKey="surnames"
      metaLabel="Type"
      filterOptions={[{ key: "status", label: "Status", options: ["active", "inactive"] }]}
    />
  );
}
