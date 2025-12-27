import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ---------- ADMIN USER ----------
  const adminEmail = "admin@parallax.com";
  const adminPassword = "Admin@123";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        passwordHash,
        role: Role.ADMIN,
      },
    });

    console.log("✅ Admin user created");
  } else {
    console.log("ℹ️ Admin user already exists");
  }

  // ---------- SAMPLE PRODUCTS ----------
  const products = [
    {
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      description: "High quality wireless headphones with noise cancellation",
      price: 2999,
      stock: 50,
      category: "Electronics",
      images: {
        create: [
          { url: "https://placehold.co/600x400?text=Headphones" }
        ],
      },
    },
    {
      name: "Smart Watch",
      slug: "smart-watch",
      description: "Water resistant smart watch with fitness tracking",
      price: 4999,
      stock: 30,
      category: "Wearables",
      images: {
        create: [
          { url: "https://placehold.co/600x400?text=Smart+Watch" }
        ],
      },
    },
    {
      name: "Laptop Backpack",
      slug: "laptop-backpack",
      description: "Durable backpack suitable for 15-inch laptops",
      price: 1999,
      stock: 40,
      category: "Accessories",
      images: {
        create: [
          { url: "https://placehold.co/600x400?text=Backpack" }
        ],
      },
    },
  ];

  for (const product of products) {
    const exists = await prisma.product.findUnique({
      where: { slug: product.slug },
    });

    if (!exists) {
      await prisma.product.create({ data: product });
      console.log(`✅ Product created: ${product.name}`);
    } else {
      console.log(`ℹ️ Product already exists: ${product.name}`);
    }
  }

  console.log("🌱 Seeding completed");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
