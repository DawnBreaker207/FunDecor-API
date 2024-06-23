import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './env.js';

export const createToken = (payload, expiresIn = '10d') => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
