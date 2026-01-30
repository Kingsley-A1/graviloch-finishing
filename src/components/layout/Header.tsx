/**
 * Header Component
 * ================
 * Sticky header with glassmorphism effect.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MobileNav from "./MobileNav";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/colours", label: "Colours" },
  { href: "/shop", label: "Shop" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change - using a ref to track previous pathname
  useEffect(() => {
    // This effect runs after the pathname changes, so close the nav
    const closeNav = () => setIsMobileNavOpen(false);
    closeNav();
  }, [pathname]);

  return (
    <>
      <motion.header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoImageWrapper}>
              <Image
                src="/icons/logo.png"
                alt="GRAVILOCH FINISHINGS LTD"
                width={44}
                height={44}
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.brand}>GRAVILOCH</span>
              <span className={styles.tagline}>FINISHINGS <span className={styles.ltd}>LTD</span></span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  pathname === link.href ? styles.active : ""
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    className={styles.activeIndicator}
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={styles.menuButton}
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <span className={styles.menuIcon} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <MobileNav
            links={navLinks}
            currentPath={pathname}
            onClose={() => setIsMobileNavOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
