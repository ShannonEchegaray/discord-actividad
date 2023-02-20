import type { Request, Response } from 'express';
import categoriesService from './categories.service';

export default {
  async getAll(req: Request, res: Response) {
    const data = await categoriesService.getAll();
    res.status(200).json(data);
  },
  async getOne(req: Request, res:Response) {
    //
    const data = await categoriesService.getOne(Number(req.params.id));
    res.status(200).json(data);
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
