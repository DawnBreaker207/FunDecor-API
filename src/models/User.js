import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // unique: true,
      // required: true,
    },
    email: {
      type: String,
      // unique: true,
      require: true,
    },
    password: { type: String, required: true },

    role: { type: String, default: 'member' },
    avatar: { type: String },
    address: { type: String },
    phoneNumber: { type: String, 
      // unique: true 
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model('User', userSchema);
