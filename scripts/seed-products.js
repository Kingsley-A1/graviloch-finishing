const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

const products = [
  {
    name: "Venetian Plaster Premium",
    description:
      "Premium Italian Venetian plaster for polished, marble-like walls with refined depth and luminosity.",
    price: 185000,
    category: "venetian",
    imageUrl: "/images/hero/venetian-living-room.webp",
    inStock: true,
  },
  {
    name: "Stucco Classic Finish",
    description:
      "Traditional lime-based stucco designed for smooth, elegant surfaces with authentic Italian character.",
    price: 145000,
    category: "stucco",
    imageUrl: "/images/hero/stucco-dining.webp",
    inStock: true,
  },
  {
    name: "Travertino Natural Stone",
    description:
      "Roman-inspired travertino finish that brings natural stone texture and timeless warmth into modern interiors.",
    price: 165000,
    category: "travertino",
    imageUrl: "/images/hero/travertino-office.webp",
    inStock: true,
  },
  {
    name: "Metallic Gold Accent",
    description:
      "Luxurious metallic wall finish with radiant gold undertones for feature walls and premium lobbies.",
    price: 220000,
    category: "metallic",
    imageUrl: "/images/hero/metallic-finish-lobby.webp",
    inStock: true,
  },
  {
    name: "Liquid Metal Silver",
    description:
      "Highly reflective liquid metal coating for bold, contemporary spaces that need a sleek statement surface.",
    price: 235000,
    category: "liquid-metal",
    imageUrl: "/images/samples/sample-liquidmetal-1.png",
    inStock: true,
  },
  {
    name: "Decorative Pearl Swirl",
    description:
      "Soft pearlescent decorative effect with flowing movement and subtle light play for upscale interiors.",
    price: 158000,
    category: "decorative",
    imageUrl: "/images/samples/sample_6_decorative_swirl_1773341464164.png",
    inStock: true,
  },
  {
    name: "Specialty Microcement Look",
    description:
      "Industrial-luxury seamless finish with a clean microcement aesthetic suited for premium residential spaces.",
    price: 178000,
    category: "specialty",
    imageUrl: "/images/samples/sample_5_microcement_concrete_1773341436690.png",
    inStock: true,
  },
  {
    name: "Application Tools Kit",
    description:
      "Professional trowel and finishing essentials for clean application, detailing, and polished decorative work.",
    price: 45000,
    category: "tools",
    imageUrl: "/images/gallery/paint-craftsmanship.webp",
    inStock: true,
  },
];

async function main() {
  console.log("Start seeding products...");

  await prisma.product.deleteMany({});

  const result = await prisma.product.createMany({
    data: products,
  });

  console.log(`Created ${result.count} products.`);
  console.log("Product seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error("Product seeding error:", error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });