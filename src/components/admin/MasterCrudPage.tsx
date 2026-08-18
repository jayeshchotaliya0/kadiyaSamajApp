"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { MasterItem } from "@/types";
import { DataTable, StatusPill, type Column } from "@/components/admin/DataTable";
import { AdminListingControls } from "@/components/admin/AdminListingControls";
import { TableActions } from "@/components/admin/TableActions";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
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
import { type MasterKey, useMasterData } from "@/contexts/MasterDataContext";
import { useMasterDelete } from "@/hooks/useMasterDelete";

export function MasterCrudPage({
  title,
  description,
  masterKey,
  metaLabel = "Meta",
  filterOptions,
}: {
  title: string;
  description: string;
  masterKey: MasterKey;
  metaLabel?: string;
  filterOptions?: FilterOption[];
}) {
  const { getItems, addItem, updateItem } = useMasterData();
  const items = getItems(masterKey);
  const { dialog, requestDelete, cancelDelete, confirmDelete, isOpen } =
    useMasterDelete(masterKey);

  const [formOpen, setFormOpen] = useState(false);
  const [viewItem, setViewItem] = useState<MasterItem | null>(null);
  const [editing, setEditing] = useState<MasterItem | null>(null);
  const [name, setName] = useState("");
  const [meta, setMeta] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
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
      updateItem(masterKey, editing.id, { name, meta, status });
    } else {
      addItem(masterKey, {
        name,
        meta,
        status,
        createdAt: new Date().toISOString().slice(0, 10),
      });
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
          onDelete={() => requestDelete(r)}
          viewLabel="View Record"
          editLabel="Edit Record"
          deleteLabel="Delete Record"
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          <p className="mt-0.5 text-sm text-ink-soft">{description}</p>
        </div>
        <button type="button" className="btn-primary" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      <AdminListingControls
        draftSearch={listing.draftSearch}
        onDraftSearchChange={listing.setDraftSearch}
        onSearch={listing.applySearch}
        filtersOpen={listing.filtersOpen}
        onOpenFilters={listing.openFilters}
        onCloseFilters={listing.closeFilters}
        onApplyFilters={listing.applyFilters}
        onResetFilters={listing.resetFilters}
        activeFilterCount={listing.activeFilterCount}
        draftFilters={listing.draftFilters}
        onDraftFilterChange={listing.setDraftFilter}
        searchPlaceholder={`Search ${title.toLowerCase()} records...`}
        filterOptions={resolvedFilters}
      />

      <DataTable
        columns={columns}
        rows={paged.items}
        pagination={{
          page: listing.page,
          pageSize: listing.pageSize,
          totalItems: filtered.length,
          totalPages: paged.totalPages,
          onChange: listing.setPage,
          onPageSize: listing.setPageSize,
        }}
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
        open={isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title={dialog?.title ?? "Delete Record?"}
        message={dialog?.message ?? "Are you sure you want to delete this record?"}
      />
    </div>
  );
}
