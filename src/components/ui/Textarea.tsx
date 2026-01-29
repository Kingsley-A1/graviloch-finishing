/**
 * Textarea Component
 * ==================
 * Multi-line text input with character count.
 */

"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCount = false,
      maxLength,
      value,
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const textareaId =
      id || `textarea-${label?.toLowerCase().replace(/\s/g, "-")}`;
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`${styles.textarea} ${error ? styles.error : ""} ${className}`}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        <div className={styles.footer}>
          {error && <span className={styles.errorText}>{error}</span>}
          {helperText && !error && (
            <span className={styles.helperText}>{helperText}</span>
          )}
          {showCount && maxLength && (
            <span className={styles.count}>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
