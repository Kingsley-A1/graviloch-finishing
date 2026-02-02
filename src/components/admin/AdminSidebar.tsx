/**
 * AdminSidebar Component
 * ======================
 * Toggleable admin navigation sidebar with modern styling.
 */

"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AdminSidebar.module.css";

// Context for sidebar state
const SidebarContext = createContext<{
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    href: "/admin/colours",
    label: "Colours",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="6.5" cy="13.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
        <path d="M8 9.5L14 4M6.5 16.5L16 8M11.5 18.5L17.5 12" />
      </svg>
    ),
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21,15 16,10 5,21" />
      </svg>
    ),
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

interface AdminUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AdminSidebarProps {
  user?: AdminUser | null;
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Initialize collapsed state from localStorage (only runs on client)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin-sidebar-collapsed");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Track previous pathname for mobile close
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close sidebar on route change (mobile) - schedule for next tick
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      // Use microtask to avoid synchronous setState in effect
      queueMicrotask(() => setIsOpen(false));
      prevPathname.current = pathname;
    }
  }, [pathname]);

  // Save collapsed state to localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("admin-sidebar-collapsed", JSON.stringify(newState));
  };

  const sidebarWidth = isCollapsed ? 72 : 260;

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {/* Mobile Toggle */}
      {isMobile && (
        <button
          className={styles.mobileToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      )}

      {/* Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(!isMobile || isOpen) && (
          <motion.aside
            className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
            initial={isMobile ? { x: -sidebarWidth } : false}
            animate={{ x: 0, width: isMobile ? 260 : sidebarWidth }}
            exit={{ x: -sidebarWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Logo */}
            <div className={styles.logo}>
              <Image
                src="/icons/logo.png"
                alt="GRAVILOCH"
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
              {!isCollapsed && (
                <motion.div
                  className={styles.logoText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className={styles.brand}>GRAVILOCH</span>
                  <span className={styles.tagline}>Admin Portal</span>
                </motion.div>
              )}
            </div>

            {/* Collapse Toggle (Desktop only) */}
            {!isMobile && (
              <button
                className={styles.collapseToggle}
                onClick={toggleCollapse}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isCollapsed ? (
                    <polyline points="9 18 15 12 9 6" />
                  ) : (
                    <polyline points="15 18 9 12 15 6" />
                  )}
                </svg>
              </button>
            )}

            {/* Navigation */}
            <nav className={styles.nav}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    {!isCollapsed && (
                      <motion.span
                        className={styles.navLabel}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {isActive && (
                      <motion.span
                        className={styles.activeIndicator}
                        layoutId="adminActiveNav"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className={styles.footer}>
              {user && (
                <div className={styles.userCard}>
                  <div className={styles.userAvatar}>{user.name?.[0]?.toUpperCase() || "A"}</div>
                  {!isCollapsed && (
                    <div className={styles.userMeta}>
                      <span className={styles.userName}>{user.name || "Admin"}</span>
                      <span className={styles.userEmail}>{user.email}</span>
                    </div>
                  )}
                </div>
              )}

              <Link href="/" className={styles.backLink} title={isCollapsed ? "Back to Site" : undefined}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                {!isCollapsed && <span>Back to Site</span>}
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* CSS variable for main content margin */}
      <style jsx global>{`
        :root {
          --admin-sidebar-width: ${isMobile ? 0 : sidebarWidth}px;
        }
      `}</style>
    </SidebarContext.Provider>
  );
}
