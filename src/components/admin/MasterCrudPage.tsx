"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { MasterItem } from "@/types";
import { DataTable, StatusPill, type Column } from "@/components/admin/DataTable";
import { AdminListingControls } from "@/components/admin/AdminListingControls";
import { TableActions } from "@/components/admin/TableActions";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { Pagination } from "@/components/common/Pagination";
import { Modal } from "@/components/common/Modal";
import { FormField } from "@/components/forms/FormField";
import { formatDate } from "@/utils/format";
import { paginate } from "@/utils/filters";
import {
  matchesFilters,
  matchesSearch,
  useAdminListing,
  type FilterOption,
} from "@/hooks/useAdminListing";

export function MasterCrudPage({
  title,
  description,
  initialItems,
  metaLabel = "Meta",
  filterOptions,
}: {
  title: string;
  description: string;
  initialItems: MasterItem[];
  metaLabel?: string;
  filterOptions?: FilterOption[];
}) {
  const [items, setItems] = useState(initialItems);
  const [formOpen, setFormOpen] = useState(false);
  const [viewItem, setViewItem] = useState<MasterItem | null>(null);
  const [editing, setEditing] = useState<MasterItem | null>(null);
  const [name, setName] = useState("");
  const [meta, setMeta] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [deleteItem, setDeleteItem] = useState<MasterItem | null>(null);
  const listing = useAdminListing();

  const resolvedFilters: FilterOption[] = filterOptions ?? [
    { key: "status", label: "Status", options: ["active", "inactive"] },
  ];

  const filtered = useMemo(() => {
    let list = items.filter(
      (item) =>
        matchesSearch([item.name, item.meta, item.status, item.id], listing.appliedSearch) &&
        matchesFilters(item, listing.appliedFilters),
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
  }, [items, listing.appliedSearch, listing.appliedFilters, listing.sort]);

  const paged = paginate(filtered, listing.page, listing.pageSize);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setMeta("");
    setStatus("active");
    setFormOpen(true);
  };

  const openEdit = (item: MasterItem) => {
    setEditing(item);
    setName(item.name);
    setMeta(item.meta ?? "");
    setStatus(item.status);
    setFormOpen(true);
  };

  const save = () => {
    if (!name.trim()) return;
    if (editing) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editing.id ? { ...item, name, meta, status } : item,
        ),
      );
    } else {
      setItems((prev) => [
        {
          id: Math.max(0, ...prev.map((i) => i.id)) + 1,
          name,
          meta,
          status,
          createdAt: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
    }
    setFormOpen(false);
  };

  const columns: Column<MasterItem>[] = [
    { key: "id", header: "ID", render: (r) => r.id },
    { key: "name", header: "Name", render: (r) => r.name },
    { key: "meta", header: metaLabel, render: (r) => r.meta || "—" },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusPill status={r.status} />,
    },
    {
      key: "created",
      header: "Created",
      render: (r) => formatDate(r.createdAt),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-[1%] whitespace-nowrap",
      render: (r) => (
        <TableActions
          onView={() => setViewItem(r)}
          onEdit={() => openEdit(r)}
          onDelete={() => setDeleteItem(r)}
          viewLabel="View Record"
          editLabel="Edit Record"
          deleteLabel="Delete Record"
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="mt-1 text-ink-soft">{description}</p>
        </div>
        <button type="button" className="btn-primary" onClick={openCreate}>
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
        filterOptions={resolvedFilters}
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
        title={viewItem?.name ?? "Record"}
      >
        {viewItem ? (
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-ink-soft">ID:</span> {viewItem.id}
            </p>
            <p>
              <span className="text-ink-soft">{metaLabel}:</span>{" "}
              {viewItem.meta || "—"}
            </p>
            <p>
              <span className="text-ink-soft">Status:</span> {viewItem.status}
            </p>
            <p>
              <span className="text-ink-soft">Created:</span>{" "}
              {formatDate(viewItem.createdAt)}
            </p>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? `Edit ${title}` : `Add ${title}`}
      >
        <div className="space-y-4">
          <FormField label="Name" htmlFor="name">
            <input
              id="name"
              className="field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
          <FormField label={metaLabel} htmlFor="meta">
            <input
              id="meta"
              className="field"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
            />
          </FormField>
          <FormField label="Status" htmlFor="status">
            <select
              id="status"
              className="field"
              value={status}
              onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </FormField>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </button>
            <button type="button" className="btn-primary" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </Modal>

      <DeleteConfirmModal
        open={Boolean(deleteItem)}
        onClose={() => setDeleteItem(null)}
        onConfirm={() => {
          if (!deleteItem) return;
          setItems((prev) => prev.filter((item) => item.id !== deleteItem.id));
          setDeleteItem(null);
        }}
        title="Delete Record?"
        message={`Are you sure you want to delete ${deleteItem?.name ?? "this record"}?`}
      />
    </div>
  );
}
