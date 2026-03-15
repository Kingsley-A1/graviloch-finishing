/**
 * ServicesPreview Component
 * =========================
 * Services overview with icons.
 */

"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import styles from "./ServicesPreview.module.css";

const services = [
  {
    id: "venetian",
    image: "/images/services/service_icon_venetian_1773340652620.png",
    title: "Venetian Plaster",
    description: "Classic Italian polished marble-like walls with depth and luminosity.",
    longDescription: "Our signature Venetian Plaster offers an unparalleled, glassy finish that mimics genuine marble. Applying multiple thin coats of this fine lime putty creates an illusion of depth and texture, culminating in a sophisticated, luminous wall surface that breathes life into any luxury space.",
  },
  {
    id: "stucco",
    image: "/images/services/service_icon_stucco_1773340687410.png",
    title: "Stucco",
    description: "Brilliant white finishes with premium natural texture and beauty.",
    longDescription: "Elevate your interior with our masterful Stucco applications. Whether you desire a sleek, sharp, modern aesthetic or a textured, rustic charm, our stucco is tailored to provide exceptional durability, breathability, and a timeless visual impact.",
  },
  {
    id: "travertino",
    image: "/images/services/service_icon_travertino_1773340712315.png",
    title: "Travertino",
    description: "Roman-inspired stone effect bringing ancient elegance to modern spaces.",
    longDescription: "Drawing inspiration from the monumental architecture of ancient Rome, Travertino delivers a porous, natural stone effect. It is perfect for both interiors and exteriors, bringing a robust, earthy elegance that grounds your design scheme.",
  },
  {
    id: "metallic",
    image: "/images/services/service_icon_metallic_1773340755437.png",
    title: "Metallic Finishes",
    description: "Stunning shimmer effects in gold, silver, copper, and bronze tones.",
    longDescription: "Make a striking statement with our Metallic Finishes. Designed to catch and reflect light, these opulent coatings add drama to focal walls. Choose from antiqued bronze, radiant gold, or cool silver to introduce a touch of undeniable luxury.",
  },
  {
    id: "decorative",
    image: "/images/services/service_icon_decorative_1773340783792.png",
    title: "Decorative Effects",
    description: "Custom artistic textures and patterns for unique statement walls.",
    longDescription: "Our Decorative Effects service is where imagination meets craftsmanship. We blend specialized materials, glazes, and artistic techniques to craft entirely distinct, one-of-a-kind patterns, creating walls that double as magnificent canvases of art.",
  },
  {
    id: "consultation",
    image: "/images/services/service_icon_consultation_1773340804271.png",
    title: "Free Consultation",
    description: "Expert advice to help you choose the perfect finish for your space.",
    longDescription: "Unsure which finish complements your vision? Our master decorators offer personalized, commitment-free consultations. We will guide you through our extensive portfolio of techniques to ensure your final choice perfectly aligns with your architectural aesthetics.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ServicesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            What We <span className="text-gold">Offer</span>
          </h2>
          <p className={styles.subtitle}>
            Comprehensive Italian painting services tailored to bring your
            vision to life.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className={styles.card}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setSelectedService(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedService(service);
                }
              }}
            >
              <div className={styles.iconWrapper}>
                <Image src={service.image} alt={service.title} width={36} height={36} className={styles.categoryImage} />
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.modalOverlay}
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={styles.modalContent}
              >
                <button
                  className={styles.modalClose}
                  onClick={() => setSelectedService(null)}
                  aria-label="Close modal"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
                
                <div className={styles.modalHeader}>
                  <div className={styles.modalIconWrapper}>
                    <Image src={selectedService.image} alt={selectedService.title} width={48} height={48} className={styles.modalImage} />
                  </div>
                  <h3 className={styles.modalTitle}>{selectedService.title}</h3>
                </div>
                
                <div className={styles.modalBody}>
                  <p className={styles.modalDescription}>{selectedService.longDescription}</p>
                </div>
                
                <div className={styles.modalActions}>
                  <Link href="/contact" className={styles.primaryBtn} onClick={() => setSelectedService(null)}>
                    Get a Quote
                  </Link>
                  <Link href="/gallery" className={styles.secondaryBtn} onClick={() => setSelectedService(null)}>
                    View Gallery
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link href="/about" className={styles.ctaButton}>
            Learn More About Our Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
