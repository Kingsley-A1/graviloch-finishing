/**
 * ColourStudio Component
 * ======================
 * Interactive colour picker with search and filtering
 */

"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import ColourCard from "./ColourCard";
import ColourModal from "./ColourModal";
import styles from "./ColourStudio.module.css";

// Comprehensive colour data - organized by family
export const colourData = {
  earthy: {
    name: "Earthy Tones",
    description: "Warm, grounded colours inspired by nature",
    colours: [
      { id: "e1", name: "Tuscan Terracotta", hex: "#C45A3B", code: "GF-E001" },
      { id: "e2", name: "Sienna Earth", hex: "#A0522D", code: "GF-E002" },
      { id: "e3", name: "Burnt Umber", hex: "#8A3324", code: "GF-E003" },
      { id: "e4", name: "Clay Pot", hex: "#B7723A", code: "GF-E004" },
      { id: "e5", name: "Desert Sand", hex: "#D4B896", code: "GF-E005" },
      { id: "e6", name: "Autumn Leaf", hex: "#C97D4C", code: "GF-E006" },
      { id: "e7", name: "Cinnamon Spice", hex: "#A65E2E", code: "GF-E007" },
      { id: "e8", name: "Raw Sienna", hex: "#D68A59", code: "GF-E008" },
      { id: "e9", name: "Ochre Gold", hex: "#C69436", code: "GF-E009" },
      { id: "e10", name: "Bronze Earth", hex: "#8B6914", code: "GF-E010" },
      { id: "e11", name: "Tobacco Brown", hex: "#715E3A", code: "GF-E011" },
      { id: "e12", name: "Rustic Copper", hex: "#B87333", code: "GF-E012" },
      { id: "e13", name: "Warm Taupe", hex: "#9E8B6E", code: "GF-E013" },
      { id: "e14", name: "Saddle Brown", hex: "#8B4513", code: "GF-E014" },
      { id: "e15", name: "Canyon Rock", hex: "#A67B5B", code: "GF-E015" },
    ],
  },
  neutrals: {
    name: "Elegant Neutrals",
    description: "Timeless sophistication for any space",
    colours: [
      { id: "n1", name: "Alabaster White", hex: "#F2EDE6", code: "GF-N001" },
      { id: "n2", name: "Warm Cream", hex: "#F5F0E1", code: "GF-N002" },
      { id: "n3", name: "Soft Linen", hex: "#EDE8DC", code: "GF-N003" },
      { id: "n4", name: "Oyster Shell", hex: "#D9D2C5", code: "GF-N004" },
      { id: "n5", name: "Natural Bone", hex: "#E3DAC9", code: "GF-N005" },
      { id: "n6", name: "Parchment", hex: "#FFFAEC", code: "GF-N006" },
      { id: "n7", name: "Stone Grey", hex: "#9A9A9A", code: "GF-N007" },
      { id: "n8", name: "Dove Feather", hex: "#B5AFA6", code: "GF-N008" },
      { id: "n9", name: "Greige", hex: "#A9A59C", code: "GF-N009" },
      { id: "n10", name: "Fossil Grey", hex: "#8B8680", code: "GF-N010" },
      { id: "n11", name: "Charcoal Mist", hex: "#6B6860", code: "GF-N011" },
      { id: "n12", name: "Shadow Grey", hex: "#4A4A48", code: "GF-N012" },
      { id: "n13", name: "Graphite", hex: "#3A3A3A", code: "GF-N013" },
      { id: "n14", name: "Obsidian", hex: "#1A1A1A", code: "GF-N014" },
      { id: "n15", name: "Pure White", hex: "#FFFFFF", code: "GF-N015" },
    ],
  },
  warm: {
    name: "Warm Palette",
    description: "Cozy and inviting tones",
    colours: [
      { id: "w1", name: "Sunset Coral", hex: "#E8846B", code: "GF-W001" },
      { id: "w2", name: "Peach Blossom", hex: "#FFCBA4", code: "GF-W002" },
      { id: "w3", name: "Apricot Dream", hex: "#FBCEB1", code: "GF-W003" },
      { id: "w4", name: "Rose Quartz", hex: "#E8B4B8", code: "GF-W004" },
      { id: "w5", name: "Blush Pink", hex: "#F4C2C2", code: "GF-W005" },
      { id: "w6", name: "Dusty Rose", hex: "#C4A4A4", code: "GF-W006" },
      { id: "w7", name: "Salmon Pink", hex: "#FA8072", code: "GF-W007" },
      { id: "w8", name: "Coral Reef", hex: "#FF7F50", code: "GF-W008" },
      { id: "w9", name: "Tangerine", hex: "#FF9966", code: "GF-W009" },
      { id: "w10", name: "Amber Glow", hex: "#FFBF00", code: "GF-W010" },
      { id: "w11", name: "Marigold", hex: "#EAA221", code: "GF-W011" },
      { id: "w12", name: "Honey Gold", hex: "#D4A76A", code: "GF-W012" },
      { id: "w13", name: "Warm Sand", hex: "#C9B38C", code: "GF-W013" },
      { id: "w14", name: "Champagne", hex: "#F7E7CE", code: "GF-W014" },
      { id: "w15", name: "Vanilla Cream", hex: "#F3E5AB", code: "GF-W015" },
    ],
  },
  cool: {
    name: "Cool Palette",
    description: "Refreshing and calming hues",
    colours: [
      { id: "c1", name: "Ocean Blue", hex: "#4F94CD", code: "GF-C001" },
      { id: "c2", name: "Sky Azure", hex: "#87CEEB", code: "GF-C002" },
      { id: "c3", name: "Powder Blue", hex: "#B0E0E6", code: "GF-C003" },
      { id: "c4", name: "Steel Blue", hex: "#4682B4", code: "GF-C004" },
      { id: "c5", name: "Navy Depth", hex: "#2C3E50", code: "GF-C005" },
      { id: "c6", name: "Midnight Blue", hex: "#191970", code: "GF-C006" },
      { id: "c7", name: "Sage Green", hex: "#9CAF88", code: "GF-C007" },
      { id: "c8", name: "Eucalyptus", hex: "#7BA898", code: "GF-C008" },
      { id: "c9", name: "Forest Fern", hex: "#4A7C59", code: "GF-C009" },
      { id: "c10", name: "Teal Dream", hex: "#367588", code: "GF-C010" },
      { id: "c11", name: "Seafoam", hex: "#93E9BE", code: "GF-C011" },
      { id: "c12", name: "Mint Fresh", hex: "#98FF98", code: "GF-C012" },
      { id: "c13", name: "Ice Blue", hex: "#D6ECEF", code: "GF-C013" },
      { id: "c14", name: "Glacier Grey", hex: "#C4D4D8", code: "GF-C014" },
      { id: "c15", name: "Aqua Mist", hex: "#7FDBFF", code: "GF-C015" },
    ],
  },
  bold: {
    name: "Bold & Dramatic",
    description: "Statement colours for the adventurous",
    colours: [
      { id: "b1", name: "Crimson Velvet", hex: "#DC143C", code: "GF-B001" },
      { id: "b2", name: "Royal Purple", hex: "#6B3FA0", code: "GF-B002" },
      { id: "b3", name: "Deep Burgundy", hex: "#722F37", code: "GF-B003" },
      { id: "b4", name: "Emerald Jewel", hex: "#046307", code: "GF-B004" },
      { id: "b5", name: "Sapphire Blue", hex: "#0F52BA", code: "GF-B005" },
      { id: "b6", name: "Amethyst", hex: "#9966CC", code: "GF-B006" },
      { id: "b7", name: "Ruby Red", hex: "#9B111E", code: "GF-B007" },
      { id: "b8", name: "Peacock Blue", hex: "#005F69", code: "GF-B008" },
      { id: "b9", name: "Forest Green", hex: "#228B22", code: "GF-B009" },
      { id: "b10", name: "Plum Passion", hex: "#8E4585", code: "GF-B010" },
      { id: "b11", name: "Electric Blue", hex: "#0892D0", code: "GF-B011" },
      { id: "b12", name: "Mustard Gold", hex: "#C49102", code: "GF-B012" },
      { id: "b13", name: "Burnt Orange", hex: "#CC5500", code: "GF-B013" },
      { id: "b14", name: "Wine Red", hex: "#722F37", code: "GF-B014" },
      { id: "b15", name: "Jet Black", hex: "#0A0A0A", code: "GF-B015" },
    ],
  },
  metallics: {
    name: "Metallic Finishes",
    description: "Luxurious shimmer and shine",
    colours: [
      { id: "m1", name: "Champagne Gold", hex: "#D4AF37", code: "GF-M001" },
      { id: "m2", name: "Rose Gold", hex: "#B76E79", code: "GF-M002" },
      { id: "m3", name: "Antique Bronze", hex: "#665D1E", code: "GF-M003" },
      { id: "m4", name: "Brushed Silver", hex: "#C0C0C0", code: "GF-M004" },
      { id: "m5", name: "Copper Penny", hex: "#AD6F69", code: "GF-M005" },
      { id: "m6", name: "Polished Chrome", hex: "#DDD6D0", code: "GF-M006" },
      { id: "m7", name: "Warm Brass", hex: "#B5A642", code: "GF-M007" },
      { id: "m8", name: "Pewter", hex: "#96A8A1", code: "GF-M008" },
      { id: "m9", name: "Iron Ore", hex: "#48484A", code: "GF-M009" },
      { id: "m10", name: "Platinum", hex: "#E5E4E2", code: "GF-M010" },
      { id: "m11", name: "Gilded Gold", hex: "#FFD700", code: "GF-M011" },
      { id: "m12", name: "Aged Copper", hex: "#72411A", code: "GF-M012" },
      { id: "m13", name: "Mercury", hex: "#E9E8E6", code: "GF-M013" },
      { id: "m14", name: "Bronze Leaf", hex: "#CD7F32", code: "GF-M014" },
      { id: "m15", name: "Black Nickel", hex: "#2B2B2B", code: "GF-M015" },
    ],
  },
};

interface ColourStudioProps {
  selectedFamily?: string;
  searchQuery?: string;
}

export default function ColourStudio({
  selectedFamily,
  searchQuery,
}: ColourStudioProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFamily, setActiveFamily] = useState(selectedFamily || "all");
  const [search, setSearch] = useState(searchQuery || "");
  const [selectedColour, setSelectedColour] = useState<null | {
    colour: (typeof colourData.earthy.colours)[0];
    family: string;
  }>(null);

  // Get all colours with family info
  const allColours = useMemo(() => {
    const colours: Array<{
      colour: (typeof colourData.earthy.colours)[0];
      family: string;
      familyName: string;
    }> = [];
    Object.entries(colourData).forEach(([familyKey, family]) => {
      family.colours.forEach((colour) => {
        colours.push({ colour, family: familyKey, familyName: family.name });
      });
    });
    return colours;
  }, []);

  // Filter colours based on family and search
  const filteredColours = useMemo(() => {
    let filtered = allColours;

    if (activeFamily !== "all") {
      filtered = filtered.filter((c) => c.family === activeFamily);
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.colour.name.toLowerCase().includes(searchLower) ||
          c.colour.code.toLowerCase().includes(searchLower) ||
          c.colour.hex.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [allColours, activeFamily, search]);

  // Update URL when family changes
  const handleFamilyChange = (family: string) => {
    setActiveFamily(family);
    const params = new URLSearchParams();
    if (family !== "all") params.set("family", family);
    if (search) params.set("search", search);
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams();
    if (activeFamily !== "all") params.set("family", activeFamily);
    if (value) params.set("search", value);
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <div className={styles.studio}>
      {/* Search & Filters */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search colours by name or code..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          {search && (
            <button
              className={styles.clearSearch}
              onClick={() => handleSearchChange("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className={styles.familyTabs}>
          <button
            className={`${styles.familyTab} ${activeFamily === "all" ? styles.active : ""}`}
            onClick={() => handleFamilyChange("all")}
          >
            All Colours
          </button>
          {Object.entries(colourData).map(([key, family]) => (
            <button
              key={key}
              className={`${styles.familyTab} ${activeFamily === key ? styles.active : ""}`}
              onClick={() => handleFamilyChange(key)}
            >
              {family.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className={styles.resultsInfo}>
        <span className={styles.resultsCount}>
          {filteredColours.length} colours found
        </span>
        {activeFamily !== "all" &&
          colourData[activeFamily as keyof typeof colourData] && (
            <span className={styles.familyDescription}>
              {colourData[activeFamily as keyof typeof colourData].description}
            </span>
          )}
      </div>

      {/* Colour Grid */}
      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {filteredColours.map(({ colour }, index) => (
            <motion.div
              key={colour.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <ColourCard
                colour={colour}
                onClick={() => setSelectedColour({ colour, family: "" })}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredColours.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🎨</div>
          <h3>No colours found</h3>
          <p>Try a different search term or filter</p>
        </div>
      )}

      {/* Colour Modal */}
      <AnimatePresence>
        {selectedColour && (
          <ColourModal
            colour={selectedColour.colour}
            onClose={() => setSelectedColour(null)}
            allColours={filteredColours.map((c) => c.colour)}
            onNavigate={(colour) => setSelectedColour({ colour, family: "" })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
