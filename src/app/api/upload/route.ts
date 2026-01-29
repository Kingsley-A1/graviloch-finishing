/**
 * Upload API
 * ==========
 * Handle file uploads to Cloudflare R2.
 * Supports direct upload and presigned URL generation.
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  uploadToR2,
  generateUniqueFilename,
  getPresignedUploadUrl,
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "@/lib/r2";

// POST /api/upload - Direct file upload (admin only)
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

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as "products" | "gallery" | "reviews" | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    if (!folder || !["products", "gallery", "reviews"].includes(folder)) {
      return NextResponse.json(
        { success: false, error: "Invalid folder. Must be: products, gallery, or reviews" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        },
        { status: 400 }
      );
    }

    // Generate unique filename
    const filename = generateUniqueFilename(file.name, folder);

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to R2
    const result = await uploadToR2(buffer, filename, file.type);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: result.url,
        filename,
        contentType: file.type,
        size: file.size,
      },
    });
  } catch (error) {
    console.error("Upload POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// GET /api/upload - Get presigned URL for client-side upload (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");
    const contentType = searchParams.get("contentType");
    const folder = searchParams.get("folder") as "products" | "gallery" | "reviews" | null;

    if (!filename || !contentType || !folder) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameters: filename, contentType, folder",
        },
        { status: 400 }
      );
    }

    if (!["products", "gallery", "reviews"].includes(folder)) {
      return NextResponse.json(
        { success: false, error: "Invalid folder. Must be: products, gallery, or reviews" },
        { status: 400 }
      );
    }

    // Validate content type
    if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid content type: ${contentType}. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(filename, folder);

    // Get presigned URL
    const result = await getPresignedUploadUrl(uniqueFilename, contentType);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        uploadUrl: result.url,
        publicUrl: `${process.env.R2_PUBLIC_URL}/${uniqueFilename}`,
        filename: uniqueFilename,
        expiresIn: 3600,
      },
    });
  } catch (error) {
    console.error("Upload GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
