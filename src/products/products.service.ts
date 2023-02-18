import { Product, ProductStatus } from '@prisma/client';
import { prisma } from '../shared/prisma-client';

export default {
  async getAll() {
    const records = await prisma.product.findMany();
    return records;
  },
  async getOne(id) {
    const record = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    return record;
  },
  async create(data: Product) {
    const { title, description, thumbnail, price, quantity, categoryId } = data;

    const record = await prisma.product.create({
      data: {
        title,
        description,
        thumbnail,
        price,
        quantity,
        status: ProductStatus.PUBLISHED,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
      include: {
        category: true,
      },
    });

    return record;
  },
  async update(id, data: Product) {
    const {
      title,
      description,
      thumbnail,
      price,
      quantity,
      status,
      categoryId,
    } = data;

    const record = await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        thumbnail,
        price,
        quantity,
        status,
        updatedAt: new Date(),
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
      include: {
        category: true,
      },
    });

    return record;
  },
  async delete(id) {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  },
};
