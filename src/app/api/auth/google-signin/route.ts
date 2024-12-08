import { googleClient } from "@/config/google.config";
import { NextResponse } from "next/server";


export async function GET() {
  // Include the required scopes for Google OAuth, including Calendar
  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/calendar", // Access Google Calendar
      "https://www.googleapis.com/auth/userinfo.email", // Access email
      "https://www.googleapis.com/auth/userinfo.profile", // Access profile
      "openid", // OpenID Connect
    ],
    // prompt: "consent",
  });

  return NextResponse.redirect(url);
}
