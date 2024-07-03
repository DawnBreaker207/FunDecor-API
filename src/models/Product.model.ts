import mongoose from 'mongoose';
import { ProductType } from '../interfaces/Product.interface';

// const productSchema = new mongoose.Schema<ProductType>(
//   {
//     title: {
//       type: String,
//       required: true,
//       lowercase: true,
//     },
//     discountPercentage: {
//       type: Number,
//       default: 0,
//     },
//     rating: {
//       type: Number,
//       default: 0,
//     },
//     stock: {
//       type: Number,
//       default: 0,
//     },
//     brand: {
//       type: String,
//       default: 'No brand',
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       default: '660fa2a046e7c73371b80946',
//       ref: 'Category',
//     },
//     thumbnail: {
//       type: String,
//       default: '',
//     },
//     images: {
//       type: [String],
//       default: [],
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     attributes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Attribute',
//       },
//     ],
//     hide: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true, versionKey: false }
// );
const productSchema = new mongoose.Schema<ProductType>(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      default: '660fa2a046e7c73371b80946',
      ref: 'Category',
    },
    stock: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
    },
    brand: {
      type: String,
      default: 'No brand',
    },
    description: {
      type: String,
    },
    material: { type: String },
    size: {
      type: [String],
      enum: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    thumbnail: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
    },

    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variants',
      },
    ],
    hide: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model<ProductType>('Product', productSchema);
