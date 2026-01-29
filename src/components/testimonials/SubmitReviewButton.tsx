/**
 * SubmitReviewButton Component
 * ============================
 * Button that opens review submission modal.
 */

"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ReviewModal from "./ReviewModal";
import styles from "./SubmitReviewButton.module.css";

export default function SubmitReviewButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <Button
          variant="gold"
          size="lg"
          onClick={() => setIsModalOpen(true)}
          leftIcon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          }
        >
          Write a Review
        </Button>
      </div>

      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
