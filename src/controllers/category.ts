import { NextFunction, Request, Response } from 'express';

import { Types } from 'mongoose';
import { errorMessage, successMessages } from '../constants/message';
import Category from '../models/Category';
import Product from '../models/Product';

export const CategoryControllers = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Category.find({}).populate('products');

      if (data && data.length > 0) {
        return res.status(200).json({
          message: successMessages.GET_CATEGORY_SUCCESS,
          data,
        });
      }
      return res.status(404).json({ message: errorMessage.NOT_FOUND });
    } catch (error) {
      next(error);
    }
  },
  add: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Category.create(req.body);

      if (!data) {
        return res.status(400).json({ message: errorMessage.BAD_REQUEST });
      }
      return res.status(201).json({
        message: successMessages.CREATE_CATEGORY_SUCCESS,
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
        return res.status(400).json({ message: errorMessage.BAD_REQUEST });
      }
      return res.status(201).json({
        message: successMessages.GET_CATEGORY_SUCCESS,
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
        return res.status(404).json({
          message: errorMessage.BAD_REQUEST,
        });
      }
      return res.status(201).json({
        message: successMessages.UPDATE_CATEGORY_SUCCESS,
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
        return res.status(400).json({
          message: errorMessage.BAD_REQUEST,
        });
      }
      return res.status(201).json({
        message: successMessages.UPDATE_CATEGORY_SUCCESS,
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
        return res.status(400).json({
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
        return res.status(200).json({
          message: successMessages.DELETE_CATEGORY_SUCCESS || 'Successfully !',
        });
      }
      return res.status(400).json({
        message: errorMessage.DELETE_FAIL,
      });
    } catch (error) {
      next(error);
    }
  },
};
