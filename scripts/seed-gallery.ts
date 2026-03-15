import prisma from "../src/lib/prisma";

const galleryData = [
  {
    title: "Venetian Plaster Living Room",
    category: "interior",
    imageUrl: "/images/hero/venetian-living-room.webp",
    featured: true,
  },
  {
    title: "Stucco Dining Space",
    category: "dining",
    imageUrl: "/images/hero/stucco-dining.webp",
    featured: true,
  },
  {
    title: "Metallic Office Lobby",
    category: "commercial",
    imageUrl: "/images/hero/metallic-finish-lobby.webp",
    featured: false,
  },
  {
    title: "Travertino Office Interior",
    category: "office",
    imageUrl: "/images/hero/travertino-office.webp",
    featured: false,
  },
  {
    title: "Luxury Interior Finish",
    category: "interior",
    imageUrl: "/images/1 (1).png",
    featured: true,
  },
  {
    title: "Modern Living Space",
    category: "living-room",
    imageUrl: "/images/1 (2).png",
    featured: false,
  },
  {
    title: "Elegant Bedroom Design",
    category: "bedroom",
    imageUrl: "/images/1 (3).png",
    featured: false,
  },
  {
    title: "Exterior Building Finish",
    category: "exterior",
    imageUrl: "/images/1 (4).png",
    featured: true,
  },
  {
    title: "Commercial Space Renovation",
    category: "commercial",
    imageUrl: "/images/1 (5).png",
    featured: false,
  },
  {
    title: "Elegant Castle Exterior",
    category: "exterior",
    imageUrl: "/images/gallery/castle-exterior.jpg",
    featured: true,
  },
  {
    title: "Luxurious Castle Interior",
    category: "interior",
    imageUrl: "/images/gallery/castle-interior.jpg",
    featured: true,
  },
  {
    title: "Master Craftsman Stucco",
    category: "commercial",
    imageUrl: "/images/gallery/master-craftman.jpg",
    featured: false,
  },
  {
    title: "Stucco Team at Work",
    category: "residential",
    imageUrl: "/images/gallery/team-at-work.webp",
    featured: false,
  },
  {
    title: "Finished Living Room Stucco",
    category: "interior",
    imageUrl: "/images/gallery/finished_work.jpg",
    featured: true,
  },
  {
    title: "Premium Paint Craftsmanship",
    category: "commercial",
    imageUrl: "/images/gallery/paint-craftsmanship.webp",
    featured: false,
  },
];

async function main() {
  console.log("Start seeding gallery images...");

  // Clear existing gallery images
  // await prisma.galleryImage.deleteMany({});

  for (const image of galleryData) {
    const result = await prisma.galleryImage.create({
      data: image,
    });
    console.log(`Created gallery image with id: ${result.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
