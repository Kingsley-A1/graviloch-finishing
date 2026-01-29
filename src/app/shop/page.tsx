/**
 * Shop Page
 * =========
 * Product catalog with filtering and search.
 */

import { Suspense } from "react";
import type { Metadata } from "next";
import ProductGrid from "@/components/shop/ProductGrid";
import FilterBar from "@/components/shop/FilterBar";
import { PageLoader } from "@/components/ui/Loader";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our collection of premium Italian painting products. Venetian plaster, Marmorino, Travertino, metallic finishes, and professional tools.",
  openGraph: {
    title: "Shop | GRAVILOCH FINISHING",
    description:
      "Browse our collection of premium Italian painting products and finishes.",
  },
};

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            Our <span className="text-gradient">Products</span>
          </h1>
          <p className={styles.subtitle}>
            Premium Italian painting products for stunning wall finishes
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.content}>
        <div className={styles.container}>
          <FilterBar
            currentCategory={params.category}
            currentSort={params.sort}
            currentSearch={params.search}
          />
          <Suspense fallback={<PageLoader />}>
            <ProductGrid
              category={params.category}
              sort={params.sort}
              search={params.search}
              page={params.page ? parseInt(params.page) : 1}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
