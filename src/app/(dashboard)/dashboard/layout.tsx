import Sidebar from "@/components/shared/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Scrollable main content area */}
      <div className="ml-64 flex-1 min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
