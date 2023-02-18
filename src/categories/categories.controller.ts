import type { Request, Response } from 'express';
import categoriesService from './categories.service';

export default {
  async getAll(req: Request, res: Response) {
    const data = await categoriesService.getAll();

    res.status(200).json(data);
  },
  async getOne() {
    //
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
