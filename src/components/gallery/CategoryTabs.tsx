/**
 * CategoryTabs Component
 * ======================
 * Category filter tabs for gallery.
 */

"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./CategoryTabs.module.css";

const categories = [
  { value: "", label: "All" },
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "living-room", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "dining", label: "Dining" },
  { value: "office", label: "Office" },
  { value: "commercial", label: "Commercial" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "most-viewed", label: "Most Viewed" },
  { value: "most-liked", label: "Most Liked" },
];

interface CategoryTabsProps {
  currentCategory?: string;
  currentSort?: string;
}

export default function CategoryTabs({
  currentCategory = "",
  currentSort = "newest",
}: CategoryTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      {/* Category Tabs */}
      <div className={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`${styles.tab} ${
              currentCategory === cat.value ? styles.active : ""
            }`}
            onClick={() => handleCategoryChange(cat.value)}
          >
            {cat.label}
            {currentCategory === cat.value && (
              <motion.span
                className={styles.activeIndicator}
                layoutId="categoryIndicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className={styles.sort}>
        <label htmlFor="sort" className={styles.sortLabel}>
          Sort:
        </label>
        <select
          id="sort"
          className={styles.sortSelect}
          value={currentSort}
          onChange={handleSortChange}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
