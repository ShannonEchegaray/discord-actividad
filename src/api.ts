import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import { PORT } from './config';
import categoriesRoutes from './categories/categories.routes';

export const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.get('/api/v1', async (req: Request, res: Response) => {
  res.status(200).send('Welcome');
});

app.use('/api/v1/categories', categoriesRoutes);

app.listen(PORT || 3000, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
