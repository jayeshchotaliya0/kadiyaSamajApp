"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MasterDataProvider } from "@/contexts/MasterDataContext";
import { ToastProvider } from "@/contexts/ToastContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <MasterDataProvider>
      <ToastProvider>
        <div className="admin-shell flex min-h-screen">
          <AdminSidebar
            open={open}
            onClose={() => setOpen(false)}
            collapsed={collapsed}
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <AdminHeader
              onMenu={() => setOpen(true)}
              collapsed={collapsed}
              onToggleCollapse={() => setCollapsed((v) => !v)}
              search={search}
              onSearch={setSearch}
            />
            <div className="flex-1 p-4 sm:p-6">{children}</div>
          </div>
        </div>
      </ToastProvider>
    </MasterDataProvider>
  );
}
