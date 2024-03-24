import jwt from 'jsonwebtoken';

export const createToken = (id) => {
  // const token =
  jwt.sign({ id }, 'secretCode', {
    expiresIn: '1d',
  });
};
