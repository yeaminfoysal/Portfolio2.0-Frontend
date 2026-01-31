"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderKanban,
  PlusCircle,
  FileText,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard/manage-projects", label: "Manage Projects", icon: FolderKanban },
    { href: "/dashboard/create-project", label: "Create Project", icon: PlusCircle },
    { href: "/dashboard/manage-blogs", label: "Manage Blogs", icon: FileText },
    { href: "/dashboard/create-blog", label: "Create Blog", icon: PlusCircle },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-gray-800 bg-gray-900 text-gray-200 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top section */}
        <div className="p-6 text-xl font-semibold tracking-wide text-center border-b border-gray-700 flex items-center justify-between">
          <span>Dashboard</span>
          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose} // Close sidebar on mobile after clicking
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 
                ${
                  pathname === href
                    ? "bg-gray-100 text-black"
                    : "hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}