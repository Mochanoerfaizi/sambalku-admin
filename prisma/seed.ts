import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@sambalku.local" },
    update: {},
    create: {
      name: "Admin SambalKu",
      email: "admin@sambalku.local",
      password: "CHANGE_ME",
      role: "ADMIN"
    }
  });

  const products = [
    { name: "Sambal Original 150g", sku: "SBL-ORG-150", sellPrice: 18000, stock: 45 },
    { name: "Sambal Terasi 150g", sku: "SBL-TRS-150", sellPrice: 20000, stock: 28 },
    { name: "Sambal Ijo 150g", sku: "SBL-IJO-150", sellPrice: 19000, stock: 18 }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: product,
      create: { ...product, unit: "pcs", minStock: 5 }
    });
  }

  console.log(`Seed selesai. Admin: ${admin.email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());