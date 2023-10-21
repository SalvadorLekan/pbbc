import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [...Array(100)].map(() => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
}));

users.push({
  username: "Kord",
  email: "kord@example.com",
});

const products = [...Array(1000)].map(() => ({
  name: faker.commerce.productName(),
  price: Number.parseFloat(faker.commerce.price()),
}));

// You can comment out the following two blocks of code if you just want to seed the database with more orders
await prisma.user.createMany({
  data: users,
  skipDuplicates: true,
});

await prisma.product.createMany({
  data: products,
  skipDuplicates: true,
});

async function seedFakeOrders() {
  const users = await prisma.user.findMany();
  const products = await prisma.product.findMany();

  for (const user of users) {
    const totalOrders = Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < totalOrders; i++) {
      const randomProducts = pickRandomProducts(products, 5);

      const order = await prisma.order.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          items: {
            createMany: {
              data: randomProducts.map((product) => ({
                product_id: product.id,
                product_name: product.name,
                product_price: product.price,
                quantity: Math.floor(Math.random() * 10) + 1,
                username: user.username,
              })),
            },
          },
        },
      });
      console.log(`Created order with id: ${order.id} for user: ${user.username}`);
    }
  }
}

function pickRandomProducts(products, count) {
  const picked = [];
  const pickedIds = new Set();
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * products.length);
    if (pickedIds.has(randomIndex)) {
      i--;
      continue;
    }
    const randomProduct = products[randomIndex];
    picked.push(randomProduct);
    pickedIds.add(randomIndex);
  }
  return picked;
}

await seedFakeOrders();

const totalOrders = await prisma.order.count();

console.log(`Created ${totalOrders} orders`);

await prisma.$disconnect();
