/**
 * Testimonials Page
 * =================
 * Customer reviews and testimonials.
 */

import { Suspense } from "react";
import type { Metadata } from "next";
import ReviewList from "@/components/testimonials/ReviewList";
import RatingStats from "@/components/testimonials/RatingStats";
import SubmitReviewButton from "@/components/testimonials/SubmitReviewButton";
import { PageLoader } from "@/components/ui/Loader";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what our customers say about GRAVILOCH FINISHING. Real reviews from satisfied clients across Nigeria.",
  openGraph: {
    title: "Testimonials | GRAVILOCH FINISHING",
    description:
      "Read what our customers say about our premium Italian painting services.",
  },
};

// Mock reviews for stats calculation when database is empty
const mockReviewsForStats = [
  { rating: 5 },
  { rating: 5 },
  { rating: 5 },
  { rating: 4 },
  { rating: 5 },
  { rating: 4 },
];

async function getReviewStats() {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  try {
    const res = await fetch(`${baseUrl}/api/reviews`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch reviews");
    const { data } = await res.json();

    // Use mock data if no reviews in database
    const reviewData = data?.length > 0 ? data : mockReviewsForStats;

    // Calculate stats
    const total = reviewData.length;
    const avgRating =
      total > 0
        ? reviewData.reduce(
            (sum: number, r: { rating: number }) => sum + r.rating,
            0,
          ) / total
        : 0;

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviewData.forEach((r: { rating: 1 | 2 | 3 | 4 | 5 }) => {
      distribution[r.rating]++;
    });

    return {
      total,
      avgRating,
      distribution,
    };
  } catch (error) {
    console.error("Error fetching review stats:", error);
    // Return mock stats on error
    return {
      total: 6,
      avgRating: 4.7,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 2, 5: 4 },
    };
  }
}

export default async function TestimonialsPage() {
  const stats = await getReviewStats();

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            Customer <span className="text-gold">Reviews</span>
          </h1>
          <p className={styles.subtitle}>
            See what our clients have to say about our work
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <RatingStats
            totalReviews={stats.total}
            averageRating={stats.avgRating}
            distribution={stats.distribution}
          />
          <SubmitReviewButton />
        </div>
      </section>

      {/* Reviews List */}
      <section className={styles.content}>
        <div className={styles.container}>
          <Suspense fallback={<PageLoader />}>
            <ReviewList />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
