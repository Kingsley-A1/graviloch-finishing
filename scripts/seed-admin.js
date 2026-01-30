const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  const email = "gravilochadmin@gmail.com" || "blessedkingkingsley@gmail.com";
  const password = "GravilochAdmin2026!" || "Le Kingsley09036826272"; // Stronger default password

  console.log(`Seeding admin user: ${email}...`);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.admin.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: "Kingsley Maduabuchi",
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log("Admin user created successfully!");
    console.log("Email:", email);
    console.log("Password:", password);
  } catch (e) {
    console.error("Error creating admin user:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
