# 🚀 GRAVILOCH FINISHING - Complete Deployment & Management Guide

> **Version:** 1.0.0  
> **Last Updated:** January 2026  
> **Platform:** Next.js 16 + Prisma + Cloudflare R2 + CockroachDB

---

## 📑 Table of Contents

1. [Prerequisites](#-prerequisites)
2. [Environment Setup](#-environment-setup)
3. [Database Configuration (CockroachDB)](#-database-configuration-cockroachdb)
4. [Cloudflare R2 Setup](#-cloudflare-r2-setup)
5. [Local Development](#-local-development)
6. [GitHub Repository Management](#-github-repository-management)
7. [Vercel Deployment](#-vercel-deployment)
8. [Post-Deployment Checklist](#-post-deployment-checklist)
9. [Admin Panel Usage](#-admin-panel-usage)
10. [Troubleshooting Guide](#-troubleshooting-guide)
11. [Performance Optimization](#-performance-optimization)
12. [Security Best Practices](#-security-best-practices)
13. [Backup & Recovery](#-backup--recovery)
14. [Monitoring & Analytics](#-monitoring--analytics)

---

## 🔧 Prerequisites

Before starting, ensure you have:

| Tool | Minimum Version | Purpose |
|------|-----------------|---------|
| Node.js | 20.x LTS | Runtime environment |
| npm/pnpm | 9.x / 8.x | Package management |
| Git | 2.40+ | Version control |
| VS Code | Latest | Development IDE |

### Required Accounts
- **GitHub** - Repository hosting
- **Vercel** - Deployment platform
- **Cloudflare** - R2 storage for images
- **CockroachDB** - Serverless PostgreSQL database

---

## 🔐 Environment Setup

### Step 1: Create Environment File

Create `.env.local` in your project root:

```bash
# Copy the template
cp .env.example .env.local
```

### Step 2: Configure All Environment Variables

```env
# ============================================
# CLOUDFLARE R2 STORAGE
# ============================================
# Get these from: Cloudflare Dashboard > R2 > Manage R2 API Tokens

R2_ACCESS_KEY_ID="your-r2-access-key-id"
R2_SECRET_ACCESS_KEY="your-r2-secret-access-key"
R2_BUCKET_NAME="graviloch-assets"
R2_ACCOUNT_ID="your-cloudflare-account-id"
R2_PUBLIC_URL="https://pub-xxxxx.r2.dev"

# ============================================
# DATABASE (CockroachDB Serverless)
# ============================================
# Get this from: CockroachDB Cloud Console > Connect > Connection String

DATABASE_URL="postgresql://username:password@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/graviloch?sslmode=verify-full"

# ============================================
# AUTHENTICATION
# ============================================
# Generate with: openssl rand -base64 32

NEXTAUTH_SECRET="your-super-secure-random-string-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Admin credentials (change these!)
ADMIN_EMAIL="admin@graviloch.com"
ADMIN_PASSWORD="your-secure-admin-password"

# ============================================
# EMAIL SERVICE (Optional)
# ============================================

SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# ============================================
# ANALYTICS (Optional)
# ============================================

NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## 🗄️ Database Configuration (CockroachDB)

### Step 1: Create CockroachDB Account

1. Go to [cockroachlabs.cloud](https://cockroachlabs.cloud)
2. Sign up for a free account
3. Create a new **Serverless** cluster
4. Choose your region (closest to your users)

### Step 2: Get Connection String

1. Click on your cluster
2. Go to **Connect** tab
3. Select **Connection String**
4. Copy the full connection URL

```
postgresql://username:password@host:26257/defaultdb?sslmode=verify-full
```

### Step 3: Configure Connection String

Replace placeholders in your `.env.local`:

```env
DATABASE_URL="postgresql://graviloch_user:YourSecurePassword123@free-tier14.aws-eu-west-1.cockroachlabs.cloud:26257/graviloch?sslmode=verify-full"
```

### Step 4: Initialize Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed initial data
npx prisma db seed
```

### Step 5: Verify Connection

```bash
# Open Prisma Studio to view data
npx prisma studio
```

---

## ☁️ Cloudflare R2 Setup

### Step 1: Create R2 Bucket

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2** in sidebar
3. Click **Create bucket**
4. Name it: `graviloch-assets`
5. Choose location hint (nearest to users)

### Step 2: Create API Token

1. In R2, click **Manage R2 API Tokens**
2. Click **Create API Token**
3. Configure permissions:
   ```
   Token Name: graviloch-upload-token
   Permissions: Object Read & Write
   Bucket Scope: graviloch-assets
   TTL: No expiration (or 1 year)
   ```
4. Click **Create API Token**
5. **IMPORTANT**: Copy both keys immediately (shown only once!)

### Step 3: Enable Public Access

1. Go to your bucket settings
2. Click **Settings** tab
3. Under **Public access**, click **Allow Access**
4. Copy the public URL (e.g., `https://pub-abc123.r2.dev`)

### Step 4: Configure CORS (Required)

In bucket settings, add CORS rules:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://graviloch.vercel.app",
      "https://your-custom-domain.com"
    ],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

---

## 💻 Local Development

### Step 1: Clone & Install

```bash
# Clone repository
git clone https://github.com/Kingsley-A1/graviloch-finishing.git
cd graviloch-finishing

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate
```

### Step 2: Start Development Server

```bash
# Start with Turbopack (faster)
npm run dev

# Or standard mode
npm run dev:standard
```

### Step 3: Access the Application

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Main website |
| http://localhost:3000/admin | Admin dashboard |
| http://localhost:3000/admin/login | Admin login |

### Step 4: Development Commands

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Start production server
npm run start
```

---

## 📦 GitHub Repository Management

### Step 1: Initialize Repository

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Initial commit
git commit -m "feat: initial GRAVILOCH FINISHING platform"
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create repository: `graviloch-finishing`
3. Set visibility: Private (recommended for business)
4. **Don't** initialize with README

### Step 3: Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/your-username/graviloch-finishing.git

# Push main branch
git branch -M main
git push -u origin main
```

### Step 4: Branch Strategy

```bash
# Create development branch
git checkout -b develop
git push -u origin develop

# Feature branches
git checkout -b feature/new-feature
# ... make changes ...
git commit -m "feat: add new feature"
git push -u origin feature/new-feature

# Create pull request on GitHub
```

### Recommended Branch Structure

```
main          # Production (auto-deploys to Vercel)
├── develop   # Development/staging
│   ├── feature/gallery-redesign
│   ├── feature/payment-integration
│   └── fix/mobile-navigation
```

### Step 5: Protect Main Branch

1. Go to repository **Settings**
2. Click **Branches**
3. Add rule for `main`:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require linear history

---

## ▲ Vercel Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New Project**
3. Import your GitHub repository
4. Select `graviloch-finishing`

### Step 2: Configure Build Settings

Vercel auto-detects Next.js. Verify settings:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Root Directory | `./` |
| Build Command | `prisma generate && next build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

### Step 3: Add Environment Variables

In Vercel project settings > **Environment Variables**:

```
R2_ACCESS_KEY_ID          = [your-key]
R2_SECRET_ACCESS_KEY      = [your-secret]
R2_BUCKET_NAME            = graviloch-assets
R2_ACCOUNT_ID             = [your-account-id]
R2_PUBLIC_URL             = https://pub-xxx.r2.dev

DATABASE_URL              = [your-cockroachdb-url]

NEXTAUTH_SECRET           = [your-secret]
NEXTAUTH_URL              = https://your-domain.vercel.app

ADMIN_EMAIL               = admin@graviloch.com
ADMIN_PASSWORD            = [secure-password]
```

### Step 4: Deploy

1. Click **Deploy**
2. Wait for build to complete (~2-3 minutes)
3. Access your site at `https://your-project.vercel.app`

### Step 5: Custom Domain (Optional)

1. Go to **Settings** > **Domains**
2. Add your domain: `graviloch.com`
3. Configure DNS records as shown
4. Enable **HTTPS** (automatic)

### Automatic Deployments

| Branch | Environment | URL |
|--------|-------------|-----|
| `main` | Production | graviloch.com |
| `develop` | Preview | develop-graviloch.vercel.app |
| `feature/*` | Preview | feature-xxx-graviloch.vercel.app |

---

## ✅ Post-Deployment Checklist

### Immediate Checks

- [ ] Homepage loads correctly
- [ ] All images load (check Network tab)
- [ ] Navigation works on mobile
- [ ] Admin login works
- [ ] Gallery images upload successfully
- [ ] Contact form sends messages
- [ ] WhatsApp links work

### Performance Verification

```bash
# Run Lighthouse audit
npx lighthouse https://your-site.vercel.app --view

# Expected scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 95+
```

### Database Verification

```bash
# Check connection
npx prisma db pull

# Verify schema sync
npx prisma migrate status
```

---

## 🛠️ Admin Panel Usage

### Accessing Admin

1. Navigate to `/admin/login`
2. Enter credentials from `.env`
3. Access dashboard at `/admin`

### Admin Features

| Section | Path | Purpose |
|---------|------|---------|
| Dashboard | `/admin` | Overview & quick stats |
| Products | `/admin/products` | Manage paint products |
| Gallery | `/admin/gallery` | Upload project photos |
| Colours | `/admin/colours` | Manage colour palette |
| Reviews | `/admin/reviews` | Moderate testimonials |
| Analytics | `/admin/analytics` | View site metrics |

### Uploading Images

1. Go to `/admin/gallery`
2. Click **Upload New**
3. Select images (max 5MB each)
4. Add title, description, category
5. Click **Upload**

Images are automatically:
- Optimized for web
- Converted to WebP/AVIF
- Stored in Cloudflare R2

---

## 🔧 Troubleshooting Guide

### Common Issues & Solutions

#### 1. Build Fails on Vercel

**Error:** `Prisma Client not generated`
```bash
# Solution: Update build command
prisma generate && next build
```

**Error:** `Cannot find module '@prisma/client'`
```bash
# Solution: Add to package.json scripts
"postinstall": "prisma generate"
```

#### 2. Database Connection Fails

**Error:** `Connection refused`

```bash
# Check connection string format
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=verify-full"

# Verify SSL mode is set
?sslmode=verify-full  # Required for CockroachDB
```

**Error:** `Too many connections`

```env
# Add connection pooling
DATABASE_URL="...?connection_limit=5&pool_timeout=10"
```

#### 3. R2 Upload Fails

**Error:** `Access Denied`

1. Verify API token permissions (Read & Write)
2. Check bucket name matches exactly
3. Verify CORS configuration

**Error:** `Bucket not found`

```env
# Ensure correct format
R2_BUCKET_NAME="graviloch-assets"  # Just the name, no URL
```

#### 4. Images Not Loading

**Symptoms:** Broken image icons, 404 errors

1. Check R2 public access is enabled
2. Verify `R2_PUBLIC_URL` is correct
3. Check image paths in database

```sql
-- Check image URLs in database
SELECT image_url FROM products LIMIT 5;
```

#### 5. Admin Login Fails

**Error:** `Invalid credentials`

1. Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in environment
2. Clear browser cookies
3. Check `NEXTAUTH_SECRET` is set

```bash
# Regenerate secret
openssl rand -base64 32
```

#### 6. Slow Page Load

**Diagnosis:**

```bash
# Check bundle size
npm run build
# Look for "First Load JS" sizes

# Analyze bundle
npm install @next/bundle-analyzer
ANALYZE=true npm run build
```

**Solutions:**
- Enable image optimization
- Use dynamic imports for heavy components
- Check for large dependencies

#### 7. CORS Errors

**Error:** `Access-Control-Allow-Origin missing`

Add to R2 bucket CORS:
```json
{
  "AllowedOrigins": ["https://your-domain.com"],
  "AllowedMethods": ["GET", "PUT", "POST"],
  "AllowedHeaders": ["*"]
}
```

#### 8. Environment Variables Not Working

**On Vercel:**
1. Redeploy after adding variables
2. Check variable names match exactly
3. No quotes around values in Vercel UI

**Locally:**
1. Restart dev server after `.env` changes
2. Check file is named `.env.local`
3. No spaces around `=` signs

---

## ⚡ Performance Optimization

### Image Optimization

```tsx
// Always use Next.js Image component
import Image from 'next/image';

<Image
  src="/image.webp"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"  // or "eager" for above-fold
  quality={80}
/>
```

### Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <Skeleton /> }
);
```

### Caching Strategy

```typescript
// next.config.ts - Already configured
headers: [
  {
    source: '/images/(.*)',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ]
  }
]
```

---

## 🔒 Security Best Practices

### Environment Security

- ✅ Never commit `.env` files
- ✅ Use different secrets for dev/prod
- ✅ Rotate secrets quarterly
- ✅ Use Vercel's encrypted environment variables

### Authentication

- ✅ Strong admin password (16+ chars)
- ✅ Session timeout configured
- ✅ HTTPS enforced
- ✅ CSRF protection enabled

### Input Validation

```typescript
// All API routes validate input
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(1000)
});
```

---

## 💾 Backup & Recovery

### Database Backup

**CockroachDB Cloud:**
- Automatic daily backups (14-day retention)
- Point-in-time recovery available

**Manual Export:**
```bash
# Export data
cockroach sql --url "$DATABASE_URL" -e "SELECT * FROM products" --format=csv > backup.csv
```

### R2 Backup

```bash
# Using rclone
rclone sync r2:graviloch-assets ./backup/r2-assets
```

### Code Backup

```bash
# GitHub already provides this
# Additional: Create release tags
git tag -a v1.0.0 -m "Production release 1.0.0"
git push origin v1.0.0
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Enable in Vercel dashboard
2. View at **Analytics** tab
3. Metrics: Page views, unique visitors, performance

### Custom Analytics

```typescript
// Already integrated in useAnalytics hook
import { useAnalytics } from '@/hooks/useAnalytics';

const { trackEvent } = useAnalytics();
trackEvent('button_click', { button: 'contact' });
```

### Error Monitoring

Consider adding:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Vercel Speed Insights** - Performance monitoring

---

## 📞 Support & Resources

### Quick Links

| Resource | URL |
|----------|-----|
| Next.js Docs | [nextjs.org/docs](https://nextjs.org/docs) |
| Vercel Support | [vercel.com/support](https://vercel.com/support) |
| CockroachDB Docs | [cockroachlabs.com/docs](https://www.cockroachlabs.com/docs) |
| Cloudflare R2 | [developers.cloudflare.com/r2](https://developers.cloudflare.com/r2) |
| Prisma Docs | [prisma.io/docs](https://www.prisma.io/docs) |

### Getting Help

1. Check this guide first
2. Search GitHub Issues
3. Check Vercel deployment logs
4. Contact developer support

---

## 📋 Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Check for errors
npm run typecheck        # TypeScript check

# Database
npx prisma studio        # Visual database editor
npx prisma db push       # Push schema changes
npx prisma migrate dev   # Create migration
npx prisma generate      # Generate client

# Git
git status               # Check changes
git add .                # Stage all changes
git commit -m "message"  # Commit
git push                 # Push to GitHub

# Deployment
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
```

---

<div align="center">

**Built with ❤️ by GRAVILOCH FINISHING**

*Premium Italian Painting & Finishing Services*

📱 +234 903 682 6272 | 📧 graviloch@gmail.com

</div>
