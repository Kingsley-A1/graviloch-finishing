/**
 * CTASection Component
 * ====================
 * Call-to-action section.
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.background} />
      <div className={styles.overlay} />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>
            Ready to Transform <span className="text-gold">Your Space?</span>
          </h2>
          <p className={styles.subtitle}>
            Let&apos;s discuss your project and create something beautiful
            together. Get a free consultation today.
          </p>
          <div className={styles.actions}>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Get Free Quote
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" size="lg">
                View Our Work
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
