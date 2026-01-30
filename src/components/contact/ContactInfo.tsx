/**
 * ContactInfo Component
 * =====================
 * Business contact information display.
 */

"use client";

import { motion } from "framer-motion";
import styles from "./ContactInfo.module.css";

const contactDetails = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Head Office",
    content: "89 Stadium Road, Port Harcourt",
    subContent: "Rivers State, Nigeria",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Call Us",
    content: "+234 803 507 0793",
    subContent: "+234 818 524 2211",
    link: "tel:+2348035070793",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Email Us",
    content: "gravilochfinishings@gmail.com",
    link: "mailto:gravilochfinishings@gmail.com",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/gravilochfinishings",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://facebook.com/Gravilochfinishingugwu",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/2348035070793",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

const businessHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactInfo() {
  return (
    <div className={styles.container}>
      {/* Contact Details */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Contact Information</h3>
        <div className={styles.details}>
          {contactDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              className={styles.detailItem}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.detailIcon}>{detail.icon}</div>
              <div className={styles.detailContent}>
                <h4 className={styles.detailTitle}>{detail.title}</h4>
                {detail.link ? (
                  <a href={detail.link} className={styles.detailLink}>
                    {detail.content}
                  </a>
                ) : (
                  <>
                    <p className={styles.detailText}>{detail.content}</p>
                    {detail.subContent && (
                      <p className={styles.detailSubtext}>
                        {detail.subContent}
                      </p>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Business Hours</h3>
        <div className={styles.hours}>
          {businessHours.map((item) => (
            <div key={item.day} className={styles.hoursRow}>
              <span className={styles.hoursDay}>{item.day}</span>
              <span className={styles.hoursTime}>{item.hours}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Follow Us</h3>
        <div className={styles.socials}>
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
