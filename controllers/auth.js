import User from '../models/user.js';
import { checkEmail } from '../utils/checkExist.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';
import { createToken } from '../utils/jwt.js';
import { validBody } from '../utils/validBody.js';
import { loginSchema, registerSchema } from '../validations/auth.js';
import { errorMessage, successMessages } from '../constants/message.js';
export const register = async (req, res, next) => {
  try {
    // 1.Check data input
    // 2.Check email exist
    // 3.Encrypt password
    // 4.Create new user
    // 5.Notify success

    const { email, password } = req.body;
    const resultValid = validBody(req.body, registerSchema);
    if (resultValid) {
      return res.status(400).json({ message: resultValid.errors });
    }
    // ? B2 Check email exist ?
    const checkExist = checkEmail(email);
    if (checkExist) {
      return res.status(400).json({ message: errorMessage.EMAIL_EXIST });
    }

    // B3: Encrypt password
    const hashPass = await hashPassword(password);

    // user.password = undefined;
    // B4: Create new user

    const user = await User.create({ ...req.body, password: hashPass });

    user.password = undefined;
    return res.status(201).json({
      message: successMessages.REGISTER_SUCCESS,
      user,
      // : await user.save(),
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    // Step 1: Validate
    const { email, password } = req.body;
    const resultValid = validBody(req.body, loginSchema);
    if (resultValid) {
      return res.status(400).json({ message: resultValid.errors });
    }
    // Step 2: Check email exist
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: errorMessage.EMAIL_NOT_FOUND });
    }
    // Step 3: Check password exist
    console.log(await comparePassword(password, userExist.password));
    if (!(await comparePassword(password, userExist.password))) {
      return res.status(400).json({ message: errorMessage.INVALID_PASSWORD });
    }
    // checkPassword(password)
    // Step 4: Create token => JWT
    createToken({ id: userExist._id });

    // Step 5: Return token for client
    userExist.password = undefined;
    return res.status(201).json({
      message: successMessages.LOGIN_SUCCESS,
      userExist,
    });
  } catch (error) {
    next(error);
  }
};
