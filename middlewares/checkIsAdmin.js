import { errorMessage } from '../constants/message.js';

export const checkIsAdmin = async (req, res, next) => {
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
