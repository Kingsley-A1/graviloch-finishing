/**
 * Admin Root Layout
 * =================
 * Provides a neutral shell so that route groups can control auth.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Admin - GRAVILOCH",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
