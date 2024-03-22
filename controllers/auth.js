import User from '../models/user.js';
import { registerSchema } from '../validations/auth.js';
import bcryptjs from 'bcryptjs';
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
