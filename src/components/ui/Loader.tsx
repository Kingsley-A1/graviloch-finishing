/**
 * Loader Component
 * ================
 * Loading spinners and skeletons.
 */

import styles from "./Loader.module.css";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  className?: string;
}

export default function Loader({
  size = "md",
  variant = "spinner",
  className = "",
}: LoaderProps) {
  if (variant === "dots") {
    return (
      <div className={`${styles.dots} ${styles[size]} ${className}`}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    );
  }

  if (variant === "pulse") {
    return <div className={`${styles.pulse} ${styles[size]} ${className}`} />;
  }

  return (
    <div className={`${styles.spinner} ${styles[size]} ${className}`}>
      <svg viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset="30"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary-500)" />
            <stop offset="100%" stopColor="var(--gold-400)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Full page loader
export function PageLoader() {
  return (
    <div className={styles.pageLoader}>
      <Loader size="lg" />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
}

// Skeleton loader
interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${styles[`skeleton-${variant}`]} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}
