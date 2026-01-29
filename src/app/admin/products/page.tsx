/**
 * Admin Products Page
 * ===================
 * Manage products.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/admin";
import { Button } from "@/components/ui";
import ProductFormModal from "./ProductFormModal";
import styles from "./page.module.css";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  featured: boolean;
  createdAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleSave = () => {
    setModalOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    {
      key: "price",
      label: "Price",
      render: (row: Product) => `€${row.price.toFixed(2)}`,
    },
    {
      key: "featured",
      label: "Featured",
      render: (row: Product) => (
        <span className={row.featured ? styles.badge : styles.badgeMuted}>
          {row.featured ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (row: Product) =>
        new Date(row.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>Manage your product catalog</p>
        </div>
        <Button onClick={handleAdd}>Add Product</Button>
      </div>

      <div className={styles.content}>
        <DataTable
          columns={columns}
          data={products}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No products yet. Click 'Add Product' to create one."
        />
      </div>

      {modalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
