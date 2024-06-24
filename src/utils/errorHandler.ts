import { Request, RequestHandler, Response } from 'express';
import { errorMessage } from '../constants/message';

// Error Handling 404
export const errorHandlerNotFound: RequestHandler = (req, res, next) => {
  const error = new Error('Not found!');
  (error as any).status = 404;
  next(error);
};

export const errorHandler = (err: Error, req: Request, res: Response) => {
  return res.status((err as any).status || 500).json({
    error: {
      name: err.name,
      message: err.message || errorMessage.ERROR_SERVER,
    },
  });
};
