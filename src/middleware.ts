import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected and public paths
const PUBLIC_PATHS = ["/auth/signin", "/auth/signup", "/"];
const REDIRECT_PATH = "/events";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value; // Adjust based on your token storage logic

  // Check if user is authenticated
  const isAuthenticated = !!token;

  // Redirect authenticated users away from public paths to events page
  if (isAuthenticated && PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(REDIRECT_PATH, req.url));
  }

  // Allow unauthenticated users to access public paths
  if (!isAuthenticated && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // If user is unauthenticated and tries to access the home page, redirect them to events
  if (!isAuthenticated && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(REDIRECT_PATH, req.url));
  }

  // Always allow access to /events for all users
  if (req.nextUrl.pathname.startsWith("/events")) {
    return NextResponse.next();
  }

  // Proceed as usual for all other requests
  return NextResponse.next();
}

// Define paths where middleware applies
export const config = {
  matcher: [
    "/", // Apply middleware to the home page
    "/auth/:path*", // Apply to auth routes
    "/events", // Ensure /events is always accessible
  ],
};
