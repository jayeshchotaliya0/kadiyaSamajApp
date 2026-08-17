"use client";

import { useMemo, useState } from "react";
import type { Profile } from "@/types";
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
import { CITIES, STATES, SURNAMES } from "@/data/locations";
import { EDUCATION_LEVELS, MARITAL_STATUSES } from "@/data/education";
import { OCCUPATIONS } from "@/data/occupations";
import { formatDate } from "@/utils/format";
import { paginate } from "@/utils/filters";
import {
  matchesFilters,
  matchesSearch,
  useAdminListing,
} from "@/hooks/useAdminListing";

export function AdminProfilesPage({
  title,
  initialProfiles,
}: {
  title: string;
  initialProfiles: Profile[];
}) {
  const [rows, setRows] = useState(initialProfiles);
  const [selected, setSelected] = useState<Profile | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);
  const listing = useAdminListing();

  const filtered = useMemo(() => {
    let list = rows.filter(
      (profile) =>
        matchesSearch(
          [
            profile.name,
            profile.city,
            profile.state,
            profile.surname,
            profile.education,
            profile.degree,
            profile.occupation,
            profile.id,
          ],
          listing.appliedSearch,
        ) && matchesFilters(profile, listing.appliedFilters),
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

  const columns: Column<Profile>[] = [
    { key: "id", header: "Profile ID", render: (r) => `#${r.id}` },
    {
      key: "photo",
      header: "Photo",
      render: (r) => <TablePhoto src={r.image} alt={r.name} />,
    },
    { key: "name", header: "Name", render: (r) => r.name },
    { key: "age", header: "Age", render: (r) => r.age },
    { key: "city", header: "City", render: (r) => r.city },
    { key: "state", header: "State", render: (r) => r.state },
    { key: "surname", header: "Surname", render: (r) => r.surname },
    { key: "education", header: "Education", render: (r) => r.degree },
    { key: "occupation", header: "Occupation", render: (r) => r.occupation },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusPill status={r.status} />,
    },
    {
      key: "verified",
      header: "Verified",
      render: (r) => <StatusPill status={r.verified ? "verified" : "no"} />,
    },
    {
      key: "created",
      header: "Created Date",
      render: (r) => formatDate(r.createdAt),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-[1%] whitespace-nowrap",
      render: (r) => (
        <TableActions
          onView={() => {
            setSelected(r);
            setEditOpen(false);
          }}
          onEdit={() => {
            setSelected(r);
            setEditOpen(true);
          }}
          onDelete={() => setDeleteTarget(r)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        <p className="mt-1 text-ink-soft">
          Frontend-only listing with mock data, filters, and visual actions.
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
          { key: "city", label: "City", options: CITIES.map((c) => c.name) },
          { key: "state", label: "State", options: [...STATES] },
          { key: "surname", label: "Surname", options: [...SURNAMES] },
          { key: "education", label: "Education", options: [...EDUCATION_LEVELS] },
          { key: "occupation", label: "Occupation", options: OCCUPATIONS },
          {
            key: "maritalStatus",
            label: "Marital Status",
            options: [...MARITAL_STATUSES],
          },
          {
            key: "status",
            label: "Status",
            options: ["active", "inactive", "pending", "rejected"],
          },
          { key: "verified", label: "Verified", options: ["true", "false"] },
        ]}
      />

      <DataTable columns={columns} rows={paged.items} />
      <Pagination
        page={listing.page}
        totalPages={paged.totalPages}
        onChange={listing.setPage}
      />

      <Modal
        open={Boolean(selected) && !editOpen}
        onClose={() => setSelected(null)}
        title={selected ? selected.name : "Profile"}
        className="max-w-2xl"
      >
        {selected ? (
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <p>
              <span className="text-ink-soft">Age:</span> {selected.age}
            </p>
            <p>
              <span className="text-ink-soft">City:</span> {selected.city}
            </p>
            <p>
              <span className="text-ink-soft">Occupation:</span> {selected.occupation}
            </p>
            <p>
              <span className="text-ink-soft">Education:</span> {selected.degree}
            </p>
            <p>
              <span className="text-ink-soft">Status:</span> {selected.status}
            </p>
            <p>
              <span className="text-ink-soft">Verified:</span>{" "}
              {selected.verified ? "Yes" : "No"}
            </p>
            <p className="text-ink-soft sm:col-span-2">{selected.about}</p>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(selected) && editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelected(null);
        }}
        title={selected ? `Edit ${selected.name}` : "Edit Profile"}
        className="max-w-lg"
      >
        <p className="text-sm text-ink-soft">
          Edit form is a frontend demo. Changes are not persisted to a backend.
        </p>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setEditOpen(false);
              setSelected(null);
            }}
          >
            Close
          </button>
        </div>
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
