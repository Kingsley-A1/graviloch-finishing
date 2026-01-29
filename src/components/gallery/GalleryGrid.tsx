/**
 * GalleryGrid Component
 * =====================
 * Masonry-style gallery grid with infinite scroll.
 */

import GalleryImage from "./GalleryImage";
import styles from "./GalleryGrid.module.css";

interface GalleryGridProps {
  category?: string;
  sort?: string;
}

// Mock gallery data for when database is empty
interface MockGalleryImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const mockGalleryImages: MockGalleryImage[] = [
  {
    id: "mock-1",
    title: "Venetian Plaster Living Room",
    category: "Interior",
    imageUrl: "/images/hero/venetian-living-room.webp",
    likes: 124,
    views: 456,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-2",
    title: "Marmorino Dining Space",
    category: "Dining",
    imageUrl: "/images/hero/marmorino-dining.webp",
    likes: 98,
    views: 312,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-3",
    title: "Metallic Office Lobby",
    category: "Commercial",
    imageUrl: "/images/hero/metallic-finish-lobby.webp",
    likes: 156,
    views: 523,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-4",
    title: "Travertino Office Interior",
    category: "Office",
    imageUrl: "/images/hero/travertino-office.webp",
    likes: 87,
    views: 234,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-5",
    title: "Luxury Interior Finish",
    category: "Interior",
    imageUrl: "/images/1 (1).png",
    likes: 65,
    views: 189,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-6",
    title: "Modern Living Space",
    category: "Living Room",
    imageUrl: "/images/1 (2).png",
    likes: 72,
    views: 201,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-7",
    title: "Elegant Bedroom Design",
    category: "Bedroom",
    imageUrl: "/images/1 (3).png",
    likes: 54,
    views: 167,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-8",
    title: "Exterior Building Finish",
    category: "Exterior",
    imageUrl: "/images/1 (4).png",
    likes: 143,
    views: 412,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-9",
    title: "Commercial Space Renovation",
    category: "Commercial",
    imageUrl: "/images/1 (5).png",
    likes: 91,
    views: 278,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function getGalleryImages(params: { category?: string; sort?: string }) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const searchParams = new URLSearchParams();

  if (params.category) searchParams.set("category", params.category);
  if (params.sort) searchParams.set("sort", params.sort || "newest");
  searchParams.set("limit", "50");

  try {
    const res = await fetch(`${baseUrl}/api/gallery?${searchParams}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch gallery");
    const result = await res.json();
    
    // If no images from database, return mock images
    if (!result.data || result.data.length === 0) {
      let filteredMock = [...mockGalleryImages];
      
      // Filter by category if provided
      if (params.category && params.category !== "All") {
        filteredMock = filteredMock.filter(
          (img) => img.category.toLowerCase() === params.category?.toLowerCase()
        );
      }
      
      // Sort
      if (params.sort === "popular") {
        filteredMock.sort((a, b) => b.likes - a.likes);
      } else if (params.sort === "oldest") {
        filteredMock.reverse();
      }
      
      return { success: true, data: filteredMock };
    }
    
    return result;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    // Return mock images on error
    return { success: true, data: mockGalleryImages };
  }
}

export default async function GalleryGrid({
  category,
  sort,
}: GalleryGridProps) {
  const { data: images } = await getGalleryImages({
    category,
    sort,
  });

  if (!images || images.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21,15 16,10 5,21" />
          </svg>
        </div>
        <h3 className={styles.emptyTitle}>No images found</h3>
        <p className={styles.emptyText}>Check back soon for our latest work.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {images.map((image: MockGalleryImage, index: number) => (
        <GalleryImage
          key={image.id}
          image={image as unknown as import("@/types").GalleryImage}
          index={index}
          allImages={images as unknown as import("@/types").GalleryImage[]}
        />
      ))}
    </div>
  );
}
