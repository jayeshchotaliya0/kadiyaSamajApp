import { cn } from "@/utils/cn";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-gradient-to-r from-line via-bg to-line",
        className,
      )}
    />
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="surface-card overflow-hidden">
      <LoadingSkeleton className="aspect-[4/5] rounded-none" />
      <div className="space-y-3 p-4">
        <LoadingSkeleton className="h-5 w-2/3" />
        <LoadingSkeleton className="h-4 w-1/2" />
        <LoadingSkeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
