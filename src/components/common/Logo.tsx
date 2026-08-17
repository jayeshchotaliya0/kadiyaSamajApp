import Link from "next/link";
import { BRAND } from "@/constants/brand";
import { cn } from "@/utils/cn";

export function Logo({
  href = "/",
  className,
  light = false,
}: {
  href?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid h-11 w-11 place-items-center rounded-2xl font-display text-sm font-bold tracking-wide text-white shadow-sm",
          light
            ? "bg-white/15 ring-1 ring-white/30"
            : "bg-gradient-to-br from-secondary to-secondary-soft",
        )}
        aria-hidden
      >
        {BRAND.shortName}
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-lg font-bold",
            light ? "text-white" : "text-ink",
          )}
        >
          {BRAND.name}
        </span>
        <span
          className={cn(
            "block text-xs",
            light ? "text-white/75" : "text-ink-soft",
          )}
        >
          Community Matrimony
        </span>
      </span>
    </Link>
  );
}
