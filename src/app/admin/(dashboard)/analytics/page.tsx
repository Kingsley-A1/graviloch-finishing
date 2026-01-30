/**
 * Admin Analytics Page
 * ====================
 * View site analytics and metrics.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./page.module.css";

interface AnalyticsData {
  overview: {
    totalViews: number;
    uniqueVisitors: number;
    avgSessionDuration: string;
    bounceRate: string;
  };
  pageViews: {
    page: string;
    views: number;
    percentage: number;
  }[];
  topProducts: {
    name: string;
    views: number;
    inquiries: number;
  }[];
  recentActivity: {
    date: string;
    views: number;
  }[];
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?period=${period}`);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        // Use mock data for demo
        setData(getMockData());
      }
    } catch {
      setData(getMockData());
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const getMockData = (): AnalyticsData => ({
    overview: {
      totalViews: 12453,
      uniqueVisitors: 4521,
      avgSessionDuration: "3m 24s",
      bounceRate: "42%",
    },
    pageViews: [
      { page: "Home", views: 4532, percentage: 36 },
      { page: "Shop", views: 3241, percentage: 26 },
      { page: "Gallery", views: 2156, percentage: 17 },
      { page: "About", views: 1524, percentage: 12 },
      { page: "Contact", views: 1000, percentage: 9 },
    ],
    topProducts: [
      { name: "Venetian Plaster Premium", views: 856, inquiries: 24 },
      { name: "Marmorino Classic", views: 742, inquiries: 18 },
      { name: "Stucco Veneziano", views: 623, inquiries: 15 },
      { name: "Lime Paint Natural", views: 534, inquiries: 12 },
      { name: "Decorative Wax", views: 412, inquiries: 8 },
    ],
    recentActivity: [
      { date: "Mon", views: 420 },
      { date: "Tue", views: 380 },
      { date: "Wed", views: 510 },
      { date: "Thu", views: 445 },
      { date: "Fri", views: 390 },
      { date: "Sat", views: 280 },
      { date: "Sun", views: 320 },
    ],
  });

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Loading analytics...</div>
      </div>
    );
  }

  if (!data) return null;

  const maxViews = Math.max(...data.recentActivity.map((d) => d.views));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Analytics</h1>
          <p className={styles.subtitle}>Track your site performance</p>
        </div>
        <div className={styles.periodSelect}>
          <button
            onClick={() => setPeriod("7d")}
            className={`${styles.periodBtn} ${period === "7d" ? styles.active : ""}`}
          >
            7 Days
          </button>
          <button
            onClick={() => setPeriod("30d")}
            className={`${styles.periodBtn} ${period === "30d" ? styles.active : ""}`}
          >
            30 Days
          </button>
          <button
            onClick={() => setPeriod("90d")}
            className={`${styles.periodBtn} ${period === "90d" ? styles.active : ""}`}
          >
            90 Days
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className={styles.overviewGrid}>
        <div className={styles.overviewCard}>
          <span className={styles.overviewLabel}>Total Views</span>
          <span className={styles.overviewValue}>
            {data.overview.totalViews.toLocaleString()}
          </span>
        </div>
        <div className={styles.overviewCard}>
          <span className={styles.overviewLabel}>Unique Visitors</span>
          <span className={styles.overviewValue}>
            {data.overview.uniqueVisitors.toLocaleString()}
          </span>
        </div>
        <div className={styles.overviewCard}>
          <span className={styles.overviewLabel}>Avg. Session</span>
          <span className={styles.overviewValue}>
            {data.overview.avgSessionDuration}
          </span>
        </div>
        <div className={styles.overviewCard}>
          <span className={styles.overviewLabel}>Bounce Rate</span>
          <span className={styles.overviewValue}>
            {data.overview.bounceRate}
          </span>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsGrid}>
        {/* Weekly Activity Chart */}
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Weekly Activity</h2>
          <div className={styles.barChart}>
            {data.recentActivity.map((day) => (
              <div key={day.date} className={styles.barColumn}>
                <div
                  className={styles.bar}
                  style={{
                    height: `${(day.views / maxViews) * 100}%`,
                  }}
                >
                  <span className={styles.barValue}>{day.views}</span>
                </div>
                <span className={styles.barLabel}>{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Page Views */}
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Page Views</h2>
          <div className={styles.pageViews}>
            {data.pageViews.map((page) => (
              <div key={page.page} className={styles.pageRow}>
                <div className={styles.pageInfo}>
                  <span className={styles.pageName}>{page.page}</span>
                  <span className={styles.pageViewCount}>
                    {page.views.toLocaleString()} views
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${page.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className={styles.tableCard}>
        <h2 className={styles.chartTitle}>Top Products</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Views</th>
                <th>Inquiries</th>
                <th>Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.topProducts.map((product, i) => (
                <tr key={i}>
                  <td>{product.name}</td>
                  <td>{product.views.toLocaleString()}</td>
                  <td>{product.inquiries}</td>
                  <td>
                    {((product.inquiries / product.views) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
