import { Request } from 'express';
import { Schema } from 'joi';

export const validBody = (data: Request, isSchema: Schema) => {
  // Check path login or register
  const { error } = isSchema.validate(data, { abortEarly: false });
  if (error) {
    const errors = error.details.map((item) => item.message);
    return { errors };
  }
  return;
};
