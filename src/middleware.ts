import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protect specific routes
export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  console.log("token : ",token)

  const { pathname } = request.nextUrl;

  // If user is not logged in and trying to access dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and tries to go to login/signup, redirect them away
  if (token && (pathname === "/login" || pathname === "/signup")) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
