/**
 * Gallery API
 * ===========
 * GET all gallery images with filtering and pagination.
 * POST new gallery image (admin only).
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CreateGallerySchema, type GalleryFilters, type GallerySortOption } from "@/types";

// GET /api/gallery - Get all gallery images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const category = searchParams.get("category") as GalleryFilters["category"];
    const search = searchParams.get("search");
    const sort = (searchParams.get("sort") || "newest") as GallerySortOption;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    // Build orderBy clause
    let orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" };

    switch (sort) {
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "most-viewed":
        orderBy = { views: "desc" };
        break;
      case "most-liked":
        orderBy = { likes: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    // Execute queries
    const [images, total] = await Promise.all([
      prisma.galleryImage.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.galleryImage.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: images,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

// POST /api/gallery - Create new gallery image (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate input
    const validation = CreateGallerySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Create gallery image
    const image = await prisma.galleryImage.create({
      data: validation.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Gallery image added successfully",
        data: image,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gallery POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add gallery image" },
      { status: 500 }
    );
  }
}
