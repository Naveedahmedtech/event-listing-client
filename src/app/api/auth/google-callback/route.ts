import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Assuming you're using Prisma for database
import { generateJwtToken } from "@/lib/jwt";
import { googleClient } from "@/config/google.config";

// ! check for access denied
// ! on error redirect to error page

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  if (error) {
    return NextResponse.redirect(
      new URL(`/auth/error?reason=${error}`, req.url)
    );
  }
  if (!code) {
    return NextResponse.json(
      { error: "Authorization code not found" },
      { status: 400 }
    );
  }

  try {
    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json({ error: "Invalid ID token" }, { status: 400 });
    }

    const { email, name, picture } = payload;

    // Step 1: Find Default Role
    const defaultRole = await prisma.role.findUnique({
      where: { name: "USER" },
    });

    if (!defaultRole) {
      return NextResponse.json(
        { error: "Default role not found. Please contact support." },
        { status: 500 }
      );
    }

    // Step 2: Create or Update User in the Database
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user && email) {
      user = await prisma.user.create({
        data: {
          email,
          fullName: name,
          profilePicture: picture,
          roleId: defaultRole.id, // Assign the default role ID
          signinType: "GOOGLE_OAUTH",
        },
      });
    }

    // Step 3: Generate a Session or Token
    const token = generateJwtToken(user);

    // Set cookies if required (for session-based apps)
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google Callback Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
