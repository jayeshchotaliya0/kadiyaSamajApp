"use client";

export function FilterFooter({
  onReset,
  onApply,
}: {
  onReset: () => void;
  onApply: () => void;
}) {
  return (
    <div className="flex gap-3 border-t border-line bg-surface p-4">
      <button
        type="button"
        className="btn-ghost flex-1 justify-center py-2.5 text-sm"
        onClick={onReset}
      >
        Reset
      </button>
      <button
        type="button"
        className="btn-secondary flex-1 justify-center py-2.5 text-sm"
        onClick={onApply}
      >
        Apply Filters
      </button>
    </div>
  );
}
