/**
 * Single Product API
 * ==================
 * GET, PUT, DELETE operations for individual products.
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UpdateProductSchema } from "@/types";
import { incrementProductStat } from "@/lib/analytics";
import { deleteFromR2 } from "@/lib/r2";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/products/[id] - Get single product
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    // Increment view count (fire and forget)
    incrementProductStat(id, "views");

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Product GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

// PUT /api/products/[id] - Update product (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validation = UpdateProductSchema.safeParse({ ...body, id });
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    // Update product - eslint-disable-next-line to ignore unused id variable
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _extractedId, ...updateData } = validation.data;
    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Product PUT error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 },
    );
  }
}

// DELETE /api/products/[id] - Delete product (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    // Delete from R2 if image exists
    if (product.imageUrl) {
      await deleteFromR2(product.imageUrl);
    }

    // Delete product
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Product DELETE error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

// PATCH /api/products/[id] - Increment stats (public)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action } = body as { action: "like" | "share" | "contact" };

    if (!["like", "share", "contact"].includes(action)) {
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 },
      );
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    // Map action to stat field
    const statMap: Record<string, "likes" | "shares" | "contacts"> = {
      like: "likes",
      share: "shares",
      contact: "contacts",
    };

    await incrementProductStat(id, statMap[action]);

    return NextResponse.json({
      success: true,
      message: `Product ${action} recorded`,
    });
  } catch (error) {
    console.error("Product PATCH error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product stat" },
      { status: 500 },
    );
  }
}
