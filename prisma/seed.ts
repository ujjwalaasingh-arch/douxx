import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const brand = await db.brand.upsert({
    where: { slug: "atelier-exemple" },
    update: {},
    create: {
      slug: "atelier-exemple",
      name: "Atelier Exemple",
      city: "Lyon",
      story: "Une petite marque indépendante, fabriquée à la main en France.",
    },
  });
  await db.product.upsert({
    where: { slug: "bougie-lavande" },
    update: {},
    create: {
      slug: "bougie-lavande",
      name: "Bougie à la lavande",
      description: "Cire végétale, parfum de Provence, coulée à la main.",
      priceCents: 2800,
      category: "Maison",
      stock: 25,
      brandId: brand.id,
    },
  });
}
main().finally(() => db.$disconnect());
