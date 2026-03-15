import { Metadata } from "next";
import SamplesGrid from "@/components/samples/SamplesGrid";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Samples | GRAVILOCH FINISHING LTD",
  description:
    "Explore our collection of authentic, real-world painting samples including Venetian Plaster, Stucco, Travertino, Metallic, and Microcemento finishes.",
  openGraph: {
    title: "Samples | GRAVILOCH FINISHING",
    description:
      "Explore our collection of real-world Italian decorative painting samples.",
  },
};

export default async function SamplesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentCategory = resolvedSearchParams.category || "All";

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            Our Finishing <span className="text-gold">Samples</span>
          </h1>
          <p className={styles.subtitle}>
            Explore authentic examples of our mastercraft in Italian decorative
            painting. Find the perfect aesthetic for your space and enquire
            directly.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <SamplesGrid initialCategory={currentCategory} />
        </div>
      </section>
    </main>
  );
}
