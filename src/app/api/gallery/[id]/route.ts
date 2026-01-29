/**
 * Single Gallery Image API
 * ========================
 * GET, PUT, DELETE operations for individual gallery images.
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UpdateGallerySchema } from "@/types";
import { incrementGalleryStat } from "@/lib/analytics";
import { deleteFromR2 } from "@/lib/r2";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/gallery/[id] - Get single gallery image
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const image = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Gallery image not found" },
        { status: 404 }
      );
    }

    // Increment view count (fire and forget)
    incrementGalleryStat(id, "views");

    return NextResponse.json({
      success: true,
      data: image,
    });
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery image" },
      { status: 500 }
    );
  }
}

// PUT /api/gallery/[id] - Update gallery image (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validation = UpdateGallerySchema.safeParse({ ...body, id });
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

    // Check if image exists
    const existing = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Gallery image not found" },
        { status: 404 }
      );
    }

    // Update image - destructure and exclude id from update data
    const { id: _unusedId, ...updateData } = validation.data;
    void _unusedId; // Suppress unused variable warning
    const image = await prisma.galleryImage.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Gallery image updated successfully",
      data: image,
    });
  } catch (error) {
    console.error("Gallery PUT error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update gallery image" },
      { status: 500 }
    );
  }
}

// DELETE /api/gallery/[id] - Delete gallery image (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if image exists
    const image = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Gallery image not found" },
        { status: 404 }
      );
    }

    // Delete from R2 if image exists
    if (image.imageUrl) {
      await deleteFromR2(image.imageUrl);
    }

    // Delete gallery image
    await prisma.galleryImage.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.error("Gallery DELETE error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete gallery image" },
      { status: 500 }
    );
  }
}

// PATCH /api/gallery/[id] - Increment like count (public)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action } = body as { action: "like" };

    if (action !== "like") {
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 }
      );
    }

    // Check if image exists
    const image = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Gallery image not found" },
        { status: 404 }
      );
    }

    await incrementGalleryStat(id, "likes");

    return NextResponse.json({
      success: true,
      message: "Like recorded",
    });
  } catch (error) {
    console.error("Gallery PATCH error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update gallery stat" },
      { status: 500 }
    );
  }
}
