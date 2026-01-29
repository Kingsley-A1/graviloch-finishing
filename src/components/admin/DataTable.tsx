/**
 * DataTable Component
 * ===================
 * Reusable data table with actions.
 */

"use client";

import { useState } from "react";
import styles from "./DataTable.module.css";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  loading = false,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(
    new Set(),
  );

  const toggleSelectAll = () => {
    if (selectedItems.size === data.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(data.map((item) => item.id)));
    }
  };

  const toggleSelect = (id: string | number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const getValue = (row: T, key: string) => {
    const keys = key.split(".");
    let value: unknown = row;
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return value;
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <span>Loading...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13,2 13,9 20,9" />
        </svg>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Desktop Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.checkCell}>
              <input
                type="checkbox"
                checked={selectedItems.size === data.length}
                onChange={toggleSelectAll}
                className={styles.checkbox}
              />
            </th>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
            {(onEdit || onDelete || onView) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className={selectedItems.has(row.id) ? styles.selected : ""}
            >
              <td className={styles.checkCell}>
                <input
                  type="checkbox"
                  checked={selectedItems.has(row.id)}
                  onChange={() => toggleSelect(row.id)}
                  className={styles.checkbox}
                />
              </td>
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render
                    ? col.render(row)
                    : String(getValue(row, String(col.key)) ?? "")}
                </td>
              ))}
              {(onEdit || onDelete || onView) && (
                <td>
                  <div className={styles.actions}>
                    {onView && (
                      <button
                        onClick={() => onView(row)}
                        className={styles.actionBtn}
                        title="View"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className={styles.actionBtn}
                        title="Edit"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className={`${styles.actionBtn} ${styles.delete}`}
                        title="Delete"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3,6 5,6 21,6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className={styles.mobileCards}>
        {data.map((row) => (
          <div key={row.id} className={styles.mobileCard}>
            <div className={styles.mobileCardHeader}>
              <input
                type="checkbox"
                checked={selectedItems.has(row.id)}
                onChange={() => toggleSelect(row.id)}
                className={styles.checkbox}
              />
              {(onEdit || onDelete || onView) && (
                <div className={styles.actions}>
                  {onView && (
                    <button
                      onClick={() => onView(row)}
                      className={styles.actionBtn}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className={styles.actionBtn}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className={`${styles.actionBtn} ${styles.delete}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3,6 5,6 21,6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className={styles.mobileCardBody}>
              {columns.map((col) => (
                <div key={String(col.key)} className={styles.mobileField}>
                  <span className={styles.mobileLabel}>{col.label}</span>
                  <span className={styles.mobileValue}>
                    {col.render
                      ? col.render(row)
                      : String(getValue(row, String(col.key)) ?? "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
