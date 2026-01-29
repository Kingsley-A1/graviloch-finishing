/**
 * Reviews API
 * ===========
 * GET approved reviews (public).
 * GET all reviews (admin).
 * POST new review (public).
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CreateReviewSchema } from "@/types";
import { sendReviewNotification } from "@/lib/email";
import { trackEvent } from "@/lib/analytics";

// GET /api/reviews - Get reviews
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const session = await getServerSession(authOptions);

    // Parse query parameters
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const all = searchParams.get("all") === "true"; // Admin: get all reviews

    // Build where clause
    const where: Record<string, unknown> = {};

    // Only show approved reviews to public
    if (!session || !session.user || !all) {
      where.approved = true;
    }

    // Execute queries
    const [reviews, total, stats] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          rating: true,
          message: true,
          approved: session ? true : false, // Only show approval status to admin
          createdAt: true,
        },
      }),
      prisma.review.count({ where }),
      // Get rating stats (only approved reviews)
      prisma.review.aggregate({
        where: { approved: true },
        _avg: { rating: true },
        _count: { rating: true },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: reviews,
      stats: {
        averageRating: Math.round((stats._avg.rating || 0) * 10) / 10,
        totalReviews: stats._count.rating,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Submit new review (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = CreateReviewSchema.safeParse(body);
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

    const { name, email, rating, message } = validation.data;

    // Create review (pending approval)
    const review = await prisma.review.create({
      data: {
        name,
        email: email || null,
        rating,
        message,
        approved: false, // Requires admin approval
      },
    });

    // Track analytics event
    trackEvent("review_submit", "/testimonials", {
      metadata: { rating },
    });

    // Send notification to admin (fire and forget)
    sendReviewNotification({
      reviewerName: name,
      rating,
      message,
      reviewId: review.id,
    }).catch((err) => console.error("Failed to send review notification:", err));

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your review! It will be published after moderation.",
        data: {
          id: review.id,
          name: review.name,
          rating: review.rating,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Reviews POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
