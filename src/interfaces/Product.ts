import { Types } from 'mongoose';

export interface ProductType {
  id_?: string | number;
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
}
