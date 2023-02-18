import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoryList = [
  'Electronics',
  'Computers & Accessories',
  'Home & Kitchen',
  'Fashion & Accessories',
  'Beauty & Personal Care',
  'Health & Wellness',
  'Sports & Outdoors',
  'Toys & Games',
  'Baby & Toddler',
  'Pets',
  'Automotive',
  'Tools & Home Improvement',
  'Office & School Supplies',
  'Books & Media',
  'Groceries & Gourmet Food',
  'Home Improvement & Garden',
  'Furniture & Decor',
  'Art, Crafts & Sewing',
  'Jewelry & Watches',
  'Industrial & Scientific',
];

async function main() {
  const categories = await prisma.category.findMany();

  if (!categories.length) {
    await prisma.category.createMany({
      data: categoryList.map((category) => ({ name: category })),
    });
  }
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
