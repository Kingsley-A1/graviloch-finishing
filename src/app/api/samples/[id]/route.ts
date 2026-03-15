/**
 * Sample details API
 * ==================
 * Handle individual sample operations (get, update, delete).
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { UpdateSampleSchema } from "@/types";
import { deleteFromR2 } from "@/lib/r2";

// GET /api/samples/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const sample = await prisma.sample.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!sample) {
      return NextResponse.json(
        { success: false, error: "Sample not found" },
        { status: 404 }
      );
    }

    // Optional: increment views here if required later
    // For now purely returning the item
    return NextResponse.json({
      success: true,
      data: sample,
    });
  } catch (error) {
    console.error("Fetch sample details error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sample" },
      { status: 500 }
    );
  }
}

// PUT /api/samples/[id] (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // The frontend sends data with 'id' in it. Let's make sure it matches the URL
    const validatedBody = { ...body, id: resolvedParams.id };

    const result = UpdateSampleSchema.safeParse(validatedBody);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const dataToUpdate = { ...result.data };
    
    // We don't want to update the id
    // TypeScript/Zod makes this safe, but we forcefully remove it
    // from the update payload to satisfy Prisma.
    const updatedSample = await prisma.sample.update({
      where: { id: resolvedParams.id },
      data: dataToUpdate,
    });

    return NextResponse.json({
      success: true,
      data: updatedSample,
    });
  } catch (error) {
    console.error("Update sample error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update sample" },
      { status: 500 }
    );
  }
}

// DELETE /api/samples/[id] (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find the item first to get image URL
    const sample = await prisma.sample.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!sample) {
      return NextResponse.json(
        { success: false, error: "Sample not found" },
        { status: 404 }
      );
    }

    // Try to delete from Cloudflare R2 if it's an R2 URL
    if (sample.imageUrl && sample.imageUrl.includes("cloudflarestorage.com")) {
      try {
        await deleteFromR2(sample.imageUrl);
      } catch (err) {
        console.error("Failed to delete image from R2:", err);
        // Continue with database deletion even if R2 fails
      }
    } else if (sample.imageUrl && sample.imageUrl.includes("r2.dev")) {
      try {
        await deleteFromR2(sample.imageUrl);
      } catch (err) {
        console.error("Failed to delete image from R2:", err);
      }
    }

    // Delete from DB
    await prisma.sample.delete({
      where: { id: resolvedParams.id },
    });

    return NextResponse.json({
      success: true,
      message: "Sample deleted successfully",
    });
  } catch (error) {
    console.error("Delete sample error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete sample" },
      { status: 500 }
    );
  }
}
