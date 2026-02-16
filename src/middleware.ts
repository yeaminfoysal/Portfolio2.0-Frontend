import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  console.log("hi i am middleware.ts")
  console.log("🔍 Middleware triggered for:", pathname);
  console.log("🍪 Token:", token ? "EXISTS" : "NOT FOUND");

  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // ✅ User logged in না থাকলে এবং protected route access করতে চাইলে
  if (!token && isProtectedRoute) {
    // console.log("❌ Redirecting to login - No token");
    // return NextResponse.redirect(new URL("/login", request.url)); // ✅ Clean redirect
  }

  // ✅ User logged in থাকলে login/signup page এ যেতে দেবে না
  if (token && isPublicRoute) {
    console.log("✅ Redirecting to dashboard - Has token");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  console.log("✅ Allowing access to:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};