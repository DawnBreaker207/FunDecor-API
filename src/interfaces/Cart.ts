import { Types } from 'mongoose';
import { ProductType } from './Product';

export interface ProductCart {
  productId: ProductType;
  quantity: number;
}
export interface Cart extends Document {
  userId: Types.ObjectId;
  products: Types.DocumentArray<ProductCart>;
}
