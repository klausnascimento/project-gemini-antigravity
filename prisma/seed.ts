import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  }),
} as any);

async function main() {
  const data = [
    {
      name: "Mouse Gamer",
      sku: "SKU-MOUSE-001",
      price: new Prisma.Decimal("99.90"),
      stock: 20,
      category: "Periféricos",
      active: true,
    },
    {
      name: "Teclado Mecânico",
      sku: "SKU-KEYB-001",
      price: new Prisma.Decimal("249.90"),
      stock: 10,
      category: "Periféricos",
      active: true,
    },
    {
      name: "Monitor 24",
      sku: "SKU-MON-024",
      price: new Prisma.Decimal("899.00"),
      stock: 5,
      category: "Monitores",
      active: true,
    },
  ];

  for (const p of data) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: {
        name: p.name,
        price: p.price,
        stock: p.stock,
        category: p.category,
        active: p.active,
      },
      create: p,
    });
  }

  console.log("Seed concluído ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
