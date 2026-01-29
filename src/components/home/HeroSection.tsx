/**
 * HeroSection Component
 * =====================
 * Full viewport hero with optimized image carousel.
 * Uses Next.js Image for LCP optimization.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HeroSection.module.css";

const heroSlides = [
  {
    image: "/images/hero/venetian-living-room.webp",
    title: "Transform Your Space",
    subtitle: "with Italian Elegance",
    description:
      "Premium Venetian plaster finishes that bring timeless beauty to any room.",
  },
  {
    image: "/images/hero/marmorino-dining.webp",
    title: "Artisan Craftsmanship",
    subtitle: "in Every Stroke",
    description:
      "Authentic Marmorino techniques passed down through generations.",
  },
  {
    image: "/images/hero/metallic-finish-lobby.webp",
    title: "Luxurious Finishes",
    subtitle: "That Captivate",
    description:
      "Stunning metallic and decorative effects for statement walls.",
  },
  {
    image: "/images/hero/travertino-office.webp",
    title: "Natural Beauty",
    subtitle: "Reimagined",
    description: "Travertino finishes that bring the essence of Italian stone.",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background Images - Preloaded for LCP */}
      <div className={styles.backgroundWrapper}>
        {/* Preload all hero images for instant transitions */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`${styles.backgroundSlide} ${index === currentSlide ? styles.activeSlide : ""}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              quality={index === 0 ? 85 : 75}
              sizes="100vw"
              style={{ objectFit: "cover" }}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8Ax6w8j1K3tIYpLe2kZEVS7AgscDk4PFMf5DqR/wAm2/1KUrDUWPsYK6lTsZ//2Q=="
            />
          </div>
        ))}
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className={styles.textContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.title}>
              {heroSlides[currentSlide].title}
              <span className={styles.subtitle}>
                {heroSlides[currentSlide].subtitle}
              </span>
            </h1>
            <p className={styles.description}>
              {heroSlides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link href="/gallery" className={styles.primaryButton}>
            View Our Work
          </Link>
          <Link href="/contact" className={styles.secondaryButton}>
            Get a Quote
          </Link>
        </motion.div>

        {/* Slide Indicators */}
        <div className={styles.indicators}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentSlide ? styles.active : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className={styles.scrollText}>Scroll</span>
        <motion.span
          className={styles.scrollArrow}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.span>
      </motion.div>
    </section>
  );
}
