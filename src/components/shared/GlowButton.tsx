"use client";

import { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

interface GlowButtonProps {
    href?: string;
    children: ReactNode;
    className?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type?: any
    isDisabled?: boolean
}

export default function GlowButton({ href, children, className, type, isDisabled }: GlowButtonProps) {
    const InnerContent = (
        <div
            className={clsx(
                "relative inline-block rounded-md overflow-hidden group border border-white/20 bg-white/10 py-1.5 px-2 cursor-pointer",
                className
            )}
        >

            {/* Continuous animated border glow */}
            <span className="absolute -inset-1 rounded-md bg-white/20 blur-lg animate-rotateGlow pointer-events-none z-0" />

            {/* Outer Glow sweep */}
            <span className="absolute inset-0 w-full h-full translate-x-[100%] bg-gradient-to-l from-transparent via-white/30 to-transparent group-hover:translate-x-[-100%] transition-transform duration-900 ease-out" />

            <button
                disabled={isDisabled}
                className={`relative py-2.5 px-6 rounded-md  text-white font-medium cursor-pointer overflow-hidden ${className} ${isDisabled ? "bg-accent" : "btn-gradient"}`}
                type={type ? type : "button"}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

                {/* Inner glow sweep */}
                <span className="absolute inset-0 w-full h-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[100%] transition-transform duration-900 ease-out"></span>
            </button>
        </div>
    );

    // If href is provided → render Next.js Link
    return href ? (
        <Link href={href} className="inline-flex items-center justify-center no-underline align-middle">
            {InnerContent}
        </Link>
    ) : (
        InnerContent
    );
}
