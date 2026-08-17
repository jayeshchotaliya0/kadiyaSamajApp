"use client";

import { ConfirmDialog } from "@/components/common/ConfirmDialog";

export function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Delete Profile?",
  message = "Are you sure you want to delete this profile?",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}) {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      message={message}
      confirmLabel="Delete"
      tone="danger"
    />
  );
}
