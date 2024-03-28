import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
const { JWT_SECRET } = process.env;
export const createToken = (id) => {
  // const token =
  jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '1d',
  });
};
