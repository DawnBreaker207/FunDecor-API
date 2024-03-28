import { errorMessage } from '../constants/message.js';
import User from '../models/user.js';

export const checkEmail = async (email, res) => {
  const checkEmail = await User.findOne({ email });
};
