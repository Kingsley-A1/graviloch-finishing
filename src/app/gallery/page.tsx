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
    "Explore our portfolio of stunning Italian painting finishes. Venetian plaster, Stucco, metallic effects, and more.",
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

      {/* Finished Work Videos Section */}
      <section className={styles.videoSection}>
        <div className={styles.container}>
          <div className={styles.videoHeader}>
            <h2 className={styles.videoTitle}>
              Finished <span className="text-gold">Work Videos</span>
            </h2>
            <p className={styles.videoSubtitle}>
              Experience our craftsmanship in motion.
            </p>
          </div>
          <div className={styles.videoGrid}>
            <div className={styles.videoWrapper}>
              <video
                src="/Castle-finished-work.mp4"
                controls
                preload="metadata"
                className={styles.videoPlayer}
                poster="/images/gallery/finished_work.jpg"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
