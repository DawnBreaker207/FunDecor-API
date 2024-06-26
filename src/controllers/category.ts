import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { messageError, messagesSuccess } from '../constants/message';
import Category from '../models/Category';
import Product from '../models/Product';
import { statusCode } from '../constants/statusCode';

export const CategoryControllers = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Category.find({}).populate('products');

      if (data && data.length > 0) {
        return res.status(statusCode.OK).json({
          message: messagesSuccess.GET_CATEGORY_SUCCESS,
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
      const data = await Category.create(req.body);

      if (!data) {
        return res
          .status(statusCode.BAD_REQUEST)
          .json({ message: messageError.BAD_REQUEST });
      }
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.CREATE_CATEGORY_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Category.findById(req.params.id).populate('products');

      if (!data) {
        return res
          .status(statusCode.BAD_REQUEST)
          .json({ message: messageError.BAD_REQUEST });
      }
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.GET_CATEGORY_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Category.findByIdAndUpdate(
        `${req.params.id}`,
        req.body,
        { new: true }
      );
      if (!data) {
        return res.status(statusCode.NOT_FOUND).json({
          message: messageError.BAD_REQUEST,
        });
      }
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.UPDATE_CATEGORY_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  //? SOFT DELETE. Should use this
  hide: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Category.findByIdAndUpdate(
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
        message: messagesSuccess.UPDATE_CATEGORY_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  //! HARD DELETE. Not use this
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.params.id === '660fa2a046e7c73371b80946') {
        return res.status(statusCode.BAD_REQUEST).json({
          message: "Can't delete default categories !",
        });
      }

      // ! Update product for categories deleted
      const productsToUpdate = await Product.find({ category: req.params.id });
      await Promise.all(
        productsToUpdate.map(async (product) => {
          product.category = new Types.ObjectId('660fa2a046e7c73371b80946');
          await product.save();
        })
      );
      const data = await Category.findByIdAndDelete(req.params.id);

      if (data) {
        return res.status(statusCode.OK).json({
          message: messagesSuccess.DELETE_CATEGORY_SUCCESS || 'Successfully !',
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
