import prisma from '../src/lib/prisma';

const samplesData = [
  {
    title: "Pristine White Venetian Plaster",
    description: "High-gloss sheen reflecting a warm light, ultra-smooth and elegant.",
    imageUrl: "/images/samples/sample_1_venetian_plaster_1773341367202.png",
    category: "venetian",
    isAvailable: true,
  },
  {
    title: "Authentic Roman Travertino",
    description: "Porous natural stone effect with warm beige and earthy tones.",
    imageUrl: "/images/samples/sample_2_travertino_roman_1773341372147.png",
    category: "travertino",
    isAvailable: true,
  },
  {
    title: "Classic Stucco",
    description: "Smooth with subtle matte pitting and light gray tones.",
    imageUrl: "/images/samples/sample_3_stucco_classic_1773341397123.png",
    category: "stucco",
    isAvailable: true,
  },
  {
    title: "Liquid Gold Metal",
    description: "Rich opulent metallic shimmer for a bold statement wall.",
    imageUrl: "/images/samples/sample_4_liquid_metal_gold_1773341416602.png",
    category: "liquid-metal",
    isAvailable: true,
  },
  {
    title: "Grey Microcement",
    description: "Seamless concrete texture, industrial chic but luxurious.",
    imageUrl: "/images/samples/sample_5_microcement_concrete_1773341436690.png",
    category: "microcemento",
    isAvailable: true,
  },
  {
    title: "Swirled Decorative Pearlescent",
    description: "Subtle swirls and organic patterns in soft gray and pearl.",
    imageUrl: "/images/samples/sample_6_decorative_swirl_1773341464164.png",
    category: "other",
    isAvailable: true,
  },
  {
    title: "Nero Deep Black Venetian",
    description: "Highly polished, mirror-like gloss with dramatic light reflection.",
    imageUrl: "/images/samples/sample_7_venetian_nero_1773341485376.png",
    category: "venetian",
    isAvailable: true,
  },
  {
    title: "Rust Metallic Edge",
    description: "Contemporary metallic finish highlighting urban luxury.",
    imageUrl: "/images/samples/sample-metallic-1.png",
    category: "metallic",
    isAvailable: true,
  },
  {
    title: "Bright Stucco Naturale",
    description: "Sharp white textured finish, simple yet brilliant.",
    imageUrl: "/images/samples/sample-stucco-1.png",
    category: "stucco",
    isAvailable: true,
  },
  {
    title: "Liquid Silver Accent",
    description: "Sleek and highly reflective silver liquid finish.",
    imageUrl: "/images/samples/sample-liquidmetal-1.png",
    category: "liquid-metal",
    isAvailable: true,
  }
];

async function main() {
  console.log('Start seeding samples...');
  
  // Clear existing samples
  await prisma.sample.deleteMany({});
  
  for (const sample of samplesData) {
    const result = await prisma.sample.create({
      data: sample,
    })
    console.log(`Created sample with id: ${result.id}`)
  }
  
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
