"use client";

import GlowButton from "@/components/shared/GlowButton";
import React from "react";
import { FaGoogle } from "react-icons/fa";

export default function Page() {
    const handleGoogleLogin = () => {
        // your backend google auth route
        window.location.href = "http://localhost:4000/api/auth/google";
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <span onClick={handleGoogleLogin}>
                <GlowButton className="flex items-center gap-2">
                    <FaGoogle /> <p>Sign in with Google</p>
                </GlowButton>
            </span>
        </div>
    );
}
