import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password, confirmPassword, fullName, role } = await req.json();

    // Input validation
    if (!email || !password || !confirmPassword || !fullName || !role) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match." },
        { status: 400 }
      );
    }

    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email is already in use." },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign the default role if no role is specified
    const defaultRole = role || "USER";
    const userRole = await prisma.role.findUnique({
      where: { name: defaultRole },
    });

    if (!userRole) {
      return NextResponse.json(
        { success: false, message: `Role '${defaultRole}' does not exist.` },
        { status: 400 }
      );
    }

    // Create the new user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        fullName,
        roleId: userRole.id, // Assign the role ID
        signinType: "EMAIL_PASSWORD",
      },
    });

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: userRole.name },
      process.env.JWT_SECRET as string, // Ensure you have a JWT_SECRET in your environment variables
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Set the token as a secure cookie
    const response = NextResponse.json({
      success: true,
      message: "Registration successful.",
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: userRole.name,
      },
      token
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
