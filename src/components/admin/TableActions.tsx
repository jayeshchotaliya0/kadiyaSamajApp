"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";

function ActionButton({
  label,
  onClick,
  tone = "default",
  children,
}: {
  label: string;
  onClick: () => void;
  tone?: "default" | "danger";
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md border border-line bg-white text-ink-soft transition hover:border-secondary/25 hover:bg-bg-soft hover:text-secondary",
        tone === "danger" &&
          "hover:border-danger/25 hover:bg-danger/5 hover:text-danger",
      )}
    >
      {children}
    </button>
  );
}

export function TableActions({
  onView,
  onEdit,
  onDelete,
  viewLabel = "View Profile",
  editLabel = "Edit Profile",
  deleteLabel = "Delete Profile",
}: {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  viewLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
}) {
  return (
    <div className="inline-flex items-center gap-1 whitespace-nowrap">
      {onView ? (
        <ActionButton label={viewLabel} onClick={onView}>
          <Eye className="h-3.5 w-3.5" />
        </ActionButton>
      ) : null}
      {onEdit ? (
        <ActionButton label={editLabel} onClick={onEdit}>
          <Pencil className="h-3.5 w-3.5" />
        </ActionButton>
      ) : null}
      {onDelete ? (
        <ActionButton label={deleteLabel} onClick={onDelete} tone="danger">
          <Trash2 className="h-3.5 w-3.5" />
        </ActionButton>
      ) : null}
    </div>
  );
}
