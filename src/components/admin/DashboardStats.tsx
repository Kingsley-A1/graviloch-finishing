/**
 * DashboardStats Component
 * ========================
 * Analytics stats cards.
 */

import styles from "./DashboardStats.module.css";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

async function getStats() {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  try {
    const res = await fetch(`${baseUrl}/api/analytics?type=summary`, {
      cache: "no-store",
      headers: {
        // Admin auth will be validated by route
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export default async function DashboardStats() {
  const stats = await getStats();

  const cards: StatCardProps[] = [
    {
      title: "Total Views",
      value: stats?.totalViews || 0,
      change: "+12%",
      trend: "up",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: "Products",
      value: stats?.totalProducts || 0,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Gallery Items",
      value: stats?.totalGalleryImages || 0,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
      ),
    },
    {
      title: "Reviews",
      value: stats?.totalReviews || 0,
      change: stats?.pendingReviews
        ? `${stats.pendingReviews} pending`
        : undefined,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <div key={card.title} className={styles.card}>
          <div className={styles.cardIcon}>{card.icon}</div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardValue}>{card.value.toLocaleString()}</p>
            {card.change && (
              <span
                className={`${styles.cardChange} ${
                  card.trend === "up"
                    ? styles.up
                    : card.trend === "down"
                      ? styles.down
                      : ""
                }`}
              >
                {card.trend === "up" && "↑ "}
                {card.trend === "down" && "↓ "}
                {card.change}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
