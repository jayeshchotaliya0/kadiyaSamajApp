"use client";

import { Bell, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/common/SearchBar";
import { useAuth } from "@/contexts/AuthContext";

export function AdminHeader({
  onMenu,
  collapsed,
  onToggleCollapse,
  search,
  onSearch,
}: {
  onMenu: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  search: string;
  onSearch: (value: string) => void;
}) {
  const { admin, logoutAdmin } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <button type="button" className="btn-ghost px-3 py-2 lg:hidden" onClick={onMenu} aria-label="Open sidebar">
          <Menu className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="btn-ghost hidden px-3 py-2 lg:inline-flex"
          onClick={onToggleCollapse}
          aria-label="Collapse sidebar"
        >
          {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </button>

        <div className="min-w-[220px] flex-1">
          <SearchBar value={search} onChange={onSearch} placeholder="Search admin..." />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" className="btn-ghost px-3 py-2" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="btn-ghost px-3 py-2"
            aria-label="Settings"
            onClick={() => router.push("/admin/settings")}
          >
            <Settings className="h-4 w-4" />
          </button>
          <div className="hidden rounded-full border border-line px-3 py-1.5 text-sm font-semibold sm:block">
            {admin?.name ?? "Admin"}
          </div>
          <button
            type="button"
            className="btn-ghost px-3 py-2"
            onClick={() => {
              logoutAdmin();
              router.push("/admin/login");
            }}
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
