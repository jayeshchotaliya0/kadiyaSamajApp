import { cn } from "@/utils/cn";

export function StatCard({
  label,
  value,
  hint,
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("surface-card p-5", className)}>
      <p className="text-sm font-semibold text-ink-soft">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
      {hint ? <p className="mt-2 text-xs text-ink-soft">{hint}</p> : null}
    </div>
  );
}
