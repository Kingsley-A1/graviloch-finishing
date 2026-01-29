/**
 * HeroAbout Component
 * ===================
 * About page hero section.
 */

"use client";

import { motion } from "framer-motion";
import styles from "./HeroAbout.module.css";

export default function HeroAbout() {
  return (
    <section className={styles.hero}>
      <div className={styles.background} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Story
        </motion.span>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Crafting <span className="text-gold">Elegance</span>
          <br />
          One Wall at a Time
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          We bring the timeless beauty of Italian craftsmanship to Nigeria,
          transforming spaces into works of art.
        </motion.p>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorativeLines}>
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1 }}
        />
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </div>
    </section>
  );
}
