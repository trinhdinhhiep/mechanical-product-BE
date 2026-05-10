import { PrismaClient } from "@prisma/client";
import { seedArticles } from "./seeds/articles.seed";
import { seedProducts } from "./seeds/products.seed";

const prisma = new PrismaClient();

async function main() {
  await seedArticles(prisma);
  await seedProducts(prisma);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
