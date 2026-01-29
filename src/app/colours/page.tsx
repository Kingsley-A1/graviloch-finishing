/**
 * Colours Page - GRAVILOCH FINISHING COLOUR HUB
 * =============================================
 * A comprehensive colour studio showcasing all painting
 * textures and colours with interactive features.
 */

import { Suspense } from "react";
import type { Metadata } from "next";
import ColourStudio from "@/components/colours/ColourStudio";
import ColourHero from "@/components/colours/ColourHero";
import TextureShowcase from "@/components/colours/TextureShowcase";
import ColourPalettes from "@/components/colours/ColourPalettes";
import { PageLoader } from "@/components/ui/Loader";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Colour Hub | GRAVILOCH FINISHING",
  description:
    "Explore our extensive collection of Italian painting textures and colours. Venetian plaster, Marmorino, metallic finishes, and hundreds of colour options to transform your space.",
  openGraph: {
    title: "Colour Hub | GRAVILOCH FINISHING",
    description:
      "Discover hundreds of luxurious colours and textures for your walls. The ultimate Italian painting colour studio.",
  },
};

interface ColoursPageProps {
  searchParams: Promise<{
    texture?: string;
    family?: string;
    search?: string;
  }>;
}

export default async function ColoursPage({ searchParams }: ColoursPageProps) {
  const params = await searchParams;

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <ColourHero />

      {/* Texture Showcase */}
      <section className={styles.textureSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Explore Textures</span>
            <h2 className={styles.sectionTitle}>
              Italian <span className="text-gold">Craftsmanship</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Each texture tells a story of centuries-old artisanal techniques
            </p>
          </div>
          <Suspense fallback={<PageLoader />}>
            <TextureShowcase activeTexture={params.texture} />
          </Suspense>
        </div>
      </section>

      {/* Colour Studio */}
      <section className={styles.studioSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Colour Studio</span>
            <h2 className={styles.sectionTitle}>
              Find Your Perfect <span className="text-gradient">Shade</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Over 200 curated colours across warm, cool, neutral, and bold
              palettes
            </p>
          </div>
          <Suspense fallback={<PageLoader />}>
            <ColourStudio
              selectedFamily={params.family}
              searchQuery={params.search}
            />
          </Suspense>
        </div>
      </section>

      {/* Curated Palettes */}
      <ColourPalettes />

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Can&apos;t Decide? Let&apos;s{" "}
            <span className="text-gradient">Create Together</span>
          </h2>
          <p className={styles.ctaText}>
            Our colour consultants will help you find the perfect combination
            for your space. Free consultation available.
          </p>
          <div className={styles.ctaButtons}>
            <a
              href={`https://wa.me/2349036826272?text=${encodeURIComponent("Hello GRAVILOCH! I'd like a free colour consultation for my project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book Consultation
            </a>
            <a
              href="mailto:graviloch@gmail.com?subject=Colour%20Consultation%20Request"
              className={styles.ctaSecondary}
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
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
