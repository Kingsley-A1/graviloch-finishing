/**
 * Lightbox Component
 * ==================
 * Full-screen image viewer with navigation.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLikedItems } from "@/hooks/useLocalStorage";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import type { GalleryImage } from "@/types";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({
  images,
  currentIndex: initialIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imageError, setImageError] = useState(false);
  const { isLiked, toggleLike } = useLikedItems("graviloch-gallery-likes");

  const currentImage = images[currentIndex];
  const liked = isLiked(currentImage?.id);

  // Reset to initial index when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setImageError(false);
    }
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen, currentIndex, images.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const goToPrev = () => {
    setImageError(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setImageError(false);
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleLike = () => {
    toggleLike(currentImage.id);
    if (!liked) {
      fetch(`/api/gallery/${currentImage.id}`, {
        method: "PATCH",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title,
          text: `Check out this beautiful ${currentImage.category} finish by GRAVILOCH FINISHING`,
          url: `${window.location.origin}/gallery?image=${currentImage.id}`,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(
        `${window.location.origin}/gallery?image=${currentImage.id}`,
      );
    }
  };

  const handleInquire = () => {
    const url = generateWhatsAppUrl(
      `Hi! I'm interested in this ${currentImage.category} finish: "${currentImage.title}". Can you tell me more about it?`,
    );
    window.open(url, "_blank");
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      interior: "Interior",
      exterior: "Exterior",
      office: "Office",
      commercial: "Commercial",
      residential: "Residential",
      dining: "Dining",
      bedroom: "Bedroom",
      "living-room": "Living Room",
      bathroom: "Bathroom",
      other: "Other",
    };
    return labels[category] || category;
  };

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Close Button */}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close lightbox"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={goToPrev}
                aria-label="Previous image"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={goToNext}
                aria-label="Next image"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Image Container */}
          <div className={styles.imageContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className={styles.imageWrapper}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {!imageError ? (
                  <Image
                    src={currentImage.imageUrl}
                    alt={currentImage.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                    className={styles.image}
                    quality={85}
                    priority
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Bar */}
          <div className={styles.bottomBar}>
            <div className={styles.imageInfo}>
              <span className={styles.category}>
                {getCategoryLabel(currentImage.category)}
              </span>
              <h3 className={styles.title}>{currentImage.title}</h3>
              <span className={styles.counter}>
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            <div className={styles.actions}>
              <button
                className={`${styles.actionButton} ${liked ? styles.liked : ""}`}
                onClick={handleLike}
                aria-label={liked ? "Unlike" : "Like"}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <button
                className={styles.actionButton}
                onClick={handleShare}
                aria-label="Share"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16,6 12,2 8,6" />
                  <line x1="12" x2="12" y1="2" y2="15" />
                </svg>
              </button>
              <button
                className={`${styles.actionButton} ${styles.inquireButton}`}
                onClick={handleInquire}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>Inquire</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
