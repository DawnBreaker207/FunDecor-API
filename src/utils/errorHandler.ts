import { Request, RequestHandler, Response } from 'express';
import { messageError } from '../constants/message';
import { statusCode } from '../constants/statusCode';

// Error Handling 404
export const errorHandlerNotFound: RequestHandler = (req, res, next) => {
  const error = new Error(messageError.NOT_FOUND);
  (error as any).status = statusCode.NOT_FOUND;
  next(error);
};

export const errorHandler = (err: Error, req: Request, res: Response) => {
  return res.status((err as any).status || statusCode.ERROR_SERVER).json({
    error: {
      name: err.name,
      message: err.message || messageError.ERROR_SERVER,
    },
  });
};
