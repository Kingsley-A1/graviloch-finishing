/**
 * ColourHero Component
 * ====================
 * Stunning hero section for the Colour Hub
 */

"use client";

import { motion } from "framer-motion";
import styles from "./ColourHero.module.css";

export default function ColourHero() {
  return (
    <section className={styles.hero}>
      {/* Animated Background */}
      <div className={styles.bgPattern}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
      </div>

      {/* Floating Colour Swatches */}
      <div className={styles.floatingSwatches}>
        {[
          { color: "#FF6B6B", delay: 0 },
          { color: "#4ECDC4", delay: 0.2 },
          { color: "#FFE66D", delay: 0.4 },
          { color: "#A8E6CF", delay: 0.6 },
          { color: "#FF8B94", delay: 0.8 },
          { color: "#C7CEEA", delay: 1 },
        ].map((swatch, i) => (
          <motion.div
            key={i}
            className={styles.swatch}
            style={{ backgroundColor: swatch.color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              delay: swatch.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.badge}>
            <span className={styles.badgeIcon}>🎨</span>
            Colour Studio
          </span>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          GRAVILOCH
          <br />
          <span className={styles.titleAccent}>Colour Hub</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Explore an extensive collection of Italian painting textures and over
          200 carefully curated colours. From earthy terracottas to modern
          metallics, find the perfect shade for your vision.
        </motion.p>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className={styles.stat}>
            <span className={styles.statNumber}>200+</span>
            <span className={styles.statLabel}>Colours</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>12</span>
            <span className={styles.statLabel}>Textures</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>6</span>
            <span className={styles.statLabel}>Palettes</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
