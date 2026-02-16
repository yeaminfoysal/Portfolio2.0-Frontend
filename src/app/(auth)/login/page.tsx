"use client";

import GlowButton from "@/components/shared/GlowButton";
import { FaGoogle } from "react-icons/fa";

export default function Page() {
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
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