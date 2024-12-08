import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear the auth token cookie
    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    // Clear cookie settings
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // Expire immediately
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during logout.",
      },
      { status: 500 }
    );
  }
}
