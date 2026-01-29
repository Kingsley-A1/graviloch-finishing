/**
 * RatingStats Component
 * =====================
 * Overall rating summary display.
 */

"use client";

import StarRating from "@/components/ui/StarRating";
import styles from "./RatingStats.module.css";

interface RatingStatsProps {
  totalReviews: number;
  averageRating: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export default function RatingStats({
  totalReviews,
  averageRating,
  distribution,
}: RatingStatsProps) {
  const maxCount = Math.max(...Object.values(distribution), 1);

  return (
    <div className={styles.stats}>
      {/* Main Rating */}
      <div className={styles.main}>
        <div className={styles.ratingNumber}>{averageRating.toFixed(1)}</div>
        <StarRating rating={Math.round(averageRating)} size="lg" />
        <p className={styles.totalReviews}>
          Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Distribution */}
      <div className={styles.distribution}>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className={styles.barRow}>
            <span className={styles.barLabel}>{rating}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{
                  width: `${(distribution[rating as 1 | 2 | 3 | 4 | 5] / maxCount) * 100}%`,
                }}
              />
            </div>
            <span className={styles.barCount}>
              {distribution[rating as 1 | 2 | 3 | 4 | 5]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
