/**
 * Product Form Modal
 * ==================
 */

"use client";

import { useState } from "react";
import { Modal, Button, Input, Textarea } from "@/components/ui";
import styles from "./ProductFormModal.module.css";

interface Product {
  id?: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  featured: boolean;
}

interface ProductFormModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: () => void;
}

const categories = [
  "Interior Paints",
  "Exterior Paints",
  "Decorative Finishes",
  "Tools & Equipment",
  "Primers & Sealers",
  "Specialty Products",
];

export default function ProductFormModal({
  product,
  onClose,
  onSave,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || categories[0],
    price: product?.price?.toString() || "",
    description: product?.description || "",
    featured: product?.featured || false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // Upload image first if present
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        uploadData.append("folder", "products");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (uploadRes.ok) {
          const uploadJson = await uploadRes.json();
          imageUrl = uploadJson.url;
        }
      }

      // Create/Update product
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        ...(imageUrl && { images: [imageUrl] }),
      };

      const url = product?.id ? `/api/products/${product.id}` : "/api/products";
      const method = product?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        onSave();
      } else {
        alert("Failed to save product");
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={product ? "Edit Product" : "Add Product"}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className={styles.select}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Price (€)"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
        />

        <div className={styles.field}>
          <label className={styles.label}>Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className={styles.fileInput}
          />
        </div>

        <div className={styles.checkboxField}>
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) =>
              setFormData({ ...formData, featured: e.target.checked })
            }
          />
          <label htmlFor="featured">Featured Product</label>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
