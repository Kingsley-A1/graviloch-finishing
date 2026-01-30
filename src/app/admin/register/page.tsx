/**
 * Admin Registration Page
 * =======================
 * New admin signup with shared registration code.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import styles from "./page.module.css";

export default function AdminRegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registrationCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.registrationCode.trim()) {
      newErrors.registrationCode = "Registration code is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Registration failed");
        return;
      }

      toast.success("Registration successful! Please login.");
      router.push("/admin/login");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Image
            src="/icons/logo.png"
            alt="GRAVILOCH FINISHINGS LTD"
            width={60}
            height={60}
            style={{ objectFit: "contain" }}
          />
          <div className={styles.logoText}>
            <span className={styles.brand}>GRAVILOCH</span>
            <span className={styles.tagline}>
              FINISHINGS <span className={styles.ltd}>LTD</span>
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Admin Registration</h1>
          <p className={styles.subtitle}>
            Join the GRAVILOCH admin workspace
          </p>

          <Input
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Your full name"
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="your.email@example.com"
            required
          />

          <Input
            label="Registration Code"
            name="registrationCode"
            type="password"
            value={formData.registrationCode}
            onChange={handleChange}
            error={errors.registrationCode}
            placeholder="Enter admin registration code"
            required
          />

          <div className={styles.infoBox}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <p>
              The registration code is shared among all admins. 
              Use this same code to login after registration.
            </p>
          </div>

          <Button type="submit" disabled={isLoading} className={styles.submitButton}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            Already have an account?{" "}
            <Link href="/admin/login" className={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
