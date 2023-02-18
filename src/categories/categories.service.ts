import { prisma } from '../shared/prisma-client';

export default {
  async getAll() {
    return prisma.category.findMany({
      include: {
        products: true,
      },
    });
  },
  async getOne() {
    //
  },
  async create() {
    //
  },
  async update() {
    //
  },
  async delete() {
    //
  },
};
