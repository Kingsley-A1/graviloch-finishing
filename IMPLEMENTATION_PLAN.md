# GRAVILOCH FINISHING - Italian Painting & Sales Website

A mobile-first PWA for a professional Italian painting company, featuring a stunning showcase of work, product store, and comprehensive admin system.

---

## Project Status

- [x] **Planning**: Complete
- [x] **Setup**: Project initialized, dependencies installed
- [x] **Foundation**: Database schema, Env vars, Manifest, Service Worker created
- [x] **Design System**: Global CSS with variables implemented
- [x] **Backend API**: All API routes production-ready ✅
- [x] **Types & Hooks**: TypeScript types and React hooks implemented ✅
- [x] **Components**: All UI, Layout, Shop, Gallery, Testimonials, Contact, About, Admin components ✅
- [x] **Pages**: Home, Shop, Gallery, Testimonials, Contact, About - All Complete ✅
- [x] **Admin**: Dashboard, Products, Gallery, Reviews, Analytics - All Complete ✅

---

## Technology Stack

| Layer              | Technology                  | Status        |
| ------------------ | --------------------------- | ------------- |
| **Framework**      | Next.js 16 (Turbopack)      | ✅ Ready      |
| **Language**       | TypeScript                  | ✅ Ready      |
| **Styling**        | Vanilla CSS + CSS Variables | ✅ Ready      |
| **Database**       | CockroachDB with Prisma ORM | ✅ Configured |
| **Storage**        | Cloudflare R2               | ✅ Ready      |
| **Authentication** | NextAuth.js (Admin only)    | ✅ Ready      |
| **Animations**     | Framer Motion               | ✅ Installed  |
| **Email**          | Resend                      | ✅ Ready      |
| **PWA**            | next-pwa                    | ✅ Configured |
| **Deployment**     | Vercel                      | ⏳ Pending    |

---

## Backend API Reference (Production Ready ✅)

### Authentication

| Endpoint                  | Method   | Auth | Description                                           |
| ------------------------- | -------- | ---- | ----------------------------------------------------- |
| `/api/auth/[...nextauth]` | GET/POST | -    | NextAuth handler                                      |
| `/api/auth/register`      | POST     | Code | Admin registration (requires ADMIN_REGISTRATION_CODE) |

### Products

| Endpoint             | Method | Auth  | Description                                                    |
| -------------------- | ------ | ----- | -------------------------------------------------------------- |
| `/api/products`      | GET    | -     | List products (filter: category, inStock, price, search, sort) |
| `/api/products`      | POST   | Admin | Create product                                                 |
| `/api/products/[id]` | GET    | -     | Get single product (auto-increments views)                     |
| `/api/products/[id]` | PUT    | Admin | Update product                                                 |
| `/api/products/[id]` | DELETE | Admin | Delete product                                                 |
| `/api/products/[id]` | PATCH  | -     | Increment stats (action: like, share, contact)                 |

### Gallery

| Endpoint            | Method | Auth  | Description                                  |
| ------------------- | ------ | ----- | -------------------------------------------- |
| `/api/gallery`      | GET    | -     | List images (filter: category, search, sort) |
| `/api/gallery`      | POST   | Admin | Add image                                    |
| `/api/gallery/[id]` | GET    | -     | Get single image                             |
| `/api/gallery/[id]` | PUT    | Admin | Update image                                 |
| `/api/gallery/[id]` | DELETE | Admin | Delete image                                 |
| `/api/gallery/[id]` | PATCH  | -     | Like image                                   |

### Reviews

| Endpoint                | Method | Auth  | Description                      |
| ----------------------- | ------ | ----- | -------------------------------- |
| `/api/reviews`          | GET    | -     | List approved reviews            |
| `/api/reviews?all=true` | GET    | Admin | List all reviews                 |
| `/api/reviews`          | POST   | -     | Submit review (pending approval) |
| `/api/reviews/[id]`     | PATCH  | Admin | Approve/reject review            |
| `/api/reviews/[id]`     | DELETE | Admin | Delete review                    |

### Contact

| Endpoint       | Method | Auth | Description                               |
| -------------- | ------ | ---- | ----------------------------------------- |
| `/api/contact` | POST   | -    | Submit contact form (email/whatsapp/both) |

### Upload

| Endpoint      | Method | Auth  | Description        |
| ------------- | ------ | ----- | ------------------ |
| `/api/upload` | POST   | Admin | Direct file upload |
| `/api/upload` | GET    | Admin | Get presigned URL  |

### Analytics

| Endpoint                          | Method | Auth  | Description            |
| --------------------------------- | ------ | ----- | ---------------------- |
| `/api/analytics`                  | POST   | -     | Track event            |
| `/api/analytics?type=summary`     | GET    | Admin | Get analytics summary  |
| `/api/analytics?type=products`    | GET    | Admin | Get product analytics  |
| `/api/analytics?type=conversions` | GET    | Admin | Get conversion metrics |

---

## Project Structure

```
graviloch-finishing/
├── .env.local                          # Environment variables ✅
├── next.config.ts                      # Next.js configuration ✅
├── prisma/
│   └── schema.prisma                   # Database schema ✅
├── public/
│   ├── icons/                          # PWA icons (pending)
│   ├── images/                         # Static images (pending)
│   ├── manifest.json                   # PWA manifest ✅
│   └── sw.js                           # Service Worker ✅
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout ✅
│   │   ├── page.tsx                    # Home page ✅
│   │   ├── globals.css                 # Global styles ✅
│   │   ├── api/                        # API Routes ✅ ALL COMPLETE
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.ts ✅
│   │   │   │   └── register/route.ts ✅
│   │   │   ├── products/
│   │   │   │   ├── route.ts ✅
│   │   │   │   └── [id]/route.ts ✅
│   │   │   ├── gallery/
│   │   │   │   ├── route.ts ✅
│   │   │   │   └── [id]/route.ts ✅
│   │   │   ├── reviews/
│   │   │   │   ├── route.ts ✅
│   │   │   │   └── [id]/route.ts ✅
│   │   │   ├── contact/route.ts ✅
│   │   │   ├── upload/route.ts ✅
│   │   │   └── analytics/route.ts ✅
│   │   ├── shop/page.tsx               # ✅ Complete
│   │   ├── gallery/page.tsx            # ✅ Complete
│   │   ├── testimonials/page.tsx       # ✅ Complete
│   │   ├── contact/page.tsx            # ✅ Complete
│   │   ├── about/page.tsx              # ✅ Complete
│   │   └── admin/                      # ✅ Complete
│   │       ├── layout.tsx              # Admin layout ✅
│   │       ├── page.tsx                # Dashboard ✅
│   │       ├── login/page.tsx          # Login ✅
│   │       ├── products/page.tsx       # Product CRUD ✅
│   │       ├── gallery/page.tsx        # Gallery CRUD ✅
│   │       ├── reviews/page.tsx        # Review moderation ✅
│   │       └── analytics/page.tsx      # Analytics view ✅
│   ├── components/                     # ✅ ALL COMPLETE
│   │   ├── ui/                         # Button, Input, Modal, etc. ✅
│   │   ├── layout/                     # Header, Footer, MobileNav ✅
│   │   ├── home/                       # Hero, Featured, Services ✅
│   │   ├── shop/                       # ProductGrid, ProductCard ✅
│   │   ├── gallery/                    # GalleryGrid, Lightbox ✅
│   │   ├── testimonials/               # ReviewCard, RatingStats ✅
│   │   ├── contact/                    # ContactForm, ContactInfo ✅
│   │   ├── about/                      # HeroAbout, StorySection ✅
│   │   └── admin/                      # Sidebar, DataTable, Stats ✅
│   ├── lib/
│   │   ├── prisma.ts ✅                # Database client
│   │   ├── r2.ts ✅                    # R2 storage client
│   │   ├── email.ts ✅                 # Email service
│   │   ├── whatsapp.ts ✅              # WhatsApp URLs
│   │   └── analytics.ts ✅             # Analytics helpers
│   ├── hooks/
│   │   ├── useFirstVisit.ts ✅         # First-time visitor detection
│   │   ├── useAnalytics.ts ✅          # Client analytics tracking
│   │   └── useLocalStorage.ts ✅       # Local storage (likes, etc.)
│   └── types/
│       └── index.ts ✅                 # TypeScript definitions
└── package.json ✅
```

---

## 🎨 FRONTEND IMPLEMENTATION PLAN

### Phase 1: Core UI Components (Build First)

#### 1.1 Layout Components

```
src/components/layout/
├── Header.tsx          # Sticky header with logo, nav, mobile menu trigger
├── Footer.tsx          # Footer with links, social, contact info
├── MobileNav.tsx       # Slide-out mobile navigation drawer
└── WhatsAppButton.tsx  # Floating WhatsApp CTA (bottom-right)
```

**Header Features:**

- Glassmorphism effect (blur background)
- Logo on left, nav links centered, CTA button right
- Mobile: hamburger menu icon
- Sticky on scroll with shadow
- Animation: fade in on mount

**Footer Features:**

- Multi-column layout (Company, Links, Contact)
- Social media icons
- WhatsApp quick link
- Copyright and legal links
- Background gradient

**WhatsApp Button Features:**

- Fixed position bottom-right
- Pulsing animation (attention)
- Opens WhatsApp with pre-filled message
- Hide on contact page
- Tooltip on hover

#### 1.2 UI Components

```
src/components/ui/
├── Button.tsx          # Primary, secondary, outline, ghost variants
├── Input.tsx           # Form input with label, error state
├── Textarea.tsx        # Multi-line input
├── Select.tsx          # Dropdown select
├── Modal.tsx           # Reusable modal with backdrop
├── Loader.tsx          # Loading spinner (gold gradient)
├── Toast.tsx           # Success/error notifications
├── Card.tsx            # Reusable card container
├── Badge.tsx           # Category/status badges
├── StarRating.tsx      # 1-5 star rating display/input
└── Skeleton.tsx        # Loading skeleton components
```

**Design Language:**

- All buttons have gradient backgrounds (emerald or gold)
- Hover effects with scale transform
- Focus states with ring (accessibility)
- Dark theme by default
- Smooth transitions (300ms)

---

### Phase 2: Home Page (Build Second)

#### 2.1 Welcome Animation Component

```
src/components/home/WelcomeAnimation.tsx
```

**Features:**

- Full-screen overlay
- Text reveal animation: "Welcome to GRAVILOCH FINISHING"
- Staggered letter/word animation
- Paint brush stroke effect (CSS animation)
- Auto-dismiss after 4 seconds or on click
- Only shows on first visit (useFirstVisit hook)
- Smooth fade out transition

**Animation Sequence:**

1. Black screen fades in
2. "Welcome to" appears (slide up)
3. "GRAVILOCH" appears with gold gradient (scale in)
4. "FINISHING" appears (slide in from right)
5. Paint stroke underlining effect
6. Fade out to reveal homepage

#### 2.2 Hero Section

```
src/components/home/HeroSection.tsx
```

**Features:**

- Full viewport height
- Background image carousel (4 images, auto-rotate 5s)
- Overlay gradient (dark bottom)
- Main headline: "Transform Your Space with Italian Elegance"
- Subtext: Brief company description
- CTA Buttons: "View Our Work" | "Contact Us"
- Scroll indicator animation (bouncing arrow)

**Carousel Images:**

1. Venetian plaster living room
2. Marmorino dining room
3. Travertino office
4. Metallic finish lobby

#### 2.3 Featured Products/Works Section

```
src/components/home/FeaturedSection.tsx
```

**Features:**

- Section title: "Our Signature Finishes"
- 4-card grid (2x2 mobile, 4-col desktop)
- Each card shows:
  - Image with hover zoom
  - Paint type name
  - Brief description
  - "Learn More" link
- Animate on scroll (fade up)

#### 2.4 Services Preview

```
src/components/home/ServicesPreview.tsx
```

**Features:**

- Icon grid showing services
- Service icons with hover animations
- Services: Venetian Plaster, Marmorino, Travertino, Metallic Finishes
- "See All Services" link to about page

#### 2.5 Testimonial Preview

```
src/components/home/TestimonialPreview.tsx
```

**Features:**

- Single featured review (highest rated)
- Star rating display
- Quote with customer name
- "Read More Reviews" CTA

---

### Phase 3: Shop Page

```
src/app/shop/page.tsx
src/components/shop/
├── ProductGrid.tsx     # Responsive grid container
├── ProductCard.tsx     # Individual product card
├── ProductModal.tsx    # Full product details modal
├── FilterBar.tsx       # Category and sort filters
└── SearchBar.tsx       # Product search
```

#### Product Card Features:

- Image with lazy loading
- Product name and category badge
- Price display (₦ format)
- Stock status indicator
- Hover reveals action buttons:
  - ❤️ Like (saves to localStorage)
  - 📤 Share (Web Share API)
  - 💬 Ask (WhatsApp)
- Click opens modal

#### Product Modal Features:

- Full-screen on mobile
- Large image gallery
- Product details
- Price prominent
- "Inquire on WhatsApp" CTA (full width)
- Related products carousel

#### Filter Bar Features:

- Category dropdown
- Sort dropdown (price, newest, popular)
- Stock filter toggle
- Mobile: slide-out filter drawer

---

### Phase 4: Gallery Page

```
src/app/gallery/page.tsx
src/components/gallery/
├── GalleryGrid.tsx     # Masonry layout
├── GalleryImage.tsx    # Individual gallery item
├── Lightbox.tsx        # Full-screen image viewer
└── CategoryTabs.tsx    # Category filter tabs
```

#### Gallery Grid Features:

- CSS Grid masonry layout
- Responsive (2-col mobile, 3-col tablet, 4-col desktop)
- Infinite scroll loading
- Lazy loading images
- Filter by category

#### Lightbox Features:

- Full-screen overlay
- Image zoom capability
- Navigation arrows (prev/next)
- Swipe gesture support
- Image title and category
- Like and share buttons
- "Inquire About This" WhatsApp CTA
- Keyboard navigation (arrows, ESC)

---

### Phase 5: Testimonials Page

```
src/app/testimonials/page.tsx
src/components/testimonials/
├── ReviewCard.tsx      # Individual review display
├── ReviewList.tsx      # All reviews grid
├── ReviewModal.tsx     # Submit review form
└── RatingStats.tsx     # Overall rating summary
```

#### Review Card Features:

- Customer name (initial avatar)
- Star rating (gold stars)
- Review message
- Date posted
- Verified badge (optional)

#### Submit Review Modal:

- Form fields: Name, Email (optional), Rating (1-5 stars), Message
- Star rating input (clickable stars)
- Character count for message
- Submit button
- Success message after submission

#### Rating Stats:

- Average rating (large number)
- Total reviews count
- Rating distribution bar chart
- "Leave a Review" CTA

---

### Phase 6: Contact Page

```
src/app/contact/page.tsx
src/components/contact/
├── ContactForm.tsx     # Main contact form
├── ContactInfo.tsx     # Address, phone, email info
└── MapEmbed.tsx        # Google Maps embed (optional)
```

#### Contact Form Features:

- Fields: Name*, Email*, Phone, Subject, Message\*
- Two submit options:
  - "Send via Email" - submits to API
  - "Chat on WhatsApp" - opens WhatsApp
- Form validation with error messages
- Loading state during submission
- Success/error toast notifications

#### Contact Info Features:

- Business address
- Phone number (clickable to call)
- Email address
- Business hours
- Social media links

---

### Phase 7: About Page

```
src/app/about/page.tsx
src/components/about/
├── HeroAbout.tsx       # About page hero
├── StorySection.tsx    # Company story
├── ServicesSection.tsx # All services list
├── TeamSection.tsx     # Team photos (optional)
└── CTASection.tsx      # Call-to-action section
```

#### Content Sections:

1. **Hero**: "Crafting Elegance Since [Year]" with background image
2. **Our Story**: Company history, mission, values
3. **Services**: Detailed list of all painting services
4. **Our Process**: Step-by-step (Consultation → Design → Execution → Delivery)
5. **CTA**: "Ready to Transform Your Space?" with contact buttons

---

### Phase 8: Admin Dashboard

```
src/app/admin/
├── layout.tsx          # Admin layout (sidebar + main)
├── page.tsx            # Dashboard home
├── login/page.tsx      # Admin login
├── products/page.tsx   # Product management
├── gallery/page.tsx    # Gallery management
└── reviews/page.tsx    # Review moderation

src/components/admin/
├── Sidebar.tsx         # Navigation sidebar
├── DashboardStats.tsx  # Analytics overview cards
├── DataTable.tsx       # Reusable data table
├── UploadForm.tsx      # Image upload component
├── ProductForm.tsx     # Add/edit product form
├── GalleryForm.tsx     # Add gallery image form
└── ReviewActions.tsx   # Approve/reject buttons
```

#### Dashboard Features:

- Analytics cards: Page views, Product views, Contacts, Reviews
- Line chart: Views over time
- Top products list
- Pending reviews count
- Quick actions

#### Product Management:

- Data table with all products
- Add new product button
- Edit/delete actions
- Upload image
- Category filter

#### Gallery Management:

- Grid view of all images
- Add new image
- Delete image
- Category management

#### Review Moderation:

- List of pending reviews
- Approve/reject buttons
- Delete option
- View full review in modal

---

## 🎯 Implementation Order (Recommended)

### Week 1: Foundation ✅ COMPLETE

1. ✅ Backend APIs (COMPLETE)
2. ✅ UI Components (Button, Input, Modal, Toast, Loader, Card, Badge, StarRating)
3. ✅ Layout Components (Header, Footer, MobileNav, WhatsAppButton)
4. ✅ Home Page (Welcome Animation, Hero, Featured, Services, Testimonial Preview)

### Week 2: Core Pages ✅ COMPLETE

5. ✅ Home Page - All sections complete with Framer Motion animations
6. ✅ Shop Page (Grid, Cards, Modal, Filters) - Full product browsing
7. ✅ Gallery Page (Masonry Grid, Lightbox with navigation)

### Week 3: Engagement ✅ COMPLETE

8. ✅ Testimonials Page (Reviews, Submit Form, Rating Stats)
9. ✅ Contact Page (Form with email/WhatsApp, Info section)
10. ✅ About Page (Hero, Story, Services, Process, CTA)

### Week 4: Admin & Polish ✅ COMPLETE

11. ✅ Admin Login (NextAuth integration)
12. ✅ Admin Dashboard (Stats, Quick Actions, Recent Activity)
13. ✅ Admin CRUD pages (Products, Gallery, Reviews, Analytics)
14. ⏳ Final testing & deployment

---

## 📱 Responsive Breakpoints

All components are built with mobile-first approach:

- **Galaxy Fold**: < 300px (special narrow handling)
- **Mobile**: 300px - 479px
- **Large Mobile**: 480px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

---

## 🎨 Design System

### Colors (CSS Variables)

- `--obsidian-*`: Background shades (900 darkest to 100 lightest)
- `--primary-*`: Emerald green (50-900)
- `--gold-*`: Accent gold (50-900)
- `--white` / `--black`: Pure colors

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Effects

- Glassmorphism on cards
- Gradient text for emphasis
- Smooth 300ms transitions
- Framer Motion for page transitions

---

## 🔒 Environment Variables Required

```env
# Database (CockroachDB)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl"
NEXTAUTH_URL="http://localhost:3000"

# Admin Registration
ADMIN_REGISTRATION_CODE="your-secret-code"

# Cloudflare R2
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="graviloch-media"
R2_PUBLIC_URL="https://..."

# Email (Resend)
RESEND_API_KEY="re_..."
CONTACT_EMAIL="your@email.com"

# WhatsApp
WHATSAPP_NUMBER="+234..."
```

---

## 🚀 Deployment Checklist

- [ ] Set all environment variables in Vercel
- [ ] Run `npx prisma db push` to sync database
- [ ] Create initial admin account via `/api/auth/register`
- [ ] Configure Cloudflare R2 bucket and CORS
- [ ] Set up Resend domain verification
- [ ] Test all API endpoints
- [ ] Run Lighthouse audit (target: 90+ PWA score)
- [ ] Test on mobile devices
- [ ] Configure custom domain

---

## 📱 Mobile-First Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
```

---

## 🎨 Design System Summary

### Colors

- **Primary**: Emerald green (#10b981 → #047857)
- **Accent**: Luxurious gold (#fbbf24 → #b8860b)
- **Background**: Obsidian black (#0d0d0d)
- **Text**: White (#ffffff)
- **Muted**: Gray tones (#737373)

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Effects

- Glassmorphism for cards/panels
- Gradient text for highlights
- Smooth 300ms transitions
- Subtle hover animations

---

> **Backend Status: ✅ PRODUCTION READY**
>
> All API routes are implemented, tested, and ready for frontend integration.
> The backend supports all features outlined in the original plan.
