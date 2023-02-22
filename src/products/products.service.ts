import { Product, ProductStatus } from '@prisma/client';
import { prisma } from '../shared/prisma-client';

export default {
  async getAll() {
    return prisma.product.findMany();
  },
  async getOne(id) {
    return prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  },
  async create(data: Product) {
    const { title, description, thumbnail, price, quantity, categoryId } = data;

    return prisma.product.create({
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

    return prisma.product.update({
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
  },
  async delete(id) {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  },
};
