"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ColourPalettes.module.css";

interface Palette {
  id: string;
  name: string;
  description: string;
  mood: string;
  colours: string[];
  tags: string[];
}

const palettes: Palette[] = [
  {
    id: "luxe-neutral",
    name: "Luxe Neutral",
    description: "Sophisticated warmth for elegant living spaces",
    mood: "Calm & Refined",
    colours: ["#F5F0E8", "#D4C4B0", "#A89080", "#6B5B4F", "#3D3028"],
    tags: ["Living Room", "Master Bedroom", "Office"],
  },
  {
    id: "mediterranean-dream",
    name: "Mediterranean Dream",
    description: "Sun-kissed coastal vibes with Italian flair",
    mood: "Warm & Inviting",
    colours: ["#FDF6E3", "#E8D4B8", "#C9A66B", "#8B6914", "#5B4A0A"],
    tags: ["Kitchen", "Dining", "Outdoor"],
  },
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    description: "Clean lines and contemporary elegance",
    mood: "Sleek & Timeless",
    colours: ["#FFFFFF", "#E8E8E8", "#B0B0B0", "#505050", "#1A1A1A"],
    tags: ["Bathroom", "Gallery", "Commercial"],
  },
  {
    id: "forest-sanctuary",
    name: "Forest Sanctuary",
    description: "Nature-inspired tranquility for peaceful retreats",
    mood: "Serene & Grounded",
    colours: ["#E8F0E8", "#A8C8A0", "#6B8B6B", "#3D5B3D", "#1F2D1F"],
    tags: ["Spa", "Meditation", "Study"],
  },
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    description: "Warm terracotta tones for cozy atmospheres",
    mood: "Cozy & Vibrant",
    colours: ["#FFF5EB", "#F5D5C8", "#E8A080", "#C86B50", "#8B3D28"],
    tags: ["Restaurant", "Lounge", "Bedroom"],
  },
  {
    id: "royal-opulence",
    name: "Royal Opulence",
    description: "Rich jewel tones for dramatic statement spaces",
    mood: "Bold & Luxurious",
    colours: ["#F0E8F0", "#C8A8C8", "#8B5B8B", "#5B285B", "#2D142D"],
    tags: ["Accent Wall", "Theatre", "VIP Lounge"],
  },
];

export default function ColourPalettes() {
  const [activePalette, setActivePalette] = useState<string | null>(null);
  const [copiedColour, setCopiedColour] = useState<string | null>(null);

  const copyColour = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColour(hex);
    setTimeout(() => setCopiedColour(null), 2000);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.badge}>✨ Curated Collections</span>
          <h2 className={styles.title}>Designer Palettes</h2>
          <p className={styles.description}>
            Professionally curated colour combinations for every design vision.
            Click any colour to copy its hex code.
          </p>
        </motion.div>

        {/* Palettes Grid */}
        <div className={styles.grid}>
          {palettes.map((palette, index) => (
            <motion.div
              key={palette.id}
              className={`${styles.card} ${activePalette === palette.id ? styles.active : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setActivePalette(palette.id)}
              onMouseLeave={() => setActivePalette(null)}
            >
              {/* Colour Strip */}
              <div className={styles.colourStrip}>
                {palette.colours.map((colour, i) => (
                  <motion.button
                    key={i}
                    className={styles.colourSwatch}
                    style={{ backgroundColor: colour }}
                    onClick={() => copyColour(colour)}
                    whileHover={{ flex: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {copiedColour === colour && (
                      <span className={styles.copiedToast}>Copied!</span>
                    )}
                    <span className={styles.hexTooltip}>{colour}</span>
                  </motion.button>
                ))}
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.paletteName}>{palette.name}</h3>
                  <span className={styles.mood}>{palette.mood}</span>
                </div>
                <p className={styles.paletteDesc}>{palette.description}</p>
                <div className={styles.tags}>
                  {palette.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Action */}
              <a
                href={`https://wa.me/2349036826272?text=${encodeURIComponent(`Hi! I'm interested in the "${palette.name}" palette for my ${palette.tags[0].toLowerCase()}. Can you help me bring this vision to life?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.consultBtn}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consult for this palette
              </a>
            </motion.div>
          ))}
        </div>

        {/* Custom Palette CTA */}
        <motion.div
          className={styles.customCta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.ctaContent}>
            <h3>Need a Custom Palette?</h3>
            <p>
              Our colour experts can create a bespoke palette tailored to your
              unique vision and space.
            </p>
          </div>
          <a
            href="https://wa.me/2349036826272?text=Hello!%20I%20need%20a%20custom%20colour%20palette%20designed%20for%20my%20project.%20Can%20you%20help?"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            Get Custom Palette
          </a>
        </motion.div>
      </div>
    </section>
  );
}
