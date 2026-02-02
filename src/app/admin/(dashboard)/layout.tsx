/**
 * Admin Dashboard Layout
 * ======================
 * Protects admin routes and renders the dashboard chrome.
 */

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import styles from "./layout.module.css";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className={styles.layout}>
      <AdminSidebar user={session.user} />
      <div className={styles.main}>
        <AdminHeader user={session.user} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
