import bcryptjs from 'bcryptjs';
export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  return hashPassword;
};
export const comparePassword = async (
  password: string,
  hashPassword:string
) => {
  const checkPass = await bcryptjs.compare(password, hashPassword);
  if (!checkPass) {
    return false;
  }
  return checkPass;
};
