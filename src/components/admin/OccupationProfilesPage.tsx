"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
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
import { FormField } from "@/components/forms/FormField";
import { CITIES, STATES } from "@/data/locations";
import { paginate } from "@/utils/filters";
import {
  matchesFilters,
  matchesSearch,
  useAdminListing,
} from "@/hooks/useAdminListing";

type FieldDef = { key: string; label: string };

const PRESETS: Record<string, FieldDef[]> = {
  Business: [
    { key: "name", label: "Name" },
    { key: "businessName", label: "Business Name" },
    { key: "businessType", label: "Business Type" },
    { key: "businessLocation", label: "Business Location" },
    { key: "experience", label: "Experience" },
    { key: "income", label: "Income" },
    { key: "education", label: "Education" },
    { key: "aboutBusiness", label: "About Business" },
  ],
  Doctor: [
    { key: "name", label: "Name" },
    { key: "education", label: "Education" },
    { key: "specialization", label: "Specialization" },
    { key: "hospital", label: "Hospital/Clinic" },
    { key: "experience", label: "Experience" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "income", label: "Income" },
  ],
  "Civil Engineer": [
    { key: "name", label: "Name" },
    { key: "education", label: "Education" },
    { key: "company", label: "Company" },
    { key: "experience", label: "Experience" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "income", label: "Income" },
  ],
  "Software Engineer": [
    { key: "name", label: "Name" },
    { key: "technology", label: "Technology" },
    { key: "company", label: "Company" },
    { key: "experience", label: "Experience" },
    { key: "education", label: "Education" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "income", label: "Income" },
  ],
  Jobs: [
    { key: "name", label: "Name" },
    { key: "occupation", label: "Occupation" },
    { key: "company", label: "Company" },
    { key: "jobType", label: "Job Type" },
    { key: "experience", label: "Experience" },
    { key: "city", label: "City" },
    { key: "income", label: "Income" },
  ],
};

export function OccupationProfilesPage({
  title,
  occupation,
  profiles,
  preset = "Jobs",
}: {
  title: string;
  occupation?: string;
  profiles: Profile[];
  preset?: keyof typeof PRESETS;
}) {
  const fields = PRESETS[preset];
  const [rows, setRows] = useState(
    occupation ? profiles.filter((p) => p.occupation === occupation) : profiles,
  );
  const [selected, setSelected] = useState<Profile | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const listing = useAdminListing({ defaultPageSize: 8 });

  const filtered = useMemo(() => {
    let list = rows.filter(
      (row) =>
        matchesSearch(
          [row.name, row.city, row.state, row.occupation, row.company, row.id],
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

  const columns: Column<Profile>[] = [
    {
      key: "photo",
      header: "Photo",
      render: (r) => <TablePhoto src={r.image} alt={r.name} />,
    },
    ...fields.slice(0, 6).map((field) => ({
      key: field.key,
      header: field.label,
      render: (r: Profile) => String(r[field.key as keyof Profile] ?? "—"),
    })),
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
          onView={() => {
            setSelected(r);
            setFormOpen(false);
          }}
          onEdit={() => {
            const next: Record<string, string> = {};
            fields.forEach((f) => {
              next[f.key] = String(r[f.key as keyof Profile] ?? "");
            });
            setForm(next);
            setSelected(r);
            setFormOpen(true);
          }}
          onDelete={() => setDeleteTarget(r)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="mt-1 text-ink-soft">
            Reusable occupation profile UI with mock records and modal forms.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setSelected(null);
            setForm(Object.fromEntries(fields.map((f) => [f.key, ""])));
            setFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
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
          {
            key: "status",
            label: "Status",
            options: ["active", "inactive", "pending", "rejected"],
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
        open={Boolean(selected) && !formOpen}
        onClose={() => setSelected(null)}
        title={selected?.name ?? "Profile"}
        className="max-w-2xl"
      >
        {selected ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((field) => (
              <p key={field.key}>
                <span className="text-ink-soft">{field.label}: </span>
                {String(selected[field.key as keyof Profile] ?? "—")}
              </p>
            ))}
          </div>
        ) : null}
      </Modal>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={selected ? "Edit profile" : "Add profile"}
        className="max-w-2xl"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {fields.map((field) => (
            <FormField key={field.key} label={field.label} htmlFor={field.key}>
              <input
                id={field.key}
                className="field"
                value={form[field.key] ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
              />
            </FormField>
          ))}
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setFormOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              if (selected) {
                setRows((prev) =>
                  prev.map((row) =>
                    row.id === selected.id ? ({ ...row, ...form } as Profile) : row,
                  ),
                );
              }
              setFormOpen(false);
            }}
          >
            Save
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
