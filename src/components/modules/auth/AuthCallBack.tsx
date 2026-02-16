"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        try {
            const accessToken = searchParams.get("accessToken");
            const refreshToken = searchParams.get("refreshToken");

            if (accessToken && refreshToken) {
                // Set cookies
                Cookies.set("accessToken", accessToken, {
                    expires: 7,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                });

                Cookies.set("refreshToken", refreshToken, {
                    expires: 30,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                });

                // Redirect to dashboard
                router.replace("/dashboard");
            } else {
                // Handle error
                router.replace("/not-permited");
            }
        } catch (error) {
            console.error("Auth callback error:", error);
            router.replace("/not-permited");
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