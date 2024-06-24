import mongoose from 'mongoose';
import { UserType } from '../interfaces/User';

const userSchema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
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
