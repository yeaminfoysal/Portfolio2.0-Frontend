"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");

        if (accessToken && refreshToken) {
            // Set cookies
            Cookies.set("accessToken", accessToken, {
                expires: 7, // 7 days
                secure: true,
                sameSite: "strict",
            });

            Cookies.set("refreshToken", refreshToken, {
                expires: 30, // 30 days
                secure: true,
                sameSite: "strict",
            });

            // Redirect to dashboard or home
            router.push("/dashboard");
        } else {
            // Handle error - no tokens received
            router.push("/not-permited");
        }
    }, [searchParams, router]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Authenticating...</p>
        </div>
    );
}

export default function AuthCallback() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading...</p>
            </div>
        }>
            <AuthCallbackContent />
        </Suspense>
    );
}