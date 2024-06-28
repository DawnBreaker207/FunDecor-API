import { RequestHandler } from 'express';

import { statusCode } from '../constants/statusCode';
import Order from '../models/Order.model';
import { messageError, messagesSuccess } from '../constants/message';

export const createOrder: RequestHandler = async (req, res, next) => {
  const { userId, items, totalPrice, customerInfo } = req.body;
  try {
    const order = await Order.create({
      userId,
      items,
      totalPrice,
      customerInfo,
    });
    return res.status(statusCode.OK).json(order);
  } catch (error) {
    next(error);
  }
};
export const getOrder: RequestHandler = async (req, res, next) => {
  try {
    const order = await Order.find();
    if (order.length === 0) {
      return res
        .status(statusCode.NOT_FOUND)
        .json({ error: messageError.NOT_FOUND });
    }
    return res.status(statusCode.OK).json(order);
  } catch (error) {
    next(error);
  }
};

export const getOrderById: RequestHandler = async (req, res, next) => {
  try {
    const { userId, orderId } = req.params;
    const order = await Order.findOne({ userId, _id: orderId });
    if (!order) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: messageError.NOT_FOUND });
    }
    return res.status(statusCode.OK).json({ order });
  } catch (error) {
    next(error);
  }
};
export const updateOrder: RequestHandler = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOneAndUpdate({ _id: orderId }, req.body, {
      new: true,
    });
    if (!order) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: messageError.NOT_FOUND });
    }
    return res.status(statusCode.OK).json({ order });
  } catch (error) {
    next(error);
  }
};
export const updateOrderStatus: RequestHandler = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatus = [
      'pending',
      'confirmed',
      'shipped',
      'delivered',
      'cancelled',
    ];

    if (!validStatus.includes(status)) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: messageError.NOT_FOUND });
    }
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: messageError.NOT_FOUND });
    }
    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: messageError.NOT_FOUND });
    }

    order.status = status;
    await order.save();
    return res
      .status(statusCode.OK)
      .json({ message: messagesSuccess.CREATE_CATEGORY_SUCCESS });
  } catch (error) {
    next(error);
  }
};
