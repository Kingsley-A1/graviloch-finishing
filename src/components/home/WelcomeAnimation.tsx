/**
 * WelcomeAnimation Component
 * ==========================
 * Full-screen welcome animation for first-time visitors.
 */

"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFirstVisit } from "@/hooks/useFirstVisit";
import styles from "./WelcomeAnimation.module.css";

export default function WelcomeAnimation() {
  const { showWelcomeAnimation, dismissWelcomeAnimation } = useFirstVisit();

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (showWelcomeAnimation) {
      const timer = setTimeout(() => {
        dismissWelcomeAnimation();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeAnimation, dismissWelcomeAnimation]);

  const handleClick = () => {
    dismissWelcomeAnimation();
  };

  return (
    <AnimatePresence>
      {showWelcomeAnimation && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={handleClick}
        >
          <div className={styles.content}>
            {/* Welcome text */}
            <motion.p
              className={styles.welcomeText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Welcome to
            </motion.p>

            {/* Brand name */}
            <motion.h1
              className={styles.brandName}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.7, type: "spring" }}
            >
              GRAVILOCH
            </motion.h1>

            {/* Tagline */}
            <motion.div
              className={styles.taglineWrapper}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <span className={styles.tagline}>FINISHING</span>
              <motion.span
                className={styles.brushStroke}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              Italian Painting Excellence
            </motion.p>

            {/* Skip hint */}
            <motion.p
              className={styles.skipHint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              Tap anywhere to continue
            </motion.p>
          </div>

          {/* Decorative paint splashes */}
          <motion.div
            className={`${styles.paintSplash} ${styles.splash1}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.div
            className={`${styles.paintSplash} ${styles.splash2}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.08 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
