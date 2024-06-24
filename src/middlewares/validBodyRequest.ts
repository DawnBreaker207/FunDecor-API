import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationErrorItem } from 'joi';
import { errorMessage } from '../constants/message';

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
        return res.status(400).json({
          message: errorMessage.INVALID_BODY_REQUEST,
          errors,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
export default validBodyRequest;
