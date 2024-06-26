import { NextFunction, Request, Response } from 'express';

import Category from '../models/Category';
import Product from '../models/Product';
import { messageError, messagesSuccess } from '../constants/message';
import { statusCode } from '../constants/statusCode';

export const productControllers = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    const { _page = 1, _limit = 20 } = req.query as unknown as {
      _page: number;
      _limit: number;
    };

    try {
      const data = await Product.find({})
        .limit(_limit * 1)
        .skip((_page - 1) * _limit)
        .sort({ createdAt: 1 })
        .populate('category');

      const COUNT = await Product.countDocuments();
      if (data && data.length > 0) {
        return res.status(statusCode.OK).json({
          message: messagesSuccess.GET_PRODUCT_SUCCESS,
          Total: data.length,
          totalPages: Math.ceil(COUNT / _limit),
          currentPage: _page,
          data,
        });
      }
      return res
        .status(statusCode.NOT_FOUND)
        .json({ message: messageError.NOT_FOUND });
    } catch (error) {
      next(error);
    }
  },
  add: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Product.create(req.body);
      const updateCategory = await Category.findByIdAndUpdate(
        data.category,
        {
          $push: { products: data._id },
        },
        { new: true }
      );

      if (!data || !updateCategory) {
        return res
          .status(statusCode.BAD_REQUEST)
          .json({ message: messageError.BAD_REQUEST });
      }
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.CREATE_PRODUCT_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Product.findById(req.params.id).populate('category');

      if (!data) {
        return res
          .status(statusCode.BAD_REQUEST)
          .json({ message: messageError.BAD_REQUEST });
      }
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.GET_PRODUCT_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Product.findByIdAndUpdate(
        `${req.params.id}`,
        req.body,
        { new: true }
      );
      if (!data) {
        res
          .status(statusCode.BAD_REQUEST)
          .json({ message: messageError.NOT_FOUND });
      }
      const updateCategory = await Category.findByIdAndUpdate(
        data?.category,
        {
          $push: { products: data?._id },
        },
        { new: true }
      );
      if (!data || !updateCategory) {
        return res.status(statusCode.NOT_FOUND).json({
          message: messageError.BAD_REQUEST,
        });
      }
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.UPDATE_PRODUCT_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  //? SOFT DELETE. Should use this
  hide: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Product.findByIdAndUpdate(
        `${req.params.id}`,
        { hide: true },
        { new: true }
      );
      if (!data) {
        return res.status(statusCode.BAD_REQUEST).json({
          message: messageError.BAD_REQUEST,
        });
      }
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.UPDATE_PRODUCT_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  //! HARD DELETE. Not use this
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Product.findByIdAndDelete(req.params.id);

      if (data) {
        return res.status(statusCode.OK).json({
          message: messagesSuccess.DELETE_PRODUCT_SUCCESS,
        });
      }
      return res.status(statusCode.BAD_REQUEST).json({
        message: messageError.DELETE_FAIL,
      });
    } catch (error) {
      next(error);
    }
  },
};
