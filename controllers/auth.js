import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';
import { createToken } from '../utils/jwt.js';
import { errorMessage, successMessages } from '../constants/message.js';
export const register = async (req, res, next) => {
  try {
    // 1.Check data input
    // 2.Check email exist
    // 3.Encrypt password
    // 4.Create new user
    // 5.Notify success

    const { email, password } = req.body;

    // ? B2 Check email exist ?
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: errorMessage.EMAIL_EXIST });
    }

    // B3: Encrypt password
    const hashPass = await hashPassword(password);

    // B4: Create new user

    const user = await User.create({ ...req.body, password: hashPass });

    user.password = undefined;
    return res.status(201).json({
      message: successMessages.REGISTER_SUCCESS,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // Step 1: Validate
    const { email, password } = req.body;

    // Step 2: Check email exist
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: errorMessage.EMAIL_NOT_FOUND });
    }
    // Step 3: Check password exist
    // console.log(await comparePassword(password, userExist.password));
    if (!(await comparePassword(password, userExist.password))) {
      return res.status(400).json({ message: errorMessage.INVALID_PASSWORD });
    }
    // checkPassword(password)
    // Step 4: Create token => JWT
    const token = createToken({ _id: userExist._id }, '10d');

    // Step 5: Return token for client

    userExist.password = undefined;
    return res.status(201).json({
      message: successMessages.LOGIN_SUCCESS,
      token,
      user: userExist,
    });
  } catch (error) {
    next(error);
  }
};
