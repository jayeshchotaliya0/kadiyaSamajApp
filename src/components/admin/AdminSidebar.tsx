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

function isNavItemActive(pathname: string, href: string) {
  if (href === "/admin/dashboard") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getActiveHref(pathname: string) {
  const matches = ADMIN_NAV.filter((item) => isNavItemActive(pathname, item.href));
  if (matches.length === 0) return null;
  return matches.sort((a, b) => b.href.length - a.href.length)[0].href;
}

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
  const activeHref = getActiveHref(pathname);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink/40 backdrop-blur-[1px] lg:hidden",
          open ? "block" : "hidden",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "admin-sidebar fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/8 transition-all duration-300 lg:sticky lg:top-0 lg:h-screen",
          collapsed ? "lg:w-20" : "lg:w-72",
          open ? "w-72 translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-4">
          <div className={cn("min-w-0", collapsed && "lg:hidden")}>
            <p className="font-display text-lg font-bold text-white">{BRAND.name}</p>
            <p className="text-xs text-white/55">Admin Panel</p>
          </div>
          {collapsed ? (
            <span className="hidden rounded-xl bg-white/10 px-2 py-1 text-xs font-bold text-white lg:inline">
              {BRAND.shortName}
            </span>
          ) : null}
          <button
            type="button"
            className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="admin-sidebar-nav flex-1 space-y-1 overflow-y-auto overflow-x-hidden p-3">
          {ADMIN_NAV.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            const active = item.href === activeHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "admin-sidebar-link-active bg-white/14 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "text-[#D5E0DD] hover:bg-white/8 hover:text-white",
                  collapsed && "lg:justify-center lg:px-2",
                )}
                title={item.label}
                aria-current={active ? "page" : undefined}
              >
                {active ? (
                  <span
                    aria-hidden
                    className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-accent"
                  />
                ) : null}
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors duration-200",
                    active
                      ? "text-accent"
                      : "text-white/55 group-hover:text-white/85",
                  )}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span
                  className={cn(
                    "min-w-0 truncate leading-snug",
                    collapsed && "lg:hidden",
                    active && "font-semibold",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
