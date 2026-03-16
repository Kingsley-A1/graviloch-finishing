/**
 * RecentActivity Component
 * ========================
 * Recent activity feed.
 */

import styles from "./RecentActivity.module.css";

async function getRecentActivity() {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  try {
    const res = await fetch(`${baseUrl}/api/analytics?type=recent`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success && Array.isArray(data.data) ? data.data : [];
  } catch {
    return [];
  }
}

export default async function RecentActivity() {
  const activities = await getRecentActivity();

  const getIcon = (type: string) => {
    switch (type) {
      case "review":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case "product":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case "contact":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        );
      case "gallery":
        return (
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
        );
      default:
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recent Activity</h2>
      <div className={styles.list}>
        {activities.length === 0 ? (
          <p className={styles.empty}>No recent activity yet.</p>
        ) : (
          activities.map((activity: any) => (
            <div key={activity.id} className={styles.item}>
              <div className={styles.icon}>{getIcon(activity.type)}</div>
              <div className={styles.content}>
                <p className={styles.message}>{activity.message}</p>
                <span className={styles.time}>{activity.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
