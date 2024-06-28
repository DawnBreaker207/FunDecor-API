import mongoose from 'mongoose';

// Order Item
const OrderItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
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

// Order
const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items: [OrderItemSchema],
  orderNumber: {
    type: String,
    auto: true,
    unique: true,
  },
  customerInfo: {
    type: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
      },
      email: {
        type: String,
        required: true,
      },
      payment: {
        type: String,
      },
      city: {
        type: String,
      },
    },
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Order', OrderSchema);
