/**
 * Admin Gallery Page
 * ==================
 * Manage gallery images.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button, Modal } from "@/components/ui";
import styles from "./page.module.css";

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  featured: boolean;
  createdAt: string;
}

const categories = [
  "All",
  "Venetian Plaster",
  "Marmorino",
  "Stucco",
  "Custom Projects",
  "Exterior Work",
];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "Venetian Plaster",
    featured: false,
  });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const filteredImages =
    filter === "All" ? images : images.filter((img) => img.category === filter);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    setUploading(true);

    try {
      // Upload image
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("folder", "gallery");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      const { url } = await uploadRes.json();

      // Create gallery entry
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...uploadForm,
          imageUrl: url,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setUploadForm({
          title: "",
          category: "Venetian Plaster",
          featured: false,
        });
        setUploadFile(null);
        fetchImages();
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Gallery</h1>
          <p className={styles.subtitle}>Manage your portfolio images</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>Upload Image</Button>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`${styles.filterBtn} ${filter === cat ? styles.active : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className={styles.loading}>Loading images...</div>
      ) : filteredImages.length === 0 ? (
        <div className={styles.empty}>
          <p>No images in this category.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredImages.map((image) => (
            <div key={image.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                {image.featured && (
                  <span className={styles.featuredBadge}>Featured</span>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{image.title}</h3>
                <span className={styles.cardCategory}>{image.category}</span>
              </div>
              <div className={styles.cardActions}>
                <button
                  onClick={() => handleDelete(image.id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Upload Gallery Image"
      >
        <form onSubmit={handleUpload} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className={styles.fileInput}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              value={uploadForm.title}
              onChange={(e) =>
                setUploadForm({ ...uploadForm, title: e.target.value })
              }
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <select
              value={uploadForm.category}
              onChange={(e) =>
                setUploadForm({ ...uploadForm, category: e.target.value })
              }
              className={styles.select}
            >
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="featured"
              checked={uploadForm.featured}
              onChange={(e) =>
                setUploadForm({ ...uploadForm, featured: e.target.checked })
              }
            />
            <label htmlFor="featured">Featured Image</label>
          </div>

          <div className={styles.formActions}>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={uploading || !uploadFile}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
