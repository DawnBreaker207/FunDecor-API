export interface UserType {
  _id?: string | number;
  username?: string;
  email: string;
  password: string | undefined;
  role?: string;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
}
