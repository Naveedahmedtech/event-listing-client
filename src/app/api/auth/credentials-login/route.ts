import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Your Prisma client
import bcrypt from "bcrypt";
import { generateJwtToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if the signinType matches
    if (user.signinType !== "EMAIL_PASSWORD" && !user.passwordHash) {
      return NextResponse.json(
        {
          success: false,
          message: `This account was created using ${user.signinType}. Please sign in using ${user.signinType}.`,
        },
        { status: 403 }
      );
    }

    // Check if the account is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account is deactivated. Please contact support.",
        },
        { status: 403 }
      );
    }

    // Validate password
    const isPasswordValid =
      user.passwordHash && (await bcrypt.compare(password, user.passwordHash));
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Validate role (if specified)
    if (role && user.role.name !== role) {
      return NextResponse.json(
        { success: false, message: "Unauthorized role" },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = generateJwtToken({
      id: user.id,
      email: user.email,
      role: user.role.name, // Include role if required
    });

    // Set token in a secure cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: { email: user.email, role: user.role.name },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Sign-In Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
