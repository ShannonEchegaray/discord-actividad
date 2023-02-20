import type { Request, Response } from 'express';
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
    type body = {
      customerName: String;
      customerAddress: String;
      products: Array<productsBody>
    }

    type productsBody = {
      id: Number;
      quantity: Number;
    }

    type detailOrder = {
      quantity: Number;
      product: Number;
    }
    
    const {customerName, customerAddress, products}: body = req.body;
    const productsMap: Array<detailOrder> = products.map(({id, quantity}) => ({
      quantity: quantity,
      product: id,
    }))
    console.log(productsMap)
    const newOrder = await ordersService.create(
      {
        customerName,
        customerAddress,
        orderDetails: {create: productsMap}
      }
    );
    res.status(201).json(newOrder);
  },

  async update(req: Request, res: Response) {

    type orderDetail ={
      id: Number;
      quantity: Number;
      price: Number;
    }

    type Body = {
      customerAddress?: String;
      orderDetails?: Array<orderDetail>;
    }

    const {customerAddress, orderDetails}: Body = req.body;
    const error = await ordersService.update(Number(req.params.id), {
      customerAddress,
      orderDetails
    });
    if(error){
      res.status(500).send(error);
    } else {
      res.status(204).end();
    }
  },

  async delete(req: Request, res: Response) {
    const error = await ordersService.delete(Number(req.params.id));
    if(error){ 
      res.status(500).send(error)
    } else {
      res.status(204).end();
    }
  },
};
