/**
 * Analytics Helpers
 * =================
 * Track user interactions, page views, and engagement metrics.
 * Privacy-focused with hashed identifiers.
 */

import prisma from "./prisma";
import { type NextRequest } from "next/server";
import crypto from "crypto";

type GroupByEventCount = { event: string; _count: { event: number } };
type GroupByPageCount = { page: string; _count: { page: number } };
type GroupByProductIdCount = {
  productId: string | null;
  _count: { productId: number };
};
type DailyView = { date: string; count: bigint };

/**
 * Analytics event types
 */
export type AnalyticsEvent =
  | "page_view"
  | "product_view"
  | "product_like"
  | "product_share"
  | "product_contact"
  | "gallery_view"
  | "gallery_like"
  | "gallery_share"
  | "review_submit"
  | "contact_form"
  | "whatsapp_click"
  | "store_visit"
  | "first_visit";

/**
 * Hash IP for privacy
 */
function hashIP(ip: string): string {
  const salt = process.env.NEXTAUTH_SECRET || "graviloch-salt";
  return crypto
    .createHash("sha256")
    .update(ip + salt)
    .digest("hex")
    .slice(0, 16);
}

/**
 * Extract client info from request
 */
export function getClientInfo(request: NextRequest): {
  userAgent: string;
  ipHash: string;
} {
  const userAgent = request.headers.get("user-agent") || "Unknown";
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0] || realIP || "Unknown";

  return {
    userAgent,
    ipHash: hashIP(ip),
  };
}

/**
 * Track an analytics event
 */
export async function trackEvent(
  event: AnalyticsEvent,
  page: string,
  options?: {
    productId?: string;
    metadata?: Record<string, unknown>;
    userAgent?: string;
    ipHash?: string;
  },
): Promise<void> {
  try {
    await prisma.analytics.create({
      data: {
        event,
        page,
        productId: options?.productId,
        metadata: options?.metadata ? JSON.stringify(options.metadata) : null,
        userAgent: options?.userAgent,
        ipHash: options?.ipHash,
      },
    });
  } catch (error) {
    // Log but don't throw - analytics shouldn't break the app
    console.error("Analytics tracking error:", error);
  }
}

/**
 * Get analytics summary for dashboard
 */
export async function getAnalyticsSummary(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  try {
    const [
      totalViews,
      uniqueVisitors,
      eventBreakdown,
      topPages,
      dailyViews,
      totalProducts,
      totalGalleryImages,
      totalReviews,
      pendingReviews,
      totalSamples,
    ] = await Promise.all([
      // Total page views
      prisma.analytics.count({
        where: { event: "page_view", createdAt: { gte: startDate } },
      }),
      // Unique visitors (by IP hash)
      prisma.analytics.groupBy({
        by: ["ipHash"],
        where: {
          event: "page_view",
          createdAt: { gte: startDate },
          ipHash: { not: null },
        },
      }),
      // Events breakdown
      prisma.analytics.groupBy({
        by: ["event"],
        where: { createdAt: { gte: startDate } },
        _count: { event: true },
      }),
      // Top pages
      prisma.analytics.groupBy({
        by: ["page"],
        where: { event: "page_view", createdAt: { gte: startDate } },
        _count: { page: true },
        orderBy: { _count: { page: "desc" } },
        take: 10,
      }),
      // Daily views
      prisma.$queryRaw<Array<DailyView>>`
        SELECT DATE("createdAt") as date, COUNT(*) as count
        FROM "Analytics"
        WHERE event = 'page_view' AND "createdAt" >= ${startDate}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
      `,
      // Entity counts for dashboard cards
      prisma.product.count(),
      prisma.galleryImage.count(),
      prisma.review.count(),
      prisma.review.count({ where: { approved: false } }),
      // Samples count
      prisma.sample.count(),
    ]);

    return {
      totalViews,
      uniqueVisitors: uniqueVisitors.length,
      totalProducts,
      totalGalleryImages,
      totalReviews,
      pendingReviews,
      totalSamples,
      eventBreakdown: eventBreakdown.map((e: GroupByEventCount) => ({
        event: e.event,
        count: e._count.event,
      })),
      topPages: topPages.map((p: GroupByPageCount) => ({
        page: p.page,
        views: p._count.page,
      })),
      dailyViews: dailyViews.map((d: DailyView) => ({
        date: d.date,
        count: Number(d.count),
      })),
    };
  } catch (error) {
    console.error("Analytics summary error:", error);
    throw error;
  }
}

/**
 * Get recent activity events for the dashboard feed
 */
export async function getRecentEvents(limit: number = 8) {
  try {
    const events = await prisma.analytics.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        event: true,
        page: true,
        productId: true,
        createdAt: true,
      },
    });

    // Resolve product names for product events
    const productIds = [
      ...new Set(events.map((e) => e.productId).filter(Boolean) as string[]),
    ];
    const products =
      productIds.length > 0
        ? await prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true },
          })
        : [];
    const productMap = new Map(products.map((p) => [p.id, p.name]));

    const eventLabels: Record<string, string> = {
      page_view: "Page visited",
      product_view: "Product viewed",
      product_like: "Product liked",
      product_share: "Product shared",
      product_contact: "Product enquiry",
      gallery_view: "Gallery viewed",
      gallery_like: "Gallery image liked",
      gallery_share: "Gallery image shared",
      review_submit: "New review submitted",
      contact_form: "New contact enquiry",
      whatsapp_click: "WhatsApp contact",
      store_visit: "Store location viewed",
      first_visit: "First-time visitor",
    };

    const typeMap: Record<string, string> = {
      page_view: "page",
      product_view: "product",
      product_like: "product",
      product_share: "product",
      product_contact: "contact",
      gallery_view: "gallery",
      gallery_like: "gallery",
      gallery_share: "gallery",
      review_submit: "review",
      contact_form: "contact",
      whatsapp_click: "contact",
      store_visit: "page",
      first_visit: "page",
    };

    return events.map((e) => {
      const productName = e.productId ? productMap.get(e.productId) : null;
      const label = eventLabels[e.event] || e.event.replace(/_/g, " ");
      const message = productName ? `${label}: ${productName}` : label;
      const now = new Date();
      const diff = now.getTime() - new Date(e.createdAt).getTime();
      const mins = Math.floor(diff / 60000);
      const hrs = Math.floor(mins / 60);
      const days = Math.floor(hrs / 24);
      const time =
        days > 0
          ? `${days}d ago`
          : hrs > 0
            ? `${hrs}h ago`
            : mins > 0
              ? `${mins}m ago`
              : "Just now";

      return {
        id: e.id,
        type: typeMap[e.event] || "page",
        message,
        time,
      };
    });
  } catch (error) {
    console.error("Recent events error:", error);
    return [];
  }
}

/**
 * Get product analytics
 */
export async function getProductAnalytics(productId?: string) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  try {
    if (productId) {
      // Single product analytics
      const events = await prisma.analytics.groupBy({
        by: ["event"],
        where: {
          productId,
          createdAt: { gte: startDate },
        },
        _count: { event: true },
      });

      return events.reduce(
        (acc: Record<string, number>, e: GroupByEventCount) => {
          acc[e.event] = e._count.event;
          return acc;
        },
        {} as Record<string, number>,
      );
    }

    // Top products by engagement
    const topProducts = await prisma.analytics.groupBy({
      by: ["productId"],
      where: {
        productId: { not: null },
        createdAt: { gte: startDate },
      },
      _count: { productId: true },
      orderBy: { _count: { productId: "desc" } },
      take: 10,
    });

    // Get product details
    const productIds = topProducts
      .map((p: GroupByProductIdCount) => p.productId)
      .filter(Boolean) as string[];
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, imageUrl: true },
    });

    const productMap = new Map(
      products.map((p: { id: string; name: string; imageUrl: string }) => [
        p.id,
        p,
      ]),
    );

    return topProducts.map((p: GroupByProductIdCount) => ({
      product: productMap.get(p.productId!),
      totalEngagements: p._count.productId,
    }));
  } catch (error) {
    console.error("Product analytics error:", error);
    throw error;
  }
}

/**
 * Increment product stat counters
 */
export async function incrementProductStat(
  productId: string,
  stat: "views" | "likes" | "contacts" | "shares",
): Promise<void> {
  try {
    await prisma.product.update({
      where: { id: productId },
      data: { [stat]: { increment: 1 } },
    });
  } catch (error) {
    console.error(
      `Failed to increment ${stat} for product ${productId}:`,
      error,
    );
  }
}

/**
 * Increment gallery image stat counters
 */
export async function incrementGalleryStat(
  imageId: string,
  stat: "views" | "likes",
): Promise<void> {
  try {
    await prisma.galleryImage.update({
      where: { id: imageId },
      data: { [stat]: { increment: 1 } },
    });
  } catch (error) {
    console.error(`Failed to increment ${stat} for gallery ${imageId}:`, error);
  }
}

/**
 * Get conversion metrics
 */
export async function getConversionMetrics(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  try {
    const [pageViews, productViews, contacts, whatsappClicks] =
      await Promise.all([
        prisma.analytics.count({
          where: { event: "page_view", createdAt: { gte: startDate } },
        }),
        prisma.analytics.count({
          where: { event: "product_view", createdAt: { gte: startDate } },
        }),
        prisma.analytics.count({
          where: { event: "contact_form", createdAt: { gte: startDate } },
        }),
        prisma.analytics.count({
          where: { event: "whatsapp_click", createdAt: { gte: startDate } },
        }),
      ]);

    return {
      pageViews,
      productViews,
      totalContacts: contacts + whatsappClicks,
      contactFormSubmissions: contacts,
      whatsappClicks,
      viewToContactRate:
        pageViews > 0
          ? (((contacts + whatsappClicks) / pageViews) * 100).toFixed(2)
          : "0",
      productViewToContactRate:
        productViews > 0
          ? (((contacts + whatsappClicks) / productViews) * 100).toFixed(2)
          : "0",
    };
  } catch (error) {
    console.error("Conversion metrics error:", error);
    throw error;
  }
}
