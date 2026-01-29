/**
 * FeaturedSection Component
 * =========================
 * Featured products/finishes showcase.
 */

"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import styles from "./FeaturedSection.module.css";

const featuredItems = [
  {
    id: "venetian",
    title: "Venetian Plaster",
    description:
      "Timeless Italian elegance with a polished marble-like finish.",
    image: "/images/hero/venetian-living-room.webp",
    href: "/shop?category=venetian",
  },
  {
    id: "marmorino",
    title: "Marmorino",
    description: "Authentic lime-based texture with natural stone aesthetics.",
    image: "/images/hero/marmorino-dining.webp",
    href: "/shop?category=marmorino",
  },
  {
    id: "travertino",
    title: "Travertino",
    description: "Rustic beauty inspired by Roman travertine stone.",
    image: "/images/hero/travertino-office.webp",
    href: "/shop?category=travertino",
  },
  {
    id: "metallic",
    title: "Metallic Finishes",
    description: "Contemporary shimmer with gold, silver, and copper effects.",
    image: "/images/hero/metallic-finish-lobby.webp",
    href: "/shop?category=metallic",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function FeaturedSection() {
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
            Our <span className="text-gradient">Signature</span> Finishes
          </h2>
          <p className={styles.subtitle}>
            Premium Italian painting techniques that transform ordinary walls
            into works of art.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuredItems.map((item) => (
            <motion.article key={item.id} variants={itemVariants}>
              <Link href={item.href} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                    className={styles.image}
                    quality={75}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8Ax6w8j1K3tIYpLe2kZEVS7AgscDk4PFMf5DqR/wAm2/1KUrDUWPsYK6lTsZ//2Q=="
                  />
                  <div className={styles.imageOverlay} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                  <span className={styles.cardLink}>
                    Explore
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="/shop" className={styles.ctaButton}>
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
