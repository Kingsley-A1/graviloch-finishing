/**
 * ReviewCard Component
 * ====================
 * Individual review display card.
 */

"use client";

import { motion } from "framer-motion";
import StarRating from "@/components/ui/StarRating";
import type { Review } from "@/types";
import styles from "./ReviewCard.module.css";

interface ReviewCardProps {
  review: Review;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  // Generate a color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      "#10b981", // emerald
      "#fbbf24", // gold
      "#3b82f6", // blue
      "#8b5cf6", // purple
      "#ec4899", // pink
      "#f97316", // orange
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      {/* Header */}
      <div className={styles.header}>
        <div
          className={styles.avatar}
          style={{ backgroundColor: getAvatarColor(review.name) }}
        >
          {getInitials(review.name)}
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{review.name}</h3>
          <span className={styles.date}>{formatDate(review.createdAt)}</span>
        </div>
        <div className={styles.rating}>
          <StarRating rating={review.rating} size="sm" />
        </div>
      </div>

      {/* Message */}
      <p className={styles.message}>{review.message}</p>

      {/* Verified Badge */}
      <div className={styles.footer}>
        <span className={styles.verified}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22,4 12,14.01 9,11.01" />
          </svg>
          Verified Customer
        </span>
      </div>
    </motion.article>
  );
}
