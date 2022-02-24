import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import '@shared/container';
import { router } from './routes';
import { AppError } from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(router);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => console.log('Server started on port 3333'));
