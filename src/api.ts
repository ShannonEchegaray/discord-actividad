import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';

import { PORT } from './config';

export const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', async (req: Request, res: Response) => {
  res.json({
    message: 'Hello',
  });
});

app.listen(PORT || 3000, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
