"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { ModeToggle } from "./mode-toggle";
import GlowButton from "./GlowButton";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Blogs", path: "/blogs" },
        // { name: "Dashboard", path: "/dashboard" },
    ];

    const router = useRouter();

    const handleNavigate = () => {
        router.push("/login");
    };

    return (
        <>
            <nav className="hidden lg:block fixed top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5xl xl:w-7xl  rounded-full bg-[#a722ca]/10 dark:bg-[#a722ca]/10 backdrop-blur-lg border border-[#a722ca]/20 z-50">
                <div className="max-w-6xl mx-auto px-6 py-1 flex justify-between items-center">
                    {/* Logo / Name */}
                    <Link href="/" className="text-3xl font-bold main-txt ">
                        Yeamin<span className="text-gray-800 dark:text-gray-100">Foysal</span>
                    </Link>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex space-x-8 items-center">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    className={`text-lg font-medium transition-colors ${
                                        pathname === link.path
                                            ? " main-txt border-b-2 border-[#a722ca] pb-1"
                                            : "text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <ModeToggle />
                        <Button onClick={handleNavigate} variant="outline" size="icon">
                            <LogIn className="h-[1.2rem] w-[1.2rem]" />
                        </Button>

                        <GlowButton>Resume</GlowButton>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-2xl text-gray-800 dark:text-gray-200"
                    >
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </nav>

            {/* Mobile/Tablet Navbar */}
            <nav className="lg:hidden fixed top-0 left-0 right-0 bg-[#a722ca]/10 dark:bg-[#a722ca]/10 backdrop-blur-lg border-b border-[#a722ca]/20 z-50">
                <div className="px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold main-txt">
                        Yeamin<span className="text-gray-800 dark:text-gray-100">Foysal</span>
                    </Link>

                    {/* Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-3xl text-gray-800 dark:text-gray-200 z-50"
                    >
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </nav>

            {/* Overlay */}
            <div
                className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Menu from Right */}
            <div
                className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full pt-20 px-6">
                    {/* Menu Links */}
                    <ul className="flex flex-col space-y-6">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-xl font-medium block py-2 transition-colors ${
                                        pathname === link.path
                                            ? "main-txt border-l-4 border-[#a722ca] pl-4"
                                            : "text-gray-700 dark:text-gray-300 hover:text-[#a722ca] dark:hover:text-[#a722ca] pl-4"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Bottom Actions */}
                    <div className="mt-auto mb-8 space-y-4">
                        <div className="flex items-center justify-between px-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                            <ModeToggle />
                        </div>
                        
                        <Button
                            onClick={() => {
                                handleNavigate();
                                setIsOpen(false);
                            }}
                            variant="outline"
                            className="w-full"
                        >
                            <LogIn className="h-4 w-4 mr-2" />
                            Login
                        </Button>

                        <div className="w-full">
                            <GlowButton>Resume</GlowButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;