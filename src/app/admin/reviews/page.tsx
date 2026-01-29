/**
 * Admin Reviews Page
 * ==================
 * Moderate customer reviews.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui";
import { StarRating } from "@/components/ui";
import styles from "./page.module.css";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filteredReviews = reviews.filter((r) => {
    if (filter === "pending") return !r.approved;
    if (filter === "approved") return r.approved;
    return true;
  });

  const pendingCount = reviews.filter((r) => !r.approved).length;

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: true }),
      });

      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, approved: true } : r)),
        );
      }
    } catch (error) {
      console.error("Approve failed:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Reviews</h1>
          <p className={styles.subtitle}>
            Moderate customer reviews
            {pendingCount > 0 && (
              <span className={styles.pendingBadge}>
                {pendingCount} pending
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filters}>
        <button
          onClick={() => setFilter("all")}
          className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`}
        >
          All ({reviews.length})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`${styles.filterBtn} ${filter === "pending" ? styles.active : ""}`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`${styles.filterBtn} ${filter === "approved" ? styles.active : ""}`}
        >
          Approved ({reviews.length - pendingCount})
        </button>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className={styles.loading}>Loading reviews...</div>
      ) : filteredReviews.length === 0 ? (
        <div className={styles.empty}>
          <p>No reviews to show.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className={`${styles.card} ${!review.approved ? styles.pending : ""}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardInfo}>
                  <h3 className={styles.customerName}>{review.customerName}</h3>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <span className={styles.date}>
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className={styles.comment}>{review.comment}</p>

              <div className={styles.cardActions}>
                {!review.approved && (
                  <Button size="sm" onClick={() => handleApprove(review.id)}>
                    Approve
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(review.id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </Button>
              </div>

              {!review.approved && (
                <span className={styles.statusBadge}>Pending Review</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
