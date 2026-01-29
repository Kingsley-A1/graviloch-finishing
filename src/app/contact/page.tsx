/**
 * Contact Page
 * ============
 * Contact form and business information.
 */

import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with GRAVILOCH FINISHING. Request a quote, ask questions, or schedule a consultation.",
  openGraph: {
    title: "Contact | GRAVILOCH FINISHING",
    description:
      "Get in touch with us for premium Italian painting services in Nigeria.",
  },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      {/* Page Header */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className={styles.subtitle}>
            Ready to transform your space? Let&apos;s talk about your project.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Contact Form */}
            <div className={styles.formSection}>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className={styles.infoSection}>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
