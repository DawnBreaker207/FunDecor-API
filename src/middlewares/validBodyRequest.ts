import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationErrorItem } from 'joi';
import { messageError } from '../constants/message';
import { statusCode } from '../constants/statusCode';

const validBodyRequest =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = await schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map(
          (item: ValidationErrorItem) => item.message
        );
        return res.status(statusCode.BAD_REQUEST).json({
          message: messageError.INVALID_BODY_REQUEST,
          errors,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
export default validBodyRequest;
