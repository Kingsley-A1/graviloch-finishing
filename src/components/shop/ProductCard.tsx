/**
 * ProductCard Component
 * =====================
 * Individual product display card.
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import ProductModal from "./ProductModal";
import { useLikedItems } from "@/hooks/useLocalStorage";
import { useAnalytics } from "@/hooks/useAnalytics";
import type { Product } from "@/types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isLiked, toggleLike } = useLikedItems("graviloch-product-likes");
  const { trackProductView, trackProductLike, trackProductShare } =
    useAnalytics();

  const liked = isLiked(product.id);

  const handleCardClick = () => {
    trackProductView(product.id);
    setIsModalOpen(true);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(product.id);
    if (!liked) {
      trackProductLike(product.id);
      // Also update backend
      fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    trackProductShare(product.id);

    // Update backend
    fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "share" }),
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: `${window.location.origin}/shop?product=${product.id}`,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `${window.location.origin}/shop?product=${product.id}`,
      );
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      venetian: "Venetian",
      marmorino: "Marmorino",
      travertino: "Travertino",
      metallic: "Metallic",
      "liquid-metal": "Liquid Metal",
      decorative: "Decorative",
      specialty: "Specialty",
      tools: "Tools",
      other: "Other",
    };
    return labels[category] || category;
  };

  return (
    <>
      <motion.article
        className={styles.card}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={handleCardClick}
      >
        {/* Image - Mobile optimized */}
        <div className={styles.imageWrapper}>
          {!imageError ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className={styles.image}
              quality={70}
              loading="lazy"
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
          <div className={styles.overlay}>
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
          </div>

          {/* Badges */}
          <div className={styles.badges}>
            <Badge variant="primary">
              {getCategoryLabel(product.category)}
            </Badge>
            {!product.inStock && <Badge variant="error">Out of Stock</Badge>}
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.footer}>
            <span className={styles.price}>
              {formatPrice(Number(product.price))}
            </span>
            <span className={styles.viewButton}>View Details</span>
          </div>
        </div>
      </motion.article>

      {/* Product Modal */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
