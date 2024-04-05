import { errorMessage, successMessages } from '../constants/message.js';
import Category from '../models/Category.js';

export const CategoryControllers = {
  getAll: async (req, res, next) => {
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
  add: async (req, res, next) => {
    try {
      const data = await Category.create(req.body);

      if (!data) {
        return res.status(400).json({ message: errorMessage.BAD_REQUEST });
      }
      return res.status(201).json({
        message: successMessages.CREATE_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
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
  update: async (req, res, next) => {
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
  hide: async (req, res, next) => {
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
  delete: async (req, res, next) => {
    try {
      if (req.params.id === '660fa2a046e7c73371b80946') {
        return res.status(400).json({
          message: "Can't delete default categories !",
        });
      }

      // ! Update product for categories deleted
      const data = await Category.findByIdAndDelete(req.params.id);

      if (data) {
        return res.status(200).json({
          message: successMessages.DELETE_CATEGORY_SUCCESS,
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
