import { Types } from 'mongoose';

export interface ProductType {
  _id?: Types.ObjectId | string | number;
  title: string;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand: string;
  category: Types.ObjectId;
  thumbnail: string;
  images?: string[];
  price: number;
  description: string;
  hide?: boolean;
  attributes?: Types.ObjectId[];
}
