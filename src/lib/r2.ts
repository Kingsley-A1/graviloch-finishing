/**
 * Cloudflare R2 Storage Client
 * ============================
 * Handles image uploads for products and gallery.
 * Uses AWS S3-compatible API.
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize S3 client for R2
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || "graviloch-media";
const PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

/**
 * Supported image types for upload
 */
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

/**
 * Maximum file size (10MB)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Generate a unique filename for uploads
 */
export function generateUniqueFilename(
  originalName: string,
  folder: "products" | "gallery" | "reviews"
): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop()?.toLowerCase() || "webp";
  return `${folder}/${timestamp}-${randomStr}.${extension}`;
}

/**
 * Upload an image to R2
 */
export async function uploadToR2(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
      return {
        success: false,
        error: `Invalid file type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
      };
    }

    // Validate file size
    if (file.length > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      };
    }

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: file,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    });

    await r2Client.send(command);

    const url = `${PUBLIC_URL}/${filename}`;

    return { success: true, url };
  } catch (error) {
    console.error("R2 upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Delete an image from R2
 */
export async function deleteFromR2(
  filename: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract key from full URL if needed
    const key = filename.replace(PUBLIC_URL + "/", "");

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);

    return { success: true };
  } catch (error) {
    console.error("R2 delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

/**
 * Generate a presigned URL for direct client uploads
 */
export async function getPresignedUploadUrl(
  filename: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (!ALLOWED_IMAGE_TYPES.includes(contentType)) {
      return {
        success: false,
        error: `Invalid file type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
      };
    }

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      ContentType: contentType,
    });

    const url = await getSignedUrl(r2Client, command, { expiresIn });

    return { success: true, url };
  } catch (error) {
    console.error("Presigned URL error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate URL",
    };
  }
}

/**
 * Get a presigned URL for reading a private object
 */
export async function getPresignedReadUrl(
  filename: string,
  expiresIn: number = 3600
): Promise<string | null> {
  try {
    const key = filename.replace(PUBLIC_URL + "/", "");

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    return await getSignedUrl(r2Client, command, { expiresIn });
  } catch (error) {
    console.error("Presigned read URL error:", error);
    return null;
  }
}

export { r2Client, BUCKET_NAME, PUBLIC_URL };
