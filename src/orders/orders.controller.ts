import type { Request, Response } from 'express';
import ordersService from './orders.service';

export default {
  async getAll(req: Request, res: Response) {
    const data = await ordersService.getAll();

    res.status(200).json(data);
  },
  async getOne(req: Request, res: Response) {
    const order = await ordersService.getOne(req.params.id);

    res.status(200).json(order);
  },
  async create(req: Request, res: Response) {
    const newOrder = await ordersService.create(req.body);

    res.status(201).json(newOrder);
  },
  async update(req: Request, res: Response) {
    await ordersService.update(req.params.id, req.body);

    res.status(204).end();
  },
  async delete(req: Request, res: Response) {
    await ordersService.delete(req.params.id);

    res.status(204).end();
  },
};
