/**
 * Analytics API
 * =============
 * Track events and retrieve analytics data.
 * POST for tracking (public), GET for dashboard (admin).
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TrackEventSchema } from "@/types";
import {
  trackEvent,
  getClientInfo,
  getAnalyticsSummary,
  getProductAnalytics,
  getConversionMetrics,
} from "@/lib/analytics";

// POST /api/analytics - Track event (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = TrackEventSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Invalid event data" },
        { status: 400 }
      );
    }

    const { event, page, productId, metadata } = validation.data;

    // Get client info
    const clientInfo = getClientInfo(request);

    // Track the event
    await trackEvent(event, page, {
      productId,
      metadata,
      ...clientInfo,
    });

    return NextResponse.json({
      success: true,
      message: "Event tracked",
    });
  } catch (error) {
    console.error("Analytics POST error:", error);
    // Don't return error to client - analytics shouldn't break the app
    return NextResponse.json({ success: true });
  }
}

// GET /api/analytics - Get analytics dashboard data (admin only)
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
    const days = Math.min(90, Math.max(1, parseInt(searchParams.get("days") || "30")));
    const type = searchParams.get("type") || "summary";
    const productId = searchParams.get("productId");

    let data;

    switch (type) {
      case "summary":
        data = await getAnalyticsSummary(days);
        break;

      case "products":
        data = await getProductAnalytics(productId || undefined);
        break;

      case "conversions":
        data = await getConversionMetrics(days);
        break;

      default:
        data = await getAnalyticsSummary(days);
    }

    return NextResponse.json({
      success: true,
      data,
      meta: {
        type,
        days,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Analytics GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
