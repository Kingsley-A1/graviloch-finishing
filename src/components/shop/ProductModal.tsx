/**
 * ProductModal Component
 * ======================
 * Full product details modal.
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useAnalytics } from "@/hooks/useAnalytics";
import { generateProductInquiryUrl } from "@/lib/whatsapp";
import type { Product } from "@/types";
import styles from "./ProductModal.module.css";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const [imageError, setImageError] = useState(false);
  const { trackProductContact, trackWhatsAppClick } = useAnalytics();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      venetian: "Venetian Plaster",
      marmorino: "Marmorino",
      travertino: "Travertino",
      metallic: "Metallic Finishes",
      "liquid-metal": "Liquid Metal",
      decorative: "Decorative",
      specialty: "Specialty",
      tools: "Tools",
      other: "Other",
    };
    return labels[category] || category;
  };

  const handleInquire = () => {
    trackProductContact(product.id);
    trackWhatsAppClick("product_modal");

    // Update backend
    fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "contact" }),
    });

    const whatsappUrl = generateProductInquiryUrl(
      product.name,
      product.id,
      Number(product.price),
    );
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className={styles.modal}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          {!imageError ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className={styles.image}
              quality={80}
              onError={() => setImageError(true)}
              priority
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
        </div>

        {/* Details Section */}
        <div className={styles.details}>
          <div className={styles.header}>
            <div className={styles.badges}>
              <Badge variant="primary">
                {getCategoryLabel(product.category)}
              </Badge>
              {product.inStock ? (
                <Badge variant="success">In Stock</Badge>
              ) : (
                <Badge variant="error">Out of Stock</Badge>
              )}
            </div>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.price}>{formatPrice(Number(product.price))}</p>
          </div>

          <div className={styles.descriptionSection}>
            <h3 className={styles.sectionTitle}>Description</h3>
            <p className={styles.description}>{product.description}</p>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>{product.views || 0} views</span>
            </div>
            <div className={styles.stat}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{product.likes || 0} likes</span>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.actions}>
            <Button
              variant="gold"
              size="lg"
              fullWidth
              onClick={handleInquire}
              leftIcon={
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              }
            >
              Inquire on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
