/**
 * TestimonialPreview Component
 * ============================
 * Featured testimonial showcase.
 */

"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import StarRating from "@/components/ui/StarRating";
import styles from "./TestimonialPreview.module.css";

// Sample featured review (would come from API in production)
const featuredReview = {
  id: "1",
  name: "Adaobi Nwankwo",
  rating: 5,
  message:
    "GRAVILOCH FINISHING transformed our living room into a masterpiece! The Venetian plaster finish exceeded all expectations. The team was professional, punctual, and truly talented. Our walls look like they belong in an Italian palazzo.",
  date: "2025-12-15",
};

export default function TestimonialPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Quote Icon */}
          <div className={styles.quoteIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Stars */}
          <div className={styles.stars}>
            <StarRating rating={featuredReview.rating} size="lg" />
          </div>

          {/* Quote */}
          <blockquote className={styles.quote}>
            &ldquo;{featuredReview.message}&rdquo;
          </blockquote>

          {/* Author */}
          <div className={styles.author}>
            <div className={styles.avatar}>
              {getInitials(featuredReview.name)}
            </div>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{featuredReview.name}</span>
              <span className={styles.authorMeta}>Verified Customer</span>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <Link href="/testimonials" className={styles.ctaButton}>
              Read More Reviews
            </Link>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className={styles.decorLeft} />
        <div className={styles.decorRight} />
      </div>
    </section>
  );
}
