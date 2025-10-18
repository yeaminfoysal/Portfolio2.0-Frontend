"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Blogs", path: "/blogs" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50">
            <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo / Name */}
                <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    Yeamin<span className="text-gray-800 dark:text-gray-100">Foysal</span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex space-x-8">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.path}
                                className={`text-lg font-medium transition-colors ${pathname === link.path
                                        ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 pb-1"
                                        : "text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    <ModeToggle />
                </ul>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-2xl text-gray-800 dark:text-gray-200"
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-col items-center py-4 space-y-4">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-medium ${pathname === link.path
                                            ? "text-indigo-600 dark:text-indigo-400"
                                            : "text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
