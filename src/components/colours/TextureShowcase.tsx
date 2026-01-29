/**
 * TextureShowcase Component
 * =========================
 * Interactive texture cards showcasing Italian painting techniques
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./TextureShowcase.module.css";

const textures = [
  {
    id: "venetian",
    name: "Venetian Plaster",
    italianName: "Stucco Veneziano",
    description:
      "The crown jewel of Italian plasters. Creates a luminous, marble-like finish with incredible depth and warmth.",
    image: "/images/hero/venetian-living-room.webp",
    features: ["High Gloss", "Marble Effect", "Burnished Finish"],
    popularity: 98,
  },
  {
    id: "marmorino",
    name: "Marmorino",
    italianName: "Marmorino Classico",
    description:
      "Traditional lime plaster with a softer, more natural stone appearance. Perfect for classical and contemporary spaces.",
    image: "/images/hero/marmorino-dining.webp",
    features: ["Natural Stone", "Breathable", "Eco-Friendly"],
    popularity: 95,
  },
  {
    id: "travertino",
    name: "Travertino",
    italianName: "Travertino Romano",
    description:
      "Replicates the timeless beauty of Roman travertine stone with authentic texture and character.",
    image: "/images/hero/travertino-office.webp",
    features: ["Stone Texture", "Rustic Appeal", "Durable"],
    popularity: 88,
  },
  {
    id: "metallic",
    name: "Metallic Finish",
    italianName: "Finitura Metallica",
    description:
      "Contemporary metallic effects that catch light beautifully. Available in gold, silver, bronze, and copper.",
    image: "/images/hero/metallic-finish-lobby.webp",
    features: ["Light Play", "Modern Look", "Statement Walls"],
    popularity: 92,
  },
  {
    id: "limewash",
    name: "Lime Wash",
    italianName: "Intonaco a Calce",
    description:
      "Ancient technique creating soft, chalky matte finish. Natural and breathable for healthy interiors.",
    image: "/images/1 (1).png",
    features: ["Matte Finish", "Organic", "Antibacterial"],
    popularity: 85,
  },
  {
    id: "concrete",
    name: "Microcement",
    italianName: "Microcemento",
    description:
      "Industrial-chic concrete effect with seamless application. Modern minimalism at its finest.",
    image: "/images/1 (2).png",
    features: ["Seamless", "Industrial", "Waterproof"],
    popularity: 90,
  },
];

interface TextureShowcaseProps {
  activeTexture?: string;
}

export default function TextureShowcase({
  activeTexture,
}: TextureShowcaseProps) {
  const [selectedTexture, setSelectedTexture] = useState(
    activeTexture || textures[0].id,
  );

  const currentTexture =
    textures.find((t) => t.id === selectedTexture) || textures[0];

  return (
    <div className={styles.showcase}>
      {/* Texture Cards */}
      <div className={styles.cards}>
        {textures.map((texture, index) => (
          <motion.button
            key={texture.id}
            className={`${styles.card} ${selectedTexture === texture.id ? styles.active : ""}`}
            onClick={() => setSelectedTexture(texture.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.cardImage}>
              <Image
                src={texture.image}
                alt={texture.name}
                fill
                sizes="(max-width: 480px) 120px, (max-width: 768px) 100px, 110px"
                style={{ objectFit: "cover" }}
                quality={65}
                loading={index < 3 ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8Ax6w8j1K3tIYpLe2kZEVS7AgscDk4PFMf5DqR/wAm2/1KUrDUWPsYK6lTsZ//2Q=="
              />
              <div className={styles.cardOverlay} />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardItalian}>{texture.italianName}</span>
              <h3 className={styles.cardName}>{texture.name}</h3>
              <div className={styles.cardPopularity}>
                <div
                  className={styles.popularityBar}
                  style={{ width: `${texture.popularity}%` }}
                />
              </div>
            </div>
            {selectedTexture === texture.id && (
              <motion.div
                className={styles.activeIndicator}
                layoutId="activeTexture"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTexture.id}
          className={styles.detail}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.detailImage}>
            <Image
              src={currentTexture.image}
              alt={currentTexture.name}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
              quality={80}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8Ax6w8j1K3tIYpLe2kZEVS7AgscDk4PFMf5DqR/wAm2/1KUrDUWPsYK6lTsZ//2Q=="
            />
            <div className={styles.detailImageOverlay}>
              <span className={styles.popularityBadge}>
                🔥 {currentTexture.popularity}% Popular
              </span>
            </div>
          </div>

          <div className={styles.detailContent}>
            <span className={styles.detailItalian}>
              {currentTexture.italianName}
            </span>
            <h2 className={styles.detailName}>{currentTexture.name}</h2>
            <p className={styles.detailDescription}>
              {currentTexture.description}
            </p>

            <div className={styles.features}>
              {currentTexture.features.map((feature) => (
                <span key={feature} className={styles.feature}>
                  {feature}
                </span>
              ))}
            </div>

            <div className={styles.detailActions}>
              <a
                href={`https://wa.me/2349036826272?text=${encodeURIComponent(`Hi! I'm interested in ${currentTexture.name} (${currentTexture.italianName}) texture. Can you tell me more about it?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.enquireButton}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enquire Now
              </a>
              <a
                href={`/shop?category=${currentTexture.id}`}
                className={styles.viewProducts}
              >
                View Products →
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
