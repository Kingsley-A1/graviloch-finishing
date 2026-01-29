/**
 * About Page
 * ==========
 * Company story, services, and values.
 */

import type { Metadata } from "next";
import HeroAbout from "@/components/about/HeroAbout";
import StorySection from "@/components/about/StorySection";
import ServicesSection from "@/components/about/ServicesSection";
import ProcessSection from "@/components/about/ProcessSection";
import CTASection from "@/components/about/CTASection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about GRAVILOCH FINISHING - Nigeria's premier Italian painting company. Our story, services, and commitment to excellence.",
  openGraph: {
    title: "About | GRAVILOCH FINISHING",
    description:
      "Nigeria's premier Italian painting company. Crafting elegance since day one.",
  },
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <HeroAbout />
      <StorySection />
      <ServicesSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
}
