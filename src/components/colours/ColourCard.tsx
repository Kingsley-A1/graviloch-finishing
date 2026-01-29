/**
 * ColourCard Component
 * ====================
 * Individual colour swatch card
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLikedItems } from "@/hooks/useLocalStorage";
import styles from "./ColourCard.module.css";

interface ColourCardProps {
  colour: {
    id: string;
    name: string;
    hex: string;
    code: string;
  };
  onClick: () => void;
}

export default function ColourCard({ colour, onClick }: ColourCardProps) {
  const [copied, setCopied] = useState(false);
  const { isLiked, toggleLike } = useLikedItems("graviloch-colour-likes");
  const liked = isLiked(colour.id);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(colour.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(colour.id);
  };

  // Calculate if colour is light or dark for text contrast
  const isLightColour = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const textColour = isLightColour(colour.hex) ? "#1a1a1a" : "#ffffff";

  return (
    <motion.div
      className={styles.card}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={styles.swatch} style={{ backgroundColor: colour.hex }}>
        {/* Like Button */}
        <button
          className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
          onClick={handleLike}
          style={{ color: textColour }}
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

        {/* Colour Code Overlay */}
        <div className={styles.codeOverlay} style={{ color: textColour }}>
          <span className={styles.hexCode}>{colour.hex}</span>
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{colour.name}</h3>
        <div className={styles.meta}>
          <span className={styles.code}>{colour.code}</span>
          <button
            className={styles.copyBtn}
            onClick={handleCopyCode}
            title="Copy colour code"
          >
            {copied ? "✓" : "📋"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
