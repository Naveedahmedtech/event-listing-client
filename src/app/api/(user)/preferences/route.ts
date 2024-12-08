import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
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
    } catch (err: any) {
      console.log(err);
      return NextResponse.json(
        { success: false, message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    const { locations, categories, dateRange, includeFree } = await req.json();

    // Validate required fields
    if (!locations?.length || !categories?.length) {
      return NextResponse.json(
        { success: false, message: "Locations and categories are required." },
        { status: 400 }
      );
    }

    // Verify the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    let dateRangeId: string | null = null;

    // Handle DateRange creation if dateRange is provided
    if (dateRange?.startDate && dateRange?.endDate) {
      const existingDateRange = await prisma.dateRange.findFirst({
        where: {
          startDate: new Date(dateRange.startDate),
          endDate: new Date(dateRange.endDate),
        },
      });

      if (existingDateRange) {
        dateRangeId = existingDateRange.id;
      } else {
        const newDateRange = await prisma.dateRange.create({
          data: {
            startDate: new Date(dateRange.startDate),
            endDate: new Date(dateRange.endDate),
          },
        });
        dateRangeId = newDateRange.id;
      }
    }

    // Upsert the Preference record
    const preference = await prisma.preference.upsert({
      where: { userId }, // Assuming userId is unique for Preference
      update: {
        locations,
        categories,
        dateRangeId,
        includeFree: includeFree || false,
      },
      create: {
        userId,
        locations,
        categories,
        dateRangeId,
        includeFree: includeFree || false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Preferences saved successfully.",
      data: preference,
    });
  } catch (error) {
    console.error("Error saving preferences:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
