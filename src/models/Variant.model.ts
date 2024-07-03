import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: { type: String },
  slug: { type: String },
  thumbnail: { type: String, default: '' },
  stock: { style: Number },
  description: { style: String },
  material: { style: String },
  size: { style: Number },
  price: { style: Number },
});

export default mongoose.model('Variant', variantSchema);
