import User from '../models/user.js';
import { loginSchema, registerSchema } from '../validations/auth.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
  try {
    // 1.Check data input
    // 2.Check email exist
    // 3.Encrypt password
    // 4.Create new user
    // 5.Notify success

    const { email, password } = req.body;
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json({ message: errors });
    }
    // ? B2 Check email exist ?
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: `Email exist !!!` });
    }

    // B3: Encrypt password

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    // user.password = undefined;
    // B4: Create new user

    const user = await User.create({ ...req.body, password: hashPassword });

    return res.status(201).json({
      message: 'Register Success',
      user: await user.save(),
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    // Step 1: Validate
    const { email, password } = req.body;
    const { value, error } = loginSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json({ message: errors });
    }
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
    // Step 4: Create token => JWT
    const token = jwt.sign({ id: userExist._id }, 'secretCode', {
      expiresIn: '1d',
    });
    // Step 5: Return token for client
    userExist.password = undefined;
    return res.status(200).json({
      message: 'Login success',
      token,
      userExist,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
