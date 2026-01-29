/**
 * Admin Layout
 * ============
 * Admin dashboard layout with sidebar.
 */

import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Admin - GRAVILOCH",
  },
  robots: { index: false, follow: false },
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <div className={styles.main}>
        <AdminHeader user={session.user} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
