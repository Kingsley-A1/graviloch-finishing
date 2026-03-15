"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Sample, SampleCategoryEnum } from "@/types";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import styles from "./page.module.css";

const categories = SampleCategoryEnum.options;

export default function AdminSamplesPage() {
  const { showToast } = useToast();
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filter state
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    category: categories[0] as string,
  });

  const fetchSamples = useCallback(async () => {
    try {
      setLoading(true);
      const url =
        categoryFilter === "All"
          ? "/api/samples?admin=true"
          : `/api/samples?admin=true&category=${categoryFilter}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setSamples(data.data);
      } else {
        setError(data.error || "Failed to load samples");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while loading samples");
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    fetchSamples();
  }, [fetchSamples]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        showToast("File size expands 10MB limit.", "error");
        return;
      }

      setFile(selectedFile);
      // Create preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      // 1. Upload file to R2
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "samples");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadDataResult = await uploadRes.json();
      if (!uploadDataResult.success) {
        throw new Error(uploadDataResult.error || "Upload failed");
      }
      const url = uploadDataResult.data.url;

      // 2. Save sample to database
      const dbRes = await fetch("/api/samples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: uploadData.title,
          description: uploadData.description,
          category: uploadData.category,
          imageUrl: url,
          isAvailable: true,
        }),
      });

      const data = await dbRes.json();
      if (data.success) {
        showToast("Sample uploaded successfully", "success");
        setIsUploadModalOpen(false);
        // Reset form
        setFile(null);
        setPreviewUrl(null);
        setUploadData({
          title: "",
          description: "",
          category: categories[0] as string,
        });
        fetchSamples(); // refresh
      } else {
        throw new Error(data.error || "Failed to save sample");
      }
    } catch (err) {
      console.error(err);
      showToast(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this sample?")) return;

    try {
      const res = await fetch(`/api/samples/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        showToast("Sample deleted successfully", "success");
        fetchSamples();
      } else {
        throw new Error(data.error || "Failed to delete sample");
      }
    } catch (err) {
      console.error(err);
      showToast(err instanceof Error ? err.message : "Delete failed", "error");
    }
  };

  const toggleAvailability = async (sample: Sample) => {
    try {
      const res = await fetch(`/api/samples/${sample.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: sample.title,
          category: sample.category,
          imageUrl: sample.imageUrl,
          isAvailable: !sample.isAvailable, // toggle
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Sample marked as ${data.data.isAvailable ? "Available" : "Hidden"}`, "success");
        fetchSamples();
      } else {
        throw new Error(data.error || "Failed to update sample");
      }
    } catch (err) {
      console.error(err);
      showToast(err instanceof Error ? err.message : "Update failed", "error");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <h1 className={styles.pageTitle}>Samples</h1>
          <p className={styles.pageDescription}>
            Manage your real-world painting samples displayed to customers.
          </p>
        </div>
        <button
          className={styles.uploadButton}
          onClick={() => setIsUploadModalOpen(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Upload Sample
        </button>
      </header>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search samples..."
            className={styles.searchInput}
            disabled // Search could be added in API later if needed
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading samples...</p>
        </div>
      ) : error ? (
        <div className={styles.errorState}>
          <p>{error}</p>
          <button onClick={fetchSamples} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      ) : samples.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🖼️</div>
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-lg font-medium text-white mb-2">No active samples</h3>
            <p className="text-gray-400">Click the button above to add your first sample to the database.</p>
          </div>
          <p>Get started by uploading your first painting sample.</p>
          <button
            className={styles.uploadButton}
            onClick={() => setIsUploadModalOpen(true)}
          >
            Upload Sample
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {samples.map((sample) => (
            <div key={sample.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={sample.imageUrl}
                  alt={sample.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.categoryBadge}>{sample.category}</div>
                {!sample.isAvailable && (
                  <div className={styles.hiddenBadge}>Hidden</div>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{sample.title}</h3>
                <div className={styles.cardMeta}>
                  <span>{new Date(sample.createdAt).toLocaleDateString()}</span>
                </div>
                {sample.description && (
                  <p className={styles.cardDescription}>{sample.description}</p>
                )}
                <div className={styles.cardActions}>
                  <button
                    onClick={() => toggleAvailability(sample)}
                    className={sample.isAvailable ? styles.btnOutline : styles.btnActive}
                    title={sample.isAvailable ? "Hide from public" : "Show to public"}
                  >
                    {sample.isAvailable ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => handleDelete(sample.id)}
                    className={styles.deleteButton}
                    title="Delete sample"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => {
          if (!uploading) {
            setIsUploadModalOpen(false);
            setFile(null);
            setPreviewUrl(null);
          }
        }}
        title="Upload New Sample"
      >
        <form onSubmit={handleUploadSubmit} className={styles.uploadForm}>
          {/* File input area */}
          <div className={styles.imageUploadArea}>
            {previewUrl ? (
              <div className={styles.previewContainer}>
                <Image src={previewUrl} alt="Preview" fill className={styles.previewImage} />
                {!uploading && (
                  <button
                    type="button"
                    className={styles.changeImageBtn}
                    onClick={() => {
                      setFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    Remove Image
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.uploadPrompt}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p>Click to browse or drag and drop</p>
                <span className={styles.uploadMeta}>PNG, JPG, WEBP (Max 10MB)</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                  disabled={uploading}
                />
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="title">Sample Title *</label>
            <input
              id="title"
              type="text"
              required
              placeholder="e.g. Venetian Classic Matte"
              value={uploadData.title}
              onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
              disabled={uploading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              required
              value={uploadData.category}
              onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
              disabled={uploading}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              placeholder="Brief description of the material and finish used..."
              value={uploadData.description}
              onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
              disabled={uploading}
              rows={3}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setIsUploadModalOpen(false)}
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!file || !uploadData.title || uploading}
            >
              {uploading ? (
                <>
                  <div className={styles.smallSpinner}></div>
                  Uploading...
                </>
              ) : (
                "Upload Sample"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
