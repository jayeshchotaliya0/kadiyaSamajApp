import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-bg-soft text-secondary">
        <Inbox className="h-7 w-7" />
      </div>
      <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-ink-soft">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
