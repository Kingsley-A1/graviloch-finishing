"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ColourModal.module.css";
import { useLikedItems } from "@/hooks/useLocalStorage";

interface Colour {
  id: string;
  name: string;
  hex: string;
  code: string;
}

interface ColourModalProps {
  colour: Colour | null;
  onClose: () => void;
  allColours?: Colour[];
  onNavigate?: (colour: Colour) => void;
}

export default function ColourModal({
  colour,
  onClose,
  allColours = [],
  onNavigate,
}: ColourModalProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const { isLiked, toggleLike } = useLikedItems("graviloch-colour-likes");

  const isLightColour = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6;
  };

  const copyToClipboard = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
  };

  const generateComplementary = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `#${(255 - r).toString(16).padStart(2, "0")}${(255 - g).toString(16).padStart(2, "0")}${(255 - b).toString(16).padStart(2, "0")}`;
  };

  const generateShades = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return [
      "#" +
        [r, g, b]
          .map((c) =>
            Math.round(c * 0.4)
              .toString(16)
              .padStart(2, "0"),
          )
          .join(""),
      "#" +
        [r, g, b]
          .map((c) =>
            Math.round(c * 0.6)
              .toString(16)
              .padStart(2, "0"),
          )
          .join(""),
      "#" +
        [r, g, b]
          .map((c) =>
            Math.round(c * 0.8)
              .toString(16)
              .padStart(2, "0"),
          )
          .join(""),
      hex,
      "#" +
        [r, g, b]
          .map((c) =>
            Math.round(Math.min(255, c * 1.2))
              .toString(16)
              .padStart(2, "0"),
          )
          .join(""),
    ];
  };

  const whatsappMessage = colour
    ? `Hello! I'm interested in the colour "${colour.name}" (${colour.code}, ${colour.hex}) for my project. Can you tell me more about it?`
    : "";

  const currentIndex = allColours.findIndex((c) => c.id === colour?.id);
  const prevColour = currentIndex > 0 ? allColours[currentIndex - 1] : null;
  const nextColour =
    currentIndex < allColours.length - 1 ? allColours[currentIndex + 1] : null;

  if (!colour) return null;

  const isLight = isLightColour(colour.hex);
  const textColor = isLight ? "#1a1a1a" : "#ffffff";
  const complementary = generateComplementary(colour.hex);
  const shades = generateShades(colour.hex);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          {prevColour && onNavigate && (
            <button
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={() => onNavigate(prevColour)}
              aria-label="Previous colour"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          {nextColour && onNavigate && (
            <button
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={() => onNavigate(nextColour)}
              aria-label="Next colour"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          <div className={styles.content}>
            {/* Main Colour Display */}
            <div
              className={styles.colourDisplay}
              style={{ backgroundColor: colour.hex, color: textColor }}
            >
              <div className={styles.colourInfo}>
                <h2 className={styles.colourName}>{colour.name}</h2>
                <p className={styles.colourCode}>{colour.code}</p>
              </div>

              <button
                className={styles.likeBtn}
                onClick={() => toggleLike(colour.id)}
                style={{ color: textColor, borderColor: textColor }}
              >
                {isLiked(colour.id) ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Colour Details */}
            <div className={styles.details}>
              {/* Colour Codes Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Colour Codes</h3>
                <div className={styles.codeGrid}>
                  <button
                    className={styles.codeItem}
                    onClick={() => copyToClipboard(colour.hex, "hex")}
                  >
                    <span className={styles.codeLabel}>HEX</span>
                    <span className={styles.codeValue}>
                      {colour.hex.toUpperCase()}
                    </span>
                    {copied === "hex" && (
                      <span className={styles.copiedBadge}>Copied!</span>
                    )}
                  </button>
                  <button
                    className={styles.codeItem}
                    onClick={() =>
                      copyToClipboard(`rgb(${hexToRgb(colour.hex)})`, "rgb")
                    }
                  >
                    <span className={styles.codeLabel}>RGB</span>
                    <span className={styles.codeValue}>
                      {hexToRgb(colour.hex)}
                    </span>
                    {copied === "rgb" && (
                      <span className={styles.copiedBadge}>Copied!</span>
                    )}
                  </button>
                  <button
                    className={styles.codeItem}
                    onClick={() =>
                      copyToClipboard(`hsl(${hexToHsl(colour.hex)})`, "hsl")
                    }
                  >
                    <span className={styles.codeLabel}>HSL</span>
                    <span className={styles.codeValue}>
                      {hexToHsl(colour.hex)}
                    </span>
                    {copied === "hsl" && (
                      <span className={styles.copiedBadge}>Copied!</span>
                    )}
                  </button>
                  <button
                    className={styles.codeItem}
                    onClick={() => copyToClipboard(colour.code, "gf")}
                  >
                    <span className={styles.codeLabel}>GF CODE</span>
                    <span className={styles.codeValue}>{colour.code}</span>
                    {copied === "gf" && (
                      <span className={styles.copiedBadge}>Copied!</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Shades Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Colour Shades</h3>
                <div className={styles.shadesGrid}>
                  {shades.map((shade, index) => (
                    <button
                      key={index}
                      className={`${styles.shade} ${index === 3 ? styles.currentShade : ""}`}
                      style={{ backgroundColor: shade }}
                      onClick={() => copyToClipboard(shade, `shade-${index}`)}
                      title={shade}
                    >
                      {copied === `shade-${index}` && (
                        <span className={styles.shadeCopied}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complementary */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Complementary Colour</h3>
                <button
                  className={styles.complementary}
                  onClick={() => copyToClipboard(complementary, "comp")}
                >
                  <span
                    className={styles.compSwatch}
                    style={{ backgroundColor: complementary }}
                  />
                  <span className={styles.compCode}>
                    {complementary.toUpperCase()}
                  </span>
                  {copied === "comp" && (
                    <span className={styles.copiedBadge}>Copied!</span>
                  )}
                </button>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <a
                  href={`https://wa.me/2349036826272?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Enquire on WhatsApp
                </a>
                <a
                  href={`mailto:graviloch@gmail.com?subject=Colour Enquiry: ${colour.name}&body=Hello,%0D%0A%0D%0AI'm interested in the colour "${colour.name}" (${colour.code}, ${colour.hex}) for my project.%0D%0A%0D%0APlease provide more information about pricing and availability.%0D%0A%0D%0AThank you!`}
                  className={styles.emailBtn}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Send Email
                </a>
              </div>

              {/* Professional Tip */}
              <div className={styles.tip}>
                <span className={styles.tipIcon}>💡</span>
                <p>
                  This colour pairs beautifully with{" "}
                  {isLight
                    ? "dark wood tones and charcoal accents"
                    : "white marble and brass fixtures"}{" "}
                  for a sophisticated finish.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
