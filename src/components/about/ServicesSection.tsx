/**
 * ServicesSection Component
 * =========================
 * All painting services list.
 */

"use client";

import { motion } from "framer-motion";
import styles from "./ServicesSection.module.css";

const services = [
  {
    title: "Venetian Plaster",
    description:
      "Luxurious polished marble effect with depth and luminosity. Multiple layers create a stunning, mirror-like finish.",
    image: "/images/hero/venetian-living-room.webp",
    features: [
      "High gloss finish",
      "Natural marble effect",
      "Moisture resistant",
    ],
  },
  {
    title: "Marmorino",
    description:
      "Classic Italian technique creating elegant stone-like textures. Perfect for both modern and traditional spaces.",
    image: "/images/hero/marmorino-dining.webp",
    features: ["Matte or polished", "Durable finish", "Timeless elegance"],
  },
  {
    title: "Travertino",
    description:
      "Authentic travertine stone appearance with natural depth and character. Ideal for feature walls.",
    image: "/images/hero/travertino-office.webp",
    features: ["Stone texture", "Natural look", "High durability"],
  },
  {
    title: "Metallic Finishes",
    description:
      "Stunning metallic effects from subtle shimmer to bold statement pieces. Gold, silver, copper, and custom colors.",
    image: "/images/hero/metallic-finish-lobby.webp",
    features: ["Custom colors", "Light-catching", "Modern aesthetic"],
  },
  {
    title: "Liquid Metal",
    description:
      "Real metal coatings that patina naturally over time. Create truly unique, living surfaces.",
    image: "/images/about/paint-craftsmanship.webp",
    features: ["Real metal", "Natural aging", "One-of-a-kind"],
  },
  {
    title: "Decorative Painting",
    description:
      "Custom murals, faux finishes, and artistic treatments. Let your imagination come to life.",
    image: "/images/about/team-at-work.webp",
    features: ["Custom designs", "Artistic flair", "Personalized"],
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.label}>What We Offer</span>
          <h2 className={styles.title}>
            Our <span className="text-gold">Services</span>
          </h2>
          <p className={styles.subtitle}>
            From classic Italian plaster to modern metallic finishes, we offer a
            complete range of decorative painting services.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className={styles.cardOverlay} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <ul className={styles.features}>
                  {service.features.map((feature) => (
                    <li key={feature} className={styles.feature}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
