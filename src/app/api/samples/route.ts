/**
 * Samples API
 * ===========
 * Handle fetching and creating painting samples.
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { CreateSampleSchema } from "@/types";

// GET /api/samples
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const admin = searchParams.get("admin") === "true";
    const limit = parseInt(searchParams.get("limit") || "50");

    const whereClause: Record<string, unknown> = {};

    // Filter by category if provided and not "All"
    if (category && category !== "All") {
      whereClause.category = category;
    }

    // If not admin, only show available samples
    if (!admin) {
      whereClause.isAvailable = true;
    }

    const samples = await prisma.sample.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: samples,
    });
  } catch (error) {
    console.error("Fetch samples error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch samples" },
      { status: 500 }
    );
  }
}

// POST /api/samples (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate input
    const result = CreateSampleSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { title, description, category, imageUrl, isAvailable } = result.data;

    // Create in database
    const sample = await prisma.sample.create({
      data: {
        title: title,
        description: description,
        category,
        imageUrl,
        isAvailable: isAvailable ?? true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: sample,
        message: "Sample created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create sample error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create sample" },
      { status: 500 }
    );
  }
}
