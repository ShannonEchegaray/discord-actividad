import type { Order } from './orders.type';
import { prisma } from '../shared/prisma-client';

export default {
  async getAll() {
    return prisma.order.findMany();
  },
  async getOne(id) {
    return prisma.order.findFirst({
      where: { id: id },
      select: {
        id: true,
        customerName: true,
        customerAddress: true,
        createdAt: true,
        updatedAt: true,
        orderDetails: {
          select: {
            quantity: true,
            price: true,
            product: {
              select: {
                title: true,
                thumbnail: true,
              },
            },
          },
        },
      },
    });
  },
  async create(order: Order) {
    const products = await prisma.product.findMany({
      where: {
        id: { in: order.products.map((product) => product.id) },
      },
      select: {
        id: true,
        price: true,
      },
    });

    const orderDetailsProducts = products.map((product) => {
      const quantity = order.products.find(
        (item) => item.id === product.id,
      ).quantity;

      return {
        productId: product.id,
        price: product.price,
        quantity,
      };
    });

    return prisma.order.create({
      data: {
        customerAddress: order.customer.address,
        customerName: order.customer.name,
        orderDetails: {
          create: orderDetailsProducts,
        },
      },
    });
  },
  async update(id, order) {
    try {
      for (let i = 0; i < order.orderDetails.length; i++) {
        console.log(order.orderDetails[i]);
        // const productId = order.orderDetails[i].id;
        await prisma.orderDetail.update({
          // A LA HORA DE ACTUALIZAR ESTOY ENVIANDO EL ID DE "order"
          // El problema que no encontraba ninguna orden que actualizar se debia, a que se estaba enviando el id del producto,
          // y no el id del orderDetail
          where: {
            id,
          },
          data: {
            quantity: order.orderDetails[i].quantity,
            price: order.orderDetails[i].price,
          },
        });
      }
      const up = await prisma.order.update({
        where: { id },
        data: {
          customerAddress: order.customerAddress,
        },
      });

      console.log(up);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async delete(id) {
    //
    try {
      await prisma.order.delete({ where: { id: id } });
    } catch (error) {
      return error;
    }
  },
};
