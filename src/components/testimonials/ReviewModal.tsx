/**
 * ReviewModal Component
 * =====================
 * Modal for submitting reviews.
 */

"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import StarRating from "@/components/ui/StarRating";
import { useToast } from "@/components/ui/Toast";
import styles from "./ReviewModal.module.css";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(
          "Thank you! Your review has been submitted and is pending approval.",
        );
        setFormData({ name: "", email: "", message: "" });
        setRating(5);
        onClose();
      } else {
        throw new Error(data.error || "Failed to submit review");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit review",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", message: "" });
    setRating(5);
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Write a Review">
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Rating */}
        <div className={styles.ratingSection}>
          <label className={styles.label}>Your Rating</label>
          <StarRating
            rating={rating}
            onChange={setRating}
            size="lg"
            interactive
          />
        </div>

        {/* Name */}
        <Input
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter your name"
          required
        />

        {/* Email */}
        <Input
          label="Email (Optional)"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        {/* Message */}
        <Textarea
          label="Your Review"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          placeholder="Share your experience with us..."
          rows={4}
          required
        />

        <p className={styles.charCount}>
          {formData.message.length}/500 characters
        </p>

        {/* Submit */}
        <div className={styles.actions}>
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Submit Review
          </Button>
        </div>

        <p className={styles.note}>
          Your review will be visible after approval.
        </p>
      </form>
    </Modal>
  );
}
