import User from '../models/user.js';
import { checkEmail } from '../utils/checkExist.js';
import { hashPassword } from '../utils/hashPassword.js';
import { createToken } from '../utils/jwt.js';
import { validAuth } from '../utils/validAuth.js';
import { loginSchema, registerSchema } from '../validations/auth.js';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const register = async (req, res, next) => {
  try {
    // 1.Check data input
    // 2.Check email exist
    // 3.Encrypt password
    // 4.Create new user
    // 5.Notify success

    const { email, password } = req.body;
    validAuth(req.body, registerSchema);
    // ? B2 Check email exist ?
    checkEmail(email);

    // B3: Encrypt password
    hashPassword(password);

    // user.password = undefined;
    // B4: Create new user

    const user = await User.create({ ...req.body, password: hashPassword });

    return res.status(201).json({
      message: 'Register Success',
      user: await user.save(),
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    // Step 1: Validate
    const { email, password } = req.body;
    validAuth(req.body, loginSchema);
    // Step 2: Check email exist
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: 'Email not exist' });
    }
    // Step 3: Check password exist
    const passwordMatch = await bcryptjs.compare(password, userExist.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Password not exist' });
    }
    // checkPassword(password)
    // Step 4: Create token => JWT
    createToken({ id: userExist._id });

    // Step 5: Return token for client
    userExist.password = undefined;
    return res.status(200).json({
      message: 'Login success',
      userExist,
    });
  } catch (error) {
    next(error);
  }
};
