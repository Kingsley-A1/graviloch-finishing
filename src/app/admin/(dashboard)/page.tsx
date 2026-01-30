/**
 * Admin Dashboard Page
 * ====================
 * Main admin dashboard with analytics.
 */

import { Suspense } from "react";
import DashboardStats from "@/components/admin/DashboardStats";
import RecentActivity from "@/components/admin/RecentActivity";
import QuickActions from "@/components/admin/QuickActions";
import { Skeleton } from "@/components/ui/Loader";
import styles from "./page.module.css";

export default function AdminDashboardPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      {/* Stats */}
      <Suspense fallback={<StatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      {/* Grid */}
      <div className={styles.grid}>
        {/* Quick Actions */}
        <div className={styles.gridItem}>
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <div className={styles.gridItem}>
          <Suspense fallback={<Skeleton height={300} />}>
            <RecentActivity />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className={styles.statsGrid}>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} height={120} />
      ))}
    </div>
  );
}
