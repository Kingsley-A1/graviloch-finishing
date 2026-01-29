/**
 * ServicesPreview Component
 * =========================
 * Services overview with icons.
 */

"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import styles from "./ServicesPreview.module.css";

const services = [
  {
    id: "venetian",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 21V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13" />
        <path d="M4 21h16" />
        <path d="M12 6V3" />
        <path d="M8 6V4" />
        <path d="M16 6V4" />
        <rect x="6" y="10" width="12" height="8" rx="1" />
      </svg>
    ),
    title: "Venetian Plaster",
    description:
      "Classic Italian polished marble-like walls with depth and luminosity.",
  },
  {
    id: "marmorino",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5Z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Marmorino",
    description:
      "Authentic lime-based finish with natural stone texture and beauty.",
  },
  {
    id: "travertino",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    ),
    title: "Travertino",
    description:
      "Roman-inspired stone effect bringing ancient elegance to modern spaces.",
  },
  {
    id: "metallic",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path
          d="M12 2a10 10 0 0 1 0 20"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
    title: "Metallic Finishes",
    description:
      "Stunning shimmer effects in gold, silver, copper, and bronze tones.",
  },
  {
    id: "decorative",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
      </svg>
    ),
    title: "Decorative Effects",
    description:
      "Custom artistic textures and patterns for unique statement walls.",
  },
  {
    id: "consultation",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h8" />
        <path d="M8 14h4" />
      </svg>
    ),
    title: "Free Consultation",
    description:
      "Expert advice to help you choose the perfect finish for your space.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ServicesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            What We <span className="text-gold">Offer</span>
          </h2>
          <p className={styles.subtitle}>
            Comprehensive Italian painting services tailored to bring your
            vision to life.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className={styles.card}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.iconWrapper}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link href="/about" className={styles.ctaButton}>
            Learn More About Our Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
