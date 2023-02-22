import type { Request, Response } from 'express';
// import type { Product } from '@prisma/client';

import ordersService from './orders.service';

/* const mock = {
  "1": {
    id: 1,
    title: "Casa",
    description: "Descripcion",
    thumbnail: "casa.jpg",
    price: 100000,
    quantity: 2,
    status: "PUBLISHED",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    categoryId: 1,
  }
} */

// type ProductBody = Pick<Product, 'id' | 'title' | 'price'>;

// type body = {
//   customerName: string;
//   customerAddress: string;
//   products: ProductBody[];
// };
//
// type detailOrder = {
//   quantity: number;
//   product: number;
// };

export default {
  async getAll(req: Request, res: Response) {
    const data = await ordersService.getAll();
    res.status(200).json(data);
  },

  async getOne(req: Request, res: Response) {
    const order = await ordersService.getOne(Number(req.params.id));
    res.status(200).json(order);
  },

  async create(req: Request, res: Response) {
    const { customerName, customerAddress, products } = req.body;

    const order = await ordersService.create({
      customer: {
        name: customerName,
        address: customerAddress,
      },
      products,
    });

    res.status(201).json(order);
  },

  async update(req: Request, res: Response) {
    type orderDetail = {
      id: number;
      quantity: number;
      price: number;
    };

    type Body = {
      customerAddress?: string;
      orderDetails?: Array<orderDetail>;
    };

    const { customerAddress, orderDetails }: Body = req.body;
    const error = await ordersService.update(Number(req.params.id), {
      customerAddress,
      orderDetails,
    });
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(204).end();
    }
  },

  async delete(req: Request, res: Response) {
    const error = await ordersService.delete(Number(req.params.id));
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(204).end();
    }
  },
};
