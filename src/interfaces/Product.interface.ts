import { Types } from 'mongoose';

// export interface ProductType {
//   _id?: Types.ObjectId | string | number;
//   title: string;
//   discountPercentage?: number;
//   rating?: number;
//   stock?: number;
//   brand: string;
//   category: Types.ObjectId;
//   thumbnail: string;
//   images?: string[];
//   price: number;
//   description: string;
//   hide?: boolean;
//   attributes?: Types.ObjectId[];
// }
export interface ProductType {
  _id?: Types.ObjectId | string | number;
  title: string;
  category: Types.ObjectId;
  slug?: string;
  brand?: string;
  thumbnail: string;
  stock?: number;
  description: string;
  material: string;
  size?: Size;
  price: number;
  variants?: Types.ObjectId[];
  hide?: boolean;
}

enum Size {
  S,
  M,
  L,
  XL,
  XXL,
}
