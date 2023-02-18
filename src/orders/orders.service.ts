import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default {
  async getAll() {
    return [
      {
        id: 1,
        name: 'Category name',
      },
    ];
  },
  async getOne(id) {
    //
    throw new Error('Not implemented yet.');
  },
  async create(order) {
    //
    throw new Error('Not implemented yet.');
  },
  async update(id, order) {
    //
    throw new Error('Not implemented yet.');
  },
  async delete(id) {
    //
    throw new Error('Not implemented yet.');
  },
};
