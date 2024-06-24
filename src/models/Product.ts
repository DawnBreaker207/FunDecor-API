import mongoose from 'mongoose';
import { ProductType } from '../interfaces/Product';

const productSchema = new mongoose.Schema<ProductType>(
  {
    title: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      default: 'No brand',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      default: '660fa2a046e7c73371b80946',
      ref: 'Category',
    },
    thumbnail: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    hide: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<ProductType>('Product', productSchema);
