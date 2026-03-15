"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Sample, SampleCategoryEnum } from "@/types";
import { generateGalleryInquiryUrl } from "@/lib/whatsapp";
import styles from "./SamplesGrid.module.css";
import { motion, AnimatePresence } from "framer-motion";

// Re-use WhatsApp icon SVG internally
const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.659-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const allCategories = ["All", ...SampleCategoryEnum.options];

// Utility to format category label
const formatCategory = (cat: string) => {
  if (cat === "All") return "All";
  if (cat === "liquid-metal") return "Liquid Metal";
  return cat.charAt(0).toUpperCase() + cat.slice(1);
};

export default function SamplesGrid({
  initialCategory = "All",
}: {
  initialCategory?: string;
}) {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedSample) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedSample]);

  const fetchSamples = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url =
        category !== "All"
          ? `/api/samples?category=${category}`
          : "/api/samples";

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setSamples(data.data);
      } else {
        setError(data.error || "Failed to load samples");
      }
    } catch (err) {
      console.error("Error fetching samples:", err);
      setError("Failed to load samples. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchSamples();
  }, [fetchSamples]);

  const handleEnquire = (sample: Sample) => {
    // Generate specialized gallery/sample enquiry text for WhatsApp
    const url = generateGalleryInquiryUrl(sample.title, sample.category);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Category Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`${styles.tab} ${
                category === cat ? styles.activeTab : ""
              }`}
            >
              {formatCategory(cat)}
              {category === cat && (
                <motion.span
                  className={styles.activeIndicator}
                  layoutId="categoryIndicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchSamples}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      ) : samples.length === 0 ? (
        <motion.div
          className="text-center py-24 px-6 relative rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Luxurious Dark Background with Gradient Accent */}
          <div className="absolute inset-0 bg-[#0A0A0A] border border-[#2a2a2a] rounded-2xl -z-10"></div>
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#f5d061] to-transparent opacity-50"></div>

          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#10B981]/20 to-transparent flex items-center justify-center border border-[#10B981]/30 relative overflow-hidden">
              {/* Elegant Inner Glow */}
              <div className="absolute inset-0 bg-[#10B981] opacity-10 blur-xl"></div>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-[#f5d061] relative z-10"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-wide">
            Curating New{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5d061] to-[#f9e596]">
              Masterpieces
            </span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            Our artisans are currently preparing new exquisite Italian finishes
            for this collection. Check back shortly to explore the next
            generation of our luxury stucco craftsmanship.
          </p>

          <button
            onClick={fetchSamples}
            className="inline-flex items-center px-8 py-3 bg-transparent border border-[#f5d061]/50 text-[#f5d061] rounded-md hover:bg-[#f5d061]/10 transition-colors uppercase tracking-wider text-sm font-semibold"
          >
            Refresh Collection
          </button>
        </motion.div>
      ) : (
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {samples.map((sample) => (
              <motion.div
                key={sample.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`${styles.card} cursor-pointer`}
                onClick={() => setSelectedSample(sample)}
              >
                <div className={styles.imageWrapper}>
                  <div className={styles.categoryBadge}>
                    {formatCategory(sample.category)}
                  </div>
                  <Image
                    src={sample.imageUrl}
                    alt={sample.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{sample.title}</h3>
                  {sample.description && (
                    <p className={styles.description}>{sample.description}</p>
                  )}
                  <div className={styles.ctaWrapper}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnquire(sample);
                      }}
                      className={styles.enquireBtn}
                      aria-label={`Enquire about ${sample.title} on WhatsApp`}
                    >
                      <WhatsAppIcon />
                      Enquire on WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedSample && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSample(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.modalClose}
                onClick={() => setSelectedSample(null)}
                aria-label="Close modal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className={styles.modalImageWrapper}>
                <Image
                  src={selectedSample.imageUrl}
                  alt={selectedSample.title}
                  fill
                  className={styles.modalImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className={styles.modalDetails}>
                <span className={styles.modalCategory}>
                  {formatCategory(selectedSample.category)}
                </span>
                <h2 className={styles.modalTitle}>{selectedSample.title}</h2>
                <p className={styles.modalDescription}>
                  {selectedSample.description ||
                    "Experience the luxurious texture and unparalleled finish of our mastercraft Italian decorative painting."}
                </p>

                <div
                  className={styles.ctaWrapper}
                  style={{ marginTop: "auto", width: "100%" }}
                >
                  <button
                    onClick={() => {
                      handleEnquire(selectedSample);
                    }}
                    className={styles.enquireBtn}
                    style={{ fontSize: "1rem", padding: "1rem" }}
                  >
                    <WhatsAppIcon />
                    Enquire on WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
