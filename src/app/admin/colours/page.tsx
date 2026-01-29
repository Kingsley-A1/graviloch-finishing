/**
 * Admin Colours Page
 * ==================
 * Manage colour collections and palettes.
 */

"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";

// Import the colour data from the ColourStudio component
const colourData = {
  earthy: [
    { id: "e1", name: "Tuscan Terracotta", hex: "#CC6B49", code: "GF-E101" },
    { id: "e2", name: "Sienna Earth", hex: "#A0522D", code: "GF-E102" },
    { id: "e3", name: "Burnt Umber", hex: "#8A3324", code: "GF-E103" },
    { id: "e4", name: "Clay Pot", hex: "#B66A50", code: "GF-E104" },
    { id: "e5", name: "Venetian Rust", hex: "#9B3D12", code: "GF-E105" },
    { id: "e6", name: "Sahara Sand", hex: "#D4A574", code: "GF-E106" },
    { id: "e7", name: "Desert Dune", hex: "#C2956E", code: "GF-E107" },
    { id: "e8", name: "Caramel Bronze", hex: "#8B5A2B", code: "GF-E108" },
    { id: "e9", name: "Olive Grove", hex: "#6B7B3D", code: "GF-E109" },
    { id: "e10", name: "Forest Floor", hex: "#5C4033", code: "GF-E110" },
    { id: "e11", name: "Autumn Leaf", hex: "#C45C26", code: "GF-E111" },
    { id: "e12", name: "Cocoa Bean", hex: "#4A3C31", code: "GF-E112" },
    { id: "e13", name: "Tobacco Leaf", hex: "#6B5344", code: "GF-E113" },
    { id: "e14", name: "Espresso", hex: "#3C2415", code: "GF-E114" },
    { id: "e15", name: "Walnut Shell", hex: "#5D4037", code: "GF-E115" },
  ],
  neutrals: [
    { id: "n1", name: "Alabaster White", hex: "#F2F0EB", code: "GF-N201" },
    { id: "n2", name: "Warm Cream", hex: "#F5F0E1", code: "GF-N202" },
    { id: "n3", name: "Stone Grey", hex: "#928E85", code: "GF-N203" },
    { id: "n4", name: "Dove Feather", hex: "#B5AFA6", code: "GF-N204" },
    { id: "n5", name: "Greige", hex: "#A9A390", code: "GF-N205" },
    { id: "n6", name: "Mushroom", hex: "#9C8B7D", code: "GF-N206" },
    { id: "n7", name: "Pebble Beach", hex: "#BDB5AA", code: "GF-N207" },
    { id: "n8", name: "Charcoal Mist", hex: "#4F5459", code: "GF-N208" },
    { id: "n9", name: "Smoke", hex: "#6B6B6B", code: "GF-N209" },
    { id: "n10", name: "Graphite", hex: "#383838", code: "GF-N210" },
    { id: "n11", name: "Limestone", hex: "#D4CFC5", code: "GF-N211" },
    { id: "n12", name: "Oyster Shell", hex: "#DED5C4", code: "GF-N212" },
    { id: "n13", name: "Linen White", hex: "#FAF0E6", code: "GF-N213" },
    { id: "n14", name: "Silver Sage", hex: "#A8B5A3", code: "GF-N214" },
    { id: "n15", name: "Pewter", hex: "#8E9196", code: "GF-N215" },
  ],
  warm: [
    { id: "w1", name: "Sunset Coral", hex: "#E07B54", code: "GF-W301" },
    { id: "w2", name: "Peach Blossom", hex: "#F8B4A4", code: "GF-W302" },
    { id: "w3", name: "Rose Quartz", hex: "#E8B4B8", code: "GF-W303" },
    { id: "w4", name: "Blush Pink", hex: "#DE8AA0", code: "GF-W304" },
    { id: "w5", name: "Dusty Rose", hex: "#D4A5A5", code: "GF-W305" },
    { id: "w6", name: "Apricot Dream", hex: "#F9C89B", code: "GF-W306" },
    { id: "w7", name: "Golden Honey", hex: "#E5A03D", code: "GF-W307" },
    { id: "w8", name: "Amber Glow", hex: "#D4A04A", code: "GF-W308" },
    { id: "w9", name: "Marigold", hex: "#EAA221", code: "GF-W309" },
    { id: "w10", name: "Butterscotch", hex: "#D99E5F", code: "GF-W310" },
    { id: "w11", name: "Warm Cinnamon", hex: "#C87137", code: "GF-W311" },
    { id: "w12", name: "Copper Penny", hex: "#B87333", code: "GF-W312" },
    { id: "w13", name: "Salmon Pink", hex: "#F0A090", code: "GF-W313" },
    { id: "w14", name: "Terra Rosa", hex: "#CB6D4F", code: "GF-W314" },
    { id: "w15", name: "Paprika", hex: "#BB4430", code: "GF-W315" },
  ],
  cool: [
    { id: "c1", name: "Ocean Blue", hex: "#4A7C94", code: "GF-C401" },
    { id: "c2", name: "Sage Green", hex: "#87A68F", code: "GF-C402" },
    { id: "c3", name: "Teal Dream", hex: "#367588", code: "GF-C403" },
    { id: "c4", name: "Seafoam", hex: "#78CDD7", code: "GF-C404" },
    { id: "c5", name: "Eucalyptus", hex: "#5D8A66", code: "GF-C405" },
    { id: "c6", name: "Mint Fresh", hex: "#98D4C5", code: "GF-C406" },
    { id: "c7", name: "Slate Blue", hex: "#6A8EAE", code: "GF-C407" },
    { id: "c8", name: "Stormy Sea", hex: "#4B6584", code: "GF-C408" },
    { id: "c9", name: "Glacier Ice", hex: "#A7C7E7", code: "GF-C409" },
    { id: "c10", name: "Misty Lake", hex: "#9CB4CC", code: "GF-C410" },
    { id: "c11", name: "Forest Pine", hex: "#2D5A3D", code: "GF-C411" },
    { id: "c12", name: "Deep Teal", hex: "#1F4E5F", code: "GF-C412" },
    { id: "c13", name: "Navy Depth", hex: "#1E3A5F", code: "GF-C413" },
    { id: "c14", name: "Aquamarine", hex: "#7FDBDA", code: "GF-C414" },
    { id: "c15", name: "Jade Garden", hex: "#469B77", code: "GF-C415" },
  ],
  bold: [
    { id: "b1", name: "Crimson Velvet", hex: "#9B2335", code: "GF-B501" },
    { id: "b2", name: "Royal Purple", hex: "#6B3FA0", code: "GF-B502" },
    { id: "b3", name: "Emerald Jewel", hex: "#287D4D", code: "GF-B503" },
    { id: "b4", name: "Sapphire Night", hex: "#0F4C81", code: "GF-B504" },
    { id: "b5", name: "Midnight Black", hex: "#1A1A1A", code: "GF-B505" },
    { id: "b6", name: "Burgundy Wine", hex: "#722F37", code: "GF-B506" },
    { id: "b7", name: "Plum Perfect", hex: "#673147", code: "GF-B507" },
    { id: "b8", name: "Forest Emerald", hex: "#1A4D2E", code: "GF-B508" },
    { id: "b9", name: "Electric Blue", hex: "#0066CC", code: "GF-B509" },
    { id: "b10", name: "Tangerine Pop", hex: "#E85D04", code: "GF-B510" },
    { id: "b11", name: "Fuchsia Shock", hex: "#C41E7C", code: "GF-B511" },
    { id: "b12", name: "Lime Zest", hex: "#84CC16", code: "GF-B512" },
    { id: "b13", name: "Turquoise Bright", hex: "#00B5AD", code: "GF-B513" },
    { id: "b14", name: "Mauve Luxe", hex: "#8B5CF6", code: "GF-B514" },
    { id: "b15", name: "Cherry Red", hex: "#C41E3A", code: "GF-B515" },
  ],
  metallics: [
    { id: "m1", name: "Champagne Gold", hex: "#D4AF37", code: "GF-M601" },
    { id: "m2", name: "Rose Gold", hex: "#B76E79", code: "GF-M602" },
    { id: "m3", name: "Antique Bronze", hex: "#6B5344", code: "GF-M603" },
    { id: "m4", name: "Silver Shimmer", hex: "#C0C0C0", code: "GF-M604" },
    { id: "m5", name: "Copper Patina", hex: "#B87333", code: "GF-M605" },
    { id: "m6", name: "Pearl White", hex: "#F5F5F5", code: "GF-M606" },
    { id: "m7", name: "Brushed Nickel", hex: "#9A9A9A", code: "GF-M607" },
    { id: "m8", name: "Aged Brass", hex: "#B5A642", code: "GF-M608" },
    { id: "m9", name: "Platinum Ice", hex: "#E5E4E2", code: "GF-M609" },
    { id: "m10", name: "Bronzed Copper", hex: "#8D5524", code: "GF-M610" },
    { id: "m11", name: "Golden Sand", hex: "#E6BE8A", code: "GF-M611" },
    { id: "m12", name: "Mercury", hex: "#8B8B8B", code: "GF-M612" },
    { id: "m13", name: "Iron Ore", hex: "#52504A", code: "GF-M613" },
    { id: "m14", name: "Oxidized Copper", hex: "#4A7B6F", code: "GF-M614" },
    { id: "m15", name: "Chrome Steel", hex: "#A0A0A0", code: "GF-M615" },
  ],
};

interface Colour {
  id: string;
  name: string;
  hex: string;
  code: string;
}

const familyLabels: Record<string, string> = {
  earthy: "Earthy Tones",
  neutrals: "Neutral Collection",
  warm: "Warm Palette",
  cool: "Cool Shades",
  bold: "Bold & Vibrant",
  metallics: "Metallic Finishes",
};

export default function AdminColoursPage() {
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColour, setSelectedColour] = useState<Colour | null>(null);

  const allColours = useMemo(() => {
    return Object.entries(colourData).flatMap(([family, colours]) =>
      colours.map((c) => ({ ...c, family })),
    );
  }, []);

  const filteredColours = useMemo(() => {
    let colours = allColours;

    if (selectedFamily !== "all") {
      colours = colours.filter((c) => c.family === selectedFamily);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      colours = colours.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.code.toLowerCase().includes(query) ||
          c.hex.toLowerCase().includes(query),
      );
    }

    return colours;
  }, [allColours, selectedFamily, searchQuery]);

  const stats = useMemo(
    () => ({
      total: allColours.length,
      families: Object.keys(colourData).length,
      mostPopular: "Alabaster White",
      newest: "Champagne Gold",
    }),
    [allColours],
  );

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={styles.titleIcon}
            >
              <circle cx="13.5" cy="6.5" r="2.5" />
              <circle cx="6.5" cy="13.5" r="2.5" />
              <circle cx="17.5" cy="17.5" r="2.5" />
              <path d="M8 9.5L14 4M6.5 16.5L16 8M11.5 18.5L17.5 12" />
            </svg>
            Colour Management
          </h1>
          <p className={styles.subtitle}>
            Manage your colour collections and palettes
          </p>
        </div>
        <button className={styles.addButton}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Colour
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "rgba(212, 175, 55, 0.15)", color: "#D4AF37" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total Colours</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "rgba(59, 130, 246, 0.15)", color: "#3B82F6" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats.families}</span>
            <span className={styles.statLabel}>Colour Families</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10B981" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats.mostPopular}</span>
            <span className={styles.statLabel}>Most Popular</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "rgba(168, 85, 247, 0.15)", color: "#A855F7" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats.newest}</span>
            <span className={styles.statLabel}>Newest Addition</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search colours by name, code, or hex..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className={styles.familySelect}
          value={selectedFamily}
          onChange={(e) => setSelectedFamily(e.target.value)}
        >
          <option value="all">All Families</option>
          {Object.entries(familyLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Colour Grid */}
      <div className={styles.gridContainer}>
        <div className={styles.gridHeader}>
          <span className={styles.gridTitle}>
            {selectedFamily === "all"
              ? "All Colours"
              : familyLabels[selectedFamily]}
          </span>
          <span className={styles.gridCount}>
            {filteredColours.length} colours
          </span>
        </div>
        <div className={styles.colourGrid}>
          {filteredColours.map((colour, index) => (
            <motion.div
              key={colour.id}
              className={`${styles.colourCard} ${selectedColour?.id === colour.id ? styles.selected : ""}`}
              onClick={() => setSelectedColour(colour)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.01 }}
            >
              <div
                className={styles.colourSwatch}
                style={{ backgroundColor: colour.hex }}
              />
              <div className={styles.colourInfo}>
                <span className={styles.colourName}>{colour.name}</span>
                <div className={styles.colourMeta}>
                  <span className={styles.colourCode}>{colour.code}</span>
                  <span className={styles.colourHex}>{colour.hex}</span>
                </div>
              </div>
              <div className={styles.colourActions}>
                <button className={styles.actionBtn} title="Edit">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button className={styles.actionBtn} title="Delete">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Colour Preview Panel */}
      {selectedColour && (
        <motion.div
          className={styles.previewPanel}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            className={styles.closePreview}
            onClick={() => setSelectedColour(null)}
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
          <div
            className={styles.previewSwatch}
            style={{ backgroundColor: selectedColour.hex }}
          />
          <div className={styles.previewInfo}>
            <h3 className={styles.previewName}>{selectedColour.name}</h3>
            <div className={styles.previewDetails}>
              <div className={styles.previewItem}>
                <span className={styles.previewLabel}>Code</span>
                <span className={styles.previewValue}>
                  {selectedColour.code}
                </span>
              </div>
              <div className={styles.previewItem}>
                <span className={styles.previewLabel}>HEX</span>
                <span className={styles.previewValue}>
                  {selectedColour.hex}
                </span>
              </div>
            </div>
            <div className={styles.previewActions}>
              <button className={styles.editBtn}>Edit Colour</button>
              <button className={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
