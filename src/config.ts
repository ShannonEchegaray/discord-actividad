import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

export const PORT = process.env.PORT || 3000;
