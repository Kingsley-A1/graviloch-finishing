/**
 * Gallery Page
 * ============
 * Masonry gallery showcasing painting work.
 */

import { Suspense } from "react";
import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CategoryTabs from "@/components/gallery/CategoryTabs";
import { PageLoader } from "@/components/ui/Loader";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore our portfolio of stunning Italian painting finishes. Venetian plaster, Marmorino, metallic effects, and more.",
  openGraph: {
    title: "Gallery | GRAVILOCH FINISHING",
    description:
      "Explore our portfolio of stunning Italian painting finishes and transformations.",
  },
};

interface GalleryPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            Our <span className="text-gold">Gallery</span>
          </h1>
          <p className={styles.subtitle}>
            Discover the artistry behind every transformation
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className={styles.filters}>
        <div className={styles.container}>
          <CategoryTabs
            currentCategory={params.category}
            currentSort={params.sort}
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className={styles.content}>
        <div className={styles.container}>
          <Suspense fallback={<PageLoader />}>
            <GalleryGrid category={params.category} sort={params.sort} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
