import { NextResponse } from "next/server";

export async function POST() {
  try {

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
