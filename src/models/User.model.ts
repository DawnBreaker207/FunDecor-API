import mongoose from 'mongoose';
import { UserType } from '../interfaces/User.interface';

const userSchema = new mongoose.Schema<UserType>(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: 'member' },
    avatar: { type: String },
    address: { type: String },
    phoneNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model<UserType>('User', userSchema);
