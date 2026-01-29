/**
 * QuickActions Component
 * ======================
 * Quick action buttons for admin.
 */

"use client";

import Link from "next/link";
import styles from "./QuickActions.module.css";

const actions = [
  {
    href: "/admin/products?action=add",
    label: "Add Product",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    color: "primary",
  },
  {
    href: "/admin/gallery?action=add",
    label: "Add Gallery Image",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    color: "gold",
  },
  {
    href: "/admin/reviews",
    label: "Moderate Reviews",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22,4 12,14.01 9,11.01" />
      </svg>
    ),
    color: "default",
  },
  {
    href: "/admin/analytics",
    label: "View Analytics",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: "default",
  },
];

export default function QuickActions() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quick Actions</h2>
      <div className={styles.grid}>
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`${styles.action} ${styles[action.color]}`}
          >
            <span className={styles.icon}>{action.icon}</span>
            <span className={styles.label}>{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
