import { errorMessage } from '../constants/message.js';

// Error Handling 404
export const errorHandlerNotFound = (req, res, next) => {
  const error = new Error('Not found!');
  error.status = 404;
  next(error);
};

export const errorHandler = (err, req, res) => {
  return res.status(err.status || 500).json({
    error: {
      name: err.name,
      message: err.message || errorMessage.ERROR_SERVER,
    },
  });
};
