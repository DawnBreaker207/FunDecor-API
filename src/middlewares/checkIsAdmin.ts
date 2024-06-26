import { RequestHandler } from 'express';
import { messageError } from '../constants/message';
import { statusCode } from '../constants/statusCode';

export const checkIsAdmin: RequestHandler = async (req, res, next) => {
  try {
    if (req?.user?.role !== 'admin') {
      return res.status(statusCode.FORBIDDEN).json({
        message: messageError.PERMISSION_DENIED || 'Permission denied !',
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
