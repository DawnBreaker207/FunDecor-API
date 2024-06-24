import mongoose from 'mongoose';
import { CategoryType } from '../interfaces/Category';

const categorySchema = new mongoose.Schema<CategoryType>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model<CategoryType>('Category', categorySchema);
