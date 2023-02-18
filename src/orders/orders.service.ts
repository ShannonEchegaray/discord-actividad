import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default {
  async getAll() {
    const data = await prisma.order.findMany({});

    return data;
    // [
    //   {
    //     id: 1,
    //     name: 'Category name',
    //   },
    // ];
  },
  async getOne(id) {
    const item = await prisma.order.findFirst({ where: { id: parseInt(id) } });
    return item;
  },
  async create(order) {
    //
    const newOrder = prisma.order.create({ data: order });
    return newOrder;
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
