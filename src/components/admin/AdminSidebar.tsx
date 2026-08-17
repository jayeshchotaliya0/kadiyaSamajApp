"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Baby,
  BookOpen,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  Code2,
  GitBranch,
  GraduationCap,
  HardHat,
  Heart,
  Languages,
  Layers,
  LayoutDashboard,
  Map,
  MapPin,
  Settings,
  Sparkles,
  Stethoscope,
  Tags,
  User,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { ADMIN_NAV, BRAND } from "@/constants/brand";
import { cn } from "@/utils/cn";

const icons = {
  LayoutDashboard,
  User,
  UserRound,
  Baby,
  Briefcase,
  Stethoscope,
  HardHat,
  Code2,
  BriefcaseBusiness,
  MapPin,
  Map,
  Building2,
  Tags,
  GitBranch,
  UsersRound,
  GraduationCap,
  BookOpen,
  Layers,
  Heart,
  Languages,
  Sparkles,
  Settings,
} as const;

export function AdminSidebar({
  open,
  onClose,
  collapsed,
}: {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink/40 lg:hidden",
          open ? "block" : "hidden",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-line bg-[#102926] text-white transition-all duration-300 lg:sticky lg:top-0 lg:h-screen",
          collapsed ? "lg:w-20" : "lg:w-72",
          open ? "w-72 translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <div className={cn("min-w-0", collapsed && "lg:hidden")}>
            <p className="font-display text-lg font-bold">{BRAND.name}</p>
            <p className="text-xs text-white/60">Admin Panel</p>
          </div>
          {collapsed ? (
            <span className="hidden rounded-xl bg-white/10 px-2 py-1 text-xs font-bold lg:inline">
              {BRAND.shortName}
            </span>
          ) : null}
          <button
            type="button"
            className="rounded-full p-2 hover:bg-white/10 lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
          {ADMIN_NAV.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition",
                  active ? "bg-white text-[#102926]" : "text-white/75 hover:bg-white/10 hover:text-white",
                  collapsed && "lg:justify-center lg:px-2",
                )}
                title={item.label}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className={cn(collapsed && "lg:hidden")}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
