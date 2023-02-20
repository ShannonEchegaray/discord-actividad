import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockProductService = async (id) => {
  return await prisma.product.findUnique({
    where: { id: id }
  });
}

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
    const item = await prisma.order.findFirst({ where: { id: id, }, include: { orderDetails: true } });
    return item;
  },
  async create(order) {
    //
    //! REFACTORIZAR.
    const newOrder = await prisma.order.create({
      data: {
        customerAddress: order.customerAddress,
        customerName: order.customerName
      }
    });
    for (let i = 0; i < order.orderDetails.create.length; i++) {
      // TODO: Utilizar el service de productos, no el mockeado.
      const product = await mockProductService(order.orderDetails.create[i].product)

      await prisma.orderDetail.create({
        data: {
          quantity: order.orderDetails.create[i].quantity,
          price: product.price,
          product: { connect: { id: product.id } },
          order: { connect: { id: newOrder.id } }
        }
      });
    }
    return await prisma.order.findUnique({ where: { id: newOrder.id } })
  },
  async update(id, order) {
    try {
      for (let i = 0; i < order.orderDetails.length; i++) {
        console.log(order.orderDetails[i])
        const productId = order.orderDetails[i].id
        await prisma.orderDetail.update({
          // A LA HORA DE ACTUALIZAR ESTOY ENVIANDO EL ID DE "order"
          // El problema que no encontraba ninguna orden que actualizar se debia, a que se estaba enviando el id del producto,
          // y no el id del orderDetail
          where: { 
            id     
          },
          data: {
            quantity: order.orderDetails[i].quantity,
            price: order.orderDetails[i].price,
          }
        })
      }
      const up = await prisma.order.update({
        where: { id },
        data: {
          customerAddress: order.customerAddress,
        },
      });

      console.log(up)
    }
    catch (error) {
      console.log(error)
      return error
    }
  },
  async delete(id) {
    //
    try {
      await prisma.order.delete({ where: { id: id, } });
    } catch (error) {
      return error
    }
  },
};
