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

const productList = [
  {
    title: 'Zapatos para correr',
    description: 'Zapatos para correr de alta calidad para hombre',
    thumbnail: 'image.jpg',
    price: 100,
    quantity: 10,
  },
  {
    title: 'Camiseta de algodón',
    description: 'Camiseta de algodón suave y transpirable para mujer',
    thumbnail: 'image.jpg',
    price: 20,
    quantity: 20,
  },
];

async function main() {
  const categories = await prisma.category.findMany();

  if (!categories.length) {
    await prisma.category.createMany({
      data: categoryList.map((category) => ({ name: category })),
    });
  }

  const products = await prisma.product.findMany();
  if (!products.length) {
    const category = await prisma.category.findFirst({
      where: {
        name: 'Fashion & Accessories',
      },
    });

    for (let product of productList) {
      await prisma.product.create({
        data: {
          ...product,
          category: {
            connect: {
              id: category.id,
            },
          },
        },
      });
    }
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
