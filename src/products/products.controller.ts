import { Product } from '@prisma/client';
import type { Request, Response } from 'express';
import productsService from './products.service';

export default {
  async getAll(req: Request, res: Response) {
    const data = await productsService.getAll();
    res.status(200).json(data);
  },
  async getOne(req: Request, res: Response) {
    const data = await productsService.getOne(Number(req.params.id));
    res.status(200).json(data);
  },
  async create(req: Request, res: Response) {
    const data = await productsService.create(req.body);
    res.status(201).json(data);
  },
  async update(req: Request, res: Response) {
    const data = await productsService.update(
      Number(req.params.id),
      req.body as Product,
    );
    res.status(200).json(data);
  },
  async delete(req: Request, res: Response) {
    await productsService.delete(Number(req.params.id));
    res.status(204).end();
  },
};
