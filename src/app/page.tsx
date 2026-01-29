/**
 * Home Page
 * =========
 * Main landing page for GRAVILOCH FINISHING.
 */

import {
  WelcomeAnimation,
  HeroSection,
  FeaturedSection,
  ServicesPreview,
  TestimonialPreview,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <WelcomeAnimation />
      <HeroSection />
      <FeaturedSection />
      <ServicesPreview />
      <TestimonialPreview />
    </>
  );
}
