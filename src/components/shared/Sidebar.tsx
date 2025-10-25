"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
import {
  Home,
  FolderKanban,
  PlusCircle,
  FileText,
  // LogOut,
} from "lucide-react";
// import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  // const session = useSession();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard/manage-projects", label: "Manage Projects", icon: FolderKanban },
    { href: "/dashboard/create-project", label: "Create Project", icon: PlusCircle },
    { href: "/dashboard/manage-blogs", label: "Manage Blogs", icon: FileText },
    { href: "/dashboard/create-blog", label: "Create Blog", icon: PlusCircle },
  ];

  return (
    <aside className="fixed flex h-screen w-64 flex-col border-r border-gray-800 bg-gray-900 text-gray-200 ">

      {/* Top section */}
      <div className="p-6 text-xl font-semibold tracking-wide text-center border-b border-gray-700 ">
        Dashboard
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 p-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 
              ${pathname === href
                ? "bg-gray-100 text-black"
                : "hover:bg-gray-800 hover:text-white"
              }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      {/* <div className="p-4 border-t border-gray-700">
        {session?.status === "authenticated" && (
          <Button
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer"
            onClick={() => {
              console.log("Logout clicked");
              signOut();
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        )}
      </div> */}
    </aside>
  );
}
