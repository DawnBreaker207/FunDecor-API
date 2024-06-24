import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './env';

export const createToken = (payload: Object, expiresIn = '10d') => {
  const token = jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET as string);
