/**
 * ProductGrid Component
 * =====================
 * Grid of product cards with loading states.
 */

import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  category?: string;
  sort?: string;
  search?: string;
  page: number;
}

// Mock products for when database is empty
interface MockProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  views: number;
  likes: number;
  contacts: number;
  shares: number;
  createdAt: Date;
  updatedAt: Date;
}

const mockProducts: MockProduct[] = [
  {
    id: "mock-1",
    name: "Venetian Plaster Premium",
    description: "Premium Italian Venetian plaster for luxurious wall finishes. Creates a polished marble-like appearance with depth and luminosity.",
    price: 185000,
    category: "Venetian Plaster",
    imageUrl: "/images/hero/venetian-living-room.webp",
    inStock: true,
    views: 245,
    likes: 67,
    shares: 23,
    contacts: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-2",
    name: "Marmorino Classic",
    description: "Traditional lime-based plaster perfect for creating smooth, sophisticated surfaces with natural stone-like texture.",
    price: 145000,
    category: "Marmorino",
    imageUrl: "/images/hero/marmorino-dining.webp",
    inStock: true,
    views: 198,
    likes: 54,
    shares: 18,
    contacts: 9,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-3",
    name: "Metallic Finish Gold",
    description: "Luxurious metallic finish with gold undertones. Perfect for accent walls and feature areas requiring glamour.",
    price: 220000,
    category: "Metallic Finishes",
    imageUrl: "/images/hero/metallic-finish-lobby.webp",
    inStock: true,
    views: 312,
    likes: 89,
    shares: 34,
    contacts: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-4",
    name: "Travertino Natural",
    description: "Natural stone effect finish replicating the beauty of Italian travertine. Ideal for both modern and classic interiors.",
    price: 165000,
    category: "Travertino",
    imageUrl: "/images/hero/travertino-office.webp",
    inStock: true,
    views: 156,
    likes: 42,
    shares: 12,
    contacts: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-5",
    name: "Lime Wash Exterior",
    description: "Breathable lime wash for exterior applications. Weather-resistant with beautiful natural aging characteristics.",
    price: 95000,
    category: "Exterior Finishes",
    imageUrl: "/images/1 (4).png",
    inStock: true,
    views: 134,
    likes: 38,
    shares: 15,
    contacts: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "mock-6",
    name: "Stucco Veneziano",
    description: "High-gloss Venetian stucco for mirror-like wall finishes. Creates stunning reflective surfaces with depth.",
    price: 195000,
    category: "Venetian Plaster",
    imageUrl: "/images/1 (1).png",
    inStock: true,
    views: 178,
    likes: 51,
    shares: 19,
    contacts: 11,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function getProducts(params: {
  category?: string;
  sort?: string;
  search?: string;
  page: number;
}) {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const searchParams = new URLSearchParams();

  if (params.category) searchParams.set("category", params.category);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.search) searchParams.set("search", params.search);
  searchParams.set("page", params.page.toString());
  searchParams.set("limit", "12");

  try {
    const res = await fetch(`${baseUrl}/api/products?${searchParams}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");
    const result = await res.json();
    
    // Return mock products if database is empty
    if (!result.data || result.data.length === 0) {
      let filteredMock = [...mockProducts];
      
      // Filter by category if provided
      if (params.category) {
        filteredMock = filteredMock.filter(
          (p) => p.category.toLowerCase() === params.category?.toLowerCase()
        );
      }
      
      // Filter by search
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredMock = filteredMock.filter(
          (p) => 
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Sort
      if (params.sort === "price-low") {
        filteredMock.sort((a, b) => a.price - b.price);
      } else if (params.sort === "price-high") {
        filteredMock.sort((a, b) => b.price - a.price);
      } else if (params.sort === "popular") {
        filteredMock.sort((a, b) => b.views - a.views);
      }
      
      return { 
        success: true, 
        data: filteredMock,
        pagination: { total: filteredMock.length, totalPages: 1 }
      };
    }
    
    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: true,
      data: mockProducts,
      pagination: { total: mockProducts.length, totalPages: 1 },
    };
  }
}

export default async function ProductGrid({
  category,
  sort,
  search,
  page,
}: ProductGridProps) {
  const { data: products, pagination } = await getProducts({
    category,
    sort,
    search,
    page,
  });

  if (!products || products.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className={styles.emptyTitle}>No products found</h3>
        <p className={styles.emptyText}>
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.grid}>
        {products.map((product: MockProduct) => (
          <ProductCard key={product.id} product={product as unknown as import("@/types").Product} />
        ))}
      </div>

      {/* Pagination Info */}
      {pagination && pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          <p className={styles.paginationText}>
            Showing {products.length} of {pagination.total} products
          </p>
        </div>
      )}
    </>
  );
}
