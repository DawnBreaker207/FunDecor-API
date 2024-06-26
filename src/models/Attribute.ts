import mongoose from 'mongoose';

const valueAttributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
export const valueAttributeModel = mongoose.model(
  'ValueAttribute',
  valueAttributeSchema
);
const attributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    values: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ValueAttribute',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model('Attribute', attributeSchema);
