/**
 * StarRating Component
 * ====================
 * Interactive and display star rating.
 */

"use client";

import { useState } from "react";
import styles from "./StarRating.module.css";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  showValue = false,
  className = "",
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index);
    }
  };

  return (
    <div
      className={`${styles.container} ${styles[size]} ${className}`}
      onMouseLeave={() => setHoverRating(0)}
    >
      <div className={styles.stars}>
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((index) => (
          <button
            key={index}
            type="button"
            className={`${styles.star} ${
              index <= displayRating ? styles.filled : ""
            } ${interactive ? styles.interactive : ""}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => interactive && setHoverRating(index)}
            disabled={!interactive}
            aria-label={`Rate ${index} out of ${maxRating}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
      {showValue && <span className={styles.value}>{rating.toFixed(1)}</span>}
    </div>
  );
}
