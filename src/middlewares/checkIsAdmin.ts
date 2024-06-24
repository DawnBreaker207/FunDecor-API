import { RequestHandler } from 'express';
import { errorMessage } from '../constants/message';

export const checkIsAdmin: RequestHandler = async (req, res, next) => {
  try {
    if (req?.user?.role !== 'admin') {
      return res.status(403).json({
        message: errorMessage.PERMISSION_DENIED || 'Permission denied !',
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
