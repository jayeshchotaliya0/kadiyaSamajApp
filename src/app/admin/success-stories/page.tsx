"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { successStories as initial } from "@/data/successStories";
import type { SuccessStory } from "@/types";
import { AdminListingControls } from "@/components/admin/AdminListingControls";
import { TableActions } from "@/components/admin/TableActions";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { Modal } from "@/components/common/Modal";
import { FormField } from "@/components/forms/FormField";
import { Pagination } from "@/components/common/Pagination";
import { formatDate } from "@/utils/format";
import { paginate } from "@/utils/filters";
import {
  matchesFilters,
  matchesSearch,
  useAdminListing,
} from "@/hooks/useAdminListing";
import { UNIQUE_CITY_NAMES } from "@/data/locations";

export default function AdminSuccessStoriesPage() {
  const [stories, setStories] = useState(initial);
  const [open, setOpen] = useState(false);
  const [viewItem, setViewItem] = useState<SuccessStory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SuccessStory | null>(null);
  const [form, setForm] = useState({
    brideName: "",
    groomName: "",
    story: "",
    city: "",
    date: "",
  });
  const listing = useAdminListing({ defaultPageSize: 6 });

  const filtered = useMemo(() => {
    let list = stories.filter(
      (story) =>
        matchesSearch(
          [story.brideName, story.groomName, story.city, story.story, story.id],
          listing.appliedSearch,
        ) && matchesFilters(story, listing.appliedFilters),
    );

    if (listing.sort === "Newest") {
      list = [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
    } else if (listing.sort === "Oldest") {
      list = [...list].sort((a, b) => (a.date > b.date ? 1 : -1));
    } else if (listing.sort === "Name A-Z") {
      list = [...list].sort((a, b) =>
        `${a.brideName}${a.groomName}`.localeCompare(`${b.brideName}${b.groomName}`),
      );
    } else if (listing.sort === "Name Z-A") {
      list = [...list].sort((a, b) =>
        `${b.brideName}${b.groomName}`.localeCompare(`${a.brideName}${a.groomName}`),
      );
    }

    return list;
  }, [stories, listing.appliedSearch, listing.appliedFilters, listing.sort]);

  const paged = paginate(filtered, listing.page, listing.pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Success Stories</h1>
          <p className="mt-1 text-ink-soft">
            Manage featured couple stories for the public website.
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Story
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
        filterOptions={[
          { key: "city", label: "City", options: UNIQUE_CITY_NAMES },
        ]}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {paged.items.map((story) => (
          <article key={story.id} className="surface-card overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image
                src={story.image}
                alt=""
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-lg font-bold">
                  {story.brideName} & {story.groomName}
                </h2>
                <TableActions
                  onView={() => setViewItem(story)}
                  onEdit={() => {
                    setForm({
                      brideName: story.brideName,
                      groomName: story.groomName,
                      story: story.story,
                      city: story.city,
                      date: story.date,
                    });
                    setOpen(true);
                  }}
                  onDelete={() => setDeleteTarget(story)}
                  viewLabel="View Story"
                  editLabel="Edit Story"
                  deleteLabel="Delete Story"
                />
              </div>
              <p className="line-clamp-3 text-sm text-ink-soft">{story.story}</p>
              <p className="text-xs font-semibold text-ink-soft">
                {formatDate(story.date)} · {story.city}
              </p>
            </div>
          </article>
        ))}
      </div>

      <Pagination
        page={listing.page}
        totalPages={paged.totalPages}
        totalItems={filtered.length}
        pageSize={listing.pageSize}
        onChange={listing.setPage}
        onPageSize={listing.setPageSize}
      />

      <Modal
        open={Boolean(viewItem)}
        onClose={() => setViewItem(null)}
        title={
          viewItem
            ? `${viewItem.brideName} & ${viewItem.groomName}`
            : "Success story"
        }
      >
        {viewItem ? (
          <div className="space-y-3 text-sm">
            <p className="leading-7 text-ink-soft">{viewItem.story}</p>
            <p className="font-semibold text-ink-soft">
              {formatDate(viewItem.date)} · {viewItem.city}
            </p>
          </div>
        ) : null}
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)} title="Add success story">
        <div className="space-y-3">
          <FormField label="Bride Name" htmlFor="bride">
            <input
              id="bride"
              className="field"
              value={form.brideName}
              onChange={(e) => setForm((s) => ({ ...s, brideName: e.target.value }))}
            />
          </FormField>
          <FormField label="Groom Name" htmlFor="groom">
            <input
              id="groom"
              className="field"
              value={form.groomName}
              onChange={(e) => setForm((s) => ({ ...s, groomName: e.target.value }))}
            />
          </FormField>
          <FormField label="City" htmlFor="city">
            <input
              id="city"
              className="field"
              value={form.city}
              onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
            />
          </FormField>
          <FormField label="Date" htmlFor="date">
            <input
              id="date"
              type="date"
              className="field"
              value={form.date}
              onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
            />
          </FormField>
          <FormField label="Story" htmlFor="story">
            <textarea
              id="story"
              className="field min-h-28"
              value={form.story}
              onChange={(e) => setForm((s) => ({ ...s, story: e.target.value }))}
            />
          </FormField>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setStories((prev) => [
                {
                  id: Date.now(),
                  ...form,
                  image: "/images/success/couple-01.svg",
                  date: form.date || "2026-06-01",
                },
                ...prev,
              ]);
              setOpen(false);
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
          setStories((prev) => prev.filter((story) => story.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
        title="Delete Story?"
        message="Are you sure you want to delete this success story?"
      />
    </div>
  );
}
