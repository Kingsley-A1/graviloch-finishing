/**
 * Documentation Page
 * ==================
 * Comprehensive, searchable platform documentation for
 * GRAVILOCH FINISHING LTD — multi-phased reference guide.
 */

"use client";

import { useState, useMemo, useRef } from "react";
import type { Metadata } from "next";
import styles from "./page.module.css";

// ─── Types ───────────────────────────────────────────────────────────────────
interface DocEntry {
  id: string;
  phaseId: string;
  title: string;
  searchText: string;
  content: React.ReactNode;
}

interface DocPhase {
  id: string;
  icon: string;
  tag: string;
  title: string;
  description: string;
  color: string;
  bg: string;
}

// ─── Utility: highlight search term in text ───────────────────────────────────
function Hl({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);
  return (
    <>
      {parts.map((p, i) =>
        regex.test(p) ? (
          <mark key={i} className={styles.highlight}>
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </>
  );
}

// ─── Phase definitions ────────────────────────────────────────────────────────
const PHASES: DocPhase[] = [
  {
    id: "overview",
    icon: "🏛️",
    tag: "Phase 1",
    title: "Platform Overview",
    description:
      "Brand context, tech stack, architecture, and project structure.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
  {
    id: "pages",
    icon: "🖼️",
    tag: "Phase 2",
    title: "Public Pages",
    description:
      "Every customer-facing page: purpose, components, and behaviour.",
    color: "#f5d061",
    bg: "rgba(245,208,97,0.12)",
  },
  {
    id: "admin",
    icon: "🔐",
    tag: "Phase 3",
    title: "Admin Panel",
    description:
      "Authentication flows, dashboard, and content management tools.",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.12)",
  },
  {
    id: "api",
    icon: "⚡",
    tag: "Phase 4",
    title: "API Reference",
    description: "All REST API endpoints, methods, payloads, and responses.",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.12)",
  },
  {
    id: "database",
    icon: "🗄️",
    tag: "Phase 5",
    title: "Database Models",
    description: "Prisma schema, model fields, relationships, and seeding.",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.12)",
  },
  {
    id: "components",
    icon: "🧩",
    tag: "Phase 6",
    title: "Components",
    description:
      "Reusable UI and feature components, props, and usage patterns.",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.12)",
  },
  {
    id: "config",
    icon: "⚙️",
    tag: "Phase 7",
    title: "Configuration & Integrations",
    description: "Environment variables, third-party services, and deployment.",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.12)",
  },
];

// ─── All documentation entries ────────────────────────────────────────────────
const ALL_SECTIONS: DocEntry[] = [
  // ── PHASE 1: Overview ─────────────────────────────────────────────────────
  {
    id: "brand",
    phaseId: "overview",
    title: "About GRAVILOCH FINISHING LTD",
    searchText:
      "about brand company graviloch nikkolor italian decorative paint nigeria port harcourt",
    content: (
      <>
        <p className={styles.sectionText}>
          <strong>GRAVILOCH FINISHING LTD</strong> is the sole distributor of{" "}
          <strong>Nikkolor Italian Decorative Paint</strong> in Nigeria,
          specialising in luxury wall finishes — Venetian Plaster, Stucco,
          Travertino, Marmorino, Metallic, Liquid Metal, and Microcemento. The
          company is headquartered at{" "}
          <em>89 Stadium Road, Port Harcourt, Rivers State, Nigeria</em>.
        </p>
        <p className={styles.sectionText}>
          Led by <strong>Mr. Christian N. Ugwu</strong>, GRAVILOCH operates
          across Port Harcourt, Lagos, Abuja, Calabar, and Uyo, delivering
          authentic Italian craftsmanship trained under the Nikkolor programme.
        </p>
        <div className={styles.infoBox}>
          📞 +234 803 507 0793 &nbsp;|&nbsp; 📧 gravilochfinishings@gmail.com
        </div>
      </>
    ),
  },
  {
    id: "techstack",
    phaseId: "overview",
    title: "Technology Stack",
    searchText:
      "tech stack nextjs typescript prisma cockroachdb framer motion tailwindcss nextauth cloudflare r2 resend",
    content: (
      <>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Layer</th>
              <th>Technology</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Framework", "Next.js 16.1.5", "App Router + Turbopack"],
              ["Language", "TypeScript 5", "Strict mode"],
              [
                "Styling",
                "CSS Modules + Tailwind classes",
                "Per-component scoped CSS",
              ],
              ["Animation", "Framer Motion", "Page transitions, modals, cards"],
              ["ORM", "Prisma 6", "Type-safe DB queries"],
              [
                "Database",
                "CockroachDB (PostgreSQL-compatible)",
                "Serverless scaling",
              ],
              [
                "Auth",
                "NextAuth.js (Auth.js v5)",
                "JWT sessions, credentials provider",
              ],
              ["Storage", "Cloudflare R2", "Image + video uploads"],
              ["Email", "Resend", "Contact form transactional emails"],
              ["Messaging", "WhatsApp Business deep-link", "Enquiry CTAs"],
              ["Testing", "Jest + React Testing Library", "Unit & hook tests"],
              ["Package manager", "npm", "Standard lockfile"],
            ].map(([layer, tech, notes]) => (
              <tr key={layer}>
                <td>{layer}</td>
                <td>
                  <code>{tech}</code>
                </td>
                <td style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                  {notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "architecture",
    phaseId: "overview",
    title: "Architecture Overview",
    searchText:
      "architecture app router server components client server side rendering ssr ssg dynamic static pages",
    content: (
      <>
        <p className={styles.sectionText}>
          The application follows Next.js <strong>App Router</strong>
          conventions. Server Components handle data fetching and SEO metadata
          at the top of each route; Client Components (marked{" "}
          <code>&quot;use client&quot;</code>) handle interactivity (modals,
          forms, animations). The admin section is dynamically rendered on every
          request (<code>ƒ Dynamic</code>) while most public pages are
          statically generated (<code>○ Static</code>) at build time.
        </p>
        <div className={styles.codeBlock}>
          <code>{`Route (app)
┌ ○  /                         — Home (static)
├ ○  /about                    — About (static)
├ ○  /colours                  — Colours (static)
├ ○  /contact                  — Contact (static)
├ ƒ  /gallery                  — Gallery (dynamic, DB query)
├ ƒ  /samples                  — Samples (dynamic, DB query)
├ ƒ  /shop                     — Shop (dynamic, DB query)
├ ƒ  /testimonials             — Testimonials (dynamic)
├ ƒ  /admin/*                  — Admin panel (protected)
└ ƒ  /api/*                    — REST API routes`}</code>
        </div>
        <p className={styles.sectionText}>
          Data flows through Prisma to CockroachDB. File uploads go via
          Cloudflare R2 presigned URLs. WhatsApp CTAs use deep-link URLs
          generated in <code>src/lib/whatsapp.ts</code>.
        </p>
      </>
    ),
  },
  {
    id: "projectstructure",
    phaseId: "overview",
    title: "Project Structure",
    searchText:
      "project folder structure directory src app components hooks lib types prisma scripts public",
    content: (
      <>
        <div className={styles.codeBlock}>
          <code>{`graviloch-finishing/
├── prisma/
│   └── schema.prisma          # DB models (Admin, Product, GalleryImage, Review, Analytics, Sample)
├── public/
│   ├── images/                # Static images (gallery/, about/, hero/, samples/, services/, stores/)
│   ├── Castle-finished-work.mp4
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service worker
├── scripts/
│   ├── seed-admin.js          # Seeds first admin account
│   ├── seed-gallery.ts        # Appends gallery images (no wipe)
│   └── seed-samples.ts        # Re-seeds sample cards (clears & refills)
└── src/
    ├── app/                   # Next.js App Router pages + API routes
    ├── components/            # Feature & layout components
    ├── hooks/                 # Custom React hooks
    ├── lib/                   # Server utilities (prisma, email, whatsapp, r2, analytics)
    └── types/                 # TypeScript types + Zod schemas`}</code>
        </div>
      </>
    ),
  },

  // ── PHASE 2: Public Pages ────────────────────────────────────────────────
  {
    id: "page-home",
    phaseId: "pages",
    title: "Home Page — /",
    searchText:
      "home page hero section services cta whatsapp features listing products gallery",
    content: (
      <>
        <p className={styles.sectionText}>
          The landing page features a full-screen animated hero, a services
          overview, featured gallery images, and product highlights. It is
          statically generated using only layout components — no DB calls.
        </p>
        <ul className={styles.list}>
          <li>
            <code>HeroSection</code> — animated headline with CTA buttons
          </li>
          <li>
            <code>ServicesSection</code> — six finish types with icons
          </li>
          <li>
            <code>FeaturedGallery</code> — fetches up to 6 featured images from{" "}
            <code>/api/gallery?featured=true</code>
          </li>
          <li>
            <code>WhyChooseUs</code> — differentiating values grid
          </li>
          <li>
            <code>CTABanner</code> — WhatsApp enquiry + contact link
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "page-about",
    phaseId: "pages",
    title: "About Page — /about",
    searchText:
      "about page story christian ugwu company history team craftsman services process cta",
    content: (
      <>
        <p className={styles.sectionText}>
          Static page composed of five discrete about-specific sections:
        </p>
        <ul className={styles.list}>
          <li>
            <code>HeroAbout</code> — full-bleed hero with page title
          </li>
          <li>
            <code>StorySection</code> — company narrative with 4-image grid (
            <em>master-craftman.jpg</em>, <em>team-at-work.webp</em>,{" "}
            <em>paint-craftsmanship.webp</em>, <em>finished_work.jpg</em>)
          </li>
          <li>
            <code>ServicesSection</code> — cards for each finish type offered
          </li>
          <li>
            <code>ProcessSection</code> — step-by-step "How We Work" guide
          </li>
          <li>
            <code>CTASection</code> — background uses{" "}
            <em>master-craftman.jpg</em> with green gradient overlay; links to
            Contact and Gallery
          </li>
        </ul>
        <div className={styles.infoBox}>
          All about components live in <code>src/components/about/</code>.
        </div>
      </>
    ),
  },
  {
    id: "page-colours",
    phaseId: "pages",
    title: "Colours Page — /colours",
    searchText:
      "colours color palette catalogue nikkolor paint range finish categories venetian stucco",
    content: (
      <>
        <p className={styles.sectionText}>
          Showcases Nikkolor colour ranges and finish types using static visual
          data. Uses <code>ColourCard</code> components to display swatches. The
          page is primarily inspirational—no cart or DB interaction.
        </p>
      </>
    ),
  },
  {
    id: "page-shop",
    phaseId: "pages",
    title: "Shop / Products — /shop",
    searchText:
      "shop products purchase price stock category filter search buy paint tools",
    content: (
      <>
        <p className={styles.sectionText}>
          Dynamically rendered product listing page. Products are fetched from
          the Prisma <code>Product</code> model via <code>/api/products</code>.
          Supports category filtering, search, and sorting.
        </p>
        <ul className={styles.list}>
          <li>
            Category filter:{" "}
            <code>
              venetian | marmorino | travertino | metallic | liquid-metal |
              decorative | specialty | tools | other
            </code>
          </li>
          <li>
            Sort options:{" "}
            <code>
              newest | oldest | price-low | price-high | most-viewed |
              most-liked | most-contacted
            </code>
          </li>
          <li>
            Each product card has views, likes, and a WhatsApp enquiry CTA
          </li>
          <li>
            Product clicks increment the <code>views</code> counter via
            analytics event
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "page-gallery",
    phaseId: "pages",
    title: "Gallery Page — /gallery",
    searchText:
      "gallery images masonry category filter tabs sort finished work video castle",
    content: (
      <>
        <p className={styles.sectionText}>
          Displays a masonry grid of completed project photos fetched from the
          <code>GalleryImage</code> model. Supports category tabs and a sort
          control via URL query params.
        </p>
        <ul className={styles.list}>
          <li>
            Category tabs:{" "}
            <code>
              interior | exterior | office | commercial | residential | dining |
              bedroom | living-room | bathroom | other
            </code>
          </li>
          <li>
            Sort: <code>newest | oldest | most-viewed | most-liked</code>
          </li>
          <li>
            <strong>Finished Work Videos</strong> section — plays{" "}
            <code>/Castle-finished-work.mp4</code> natively in a styled video
            player
          </li>
        </ul>
        <div className={styles.infoBox}>
          Use the admin panel to add or manage gallery images without
          re-deploying.
        </div>
      </>
    ),
  },
  {
    id: "page-samples",
    phaseId: "pages",
    title: "Samples Page — /samples",
    searchText:
      "samples finish types venetian stucco travertino metallic liquid metal microcemento other modal popup enquire whatsapp",
    content: (
      <>
        <p className={styles.sectionText}>
          Interactive catalogue of real finish samples, each referencing an
          actual painted board. Samples are DB-driven and filterable by
          category. Clicking a sample opens a full-screen detail modal with
          enlarged image and a WhatsApp enquiry shortcut.
        </p>
        <ul className={styles.list}>
          <li>
            Category tabs:{" "}
            <code>
              All | Venetian | Stucco | Travertino | Metallic | Liquid Metal |
              Microcemento | Other
            </code>
          </li>
          <li>Modal opens on card click — closes on overlay click or ✕</li>
          <li>Background scroll is locked while modal is open</li>
          <li>
            WhatsApp enquiry URL passes sample title and category as context
          </li>
        </ul>
        <div className={styles.warnBox}>
          The <code>stucco</code> category replaces the deprecated{" "}
          <code>marmorino</code> label you may see in older seeds or product
          data. The database field is a plain <code>String</code>, so both
          values can coexist—but the UI only surfaces <em>stucco</em>.
        </div>
      </>
    ),
  },
  {
    id: "page-testimonials",
    phaseId: "pages",
    title: "Testimonials — /testimonials",
    searchText:
      "testimonials reviews ratings stars customer feedback approved pending",
    content: (
      <>
        <p className={styles.sectionText}>
          Public-facing review wall that only renders <em>approved</em> reviews
          from the <code>Review</code> model. Statistics (total count, average
          rating, star distribution) are fetched from{" "}
          <code>/api/reviews?stats=true</code>.
        </p>
        <ul className={styles.list}>
          <li>Anonymous submission form for new customer reviews</li>
          <li>Admin approval required before a review becomes visible</li>
          <li>Rating breakdown chart (1–5 stars)</li>
        </ul>
      </>
    ),
  },
  {
    id: "page-contact",
    phaseId: "pages",
    title: "Contact Page — /contact",
    searchText:
      "contact form email whatsapp enquiry address phone business hours subject message name",
    content: (
      <>
        <p className={styles.sectionText}>
          Static layout with a multi-field contact form (left) and company
          contact info (right). The form supports three send channels:
          <code>email</code>, <code>whatsapp</code>, or <code>both</code>.
        </p>
        <ul className={styles.list}>
          <li>Fields: Full Name*, Email Address*, Phone, Subject, Message*</li>
          <li>
            Submission hits <code>POST /api/contact</code>
          </li>
          <li>Email channel uses Resend; WhatsApp channel opens a deep-link</li>
          <li>Business hours displayed: Mon–Fri 9am–6pm, Sat 10am–4pm</li>
        </ul>
      </>
    ),
  },

  // ── PHASE 3: Admin Panel ─────────────────────────────────────────────────
  {
    id: "admin-auth",
    phaseId: "admin",
    title: "Admin Authentication",
    searchText:
      "admin login register password nextauth credentials session jwt protected route",
    content: (
      <>
        <p className={styles.sectionText}>
          Admin authentication is handled by <strong>NextAuth.js</strong> with
          the <em>Credentials</em> provider. Sessions are JWT-based with a
          server-side database check on every sign-in.
        </p>
        <ul className={styles.list}>
          <li>
            Login route: <code>/admin/login</code>
          </li>
          <li>
            Register route: <code>/admin/register</code> (requires optional
            registration code from <code>ADMIN_REGISTRATION_CODE</code> env var)
          </li>
          <li>
            Protected layout at <code>src/app/admin/layout.tsx</code> redirects
            unauthenticated users
          </li>
          <li>
            Session data: <code>id</code>, <code>email</code>, <code>name</code>
            , <code>role</code>
          </li>
        </ul>
        <div className={styles.warnBox}>
          Seed the first admin with <code>node scripts/seed-admin.js</code>{" "}
          after deployment. Do <em>not</em> expose the registration endpoint
          publicly without setting <code>ADMIN_REGISTRATION_CODE</code>.
        </div>
      </>
    ),
  },
  {
    id: "admin-dashboard",
    phaseId: "admin",
    title: "Admin Dashboard",
    searchText:
      "admin dashboard stats quick actions recent activity overview metrics",
    content: (
      <>
        <p className={styles.sectionText}>
          Route: <code>/admin</code> (redirects to <code>/admin/dashboard</code>
          ). Composed of:
        </p>
        <ul className={styles.list}>
          <li>
            <code>DashboardStats</code> — live counts for products, gallery
            images, reviews pending, total contacts
          </li>
          <li>
            <code>QuickActions</code> — shortcut buttons to common admin tasks
            (Upload Image, Add Product, Review Pending)
          </li>
          <li>
            <code>RecentActivity</code> — latest analytics events in
            chronological order
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "admin-gallery",
    phaseId: "admin",
    title: "Gallery Management",
    searchText:
      "admin gallery upload image manage delete edit title category featured",
    content: (
      <>
        <p className={styles.sectionText}>
          Route: <code>/admin/gallery</code>. Admins can upload new gallery
          images via the Cloudflare R2 presigned-URL flow, set a title and
          category, and toggle <code>featured</code> status.
        </p>
        <ul className={styles.list}>
          <li>
            Upload via <code>POST /api/upload</code> → presigned URL → direct R2
            upload
          </li>
          <li>
            Create record via <code>POST /api/gallery</code>
          </li>
          <li>
            Delete record via <code>DELETE /api/gallery/:id</code>
          </li>
          <li>
            Categories map to the <code>GalleryCategoryEnum</code>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "admin-samples",
    phaseId: "admin",
    title: "Samples Management",
    searchText:
      "admin samples manage upload create delete toggle available unavailable category",
    content: (
      <>
        <p className={styles.sectionText}>
          Route: <code>/admin/samples</code>. Create, edit, or retire finish
          sample cards shown on the public <code>/samples</code> page.
        </p>
        <ul className={styles.list}>
          <li>
            Toggle <code>isAvailable</code> to show/hide a sample without
            deleting it
          </li>
          <li>
            Category must be one of the <code>SampleCategoryEnum</code> values
          </li>
          <li>Image upload uses the same R2 presigned flow as gallery</li>
        </ul>
      </>
    ),
  },
  {
    id: "admin-products",
    phaseId: "admin",
    title: "Products Management",
    searchText:
      "admin products create edit price stock category description manage",
    content: (
      <>
        <p className={styles.sectionText}>
          Route: <code>/admin/products</code>. Full CRUD for the product
          catalogue shown on <code>/shop</code>.
        </p>
        <ul className={styles.list}>
          <li>
            Fields: name, description, price (₦), category, imageUrl, inStock
          </li>
          <li>
            Engagement metrics (views, likes, contacts, shares) are read-only in
            the admin
          </li>
          <li>
            Admin can hard-delete products; consider toggling{" "}
            <code>inStock=false</code> first
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "admin-reviews",
    phaseId: "admin",
    title: "Reviews Moderation",
    searchText:
      "admin reviews approve reject pending moderation testimonials ratings",
    content: (
      <>
        <p className={styles.sectionText}>
          Route: <code>/admin/reviews</code>. All newly submitted reviews
          default to <code>approved=false</code>. Admins toggle approval to make
          them visible on the public testimonials page.
        </p>
        <ul className={styles.list}>
          <li>Bulk approve or reject via the data table checkboxes</li>
          <li>
            Can mark a review as <code>featured</code> to pin it at the top
          </li>
          <li>Reviews from the API are paginated (50 per page)</li>
        </ul>
      </>
    ),
  },
  {
    id: "admin-analytics",
    phaseId: "admin",
    title: "Analytics Dashboard",
    searchText:
      "admin analytics page views unique visitors events whatsapp clicks contact conversions daily chart",
    content: (
      <>
        <p className={styles.sectionText}>
          Route: <code>/admin/analytics</code>. Aggregates data from the{" "}
          <code>Analytics</code> model to surface:
        </p>
        <ul className={styles.list}>
          <li>Total page views + unique visitor estimate</li>
          <li>
            Event breakdown: page_view, product_view, whatsapp_click,
            contact_form, etc.
          </li>
          <li>Top pages by view count</li>
          <li>Daily view trend chart (last 30 days)</li>
          <li>Conversion metrics: view → contact rate</li>
        </ul>
        <div className={styles.infoBox}>
          The <code>useAnalytics</code> hook (client) fires a{" "}
          <code>POST /api/analytics</code> event on each meaningful user
          interaction. IP is stored as a SHA-256 hash for privacy compliance.
        </div>
      </>
    ),
  },
  {
    id: "admin-colours",
    phaseId: "admin",
    title: "Colours Management",
    searchText:
      "admin colours color palette manage add delete nikkolor range categories",
    content: (
      <>
        <p className={styles.sectionText}>
          Route: <code>/admin/colours</code>. Manage the display of Nikkolor
          colour ranges shown on the public <code>/colours</code> page. Entries
          can be uploaded, categorised, and reordered.
        </p>
      </>
    ),
  },

  // ── PHASE 4: API Reference ───────────────────────────────────────────────
  {
    id: "api-gallery",
    phaseId: "api",
    title: "Gallery API — /api/gallery",
    searchText:
      "api gallery get post delete list images category filter sort featured",
    content: (
      <>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Path</th>
              <th>Auth</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgeGet}`}>
                  GET
                </span>
              </td>
              <td>
                <code>/api/gallery</code>
              </td>
              <td>Public</td>
              <td>
                List images. Params: <code>category</code>, <code>sort</code>,{" "}
                <code>featured</code>, <code>page</code>, <code>limit</code>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgePost}`}>
                  POST
                </span>
              </td>
              <td>
                <code>/api/gallery</code>
              </td>
              <td>Admin</td>
              <td>
                Create a gallery entry. Body:{" "}
                <code>{`{ title, category, imageUrl }`}</code>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgePut}`}>
                  PUT
                </span>
              </td>
              <td>
                <code>/api/gallery/[id]</code>
              </td>
              <td>Admin</td>
              <td>Update title, category, or featured flag</td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgeDelete}`}>
                  DELETE
                </span>
              </td>
              <td>
                <code>/api/gallery/[id]</code>
              </td>
              <td>Admin</td>
              <td>Permanently delete an image record</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "api-products",
    phaseId: "api",
    title: "Products API — /api/products",
    searchText:
      "api products get post put delete list create update price stock category filter",
    content: (
      <>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Path</th>
              <th>Auth</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgeGet}`}>
                  GET
                </span>
              </td>
              <td>
                <code>/api/products</code>
              </td>
              <td>Public</td>
              <td>
                List products with optional <code>category</code>,{" "}
                <code>sort</code>, <code>search</code>, <code>inStock</code>,
                pagination
              </td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgePost}`}>
                  POST
                </span>
              </td>
              <td>
                <code>/api/products</code>
              </td>
              <td>Admin</td>
              <td>
                Create product. Body validated against{" "}
                <code>CreateProductSchema</code>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgePut}`}>
                  PUT
                </span>
              </td>
              <td>
                <code>/api/products/[id]</code>
              </td>
              <td>Admin</td>
              <td>Partial update (name, price, stock, category, etc.)</td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgeDelete}`}>
                  DELETE
                </span>
              </td>
              <td>
                <code>/api/products/[id]</code>
              </td>
              <td>Admin</td>
              <td>Hard delete a product</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "api-samples",
    phaseId: "api",
    title: "Samples API — /api/samples",
    searchText:
      "api samples get post put delete list category filter available",
    content: (
      <>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Path</th>
              <th>Auth</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgeGet}`}>
                  GET
                </span>
              </td>
              <td>
                <code>/api/samples</code>
              </td>
              <td>Public</td>
              <td>
                List samples. Params: <code>category</code>,{" "}
                <code>isAvailable</code>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgePost}`}>
                  POST
                </span>
              </td>
              <td>
                <code>/api/samples</code>
              </td>
              <td>Admin</td>
              <td>
                Create sample. Body:{" "}
                <code>{`{ title, description, category, imageUrl, isAvailable }`}</code>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgePut}`}>
                  PUT
                </span>
              </td>
              <td>
                <code>/api/samples/[id]</code>
              </td>
              <td>Admin</td>
              <td>Update sample fields including availability toggle</td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgeDelete}`}>
                  DELETE
                </span>
              </td>
              <td>
                <code>/api/samples/[id]</code>
              </td>
              <td>Admin</td>
              <td>Delete a sample record</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "api-reviews",
    phaseId: "api",
    title: "Reviews API — /api/reviews",
    searchText: "api reviews get post patch delete approve stats rating",
    content: (
      <>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Path</th>
              <th>Auth</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgeGet}`}>
                  GET
                </span>
              </td>
              <td>
                <code>/api/reviews</code>
              </td>
              <td>Public</td>
              <td>
                List <em>approved</em> reviews. Add <code>?stats=true</code> for
                aggregate stats.
              </td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgePost}`}>
                  POST
                </span>
              </td>
              <td>
                <code>/api/reviews</code>
              </td>
              <td>Public</td>
              <td>
                Submit new review. Body:{" "}
                <code>{`{ name, email?, rating, message }`}</code>. Defaults to
                unapproved.
              </td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgePatch}`}>
                  PATCH
                </span>
              </td>
              <td>
                <code>/api/reviews/[id]</code>
              </td>
              <td>Admin</td>
              <td>
                Toggle <code>approved</code> or <code>featured</code>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`${styles.badge} ${styles.badgeDelete}`}>
                  DELETE
                </span>
              </td>
              <td>
                <code>/api/reviews/[id]</code>
              </td>
              <td>Admin</td>
              <td>Remove a review permanently</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "api-contact",
    phaseId: "api",
    title: "Contact API — /api/contact",
    searchText:
      "api contact post email whatsapp resend send message form submission",
    content: (
      <>
        <p className={styles.sectionText}>
          <span className={`${styles.badge} ${styles.badgePost}`}>POST</span>{" "}
          <code>/api/contact</code> — Public. Processes the contact form.
        </p>
        <div className={styles.codeBlock}>
          <code>{`// Request body (ContactFormInput)
{
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  productId?: string;    // Optional: links enquiry to a product
  productName?: string;
  sendVia: "email" | "whatsapp" | "both";
}

// Response
{
  success: true,
  whatsappUrl?: string,  // Present when sendVia is "whatsapp" or "both"
  emailSent?: boolean    // Present when sendVia is "email" or "both"
}`}</code>
        </div>
      </>
    ),
  },
  {
    id: "api-upload",
    phaseId: "api",
    title: "Upload API — /api/upload",
    searchText: "api upload cloudflare r2 presigned url image storage file",
    content: (
      <>
        <p className={styles.sectionText}>
          <span className={`${styles.badge} ${styles.badgePost}`}>POST</span>{" "}
          <code>/api/upload</code> — Admin. Returns a presigned Cloudflare R2
          URL. The client uploads directly to R2, and the returned{" "}
          <code>publicUrl</code> is stored in the DB record.
        </p>
        <div className={styles.codeBlock}>
          <code>{`// Request body
{
  filename: string;  // e.g. "my-image.jpg"
  contentType: string;  // e.g. "image/jpeg"
  folder: "products" | "gallery" | "reviews" | "samples";
}

// Response
{
  success: true,
  uploadUrl: string,  // PUT directly to this R2 URL
  publicUrl: string   // Store this in your DB record
}`}</code>
        </div>
      </>
    ),
  },
  {
    id: "api-analytics",
    phaseId: "api",
    title: "Analytics API — /api/analytics",
    searchText:
      "api analytics post events tracking page view product view whatsapp click contact",
    content: (
      <>
        <p className={styles.sectionText}>
          <span className={`${styles.badge} ${styles.badgePost}`}>POST</span>{" "}
          <code>/api/analytics</code> — Public (no auth required). Called by the{" "}
          <code>useAnalytics</code> hook on the client.
        </p>
        <div className={styles.codeBlock}>
          <code>{`// Request body (TrackEventInput)
{
  event: AnalyticsEventType;  // see types/index.ts for full list
  page: string;               // e.g. "/gallery"
  productId?: string;
  metadata?: Record<string, unknown>;
}`}</code>
        </div>
        <p className={styles.sectionText}>
          Supported event types include: <code>page_view</code>,{" "}
          <code>product_view</code>, <code>product_like</code>,{" "}
          <code>product_share</code>, <code>product_contact</code>,{" "}
          <code>gallery_view</code>, <code>gallery_like</code>,{" "}
          <code>whatsapp_click</code>, <code>contact_form</code>,{" "}
          <code>review_submit</code>, <code>first_visit</code>.
        </p>
      </>
    ),
  },
  {
    id: "api-auth",
    phaseId: "api",
    title: "Auth API — /api/auth",
    searchText: "api auth nextauth signin signout session credentials register",
    content: (
      <>
        <p className={styles.sectionText}>
          Auth routes are managed by NextAuth.js. The catch-all route at{" "}
          <code>/api/auth/[...nextauth]</code> handles sign-in, sign-out, and
          session management. A separate <code>POST /api/auth/register</code>{" "}
          route allows new admin creation (protected by{" "}
          <code>ADMIN_REGISTRATION_CODE</code>).
        </p>
      </>
    ),
  },

  // ── PHASE 5: Database Models ─────────────────────────────────────────────
  {
    id: "model-admin",
    phaseId: "database",
    title: "Admin Model",
    searchText:
      "database admin model schema prisma email password name role created",
    content: (
      <>
        <div className={styles.codeBlock}>
          <code>{`model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}</code>
        </div>
      </>
    ),
  },
  {
    id: "model-product",
    phaseId: "database",
    title: "Product Model",
    searchText:
      "database product model schema prisma name description price category image stock views likes contacts shares",
    content: (
      <>
        <div className={styles.codeBlock}>
          <code>{`model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  category    String   // venetian, marmorino, travertino, metallic, etc.
  imageUrl    String
  inStock     Boolean  @default(true)
  views       Int      @default(0)
  likes       Int      @default(0)
  contacts    Int      @default(0)
  shares      Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}`}</code>
        </div>
      </>
    ),
  },
  {
    id: "model-gallery",
    phaseId: "database",
    title: "GalleryImage Model",
    searchText:
      "database gallery image model schema prisma title category featured likes views",
    content: (
      <>
        <div className={styles.codeBlock}>
          <code>{`model GalleryImage {
  id        String   @id @default(cuid())
  title     String
  category  String   // interior, exterior, office, dining, etc.
  imageUrl  String
  featured  Boolean  @default(false)
  likes     Int      @default(0)
  views     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}</code>
        </div>
      </>
    ),
  },
  {
    id: "model-review",
    phaseId: "database",
    title: "Review Model",
    searchText:
      "database review model schema prisma name email rating message approved featured available",
    content: (
      <>
        <div className={styles.codeBlock}>
          <code>{`model Review {
  id          String   @id @default(cuid())
  name        String
  email       String?  // Optional for anonymous reviews
  rating      Int      // 1–5 stars
  message     String
  approved    Boolean  @default(false)  // Hidden until admin approves
  isAvailable Boolean  @default(true)
  featured    Boolean  @default(false)  // Pin to top of testimonials
  createdAt   DateTime @default(now())
}`}</code>
        </div>
      </>
    ),
  },
  {
    id: "model-analytics",
    phaseId: "database",
    title: "Analytics Model",
    searchText:
      "database analytics model schema prisma event page product metadata useragent ip hash created",
    content: (
      <>
        <div className={styles.codeBlock}>
          <code>{`model Analytics {
  id        String   @id @default(cuid())
  event     String   // page_view, product_view, contact_click, like, share…
  page      String   // e.g. "/gallery"
  productId String?
  metadata  String?  // JSON string for extra context
  userAgent String?
  ipHash    String?  // SHA-256 hashed for privacy
  createdAt DateTime @default(now())
}`}</code>
        </div>
      </>
    ),
  },
  {
    id: "model-sample",
    phaseId: "database",
    title: "Sample Model",
    searchText:
      "database sample model schema prisma title description image category available created updated",
    content: (
      <>
        <div className={styles.codeBlock}>
          <code>{`model Sample {
  id          String   @id @default(cuid())
  title       String
  description String?
  imageUrl    String
  category    String   // venetian, stucco, travertino, metallic, liquid-metal, microcemento, other
  isAvailable Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}`}</code>
        </div>
        <div className={styles.warnBox}>
          Seed samples using <code>npx tsx scripts/seed-samples.ts</code>. This
          script <em>clears</em> existing samples before re-seeding. For gallery
          images, use <code>seed-gallery.ts</code> — it
          <em>appends</em> data without wiping.
        </div>
      </>
    ),
  },

  // ── PHASE 6: Components ──────────────────────────────────────────────────
  {
    id: "comp-layout",
    phaseId: "components",
    title: "Layout Components",
    searchText:
      "layout components header navbar footer main navigation breadcrumb",
    content: (
      <>
        <p className={styles.sectionText}>
          Located in <code>src/components/layout/</code>.
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Header</strong> — sticky gradient nav bar with logo, nav
            links, and active-page detection
          </li>
          <li>
            <strong>Footer</strong> — company details, social links, service
            columns, legal
          </li>
          <li>
            <strong>Providers</strong> — wraps the app with SessionProvider and
            analytics on mount
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "comp-ui",
    phaseId: "components",
    title: "UI Primitives",
    searchText:
      "ui components button loader spinner toast modal badge input card",
    content: (
      <>
        <p className={styles.sectionText}>
          Located in <code>src/components/ui/</code>.
        </p>
        <ul className={styles.list}>
          <li>
            <code>Button</code> — variants:{" "}
            <code>primary | secondary | outline | ghost | danger</code>, sizes:{" "}
            <code>sm | md | lg</code>
          </li>
          <li>
            <code>Loader / PageLoader</code> — full-page and inline spinners for
            Suspense boundaries
          </li>
          <li>
            <code>Toast</code> — accessible notification overlay (info / success
            / error / warning)
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "comp-gallery",
    phaseId: "components",
    title: "Gallery Components",
    searchText:
      "gallery components grid masonry card image viewer lightbox category tabs",
    content: (
      <>
        <p className={styles.sectionText}>
          Located in <code>src/components/gallery/</code>.
        </p>
        <ul className={styles.list}>
          <li>
            <code>GalleryGrid</code> — masonry container; fetches images from
            API, handles loading/empty states
          </li>
          <li>
            <code>GalleryCard</code> — individual image tile with like button
            and analytics tracking
          </li>
          <li>
            <code>CategoryTabs</code> — horizontal scrollable filter tabs that
            push <code>?category=</code> query params
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "comp-samples",
    phaseId: "components",
    title: "Samples Components",
    searchText:
      "samples grid card modal category tabs enquire whatsapp popup framer motion animation",
    content: (
      <>
        <p className={styles.sectionText}>
          Located in <code>src/components/samples/</code>.
        </p>
        <ul className={styles.list}>
          <li>
            <code>SamplesGrid</code> — fetches samples from API, renders
            category tabs and sample cards; manages modal state with{" "}
            <code>AnimatePresence</code>
          </li>
          <li>
            Modal lifecycle: click card → <code>setSelectedSample(sample)</code>{" "}
            → Framer Motion scale-in → click overlay or ✕ → scale-out and null
          </li>
          <li>
            WhatsApp enquiry URL built by{" "}
            <code>generateGalleryInquiryUrl(title, category)</code> in{" "}
            <code>src/lib/whatsapp.ts</code>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "comp-admin",
    phaseId: "components",
    title: "Admin Components",
    searchText:
      "admin components sidebar header data table dashboard stats quick actions recent activity",
    content: (
      <>
        <p className={styles.sectionText}>
          Located in <code>src/components/admin/</code>.
        </p>
        <ul className={styles.list}>
          <li>
            <code>AdminHeader</code> — top bar with page title and sign-out
            button
          </li>
          <li>
            <code>AdminSidebar</code> — collapsible navigation with route
            highlighting
          </li>
          <li>
            <code>DataTable</code> — reusable sortable table with pagination and
            bulk selection
          </li>
          <li>
            <code>DashboardStats</code> — metric cards with live API data
          </li>
          <li>
            <code>RecentActivity</code> — event feed from analytics endpoint
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "comp-hooks",
    phaseId: "components",
    title: "Custom Hooks",
    searchText:
      "hooks useanalytics uselocalStorage usefirstvisit custom react hook",
    content: (
      <>
        <p className={styles.sectionText}>
          Located in <code>src/hooks/</code>.
        </p>
        <ul className={styles.list}>
          <li>
            <code>useAnalytics()</code> — exposes a{" "}
            <code>track(event, page, meta?)</code> function; debounces duplicate
            events; calls <code>POST /api/analytics</code>
          </li>
          <li>
            <code>useLocalStorage(key, defaultValue)</code> — persisted state
            with SSR safety
          </li>
          <li>
            <code>useFirstVisit()</code> — returns <code>true</code> on the
            user's first ever visit (used for welcome animations)
          </li>
        </ul>
      </>
    ),
  },

  // ── PHASE 7: Config & Integrations ───────────────────────────────────────
  {
    id: "config-env",
    phaseId: "config",
    title: "Environment Variables",
    searchText:
      "environment variables env DATABASE_URL NEXTAUTH_SECRET ADMIN_REGISTRATION_CODE R2 RESEND cloudflare",
    content: (
      <>
        <p className={styles.sectionText}>
          Create a <code>.env.local</code> file in the project root (never
          commit this to version control):
        </p>
        <div className={styles.codeBlock}>
          <code>{`# ─── Database ─────────────────────────────────────────────────
DATABASE_URL="postgresql://..."   # CockroachDB connection string

# ─── Auth ──────────────────────────────────────────────────────
NEXTAUTH_URL="https://your-domain.com"  # or http://localhost:3000
NEXTAUTH_SECRET="generate with: openssl rand -base64 32"
ADMIN_REGISTRATION_CODE="your-secret-code"  # Optional

# ─── Cloudflare R2 ─────────────────────────────────────────────
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="graviloch-assets"
R2_PUBLIC_URL="https://pub-xxx.r2.dev"

# ─── Resend (email) ─────────────────────────────────────────────
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@your-domain.com"
CONTACT_EMAIL="gravilochfinishings@gmail.com"

# ─── WhatsApp ───────────────────────────────────────────────────
NEXT_PUBLIC_WHATSAPP_NUMBER="2348035070793"
WHATSAPP_NUMBER="2348035070793"`}</code>
        </div>
        <div className={styles.warnBox}>
          Variables prefixed <code>NEXT_PUBLIC_</code> are exposed in the
          browser bundle. Do not prefix secrets with this prefix.
        </div>
      </>
    ),
  },
  {
    id: "config-nextjs",
    phaseId: "config",
    title: "Next.js Configuration",
    searchText:
      "next.config turbopack image domains remote patterns optimization",
    content: (
      <>
        <p className={styles.sectionText}>
          Configuration is in <code>next.config.ts</code>. Key settings:
        </p>
        <ul className={styles.list}>
          <li>
            Turbopack enabled for development with <code>--turbopack</code> flag
          </li>
          <li>
            Remote image patterns configured for the R2 public bucket domain
          </li>
          <li>
            <code>optimizePackageImports</code> for Framer Motion tree-shaking
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "config-deploy",
    phaseId: "config",
    title: "Deployment",
    searchText:
      "deploy deployment vercel build commands prisma migrate seed production",
    content: (
      <>
        <p className={styles.sectionText}>
          The project is designed for <strong>Vercel</strong> deployment.
          Recommended build pipeline:
        </p>
        <div className={styles.codeBlock}>
          <code>{`# 1. Install
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Push schema to CockroachDB (first deploy)
npx prisma db push

# 4. Seed admin account
node scripts/seed-admin.js

# 5. Seed gallery and samples (optional)
npx tsx scripts/seed-gallery.ts
npx tsx scripts/seed-samples.ts

# 6. Build
npm run build

# 7. Start
npm start`}</code>
        </div>
        <div className={styles.infoBox}>
          On Vercel, set all environment variables in the project settings
          dashboard. The build command should include{" "}
          <code>npx prisma generate && next build</code>.
        </div>
      </>
    ),
  },
  {
    id: "config-pwa",
    phaseId: "config",
    title: "PWA & Service Worker",
    searchText: "pwa progressive web app service worker manifest offline cache",
    content: (
      <>
        <p className={styles.sectionText}>
          The site ships a basic <strong>PWA manifest</strong> at{" "}
          <code>public/manifest.json</code> and a service worker at{" "}
          <code>public/sw.js</code>. The manifest defines app name, icons, and
          theme color. The service worker pre-caches key assets for improved
          performance on repeat visits.
        </p>
      </>
    ),
  },
  {
    id: "config-whatsapp",
    phaseId: "config",
    title: "WhatsApp Integration",
    searchText:
      "whatsapp integration deep link enquiry message generation util library",
    content: (
      <>
        <p className={styles.sectionText}>
          Located in <code>src/lib/whatsapp.ts</code>. Utility functions
          generate pre-populated WhatsApp deep-link URLs using the{" "}
          <code>wa.me</code> API:
        </p>
        <ul className={styles.list}>
          <li>
            <code>generateGalleryInquiryUrl(title, category)</code> — for
            sample/gallery enquiries
          </li>
          <li>
            <code>generateProductEnquiryUrl(productName, price?)</code> — for
            shop product enquiries
          </li>
          <li>
            <code>generateContactUrl(name, message)</code> — for contact form
            WhatsApp channel
          </li>
        </ul>
        <div className={styles.codeBlock}>
          <code>{`// All functions return:
// "https://wa.me/2348035070793?text=<encoded-message>"`}</code>
        </div>
      </>
    ),
  },
];

// ─── Main page component ──────────────────────────────────────────────────────
export default function DocumentationPage() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!q) return ALL_SECTIONS;
    return ALL_SECTIONS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.searchText.toLowerCase().includes(q),
    );
  }, [q]);

  // Group results by phase for rendering
  const sectionsByPhase = useMemo(() => {
    const map: Record<string, DocEntry[]> = {};
    for (const entry of filteredSections) {
      if (!map[entry.phaseId]) map[entry.phaseId] = [];
      map[entry.phaseId].push(entry);
    }
    return map;
  }, [filteredSections]);

  const visiblePhases = PHASES.filter((p) => sectionsByPhase[p.id]?.length);

  return (
    <div className={styles.page}>
      {/* ─── Hero ───────────────────────────────────────────── */}
      <header className={styles.hero}>
        <span className={styles.heroLabel}>Platform Documentation</span>
        <h1 className={styles.heroTitle}>
          GRAVILOCH <span className="text-gold">FINISHING</span> Docs
        </h1>
        <p className={styles.heroSubtitle}>
          Comprehensive, multi-phased reference guide covering every page, API,
          data model, component, and configuration in the platform.
        </p>

        {/* Search */}
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            ref={inputRef}
            className={styles.searchInput}
            type="text"
            placeholder='Search docs… e.g. "upload", "samples modal", "prisma"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search documentation"
          />
          {q && (
            <>
              <span className={styles.searchHits}>
                {filteredSections.length} result
                {filteredSections.length !== 1 ? "s" : ""}
              </span>
              <button
                className={styles.searchClear}
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </>
          )}
        </div>
      </header>

      {/* ─── Layout ─────────────────────────────────────────── */}
      <div className={styles.layout}>
        {/* Sidebar TOC */}
        <nav className={styles.sidebar} aria-label="Documentation sections">
          <p className={styles.sidebarTitle}>Contents</p>
          <ul className={styles.sidebarList}>
            {PHASES.map((phase) => {
              const phaseSections = sectionsByPhase[phase.id] ?? [];
              if (!phaseSections.length) return null;
              return (
                <li key={phase.id} className={styles.sidebarItem}>
                  <span className={styles.sidebarPhase}>{phase.tag}</span>
                  {phaseSections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={styles.sidebarLink}
                    >
                      {sec.title}
                    </a>
                  ))}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Main content */}
        <main className={styles.content}>
          {visiblePhases.length === 0 ? (
            <div className={styles.noResults}>
              <div className={styles.noResultsEmoji}>🔍</div>
              <h3 className={styles.noResultsTitle}>
                No results for &ldquo;{query}&rdquo;
              </h3>
              <p>
                Try a different keyword — e.g. &quot;gallery&quot;,
                &quot;auth&quot;, &quot;r2&quot;, &quot;whatsapp&quot;.
              </p>
            </div>
          ) : (
            visiblePhases.map((phase) => (
              <section key={phase.id} id={phase.id} className={styles.phase}>
                {/* Phase header */}
                <div className={styles.phaseHeader}>
                  <div
                    className={styles.phaseIcon}
                    style={{ background: phase.bg }}
                  >
                    {phase.icon}
                  </div>
                  <div>
                    <span className={styles.phaseTag}>{phase.tag}</span>
                    <h2 className={styles.phaseTitle}>{phase.title}</h2>
                    <p className={styles.phaseDesc}>{phase.description}</p>
                  </div>
                </div>

                {/* Section cards */}
                {(sectionsByPhase[phase.id] ?? []).map((sec) => (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className={styles.docSection}
                  >
                    <h3 className={styles.sectionTitle}>
                      <a href={`#${sec.id}`}>#</a>{" "}
                      <Hl text={sec.title} query={q} />
                    </h3>
                    {sec.content}
                  </article>
                ))}
              </section>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
