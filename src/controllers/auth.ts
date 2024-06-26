import { RequestHandler } from 'express';
import { messageError, messagesSuccess } from '../constants/message';
import User from '../models/User';
import { comparePassword, hashPassword } from '../utils/hashPassword';
import { createToken } from '../utils/jwt';
import { statusCode } from '../constants/statusCode';

export const register: RequestHandler = async (req, res, next) => {
  try {
    //* 1.Check data input
    //* 2.Check email exist
    //* 3.Encrypt password
    //* 4.Create new user
    //* 5.Notify success

    const { email, password } = req.body;

    //* B2 Check email exist ?
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ message: messageError.EMAIL_EXIST });
    }

    //* B3: Encrypt password
    const hashPass = await hashPassword(password);

    //* B4: Create new user

    const user = await User.create({ ...req.body, password: hashPass });

    user.password = undefined;
    return res.status(statusCode.CREATED).json({
      message: messagesSuccess.REGISTER_SUCCESS,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    //* Step 1: Validate
    const { email, password } = req.body;

    //* Step 2: Check email exist
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ message: messageError.EMAIL_NOT_FOUND });
    }
    //* Step 3: Check password exist
    if (!(await comparePassword(password, userExist.password as string))) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ message: messageError.INVALID_PASSWORD });
    }
    //* Step 4: Create token => JWT
    const token = createToken({ _id: userExist._id }, '10d');

    //* Step 5: Return token for client

    userExist.password = undefined;
    return res.status(statusCode.CREATED).json({
      message: messagesSuccess.LOGIN_SUCCESS,
      token,
      user: userExist,
    });
  } catch (error) {
    next(error);
  }
};
