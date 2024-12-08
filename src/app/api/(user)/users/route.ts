import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function GET(req: NextRequest) {
  try {
    // Extract token from cookies
    const token = req.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "User not authenticated. Please log in." },
        { status: 401 }
      );
    }

    // Decode the token to extract userId
    let userId: string;
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
      userId = decoded.id;
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { success: false, message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    // Fetch user with role, permissions, and preferences
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: {
          include: {
            permissions: true, // Include permissions under the role
          },
        },
        Preference: {
          include: {
            dateRange: true, // Include date range if available
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Return user details
    return NextResponse.json({
      success: true,
      message: "User data retrieved successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
