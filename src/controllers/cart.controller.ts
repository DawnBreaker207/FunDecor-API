import { RequestHandler } from 'express';
import { Types } from 'mongoose';

import { messageError } from '../constants/message';
import { statusCode } from '../constants/statusCode';
import Cart from '../models/Cart.model';
import { ProductCart } from '../interfaces/Cart.interface';

export const getCartByUserId: RequestHandler = async (req, res, next) => {
  //* GET /cart/userId

  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');

    const cartData = {
      products: cart?.products?.map((item) => ({
        productId: item.productId._id,
        name: item.productId.title,
        price: item.productId.price,
        quantity: item.quantity,
      })),
    };
    return res.status(statusCode.OK).json({ cartData });
  } catch (error) {
    next(error);
  }
};
export const addItemToCart: RequestHandler = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  try {
    //? Check if cart exist by UserId ?
    let cart = await Cart.findOne({ userId });
    //? If not exist create new
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }
    const existProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    //? Check product exist in cart
    if (existProductIndex !== -1) {
      //? If product exist update quantity
      cart.products[existProductIndex].quantity += quantity;
    } else {
      //? If product not exist create new
      cart.products.push({ productId, quantity });
    }
    //* Save cart
    await cart.save();
    return res.status(statusCode.OK).json({ cart });
  } catch (error) {
    next(error);
  }
};
export const removeFromCart: RequestHandler = async (req, res, next) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: messageError.BAD_REQUEST });
    }
    cart.products = cart.products.filter((product) => {
      product.productId && product.productId.toString() !== productId;
    }) as Types.DocumentArray<ProductCart>;

    await cart.save();
    return res.status(statusCode.OK).json({ cart });
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantity: RequestHandler = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: messageError.BAD_REQUEST });
    }
    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res
        .status(statusCode.NOT_FOUND)
        .json({ error: messageError.NOT_FOUND });
    }
    product.quantity = quantity;
    await cart?.save();
    return res.status(statusCode.OK).json({ cart });
  } catch (error) {
    next(error);
  }
};

// Increase and Decrease product quantity in cart
export const increaseProductQuantity: RequestHandler = async (
  req,
  res,
  next
) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res
        .status(statusCode.NOT_FOUND)
        .json({ message: messageError.NOT_FOUND });
    }
    const product = cart?.products.find(
      (item) => item.productId.toString() === productId
    ) as ProductCart;
    if (!product) {
      res
        .status(statusCode.NOT_FOUND)
        .json({ message: messageError.NOT_FOUND });
    }
    product.quantity++;
    await cart?.save();
    res.status(statusCode.OK).json(cart);
  } catch (error) {
    next(error);
  }
};
export const decreaseProductQuantity: RequestHandler = async (
  req,
  res,
  next
) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res
        .status(statusCode.NOT_FOUND)
        .json({ message: messageError.NOT_FOUND });
    }
    const product = cart?.products.find(
      (item) => item.productId.toString() === productId
    ) as ProductCart;
    if (!product) {
      res
        .status(statusCode.NOT_FOUND)
        .json({ message: messageError.NOT_FOUND });
    }
    if (product.quantity > 1) {
      product.quantity--;
    }
    await cart?.save();
    res.status(statusCode.OK).json(cart);
  } catch (error) {
    next(error);
  }
};
