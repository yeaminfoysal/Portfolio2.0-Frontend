"use client";

import { useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header with Hamburger */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-4 border-b border-gray-800 bg-gray-900 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-200 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-200">Dashboard</h1>
        </header>

        {/* Scrollable content */}
        <main className="min-h-screen overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}