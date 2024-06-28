import { Types } from 'mongoose';

export interface CategoryType {
  _id?: string | number;
  name: string;
  slug: string;
  description: string;
  isHidden?: boolean;
  products?: Types.ObjectId[];
}
