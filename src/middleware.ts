import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected and public paths
const PUBLIC_PATHS = ["/auth/signin", "/auth/signup"];
const REDIRECT_PATH = "/events";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value; // Adjust based on your token storage logic

  // Check if user is authenticated
  const isAuthenticated = !!token;

  // Redirect authenticated users away from public paths (e.g., signin/signup)
  if (isAuthenticated && PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(REDIRECT_PATH, req.url));
  }

  // Ensure `/home`, `/events`, `/about` are publicly accessible for both authenticated and unauthenticated users
  if (
    ["/", "/events", "/about"].some((path) =>
      req.nextUrl.pathname.startsWith(path)
    )
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access authenticated routes (if needed)
  if (!isAuthenticated && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Proceed as usual for all other requests
  return NextResponse.next();
}

// Define paths where middleware applies
export const config = {
  matcher: [
    "/", // Home page
    "/auth/:path*", // Authentication routes
    "/events", // Events page
    "/about", // About page
    "/dashboard", // Protect dashboard route
  ],
};
