/**
 * FilterBar Component
 * ===================
 * Product filtering and search controls.
 */

"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./FilterBar.module.css";

const categories = [
  { value: "", label: "All Categories" },
  { value: "venetian", label: "Venetian Plaster" },
  { value: "marmorino", label: "Marmorino" },
  { value: "travertino", label: "Travertino" },
  { value: "metallic", label: "Metallic Finishes" },
  { value: "liquid-metal", label: "Liquid Metal" },
  { value: "decorative", label: "Decorative" },
  { value: "specialty", label: "Specialty" },
  { value: "tools", label: "Tools" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "most-viewed", label: "Most Popular" },
  { value: "most-liked", label: "Most Liked" },
];

interface FilterBarProps {
  currentCategory?: string;
  currentSort?: string;
  currentSearch?: string;
}

export default function FilterBar({
  currentCategory = "",
  currentSort = "newest",
  currentSearch = "",
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(currentSearch);

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams();

      if (key === "category" && value) params.set("category", value);
      else if (currentCategory) params.set("category", currentCategory);

      if (key === "sort" && value) params.set("sort", value);
      else if (currentSort && currentSort !== "newest")
        params.set("sort", currentSort);

      if (key === "search" && value) params.set("search", value);
      else if (key !== "search" && currentSearch)
        params.set("search", currentSearch);

      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [router, pathname, currentCategory, currentSort, currentSearch],
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams("search", search);
  };

  const clearFilters = () => {
    setSearch("");
    router.push(pathname);
  };

  const hasFilters =
    currentCategory ||
    currentSearch ||
    (currentSort && currentSort !== "newest");

  return (
    <div className={styles.filterBar}>
      {/* Search */}
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
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
            className={styles.searchInput}
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className={styles.clearSearch}
              onClick={() => {
                setSearch("");
                if (currentSearch) updateParams("search", "");
              }}
              aria-label="Clear search"
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
          )}
        </div>
      </form>

      {/* Filters Row */}
      <div className={styles.filtersRow}>
        {/* Category Filter */}
        <div className={styles.filterGroup}>
          <select
            className={styles.select}
            value={currentCategory}
            onChange={(e) => updateParams("category", e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className={styles.filterGroup}>
          <select
            className={styles.select}
            value={currentSort}
            onChange={(e) => updateParams("sort", e.target.value)}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <button className={styles.clearButton} onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
