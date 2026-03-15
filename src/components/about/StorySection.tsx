/**
 * StorySection Component
 * ======================
 * Company story and mission.
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./StorySection.module.css";

export default function StorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Content */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>Who We Are</span>
            <h2 className={styles.title}>
              Passion Meets <span className="text-gradient">Precision</span>
            </h2>
            <p className={styles.text}>
              GRAVILOCH FINISHINGS <span className="text-red">LTD</span> was
              born from a deep passion for Italian decorative arts. As the sole
              distributors of Nikkolor Italian Decorative Paint in Nigeria, we
              bring authentic European finishes to transform Nigerian spaces.
            </p>
            <p className={styles.text}>
              Under the leadership of Mr. Christian N. Ugwu, our team of skilled
              artisans has trained extensively in traditional Italian methods,
              combining centuries-old techniques with modern aesthetics to
              create stunning finishes that transform any space.
            </p>
            <p className={styles.text}>
              From Port Harcourt to Lagos, Abuja, Calabar, and Uyo — we believe
              every wall tells a story. Our mission is to help you write yours
              with elegance, sophistication, and lasting beauty.
            </p>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            className={styles.imageGallery}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.imageCard}>
              <Image
                src="/images/gallery/master-craftman.jpg"
                alt="Master Craftsman"
                fill
                className={styles.image}
                style={{ objectPosition: "center 15%" }}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className={styles.imageCard}>
              <Image
                src="/images/gallery/team-at-work.webp"
                alt="Team at Work"
                fill
                className={styles.image}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className={styles.imageCard}>
              <Image
                src="/images/gallery/paint-craftsmanship.webp"
                alt="Paint Craftsmanship"
                fill
                className={styles.image}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className={styles.imageCard}>
              <Image
                src="/images/gallery/finished_work.jpg"
                alt="Finished Work"
                fill
                className={styles.image}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
