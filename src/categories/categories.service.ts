import { prisma } from '../shared/prisma-client';

export default {
  async getAll() {
    return prisma.category.findMany();
  },
  async getOne(id) {
    //
    return prisma.category.findUnique({ where: id});
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
