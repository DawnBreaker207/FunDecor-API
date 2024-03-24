import User from '../models/user.js';

export const checkEmail = async (email) => {
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return res.status(400).json({ message: `Email exist !!!` });
  }
};


