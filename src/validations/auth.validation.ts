import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPass: Joi.any().valid(Joi.ref('password')).required(),
  username: Joi.string().min(6).optional(),
  phoneNumber: Joi.string().min(10).max(11).optional(),
  avatar: Joi.string().optional(),
  address: Joi.string().optional(),
});
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
