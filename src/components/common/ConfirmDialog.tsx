"use client";

import { Modal } from "@/components/common/Modal";

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  tone = "danger",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  tone?: "danger" | "primary" | "secondary";
}) {
  const toneClass =
    tone === "danger"
      ? "bg-danger"
      : tone === "secondary"
        ? "bg-secondary"
        : "bg-primary";

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-ink-soft">{message}</p>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button type="button" className="btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button
          type="button"
          className={`inline-flex items-center rounded-full px-5 py-2.5 font-semibold text-white ${toneClass}`}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
