/**
 * StorySection Component
 * ======================
 * Company story and mission.
 */

"use client";

import { motion } from "framer-motion";
import styles from "./StorySection.module.css";

export default function StorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Content */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>Who We Are</span>
            <h2 className={styles.title}>
              Passion Meets <span className="text-gradient">Precision</span>
            </h2>
            <p className={styles.text}>
              GRAVILOCH FINISHING was born from a deep passion for Italian
              decorative arts. We saw a gap in the Nigerian market for
              authentic, high-quality Italian painting techniques and set out to
              fill it.
            </p>
            <p className={styles.text}>
              Our team of skilled artisans has trained extensively in
              traditional Italian methods, combining centuries-old techniques
              with modern aesthetics to create stunning finishes that transform
              any space.
            </p>
            <p className={styles.text}>
              We believe every wall tells a story. Our mission is to help you
              write yours with elegance, sophistication, and lasting beauty.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            className={styles.values}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {values.map((value) => (
              <div key={value.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <div className={styles.valueContent}>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueText}>{value.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const values = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Authenticity",
    description: "Genuine Italian techniques passed down through generations.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Excellence",
    description: "We settle for nothing less than perfection in every project.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
    title: "Dedication",
    description: "Your timeline and satisfaction are our top priorities.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Passion",
    description: "Every stroke is made with love for our craft.",
  },
];
