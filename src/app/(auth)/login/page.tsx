"use client";

import GlowButton from "@/components/shared/GlowButton";
import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

export default function Page() {
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
    };

    // Test for checking set coockie
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/check`, {
                    credentials: 'include'
                });
                const data = await response.json();
                console.log('Auth status:', data);
            } catch (error) {
                console.error('Auth check failed:', error);
            }
        };
        checkAuth();
    }, []);

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