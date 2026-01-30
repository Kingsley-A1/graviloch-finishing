/**
 * Admin Layout
 * ============
 * Admin dashboard layout with sidebar.
 * Login and register pages have their own layouts.
 */

import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
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
  // Get current path from headers
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
  
  // Skip auth check for login and register pages (they have their own layouts)
  const isAuthPage = pathname.includes("/login") || pathname.includes("/register");
  
  if (isAuthPage) {
    return <>{children}</>;
  }

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
