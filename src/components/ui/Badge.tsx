/**
 * Badge Component
 * ===============
 * Status and category badges.
 */

import styles from "./Badge.module.css";

interface BadgeProps {
  variant?:
    | "default"
    | "primary"
    | "gold"
    | "success"
    | "warning"
    | "error"
    | "outline";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "default",
  size = "sm",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
