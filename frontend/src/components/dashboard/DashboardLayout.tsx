
import { Outlet } from "react-router-dom";
import type { ComponentType } from "react";
import AppSidebar from "./AppSidebar";

interface DashboardLayoutProps {
  userName?: string;
  departmentName?: string;
  navigationItems?: Array<{
    title: string;
    url: string;
    icon: ComponentType<{ className?: string }>;
  }>;
  showOrganization?: boolean;
}

export default function DashboardLayout({
  userName = "Juan Dela Cruz",
  departmentName = "Records Department",
  navigationItems,
  showOrganization,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30 lg:flex">
      <AppSidebar
        userName={userName}
        departmentName={departmentName}
        navigationItems={navigationItems}
        showOrganization={showOrganization}
      />

      <main className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
