/**
 * GRAVILOCH FINISHING - TypeScript Type Definitions
 * ==================================================
 * Comprehensive types for the entire application.
 */

import {
  type Product,
  type GalleryImage,
  type Review,
  type Admin,
  type Analytics,
} from "@prisma/client";

// ==========================================
// Re-export Prisma types
// ==========================================
export type { Product, GalleryImage, Review, Admin, Analytics };

// ==========================================
// API Response Types
// ==========================================
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// ==========================================
// Product Types
// ==========================================
export type ProductCategory =
  | "venetian"
  | "marmorino"
  | "travertino"
  | "metallic"
  | "liquid-metal"
  | "decorative"
  | "specialty"
  | "tools"
  | "other";

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  inStock?: boolean;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

export interface ProductWithStats extends Product {
  engagementScore: number;
}

export type ProductSortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "most-viewed"
  | "most-liked"
  | "most-contacted";

export interface ProductFilters {
  category?: ProductCategory;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: ProductSortOption;
}

// ==========================================
// Gallery Types
// ==========================================
export type GalleryCategory =
  | "interior"
  | "exterior"
  | "office"
  | "commercial"
  | "residential"
  | "dining"
  | "bedroom"
  | "living-room"
  | "bathroom"
  | "other";

export interface CreateGalleryInput {
  title: string;
  category: GalleryCategory;
  imageUrl: string;
}

export interface UpdateGalleryInput extends Partial<CreateGalleryInput> {
  id: string;
}

export type GallerySortOption =
  | "newest"
  | "oldest"
  | "most-viewed"
  | "most-liked";

export interface GalleryFilters {
  category?: GalleryCategory;
  search?: string;
  sort?: GallerySortOption;
}

// ==========================================
// Review Types
// ==========================================
export interface CreateReviewInput {
  name: string;
  email?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  message: string;
}

export interface UpdateReviewInput {
  id: string;
  approved?: boolean;
}

export interface ReviewStats {
  totalReviews: number;
  approvedReviews: number;
  pendingReviews: number;
  averageRating: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

// ==========================================
// Contact Types
// ==========================================
export interface ContactFormInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  productId?: string;
  productName?: string;
  sendVia: "email" | "whatsapp" | "both";
}

export interface ContactFormResponse {
  success: boolean;
  whatsappUrl?: string;
  emailSent?: boolean;
  error?: string;
}

// ==========================================
// Upload Types
// ==========================================
export interface UploadRequest {
  file: File;
  folder: "products" | "gallery" | "reviews";
}

export interface UploadResponse {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
}

export interface PresignedUrlRequest {
  filename: string;
  contentType: string;
  folder: "products" | "gallery" | "reviews";
}

export interface PresignedUrlResponse {
  success: boolean;
  uploadUrl?: string;
  publicUrl?: string;
  error?: string;
}

// ==========================================
// Auth Types
// ==========================================
export interface AdminLoginInput {
  email: string;
  password: string;
}

export interface AdminRegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  registrationCode?: string; // Optional registration code for security
}

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: string;
}

// ==========================================
// Analytics Types
// ==========================================
export type AnalyticsEventType =
  | "page_view"
  | "product_view"
  | "product_like"
  | "product_share"
  | "product_contact"
  | "gallery_view"
  | "gallery_like"
  | "gallery_share"
  | "review_submit"
  | "contact_form"
  | "whatsapp_click"
  | "store_visit"
  | "first_visit";

export interface TrackEventInput {
  event: AnalyticsEventType;
  page: string;
  productId?: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  eventBreakdown: Array<{
    event: string;
    count: number;
  }>;
  topPages: Array<{
    page: string;
    views: number;
  }>;
  dailyViews: Array<{
    date: string;
    count: number;
  }>;
}

export interface ConversionMetrics {
  pageViews: number;
  productViews: number;
  totalContacts: number;
  contactFormSubmissions: number;
  whatsappClicks: number;
  viewToContactRate: string;
  productViewToContactRate: string;
}

export interface ProductAnalytics {
  product: {
    id: string;
    name: string;
    imageUrl: string;
  } | null;
  totalEngagements: number;
}

// ==========================================
// UI Component Types
// ==========================================
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface ToastProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

// ==========================================
// Navigation Types
// ==========================================
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ==========================================
// Utility Types
// ==========================================
export type SortDirection = "asc" | "desc";

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export interface FilterConfig {
  field: string;
  operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
  value: unknown;
}

// ==========================================
// Zod Schema Types (for validation)
// ==========================================
import { z } from "zod";

export const ProductCategoryEnum = z.enum([
  "venetian",
  "marmorino",
  "travertino",
  "metallic",
  "liquid-metal",
  "decorative",
  "specialty",
  "tools",
  "other",
]);

export const GalleryCategoryEnum = z.enum([
  "interior",
  "exterior",
  "office",
  "commercial",
  "residential",
  "dining",
  "bedroom",
  "living-room",
  "bathroom",
  "other",
]);

export const CreateProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),
  price: z.number().positive("Price must be positive"),
  category: ProductCategoryEnum,
  imageUrl: z.string().url("Must be a valid URL"),
  inStock: z.boolean().optional().default(true),
});

export const UpdateProductSchema = CreateProductSchema.partial().extend({
  id: z.string().cuid(),
});

export const CreateGallerySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  category: GalleryCategoryEnum,
  imageUrl: z.string().url("Must be a valid URL"),
});

export const UpdateGallerySchema = CreateGallerySchema.partial().extend({
  id: z.string().cuid(),
});

export const CreateReviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().max(100).optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000),
  productId: z.string().optional(),
  productName: z.string().optional(),
  sendVia: z.enum(["email", "whatsapp", "both"]),
});

export const AdminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const AdminRegisterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string(),
    registrationCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const TrackEventSchema = z.object({
  event: z.enum([
    "page_view",
    "product_view",
    "product_like",
    "product_share",
    "product_contact",
    "gallery_view",
    "gallery_like",
    "gallery_share",
    "review_submit",
    "contact_form",
    "whatsapp_click",
    "store_visit",
    "first_visit",
  ]),
  page: z.string(),
  productId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
