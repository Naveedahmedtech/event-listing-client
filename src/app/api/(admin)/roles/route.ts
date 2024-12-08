import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Import your Prisma client

export async function POST(req:NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const { name } = body;
    if (!name) {
      return NextResponse.json({ error: "Role name is required" }, { status: 400 });
    }

    // Create new role
    const role = await prisma.role.create({
      data: { name: name.toUpperCase() },
    });

    return NextResponse.json({ role }, { status: 201 });
  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
