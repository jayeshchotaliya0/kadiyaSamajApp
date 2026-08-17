"use client";

import { useMemo, useState } from "react";
import { childProfiles } from "@/data/masters";
import {
  DataTable,
  StatusPill,
  TablePhoto,
  type Column,
} from "@/components/admin/DataTable";
import { AdminListingControls } from "@/components/admin/AdminListingControls";
import { TableActions } from "@/components/admin/TableActions";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { Pagination } from "@/components/common/Pagination";
import { Modal } from "@/components/common/Modal";
import type { ChildProfile } from "@/types";
import { paginate } from "@/utils/filters";
import { CITIES, STATES, SURNAMES } from "@/data/locations";
import {
  matchesFilters,
  matchesSearch,
  useAdminListing,
} from "@/hooks/useAdminListing";

export default function AdminChildrenPage() {
  const [rows, setRows] = useState(childProfiles);
  const [viewItem, setViewItem] = useState<ChildProfile | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ChildProfile | null>(null);
  const listing = useAdminListing();

  const filtered = useMemo(() => {
    let list = rows.filter(
      (row) =>
        matchesSearch(
          [row.name, row.city, row.surname, row.parentGuardian, row.id],
          listing.appliedSearch,
        ) && matchesFilters(row, listing.appliedFilters),
    );

    if (listing.sort === "Newest") {
      list = [...list].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    } else if (listing.sort === "Oldest") {
      list = [...list].sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    } else if (listing.sort === "Name A-Z") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (listing.sort === "Name Z-A") {
      list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [rows, listing.appliedSearch, listing.appliedFilters, listing.sort]);

  const paged = paginate(filtered, listing.page, listing.pageSize);

  const columns: Column<ChildProfile>[] = [
    { key: "id", header: "Profile ID", render: (r) => `#${r.id}` },
    {
      key: "photo",
      header: "Photo",
      render: (r) => (
        <TablePhoto src={r.image} alt="Privacy protected child avatar" />
      ),
    },
    { key: "name", header: "Name", render: (r) => r.name },
    { key: "age", header: "Age", render: (r) => r.age },
    { key: "gender", header: "Gender", render: (r) => r.gender },
    { key: "city", header: "City", render: (r) => r.city },
    { key: "state", header: "State", render: (r) => r.state },
    { key: "surname", header: "Surname", render: (r) => r.surname },
    {
      key: "parent",
      header: "Parent/Guardian",
      render: (r) => r.parentGuardian,
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusPill status={r.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-[1%] whitespace-nowrap",
      render: (r) => (
        <TableActions
          onView={() => setViewItem(r)}
          onEdit={() => setViewItem(r)}
          onDelete={() => setDeleteTarget(r)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-bold">Children Profiles</h1>
        <p className="mt-1 text-ink-soft">
          Privacy-conscious listing UI with placeholder imagery and mock records.
        </p>
      </div>

      <AdminListingControls
        draftSearch={listing.draftSearch}
        onDraftSearchChange={listing.setDraftSearch}
        onSearch={listing.apply}
        onReset={listing.reset}
        sort={listing.sort}
        onSort={listing.setSort}
        pageSize={listing.pageSize}
        onPageSize={listing.setPageSize}
        filtersOpen={listing.filtersOpen}
        onToggleFilters={() => listing.setFiltersOpen((open) => !open)}
        activeFilterCount={listing.activeFilterCount}
        draftFilters={listing.draftFilters}
        onDraftFilterChange={listing.setDraftFilter}
        filterOptions={[
          { key: "gender", label: "Gender", options: ["male", "female"] },
          { key: "city", label: "City", options: CITIES.map((c) => c.name) },
          { key: "state", label: "State", options: [...STATES] },
          { key: "surname", label: "Surname", options: [...SURNAMES] },
          {
            key: "status",
            label: "Status",
            options: ["active", "inactive", "pending"],
          },
        ]}
      />

      <DataTable columns={columns} rows={paged.items} />
      <Pagination
        page={listing.page}
        totalPages={paged.totalPages}
        onChange={listing.setPage}
      />

      <Modal
        open={Boolean(viewItem)}
        onClose={() => setViewItem(null)}
        title={viewItem?.name ?? "Child profile"}
      >
        {viewItem ? (
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-ink-soft">Age:</span> {viewItem.age}
            </p>
            <p>
              <span className="text-ink-soft">City:</span> {viewItem.city}
            </p>
            <p>
              <span className="text-ink-soft">Parent/Guardian:</span>{" "}
              {viewItem.parentGuardian}
            </p>
            <p>
              <span className="text-ink-soft">Status:</span> {viewItem.status}
            </p>
          </div>
        ) : null}
      </Modal>

      <DeleteConfirmModal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          setRows((prev) => prev.filter((row) => row.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
        title="Delete Profile?"
        message={`Are you sure you want to delete ${deleteTarget?.name ?? "this profile"}?`}
      />
    </div>
  );
}
