/**
 * AdminHeader Component
 * =====================
 * Admin top header bar.
 */

"use client";

import { signOut } from "next-auth/react";
import Button from "@/components/ui/Button";
import styles from "./AdminHeader.module.css";

interface AdminHeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className={styles.header}>
      <div className={styles.spacer} />

      <div className={styles.actions}>
        {user && (
          <div className={styles.user}>
            <div className={styles.userAvatar}>
              {user.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name || "Admin"}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </header>
  );
}
