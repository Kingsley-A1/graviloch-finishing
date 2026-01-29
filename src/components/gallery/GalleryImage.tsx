/**
 * GalleryImage Component
 * ======================
 * Individual gallery image with lightbox trigger.
 * Redesigned with uniform sizing and always-visible title.
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Lightbox from "./Lightbox";
import { useLikedItems } from "@/hooks/useLocalStorage";
import type { GalleryImage as GalleryImageType } from "@/types";
import styles from "./GalleryImage.module.css";

interface GalleryImageProps {
  image: GalleryImageType;
  index: number;
  allImages: GalleryImageType[];
}

export default function GalleryImage({
  image,
  index,
  allImages,
}: GalleryImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isLiked, toggleLike } = useLikedItems("graviloch-gallery-likes");

  const liked = isLiked(image.id);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(image.id);
    if (!liked) {
      // Update backend
      fetch(`/api/gallery/${image.id}`, {
        method: "PATCH",
      });
    }
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
    <>
      <motion.article
        className={styles.item}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        whileHover={{ y: -4 }}
        onClick={() => setIsLightboxOpen(true)}
      >
        {/* Image - Optimized for mobile performance */}
        {!imageError ? (
          <Image
            src={image.imageUrl}
            alt={image.title}
            fill
            sizes="(max-width: 300px) 50vw, (max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className={styles.image}
            quality={70}
            loading={index < 4 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8Ax6w8j1K3tIYpLe2kZEVS7AgscDk4PFMf5DqR/wAm2/1KUrDUWPsYK6lTsZ//2Q=="
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

        {/* Overlay */}
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <Badge variant="gold" size="sm">
              {getCategoryLabel(image.category)}
            </Badge>
            <h3 className={styles.title}>{image.title}</h3>
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
          </div>
        </div>

        {/* Views Counter */}
        <div className={styles.viewsCounter}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>{image.views}</span>
        </div>
      </motion.article>

      {/* Lightbox */}
      <Lightbox
        images={allImages}
        currentIndex={index}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
