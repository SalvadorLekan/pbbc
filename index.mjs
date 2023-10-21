import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userName = "Kord";

async function main() {
  const data =
    await prisma.$queryRaw`SELECT DISTINCT "product_id","product_name" FROM "order_to_product" WHERE "order_id" IN (SELECT DISTINCT "order_id" FROM "order_to_product" WHERE "product_id" in (SELECT DISTINCT "product_id" FROM "order_to_product" WHERE username='${userName}'))`;

  console.log(data);
}

await main();
